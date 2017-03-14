define([
    "cigmap/ciglib/common", "cigmap/ciglib/method", "cigmap/ciglib/flash", "cigmap/ciglib/style", "cigmap/ciglib/showInfoWindow",
    "cigmap/mapinit", "cigmap/mapload",
    "dojo/Evented", "dojo/_base/lang", "dojo/_base/declare"
], function (
    COMMON, METHOD, FLASH, STYLE, SHOWINFOWINDOW,
    MAPINIT, MAPLOAD,
    EVENTED, LANG, DECLARE
) {
    return DECLARE([EVENTED], {
        constructor: function (config) {

            this.config = config;
            this.common = new COMMON(this);
            this.style = new STYLE();

            var mapinit = new MAPINIT(this);
            var mapload = new MAPLOAD(this);
            var method = new METHOD(this, mapload);
            var showinfowindow = new SHOWINFOWINDOW(this);

            this.Flash = LANG.hitch(this, function (geometry, count) {
                if (count == undefined) count = 3;
                if (count < 1) count = 1;
                var geo = this.common.ProjectToMercator(geometry);
                new FLASH(this.Flashlayer, geo, count, this.style)
            });
        }
    });
});
