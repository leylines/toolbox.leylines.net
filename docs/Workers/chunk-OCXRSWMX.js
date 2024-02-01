/*! For license information please see chunk-OCXRSWMX.js.LICENSE.txt */
import{f as C}from"./chunk-HXYTWA7P.js";import{a as n,e as b}from"./chunk-T4TQMW7B.js";import{a as w}from"./chunk-7TT2TZHW.js";var j={},q=new n,L=new n,Q=new C,G=new b;function W(e,t,r,a,o,i,l,s,y,c){let m=e+t;n.multiplyByScalar(a,Math.cos(m),q),n.multiplyByScalar(r,Math.sin(m),L),n.add(q,L,q);let u=Math.cos(e);u*=u;let w=Math.sin(e);w*=w;let x=i/Math.sqrt(l*u+o*w)/s;return C.fromAxisAngle(q,x,Q),b.fromQuaternion(Q,G),b.multiplyByVector(G,y,c),n.normalize(c,c),n.multiplyByScalar(c,s,c),c}var U=new n,Z=new n,N=new n,v=new n;j.raisePositionsToHeight=function(e,t,r){let a=t.ellipsoid,o=t.height,i=t.extrudedHeight,l=r?e.length/3*2:e.length/3,s=new Float64Array(3*l),y=e.length,c=r?y:0;for(let t=0;t<y;t+=3){let l=t+1,y=t+2,m=n.fromArray(e,t,U);a.scaleToGeodeticSurface(m,m);let u=n.clone(m,Z),w=a.geodeticSurfaceNormal(m,v),x=n.multiplyByScalar(w,o,N);n.add(m,x,m),r&&(n.multiplyByScalar(w,i,x),n.add(u,x,u),s[t+c]=u.x,s[l+c]=u.y,s[y+c]=u.z),s[t]=m.x,s[l]=m.y,s[y]=m.z}return s};var D=new n,J=new n,K=new n;j.computeEllipsePositions=function(e,t,r){let a=e.semiMinorAxis,o=e.semiMajorAxis,i=e.rotation,l=e.center,s=8*e.granularity,y=a*a,c=o*o,m=o*a,u=n.magnitude(l),x=n.normalize(l,D),h=n.cross(n.UNIT_Z,l,J);h=n.normalize(h,h);let f=n.cross(x,h,K),z=1+Math.ceil(w.PI_OVER_TWO/s),T=w.PI_OVER_TWO/(z-1),_=w.PI_OVER_TWO-z*T;_<0&&(z-=Math.ceil(Math.abs(_)/T));let p,O,P,d,M,I=t?new Array(3*(z*(z+2)*2)):void 0,g=0,A=U,E=Z,V=4*z*3,j=V-1,v=0,R=r?new Array(V):void 0;for(_=w.PI_OVER_TWO,A=W(_,i,f,h,y,m,c,u,x,A),t&&(I[g++]=A.x,I[g++]=A.y,I[g++]=A.z),r&&(R[j--]=A.z,R[j--]=A.y,R[j--]=A.x),_=w.PI_OVER_TWO-T,p=1;p<z+1;++p){if(A=W(_,i,f,h,y,m,c,u,x,A),E=W(Math.PI-_,i,f,h,y,m,c,u,x,E),t){for(I[g++]=A.x,I[g++]=A.y,I[g++]=A.z,P=2*p+2,O=1;O<P-1;++O)d=O/(P-1),M=n.lerp(A,E,d,N),I[g++]=M.x,I[g++]=M.y,I[g++]=M.z;I[g++]=E.x,I[g++]=E.y,I[g++]=E.z}r&&(R[j--]=A.z,R[j--]=A.y,R[j--]=A.x,R[v++]=E.x,R[v++]=E.y,R[v++]=E.z),_=w.PI_OVER_TWO-(p+1)*T}for(p=z;p>1;--p){if(_=w.PI_OVER_TWO-(p-1)*T,A=W(-_,i,f,h,y,m,c,u,x,A),E=W(_+Math.PI,i,f,h,y,m,c,u,x,E),t){for(I[g++]=A.x,I[g++]=A.y,I[g++]=A.z,P=2*(p-1)+2,O=1;O<P-1;++O)d=O/(P-1),M=n.lerp(A,E,d,N),I[g++]=M.x,I[g++]=M.y,I[g++]=M.z;I[g++]=E.x,I[g++]=E.y,I[g++]=E.z}r&&(R[j--]=A.z,R[j--]=A.y,R[j--]=A.x,R[v++]=E.x,R[v++]=E.y,R[v++]=E.z)}_=w.PI_OVER_TWO,A=W(-_,i,f,h,y,m,c,u,x,A);let B={};return t&&(I[g++]=A.x,I[g++]=A.y,I[g++]=A.z,B.positions=I,B.numPts=z),r&&(R[j--]=A.z,R[j--]=A.y,R[j--]=A.x,B.outerPositions=R),B};var tt=j;export{tt as a};