define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'breadcrumb',
    'vueBsPop',
], function (require, Vue, config, $, form,breadcrumb) {
    'use strict';
    var formHelper = form.helper;
    var query = config.getQueryParams();
    var id = query.id;

    breadcrumb.items.push({
        text:"数据源管理",
        url:"/cigWeb/cigjoin/source/list.html"
    });
    breadcrumb.items.push({
        text:"数据源详情",
    });

    var editFields = [
        { label: "数据源名称", name: "datasourceName", type: "display", colSpan: 2 },
        { label: "来源单位", name: "datasourceUnit", type: "display", colSpan: 2 },
        { label: "关联系统名称", name: "relatedSystem", type: "display", colSpan: 2 },

        { label: "最近一次运行", name: "lastRunInfo", type: "display", colSpan: 2 },//todo
        { label: "最近一次正常运行", name: "lastCorrectRunInfo", type: "display", colSpan: 2 },//todo
        { label: "最近30次运行出错次数", name: "latestErrorCount", type: "display", colSpan: 2 },//todo
    ];
    var customRender = function (context, fields, createElement) {
        return [
            createElement("h4", { class: { "": true } }, ["基本信息"]),
            createElement("div", { class: { "box-body": true } }, form.renders.table2Render(context, fields.filter(function (e, i) { return i < 3 }), createElement)),
            createElement("h4", { class: { "": true } }, ["运行情况"]),
            createElement("div", { class: { "box-body": true } }, form.renders.table2Render(context, fields.filter(function (e, i) { return i >= 3 }), createElement)),
        ];
    };
    var formVm = new Vue({
        mixins: [
            formHelper.getFieldsMixin(editFields, {}),
            formHelper.getValidatorMixin({
                "name": { maxlength: 50 },
            }, "form", "data")
        ],
        data: {
            customRender: customRender,
            id: id,
            popLog: ""
        },
        mounted: function () {
            this.getData();
        },
        methods: {
            getData: function () {
                var options = {
                    url: config.backendurl + "/agg/datasourceServiceLogGetDetails",
                    data: {
                        id: this.id
                    },
                    type: "get",
                    success: this.getDataSuccess.bind(this),
                    error: this.getDataError.bind(this)
                };
                $.ajax(options);
            },
            getDataSuccess: function (res) {
                if (res.success) {
                    if (res.data) {
                        this.$set(this, "data", res.data);
                    }
                }
                else {
                    this.getDataError();
                }
            },
            getDataError: function () {
            },
            viewLast: function () {
                var logId = this.data.lastRunInfo ? this.data.lastRunInfo.logId : "";
                this.showLog(logId);
            },
            viewCorrect: function () {
                var logId = this.data.lastCorrectRunInfo ? this.data.lastCorrectRunInfo.logId : "";
                this.showLog(logId);
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

            },
            start: function () {

                $.ajax({
                    url: config.backendurl + "/agg/datasourceServiceStart",//todo
                    data: {
                        id: this.id
                    },
                    success: this.getData.bind(this),
                    error: this.getData.bind(this)
                })
            },
            stop: function () {

                $.ajax({
                    url: config.backendurl + "/agg/datasourceServiceStop",//todo
                    data: {
                        id: this.id
                    },
                    success: this.getData.bind(this),
                    error: this.getData.bind(this)
                })
            },
            list: function () {
                location.href = "loglist.html?sourceid=" + this.id;
            },
            hide: function () {
                this.$refs.pop.hide();
            }
        },
        computed: {
            startDisabled: function () {
                return this.data ? this.data.runState == "10" : true;//todo
            },
            stopDisabled: function () {
                return this.data ? this.data.runState != "10" : true;
            }
        }
    });
    return function (el) {
        formVm.$mount(el);
    }
});