# Realism pass for the Meshy 'Happy Panda Hair Gel' GLB.
# Usage: put the source GLB as panda.glb next to this script, then: python3 realism_pipeline.py
# Needs: pip install pillow numpy scipy trimesh open3d

import numpy as np, trimesh, json, struct, io, time
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi
import open3d as o3d
rng=np.random.default_rng(7)
W=2048; t0=time.time()
def log(*a): print(f'[{time.time()-t0:6.1f}s]',*a,flush=True)
def noise(sigma,shape=(W,W)):
    n=rng.standard_normal(shape).astype(np.float32)
    if sigma>0: n=ndi.gaussian_filter(n,sigma)
    return n/ (n.std()+1e-9)
def clamp(x): return np.clip(x,0,1)
# ---------------- masks ----------------
base=np.asarray(Image.open('tex_base_color.jpg')).astype(np.float32)/255
mx=base.max(-1); mn=base.min(-1); sat=(mx-mn)/np.maximum(mx,1e-6)
white=(mn>0.80)&(sat<0.12)
op=ndi.binary_opening(white,structure=np.ones((21,21)))
sticker=ndi.binary_fill_holes(ndi.binary_dilation(op,iterations=10)&white)
text=white&~sticker
ink=sticker&(mn<0.80)
m=trimesh.load('panda.glb',force='mesh')
V=m.vertices.astype(np.float64); F=m.faces.copy(); UV=m.visual.uv.astype(np.float64); N0=np.asarray(m.vertex_normals,dtype=np.float64)
def raster_attr(vals, fill=np.nan):
    out=np.full((W,W),fill,np.float32)
    P=np.stack([UV[:,0]*W,(1-UV[:,1])*W],1)
    for tri in F:
        p=P[tri]; x0,y0=np.floor(p.min(0)).astype(int)-1; x1,y1=np.ceil(p.max(0)).astype(int)+1
        x0,y0=max(x0,0),max(y0,0); x1,y1=min(x1,W-1),min(y1,W-1)
        if x1<x0 or y1<y0: continue
        xs,ys=np.meshgrid(np.arange(x0,x1+1)+0.5,np.arange(y0,y1+1)+0.5)
        (ax,ay),(bx,by),(cx,cy)=p
        det=(bx-ax)*(cy-ay)-(cx-ax)*(by-ay)
        if abs(det)<1e-9: continue
        l1=((bx-xs)*(cy-ys)-(cx-xs)*(by-ys))/det; l2=((cx-xs)*(ay-ys)-(ax-xs)*(cy-ys))/det; l3=1-l1-l2
        eps=-0.02; inside=(l1>=eps)&(l2>=eps)&(l3>=eps)
        val=l1*vals[tri[0]]+l2*vals[tri[1]]+l3*vals[tri[2]]
        blk=out[y0:y1+1,x0:x1+1]; blk[inside]=val[inside]
    return out
