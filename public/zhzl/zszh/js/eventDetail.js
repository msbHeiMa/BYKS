define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
    'vueBsTab'
], function (require, Vue, $, systemConfig, form, table) {
    'use strict';
    var moduleName = systemConfig.getQueryParams().module;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            fields: {
                //人员基本信息
                main: [
                    { label: "报案编号", name: "baNum", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "tel", type: "display", colSpan: 1 },
                    { label: "证件号码", name: "dsrCardnum", type: "display", colSpan: 1 },
                    { label: "事件类型", name: "type", type: "display", colSpan: 1 },
                    { label: "事件地址", name: "dizhi", type: "display", colSpan: 1 },
                    { label: "所属网格", name: "gridName", type: "date", colSpan: 1 },
                    { label: "事发时间", name: "sfTime", type: "display", colSpan: 1 },
                    { label: "上报时间", name: "reportTime", type: "display", colSpan: 1 },
                    { label: "报案渠道", name: "baQd", type: "display", colSpan: 1 },
                    { label: "上报人", name: "reportName", type: "display", colSpan: 1 },
                    { label: "事件描述", name: "sjms", type: "display", colSpan: 2, },
                    { label: "备注", name: "beizhu", type: "display", colSpan: 2 },
                ],
                //事前处理图片信息
                sqMain: [
                    { label: "", name: "sqimg" },
                ],
                //事后处理图片信息
                shMain: [
                    { label: "", name: "shimg" },
                ],
            },
            tabs: {
                pdTabs: [
                    { text: "基础信息", name: "main" },
                ],
                sqTabs: [
                    { text: "事前处理图片", name: "sqMain" },
                ],
                shTabs: [
                    { text: "事后处理图片", name: "shMain" },
                ],
            },
            //基本信息
            mainInfo: {
                tel: null,
                dsrCardnum: null,
                type: null,
                dizhi: null,
                cardNum: null,
                baNum: null,
                gridName: null,
                sfTime: null,
                reportTime: null,
                baQd: null,
                reportName: null,
                sjms: null,
                beizhu: null,

            },
            // 事前处理图片
            sqInfo: {},
            // 事后处理信息
            shInfo: {},
            // 事前处理信息
            sqimgUrl: "",
            // 事后处理图片
            shimgUrl: "",

        },

        mounted: function () {
            var dsrId = systemConfig.getQueryParams().dsrId;
            this.dsrId = dsrId;
            if (dsrId) {
                this.loadTabs();
            }
        },
        methods: {
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/getSJCKDetil",
                    data: {
                        dsrId: this.dsrId
                    },
                    type: "get",
                    "success": this.getTabsSuccess.bind(this),
                    "error": this.getTabsError.bind(this),
                };
                $.ajax(options);
            },
            getTabsSuccess: function (res) {
                if (res.success) {
                    // 基本信息
                    this.$set(this, "mainInfo", res.data);
                    // 事前处理图片
                    var sqimg = systemConfig.backendurl + "/zszh/querySQCLIMGByDsrId?dsrId=" + this.dsrId;
                    this.$set(this, "sqimgUrl", sqimg);
                    // 事后处理图片
                    var shimg = systemConfig.backendurl + "/zszh/querySHCLIMGByDsrId?dsrId=" + this.dsrId;
                    this.$set(this, "shimgUrl", shimg);

                }
                else {
                    this.getError(res);
                }
            },
            getTabsError: function () {
            },
        }
    })
});
