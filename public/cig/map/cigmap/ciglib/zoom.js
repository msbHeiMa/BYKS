define([
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/geometry/geometryEngine",
    "dojo/_base/declare"
], function (
    Query,
    QueryTask,
    geometryEngine,
    declare
) {
    var _self = null, _app, _config, _map, _mainMap, _layer;
    return declare(null, {
        constructor: function (app, config) {
            _self = this;
            _self._app = app;
            _self._config = config;
            _self._map = app.map;
            _self._mainMap = app.map.MainMap;
        },

        zoomToFeature: function (zoomCount, eventid, layername, layerinfos, mapServerLayers) {
            for (var i = 0; i < layerinfos.length; i++) {
                if (layerinfos[i].name == layername) {
                    var url = layerinfos[i].MapServer.replace("/MapServer", "/MapServer/" + layerinfos[i].id);
                    _self._layer = mapServerLayers[i];
                    _self._layerinfo = layerinfos[i];
                    var outfield = [];
                    for (var j = 0; j < mapServerLayers[i].fields.length; j++) {
                        outfield.push(mapServerLayers[i].fields[j].name);
                    }

                    var query = new Query();
                    query.where = "EVENTID='" + eventid + "'";
                    query.outSpatialReference = _self._mainMap.spatialReference;
                    query.returnGeometry = true;
                    query.outFields = outfield;

                    var queryTask = new QueryTask(url);
                    queryTask.execute(query, locate, function (err) {
                        alert("定位 " + layername + " 失败：" + err.message);
                    });
                    break;
                }
            }

            function locate(featureset) {
                if (featureset.features.length < 1)
                    return;

                var geometry = featureset.features[0].geometry;//获取图形
                _self._app.showInfoWindow.showInfoWindow4Table(featureset.features, [_self._layer]);

                var lonlat = _self._map._CommonJS.ProjectToWGS84(geometry);//将坐标转换为经纬度坐标
                _self._map.Flash(lonlat);//闪烁

                var level = getLocateLevel(_self._layer);
                var point = getPoint(geometry);
                _self._mainMap.centerAndZoom(point, level);
            }

            function getLocateLevel(layer) {
                if (!layer._minScale) {
                    if (layer.minScale <= 0)
                        layer._minScale = _self._config.minLevel;
                    else
                        layer._minScale = getScaleLevel(layer.minScale);

                    if (layer._minScale < _self._config.minLevel)
                        layer._minScale = _self._config.minLevel;
                }

                if (!layer._maxScale) {
                    if (layer.maxScale <= 0)
                        layer._maxScale = _self._config.maxLevel;
                    else
                        layer._maxScale = getScaleLevel(layer.maxScale) - 1;

                    if (layer._maxScale > _self._config.maxLevel)
                        layer._maxScale = _self._config.maxLevel;
                }

                var level = _self._map.GetLevel();//获取当前map-level等级
                if (level > layer._maxScale) {
                    return layer._maxScale - _self._config.minLevel;
                }
                else if (level < layer._minScale) {
                    return layer._minScale - _self._config.minLevel;
                }
                else {
                    return level - _self._config.minLevel;
                }
            }

            function getScaleLevel(scale) {
                for (var i = 0, c = _self._map._CommonJS.Scale.length; i < c; i++) {
                    if (scale >= _self._map._CommonJS.Scale[i]) {
                        return i;
                    }
                }

                return _self._map._CommonJS.Scale.length - 1;
            }

            function getPoint(geometry) {
                switch (geometry.type) {
                    case "point":
                        return geometry;
                    case "extent":
                        return geometry.getCenter();
                    default:
                        return geometry.getExtent().getCenter();
                }
            }
        }
    });
});