ymap=raster_attr(V[:,1])
cap=np.nan_to_num(ymap,nan=0.0)<-0.675
cap=ndi.binary_dilation(cap,iterations=1)
plastic=~sticker&~text&~cap
sm=lambda a,s: ndi.gaussian_filter(a.astype(np.float32),s)
log('masks done')
# ---------------- roughness / metallic ----------------
fine=noise(0.6); micro=noise(1.5); smudge=noise(25); fiber=noise(0.8)
fiber_dir=ndi.gaussian_filter(rng.standard_normal((W,W)).astype(np.float32),(0.5,4)); fiber_dir/=fiber_dir.std()
rough=np.zeros((W,W),np.float32)
rough+=plastic*(0.50+0.02*fine+0.02*micro+0.012*smudge)          # soft-touch matte tube
rough+=cap*(0.30+0.02*fine+0.015*micro+0.012*smudge)               # glossier PP cap
rough+=sticker*(0.70+0.04*fiber+0.03*fiber_dir+0.02*smudge)       # paper label
rough+=text*(0.40+0.03*fine)                                       # printed ink on tube
rough[ink]=0.58+0.03*fine[ink]
rough=clamp(ndi.gaussian_filter(rough,0.4))
mr=np.zeros((W,W,3),np.float32); mr[...,1]=rough; mr[...,2]=0.0; mr[...,0]=1.0
# ---------------- clearcoat (R=amount, G=roughness) ----------------
cc=np.zeros((W,W,3),np.float32)
cc[...,0]=clamp(cap*(0.75+0.03*micro)+plastic*(0.18+0.012*smudge)+text*0.25+sticker*0.0)
cc[...,1]=clamp(cap*(0.25+0.02*fine)+plastic*(0.45+0.02*smudge)+text*0.35+sticker*0.8)
# ---------------- height -> normal ----------------
h=np.zeros((W,W),np.float32)
h+=plastic*(0.035*noise(0.7)+0.02*noise(2.0)+0.012*noise(6.0))     # molded plastic grain (subtle)
h+=cap*(0.02*noise(0.7)+0.012*noise(2.5))
h+=sticker*(0.05*fiber+0.06*fiber_dir+0.02*noise(3))              # paper fibers (subtle)
h+=sm(text,0.8)*1.1                                              # raised print
h+=sm(sticker,2.0)*2.6                                           # sticker thickness step
h+=sm(ink,0.8)*0.4
h=h.astype(np.float32)
gy,gx=np.gradient(h)
strength=0.9
nx=-gx*strength; ny=-gy*strength; nz=np.ones_like(h)
n_new=np.stack([nx,ny,nz],-1); n_new/=np.linalg.norm(n_new,axis=-1,keepdims=True)
n_old=np.asarray(Image.open('tex_normal.jpg')).astype(np.float32)
n_old=np.stack([ndi.median_filter(n_old[...,k],size=5) for k in range(3)],-1)/255*2-1
# glTF normal maps: +Y up (OpenGL). numpy gradient row axis points down => flip y
n_new[...,1]*=-1
# whiteout blend
nb=np.stack([n_old[...,0]+n_new[...,0], n_old[...,1]+n_new[...,1], n_old[...,2]*n_new[...,2]],-1)
nb/=np.linalg.norm(nb,axis=-1,keepdims=True)
normal_img=((nb*0.5+0.5)*255).round().astype(np.uint8)
# ---------------- base color ----------------
bc=Image.open('tex_base_color.jpg')
bc=bc.filter(ImageFilter.UnsharpMask(radius=1.6,percent=110,threshold=2))
bca=np.asarray(bc).astype(np.float32)/255
grain=1+0.006*noise(0.7)+0.003*noise(4)+0.003*smudge*plastic
bca*=grain[...,None]
# slightly deepen the plastic tone for less "flat pastel" look, keep hue
lum=bca.mean(-1,keepdims=True)
bca=np.where(plastic[...,None], bca*0.965+ (bca-lum)*0.10, bca)
bca=np.where(sticker[...,None], bca*0.985, bca)   # paper: not pure white
bca=clamp(bca)
base_img=(bca*255).round().astype(np.uint8)
log('textures done')
# ---------------- mesh: subdivide + smooth ----------------
from trimesh.remesh import subdivide
attrs={'uv':UV,'n0':N0}
V2,F2,A2=subdivide(V,F,vertex_attributes=attrs)
UV2=A2['uv']; N02=A2['n0']; N02/=np.linalg.norm(N02,axis=1,keepdims=True)
log('subdivided', len(V2),'verts',len(F2),'faces')
# weld by position
key=np.round(V2,6); _,wid=np.unique(key,axis=0,return_inverse=True); wid=wid.ravel()
nw=wid.max()+1
Vw=np.zeros((nw,3)); np.add.at(Vw,wid,V2); cnt=np.bincount(wid,minlength=nw); Vw/=cnt[:,None]
E=np.concatenate([F2[:,[0,1]],F2[:,[1,2]],F2[:,[2,0]]]); E=wid[E]; E=np.unique(np.sort(E,1),axis=0); E=E[E[:,0]!=E[:,1]]
from scipy.sparse import coo_matrix
A=coo_matrix((np.ones(len(E)*2),(np.r_[E[:,0],E[:,1]],np.r_[E[:,1],E[:,0]])),shape=(nw,nw)).tocsr()
deg=np.asarray(A.sum(1)).ravel(); deg[deg==0]=1
# feature-aware: freeze vertices on sharp edges (dihedral > 50deg) to keep cap rim/crimp crisp
fn=np.cross(V2[F2[:,1]]-V2[F2[:,0]],V2[F2[:,2]]-V2[F2[:,0]]); fn/=np.linalg.norm(fn,axis=1,keepdims=True)+1e-12
Nw=np.zeros((nw,3)); np.add.at(Nw,wid[F2].ravel(),np.repeat(fn,3,0)); 
# compute per welded vertex normal spread
Nw_norm=np.linalg.norm(Nw,axis=1)/np.bincount(wid[F2].ravel(),minlength=nw).clip(1)
sharp=Nw_norm<np.cos(np.radians(35))   # avg of unit face normals shrinks when normals disagree
log('sharp verts',sharp.sum(),'of',nw)
P=Vw.copy()
for it in range(6):
    for lam in (0.5,-0.53):
        L=(A@P)/deg[:,None]-P
        L[sharp]=0
        P=P+lam*L
