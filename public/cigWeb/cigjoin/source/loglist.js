define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueTable',
    'breadcrumb',
    'vueTableFilter',
    'vueBsPop'
], function (require, Vue, config, $,table,breadcrumb) {
    'use strict';
    var query = config.getQueryParams();
    var tableHelper = table.helper;
    var sourceid = query.sourceid;
    
    breadcrumb.items.push({
        text:"数据源管理",
        url:"/cigWeb/cigjoin/source/list.html"
    });
    breadcrumb.items.push({
        text:"数据抽取日志",
    });

    //var popLog = "logContent";
    var tableVm = new Vue({
        data: {
            sourceid:sourceid,
            //设置快速查询项
            filters: [
                //支持直接设定options
                {
                    name: "accessStyle",
                    text: "来源方式",
                    all: true,
                    allItem: { text: "全部", value: "" },
                    type: "options",
                    options: [
                        { text: "Excel导入", value: "10" },
                        { text: "页面抓取", value: "20" },
                        { text: "数据库集成", value: "30" },
                    ]
                }
            ],
            //设置快速查询项的默认值
            filter: {
                accessStyle: ""
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: {
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns: [
                // {
                //     id:"add",
                //     name:"新增",
                //     enableClass:"btn-danger",
                //     visible:true
                // }
            ],
            //设置列表的关键字查询
            keyword: "",
            //设置列表的参数，是否显示多选列
            tableConfig: {
                checkbox: false
            },
            //设置列表的列
            tableColumns: [
                {
                    title: '数据源名称',
                    field: 'datasourceName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span><a :href="\'detail.html?id=\'+row.dataSourceManagerId" target="_blank">{{row.datasourceName}}</a></span>',
                },
                {
                    title: '运行开始时间',
                    field: 'startTime',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '运行结束时间',
                    field: 'endTime',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '影响记录数',
                    field: 'recordAffected',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '运行描述',
                    field: 'runDes',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '完成状态',
                    field: 'endStatus',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("endStatus", "cigdsendstate")
                },
                {
                    title: '日志',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template: '<span><a href="javascript:;" @click="showLog">查看</a></span>',
                        methods: {
                            showLog: function () {
                                tableVm.showLog(this.row.id);
                            }
                        }
                    },
                }
            ],
            tableAjaxOptions: {
            },
            popLog: ""
        },
        mounted: function () {
            this.doSearch();
        },
        methods: {
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions: function () {
                this.tableAjaxOptions = {
                    type: "get",
                    data: {
                        keyword: this.keyword,//关键字参数
                        accessStyle: this.filter.accessStyle,
                        sourceid: this.sourceid
                        // filter:JSON.stringify(this.filter)//通用查询项的参数
                    },
                    url: config.backendurl + "/agg/datasourceServiceLogList"
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            showLog: function (logId) {
                if (logId) {
                    this.$refs.pop.show();
                    $.ajax({
                        url: config.backendurl + "/agg/datasourceServiceLogGetObj",
                        data: {
                            id: logId
                        },
                        success: this.getLogSuccess.bind(this),
                        error: this.getLogError.bind(this)
                    })
                }
            },
            getLogSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "popLog", res.data.runDetail);
                }
                else {
                    this.getLogError();
                }
            },
            getLogError: function () {
                this.$set(this, "popLog", "获取日志详情失败！");
            },
            hide: function () {
                this.$refs.pop.hide();
            }
        }

    });
    return function (listEl) {
        tableVm.$mount(listEl);
    }
});