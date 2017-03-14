define([
    "esri/map",
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "dojo/Evented", "dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dojo/domReady!"],
function (
    MAP,
    SPATIALREFERENCE, EXTENT, POINT,
    EVENTED, DECLARE, LANG, ON
) {
    return DECLARE([EVENTED], {
        constructor: function (map) {
            this.map = map;
            var fromPt = this.map.common.ProjectToMercator(new POINT(76, 16, new SPATIALREFERENCE(4326)));
            var toPt = this.map.common.ProjectToMercator(new POINT(136, 56, new SPATIALREFERENCE(4326)));
            this.map.FullExtent = new EXTENT(fromPt.x, fromPt.y, toPt.x, toPt.y, fromPt.spatialReference);
            
            var config = map.config;
            var minL = config.minLevel;
            var maxL = config.maxLevel;
            if (minL == undefined) minL = 0;
            if (maxL == undefined) maxL = 18;
            if (minL > maxL) {
                var l = minL;
                minL = maxL;
                maxL = l;
            }

            if (minL < 0) minL = 0;
            if (maxL < 0) maxL = 0;
            if (minL > 18) minL = 18;
            if (maxL > 18) maxL = 18;

            if (minL == maxL) {
                minL = 0;
                maxL = 18;
            }

            this.map.MinLevel = minL;
            this.map.MaxLevel = maxL;

            //var lods = new Array();
            //for (var i = minL; i <= maxL; i++) {
            //    var lod = new Object();
            //    lod.scale = this.map.common.Scale[i];
            //    lod.resolution = this.map.common.Resolution[i];
            //    lod.level = i;
            //    lods.push(lod);
            //}

            this.map.MainMap = new MAP(config.mapID, {
                //lods: lods,
                logo: false,
                showAttribution: false,
                zoom: 13
            });

            this.map.MainMap.extent = this.map.FullExtent;
            this.map.GetLevel = LANG.hitch(this, function () {
                return this.map.MainMap.getLevel() + this.map.MinLevel;
            });

            this.map.MainMap.on("extent-change", LANG.hitch(this, function (evt) {
                var args = new Object();
                args.Level = this.map.GetLevel();
                var extent = evt.extent;
                var sp = this.map.common.ProjectToWGS84(new POINT(extent.xmin, extent.ymin, extent.spatialReference));
                var ep = this.map.common.ProjectToWGS84(new POINT(extent.xmax, extent.ymax, extent.spatialReference));

                args.Extent = new EXTENT(sp.x, sp.y, ep.x, ep.y, new SPATIALREFERENCE({ wkid: 4326 }));
                if (this._LastMapLevel == undefined) {
                    this._LastMapLevel = args.Level;
                    this.map.emit("MapLevelChanged", args.Level);
                }
                else {
                    if (this._LastMapLevel != args.Level) {
                        this._LastMapLevel = args.Level;
                        this.map.emit("MapLevelChanged", args.Level);
                    }
                }
            }));

            this.map.MainMap.on("click", LANG.hitch(this, function (evt) {
                this.map.emit("MapPointClicked", evt.mapPoint);
            }));
        }
    });
});
