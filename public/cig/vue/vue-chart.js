define([
    'require',
    'vue',
    'jQuery',
    'chartJs',
], function(require, Vue, $, Chart) {
    'use strict';
    Vue.component("cig-chart",{
        props:["type","data","options","width","height","watcher"],
        template:"<canvas ref='canvas' :width='width' :height='height'></canvas>",
        data:function(){
            return {
                chartOptions:{
                    type:this.type,
                    data:this.data,
                    options:this.options
                }
            }
        },
        mounted:function(){
            var canvas = this.$refs.canvas;
            var chart = new Chart(canvas.getContext("2d"),this.chartOptions);
            this.chart = chart;
            // var update = .bind(this);
            // this.$watch("data",this.chartUpdate);
            // this.$watch("type",this.chartUpdate);
            // this.$watch("options",this.chartUpdate);
        },
        // watch:{
        //     data:function(){
        //         this.chartUpdate();
        //     },
        //     type:function(){
        //         this.chartUpdate();
        //     },
        //     options:function(){
        //         this.chartUpdate();
        //     }
        // },
        methods:{
            chartUpdate:function(){
                this.$nextTick(function(){
                    this.chartOptions.type = this.type;
                    this.chartOptions.data = this.data;
                    this.chartOptions.options = this.options;
                    // console.log(this._uid+"1");
                    this.chart.update();
                });
            }
        }
    })
});