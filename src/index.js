import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
*/


var switcher = false
document.getElementById("switchit").onclick = function() {
  if (!switcher) {
    document.getElementById("toolbar").style.display = "inline";
    document.getElementById("switchit").textContent = "Hide toolbar";
    switcher = true;
  } else {
    document.getElementById("toolbar").style.display = "none";
    document.getElementById("switchit").textContent = "Show toolbar";
    switcher = false;
  }
}

var west  = -100000.0;
var south = -100000.0;
var east  = 100000.0;
var north = 100000.0;
var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.4;
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

const optionsGlobe = {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: true,
    infoBox: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    sceneModePicker: false,
    sceneModePicker: false,
    scene3DOnly: true,
    timeline: false,
    vrButton: false,
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(
      Cesium.ArcGisMapServerImageryProvider.fromUrl(
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
      )
    ),
};

const viewer = new Cesium.Viewer("cesiumContainer", optionsGlobe);

viewer.scene.skyAtmosphere.show = false;
viewer.scene.screenSpaceCameraController.enableTilt = false;

const canvas = viewer.canvas;

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function (event) {
  const ray = viewer.camera.getPickRay(event.position);
  const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
  if (Cesium.defined(earthPosition)) {
    var point = viewer.entities.getById(toolbarParameters.pointType);
    if (point) {
      viewer.entities.remove(point);
    }
    var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(earthPosition);
    if (toolbarParameters.pointType == "Start Point") {
      toolbarParameters.spLat = Cesium.Math.toDegrees(carto.latitude);
      toolbarParameters.spLon = Cesium.Math.toDegrees(carto.longitude);
    } else {
      toolbarParameters.epLat = Cesium.Math.toDegrees(carto.latitude);
      toolbarParameters.epLon = Cesium.Math.toDegrees(carto.longitude);
    }
    toolbarParameters.bearing = getInitialBearing(
      Number(toolbarParameters.spLat),
      Number(toolbarParameters.spLon),
      Number(toolbarParameters.epLat),
      Number(toolbarParameters.epLon)
      );
    viewer.entities.add({
      id: toolbarParameters.pointType,
      position: earthPosition,
      point: {
        color: Cesium.Color.WHITE, // default: WHITE
        pixelSize: 5, // default: 1
        outlineColor: Cesium.Color.RED, // default: BLACK
        outlineWidth: 1, // default: 0
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
    gridPoints = calculateGridPoints(toolbarParameters.spLat,toolbarParameters.spLon,toolbarParameters.bearing);
    dodecahedrons.forEach((dodecahedron, i) => {
      viewer.entities.remove(viewer.entities.getById('dode' + i));
    });
    dodecahedrons = getDodecahedronPolys(gridPoints);
    createDodecahedronPolys(dodecahedrons);

    icosahedrons.forEach((icosahedron, i) => {
      viewer.entities.remove(viewer.entities.getById('ico' + i));
    });
    icosahedrons = getIcosahedrons(gridPoints);
    createIcosahedronPolys(icosahedrons);

    triacontahedrons.forEach((triacontahedron, i) => {
      viewer.entities.remove(viewer.entities.getById('tria' + i));
    });
    triacontahedrons = getTriacontahedrons(gridPoints);
    createTriacontahedronPolys(triacontahedrons);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

const toolbarParameters = {
  spLat: 10.8,
  spLon: 31.2,
  epLat: 10.8,
  epLon: 33.2,
  bearing: 0,
  maxHeight: 7300000,
  minHeight: 5300000,
  icoHeight: 920000,
  dodeHeight: 300000,
  triaHeight: 460000,
  showGlobe: true,
  showDodecahedron: true,
  dodeTransparency: 0.5,
  icoTransparency: 0.5,
  triaTransparency: 0.5,
  pointType: "Start Point",
  pointTypes: ["Start Point","End Point"]
};

var gridPoints = calculateGridPoints(toolbarParameters.spLat,toolbarParameters.spLon,toolbarParameters.bearing);

Cesium.knockout.track(toolbarParameters);
const toolbar = document.getElementById("toolbar");
Cesium.knockout.applyBindings(toolbarParameters, toolbar);

Cesium.knockout
  .getObservable(toolbarParameters, "showGlobe")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    viewer.scene.globe.show = value;
  });

Cesium.knockout
  .getObservable(toolbarParameters, "pointType")
  .subscribe(function (newValue) {
    toolbarParameters.pointType = newValue;
  });

Cesium.knockout
  .getObservable(toolbarParameters, "showDodecahedron")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    dodecahedronPolysEntity.show = !dodecahedronPolysEntity.show;
  });

Cesium.knockout
  .getObservable(toolbarParameters, "dodeHeight")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    toolbarParameters.dodeHeight = value;
  });

