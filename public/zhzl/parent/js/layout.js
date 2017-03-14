define([
    'require',
    'jQuery'
], function(require, $) {
    'use strict';
    function bindEvents(){
        $(window).resize(update);
    }
    function update(){
        var $main = $(".content-wrapper");
        var totalHeight = $(window).height();
        var offset = $main.offset();
        var $layoutStyle = $("#_layout_style");
        if($layoutStyle.length == 0){
            $layoutStyle = $("<div id='_layout_style'></div>").appendTo("body");
        }
        if($main.hasClass("full-page") && offset){
            var height = totalHeight - offset.top;
            var styleHtml = "<style>.full-page{height:"+height+"px!important;min-height:auto!important;}</style>";
            // $main.css({height:height+"px!important"}); 
            $layoutStyle.html(styleHtml);
        }
    }
    $(function(){
        bindEvents();
        update();
        setTimeout(update, 1000);
    });
});