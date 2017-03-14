define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
    'vueBsTab',
    'vueAlert',
    'vueBsPop',
    'vueBsTreeview',
    'vueDomainPool',
    'vueTableFilter',
], function (require, Vue, $, systemConfig, form, table, alert) {
    'use strict';
    // var formHelper = form.helper;
    // var tableHelper = table.helper;
    var role = systemConfig.getRole();
    var moduleName = systemConfig.getQueryParams().module;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            btns: false,
            role: role,
            fields: {
                //带出信息
                main: [
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                    { label: "现住门（楼）详址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                    { label: "随访周期", name: "visitCyc", type: "display", colSpan: 1 },
                    { label: "危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1},
                    { label: "目前危险性评估等级", name: "originalLevel", type: "display", domainName: "dangerRank", colSpan: 1 },
                    { label: "申请危险性评估等级", name: "finalLevel", type: "display", domainName: "dangerRank", colSpan: 1 },
                    { label: "申请原因", name: "adjustReason", type: "display", colSpan: 2 },
                    { label: "审核意见", name: "comments", type: "textarea", colSpan: 2 },
                ],
            },
            //基本信息
            mainInfo: {
                cardNum: null,
                name: null,
                dangerRank: null,
                manageLevel: null,
                visitCyc: null,
                finalLevel: null,
                adjustReason: null,
                rAddr: null,
                comments:null,
            },
        },
        mounted: function () {
            var funmdataID = systemConfig.getQueryParams().funmdataID;
            this.funmdataID = funmdataID;
            if (funmdataID) {
                this.loadTabs();
            }
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
            }
            var sn = systemConfig.getQueryParams().sn;
            this.sn = sn;
        },
        methods: {
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/getUndoLevelProMsg",
                    data: {
                        levelId: this.funmdataID,
                        // cigrole: this.cigrole
                    },
                    type: "get",
                    "success": this.getTabsSuccess.bind(this),
                    "error": this.getTabsError.bind(this),
                };
                $.ajax(options);
            },
            getTabsSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "mainInfo", res.data);
                }
                else {
                    this.getTabsError(res);
                }
            },
            getTabsError: function() {
            },/**基础信息end*/
            /**保存*/
            save: function() {
                this.beforSave();
            },
            beforSave: function() {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/processExecute",
                    data: {
                        "sn": this.sn,
                        "action": "同意",
                        "comments": this.mainInfo.comments,
                    },
                    type: "post",
                    success: this.Success.bind(this),
                    error: this.Error.bind(this),
                });
            },
            back: function() {
                this.beforBack();
            },
            beforBack: function() {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/processExecute",
                    data: {
                        "sn": this.sn,
                        "action": "驳回",
                        "comments": this.mainInfo.comments,
                    },
                    type: "post",
                    success: this.Success.bind(this),
                    error: this.Error.bind(this),
                });
            },
            Success: function(res) {
                if (res.success) {
                    art.dialog({
                        title: "提示",
                        content: "操作成功！",
                        //以“skins/icons/”目录下的图标名作为参数名（不包含后缀名）
                        icon: "succeed",
                        lock: true,//是否锁定屏幕，默认是false
                        fixed: true,//静止在浏览器某个地方不动，不受滚动条拖动影响
                        time: 2000,//如果有cancel方法的话会调用cancel方法
                    });
                    setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                        window.location.href = 'request.html';//页面刷新
                    }, 1000);
                }
            },
            Error: function(res) {
                if (res) {
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
        }
    });
});
