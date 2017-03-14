define([
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/geometry/ScreenPoint",
    "dojo/_base/declare", "dojo/_base/lang"],
function (
    SPATIALREFERENCE, EXTENT, POINT, SCREENPOINT,
    DECLARE, LANG
) {
    return DECLARE(null, {
        constructor: function (map, mapload) {
            this._map = map;
            this._mapload = mapload;

            //缩放到矩形
            this._map.ZoomToExtent = LANG.hitch(this, function (xmin, ymin, xmax, ymax, zoomfactor) {
                this._ZoomToExtent(xmin, ymin, xmax, ymax, zoomfactor);
            });

            //缩放到级别
            this._map.ZoomToLevel = LANG.hitch(this, function (level, lon, lat) {
                this._ZoomToLevel(level, lon, lat);
            });

            //添加临时用户数据
            this._map.AddGraphic = LANG.hitch(this, function (gra) {
                this._AddGraphic(gra);
            });
            //移除临时用户数据
            this._map.RemoveGraphic = LANG.hitch(this, function (gra) {
                this._RemoveGraphic(gra);
            });
            //清空临时用户数据
            this._map.ClearGraphic = LANG.hitch(this, function () {
                this._ClearGraphic();
            });

            //添加POI用户数据
            this._map.AddPOIGraphic = LANG.hitch(this, function (gra) {
                this._AddPOIGraphic(gra);
            });

            this._map.MapToScreen = LANG.hitch(this, function (x, y) {
                var point = new Point(x, y, new SPATIALREFERENCE({ wkid: 4326 }));
                var mapPoint = this._map.common.ProjectToMercator(point);
                return this._map.MainMap.toScreen(mapPoint);
            });

            this._map.ScreenToMap = LANG.hitch(this, function (x, y) {
                var screenPoint = new SCREENPOINT(x, y);
                var point = this._map.MainMap.toMap(screenPoint);
                return this._map.common.ProjectToWGS84(point);
            });
        },

        //缩放到矩形
        _ZoomToExtent: function (xmin, ymin, xmax, ymax, zoomfactor) {
            var fromPt = this._map.common.ProjectToMercator(new POINT(xmin, ymin, new SPATIALREFERENCE({ wkid: 4326 })));
            var toPt = this._map.common.ProjectToMercator(new POINT(xmax, ymax, new SPATIALREFERENCE({ wkid: 4326 })));
            var extent = new EXTENT(fromPt.x, fromPt.y, toPt.x, toPt.y, fromPt.spatialReference);
            if (zoomfactor != undefined) extent = extent.expand(zoomfactor);
            this._map.MainMap.setExtent(extent);
        },

        //缩放到级别
        _ZoomToLevel: function (level, lon, lat) {
            var point = this._map.common.ProjectToMercator(new POINT(lon, lat, new SPATIALREFERENCE({ wkid: 4326 })));
            this._map.MainMap.centerAndZoom(point, level - this._map.MinLevel);
        },

        //添加临时用户数据
        _AddGraphic: function (gra) {
            if (gra && gra.geometry && gra.geometry.type) {
                if (gra.geometry.type == "point") {
                    this._mapload.Temp_PointLayer.add(gra);
                    return true;
                }
                else if (gra.geometry.type == "polyline") {
                    this._mapload.Temp_LineLayer.add(gra);
                    return true;
                }
                else if (gra.geometry.type == "polygon") {
                    this._mapload.Temp_AreaLayer.add(gra);
                    return true;
                }
            }
            return false;
        },

        //添加POI用户数据
        _AddPOIGraphic: function (gra) {
            if (gra && gra.geometry && gra.geometry.type) {
                if (gra.geometry.type == "point") {
                    this._mapload.POI_PointLayer.add(gra);
                    return true;
                }
            }
            return false;
        },

        //移除临时用户数据
        _RemoveGraphic: function (gra) {
            if (gra && gra.geometry && gra.geometry.type) {
                if (gra.geometry.type == "point") {
                    this._mapload.Temp_PointLayer.remove(gra);
                    return true;
                }
                else if (gra.geometry.type == "polyline") {
                    this._mapload.Temp_LineLayer.remove(gra);
                    return true;
                }
                else if (gra.geometry.type == "polygon") {
                    this._mapload.Temp_AreaLayer.remove(gra);
                    return true;
                }
            }
            return false;
        },

        //清空临时用户数据
        _ClearGraphic: function () {
            this._mapload.Temp_PointLayer.clear();
            this._mapload.Temp_LineLayer.clear();
            this._mapload.Temp_AreaLayer.clear();
            this._mapload.POI_PointLayer.clear();
        }
    });
});