define([
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/TextSymbol",
    "esri/Color",
    "esri/symbols/Font",
    "dojo/_base/declare",
    "dojo/domReady!"
], function (
    SIMPLELINESYMBOL,
    SIMPLEMARKERSYMBOL,
    SIMPLEFILLSYMBOL,
    TEXTSYMBOL,
    COLOR,
    FONT,
    DECLARE
) {
    return DECLARE(null, {
        constructor: function () {
        },

        //透明样式
        GetTransparentPointSymbol: function () {
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 255, 255, 0]);
            linesymbol.width = 0.5;
            var pointsymbol = new SIMPLEMARKERSYMBOL(SIMPLEMARKERSYMBOL.STYLE_SQUARE, 12, linesymbol, new COLOR([0, 0, 0, 0]));
            pointsymbol.size = 20;
            pointsymbol.outline = linesymbol;
            return pointsymbol;
        },

        GetTransparentLineSymbol: function () {
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 0, 0, 0]);
            linesymbol.width = 8;
            return linesymbol;
        },

        GetTransparentFillSymbol: function () {
            var fillsymbol = new SIMPLEFILLSYMBOL();
            fillsymbol.color = new COLOR([0, 0, 0, 0]);
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 0, 0, 0]);
            linesymbol.width = 0;
            fillsymbol.outline = linesymbol;
            return fillsymbol;
        },

        //高亮样式
        GetHilightPointSymbol: function () {
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 0, 0, 0]);
            linesymbol.width = 0;
            var pointsymbol = new SIMPLEMARKERSYMBOL(SIMPLEMARKERSYMBOL.STYLE_SQUARE, 12, linesymbol, new COLOR([0, 255, 255, 0.7]));
            pointsymbol.size = 20;
            pointsymbol.outline = linesymbol;
            return pointsymbol;
        },

        //高亮样式
        GetHilightPointCircleSymbol: function () {
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 0, 0, 0]);
            linesymbol.width = 0;
            var pointsymbol = new SIMPLEMARKERSYMBOL(SIMPLEMARKERSYMBOL.STYLE_CIRCLE, 12, linesymbol, new COLOR([0, 255, 255, 0.7]));
            pointsymbol.size = 20;
            pointsymbol.outline = linesymbol;
            return pointsymbol;
        },
        GetHilightLineSymbol: function () {
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 255, 255, 0.8]);
            linesymbol.width = 5;
            return linesymbol;
        },

        GetHilightFillSymbol: function () {
            var fillsymbol = new SIMPLEFILLSYMBOL();
            fillsymbol.color = new COLOR([0, 255, 255, 0.5]);
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = new COLOR([0, 0, 0, 1]);
            linesymbol.width = 0.5;
            fillsymbol.outline = linesymbol;
            return fillsymbol;
        },

        //格网图形线样式
        GetGridLineSymbol: function (color) {
            var linesymbol = new SIMPLELINESYMBOL();
            linesymbol.color = color == undefined ? new COLOR([100, 100, 100, 0.8]) : color;
            linesymbol.width = 1;
            return linesymbol;
        },

        //格网标注
        GetGridLatTextSymbol: function (text, color) {
            var fontsize = 10;
            var fontcolor = color == undefined ? new COLOR([65, 105, 225, 1]) : color;
            var textSymbol = new TEXTSYMBOL();
            textSymbol.setText(text);
            textSymbol.setColor(fontcolor)
            var font = new FONT();
            font.setSize(fontsize);
            font.setWeight(Font.WEIGHT_BOLD);
            textSymbol.setFont(font);
            textSymbol.horizontalAlignment = "left";
            textSymbol.verticalAlignment = "bottom";
            return textSymbol;
        },
        //格网标注
        GetGridLonTextSymbol: function (text, color) {
            var fontsize = 10;
            var fontcolor = color == undefined ? new COLOR([65, 105, 225, 1]) : color;
            var textSymbol = new TEXTSYMBOL();
            textSymbol.setText(text);
            textSymbol.setColor(fontcolor)
            var font = new FONT();
            font.setSize(fontsize);
            font.setWeight(Font.WEIGHT_BOLD);
            textSymbol.setFont(font);
            textSymbol.horizontalAlignment = "left";
            textSymbol.verticalAlignment = "bottom";
            return textSymbol;
        }
    });
});
