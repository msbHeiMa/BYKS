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
], function(require, Vue, $, systemConfig, form, table, alert) {
    'use strict';
    // var formHelper = form.helper;
    // var tableHelper = table.helper;
    var sfOptions = [{ text: "是", value: 1 }, { text: "否", value: 0 }];
    var ywOptions = [{ text: "有", value: 1 }, { text: "无", value: 0 }];
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
                    { label: "新增原因", name: "addReason", type: "display", domainName: "addReason", colSpan: 1 },
                    { label: "目前诊断类型", name: "attackType", type: "display", domainName: "attackType", colSpan: 1 },
                    { label: "人员现状", name: "peopleStatusQeo", type: "display", domainName: "peopleStatusQeo", colSpan: 1 },
                    { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                    { label: "随访周期", name: "visitCyc", type: "display", colSpan: 1 },
                    { label: "危险性评估等级", name: "dangerRank", type: "selected", domainName: "dangerRank", colSpan: 1 },
                    { label: "有无肇事肇祸史", name: "isCTrouble", type: "display", options: ywOptions, colSpan: 1 },
                    { label: "家庭经济情况", name: "ecoSituatio", type: "display", domainName: "ecoSituatio", colSpan: 1 },
                    { label: "是否纳入低保", name: "isEfficiency", type: "display", options: sfOptions, colSpan: 1 },
                    { label: "监护人姓名", name: "guarderName", type: "display", colSpan: 1 },
                    { label: "与当事人关系", name: "relationship", type: "display", colSpan: 1 },
                    { label: "监护人联系方式", name: "guarderTel", type: "display", colSpan: 1 },
                    { label: "监护人公民身份号码", name: "guarderCardNum", type: "display", colSpan: 2 },
                    { label: "监护人现住门（楼）详址", name: "guarderAddr", type: "display", colSpan: 2 },
                    { label: "审核意见", name: "comments", type: "textarea", colSpan: 2 },
                ],
            },
            //基本信息
            mainInfo: {
                cardNum: null,
                name: null,
                rAddr: null,
                dangerRank: null,
                manageLevel: null,
                visitCyc: null,
                finalLevel: null,
                addReason: null,
                attackType: null,
                peopleStatusQeo: null,
                isCTrouble: null,
                ecoSituatio: null,
                isEfficiency: null,
                guarderName: null,
                relationship: null,
                guarderTel: null,
                guarderCardNum: null,
                guarderAddr: null,
                comments: null,
            },
        },
        mounted: function() {
            var funmdataID = systemConfig.getQueryParams().funmdataID;
            this.funmdataID = funmdataID;
            if (funmdataID) {
                this.loadTabs();
            }
            // var JSBId = systemConfig.getQueryParams().JSBId;
            // this.JSBId = JSBId;
            // if (JSBId) {
            //     this.loadTabs();
            // }
            var sn = systemConfig.getQueryParams().sn;
            this.sn = sn;
        },
        methods: {
            loadTabs: function() {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/getUndoAddPeoProMsg",
                    data: {
                        JSBId: this.funmdataID,
                        // cigrole: this.cigrole
                    },
                    type: "get",
                    "success": this.getTabsSuccess.bind(this),
                    "error": this.getTabsError.bind(this),
                };
                $.ajax(options);
            },
            getTabsSuccess: function(res) {
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
                // var d = dialog({
                //     title: '欢迎',
                //     content: '欢迎使用 artDialog 对话框组件！'
                // });
                // d.show();
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
                // art.dialog({
                //     title: "提示",
                //     content: "操作失败！",
                //     icon: "succeed",
                //     lock: true,
                //     fixed: true,
                //     time: 2000,
                // });
            },
        }
    });
});