Cesium.knockout
  .getObservable(toolbarParameters, "icoHeight")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    toolbarParameters.icoHeight = value;
  });

Cesium.knockout
  .getObservable(toolbarParameters, "triaHeight")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    toolbarParameters.triaHeight = value;
  });

Cesium.knockout
  .getObservable(toolbarParameters, "dodeTransparency")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    toolbarParameters.dodeTransparency = value;
    for (var i = 0; i < dodecahedrons.length; ++i) {
       var entity = viewer.entities.getById('dode' + i);
       entity.polygon.material = Cesium.Color.GREEN.withAlpha(value);
    }
  });

Cesium.knockout
  .getObservable(toolbarParameters, "icoTransparency")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    toolbarParameters.icoTransparency = value;
    for (var i = 0; i < icosahedrons.length; ++i) {
       var entity = viewer.entities.getById('ico' + i);
       entity.polygon.material = Cesium.Color.BLUE.withAlpha(value);
    }
  });

Cesium.knockout
  .getObservable(toolbarParameters, "triaTransparency")
  .subscribe(function (newValue) {
    const value = Number(newValue);
    toolbarParameters.triaTransparency = value;
    for (var i = 0; i < triacontahedrons.length; ++i) {
       var entity = viewer.entities.getById('tria' + i);
       entity.polygon.material = Cesium.Color.VIOLET.withAlpha(value);
    }
  });

var basicGridLinesEntity = viewer.entities.add(new Cesium.Entity());
var dodecahedronPolysEntity = viewer.entities.add(new Cesium.Entity());
var icosahedronPolys = viewer.entities.add(new Cesium.Entity());
var triacontahedronPolys = viewer.entities.add(new Cesium.Entity());

var basicGridLines = getBasicGridLines(gridPoints);
var dodecahedrons = getDodecahedronPolys(gridPoints);
var icosahedrons = getIcosahedrons(gridPoints);
var triacontahedrons = getTriacontahedrons(gridPoints);

createBasicGridLines(basicGridLines);
createDodecahedronPolys(dodecahedrons);
createIcosahedronPolys(icosahedrons);
createTriacontahedronPolys(triacontahedrons);

function createBasicGridLines(basicGridLines) {
  basicGridLines.forEach((basicGridLine, i) => {
    viewer.entities.add({
      parent: basicGridLinesEntity,
      name: "Basic Line " + i,
      id: 'basic' + i,
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(basicGridLine),
        width: 5,
        clampToGround: true,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.2,
          taperPower: 0.5,
          color: Cesium.Color.CORNFLOWERBLUE,
        }),
      }
    });
  });
}

function createDodecahedronPolys(dodecahedrons) {
  dodecahedrons.forEach((dodecahedron, i) => {
    viewer.entities.add({
      parent: dodecahedronPolysEntity,
      name: "Dodecahedron Polygon" + i,
      id: 'dode' + i,
      polygon: {
        material: Cesium.Color.GREEN.withAlpha(0.5),
        arcType: 'NONE',
        width: 3,
        outline: true,
        perPositionHeight: true,
        outlineColor: Cesium.Color.GREEN,
        outlineWidth: 5,
        hierarchy: new Cesium.CallbackProperty(getDodecahedronPosition(dodecahedron), false),
      }
    });
  });
}

function createIcosahedronPolys(icosahedrons) {
  icosahedrons.forEach((icosahedron, i) => {
    viewer.entities.add({
      parent: icosahedronPolys,
      name: "Icosahedron Polygon " + i,
      id: 'ico' + i,
      polygon: {
        material: Cesium.Color.BLUE.withAlpha(0.5),
        arcType: 'NONE',
        width: 3,
        perPositionHeight: true,
        outline: true,
        outlineColor: Cesium.Color.BLUE,
        outlineWidth: 5,
        hierarchy: new Cesium.CallbackProperty(getIcosahedronPosition(icosahedron), false)
      }
    });
  });
}

