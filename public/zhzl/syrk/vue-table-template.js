define([
    'require',
    'vue',
    'vueTableFilter',
    'vueTable',
    'vueArea',
    'vueBsTreeview',
], function(require, Vue) {
    'use strict';
    new Vue({
        el:"#mainTable",
        data:{
            //设置快速查询项
            filters:[
                //支持设定辖区
                {
                    name:"dep",
                    text:"辖区",
                    type:"custom",
                    component:'<cig-ajax-area\
                        :ajax-options="data.ajaxOptions" \
                        v-model="valueProxy" \
                        :value="valueProxy" \></cig-ajax-area>',
                    //设定辖区取值接口，通过设定不同接口，显示不同的数据
                    ajaxOptions:{
                        type:"get",
                        url:"/area.json"
                    }
                },
                //支持直接设定options
                {
                    name:"gender",
                    text:"性别",
                    all:true,
                    type:"options",
                    options:[
                        {text:"男",value:"01"},
                        {text:"女",value:"02"},
                    ]
                },
                //支持设定domain name
                {
                    name:"hunyin",
                    text:"婚姻",
                    all:true,
                    allItem:{text:"不限",value:""},
                    type:"domain",
                    domainName:"ABC",
                    options:[]
                },
                //支持设定其他自定义控件
                {
                    name:"tree3",
                    text:"tree",
                    type:"custom",
                    component:'<bs-treeview \
                        :data="data.tree" \
                        value-path="id" \
                        @input="input" \
                        v-model="valueProxy" \
                        :value="valueProxy" \
                        node-component="<span>{{item.name}}</span>" \
                        ></bs-treeview>',
                    tree:[
                        {
                            id:1,
                            name:"test",
                            nodes:[
                                {
                                    id:2,
                                    name:"test2",
                                    nodes:[

                                    ]
                                },
                                {
                                    id:3,
                                    name:"test3",
                                    nodes:[

                                    ]
                                }
                            ]
                        },
                    ]
                },
            ],
            //设置快速查询项的默认值
            filter:{
                gender:"01",
                hunyin:"02",
                tree3:2,
                dep:null
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions:{
                url:"/domains.json",
                type:"get"
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns:[
                {
                    id:"query",
                    name:"查询",
                    enableClass:"btn-danger"
                },
                {
                    id:"delete",
                    name:"删除",
                    enableClass:"btn-danger"
                }
            ],
            //设置列表的关键字查询
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:true
            },
            //设置列表的列
            tableColumns:[
                //普通列
                {
                    title: '学校名称',
                    field: 'schoolName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                //控件列
                {
                    title: '安全负责人/联系方式',
                    field: 'manager',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<input v-model="row.manager">',
                },
                //控件列，包括操作的方法
                {
                    title: '是否关注',
                    field: 'isFocus',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template:'<input type="checkbox" v-model="row.isFocus" @change="change"></checkbox>',
                        methods:{
                            "change":function(){
                                var row = this.row;
                                alert("changed:"+row.manager+","+row.isFocus);
                            }
                        }
                    },
                },
                //自定义显示列
                {
                    title: '警示范围（米）',
                    field: 'safetyRange',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span>{{row.safetyRange}}(米)</span>',
                },
                {
                    title: '所属乡镇',
                    field: 'areaName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                }
            ],
            tableAjaxOptions:{
            }
        },
        mounted:function(){
            this.doSearch();
        },
        methods:{
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions:function(){
                this.tableAjaxOptions = {
                    type:"post",
                    data:{
                        keyword:this.keyword,//关键字参数
                        filter:JSON.stringify(this.filter)//通用查询项的参数
                    },
                    "url":"/zhzlBackend/rest/1"
                }
            },
            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
            //按钮方法
            executeCommand:function(command){
                var func = "command"+command.substr(0,1).toUpperCase()+command.substr(1);
                if(this[func]){
                    this[func]();
                }
            },
            commandQuery:function(){
                alert(1);
            },
            commandDelete:function(){
                alert(2);
            }
        }
    })
});