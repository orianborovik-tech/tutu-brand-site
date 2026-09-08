#!/usr/bin/env python3
"""Extract a complete micro-detailed Tel Aviv dataset from an OSM PBF.

Stage "extract": scan the (country) PBF once, keep everything inside the
Tel Aviv bounding box, save a compact intermediate pickle.
Stage "pack":    convert the intermediate data into the delta-encoded binary
format consumed by the web renderer, gzip it and emit a base64 JS payload.

Usage:
  python3 extract_telaviv.py extract <israel.osm.pbf> <workdir>
  python3 extract_telaviv.py pack <workdir> <outdir>

Data (c) OpenStreetMap contributors, ODbL 1.0.
"""
import sys, os, math, json, gzip, base64, pickle, struct, time
from array import array

# ---------------------------------------------------------------- geometry --
LON_MIN, LON_MAX = 34.735, 34.858
LAT_MIN, LAT_MAX = 32.020, 32.148
LON0 = (LON_MIN + LON_MAX) / 2.0
LAT0 = (LAT_MIN + LAT_MAX) / 2.0
M_PER_DEG_LAT = 111132.92 - 559.82 * math.cos(2 * math.radians(LAT0)) + 1.175 * math.cos(4 * math.radians(LAT0))
M_PER_DEG_LON = 111412.84 * math.cos(math.radians(LAT0)) - 93.5 * math.cos(3 * math.radians(LAT0))

def to_dm(lon, lat):
    """Local coords in decimeters: x east, z south (three.js y-up)."""
    return (int(round((lon - LON0) * M_PER_DEG_LON * 10.0)),
            int(round((LAT0 - lat) * M_PER_DEG_LAT * 10.0)))

X_MIN, Z_MAX = to_dm(LON_MIN, LAT_MIN)
X_MAX, Z_MIN = to_dm(LON_MAX, LAT_MAX)
MARGIN = 3000  # 300 m

def in_bbox_dm(x, z, m=MARGIN):
    return X_MIN - m <= x <= X_MAX + m and Z_MIN - m <= z <= Z_MAX + m

# ------------------------------------------------------------------ parsing --
def parse_len(v):
    if not v: return None
    v = v.strip().lower().replace('m', ' ').split(';')[0].split()
    try: return float(v[0].replace(',', '.'))
    except (ValueError, IndexError): return None

def parse_num(v):
    if not v: return None
    try: return float(v.strip().split(';')[0].replace(',', '.'))
    except ValueError: return None

CSS = {'white':'#f5f2ea','ivory':'#f4efe1','beige':'#e8dcc5','cream':'#f2e8d5','tan':'#d2b48c',
       'lightgray':'#cfcfcf','lightgrey':'#cfcfcf','gray':'#a8a8a8','grey':'#a8a8a8','silver':'#c8c8c8',
       'brown':'#8b6b4a','red':'#b5533c','darkred':'#8b3a2e','maroon':'#7d3c30','orange':'#d98e4a',
       'yellow':'#e6d690','lightyellow':'#f0e8c0','sandybrown':'#deb887','wheat':'#e8d5a3',
       'black':'#4a4a4a','darkgray':'#787878','darkgrey':'#787878','blue':'#7d9cb5','lightblue':'#a3c0d4',
       'green':'#8fa878','darkgreen':'#5e7a52','pink':'#dcb8b0','salmon':'#d9a08c'}

def norm_colour(v):
    if not v: return None
    v = v.strip().lower()
    if v in CSS: v = CSS[v]
    if len(v) == 4 and v[0] == '#':
        v = '#' + v[1]*2 + v[2]*2 + v[3]*2
    if len(v) == 7 and v[0] == '#':
        try: int(v[1:], 16); return v
        except ValueError: return None
    return None

B_RES, B_GLASS, B_IND, B_WORSHIP, B_HOTEL, B_PUBLIC, B_COMM = 0, 1, 2, 3, 4, 5, 6

def classify_building(t):
    b = (t.get('building') or t.get('building:part') or '').lower()
    if t.get('amenity') == 'place_of_worship' or b in ('synagogue', 'mosque', 'church', 'cathedral', 'chapel'):
        return B_WORSHIP
    if b == 'hotel' or t.get('tourism') == 'hotel': return B_HOTEL
    if b in ('industrial', 'warehouse', 'hangar', 'garage', 'garages', 'shed', 'service'): return B_IND
    if b in ('school', 'university', 'college', 'hospital', 'public', 'civic', 'government', 'kindergarten', 'train_station', 'transportation'):
        return B_PUBLIC
    if b in ('office', 'commercial', 'retail', 'supermarket') or t.get('amenity') == 'mall': return B_COMM
    return B_RES