function createTriacontahedronPolys(triacontahedrons) {
  triacontahedrons.forEach((triacontahedron, i) => {
    viewer.entities.add({
      parent: triacontahedronPolys,
      name: "Triacontahedron Polygon " + i,
      id: 'tria' + i,
      polygon: {
        material: Cesium.Color.VIOLET.withAlpha(0.5),
        arcType: 'NONE',
        width: 3,
        perPositionHeight: true,
        outline: true,
        outlineColor: Cesium.Color.VIOLET,
        outlineWidth: 5,
        hierarchy: new Cesium.CallbackProperty(getTriacontahedronHeight(triacontahedron), false)
      }
    });
  });
}

function getDodecahedronPosition(dodecahedron) {
  return function callbackFunction() {
    return { positions:
      Cesium.Cartesian3.fromDegreesArrayHeights([
        dodecahedron[0][0], dodecahedron[0][1], toolbarParameters.dodeHeight,
        dodecahedron[1][0], dodecahedron[1][1], toolbarParameters.dodeHeight,
        dodecahedron[2][0], dodecahedron[2][1], toolbarParameters.dodeHeight,
        dodecahedron[3][0], dodecahedron[3][1], toolbarParameters.dodeHeight,
        dodecahedron[4][0], dodecahedron[4][1], toolbarParameters.dodeHeight
      ])
    };
  };
}

function getIcosahedronPosition(icosahedron) {
  return function callbackFunction() {
    return { positions:
      Cesium.Cartesian3.fromDegreesArrayHeights([
        icosahedron[0][0], icosahedron[0][1], toolbarParameters.icoHeight,
        icosahedron[1][0], icosahedron[1][1], toolbarParameters.icoHeight,
        icosahedron[2][0], icosahedron[2][1], toolbarParameters.icoHeight
      ])
    };
  };
}

function getTriacontahedronHeight(triacontahedron) {
  return function callbackFunction() {
    return { positions: 
      Cesium.Cartesian3.fromDegreesArrayHeights([
        triacontahedron[0][0], triacontahedron[0][1], toolbarParameters.triaHeight,
        triacontahedron[1][0], triacontahedron[1][1], toolbarParameters.triaHeight,
        triacontahedron[2][0], triacontahedron[2][1], toolbarParameters.triaHeight,
        triacontahedron[3][0], triacontahedron[3][1], toolbarParameters.triaHeight
      ])
    };
  };
}

function rotateZ(param, thetaZ) {
  var i, tot;
  for (i=0, tot=param.length; i<tot; i++) {
    var x = param[i][0];
    var y = param[i][1];
    var z = param[i][2];

    param[i][0] = x*Math.cos(thetaZ)-y*Math.sin(thetaZ);
    param[i][1] = x*Math.sin(thetaZ)+y*Math.cos(thetaZ);
    param[i][2] = z;
  }
  return param;
}

function rotateX(param, thetaX) {
  var i, tot;
  for (i=0, tot=param.length; i<tot; i++) {
    var x = param[i][0];
    var y = param[i][1];
    var z = param[i][2];

    param[i][0] = x;
    param[i][1] = y*Math.cos(thetaX)-z*Math.sin(thetaX);
    param[i][2] = y*Math.sin(thetaX)+z*Math.cos(thetaX);
  }
  return param;
}

function rotateY(param, thetaY) {
  var i, tot;
  for (i=0, tot=param.length; i<tot; i++) {
    var x = param[i][0];
    var y = param[i][1];
    var z = param[i][2];

    param[i][0] = x*Math.cos(thetaY)+z*Math.sin(thetaY);
    param[i][1] = y;
    param[i][2] = -x*Math.sin(thetaY)+z*Math.cos(thetaY);
  }
  return param;
}

