#!/usr/bin/env python3
"""Fetch Tel Aviv municipality GIS building attributes (open data, iview2).

Pulls centroid + floors + measured heights + year + name for every building
in the municipal layer, for merging real measured heights into the model.

Usage: python3 fetch_muni.py <out.json>
Source: gisn.tel-aviv.gov.il ArcGIS REST (עיריית תל אביב-יפו, מבנים).
"""
import sys, json, time, urllib.request, urllib.parse

BASE = 'https://gisn.tel-aviv.gov.il/arcgis/rest/services/IView2MapHeb/MapServer/24/query'
FIELDS = 'ms_komot,gova_simplex_2019,dsm_mean,dsm_max,max_height,min_height,year,shem_mivne'

def q(params):
    url = BASE + '?' + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=60) as r:
                return json.load(r)
        except Exception as e:
            if attempt == 3: raise
            time.sleep(2 * (attempt + 1))

def main(out_path):
    cnt = q({'where': '1=1', 'returnCountOnly': 'true', 'f': 'json'})['count']
    print('municipal buildings:', cnt)
    rows = []
    offset = 0
    while offset < cnt:
        d = q({
            'where': '1=1', 'outFields': FIELDS, 'returnGeometry': 'true',
            'geometryPrecision': '6', 'outSR': '4326', 'f': 'geojson',
            'resultOffset': str(offset), 'resultRecordCount': '2000',
            'orderByFields': 'oid_mivne',
        })
        feats = d.get('features', [])
        if not feats:
            print('empty page at', offset, list(d.keys()))
            break
        for f in feats:
            a = f.get('properties', {})
            g = f.get('geometry') or {}
            try:
                ring = g['coordinates'][0] if g['type'] == 'Polygon' else g['coordinates'][0][0]
                cx = sum(p[0] for p in ring) / len(ring)
                cy = sum(p[1] for p in ring) / len(ring)
            except Exception:
                continue
            rows.append({
                'lon': round(cx, 7), 'lat': round(cy, 7),
                'fl': a.get('ms_komot'), 'h': a.get('gova_simplex_2019'),
                'dsm': a.get('dsm_mean'), 'dsmx': a.get('dsm_max'),
                'maxh': a.get('max_height'), 'minh': a.get('min_height'),
                'yr': a.get('year'), 'nm': (a.get('shem_mivne') or '').strip() or None,
            })
        offset += len(feats)
        print(f'  {offset}/{cnt}', flush=True)
    with open(out_path, 'w') as f:
        json.dump(rows, f, ensure_ascii=False, separators=(',', ':'))
    print('saved', len(rows), 'rows ->', out_path)

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'muni_bldg.json')
