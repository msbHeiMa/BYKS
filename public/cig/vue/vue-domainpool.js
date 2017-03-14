define([
    'require',
    'systemConfig',
    'jQuery'
], function(require, systemConfig, $) {
    'use strict';
    function createPool(){
        var cache = {};
        var ajaxOptions = {
            "url":systemConfig.backendurl+"/system/queryDomains",
            "type":"get"
        };
        var pool = {
            setAjaxOptions:function(options){
                ajaxOptions = options;
            },
            cacheDomains:function(names){
                this.getDomainOptions(names);
            },
            getDomainOptions:function(names){
                var notLoadNames = [];
                names.forEach(function(name){
                    if(!cache[name]){
                        notLoadNames.push(name);
                        cache[name] = [];
                    }
                },this);
                if(notLoadNames.length > 0){
                    var options = $.extend({
                        success:pool.getDomainSuccess.bind(pool,notLoadNames),
                        error:pool.getDomainError.bind(pool,notLoadNames)
                    },ajaxOptions);
                    options.data = $.extend({
                        domainNames:notLoadNames.join(",")
                    },options.data);
                    $.ajax(options);
                }
                return cache;
            },
            getDomainSuccess:function(names,res){
                if(res.success){
                    names.forEach(function(name){
                        if(res.data[name]){
                            res.data[name].forEach(function(item){
                                cache[name].push(item);
                            });
                        }
                    },this);
                }
                else{
                    pool.getDomainError(names);
                }
            },
            getDomainError:function(names){
            },
            getTextByValue:function(options,value){
                if(typeof options == "string"){
                    //options为字符串，则为domainName
                    options = cache[options];
                }
                var text = value
                if (options && options.length >= 1) {
                    options.forEach(function (option) {
                        if (option.value == value) {
                            text = option.text
                        }
                    }, this)
                }
                return text;
            }
        };
        return pool;
    }
    var pool = createPool();
    pool.createPool = createPool;
    return pool;
});