{% extends '../parent/layoutvue.tpl' %} 
{% block title %}人口管理{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="./css/index.css">
{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

{% raw %}
<div class="content-wrapper full-page" id="main" v-cloak>
    <div class="height100">
        <div class="top index-filter" :style="{height:!isopen?'100%':'400px'}">
            <div :class="{dropdown:true,clearfix:true,open:dropopen}" style="z-index: 2000;">
                <button style="position: absolute;right: 10px;top: 10px;" class="btn btn-default dropdown-toggle" @click="toggleFilter"
                    type="button" aria-haspopup="true" aria-expanded="true">
                    筛选
                    <span class="caret"></span>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <bs-tab :tabs="[{name:'syrk',text:'实有人口'}]">
                        <div slot="syrk">
                            <cig-table-filter ref="filter"
                                :filters="syrk.filters" 
                                v-model="syrk.cacheFilter">
                            </cig-table-filter>
                            <div class="box-footer" style="text-align: center">
                                <button type="button" class="btn btn-danger" @click="resetFilter">重置</button>
                                <button type="button" class="btn btn-primary" @click="applyFilter">确定</button>
                            </div>
                        </div>
                    </bs-tab>
                </div>
            </div>
            <cig-dep-map ref="map" :map="map" @itemclick="mapClick" :random-color="false"></cig-dep-map>
        </div>
        <div class="index-bottom" :style="height != null ? {height:height} : {}">
            <div class="operate-btns">
                <button v-if="isopen" class="resize-btn" @click="nextStep"></button>
                <button v-if="isopen" class="close-btn" @click="close"></button>
                <button v-if="!isopen" class="open-btn" @click="open"></button>
            </div>
            <bs-tab v-if="isopen" :tabs="[{name:'chart',text:'统计图'},{name:'table',text:'列表'}]">
                <div slot="chart" class="row" >
                    <div class="col-lg-7 height100">
                        <rk-bar :data="{labels:deps,datasets:[hjrkData,lrrkData]}"></rk-bar>
                        <!--<cig-chart ref="chartType" :data="{
                                    labels:deps,
                                    datasets:(syrk.filter.type && syrk.filter.type.constructor == Array && syrk.filter.type.length == 1) ? 
                                        (syrk.filter.type.indexOf('1') >= 0 
                                        ? [
                                            {label:'户籍人口',backgroundColor:'#46BFBD',data:hjrkData}
                                        ]
                                        : [
                                            {label:'流入人口',backgroundColor:'#F7464A',data:lrrkData},
                                        ] )
                                    : [
                                        {label:'户籍人口',backgroundColor:'#46BFBD',data:hjrkData},
                                        {label:'流入人口',backgroundColor:'#F7464A',data:lrrkData},
                                    ]
                                }"
                            type="bar" 
                            width='260' height="100"
                            :options='{
                                    title:{
                                        display:true,
                                        text:"人口信息统计"
                                    },
                                    tooltips: {
                                        mode: "label"
                                    },
                                    responsive: true,
                                    scales: {
                                        xAxes: [{
                                            stacked: true,
                                        }],
                                        yAxes: [{
                                            stacked: true
                                        }]
                                    }
                                }'>
                        </cig-chart>-->
                    </div>
                    <div class="col-lg-5 height100">
                        <rk-pie :data="{labels:[syrkAgeLabel,syrkAgeLabel1],datasets:[syrkAgeData,syrkAgeData1]}"></rk-pie>
                        <!--<cig-chart ref="chartAge" :data="{
                                    labels:deps,
                                    datasets:[
                                        {
                                            data:syrkAgeData,
                                            backgroundColor: [
                                                '#F7464A',
                                                '#46BFBD',
                                                '#FDB45C',
                                                '#949FB1',
                                                '#4D5360',
                                                '#7FAA95',
                                                '#C59647',
                                            ],
                                        }
                                    ],
                                    labels:syrkAgeLabel
                                }" 
                            type="pie" 
                            width='130' height="100"
                            :options='{
                                    title:{
                                        display:true,
                                        text:"人口年龄统计"
                                    },
                                    tooltips: {
                                        mode: "label"
                                    },
                                    responsive: true,
                                    scales: {
                                    }
                                }'>
                        </cig-chart>-->
                    </div>
                </div>
                <div slot="table">
                    <div class="bootstrap-table">
                        <div class="fixed-table-toolbar clearfix">
                            <div class="bs-bars pull-left cig-bars">
                            </div>
                            <div class="columns columns-right btn-group pull-right">
                            </div>
                            <div class="pull-right search" style="width: 300px;">
                                <div class="input-group">
                                    <input class="form-control" v-model="syrk.keyword" @keyup.enter="doSearch()" type="text" placeholder="搜索">
                                    <span class="input-group-btn"> 
                                        <button class="btn btn-default" type="button" @click="doSearch()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button> 
                                    </span> 
                                </div>
                            </div>
                        </div>
                        <cig-table 
                            :config="{checkbox:false}"
                            :columns="syrk.columns"
                            :ajax-options="syrk.ajaxOptions">
                        </cig-table>
                    </div>
                </div>
            </bs-tab>
        </div>
    </div>
</div>
{% endraw %}
{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "人口管理";
    requirejs([
        '{{static}}zhzl/syrk/index.js'], function () {
    });
</script>
{% endblock %}