(()=>{var Xl=Object.create;var ma=Object.defineProperty;var ql=Object.getOwnPropertyDescriptor;var Yl=Object.getOwnPropertyNames;var Zl=Object.getPrototypeOf,Jl=Object.prototype.hasOwnProperty;var $l=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Kl=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Yl(t))!Jl.call(i,s)&&s!==e&&ma(i,s,{get:()=>t[s],enumerable:!(n=ql(t,s))||n.enumerable});return i};var jl=(i,t,e)=>(e=i!=null?Xl(Zl(i)):{},Kl(t||!i||!i.__esModule?ma(e,"default",{value:i,enumerable:!0}):e,i));var gl=$l((Zg,aa)=>{"use strict";aa.exports=br;aa.exports.default=br;function br(i,t,e){e=e||2;var n=t&&t.length,s=n?t[0]*e:i.length,r=fl(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;var o,c,l,h,u,f,m;if(n&&(r=Sg(i,t,r,e)),i.length>80*e){o=l=i[0],c=h=i[1];for(var _=e;_<s;_+=e)u=i[_],f=i[_+1],u<o&&(o=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);m=Math.max(l-o,h-c),m=m!==0?32767/m:0}return us(r,a,e,o,c,m,0),a}function fl(i,t,e,n,s){var r,a;if(s===oa(i,t,e,n)>0)for(r=t;r<e;r+=n)a=dl(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=dl(r,i[r],i[r+1],a);return a&&Er(a,a.next)&&(fs(a),a=a.next),a}function Qn(i,t){if(!i)return i;t||(t=i);var e=i,n;do if(n=!1,!e.steiner&&(Er(e,e.next)||ie(e.prev,e,e.next)===0)){if(fs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function us(i,t,e,n,s,r,a){if(i){!a&&r&&Ag(i,n,s,r);for(var o=i,c,l;i.prev!==i.next;){if(c=i.prev,l=i.next,r?vg(i,n,s,r):xg(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),fs(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=yg(Qn(i),t,e),us(i,t,e,n,s,r,2)):a===2&&Mg(i,t,e,n,s,r):us(Qn(i),t,e,n,s,r,1);break}}}}function xg(i){var t=i.prev,e=i,n=i.next;if(ie(t,e,n)>=0)return!1;for(var s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<c?o<l?o:l:c<l?c:l,f=s>r?s>a?s:a:r>a?r:a,m=o>c?o>l?o:l:c>l?c:l,_=n.next;_!==t;){if(_.x>=h&&_.x<=f&&_.y>=u&&_.y<=m&&ki(s,o,r,c,a,l,_.x,_.y)&&ie(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function vg(i,t,e,n){var s=i.prev,r=i,a=i.next;if(ie(s,r,a)>=0)return!1;for(var o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,f=a.y,m=o<c?o<l?o:l:c<l?c:l,_=h<u?h<f?h:f:u<f?u:f,x=o>c?o>l?o:l:c>l?c:l,p=h>u?h>f?h:f:u>f?u:f,d=sa(m,_,t,e,n),v=sa(x,p,t,e,n),g=i.prevZ,b=i.nextZ;g&&g.z>=d&&b&&b.z<=v;){if(g.x>=m&&g.x<=x&&g.y>=_&&g.y<=p&&g!==s&&g!==a&&ki(o,h,c,u,l,f,g.x,g.y)&&ie(g.prev,g,g.next)>=0||(g=g.prevZ,b.x>=m&&b.x<=x&&b.y>=_&&b.y<=p&&b!==s&&b!==a&&ki(o,h,c,u,l,f,b.x,b.y)&&ie(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;g&&g.z>=d;){if(g.x>=m&&g.x<=x&&g.y>=_&&g.y<=p&&g!==s&&g!==a&&ki(o,h,c,u,l,f,g.x,g.y)&&ie(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;b&&b.z<=v;){if(b.x>=m&&b.x<=x&&b.y>=_&&b.y<=p&&b!==s&&b!==a&&ki(o,h,c,u,l,f,b.x,b.y)&&ie(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function yg(i,t,e){var n=i;do{var s=n.prev,r=n.next.next;!Er(s,r)&&pl(s,n,n.next,r)&&ds(s,r)&&ds(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),fs(n),fs(n.next),n=i=r),n=n.next}while(n!==i);return Qn(n)}function Mg(i,t,e,n,s,r){var a=i;do{for(var o=a.next.next;o!==a.prev;){if(a.i!==o.i&&Pg(a,o)){var c=ml(a,o);a=Qn(a,a.next),c=Qn(c,c.next),us(a,t,e,n,s,r,0),us(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Sg(i,t,e,n){var s=[],r,a,o,c,l;for(r=0,a=t.length;r<a;r++)o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=fl(i,o,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Cg(l));for(s.sort(bg),r=0;r<s.length;r++)e=Eg(s[r],e);return e}function bg(i,t){return i.x-t.x}function Eg(i,t){var e=wg(i,t);if(!e)return t;var n=ml(e,i);return Qn(n,n.next),Qn(e,e.next)}function wg(i,t){var e=t,n=i.x,s=i.y,r=-1/0,a;do{if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){var o=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(o<=n&&o>r&&(r=o,a=e.x<e.next.x?e:e.next,o===n))return a}e=e.next}while(e!==t);if(!a)return null;var c=a,l=a.x,h=a.y,u=1/0,f;e=a;do n>=e.x&&e.x>=l&&n!==e.x&&ki(s<h?n:r,s,l,h,s<h?r:n,s,e.x,e.y)&&(f=Math.abs(s-e.y)/(n-e.x),ds(e,i)&&(f<u||f===u&&(e.x>a.x||e.x===a.x&&Tg(a,e)))&&(a=e,u=f)),e=e.next;while(e!==c);return a}function Tg(i,t){return ie(i.prev,i,t.prev)<0&&ie(t.next,i,i.next)<0}function Ag(i,t,e,n){var s=i;do s.z===0&&(s.z=sa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Rg(s)}function Rg(i){var t,e,n,s,r,a,o,c,l=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<l&&(o++,n=n.nextZ,!!n);t++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(a>1);return i}function sa(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Cg(i){var t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ki(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Pg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Lg(i,t)&&(ds(i,t)&&ds(t,i)&&Ig(i,t)&&(ie(i.prev,i,t.prev)||ie(i,t.prev,t))||Er(i,t)&&ie(i.prev,i,i.next)>0&&ie(t.prev,t,t.next)>0)}function ie(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Er(i,t){return i.x===t.x&&i.y===t.y}function pl(i,t,e,n){var s=Sr(ie(i,t,e)),r=Sr(ie(i,t,n)),a=Sr(ie(e,n,i)),o=Sr(ie(e,n,t));return!!(s!==r&&a!==o||s===0&&Mr(i,e,t)||r===0&&Mr(i,n,t)||a===0&&Mr(e,i,n)||o===0&&Mr(e,t,n))}function Mr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Sr(i){return i>0?1:i<0?-1:0}function Lg(i,t){var e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&pl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ds(i,t){return ie(i.prev,i,i.next)<0?ie(i,t,i.next)>=0&&ie(i,i.prev,t)>=0:ie(i,t,i.prev)<0||ie(i,i.next,t)<0}function Ig(i,t){var e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ml(i,t){var e=new ra(i.i,i.x,i.y),n=new ra(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function dl(i,t,e,n){var s=new ra(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ra(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}br.deviation=function(i,t,e,n){var s=t&&t.length,r=s?t[0]*e:i.length,a=Math.abs(oa(i,0,r,e));if(s)for(var o=0,c=t.length;o<c;o++){var l=t[o]*e,h=o<c-1?t[o+1]*e:i.length;a-=Math.abs(oa(i,l,h,e))}var u=0;for(o=0;o<n.length;o+=3){var f=n[o]*e,m=n[o+1]*e,_=n[o+2]*e;u+=Math.abs((i[f]-i[_])*(i[m+1]-i[f+1])-(i[f]-i[m])*(i[_+1]-i[f+1]))}return a===0&&u===0?0:Math.abs((u-a)/a)};function oa(i,t,e,n){for(var s=0,r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}br.flatten=function(i){for(var t=i[0][0].length,e={vertices:[],holes:[],dimensions:t},n=0,s=0;s<i.length;s++){for(var r=0;r<i[s].length;r++)for(var a=0;a<t;a++)e.vertices.push(i[s][r][a]);s>0&&(n+=i[s-1].length,e.holes.push(n))}return e}});var Ql=0,ga=1,th=2;var Gc=1,eh=2,cn=3,An=0,be=1,Le=2;var En=0,wi=1,Ri=2,_a=3,xa=4,nh=5,Wn=100,ih=101,sh=102,va=103,ya=104,rh=200,oh=201,ah=202,ch=203,lo=204,ho=205,lh=206,hh=207,uh=208,dh=209,fh=210,ph=211,mh=212,gh=213,_h=214,xh=0,vh=1,yh=2,qs=3,Mh=4,Sh=5,bh=6,Eh=7,Wc=0,wh=1,Th=2,wn=0,Ah=1,Rh=2,Ch=3,Ph=4,Lh=5,Ih=6;var Xc=300,Ci=301,Pi=302,uo=303,fo=304,_r=306,po=1e3,qe=1001,mo=1002,Re=1003,Ma=1004;var Ur=1005;var Be=1006,Uh=1007;var es=1008;var Tn=1009,Dh=1010,Nh=1011,$o=1012,qc=1013,Sn=1014,bn=1015,ns=1016,Yc=1017,Zc=1018,Yn=1020,Fh=1021,Ye=1023,Oh=1024,Bh=1025,Zn=1026,Li=1027,zh=1028,Jc=1029,kh=1030,$c=1031,Kc=1033,Dr=33776,Nr=33777,Fr=33778,Or=33779,Sa=35840,ba=35841,Ea=35842,wa=35843,jc=36196,Ta=37492,Aa=37496,Ra=37808,Ca=37809,Pa=37810,La=37811,Ia=37812,Ua=37813,Da=37814,Na=37815,Fa=37816,Oa=37817,Ba=37818,za=37819,ka=37820,Ha=37821,Br=36492,Va=36494,Ga=36495,Hh=36283,Wa=36284,Xa=36285,qa=36286;var Ys=2300,Zs=2301,zr=2302,Ya=2400,Za=2401,Ja=2402;var Qc=3e3,Jn=3001,Vh=3200,Gh=3201,Wh=0,Xh=1,ze="",xe="srgb",un="srgb-linear",Ko="display-p3",xr="display-p3-linear",Js="linear",jt="srgb",$s="rec709",Ks="p3";var ni=7680;var $a=519,qh=512,Yh=513,Zh=514,tl=515,Jh=516,$h=517,Kh=518,jh=519,go=35044;var Ka="300 es",_o=1035,ln=2e3,js=2001,Rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ja=1234567,Ki=Math.PI/180,is=180/Math.PI;function hn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function Ce(i,t,e){return Math.max(t,Math.min(e,i))}function jo(i,t){return(i%t+t)%t}function Qh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function tu(i,t,e){return i!==t?(e-i)/(t-i):0}function ji(i,t,e){return(1-e)*i+e*t}function eu(i,t,e,n){return ji(i,t,1-Math.exp(-e*n))}function nu(i,t=1){return t-Math.abs(jo(i,t*2)-t)}function iu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function su(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ru(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ou(i,t){return i+Math.random()*(t-i)}function au(i){return i*(.5-Math.random())}function cu(i){i!==void 0&&(ja=i);let t=ja+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function lu(i){return i*Ki}function hu(i){return i*is}function xo(i){return(i&i-1)===0&&i!==0}function uu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Qs(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function du(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),m=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*_,c*m,o*l);break;case"YXY":i.set(c*m,o*h,c*_,o*l);break;case"ZYZ":i.set(c*_,c*m,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var $e={DEG2RAD:Ki,RAD2DEG:is,generateUUID:hn,clamp:Ce,euclideanModulo:jo,mapLinear:Qh,inverseLerp:tu,lerp:ji,damp:eu,pingpong:nu,smoothstep:iu,smootherstep:su,randInt:ru,randFloat:ou,randFloatSpread:au,seededRandom:cu,degToRad:lu,radToDeg:hu,isPowerOfTwo:xo,ceilPowerOfTwo:uu,floorPowerOfTwo:Qs,setQuaternionFromProperEuler:du,normalize:qt,denormalize:Qe},Ot=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},kt=class i{constructor(t,e,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],m=n[5],_=n[8],x=s[0],p=s[3],d=s[6],v=s[1],g=s[4],b=s[7],R=s[2],A=s[5],E=s[8];return r[0]=a*x+o*v+c*R,r[3]=a*p+o*g+c*A,r[6]=a*d+o*b+c*E,r[1]=l*x+h*v+u*R,r[4]=l*p+h*g+u*A,r[7]=l*d+h*b+u*E,r[2]=f*x+m*v+_*R,r[5]=f*p+m*g+_*A,r[8]=f*d+m*b+_*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,m=l*r-a*c,_=e*u+n*f+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=m*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(kr.makeScale(t,e)),this}rotate(t){return this.premultiply(kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},kr=new kt;function el(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fu(){let i=tr("canvas");return i.style.display="block",i}var Qa={};function Qi(i){i in Qa||(Qa[i]=!0,console.warn(i))}var tc=new kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ec=new kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_s={[un]:{transfer:Js,primaries:$s,toReference:i=>i,fromReference:i=>i},[xe]:{transfer:jt,primaries:$s,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[xr]:{transfer:Js,primaries:Ks,toReference:i=>i.applyMatrix3(ec),fromReference:i=>i.applyMatrix3(tc)},[Ko]:{transfer:jt,primaries:Ks,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ec),fromReference:i=>i.applyMatrix3(tc).convertLinearToSRGB()}},pu=new Set([un,xr]),Yt={enabled:!0,_workingColorSpace:un,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!pu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=_s[t].toReference,s=_s[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return _s[i].primaries},getTransfer:function(i){return i===ze?Js:_s[i].transfer}};function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ii,er=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ii===void 0&&(ii=tr("canvas")),ii.width=t.width,ii.height=t.height;let n=ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=tr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ti(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ti(e[n]/255)*255):e[n]=Ti(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},mu=0,nr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=hn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vr(s[a].image)):r.push(Vr(s[a]))}else r=Vr(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Vr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?er.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gu=0,He=class i extends Rn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=qe,s=qe,r=Be,a=es,o=Ye,c=Tn,l=i.DEFAULT_ANISOTROPY,h=ze){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=hn(),this.name="",this.source=new nr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Jn?xe:ze),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case po:t.x=t.x-Math.floor(t.x);break;case qe:t.x=t.x<0?0:1;break;case mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case po:t.y=t.y-Math.floor(t.y);break;case qe:t.y=t.y<0?0:1;break;case mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===xe?Jn:Qc}set encoding(t){Qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Jn?xe:ze}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Xc;He.DEFAULT_ANISOTROPY=1;var ve=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],m=c[5],_=c[9],x=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let g=(l+1)/2,b=(m+1)/2,R=(d+1)/2,A=(h+f)/4,E=(u+x)/4,D=(_+p)/4;return g>b&&g>R?g<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(g),s=A/n,r=E/n):b>R?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=A/s,r=D/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=E/r,s=D/r),this.set(n,s,r,e),this}let v=Math.sqrt((p-_)*(p-_)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(u-x)/v,this.z=(f-h)/v,this.w=Math.acos((l+m+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},vo=class extends Rn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(Qi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Jn?xe:ze),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new He(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new nr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends vo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ir=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yo=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],m=r[a+1],_=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=_,t[e+3]=x;return}if(u!==x||c!==f||l!==m||h!==_){let p=1-o,d=c*f+l*m+h*_+u*x,v=d>=0?1:-1,g=1-d*d;if(g>Number.EPSILON){let R=Math.sqrt(g),A=Math.atan2(R,d*v);p=Math.sin(p*A)/R,o=Math.sin(o*A)/R}let b=o*v;if(c=c*p+f*b,l=l*p+m*b,h=h*p+_*b,u=u*p+x*b,p===1-o){let R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+h*u+c*m-l*f,t[e+1]=c*_+h*f+l*u-o*m,t[e+2]=l*_+h*m+o*f-c*u,t[e+3]=h*_-o*u-c*f-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),m=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*m*_,this._y=l*m*u-f*h*_,this._z=l*h*_+f*m*u,this._w=l*h*u-f*m*_;break;case"YXZ":this._x=f*h*u+l*m*_,this._y=l*m*u-f*h*_,this._z=l*h*_-f*m*u,this._w=l*h*u+f*m*_;break;case"ZXY":this._x=f*h*u-l*m*_,this._y=l*m*u+f*h*_,this._z=l*h*_+f*m*u,this._w=l*h*u-f*m*_;break;case"ZYX":this._x=f*h*u-l*m*_,this._y=l*m*u+f*h*_,this._z=l*h*_-f*m*u,this._w=l*h*u+f*m*_;break;case"YZX":this._x=f*h*u+l*m*_,this._y=l*m*u+f*h*_,this._z=l*h*_-f*m*u,this._w=l*h*u-f*m*_;break;case"XZY":this._x=f*h*u-l*m*_,this._y=l*m*u-f*h*_,this._z=l*h*_+f*m*u,this._w=l*h*u+f*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ce(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Gr.copy(this).projectOnVector(t),this.sub(Gr)}reflect(t){return this.sub(Gr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Gr=new N,nc=new Cn,fn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ve):Ve.fromBufferAttribute(r,a),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xs.copy(n.boundingBox)),xs.applyMatrix4(t.matrixWorld),this.union(xs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vi),vs.subVectors(this.max,Vi),si.subVectors(t.a,Vi),ri.subVectors(t.b,Vi),oi.subVectors(t.c,Vi),_n.subVectors(ri,si),xn.subVectors(oi,ri),zn.subVectors(si,oi);let e=[0,-_n.z,_n.y,0,-xn.z,xn.y,0,-zn.z,zn.y,_n.z,0,-_n.x,xn.z,0,-xn.x,zn.z,0,-zn.x,-_n.y,_n.x,0,-xn.y,xn.x,0,-zn.y,zn.x,0];return!Wr(e,si,ri,oi,vs)||(e=[1,0,0,0,1,0,0,0,1],!Wr(e,si,ri,oi,vs))?!1:(ys.crossVectors(_n,xn),e=[ys.x,ys.y,ys.z],Wr(e,si,ri,oi,vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},nn=[new N,new N,new N,new N,new N,new N,new N,new N],Ve=new N,xs=new fn,si=new N,ri=new N,oi=new N,_n=new N,xn=new N,zn=new N,Vi=new N,vs=new N,ys=new N,kn=new N;function Wr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){kn.fromArray(i,r);let o=s.x*Math.abs(kn.x)+s.y*Math.abs(kn.y)+s.z*Math.abs(kn.z),c=t.dot(kn),l=e.dot(kn),h=n.dot(kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var _u=new fn,Gi=new N,Xr=new N,Pn=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):_u.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gi.subVectors(t,this.center);let e=Gi.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Gi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gi.copy(t.center).add(Xr)),this.expandByPoint(Gi.copy(t.center).sub(Xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},sn=new N,qr=new N,Ms=new N,vn=new N,Yr=new N,Ss=new N,Zr=new N,ss=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){qr.copy(t).add(e).multiplyScalar(.5),Ms.copy(e).sub(t).normalize(),vn.copy(this.origin).sub(qr);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ms),o=vn.dot(this.direction),c=-vn.dot(Ms),l=vn.lengthSq(),h=Math.abs(1-a*a),u,f,m,_;if(h>0)if(u=a*c-o,f=a*o-c,_=r*h,u>=0)if(f>=-_)if(f<=_){let x=1/h;u*=x,f*=x,m=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;else f<=-_?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l):f<=_?(u=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(qr).addScaledVector(Ms,f),m}intersectSphere(t,e){sn.subVectors(t.center,this.origin);let n=sn.dot(this.direction),s=sn.dot(sn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,n,s,r){Yr.subVectors(e,t),Ss.subVectors(n,t),Zr.crossVectors(Yr,Ss);let a=this.direction.dot(Zr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vn.subVectors(this.origin,t);let c=o*this.direction.dot(Ss.crossVectors(vn,Ss));if(c<0)return null;let l=o*this.direction.dot(Yr.cross(vn));if(l<0||c+l>a)return null;let h=-o*vn.dot(Zr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class i{constructor(t,e,n,s,r,a,o,c,l,h,u,f,m,_,x,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,f,m,_,x,p)}set(t,e,n,s,r,a,o,c,l,h,u,f,m,_,x,p){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=_,d[11]=x,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ai.setFromMatrixColumn(t,0).length(),r=1/ai.setFromMatrixColumn(t,1).length(),a=1/ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,m=a*u,_=o*h,x=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=m+_*l,e[5]=f-x*l,e[9]=-o*c,e[2]=x-f*l,e[6]=_+m*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*h,m=c*u,_=l*h,x=l*u;e[0]=f+x*o,e[4]=_*o-m,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=m*o-_,e[6]=x+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*h,m=c*u,_=l*h,x=l*u;e[0]=f-x*o,e[4]=-a*u,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*h,m=a*u,_=o*h,x=o*u;e[0]=c*h,e[4]=_*l-m,e[8]=f*l+x,e[1]=c*u,e[5]=x*l+f,e[9]=m*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,m=a*l,_=o*c,x=o*l;e[0]=c*h,e[4]=x-f*u,e[8]=_*u+m,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=m*u+_,e[10]=f-x*u}else if(t.order==="XZY"){let f=a*c,m=a*l,_=o*c,x=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+x,e[5]=a*h,e[9]=m*u-_,e[2]=_*u-m,e[6]=o*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xu,t,vu)}lookAt(t,e,n){let s=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),yn.crossVectors(n,Ue),yn.lengthSq()===0&&(Math.abs(n.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),yn.crossVectors(n,Ue)),yn.normalize(),bs.crossVectors(Ue,yn),s[0]=yn.x,s[4]=bs.x,s[8]=Ue.x,s[1]=yn.y,s[5]=bs.y,s[9]=Ue.y,s[2]=yn.z,s[6]=bs.z,s[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],m=n[13],_=n[2],x=n[6],p=n[10],d=n[14],v=n[3],g=n[7],b=n[11],R=n[15],A=s[0],E=s[4],D=s[8],M=s[12],y=s[1],I=s[5],U=s[9],Y=s[13],C=s[2],P=s[6],k=s[10],X=s[14],q=s[3],V=s[7],Z=s[11],$=s[15];return r[0]=a*A+o*y+c*C+l*q,r[4]=a*E+o*I+c*P+l*V,r[8]=a*D+o*U+c*k+l*Z,r[12]=a*M+o*Y+c*X+l*$,r[1]=h*A+u*y+f*C+m*q,r[5]=h*E+u*I+f*P+m*V,r[9]=h*D+u*U+f*k+m*Z,r[13]=h*M+u*Y+f*X+m*$,r[2]=_*A+x*y+p*C+d*q,r[6]=_*E+x*I+p*P+d*V,r[10]=_*D+x*U+p*k+d*Z,r[14]=_*M+x*Y+p*X+d*$,r[3]=v*A+g*y+b*C+R*q,r[7]=v*E+g*I+b*P+R*V,r[11]=v*D+g*U+b*k+R*Z,r[15]=v*M+g*Y+b*X+R*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],m=t[14],_=t[3],x=t[7],p=t[11],d=t[15];return _*(+r*c*u-s*l*u-r*o*f+n*l*f+s*o*m-n*c*m)+x*(+e*c*m-e*l*f+r*a*f-s*a*m+s*l*h-r*c*h)+p*(+e*l*u-e*o*m-r*a*u+n*a*m+r*o*h-n*l*h)+d*(-s*o*h-e*c*u+e*o*f+s*a*u-n*a*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],m=t[11],_=t[12],x=t[13],p=t[14],d=t[15],v=u*p*l-x*f*l+x*c*m-o*p*m-u*c*d+o*f*d,g=_*f*l-h*p*l-_*c*m+a*p*m+h*c*d-a*f*d,b=h*x*l-_*u*l+_*o*m-a*x*m-h*o*d+a*u*d,R=_*u*c-h*x*c-_*o*f+a*x*f+h*o*p-a*u*p,A=e*v+n*g+s*b+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/A;return t[0]=v*E,t[1]=(x*f*r-u*p*r-x*s*m+n*p*m+u*s*d-n*f*d)*E,t[2]=(o*p*r-x*c*r+x*s*l-n*p*l-o*s*d+n*c*d)*E,t[3]=(u*c*r-o*f*r-u*s*l+n*f*l+o*s*m-n*c*m)*E,t[4]=g*E,t[5]=(h*p*r-_*f*r+_*s*m-e*p*m-h*s*d+e*f*d)*E,t[6]=(_*c*r-a*p*r-_*s*l+e*p*l+a*s*d-e*c*d)*E,t[7]=(a*f*r-h*c*r+h*s*l-e*f*l-a*s*m+e*c*m)*E,t[8]=b*E,t[9]=(_*u*r-h*x*r-_*n*m+e*x*m+h*n*d-e*u*d)*E,t[10]=(a*x*r-_*o*r+_*n*l-e*x*l-a*n*d+e*o*d)*E,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*m-e*o*m)*E,t[12]=R*E,t[13]=(h*x*s-_*u*s+_*n*f-e*x*f-h*n*p+e*u*p)*E,t[14]=(_*o*s-a*x*s-_*n*c+e*x*c+a*n*p-e*o*p)*E,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*f+e*o*f)*E,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,m=r*h,_=r*u,x=a*h,p=a*u,d=o*u,v=c*l,g=c*h,b=c*u,R=n.x,A=n.y,E=n.z;return s[0]=(1-(x+d))*R,s[1]=(m+b)*R,s[2]=(_-g)*R,s[3]=0,s[4]=(m-b)*A,s[5]=(1-(f+d))*A,s[6]=(p+v)*A,s[7]=0,s[8]=(_+g)*E,s[9]=(p-v)*E,s[10]=(1-(f+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ai.set(s[0],s[1],s[2]).length(),a=ai.set(s[4],s[5],s[6]).length(),o=ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ge.copy(this);let l=1/r,h=1/a,u=1/o;return Ge.elements[0]*=l,Ge.elements[1]*=l,Ge.elements[2]*=l,Ge.elements[4]*=h,Ge.elements[5]*=h,Ge.elements[6]*=h,Ge.elements[8]*=u,Ge.elements[9]*=u,Ge.elements[10]*=u,e.setFromRotationMatrix(Ge),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=ln){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),m,_;if(o===ln)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===js)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=ln){let c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*l,m=(n+s)*h,_,x;if(o===ln)_=(a+r)*u,x=-2*u;else if(o===js)_=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ai=new N,Ge=new Qt,xu=new N(0,0,0),vu=new N(1,1,1),yn=new N,bs=new N,Ue=new N,ic=new Qt,sc=new Cn,$n=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ce(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ce(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ce(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ic.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ic,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sc.setFromEuler(this),this.setFromQuaternion(sc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$n.DEFAULT_ORDER="XYZ";var rs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yu=0,rc=new N,ci=new Cn,rn=new Qt,Es=new N,Wi=new N,Mu=new N,Su=new Cn,oc=new N(1,0,0),ac=new N(0,1,0),cc=new N(0,0,1),bu={type:"added"},Eu={type:"removed"},Ne=class i extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new $n,n=new Cn,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new kt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.multiply(ci),this}rotateOnWorldAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.premultiply(ci),this}rotateX(t){return this.rotateOnAxis(oc,t)}rotateY(t){return this.rotateOnAxis(ac,t)}rotateZ(t){return this.rotateOnAxis(cc,t)}translateOnAxis(t,e){return rc.copy(t).applyQuaternion(this.quaternion),this.position.add(rc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oc,t)}translateY(t){return this.translateOnAxis(ac,t)}translateZ(t){return this.translateOnAxis(cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Es.copy(t):Es.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Wi,Es,this.up):rn.lookAt(Es,Wi,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),ci.setFromRotationMatrix(rn),this.quaternion.premultiply(ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(bu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Eu)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,t,Mu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,Su,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ne.DEFAULT_UP=new N(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var We=new N,on=new N,Jr=new N,an=new N,li=new N,hi=new N,lc=new N,$r=new N,Kr=new N,jr=new N,ws=!1,qn=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),We.subVectors(t,e),s.cross(We);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){We.subVectors(s,e),on.subVectors(n,e),Jr.subVectors(t,e);let a=We.dot(We),o=We.dot(on),c=We.dot(Jr),l=on.dot(on),h=on.dot(Jr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,m=(l*c-o*h)*f,_=(a*h-o*c)*f;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getUV(t,e,n,s,r,a,o,c){return ws===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ws=!0),this.getInterpolation(t,e,n,s,r,a,o,c)}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,an)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,an.x),c.addScaledVector(a,an.y),c.addScaledVector(o,an.z),c)}static isFrontFacing(t,e,n,s){return We.subVectors(n,e),on.subVectors(t,e),We.cross(on).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return We.subVectors(this.c,this.b),on.subVectors(this.a,this.b),We.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return ws===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ws=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;li.subVectors(s,n),hi.subVectors(r,n),$r.subVectors(t,n);let c=li.dot($r),l=hi.dot($r);if(c<=0&&l<=0)return e.copy(n);Kr.subVectors(t,s);let h=li.dot(Kr),u=hi.dot(Kr);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(li,a);jr.subVectors(t,r);let m=li.dot(jr),_=hi.dot(jr);if(_>=0&&m<=_)return e.copy(r);let x=m*l-c*_;if(x<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(hi,o);let p=h*_-m*u;if(p<=0&&u-h>=0&&m-_>=0)return lc.subVectors(r,s),o=(u-h)/(u-h+(m-_)),e.copy(s).addScaledVector(lc,o);let d=1/(p+x+f);return a=x*d,o=f*d,e.copy(n).addScaledVector(li,a).addScaledVector(hi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Qr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=jo(t,1),e=Ce(e,0,1),n=Ce(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Qr(a,r,t+1/3),this.g=Qr(a,r,t),this.b=Qr(a,r,t-1/3)}return Yt.toWorkingColorSpace(this,s),this}setStyle(t,e=xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xe){let n=nl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}copyLinearToSRGB(t){return this.r=Hr(t.r),this.g=Hr(t.g),this.b=Hr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xe){return Yt.fromWorkingColorSpace(Se.copy(this),t),Math.round(Ce(Se.r*255,0,255))*65536+Math.round(Ce(Se.g*255,0,255))*256+Math.round(Ce(Se.b*255,0,255))}getHexString(t=xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Se.copy(this),e);let n=Se.r,s=Se.g,r=Se.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=xe){Yt.fromWorkingColorSpace(Se.copy(this),t);let e=Se.r,n=Se.g,s=Se.b;return t!==xe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Mn),this.setHSL(Mn.h+t,Mn.s+e,Mn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mn),t.getHSL(Ts);let n=ji(Mn.h,Ts.h,e),s=ji(Mn.s,Ts.s,e),r=ji(Mn.l,Ts.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Se=new wt;wt.NAMES=nl;var wu=0,Ln=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=hn(),this.name="",this.type="Material",this.blending=wi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lo,this.blendDst=ho,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wt(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lo&&(n.blendSrc=this.blendSrc),this.blendDst!==ho&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$a&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},sr=class extends Ln{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var he=new N,As=new Ot,Zt=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=go,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)As.fromBufferAttribute(this,e),As.applyMatrix3(t),this.setXY(e,As.x,As.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Qe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Qe(e,this.array)),e}setX(t,e){return this.normalized&&(e=qt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Qe(e,this.array)),e}setY(t,e){return this.normalized&&(e=qt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Qe(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Qe(e,this.array)),e}setW(t,e){return this.normalized&&(e=qt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qt(e,this.array),n=qt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=qt(e,this.array),n=qt(n,this.array),s=qt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=qt(e,this.array),n=qt(n,this.array),s=qt(s,this.array),r=qt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==go&&(t.usage=this.usage),t}};var rr=class extends Zt{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var or=class extends Zt{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ge=class extends Zt{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Tu=0,Oe=new Qt,to=new Ne,ui=new N,De=new fn,Xi=new fn,me=new N,_e=class i extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(el(t)?or:rr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Oe.makeRotationFromQuaternion(t),this.applyMatrix4(Oe),this}rotateX(t){return Oe.makeRotationX(t),this.applyMatrix4(Oe),this}rotateY(t){return Oe.makeRotationY(t),this.applyMatrix4(Oe),this}rotateZ(t){return Oe.makeRotationZ(t),this.applyMatrix4(Oe),this}translate(t,e,n){return Oe.makeTranslation(t,e,n),this.applyMatrix4(Oe),this}scale(t,e,n){return Oe.makeScale(t,e,n),this.applyMatrix4(Oe),this}lookAt(t){return to.lookAt(t),to.updateMatrix(),this.applyMatrix4(to.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ge(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];De.setFromBufferAttribute(r),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,De.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,De.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(De.min),this.boundingBox.expandByPoint(De.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(De.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(De.min,Xi.min),De.expandByPoint(me),me.addVectors(De.max,Xi.max),De.expandByPoint(me)):(De.expandByPoint(Xi.min),De.expandByPoint(Xi.max))}De.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)me.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(me));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)me.fromBufferAttribute(o,l),c&&(ui.fromBufferAttribute(t,l),me.add(ui)),s=Math.max(s,n.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let y=0;y<o;y++)l[y]=new N,h[y]=new N;let u=new N,f=new N,m=new N,_=new Ot,x=new Ot,p=new Ot,d=new N,v=new N;function g(y,I,U){u.fromArray(s,y*3),f.fromArray(s,I*3),m.fromArray(s,U*3),_.fromArray(a,y*2),x.fromArray(a,I*2),p.fromArray(a,U*2),f.sub(u),m.sub(u),x.sub(_),p.sub(_);let Y=1/(x.x*p.y-p.x*x.y);isFinite(Y)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-x.y).multiplyScalar(Y),v.copy(m).multiplyScalar(x.x).addScaledVector(f,-p.x).multiplyScalar(Y),l[y].add(d),l[I].add(d),l[U].add(d),h[y].add(v),h[I].add(v),h[U].add(v))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let y=0,I=b.length;y<I;++y){let U=b[y],Y=U.start,C=U.count;for(let P=Y,k=Y+C;P<k;P+=3)g(n[P+0],n[P+1],n[P+2])}let R=new N,A=new N,E=new N,D=new N;function M(y){E.fromArray(r,y*3),D.copy(E);let I=l[y];R.copy(I),R.sub(E.multiplyScalar(E.dot(I))).normalize(),A.crossVectors(D,I);let Y=A.dot(h[y])<0?-1:1;c[y*4]=R.x,c[y*4+1]=R.y,c[y*4+2]=R.z,c[y*4+3]=Y}for(let y=0,I=b.length;y<I;++y){let U=b[y],Y=U.start,C=U.count;for(let P=Y,k=Y+C;P<k;P+=3)M(n[P+0]),M(n[P+1]),M(n[P+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,u=new N;if(t)for(let f=0,m=t.count;f<m;f+=3){let _=t.getX(f+0),x=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),m=0,_=0;for(let x=0,p=c.length;x<p;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*h;for(let d=0;d<h;d++)f[_++]=l[m++]}return new Zt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],m=t(f,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let m=l[u];h.push(m.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hc=new Qt,Hn=new ss,Rs=new Pn,uc=new N,di=new N,fi=new N,pi=new N,eo=new N,Cs=new N,Ps=new Ot,Ls=new Ot,Is=new Ot,dc=new N,fc=new N,pc=new N,Us=new N,Ds=new N,ce=class extends Ne{constructor(t=new _e,e=new sr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Cs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(eo.fromBufferAttribute(u,t),a?Cs.addScaledVector(eo,h):Cs.addScaledVector(eo.sub(e),h))}e.add(Cs)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(r),Hn.copy(t.ray).recast(t.near),!(Rs.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(Rs,uc)===null||Hn.origin.distanceToSquared(uc)>(t.far-t.near)**2))&&(hc.copy(r).invert(),Hn.copy(t.ray).applyMatrix4(hc),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hn)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=f.length;_<x;_++){let p=f[_],d=a[p.materialIndex],v=Math.max(p.start,m.start),g=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let b=v,R=g;b<R;b+=3){let A=o.getX(b),E=o.getX(b+1),D=o.getX(b+2);s=Ns(this,d,t,n,l,h,u,A,E,D),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=_,d=x;p<d;p+=3){let v=o.getX(p),g=o.getX(p+1),b=o.getX(p+2);s=Ns(this,a,t,n,l,h,u,v,g,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,x=f.length;_<x;_++){let p=f[_],d=a[p.materialIndex],v=Math.max(p.start,m.start),g=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let b=v,R=g;b<R;b+=3){let A=b,E=b+1,D=b+2;s=Ns(this,d,t,n,l,h,u,A,E,D),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let p=_,d=x;p<d;p+=3){let v=p,g=p+1,b=p+2;s=Ns(this,a,t,n,l,h,u,v,g,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Au(i,t,e,n,s,r,a,o){let c;if(t.side===be?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===An,o),c===null)return null;Ds.copy(o),Ds.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Ds);return l<e.near||l>e.far?null:{distance:l,point:Ds.clone(),object:i}}function Ns(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,di),i.getVertexPosition(c,fi),i.getVertexPosition(l,pi);let h=Au(i,t,e,n,di,fi,pi,Us);if(h){s&&(Ps.fromBufferAttribute(s,o),Ls.fromBufferAttribute(s,c),Is.fromBufferAttribute(s,l),h.uv=qn.getInterpolation(Us,di,fi,pi,Ps,Ls,Is,new Ot)),r&&(Ps.fromBufferAttribute(r,o),Ls.fromBufferAttribute(r,c),Is.fromBufferAttribute(r,l),h.uv1=qn.getInterpolation(Us,di,fi,pi,Ps,Ls,Is,new Ot),h.uv2=h.uv1),a&&(dc.fromBufferAttribute(a,o),fc.fromBufferAttribute(a,c),pc.fromBufferAttribute(a,l),h.normal=qn.getInterpolation(Us,di,fi,pi,dc,fc,pc,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new N,materialIndex:0};qn.getNormal(di,fi,pi,u.normal),h.face=u}return h}var le=class i extends _e{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(h,3)),this.setAttribute("uv",new ge(u,2));function _(x,p,d,v,g,b,R,A,E,D,M){let y=b/E,I=R/D,U=b/2,Y=R/2,C=A/2,P=E+1,k=D+1,X=0,q=0,V=new N;for(let Z=0;Z<k;Z++){let $=Z*I-Y;for(let j=0;j<P;j++){let z=j*y-U;V[x]=z*v,V[p]=$*g,V[d]=C,l.push(V.x,V.y,V.z),V[x]=0,V[p]=0,V[d]=A>0?1:-1,h.push(V.x,V.y,V.z),u.push(j/E),u.push(1-Z/D),X+=1}}for(let Z=0;Z<D;Z++)for(let $=0;$<E;$++){let j=f+$+P*Z,z=f+$+P*(Z+1),J=f+($+1)+P*(Z+1),rt=f+($+1)+P*Z;c.push(j,z,rt),c.push(z,J,rt),q+=6}o.addGroup(m,q,M),m+=q,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ii(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ae(i){let t={};for(let e=0;e<i.length;e++){let n=Ii(i[e]);for(let s in n)t[s]=n[s]}return t}function Ru(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function il(i){return i.getRenderTarget()===null?i.outputColorSpace:Yt.workingColorSpace}var Cu={clone:Ii,merge:Ae},Pu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ze=class extends Ln{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pu,this.fragmentShader=Lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ii(t.uniforms),this.uniformsGroups=Ru(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ar=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Pe=class extends ar{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ki*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ki*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},mi=-90,gi=1,Mo=class extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Pe(mi,gi,t,e);s.layers=this.layers,this.add(s);let r=new Pe(mi,gi,t,e);r.layers=this.layers,this.add(r);let a=new Pe(mi,gi,t,e);a.layers=this.layers,this.add(a);let o=new Pe(mi,gi,t,e);o.layers=this.layers,this.add(o);let c=new Pe(mi,gi,t,e);c.layers=this.layers,this.add(c);let l=new Pe(mi,gi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===js)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},cr=class extends He{constructor(t,e,n,s,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ci,super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},So=class extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(Qi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Jn?xe:ze),this.texture=new cr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Be}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new le(5,5,5),r=new Ze({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:be,blending:En});r.uniforms.tEquirect.value=e;let a=new ce(s,r),o=e.minFilter;return e.minFilter===es&&(e.minFilter=Be),new Mo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},no=new N,Iu=new N,Uu=new kt,Xe=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=no.subVectors(n,e).cross(Iu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(no),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Uu.getNormalMatrix(t),s=this.coplanarPoint(no).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vn=new Pn,Fs=new N,lr=class{constructor(t=new Xe,e=new Xe,n=new Xe,s=new Xe,r=new Xe,a=new Xe){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],m=s[8],_=s[9],x=s[10],p=s[11],d=s[12],v=s[13],g=s[14],b=s[15];if(n[0].setComponents(c-r,f-l,p-m,b-d).normalize(),n[1].setComponents(c+r,f+l,p+m,b+d).normalize(),n[2].setComponents(c+a,f+h,p+_,b+v).normalize(),n[3].setComponents(c-a,f-h,p-_,b-v).normalize(),n[4].setComponents(c-o,f-u,p-x,b-g).normalize(),e===ln)n[5].setComponents(c+o,f+u,p+x,b+g).normalize();else if(e===js)n[5].setComponents(o,u,x,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(t){return Vn.center.set(0,0,0),Vn.radius=.7071067811865476,Vn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Fs.x=s.normal.x>0?t.max.x:t.min.x,Fs.y=s.normal.y>0?t.max.y:t.min.y,Fs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function sl(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Du(i,t){let e=t.isWebGL2,n=new WeakMap;function s(l,h){let u=l.array,f=l.usage,m=u.byteLength,_=i.createBuffer();i.bindBuffer(h,_),i.bufferData(h,u,f),l.onUploadCallback();let x;if(u instanceof Float32Array)x=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=i.SHORT;else if(u instanceof Uint32Array)x=i.UNSIGNED_INT;else if(u instanceof Int32Array)x=i.INT;else if(u instanceof Int8Array)x=i.BYTE;else if(u instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:m}}function r(l,h,u){let f=h.array,m=h._updateRange,_=h.updateRanges;if(i.bindBuffer(u,l),m.count===-1&&_.length===0&&i.bufferSubData(u,0,f),_.length!==0){for(let x=0,p=_.length;x<p;x++){let d=_[x];e?i.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):i.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}m.count!==-1&&(e?i.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var os=class i extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,m=[],_=[],x=[],p=[];for(let d=0;d<h;d++){let v=d*f-a;for(let g=0;g<l;g++){let b=g*u-r;_.push(b,-v,0),x.push(0,0,1),p.push(g/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<o;v++){let g=v+l*d,b=v+l*(d+1),R=v+1+l*(d+1),A=v+1+l*d;m.push(g,b,A),m.push(b,R,A)}this.setIndex(m),this.setAttribute("position",new ge(_,3)),this.setAttribute("normal",new ge(x,3)),this.setAttribute("uv",new ge(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Nu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ou=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ku=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Xu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ju=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,td=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,sd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,od=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ud="gl_FragColor = linearToOutputTexel( gl_FragColor );",dd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,fd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,md=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Td=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ad=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Id=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ud=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Dd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Od=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Hd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,$d=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Kd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,jd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,of=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,af=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,uf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,df=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ff=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ef=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Af=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Df=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Nf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ff=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Vf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Gf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$f=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,np=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ip=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,op=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,up=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:Nu,alphahash_pars_fragment:Fu,alphamap_fragment:Ou,alphamap_pars_fragment:Bu,alphatest_fragment:zu,alphatest_pars_fragment:ku,aomap_fragment:Hu,aomap_pars_fragment:Vu,batching_pars_vertex:Gu,batching_vertex:Wu,begin_vertex:Xu,beginnormal_vertex:qu,bsdfs:Yu,iridescence_fragment:Zu,bumpmap_pars_fragment:Ju,clipping_planes_fragment:$u,clipping_planes_pars_fragment:Ku,clipping_planes_pars_vertex:ju,clipping_planes_vertex:Qu,color_fragment:td,color_pars_fragment:ed,color_pars_vertex:nd,color_vertex:id,common:sd,cube_uv_reflection_fragment:rd,defaultnormal_vertex:od,displacementmap_pars_vertex:ad,displacementmap_vertex:cd,emissivemap_fragment:ld,emissivemap_pars_fragment:hd,colorspace_fragment:ud,colorspace_pars_fragment:dd,envmap_fragment:fd,envmap_common_pars_fragment:pd,envmap_pars_fragment:md,envmap_pars_vertex:gd,envmap_physical_pars_fragment:Rd,envmap_vertex:_d,fog_vertex:xd,fog_pars_vertex:vd,fog_fragment:yd,fog_pars_fragment:Md,gradientmap_pars_fragment:Sd,lightmap_fragment:bd,lightmap_pars_fragment:Ed,lights_lambert_fragment:wd,lights_lambert_pars_fragment:Td,lights_pars_begin:Ad,lights_toon_fragment:Cd,lights_toon_pars_fragment:Pd,lights_phong_fragment:Ld,lights_phong_pars_fragment:Id,lights_physical_fragment:Ud,lights_physical_pars_fragment:Dd,lights_fragment_begin:Nd,lights_fragment_maps:Fd,lights_fragment_end:Od,logdepthbuf_fragment:Bd,logdepthbuf_pars_fragment:zd,logdepthbuf_pars_vertex:kd,logdepthbuf_vertex:Hd,map_fragment:Vd,map_pars_fragment:Gd,map_particle_fragment:Wd,map_particle_pars_fragment:Xd,metalnessmap_fragment:qd,metalnessmap_pars_fragment:Yd,morphcolor_vertex:Zd,morphnormal_vertex:Jd,morphtarget_pars_vertex:$d,morphtarget_vertex:Kd,normal_fragment_begin:jd,normal_fragment_maps:Qd,normal_pars_fragment:tf,normal_pars_vertex:ef,normal_vertex:nf,normalmap_pars_fragment:sf,clearcoat_normal_fragment_begin:rf,clearcoat_normal_fragment_maps:of,clearcoat_pars_fragment:af,iridescence_pars_fragment:cf,opaque_fragment:lf,packing:hf,premultiplied_alpha_fragment:uf,project_vertex:df,dithering_fragment:ff,dithering_pars_fragment:pf,roughnessmap_fragment:mf,roughnessmap_pars_fragment:gf,shadowmap_pars_fragment:_f,shadowmap_pars_vertex:xf,shadowmap_vertex:vf,shadowmask_pars_fragment:yf,skinbase_vertex:Mf,skinning_pars_vertex:Sf,skinning_vertex:bf,skinnormal_vertex:Ef,specularmap_fragment:wf,specularmap_pars_fragment:Tf,tonemapping_fragment:Af,tonemapping_pars_fragment:Rf,transmission_fragment:Cf,transmission_pars_fragment:Pf,uv_pars_fragment:Lf,uv_pars_vertex:If,uv_vertex:Uf,worldpos_vertex:Df,background_vert:Nf,background_frag:Ff,backgroundCube_vert:Of,backgroundCube_frag:Bf,cube_vert:zf,cube_frag:kf,depth_vert:Hf,depth_frag:Vf,distanceRGBA_vert:Gf,distanceRGBA_frag:Wf,equirect_vert:Xf,equirect_frag:qf,linedashed_vert:Yf,linedashed_frag:Zf,meshbasic_vert:Jf,meshbasic_frag:$f,meshlambert_vert:Kf,meshlambert_frag:jf,meshmatcap_vert:Qf,meshmatcap_frag:tp,meshnormal_vert:ep,meshnormal_frag:np,meshphong_vert:ip,meshphong_frag:sp,meshphysical_vert:rp,meshphysical_frag:op,meshtoon_vert:ap,meshtoon_frag:cp,points_vert:lp,points_frag:hp,shadow_vert:up,shadow_frag:dp,sprite_vert:fp,sprite_frag:pp},st={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},je={basic:{uniforms:Ae([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Ae([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new wt(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Ae([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Ae([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Ae([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new wt(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Ae([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Ae([st.points,st.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Ae([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Ae([st.common,st.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Ae([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Ae([st.sprite,st.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Ae([st.common,st.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Ae([st.lights,st.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};je.physical={uniforms:Ae([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};var Os={r:0,b:0,g:0};function mp(i,t,e,n,s,r,a){let o=new wt(0),c=r===!0?0:1,l,h,u=null,f=0,m=null;function _(p,d){let v=!1,g=d.isScene===!0?d.background:null;g&&g.isTexture&&(g=(d.backgroundBlurriness>0?e:t).get(g)),g===null?x(o,c):g&&g.isColor&&(x(g,1),v=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),g&&(g.isCubeTexture||g.mapping===_r)?(h===void 0&&(h=new ce(new le(1,1,1),new Ze({name:"BackgroundCubeMaterial",uniforms:Ii(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=g,h.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=Yt.getTransfer(g.colorSpace)!==jt,(u!==g||f!==g.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=g,f=g.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):g&&g.isTexture&&(l===void 0&&(l=new ce(new os(2,2),new Ze({name:"BackgroundMaterial",uniforms:Ii(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=g,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(g.colorSpace)!==jt,g.matrixAutoUpdate===!0&&g.updateMatrix(),l.material.uniforms.uvTransform.value.copy(g.matrix),(u!==g||f!==g.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=g,f=g.version,m=i.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function x(p,d){p.getRGB(Os,il(i)),n.buffers.color.setClear(Os.r,Os.g,Os.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),c=d,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,x(o,c)},render:_}}function gp(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null),l=c,h=!1;function u(C,P,k,X,q){let V=!1;if(a){let Z=x(X,k,P);l!==Z&&(l=Z,m(l.object)),V=d(C,X,k,q),V&&v(C,X,k,q)}else{let Z=P.wireframe===!0;(l.geometry!==X.id||l.program!==k.id||l.wireframe!==Z)&&(l.geometry=X.id,l.program=k.id,l.wireframe=Z,V=!0)}q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(V||h)&&(h=!1,D(C,P,k,X),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(C){return n.isWebGL2?i.bindVertexArray(C):r.bindVertexArrayOES(C)}function _(C){return n.isWebGL2?i.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function x(C,P,k){let X=k.wireframe===!0,q=o[C.id];q===void 0&&(q={},o[C.id]=q);let V=q[P.id];V===void 0&&(V={},q[P.id]=V);let Z=V[X];return Z===void 0&&(Z=p(f()),V[X]=Z),Z}function p(C){let P=[],k=[],X=[];for(let q=0;q<s;q++)P[q]=0,k[q]=0,X[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:X,object:C,attributes:{},index:null}}function d(C,P,k,X){let q=l.attributes,V=P.attributes,Z=0,$=k.getAttributes();for(let j in $)if($[j].location>=0){let J=q[j],rt=V[j];if(rt===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(rt=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(rt=C.instanceColor)),J===void 0||J.attribute!==rt||rt&&J.data!==rt.data)return!0;Z++}return l.attributesNum!==Z||l.index!==X}function v(C,P,k,X){let q={},V=P.attributes,Z=0,$=k.getAttributes();for(let j in $)if($[j].location>=0){let J=V[j];J===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(J=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(J=C.instanceColor));let rt={};rt.attribute=J,J&&J.data&&(rt.data=J.data),q[j]=rt,Z++}l.attributes=q,l.attributesNum=Z,l.index=X}function g(){let C=l.newAttributes;for(let P=0,k=C.length;P<k;P++)C[P]=0}function b(C){R(C,0)}function R(C,P){let k=l.newAttributes,X=l.enabledAttributes,q=l.attributeDivisors;k[C]=1,X[C]===0&&(i.enableVertexAttribArray(C),X[C]=1),q[C]!==P&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,P),q[C]=P)}function A(){let C=l.newAttributes,P=l.enabledAttributes;for(let k=0,X=P.length;k<X;k++)P[k]!==C[k]&&(i.disableVertexAttribArray(k),P[k]=0)}function E(C,P,k,X,q,V,Z){Z===!0?i.vertexAttribIPointer(C,P,k,q,V):i.vertexAttribPointer(C,P,k,X,q,V)}function D(C,P,k,X){if(n.isWebGL2===!1&&(C.isInstancedMesh||X.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;g();let q=X.attributes,V=k.getAttributes(),Z=P.defaultAttributeValues;for(let $ in V){let j=V[$];if(j.location>=0){let z=q[$];if(z===void 0&&($==="instanceMatrix"&&C.instanceMatrix&&(z=C.instanceMatrix),$==="instanceColor"&&C.instanceColor&&(z=C.instanceColor)),z!==void 0){let J=z.normalized,rt=z.itemSize,dt=e.get(z);if(dt===void 0)continue;let ft=dt.buffer,yt=dt.type,xt=dt.bytesPerElement,ht=n.isWebGL2===!0&&(yt===i.INT||yt===i.UNSIGNED_INT||z.gpuType===qc);if(z.isInterleavedBufferAttribute){let Ut=z.data,O=Ut.stride,oe=z.offset;if(Ut.isInstancedInterleavedBuffer){for(let gt=0;gt<j.locationSize;gt++)R(j.location+gt,Ut.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Ut.meshPerAttribute*Ut.count)}else for(let gt=0;gt<j.locationSize;gt++)b(j.location+gt);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let gt=0;gt<j.locationSize;gt++)E(j.location+gt,rt/j.locationSize,yt,J,O*xt,(oe+rt/j.locationSize*gt)*xt,ht)}else{if(z.isInstancedBufferAttribute){for(let Ut=0;Ut<j.locationSize;Ut++)R(j.location+Ut,z.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Ut=0;Ut<j.locationSize;Ut++)b(j.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Ut=0;Ut<j.locationSize;Ut++)E(j.location+Ut,rt/j.locationSize,yt,J,rt*xt,rt/j.locationSize*Ut*xt,ht)}}else if(Z!==void 0){let J=Z[$];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(j.location,J);break;case 3:i.vertexAttrib3fv(j.location,J);break;case 4:i.vertexAttrib4fv(j.location,J);break;default:i.vertexAttrib1fv(j.location,J)}}}}A()}function M(){U();for(let C in o){let P=o[C];for(let k in P){let X=P[k];for(let q in X)_(X[q].object),delete X[q];delete P[k]}delete o[C]}}function y(C){if(o[C.id]===void 0)return;let P=o[C.id];for(let k in P){let X=P[k];for(let q in X)_(X[q].object),delete X[q];delete P[k]}delete o[C.id]}function I(C){for(let P in o){let k=o[P];if(k[C.id]===void 0)continue;let X=k[C.id];for(let q in X)_(X[q].object),delete X[q];delete k[C.id]}}function U(){Y(),h=!0,l!==c&&(l=c,m(l.object))}function Y(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:U,resetDefaultState:Y,dispose:M,releaseStatesOfGeometry:y,releaseStatesOfProgram:I,initAttributes:g,enableAttribute:b,disableUnusedAttributes:A}}function _p(i,t,e,n){let s=n.isWebGL2,r;function a(h){r=h}function o(h,u){i.drawArrays(r,h,u),e.update(u,r,1)}function c(h,u,f){if(f===0)return;let m,_;if(s)m=i,_="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](r,h,u,f),e.update(u,r,f)}function l(h,u,f){if(f===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<f;_++)this.render(h[_],u[_]);else{m.multiDrawArraysWEBGL(r,h,0,u,0,f);let _=0;for(let x=0;x<f;x++)_+=u[x];e.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function xp(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),g=f>0,b=a||t.has("OES_texture_float"),R=g&&b,A=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:b,floatVertexTextures:R,maxSamples:A}}function vp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Xe,o=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let m=u.length!==0||f||n!==0||s;return s=f,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,m){let _=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||_===null||_.length===0||r&&!p)r?h(null):l();else{let v=r?0:n,g=v*4,b=d.clippingState||null;c.value=b,b=h(_,f,g,m);for(let R=0;R!==g;++R)b[R]=e[R];d.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,m,_){let x=u!==null?u.length:0,p=null;if(x!==0){if(p=c.value,_!==!0||p===null){let d=m+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<d)&&(p=new Float32Array(d));for(let g=0,b=m;g!==x;++g,b+=4)a.copy(u[g]).applyMatrix4(v,o),a.normal.toArray(p,b),p[b+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function yp(i){let t=new WeakMap;function e(a,o){return o===uo?a.mapping=Ci:o===fo&&(a.mapping=Pi),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===uo||o===fo)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new So(c.height/2);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var bo=class extends ar{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},bi=4,mc=[.125,.215,.35,.446,.526,.582],Xn=20,io=new bo,gc=new wt,so=null,ro=0,oo=0,Gn=(1+Math.sqrt(5))/2,_i=1/Gn,_c=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Gn,_i),new N(0,Gn,-_i),new N(_i,0,Gn),new N(-_i,0,Gn),new N(Gn,_i,0),new N(-Gn,_i,0)],hr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){so=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(so,ro,oo),t.scissorTest=!1,Bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ci||t.mapping===Pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),so=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:ns,format:Ye,colorSpace:un,depthBuffer:!1},s=xc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mp(r)),this._blurMaterial=Sp(r,t,e)}return s}_compileMaterial(t){let e=new ce(this._lodPlanes[0],t);this._renderer.compile(e,io)}_sceneToCubeUV(t,e,n,s){let o=new Pe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(gc),h.toneMapping=wn,h.autoClear=!1;let m=new sr({name:"PMREM.Background",side:be,depthWrite:!1,depthTest:!1}),_=new ce(new le,m),x=!1,p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,x=!0):(m.color.copy(gc),x=!0);for(let d=0;d<6;d++){let v=d%3;v===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):v===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));let g=this._cubeSize;Bs(s,v*g,d>2?g:0,g,g),h.setRenderTarget(s),x&&h.render(_,o),h.render(t,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ci||t.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ce(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Bs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,io)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=_c[(s-1)%_c.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ce(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Xn-1),x=r/_,p=isFinite(r)?1+Math.floor(h*x):Xn;p>Xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Xn}`);let d=[],v=0;for(let E=0;E<Xn;++E){let D=E/x,M=Math.exp(-D*D/2);d.push(M),E===0?v+=M:E<p&&(v+=2*M)}for(let E=0;E<d.length;E++)d[E]=d[E]/v;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:g}=this;f.dTheta.value=_,f.mipInt.value=g-n;let b=this._sizeLods[s],R=3*b*(s>g-bi?s-g+bi:0),A=4*(this._cubeSize-b);Bs(e,R,A,3*b,2*b),c.setRenderTarget(e),c.render(u,io)}};function Mp(i){let t=[],e=[],n=[],s=i,r=i-bi+1+mc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-bi?c=mc[a-i+bi-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,_=6,x=3,p=2,d=1,v=new Float32Array(x*_*m),g=new Float32Array(p*_*m),b=new Float32Array(d*_*m);for(let A=0;A<m;A++){let E=A%3*2/3-1,D=A>2?0:-1,M=[E,D,0,E+2/3,D,0,E+2/3,D+1,0,E,D,0,E+2/3,D+1,0,E,D+1,0];v.set(M,x*_*A),g.set(f,p*_*A);let y=[A,A,A,A,A,A];b.set(y,d*_*A)}let R=new _e;R.setAttribute("position",new Zt(v,x)),R.setAttribute("uv",new Zt(g,p)),R.setAttribute("faceIndex",new Zt(b,d)),t.push(R),s>bi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xc(i,t,e){let n=new dn(i,t,e);return n.texture.mapping=_r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Sp(i,t,e){let n=new Float32Array(Xn),s=new N(0,1,0);return new Ze({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function vc(){return new Ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function yc(){return new Ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Qo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===uo||c===fo,h=c===Ci||c===Pi;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new hr(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new hr(i));let f=l?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ep(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function wp(i,t,e,n){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let _ in f.attributes)t.remove(f.attributes[_]);for(let _ in f.morphAttributes){let x=f.morphAttributes[_];for(let p=0,d=x.length;p<d;p++)t.remove(x[p])}f.removeEventListener("dispose",a),delete s[f.id];let m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let _ in f)t.update(f[_],i.ARRAY_BUFFER);let m=u.morphAttributes;for(let _ in m){let x=m[_];for(let p=0,d=x.length;p<d;p++)t.update(x[p],i.ARRAY_BUFFER)}}function l(u){let f=[],m=u.index,_=u.attributes.position,x=0;if(m!==null){let v=m.array;x=m.version;for(let g=0,b=v.length;g<b;g+=3){let R=v[g+0],A=v[g+1],E=v[g+2];f.push(R,A,A,E,E,R)}}else if(_!==void 0){let v=_.array;x=_.version;for(let g=0,b=v.length/3-1;g<b;g+=3){let R=g+0,A=g+1,E=g+2;f.push(R,A,A,E,E,R)}}else return;let p=new(el(f)?or:rr)(f,1);p.version=x;let d=r.get(u);d&&t.remove(d),r.set(u,p)}function h(u){let f=r.get(u);if(f){let m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Tp(i,t,e,n){let s=n.isWebGL2,r;function a(m){r=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function h(m,_){i.drawElements(r,_,o,m*c),e.update(_,r,1)}function u(m,_,x){if(x===0)return;let p,d;if(s)p=i,d="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,_,o,m*c,x),e.update(_,r,x)}function f(m,_,x){if(x===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<x;d++)this.render(m[d]/c,_[d]);else{p.multiDrawElementsWEBGL(r,_,0,o,m,0,x);let d=0;for(let v=0;v<x;v++)d+=_[v];e.update(d,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function Ap(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Rp(i,t){return i[0]-t[0]}function Cp(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Pp(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,a=new ve,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(t.isWebGL2===!0){let m=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=m!==void 0?m.length:0,x=r.get(h);if(x===void 0||x.count!==_){let C=function(){U.dispose(),r.delete(h),h.removeEventListener("dispose",C)};x!==void 0&&x.texture.dispose();let v=h.morphAttributes.position!==void 0,g=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,R=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],E=h.morphAttributes.color||[],D=0;v===!0&&(D=1),g===!0&&(D=2),b===!0&&(D=3);let M=h.attributes.position.count*D,y=1;M>t.maxTextureSize&&(y=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let I=new Float32Array(M*y*4*_),U=new ir(I,M,y,_);U.type=bn,U.needsUpdate=!0;let Y=D*4;for(let P=0;P<_;P++){let k=R[P],X=A[P],q=E[P],V=M*y*4*P;for(let Z=0;Z<k.count;Z++){let $=Z*Y;v===!0&&(a.fromBufferAttribute(k,Z),I[V+$+0]=a.x,I[V+$+1]=a.y,I[V+$+2]=a.z,I[V+$+3]=0),g===!0&&(a.fromBufferAttribute(X,Z),I[V+$+4]=a.x,I[V+$+5]=a.y,I[V+$+6]=a.z,I[V+$+7]=0),b===!0&&(a.fromBufferAttribute(q,Z),I[V+$+8]=a.x,I[V+$+9]=a.y,I[V+$+10]=a.z,I[V+$+11]=q.itemSize===4?a.w:1)}}x={count:_,texture:U,size:new Ot(M,y)},r.set(h,x),h.addEventListener("dispose",C)}let p=0;for(let v=0;v<f.length;v++)p+=f[v];let d=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",d),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",x.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let m=f===void 0?0:f.length,_=n[h.id];if(_===void 0||_.length!==m){_=[];for(let g=0;g<m;g++)_[g]=[g,0];n[h.id]=_}for(let g=0;g<m;g++){let b=_[g];b[0]=g,b[1]=f[g]}_.sort(Cp);for(let g=0;g<8;g++)g<m&&_[g][1]?(o[g][0]=_[g][0],o[g][1]=_[g][1]):(o[g][0]=Number.MAX_SAFE_INTEGER,o[g][1]=0);o.sort(Rp);let x=h.morphAttributes.position,p=h.morphAttributes.normal,d=0;for(let g=0;g<8;g++){let b=o[g],R=b[0],A=b[1];R!==Number.MAX_SAFE_INTEGER&&A?(x&&h.getAttribute("morphTarget"+g)!==x[R]&&h.setAttribute("morphTarget"+g,x[R]),p&&h.getAttribute("morphNormal"+g)!==p[R]&&h.setAttribute("morphNormal"+g,p[R]),s[g]=A,d+=A):(x&&h.hasAttribute("morphTarget"+g)===!0&&h.deleteAttribute("morphTarget"+g),p&&h.hasAttribute("morphNormal"+g)===!0&&h.deleteAttribute("morphNormal"+g),s[g]=0)}let v=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",v),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Lp(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}var ur=class extends He{constructor(t,e,n,s,r,a,o,c,l,h){if(h=h!==void 0?h:Zn,h!==Zn&&h!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zn&&(n=Sn),n===void 0&&h===Li&&(n=Yn),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Re,this.minFilter=c!==void 0?c:Re,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},rl=new He,ol=new ur(1,1);ol.compareFunction=tl;var al=new ir,cl=new yo,ll=new cr,Mc=[],Sc=[],bc=new Float32Array(16),Ec=new Float32Array(9),wc=new Float32Array(4);function Oi(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Mc[s];if(r===void 0&&(r=new Float32Array(s),Mc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vr(i,t){let e=Sc[t];e===void 0&&(e=new Int32Array(t),Sc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ip(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Up(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function Dp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function Np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function Fp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;wc.set(n),i.uniformMatrix2fv(this.addr,!1,wc),de(e,n)}}function Op(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;Ec.set(n),i.uniformMatrix3fv(this.addr,!1,Ec),de(e,n)}}function Bp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;bc.set(n),i.uniformMatrix4fv(this.addr,!1,bc),de(e,n)}}function zp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function Hp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function Vp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function Gp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function Xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function qp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function Yp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?ol:rl;e.setTexture2D(t||r,s)}function Zp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||cl,s)}function Jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ll,s)}function $p(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||al,s)}function Kp(i){switch(i){case 5126:return Ip;case 35664:return Up;case 35665:return Dp;case 35666:return Np;case 35674:return Fp;case 35675:return Op;case 35676:return Bp;case 5124:case 35670:return zp;case 35667:case 35671:return kp;case 35668:case 35672:return Hp;case 35669:case 35673:return Vp;case 5125:return Gp;case 36294:return Wp;case 36295:return Xp;case 36296:return qp;case 35678:case 36198:case 36298:case 36306:case 35682:return Yp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return $p}}function jp(i,t){i.uniform1fv(this.addr,t)}function Qp(i,t){let e=Oi(t,this.size,2);i.uniform2fv(this.addr,e)}function tm(i,t){let e=Oi(t,this.size,3);i.uniform3fv(this.addr,e)}function em(i,t){let e=Oi(t,this.size,4);i.uniform4fv(this.addr,e)}function nm(i,t){let e=Oi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function im(i,t){let e=Oi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function sm(i,t){let e=Oi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function rm(i,t){i.uniform1iv(this.addr,t)}function om(i,t){i.uniform2iv(this.addr,t)}function am(i,t){i.uniform3iv(this.addr,t)}function cm(i,t){i.uniform4iv(this.addr,t)}function lm(i,t){i.uniform1uiv(this.addr,t)}function hm(i,t){i.uniform2uiv(this.addr,t)}function um(i,t){i.uniform3uiv(this.addr,t)}function dm(i,t){i.uniform4uiv(this.addr,t)}function fm(i,t,e){let n=this.cache,s=t.length,r=vr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||rl,r[a])}function pm(i,t,e){let n=this.cache,s=t.length,r=vr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||cl,r[a])}function mm(i,t,e){let n=this.cache,s=t.length,r=vr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ll,r[a])}function gm(i,t,e){let n=this.cache,s=t.length,r=vr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||al,r[a])}function _m(i){switch(i){case 5126:return jp;case 35664:return Qp;case 35665:return tm;case 35666:return em;case 35674:return nm;case 35675:return im;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return om;case 35668:case 35672:return am;case 35669:case 35673:return cm;case 5125:return lm;case 36294:return hm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return fm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return gm}}var Eo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kp(e.type)}},wo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=_m(e.type)}},To=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},ao=/(\w+)(\])?(\[|\.)?/g;function Tc(i,t){i.seq.push(t),i.map[t.id]=t}function xm(i,t,e){let n=i.name,s=n.length;for(ao.lastIndex=0;;){let r=ao.exec(n),a=ao.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Tc(e,l===void 0?new Eo(o,i,t):new wo(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new To(o),Tc(e,u)),e=u}}}var Ai=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);xm(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Ac(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var vm=37297,ym=0;function Mm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Sm(i){let t=Yt.getPrimaries(Yt.workingColorSpace),e=Yt.getPrimaries(i),n;switch(t===e?n="":t===Ks&&e===$s?n="LinearDisplayP3ToLinearSRGB":t===$s&&e===Ks&&(n="LinearSRGBToLinearDisplayP3"),i){case un:case xr:return[n,"LinearTransferOETF"];case xe:case Ko:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Rc(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Mm(i.getShaderSource(t),a)}else return s}function bm(i,t){let e=Sm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Em(i,t){let e;switch(t){case Ah:e="Linear";break;case Rh:e="Reinhard";break;case Ch:e="OptimizedCineon";break;case Ph:e="ACESFilmic";break;case Ih:e="AgX";break;case Lh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function wm(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ei).join(`
`)}function Tm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ei).join(`
`)}function Am(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ei(i){return i!==""}function Cc(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ao(i){return i.replace(Cm,Lm)}var Pm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Lm(i,t){let e=Nt[t];if(e===void 0){let n=Pm.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ao(e)}var Im=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lc(i){return i.replace(Im,Um)}function Um(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ic(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Dm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Gc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===eh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===cn&&(t="SHADOWMAP_TYPE_VSM"),t}function Nm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ci:case Pi:t="ENVMAP_TYPE_CUBE";break;case _r:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Fm(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Pi&&(t="ENVMAP_MODE_REFRACTION"),t}function Om(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wc:t="ENVMAP_BLENDING_MULTIPLY";break;case wh:t="ENVMAP_BLENDING_MIX";break;case Th:t="ENVMAP_BLENDING_ADD";break}return t}function Bm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function zm(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Dm(e),l=Nm(e),h=Fm(e),u=Om(e),f=Bm(e),m=e.isWebGL2?"":wm(e),_=Tm(e),x=Am(r),p=s.createProgram(),d,v,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ei).join(`
`),d.length>0&&(d+=`
`),v=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ei).join(`
`),v.length>0&&(v+=`
`)):(d=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ei).join(`
`),v=[m,Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wn?"#define TONE_MAPPING":"",e.toneMapping!==wn?Nt.tonemapping_pars_fragment:"",e.toneMapping!==wn?Em("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,bm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ei).join(`
`)),a=Ao(a),a=Cc(a,e),a=Pc(a,e),o=Ao(o),o=Cc(o,e),o=Pc(o,e),a=Lc(a),o=Lc(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,d=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,v=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let b=g+d+a,R=g+v+o,A=Ac(s,s.VERTEX_SHADER,b),E=Ac(s,s.FRAGMENT_SHADER,R);s.attachShader(p,A),s.attachShader(p,E),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function D(U){if(i.debug.checkShaderErrors){let Y=s.getProgramInfoLog(p).trim(),C=s.getShaderInfoLog(A).trim(),P=s.getShaderInfoLog(E).trim(),k=!0,X=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,A,E);else{let q=Rc(s,A,"vertex"),V=Rc(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+q+`
`+V)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(C===""||P==="")&&(X=!1);X&&(U.diagnostics={runnable:k,programLog:Y,vertexShader:{log:C,prefix:d},fragmentShader:{log:P,prefix:v}})}s.deleteShader(A),s.deleteShader(E),M=new Ai(s,p),y=Rm(s,p)}let M;this.getUniforms=function(){return M===void 0&&D(this),M};let y;this.getAttributes=function(){return y===void 0&&D(this),y};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(p,vm)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ym++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=E,this}var km=0,Ro=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Co(t),e.set(t,n)),n}},Co=class{constructor(t){this.id=km++,this.code=t,this.usedTimes=0}};function Hm(i,t,e,n,s,r,a){let o=new rs,c=new Ro,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures,m=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function p(M,y,I,U,Y){let C=U.fog,P=Y.geometry,k=M.isMeshStandardMaterial?U.environment:null,X=(M.isMeshStandardMaterial?e:t).get(M.envMap||k),q=X&&X.mapping===_r?X.image.height:null,V=_[M.type];M.precision!==null&&(m=s.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));let Z=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,$=Z!==void 0?Z.length:0,j=0;P.morphAttributes.position!==void 0&&(j=1),P.morphAttributes.normal!==void 0&&(j=2),P.morphAttributes.color!==void 0&&(j=3);let z,J,rt,dt;if(V){let Ee=je[V];z=Ee.vertexShader,J=Ee.fragmentShader}else z=M.vertexShader,J=M.fragmentShader,c.update(M),rt=c.getVertexShaderID(M),dt=c.getFragmentShaderID(M);let ft=i.getRenderTarget(),yt=Y.isInstancedMesh===!0,xt=Y.isBatchedMesh===!0,ht=!!M.map,Ut=!!M.matcap,O=!!X,oe=!!M.aoMap,gt=!!M.lightMap,Tt=!!M.bumpMap,nt=!!M.normalMap,Vt=!!M.displacementMap,bt=!!M.emissiveMap,T=!!M.metalnessMap,S=!!M.roughnessMap,B=M.anisotropy>0,Q=M.clearcoat>0,K=M.iridescence>0,et=M.sheen>0,mt=M.transmission>0,ot=B&&!!M.anisotropyMap,ut=Q&&!!M.clearcoatMap,Mt=Q&&!!M.clearcoatNormalMap,Lt=Q&&!!M.clearcoatRoughnessMap,tt=K&&!!M.iridescenceMap,Xt=K&&!!M.iridescenceThicknessMap,Ht=et&&!!M.sheenColorMap,Ct=et&&!!M.sheenRoughnessMap,vt=!!M.specularMap,pt=!!M.specularColorMap,Dt=!!M.specularIntensityMap,Wt=mt&&!!M.transmissionMap,se=mt&&!!M.thicknessMap,Bt=!!M.gradientMap,it=!!M.alphaMap,L=M.alphaTest>0,at=!!M.alphaHash,ct=!!M.extensions,At=!!P.attributes.uv1,St=!!P.attributes.uv2,Jt=!!P.attributes.uv3,$t=wn;return M.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&($t=i.toneMapping),{isWebGL2:h,shaderID:V,shaderType:M.type,shaderName:M.name,vertexShader:z,fragmentShader:J,defines:M.defines,customVertexShaderID:rt,customFragmentShaderID:dt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:xt,instancing:yt,instancingColor:yt&&Y.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:un,map:ht,matcap:Ut,envMap:O,envMapMode:O&&X.mapping,envMapCubeUVHeight:q,aoMap:oe,lightMap:gt,bumpMap:Tt,normalMap:nt,displacementMap:f&&Vt,emissiveMap:bt,normalMapObjectSpace:nt&&M.normalMapType===Xh,normalMapTangentSpace:nt&&M.normalMapType===Wh,metalnessMap:T,roughnessMap:S,anisotropy:B,anisotropyMap:ot,clearcoat:Q,clearcoatMap:ut,clearcoatNormalMap:Mt,clearcoatRoughnessMap:Lt,iridescence:K,iridescenceMap:tt,iridescenceThicknessMap:Xt,sheen:et,sheenColorMap:Ht,sheenRoughnessMap:Ct,specularMap:vt,specularColorMap:pt,specularIntensityMap:Dt,transmission:mt,transmissionMap:Wt,thicknessMap:se,gradientMap:Bt,opaque:M.transparent===!1&&M.blending===wi,alphaMap:it,alphaTest:L,alphaHash:at,combine:M.combine,mapUv:ht&&x(M.map.channel),aoMapUv:oe&&x(M.aoMap.channel),lightMapUv:gt&&x(M.lightMap.channel),bumpMapUv:Tt&&x(M.bumpMap.channel),normalMapUv:nt&&x(M.normalMap.channel),displacementMapUv:Vt&&x(M.displacementMap.channel),emissiveMapUv:bt&&x(M.emissiveMap.channel),metalnessMapUv:T&&x(M.metalnessMap.channel),roughnessMapUv:S&&x(M.roughnessMap.channel),anisotropyMapUv:ot&&x(M.anisotropyMap.channel),clearcoatMapUv:ut&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Mt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Lt&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Xt&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&x(M.sheenRoughnessMap.channel),specularMapUv:vt&&x(M.specularMap.channel),specularColorMapUv:pt&&x(M.specularColorMap.channel),specularIntensityMapUv:Dt&&x(M.specularIntensityMap.channel),transmissionMapUv:Wt&&x(M.transmissionMap.channel),thicknessMapUv:se&&x(M.thicknessMap.channel),alphaMapUv:it&&x(M.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(nt||B),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,vertexUv1s:At,vertexUv2s:St,vertexUv3s:Jt,pointsUvs:Y.isPoints===!0&&!!P.attributes.uv&&(ht||it),fog:!!C,useFog:M.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Y.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:j,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:$t,useLegacyLights:i._useLegacyLights,decodeVideoTexture:ht&&M.map.isVideoTexture===!0&&Yt.getTransfer(M.map.colorSpace)===jt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Le,flipSided:M.side===be,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ct&&M.extensions.derivatives===!0,extensionFragDepth:ct&&M.extensions.fragDepth===!0,extensionDrawBuffers:ct&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ct&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ct&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){let y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)y.push(I),y.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(v(y,M),g(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function v(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function g(M,y){o.disableAll(),y.isWebGL2&&o.enable(0),y.supportsVertexTextures&&o.enable(1),y.instancing&&o.enable(2),y.instancingColor&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.useLegacyLights&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function b(M){let y=_[M.type],I;if(y){let U=je[y];I=Cu.clone(U.uniforms)}else I=M.uniforms;return I}function R(M,y){let I;for(let U=0,Y=l.length;U<Y;U++){let C=l[U];if(C.cacheKey===y){I=C,++I.usedTimes;break}}return I===void 0&&(I=new zm(i,y,M,r),l.push(I)),I}function A(M){if(--M.usedTimes===0){let y=l.indexOf(M);l[y]=l[l.length-1],l.pop(),M.destroy()}}function E(M){c.remove(M)}function D(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:b,acquireProgram:R,releaseProgram:A,releaseShaderCache:E,programs:l,dispose:D}}function Vm(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Gm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Uc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dc(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,m,_,x,p){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:_,renderOrder:u.renderOrder,z:x,group:p},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=_,d.renderOrder=u.renderOrder,d.z=x,d.group=p),t++,d}function o(u,f,m,_,x,p){let d=a(u,f,m,_,x,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):e.push(d)}function c(u,f,m,_,x,p){let d=a(u,f,m,_,x,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):e.unshift(d)}function l(u,f){e.length>1&&e.sort(u||Gm),n.length>1&&n.sort(f||Uc),s.length>1&&s.sort(f||Uc)}function h(){for(let u=t,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Wm(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Dc,i.set(n,[a])):s>=r.length?(a=new Dc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Xm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new wt};break;case"SpotLight":e={position:new N,direction:new N,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":e={color:new wt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function qm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Ym=0;function Zm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jm(i,t){let e=new Xm,n=qm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new N);let r=new N,a=new Qt,o=new Qt;function c(h,u){let f=0,m=0,_=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let x=0,p=0,d=0,v=0,g=0,b=0,R=0,A=0,E=0,D=0,M=0;h.sort(Zm);let y=u===!0?Math.PI:1;for(let U=0,Y=h.length;U<Y;U++){let C=h[U],P=C.color,k=C.intensity,X=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=P.r*k*y,m+=P.g*k*y,_+=P.b*k*y;else if(C.isLightProbe){for(let V=0;V<9;V++)s.probe[V].addScaledVector(C.sh.coefficients[V],k);M++}else if(C.isDirectionalLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity*y),C.castShadow){let Z=C.shadow,$=n.get(C);$.shadowBias=Z.bias,$.shadowNormalBias=Z.normalBias,$.shadowRadius=Z.radius,$.shadowMapSize=Z.mapSize,s.directionalShadow[x]=$,s.directionalShadowMap[x]=q,s.directionalShadowMatrix[x]=C.shadow.matrix,b++}s.directional[x]=V,x++}else if(C.isSpotLight){let V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(P).multiplyScalar(k*y),V.distance=X,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,s.spot[d]=V;let Z=C.shadow;if(C.map&&(s.spotLightMap[E]=C.map,E++,Z.updateMatrices(C),C.castShadow&&D++),s.spotLightMatrix[d]=Z.matrix,C.castShadow){let $=n.get(C);$.shadowBias=Z.bias,$.shadowNormalBias=Z.normalBias,$.shadowRadius=Z.radius,$.shadowMapSize=Z.mapSize,s.spotShadow[d]=$,s.spotShadowMap[d]=q,A++}d++}else if(C.isRectAreaLight){let V=e.get(C);V.color.copy(P).multiplyScalar(k),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),s.rectArea[v]=V,v++}else if(C.isPointLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity*y),V.distance=C.distance,V.decay=C.decay,C.castShadow){let Z=C.shadow,$=n.get(C);$.shadowBias=Z.bias,$.shadowNormalBias=Z.normalBias,$.shadowRadius=Z.radius,$.shadowMapSize=Z.mapSize,$.shadowCameraNear=Z.camera.near,$.shadowCameraFar=Z.camera.far,s.pointShadow[p]=$,s.pointShadowMap[p]=q,s.pointShadowMatrix[p]=C.shadow.matrix,R++}s.point[p]=V,p++}else if(C.isHemisphereLight){let V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(k*y),V.groundColor.copy(C.groundColor).multiplyScalar(k*y),s.hemi[g]=V,g++}}v>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=st.LTC_FLOAT_1,s.rectAreaLTC2=st.LTC_FLOAT_2):(s.rectAreaLTC1=st.LTC_HALF_1,s.rectAreaLTC2=st.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=st.LTC_FLOAT_1,s.rectAreaLTC2=st.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=st.LTC_HALF_1,s.rectAreaLTC2=st.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=_;let I=s.hash;(I.directionalLength!==x||I.pointLength!==p||I.spotLength!==d||I.rectAreaLength!==v||I.hemiLength!==g||I.numDirectionalShadows!==b||I.numPointShadows!==R||I.numSpotShadows!==A||I.numSpotMaps!==E||I.numLightProbes!==M)&&(s.directional.length=x,s.spot.length=d,s.rectArea.length=v,s.point.length=p,s.hemi.length=g,s.directionalShadow.length=b,s.directionalShadowMap.length=b,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=b,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=A+E-D,s.spotLightMap.length=E,s.numSpotLightShadowsWithMaps=D,s.numLightProbes=M,I.directionalLength=x,I.pointLength=p,I.spotLength=d,I.rectAreaLength=v,I.hemiLength=g,I.numDirectionalShadows=b,I.numPointShadows=R,I.numSpotShadows=A,I.numSpotMaps=E,I.numLightProbes=M,s.version=Ym++)}function l(h,u){let f=0,m=0,_=0,x=0,p=0,d=u.matrixWorldInverse;for(let v=0,g=h.length;v<g;v++){let b=h[v];if(b.isDirectionalLight){let R=s.directional[f];R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),f++}else if(b.isSpotLight){let R=s.spot[_];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(d),R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),_++}else if(b.isRectAreaLight){let R=s.rectArea[x];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(d),o.identity(),a.copy(b.matrixWorld),a.premultiply(d),o.extractRotation(a),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),x++}else if(b.isPointLight){let R=s.point[m];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(d),m++}else if(b.isHemisphereLight){let R=s.hemi[p];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(d),p++}}}return{setup:c,setupView:l,state:s}}function Nc(i,t){let e=new Jm(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function c(u){e.setup(n,u)}function l(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function $m(i,t){let e=new WeakMap;function n(r,a=0){let o=e.get(r),c;return o===void 0?(c=new Nc(i,t),e.set(r,[c])):a>=o.length?(c=new Nc(i,t),o.push(c)):c=o[a],c}function s(){e=new WeakMap}return{get:n,dispose:s}}var Po=class extends Ln{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Lo=class extends Ln{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Km=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qm(i,t,e){let n=new lr,s=new Ot,r=new Ot,a=new ve,o=new Po({depthPacking:Gh}),c=new Lo,l={},h=e.maxTextureSize,u={[An]:be,[be]:An,[Le]:Le},f=new Ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:Km,fragmentShader:jm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let _=new _e;_.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ce(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gc;let d=this.type;this.render=function(A,E,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;let M=i.getRenderTarget(),y=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),U=i.state;U.setBlending(En),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let Y=d!==cn&&this.type===cn,C=d===cn&&this.type!==cn;for(let P=0,k=A.length;P<k;P++){let X=A[P],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let V=q.getFrameExtents();if(s.multiply(V),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/V.x),s.x=r.x*V.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/V.y),s.y=r.y*V.y,q.mapSize.y=r.y)),q.map===null||Y===!0||C===!0){let $=this.type!==cn?{minFilter:Re,magFilter:Re}:{};q.map!==null&&q.map.dispose(),q.map=new dn(s.x,s.y,$),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Z=q.getViewportCount();for(let $=0;$<Z;$++){let j=q.getViewport($);a.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),U.viewport(a),q.updateMatrices(X,$),n=q.getFrustum(),b(E,D,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===cn&&v(q,D),q.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(M,y,I)};function v(A,E){let D=t.update(x);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new dn(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(E,null,D,f,x,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(E,null,D,m,x,null)}function g(A,E,D,M){let y=null,I=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)y=I;else if(y=D.isPointLight===!0?c:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let U=y.uuid,Y=E.uuid,C=l[U];C===void 0&&(C={},l[U]=C);let P=C[Y];P===void 0&&(P=y.clone(),C[Y]=P,E.addEventListener("dispose",R)),y=P}if(y.visible=E.visible,y.wireframe=E.wireframe,M===cn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:u[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let U=i.properties.get(y);U.light=D}return y}function b(A,E,D,M,y){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===cn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);let Y=t.update(A),C=A.material;if(Array.isArray(C)){let P=Y.groups;for(let k=0,X=P.length;k<X;k++){let q=P[k],V=C[q.materialIndex];if(V&&V.visible){let Z=g(A,V,M,y);A.onBeforeShadow(i,A,E,D,Y,Z,q),i.renderBufferDirect(D,null,Y,Z,A,q),A.onAfterShadow(i,A,E,D,Y,Z,q)}}}else if(C.visible){let P=g(A,C,M,y);A.onBeforeShadow(i,A,E,D,Y,P,null),i.renderBufferDirect(D,null,Y,P,A,null),A.onAfterShadow(i,A,E,D,Y,P,null)}}let U=A.children;for(let Y=0,C=U.length;Y<C;Y++)b(U[Y],E,D,M,y)}function R(A){A.target.removeEventListener("dispose",R);for(let D in l){let M=l[D],y=A.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}function tg(i,t,e){let n=e.isWebGL2;function s(){let L=!1,at=new ve,ct=null,At=new ve(0,0,0,0);return{setMask:function(St){ct!==St&&!L&&(i.colorMask(St,St,St,St),ct=St)},setLocked:function(St){L=St},setClear:function(St,Jt,$t,fe,Ee){Ee===!0&&(St*=fe,Jt*=fe,$t*=fe),at.set(St,Jt,$t,fe),At.equals(at)===!1&&(i.clearColor(St,Jt,$t,fe),At.copy(at))},reset:function(){L=!1,ct=null,At.set(-1,0,0,0)}}}function r(){let L=!1,at=null,ct=null,At=null;return{setTest:function(St){St?xt(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(St){at!==St&&!L&&(i.depthMask(St),at=St)},setFunc:function(St){if(ct!==St){switch(St){case xh:i.depthFunc(i.NEVER);break;case vh:i.depthFunc(i.ALWAYS);break;case yh:i.depthFunc(i.LESS);break;case qs:i.depthFunc(i.LEQUAL);break;case Mh:i.depthFunc(i.EQUAL);break;case Sh:i.depthFunc(i.GEQUAL);break;case bh:i.depthFunc(i.GREATER);break;case Eh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=St}},setLocked:function(St){L=St},setClear:function(St){At!==St&&(i.clearDepth(St),At=St)},reset:function(){L=!1,at=null,ct=null,At=null}}}function a(){let L=!1,at=null,ct=null,At=null,St=null,Jt=null,$t=null,fe=null,Ee=null;return{setTest:function(Kt){L||(Kt?xt(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(Kt){at!==Kt&&!L&&(i.stencilMask(Kt),at=Kt)},setFunc:function(Kt,we,Ke){(ct!==Kt||At!==we||St!==Ke)&&(i.stencilFunc(Kt,we,Ke),ct=Kt,At=we,St=Ke)},setOp:function(Kt,we,Ke){(Jt!==Kt||$t!==we||fe!==Ke)&&(i.stencilOp(Kt,we,Ke),Jt=Kt,$t=we,fe=Ke)},setLocked:function(Kt){L=Kt},setClear:function(Kt){Ee!==Kt&&(i.clearStencil(Kt),Ee=Kt)},reset:function(){L=!1,at=null,ct=null,At=null,St=null,Jt=null,$t=null,fe=null,Ee=null}}}let o=new s,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},m={},_=new WeakMap,x=[],p=null,d=!1,v=null,g=null,b=null,R=null,A=null,E=null,D=null,M=new wt(0,0,0),y=0,I=!1,U=null,Y=null,C=null,P=null,k=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,V=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=V>=1):Z.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=V>=2);let $=null,j={},z=i.getParameter(i.SCISSOR_BOX),J=i.getParameter(i.VIEWPORT),rt=new ve().fromArray(z),dt=new ve().fromArray(J);function ft(L,at,ct,At){let St=new Uint8Array(4),Jt=i.createTexture();i.bindTexture(L,Jt),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $t=0;$t<ct;$t++)n&&(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)?i.texImage3D(at,0,i.RGBA,1,1,At,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(at+$t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return Jt}let yt={};yt[i.TEXTURE_2D]=ft(i.TEXTURE_2D,i.TEXTURE_2D,1),yt[i.TEXTURE_CUBE_MAP]=ft(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(yt[i.TEXTURE_2D_ARRAY]=ft(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),yt[i.TEXTURE_3D]=ft(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),xt(i.DEPTH_TEST),c.setFunc(qs),bt(!1),T(ga),xt(i.CULL_FACE),nt(En);function xt(L){f[L]!==!0&&(i.enable(L),f[L]=!0)}function ht(L){f[L]!==!1&&(i.disable(L),f[L]=!1)}function Ut(L,at){return m[L]!==at?(i.bindFramebuffer(L,at),m[L]=at,n&&(L===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=at),L===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=at)),!0):!1}function O(L,at){let ct=x,At=!1;if(L)if(ct=_.get(at),ct===void 0&&(ct=[],_.set(at,ct)),L.isWebGLMultipleRenderTargets){let St=L.texture;if(ct.length!==St.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let Jt=0,$t=St.length;Jt<$t;Jt++)ct[Jt]=i.COLOR_ATTACHMENT0+Jt;ct.length=St.length,At=!0}}else ct[0]!==i.COLOR_ATTACHMENT0&&(ct[0]=i.COLOR_ATTACHMENT0,At=!0);else ct[0]!==i.BACK&&(ct[0]=i.BACK,At=!0);At&&(e.isWebGL2?i.drawBuffers(ct):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(ct))}function oe(L){return p!==L?(i.useProgram(L),p=L,!0):!1}let gt={[Wn]:i.FUNC_ADD,[ih]:i.FUNC_SUBTRACT,[sh]:i.FUNC_REVERSE_SUBTRACT};if(n)gt[va]=i.MIN,gt[ya]=i.MAX;else{let L=t.get("EXT_blend_minmax");L!==null&&(gt[va]=L.MIN_EXT,gt[ya]=L.MAX_EXT)}let Tt={[rh]:i.ZERO,[oh]:i.ONE,[ah]:i.SRC_COLOR,[lo]:i.SRC_ALPHA,[fh]:i.SRC_ALPHA_SATURATE,[uh]:i.DST_COLOR,[lh]:i.DST_ALPHA,[ch]:i.ONE_MINUS_SRC_COLOR,[ho]:i.ONE_MINUS_SRC_ALPHA,[dh]:i.ONE_MINUS_DST_COLOR,[hh]:i.ONE_MINUS_DST_ALPHA,[ph]:i.CONSTANT_COLOR,[mh]:i.ONE_MINUS_CONSTANT_COLOR,[gh]:i.CONSTANT_ALPHA,[_h]:i.ONE_MINUS_CONSTANT_ALPHA};function nt(L,at,ct,At,St,Jt,$t,fe,Ee,Kt){if(L===En){d===!0&&(ht(i.BLEND),d=!1);return}if(d===!1&&(xt(i.BLEND),d=!0),L!==nh){if(L!==v||Kt!==I){if((g!==Wn||A!==Wn)&&(i.blendEquation(i.FUNC_ADD),g=Wn,A=Wn),Kt)switch(L){case wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ri:i.blendFunc(i.ONE,i.ONE);break;case _a:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ri:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case _a:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,R=null,E=null,D=null,M.set(0,0,0),y=0,v=L,I=Kt}return}St=St||at,Jt=Jt||ct,$t=$t||At,(at!==g||St!==A)&&(i.blendEquationSeparate(gt[at],gt[St]),g=at,A=St),(ct!==b||At!==R||Jt!==E||$t!==D)&&(i.blendFuncSeparate(Tt[ct],Tt[At],Tt[Jt],Tt[$t]),b=ct,R=At,E=Jt,D=$t),(fe.equals(M)===!1||Ee!==y)&&(i.blendColor(fe.r,fe.g,fe.b,Ee),M.copy(fe),y=Ee),v=L,I=!1}function Vt(L,at){L.side===Le?ht(i.CULL_FACE):xt(i.CULL_FACE);let ct=L.side===be;at&&(ct=!ct),bt(ct),L.blending===wi&&L.transparent===!1?nt(En):nt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),o.setMask(L.colorWrite);let At=L.stencilWrite;l.setTest(At),At&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),B(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?xt(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function bt(L){U!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),U=L)}function T(L){L!==Ql?(xt(i.CULL_FACE),L!==Y&&(L===ga?i.cullFace(i.BACK):L===th?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),Y=L}function S(L){L!==C&&(q&&i.lineWidth(L),C=L)}function B(L,at,ct){L?(xt(i.POLYGON_OFFSET_FILL),(P!==at||k!==ct)&&(i.polygonOffset(at,ct),P=at,k=ct)):ht(i.POLYGON_OFFSET_FILL)}function Q(L){L?xt(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function K(L){L===void 0&&(L=i.TEXTURE0+X-1),$!==L&&(i.activeTexture(L),$=L)}function et(L,at,ct){ct===void 0&&($===null?ct=i.TEXTURE0+X-1:ct=$);let At=j[ct];At===void 0&&(At={type:void 0,texture:void 0},j[ct]=At),(At.type!==L||At.texture!==at)&&($!==ct&&(i.activeTexture(ct),$=ct),i.bindTexture(L,at||yt[L]),At.type=L,At.texture=at)}function mt(){let L=j[$];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ot(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Mt(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Lt(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ht(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ct(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function vt(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pt(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Dt(L){rt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),rt.copy(L))}function Wt(L){dt.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),dt.copy(L))}function se(L,at){let ct=u.get(at);ct===void 0&&(ct=new WeakMap,u.set(at,ct));let At=ct.get(L);At===void 0&&(At=i.getUniformBlockIndex(at,L.name),ct.set(L,At))}function Bt(L,at){let At=u.get(at).get(L);h.get(at)!==At&&(i.uniformBlockBinding(at,At,L.__bindingPointIndex),h.set(at,At))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},$=null,j={},m={},_=new WeakMap,x=[],p=null,d=!1,v=null,g=null,b=null,R=null,A=null,E=null,D=null,M=new wt(0,0,0),y=0,I=!1,U=null,Y=null,C=null,P=null,k=null,rt.set(0,0,i.canvas.width,i.canvas.height),dt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:xt,disable:ht,bindFramebuffer:Ut,drawBuffers:O,useProgram:oe,setBlending:nt,setMaterial:Vt,setFlipSided:bt,setCullFace:T,setLineWidth:S,setPolygonOffset:B,setScissorTest:Q,activeTexture:K,bindTexture:et,unbindTexture:mt,compressedTexImage2D:ot,compressedTexImage3D:ut,texImage2D:vt,texImage3D:pt,updateUBOMapping:se,uniformBlockBinding:Bt,texStorage2D:Ht,texStorage3D:Ct,texSubImage2D:Mt,texSubImage3D:Lt,compressedTexSubImage2D:tt,compressedTexSubImage3D:Xt,scissor:Dt,viewport:Wt,reset:it}}function eg(i,t,e,n,s,r,a){let o=s.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,S){return m?new OffscreenCanvas(T,S):tr("canvas")}function x(T,S,B,Q){let K=1;if((T.width>Q||T.height>Q)&&(K=Q/Math.max(T.width,T.height)),K<1||S===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){let et=S?Qs:Math.floor,mt=et(K*T.width),ot=et(K*T.height);u===void 0&&(u=_(mt,ot));let ut=B?_(mt,ot):u;return ut.width=mt,ut.height=ot,ut.getContext("2d").drawImage(T,0,0,mt,ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+mt+"x"+ot+")."),ut}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function p(T){return xo(T.width)&&xo(T.height)}function d(T){return o?!1:T.wrapS!==qe||T.wrapT!==qe||T.minFilter!==Re&&T.minFilter!==Be}function v(T,S){return T.generateMipmaps&&S&&T.minFilter!==Re&&T.minFilter!==Be}function g(T){i.generateMipmap(T)}function b(T,S,B,Q,K=!1){if(o===!1)return S;if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let et=S;if(S===i.RED&&(B===i.FLOAT&&(et=i.R32F),B===i.HALF_FLOAT&&(et=i.R16F),B===i.UNSIGNED_BYTE&&(et=i.R8)),S===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(et=i.R8UI),B===i.UNSIGNED_SHORT&&(et=i.R16UI),B===i.UNSIGNED_INT&&(et=i.R32UI),B===i.BYTE&&(et=i.R8I),B===i.SHORT&&(et=i.R16I),B===i.INT&&(et=i.R32I)),S===i.RG&&(B===i.FLOAT&&(et=i.RG32F),B===i.HALF_FLOAT&&(et=i.RG16F),B===i.UNSIGNED_BYTE&&(et=i.RG8)),S===i.RGBA){let mt=K?Js:Yt.getTransfer(Q);B===i.FLOAT&&(et=i.RGBA32F),B===i.HALF_FLOAT&&(et=i.RGBA16F),B===i.UNSIGNED_BYTE&&(et=mt===jt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function R(T,S,B){return v(T,B)===!0||T.isFramebufferTexture&&T.minFilter!==Re&&T.minFilter!==Be?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function A(T){return T===Re||T===Ma||T===Ur?i.NEAREST:i.LINEAR}function E(T){let S=T.target;S.removeEventListener("dispose",E),M(S),S.isVideoTexture&&h.delete(S)}function D(T){let S=T.target;S.removeEventListener("dispose",D),I(S)}function M(T){let S=n.get(T);if(S.__webglInit===void 0)return;let B=T.source,Q=f.get(B);if(Q){let K=Q[S.__cacheKey];K.usedTimes--,K.usedTimes===0&&y(T),Object.keys(Q).length===0&&f.delete(B)}n.remove(T)}function y(T){let S=n.get(T);i.deleteTexture(S.__webglTexture);let B=T.source,Q=f.get(B);delete Q[S.__cacheKey],a.memory.textures--}function I(T){let S=T.texture,B=n.get(T),Q=n.get(S);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(B.__webglFramebuffer[K]))for(let et=0;et<B.__webglFramebuffer[K].length;et++)i.deleteFramebuffer(B.__webglFramebuffer[K][et]);else i.deleteFramebuffer(B.__webglFramebuffer[K]);B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer[K])}else{if(Array.isArray(B.__webglFramebuffer))for(let K=0;K<B.__webglFramebuffer.length;K++)i.deleteFramebuffer(B.__webglFramebuffer[K]);else i.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&i.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let K=0;K<B.__webglColorRenderbuffer.length;K++)B.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(B.__webglColorRenderbuffer[K]);B.__webglDepthRenderbuffer&&i.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let K=0,et=S.length;K<et;K++){let mt=n.get(S[K]);mt.__webglTexture&&(i.deleteTexture(mt.__webglTexture),a.memory.textures--),n.remove(S[K])}n.remove(S),n.remove(T)}let U=0;function Y(){U=0}function C(){let T=U;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),U+=1,T}function P(T){let S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function k(T,S){let B=n.get(T);if(T.isVideoTexture&&Vt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){let Q=T.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(B,T,S);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+S)}function X(T,S){let B=n.get(T);if(T.version>0&&B.__version!==T.version){rt(B,T,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+S)}function q(T,S){let B=n.get(T);if(T.version>0&&B.__version!==T.version){rt(B,T,S);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+S)}function V(T,S){let B=n.get(T);if(T.version>0&&B.__version!==T.version){dt(B,T,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+S)}let Z={[po]:i.REPEAT,[qe]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},$={[Re]:i.NEAREST,[Ma]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[Be]:i.LINEAR,[Uh]:i.LINEAR_MIPMAP_NEAREST,[es]:i.LINEAR_MIPMAP_LINEAR},j={[qh]:i.NEVER,[jh]:i.ALWAYS,[Yh]:i.LESS,[tl]:i.LEQUAL,[Zh]:i.EQUAL,[Kh]:i.GEQUAL,[Jh]:i.GREATER,[$h]:i.NOTEQUAL};function z(T,S,B){if(B?(i.texParameteri(T,i.TEXTURE_WRAP_S,Z[S.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Z[S.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Z[S.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,$[S.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,$[S.minFilter])):(i.texParameteri(T,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(T,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(S.wrapS!==qe||S.wrapT!==qe)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(T,i.TEXTURE_MAG_FILTER,A(S.magFilter)),i.texParameteri(T,i.TEXTURE_MIN_FILTER,A(S.minFilter)),S.minFilter!==Re&&S.minFilter!==Be&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,j[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let Q=t.get("EXT_texture_filter_anisotropic");if(S.magFilter===Re||S.minFilter!==Ur&&S.minFilter!==es||S.type===bn&&t.has("OES_texture_float_linear")===!1||o===!1&&S.type===ns&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(i.texParameterf(T,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function J(T,S){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",E));let Q=S.source,K=f.get(Q);K===void 0&&(K={},f.set(Q,K));let et=P(S);if(et!==T.__cacheKey){K[et]===void 0&&(K[et]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),K[et].usedTimes++;let mt=K[T.__cacheKey];mt!==void 0&&(K[T.__cacheKey].usedTimes--,mt.usedTimes===0&&y(S)),T.__cacheKey=et,T.__webglTexture=K[et].texture}return B}function rt(T,S,B){let Q=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=i.TEXTURE_3D);let K=J(T,S),et=S.source;e.bindTexture(Q,T.__webglTexture,i.TEXTURE0+B);let mt=n.get(et);if(et.version!==mt.__version||K===!0){e.activeTexture(i.TEXTURE0+B);let ot=Yt.getPrimaries(Yt.workingColorSpace),ut=S.colorSpace===ze?null:Yt.getPrimaries(S.colorSpace),Mt=S.colorSpace===ze||ot===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let Lt=d(S)&&p(S.image)===!1,tt=x(S.image,Lt,!1,s.maxTextureSize);tt=bt(S,tt);let Xt=p(tt)||o,Ht=r.convert(S.format,S.colorSpace),Ct=r.convert(S.type),vt=b(S.internalFormat,Ht,Ct,S.colorSpace,S.isVideoTexture);z(Q,S,Xt);let pt,Dt=S.mipmaps,Wt=o&&S.isVideoTexture!==!0&&vt!==jc,se=mt.__version===void 0||K===!0,Bt=R(S,tt,Xt);if(S.isDepthTexture)vt=i.DEPTH_COMPONENT,o?S.type===bn?vt=i.DEPTH_COMPONENT32F:S.type===Sn?vt=i.DEPTH_COMPONENT24:S.type===Yn?vt=i.DEPTH24_STENCIL8:vt=i.DEPTH_COMPONENT16:S.type===bn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Zn&&vt===i.DEPTH_COMPONENT&&S.type!==$o&&S.type!==Sn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Sn,Ct=r.convert(S.type)),S.format===Li&&vt===i.DEPTH_COMPONENT&&(vt=i.DEPTH_STENCIL,S.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Yn,Ct=r.convert(S.type))),se&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,vt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,vt,tt.width,tt.height,0,Ht,Ct,null));else if(S.isDataTexture)if(Dt.length>0&&Xt){Wt&&se&&e.texStorage2D(i.TEXTURE_2D,Bt,vt,Dt[0].width,Dt[0].height);for(let it=0,L=Dt.length;it<L;it++)pt=Dt[it],Wt?e.texSubImage2D(i.TEXTURE_2D,it,0,0,pt.width,pt.height,Ht,Ct,pt.data):e.texImage2D(i.TEXTURE_2D,it,vt,pt.width,pt.height,0,Ht,Ct,pt.data);S.generateMipmaps=!1}else Wt?(se&&e.texStorage2D(i.TEXTURE_2D,Bt,vt,tt.width,tt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,Ht,Ct,tt.data)):e.texImage2D(i.TEXTURE_2D,0,vt,tt.width,tt.height,0,Ht,Ct,tt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Wt&&se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,vt,Dt[0].width,Dt[0].height,tt.depth);for(let it=0,L=Dt.length;it<L;it++)pt=Dt[it],S.format!==Ye?Ht!==null?Wt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,pt.width,pt.height,tt.depth,Ht,pt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,vt,pt.width,pt.height,tt.depth,0,pt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,pt.width,pt.height,tt.depth,Ht,Ct,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,vt,pt.width,pt.height,tt.depth,0,Ht,Ct,pt.data)}else{Wt&&se&&e.texStorage2D(i.TEXTURE_2D,Bt,vt,Dt[0].width,Dt[0].height);for(let it=0,L=Dt.length;it<L;it++)pt=Dt[it],S.format!==Ye?Ht!==null?Wt?e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,pt.width,pt.height,Ht,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,it,vt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?e.texSubImage2D(i.TEXTURE_2D,it,0,0,pt.width,pt.height,Ht,Ct,pt.data):e.texImage2D(i.TEXTURE_2D,it,vt,pt.width,pt.height,0,Ht,Ct,pt.data)}else if(S.isDataArrayTexture)Wt?(se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,vt,tt.width,tt.height,tt.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,Ht,Ct,tt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,tt.width,tt.height,tt.depth,0,Ht,Ct,tt.data);else if(S.isData3DTexture)Wt?(se&&e.texStorage3D(i.TEXTURE_3D,Bt,vt,tt.width,tt.height,tt.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,Ht,Ct,tt.data)):e.texImage3D(i.TEXTURE_3D,0,vt,tt.width,tt.height,tt.depth,0,Ht,Ct,tt.data);else if(S.isFramebufferTexture){if(se)if(Wt)e.texStorage2D(i.TEXTURE_2D,Bt,vt,tt.width,tt.height);else{let it=tt.width,L=tt.height;for(let at=0;at<Bt;at++)e.texImage2D(i.TEXTURE_2D,at,vt,it,L,0,Ht,Ct,null),it>>=1,L>>=1}}else if(Dt.length>0&&Xt){Wt&&se&&e.texStorage2D(i.TEXTURE_2D,Bt,vt,Dt[0].width,Dt[0].height);for(let it=0,L=Dt.length;it<L;it++)pt=Dt[it],Wt?e.texSubImage2D(i.TEXTURE_2D,it,0,0,Ht,Ct,pt):e.texImage2D(i.TEXTURE_2D,it,vt,Ht,Ct,pt);S.generateMipmaps=!1}else Wt?(se&&e.texStorage2D(i.TEXTURE_2D,Bt,vt,tt.width,tt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ht,Ct,tt)):e.texImage2D(i.TEXTURE_2D,0,vt,Ht,Ct,tt);v(S,Xt)&&g(Q),mt.__version=et.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function dt(T,S,B){if(S.image.length!==6)return;let Q=J(T,S),K=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let et=n.get(K);if(K.version!==et.__version||Q===!0){e.activeTexture(i.TEXTURE0+B);let mt=Yt.getPrimaries(Yt.workingColorSpace),ot=S.colorSpace===ze?null:Yt.getPrimaries(S.colorSpace),ut=S.colorSpace===ze||mt===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let Mt=S.isCompressedTexture||S.image[0].isCompressedTexture,Lt=S.image[0]&&S.image[0].isDataTexture,tt=[];for(let it=0;it<6;it++)!Mt&&!Lt?tt[it]=x(S.image[it],!1,!0,s.maxCubemapSize):tt[it]=Lt?S.image[it].image:S.image[it],tt[it]=bt(S,tt[it]);let Xt=tt[0],Ht=p(Xt)||o,Ct=r.convert(S.format,S.colorSpace),vt=r.convert(S.type),pt=b(S.internalFormat,Ct,vt,S.colorSpace),Dt=o&&S.isVideoTexture!==!0,Wt=et.__version===void 0||Q===!0,se=R(S,Xt,Ht);z(i.TEXTURE_CUBE_MAP,S,Ht);let Bt;if(Mt){Dt&&Wt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,se,pt,Xt.width,Xt.height);for(let it=0;it<6;it++){Bt=tt[it].mipmaps;for(let L=0;L<Bt.length;L++){let at=Bt[L];S.format!==Ye?Ct!==null?Dt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L,0,0,at.width,at.height,Ct,at.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L,pt,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L,0,0,at.width,at.height,Ct,vt,at.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L,pt,at.width,at.height,0,Ct,vt,at.data)}}}else{Bt=S.mipmaps,Dt&&Wt&&(Bt.length>0&&se++,e.texStorage2D(i.TEXTURE_CUBE_MAP,se,pt,tt[0].width,tt[0].height));for(let it=0;it<6;it++)if(Lt){Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,tt[it].width,tt[it].height,Ct,vt,tt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,pt,tt[it].width,tt[it].height,0,Ct,vt,tt[it].data);for(let L=0;L<Bt.length;L++){let ct=Bt[L].image[it].image;Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L+1,0,0,ct.width,ct.height,Ct,vt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L+1,pt,ct.width,ct.height,0,Ct,vt,ct.data)}}else{Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Ct,vt,tt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,pt,Ct,vt,tt[it]);for(let L=0;L<Bt.length;L++){let at=Bt[L];Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L+1,0,0,Ct,vt,at.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,L+1,pt,Ct,vt,at.image[it])}}}v(S,Ht)&&g(i.TEXTURE_CUBE_MAP),et.__version=K.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function ft(T,S,B,Q,K,et){let mt=r.convert(B.format,B.colorSpace),ot=r.convert(B.type),ut=b(B.internalFormat,mt,ot,B.colorSpace);if(!n.get(S).__hasExternalTextures){let Lt=Math.max(1,S.width>>et),tt=Math.max(1,S.height>>et);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,et,ut,Lt,tt,S.depth,0,mt,ot,null):e.texImage2D(K,et,ut,Lt,tt,0,mt,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),nt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,n.get(B).__webglTexture,0,Tt(S)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,n.get(B).__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(T,S,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),S.depthBuffer&&!S.stencilBuffer){let Q=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(B||nt(S)){let K=S.depthTexture;K&&K.isDepthTexture&&(K.type===bn?Q=i.DEPTH_COMPONENT32F:K.type===Sn&&(Q=i.DEPTH_COMPONENT24));let et=Tt(S);nt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et,Q,S.width,S.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,et,Q,S.width,S.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,S.width,S.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,T)}else if(S.depthBuffer&&S.stencilBuffer){let Q=Tt(S);B&&nt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,S.width,S.height):nt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,T)}else{let Q=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let K=0;K<Q.length;K++){let et=Q[K],mt=r.convert(et.format,et.colorSpace),ot=r.convert(et.type),ut=b(et.internalFormat,mt,ot,et.colorSpace),Mt=Tt(S);B&&nt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,ut,S.width,S.height):nt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,ut,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ut,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),k(S.depthTexture,0);let Q=n.get(S.depthTexture).__webglTexture,K=Tt(S);if(S.depthTexture.format===Zn)nt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(S.depthTexture.format===Li)nt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function ht(T){let S=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");xt(S.__webglFramebuffer,T)}else if(B){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]=i.createRenderbuffer(),yt(S.__webglDepthbuffer[Q],T,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),yt(S.__webglDepthbuffer,T,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(T,S,B){let Q=n.get(T);S!==void 0&&ft(Q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&ht(T)}function O(T){let S=T.texture,B=n.get(T),Q=n.get(S);T.addEventListener("dispose",D),T.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=S.version,a.memory.textures++);let K=T.isWebGLCubeRenderTarget===!0,et=T.isWebGLMultipleRenderTargets===!0,mt=p(T)||o;if(K){B.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(o&&S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[ot]=[];for(let ut=0;ut<S.mipmaps.length;ut++)B.__webglFramebuffer[ot][ut]=i.createFramebuffer()}else B.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let ot=0;ot<S.mipmaps.length;ot++)B.__webglFramebuffer[ot]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(et)if(s.drawBuffers){let ot=T.texture;for(let ut=0,Mt=ot.length;ut<Mt;ut++){let Lt=n.get(ot[ut]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&nt(T)===!1){let ot=et?S:[S];B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ut=0;ut<ot.length;ut++){let Mt=ot[ut];B.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ut]);let Lt=r.convert(Mt.format,Mt.colorSpace),tt=r.convert(Mt.type),Xt=b(Mt.internalFormat,Lt,tt,Mt.colorSpace,T.isXRRenderTarget===!0),Ht=Tt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,Xt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,B.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),yt(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),z(i.TEXTURE_CUBE_MAP,S,mt);for(let ot=0;ot<6;ot++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let ut=0;ut<S.mipmaps.length;ut++)ft(B.__webglFramebuffer[ot][ut],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ut);else ft(B.__webglFramebuffer[ot],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);v(S,mt)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(et){let ot=T.texture;for(let ut=0,Mt=ot.length;ut<Mt;ut++){let Lt=ot[ut],tt=n.get(Lt);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),z(i.TEXTURE_2D,Lt,mt),ft(B.__webglFramebuffer,T,Lt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),v(Lt,mt)&&g(i.TEXTURE_2D)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?ot=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ot,Q.__webglTexture),z(ot,S,mt),o&&S.mipmaps&&S.mipmaps.length>0)for(let ut=0;ut<S.mipmaps.length;ut++)ft(B.__webglFramebuffer[ut],T,S,i.COLOR_ATTACHMENT0,ot,ut);else ft(B.__webglFramebuffer,T,S,i.COLOR_ATTACHMENT0,ot,0);v(S,mt)&&g(ot),e.unbindTexture()}T.depthBuffer&&ht(T)}function oe(T){let S=p(T)||o,B=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let Q=0,K=B.length;Q<K;Q++){let et=B[Q];if(v(et,S)){let mt=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ot=n.get(et).__webglTexture;e.bindTexture(mt,ot),g(mt),e.unbindTexture()}}}function gt(T){if(o&&T.samples>0&&nt(T)===!1){let S=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],B=T.width,Q=T.height,K=i.COLOR_BUFFER_BIT,et=[],mt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(T),ut=T.isWebGLMultipleRenderTargets===!0;if(ut)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){et.push(i.COLOR_ATTACHMENT0+Mt),T.depthBuffer&&et.push(mt);let Lt=ot.__ignoreDepthValues!==void 0?ot.__ignoreDepthValues:!1;if(Lt===!1&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ut&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[Mt]),Lt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[mt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[mt])),ut){let tt=n.get(S[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,B,Q,0,0,B,Q,K,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,et)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,ot.__webglColorRenderbuffer[Mt]);let Lt=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,Lt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}}function Tt(T){return Math.min(s.maxSamples,T.samples)}function nt(T){let S=n.get(T);return o&&T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Vt(T){let S=a.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function bt(T,S){let B=T.colorSpace,Q=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===_o||B!==un&&B!==ze&&(Yt.getTransfer(B)===jt?o===!1?t.has("EXT_sRGB")===!0&&Q===Ye?(T.format=_o,T.minFilter=Be,T.generateMipmaps=!1):S=er.sRGBToLinear(S):(Q!==Ye||K!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}this.allocateTextureUnit=C,this.resetTextureUnits=Y,this.setTexture2D=k,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=V,this.rebindTextures=Ut,this.setupRenderTarget=O,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=nt}function ng(i,t,e){let n=e.isWebGL2;function s(r,a=ze){let o,c=Yt.getTransfer(a);if(r===Tn)return i.UNSIGNED_BYTE;if(r===Yc)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Zc)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Dh)return i.BYTE;if(r===Nh)return i.SHORT;if(r===$o)return i.UNSIGNED_SHORT;if(r===qc)return i.INT;if(r===Sn)return i.UNSIGNED_INT;if(r===bn)return i.FLOAT;if(r===ns)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Fh)return i.ALPHA;if(r===Ye)return i.RGBA;if(r===Oh)return i.LUMINANCE;if(r===Bh)return i.LUMINANCE_ALPHA;if(r===Zn)return i.DEPTH_COMPONENT;if(r===Li)return i.DEPTH_STENCIL;if(r===_o)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===zh)return i.RED;if(r===Jc)return i.RED_INTEGER;if(r===kh)return i.RG;if(r===$c)return i.RG_INTEGER;if(r===Kc)return i.RGBA_INTEGER;if(r===Dr||r===Nr||r===Fr||r===Or)if(c===jt)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Dr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Nr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Fr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Or)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Dr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Nr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Fr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Or)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Sa||r===ba||r===Ea||r===wa)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Sa)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ba)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ea)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===wa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===jc)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ta||r===Aa)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Ta)return c===jt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Aa)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ra||r===Ca||r===Pa||r===La||r===Ia||r===Ua||r===Da||r===Na||r===Fa||r===Oa||r===Ba||r===za||r===ka||r===Ha)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Ra)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ca)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Pa)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===La)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ia)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ua)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Da)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Na)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Fa)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Oa)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ba)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===za)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ka)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ha)return c===jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Br||r===Va||r===Ga)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Br)return c===jt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Va)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ga)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Hh||r===Wa||r===Xa||r===qa)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Br)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Wa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Xa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===qa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Yn?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Io=class extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ke=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},ig={type:"move"},ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let x of t.hand.values()){let p=e.getJointPose(x,n),d=this._getHandJoint(l,x);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,_=.005;l.inputState.pinching&&f>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ig)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Uo=class extends Rn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,m=null,_=null,x=e.getContextAttributes(),p=null,d=null,v=[],g=[],b=new Ot,R=null,A=new Pe;A.layers.enable(1),A.viewport=new ve;let E=new Pe;E.layers.enable(2),E.viewport=new ve;let D=[A,E],M=new Io;M.layers.enable(1),M.layers.enable(2);let y=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let J=v[z];return J===void 0&&(J=new ts,v[z]=J),J.getTargetRaySpace()},this.getControllerGrip=function(z){let J=v[z];return J===void 0&&(J=new ts,v[z]=J),J.getGripSpace()},this.getHand=function(z){let J=v[z];return J===void 0&&(J=new ts,v[z]=J),J.getHandSpace()};function U(z){let J=g.indexOf(z.inputSource);if(J===-1)return;let rt=v[J];rt!==void 0&&(rt.update(z.inputSource,z.frame,l||a),rt.dispatchEvent({type:z.type,data:z.inputSource}))}function Y(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",C);for(let z=0;z<v.length;z++){let J=g[z];J!==null&&(g[z]=null,v[z].disconnect(J))}y=null,I=null,t.setRenderTarget(p),m=null,f=null,u=null,s=null,d=null,j.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",C),x.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(b),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let J={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,J),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),d=new dn(m.framebufferWidth,m.framebufferHeight,{format:Ye,type:Tn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let J=null,rt=null,dt=null;x.depth&&(dt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=x.stencil?Li:Zn,rt=x.stencil?Yn:Sn);let ft={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ft),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),d=new dn(f.textureWidth,f.textureHeight,{format:Ye,type:Tn,depthTexture:new ur(f.textureWidth,f.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0});let yt=t.properties.get(d);yt.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),j.setContext(s),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function C(z){for(let J=0;J<z.removed.length;J++){let rt=z.removed[J],dt=g.indexOf(rt);dt>=0&&(g[dt]=null,v[dt].disconnect(rt))}for(let J=0;J<z.added.length;J++){let rt=z.added[J],dt=g.indexOf(rt);if(dt===-1){for(let yt=0;yt<v.length;yt++)if(yt>=g.length){g.push(rt),dt=yt;break}else if(g[yt]===null){g[yt]=rt,dt=yt;break}if(dt===-1)break}let ft=v[dt];ft&&ft.connect(rt)}}let P=new N,k=new N;function X(z,J,rt){P.setFromMatrixPosition(J.matrixWorld),k.setFromMatrixPosition(rt.matrixWorld);let dt=P.distanceTo(k),ft=J.projectionMatrix.elements,yt=rt.projectionMatrix.elements,xt=ft[14]/(ft[10]-1),ht=ft[14]/(ft[10]+1),Ut=(ft[9]+1)/ft[5],O=(ft[9]-1)/ft[5],oe=(ft[8]-1)/ft[0],gt=(yt[8]+1)/yt[0],Tt=xt*oe,nt=xt*gt,Vt=dt/(-oe+gt),bt=Vt*-oe;J.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(bt),z.translateZ(Vt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();let T=xt+Vt,S=ht+Vt,B=Tt-bt,Q=nt+(dt-bt),K=Ut*ht/S*T,et=O*ht/S*T;z.projectionMatrix.makePerspective(B,Q,K,et,T,S),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function q(z,J){J===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(J.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;M.near=E.near=A.near=z.near,M.far=E.far=A.far=z.far,(y!==M.near||I!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),y=M.near,I=M.far);let J=z.parent,rt=M.cameras;q(M,J);for(let dt=0;dt<rt.length;dt++)q(rt[dt],J);rt.length===2?X(M,A,E):M.projectionMatrix.copy(A.projectionMatrix),V(z,M,J)};function V(z,J,rt){rt===null?z.matrix.copy(J.matrixWorld):(z.matrix.copy(rt.matrixWorld),z.matrix.invert(),z.matrix.multiply(J.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(J.projectionMatrix),z.projectionMatrixInverse.copy(J.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=is*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(z){c=z,f!==null&&(f.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)};let Z=null;function $(z,J){if(h=J.getViewerPose(l||a),_=J,h!==null){let rt=h.views;m!==null&&(t.setRenderTargetFramebuffer(d,m.framebuffer),t.setRenderTarget(d));let dt=!1;rt.length!==M.cameras.length&&(M.cameras.length=0,dt=!0);for(let ft=0;ft<rt.length;ft++){let yt=rt[ft],xt=null;if(m!==null)xt=m.getViewport(yt);else{let Ut=u.getViewSubImage(f,yt);xt=Ut.viewport,ft===0&&(t.setRenderTargetTextures(d,Ut.colorTexture,f.ignoreDepthValues?void 0:Ut.depthStencilTexture),t.setRenderTarget(d))}let ht=D[ft];ht===void 0&&(ht=new Pe,ht.layers.enable(ft),ht.viewport=new ve,D[ft]=ht),ht.matrix.fromArray(yt.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(yt.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set(xt.x,xt.y,xt.width,xt.height),ft===0&&(M.matrix.copy(ht.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),dt===!0&&M.cameras.push(ht)}}for(let rt=0;rt<v.length;rt++){let dt=g[rt],ft=v[rt];dt!==null&&ft!==void 0&&ft.update(dt,J,l||a)}Z&&Z(z,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),_=null}let j=new sl;j.setAnimationLoop($),this.setAnimationLoop=function(z){Z=z},this.dispose=function(){}}};function sg(i,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,il(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,v,g,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,b)):d.isMeshMatcapMaterial?(r(p,d),_(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),x(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,v,g):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===be&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===be&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let v=t.get(d).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;let g=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*g,e(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,v,g){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*v,p.scale.value=g*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),t.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,v){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===be&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function x(p,d){let v=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rg(i,t,e,n){let s={},r={},a=[],o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,g){let b=g.program;n.uniformBlockBinding(v,b)}function l(v,g){let b=s[v.id];b===void 0&&(_(v),b=h(v),s[v.id]=b,v.addEventListener("dispose",p));let R=g.program;n.updateUBOMapping(v,R);let A=t.render.frame;r[v.id]!==A&&(f(v),r[v.id]=A)}function h(v){let g=u();v.__bindingPointIndex=g;let b=i.createBuffer(),R=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,b),b}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let g=s[v.id],b=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let A=0,E=b.length;A<E;A++){let D=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,y=D.length;M<y;M++){let I=D[M];if(m(I,A,M,R)===!0){let U=I.__offset,Y=Array.isArray(I.value)?I.value:[I.value],C=0;for(let P=0;P<Y.length;P++){let k=Y[P],X=x(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,U+C,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):(k.toArray(I.__data,C),C+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,g,b,R){let A=v.value,E=g+"_"+b;if(R[E]===void 0)return typeof A=="number"||typeof A=="boolean"?R[E]=A:R[E]=A.clone(),!0;{let D=R[E];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return R[E]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function _(v){let g=v.uniforms,b=0,R=16;for(let E=0,D=g.length;E<D;E++){let M=Array.isArray(g[E])?g[E]:[g[E]];for(let y=0,I=M.length;y<I;y++){let U=M[y],Y=Array.isArray(U.value)?U.value:[U.value];for(let C=0,P=Y.length;C<P;C++){let k=Y[C],X=x(k),q=b%R;q!==0&&R-q<X.boundary&&(b+=R-q),U.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=X.storage}}}let A=b%R;return A>0&&(b+=R-A),v.__size=b,v.__cache={},this}function x(v){let g={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function p(v){let g=v.target;g.removeEventListener("dispose",p);let b=a.indexOf(g.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[g.id]),delete s[g.id],delete r[g.id]}function d(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}var as=class{constructor(t={}){let{canvas:e=fu(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let m=new Uint32Array(4),_=new Int32Array(4),x=null,p=null,d=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xe,this._useLegacyLights=!1,this.toneMapping=wn,this.toneMappingExposure=1;let g=this,b=!1,R=0,A=0,E=null,D=-1,M=null,y=new ve,I=new ve,U=null,Y=new wt(0),C=0,P=e.width,k=e.height,X=1,q=null,V=null,Z=new ve(0,0,P,k),$=new ve(0,0,P,k),j=!1,z=new lr,J=!1,rt=!1,dt=null,ft=new Qt,yt=new Ot,xt=new N,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ut(){return E===null?X:1}let O=n;function oe(w,F){for(let G=0;G<w.length;G++){let W=w[G],H=e.getContext(W,F);if(H!==null)return H}return null}try{let w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",L,!1),e.addEventListener("webglcontextcreationerror",at,!1),O===null){let F=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&F.shift(),O=oe(F,w),O===null)throw oe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let gt,Tt,nt,Vt,bt,T,S,B,Q,K,et,mt,ot,ut,Mt,Lt,tt,Xt,Ht,Ct,vt,pt,Dt,Wt;function se(){gt=new Ep(O),Tt=new xp(O,gt,t),gt.init(Tt),pt=new ng(O,gt,Tt),nt=new tg(O,gt,Tt),Vt=new Ap(O),bt=new Vm,T=new eg(O,gt,nt,bt,Tt,pt,Vt),S=new yp(g),B=new bp(g),Q=new Du(O,Tt),Dt=new gp(O,gt,Q,Tt),K=new wp(O,Q,Vt,Dt),et=new Lp(O,K,Q,Vt),Ht=new Pp(O,Tt,T),Lt=new vp(bt),mt=new Hm(g,S,B,gt,Tt,Dt,Lt),ot=new sg(g,bt),ut=new Wm,Mt=new $m(gt,Tt),Xt=new mp(g,S,B,nt,et,f,c),tt=new Qm(g,et,Tt),Wt=new rg(O,Vt,Tt,nt),Ct=new _p(O,gt,Vt,Tt),vt=new Tp(O,gt,Vt,Tt),Vt.programs=mt.programs,g.capabilities=Tt,g.extensions=gt,g.properties=bt,g.renderLists=ut,g.shadowMap=tt,g.state=nt,g.info=Vt}se();let Bt=new Uo(g,O);this.xr=Bt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=gt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=gt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(w){w!==void 0&&(X=w,this.setSize(P,k,!1))},this.getSize=function(w){return w.set(P,k)},this.setSize=function(w,F,G=!0){if(Bt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=w,k=F,e.width=Math.floor(w*X),e.height=Math.floor(F*X),G===!0&&(e.style.width=w+"px",e.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(P*X,k*X).floor()},this.setDrawingBufferSize=function(w,F,G){P=w,k=F,X=G,e.width=Math.floor(w*G),e.height=Math.floor(F*G),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(Z)},this.setViewport=function(w,F,G,W){w.isVector4?Z.set(w.x,w.y,w.z,w.w):Z.set(w,F,G,W),nt.viewport(y.copy(Z).multiplyScalar(X).floor())},this.getScissor=function(w){return w.copy($)},this.setScissor=function(w,F,G,W){w.isVector4?$.set(w.x,w.y,w.z,w.w):$.set(w,F,G,W),nt.scissor(I.copy($).multiplyScalar(X).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(w){nt.setScissorTest(j=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){V=w},this.getClearColor=function(w){return w.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor.apply(Xt,arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha.apply(Xt,arguments)},this.clear=function(w=!0,F=!0,G=!0){let W=0;if(w){let H=!1;if(E!==null){let lt=E.texture.format;H=lt===Kc||lt===$c||lt===Jc}if(H){let lt=E.texture.type,_t=lt===Tn||lt===Sn||lt===$o||lt===Yn||lt===Yc||lt===Zc,Et=Xt.getClearColor(),Rt=Xt.getClearAlpha(),Ft=Et.r,Pt=Et.g,It=Et.b;_t?(m[0]=Ft,m[1]=Pt,m[2]=It,m[3]=Rt,O.clearBufferuiv(O.COLOR,0,m)):(_[0]=Ft,_[1]=Pt,_[2]=It,_[3]=Rt,O.clearBufferiv(O.COLOR,0,_))}else W|=O.COLOR_BUFFER_BIT}F&&(W|=O.DEPTH_BUFFER_BIT),G&&(W|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",L,!1),e.removeEventListener("webglcontextcreationerror",at,!1),ut.dispose(),Mt.dispose(),bt.dispose(),S.dispose(),B.dispose(),et.dispose(),Dt.dispose(),Wt.dispose(),mt.dispose(),Bt.dispose(),Bt.removeEventListener("sessionstart",Ee),Bt.removeEventListener("sessionend",Kt),dt&&(dt.dispose(),dt=null),we.stop()};function it(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let w=Vt.autoReset,F=tt.enabled,G=tt.autoUpdate,W=tt.needsUpdate,H=tt.type;se(),Vt.autoReset=w,tt.enabled=F,tt.autoUpdate=G,tt.needsUpdate=W,tt.type=H}function at(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ct(w){let F=w.target;F.removeEventListener("dispose",ct),At(F)}function At(w){St(w),bt.remove(w)}function St(w){let F=bt.get(w).programs;F!==void 0&&(F.forEach(function(G){mt.releaseProgram(G)}),w.isShaderMaterial&&mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,G,W,H,lt){F===null&&(F=ht);let _t=H.isMesh&&H.matrixWorld.determinant()<0,Et=Hl(w,F,G,W,H);nt.setMaterial(W,_t);let Rt=G.index,Ft=1;if(W.wireframe===!0){if(Rt=K.getWireframeAttribute(G),Rt===void 0)return;Ft=2}let Pt=G.drawRange,It=G.attributes.position,ae=Pt.start*Ft,Ie=(Pt.start+Pt.count)*Ft;lt!==null&&(ae=Math.max(ae,lt.start*Ft),Ie=Math.min(Ie,(lt.start+lt.count)*Ft)),Rt!==null?(ae=Math.max(ae,0),Ie=Math.min(Ie,Rt.count)):It!=null&&(ae=Math.max(ae,0),Ie=Math.min(Ie,It.count));let pe=Ie-ae;if(pe<0||pe===1/0)return;Dt.setup(H,W,Et,G,Rt);let en,ne=Ct;if(Rt!==null&&(en=Q.get(Rt),ne=vt,ne.setIndex(en)),H.isMesh)W.wireframe===!0?(nt.setLineWidth(W.wireframeLinewidth*Ut()),ne.setMode(O.LINES)):ne.setMode(O.TRIANGLES);else if(H.isLine){let zt=W.linewidth;zt===void 0&&(zt=1),nt.setLineWidth(zt*Ut()),H.isLineSegments?ne.setMode(O.LINES):H.isLineLoop?ne.setMode(O.LINE_LOOP):ne.setMode(O.LINE_STRIP)}else H.isPoints?ne.setMode(O.POINTS):H.isSprite&&ne.setMode(O.TRIANGLES);if(H.isBatchedMesh)ne.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)ne.renderInstances(ae,pe,H.count);else if(G.isInstancedBufferGeometry){let zt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Cr=Math.min(G.instanceCount,zt);ne.renderInstances(ae,pe,Cr)}else ne.render(ae,pe)};function Jt(w,F,G){w.transparent===!0&&w.side===Le&&w.forceSinglePass===!1?(w.side=be,w.needsUpdate=!0,gs(w,F,G),w.side=An,w.needsUpdate=!0,gs(w,F,G),w.side=Le):gs(w,F,G)}this.compile=function(w,F,G=null){G===null&&(G=w),p=Mt.get(G),p.init(),v.push(p),G.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),w!==G&&w.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights(g._useLegacyLights);let W=new Set;return w.traverse(function(H){let lt=H.material;if(lt)if(Array.isArray(lt))for(let _t=0;_t<lt.length;_t++){let Et=lt[_t];Jt(Et,G,H),W.add(Et)}else Jt(lt,G,H),W.add(lt)}),v.pop(),p=null,W},this.compileAsync=function(w,F,G=null){let W=this.compile(w,F,G);return new Promise(H=>{function lt(){if(W.forEach(function(_t){bt.get(_t).currentProgram.isReady()&&W.delete(_t)}),W.size===0){H(w);return}setTimeout(lt,10)}gt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let $t=null;function fe(w){$t&&$t(w)}function Ee(){we.stop()}function Kt(){we.start()}let we=new sl;we.setAnimationLoop(fe),typeof self<"u"&&we.setContext(self),this.setAnimationLoop=function(w){$t=w,Bt.setAnimationLoop(w),w===null?we.stop():we.start()},Bt.addEventListener("sessionstart",Ee),Bt.addEventListener("sessionend",Kt),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Bt.enabled===!0&&Bt.isPresenting===!0&&(Bt.cameraAutoUpdate===!0&&Bt.updateCamera(F),F=Bt.getCamera()),w.isScene===!0&&w.onBeforeRender(g,w,F,E),p=Mt.get(w,v.length),p.init(),v.push(p),ft.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),z.setFromProjectionMatrix(ft),rt=this.localClippingEnabled,J=Lt.init(this.clippingPlanes,rt),x=ut.get(w,d.length),x.init(),d.push(x),Ke(w,F,0,g.sortObjects),x.finish(),g.sortObjects===!0&&x.sort(q,V),this.info.render.frame++,J===!0&&Lt.beginShadows();let G=p.state.shadowsArray;if(tt.render(G,w,F),J===!0&&Lt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Xt.render(x,w),p.setupLights(g._useLegacyLights),F.isArrayCamera){let W=F.cameras;for(let H=0,lt=W.length;H<lt;H++){let _t=W[H];la(x,w,_t,_t.viewport)}}else la(x,w,F);E!==null&&(T.updateMultisampleRenderTarget(E),T.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(g,w,F),Dt.resetDefaultState(),D=-1,M=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function Ke(w,F,G,W){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||z.intersectsSprite(w)){W&&xt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ft);let _t=et.update(w),Et=w.material;Et.visible&&x.push(w,_t,Et,G,xt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||z.intersectsObject(w))){let _t=et.update(w),Et=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),xt.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),xt.copy(_t.boundingSphere.center)),xt.applyMatrix4(w.matrixWorld).applyMatrix4(ft)),Array.isArray(Et)){let Rt=_t.groups;for(let Ft=0,Pt=Rt.length;Ft<Pt;Ft++){let It=Rt[Ft],ae=Et[It.materialIndex];ae&&ae.visible&&x.push(w,_t,ae,G,xt.z,It)}}else Et.visible&&x.push(w,_t,Et,G,xt.z,null)}}let lt=w.children;for(let _t=0,Et=lt.length;_t<Et;_t++)Ke(lt[_t],F,G,W)}function la(w,F,G,W){let H=w.opaque,lt=w.transmissive,_t=w.transparent;p.setupLightsView(G),J===!0&&Lt.setGlobalState(g.clippingPlanes,G),lt.length>0&&kl(H,lt,F,G),W&&nt.viewport(y.copy(W)),H.length>0&&ms(H,F,G),lt.length>0&&ms(lt,F,G),_t.length>0&&ms(_t,F,G),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function kl(w,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;let lt=Tt.isWebGL2;dt===null&&(dt=new dn(1,1,{generateMipmaps:!0,type:gt.has("EXT_color_buffer_half_float")?ns:Tn,minFilter:es,samples:lt?4:0})),g.getDrawingBufferSize(yt),lt?dt.setSize(yt.x,yt.y):dt.setSize(Qs(yt.x),Qs(yt.y));let _t=g.getRenderTarget();g.setRenderTarget(dt),g.getClearColor(Y),C=g.getClearAlpha(),C<1&&g.setClearColor(16777215,.5),g.clear();let Et=g.toneMapping;g.toneMapping=wn,ms(w,G,W),T.updateMultisampleRenderTarget(dt),T.updateRenderTargetMipmap(dt);let Rt=!1;for(let Ft=0,Pt=F.length;Ft<Pt;Ft++){let It=F[Ft],ae=It.object,Ie=It.geometry,pe=It.material,en=It.group;if(pe.side===Le&&ae.layers.test(W.layers)){let ne=pe.side;pe.side=be,pe.needsUpdate=!0,ha(ae,G,W,Ie,pe,en),pe.side=ne,pe.needsUpdate=!0,Rt=!0}}Rt===!0&&(T.updateMultisampleRenderTarget(dt),T.updateRenderTargetMipmap(dt)),g.setRenderTarget(_t),g.setClearColor(Y,C),g.toneMapping=Et}function ms(w,F,G){let W=F.isScene===!0?F.overrideMaterial:null;for(let H=0,lt=w.length;H<lt;H++){let _t=w[H],Et=_t.object,Rt=_t.geometry,Ft=W===null?_t.material:W,Pt=_t.group;Et.layers.test(G.layers)&&ha(Et,F,G,Rt,Ft,Pt)}}function ha(w,F,G,W,H,lt){w.onBeforeRender(g,F,G,W,H,lt),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(g,F,G,W,w,lt),H.transparent===!0&&H.side===Le&&H.forceSinglePass===!1?(H.side=be,H.needsUpdate=!0,g.renderBufferDirect(G,F,W,H,w,lt),H.side=An,H.needsUpdate=!0,g.renderBufferDirect(G,F,W,H,w,lt),H.side=Le):g.renderBufferDirect(G,F,W,H,w,lt),w.onAfterRender(g,F,G,W,H,lt)}function gs(w,F,G){F.isScene!==!0&&(F=ht);let W=bt.get(w),H=p.state.lights,lt=p.state.shadowsArray,_t=H.state.version,Et=mt.getParameters(w,H.state,lt,F,G),Rt=mt.getProgramCacheKey(Et),Ft=W.programs;W.environment=w.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(w.isMeshStandardMaterial?B:S).get(w.envMap||W.environment),Ft===void 0&&(w.addEventListener("dispose",ct),Ft=new Map,W.programs=Ft);let Pt=Ft.get(Rt);if(Pt!==void 0){if(W.currentProgram===Pt&&W.lightsStateVersion===_t)return da(w,Et),Pt}else Et.uniforms=mt.getUniforms(w),w.onBuild(G,Et,g),w.onBeforeCompile(Et,g),Pt=mt.acquireProgram(Et,Rt),Ft.set(Rt,Pt),W.uniforms=Et.uniforms;let It=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(It.clippingPlanes=Lt.uniform),da(w,Et),W.needsLights=Gl(w),W.lightsStateVersion=_t,W.needsLights&&(It.ambientLightColor.value=H.state.ambient,It.lightProbe.value=H.state.probe,It.directionalLights.value=H.state.directional,It.directionalLightShadows.value=H.state.directionalShadow,It.spotLights.value=H.state.spot,It.spotLightShadows.value=H.state.spotShadow,It.rectAreaLights.value=H.state.rectArea,It.ltc_1.value=H.state.rectAreaLTC1,It.ltc_2.value=H.state.rectAreaLTC2,It.pointLights.value=H.state.point,It.pointLightShadows.value=H.state.pointShadow,It.hemisphereLights.value=H.state.hemi,It.directionalShadowMap.value=H.state.directionalShadowMap,It.directionalShadowMatrix.value=H.state.directionalShadowMatrix,It.spotShadowMap.value=H.state.spotShadowMap,It.spotLightMatrix.value=H.state.spotLightMatrix,It.spotLightMap.value=H.state.spotLightMap,It.pointShadowMap.value=H.state.pointShadowMap,It.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=Pt,W.uniformsList=null,Pt}function ua(w){if(w.uniformsList===null){let F=w.currentProgram.getUniforms();w.uniformsList=Ai.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function da(w,F){let G=bt.get(w);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Hl(w,F,G,W,H){F.isScene!==!0&&(F=ht),T.resetTextureUnits();let lt=F.fog,_t=W.isMeshStandardMaterial?F.environment:null,Et=E===null?g.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:un,Rt=(W.isMeshStandardMaterial?B:S).get(W.envMap||_t),Ft=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Pt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),It=!!G.morphAttributes.position,ae=!!G.morphAttributes.normal,Ie=!!G.morphAttributes.color,pe=wn;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(pe=g.toneMapping);let en=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ne=en!==void 0?en.length:0,zt=bt.get(W),Cr=p.state.lights;if(J===!0&&(rt===!0||w!==M)){let Fe=w===M&&W.id===D;Lt.setState(W,w,Fe)}let re=!1;W.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==Cr.state.version||zt.outputColorSpace!==Et||H.isBatchedMesh&&zt.batching===!1||!H.isBatchedMesh&&zt.batching===!0||H.isInstancedMesh&&zt.instancing===!1||!H.isInstancedMesh&&zt.instancing===!0||H.isSkinnedMesh&&zt.skinning===!1||!H.isSkinnedMesh&&zt.skinning===!0||H.isInstancedMesh&&zt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&zt.instancingColor===!1&&H.instanceColor!==null||zt.envMap!==Rt||W.fog===!0&&zt.fog!==lt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==Lt.numPlanes||zt.numIntersection!==Lt.numIntersection)||zt.vertexAlphas!==Ft||zt.vertexTangents!==Pt||zt.morphTargets!==It||zt.morphNormals!==ae||zt.morphColors!==Ie||zt.toneMapping!==pe||Tt.isWebGL2===!0&&zt.morphTargetsCount!==ne)&&(re=!0):(re=!0,zt.__version=W.version);let On=zt.currentProgram;re===!0&&(On=gs(W,F,H));let fa=!1,Hi=!1,Pr=!1,ye=On.getUniforms(),Bn=zt.uniforms;if(nt.useProgram(On.program)&&(fa=!0,Hi=!0,Pr=!0),W.id!==D&&(D=W.id,Hi=!0),fa||M!==w){ye.setValue(O,"projectionMatrix",w.projectionMatrix),ye.setValue(O,"viewMatrix",w.matrixWorldInverse);let Fe=ye.map.cameraPosition;Fe!==void 0&&Fe.setValue(O,xt.setFromMatrixPosition(w.matrixWorld)),Tt.logarithmicDepthBuffer&&ye.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ye.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Hi=!0,Pr=!0)}if(H.isSkinnedMesh){ye.setOptional(O,H,"bindMatrix"),ye.setOptional(O,H,"bindMatrixInverse");let Fe=H.skeleton;Fe&&(Tt.floatVertexTextures?(Fe.boneTexture===null&&Fe.computeBoneTexture(),ye.setValue(O,"boneTexture",Fe.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(ye.setOptional(O,H,"batchingTexture"),ye.setValue(O,"batchingTexture",H._matricesTexture,T));let Lr=G.morphAttributes;if((Lr.position!==void 0||Lr.normal!==void 0||Lr.color!==void 0&&Tt.isWebGL2===!0)&&Ht.update(H,G,On),(Hi||zt.receiveShadow!==H.receiveShadow)&&(zt.receiveShadow=H.receiveShadow,ye.setValue(O,"receiveShadow",H.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Bn.envMap.value=Rt,Bn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),Hi&&(ye.setValue(O,"toneMappingExposure",g.toneMappingExposure),zt.needsLights&&Vl(Bn,Pr),lt&&W.fog===!0&&ot.refreshFogUniforms(Bn,lt),ot.refreshMaterialUniforms(Bn,W,X,k,dt),Ai.upload(O,ua(zt),Bn,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ai.upload(O,ua(zt),Bn,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ye.setValue(O,"center",H.center),ye.setValue(O,"modelViewMatrix",H.modelViewMatrix),ye.setValue(O,"normalMatrix",H.normalMatrix),ye.setValue(O,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let Fe=W.uniformsGroups;for(let Ir=0,Wl=Fe.length;Ir<Wl;Ir++)if(Tt.isWebGL2){let pa=Fe[Ir];Wt.update(pa,On),Wt.bind(pa,On)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return On}function Vl(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Gl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,F,G){bt.get(w.texture).__webglTexture=F,bt.get(w.depthTexture).__webglTexture=G;let W=bt.get(w);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,F){let G=bt.get(w);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,G=0){E=w,R=F,A=G;let W=!0,H=null,lt=!1,_t=!1;if(w){let Rt=bt.get(w);Rt.__useDefaultFramebuffer!==void 0?(nt.bindFramebuffer(O.FRAMEBUFFER,null),W=!1):Rt.__webglFramebuffer===void 0?T.setupRenderTarget(w):Rt.__hasExternalTextures&&T.rebindTextures(w,bt.get(w.texture).__webglTexture,bt.get(w.depthTexture).__webglTexture);let Ft=w.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(_t=!0);let Pt=bt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Pt[F])?H=Pt[F][G]:H=Pt[F],lt=!0):Tt.isWebGL2&&w.samples>0&&T.useMultisampledRTT(w)===!1?H=bt.get(w).__webglMultisampledFramebuffer:Array.isArray(Pt)?H=Pt[G]:H=Pt,y.copy(w.viewport),I.copy(w.scissor),U=w.scissorTest}else y.copy(Z).multiplyScalar(X).floor(),I.copy($).multiplyScalar(X).floor(),U=j;if(nt.bindFramebuffer(O.FRAMEBUFFER,H)&&Tt.drawBuffers&&W&&nt.drawBuffers(w,H),nt.viewport(y),nt.scissor(I),nt.setScissorTest(U),lt){let Rt=bt.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,Rt.__webglTexture,G)}else if(_t){let Rt=bt.get(w.texture),Ft=F||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Rt.__webglTexture,G||0,Ft)}D=-1},this.readRenderTargetPixels=function(w,F,G,W,H,lt,_t){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(Et=Et[_t]),Et){nt.bindFramebuffer(O.FRAMEBUFFER,Et);try{let Rt=w.texture,Ft=Rt.format,Pt=Rt.type;if(Ft!==Ye&&pt.convert(Ft)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let It=Pt===ns&&(gt.has("EXT_color_buffer_half_float")||Tt.isWebGL2&&gt.has("EXT_color_buffer_float"));if(Pt!==Tn&&pt.convert(Pt)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pt===bn&&(Tt.isWebGL2||gt.has("OES_texture_float")||gt.has("WEBGL_color_buffer_float")))&&!It){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-W&&G>=0&&G<=w.height-H&&O.readPixels(F,G,W,H,pt.convert(Ft),pt.convert(Pt),lt)}finally{let Rt=E!==null?bt.get(E).__webglFramebuffer:null;nt.bindFramebuffer(O.FRAMEBUFFER,Rt)}}},this.copyFramebufferToTexture=function(w,F,G=0){let W=Math.pow(2,-G),H=Math.floor(F.image.width*W),lt=Math.floor(F.image.height*W);T.setTexture2D(F,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,w.x,w.y,H,lt),nt.unbindTexture()},this.copyTextureToTexture=function(w,F,G,W=0){let H=F.image.width,lt=F.image.height,_t=pt.convert(G.format),Et=pt.convert(G.type);T.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),F.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,W,w.x,w.y,H,lt,_t,Et,F.image.data):F.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,W,w.x,w.y,F.mipmaps[0].width,F.mipmaps[0].height,_t,F.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,W,w.x,w.y,_t,Et,F.image),W===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),nt.unbindTexture()},this.copyTextureToTexture3D=function(w,F,G,W,H=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let lt=w.max.x-w.min.x+1,_t=w.max.y-w.min.y+1,Et=w.max.z-w.min.z+1,Rt=pt.convert(W.format),Ft=pt.convert(W.type),Pt;if(W.isData3DTexture)T.setTexture3D(W,0),Pt=O.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)T.setTexture2DArray(W,0),Pt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,W.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,W.unpackAlignment);let It=O.getParameter(O.UNPACK_ROW_LENGTH),ae=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ie=O.getParameter(O.UNPACK_SKIP_PIXELS),pe=O.getParameter(O.UNPACK_SKIP_ROWS),en=O.getParameter(O.UNPACK_SKIP_IMAGES),ne=G.isCompressedTexture?G.mipmaps[H]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,ne.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ne.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,w.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,w.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,w.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Pt,H,F.x,F.y,F.z,lt,_t,Et,Rt,Ft,ne.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Pt,H,F.x,F.y,F.z,lt,_t,Et,Rt,ne.data)):O.texSubImage3D(Pt,H,F.x,F.y,F.z,lt,_t,Et,Rt,Ft,ne),O.pixelStorei(O.UNPACK_ROW_LENGTH,It),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ae),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ie),O.pixelStorei(O.UNPACK_SKIP_ROWS,pe),O.pixelStorei(O.UNPACK_SKIP_IMAGES,en),H===0&&W.generateMipmaps&&O.generateMipmap(Pt),nt.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),nt.unbindTexture()},this.resetState=function(){R=0,A=0,E=null,nt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ko?"display-p3":"srgb",e.unpackColorSpace=Yt.workingColorSpace===xr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===xe?Jn:Qc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Jn?xe:un}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Do=class extends as{};Do.prototype.isWebGL1Renderer=!0;var dr=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}},No=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=go,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Te=new N,fr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}setX(t,e){return this.normalized&&(e=qt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Qe(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Qe(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Qe(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Qe(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=qt(e,this.array),n=qt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=qt(e,this.array),n=qt(n,this.array),s=qt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=qt(e,this.array),n=qt(n,this.array),s=qt(s,this.array),r=qt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Zt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},cs=class extends Ln{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},xi,qi=new N,vi=new N,yi=new N,Mi=new Ot,Yi=new Ot,hl=new Qt,zs=new N,Zi=new N,ks=new N,Fc=new Ot,co=new Ot,Oc=new Ot,pr=class extends Ne{constructor(t=new cs){if(super(),this.isSprite=!0,this.type="Sprite",xi===void 0){xi=new _e;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new No(e,5);xi.setIndex([0,1,2,0,2,3]),xi.setAttribute("position",new fr(n,3,0,!1)),xi.setAttribute("uv",new fr(n,2,3,!1))}this.geometry=xi,this.material=t,this.center=new Ot(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vi.setFromMatrixScale(this.matrixWorld),hl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),yi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vi.multiplyScalar(-yi.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Hs(zs.set(-.5,-.5,0),yi,a,vi,s,r),Hs(Zi.set(.5,-.5,0),yi,a,vi,s,r),Hs(ks.set(.5,.5,0),yi,a,vi,s,r),Fc.set(0,0),co.set(1,0),Oc.set(1,1);let o=t.ray.intersectTriangle(zs,Zi,ks,!1,qi);if(o===null&&(Hs(Zi.set(-.5,.5,0),yi,a,vi,s,r),co.set(0,1),o=t.ray.intersectTriangle(zs,ks,Zi,!1,qi),o===null))return;let c=t.ray.origin.distanceTo(qi);c<t.near||c>t.far||e.push({distance:c,point:qi.clone(),uv:qn.getInterpolation(qi,zs,Zi,ks,Fc,co,Oc,new Ot),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Hs(i,t,e,n,s,r){Mi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Yi.x=r*Mi.x-s*Mi.y,Yi.y=s*Mi.x+r*Mi.y):Yi.copy(Mi),i.copy(t),i.x+=Yi.x,i.y+=Yi.y,i.applyMatrix4(hl)}var In=class extends Zt{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Si=new Qt,Bc=new Qt,Vs=[],zc=new fn,og=new Qt,Ji=new ce,$i=new Pn,Ui=class extends ce{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new In(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,og)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Si),zc.copy(t.boundingBox).applyMatrix4(Si),this.boundingBox.union(zc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Si),$i.copy(t.boundingSphere).applyMatrix4(Si),this.boundingSphere.union($i)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ji.geometry=this.geometry,Ji.material=this.material,Ji.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$i.copy(this.boundingSphere),$i.applyMatrix4(n),t.ray.intersectsSphere($i)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Si),Bc.multiplyMatrices(n,Si),Ji.matrixWorld=Bc,Ji.raycast(t,Vs);for(let a=0,o=Vs.length;a<o;a++){let c=Vs[a];c.instanceId=r,c.object=this,e.push(c)}Vs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new In(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Fo=class extends Ln{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},kc=new Qt,Oo=new ss,Gs=new Pn,Ws=new N,ls=class extends Ne{constructor(t=new _e,e=new Fo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(s),Gs.radius+=r,t.ray.intersectsSphere(Gs)===!1)return;kc.copy(s).invert(),Oo.copy(t.ray).applyMatrix4(kc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=f,x=m;_<x;_++){let p=l.getX(_);Ws.fromBufferAttribute(u,p),Hc(Ws,p,c,s,t,e,this)}}else{let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,x=m;_<x;_++)Ws.fromBufferAttribute(u,_),Hc(Ws,_,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Hc(i,t,e,n,s,r,a){let o=Oo.distanceSqToPoint(i);if(o<e){let c=new N;Oo.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,object:a})}}var mr=class extends He{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var pn=class i extends _e{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],m=[],_=0,x=[],p=n/2,d=0;v(),a===!1&&(t>0&&g(!0),e>0&&g(!1)),this.setIndex(h),this.setAttribute("position",new ge(u,3)),this.setAttribute("normal",new ge(f,3)),this.setAttribute("uv",new ge(m,2));function v(){let b=new N,R=new N,A=0,E=(e-t)/n;for(let D=0;D<=r;D++){let M=[],y=D/r,I=y*(e-t)+t;for(let U=0;U<=s;U++){let Y=U/s,C=Y*c+o,P=Math.sin(C),k=Math.cos(C);R.x=I*P,R.y=-y*n+p,R.z=I*k,u.push(R.x,R.y,R.z),b.set(P,E,k).normalize(),f.push(b.x,b.y,b.z),m.push(Y,1-y),M.push(_++)}x.push(M)}for(let D=0;D<s;D++)for(let M=0;M<r;M++){let y=x[M][D],I=x[M+1][D],U=x[M+1][D+1],Y=x[M][D+1];h.push(y,I,Y),h.push(I,U,Y),A+=6}l.addGroup(d,A,0),d+=A}function g(b){let R=_,A=new Ot,E=new N,D=0,M=b===!0?t:e,y=b===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,p*y,0),f.push(0,y,0),m.push(.5,.5),_++;let I=_;for(let U=0;U<=s;U++){let C=U/s*c+o,P=Math.cos(C),k=Math.sin(C);E.x=M*k,E.y=p*y,E.z=M*P,u.push(E.x,E.y,E.z),f.push(0,y,0),A.x=P*.5+.5,A.y=k*.5*y+.5,m.push(A.x,A.y),_++}for(let U=0;U<s;U++){let Y=R+U,C=I+U;b===!0?h.push(C,C+1,Y):h.push(C+1,C,Y),D+=3}l.addGroup(d,D,b===!0?1:2),d+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Bo=class i extends _e{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new ge(r,3)),this.setAttribute("normal",new ge(r.slice(),3)),this.setAttribute("uv",new ge(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let g=new N,b=new N,R=new N;for(let A=0;A<e.length;A+=3)m(e[A+0],g),m(e[A+1],b),m(e[A+2],R),c(g,b,R,v)}function c(v,g,b,R){let A=R+1,E=[];for(let D=0;D<=A;D++){E[D]=[];let M=v.clone().lerp(b,D/A),y=g.clone().lerp(b,D/A),I=A-D;for(let U=0;U<=I;U++)U===0&&D===A?E[D][U]=M:E[D][U]=M.clone().lerp(y,U/I)}for(let D=0;D<A;D++)for(let M=0;M<2*(A-D)-1;M++){let y=Math.floor(M/2);M%2===0?(f(E[D][y+1]),f(E[D+1][y]),f(E[D][y])):(f(E[D][y+1]),f(E[D+1][y+1]),f(E[D+1][y]))}}function l(v){let g=new N;for(let b=0;b<r.length;b+=3)g.x=r[b+0],g.y=r[b+1],g.z=r[b+2],g.normalize().multiplyScalar(v),r[b+0]=g.x,r[b+1]=g.y,r[b+2]=g.z}function h(){let v=new N;for(let g=0;g<r.length;g+=3){v.x=r[g+0],v.y=r[g+1],v.z=r[g+2];let b=p(v)/2/Math.PI+.5,R=d(v)/Math.PI+.5;a.push(b,1-R)}_(),u()}function u(){for(let v=0;v<a.length;v+=6){let g=a[v+0],b=a[v+2],R=a[v+4],A=Math.max(g,b,R),E=Math.min(g,b,R);A>.9&&E<.1&&(g<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),R<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function m(v,g){let b=v*3;g.x=t[b+0],g.y=t[b+1],g.z=t[b+2]}function _(){let v=new N,g=new N,b=new N,R=new N,A=new Ot,E=new Ot,D=new Ot;for(let M=0,y=0;M<r.length;M+=9,y+=6){v.set(r[M+0],r[M+1],r[M+2]),g.set(r[M+3],r[M+4],r[M+5]),b.set(r[M+6],r[M+7],r[M+8]),A.set(a[y+0],a[y+1]),E.set(a[y+2],a[y+3]),D.set(a[y+4],a[y+5]),R.copy(v).add(g).add(b).divideScalar(3);let I=p(R);x(A,y+0,v,I),x(E,y+2,g,I),x(D,y+4,b,I)}}function x(v,g,b,R){R<0&&v.x===1&&(a[g]=v.x-1),b.x===0&&b.z===0&&(a[g]=R/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var gr=class i extends Bo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Di=class i extends _e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new N,f=new N,m=[],_=[],x=[],p=[];for(let d=0;d<=n;d++){let v=[],g=d/n,b=0;d===0&&a===0?b=.5/e:d===n&&c===Math.PI&&(b=-.5/e);for(let R=0;R<=e;R++){let A=R/e;u.x=-t*Math.cos(s+A*r)*Math.sin(a+g*o),u.y=t*Math.cos(a+g*o),u.z=t*Math.sin(s+A*r)*Math.sin(a+g*o),_.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),p.push(A+b,1-g),v.push(l++)}h.push(v)}for(let d=0;d<n;d++)for(let v=0;v<e;v++){let g=h[d][v+1],b=h[d][v],R=h[d+1][v],A=h[d+1][v+1];(d!==0||a>0)&&m.push(g,b,A),(d!==n-1||c<Math.PI)&&m.push(b,R,A)}this.setIndex(m),this.setAttribute("position",new ge(_,3)),this.setAttribute("normal",new ge(x,3)),this.setAttribute("uv",new ge(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Xs(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ag(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ni=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},zo=class extends Ni{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ya,endingEnd:Ya}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Za:r=t,o=2*e-n;break;case Ja:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Za:a=t,c=2*n-e;break;case Ja:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,m=this._weightNext,_=(n-e)/(s-e),x=_*_,p=x*_,d=-f*p+2*f*x-f*_,v=(1+f)*p+(-1.5-2*f)*x+(-.5+f)*_+1,g=(-1-m)*p+(1.5+m)*x+.5*_,b=m*p-m*x;for(let R=0;R!==o;++R)r[R]=d*a[h+R]+v*a[l+R]+g*a[c+R]+b*a[u+R];return r}},ko=class extends Ni{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Ho=class extends Ni{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Je=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Xs(e,this.TimeBufferType),this.values=Xs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Xs(t.times,Array),values:Xs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ho(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new zo(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ys:e=this.InterpolantFactoryMethodDiscrete;break;case Zs:e=this.InterpolantFactoryMethodLinear;break;case zr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ys;case this.InterpolantFactoryMethodLinear:return Zs;case this.InterpolantFactoryMethodSmooth:return zr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&ag(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===zr,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let u=o*n,f=u-n,m=u+n;for(let _=0;_!==n;++_){let x=e[u+_];if(x!==e[f+_]||x!==e[m+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let u=o*n,f=a*n;for(let m=0;m!==n;++m)e[f+m]=e[u+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Je.prototype.TimeBufferType=Float32Array;Je.prototype.ValueBufferType=Float32Array;Je.prototype.DefaultInterpolation=Zs;var Kn=class extends Je{};Kn.prototype.ValueTypeName="bool";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=Ys;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var Vo=class extends Je{};Vo.prototype.ValueTypeName="color";var Go=class extends Je{};Go.prototype.ValueTypeName="number";var Wo=class extends Ni{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)Cn.slerpFlat(r,0,a,l-o,a,l,c);return r}},hs=class extends Je{InterpolantFactoryMethodLinear(t){return new Wo(this.times,this.values,this.getValueSize(),t)}};hs.prototype.ValueTypeName="quaternion";hs.prototype.DefaultInterpolation=Zs;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var jn=class extends Je{};jn.prototype.ValueTypeName="string";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=Ys;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Xo=class extends Je{};Xo.prototype.ValueTypeName="vector";var qo=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let m=l[u],_=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return _}return null}}},cg=new qo,Yo=class{constructor(t){this.manager=t!==void 0?t:cg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Yo.DEFAULT_MATERIAL_NAME="__DEFAULT";var ta="\\[\\]\\.:\\/",lg=new RegExp("["+ta+"]","g"),ea="[^"+ta+"]",hg="[^"+ta.replace("\\.","")+"]",ug=/((?:WC+[\/:])*)/.source.replace("WC",ea),dg=/(WCOD+)?/.source.replace("WCOD",hg),fg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ea),pg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ea),mg=new RegExp("^"+ug+dg+fg+pg+"$"),gg=["material","materials","bones","map"],Zo=class{constructor(t,e,n){let s=n||te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},te=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(lg,"")}static parseTrackName(t){let e=mg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);gg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};te.Composite=Zo;te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};te.prototype.GetterByBindingType=[te.prototype._getValue_direct,te.prototype._getValue_array,te.prototype._getValue_arrayElement,te.prototype._getValue_toArray];te.prototype.SetterByBindingTypeAndVersioning=[[te.prototype._setValue_direct,te.prototype._setValue_direct_setNeedsUpdate,te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[te.prototype._setValue_array,te.prototype._setValue_array_setNeedsUpdate,te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[te.prototype._setValue_arrayElement,te.prototype._setValue_arrayElement_setNeedsUpdate,te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[te.prototype._setValue_fromArray,te.prototype._setValue_fromArray_setNeedsUpdate,te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qg=new Float32Array(1);var Fi=class{constructor(t,e,n=0,s=1/0){this.ray=new ss(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new rs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,n=[]){return Jo(t,this,n,e),n.sort(Vc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Jo(t[s],this,n,e);return n.sort(Vc),n}};function Vc(i,t){return i.distance-t.distance}function Jo(i,t,e,n){if(i.layers.test(t.layers)&&i.raycast(t,e),n===!0){let s=i.children;for(let r=0,a=s.length;r<a;r++)Jo(s[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");async function ul(i){let t=atob(i),e=new Uint8Array(t.length);for(let a=0;a<t.length;a++)e[a]=t.charCodeAt(a);let n=new DecompressionStream("gzip"),s=new Blob([e]).stream().pipeThrough(n),r=await new Response(s).arrayBuffer();return _g(r)}var ia=class{constructor(t){this.dv=new DataView(t),this.o=0}u8(){return this.dv.getUint8(this.o++)}i8(){return this.dv.getInt8(this.o++)}u16(){let t=this.dv.getUint16(this.o,!0);return this.o+=2,t}i16(){let t=this.dv.getInt16(this.o,!0);return this.o+=2,t}u32(){let t=this.dv.getUint32(this.o,!0);return this.o+=4,t}i32(){let t=this.dv.getInt32(this.o,!0);return this.o+=4,t}};function zi(i){let t=i.u16(),e=new Float32Array(t*2),n=i.i32(),s=i.i32();e[0]=n*.1,e[1]=s*.1;for(let r=1;r<t;r++){let a=i.i16(),o=i.i16();a===32767&&o===32767?(n=i.i32(),s=i.i32()):(n+=a,s+=o),e[r*2]=n*.1,e[r*2+1]=s*.1}return e}function na(i){let t=i.u32(),e=new Float32Array(t*2);if(!t)return e;let n=i.i32(),s=i.i32();e[0]=n*.1,e[1]=s*.1;for(let r=1;r<t;r++){let a=i.i16(),o=i.i16();a===32767&&o===32767?(n=i.i32(),s=i.i32()):(n+=a,s+=o),e[r*2]=n*.1,e[r*2+1]=s*.1}return e}function _g(i){let t=new ia(i),e=String.fromCharCode(t.u8(),t.u8(),t.u8(),t.u8());if(e!=="TLV1")throw new Error("bad magic "+e);let n=t.u32(),s=JSON.parse(new TextDecoder().decode(new Uint8Array(i,t.o,n)));t.o+=n;let r={meta:s,buildings:[],roads:[],areas:[],trees:null,lamps:null,signals:null,sea:null};for(;t.o<i.byteLength;){let a=t.u8(),o=t.u32(),c=t.o+o;if(a===1){let l=t.u32();for(let h=0;h<l;h++){let u=t.u8(),f=t.u8(),m=t.u16()*.1,_=t.u16()*.1,x=t.u16(),p=t.u8();t.u8();let d=t.u8(),v=[];for(let g=0;g<d;g++){let b=zi(t),R=t.u8(),A=[];for(let E=0;E<R;E++)A.push(zi(t));v.push({outer:b,inners:A})}r.buildings.push({part:u,ty:f,h:m,mh:_,nm:x,col:p,outers:v})}}else if(a===2){let l=t.u32();for(let h=0;h<l;h++){let u=t.u8(),f=t.u8(),m=t.i8();t.u8(),r.roads.push({cls:u,oneway:f,layer:m,pts:zi(t)})}}else if(a===3){let l=t.u32();for(let h=0;h<l;h++){let u=t.u8(),f=t.u16(),m=t.u8(),_=[];for(let x=0;x<m;x++){let p=zi(t),d=t.u8(),v=[];for(let g=0;g<d;g++)v.push(zi(t));_.push({outer:p,inners:v})}r.areas.push({ty:u,nm:f,outers:_})}}else a===4?r.trees=na(t):a===5?r.lamps=na(t):a===6?r.signals=na(t):a===7&&t.u32()>0&&(r.sea=zi(t));t.o=c}return r}function yr(i,t,e){return[(t-i.lon0)*i.mlon,(i.lat0-e)*i.mlat]}var ca=jl(gl());function Ug(i,t){return i=`#include <common>
#include <logdepthbuf_pars_vertex>
`+i.replace(/}\s*$/,`
#include <logdepthbuf_vertex>
}`),t=`#include <common>
#include <logdepthbuf_pars_fragment>
`+t.replace("void main() {",`void main() {
#include <logdepthbuf_fragment>`),[i,t]}function mn(i){let[t,e]=Ug(i.vertexShader,i.fragmentShader);return new Ze({...i,vertexShader:t,fragmentShader:e})}var ps=`
uniform vec3 uFogColor;
uniform float uFogDensity;
vec3 applyFog(vec3 col, float dist) {
  float f = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
  return mix(col, uFogColor, clamp(f, 0.0, 1.0));
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`;function _l(){return{uSunDir:{value:new N(.4,.8,.2)},uSunColor:{value:new wt("#fff2dd")},uAmbSky:{value:new wt("#b8cfe0")},uAmbGround:{value:new wt("#8c8474")},uFogColor:{value:new wt("#d8e2ea")},uFogDensity:{value:45e-6},uNight:{value:0},uWindowLitFrac:{value:.34},uCamPos:{value:new N},uTime:{value:0}}}function xl(i,t){let e=(i%24+24)%24,s=69*Math.sin(Math.PI*(e-6.1)/12.7),r=84+(e-6.1)/12.7*196,a=$e.degToRad(Math.max(s,-30)),o=$e.degToRad(r),c=$e.smoothstep(-s,-1.5,7.5),l=Math.exp(-Math.pow((s-7)/11,2));s>-4?t.uSunDir.value.set(Math.sin(o)*Math.cos(a),Math.sin(a),-Math.cos(o)*Math.cos(a)).normalize():t.uSunDir.value.set(-.45,.62,.55).normalize();let h=(_,x,p)=>new wt(_).lerp(new wt(x),$e.clamp(p,0,1)),f=h("#fff3de","#ffa261",l).multiplyScalar(1.95*Math.max(0,Math.min(1,(s+3)/12))),m=new wt("#5d6f96").multiplyScalar(.5);return t.uSunColor.value.copy(f.lerp(m,c)),t.uAmbSky.value.copy(h("#b9d0e2","#c9a68c",l*.7).lerp(new wt("#36486b"),c).multiplyScalar(1.12)),t.uAmbGround.value.copy(h("#8f8878","#8a7462",l).lerp(new wt("#1c2438"),c)),t.uFogColor.value.copy(h("#dde6ee","#eccaa6",l*.85).lerp(new wt("#0d1420"),c)),t.uFogDensity.value=26e-6+l*12e-6+c*9e-6,t.uNight.value=c,{altDeg:s,azDeg:r,night:c,dusk:l}}function vl(i){return mn({uniforms:i,side:Le,vertexShader:`
      attribute vec3 color;
      attribute float aId;
      attribute float aFlags;
      varying vec3 vWorld;
      varying vec3 vColor;
      varying vec2 vUv;
      varying float vId;
      varying float vFlags;
      void main() {
        vWorld = position;
        vColor = color;
        vUv = uv;
        vId = aId;
        vFlags = aFlags;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform vec3 uSunDir, uSunColor, uAmbSky, uAmbGround, uCamPos;
      uniform float uNight, uWindowLitFrac;
      varying vec3 vWorld;
      varying vec3 vColor;
      varying vec2 vUv;
      varying float vId;
      varying float vFlags;
      ${ps}
      void main() {
        vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
        vec3 col = vColor;
        vec3 emit = vec3(0.0);
        bool wall = vUv.y > -900.0;
        float glass = mod(vFlags, 2.0);
        float camDist = length(uCamPos - vWorld);
        float dayWinFade = 1.0 - smoothstep(500.0, 1400.0, camDist);
        float emitFade = 1.0 - smoothstep(3000.0, 10000.0, camDist) * 0.8;
        if (wall) {
          vec2 cell = vec2(vUv.x / 3.35, vWorld.y / 3.02);
          vec2 f = fract(cell);
          vec2 id = floor(cell);
          float inWin = step(0.16, f.x) * step(f.x, 0.80) * step(0.22, f.y) * step(f.y, 0.78);
          float rnd = hash12(id * 1.03 + vec2(vId * 0.719, vId * 0.133));
          col = mix(col, col * vec3(0.60, 0.65, 0.74), inWin * (0.5 + 0.3 * glass) * dayWinFade);
          float lit = step(rnd, uWindowLitFrac + glass * 0.25) * inWin;
          vec3 warm = mix(vec3(1.0, 0.82, 0.5), vec3(0.72, 0.83, 1.0), step(0.86, fract(rnd * 9.0)));
          emit = lit * uNight * warm * (0.55 + 0.75 * fract(rnd * 13.0)) * emitFade;
        }
        vec3 V = normalize(uCamPos - vWorld);
        float fres = pow(1.0 - abs(dot(N, V)), 3.0);
        vec3 skyRef = uAmbSky * 1.35 + uSunColor * 0.12;
        float floorLine = glass * (1.0 - step(0.12, fract(vWorld.y / 3.02))) * 0.35 * dayWinFade;
        col = mix(col, mix(col * 0.7, skyRef, 0.30 + 0.45 * fres), glass * 0.72);
        col *= 1.0 - floorLine;
        float lam = max(dot(N, uSunDir), 0.0);
        vec3 hemi = mix(uAmbGround, uAmbSky, N.y * 0.5 + 0.5);
        float ao = clamp(vWorld.y / 7.0, 0.0, 1.0) * 0.30 + 0.70;
        float sunScale = mix(1.0, 0.62, clamp(N.y, 0.0, 1.0));
        vec3 outCol = col * (uSunColor * lam * sunScale + hemi * 1.05) * ao + emit;
        gl_FragColor = vec4(applyFog(outCol, camDist), 1.0);
      }`})}function yl(i){return mn({uniforms:i,side:Le,vertexShader:`
      attribute vec3 color;
      varying vec3 vColor;
      varying vec3 vWorld;
      void main() {
        vColor = color;
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform vec3 uSunDir, uSunColor, uAmbSky, uAmbGround, uCamPos;
      varying vec3 vColor;
      varying vec3 vWorld;
      ${ps}
      void main() {
        float n = hash12(floor(vWorld.xz * 0.55)) * 0.06 - 0.03;
        vec3 col = vColor * (1.0 + n);
        vec3 light = uSunColor * 0.38 * max(uSunDir.y, 0.0) + mix(uAmbGround, uAmbSky, 1.0) * 0.85;
        vec3 outCol = col * light;
        gl_FragColor = vec4(applyFog(outCol, length(uCamPos - vWorld)), 1.0);
      }`})}function Ml(i){return mn({uniforms:i,side:Le,vertexShader:`
      varying vec3 vWorld;
      void main() {
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform vec3 uSunDir, uSunColor, uAmbSky, uCamPos;
      uniform float uNight, uTime;
      varying vec3 vWorld;
      ${ps}
      float wnoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x),
                   mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
      }
      void main() {
        vec2 p = vWorld.xz;
        float t = uTime;
        float w = wnoise(p * 0.020 + vec2(t * 0.06, t * 0.028))
                + wnoise(p * 0.061 - vec2(t * 0.05, t * 0.09)) * 0.5
                + wnoise(p * 0.16 + vec2(t * 0.12, -t * 0.07)) * 0.25;
        w /= 1.75;
        float dist = length(uCamPos - vWorld);
        float att = clamp(1.0 - dist / 2600.0, 0.0, 1.0);
        vec3 N = normalize(vec3(dFdx(w) * 34.0 * att, 1.0, dFdy(w) * 34.0 * att));
        vec3 deep = mix(vec3(0.075, 0.26, 0.34), vec3(0.015, 0.05, 0.10), uNight);
        vec3 shallow = mix(vec3(0.13, 0.42, 0.47), vec3(0.03, 0.09, 0.14), uNight);
        vec3 col = mix(deep, shallow, w * w);
        vec3 V = normalize(uCamPos - vWorld);
        float fres = pow(1.0 - max(dot(vec3(0, 1, 0), V), 0.0), 2.2);
        col = mix(col, uAmbSky * (1.1 - 0.5 * uNight), fres * 0.75);
        vec3 R = reflect(-uSunDir, N);
        float spec = pow(max(dot(R, V), 0.0), 220.0) * (1.4 - uNight * 0.7) * (0.25 + 0.75 * att);
        // broad sun-glitter streak on the horizon-facing water
        vec2 sunH = normalize(uSunDir.xz + vec2(1e-5));
        vec2 vH = normalize(-V.xz + vec2(1e-5));
        float streak = pow(max(dot(sunH, vH), 0.0), 22.0) * pow(1.0 - abs(V.y), 3.0) * 0.35 * max(uSunDir.y + 0.05, 0.0);
        col += uSunColor * (spec + streak);
        // beyond ~12 km collapse to one far-sea tone (kills mega-triangle
        // shading artifacts; fog takes over anyway)
        float farMix = smoothstep(9000.0, 16000.0, dist);
        col = mix(col, deep * 0.9 + uAmbSky * 0.22, farMix);
        gl_FragColor = vec4(applyFog(col, dist), 1.0);
      }`})}function Sl(i){return mn({uniforms:i,side:Le,transparent:!0,depthWrite:!1,vertexShader:`
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform float uTime, uNight;
      uniform vec3 uCamPos;
      varying vec2 vUv;
      varying vec3 vWorld;
      ${ps}
      void main() {
        float wavePhase = sin(uTime * 0.9 + vUv.x * 0.05);
        float band = fract(vUv.y + wavePhase * 0.22 + uTime * 0.05);
        float a = smoothstep(0.0, 0.25, band) * (1.0 - smoothstep(0.45, 1.0, band));
        a *= 0.32 + 0.20 * sin(uTime * 1.7 + vUv.x * 0.21);
        a *= (1.0 - uNight * 0.55);
        float f = exp(-uFogDensity * uFogDensity * pow(length(uCamPos - vWorld), 2.0));
        gl_FragColor = vec4(vec3(0.93, 0.97, 1.0), a * clamp(f, 0.0, 1.0));
      }`})}function bl(i){return mn({uniforms:i,side:be,depthWrite:!1,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = (projectionMatrix * mv).xyww;
      }`,fragmentShader:`
      uniform vec3 uSunDir, uSunColor, uAmbSky, uFogColor;
      uniform float uNight;
      varying vec3 vDir;
      float hash13(vec3 p3) {
        p3 = fract(p3 * 0.1031);
        p3 += dot(p3, p3.zyx + 31.32);
        return fract((p3.x + p3.y) * p3.z);
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 zenithDay = mix(vec3(0.35, 0.56, 0.80), vec3(0.03, 0.05, 0.12), uNight);
        vec3 horizon = mix(uFogColor, uFogColor * 1.1, 0.5);
        vec3 col = mix(horizon, zenithDay, pow(h, 0.62));
        float sunAmt = pow(max(dot(d, uSunDir), 0.0), 900.0);
        float glow = pow(max(dot(d, uSunDir), 0.0), 14.0);
        col += uSunColor * (sunAmt * 1.6 + glow * 0.16) * (1.0 - uNight * 0.75);
        // stars
        vec3 sp = floor(d * 380.0);
        float star = step(0.9985, hash13(sp)) * uNight * smoothstep(0.04, 0.3, d.y);
        col += vec3(star) * (0.5 + 0.5 * hash13(sp + 7.0));
        // city glow near horizon at night
        col += vec3(0.32, 0.22, 0.12) * uNight * pow(1.0 - h, 5.0);
        gl_FragColor = vec4(col, 1.0);
      }`})}function wr(i,t={}){return mn({uniforms:{...i,uEmColor:{value:new wt(t.emColor||"#ffc27d")}},vertexShader:`
      attribute vec3 aInstColor;
      attribute float aEm;
      varying vec3 vColor;
      varying vec3 vNormalW;
      varying vec3 vWorld;
      varying float vEm;
      void main() {
        vColor = aInstColor;
        vEm = aEm;
        mat4 im = instanceMatrix;
        vec4 wp = im * vec4(position, 1.0);
        vWorld = wp.xyz;
        vNormalW = normalize(mat3(im) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,fragmentShader:`
      uniform vec3 uSunDir, uSunColor, uAmbSky, uAmbGround, uCamPos, uEmColor;
      uniform float uNight;
      varying vec3 vColor;
      varying vec3 vNormalW;
      varying vec3 vWorld;
      varying float vEm;
      ${ps}
      void main() {
        vec3 N = normalize(vNormalW);
        float lam = max(dot(N, uSunDir), 0.0);
        vec3 hemi = mix(uAmbGround, uAmbSky, N.y * 0.5 + 0.5);
        vec3 col = vColor * (uSunColor * lam + hemi * 1.05);
        // aEm 1 = warm lamp at night, 2 = red, 3 = white headlight
        if (vEm > 0.5) {
          vec3 e = uEmColor;
          if (vEm > 2.5) e = vec3(1.0, 0.97, 0.85);
          else if (vEm > 1.5) e = vec3(1.0, 0.16, 0.12);
          col = mix(col, e * 1.6, uNight * 0.96);
        }
        gl_FragColor = vec4(applyFog(col, length(uCamPos - vWorld)), 1.0);
      }`})}function El(i){return mn({uniforms:i,transparent:!0,depthWrite:!1,blending:Ri,vertexShader:`
      uniform vec3 uCamPos;
      varying float vFade;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float d = length(mv.xyz);
        gl_PointSize = clamp(3400.0 / d, 3.0, 28.0);
        vFade = clamp(1.0 - d / 22000.0, 0.05, 1.0);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform float uNight;
      varying float vFade;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float a = smoothstep(0.5, 0.04, length(c));
        gl_FragColor = vec4(vec3(1.0, 0.74, 0.45) * 1.6, a * a * uNight * vFade);
      }`})}function Dn(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ti(i,t,e){let n=!1,s=i.length/2;for(let r=0,a=s-1;r<s;a=r++){let o=i[r*2],c=i[r*2+1],l=i[a*2],h=i[a*2+1];c>e!=h>e&&t<(l-o)*(e-c)/(h-c)+o&&(n=!n)}return n}function Dg(i){let t=0,e=i.length/2;for(let n=0,s=e-1;n<e;s=n++)t+=i[s*2]*i[n*2+1]-i[n*2]*i[s*2+1];return t/2}var Gt=i=>{let t=parseInt(i.slice(1),16);return[t>>16&255,t>>8&255,t&255]},gn={res:["#f1ece1","#ece5d6","#e8dfcd","#f4efe6","#e2d9c6","#efe8db","#e6ddcf","#dfd6c0"].map(Gt),comm:["#ddd8cc","#d0ccc2","#cfc7b8","#d8d2c8"].map(Gt),ind:["#c9c4ba","#bdb8ae","#cfcabf"].map(Gt),worship:["#f6f1e8","#efe9dd"].map(Gt),public:["#e5ded0","#dcd5c5"].map(Gt),hotel:["#eee9df","#e4dfd5"].map(Gt),glass:["#9fb6c9","#8fa8bd","#a8bccc","#8298ae"].map(Gt)},Ng=[gn.res,gn.glass,gn.ind,gn.worship,gn.hotel,gn.public,gn.comm],Fg=[[19,.3,Gt("#33363c")],[15,.27,Gt("#3a3d43")],[12,.25,Gt("#3e4147")],[9.5,.23,Gt("#43464c")],[7,.21,Gt("#4a4d52")],[4.2,.19,Gt("#54565a")],[2.7,.17,Gt("#a39b8d")],[3.4,.15,Gt("#5a5550")],[4.5,.45,Gt("#b0aa9e")]],Og={0:[Gt("#2e6d84"),.06],1:[Gt("#83a45f"),.12],2:[Gt("#5f8148"),.13],3:[Gt("#ecdcb0"),.09],4:[Gt("#6f9c74"),.18],5:[Gt("#3ec3de"),.3],6:[Gt("#62656a"),.1],7:[Gt("#74875c"),.11],8:[Gt("#d8d1bf"),.105],9:[Gt("#cbc4b4"),.14],10:[Gt("#b5afa2"),.55],11:[Gt("#a09a90"),.35]},Tr=()=>new Promise(requestAnimationFrame),Un=class{constructor(t){this.pos=[],this.col=[],this.idx=[],this.n=0,t&&(this.uv=[],this.id=[],this.flags=[])}vert(t,e,n,s,r,a,o,c){return this.pos.push(t,e,n),this.col.push(s[0],s[1],s[2]),this.uv&&(this.uv.push(r,a),this.id.push(o),this.flags.push(c)),this.n++}geometry(){let t=new _e;return t.setAttribute("position",new Zt(new Float32Array(this.pos),3)),t.setAttribute("color",new Zt(new Uint8Array(this.col),3,!0)),this.uv&&(t.setAttribute("uv",new Zt(new Float32Array(this.uv),2)),t.setAttribute("aId",new Zt(new Float32Array(this.id),1)),t.setAttribute("aFlags",new Zt(new Uint8Array(this.flags),1))),t.setIndex(new Zt(this.n>65500?new Uint32Array(this.idx):new Uint16Array(this.idx),1)),t.computeBoundingSphere(),t}};async function Tl(i,t,e,n){let s={tileMeshes:[],buildingMeta:[],carPaths:[],parks:[],roadsForGreen:[],dudSpots:[],acSpots:[],beacons:[],coastLine:null,stats:{}},r=1500,a=new Map,o=(U,Y)=>{let C=Math.floor(U/r)+":"+Math.floor(Y/r),P=a.get(C);return P||(P=new Un(!0),a.set(C,P)),P},c=i.buildings,l=6e4,h=3e4;for(let U=0;U<c.length;U+=2400){let Y=Math.min(c.length,U+2400);for(let C=U;C<Y;C++){let P=c[C],k=Dn(C*2654435761+7),X=P.h,q=P.mh;if(X<=0){let ht=[8,12,5.5,8,15,9,10][P.ty]||8,Ut=[9,16,5,5,12,9,12][P.ty]||8;X=ht+k()*Ut}q>0&&X<=q&&(X=q+4);let V=X>=76||P.ty===6&&X>=42?1:0,Z;if(P.col>0&&i.meta.colours[P.col-1])Z=Gt(i.meta.colours[P.col-1]);else{let ht=V?gn.glass:Ng[P.ty]||gn.res;Z=ht[k()*ht.length|0]}let $=.95+k()*.09,j=[Math.min(255,Z[0]*$)|0,Math.min(255,Z[1]*$)|0,Math.min(255,Z[2]*$)|0],z=[j[0]*.82|0,j[1]*.82|0,j[2]*.83|0],J=P.outers[0].outer,rt=Math.abs(Dg(J));if(rt<4)continue;let dt=0,ft=0;for(let ht=0;ht<J.length;ht+=2)dt+=J[ht],ft+=J[ht+1];dt/=J.length/2,ft/=J.length/2;let yt=s.buildingMeta.length;s.buildingMeta.push({nm:P.nm!==65535?i.meta.names[P.nm]:null,h:X,ty:P.ty,cx:dt,cz:ft,part:P.part});let xt=o(dt,ft);for(let{outer:ht,inners:Ut}of P.outers){for(let nt of[ht,...Ut]){let Vt=nt.length/2,bt=0;for(let T=0;T<Vt;T++){let S=(T+1)%Vt,B=nt[T*2],Q=nt[T*2+1],K=nt[S*2],et=nt[S*2+1],mt=Math.hypot(K-B,et-Q);if(mt<.05)continue;let ot=xt.vert(B,q,Q,j,bt,0,yt,V),ut=xt.vert(K,q,et,j,bt+mt,0,yt,V),Mt=xt.vert(K,X,et,j,bt+mt,0,yt,V),Lt=xt.vert(B,X,Q,j,bt,0,yt,V);xt.idx.push(ot,ut,Mt,ot,Mt,Lt),bt+=mt}}let O=[],oe=[];for(let nt=0;nt<ht.length;nt+=2)O.push(ht[nt],ht[nt+1]);for(let nt of Ut){oe.push(O.length/2);for(let Vt=0;Vt<nt.length;Vt+=2)O.push(nt[Vt],nt[Vt+1])}let gt=(0,ca.default)(O,oe.length?oe:null,2),Tt=xt.n;for(let nt=0;nt<O.length;nt+=2)xt.vert(O[nt],X,O[nt+1],z,0,-1e3,yt,V);for(let nt=0;nt<gt.length;nt++)xt.idx.push(Tt+gt[nt])}if(!P.part&&X>=5.5&&rt>=90){let ht=P.ty===0||P.ty===5,Ut=ht&&X<=42&&l>0,O=(!ht||X>42||P.ty===6)&&h>0,oe=Math.min(5,1+(rt/260|0)),gt=Bg(J);for(let Tt=0;Tt<oe;Tt++){let nt=0,Vt=0,bt=!1;for(let T=0;T<8;T++)if(nt=gt[0]+k()*(gt[2]-gt[0]),Vt=gt[1]+k()*(gt[3]-gt[1]),ti(J,nt,Vt)){bt=!0;break}bt&&(Ut?(s.dudSpots.push(nt,X,Vt,k()*Math.PI*2),l--):O&&(s.acSpots.push(nt,X,Vt,k()*Math.PI*2),h--))}}X>=100&&s.beacons.push(dt,X+2.5,ft)}n(.05+.45*(Y/c.length),"\u05D1\u05D5\u05E0\u05D4 "+c.length.toLocaleString("he")+" \u05D1\u05E0\u05D9\u05D9\u05E0\u05D9\u05DD\u2026"),await Tr()}let u=vl(e);for(let U of a.values()){let Y=new ce(U.geometry(),u);Y.matrixAutoUpdate=!1,t.add(Y),s.tileMeshes.push(Y)}let f=yl(e),m=new Un(!1),_=i.roads,x=0;for(let U=0;U<_.length;U+=9e3){let Y=Math.min(_.length,U+9e3);for(let C=U;C<Y;C++){let P=_[C],[k,X,q]=Fg[P.cls],V=X+Math.max(0,P.layer)*7,Z=P.layer>0?[q[0]*.92|0,q[1]*.92|0,q[2]*.92|0]:q,$=zg(m,P.pts,k,V,Z);x+=$,P.layer>0&&kg(m,P.pts,k,V,1.6,Gt("#46464a")),P.cls<=4&&$>150&&s.carPaths.push(Hg(P.pts,V,P.oneway,P.cls,$)),P.cls>=3&&P.cls<=6&&s.roadsForGreen.push({pts:P.pts,w:k,cls:P.cls,i:C})}n(.5+.12*(Y/_.length),"\u05E1\u05D5\u05DC\u05DC "+_.length.toLocaleString("he")+" \u05DB\u05D1\u05D9\u05E9\u05D9\u05DD\u2026"),await Tr()}let p=new ce(m.geometry(),f);p.matrixAutoUpdate=!1,t.add(p),s.stats.roadKm=Math.round(x/1e3);let d=new Un(!1),v=i.areas;for(let U=0;U<v.length;U+=2600){let Y=Math.min(v.length,U+2600);for(let C=U;C<Y;C++){let P=v[C],k=Og[P.ty];if(!k)continue;let[X,q]=k;P.ty===4&&Dn(C*977+3)()<.3&&(X=Gt("#b3794e"));for(let{outer:V,inners:Z}of P.outers)wl(d,V,Z,q,X),(P.ty===1||P.ty===2)&&s.parks.push({outer:V,inners:Z,dense:P.ty===2})}n(.62+.06*(Y/v.length),"\u05DE\u05E9\u05EA\u05D9\u05DC \u05E4\u05D0\u05E8\u05E7\u05D9\u05DD, \u05D7\u05D5\u05E4\u05D9\u05DD \u05D5\u05DE\u05D2\u05E8\u05E9\u05D9\u05DD\u2026"),await Tr()}let g=new ce(d.geometry(),f);g.matrixAutoUpdate=!1,t.add(g);let b=new Un(!1),R=i.meta.bbox.map(U=>U*.1),A=R[0]-2500,E=R[1]-2500,D=R[2]+2500,M=R[3]+2500,y=Gt("#b3aa9c");{let U=b.vert(A,-1.2,E,y),Y=b.vert(D,-1.2,E,y),C=b.vert(D,-1.2,M,y),P=b.vert(A,-1.2,M,y);b.idx.push(U,Y,C,U,C,P)}let I=new ce(b.geometry(),f);if(I.matrixAutoUpdate=!1,t.add(I),i.sea){let U=new Un(!1);wl(U,i.sea,[],-.2,[255,255,255]);let Y=[255,255,255],C=4100,P=34e3;((j,z,J,rt)=>{let dt=U.vert(j,-.42,z,Y),ft=U.vert(J,-.42,z,Y),yt=U.vert(J,-.42,rt,Y),xt=U.vert(j,-.42,rt,Y);U.idx.push(dt,ft,yt,dt,yt,xt)})(R[0]-P,R[1]-P,R[0]-C+100,R[3]+P);let X=U.geometry(),q=new ce(X,Ml(e));q.matrixAutoUpdate=!1,t.add(q);let V=(j,z)=>j>R[0]-1500&&j<R[2]+1500&&z>R[1]-1500&&z<R[3]+1500,Z=[],$=[];for(let j=0;j<i.sea.length;j+=2){let z=i.sea[j],J=i.sea[j+1];V(z,J)?$.push(z,J):$.length&&(Z.push($),$=[])}if($.length&&Z.push($),Z.sort((j,z)=>z.length-j.length),Z.length){s.coastLine=new Float32Array(Z[0]);let j=new Un(!1);Ar(j,s.coastLine,i.sea,15,-.08);let z=j.geometry();z.setAttribute("uv",new Zt(new Float32Array(j.uvArr),2));let J=new ce(z,Sl(e));J.matrixAutoUpdate=!1,t.add(J)}}return n(.7,"\u05E9\u05D5\u05E4\u05DA \u05D0\u05EA \u05D4\u05D9\u05DD \u05D4\u05EA\u05D9\u05DB\u05D5\u05DF\u2026"),await Tr(),s.flatMat=f,s.buildingsMat=u,s}function Bg(i){let t=1e9,e=1e9,n=-1e9,s=-1e9;for(let r=0;r<i.length;r+=2){let a=i[r],o=i[r+1];a<t&&(t=a),a>n&&(n=a),o<e&&(e=o),o>s&&(s=o)}return[t,e,n,s]}function wl(i,t,e,n,s){let r=[],a=[];for(let l=0;l<t.length;l+=2)r.push(t[l],t[l+1]);for(let l of e){a.push(r.length/2);for(let h=0;h<l.length;h+=2)r.push(l[h],l[h+1])}let o=(0,ca.default)(r,a.length?a:null,2),c=i.n;for(let l=0;l<r.length;l+=2)i.vert(r[l],n,r[l+1],s);for(let l=0;l<o.length;l++)i.idx.push(c+o[l])}function zg(i,t,e,n,s){let r=t.length/2;if(r<2)return 0;let a=e/2,o=0,c=-1,l=-1;for(let h=0;h<r;h++){let u=t[h*2],f=t[h*2+1],m=0,_=0,x=0,p=0;if(h>0){m=u-t[(h-1)*2],_=f-t[(h-1)*2+1];let U=Math.hypot(m,_)||1;m/=U,_/=U,o+=U}if(h<r-1){x=t[(h+1)*2]-u,p=t[(h+1)*2+1]-f;let U=Math.hypot(x,p)||1;x/=U,p/=U}let d=m+x,v=_+p,g=Math.hypot(d,v)||1;d/=g,v/=g;let b=-v,R=d,A=d*x+v*p,E=Math.min(2.2,1/Math.max(.45,Math.abs(A)<1&&Math.sqrt((1+Math.max(-.99,m*x+_*p))/2)||1)),D=b*a*E,M=R*a*E,y=i.vert(u-D,n,f-M,s),I=i.vert(u+D,n,f+M,s);c>=0&&i.idx.push(c,l,I,c,I,y),c=y,l=I}return o}function kg(i,t,e,n,s,r){let a=t.length/2,o=e/2;for(let c of[-1,1]){let l=-1,h=-1;for(let u=0;u<a;u++){let f=t[u*2],m=t[u*2+1],_=0,x=0;u>0&&(_+=f-t[(u-1)*2],x+=m-t[(u-1)*2+1]),u<a-1&&(_+=t[(u+1)*2]-f,x+=t[(u+1)*2+1]-m);let p=Math.hypot(_,x)||1,d=-x/p*c,v=_/p*c,g=i.vert(f+d*o,n,m+v*o,r),b=i.vert(f+d*o,n-s,m+v*o,r);l>=0&&i.idx.push(l,h,b,l,b,g),l=g,h=b}}}function Ar(i,t,e,n,s){let r=t.length/2;i.uvArr=[];let a=-1,o=-1,c=0;for(let l=0;l<r;l++){let h=t[l*2],u=t[l*2+1],f=0,m=0;l>0&&(f+=h-t[(l-1)*2],m+=u-t[(l-1)*2+1],c+=Math.hypot(h-t[(l-1)*2],u-t[(l-1)*2+1])),l<r-1&&(f+=t[(l+1)*2]-h,m+=t[(l+1)*2+1]-u);let _=Math.hypot(f,m)||1,x=-m/_,p=f/_;if(l===0)ti(e,h+x*20,u+p*20)||(x=-x,p=-p),Ar.sign=[x,p];else{let[g,b]=Ar.sign;x*g+p*b<0&&(x=-x,p=-p),Ar.sign=[x,p]}let d=i.vert(h,s,u,[255,255,255]),v=i.vert(h+x*n,s,u+p*n,[255,255,255]);i.uvArr.push(c,0,c,1),a>=0&&i.idx.push(a,o,v,a,v,d),a=d,o=v}}function Hg(i,t,e,n,s){let r=i.length/2,a=new Float32Array(r);for(let o=1;o<r;o++)a[o]=a[o-1]+Math.hypot(i[o*2]-i[(o-1)*2],i[o*2+1]-i[(o-1)*2+1]);return{pts:i,cum:a,len:s,y:t,oneway:e,cls:n}}function tn(i){let t=[],e=[],n=[];for(let{geo:r,mat4:a,e:o}of i){let c=r.toNonIndexed();a&&c.applyMatrix4(a);let l=c.getAttribute("position"),h=c.getAttribute("normal");for(let u=0;u<l.count;u++)t.push(l.getX(u),l.getY(u),l.getZ(u)),e.push(h.getX(u),h.getY(u),h.getZ(u)),n.push(o||0);r.dispose()}let s=new _e;return s.setAttribute("position",new Zt(new Float32Array(t),3)),s.setAttribute("normal",new Zt(new Float32Array(e),3)),s.setAttribute("aEm",new Zt(new Float32Array(n),1)),s}var ee=(i,t,e,n=0,s=0,r=0,a=1)=>{let o=new Qt;return o.makeRotationFromEuler(new $n(s,n,r)),o.scale(new N(a,a,a)),o.setPosition(i,t,e),o};function Nn(i,t,e,n={}){let s=new Ui(i,wr(e,n),t.length),r=new Float32Array(t.length*3),a=new Qt,o=new $n,c=new N;for(let l=0;l<t.length;l++){let h=t[l];o.set(0,h.ry||0,0),a.makeRotationFromEuler(o);let u=h.s||1;a.scale(c.set(u,h.sy||u,u)),a.setPosition(h.x,h.y,h.z),s.setMatrixAt(l,a),r[l*3]=h.c[0],r[l*3+1]=h.c[1],r[l*3+2]=h.c[2]}return i.setAttribute("aInstColor",new In(r,3)),s.instanceMatrix.needsUpdate=!0,s.frustumCulled=!1,s}var Al=["#4e7a38","#5d8a42","#6b9450","#47703a","#557d3d","#728f4e","#3f6b33"].map(i=>new wt(i).toArray()),Vg=["#4a7a3a","#568444","#5f8f4a"].map(i=>new wt(i).toArray());function Cl(i,t,e,n,s=95e3){let r=Dn(1234567),a=[],o=[],c=i.trees;for(let d=0;d<c.length;d+=2)a.push({x:c[d],z:c[d+1],s:1.1+r()*1.3});for(let d of t.parks){if(a.length>s)break;let v=[1e9,1e9,-1e9,-1e9],g=d.outer;for(let A=0;A<g.length;A+=2)v[0]=Math.min(v[0],g[A]),v[1]=Math.min(v[1],g[A+1]),v[2]=Math.max(v[2],g[A]),v[3]=Math.max(v[3],g[A+1]);let b=d.dense?11:15,R=d.dense?.8:.5;for(let A=v[0];A<v[2];A+=b)for(let E=v[1];E<v[3];E+=b){if(r()>R)continue;let D=A+(r()-.5)*9,M=E+(r()-.5)*9;if(!ti(g,D,M))continue;let y=!1;for(let I of d.inners)if(ti(I,D,M)){y=!0;break}y||a.push({x:D,z:M,s:.9+r()*1.5})}}for(let d of t.roadsForGreen){if(a.length>s)break;let v=Dn(d.i*31+5)(),g=d.cls===6?.42:d.cls===3?.4:.3;if(v>g)continue;let b=d.pts,R=d.w/2+2.8,A=0;for(let E=1;E<b.length/2;E++){let D=b[(E-1)*2],M=b[(E-1)*2+1],y=b[E*2],I=b[E*2+1],U=y-D,Y=I-M,C=Math.hypot(U,Y),P=26-A;for(;P<C;){let k=D+U/C*P,X=M+Y/C*P,q=-Y/C,V=U/C;for(let Z of[1,-1])r()<.82&&a.push({x:k+q*R*Z+(r()-.5)*2,z:X+V*R*Z+(r()-.5)*2,s:.8+r()*.9});P+=26}A=(A+C)%26}}if(t.coastLine&&i.sea){let d=t.coastLine,v=0;for(let g=1;g<d.length/2;g++){let b=d[(g-1)*2],R=d[(g-1)*2+1],A=d[g*2],E=d[g*2+1],D=A-b,M=E-R,y=Math.hypot(D,M),I=24-v;for(;I<y;){let U=b+D/y*I,Y=R+M/y*I,C=-M/y,P=D/y;ti(i.sea,U+C*25,Y+P*25)&&(C=-C,P=-P),r()<.75&&o.push({x:U+C*24,z:Y+P*24,s:.85+r()*.5}),r()<.4&&o.push({x:U+C*46,z:Y+P*46,s:.8+r()*.5}),I+=24}v=(v+y)%24}}let l=new ke,h=tn([{geo:new pn(.13,.2,2.6,5,1,!0),mat4:ee(0,1.3,0)}]),u=tn([{geo:new gr(1.65,0),mat4:ee(0,3.4,0,0,0,0,1)}]),f=a.map(d=>({x:d.x,y:.05,z:d.z,ry:0,s:.8+d.s*.3,sy:d.s,c:[.34,.25,.18]})),m=a.map((d,v)=>({x:d.x,y:.05+(d.s-1)*2.2,z:d.z,ry:0,s:d.s,sy:d.s*1.05,c:Al[v%Al.length]}));l.add(Nn(h,f,e)),l.add(Nn(u,m,e));let _=[];for(let d=0;d<7;d++){let v=d/7*Math.PI*2,g=new os(3.2,.7,3,1),b=g.getAttribute("position");for(let R=0;R<b.count;R++){let A=b.getX(R);b.setY(R,-Math.pow(Math.max(0,A+1.6)/3.2,2)*1.3)}g.computeVertexNormals(),_.push({geo:g,mat4:ee(Math.cos(v)*1.1,7.1,Math.sin(v)*1.1,-v,0,0)})}let x=tn([{geo:new pn(.14,.23,7,5,1,!0),mat4:ee(0,3.5,0)},..._]),p=o.map((d,v)=>({x:d.x,y:.05,z:d.z,ry:v*2.39%6.28,s:d.s,c:Vg[v%3]}));return p.length&&l.add(Nn(x,p,e)),n.add(l),{group:l,treeCount:a.length+o.length}}function Pl(i,t,e,n){let s=Dn(99991),r=[],a=i.lamps;for(let E=0;E<a.length;E+=2)r.push({x:a[E],z:a[E+1]});let o=[42,44,52,62,76];for(let E of t.carPaths){if(r.length>3e4)break;if(E.cls>4)continue;let D=o[E.cls],M=E.pts,y=0,I=1;for(let U=1;U<M.length/2;U++){let Y=M[(U-1)*2],C=M[(U-1)*2+1],P=M[U*2],k=M[U*2+1],X=P-Y,q=k-C,V=Math.hypot(X,q),Z=D-y;for(;Z<V;){let $=Y+X/V*Z,j=C+q/V*Z,z=-q/V,J=X/V,rt=E.cls<=1?8.2:5.2;r.push({x:$+z*rt*I,z:j+J*rt*I,y:E.y}),I=-I,Z+=D}y=(y+V)%D}}let c=new ke,l=tn([{geo:new pn(.06,.09,5.4,5,1,!0),mat4:ee(0,2.7,0)},{geo:new le(1,.07,.07),mat4:ee(.45,5.35,0)},{geo:new Di(.19,5,3),mat4:ee(.85,5.3,0),e:1}]),h=r.map(E=>({x:E.x,y:E.y||.15,z:E.z,ry:s()*6.28,s:1,c:[.22,.23,.25]}));c.add(Nn(l,h,e));let u=new Float32Array(r.length*3);r.forEach((E,D)=>{u[D*3]=E.x+.8,u[D*3+1]=(E.y||.15)+5.35,u[D*3+2]=E.z});let f=new _e;f.setAttribute("position",new Zt(u,3));let m=new ls(f,El(e));m.frustumCulled=!1,c.add(m);let _=i.signals,x=tn([{geo:new pn(.05,.07,3.1,4,1,!0),mat4:ee(0,1.55,0)},{geo:new le(.26,.72,.22),mat4:ee(0,3.35,0),e:1}]),p=[];for(let E=0;E<_.length;E+=2)p.push({x:_[E],y:.15,z:_[E+1],ry:s()*6.28,s:1,c:[.15,.16,.18]});p.length&&c.add(Nn(x,p,e,{emColor:"#ffb033"}));let d=tn([{geo:new pn(.5,.5,1.7,6),mat4:ee(0,.62,0,0,0,Math.PI/2)},{geo:new le(1.55,.06,1.15),mat4:ee(0,.45,1.05,0,-.5,0)}]),v=[],g=t.dudSpots;for(let E=0;E<g.length;E+=4)v.push({x:g[E],y:g[E+1],z:g[E+2],ry:g[E+3],s:.9+E%5*.05,c:[.92,.92,.9]});v.length&&c.add(Nn(d,v,e));let b=tn([{geo:new le(1.25,.72,.95),mat4:ee(0,.36,0)}]),R=[],A=t.acSpots;for(let E=0;E<A.length;E+=4)R.push({x:A[E],y:A[E+1],z:A[E+2],ry:A[E+3],s:.9+E%4*.12,c:[.7,.71,.72]});if(R.length&&c.add(Nn(b,R,e)),t.beacons.length){let E=new _e;E.setAttribute("position",new Zt(new Float32Array(t.beacons),3));let D=mn({uniforms:e,transparent:!0,depthWrite:!1,blending:Ri,vertexShader:`
        varying float vPhase;
        void main() {
          vPhase = fract(position.x * 0.137 + position.z * 0.291);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(1500.0 / length(mv.xyz), 2.0, 10.0);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform float uTime, uNight;
        varying float vPhase;
        void main() {
          float blink = smoothstep(0.4, 0.5, fract(uTime * 0.6 + vPhase));
          vec2 c = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.1, length(c)) * blink * (0.25 + 0.75 * uNight);
          gl_FragColor = vec4(1.0, 0.12, 0.1, a);
        }`}),M=new ls(E,D);M.frustumCulled=!1,c.add(M)}return n.add(c),{group:c,lampCount:r.length}}var Rl=["#e8e8e8","#d0d0d0","#b8bcc0","#3a3d42","#606468","#8f9296","#ffffff","#c0392b","#2c5f8a","#7a6a52","#e8e8e8","#f0f0f0"].map(i=>new wt(i).toArray());function Ll(i,t,e){let n=Dn(424242),s=[26,52,88,140,260],r=[24,13.5,11.5,9.5,7],a=[],o=[],c=[...i.carPaths].sort((v,g)=>v.cls-g.cls);for(let v of c){let g=Math.floor(v.len/s[v.cls]);for(let b=0;b<g&&a.length<2200;b++)a.push({p:v,s:n()*v.len,dir:v.oneway||n()<.5?1:-1,v:r[v.cls]*(.85+n()*.4),lane:v.cls<=1?n()<.5?2.1:5.6:1.9,seg:0,ci:n()*Rl.length|0});v.cls<=2&&v.len>500&&o.length<110&&n()<.5&&o.push({p:v,s:n()*v.len,dir:v.oneway||n()<.5?1:-1,v:r[v.cls]*.8,lane:2.2,seg:0,ci:0})}let l=tn([{geo:new le(4.2,.95,1.8),mat4:ee(0,.65,0)},{geo:new le(2.3,.65,1.62),mat4:ee(-.25,1.42,0)},{geo:new le(.1,.22,.38),mat4:ee(2.08,.62,.55),e:3},{geo:new le(.1,.22,.38),mat4:ee(2.08,.62,-.55),e:3},{geo:new le(.08,.2,.42),mat4:ee(-2.12,.68,.6),e:2},{geo:new le(.08,.2,.42),mat4:ee(-2.12,.68,-.6),e:2}]),h=tn([{geo:new le(10.8,2.9,2.5),mat4:ee(0,1.75,0)},{geo:new le(.12,.3,.5),mat4:ee(5.42,.8,.75),e:3},{geo:new le(.12,.3,.5),mat4:ee(5.42,.8,-.75),e:3}]),u=new ke,f=new Ui(l,wr(t),a.length),m=new Ui(h,wr(t),o.length),_=new Float32Array(a.length*3);a.forEach((v,g)=>{let b=Rl[v.ci];_.set(b,g*3)}),l.setAttribute("aInstColor",new In(_,3));let x=new Float32Array(o.length*3);o.forEach((v,g)=>x.set([.16,.5,.3],g*3)),h.setAttribute("aInstColor",new In(x,3)),f.frustumCulled=!1,m.frustumCulled=!1,u.add(f,m),e.add(u);let p=new Qt;function d(v,g,b){for(let R=0;R<v.length;R++){let A=v[R],E=A.p;A.s+=A.v*A.dir*b,A.s>=E.len&&(E.oneway?A.s-=E.len:(A.dir=-1,A.s=E.len-.01)),A.s<0&&(E.oneway?A.s+=E.len:(A.dir=1,A.s=.01));let D=E.cum,M=E.pts,y=Math.min(A.seg,D.length-2);for(;y<D.length-2&&D[y+1]<A.s;)y++;for(;y>0&&D[y]>A.s;)y--;A.seg=y;let I=D[y+1]-D[y]||1,U=(A.s-D[y])/I,Y=M[y*2],C=M[y*2+1],P=(M[(y+1)*2]-Y)*A.dir,k=(M[(y+1)*2+1]-C)*A.dir,X=Math.hypot(P,k)||1,q=P/X,V=k/X,Z=-V,$=q,j=Y+(M[(y+1)*2]-Y)*U+Z*A.lane,z=C+(M[(y+1)*2+1]-C)*U+$*A.lane;p.makeRotationY(Math.atan2(-V,q)),p.setPosition(j,E.y+.15,z),g.setMatrixAt(R,p)}g.instanceMatrix.needsUpdate=!0}return{group:u,count:a.length+o.length,update(v){d(a,f,v),d(o,m,v)}}}function Il(i,t,e,n,s){let r=Dn(777),a=[],o=(f,m,_,x)=>{let[p,d]=e(n,f,m);for(let v=0;v<_;v++)a.push({x:p+(r()-.5)*x,z:d+(r()-.5)*x,ry:r()*6.28,s:.7+r()*.9})};o(34.7655,32.0873,26,220),o(34.7509,32.0532,12,160),o(34.7692,32.0965,8,200);for(let f=0;f<14;f++){let m=-3800-r()*2600,_=-6e3+r()*11e3;a.push({x:m,z:_,ry:r()*6.28,s:.8+r()*.7})}let c=s?a.filter(f=>ti(s,f.x,f.z)):a,l=tn([{geo:new le(4.6,.75,1.55),mat4:ee(0,.28,0)},{geo:new le(1.6,.7,1.1),mat4:ee(-.4,.95,0)},{geo:new pn(.035,.05,4.6,4),mat4:ee(.5,2.6,0)}]),h=c.map((f,m)=>({x:f.x,y:-.3,z:f.z,ry:f.ry,s:f.s,c:m%5===0?[.75,.8,.85]:[.94,.94,.92]})),u=Nn(l,h,i);return t.add(u),{group:u,count:h.length}}var Rr=class{constructor(t,e,n){this.camera=t,this.dom=e,this.bounds=n,this.target=new N(0,0,0),this.yaw=.35,this.pitch=1.05,this.dist=4500,this.keys=new Set,this.userMoved=!1,this._drag=null,this._touches=new Map,this._raycaster=new Fi,this._plane=new Xe(new N(0,1,0),0),e.addEventListener("pointerdown",s=>this._down(s)),window.addEventListener("pointermove",s=>this._move(s)),window.addEventListener("pointerup",s=>this._up(s)),e.addEventListener("wheel",s=>this._wheel(s),{passive:!1}),e.addEventListener("contextmenu",s=>s.preventDefault()),window.addEventListener("keydown",s=>{s.target.tagName==="INPUT"||s.target.tagName==="SELECT"||(this.keys.add(s.code),["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","KeyR","KeyF"].includes(s.code)&&(this.userMoved=!0))}),window.addEventListener("keyup",s=>this.keys.delete(s.code))}_down(t){if(this.dom.setPointerCapture?.(t.pointerId),this._touches.set(t.pointerId,{x:t.clientX,y:t.clientY}),this._touches.size===1)this._drag={x:t.clientX,y:t.clientY,btn:t.button,shift:t.shiftKey,moved:0};else{this._drag=null;let e=[...this._touches.values()];this._pinch={d:Math.hypot(e[0].x-e[1].x,e[0].y-e[1].y),cx:(e[0].x+e[1].x)/2,cy:(e[0].y+e[1].y)/2}}}_move(t){let e=this._touches.get(t.pointerId);if(e&&(e.x=t.clientX,e.y=t.clientY),this._touches.size===2&&this._pinch){let r=[...this._touches.values()],a=Math.hypot(r[0].x-r[1].x,r[0].y-r[1].y),o=(r[0].x+r[1].x)/2,c=(r[0].y+r[1].y)/2;this.dist=$e.clamp(this.dist*(this._pinch.d/Math.max(20,a)),60,32e3),this._panPixels(o-this._pinch.cx,c-this._pinch.cy),this._pinch={d:a,cx:o,cy:c},this.userMoved=!0;return}if(!this._drag)return;let n=t.clientX-this._drag.x,s=t.clientY-this._drag.y;this._drag.x=t.clientX,this._drag.y=t.clientY,this._drag.moved+=Math.abs(n)+Math.abs(s),this._drag.moved>4&&(this.userMoved=!0),this._drag.btn===2||this._drag.shift?this._panPixels(n,s):(this.yaw-=n*.0052,this.pitch=$e.clamp(this.pitch-s*.0042,.08,1.52))}_up(t){this._touches.delete(t.pointerId),this._touches.size<2&&(this._pinch=null),this._touches.size===0&&(this._drag=null)}_panPixels(t,e){let n=this.dist/this.dom.clientHeight*1.35,s=Math.sin(this.yaw),r=Math.cos(this.yaw);this.target.x-=(r*t-s*e)*n,this.target.z-=(-s*t-r*e)*n,this._clamp()}_wheel(t){t.preventDefault(),this.userMoved=!0;let e=Math.exp(t.deltaY*.0011),n=this.dom.getBoundingClientRect(),s=(t.clientX-n.left)/n.width*2-1,r=-((t.clientY-n.top)/n.height)*2+1;this._raycaster.setFromCamera({x:s,y:r},this.camera);let a=new N;if(this._raycaster.ray.intersectPlane(this._plane,a)){let o=1-e;this.target.x+=(a.x-this.target.x)*o,this.target.z+=(a.z-this.target.z)*o}this.dist=$e.clamp(this.dist*e,60,32e3),this._clamp()}_clamp(){let t=this.bounds;this.target.x=$e.clamp(this.target.x,t.x0-2e3,t.x1+2e3),this.target.z=$e.clamp(this.target.z,t.z0-2e3,t.z1+2e3)}update(t){let e=this.dist*.9*t,n=Math.sin(this.yaw),s=Math.cos(this.yaw);this.keys.has("KeyW")&&(this.target.x+=n*e,this.target.z-=s*e),this.keys.has("KeyS")&&(this.target.x-=n*e,this.target.z+=s*e),this.keys.has("KeyA")&&(this.target.x-=s*e,this.target.z-=n*e),this.keys.has("KeyD")&&(this.target.x+=s*e,this.target.z+=n*e),this.keys.has("KeyQ")&&(this.yaw+=1.4*t),this.keys.has("KeyE")&&(this.yaw-=1.4*t),this.keys.has("KeyR")&&(this.dist=Math.max(60,this.dist*(1-1.2*t))),this.keys.has("KeyF")&&(this.dist=Math.min(32e3,this.dist*(1+1.2*t))),this._clamp(),this.apply()}apply(){let t=Math.cos(this.pitch),e=Math.sin(this.pitch),n=Math.sin(this.yaw),s=Math.cos(this.yaw),r=this.target.x-n*t*this.dist,a=this.target.z+s*t*this.dist,o=this.target.y+e*this.dist;this.camera.position.set(r,Math.max(2.5,o),a),this.camera.lookAt(this.target.x,this.target.y,this.target.z)}flyTo(t,e=2.4){this.userMoved=!1;let n={x:this.target.x,z:this.target.z,yaw:this.yaw,pitch:this.pitch,dist:this.dist},s=t.yaw??this.yaw;for(;s-n.yaw>Math.PI;)s-=Math.PI*2;for(;s-n.yaw<-Math.PI;)s+=Math.PI*2;let r=performance.now();return new Promise(a=>{let o=()=>{if(this.userMoved)return a(!1);let c=Math.min(1,(performance.now()-r)/(e*1e3)),l=c<.5?4*c*c*c:1-Math.pow(-2*c+2,3)/2;this.target.x=n.x+(t.x-n.x)*l,this.target.z=n.z+(t.z-n.z)*l,this.yaw=n.yaw+(s-n.yaw)*l,this.pitch=n.pitch+((t.pitch??n.pitch)-n.pitch)*l,this.dist=n.dist*Math.pow((t.dist??n.dist)/n.dist,l),c<1?requestAnimationFrame(o):a(!0)};o()})}};var ei=[{nm:"\u05DE\u05E8\u05DB\u05D6 \u05E2\u05D6\u05E8\u05D9\u05D0\u05DC\u05D9",lon:34.7925,lat:32.0748,dist:950,pitch:.62,yaw:.7,h:190},{nm:"\u05DE\u05D2\u05D3\u05DC \u05E2\u05D6\u05E8\u05D9\u05D0\u05DC\u05D9 \u05E9\u05E8\u05D5\u05E0\u05D4",lon:34.78585,lat:32.07165,dist:1e3,pitch:.6,yaw:-.5,h:245},{nm:"\u05DE\u05D2\u05D3\u05DC \u05E9\u05DC\u05D5\u05DD \u05DE\u05D0\u05D9\u05E8",lon:34.7699,lat:32.0637,dist:700,pitch:.65,yaw:.4,h:145},{nm:"\u05DB\u05D9\u05DB\u05E8 \u05D3\u05D9\u05D6\u05E0\u05D2\u05D5\u05E3",lon:34.7746,lat:32.0779,dist:450,pitch:.8,yaw:0,h:45},{nm:"\u05DB\u05D9\u05DB\u05E8 \u05E8\u05D1\u05D9\u05DF",lon:34.7805,lat:32.0805,dist:500,pitch:.8,yaw:.3,h:45},{nm:"\u05D4\u05D1\u05D9\u05DE\u05D4",lon:34.7793,lat:32.0729,dist:450,pitch:.78,yaw:-.4,h:40},{nm:"\u05E9\u05D3\u05E8\u05D5\u05EA \u05E8\u05D5\u05D8\u05E9\u05D9\u05DC\u05D3",lon:34.7714,lat:32.0645,dist:600,pitch:.7,yaw:.9,h:55},{nm:"\u05E9\u05D5\u05E7 \u05D4\u05DB\u05E8\u05DE\u05DC",lon:34.7683,lat:32.0684,dist:450,pitch:.75,yaw:.2,h:35},{nm:"\u05E0\u05D5\u05D5\u05D4 \u05E6\u05D3\u05E7",lon:34.7638,lat:32.0603,dist:500,pitch:.7,yaw:-.3,h:35},{nm:"\u05E9\u05E2\u05D5\u05DF \u05D9\u05E4\u05D5",lon:34.7522,lat:32.0537,dist:550,pitch:.68,yaw:-.6,h:40},{nm:"\u05E0\u05DE\u05DC \u05D9\u05E4\u05D5",lon:34.7508,lat:32.0528,dist:700,pitch:.6,yaw:1.2,h:30},{nm:"\u05DE\u05E8\u05D9\u05E0\u05D4 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1",lon:34.7663,lat:32.0868,dist:800,pitch:.6,yaw:-1,h:35},{nm:"\u05E0\u05DE\u05DC \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1",lon:34.7723,lat:32.0967,dist:700,pitch:.65,yaw:-.8,h:30},{nm:"\u05E4\u05D0\u05E8\u05E7 \u05D4\u05D9\u05E8\u05E7\u05D5\u05DF",lon:34.79,lat:32.0975,dist:1200,pitch:.7,yaw:.5,h:45},{nm:"\u05DE\u05D2\u05D3\u05DC\u05D9 \u05D4\u05D1\u05D5\u05E8\u05E1\u05D4",lon:34.8035,lat:32.0832,dist:1100,pitch:.6,yaw:-.7,h:240},{nm:"\u05D0\u05D5\u05E0\u05D9\u05D1\u05E8\u05E1\u05D9\u05D8\u05EA \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1",lon:34.8036,lat:32.113,dist:1e3,pitch:.7,yaw:.4,h:60}];function Nl(i){for(let t of ei){let[e,n]=yr(i,t.lon,t.lat);t.x=e,t.z=n}}function Fl(i){let t=new ke;for(let e of ei){let n=document.createElement("canvas"),s=n.getContext("2d");s.font='600 44px system-ui, "Segoe UI", Arial';let r=Math.ceil(s.measureText(e.nm).width)+56;n.width=r,n.height=84;let a=n.getContext("2d");a.font='600 44px system-ui, "Segoe UI", Arial',a.fillStyle="rgba(12,16,26,0.78)",Ul(a,0,6,r,66,30),a.fill(),a.strokeStyle="rgba(255,255,255,0.28)",a.lineWidth=2,Ul(a,1,7,r-2,64,29),a.stroke(),a.fillStyle="#fff",a.textAlign="center",a.textBaseline="middle",a.fillText(e.nm,r/2,40),a.fillStyle="rgba(12,16,26,0.78)",a.beginPath(),a.moveTo(r/2-10,70),a.lineTo(r/2+10,70),a.lineTo(r/2,84),a.fill();let o=new mr(n);o.anisotropy=4;let c=new cs({map:o,depthTest:!1,transparent:!0,sizeAttenuation:!1}),l=new pr(c),h=.052;l.scale.set(r/84*h,h,1),l.position.set(e.x,e.h+60,e.z),l.renderOrder=20,t.add(l)}return i.add(t),t}function Ul(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}var Dl=["\u05DE\u05D2\u05D5\u05E8\u05D9\u05DD","\u05DE\u05D2\u05D3\u05DC","\u05EA\u05E2\u05E9\u05D9\u05D9\u05D4","\u05D1\u05D9\u05EA \u05EA\u05E4\u05D9\u05DC\u05D4","\u05DE\u05DC\u05D5\u05DF","\u05DE\u05D1\u05E0\u05D4 \u05E6\u05D9\u05D1\u05D5\u05E8","\u05DE\u05E1\u05D7\u05E8 \u05D5\u05DE\u05E9\u05E8\u05D3\u05D9\u05DD"];function Ol(i,t,e,n,s){let r=new Fi;window.__pickAll=(o,c)=>{let l=i.getBoundingClientRect();return r.setFromCamera({x:(o-l.left)/l.width*2-1,y:-((c-l.top)/l.height)*2+1},t),r.intersectObjects(window.__dbg.scene.children,!0).slice(0,5).map(u=>({d:u.distance|0,type:u.object.type,y:u.point.y.toFixed(2),frag:u.object.material&&u.object.material.fragmentShader?u.object.material.fragmentShader.slice(400,430):"",wnoise:!!(u.object.material&&u.object.material.fragmentShader&&u.object.material.fragmentShader.includes("wnoise"))}))},window.__pick=(o,c)=>{let l=i.getBoundingClientRect();r.setFromCamera({x:(o-l.left)/l.width*2-1,y:-((c-l.top)/l.height)*2+1},t);let h=r.intersectObjects(e,!1);if(!h.length)return{hits:0};let u=h[0],f=u.object.geometry.getAttribute("aId");return{hits:h.length,d:u.distance|0,id:f?f.getX(u.face.a):-1,meta:n[f.getX(u.face.a)]}};let a=null;i.addEventListener("pointerdown",o=>{a=[o.clientX,o.clientY]}),i.addEventListener("pointerup",o=>{if(!a||Math.hypot(o.clientX-a[0],o.clientY-a[1])>5){s.hide();return}let c=i.getBoundingClientRect();r.setFromCamera({x:(o.clientX-c.left)/c.width*2-1,y:-((o.clientY-c.top)/c.height)*2+1},t);let l=r.intersectObjects(e,!1);if(!l.length){s.hide();return}let h=l[0],u=h.object.geometry.getAttribute("aId"),f=n[u.getX(h.face.a)];if(!f){s.hide();return}let m=f.nm||Dl[f.ty]||"\u05D1\u05E0\u05D9\u05D9\u05DF";s.show(o.clientX,o.clientY,`<b>${Gg(m)}</b><br>${Dl[f.ty]||""} \xB7 \u05D2\u05D5\u05D1\u05D4 ${Math.round(f.h)} \u05DE\u05F3`+(f.nm?"":" (\u05DE\u05E0\u05EA\u05D5\u05E0\u05D9 OSM)"))})}var Gg=i=>i.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);async function Bl(i,t){let e=["\u05E9\u05E2\u05D5\u05DF \u05D9\u05E4\u05D5","\u05E0\u05D5\u05D5\u05D4 \u05E6\u05D3\u05E7","\u05DE\u05D2\u05D3\u05DC \u05E9\u05DC\u05D5\u05DD \u05DE\u05D0\u05D9\u05E8","\u05E9\u05D3\u05E8\u05D5\u05EA \u05E8\u05D5\u05D8\u05E9\u05D9\u05DC\u05D3","\u05D4\u05D1\u05D9\u05DE\u05D4","\u05DE\u05D2\u05D3\u05DC \u05E2\u05D6\u05E8\u05D9\u05D0\u05DC\u05D9 \u05E9\u05E8\u05D5\u05E0\u05D4","\u05DE\u05E8\u05DB\u05D6 \u05E2\u05D6\u05E8\u05D9\u05D0\u05DC\u05D9","\u05DB\u05D9\u05DB\u05E8 \u05E8\u05D1\u05D9\u05DF","\u05DB\u05D9\u05DB\u05E8 \u05D3\u05D9\u05D6\u05E0\u05D2\u05D5\u05E3","\u05DE\u05E8\u05D9\u05E0\u05D4 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1","\u05E0\u05DE\u05DC \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1","\u05E4\u05D0\u05E8\u05E7 \u05D4\u05D9\u05E8\u05E7\u05D5\u05DF"];for(let n of e){let s=ei.find(o=>o.nm===n);if(!s)continue;if(!await i.flyTo({x:s.x,z:s.z,dist:s.dist,pitch:s.pitch,yaw:s.yaw},3)){t(!1);return}let a=performance.now();for(;performance.now()-a<2600;){if(i.userMoved){t(!1);return}i.yaw+=.0035,await new Promise(requestAnimationFrame)}}t(!0)}function zl(i,t){i.insertAdjacentHTML("beforeend",`
  <div id="hud">
    <div id="hud-head">
      <div>
        <div id="hud-title">\u05EA\u05DC \u05D0\u05D1\u05D9\u05D1 <span>3D</span></div>
        <div id="hud-sub">\u05DB\u05DC \u05D4\u05E2\u05D9\u05E8, \u05DE\u05E0\u05EA\u05D5\u05E0\u05D9 OSM \u05D0\u05DE\u05D9\u05EA\u05D9\u05D9\u05DD</div>
      </div>
      <button id="hud-min" title="\u05DE\u05D6\u05E2\u05D5\u05E8">\u2013</button>
    </div>
    <div id="hud-body">
      <div id="stats"></div>
      <div class="row presets">
        <button data-h="13">\u2600\uFE0F \u05D9\u05D5\u05DD</button>
        <button data-h="18.2" class="on">\u{1F307} \u05E9\u05E7\u05D9\u05E2\u05D4</button>
        <button data-h="21.8">\u{1F319} \u05DC\u05D9\u05DC\u05D4</button>
      </div>
      <label class="slider-row">\u{1F550} <input id="hour" type="range" min="0" max="24" step="0.05" value="18.2"><span id="hour-v">18:12</span></label>
      <div class="row chips">
        <label><input type="checkbox" id="tg-trees" checked>\u05E2\u05E6\u05D9\u05DD</label>
        <label><input type="checkbox" id="tg-traffic" checked>\u05EA\u05E0\u05D5\u05E2\u05D4</label>
        <label><input type="checkbox" id="tg-labels" checked>\u05EA\u05D5\u05D5\u05D9\u05D5\u05EA</label>
        <label><input type="checkbox" id="tg-furniture" checked>\u05E8\u05D9\u05D4\u05D5\u05D8 \u05E8\u05D7\u05D5\u05D1</label>
      </div>
      <div class="row">
        <select id="landmarks"><option value="">\u2708\uFE0F \u05D8\u05D5\u05E1 \u05D0\u05DC\u2026</option></select>
        <button id="tour">\u25B6 \u05E1\u05D9\u05D5\u05E8</button>
      </div>
      <div id="hint">\u05D2\u05E8\u05D9\u05E8\u05D4 \u2014 \u05E1\u05D9\u05D1\u05D5\u05D1 \xB7 \u05D2\u05E8\u05D9\u05E8\u05D4 \u05D9\u05DE\u05E0\u05D9\u05EA/Shift \u2014 \u05D4\u05D6\u05D6\u05D4 \xB7 \u05D2\u05DC\u05D2\u05DC\u05EA \u2014 \u05D6\u05D5\u05DD \xB7 WASD \u2014 \u05D8\u05D9\u05E1\u05D4 \xB7 \u05DC\u05D7\u05D9\u05E6\u05D4 \u05E2\u05DC \u05D1\u05E0\u05D9\u05D9\u05DF \u2014 \u05DE\u05D9\u05D3\u05E2</div>
    </div>
  </div>
  <div id="popup"></div>
  <div id="credit">\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \xA9 \u05EA\u05D5\u05E8\u05DE\u05D9 OpenStreetMap (ODbL) \xB7 \u05D4\u05D3\u05DE\u05D9\u05D4: Three.js</div>`);let e=l=>i.querySelector(l),n=e("#landmarks");for(let l of ei){let h=document.createElement("option");h.value=l.nm,h.textContent=l.nm,n.appendChild(h)}n.addEventListener("change",()=>{let l=ei.find(h=>h.nm===n.value);l&&t.flyTo(l),n.value=""}),e("#tour").addEventListener("click",()=>t.tour(e("#tour")));let s=e("#hour"),r=e("#hour-v"),a=l=>`${String(Math.floor(l)).padStart(2,"0")}:${String(Math.floor(l%1*60)).padStart(2,"0")}`;s.addEventListener("input",()=>{r.textContent=a(+s.value),i.querySelectorAll(".presets button").forEach(l=>l.classList.remove("on")),t.setHour(+s.value)}),i.querySelectorAll(".presets button").forEach(l=>{l.addEventListener("click",()=>{i.querySelectorAll(".presets button").forEach(h=>h.classList.remove("on")),l.classList.add("on"),s.value=l.dataset.h,r.textContent=a(+l.dataset.h),t.setHour(+l.dataset.h)})});for(let[l,h]of[["tg-trees","trees"],["tg-traffic","traffic"],["tg-labels","labels"],["tg-furniture","furniture"]])e("#"+l).addEventListener("change",u=>t.toggle(h,u.target.checked));e("#hud-min").addEventListener("click",()=>{let l=e("#hud-body"),h=l.style.display==="none";l.style.display=h?"":"none",e("#hud-min").textContent=h?"\u2013":"+"});let o=e("#popup");return{popup:{show(l,h,u){o.innerHTML=u,o.style.display="block";let f=o.offsetWidth;o.style.left=Math.min(window.innerWidth-f-8,Math.max(8,l-f/2))+"px",o.style.top=Math.max(8,h-o.offsetHeight-16)+"px"},hide(){o.style.display="none"}},setStats(l){e("#stats").innerHTML=`<div><b>${l.buildings.toLocaleString("he")}</b><span>\u05D1\u05E0\u05D9\u05D9\u05E0\u05D9\u05DD</span></div><div><b>${l.trees.toLocaleString("he")}</b><span>\u05E2\u05E6\u05D9\u05DD</span></div><div><b>${l.roadKm.toLocaleString("he")}</b><span>\u05E7\u05F4\u05DE \u05DB\u05D1\u05D9\u05E9\u05D9\u05DD</span></div><div><b>${l.vehicles.toLocaleString("he")}</b><span>\u05DB\u05DC\u05D9 \u05E8\u05DB\u05D1</span></div>`}}}var Fn=i=>document.querySelector(i);async function Wg(){let i=Fn("#gl"),t;try{t=new as({canvas:i,antialias:!0,powerPreference:"high-performance",logarithmicDepthBuffer:!0})}catch(y){throw Fn("#load-caption").textContent="\u05D4\u05D3\u05E4\u05D3\u05E4\u05DF \u05DC\u05D0 \u05EA\u05D5\u05DE\u05DA \u05D1-WebGL \u2014 \u05E0\u05E1\u05D4 \u05D3\u05E4\u05D3\u05E4\u05DF \u05D0\u05D7\u05E8",y}t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight);let e=new dr,n=new Pe(55,innerWidth/innerHeight,2,9e4),s=_l(),r=new ce(new Di(45e3,32,16),bl(s));r.frustumCulled=!1,r.renderOrder=-10,e.add(r);let a=(y,I)=>{Fn("#load-bar-in").style.width=(y*100).toFixed(1)+"%",I&&(Fn("#load-caption").textContent=I)};a(.02,"\u05E4\u05D5\u05E8\u05E1 \u05E0\u05EA\u05D5\u05E0\u05D9 OSM \u05D3\u05D7\u05D5\u05E1\u05D9\u05DD\u2026");let o=await ul(window.TLV_DATA_B64);Nl(o.meta);let c=await Tl(o,e,s,a);a(.74,"\u05E9\u05D5\u05EA\u05DC "+6e4.toLocaleString("he")+"+ \u05E2\u05E6\u05D9\u05DD \u05D5\u05D3\u05E7\u05DC\u05D9\u05DD\u2026"),await new Promise(requestAnimationFrame);let l=Cl(o,c,s,e);a(.84,"\u05DE\u05E6\u05D9\u05D1 \u05E4\u05E0\u05E1\u05D9\u05DD, \u05E8\u05DE\u05D6\u05D5\u05E8\u05D9\u05DD \u05D5\u05D3\u05D5\u05D3\u05D9 \u05E9\u05DE\u05E9\u2026"),await new Promise(requestAnimationFrame);let h=Pl(o,c,s,e);a(.92,"\u05DE\u05E9\u05D7\u05E8\u05E8 \u05EA\u05E0\u05D5\u05E2\u05D4 \u05DC\u05D0\u05D9\u05D9\u05DC\u05D5\u05DF\u2026"),await new Promise(requestAnimationFrame);let u=Ll(c,s,e),f=Il(s,e,yr,o.meta,o.sea),m=Fl(e),_=o.meta.bbox.map(y=>y*.1),x=new Rr(n,i,{x0:_[0],z0:_[1],x1:_[2],z1:_[3]}),p=18.2,d=!0,v=zl(document.body,{setHour(y){p=y,d=!0},flyTo(y){x.flyTo({x:y.x,z:y.z,dist:y.dist,pitch:y.pitch,yaw:y.yaw},2.6)},tour(y){if(y.dataset.on){x.userMoved=!0;return}y.dataset.on="1",y.textContent="\u23F8 \u05E2\u05E6\u05D5\u05E8",Bl(x,()=>{delete y.dataset.on,y.textContent="\u25B6 \u05E1\u05D9\u05D5\u05E8"})},toggle(y,I){y==="trees"?l.group.visible=I:y==="traffic"?u.group.visible=I:y==="labels"?m.visible=I:y==="furniture"&&(h.group.visible=I,f.group.visible=I)}});v.setStats({buildings:c.buildingMeta.length,trees:l.treeCount,roadKm:c.stats.roadKm,vehicles:u.count}),Ol(i,n,c.tileMeshes,c.buildingMeta,v.popup),window.addEventListener("resize",()=>{n.aspect=innerWidth/innerHeight,n.updateProjectionMatrix(),t.setSize(innerWidth,innerHeight)}),a(1,"\u05DE\u05DE\u05E8\u05D9\u05D0\u05D9\u05DD\u2026"),Fn("#loader").classList.add("done"),setTimeout(()=>Fn("#loader").remove(),900),x.target.set(0,0,500),x.yaw=.001,x.pitch=1.5,x.dist=26e3,x.apply(),x.flyTo({x:-700,z:900,yaw:.42,pitch:.86,dist:5200},4.5),window.__setView=y=>{x.userMoved=!0,y.x!==void 0&&(x.target.x=y.x),y.z!==void 0&&(x.target.z=y.z),y.yaw!==void 0&&(x.yaw=y.yaw),y.pitch!==void 0&&(x.pitch=y.pitch),y.dist!==void 0&&(x.dist=y.dist)},window.__lm=y=>ei.find(I=>I.nm.includes(y)),window.__dbg={scene:e,refs:c,data:o,env:s,renderer:t};let g=performance.now(),b=0,R=0,A=Fn("#fps"),E=0,D=g;function M(y){let I=Math.min(.06,(y-g)/1e3);g=y,s.uTime.value+=I,d&&(xl(p,s),d=!1),x.update(I),s.uCamPos.value.copy(n.position),u.group.visible&&u.update(I),t.render(e,n),E++,y-D>1e3&&(A&&(A.textContent=E+" FPS"),E=0,D=y),I>.04?(b++,R=0):I<.02&&R++,b>90&&t.getPixelRatio()>1&&(t.setPixelRatio(1),b=0),requestAnimationFrame(M)}requestAnimationFrame(M)}Wg().catch(i=>{console.error(i);let t=Fn("#load-caption");t&&(t.textContent="\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05D8\u05E2\u05D9\u05E0\u05D4: "+i.message)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
