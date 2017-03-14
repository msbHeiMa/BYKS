define([
    "esri/InfoWindowBase", "dojo/dom",
    "dojo/dom-construct", "dojo/dom-style", "esri/domUtils",
    "dojo/_base/declare"
], function (
    INFOWINDOWBASE,
    DOM,
    DOMCONSTRUCT,
    DOMSTYLE,
    DOMUTILS,
    DECLARE
) {
    return DECLARE(null, {
        constructor: function (map) {
            this.map = map;
        },

        setTitle: function (title) {
            //this.place(title, this._title);
        },
        setContent: function (content) {
            //this.place(content, this._content);
        },
        show: function (location) {
            //// Is location specified in map coordinates?
            //if (location.spatialReference) {
            //    location = this.map.toScreen(location);
            //}

            //// Position 10x10 pixels away from the 
            //// requested location
            //DOMSTYLE.set(this.domNode, {
            //    left: (location.x + 10) + "px",
            //    top: (location.y + 10) + "px"
            //});

            //// Display
            //DOMUTILS.show(this.domNode);
            //this.isShowing = true;
            //this.onShow();
        }
    });
});