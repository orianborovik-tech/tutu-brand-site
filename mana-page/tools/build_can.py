#!/usr/bin/env python3
"""Build the MANA 355ml sleek can as a GLB, headless via bpy.

Profile-lathe body, manual cylindrical UVs into the official label texture,
packed ORM (glTF metallicRoughness), aluminum rims/lid, geometric condensation
droplets with KHR_materials_transmission. Origin at can center, meters.
"""
import math, random, os, sys
import bpy, bmesh
from mathutils import Vector, Matrix

random.seed(11)
HERE = os.path.dirname(os.path.abspath(__file__))
BLD = os.path.join(HERE, '..', 'build')
OUT = os.path.join(HERE, '..', 'public', 'assets', 'mana-can.glb')

# ---- dimensions (m): 355ml sleek can ----
R = 0.029          # body radius (58mm dia)
H = 0.157          # total height
NECK_R = 0.0252    # radius at top seam
BOT_RIM_R = 0.0235 # bottom rim radius
SEG = 96

# profile: list of (r, z) from bottom center outward and up
prof = [
    (0.000, 0.004),          # bottom dome center (concave up)
    (0.012, 0.0032),
    (0.020, 0.0018),
    (BOT_RIM_R, 0.0008),
    (0.0248, 0.0),           # bottom rim contact
    (0.0262, 0.0),
    (0.0278, 0.0015),
    (R, 0.006),              # flare into wall
    (R, 0.140),              # straight wall top
    (0.0285, 0.1445),        # neck taper
    (0.0272, 0.1475),
    (NECK_R, 0.1495),        # under seam
    (0.0258, 0.150),         # seam outer
    (0.0262, 0.152),         # seam top bead
    (0.0252, 0.1535),
    (0.0240, 0.1535),        # seam inner
    (0.0238, 0.1515),
    (0.0230, 0.1505),        # lid outer edge
    (0.0150, 0.1490),        # lid slope
    (0.000, 0.1488),         # lid center
]

Z_LABEL_BOT = 0.0015   # texture bottom edge maps here
Z_LABEL_TOP = 0.1495   # texture top edge maps here (under seam)
ALU_BELOW = 0.0008     # below this: aluminum
ALU_ABOVE = 0.1496     # above this: aluminum (seam + lid)

bpy.ops.wm.read_factory_settings(use_empty=True)
mesh = bpy.data.meshes.new('can')
bm = bmesh.new()

verts = [bm.verts.new((r, 0.0, z)) for r, z in prof]
bm.verts.ensure_lookup_table()
geom = bm.verts[:] + bm.edges[:]
edges = []
for i in range(len(verts) - 1):
    edges.append(bm.edges.new((verts[i], verts[i + 1])))
result = bmesh.ops.spin(bm, geom=verts + edges, axis=(0, 0, 1),
                        cent=(0, 0, 0), angle=math.tau, steps=SEG, use_merge=True)
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)

# smooth shading
for f in bm.faces:
    f.smooth = True

bm.to_mesh(mesh)
bm.free()
obj = bpy.data.objects.new('mana_can', mesh)
bpy.context.collection.objects.link(obj)

# ---- materials ----
def img(path, colorspace):
    im = bpy.data.images.load(os.path.abspath(path))
    im.colorspace_settings.name = colorspace
    return im

label_img = img(f'{BLD}/body_albedo.png', 'sRGB')
orm_img   = img(f'{BLD}/body_orm.png', 'Non-Color')

body = bpy.data.materials.new('body')
body.use_nodes = True
nt = body.node_tree
bsdf = nt.nodes['Principled BSDF']
tex = nt.nodes.new('ShaderNodeTexImage'); tex.image = label_img
nt.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
orm = nt.nodes.new('ShaderNodeTexImage'); orm.image = orm_img
sep = nt.nodes.new('ShaderNodeSeparateColor')
nt.links.new(orm.outputs['Color'], sep.inputs['Color'])
nt.links.new(sep.outputs['Green'], bsdf.inputs['Roughness'])
nt.links.new(sep.outputs['Blue'], bsdf.inputs['Metallic'])

