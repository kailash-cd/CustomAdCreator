/**
 * Created by kailash on 17/3/17.
 */
'use strict';

angular.module('chalkfd', []).
directive('chalkfd', ['$document','$log','Util','$timeout', function($document,$log,Util,$timeout) {

    var scopeargs = {
        centerLat: '@centerLat',
        centerLng: '@centerLng',
        zoom: "@zoom",
        enabled: '@enabled',
        geoFencingData : '@geoFencingData'
    };
    var controller = ['$scope', function ($scope) {
        $log.debug("this is chalkfd dir controller.");
    }];
    var template = '<style>.bigButton1{background-size: 138px 19px; margin: 10px; border: none; background-color: #5bc0de;' +
        ' color:white; display: inline; cursor: pointer; text-align: center; width: 170px;height: 30px;}</style>' +
        '<center><button class="bigButton1" id="delete-button"><span style="text-align: center">DeleteSelectedShape</span></button>' +
        '<button style="margin-left: 6px" class="bigButton1" id="delete-all-button"><span style="text-align: center">DeleteAllShape</span></button></center>'
        +
        '<style>.rectangle-map {width: 99.5%;height: 450px;position: relative;border-style: solid;border-width: 1px;border-color: grey;}'+
        '@media only screen and (min-width:1024px) and  (max-width: 1280px) {.rectangle-map {width: 99.5%;height: 400px;position: relative;border-style: solid;border-width: 1px;border-color: grey;}'+
        '</style><div class="rectangle-map" id="mapcanvas"></div>'
        +   '<style>#errormessage { z-index: 5; background-color: #fff;color:red; padding: 5px;border: 1px solid #999; text-align: center;}</style><div id="errormessage">Welcome to Free-Drawing</div>'
        +   '<center><button style="margin-left: 6px" class="bigButton1" id="getcood"><span style="text-align: center">Generate Boundries</span>' +
        '</button><br/>{{ geoFencingData }}</center>';

    return {
            restrict: 'EA',
            // require: '?mapId',
            scope:scopeargs ,
            template:template,
            controller: controller,
            compile: function() {
                return {
                    pre: function(scope, el, attrs) {
                        scope.centerLat = 40.781581302919285,
                        scope.centerLng = -74.15977478027344
                        scope.zoom = 10;
                        scope.disabled = 0;
                        scope.geoFencingData = {
                            "geoBoundary" : [],
                            "freeDrawingData": [],
                            "ShapeidServer" :"",
                            "AllShapeLocServer":"",
                            "freeDrawingZoom":""
                        }
                        // scope.enabled = false
                    },
                    post: function(scope, el,attrs) {
                        // this is link
                        $log.debug("@chalkfd ..",scope.mapId);
                        //map initialization FOR FREE DRAWING ---
                        var incorrectPoly = 0;
                        var mapOptions = {
                            center: {lat:scope.centerLat , lng: scope.centerLng},
                            zoom: scope.zoom
                        };
                        var map = new google.maps.Map(document.getElementById("mapcanvas"), mapOptions);
                        // google.maps.event.trigger(scope.mapId, 'resize');
                        //map initialization FREE DRAWING ends ---
                        // elm.css({position: 'absolute'});
                        $log.debug("chalkfd freedrwaing ::",scope.enabled);
                        if(scope.enabled) {
                            $log.info("Drawing is enabled")
                            StartDrawing();
                        } else {
                            $log.info("Drawing is not enabled")
                        }

                        // free drwaing code ---
                        var freeCenterlong;
                        var drawingManager;
                        var DrawTools;
                        var all_overlays = [];
                        var freeCenterlat;
                        var Shapeid = 0;
                        var AllShapeLoc = 0;
                        var selectedShape;
                        var polygonid = 0;
                        var notPolygon;
                        var allShape =[];
                        var trackPolygon = 0;
                        var drawPolygon = [];
                        var PolygonArray = [];
                        var allCirclePoint = [];
                        var selectedPolygonIndex=0;
                        var infowindow11;
                        function setSelection(shape) {
                            clearSelection();
                            selectedShape = shape;
                            selectedShape.set('strokeOpacity', '5');
                            selectedShape.set('strokeWeight', '5');

                        }
                        function getUpdatedCirclePoint(circle) {
                            $log.debug("@getUpdatedCirclePoint ..")
                            var radius = circle.getRadius();
                            var lat = circle.getCenter().lat();
                            var lng = circle.getCenter().lng();
                            var pointA = new google.maps.LatLng(lat, lng);
                            var circumference = getCircleBoundary(pointA, radius);
                            allCirclePoint.push(circumference);
                            var setShapeData = {
                                "id": "",
                                "type": "",
                                positions: [],
                                radius: '',
                                centerPoint: []
                            };
                            setShapeData.id = Shapeid;
                            setShapeData.type = 'circle';
                            setShapeData.radius = radius;
                            setShapeData.positions = circumference;
                            setShapeData.centerPoint = [lat, lng];
                            Shapeid = Shapeid + 1;
                            allShape[AllShapeLoc] = setShapeData;
                            AllShapeLoc = AllShapeLoc + 1;
                            deleteAllShape();
                            deleteSavedPoly()
                            plotSavedPoly();

                            freeCenterlat = setShapeData.centerPoint[0];
                            freeCenterlong = setShapeData.centerPoint[1];
                        }
                        function clearSelection() {
                            if (selectedShape) {
                                selectedShape.set('strokeOpacity', '2');
                                selectedShape.set('strokeWeight', '2');
                                selectedShape.setEditable(false);
                                selectedShape = null;
                            }
                        }
                        function clearSelectionAndAvails() {
                            if (selectedShape) {
                                selectedShape.set('strokeOpacity', '2');
                                selectedShape.set('strokeWeight', '2');
                                selectedShape.setEditable(false);
                                selectedShape = null;
                                //$log.debug("fetching avails 2")
                                // fetchAvails(allShape,"freedrawing")
                            }
                        }
                        function deleteAllShape() {
                            //RemoveFreeMarker();
                            for (var i = 0; i < all_overlays.length; i++) {
                                all_overlays[i].overlay.setMap(null);
                            }
                            all_overlays = [];
                        }


                        function deleteSavedPoly() {
                            $log.debug("in delete poly fun")
                            var savedPolygon = [];
                            for (var i = 0; i < PolygonArray.length; i++) {
                                PolygonArray[i].setMap(null);
                            }
                            PolygonArray = [];
                        }
                        function SetCenter(a, b) {
                            map.setCenter({lat: a, lng: b})
                        }
                        function deleteSavedPoly() {
                            //$log.debug("in deleteSavedPoly");
                            var savedPolygon = [];
                            for (var i = 0; i <  PolygonArray.length; i++) {
                                 PolygonArray[i].setMap(null);
                            }
                             PolygonArray = [];
                        };

                        function deleteNewSavedPoly() {
                            $log.debug("deleting")
                            var savedPolygon = [];
                            if (!Util.isVoid(PolygonArray)) {
                                for (var i = 0; i < PolygonArray.length; i++) {
                                    PolygonArray[i].setMap(null);
                                }
                                scope.$apply(function () {
                                    notPolygon = false;
                                    incorrectPoly = 0;
                                    document.getElementById("errormessage").innerHTML = "Welcome to Free-Drawing";
                                });
                                allShape = [];
                                AllShapeLoc = 0;
                                Shapeid = 0;
                            }
                        }
                        function getCoordinates() {

                           /* scope.geoFencingData ={
                                "geoBoundary" : [],
                                "freeDrawingData": [],
                                "ShapeidServer" :"",
                                "AllShapeLocServer":"",
                                "freeDrawingZoom":""
                            }*/
                            var temp1 = [];
                            var temp = [];
                            scope.$apply(function () {
                                scope.geoFencingData.freeDrawingData = allShape;
                                scope.geoFencingData.ShapeidServer = Shapeid;
                                scope.geoFencingData.AllShapeLocServer = AllShapeLoc;
                                scope.geoFencingData.freeDrawingZoom = map.getZoom();
                                if (!Util.isVoid(scope.geoFencingData.freeDrawingData)) {
                                    for (var t = 0; t < scope.geoFencingData.freeDrawingData.length; t++) {
                                        $log.debug(scope.geoFencingData.freeDrawingData[t].type)
                                        if (scope.geoFencingData.freeDrawingData[t].type === "ractangle") {
                                            temp1 = [];
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].east);
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].north);
                                            temp.push(temp1);
                                            temp1 = [];
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].west);
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].north);
                                            temp.push(temp1);
                                            temp1 = [];
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].west);
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].south);
                                            temp.push(temp1);
                                            temp1 = [];
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].east);
                                            temp1.push(scope.geoFencingData.freeDrawingData[t].south);
                                            temp.push(temp1);
                                            temp1 = [];
                                        }
                                        else {
                                            for (var u = 0; u < scope.geoFencingData.freeDrawingData[t].positions.length; u++) {
                                                //$log.debug("positions are",scope.geoFencingData.freeDrawingData[t].positions[u]);
                                                var pos = [];
                                                for (var c = scope.geoFencingData.freeDrawingData[t].positions[u].length - 1; c >= 0; c--) {
                                                    pos.push(scope.geoFencingData.freeDrawingData[t].positions[u][c]);
                                                }
                                                temp.push(pos);
                                            }
                                        }
                                        scope.geoFencingData.geoBoundary[t] = {outerPolygon: temp, innerPolygons: null};
                                        temp = [];
                                    }
                                }
                            })
                            $log.debug("Exporting geoFencingData ....",scope.geoFencingData);
                        }
                        document.getElementById("getcood").addEventListener("click",getCoordinates);

                        function addListenersOnPolygon(polygon, i, shapeType) {
                            var activeInfoWindow;
                            var promiseTimeout;
                            if (shapeType === 'polygon') {
                                google.maps.event.addListener(polygon.getPath(), 'insert_at', function () {
                                    $log.debug("i am insert at");
                                    var array = polygon.getPath().getArray();
                                    var tempGeoBoundary = [];
                                    array.forEach(function (item, index) {
                                        tempGeoBoundary.push([item.lat(), item.lng()])
                                    });
                                    //$log.debug("event insert at fired points of shape are ", tempGeoBoundary)
                                    allShape[i].centerPoint = tempGeoBoundary;
                                    selectedPolygonIndex = -1;
                                    polygon.setEditable(false);
                                });
                                google.maps.event.addListener(polygon.getPath(), 'set_at', function () {
                                    var array = polygon.getPath().getArray();
                                    var tempGeoBoundary = [];
                                    array.forEach(function (item, index) {
                                        tempGeoBoundary.push([item.lat(), item.lng()])
                                    });
                                    allShape[i].centerPoint = tempGeoBoundary;
                                    allShape[i].positions = tempGeoBoundary;
                                    selectedPolygonIndex = -1;
                                    polygon.setEditable(false);
                                });
                                google.maps.event.addListener(polygon, 'click', function (event) {
                                    if (!Util.isVoid(infowindow11)) {
                                        infowindow11.close();
                                    }
                                });
                            } else if (shapeType === 'ractangle') {
                                // $log.debug("i ractangle");
                                google.maps.event.addListener(polygon, 'bounds_changed', function () {
                                    // $log.debug("i am bounds_changed at");
                                    var bounds = polygon.getBounds();
                                    var ne = polygon.getBounds().getNorthEast();
                                    var sw = polygon.getBounds().getSouthWest();
                                    var north = ne.lat();
                                    var east = ne.lng();
                                    var south = sw.lat();
                                    var west = sw.lng();
                                    allShape[i].north = north;
                                    allShape[i].south = south;
                                    allShape[i].east = east;
                                    allShape[i].west = west;
                                });
                                google.maps.event.addListener(polygon, 'click', function (event) {
                                    if (!Util.isVoid(infowindow11)) {
                                        infowindow11.close();
                                    }
                                });
                            }
                            else {
                                google.maps.event.addListener(polygon, 'radius_changed', function () {
                                    var radius = polygon.getRadius();
                                    // $log.debug("Changed redious is :",radius);
                                    var pointA = new google.maps.LatLng(polygon.getCenter().lat(), polygon.getCenter().lng());
                                    var circumference = getCircleBoundary(pointA, polygon.getRadius());
                                    allShape[i].radius = polygon.getRadius();
                                    allShape[i].positions = circumference;
                                    //$log.debug("shapes data is ",allShape)
                                });
                                google.maps.event.addListener(polygon, 'dragend', function () {
                                    if (!Util.isVoid(infowindow11)) {
                                        infowindow11.close();
                                    }
                                    var radius = polygon.getRadius();
                                    var pointA = new google.maps.LatLng(polygon.getCenter().lat(), polygon.getCenter().lng());
                                    var circumference = getCircleBoundary(pointA, polygon.getRadius());
                                    var polyshape = allShape[i];
                                    allShape[i].centerPoint = [polygon.getCenter().lat(), polygon.getCenter().lng()];
                                    allShape[i].positions = circumference;
                                });
                                infowindow11 = new google.maps.InfoWindow();
                                google.maps.event.addListener(polygon, 'click', function (event) {
                                    var radius = polygon.getRadius();
                                    var polyshape = allShape[i];
                                    radius = radius / 1000;
                                    radius = radius.toFixed(2);
                                    var centerInfolat = polygon.getCenter().lat();
                                    var centerInfolng = polygon.getCenter().lng();
                                    centerInfolat = centerInfolat.toFixed(6)
                                    centerInfolng = centerInfolng.toFixed(6)
                                    var contentString = '<div class="scrollFix"> Center: </b>(' + centerInfolat + ',' + centerInfolng + ')</div>' +
                                        '<div class="scrollFix">' + '<b> Radius: </b>' + radius + ' Km</div>';
                                    infowindow11.setContent(contentString)
                                    infowindow11.setPosition(new google.maps.LatLng(polygon.getCenter().lat(), polygon.getCenter().lng()));
                                    infowindow11.open(map, this);
                                });
                            }

                            //Common settings at end
                            google.maps.event.addListener(polygon, 'click', function (event) {
                                var polyshape = allShape[i];
                                setSelection(polygon);
                                trackPolygon = i;
                            });

                        };
                        function plotSavedPoly() {
                            $log.debug("@plotSavedPoly .. ", "allShpes :: ",allShape)
                            var savedPolygon = [];
                            PolygonArray = [];
                            drawPolygon = [];
                            if (allShape.length > 0)
                            {
                                for (var i = 0; i < allShape.length; i++) {
                                    var polygon_plan_0 = [];
                                    var tempArray = allShape[i].centerPoint;
                                    if (allShape[i].type === 'polygon') {
                                        for (var j = 0; j < tempArray.length; j++) {
                                            polygon_plan_0.push(new google.maps.LatLng(tempArray[j][0], tempArray[j][1]))
                                        }
                                        drawPolygon.push(new google.maps.Polygon({
                                            path: polygon_plan_0,
                                            draggable: true,
                                            strokeColor: "#FF3366",
                                            strokeOpacity: 2,
                                            strokeWeight: 2,
                                            fillColor: "#329E1C",
                                            fillOpacity: 0.5,
                                            editable: false
                                        }));
                                        drawPolygon[drawPolygon.length - 1].setMap(map);
                                    }
                                    else if (allShape[i].type === 'circle') {
                                        var center = {"lat": allShape[i].centerPoint[0], "lng": allShape[i].centerPoint[1]};
                                         drawPolygon.push(new google.maps.Circle({
                                            strokeColor: "#FF3366",
                                            strokeOpacity: 2,
                                            strokeWeight: 2,
                                            fillColor: "#329E1C",
                                            fillOpacity: 0.5,
                                            draggable: true, // turn off if it gets annoying
                                            editable: false,
                                            map: map,
                                            center: center,
                                            clickable: true,
                                            zIndex: 1,
                                            radius: allShape[i].radius
                                        }));
                                        var radius = allShape[i].radius / 1000;
                                        radius = radius.toFixed(2);
                                    } else if (allShape[i].type === 'ractangle') {
                                        var bounds = {
                                            north: allShape[i].north,
                                            south: allShape[i].south,
                                            east: allShape[i].east,
                                            west: allShape[i].west
                                        };
                                         drawPolygon.push(new google.maps.Rectangle({
                                            bounds: bounds,
                                            draggable: true,
                                            strokeColor: "#FF3366",
                                            strokeOpacity: 2,
                                            strokeWeight: 2,
                                            fillColor: "#329E1C",
                                            fillOpacity: 0.5,
                                            editable: false,
                                        }));

                                         drawPolygon[ drawPolygon.length - 1].setMap(map);

                                    }
                                     PolygonArray.push(drawPolygon[drawPolygon.length - 1]);
                                     addListenersOnPolygon(drawPolygon[drawPolygon.length - 1], i, allShape[i].type);
                                }
                            }
                        };
                        function deleteSelectedShape() {
                            if(!Util.isVoid(trackPolygon)){
                                var polyshape = allShape[trackPolygon];
                                //$log.debug("--- with lwngth poly shape is ", polyshape.id);
                                if (polyshape.type === "polygon" && polyshape.positions.length <= 2) {
                                    //$log.debug("deleting for incorrect poly")
                                    incorrectPoly = incorrectPoly - 1;
                                    if (incorrectPoly === 0) {
                                        scope.$apply(function () {
                                            notPolygon = false;
                                            document.getElementById("errormessage").innerHTML = "Welcome to Free-Drawing";
                                        });
                                    }
                                    PolygonArray[trackPolygon].setMap(null);
                                    allShape.splice(trackPolygon, 1);
                                    AllShapeLoc = AllShapeLoc - 1;
                                    deleteSavedPoly();
                                    plotSavedPoly();

                                }
                                else {
                                    PolygonArray[trackPolygon].setMap(null);
                                    allShape.splice(trackPolygon, 1);
                                    AllShapeLoc = AllShapeLoc - 1;
                                    deleteSavedPoly();
                                    plotSavedPoly();
                                }
                            }
                        }
                        function getCircleBoundary (latLng,r){
                            Number.prototype.toRad = function() {
                                return this * Math.PI / 180;
                            }

                            Number.prototype.toDeg = function() {
                                return this * 180 / Math.PI;
                            }

                            google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {// get all point of circumference based on radius
                                dist = dist / 6371;// distance from center of circle in meters
                                brng = brng.toRad();

                                var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

                                var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
                                    Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

                                var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                        Math.cos(lat1),
                                        Math.cos(dist) - Math.sin(lat1) *
                                        Math.sin(lat2));

                                if (isNaN(lat2) || isNaN(lon2)) return null;

                                return [lat2.toDeg(), lon2.toDeg()];
                            }
                            var pointA = latLng;
                            var radiusInKm = r/1000;
                            var circumference = [];
                            for(var i=0;i<=360; i = i+5) {
                                var pointB = pointA.destinationPoint(i, radiusInKm);
                                circumference.push(pointB);
                            }
                            return circumference;
                        }
                        function StartDrawing() {
                            $log.debug("in start drawing ", polygonid);
                            if (!Util.isVoid(freeCenterlat) && !Util.isVoid(freeCenterlong)) {
                                freeCenterlat = parseFloat(freeCenterlat);
                                freeCenterlong = parseFloat(freeCenterlong);
                                SetCenter(freeCenterlat, freeCenterlong);
                            }
                            drawingManager = new google.maps.drawing.DrawingManager({
                                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                                    drawingControlOptions: {
                                        position: google.maps.ControlPosition.TOP_CENTER,
                                        drawingModes: [
                                            google.maps.drawing.OverlayType.CIRCLE,
                                            google.maps.drawing.OverlayType.POLYGON,
                                            google.maps.drawing.OverlayType.RECTANGLE
                                        ]
                                    },
                                    rectangleOptions: {
                                        strokeColor: "#FF3366",
                                        strokeOpacity: 2,
                                        strokeWeight: 2,
                                        fillColor: "#329E1C",
                                        fillOpacity: 0.5,
                                        clickable: true,
                                        draggable: true,
                                        optimized: false,
                                        editable: false,
                                        zIndex: 1
                                    },
                                    circleOptions: {
                                        strokeColor: "#FF3366",
                                        strokeOpacity: 2,
                                        strokeWeight: 2,
                                        fillColor: "#329E1C",
                                        fillOpacity: 0.5,
                                        draggable: true,
                                        optimized: false,
                                        clickable: true,
                                        editable: true,
                                        zIndex: 1
                                    },
                                    polygonOptions: {
                                        strokeColor: "#FF3366",
                                        strokeOpacity: 2,
                                        strokeWeight: 2,
                                        fillColor: "#329E1C",
                                        fillOpacity: 0.5,
                                        clickable: true,
                                        draggable: true,
                                        optimized: false,
                                        editable: false,
                                        zIndex: 1,
                                        id: polygonid
                                    }
                                }
                            );
                            drawingManager.setMap(map);
                            DrawTools = true;
                            google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
                                all_overlays.push(e);
                                if (e.type != google.maps.drawing.OverlayType.MARKER) {
                                    drawingManager.setDrawingMode(null);
                                    var newShape = e.overlay;
                                    newShape.type = e.type;
                                    google.maps.event.addListener(newShape, 'click', function () {

                                        setSelection(newShape);
                                    });
                                    setSelection(newShape);
                                }
                            });



                            google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
                            google.maps.event.addListener(map, 'click', clearSelectionAndAvails);
                            google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
                            google.maps.event.addDomListener(document.getElementById('delete-all-button'), 'click', deleteNewSavedPoly);

                            google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
                                var setShapeData = {
                                    "id": "",
                                    "type": "",
                                    positions: [],
                                    radius: '',
                                    centerPoint: [],
                                    north: '',
                                    east: '',
                                    south: '',
                                    west: ''
                                };
                                var bounds = rectangle.getBounds();
                                var ne = rectangle.getBounds().getNorthEast();
                                var sw = rectangle.getBounds().getSouthWest();
                                var north = ne.lat()
                                var east = ne.lng()
                                var south = sw.lat()
                                var west = sw.lng()
                                setShapeData.id = Shapeid;
                                setShapeData.type = 'ractangle';
                                setShapeData.north = north;
                                setShapeData.south = south;
                                setShapeData.east = east;
                                setShapeData.west = west;

                                Shapeid = Shapeid + 1;
                                allShape[AllShapeLoc] = setShapeData;
                                AllShapeLoc = AllShapeLoc + 1;
                                deleteAllShape();
                                deleteSavedPoly();
                                plotSavedPoly();
                                freeCenterlat = north;
                                freeCenterlong = east;
                            });
                            google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
                                polygonid = polygonid + 1;
                                var setShapeData = {
                                    "id": "",
                                    "type": "",
                                    positions: [],
                                    radius: '',
                                    centerPoint: []
                                };
                                var array = polygon.getPath().getArray();
                                var tempGeoBoundary = [];
                                array.forEach(function (item, index) {
                                    tempGeoBoundary.push([item.lat(), item.lng()])
                                });
                                if (tempGeoBoundary.length <= 2) {
                                    $timeout(function () {
                                        notPolygon = true
                                        incorrectPoly = incorrectPoly + 1;
                                        document.getElementById("errormessage").innerHTML = "Please remove incorrect polygon shape";
                                    }, 100);
                                }
                                setShapeData.id = Shapeid;
                                setShapeData.type = 'polygon';
                                setShapeData.radius = 0;
                                setShapeData.positions = tempGeoBoundary;
                                setShapeData.centerPoint = tempGeoBoundary;
                                Shapeid = Shapeid + 1;
                                allShape[AllShapeLoc] = setShapeData;
                                AllShapeLoc = AllShapeLoc + 1;
                                deleteAllShape();
                                deleteSavedPoly()
                                plotSavedPoly();
                                freeCenterlat = setShapeData.centerPoint[0][0];
                                freeCenterlong = setShapeData.centerPoint[0][1];
                            });
                            google.maps.event.addListener(drawingManager, 'circlecomplete', function (polygon) {
                                getUpdatedCirclePoint(polygon);
                                google.maps.event.addListener(polygon, 'radius_changed', function () {
                                    getUpdatedCirclePoint(polygon);
                                });
                                google.maps.event.addListener(polygon, 'center_changed', function () {
                                    getUpdatedCirclePoint(polygon);
                                });
                            });
                        };
                    }
                };
            }
    };
}]);
