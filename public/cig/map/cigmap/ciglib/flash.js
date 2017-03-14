define([
    "esri/graphic",
    "dojo/_base/lang",
    "dojo/_base/declare"
], function (
    GRAPHIC,
    LANG,
    DECLARE
) {
    return DECLARE(null, {
        constructor: function (layer, geo, count, styleMgr) {
            this._layer = layer;
            this._gra = new GRAPHIC();
            this._gra.geometry = geo;
            this._allCount = count;
            this._count = 0;
            this._styleMgr = styleMgr;
            this._show = true;
            this._layer.add(this._gra);
            this._Flash();
            this._timer = setInterval(LANG.hitch(this, this._Flash), 400);
        },
        _Flash: function () {
            var gra = this._gra;
            if (gra && gra.geometry && gra.geometry.type) {
                if (gra.geometry.type == "point") {
                    if (this._show) {
                        gra.setSymbol(this._styleMgr.GetHilightPointCircleSymbol());
                        this._count++;
                    }
                    else {
                        gra.setSymbol(this._styleMgr.GetTransparentPointSymbol());
                    }
                }
                else if (gra.geometry.type == "polyline") {
                    if (this._show) {
                        gra.setSymbol(this._styleMgr.GetHilightLineSymbol());
                        this._count++;
                    }
                    else {
                        gra.setSymbol(this._styleMgr.GetTransparentLineSymbol());
                    }
                }
                else if (gra.geometry.type == "polygon" || gra.geometry.type == "extent") {
                    if (this._show) {
                        gra.setSymbol(this._styleMgr.GetHilightFillSymbol());
                        this._count++;
                    }
                    else {
                        gra.setSymbol(this._styleMgr.GetTransparentFillSymbol());
                    }
                }
                this._show = !this._show;
            }

            if (this._count > this._allCount) {
                clearInterval(this._timer);
                this._layer.remove(this._gra);
            }
        }
    });
});
