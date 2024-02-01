/*! For license information please see createPolygonOutlineGeometry.js.LICENSE.txt */
import{a}from"./chunk-5V6YZTXN.js";import{a as b}from"./chunk-EQLRADTK.js";import{a as W}from"./chunk-QGLI6LEB.js";import{a as V}from"./chunk-Y3WNYLCC.js";import"./chunk-TBE3AFZU.js";import"./chunk-5Q3AVAQU.js";import{a as D}from"./chunk-UQA7A4FU.js";import{a as F}from"./chunk-ZI3LUCJT.js";import"./chunk-WEOEL435.js";import{a as j,b as k}from"./chunk-55576DY4.js";import"./chunk-NVBQCQFC.js";import"./chunk-H2V7D5W3.js";import"./chunk-UNOEZU66.js";import"./chunk-7AJQ7HJO.js";import{a as M}from"./chunk-XAJFOHMU.js";import{a as B}from"./chunk-UUWY23O5.js";import{b as U,c as C,d as S}from"./chunk-3DQAB6YL.js";import{d as z}from"./chunk-HXYTWA7P.js";import"./chunk-AT27Z3WO.js";import"./chunk-HB5KYIAZ.js";import{a as w}from"./chunk-JJLMPDRL.js";import{a as v,d as y}from"./chunk-T4TQMW7B.js";import{a as T}from"./chunk-7TT2TZHW.js";import"./chunk-FRKPHPJC.js";import"./chunk-OHNTPGT4.js";import{a as P}from"./chunk-XQTMMRVI.js";import{a as G,b as A}from"./chunk-QHDGFGBI.js";import{e as O}from"./chunk-MVZBAA6W.js";var Y=[],R=[];function K(e,t,i,r,o){let n=F.fromPoints(t,e).projectPointsOntoPlane(t,Y);k.computeWindingOrder2D(n)===j.CLOCKWISE&&(n.reverse(),t=t.slice().reverse());let s,p,u=t.length,h=0;if(r)for(s=new Float64Array(2*u*3),p=0;p<u;p++){let e=t[p],i=t[(p+1)%u];s[h++]=e.x,s[h++]=e.y,s[h++]=e.z,s[h++]=i.x,s[h++]=i.y,s[h++]=i.z}else{let r=0;if(o===b.GEODESIC)for(p=0;p<u;p++)r+=a.subdivideLineCount(t[p],t[(p+1)%u],i);else if(o===b.RHUMB)for(p=0;p<u;p++)r+=a.subdivideRhumbLineCount(e,t[p],t[(p+1)%u],i);for(s=new Float64Array(3*r),p=0;p<u;p++){let r;o===b.GEODESIC?r=a.subdivideLine(t[p],t[(p+1)%u],i,R):o===b.RHUMB&&(r=a.subdivideRhumbLine(e,t[p],t[(p+1)%u],i,R));let n=r.length;for(let e=0;e<n;++e)s[h++]=r[e]}}u=s.length/3;let l=2*u,c=M.createTypedArray(u,l);for(h=0,p=0;p<u-1;p++)c[h++]=p,c[h++]=p+1;return c[h++]=u-1,c[h++]=0,new W({geometry:new C({attributes:new B({position:new S({componentDatatype:w.DOUBLE,componentsPerAttribute:3,values:s})}),indices:c,primitiveType:U.LINES})})}function q(e,t,i,r,o){let n=F.fromPoints(t,e).projectPointsOntoPlane(t,Y);k.computeWindingOrder2D(n)===j.CLOCKWISE&&(n.reverse(),t=t.slice().reverse());let s,p,u=t.length,h=new Array(u),l=0;if(r)for(s=new Float64Array(2*u*3*2),p=0;p<u;++p){h[p]=l/3;let e=t[p],i=t[(p+1)%u];s[l++]=e.x,s[l++]=e.y,s[l++]=e.z,s[l++]=i.x,s[l++]=i.y,s[l++]=i.z}else{let r=0;if(o===b.GEODESIC)for(p=0;p<u;p++)r+=a.subdivideLineCount(t[p],t[(p+1)%u],i);else if(o===b.RHUMB)for(p=0;p<u;p++)r+=a.subdivideRhumbLineCount(e,t[p],t[(p+1)%u],i);for(s=new Float64Array(3*r*2),p=0;p<u;++p){let r;h[p]=l/3,o===b.GEODESIC?r=a.subdivideLine(t[p],t[(p+1)%u],i,R):o===b.RHUMB&&(r=a.subdivideRhumbLine(e,t[p],t[(p+1)%u],i,R));let n=r.length;for(let e=0;e<n;++e)s[l++]=r[e]}}u=s.length/6;let c=h.length,y=2*(2*u+c),f=M.createTypedArray(u+c,y);for(l=0,p=0;p<u;++p)f[l++]=p,f[l++]=(p+1)%u,f[l++]=p+u,f[l++]=(p+1)%u+u;for(p=0;p<c;p++){let e=h[p];f[l++]=e,f[l++]=e+u}return new W({geometry:new C({attributes:new B({position:new S({componentDatatype:w.DOUBLE,componentsPerAttribute:3,values:s})}),indices:f,primitiveType:U.LINES})})}function L(e){if(A.typeOf.object("options",e),A.typeOf.object("options.polygonHierarchy",e.polygonHierarchy),e.perPositionHeight&&O(e.height))throw new G("Cannot use both options.perPositionHeight and options.height");if(O(e.arcType)&&e.arcType!==b.GEODESIC&&e.arcType!==b.RHUMB)throw new G("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");let t=e.polygonHierarchy,i=P(e.ellipsoid,y.WGS84),r=P(e.granularity,T.RADIANS_PER_DEGREE),o=P(e.perPositionHeight,!1),n=o&&O(e.extrudedHeight),s=P(e.arcType,b.GEODESIC),p=P(e.height,0),u=P(e.extrudedHeight,p);if(!n){let e=Math.max(p,u);u=Math.min(p,u),p=e}this._ellipsoid=y.clone(i),this._granularity=r,this._height=p,this._extrudedHeight=u,this._arcType=s,this._polygonHierarchy=t,this._perPositionHeight=o,this._perPositionHeightExtrude=n,this._offsetAttribute=e.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=a.computeHierarchyPackedLength(t,v)+y.packedLength+8}L.pack=function(e,t,i){return A.typeOf.object("value",e),A.defined("array",t),i=P(i,0),i=a.packPolygonHierarchy(e._polygonHierarchy,t,i,v),y.pack(e._ellipsoid,t,i),i+=y.packedLength,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._granularity,t[i++]=e._perPositionHeightExtrude?1:0,t[i++]=e._perPositionHeight?1:0,t[i++]=e._arcType,t[i++]=P(e._offsetAttribute,-1),t[i]=e.packedLength,t};var J=y.clone(y.UNIT_SPHERE),Q={polygonHierarchy:{}};L.unpack=function(e,t,i){A.defined("array",e),t=P(t,0);let r=a.unpackPolygonHierarchy(e,t,v);t=r.startingIndex,delete r.startingIndex;let o=y.unpack(e,t,J);t+=y.packedLength;let n=e[t++],s=e[t++],p=e[t++],u=1===e[t++],h=1===e[t++],l=e[t++],c=e[t++],f=e[t];return O(i)||(i=new L(Q)),i._polygonHierarchy=r,i._ellipsoid=y.clone(o,i._ellipsoid),i._height=n,i._extrudedHeight=s,i._granularity=p,i._perPositionHeight=h,i._perPositionHeightExtrude=u,i._arcType=l,i._offsetAttribute=-1===c?void 0:c,i.packedLength=f,i},L.fromPositions=function(e){return e=P(e,P.EMPTY_OBJECT),A.defined("options.positions",e.positions),new L({polygonHierarchy:{positions:e.positions},height:e.height,extrudedHeight:e.extrudedHeight,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,arcType:e.arcType,offsetAttribute:e.offsetAttribute})},L.createGeometry=function(e){let t=e._ellipsoid,i=e._granularity,r=e._polygonHierarchy,o=e._perPositionHeight,n=e._arcType,s=a.polygonOutlinesFromHierarchy(r,!o,t);if(0===s.length)return;let p,u,h,l=[],c=T.chordLength(i,t.maximumRadius),y=e._height,f=e._extrudedHeight;if(e._perPositionHeightExtrude||!T.equalsEpsilon(y,f,0,T.EPSILON2))for(h=0;h<s.length;h++){if(p=q(t,s[h],c,o,n),p.geometry=a.scaleToGeodeticHeightExtruded(p.geometry,y,f,t,o),O(e._offsetAttribute)){let t=p.geometry.attributes.position.values.length/3,i=new Uint8Array(t);e._offsetAttribute===D.TOP?i=i.fill(1,0,t/2):(u=e._offsetAttribute===D.NONE?0:1,i=i.fill(u)),p.geometry.attributes.applyOffset=new S({componentDatatype:w.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}l.push(p)}else for(h=0;h<s.length;h++){if(p=K(t,s[h],c,o,n),p.geometry.attributes.position.values=k.scaleToGeodeticHeight(p.geometry.attributes.position.values,y,t,!o),O(e._offsetAttribute)){let t=p.geometry.attributes.position.values.length;u=e._offsetAttribute===D.NONE?0:1;let i=new Uint8Array(t/3).fill(u);p.geometry.attributes.applyOffset=new S({componentDatatype:w.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}l.push(p)}let m=V.combineInstances(l)[0],d=z.fromVertices(m.attributes.position.values);return new C({attributes:m.attributes,indices:m.indices,primitiveType:m.primitiveType,boundingSphere:d,offsetAttribute:e._offsetAttribute})};var x=L;function X(e,t){return O(t)&&(e=x.unpack(e,t)),e._ellipsoid=y.clone(e._ellipsoid),x.createGeometry(e)}var Oe=X;export{Oe as default};