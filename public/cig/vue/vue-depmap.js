define([
    'require',
    'vue',
    'jQuery',
    'echarts',
    'echartsExtBmap'
], function(require, Vue, $, echarts) {
    'use strict';

    function getMapName(map){
        var name = "";
        if(typeof(map) == "string"){
            if(map.indexOf("system:") == 0){
                name = map.replace("system:","");
            }
            else{
                name = map.split("/").pop().split(".").shift();
            }
        }
        else if(typeof(map) == "object"){
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    name = key;
                    break;
                }
            }
        }
        return name;
    };
    function registerMap(map,callback){
        var mapType = typeof(map);
        var name = getMapName(map);
        var m = echarts.getMap(name);
        if(m){
            callback();
        }
        else{
            switch (mapType){
                case "string":
                    if(map.indexOf("system:") == 0){
                        var url = require.toUrl("../../components/echarts/map/json/"+name+".json");
                        require(["json!"+url],function(mapData){
                            echarts.registerMap(name,mapData);
                            callback();
                        });
                        break;
                    }
                    else if(map.indexOf("json!") == 0){
                        require([map],function(mapData){
                            echarts.registerMap(name,mapData);
                            callback();
                        });
                        break;
                    }
                    else{
                        mapType = "object";
                        var mapObj = {
                        };
                        mapObj[name] = {
                            url:map,
                            type:"get"
                        };
                        map = mapObj;
                    }
                case "object":
                    var ajaxOption = map[name];
                    $.extend({
                        success:function(res){
                            if(res.success){
                                echarts.registerMap(map,res.ata);
                            }
                            callback();
                        }
                    },ajaxOption);
                    $.ajax(ajaxOption);
                    break;
            }
        }
    }
    Vue.component("cig-dep-map",{
        props:{
            map:{},
            randomColor:{
                default:true
            },
            roam:{
                default:true
            }
        },
        template:"<div style='height:100%;' ref='container' class='cig-dep-map'></div>",
        data:function(){
            return {
                _chart:false
            }
        },
        watch:{
            map:function(){
                this.update();
            }
        },
        mounted:function(){
            this.update();
        },
        methods:{
            mapClick:function(params){
                if(params.componentType == "series" && params.name){
                    this.$emit("itemclick",params.name);
                }
            },
            resize:function(){
                if(this._chart){
                    this._chart.resize();
                }
            },
            resetSelect:function(){
                this.update();
            },
            update:function(){
                registerMap(this.map,(function(){
                    if(!this._chart){
                        var dom = this.$refs.container;
                        var chart = echarts.init(dom);
                        this._chart = chart;
                        this._chart.on("click",this.mapClick.bind(this));
                    }
                    var mapName = getMapName(this.map);

                    var mapColorData = [];
                    var mapColor = [
                        "#f2f",
                        "#ff3",
                        "#3f3",
                        "#df3",
                        "#f63",
                        "#e44433",
                        "#f122f3",
                        "#ff3323",
                    ];
                    var mapColorCategory = [1,2,3,4,5,6,7,8];
                    if(this.randomColor){
                        var totalColor = mapColorCategory.length;
                        var data = echarts.getMap(mapName);
                        var features = data.geoJson && data.geoJson.features;
                        if(features){
                            mapColorData = features.map(function(item,index){
                                return {name:item.properties.name,value:mapColorCategory[index%totalColor]};
                            });
                        }
                    }
                    else{

                    }
                    var option = {
                        series: [
                            {
                                name: 'dep',
                                type: 'map',
                                mapType: mapName,
                                roam: this.roam,
                                label: {
                                    normal: {
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                selectedMode:"single",
                                itemStyle:{
                                    normal: {
                                        areaColor:"transparent",
                                        borderColor:"#198eb1"
                                    },
                                    emphasis: {
                                        areaColor:"#9cd5e0",
                                        borderColor:"#198eb1"
                                    }
                                },
                                data:mapColorData
                            }
                        ],
                        visualMap:[
                            {
                                left:-9999,
                                type:"piecewise",
                                categories:mapColorCategory,
                                inRange: {
                                    color:mapColor
                                }
                            }
                        ]
                    };
                    this._chart.setOption(option, true);
                }).bind(this));               
            }
        }
    });
    
});