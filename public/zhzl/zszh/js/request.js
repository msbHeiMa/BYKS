define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
    'vueBsTab'
], function(require, Vue, $, systemConfig, form, table) {
    'use strict';
    var moduleName = systemConfig.getQueryParams().module;
    var tableHelper = table.helper;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            btns: false,
            columns: {
                "unfinishedMain": [
                    {
                        title: '序号',
                        field: 'RN',
                        formatter: function(value, row, index) {
                            return index + 1;
                        },
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '姓名',
                        field: 'name',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<a target="_blank" :href="\'peopleDetailNew.html?JSBId=\'+row.JSBId">{{row.name}}</a>',
                        // group: "基本信息"
                    },
                    {
                        title: '公民身份号码',
                        field: 'cardNum',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // group: "基本信息"
                    },
                    // {
                    //     title: '出生年月',
                    //     field: 'birthDate',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     group: "基本信息"
                    // },
                    // {
                    //     title: '性别',
                    //     field: 'gender',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: tableHelper.getDomainDisplayComponent("gender", "gender"),
                    //     group: "基本信息"
                    // },
                    {
                        title: '申请项',
                        field: 'funmodelName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // component: {
                        //     components: {
                        //         "dangerRankcomponent": tableHelper.getDomainDisplayComponent("funmodelName", "dangerRank"),
                        //         "manageLevelcomponent": tableHelper.getDomainDisplayComponent("funmodelName", "manageLevel"),
                        //     },
                        //     template: "<span>\
                        //     <dangerRankcomponent v-if='row.name==\"危险等级\"' :row='row'></dangerRankcomponent>\
                        //     <manageLevelcomponent v-if='row.name!=\"管理等级\"' :row='row'></manageLevelcomponent>\
                        //     </span>"
                        // }
                    },
                    // {
                    //     title: '变更前',
                    //     field: 'originalLevel',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: tableHelper.getDomainDisplayComponent("dangerRank", "dangerRank"),
                    //     group: "申请等级"
                    // },
                    // {
                    //     title: '变更后',
                    //     field: 'finalLevel',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: tableHelper.getDomainDisplayComponent("finalLevel", "finalLevel"),
                    //     group: "申请等级"
                    // },
                    // {
                    //     title: '申请变更原因',
                    //     field: 'adjustmentReason',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     group: "申请等级"
                    // },
                    {
                        title: '申请人',
                        field: 'a4sysuserUserName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // group: "申请人"
                    },
                    {
                        title: '申请人岗位',
                        field: 'pName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // group: "申请人"
                    },
                    {
                        title: '申请时间',
                        field: 'applicantTime',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<span>{{row.applicantTime && row.applicantTime.substr(0,10)}}<span>",
                    },
                    // {
                    //     title: '操作',
                    //     field: 'operation',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: '<span v-if="row.funmodelName==`危险性评估等级变更`"><a target="_blank" :href="\'requestDetailDanger.html?funmdataID=\'+row.funmdataID +\'&sn=\'+row.sn">办理</a>|<a target="_blank" :href="\'status.html?JSBId=\'+row.JSBId">状态</a></span>     <span v-else-if="row.funmodelName==`管理等级变更`"><a target="_blank" :href="\'requestDetailManage.html?funmdataID=\'+row.funmdataID +\'&sn=\'+row.sn">办理</a>|<a target="_blank" :href="\'status.html?JSBId=\'+row.JSBId">状态</a></span>     <span v-else><a target="_blank" :href="\'requestDetailAdd.html?funmdataID=\'+row.funmdataID +\'&sn=\'+row.sn">办理</a>|<a target="_blank" :href="\'status.html?JSBId=\'+row.JSBId">状态</a></span>',
                    // }
                    {
                        title: '操作',
                        field: 'operation',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<span v-if="row.funmodelName==\'肇事肇祸危险级别变更\'"><a target="_blank" :href="\'requestDetailDanger.html?funmdataID=\'+row.funmdataID +\'&sn=\'+row.sn">办理</a></span>  <span v-else-if="row.funmodelName==\'肇事肇祸管理级别变更\'"><a target="_blank" :href="\'requestDetailManage.html?funmdataID=\'+row.funmdataID +\'&sn=\'+row.sn">办理</a></span>   <span v-else><a target="_blank" :href="\'requestDetailAdd.html?funmdataID=\'+row.funmdataID +\'&sn=\'+row.sn">办理</a></span>',
                    }
                    ],
                "finishedMain": [
                    {
                        title: '序号',
                        field: 'RN',
                        formatter: function(value, row, index) {
                            return index + 1;
                        },
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '姓名',
                        field: 'name',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<a target="_blank" :href="\'peopleDetailNew.html?JSBId=\'+row.JSBId">{{row.name}}</a>',
                        // group: "基本信息"
                    },
                    {
                        title: '公民身份号码',
                        field: 'cardNum',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // group: "基本信息"
                    },
                    // {
                    //     title: '出生年月',
                    //     field: 'birthDate',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     group: "基本信息"
                    // },
                    // {
                    //     title: '性别',
                    //     field: 'gender',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: tableHelper.getDomainDisplayComponent("gender", "gender"),
                    //     group: "基本信息"
                    // },
                    {
                        title: '申请项',
                        field: 'funmodelName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // component: {
                        //     components: {
                        //         "dangerRankcomponent": tableHelper.getDomainDisplayComponent("funmodelName", "dangerRank"),
                        //         "manageLevelcomponent": tableHelper.getDomainDisplayComponent("funmodelName", "manageLevel"),
                        //     },
                        //     template: "<span>\
                        //     <dangerRankcomponent v-if='row.name==\"危险等级\"' :row='row'></dangerRankcomponent>\
                        //     <manageLevelcomponent v-if='row.name!=\"管理等级\"' :row='row'></manageLevelcomponent>\
                        //     </span>"
                        // }
                    },
                    // {
                    //     title: '变更前',
                    //     field: 'originalLevel',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: tableHelper.getDomainDisplayComponent("dangerRank", "dangerRank"),
                    //     group: "申请等级"
                    // },
                    // {
                    //     title: '变更后',
                    //     field: 'finalLevel',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: tableHelper.getDomainDisplayComponent("finalLevel", "finalLevel"),
                    //     group: "申请等级"
                    // },
                    // {
                    //     title: '申请变更原因',
                    //     field: 'adjustmentReason',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     group: "申请等级"
                    // },
                    {
                        title: '申请人',
                        field: 'a4sysuserUserName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // group: "申请人"
                    },
                    {
                        title: '申请人岗位',
                        field: 'pName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // group: "申请人"
                    },
                    {
                        title: '申请时间',
                        field: 'applicantTime',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<span>{{row.applicantTime && row.applicantTime.substr(0,10)}}<span>",
                    },
                    // {
                    //     title: '审核时间',
                    //     field: 'applicantTime',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true
                    // },
                    
                    {
                        title: '审核状态',
                        field: 'operation',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // component: '<span v-if="row.actionName==\'APPROVE\'"><a target="_blank" :href="\'requestStatus.html?funmdataID=\'+row.funmdataID">同意</a></span><span v-else><a target="_blank" :href="\'requestStatus.html?funmdataID=\'+row.funmdataID">驳回</a></span>',
                        component: '<span ><a target="_blank" :href="\'requestStatus.html?funmdataID=\'+row.funmdataID">查看</a></span>',
                    }],
            },
            tabs: {
                rqTabs: [
                    { text: "  待办  ", name: "unfinishedMain" },
                    { text: "  已办  ", name: "finishedMain" }
                ]
            },
            undoAjaxOptions: {},
            doneAjaxOptions: {},
            // unfinishedRow: [],
            // finishedRow: [],
        },
        mounted: function() {
            // this.loadUnfinishedTable();
            // this.loadFinishedTable();
            this.undoAjaxOptions = {
                url: systemConfig.backendurl + "/zszh/queryUndoPro",
                data: {
                    // id:this.id
                },
                type: "get",
                // "success": this.getTableSuccess.bind(this),
                //     "error": this.getTableError.bind(this),
            };
            this.doneAjaxOptions = {
                url: systemConfig.backendurl + "/zszh/queryDone",
                data: {
                    // id:this.id
                },
                type: "get",
                // "success": this.getTableSuccess.bind(this),
                //     "error": this.getTableError.bind(this),
            };
        },
        methods: {
            //tab键
            rqTabSelect: function(tab) {
                var type = tab.name;
            },
            // loadUnfinishedTable: function() {
            //     var options = {
            //         "url": systemConfig.backendurl + "/zszh/queryUndoPro",
            //         data: {
            //             // JSBId: this.JSBId
            //         },
            //         type: "get",
            //         "success": this.getTableSuccess.bind(this),
            //         "error": this.getTableError.bind(this),
            //     };
            //     $.ajax(options);
            // },

            // getTableSuccess: function(res) {
            //     if (res.success) {
            //         this.$set(this, "unfinishedRow", res.data.rows);
            //     }
            //     else {
            //         this.getTableError(res);
            //     }
            // },
            // getTableError: function(res) {
            // },
            // loadFinishedTable: function() {
            //     var options = {
            //         "url": systemConfig.backendurl + "/zszh/queryDonePro",
            //         data: {
            //         },
            //         type: "get",
            //         "success": this.getFinishedTableSuccess.bind(this),
            //         "error": this.getFinishedTableError.bind(this),
            //     };
            //     $.ajax(options);
            // },

            // getFinishedTableSuccess: function(res) {
            //     if (res.success) {
            //         this.$set(this, "finishedRow", res.data.rows);
            //     }
            //     else {
            //         this.getFinishedTableError(res);
            //     }
            // },
            // getFinishedTableError: function(res) {
            // },
        }
    })
});