define([
    "cigmap/mapcontrol",
    "cigmap/ciglib/layerlist",
    "esri/dijit/Scalebar",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    "dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dojo/dom", "dojo/parser", "dojo/domReady!"
], function (
    MAPCONTROL, LAYERLIST,
    SCALEBAR,
    EXTENT,
    SPATIALREFERENCE,
    CONNECT, DECLARE, LANG, ON, DOM, PARSER
) {
    return DECLARE(null, {
        constructor: function (app, config) {
            this.app = app;
            this.config = config;
        },

        // 初始化
        init: function () {
            //初始化地图操作对象
            this.app.map = new MAPCONTROL(this.config);

            ON(this.app.map, "TileLayerAdded", LANG.hitch(this, function () {
                this.loadAGSLayer();
            }));
            ON(this.app.map, "AGSLayerInited", LANG.hitch(this, function (agsLayer) {
                this.app.map.agsLayer = agsLayer;
                this.setLayerList(agsLayer);
            }));
            ON(this.app.map, "GraphicMouseDown", LANG.hitch(this, function (args) {
                this.app.map.ShowInfoWindow4Vector(args);
            }));
            ON(this.app.map, "MapLevelChanged", LANG.hitch(this, function (level) {
                this.levelChange(level);
            }));
            ON(this.app.map, "POIGraphicClick", LANG.hitch(this, function (evt) {
                if(this.config.onPOIClick){
                    this.config.onPOIClick(this.app.map,evt.graphic);
                }
                else{
                    var graphic = evt.graphic;
                    var geometry = graphic.geometry;
                    var value = graphic.attributes.name;
                    this.app.map.MainMap.infoWindow.setTitle(value);
                    this.app.map.MainMap.infoWindow.setContent("<b>名称：" + value + "</b>");
                    this.app.map.MainMap.infoWindow.show(this.app.map.common.GetPoint(geometry));
                }
            }));
            ON(this.app.map, "POIGraphicMouseEnter", LANG.hitch(this, function (evt) {
                var graphic = evt.graphic
                var symbol = graphic.symbol;
                symbol.url = graphic.attributes.image2;
                graphic.setSymbol(symbol);
            }));
            ON(this.app.map, "POIGraphicMouseLeave", LANG.hitch(this, function (evt) {
                var graphic = evt.graphic
                var symbol = graphic.symbol;
                symbol.url = graphic.attributes.image1;
                graphic.setSymbol(symbol);
            }));

            this.loadTileLayer();
            this.loadScalebar();
            this.showCoordinates();
            this.setDefaultExtent();
            this.setMapLevel();
        },

        // 加载底图
        loadTileLayer: function () {
            try {
                this.app.map.LoadTiles();
            } catch (e) {
                this.app.showError(e);
            }
        },

        // 加载矢量图
        loadAGSLayer: function () {
            try {
                this.app.map.AddMap();
            } catch (e) {
                this.app.showError(e);
            }
        },

        // 比例尺
        loadScalebar: function () {
            try {
                var scalebar = new SCALEBAR({
                    map: this.app.map.MainMap,
                    scalebarUnit: "metric",
                    attachTo: "bottom-left"
                });
            } catch (e) {
                this.app.showError(e);
            }
        },

        // 显示坐标
        showCoordinates: function () {
            try {
                var coordinatesDiv = DOM.byId("CoordinatesLabel");
                coordinatesDiv.innerHTML = "";
                CONNECT.connect(this.app.map.MainMap, "onMouseMove", showCoords);
                CONNECT.connect(this.app.map.MainMap, "onMouseDrag", showCoords);
                function showCoords(evt) {
                    evt = evt ? evt : (window.event ? window.event : null);
                    var mp = evt.mapPoint;
                    coordinatesDiv.innerHTML = "<span id='cd_label' style='font-size:13px;text-align:center;font-family:微软雅黑;'>" + "横坐标：" + mp.x.toFixed(3) + "&nbsp;纵坐标：" + mp.y.toFixed(3) + "</span>";
                }
            } catch (e) {
                this.app.showError(e);
            }
        },

        // 设置默认级别
        setDefaultExtent: function () {
            try {
                var initExtent = new EXTENT({
                    xmin: this.config.extent.xmin,
                    ymin: this.config.extent.ymin,
                    xmax: this.config.extent.xmax,
                    ymax: this.config.extent.ymax,
                    spatialReference: this.config.spatialReference
                });
                this.app.map.MainMap.setExtent(initExtent);
            } catch (e) {
                this.app.showError(e);
            }
        },

        // 地图级别变更事件
        levelChange: function (level) {
            $("#map_level").html(level).attr("title", "级别：" + level).parent().attr("title", "级别：" + level);
        },

        // 地图级别
        setMapLevel: function () {
            var html = '<div class="map_level" title="级别：4" role="button" onclick="UI.fullExtent();"><span id="map_level">4</span></div>';
            $("#main_map_zoom_slider div").first().after(html);
        },

        // 图层控制
        setLayerList: function (agsLayer) {
            try {
                //agsLayer.url = agsLayer.MapInfo.MapUrl;
                var layerList = new LAYERLIST({
                    map: this.app.map.MainMap,
                    layer: agsLayer,
                    name: "综治专题图"
                }, "layerList");

                layerList.startup();
            } catch (e) {
                this.app.showError(e);
            }
        },
    });
});