disp=P-Vw
V3=V2+disp[wid]
# smooth normals on welded topology (grouped also by original normal similarity to keep hard edges)
fn=np.cross(V3[F2[:,1]]-V3[F2[:,0]],V3[F2[:,2]]-V3[F2[:,0]])  # area weighted
key2=np.concatenate([np.round(V2,6),np.round(N02,1)],1); _,gid=np.unique(key2,axis=0,return_inverse=True); gid=gid.ravel()
Ng=np.zeros((gid.max()+1,3)); np.add.at(Ng,gid[F2].ravel(),np.repeat(fn,3,0))
Ng/=np.linalg.norm(Ng,axis=1,keepdims=True)+1e-12
N3=Ng[gid]
# tangents
T=np.zeros((len(V3),3)); B=np.zeros((len(V3),3))
p0,p1,p2=V3[F2[:,0]],V3[F2[:,1]],V3[F2[:,2]]; u0,u1,u2=UV2[F2[:,0]],UV2[F2[:,1]],UV2[F2[:,2]]
e1,e2=p1-p0,p2-p0; d1,d2=u1-u0,u2-u0
det=d1[:,0]*d2[:,1]-d2[:,0]*d1[:,1]; r=np.where(np.abs(det)<1e-12,0,1/np.where(np.abs(det)<1e-12,1,det))
tt=(e1*d2[:,1:2]-e2*d1[:,1:2])*r[:,None]; bb=(e2*d1[:,0:1]-e1*d2[:,0:1])*r[:,None]
for k in range(3): np.add.at(T,F2[:,k],tt); np.add.at(B,F2[:,k],bb)
T=T-N3*(T*N3).sum(1,keepdims=True); T/=np.linalg.norm(T,axis=1,keepdims=True)+1e-12
wsign=np.where((np.cross(N3,T)*B).sum(1)<0,-1.0,1.0)
TAN=np.concatenate([T,wsign[:,None]],1)
log('normals/tangents done')
# ---------------- AO bake ----------------
scene=o3d.t.geometry.RaycastingScene()
scene.add_triangles(o3d.core.Tensor(V3.astype(np.float32)),o3d.core.Tensor(F2.astype(np.uint32)))
K=96
# cosine-weighted hemisphere samples
u1s=rng.random((K,)); u2s=rng.random((K,))
rr=np.sqrt(u1s); phi=2*np.pi*u2s
loc=np.stack([rr*np.cos(phi),rr*np.sin(phi),np.sqrt(1-u1s)],1)
# per vertex frame
Nn=N3; up=np.where(np.abs(Nn[:,1:2])<0.9,np.array([[0,1,0.]]),np.array([[1,0,0.]]))
Tx=np.cross(up,Nn); Tx/=np.linalg.norm(Tx,axis=1,keepdims=True); Ty=np.cross(Nn,Tx)
dirs=loc[None,:,0:1]*Tx[:,None]+loc[None,:,1:2]*Ty[:,None]+loc[None,:,2:3]*Nn[:,None]   # (V,K,3)
orig=np.repeat((V3+Nn*2e-4)[:,None],K,1)
rays=o3d.core.Tensor(np.concatenate([orig,dirs],-1).reshape(-1,6).astype(np.float32))
hit=scene.cast_rays(rays)['t_hit'].numpy().reshape(len(V3),K)
maxd=0.6
occ=np.where(np.isfinite(hit),np.clip(1-hit/maxd,0,1),0)
ao=1-occ.mean(1)
# smooth AO over welded neighbors
aow=np.zeros(nw); np.add.at(aow,wid,ao); aow/=cnt; 
for _ in range(2): aow=(aow+(A@aow)/deg)/2
ao=aow[wid]
ao=np.clip(ao,0,1)**2.2
col=(0.15+0.85*ao)[:,None].repeat(3,1)
log('AO done: min',ao.min(),'mean',ao.mean())
# ---------------- write GLB ----------------
def png(arr,q=None):
    b=io.BytesIO(); Image.fromarray(arr).save(b,format='PNG',optimize=True); return b.getvalue()