HW_CLASS = {'motorway':0,'motorway_link':0,'trunk':0,'trunk_link':0,
            'primary':1,'primary_link':1,'secondary':2,'secondary_link':2,
            'tertiary':3,'tertiary_link':3,'residential':4,'unclassified':4,'living_street':4,
            'service':5,'pedestrian':6,'footway':6,'path':6,'cycleway':6,'steps':6,'track':6}

def classify_area(t):
    if t.get('natural') == 'water' or t.get('waterway') in ('riverbank', 'dock') \
       or t.get('landuse') in ('basin', 'reservoir') or t.get('leisure') == 'marina': return 0
    if t.get('leisure') in ('park', 'garden', 'dog_park', 'common') \
       or t.get('landuse') in ('grass', 'village_green', 'recreation_ground', 'meadow', 'orchard', 'vineyard', 'flowerbed'): return 1
    if t.get('natural') in ('wood', 'scrub', 'heath') or t.get('landuse') == 'forest': return 2
    if t.get('natural') in ('beach', 'sand', 'dune'): return 3
    if t.get('leisure') in ('pitch', 'playground', 'track', 'stadium', 'sports_centre'): return 4
    if t.get('leisure') == 'swimming_pool' or t.get('amenity') == 'swimming_pool': return 5
    if t.get('amenity') == 'parking' and t.get('parking') in (None, 'surface'): return 6
    if t.get('landuse') == 'cemetery' or t.get('amenity') == 'grave_yard': return 7
    if t.get('amenity') in ('school', 'university', 'college', 'hospital'): return 8
    if t.get('place') == 'square' or (t.get('highway') in ('pedestrian', 'footway') and t.get('area') == 'yes'): return 9
    if t.get('man_made') in ('pier', 'breakwater', 'groyne'): return 10
    return None

