define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'echarts',
    'vueBsTable',
    'vueDepMap',
], function(require, Vue, $, systemConfig, echarts) {
    'use strict';
    var components = {
        components:{
            indexCircle:{
                template:'\
                        <svg width="212" height="212" \
                            viewBox="0 -50 212 312" \
                            xmlns="http://www.w3.org/2000/svg" \
                            xmlns:xlink="http://www.w3.org/1999/xlink">\
                            <g>\
                                <path v-for="(item,index) in pie1Data" :fill="colors[0][index%colors[0].length]" :d="item.pie"></path>\
                            </g>\
                            <circle fill="#f5f5f5" stroke="#FFFFFF" stroke-miterlimit="10"  cx="106" cy="106" r="72"/>\
                            <g>\
                                <text v-for="(item,index) in pie1Data" :x="item.label.x" :y="item.label.y" :style="item.label.style">{{data.labels[0][index]}}</text>\
                                <text v-for="(item,index) in pie1Data" :x="item.label.x" :y="item.label.y+30" :style="item.label.style">{{data.datasets[0][index]}}人</text>\
                                <path v-for="(item,index) in pie1Data" :d="item.label.path" :stroke="colors[0][index%colors[0].length]" fill="transparent"></path>\
                            </g>\
                            <g>\
                                <text x="106" y="96" style="text-anchor:middle;" fill="#009cd4">实有人口</text>\
                                <text x="106" y="126" style="text-anchor:middle;" fill="#009cd4">{{pie1Total}}</text>\
                            </g>\
                        </svg>',
                methods:{
                    drawArcByRadiusDeg :function (startDeg,r , deg) {
                        var centerX = 106,centerY = 106;
                        var startX = centerX,startY = centerY;
                        var degStartX = startX + r * Math.cos(startDeg*Math.PI/180),
                            degStartY = startY - r*Math.sin(startDeg*Math.PI/180);
                        var cw = 0;
                        var x = startX + r * Math.cos((startDeg+deg)*Math.PI/180),
                            y = startY - r*Math.sin((startDeg+deg)*Math.PI/180);
                        var bigOrSmall = deg > 180 ? 1 : 0;
                        var line = " L" + (startX - r) + " " + startY + " L"+startX + " " + startY + "Z";
                        var res = {};
                        var fromX = startX + r * Math.cos((startDeg+deg/2)*Math.PI/180),
                            fromY = startY - r*Math.sin((startDeg+deg/2)*Math.PI/180);
                        var endX,endY,align,tranX;
                        if(Math.abs(fromY - centerY) < 40){
                            endY = fromY;
                            tranX = fromX;
                        }
                        else{
                            if(fromY > centerY){
                                if(fromY - centerY < 100){
                                    endY = fromY + 20;
                                    tranX = fromX > centerX ? fromX + 10 : fromX - 10;
                                }
                                else{
                                    endY = fromY + 10;
                                    tranX = fromX > centerX ? fromX + 20 : fromX - 20;
                                }
                            }
                            else{
                                if(centerY - fromY < 100){
                                    endY = fromY - 20;
                                    tranX = fromX > centerX ? fromX + 10 : fromX - 10;
                                }
                                else{
                                    endY = fromY - 10;
                                    tranX = fromX > centerX ? fromX + 20 : fromX - 20;
                                }
                            }
                        }
                        if(fromX > centerX){
                            endX = centerX + r + 20;
                            align = "start";
                        }
                        else{
                            endX = centerX - r - 20;
                            align = "end";
                        }
                        res.tmp = {
                            startX:startX,startY:startY,
                            degStartX:degStartX,degStartY:degStartY,
                            r:r,bigOrSmall:bigOrSmall,cw:cw,x:x,y:y,
                            
                            fromX:fromX,fromY:fromY,
                            tranX:tranX,
                            endX:endX,endY:endY,
                            align:align
                        }
                        res.update = function(){
                            var tmp = this.tmp;
                            this.pie = [
                                "M",tmp.startX,tmp.startY,
                                "L",tmp.degStartX,tmp.degStartY,
                                "A",tmp.r,tmp.r,0,tmp.bigOrSmall,tmp.cw,tmp.x,tmp.y,
                                "L",tmp.startX,tmp.startY,
                                "Z"
                            ].join(" "),
                            this.label = {
                                path:[
                                    "M",tmp.fromX,tmp.fromY,
                                    "L",tmp.tranX,tmp.endY,
                                    "L",tmp.endX,tmp.endY
                                ].join(" "),
                                style:{
                                    "text-anchor":tmp.align
                                },
                                x:tmp.endX,
                                y:tmp.endY - 10
                            };
                            this.label1 = {
                                style:{
                                    "text-anchor":"middle"
                                },
                                x:fromX,
                                y:fromY>centerY?fromY-20:fromY+20,
                            }
                        }
                        res.update();
                        return res;
                    },
                    getPieData:function(index,r){
                        var dataset = this.data.datasets[index];
                        var res = [];
                        var startDeg = this.startDeg;
                        if(dataset){
                            var sum = 0;
                            dataset.forEach(function(val) {
                                sum += val;
                            }, this);
                            res = dataset.map(function(val){
                                var deg = val/sum * 360;
                                var data = this.drawArcByRadiusDeg(startDeg,r,deg);
                                startDeg += deg;
                                return data;
                            },this);
                            updateLabelPos(res);
                        }
                        return res;
                        function updateLabelPos(res){
                            var lefts = res.filter(function(item){
                                return item.align == "start";
                            });
                            var rights = res.filter(function(item){
                                return item.align != "start";
                            });
                        }
                    }
                },
                data:function(){
                    return {
                        startDeg:Math.random() * 20 + 80
                    }
                },
                props:{
                    colors:{
                        default:function(){
                            return [
                                [
                                    "#e67b5a",
                                    "#dc2824",
                                    "#7ec9aa",
                                ]
                            ]
                        }
                    },
                    data:{
                        default:function(){
                            return {
                                labels:[
                                    ["流动人员","境外人员","户籍人口"]
                                ],
                                datasets:[
                                    [100,200,300]
                                ]
                            }
                        }
                    }
                },//["colors","data"],
                computed:{
                    pie1Data:function(){
                        return this.getPieData(0,102);
                    },
                    pie1Total:function(){
                        var sum = 0;
                        var dataset = this.data.datasets[0];
                        if(dataset){
                            var sum = 0;
                            dataset.forEach(function(val) {
                                sum += val;
                            }, this);
                        }
                        return sum;
                    }
                }
            },
            indexIndicator:{
                props:["unit","val","max","min","label"],
                template:'<div>\
                    <div class="indicator-body">\
                        <i class="pointer" :style="{transform:transform}"></i>\
                        <span class="min">{{min}}</span>\
                        <span class="max">{{max}}{{unit}}</span>\
                    </div>\
                    <h5>{{label}}</h5>\
                </div>',
                data:function(){
                    return {
                        _chart:false
                    }
                },
                mounted:function(){
                },
                computed:{
                    transform:function(){
                        var deg = (-130 + (this.val / this.max) * 260);
                        return "rotate(" + deg + "deg)";
                    }
                }
            },
            indexBar:{
                props:["data","dataAxis"],
                template:"<div style='height:100%;' ref='container' class='cig-echart'></div>",
                data:function(){
                    return {
                        _chart:false
                    }
                },
                watch:{
                    data:function(){
                        this.update();
                    }
                },
                mounted:function(){
                    this.update();
                },
                methods:{
                    update:function(){
                        if(!this._chart){
                            var dom = this.$refs.container;
                            var chart = echarts.init(dom);
                            this._chart = chart;
                        }
                        var yMax = 100;
                        var dataShadow = [];
                        for (var i = 0; i < this.data.length; i++) {
                            yMax = Math.max(yMax,this.data[i]);
                        }
                        yMax = Math.ceil(yMax / 10)*10;
                        for (var i = 0; i < this.data.length; i++) {
                            dataShadow.push(yMax);
                        }
                        this._chart.setOption({
                            title:{
                                show:false,
                            },
                            xAxis: {
                                data: this.dataAxis,
                                axisLabel: {
                                    inside: false,
                                    textStyle: {
                                        color: '#363636'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                },
                                z: 10
                            },
                            yAxis: {
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            series: [
                                {
                                    type: 'bar',
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(
                                                0, 0, 0, 1,
                                                [
                                                    {offset: 0, color: '#83bff6'},
                                                    {offset: 0.5, color: '#188df0'},
                                                    {offset: 1, color: '#188df0'}
                                                ]
                                            )
                                        },
                                        emphasis: {
                                            color: new echarts.graphic.LinearGradient(
                                                0, 0, 0, 1,
                                                [
                                                    {offset: 0, color: '#2378f7'},
                                                    {offset: 0.7, color: '#2378f7'},
                                                    {offset: 1, color: '#83bff6'}
                                                ]
                                            )
                                        }
                                    },
                                    data: this.data
                                }
                            ]
                        });
                    }
                }
            }
        }
    };

    var vm = new Vue({
        el:"#main",
        mixins:[components],
        data:{
            changxingMap:"json!"+require.toUrl("./parent/mapjson/changxing.json"),
            xz:null,
            tableExpand:false,
            data:{}
        },
        mounted:function(){
            this.selectItem(null);
        },
        methods:{
            cellclick:function(cell){
                if(cell.column.field == "num1" && (cell.row.name == "雉城街道" || this.xz == "雉城街道")){
                    window.open("./syrk/index.html?dep=1143492092887040","_blank");
                }
            },
            toggle:function(){
                this.tableExpand = !this.tableExpand;
            },
            close:function(){
                this.tableExpand = false;
            },
            selectItem:function(item){
                this.xz = item;
                var self = this;
                var url = require.toUrl("./home/data/"+ encodeURIComponent(!this.xz ? "长兴" : this.xz) + ".json");
                require(["json!"+url],function(res){
                    self.$set(self,"data",res);
                });
            },
            selectRoot:function(){
                this.selectItem(null);
                this.$refs.map.resetSelect();
            }
        },
        computed:{
            tableRows:function(){
                var rows = [];
                if(this.data.table){
                    return this.data.table.map(function(row){
                        return {
                            name:row[0],
                            num1:row[1],
                            num2:row[2],
                            num3:row[3],
                            num4:row[4],
                            num5:row[5],
                            num6:row[6],
                            num7:row[7],
                            num8:row[8],
                            num9:row[9],
                        }
                    })
                }
                return rows;
            }
        }
    })
});