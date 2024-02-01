/*! For license information please see createCorridorOutlineGeometry.js.LICENSE.txt */
import{a as S}from"./chunk-DI2SVMCY.js";import{a as Q}from"./chunk-74IIY6PV.js";import"./chunk-6ERSF27L.js";import"./chunk-3A7KKCUE.js";import"./chunk-EDSJBPXM.js";import{a as W}from"./chunk-UQA7A4FU.js";import"./chunk-ZI3LUCJT.js";import"./chunk-WEOEL435.js";import{b as K}from"./chunk-55576DY4.js";import{a as it}from"./chunk-NVBQCQFC.js";import"./chunk-H2V7D5W3.js";import"./chunk-UNOEZU66.js";import"./chunk-7AJQ7HJO.js";import{a as Z}from"./chunk-XAJFOHMU.js";import{a as et}from"./chunk-UUWY23O5.js";import{b as I,c as tt,d as J}from"./chunk-3DQAB6YL.js";import{d as x}from"./chunk-HXYTWA7P.js";import"./chunk-AT27Z3WO.js";import"./chunk-HB5KYIAZ.js";import{a as z}from"./chunk-JJLMPDRL.js";import{a as A,d as P}from"./chunk-T4TQMW7B.js";import{a as q}from"./chunk-7TT2TZHW.js";import"./chunk-FRKPHPJC.js";import"./chunk-OHNTPGT4.js";import{a as H}from"./chunk-XQTMMRVI.js";import{b as M}from"./chunk-QHDGFGBI.js";import{e as C}from"./chunk-MVZBAA6W.js";var ot=new A,nt=new A,rt=new A;function ft(t,e){for(let i=0;i<t.length;i++)t[i]=e.scaleToGeodeticSurface(t[i],t[i]);return t}function st(t,e){let i,r,o,s=[],n=t.positions,l=t.corners,a=t.endPositions,h=new et,u=0,p=0,c=0;for(r=0;r<n.length;r+=2)o=n[r].length-3,u+=o,c+=o/3*4,p+=n[r+1].length-3;for(u+=3,p+=3,r=0;r<l.length;r++){i=l[r];let t=l[r].leftPositions;C(t)?(o=t.length,u+=o,c+=o/3*2):(o=l[r].rightPositions.length,p+=o,c+=o/3*2)}let f,d=C(a);d&&(f=a[0].length-3,u+=f,p+=f,f/=3,c+=4*f);let g,m,y,_,b,k,P=u+p,T=new Float64Array(P),H=0,E=P-1,j=f/2,v=Z.createTypedArray(P/3,c+4),w=0;if(v[w++]=H/3,v[w++]=(E-2)/3,d){s.push(H/3),k=ot,b=nt;let t=a[0];for(r=0;r<j;r++)k=A.fromArray(t,3*(j-1-r),k),b=A.fromArray(t,3*(j+r),b),S.addAttribute(T,b,H),S.addAttribute(T,k,void 0,E),m=H/3,_=m+1,g=(E-2)/3,y=g-1,v[w++]=g,v[w++]=y,v[w++]=m,v[w++]=_,H+=3,E-=3}let O=0,D=n[O++],M=n[O++];for(T.set(D,H),T.set(M,E-M.length+1),o=M.length-3,s.push(H/3,(E-2)/3),r=0;r<o;r+=3)m=H/3,_=m+1,g=(E-2)/3,y=g-1,v[w++]=g,v[w++]=y,v[w++]=m,v[w++]=_,H+=3,E-=3;for(r=0;r<l.length;r++){let t;i=l[r];let a,h=i.leftPositions,u=i.rightPositions,p=rt;if(C(h)){for(E-=3,a=y,s.push(_),t=0;t<h.length/3;t++)p=A.fromArray(h,3*t,p),v[w++]=a-t-1,v[w++]=a-t,S.addAttribute(T,p,void 0,E),E-=3;s.push(a-Math.floor(h.length/6)),e===Q.BEVELED&&s.push((E-2)/3+1),H+=3}else{for(H+=3,a=_,s.push(y),t=0;t<u.length/3;t++)p=A.fromArray(u,3*t,p),v[w++]=a+t,v[w++]=a+t+1,S.addAttribute(T,p,H),H+=3;s.push(a+Math.floor(u.length/6)),e===Q.BEVELED&&s.push(H/3-1),E-=3}for(D=n[O++],M=n[O++],D.splice(0,3),M.splice(M.length-3,3),T.set(D,H),T.set(M,E-M.length+1),o=M.length-3,t=0;t<M.length;t+=3)_=H/3,m=_-1,y=(E-2)/3,g=y+1,v[w++]=g,v[w++]=y,v[w++]=m,v[w++]=_,H+=3,E-=3;H-=3,E+=3,s.push(H/3,(E-2)/3)}if(d){H+=3,E-=3,k=ot,b=nt;let t=a[1];for(r=0;r<j;r++)k=A.fromArray(t,3*(f-r-1),k),b=A.fromArray(t,3*r,b),S.addAttribute(T,k,void 0,E),S.addAttribute(T,b,H),_=H/3,m=_-1,y=(E-2)/3,g=y+1,v[w++]=g,v[w++]=y,v[w++]=m,v[w++]=_,H+=3,E-=3;s.push(H/3)}else s.push(H/3,(E-2)/3);return v[w++]=H/3,v[w++]=(E-2)/3,h.position=new J({componentDatatype:z.DOUBLE,componentsPerAttribute:3,values:T}),{attributes:h,indices:v,wallIndices:s}}function ct(t){let e=t.ellipsoid,i=st(S.computePositions(t),t.cornerType),r=i.wallIndices,o=t.height,s=t.extrudedHeight,n=i.attributes,l=i.indices,a=n.position.values,h=a.length,u=new Float64Array(h);u.set(a);let p=new Float64Array(2*h);if(a=K.scaleToGeodeticHeight(a,o,e),u=K.scaleToGeodeticHeight(u,s,e),p.set(a),p.set(u,h),n.position.values=p,h/=3,C(t.offsetAttribute)){let e=new Uint8Array(2*h);if(t.offsetAttribute===W.TOP)e=e.fill(1,0,h);else{let i=t.offsetAttribute===W.NONE?0:1;e=e.fill(i)}n.applyOffset=new J({componentDatatype:z.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}let c,f=l.length,d=Z.createTypedArray(p.length/3,2*(f+r.length));d.set(l);let A,g,m=f;for(c=0;c<f;c+=2){let t=l[c],e=l[c+1];d[m++]=t+h,d[m++]=e+h}for(c=0;c<r.length;c++)A=r[c],g=A+h,d[m++]=A,d[m++]=g;return{attributes:n,indices:d}}function V(t){let e=(t=H(t,H.EMPTY_OBJECT)).positions,i=t.width;M.typeOf.object("options.positions",e),M.typeOf.number("options.width",i);let r=H(t.height,0),o=H(t.extrudedHeight,r);this._positions=e,this._ellipsoid=P.clone(H(t.ellipsoid,P.WGS84)),this._width=i,this._height=Math.max(r,o),this._extrudedHeight=Math.min(r,o),this._cornerType=H(t.cornerType,Q.ROUNDED),this._granularity=H(t.granularity,q.RADIANS_PER_DEGREE),this._offsetAttribute=t.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+e.length*A.packedLength+P.packedLength+6}V.pack=function(t,e,i){M.typeOf.object("value",t),M.typeOf.object("array",e),i=H(i,0);let r=t._positions,o=r.length;e[i++]=o;for(let t=0;t<o;++t,i+=A.packedLength)A.pack(r[t],e,i);return P.pack(t._ellipsoid,e,i),i+=P.packedLength,e[i++]=t._width,e[i++]=t._height,e[i++]=t._extrudedHeight,e[i++]=t._cornerType,e[i++]=t._granularity,e[i]=H(t._offsetAttribute,-1),e};var lt=P.clone(P.UNIT_SPHERE),R={positions:void 0,ellipsoid:lt,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};V.unpack=function(t,e,i){M.typeOf.object("array",t),e=H(e,0);let r=t[e++],o=new Array(r);for(let i=0;i<r;++i,e+=A.packedLength)o[i]=A.unpack(t,e);let s=P.unpack(t,e,lt);e+=P.packedLength;let n=t[e++],l=t[e++],a=t[e++],h=t[e++],u=t[e++],p=t[e];return C(i)?(i._positions=o,i._ellipsoid=P.clone(s,i._ellipsoid),i._width=n,i._height=l,i._extrudedHeight=a,i._cornerType=h,i._granularity=u,i._offsetAttribute=-1===p?void 0:p,i):(R.positions=o,R.width=n,R.height=l,R.extrudedHeight=a,R.cornerType=h,R.granularity=u,R.offsetAttribute=-1===p?void 0:p,new V(R))},V.createGeometry=function(t){let e=t._positions,i=t._width,r=t._ellipsoid;e=ft(e,r);let o=it(e,A.equalsEpsilon);if(o.length<2||i<=0)return;let s,n=t._height,l=t._extrudedHeight,a=!q.equalsEpsilon(n,l,0,q.EPSILON2),h={ellipsoid:r,positions:o,width:i,cornerType:t._cornerType,granularity:t._granularity,saveAttributes:!1};if(a)h.height=n,h.extrudedHeight=l,h.offsetAttribute=t._offsetAttribute,s=ct(h);else{if(s=st(S.computePositions(h),h.cornerType),s.attributes.position.values=K.scaleToGeodeticHeight(s.attributes.position.values,n,r),C(t._offsetAttribute)){let e=s.attributes.position.values.length,i=t._offsetAttribute===W.NONE?0:1,r=new Uint8Array(e/3).fill(i);s.attributes.applyOffset=new J({componentDatatype:z.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}}let u=s.attributes,p=x.fromVertices(u.position.values,void 0,3);return new tt({attributes:u,indices:s.indices,primitiveType:I.LINES,boundingSphere:p,offsetAttribute:t._offsetAttribute})};var $=V;function ht(t,e){return C(e)&&(t=$.unpack(t,e)),t._ellipsoid=P.clone(t._ellipsoid),$.createGeometry(t)}var Ot=ht;export{Ot as default};