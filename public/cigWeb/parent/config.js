define([
    'require',
], function(require) {
    'use strict';
    var config={};
    config.backendurl="/cigApi";
    config.getQueryParams = function(){
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
    config.getRole = function(){
        return config.getQueryParams().cigrole || "query";
    };
    return config;
});