# ------------------------------------------------------------------ extract --
def stage_extract(pbf, workdir):
    import osmium
    import osmium.filter as ofilter
    t0 = time.time()
    D = {'buildings': [], 'roads': [], 'areas': [], 'trees': array('i'), 'lamps': array('i'),
         'signals': array('i'), 'coast': [], 'coast_rings': []}

    def ring_dm(ring):
        pts = array('i')
        px = pz = None
        for n in ring:
            loc = n.location
            if not loc.valid(): return None
            x, z = to_dm(loc.lon, loc.lat)
            if x != px or z != pz:
                pts.append(x); pts.append(z)
                px, pz = x, z
        if len(pts) >= 4 and pts[0] == pts[-2] and pts[1] == pts[-1]:
            del pts[-2:]
        return pts if len(pts) >= 6 else None

    def line_dm(nodes):
        pts = array('i')
        px = pz = None
        for n in nodes:
            loc = n.location
            if not loc.valid(): continue
            x, z = to_dm(loc.lon, loc.lat)
            if x != px or z != pz:
                pts.append(x); pts.append(z)
                px, pz = x, z
        return pts if len(pts) >= 4 else None

    def any_inside(pts, m=MARGIN):
        for i in range(0, len(pts), 2):
            if in_bbox_dm(pts[i], pts[i + 1], m): return True
        return False

    n_scanned = 0
    fp = (osmium.FileProcessor(pbf)
          .with_locations()
          .with_areas()
          .with_filter(ofilter.EmptyTagFilter())
          .with_filter(ofilter.KeyFilter('building', 'building:part', 'highway', 'natural',
                                         'leisure', 'landuse', 'waterway', 'man_made',
                                         'railway', 'amenity', 'place', 'tourism')))
    for o in fp:
        n_scanned += 1
        if o.is_node():
            loc = o.location
            if not loc.valid(): continue
            x, z = to_dm(loc.lon, loc.lat)
            if not in_bbox_dm(x, z, 0): continue
            t = o.tags
            if t.get('natural') == 'tree': D['trees'].append(x); D['trees'].append(z)
            elif t.get('highway') == 'street_lamp': D['lamps'].append(x); D['lamps'].append(z)
            elif t.get('highway') == 'traffic_signals': D['signals'].append(x); D['signals'].append(z)
        elif o.is_way():
            t = o.tags
            nat = t.get('natural')
            hw = t.get('highway')
            if nat == 'coastline':
                pts = line_dm(o.nodes)
                if pts is not None and any_inside(pts, 60000):
                    if pts[0] == pts[-2] and pts[1] == pts[-1]:
                        D['coast_rings'].append(pts)
                    else:
                        D['coast'].append(pts)
                continue
            cls = None
            if hw is not None and t.get('area') != 'yes':
                cls = HW_CLASS.get(hw)
            elif t.get('railway') in ('rail', 'light_rail', 'tram') and t.get('tunnel') != 'yes':
                cls = 7
            elif t.get('man_made') in ('pier', 'breakwater', 'groyne') and t.get('area') != 'yes':
                cls = 8
            if cls is None or t.get('tunnel') == 'yes': continue
            pts = line_dm(o.nodes)
            if pts is None or not any_inside(pts): continue
            oneway = 1 if (t.get('oneway') in ('yes', '1', 'true') or t.get('junction') == 'roundabout') else 0
            try: layer = max(-1, min(3, int(t.get('layer', '0'))))
            except ValueError: layer = 0
            if layer == 0 and t.get('bridge') in ('yes', 'viaduct'): layer = 1
            D['roads'].append((cls, oneway, layer, pts))
        elif o.is_area():
            t = o.tags
            bpart = t.get('building:part')
            bldg = t.get('building')
            is_b = (bldg not in (None, 'no')) or (bpart not in (None, 'no', 'base'))
            aty = None
            if not is_b:
                aty = classify_area(t)
                if aty is None: continue
            rings = []
            ok = True
            try:
                for outer in o.outer_rings():
                    r = ring_dm(outer)
                    if r is None: continue
                    inners = []
                    for inner in o.inner_rings(outer):
                        ri = ring_dm(inner)
                        if ri is not None: inners.append(ri)
                    rings.append((r, inners))
            except Exception:
                ok = False
            if not ok or not rings: continue
            if not any(any_inside(r, MARGIN) for r, _ in rings): continue
            span_ok = all(len(r) < 4000 for r, _ in rings)
            if not span_ok: continue
            name = t.get('name') or t.get('name:he') or t.get('name:en')
            if name: name = name[:64]
            if is_b:
                part = 1 if (bpart not in (None, 'no', 'base') and bldg in (None, 'no')) else 0
                h = parse_len(t.get('height'))
                mh = parse_len(t.get('min_height'))
                lv = parse_num(t.get('building:levels'))
                mlv = parse_num(t.get('building:min_level'))
                if h is None and lv is not None: h = lv * 3.1 + 1.2
                if mh is None and mlv is not None: mh = mlv * 3.1
                D['buildings'].append({
                    'rings': rings, 'part': part,
                    'h': int(max(0, min(6500, (h or 0) * 10))),
                    'mh': int(max(0, min(6500, (mh or 0) * 10))),
                    'ty': classify_building(t), 'nm': name,
                    'col': norm_colour(t.get('building:colour')),
                })
            else:
                D['areas'].append({'ty': aty, 'rings': rings, 'nm': name})
    os.makedirs(workdir, exist_ok=True)
    with gzip.open(os.path.join(workdir, 'raw.pkl.gz'), 'wb', compresslevel=4) as f:
        pickle.dump(D, f, protocol=4)
    print(f"scanned {n_scanned:,} tagged objects in {time.time()-t0:.0f}s")
    for k in ('buildings', 'roads', 'areas', 'coast', 'coast_rings'):
        print(f"  {k}: {len(D[k]):,}")
    for k in ('trees', 'lamps', 'signals'):
        print(f"  {k}: {len(D[k])//2:,}")
    named = [b['nm'] for b in D['buildings'] if b['nm']]
    print(f"  named buildings: {len(named):,}")
    for probe in ('עזריאלי', 'שלום', 'שרונה'):
        hits = [n for n in named if probe in n][:4]
        print(f"  probe '{probe}': {hits}")

# --------------------------------------------------------------------- pack --
def w_u8(b, v): b.append(v & 0xFF)
def w_u16(b, v): b += struct.pack('<H', v & 0xFFFF)
def w_i32(b, v): b += struct.pack('<i', v)

