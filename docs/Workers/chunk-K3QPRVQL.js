/*! For license information please see chunk-K3QPRVQL.js.LICENSE.txt */
import{a as Q}from"./chunk-D26HTPVM.js";import{a as z}from"./chunk-UQA7A4FU.js";import{a as _}from"./chunk-TI5V2UQQ.js";import{a as K}from"./chunk-XAJFOHMU.js";import{a as H}from"./chunk-UUWY23O5.js";import{b as J,c as W,d as P}from"./chunk-3DQAB6YL.js";import{d as j}from"./chunk-HXYTWA7P.js";import{a as L}from"./chunk-JJLMPDRL.js";import{a as b,c as k}from"./chunk-T4TQMW7B.js";import{a as Z}from"./chunk-7TT2TZHW.js";import{a as x}from"./chunk-XQTMMRVI.js";import{a as F}from"./chunk-QHDGFGBI.js";import{e as g}from"./chunk-MVZBAA6W.js";var M=new k,ot=new b,nt=new b,it=new b,st=new b;function O(t){let e=(t=x(t,x.EMPTY_OBJECT)).length,o=t.topRadius,n=t.bottomRadius,r=x(t.vertexFormat,_.DEFAULT),a=x(t.slices,128);if(!g(e))throw new F("options.length must be defined.");if(!g(o))throw new F("options.topRadius must be defined.");if(!g(n))throw new F("options.bottomRadius must be defined.");if(a<3)throw new F("options.slices must be greater than or equal to 3.");if(g(t.offsetAttribute)&&t.offsetAttribute===z.TOP)throw new F("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._length=e,this._topRadius=o,this._bottomRadius=n,this._vertexFormat=_.clone(r),this._slices=a,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderGeometry"}O.packedLength=_.packedLength+5,O.pack=function(t,e,o){if(!g(t))throw new F("value is required");if(!g(e))throw new F("array is required");return o=x(o,0),_.pack(t._vertexFormat,e,o),o+=_.packedLength,e[o++]=t._length,e[o++]=t._topRadius,e[o++]=t._bottomRadius,e[o++]=t._slices,e[o]=x(t._offsetAttribute,-1),e};var G,X=new _,C={vertexFormat:X,length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,offsetAttribute:void 0};O.unpack=function(t,e,o){if(!g(t))throw new F("array is required");e=x(e,0);let n=_.unpack(t,e,X);e+=_.packedLength;let r=t[e++],a=t[e++],i=t[e++],s=t[e++],u=t[e];return g(o)?(o._vertexFormat=_.clone(n,o._vertexFormat),o._length=r,o._topRadius=a,o._bottomRadius=i,o._slices=s,o._offsetAttribute=-1===u?void 0:u,o):(C.length=r,C.topRadius=a,C.bottomRadius=i,C.slices=s,C.offsetAttribute=-1===u?void 0:u,new O(C))},O.createGeometry=function(t){let e=t._length,o=t._topRadius,n=t._bottomRadius,r=t._vertexFormat,a=t._slices;if(e<=0||o<0||n<0||0===o&&0===n)return;let i,s=a+a,u=a+s,m=s+s,f=Q.computePositions(e,o,n,a,!0),p=r.st?new Float32Array(2*m):void 0,l=r.normal?new Float32Array(3*m):void 0,c=r.tangent?new Float32Array(3*m):void 0,h=r.bitangent?new Float32Array(3*m):void 0,d=r.normal||r.tangent||r.bitangent;if(d){let t=r.tangent||r.bitangent,s=0,u=0,m=0,f=Math.atan2(n-o,e),p=ot;p.z=Math.sin(f);let g=Math.cos(f),_=it,A=nt;for(i=0;i<a;i++){let e=i/a*Z.TWO_PI,o=g*Math.cos(e),n=g*Math.sin(e);d&&(p.x=o,p.y=n,t&&(_=b.normalize(b.cross(b.UNIT_Z,p,_),_)),r.normal&&(l[s++]=p.x,l[s++]=p.y,l[s++]=p.z,l[s++]=p.x,l[s++]=p.y,l[s++]=p.z),r.tangent&&(c[u++]=_.x,c[u++]=_.y,c[u++]=_.z,c[u++]=_.x,c[u++]=_.y,c[u++]=_.z),r.bitangent&&(A=b.normalize(b.cross(p,_,A),A),h[m++]=A.x,h[m++]=A.y,h[m++]=A.z,h[m++]=A.x,h[m++]=A.y,h[m++]=A.z))}for(i=0;i<a;i++)r.normal&&(l[s++]=0,l[s++]=0,l[s++]=-1),r.tangent&&(c[u++]=1,c[u++]=0,c[u++]=0),r.bitangent&&(h[m++]=0,h[m++]=-1,h[m++]=0);for(i=0;i<a;i++)r.normal&&(l[s++]=0,l[s++]=0,l[s++]=1),r.tangent&&(c[u++]=1,c[u++]=0,c[u++]=0),r.bitangent&&(h[m++]=0,h[m++]=1,h[m++]=0)}let _=12*a-12,A=K.createTypedArray(m,_),w=0,y=0;for(i=0;i<a-1;i++)A[w++]=y,A[w++]=y+2,A[w++]=y+3,A[w++]=y,A[w++]=y+3,A[w++]=y+1,y+=2;for(A[w++]=s-2,A[w++]=0,A[w++]=1,A[w++]=s-2,A[w++]=1,A[w++]=s-1,i=1;i<a-1;i++)A[w++]=s+i+1,A[w++]=s+i,A[w++]=s;for(i=1;i<a-1;i++)A[w++]=u,A[w++]=u+i,A[w++]=u+i+1;let v=0;if(r.st){let t=Math.max(o,n);for(i=0;i<m;i++){let e=b.fromArray(f,3*i,st);p[v++]=(e.x+t)/(2*t),p[v++]=(e.y+t)/(2*t)}}let F=new H;r.position&&(F.position=new P({componentDatatype:L.DOUBLE,componentsPerAttribute:3,values:f})),r.normal&&(F.normal=new P({componentDatatype:L.FLOAT,componentsPerAttribute:3,values:l})),r.tangent&&(F.tangent=new P({componentDatatype:L.FLOAT,componentsPerAttribute:3,values:c})),r.bitangent&&(F.bitangent=new P({componentDatatype:L.FLOAT,componentsPerAttribute:3,values:h})),r.st&&(F.st=new P({componentDatatype:L.FLOAT,componentsPerAttribute:2,values:p})),M.x=.5*e,M.y=Math.max(n,o);let x=new j(b.ZERO,k.magnitude(M));if(g(t._offsetAttribute)){e=f.length;let o=t._offsetAttribute===z.NONE?0:1,n=new Uint8Array(e/3).fill(o);F.applyOffset=new P({componentDatatype:L.UNSIGNED_BYTE,componentsPerAttribute:1,values:n})}return new W({attributes:F,indices:A,primitiveType:J.TRIANGLES,boundingSphere:x,offsetAttribute:t._offsetAttribute})},O.getUnitCylinder=function(){return g(G)||(G=O.createGeometry(new O({topRadius:1,bottomRadius:1,length:1,vertexFormat:_.POSITION_ONLY}))),G};var yt=O;export{yt as a};