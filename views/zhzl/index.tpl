{% extends 'parent/layoutvuebase.tpl' %} 
{% block title %}首页{%endblock%}
{% block style %} 
<link rel="stylesheet" href="./home/css/index.css">
{% endblock %} 

{% block content_wrap %}

    {% raw %}
    <div class="index-main-wrap" id="main" v-cloak>
        <div class="index-top-bar">
            <ul class="clearfix">
                <li class="item-accept">
                    <i></i>
                    <div>
                        <p>受理事项</p>
                        <p class="cnt"><span>23348</span>项</p>
                    </div>
                </li>
                <li class="item-done">
                    <i></i>
                    <div>
                        <p>办结事项</p>
                        <p class="cnt"><span>7299</span>项</p>
                    </div>
                </li>
                <li class="item-wait">
                    <i></i>
                    <div>
                        <p>待办事项</p>
                        <p class="cnt"><span>452</span>项</p>
                    </div>
                </li>
                <li class="item-expired">
                    <i></i>
                    <div>
                        <p>逾期事项</p>
                        <p class="cnt"><span>45</span>项</p>
                    </div>
                </li>
            </ul>
            <div class="index-top-notice">
                <h5>通知公告</h5>
                <p>长兴县拟提拔任用县管理领导干部任前公告！</p>
            </div>
        </div>
        <div class="index-middle-wrap">
            <div class="left-bar">
                <h5>我的工作</h5>
                <ul>
                    <li class="bar-done">
                        <span>465</span>
                        <p>我的办理</p>
                        <div class="bootstrap-table over-table">
                            <h5>我的办理</h5>
                            <bs-table 
                                :loading="false"
                                :config="{checkbox:false}"
                                :columns="[
                                    {title: '事项名称',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '事件编号',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '环节名称',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '送办人',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '送办时间',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '办结时间',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                ]"
                                :rows="[
                                    {name:'',text:''} 
                                ]"
                                :pager="{
                                    total:465,
                                    page:1,
                                    size:10
                                }">
                            </bs-table>
                        </div>
                    </li>
                    <li class="bar-wait">
                        <span>465</span>
                        <p>我的待办</p>
                        <div class="bootstrap-table over-table">
                            <h5>我的待办</h5>
                            <bs-table 
                                :loading="false"
                                :config="{checkbox:false}"
                                :columns="[
                                    {title: '事项名称',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '事件编号',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '事件类型',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '环节名称',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '送办人',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '送办时间',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                ]"
                                :rows="[
                                    {name:'',text:''} 
                                ]"
                                :pager="{
                                    total:465,
                                    page:1,
                                    size:10
                                }">
                            </bs-table>
                        </div>
                    </li>
                    <li class="bar-expired">
                        <span>12</span>
                        <p>我的逾期</p>
                        <div class="bootstrap-table over-table">
                            <h5>我的逾期</h5>
                            <bs-table 
                                :loading="false"
                                :config="{checkbox:false}"
                                :columns="[
                                    {title: '已逾期时间',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '事项名称',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '事件编号',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '事件类型',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '环节名称',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                    {title: '送办时间',field: 'eventType',align: 'center',valign: 'middle',visible: true},
                                ]"
                                :rows="[
                                    {name:'',text:''} 
                                ]"
                                :pager="{
                                    total:12,
                                    page:1,
                                    size:10
                                }">
                            </bs-table>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="main-content">
                <div class="map-wrap">
                    <cig-dep-map :map="changxingMap" @itemclick="selectItem" :roam="false" ref="map" :random-color="false"></cig-dep-map>
                    <div class="dep-nav">
                        <span :class="{act:!xz}" @click="selectRoot">长兴县</span>
                        <template v-if="xz">
                            &gt;
                            <span class="act">{{xz}}</span>
                        </template>
                    </div>
                    <div class="dep-statistics">
                        <h5>下辖区域</h5>
                        <ul>
                            <li>乡镇：18</li>
                            <li>村/社区：244</li>
                            <li>网格：1176</li>
                        </ul>
                        <p @click="toggle">查看相关统计</p>
                    </div>
                </div>
                <div class="statistics-wrap">
                    <div class="row1">
                        <div class="circle">
                            <index-circle :data='{
                                labels:[
                                    ["流动人员","境外人员","户籍人口"]
                                ],
                                datasets:[
                                    [data.pie_ldry,data.pie_jwry,data.pie_hjrk]
                                ]
                            }'></index-circle>
                        </div>
                        <div class="counts">
                            <ul>
                                <li><span class="tit">党员</span>
                                    <span class="num">{{data.num_dy}}</span></li>
                                <li><span class="tit">出租房</span>
                                    <span class="num">{{data.num_czf}}</span></li>
                                <li><span class="tit">重点管控</span>
                                    <span class="num">{{data.num_zdgk}}</span></li>
                                <li><span class="tit">贫困户</span>
                                    <span class="num">{{data.num_pkh}}</span></li>
                                <li><span class="tit">车辆保有量</span>
                                    <span class="num">{{data.num_clbyl}}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="row2">
                        <div class="indicator">
                            <index-indicator unit="天" :val="data.num_sjpjbjsj" :max="10" :min="0" label="事件平均办结时间"></index-indicator>
                        </div>
                        <div class="indicator">
                            <index-indicator unit="%" :val="data.num_sjjal" :max="100" :min="0" label="事件结案率"></index-indicator>
                        </div>
                    </div>
                    <div class="row3">
                        <div class="bar">
                            <index-bar :data="[data.bar_mzwt,data.bar_wsjs,data.bar_jywt,data.bar_cxjs,data.bar_ncny]"
                                :data-axis="['民政问题','卫生计生','教育问题','城乡建设','农村农业']">
                            </index-bar>
                        </div>
                    </div>
                </div>
                <div :class="{'expand-table':true,'expand':tableExpand}">
                    <button type="button" class="close" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
                    <div class="bootstrap-table">
                        <bs-table @cellclick="cellclick"
                            :loading="false"
                            :config="{checkbox:false}"
                            :columns="[
                                {title: '',field: 'name',align: 'center',valign: 'middle',visible: true},
                                {title: '实有人口',field: 'num1',align: 'center',valign: 'middle',visible: true},
                                {title: '户籍人口',field: 'num2',align: 'center',valign: 'middle',visible: true},
                                {title: '流动人口',field: 'num3',align: 'center',valign: 'middle',visible: true},
                                {title: '境外人口',field: 'num4',align: 'center',valign: 'middle',visible: true},
                                {title: '党员',field: 'num5',align: 'center',valign: 'middle',visible: true},
                                {title: '出租房',field: 'num6',align: 'center',valign: 'middle',visible: true},
                                {title: '重点管控人员',field: 'num7',align: 'center',valign: 'middle',visible: true},
                                {title: '贫困户',field: 'num8',align: 'center',valign: 'middle',visible: true},
                                {title: '车辆保有量',field: 'num9',align: 'center',valign: 'middle',visible: true},
                            ]"
                            :rows="tableRows">
                        </bs-table>
                    </div>
                </div>
                <div class="description" v-if="data.desc">
                    <div class="desc-dep">
                        <img :src="data.desc.img"/>
                        <p>{{data.desc.description}}</p>
                    </div>
                    <div class="desc-manager">
                        <ul>
                            <li v-for="item in data.desc.leaders">
                                <img :src="item.img"/>
                                <h5>{{item.name}}</h5>
                                <h6>{{item.post}}</h6>
                                <p>{{item.description}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-bottom-wrap">
            <i></i>
            <ul class="clearfix">
                <li>最高人民法院关于人民法院网络司法拍卖若干</li>
                <li>最高人民法院关于行政诉讼应诉若干问题的</li>
                <li>在部分地区开展刑事案件认罪认罚从宽制度试</li>
                <li>中办、国办印发《保护司法人员依法履行</li>
                <li>国务院办公厅关于印发中国食物与营养发展纲</li>
                <li>国务院办公厅关于促进地理信息产业发展的意</li>
                <li>国务院办公厅关于转发教育部等部门特殊教育提</li>
                <li>国务院办公厅转发财政部关于调整和完善县</li>
                <li>国务院办公厅转发财政部关于调整和完善县</li>
                <li>国务院办公厅转发财政部关于调整和完善县</li>
            </ul>
            <div class="right-panel">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="法律法规搜索">
                    <div class="input-group-addon search">.</div>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="发文搜索">
                    <div class="input-group-addon search">.</div>
                </div>
            </div>
        <div>
    </div>
    {% endraw %}

{% endblock %} 

{% block script_wrap %} 
    <script type="text/javascript" src="/zhzl/parent/js/common.js"></script> 
    <script type="text/javascript" src="/zhzl/parent/js/config.js"></script> 
    {% include "parent/requireConfig.tpl" %}
  <script type="text/javascript">
        requirejs([
            'jQuery',
            'css!cssBsTreeview'], function (sample) {
            requirejs([
                'bootstrap',
                '/components/bootstrap-treeview/dist/bootstrap-treeview.min.js'
                ],function(){
                requirejs([
                    '/zhzl/parent/js/menu.js',
                    '/zhzl/parent/js/layout.js',
                    '/components/admin-lte/dist/js/app.min.js',
                    '/components/artDialog-5.0.3/artDialog.min.js'],function(){
                });
            });
        });
   </script>
   
  <script type="text/javascript">
        requirejs(['index.js'],function(){

        });
  </script>  
{% endblock %} 
