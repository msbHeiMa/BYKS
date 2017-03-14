define([
    "cigmap/ciglib/tdtlayer", "cigmap/ciglib/tdtannolayer",
    "esri/layers/FeatureLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/WebTiledLayer", "esri/layers/GraphicsLayer",
    "esri/graphic", "esri/Color",
    "dojo/Evented", "dojo/_base/declare", "dojo/_base/lang", "dojo/on"],
function (
    TDTLAYER, TDTANNOLAYER,
    FEATURELAYER, ARCGISDYNAMICMAPSERVICELAYER, WEBTILEDLAYER, GRAPHICSLAYER,
    GRAPHIC, COLOR,
    EVENTED, DECLARE, LANG, ON
) {
    return DECLARE([EVENTED], {
        tileLayers: [],
        sysLayers: [],

        constructor: function (map) {
            this.map = map;

            //加载瓦片底图
            this.map.LoadTiles = LANG.hitch(this, function () {
                this.loadTileLayer();
                this.map.emit("TileLayerAdded");
            });

            //加载AGS图层以及矢量数据图层
            this.map.AddMap = LANG.hitch(this, function () {
                var object = new Object;
                object.f = "json";
                this.map.common.QueryDataByCrossDomain(this.map.config.mapServer + "/layers", object,
                    LANG.hitch(this, function (response) {
                        if (response.error != undefined) {
                            //查询出错，处理方法，暂时不写
                        }
                        else {
                            this.loadAGSLayer(response);
                            this.loadSYSLayer();

                            this.map.config && this.map.config.onLoad && this.map.config.onLoad();
                        }
                    }),
                    LANG.hitch(this, function (response) {
                        //查询出错，处理方法，暂时不写
                    })
               )
            });
        },

        // 加载底图
        loadTileLayer: function () {
            if (this.tileLayers != undefined && this.tileLayers.length > 0) {
                //如果已经加载过，需要做一些处理
                for (var i = 0; i < this.tileLayers.length; i++) {
                    this.map.MainMap.removeLayer(this.tileLayers[i])
                }
                this.tileLayers.clear();
            }
            //底图
            var basemap = new TDTLAYER();
            this.map.MainMap.addLayer(basemap, 0);
            this.tileLayers.push(basemap);
            //注记
            var annolayer = new TDTANNOLAYER();
            this.map.MainMap.addLayer(annolayer, 1);
            this.tileLayers.push(annolayer);
        },

        // 加载矢量图
        loadAGSLayer: function (response) {
            var agsLayer = new ARCGISDYNAMICMAPSERVICELAYER(this.map.config.mapServer);
            agsLayer.setImageFormat("png32", !false);
            agsLayer.FeatureLayers = [];
            agsLayer.MapServerLayers = response.layers;
            agsLayer.on("load", LANG.hitch(this, function () {
                var layers = agsLayer.layerInfos;
                for (var i = 0; i < layers.length; i++) {
                    layers[i].MapServer = agsLayer.url;
                    layers[i].FeatureServer = layers[i].MapServer.replace("/MapServer", "/FeatureServer/" + layers[i].id);
                }
                //出发AGS加载完成事件
                this.map.emit("AGSLayerInited", agsLayer);
            }));
            //添加功能
            this.setAgsLayerFunctions(agsLayer);
            this.map.MainMap.addLayer(agsLayer);
            this.loadFeatureLayers(agsLayer);
        },

        // 注册事件
        loadSYSLayer: function () {
            if (this.sysLayers.length == 0) {
                //临时数据点线面图层-面图层
                this.Temp_AreaLayer = new GRAPHICSLAYER();
                this.map.MainMap.addLayer(this.Temp_AreaLayer);
                this.addGraphicsLayerEvents(this.Temp_AreaLayer, "TempGraphic");
                this.sysLayers.push(this.Temp_AreaLayer);
                //临时数据点线面图层-线图层
                this.Temp_LineLayer = new GRAPHICSLAYER();
                this.map.MainMap.addLayer(this.Temp_LineLayer);
                this.addGraphicsLayerEvents(this.Temp_LineLayer, "TempGraphic");
                this.sysLayers.push(this.Temp_LineLayer);
                //临时数据点线面图层-点图层
                this.Temp_PointLayer = new GRAPHICSLAYER();
                this.map.MainMap.addLayer(this.Temp_PointLayer);
                this.addGraphicsLayerEvents(this.Temp_PointLayer, "TempGraphic");
                this.sysLayers.push(this.Temp_PointLayer);
                //POI数据点线面图层-点图层
                this.POI_PointLayer = new GRAPHICSLAYER();
                this.map.MainMap.addLayer(this.POI_PointLayer);
                this.addGraphicsLayerEvents(this.POI_PointLayer, "POIGraphic");
                this.sysLayers.push(this.POI_PointLayer);
                //闪烁图层
                this.Flashlayer = new GRAPHICSLAYER();
                this.map.MainMap.addLayer(this.Flashlayer);
                this.sysLayers.push(this.Flashlayer);
                this.map.Flashlayer = this.Flashlayer;
            }
        },

        // 加载FeatureLayer
        loadFeatureLayers: function (agsLayer) {
            var vectorLayers = this.map.config.vectorLayers;//矢量化图层 
            if (vectorLayers != undefined && vectorLayers.length > 0) {
                for (var i = 0; i < agsLayer.MapServerLayers.length; i++) {
                    for (var j = 0; j < vectorLayers.length; j++) {
                        if (vectorLayers[j] == agsLayer.MapServerLayers[i].id) {
                            //通过图层ID获取图层的元数据信息
                            var layerInfo = agsLayer.MapServerLayers[i];
                            this.addOneFeatureLayer(agsLayer, layerInfo, vectorLayers[j]);
                            break;
                        }
                    }
                }
            }
        },

        // 加载一个FeatureLayer
        addOneFeatureLayer: function (agsLayer, layerInfo, layerid) {
            if (layerInfo != undefined) {
                var outFields = [];
                for (var i = 0; i < layerInfo.fields.length; i++) {
                    outFields.push(layerInfo.fields[i].name);
                }

                var url = this.map.config.mapServer + "/" + layerid;
                var featLayer = new FEATURELAYER(url, {
                    outFields: outFields,
                    visibleAtMapScale: true
                });
                featLayer.LayerIndex = layerid;
                featLayer.OwnerAGSLayer = agsLayer;
                //设置可见性
                this.setFeatureLayerVisible(featLayer, agsLayer._innerVisibleLayers, layerInfo.defaultVisibility);
                //设置事件
                this.setFeatureLayerEvents(featLayer);
                //添加图层
                this.map.MainMap.addLayer(featLayer);
                //将矢量图层关联到对应AGS图层上
                agsLayer.FeatureLayers.push(featLayer);
            }
        },

        // 设置FeatureLayer事件
        setFeatureLayerEventObject: function (evt, featLayer) {
            var args = new Object();
            args.graphic = this.map.common.CloneGraphic(evt.graphic, true);
            args.name = evt.graphic.attributes[featLayer.displayField];
            args.layer = featLayer;
            args.mapPoint = this.map.common.GetPointOnClickObject(evt.graphic, evt.mapPoint);
            args.screenPoint = this.map.MainMap.toScreen(args.mapPoint);
            return args;
        },

        // 添加功能
        setAgsLayerFunctions: function (agsLayer) {
            //首先id要存在，其次必须是Feature Layer，否则一律返回false
            agsLayer.ContainsLayer = function (layerid) {
                for (var i = 0; i < this.MapServerLayers.length; i++) {
                    if (this.MapServerLayers[i].id == layerid) {
                        if (this.MapServerLayers[i].type == "Feature Layer") {
                            return true;
                        }
                    }
                }
                return false;
            };

            //依据id查找图层，未找到返回undefined
            agsLayer.FindLayerInfo = function (layerid) {
                for (var i = 0; i < this.MapServerLayers.length; i++) {
                    if (this.MapServerLayers[i].id == layerid) return this.MapServerLayers[i];
                }
                return undefined;
            };

            //设置可见的图层（ID）,其他不在layerids的全部关闭
            agsLayer.ShowLayers = function (layerids) {
                if (layerids == undefined) layerids = [];
                this.setVisibleLayers(layerids, !true);
                this._innerVisibleLayers = layerids;
                for (var i = 0; i < this.FeatureLayers.length; i++) {
                    var fLayer = this.FeatureLayers[i];
                    //包含切允许矢量化的时候将矢量图层设置为可见
                    if (APP.map.common.Contains(layerids, fLayer.LayerIndex)) {
                        fLayer.show();
                    }
                    else {
                        fLayer.hide();
                    }
                }
            };

            //修改指定图层（ID）的可见性，值修改匹配上的图层可见性，未匹配上的不做变更
            agsLayer.SetVisibilityEx = function (layersid, visible) {
                //var vslLayers = [];
                ////复制一份
                //for (var i = 0; i < this._innerVisibleLayers.length; i++) {
                //    vslLayers.push(this._innerVisibleLayers[i]);
                //};

                //for (var i = 0; i < layersid.length; i++) {
                //    var layerid = layersid[i];
                //    if (vslLayers.contains(layerid)) {
                //        if (visible) {//已经在列表中，不做处理
                //        }
                //        else { //移除ID
                //            vslLayers.remove(layerid);
                //        }
                //    }
                //    else {
                //        if (visible) {//添加到列表中
                //            vslLayers.push(layerid);
                //        }
                //        else {//本来就不在列表中，不做处理 
                //        }
                //    }
                //}

                //this.setVisibleLayers(vslLayers, !true);
                //this._innerVisibleLayers = vslLayers;

                ////设置FeatureLayer可见性 
                //for (var i = 0; i < this.FeatureLayers.length; i++) {
                //    var fLayer = this.FeatureLayers[i];
                //    if (vslLayers.contains(fLayer.LayerIndex)) {
                //        fLayer.show();
                //    }
                //    else {
                //        fLayer.hide();
                //    }
                //}
            };

            //设置全部图层的可见性
            agsLayer.SetVisibilityAll = function (visible) {
                this.setVisibility(visible);
                //设置FeatureLayer可见性 
                for (var i = 0; i < this.FeatureLayers.length; i++) {
                    var fLayer = this.FeatureLayers[i];
                    if (visible) {
                        //if (this._innerVisibleLayers.contains(fLayer.LayerIndex)) {
                        if (APP.map.common.Contains(this._innerVisibleLayers, fLayer.LayerIndex)) {
                            fLayer.show();
                        }
                        else {
                            fLayer.hide();
                        }
                    }
                    else {
                        fLayer.hide();
                    }
                }
            };
        },

        // 设置图层可见
        setFeatureLayerVisible: function (featLayer, visibleLayers, defaultVisibility) {
            //如果用户未设置图层的可见性，则采用ArcGIS Server的默认状态
            if (visibleLayers == undefined) {
                if (defaultVisibility) featLayer.show();
                else featLayer.hide();
            } else {
                //如果用户有设置图层的可见性，则以用户设置为准
                //如果用户设置的可见性图层里面没有找到，则设置为不可见
                featLayer.hide();
                //判断图层是否可见
                for (var i = 0; i < visibleLayers.length; i++) {
                    if (visibleLayers[i] == featLayer.LayerIndex) {
                        featLayer.show();
                        break;
                    }
                }
            }
        },

        // 设置图层鼠标事件
        setFeatureLayerEvents: function (featLayer) {
            featLayer.on("click", LANG.hitch(this, function (evt) {
                var args = this.setFeatureLayerEventObject(evt, featLayer);
                this.map.emit("GraphicMouseDown", args);
            }));

            featLayer.on("mouse-over", LANG.hitch(this, function (evt) {
                var args = this.setFeatureLayerEventObject(evt, featLayer);
                this.map.emit("GraphicMouseEnter", args);
            }));

            featLayer.on("mouse-out", LANG.hitch(this, function (evt) {
                var args = this.setFeatureLayerEventObject(evt, featLayer);
                this.map.emit("GraphicMouseLeave", args);
            }));

            featLayer.on("mouse-down", LANG.hitch(this, function (evt) {
                var args = this.setFeatureLayerEventObject(evt, featLayer);
                this.map.emit("GraphicMouseDown", args);
            }));

            featLayer.on("mouse-up", LANG.hitch(this, function (evt) {
                var args = this.setFeatureLayerEventObject(evt, featLayer);
                this.map.emit("GraphicMouseUp", args);
            }));
        },

        // 添加图层事件
        addGraphicsLayerEvents: function (graphicslayer, type) {
            graphicslayer.on("click", LANG.hitch(this, function (evt) {
                evt.graphic = this.map.common.CloneGraphic(evt.graphic, false);
                this.map.emit(type + "Click", evt);
                return false;
            }));

            graphicslayer.on("mouse-over", LANG.hitch(this, function (evt) {
                evt.graphic = this.map.common.CloneGraphic(evt.graphic, false);
                this.map.emit(type + "MouseEnter", evt);
                return false;
            }));

            graphicslayer.on("mouse-out", LANG.hitch(this, function (evt) {
                evt.graphic = this.map.common.CloneGraphic(evt.graphic, false);
                this.map.emit(type + "MouseLeave", evt);
                return false;
            }));

            graphicslayer.on("mouse-down", LANG.hitch(this, function (evt) {
                evt.graphic = this.map.common.CloneGraphic(evt.graphic, false);
                this.map.emit(type + "MouseDown", evt);
                return false;
            }));

            graphicslayer.on("mouse-up", LANG.hitch(this, function (evt) {
                evt.graphic = this.map.common.CloneGraphic(evt.graphic, false);
                this.map.emit(type + "MouseUp", evt);
                return false;
            }));
        },
    });
});
