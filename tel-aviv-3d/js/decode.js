// Decode the TLV1 binary payload (base64 → gzip → sections).
// Format mirrors scripts/extract_telaviv.py exactly.

export async function loadData(b64) {
  const bin = atob(b64);
  const gz = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) gz[i] = bin.charCodeAt(i);
  const ds = new DecompressionStream('gzip');
  const stream = new Blob([gz]).stream().pipeThrough(ds);
  const buf = await new Response(stream).arrayBuffer();
  return parse(buf);
}

class Reader {
  constructor(buf) { this.dv = new DataView(buf); this.o = 0; }
  u8() { return this.dv.getUint8(this.o++); }
  i8() { return this.dv.getInt8(this.o++); }
  u16() { const v = this.dv.getUint16(this.o, true); this.o += 2; return v; }
  i16() { const v = this.dv.getInt16(this.o, true); this.o += 2; return v; }
  u32() { const v = this.dv.getUint32(this.o, true); this.o += 4; return v; }
  i32() { const v = this.dv.getInt32(this.o, true); this.o += 4; return v; }
}

// Ring: u16 n, i32 x0 z0, (n-1) × i16 deltas with (32767,32767)→i32 escape.
// Returns Float32Array [x,z,...] in meters (x east, z south).
function readRing(r) {
  const n = r.u16();
  const out = new Float32Array(n * 2);
  let x = r.i32(), z = r.i32();
  out[0] = x * 0.1; out[1] = z * 0.1;
  for (let i = 1; i < n; i++) {
    const dx = r.i16(), dz = r.i16();
    if (dx === 32767 && dz === 32767) { x = r.i32(); z = r.i32(); }
    else { x += dx; z += dz; }
    out[i * 2] = x * 0.1; out[i * 2 + 1] = z * 0.1;
  }
  return out;
}

function readPoints(r) {
  const n = r.u32();
  const out = new Float32Array(n * 2);
  if (!n) return out;
  let x = r.i32(), z = r.i32();
  out[0] = x * 0.1; out[1] = z * 0.1;
  for (let i = 1; i < n; i++) {
    const dx = r.i16(), dz = r.i16();
    if (dx === 32767 && dz === 32767) { x = r.i32(); z = r.i32(); }
    else { x += dx; z += dz; }
    out[i * 2] = x * 0.1; out[i * 2 + 1] = z * 0.1;
  }
  return out;
}

function parse(buf) {
  const r = new Reader(buf);
  const magic = String.fromCharCode(r.u8(), r.u8(), r.u8(), r.u8());
  if (magic !== 'TLV1') throw new Error('bad magic ' + magic);
  const metaLen = r.u32();
  const meta = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, r.o, metaLen)));
  r.o += metaLen;

  const D = { meta, buildings: [], roads: [], areas: [], trees: null, lamps: null, signals: null, sea: null };

  while (r.o < buf.byteLength) {
    const sid = r.u8();
    const len = r.u32();
    const end = r.o + len;
    if (sid === 1) {
      const count = r.u32();
      for (let i = 0; i < count; i++) {
        const part = r.u8(), ty = r.u8(), h = r.u16() * 0.1, mh = r.u16() * 0.1;
        const nm = r.u16(), col = r.u8();
        r.u8(); // total rings (unused)
        const nOut = r.u8();
        const outers = [];
        for (let k = 0; k < nOut; k++) {
          const outer = readRing(r);
          const nIn = r.u8();
          const inners = [];
          for (let j = 0; j < nIn; j++) inners.push(readRing(r));
          outers.push({ outer, inners });
        }
        D.buildings.push({ part, ty, h, mh, nm, col, outers });
      }
    } else if (sid === 2) {
      const count = r.u32();
      for (let i = 0; i < count; i++) {
        const cls = r.u8(), oneway = r.u8(), layer = r.i8(); r.u8();
        D.roads.push({ cls, oneway, layer, pts: readRing(r) });
      }
    } else if (sid === 3) {
      const count = r.u32();
      for (let i = 0; i < count; i++) {
        const ty = r.u8(), nm = r.u16();
        const nOut = r.u8();
        const outers = [];
        for (let k = 0; k < nOut; k++) {
          const outer = readRing(r);
          const nIn = r.u8();
          const inners = [];
          for (let j = 0; j < nIn; j++) inners.push(readRing(r));
          outers.push({ outer, inners });
        }
        D.areas.push({ ty, nm, outers });
      }
    } else if (sid === 4) D.trees = readPoints(r);
    else if (sid === 5) D.lamps = readPoints(r);
    else if (sid === 6) D.signals = readPoints(r);
    else if (sid === 7) { const c = r.u32(); if (c > 0) D.sea = readRing(r); }
    r.o = end;
  }
  return D;
}

export function lonlatToLocal(meta, lon, lat) {
  return [(lon - meta.lon0) * meta.mlon, (meta.lat0 - lat) * meta.mlat];
}
