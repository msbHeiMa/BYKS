var zhzlconfig={};
zhzlconfig.backendurl="/zhzlbackend";
zhzlconfig.getQueryParams = function(){
    var params = {};
    var tmp = location.search.substr(1);
    tmp = tmp.split("&");
    for(var i=0,l=tmp.length;i<l;i++){
        var tmp1 = tmp[i].split("=");
        if(tmp1.length == 2){
            params[tmp1[0]] = decodeURIComponent(tmp1[1]);
        }
    }
    return params;
};
zhzlconfig.getRole = function(){
    return zhzlconfig.getQueryParams().cigrole || "query";
};
if(typeof define != "undefined"){
    define([
        'require',
    ], function(require) {
        'use strict';
        return zhzlconfig;
    });
}