def w_ring(b, pts):
    """u16 n, i32 x0 z0, then i16 deltas with 32767-escape."""
    n = len(pts) // 2
    w_u16(b, n)
    w_i32(b, pts[0]); w_i32(b, pts[1])
    px, pz = pts[0], pts[1]
    for i in range(1, n):
        x, z = pts[2 * i], pts[2 * i + 1]
        dx, dz = x - px, z - pz
        if abs(dx) > 32000 or abs(dz) > 32000:
            b += struct.pack('<hh', 32767, 32767)
            w_i32(b, x); w_i32(b, z)
        else:
            b += struct.pack('<hh', dx, dz)
        px, pz = x, z

def ring_area(pts):
    n = len(pts) // 2
    s = 0
    for i in range(n):
        j = (i + 1) % n
        s += pts[2*i] * pts[2*j+1] - pts[2*j] * pts[2*i+1]
    return s / 2.0  # note: y-flipped plane; sign only used for consistency

def ring_bbox(pts):
    xs = pts[0::2]; zs = pts[1::2]
    return min(xs), min(zs), max(xs), max(zs)

def point_in_ring(pts, x, z):
    n = len(pts) // 2
    inside = False
    j = n - 1
    for i in range(n):
        xi, zi = pts[2*i], pts[2*i+1]
        xj, zj = pts[2*j], pts[2*j+1]
        if (zi > z) != (zj > z) and x < (xj - xi) * (z - zi) / (zj - zi) + xi:
            inside = not inside
        j = i
    return inside