function getInitialBearing(lat1, lon1, lat2, lon2) {
  var start = Cesium.Cartographic.fromDegrees(lat1, lon1);
  var end = Cesium.Cartographic.fromDegrees(lat2, lon2);

  var y = Math.sin(end.longitude - start.longitude) * Math.cos(end.latitude);
  var x = Math.cos(start.latitude) * Math.sin(end.latitude) -
    Math.sin(start.latitude) * Math.cos(end.latitude) *
    Math.cos(end.longitude - start.longitude);

  var bearing = Math.atan2(y, x);
  return -Cesium.Math.toDegrees(bearing);
}

function coordinates(param, results) {
  var i, tot;

  for (i=0, tot=param.length; i<tot; i++) {
    var x = param[i][0];
    var y = param[i][1];
    var z = param[i][2];

    var theta = 0;
    var phi = 0;
    if (z < 0) {
      theta = Math.PI+Math.atan(Math.sqrt(x*x+y*y)/z);
    } else if (z===0) {
      theta = Math.Pi/2.0;
    } else {
      theta = Math.atan(Math.sqrt(x*x+y*y)/z);
    }

    if (x < 0 && y !== 0) {
      phi = Math.PI+Math.atan(y/x);
    } else if (x === 0 && y > 0) {
      phi = Math.PI/2.0;
    } else if (x === 0 && y < 0) {
      phi = Math.PI*3.0/2.0;
    } else if (y === 0 && x > 0) {
      phi = 0;
    } else if (y === 0 && x < 0) {
      phi = Math.PI;
    } else if (x > 0 && y <= 0) {
      phi = 2*Math.PI+Math.atan(y/x);
    } else if (x === 0 && y === 0)  {
      phi = 888.0;
    } else {
      phi = Math.atan(y/x);
    }

    param[i][0] = theta;
    param[i][1] = phi;
    delete param[i][2];

    theta = Cesium.Math.toDegrees(theta);
    phi = Cesium.Math.toDegrees(phi);

    var longitude;
    var latitude = 90.0-theta;
    if (phi <= 180.0) {
      longitude = phi;
    } else {
      longitude = phi-360.0;
    }
    if (longitude > 600) {
      longitude = 0.0;
    }
    results.push([longitude,latitude]);

  }
  return results;
};

function calculateGridPoints(lat1, lon1, azi) {

	var results = [];

	var thetaX;
	var thetaY;
	var thetaZ;

	// get shape
        var p = (1+Math.sqrt(5.0))/2.0;
	var shape = [[0,1/p,p],[0,-1/p,-p],[0,-1/p,p],[0,1/p,-p],[1/p,p,0],[-1/p,-p,0],[-1/p,p,0],[1/p,-p,0],[p,0,1/p],[-p,0,-1/p],[-p,0,1/p],[p,0,-1/p],[1,1,1],[-1,-1,-1],[-1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1],[1,-1,1],[1,1,-1],[0,-p,1],[0,p,-1],[0,-p,-1],[0,p,1],[1,0,p],[-1,0,-p],[-1,0,p],[1,0,-p],[p,-1,0],[-p,1,0],[-p,-1,0],[p,1,0],[2,0,0],[-2,0,0],[0,2,0],[0,-2,0],[0,0,2],[0,0,-2],[p,1/p,1],[-p,-1/p,-1],[-p,-1/p,1],[-p,1/p,-1],[p,-1/p,-1],[p,-1/p,1],[p,1/p,-1],[-p,1/p,1],[1,p,1/p],[-1,-p,-1/p],[-1,-p,1/p],[-1,p,-1/p],[1,-p,-1/p],[1,-p,1/p],[1,p,-1/p],[-1,p,1/p],[1/p,1,p],[-1/p,-1,-p],[-1/p,-1,p],[-1/p,1,-p],[1/p,-1,-p],[1/p,-1,p],[1/p,1,-p],[-1/p,1,p]];

	// default the vertex of a shape toward true north
        thetaY = Math.acos(Math.sqrt((3.0+Math.sqrt(5.0))/6.0))
	thetaX = Cesium.Math.toRadians(180.0);

	shape = rotateX(rotateY(shape, thetaY), thetaX);

	// set rotational angles
	thetaX = azi;
	thetaZ = Cesium.Math.toRadians(lon1);
	thetaY = -Cesium.Math.toRadians(lat1);

	results = coordinates(rotateZ(rotateY(rotateX(shape, thetaX), thetaY), thetaZ), results);
	return results;

};

