/*! For license information please see chunk-MXXPLDAG.js.LICENSE.txt */
import{a as O}from"./chunk-HXYTWA7P.js";import{c as I,d as V}from"./chunk-HB5KYIAZ.js";import{a as W,b as v}from"./chunk-T4TQMW7B.js";import{a as R}from"./chunk-7TT2TZHW.js";import{a as k}from"./chunk-QHDGFGBI.js";import{e as N}from"./chunk-MVZBAA6W.js";var z=Math.cos,Z=Math.sin,D=Math.sqrt,L={computePosition:function(t,n,a,r,o,s,e){let i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,l=g.latitude-t.granYCos*r+o*t.granXSin,u=z(l),c=Z(l),C=i.z*c,S=g.longitude+r*t.granYSin+o*t.granXCos,w=u*z(S),m=u*Z(S),d=i.x*w,R=i.y*m,W=D(d*w+R*m+C*c);if(s.x=d/W,s.y=R/W,s.z=C/W,a){let n=t.stNwCorner;N(n)?(l=n.latitude-t.stGranYCos*r+o*t.stGranXSin,S=n.longitude+r*t.stGranYSin+o*t.stGranXCos,e.x=(S-t.stWest)*t.lonScalar,e.y=(l-t.stSouth)*t.latScalar):(e.x=(S-h.west)*t.lonScalar,e.y=(l-h.south)*t.latScalar)}}},A=new V,g=new W,F=new v,b=new W,q=new O;function B(t,n,a,r,o,s,e){let i=Math.cos(n),h=r*i,l=a*i,u=Math.sin(n),c=r*u,C=a*u;g=q.project(t,g),g=W.subtract(g,b,g);let S=V.fromRotation(n,A);g=V.multiplyByVector(S,g,g),g=W.add(g,b,g),s-=1,e-=1;let w=(t=q.unproject(g,t)).latitude,m=w+s*C,d=w-h*e,R=w-h*e+s*C,Y=Math.max(w,m,d,R),p=Math.min(w,m,d,R),O=t.longitude,X=O+s*l,I=O+e*c,f=O+e*c+s*l;return{north:Y,south:p,east:Math.max(O,X,I,f),west:Math.min(O,X,I,f),granYCos:h,granYSin:c,granXCos:l,granXSin:C,nwCorner:t}}L.computeOptions=function(t,n,a,r,o,s,e){let i=t.east,g=t.west,h=t.north,l=t.south,u=!1,c=!1;h===R.PI_OVER_TWO&&(u=!0),l===-R.PI_OVER_TWO&&(c=!0);let C,S=h-l;C=g>i?R.TWO_PI-g+i:i-g;let w=Math.ceil(C/n)+1,m=Math.ceil(S/n)+1,d=C/(w-1),W=S/(m-1),Y=I.northwest(t,s),p=I.center(t,F);(0!==a||0!==r)&&(p.longitude<Y.longitude&&(p.longitude+=R.TWO_PI),b=q.project(p,b));let O=W,X=d,f=I.clone(t,o),T={granYCos:O,granYSin:0,granXCos:X,granXSin:0,nwCorner:Y,boundingRectangle:f,width:w,height:m,northCap:u,southCap:c};if(0!==a){let t=B(Y,a,d,W,p,w,m);if(h=t.north,l=t.south,i=t.east,g=t.west,h<-R.PI_OVER_TWO||h>R.PI_OVER_TWO||l<-R.PI_OVER_TWO||l>R.PI_OVER_TWO)throw new k("Rotated rectangle is invalid.  It crosses over either the north or south pole.");T.granYCos=t.granYCos,T.granYSin=t.granYSin,T.granXCos=t.granXCos,T.granXSin=t.granXSin,f.north=h,f.south=l,f.east=i,f.west=g}if(0!==r){a-=r;let t=I.northwest(f,e),n=B(t,a,d,W,p,w,m);T.stGranYCos=n.granYCos,T.stGranXCos=n.granXCos,T.stGranYSin=n.granYSin,T.stGranXSin=n.granXSin,T.stNwCorner=t,T.stWest=n.west,T.stSouth=n.south}return T};var nt=L;export{nt as a};