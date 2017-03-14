define([
    "cigmap/ciglib/infoWindow",
    "esri/geometry/geometryEngine",
    "dojo/dom-style",
    "dojo/_base/lang", "dojo/_base/declare"
], function (
    INFOWINDOW,
    GEOMETRYENGINE,
    DOMSTYLE, LANG, DECLARE
) {
    return DECLARE(null, {
        constructor: function (map) {
            this.map = map;

            // 点击显示气泡
            this.map.ShowInfoWindow4Vector = LANG.hitch(this, function (args) {
                this._ShowInfoWindow4Vector(args);
            });

            // 关闭气泡
            this.map.CloseInfoWindow = LANG.hitch(this, function () {
                this._CloseInfoWindow();
            });
        },
        // 点击显示气泡
        _ShowInfoWindow4Vector: function (args) {
            this.map.MainMap.infoWindow.setTitle(args.name);
            var content = this._GetContentByDataLayer(args.graphic.attributes, args.layer, "vector");
            this.map.MainMap.infoWindow.setContent(content);
            this.map.MainMap.infoWindow.resize(350, 300);
            this.map.MainMap.infoWindow.show(args.mapPoint);
        },

        // 关闭气泡
        _CloseInfoWindow: function () {

        },

        // 获得气泡内容
        _GetContentByDataLayer: function (data, layer, type) {
            if (type == "vector") {
                data = [[data]];
                this._TranslateData(data, [layer.OwnerAGSLayer.FindLayerInfo(layer.LayerIndex)]);

            } else if (type == "table") {
                this._TranslateData(data, layer);
            }

            var showData = [];
            var fields = type == "vector" ? layer.OwnerAGSLayer.FindLayerInfo(layer.LayerIndex).fields : layer[0].fields;
            for (var i = 0, c = fields.length; i < c; i++) {
                var field = fields[i];
                var value = data[0][0][field.name]
                if (field.showtype != undefined) {
                    if (field.showtype == 1 || field.showtype == 2) {
                        showData.push({ field: field.alias, value: value });
                    }
                } else {
                    if (field.type == "esriFieldTypeOID" || field.type == "esriFieldTypeGeometry")
                        continue;

                    var ishaseventid = field.name.indexOf("ID") == -1 ? false : true;
                    if (ishaseventid) {
                        continue;
                    }

                    showData.push({ field: field.alias, value: value });
                }
            }
            //获取图层属性名称
             var layerName = "";
            switch (layer.LayerIndex) {
                case 0: layerName = "事件"; break;
                case 1: layerName = "企业"; break;
                case 2: layerName = "学校"; break;
                case 3: layerName = "医疗卫生机构"; break;
                case 4: layerName = "视频监控点"; break;
                case 5: layerName = "村级行政区"; break;
            }
            for (var i = 0; i < showData.length; i++) {
                if (!showData[i].value) showData[i].value = "";
            }

            var name = "";
            var content = "";
            for (var i = 0; i < showData.length; i++) {
                var tt = "<table class='infoWindowCon'>";
                var value = showData[i].value;
                if (showData[i].field == "网址") {
                    value = "<a class='infoWCA' href='" + showData[i].value + "' target='_blank'>" + showData[i].value + "</a>";
                }
                if (i == 0) {
                    content += "<div><span class='infoViewH'>" + layerName + ":</span>&nbsp&nbsp<span class='infoViewH'>" + showData[i].value + "</span></div><div class='hzLine'></div>"
                    tt += "<thead><tr><td class='infoTdOne'>" + showData[i].field + "：</td><td class='infoTdTwo'>" + value + "</td></tr></thead>";
                    name = value;
                    content = content + tt + "<tbody>";
                }
                
                else {
                    tt = "<tr><td align='right'>" + showData[i].field + "：</td><td class='infoTdTwo'>" + value + "</td></tr>"
                   
                    content += tt;
                }
            }
            name = encodeURIComponent(name);
            if (layer.LayerIndex == 4) {
                // var list = "<div class='actionList'><span class='action'><a href='videoView.html?message=" + name + "'>显示视频</a></span></div>";
                var list = "<iframe src='videoView.html?message="+name+"' scrolling='no' frameborder='0' width=300 height=280'></iframe>"
                content += "<tr><td colspan='2'>" + list + "</td></tr>";
                
            }
   
            content += "</tbody></table>";
            return content;
        },

        // 设置气泡内容
        _GetContentWithAttribute: function (attr) {
            var content = "<table class='infoWindowCon'>";
            for (var i = 0; i < attr.length; i++) {
                var attrName = attr[i].alias != "" ? attr[i].alias : attr[i].name;
                var val = attr[i].value;
                if (attrName == "网址") {
                    val = "<a class='infoWCA' href='" + val + "' target='_blank'>" + val + "</a>";
                }
                if (i == 0) {
                    content += "<thead><tr><th class='infoThOne'>" + attrName + "：</th><th class='infoThTwo'>" + val + "</th></tr></thead><tbody>";
                } else {
                    content += "<tr><td align='right'>" + attrName +
                        "：</td><td class='infoTdTwo'>" + val + "</td></tr>";
                }
            }
            return content;
        },

        // 翻译数据
        _TranslateData: function (datas, layers) {
            if (!datas || !layers || !datas.length || !layers.length)
                return;

            for (var i = 0, c = layers.length; i < c; i++) {
                var layer = layers[i];
                if (layer.fields) {
                    for (var j = 0, d = layer.fields.length; j < d; j++) {
                        if (layer.fields[j].domain) {
                            translate(datas[i], layer.fields[j].name, layer.fields[j].domain.codedValues);
                        }
                    }
                }
            }

            function translate(data, fieldname, codeValue) {
                for (var i = 0, c = data.length; i < c; i++) {
                    for (var j = 0, d = codeValue.length; j < d; j++) {
                        if (data[i][fieldname] == codeValue[j].code) {
                            data[i][fieldname] = codeValue[j].name;
                            break;
                        }
                    }
                }
            }
        },

        // 获取显示点
        _GetShowPoint: function (geometry) {
            switch (geometry.type) {
                case "point":
                    return geometry;
                case "polyline":
                    var center = geometry.getExtent().getCenter();
                    return GEOMETRYENGINE.nearestCoordinate(geometry, center).coordinate; //点在线上
                case "polygon":
                    var centre = geometry.getCentroid();
                    return GEOMETRYENGINE.nearestCoordinate(geometry, centre).coordinate; //点在多边形上
                case "multipoint":
                    return geometry.getExtent().getCenter();
                default:
                    return geometry.getCenter();
            }
        }
    });
});