function getBasicGridLines(gridPoints) {
  let connections = [
     [28,32],[31,4],[34,6],[29,33],[30,5],[35,7],
     [32,31],[4,34],[6,29],[33,30],[5,35],[7,28],
     [8,32],[11,27],[37,25],[9,33],[10,26],[36,24],
     [32,11],[27,37],[25,9],[33,10],[26,36],[24,8],
     [20,35],[22,1],[37,3],[21,34],[23,0],[36,2],
     [35,22],[1,37],[3,21],[34,23],[0,36],[2,20],
     [31,44],[27,1],[55,13],[30,40],[26,0],[54,12],
     [44,27],[1,55],[13,30],[40,26],[0,54],[12,31],
     [45,14],[23,46],[31,11],[42,17],[22,47],[30,10],
     [14,23],[46,31],[11,42],[17,22],[47,30],[10,45],
     [24,43],[28,17],[58,1],[25,41],[29,14],[61,0],
     [43,28],[17,58],[1,25],[41,29],[14,61],[0,24],
     [20,51],[28,11],[44,19],[21,49],[29,10],[40,15],
     [51,28],[11,44],[19,21],[49,29],[10,40],[15,20],
     [24,59],[20,5],[47,13],[25,57],[21,4],[46,12],
     [59,20],[5,47],[13,25],[57,21],[4,46],[12,24],
     [8,28],[50,22],[13,39],[9,29],[53,23],[12,38],
     [28,50],[22,13],[39,9],[29,53],[23,12],[38,8],
     [8,31],[52,21],[16,41],[9,30],[48,20],[18,43],
     [31,52],[21,16],[41,9],[30,48],[20,18],[43,8],
     [24,38],[31,19],[60,3],[25,39],[30,15],[56,2],
     [38,31],[19,60],[3,25],[39,30],[15,56],[2,24],
     [27,19],[52,4],[23,61],[26,15],[48,5],[22,58],
     [19,52],[4,23],[61,26],[15,48],[5,22],[58,27],
     [7,22],[55,25],[16,49],[6,23],[54,24],[18,51],
     [22,55],[25,16],[49,6],[23,54],[24,18],[51,7],
     [14,53],[6,21],[60,27],[17,50],[7,20],[56,26],
     [53,6],[21,60],[27,17],[50,7],[20,56],[26,14],
     [59,18],[28,42],[27,3],[57,16],[29,45],[26,2],
     [18,28],[42,27],[3,57],[16,29],[45,26],[2,59]
  ];
  var lines = [];
  connections.forEach((connection, i) => {
    lines.push([gridPoints[connection[0]][0],gridPoints[connection[0]][1],gridPoints[connection[1]][0],gridPoints[connection[1]][1]]);
  });
  return lines;
}
  

function getDodecahedronPolys(gridPoints) {
  let dodecahedron1 = [gridPoints[11],gridPoints[19],gridPoints[4],gridPoints[12],gridPoints[8],gridPoints[11]];
  let dodecahedron2 = [gridPoints[17],gridPoints[11],gridPoints[8],gridPoints[18],gridPoints[7],gridPoints[17]];
  let dodecahedron3 = [gridPoints[1],gridPoints[17],gridPoints[7],gridPoints[5],gridPoints[13],gridPoints[1]];
  let dodecahedron4 = [gridPoints[3],gridPoints[1],gridPoints[13],gridPoints[9],gridPoints[16],gridPoints[3]];
  let dodecahedron5 = [gridPoints[19],gridPoints[3],gridPoints[16],gridPoints[6],gridPoints[4],gridPoints[19]];
  let dodecahedron6 = [gridPoints[8],gridPoints[12],gridPoints[0],gridPoints[2],gridPoints[18],gridPoints[8]];
  let dodecahedron7 = [gridPoints[7],gridPoints[18],gridPoints[2],gridPoints[15],gridPoints[5],gridPoints[7]];
  let dodecahedron8 = [gridPoints[13],gridPoints[5],gridPoints[15],gridPoints[10],gridPoints[9],gridPoints[13]];
  let dodecahedron9 = [gridPoints[16],gridPoints[9],gridPoints[10],gridPoints[14],gridPoints[6],gridPoints[16]];
  let dodecahedron10 = [gridPoints[4],gridPoints[6],gridPoints[14],gridPoints[0],gridPoints[12],gridPoints[4]];
  let dodecahedron11 = [gridPoints[1],gridPoints[3],gridPoints[19],gridPoints[11],gridPoints[17],gridPoints[1]];
  let dodecahedron12 = [gridPoints[0],gridPoints[14],gridPoints[10],gridPoints[15],gridPoints[2],gridPoints[0]];

 return [dodecahedron1, dodecahedron2, dodecahedron3, dodecahedron4, dodecahedron5, dodecahedron6, dodecahedron7, dodecahedron8, dodecahedron9, dodecahedron10, dodecahedron11, dodecahedron12];
}

