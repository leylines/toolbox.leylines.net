/*! For license information please see createCircleOutlineGeometry.js.LICENSE.txt */
import{a as n}from"./chunk-DVCRQHBT.js";import"./chunk-OCXRSWMX.js";import"./chunk-UQA7A4FU.js";import"./chunk-XAJFOHMU.js";import"./chunk-UUWY23O5.js";import"./chunk-3DQAB6YL.js";import"./chunk-HXYTWA7P.js";import"./chunk-AT27Z3WO.js";import"./chunk-HB5KYIAZ.js";import"./chunk-JJLMPDRL.js";import{a as o,d as s}from"./chunk-T4TQMW7B.js";import"./chunk-7TT2TZHW.js";import"./chunk-FRKPHPJC.js";import"./chunk-OHNTPGT4.js";import{a as u}from"./chunk-XQTMMRVI.js";import{b as d}from"./chunk-QHDGFGBI.js";import{e as a}from"./chunk-MVZBAA6W.js";function m(e){let i=(e=u(e,u.EMPTY_OBJECT)).radius;d.typeOf.number("radius",i);let r={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new n(r),this._workerName="createCircleOutlineGeometry"}m.packedLength=n.packedLength,m.pack=function(e,i,r){return d.typeOf.object("value",e),n.pack(e._ellipseGeometry,i,r)};var p=new n({center:new o,semiMajorAxis:1,semiMinorAxis:1}),i={center:new o,radius:void 0,ellipsoid:s.clone(s.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};m.unpack=function(e,r,t){let c=n.unpack(e,r,p);return i.center=o.clone(c._center,i.center),i.ellipsoid=s.clone(c._ellipsoid,i.ellipsoid),i.height=c._height,i.extrudedHeight=c._extrudedHeight,i.granularity=c._granularity,i.numberOfVerticalLines=c._numberOfVerticalLines,a(t)?(i.semiMajorAxis=c._semiMajorAxis,i.semiMinorAxis=c._semiMinorAxis,t._ellipseGeometry=new n(i),t):(i.radius=c._semiMajorAxis,new m(i))},m.createGeometry=function(e){return n.createGeometry(e._ellipseGeometry)};var c=m;function f(e,i){return a(i)&&(e=c.unpack(e,i)),e._ellipseGeometry._center=o.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=s.clone(e._ellipseGeometry._ellipsoid),c.createGeometry(e)}var E=f;export{E as default};