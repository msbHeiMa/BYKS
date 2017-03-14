define([
    "dojo/_base/lang", "dojo/_base/declare"
], function (
   LANG, DECLARE
) {
    var pExport = DECLARE(null, {
        constructor: function (options, divid) {
            this.Map = options.map;
            this.MapServer = options.layer;
            this.MapName = options.name;
            this.DIV_Id = divid;
            this._OnTreeChanged = LANG.hitch(this, this._OnTreeChanged);
        },

        startup: function () {
            var pA4MapServer = this.MapServer;
            var pDIVId = this.DIV_Id;
            var pName = this.MapName || "专题图";
            var pMapNode = { id: pA4MapServer.id, parent: "#", text: pName, state: { opened: true }, layerType: "ArcGISDynamicMapServiceLayer" };
            var aLayerNodes = $.map(pA4MapServer.layerInfos, function (pRow, pIndex) {
                var pLayerNode = {
                    "id": pMapNode.id + "." + pRow.id,
                    "parent": pRow.parentLayerId == -1 ? pMapNode.id : pMapNode.id + "." + pRow.parentLayerId,
                    "text": pRow.name,
                    "layerId": pRow.id
                };
                if (pRow.subLayerIds && pRow.subLayerIds.length > 0) pLayerNode.type = "default";
                else pLayerNode.type = "file";
                if ($.inArray(pLayerNode.layerId, pA4MapServer.visibleLayers) > -1 && pLayerNode.type == "file") pLayerNode.state = { selected: true };
                return pLayerNode;
            });
            aLayerNodes.push(pMapNode);

            $('#' + pDIVId).jstree({
                'core': {
                    'data': aLayerNodes
                },
                "types": {
                    "default": { "icon": "glyphicon glyphicon-folder-close" },
                    "file": { "icon": "glyphicon glyphicon-leaf" }
                },
                "plugins": ["types", "checkbox"]
            });

            this.IsFirst = pA4MapServer.visibleLayers && pA4MapServer.visibleLayers.length > 0;
            $('#' + pDIVId).on('changed.jstree', this._OnTreeChanged);
        },

        _OnTreeChanged: function (e, data) {
            if (this.IsFirst) {
                this.IsFirst = false;
                return false;
            }

            var pA4Map = this.Map;
            var pA4MapServer = this.MapServer;
            var pTree = data.instance;
            var pRoot = pTree.get_node("#");
            for (var i = 0; i < pRoot.children.length; i++) {
                var pMapNode = pTree.get_node(pRoot.children[i]);
                if (pMapNode.original.layerType == "ArcGISDynamicMapServiceLayer") {
                    var aVisibleLayers = $.map(pMapNode.children_d, function (pRow) {
                        var pLayerNode = pTree.get_node(pRow);
                        if (pLayerNode.type == "file") {
                            var pA4FeatureServer = pA4Map.getLayer(pLayerNode.id);
                            if (pTree.is_selected(pLayerNode)) {
                                if (pA4FeatureServer && !pA4FeatureServer.visible) pA4FeatureServer.show();
                                return pLayerNode.original.layerId;
                            }
                            else {
                                if (pA4FeatureServer && pA4FeatureServer.visible) pA4FeatureServer.hide();
                            }
                        }
                    });

                    pA4MapServer.ShowLayers(aVisibleLayers);
                }
            }
            return false;
        }
    });
    return pExport;
});