function getIcosahedrons(gridPoints) {
  let icosahedron1 = [gridPoints[28],gridPoints[31],gridPoints[24],gridPoints[28]];
  let icosahedron2 = [gridPoints[28],gridPoints[24],gridPoints[20],gridPoints[28]];
  let icosahedron3 = [gridPoints[22],gridPoints[28],gridPoints[20],gridPoints[22]];
  let icosahedron4 = [gridPoints[22],gridPoints[20],gridPoints[30],gridPoints[22]];
  let icosahedron5 = [gridPoints[25],gridPoints[22],gridPoints[30],gridPoints[25]];
  let icosahedron6 = [gridPoints[25],gridPoints[30],gridPoints[29],gridPoints[25]];
  let icosahedron7 = [gridPoints[21],gridPoints[25],gridPoints[29],gridPoints[21]];
  let icosahedron8 = [gridPoints[21],gridPoints[29],gridPoints[23],gridPoints[21]];
  let icosahedron9 = [gridPoints[31],gridPoints[21],gridPoints[23],gridPoints[31]];
  let icosahedron10 = [gridPoints[31],gridPoints[23],gridPoints[24],gridPoints[31]];
  let icosahedron11 = [gridPoints[27],gridPoints[31],gridPoints[28],gridPoints[27]];
  let icosahedron12 = [gridPoints[27],gridPoints[28],gridPoints[22],gridPoints[27]];
  let icosahedron13 = [gridPoints[27],gridPoints[22],gridPoints[25],gridPoints[27]];
  let icosahedron14 = [gridPoints[27],gridPoints[25],gridPoints[21],gridPoints[27]];
  let icosahedron15 = [gridPoints[27],gridPoints[21],gridPoints[31],gridPoints[27]];
  let icosahedron16 = [gridPoints[26],gridPoints[20],gridPoints[24],gridPoints[26]];
  let icosahedron17 = [gridPoints[26],gridPoints[24],gridPoints[23],gridPoints[26]];
  let icosahedron18 = [gridPoints[26],gridPoints[23],gridPoints[29],gridPoints[26]];
  let icosahedron19 = [gridPoints[26],gridPoints[29],gridPoints[30],gridPoints[26]];
  let icosahedron20 = [gridPoints[26],gridPoints[30],gridPoints[20],gridPoints[26]];

  return [icosahedron1, icosahedron2, icosahedron3, icosahedron4, icosahedron5, icosahedron6, icosahedron7, icosahedron8, icosahedron9, icosahedron10, icosahedron11, icosahedron12, icosahedron13, icosahedron14, icosahedron15, icosahedron16, icosahedron17, icosahedron18, icosahedron19, icosahedron20]
}