def subdivide(pts, max_seg=25000):
    out = array('i', [pts[0], pts[1]])
    for i in range(2, len(pts), 2):
        x0, z0 = out[-2], out[-1]
        x1, z1 = pts[i], pts[i + 1]
        d = max(abs(x1 - x0), abs(z1 - z0))
        k = max(1, (d + max_seg - 1) // max_seg)
        for s in range(1, k + 1):
            out.append(x0 + (x1 - x0) * s // k)
            out.append(z0 + (z1 - z0) * s // k)
    return out

def stitch_coast(segments):
    """Join open coastline segments into chains by matching endpoints."""
    segs = [array('i', s) for s in segments]
    used = [False] * len(segs)
    key = lambda x, z: (x // 8, z // 8)
    heads = {}
    for i, s in enumerate(segs):
        heads.setdefault(key(s[0], s[1]), []).append(i)
    chains = []
    for i, s in enumerate(segs):
        if used[i]: continue
        used[i] = True
        chain = array('i', s)
        grown = True
        while grown:
            grown = False
            k = key(chain[-2], chain[-1])
            for dx in (-1, 0, 1):
                for dz in (-1, 0, 1):
                    for j in heads.get((k[0] + dx, k[1] + dz), []):
                        if not used[j]:
                            used[j] = True
                            chain += segs[j][2:]
                            grown = True
                            break
                    if grown: break
                if grown: break
        chains.append(chain)
    chains.sort(key=len, reverse=True)
    return chains

def build_sea(coast_chains):
    """Close the main coastline chain against an expanded bbox → sea polygon."""
    if not coast_chains: return None
    E = 42000  # 4.2 km beyond bbox
    x_lo, x_hi = X_MIN - E, X_MAX + E
    z_lo, z_hi = Z_MIN - E, Z_MAX + E
    chain = coast_chains[0]
    pts = [(chain[i], chain[i+1]) for i in range(0, len(chain), 2)]
    inside = [p for p in pts if x_lo <= p[0] <= x_hi and z_lo <= p[1] <= z_hi]
    if len(inside) < 2: return None
    # clip chain to rect: keep the longest run of inside points, extended to borders
    runs, cur = [], []
    for p in pts:
        if x_lo <= p[0] <= x_hi and z_lo <= p[1] <= z_hi: cur.append(p)
        elif cur: runs.append(cur); cur = []
    if cur: runs.append(cur)
    run = max(runs, key=len)
    # project run endpoints to nearest border
    def to_border(p):
        x, z = p
        cands = [(abs(x - x_lo), (x_lo, z)), (abs(x - x_hi), (x_hi, z)),
                 (abs(z - z_lo), (x, z_lo)), (abs(z - z_hi), (x, z_hi))]
        return min(cands)[1]
    a = to_border(run[0]); b = to_border(run[-1])
    poly = [a] + run + [b]
    corners = [(x_lo, z_lo), (x_hi, z_lo), (x_hi, z_hi), (x_lo, z_hi)]
    def border_pos(p):
        x, z = p
        if z == z_lo: return 0 + (x - x_lo)
        if x == x_hi: return (x_hi - x_lo) + (z - z_lo)
        if z == z_hi: return (x_hi - x_lo) + (z_hi - z_lo) + (x_hi - x)
        return 2 * (x_hi - x_lo) + (z_hi - z_lo) + (z_hi - z)
    per = 2 * ((x_hi - x_lo) + (z_hi - z_lo))
    def walk(p_from, p_to, inc):
        """Corners passed when walking the border from p_from to p_to."""
        t0, t1 = border_pos(p_from), border_pos(p_to)
        cpos = [(border_pos(c), c) for c in corners]
        if inc:
            t_end = t1 if t1 > t0 else t1 + per
            cand = [((p if p > t0 else p + per), c) for p, c in cpos]
            cand = sorted(x for x in cand if t0 < x[0] < t_end)
        else:
            t_end = t1 if t1 < t0 else t1 - per
            cand = [((p if p < t0 else p - per), c) for p, c in cpos]
            cand = sorted((x for x in cand if t_end < x[0] < t0), reverse=True)
        return [c for _, c in cand]
    # water is west (x smaller): pick the closure that contains a west probe point
    mid = run[len(run) // 2]
    probe = (x_lo + 500, mid[1])
    for ccw in (True, False):
        cand = poly + walk(b, a, ccw)
        flat = array('i')
        for x, z in cand: flat.append(int(x)); flat.append(int(z))
        if point_in_ring(flat, probe[0], probe[1]):
            return flat
    return None

def stage_pack(workdir, outdir):
    t0 = time.time()
    with gzip.open(os.path.join(workdir, 'raw.pkl.gz'), 'rb') as f:
        D = pickle.load(f)

    names, name_idx = [], {}
    def nm_id(nm):
        if not nm: return 0xFFFF
        if nm not in name_idx:
            if len(names) >= 0xFFFE: return 0xFFFF
            name_idx[nm] = len(names); names.append(nm)
        return name_idx[nm]

    colours, col_idx = [], {}
    def col_id(c):
        if not c: return 0
        if c not in col_idx:
            if len(colours) >= 250: return 0
            col_idx[c] = len(colours) + 1; colours.append(c)
        return col_idx[c]

    # parent/part interaction: clamp parents swallowed by their parts
    parts = [b for b in D['buildings'] if b['part']]
    parents = [b for b in D['buildings'] if not b['part']]
    grid = {}
    CELL = 500  # 50 m
    for i, p in enumerate(parts):
        r0 = p['rings'][0][0]
        cx = sum(r0[0::2]) // (len(r0) // 2); cz = sum(r0[1::2]) // (len(r0) // 2)
        p['_c'] = (cx, cz)
        grid.setdefault((cx // CELL, cz // CELL), []).append(i)
    clamped = 0
    for b in parents:
        r0 = b['rings'][0][0]
        bx0, bz0, bx1, bz1 = ring_bbox(r0)
        cand = []
        for gx in range(bx0 // CELL, bx1 // CELL + 1):
            for gz in range(bz0 // CELL, bz1 // CELL + 1):
                cand += grid.get((gx, gz), [])
        inside = [parts[i] for i in set(cand)
                  if point_in_ring(r0, parts[i]['_c'][0], parts[i]['_c'][1])]
        if not inside: continue
        area_b = abs(ring_area(r0))
        area_p = sum(abs(ring_area(p['rings'][0][0])) for p in inside)
        if area_p > 0.5 * area_b and b['h'] > 0:
            floor = min((p['mh'] if p['mh'] > 0 else p['h']) for p in inside)
            newh = max(40, min(b['h'], floor if floor > 0 else b['h']))
            if newh < b['h']: clamped += 1
            b['h'] = newh
    print(f"parents clamped by parts: {clamped}")

    payload = bytearray()

    def section(sid, body):
        payload.append(sid)
        payload.extend(struct.pack('<I', len(body)))
        payload.extend(body)

    # buildings
    b_body = bytearray()
    struct_count = 0
    for b in D['buildings']:
        outers = b['rings']
        w_u8(b_body, (1 if b['part'] else 0))
        w_u8(b_body, b['ty'])
        w_u16(b_body, b['h'])
        w_u16(b_body, b['mh'])
        w_u16(b_body, nm_id(b['nm']))
        w_u8(b_body, col_id(b['col']))
        total = sum(1 + len(inn) for _, inn in outers)
        w_u8(b_body, min(255, total))
        w_u8(b_body, len(outers))
        for outer, inners in outers:
            w_ring(b_body, outer)
            w_u8(b_body, len(inners))
            for inn in inners:
                w_ring(b_body, inn)
        struct_count += 1
    b_head = struct.pack('<I', struct_count)
    section(1, b_head + b_body)

    # roads
    r_body = bytearray()
    for cls, oneway, layer, pts in D['roads']:
        pts = subdivide(pts)
        w_u8(r_body, cls); w_u8(r_body, oneway)
        r_body += struct.pack('<b', layer); w_u8(r_body, 0)
        w_ring(r_body, pts)
    section(2, struct.pack('<I', len(D['roads'])) + r_body)

    # areas (+ coast rings as rock, type 11)
    a_body = bytearray()
    a_count = 0
    for a in D['areas']:
        w_u8(a_body, a['ty'])
        w_u16(a_body, nm_id(a.get('nm')))
        w_u8(a_body, len(a['rings']))
        for outer, inners in a['rings']:
            w_ring(a_body, outer)
            w_u8(a_body, len(inners))
            for inn in inners: w_ring(a_body, inn)
        a_count += 1
    for r in D['coast_rings']:
        w_u8(a_body, 11); w_u16(a_body, 0xFFFF); w_u8(a_body, 1)
        w_ring(a_body, r); w_u8(a_body, 0)
        a_count += 1
    section(3, struct.pack('<I', a_count) + a_body)

    # point layers, scanline-sorted for small deltas
    def pack_points(arr):
        pts = sorted(((arr[i], arr[i+1]) for i in range(0, len(arr), 2)),
                     key=lambda p: (p[1] // 1000, p[0]))
        body = bytearray()
        body += struct.pack('<I', len(pts))
        px = pz = 0
        first = True
        for x, z in pts:
            if first:
                w_i32(body, x); w_i32(body, z); first = False
            else:
                dx, dz = x - px, z - pz
                if abs(dx) > 32000 or abs(dz) > 32000:
                    body += struct.pack('<hh', 32767, 32767)
                    w_i32(body, x); w_i32(body, z)
                else:
                    body += struct.pack('<hh', dx, dz)
            px, pz = x, z
        return body
    section(4, pack_points(D['trees']))
    section(5, pack_points(D['lamps']))
    section(6, pack_points(D['signals']))

    # sea polygon
    chains = stitch_coast(D['coast'])
    sea = build_sea(chains)
    s_body = bytearray()
    if sea is not None:
        s_body += struct.pack('<I', 1)
        w_ring(s_body, sea)
        print(f"sea polygon: {len(sea)//2} verts (from {len(chains)} chains)")
    else:
        s_body += struct.pack('<I', 0)
        print("WARNING: no sea polygon built")
    section(7, s_body)

    meta = {
        'lon0': LON0, 'lat0': LAT0,
        'mlon': M_PER_DEG_LON, 'mlat': M_PER_DEG_LAT,
        'bbox': [X_MIN, Z_MIN, X_MAX, Z_MAX],
        'names': names, 'colours': colours,
        'counts': {'buildings': len(D['buildings']), 'roads': len(D['roads']),
                   'areas': a_count, 'trees': len(D['trees']) // 2,
                   'lamps': len(D['lamps']) // 2, 'signals': len(D['signals']) // 2},
        'attribution': '© OpenStreetMap contributors, ODbL',
    }
    meta_b = json.dumps(meta, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    blob = b'TLV1' + struct.pack('<I', len(meta_b)) + meta_b + bytes(payload)

    os.makedirs(outdir, exist_ok=True)
    gz = gzip.compress(blob, 9)
    b64 = base64.b64encode(gz).decode('ascii')
    with open(os.path.join(outdir, 'telaviv-data.js'), 'w') as f:
        f.write('// Tel Aviv 3D dataset — data © OpenStreetMap contributors (ODbL 1.0)\n')
        f.write('window.TLV_DATA_B64="' + b64 + '";\n')
    with open(os.path.join(outdir, 'telaviv.bin.gz'), 'wb') as f:
        f.write(gz)
    print(f"raw {len(blob)/1e6:.1f} MB → gz {len(gz)/1e6:.1f} MB → b64 {len(b64)/1e6:.1f} MB "
          f"({time.time()-t0:.0f}s)")
    print("counts:", meta['counts'], "| names:", len(names), "| colours:", len(colours))

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print(__doc__); sys.exit(1)
    if sys.argv[1] == 'extract': stage_extract(sys.argv[2], sys.argv[3])
    elif sys.argv[1] == 'pack': stage_pack(sys.argv[2], sys.argv[3])
    else: print(__doc__); sys.exit(1)
