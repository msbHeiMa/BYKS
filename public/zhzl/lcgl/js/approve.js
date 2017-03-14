define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueTable',
    'vueBsTable',
    'vueBsTab',
    'vueTableFilter',
    'vueArea',
    'vueBsPop',
], function (require, Vue, $, systemConfig, table) {
    'use strict';
    var moduleName = systemConfig.getQueryParams().module;
    var tableHelper = table.helper;
    var role = systemConfig.getRole();
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            fields: {


            },
            //支持设定辖区
            filters: [
                {
                    name: "dep",
                    text: "辖区",
                    type: "custom",
                    component: '<cig-ajax-area\
                        :ajax-options="data.ajaxOptions" \
                        @input="input" \
                        v-model="valueProxy" \
                        empty-text="请选择" \
                        :value="valueProxy" \></cig-ajax-area>',
                    ajaxOptions: {
                        type: "get",
                        "url": systemConfig.backendurl + "/system/queryUserDataDep"
                    },
                },
            ],
            filter: {
                dep: null,
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: false,
            tableConfig: {
                "kpzyh": { checkbox: false},
                "jsxyh": { checkbox: false },
            },
            columns: {
                "kpzyh": [
                    {
                        title: '操作',
                        field: 'operate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: {
                            template: '<span><a class="create btn btn-link btn-xs" href="javascript:void(0)" title="Create" @click="create(row)"><i class="fa fa-plus" style="color:#3c8dbc"></i>保存</a></span>',
                            methods: {
                                create: function (row) {
                                    $.ajax({
                                        type: "post",
                                        data: { 
                                            rId:detailVm.rId,
                                            userId:row.userId,
                                            ssdwbm:row.ssdwbs,
                                            status:"1",
                                            des:row.des,
                                         },
                                        url: zhzlconfig.backendurl + "/lcgl/approverCreate",
                                        success: function (result) {
                                            if (result.data.canshu=="数据已存在") {
                                                warningVm.show()
                                                warningVm.loadData(result)
                                            } else if(result.success){
                                                successVm.show()
                                                detailVm.doSearch_jsxyh();
                                            }else{
                                                failureVm.show()
                                            }
                                        }
                                    });
                                },

                            }
                        },
                    },
                    {
                        title: '用户名称',
                        field: 'userName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,

                    },
                    {
                        title: '用户ID',
                        field: 'userId',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '用户所属单位编码',
                        field: 'departmentId',
                        align: 'center',
                        valign: 'middle',
                    },
                     
                ],
                "jsxyh": [
                     {
                        title: '操作',
                        field: 'operate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: {
                            template: '<span><a class="remove btn btn-link btn-xs" :id=row.nodeId href="javascript:void(0)" title="Remove" @click="remove(row)"><i class="fa fa-close" style="color:#f56954"></i>删除</a></span>',
                            methods: {
                                remove: function (row) {
                                    $.ajax({
                                        type: "post",
                                        data: { id: row.id },
                                        url: zhzlconfig.backendurl + "/lcgl/approverDelete",
                                        success: function (result) {
                                            if (result.success) {
                                                successVm.show()
                                                detailVm.doSearch_jsxyh();
                                            } else {
                                                failureVm.show()
                                            }
                                        }
                                    });
                                },

                            }
                        },
                    },
                    {
                        title: '角色名称',
                        field: 'roleName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '用户名称',
                        field: 'userName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,

                    },
                    {
                        title: '用户ID',
                        field: 'userId',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '所属单位名称',
                        field: 'departmentName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '状态',
                        field: 'status',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component:'<span>{{(row.status==0)?"禁用":"启用"}}</span>'
                    },
                    {
                        title: '说明',
                        field: 'des',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '创建人ID',
                        field: 'createUser',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '创建日期',
                        field: 'createDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                   
                    {
                        title: 'id',
                        field: 'id',
                        align: 'center',
                        valign: 'middle',
                    },
                ],

            },
            tabs: {
                kpzyhTabs: [
                    { text: "可配置用户信息", name: "kpzyh" },
                ],
                jsxyhTabs: [
                    { text: "角色下用户信息", name: "jsxyh" },
                ],
            },
            btns_kpzyh: [
                {
                    id: "back",
                    name: "  返  回   ",
                    enableClass: "btn-defalut",

                }
            ],
            keyword_jsxyh: "",
            keyword_kpzyh: "",
            //角色下用户信息
            kpzyh: $.extend([], { load: false }),
            //可配置用户信息
            jsxyh: $.extend([], { load: false }),
            rkAjaxOptions: {

                "jsxyh": {
                    type: "get",
                    data: {
                    },
                    "url": systemConfig.backendurl + "/lcgl/approverQueryList",
                },
                "kpzyh": {
                    type: "get",
                    data: {
                    },
                    "url": systemConfig.backendurl + "/lcgl/approverUserList",
                },
            },
            tableAjaxOptions_jsxyh: {},
            tableAjaxOptions_kpzyh: {},
            id: null
        },
        mounted: function () {
            var rId = systemConfig.getQueryParams().id;
            this.rId = rId;
            if (rId) {
                this.doSearch_jsxyh();
                this.doSearch_kpzyh();
            };
        },
        methods: {
            doSearch_jsxyh: function () {
                var defOptions = this.rkAjaxOptions["jsxyh"];
                var options_jsxyh = $.extend({}, defOptions)
                options_jsxyh.data = $.extend({ rId: this.rId, userName: this.keyword_jsxyh, }, options_jsxyh.data);
                this.tableAjaxOptions_jsxyh = options_jsxyh
            },
            doSearch_kpzyh: function () {
                var defOptions = this.rkAjaxOptions["kpzyh"];
                var options_kpzyh = $.extend({}, defOptions)
                options_kpzyh.data = $.extend({ departmentId:this.filter.dep, userName: this.keyword_kpzyh, }, options_kpzyh.data);
                //departmentId:this.filter.dep
                this.tableAjaxOptions_kpzyh = options_kpzyh
            },
            // rkTabSelect: function (tab) {
            //     var type = tab.name;
            //     var data = this;
            //     if (data[type] && data[type].load === false) {
            //         this.loadRk(type);
            //     }
            // },
            // loadRk: function (type) {
            //     var defOptions = this.rkAjaxOptions[type];
            //     var options_jsxyh = $.extend({
            //     }, defOptions)
            //     options_jsxyh.data = $.extend({ rId: this.rId }, options_jsxyh.data);
            //     var options_kpzyh = $.extend({
            //     }, defOptions)
            //     options_kpzyh.data = $.extend({ departmentId:this.filter.dep }, options_kpzyh.data);
            //     if (type == "jsxyh") {
            //         this.tableAjaxOptions_jsxyh = options_jsxyh
            //     } else if (type == "kpzyh") {
            //         this.tableAjaxOptions_kpzyh = options_kpzyh
            //     }
            // },
            executeCommand: function (command) {
                var func = "command" + command.substr(0, 1).toUpperCase() + command.substr(1);
                if (this[func]) {
                    this[func]();
                }
            },
            commandBack: function () {
                window.history.back(-1);
            },
        }
    })
     var warningVm = new Vue({
        el: "#warning",
        data:{
            message:"",
        },
        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.hide();
            },
            loadData:function(result){
                this.message=result.data.userName+"已被添加为"+result.data.roleName+"角色"
            },
        }
    });
    var successVm = new Vue({
        el: "#success",
        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.hide();
                
            },
        }
    });
    var failureVm = new Vue({
        el: "#failure",
        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.hide();
            },
        }
    });
});