/*! For license information please see createRectangleOutlineGeometry.js.LICENSE.txt */
import{a as C}from"./chunk-MXXPLDAG.js";import{a as v}from"./chunk-UQA7A4FU.js";import{b as z}from"./chunk-55576DY4.js";import"./chunk-H2V7D5W3.js";import{a as O}from"./chunk-XAJFOHMU.js";import{a as Y}from"./chunk-UUWY23O5.js";import{b as B,c as q,d as y}from"./chunk-3DQAB6YL.js";import{d as R}from"./chunk-HXYTWA7P.js";import"./chunk-AT27Z3WO.js";import{c as b}from"./chunk-HB5KYIAZ.js";import{a as T}from"./chunk-JJLMPDRL.js";import{a as U,b as M,d as w}from"./chunk-T4TQMW7B.js";import{a as P}from"./chunk-7TT2TZHW.js";import"./chunk-FRKPHPJC.js";import"./chunk-OHNTPGT4.js";import{a as E}from"./chunk-XQTMMRVI.js";import{a as N}from"./chunk-QHDGFGBI.js";import{e as S}from"./chunk-MVZBAA6W.js";var W=new R,j=new R,K=new U,Q=new b;function F(t,e){let i=t._ellipsoid,r=e.height,o=e.width,n=e.northCap,a=e.southCap,s=r,l=2,u=0,c=4;n&&(l-=1,s-=1,u+=1,c-=2),a&&(l-=1,s-=1,u+=1,c-=2),u+=l*o+2*s-c;let h,p=new Float64Array(3*u),f=0,d=0,g=K;if(n)C.computePosition(e,i,!1,d,0,g),p[f++]=g.x,p[f++]=g.y,p[f++]=g.z;else for(h=0;h<o;h++)C.computePosition(e,i,!1,d,h,g),p[f++]=g.x,p[f++]=g.y,p[f++]=g.z;for(h=o-1,d=1;d<r;d++)C.computePosition(e,i,!1,d,h,g),p[f++]=g.x,p[f++]=g.y,p[f++]=g.z;if(d=r-1,!a)for(h=o-2;h>=0;h--)C.computePosition(e,i,!1,d,h,g),p[f++]=g.x,p[f++]=g.y,p[f++]=g.z;for(h=0,d=r-2;d>0;d--)C.computePosition(e,i,!1,d,h,g),p[f++]=g.x,p[f++]=g.y,p[f++]=g.z;let m=p.length/3*2,_=O.createTypedArray(p.length/3,m),b=0;for(let t=0;t<p.length/3-1;t++)_[b++]=t,_[b++]=t+1;_[b++]=p.length/3-1,_[b++]=0;let w=new q({attributes:new Y,primitiveType:B.LINES});return w.attributes.position=new y({componentDatatype:T.DOUBLE,componentsPerAttribute:3,values:p}),w.indices=_,w}function X(t,e){let i=t._surfaceHeight,r=t._extrudedHeight,o=t._ellipsoid,n=F(t,e),a=e.height,s=e.width,l=z.scaleToGeodeticHeight(n.attributes.position.values,i,o,!1),u=l.length,c=new Float64Array(2*u);c.set(l);let h=z.scaleToGeodeticHeight(n.attributes.position.values,r,o);c.set(h,u),n.attributes.position.values=c;let p=e.northCap,f=e.southCap,d=4;p&&(d-=1),f&&(d-=1);let g=2*(c.length/3+d),m=O.createTypedArray(c.length/3,g);u=c.length/6;let _,b=0;for(let t=0;t<u-1;t++)m[b++]=t,m[b++]=t+1,m[b++]=t+u,m[b++]=t+u+1;if(m[b++]=u-1,m[b++]=0,m[b++]=u+u-1,m[b++]=u,m[b++]=0,m[b++]=u,p)_=a-1;else{let t=s-1;m[b++]=t,m[b++]=t+u,_=s+a-2}if(m[b++]=_,m[b++]=_+u,!f){let t=s+_-1;m[b++]=t,m[b]=t+u}return n.indices=m,n}function L(t){let e=(t=E(t,E.EMPTY_OBJECT)).rectangle,i=E(t.granularity,P.RADIANS_PER_DEGREE),r=E(t.ellipsoid,w.WGS84),o=E(t.rotation,0);if(!S(e))throw new N("rectangle is required.");if(b.validate(e),e.north<e.south)throw new N("options.rectangle.north must be greater than options.rectangle.south");let n=E(t.height,0),a=E(t.extrudedHeight,n);this._rectangle=b.clone(e),this._granularity=i,this._ellipsoid=r,this._surfaceHeight=Math.max(n,a),this._rotation=o,this._extrudedHeight=Math.min(n,a),this._offsetAttribute=t.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}L.packedLength=b.packedLength+w.packedLength+5,L.pack=function(t,e,i){if(!S(t))throw new N("value is required");if(!S(e))throw new N("array is required");return i=E(i,0),b.pack(t._rectangle,e,i),i+=b.packedLength,w.pack(t._ellipsoid,e,i),i+=w.packedLength,e[i++]=t._granularity,e[i++]=t._surfaceHeight,e[i++]=t._rotation,e[i++]=t._extrudedHeight,e[i]=E(t._offsetAttribute,-1),e};var V=new b,J=w.clone(w.UNIT_SPHERE),k={rectangle:V,ellipsoid:J,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};L.unpack=function(t,e,i){if(!S(t))throw new N("array is required");e=E(e,0);let r=b.unpack(t,e,V);e+=b.packedLength;let o=w.unpack(t,e,J);e+=w.packedLength;let n=t[e++],a=t[e++],s=t[e++],l=t[e++],u=t[e];return S(i)?(i._rectangle=b.clone(r,i._rectangle),i._ellipsoid=w.clone(o,i._ellipsoid),i._surfaceHeight=a,i._rotation=s,i._extrudedHeight=l,i._offsetAttribute=-1===u?void 0:u,i):(k.granularity=n,k.height=a,k.rotation=s,k.extrudedHeight=l,k.offsetAttribute=-1===u?void 0:u,new L(k))};var Z=new M;L.createGeometry=function(t){let e,i,r=t._rectangle,o=t._ellipsoid,n=C.computeOptions(r,t._granularity,t._rotation,0,Q,Z);if(P.equalsEpsilon(r.north,r.south,P.EPSILON10)||P.equalsEpsilon(r.east,r.west,P.EPSILON10))return;let a,s=t._surfaceHeight,l=t._extrudedHeight;if(!P.equalsEpsilon(s,l,0,P.EPSILON2)){if(e=X(t,n),S(t._offsetAttribute)){let i=e.attributes.position.values.length/3,r=new Uint8Array(i);t._offsetAttribute===v.TOP?r=r.fill(1,0,i/2):(a=t._offsetAttribute===v.NONE?0:1,r=r.fill(a)),e.attributes.applyOffset=new y({componentDatatype:T.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}let u=R.fromRectangle3D(r,o,s,j),c=R.fromRectangle3D(r,o,l,W);i=R.union(u,c)}else{if(e=F(t,n),e.attributes.position.values=z.scaleToGeodeticHeight(e.attributes.position.values,s,o,!1),S(t._offsetAttribute)){let i=e.attributes.position.values.length;a=t._offsetAttribute===v.NONE?0:1;let r=new Uint8Array(i/3).fill(a);e.attributes.applyOffset=new y({componentDatatype:T.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}i=R.fromRectangle3D(r,o,s)}return new q({attributes:e.attributes,indices:e.indices,primitiveType:B.LINES,boundingSphere:i,offsetAttribute:t._offsetAttribute})};var x=L;function $(t,e){return S(e)&&(t=x.unpack(t,e)),t._ellipsoid=w.clone(t._ellipsoid),t._rectangle=b.clone(t._rectangle),x.createGeometry(t)}var Et=$;export{Et as default};