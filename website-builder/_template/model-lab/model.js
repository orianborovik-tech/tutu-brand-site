/**
 * THE MODEL SOURCE (system files 20–24).
 * Replace PARAMS + buildModel with the object measured from the reference
 * (MODELING-SPEC). Keep everything DECLARATIVE: the verification loop fixes
 * "neck 8% too wide" by editing one number here.
 *
 * The placeholder below is a demo lathe profile proving the harness works.
 */
export const PARAMS = {
  // [heightRatio, halfWidthRatio] bottom→top — from the ratio table (02)
  profile: [
    [0.00, 0.000],
    [0.01, 0.140],
    [0.10, 0.155],
    [0.45, 0.150],
    [0.60, 0.140],
    [0.72, 0.075],
    [0.85, 0.070],
    [0.97, 0.078],
    [1.00, 0.000],
  ],
  height: 1.0,          // world units (meters at placement scale)
  radialSegments: 96,   // 96–128 hero close-ups (20)
  noiseAmp: 0.0008,     // 0.1–0.3% imperfection displacement (20) — tune per material
};

export async function buildModel(THREE) {
  const pts = PARAMS.profile.map(([y, r]) => new THREE.Vector2(r * PARAMS.height, y * PARAMS.height));
  const smooth = new THREE.SplineCurve(pts).getPoints(64);
  const geo = new THREE.LatheGeometry(smooth, PARAMS.radialSegments);

  // imperfection displacement — perfect surfaces scream CGI (20)
  if (PARAMS.noiseAmp > 0) {
    const { createNoise3D } = await import('simplex-noise');
    const n3 = createNoise3D(() => 0.42); // seeded → deterministic across shots
    const pos = geo.attributes.position;
    const nor = geo.attributes.normal;
    for (let i = 0; i < pos.count; i++) {
      const d = PARAMS.noiseAmp * n3(pos.getX(i) * 40, pos.getY(i) * 40, pos.getZ(i) * 40);
      pos.setXYZ(i,
        pos.getX(i) + nor.getX(i) * d,
        pos.getY(i) + nor.getY(i) * d,
        pos.getZ(i) + nor.getZ(i) * d);
    }
    geo.computeVertexNormals();
  }

  const body = new THREE.Mesh(
    geo,
    // starting values from the family table (21) — tuned in the loop
    new THREE.MeshPhysicalMaterial({ color: '#8f8f8f', roughness: 0.3, metalness: 0 }),
  );
  body.name = 'Body';
  body.castShadow = true;

  const group = new THREE.Group();
  group.name = 'Model';
  group.add(body);
  return group;
}
