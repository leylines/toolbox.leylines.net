/*! For license information please see createVectorTilePolygons.js.LICENSE.txt */
import{a as R}from"./chunk-IMNTO4PY.js";import{a as It}from"./chunk-54KKWN6C.js";import{a as M}from"./chunk-3M3462KZ.js";import{a as bt}from"./chunk-TBE3AFZU.js";import"./chunk-ZI3LUCJT.js";import"./chunk-WEOEL435.js";import"./chunk-UNOEZU66.js";import"./chunk-7AJQ7HJO.js";import{a as W}from"./chunk-XAJFOHMU.js";import"./chunk-HXYTWA7P.js";import"./chunk-AT27Z3WO.js";import{c as z}from"./chunk-HB5KYIAZ.js";import"./chunk-JJLMPDRL.js";import{a as o,b as nt,d as j}from"./chunk-T4TQMW7B.js";import{a as et}from"./chunk-7TT2TZHW.js";import"./chunk-FRKPHPJC.js";import"./chunk-OHNTPGT4.js";import"./chunk-XQTMMRVI.js";import"./chunk-QHDGFGBI.js";import{e as A}from"./chunk-MVZBAA6W.js";var kt=new o,Bt=new j,Nt=new z,E={min:void 0,max:void 0,indexBytesPerElement:void 0};function Pt(t){let e=new Float64Array(t),n=0;E.indexBytesPerElement=e[n++],E.min=e[n++],E.max=e[n++],o.unpack(e,n,kt),n+=o.packedLength,j.unpack(e,n,Bt),n+=j.packedLength,z.unpack(e,n,Nt)}function Tt(t){let e=t.length,n=0;for(let r=0;r<e;++r)n+=R.packedLength+3+t[r].batchIds.length;return n}function Ct(t,e,n){let r=e.length,o=2+r*M.packedLength+1+Tt(n),a=new Float64Array(o),i=0;a[i++]=t,a[i++]=r;for(let t=0;t<r;++t)M.pack(e[t],a,i),i+=M.packedLength;let s=n.length;a[i++]=s;for(let t=0;t<s;++t){let e=n[t];R.pack(e.color,a,i),i+=R.packedLength,a[i++]=e.offset,a[i++]=e.count;let r=e.batchIds,o=r.length;a[i++]=o;for(let t=0;t<o;++t)a[i++]=r[t]}return a}var yt=32767,wt=new o,Ht=new o,St=new o,Ut=new o,Ft=new o,Lt=new nt,Mt=new z;function Rt(t,e){let n;Pt(t.packedBuffer),n=2===E.indexBytesPerElement?new Uint16Array(t.indices):new Uint32Array(t.indices);let r=new Uint16Array(t.positions),a=new Uint32Array(t.counts),i=new Uint32Array(t.indexCounts),s=new Uint32Array(t.batchIds),f=new Uint32Array(t.batchTableColors),c=new Array(a.length),h=kt,l=Bt,u=Nt,m=E.min,p=E.max,d=t.minimumHeights,k=t.maximumHeights;A(d)&&A(k)&&(d=new Float32Array(d),k=new Float32Array(k));let g,I,w,b=r.length/2,y=r.subarray(0,b),T=r.subarray(b,2*b);bt.zigZagDeltaDecode(y,T);let N=new Float64Array(3*b);for(g=0;g<b;++g){let t=y[g],e=T[g],n=et.lerp(u.west,u.east,t/yt),r=et.lerp(u.south,u.north,e/yt),a=nt.fromRadians(n,r,0,Lt),i=l.cartographicToCartesian(a,wt);o.pack(i,N,3*g)}let j=a.length,x=new Array(j),L=new Array(j),U=0,O=0;for(g=0;g<j;++g)x[g]=U,L[g]=O,U+=a[g],O+=i[g];let B=new Float32Array(3*b*2),F=new Uint16Array(2*b),P=new Uint32Array(L.length),H=new Uint32Array(i.length),S=[],C={};for(g=0;g<j;++g)w=f[g],A(C[w])?(C[w].positionLength+=a[g],C[w].indexLength+=i[g],C[w].batchIds.push(g)):C[w]={positionLength:a[g],indexLength:i[g],offset:0,indexOffset:0,batchIds:[g]};let J,Z=0,G=0;for(w in C)if(C.hasOwnProperty(w)){J=C[w],J.offset=Z,J.indexOffset=G;let t=2*J.positionLength,e=2*J.indexLength+6*J.positionLength;Z+=t,G+=e,J.indexLength=e}let Y=[];for(w in C)C.hasOwnProperty(w)&&(J=C[w],Y.push({color:R.fromRgba(parseInt(w)),offset:J.indexOffset,count:J.indexLength,batchIds:J.batchIds}));for(g=0;g<j;++g){w=f[g],J=C[w];let t=J.offset,e=3*t,r=t,b=x[g],y=a[g],T=s[g],E=m,j=p;A(d)&&A(k)&&(E=d[g],j=k[g]);let U=Number.POSITIVE_INFINITY,O=Number.NEGATIVE_INFINITY,R=Number.POSITIVE_INFINITY,W=Number.NEGATIVE_INFINITY;for(I=0;I<y;++I){let t=o.unpack(N,3*b+3*I,wt);l.scaleToGeodeticSurface(t,t);let n=l.cartesianToCartographic(t,Lt),a=n.latitude,i=n.longitude;U=Math.min(a,U),O=Math.max(a,O),R=Math.min(i,R),W=Math.max(i,W);let s=l.geodeticSurfaceNormal(t,Ht),f=o.multiplyByScalar(s,E,St),c=o.add(t,f,Ut);f=o.multiplyByScalar(s,j,f);let u=o.add(t,f,Ft);o.subtract(u,h,u),o.subtract(c,h,c),o.pack(u,B,e),o.pack(c,B,e+3),F[r]=T,F[r+1]=T,e+=6,r+=2}u=Mt,u.west=R,u.east=W,u.south=U,u.north=O,c[g]=M.fromRectangle(u,m,p,l);let Z=J.indexOffset,G=L[g],Y=i[g];for(P[g]=Z,I=0;I<Y;I+=3){let e=n[G+I]-b,r=n[G+I+1]-b,o=n[G+I+2]-b;S[Z++]=2*e+t,S[Z++]=2*r+t,S[Z++]=2*o+t,S[Z++]=2*o+1+t,S[Z++]=2*r+1+t,S[Z++]=2*e+1+t}for(I=0;I<y;++I){let e=I,n=(I+1)%y;S[Z++]=2*e+1+t,S[Z++]=2*n+t,S[Z++]=2*e+t,S[Z++]=2*e+1+t,S[Z++]=2*n+1+t,S[Z++]=2*n+t}J.offset+=2*y,J.indexOffset=Z,H[g]=Z-P[g]}S=W.createTypedArray(B.length/3,S);let _=Y.length;for(let t=0;t<_;++t){let e=Y[t].batchIds,n=0,r=e.length;for(let t=0;t<r;++t)n+=H[e[t]];Y[t].count=n}let v=Ct(2===S.BYTES_PER_ELEMENT?W.UNSIGNED_SHORT:W.UNSIGNED_INT,c,Y);return e.push(B.buffer,S.buffer,P.buffer,H.buffer,F.buffer,v.buffer),{positions:B.buffer,indices:S.buffer,indexOffsets:P.buffer,indexCounts:H.buffer,batchIds:F.buffer,packedBuffer:v.buffer}}var Jt=It(Rt);export{Jt as default};