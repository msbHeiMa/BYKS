var file = (function(){
    var scripts = document.getElementsByTagName("script");
    var script = scripts[scripts.length - 1];
    return script.getAttribute("src");
})();
var getPath = function(file){
    var tmp = file.split("/");
    tmp.pop();
    return tmp.join("/");
}
window.djConfig = {
    packages: [{
        name: "cigmap",
        location: getPath(file)+"/cigmap"
    }]
};
var poiImagePath = getPath(file) +"/images";
// 应用程序类
var APP = {
    // 预初始化
    preInit: function (config) {
        APP.init(config);
    },

    // 初始化
    init: function (config) {
        require([
          "cigmap/map",
          "dojo/parser",
          "dojo/domReady!"
        ], function (
            MAP,
            PARSER
        ) {
            PARSER.parse();

            if(!config.onLoad){
                config.onLoad = function(){
                    APP.onInitd();
                }
            }
            //地图初始化
            new MAP(APP, config).init();
        });
    },

    onInitd:function(){},

    // 显示错误
    showError: function (e) {
        window.status = e.name + " ：" + e.message;
    },
    addPOI:function(lons, lats, names, pois, attrs) {
        require([
            "dojo/dom",
            "esri/graphic",
            "esri/symbols/PictureMarkerSymbol"
        ], function (
            DOM, GRAPHIC, PICTUREMARKERSYMBOL
        ) {
            if ((lons.length != lats.length) || (lons.length != names.length)) {
                return;
            }
            for (var i = 0; i < lons.length; i++) {
                var x = lons[i];
                var y = lats[i];
                var name = names[i];
                var point = APP.map.common.XYToPoint(x, y);
                var imgurl1 = pois[i] || "/poi/mark_red1.png";
                var imgurl2 = pois[i] || "/poi/mark_blue1.png";
                imgurl1 = (poiImagePath+imgurl1);
                imgurl2 = (poiImagePath+imgurl2);
                var symbol = new PICTUREMARKERSYMBOL(imgurl1, 26, 36);
                var graphic = new GRAPHIC(point, symbol);
                var attr = attrs && attrs[i];
                graphic.attributes = { name: name, image1: imgurl1, image2: imgurl2 };
                if(attr){
                    for (var key in attr) {
                        if (attr.hasOwnProperty(key)) {
                            var element = attr[key];
                            graphic.attributes[key] = element;
                        }
                    }
                }
                APP.map.AddPOIGraphic(graphic);
            }
        });
    },
    clearPOI:function(){
        APP.map.ClearGraphic();
    },
    zoomToFeature:function (x, y, level) {
        APP.map.MainMap.centerAndZoom(APP.map.common.XYToPoint(x, y), level);
    }
};

// 配置类
var ZZ_MAP_CONFIG = {
    // 地图控件的ID
    mapID: "main_map",

    // 全图范围
    fullExtent: {
        xmin: 121.29585473952106,
        ymin: 39.49550677343447,
        xmax: 123.05162192862765,
        ymax: 139.982938778863684
    },

    // 初始化范围
    extent: {
        xmin: 119.803,
        ymin: 30.956,
        xmax: 120.038,
        ymax: 31.066
    },

    // 空间参考坐标系
    spatialReference: {
        wkid: 4326
    },

    // 针对瓦片的地图服务的,用来控制瓦片级别的显示，有时候切片级别太多的话，可以只显示部分的级别地图
    lods: [
           //resolution scale这些值的获取参照发布的切片地图服务详情
           { "level": 0, "resolution": 0.00118973050291514, "scale": 500000 },
           { "level": 1, "resolution": 5.9486525145757E-4, "scale": 250000 },
           { "level": 2, "resolution": 2.3794610058302802E-4, "scale": 100000 },
           { "level": 3, "resolution": 5.710706413992673E-5, "scale": 24000 },
           { "level": 4, "resolution": 2.3794610058302804E-5, "scale": 10000 }
    ],

    // 最小级别
    minLevel: 4,

    // 最大级别
    maxLevel: 18,

    // 矢量服务
    mapServer: "http://222.46.11.118:14380/CIGProxy/rest/services/ZJ/CX_ZZZTT/MapServer",

    // 矢量图层
    vectorLayers: [0, 1, 2, 3, 4, 5],

    // 默认显示图层
    visibleLayers: [0, 1, 2, 4]
};