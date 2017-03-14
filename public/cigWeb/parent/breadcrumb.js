define([
    'require',
    'vue'
], function(require, Vue) {
    'use strict';
    
    var breadcrumb = new Vue({
        data:{
            items:[
                {
                    url:"/cigWeb/index.html",
                    text:"首页",
                }
            ]
        },
        methods:{
            resetItem:function(){
                this.items = [
                    {
                        url:"/cigWeb/index.html",
                        text:"首页",
                    }
                ];
            }
        }
    });
    return breadcrumb;
});