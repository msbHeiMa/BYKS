define([
    "esri/SpatialReference",
    "esri/geometry/webMercatorUtils",
    "esri/graphic",
    "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon",
    "esri/geometry/geometryEngine",
    "dojo/io/script", "dojo/_base/lang", "dojo/_base/declare"],
function (
    SPATIALREFERENCE,
    WEBMERCATORUTILS,
    GRAPHIC,
    POINT, POLYLINE, POLYGON,
    GEOMETRYENGINE,
    SCRIPT, LANG, DECLARE
) {
    return DECLARE(null, {
        tileIndex: 0,

        constructor: function (map) {
            this.map = map;
        },

        GetTileLayerID: function () {
            this.tileIndex++;
            return "TileLayer-" + this.tileIndex;
        },

        XYToPoint: function (x, y) {
            var point = new POINT(x, y, new SPATIALREFERENCE({ wkid: 4326 }));
            return point;
        },

        ProjectToWGS84: function (geometry) {
            geometry.spatialReference = new SPATIALREFERENCE({ wkid: 102100 });
            return WEBMERCATORUTILS.webMercatorToGeographic(geometry)
        },

        ProjectToMercator: function (geometry) {
            geometry.spatialReference = new SPATIALREFERENCE({ wkid: 4326 });
            return WEBMERCATORUTILS.geographicToWebMercator(geometry)
        },

        QueryDataByCrossDomain: function (url, data, sucessCallback, errorCallback) {
            SCRIPT.get({
                url: url,
                jsonp: "callback", //由flickr指定
                content: data,
                load: function (response) {
                    sucessCallback(response);
                },
                error: function (response) {
                    errorCallback(response);
                }
            });
        },

        CloneGraphic: function (fromGra, project) {
            if (project == undefined) project = false;
            var gra = new GRAPHIC();
            var json = fromGra.geometry.toJson();

            if (fromGra.geometry.type == "point") {
                gra.geometry = project ? this.ProjectToWGS84(new POINT(json)) : new POINT(json);
            } else if (fromGra.geometry.type == "polyline") {
                gra.geometry = project ? this.ProjectToWGS84(new POLYLINE(json)) : new POLYLINE(json);
            }
            else if (fromGra.geometry.type == "polygon") {
                gra.geometry = project ? this.ProjectToWGS84(new POLYGON(json)) : new POLYGON(json);
            }

            gra.attributes = [];
            for (var attr in fromGra.attributes) {
                gra.attributes[attr] = fromGra.attributes[attr]
            }

            gra.symbol = fromGra.symbol;
            return gra;
        },

        GetPointOnClickObject: function (fromGra, inputPoint) {
            if (fromGra.geometry.type == "point") {
                return fromGra.geometry;
            }
            else if (fromGra.geometry.type == "polyline") {
                return GEOMETRYENGINE.nearestVertex(fromGra.geometry, inputPoint).coordinate;
            }
            return inputPoint
        },

        GetPoint: function (geometry) {
            switch (geometry.type) {
                case "point":
                    return geometry;
                case "extent":
                    return geometry.getCenter();
                default:
                    return geometry.getExtent().getCenter();
            }
        },

        Contains: function (arr, obj) {
            var index = arr.length;
            while (index--) {
                if (arr[index] === obj) {
                    return true;
                }
            }
            return false;
        }
    });
});