alu = bpy.data.materials.new('alu')
alu.use_nodes = True
ab = alu.node_tree.nodes['Principled BSDF']
ab.inputs['Base Color'].default_value = (0.85, 0.86, 0.87, 1.0)
ab.inputs['Metallic'].default_value = 1.0
ab.inputs['Roughness'].default_value = 0.34

water = bpy.data.materials.new('water')
water.use_nodes = True
wb = water.node_tree.nodes['Principled BSDF']
wb.inputs['Base Color'].default_value = (0.9, 0.95, 0.95, 1.0)
wb.inputs['Roughness'].default_value = 0.03
wb.inputs['Transmission Weight'].default_value = 1.0
wb.inputs['IOR'].default_value = 1.33

obj.data.materials.append(body)   # slot 0
obj.data.materials.append(alu)    # slot 1

# ---- assign materials + cylindrical UVs ----
bm = bmesh.new()
bm.from_mesh(mesh)
uv_layer = bm.loops.layers.uv.new('UVMap')
for f in bm.faces:
    zc = sum(v.co.z for v in f.verts) / len(f.verts)
    rc = sum(math.hypot(v.co.x, v.co.y) for v in f.verts) / len(f.verts)
    is_label = (ALU_BELOW < zc < ALU_ABOVE) and rc > 0.02
    f.material_index = 0 if is_label else 1
    us = []
    for loop in f.loops:
        co = loop.vert.co
        u = (math.atan2(co.y, co.x) / math.tau) % 1.0
        v = (co.z - Z_LABEL_BOT) / (Z_LABEL_TOP - Z_LABEL_BOT)
        loop[uv_layer].uv = (u, max(0.0, min(1.0, v)))
        us.append(u)
    if max(us) - min(us) > 0.5:                     # fix seam wrap
        for loop in f.loops:
            uu, vv = loop[uv_layer].uv
            if uu < 0.5:
                loop[uv_layer].uv = (uu + 1.0, vv)
bm.to_mesh(mesh)
bm.free()

# rotate so the MANA logo (texture u center ~0.4712) faces the glTF +Z camera.
# Blender +Y maps to glTF -Z, so aim the logo at Blender -Y: u_target = 0.75.
obj.rotation_euler[2] = -(0.4712 - 0.25) * math.tau + math.pi
bpy.context.view_layer.objects.active = obj
obj.select_set(True)
bpy.ops.object.transform_apply(rotation=True)

# ---- droplets ----
drop_mesh = bpy.data.meshes.new('droplets')
dbm = bmesh.new()
for i in range(210):
    theta = random.uniform(0, math.tau)
    z = random.uniform(0.012, 0.135)
    s = random.uniform(0.0008, 0.0024)
    if random.random() < 0.07:
        s = random.uniform(0.0026, 0.0038)
    ret = bmesh.ops.create_uvsphere(dbm, u_segments=10, v_segments=6, radius=1.0)
    vs = ret['verts']
    nrm = Vector((math.cos(theta), math.sin(theta), 0.0))
    quat = Vector((0, 0, 1)).rotation_difference(nrm)
    base = Vector((math.cos(theta) * R, math.sin(theta) * R, z))
    flat = Matrix.Diagonal((s, s, s * random.uniform(0.42, 0.6), 1.0))
    rot = quat.to_matrix().to_4x4()
    off = Matrix.Translation(base - nrm * s * 0.18)
    M = off @ rot @ flat
    bmesh.ops.transform(dbm, matrix=M, verts=vs)
for f in dbm.faces:
    f.smooth = True
dbm.to_mesh(drop_mesh)
dbm.free()
drops = bpy.data.objects.new('droplets', drop_mesh)
drops.data.materials.append(water)
bpy.context.collection.objects.link(drops)

# ---- recenter both at can center ----
for o in (obj, drops):
    o.location.z = -H / 2

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.transform_apply(location=True)

# ---- export ----
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', export_apply=True,
                          export_image_format='AUTO')
print('EXPORTED', OUT, os.path.getsize(OUT), 'bytes')