function getTriacontahedrons(gridPoints) {
  let triacontahedron1 = [gridPoints[11],gridPoints[31],gridPoints[8],gridPoints[28],gridPoints[11]];
  let triacontahedron2 = [gridPoints[17],gridPoints[28],gridPoints[7],gridPoints[22],gridPoints[17]];
  let triacontahedron3 = [gridPoints[1],gridPoints[22],gridPoints[13],gridPoints[25],gridPoints[1]];
  let triacontahedron4 = [gridPoints[3],gridPoints[25],gridPoints[16],gridPoints[21],gridPoints[3]];
  let triacontahedron5 = [gridPoints[19],gridPoints[21],gridPoints[4],gridPoints[31],gridPoints[19]];
  let triacontahedron6 = [gridPoints[27],gridPoints[19],gridPoints[31],gridPoints[11],gridPoints[27]];
  let triacontahedron7 = [gridPoints[27],gridPoints[11],gridPoints[28],gridPoints[17],gridPoints[27]];
  let triacontahedron8 = [gridPoints[27],gridPoints[17],gridPoints[22],gridPoints[1],gridPoints[27]];
  let triacontahedron9 = [gridPoints[27],gridPoints[1],gridPoints[25],gridPoints[3],gridPoints[27]];
  let triacontahedron10 = [gridPoints[27],gridPoints[3],gridPoints[21],gridPoints[19],gridPoints[27]];
  let triacontahedron11 = [gridPoints[31],gridPoints[4],gridPoints[23],gridPoints[12],gridPoints[31]];
  let triacontahedron12 = [gridPoints[31],gridPoints[12],gridPoints[24],gridPoints[8],gridPoints[31]];
  let triacontahedron13 = [gridPoints[28],gridPoints[8],gridPoints[24],gridPoints[18],gridPoints[28]];
  let triacontahedron14 = [gridPoints[28],gridPoints[18],gridPoints[20],gridPoints[7],gridPoints[28]];
  let triacontahedron15 = [gridPoints[22],gridPoints[7],gridPoints[20],gridPoints[5],gridPoints[22]];
  let triacontahedron16 = [gridPoints[22],gridPoints[5],gridPoints[30],gridPoints[13],gridPoints[22]];
  let triacontahedron17 = [gridPoints[25],gridPoints[13],gridPoints[30],gridPoints[9],gridPoints[25]];
  let triacontahedron18 = [gridPoints[25],gridPoints[9],gridPoints[29],gridPoints[16],gridPoints[25]];
  let triacontahedron19 = [gridPoints[21],gridPoints[16],gridPoints[29],gridPoints[6],gridPoints[21]];
  let triacontahedron20 = [gridPoints[21],gridPoints[6],gridPoints[23],gridPoints[4],gridPoints[21]];
  let triacontahedron21 = [gridPoints[12],gridPoints[23],gridPoints[0],gridPoints[24],gridPoints[12]];
  let triacontahedron22 = [gridPoints[18],gridPoints[24],gridPoints[2],gridPoints[20],gridPoints[18]];
  let triacontahedron23 = [gridPoints[5],gridPoints[20],gridPoints[15],gridPoints[30],gridPoints[5]];
  let triacontahedron24 = [gridPoints[9],gridPoints[30],gridPoints[10],gridPoints[29],gridPoints[9]];
  let triacontahedron25 = [gridPoints[6],gridPoints[29],gridPoints[14],gridPoints[23],gridPoints[6]];
  let triacontahedron26 = [gridPoints[26],gridPoints[2],gridPoints[24],gridPoints[0],gridPoints[26]];
  let triacontahedron27 = [gridPoints[26],gridPoints[15],gridPoints[20],gridPoints[2],gridPoints[26]];
  let triacontahedron28 = [gridPoints[26],gridPoints[10],gridPoints[30],gridPoints[15],gridPoints[26]];
  let triacontahedron29 = [gridPoints[26],gridPoints[14],gridPoints[29],gridPoints[10],gridPoints[26]];
  let triacontahedron30 = [gridPoints[26],gridPoints[0],gridPoints[23],gridPoints[14],gridPoints[26]];

  return [triacontahedron1, triacontahedron2, triacontahedron3, triacontahedron4, triacontahedron5, triacontahedron6, triacontahedron7, triacontahedron8, triacontahedron9, triacontahedron10, triacontahedron11, triacontahedron12, triacontahedron13, triacontahedron14, triacontahedron15, triacontahedron16, triacontahedron17, triacontahedron18, triacontahedron19, triacontahedron20, triacontahedron21, triacontahedron22, triacontahedron23, triacontahedron24, triacontahedron25, triacontahedron26, triacontahedron27, triacontahedron28, triacontahedron29, triacontahedron30];
}