def jpg(arr,q=92):
    b=io.BytesIO(); Image.fromarray(arr).save(b,format='JPEG',quality=q,subsampling=0); return b.getvalue()
imgs=[('base_color',jpg(base_img,94),'image/jpeg'),
      ('metallic_roughness',jpg((clamp(mr)*255).round().astype(np.uint8),90),'image/jpeg'),
      ('normal',jpg(normal_img,95),'image/jpeg'),
      ('clearcoat',jpg((clamp(cc)*255).round().astype(np.uint8),88),'image/jpeg')]
buf=bytearray(); views=[]; accs=[]
def add(data,target=None,stride=None):
    off=len(buf); buf.extend(data); 
    while len(buf)%4: buf.append(0)
    bv={'buffer':0,'byteOffset':off,'byteLength':len(data)}
    if target: bv['target']=target
    views.append(bv); return len(views)-1
def acc(arr,ctype,typ,target,minmax=False,norm=False):
    arr=np.ascontiguousarray(arr); bv=add(arr.tobytes(),target)
    a={'bufferView':bv,'componentType':ctype,'count':len(arr),'type':typ}
    if minmax: a['min']=arr.min(0).tolist(); a['max']=arr.max(0).tolist()
    accs.append(a); return len(accs)-1
UVg=UV2.copy(); UVg[:,1]=1-UVg[:,1]   # back to glTF convention
idx_type=5123 if len(V3)<65536 else 5125
i_pos=acc(V3.astype(np.float32),5126,'VEC3',34962,True)
i_nor=acc(N3.astype(np.float32),5126,'VEC3',34962)
i_tan=acc(TAN.astype(np.float32),5126,'VEC4',34962)
i_uv=acc(UVg.astype(np.float32),5126,'VEC2',34962)
i_col=acc(col.astype(np.float32),5126,'VEC3',34962)
i_idx=acc(F2.ravel().astype(np.uint16 if idx_type==5123 else np.uint32),idx_type,'SCALAR',34963)
img_json=[]
for name,data,mime in imgs:
    img_json.append({'bufferView':add(data),'mimeType':mime,'name':name})
sampler={'magFilter':9729,'minFilter':9987,'wrapS':10497,'wrapT':10497}
gltf={'asset':{'version':'2.0','generator':'tutu-realism-pipeline'},
 'extensionsUsed':['KHR_materials_clearcoat','KHR_materials_ior'],
 'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'HappyPandaHairGel'}],
 'meshes':[{'name':'tube','primitives':[{'attributes':{'POSITION':i_pos,'NORMAL':i_nor,'TANGENT':i_tan,'TEXCOORD_0':i_uv,'COLOR_0':i_col},'indices':i_idx,'material':0}]}],
 'materials':[{'name':'tube_material','doubleSided':True,
   'pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicRoughnessTexture':{'index':1},'metallicFactor':0.0,'roughnessFactor':1.0},
   'normalTexture':{'index':2,'scale':1.0},
   'extensions':{'KHR_materials_clearcoat':{'clearcoatFactor':1.0,'clearcoatTexture':{'index':3},'clearcoatRoughnessFactor':1.0,'clearcoatRoughnessTexture':{'index':3}},
                 'KHR_materials_ior':{'ior':1.48}}}],
 'textures':[{'sampler':0,'source':i} for i in range(4)],
 'images':img_json,'samplers':[sampler],
 'bufferViews':views,'accessors':accs,'buffers':[{'byteLength':len(buf)}]}
js=json.dumps(gltf,separators=(',',':')).encode()
while len(js)%4: js+=b' '
out=b'glTF'+struct.pack('<II',2,12+8+len(js)+8+len(buf))+struct.pack('<II',len(js),0x4E4F534A)+js+struct.pack('<II',len(buf),0x004E4942)+bytes(buf)
open('panda_realistic.glb','wb').write(out)
log('written panda_realistic.glb', len(out)/1e6,'MB; verts',len(V3),'faces',len(F2))
Image.fromarray(base_img).resize((768,768)).save('new_base.png')
Image.fromarray((clamp(mr)*255).astype(np.uint8)).resize((768,768)).save('new_mr.png')
Image.fromarray(normal_img).resize((768,768)).save('new_normal.png')
Image.fromarray(normal_img[900:1300,900:1300]).save('new_normal_crop.png')
