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
    var tableHelper = table.helper;
    var sfOptions = [{ text: "是", value: 1 }, { text: "否", value: 0 }];
    var ytOptions = [{ text: "有", value: 1 }, { text: "无", value: 0 }];
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            fields: {
                main: [
                    { label: "所属网格", name: "gridName", type: "display", colSpan: 1 },
                    { label: "申请人", name: "domicile", type: "display", colSpan: 1 },
                    { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "曾用名", name: "usedName", type: "display", colSpan: 1 },
                    { label: "性别", name: "gender", type: "display", domainName: "gender", colSpan: 1 },
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1 },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "籍贯", name: "nativePlace", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "政治面貌", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", colSpan: 1 },
                    { label: "服务处所", name: "sPlace", type: "display", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", domainName: "education", colSpan: 1 },
                    { label: "现住地", name: "residence", type: "display", colSpan: 2 },
                    { label: "现住门（楼）祥址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                    { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                    { label: "随访周期", name: "visitCyc", type: "display", colSpan: 1 },
                ],
            },
            tableConfig: {
                "zszh": { checkbox: false },
                "event": { checkbox: false }
            },
            columns: {
                "zszh": [
                    {
                        title: '肇事肇祸日期',
                        field: 'zszhDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<span>{{row.zszhDate && row.zszhDate.substr(0,10)}}<span>",
                    },
                    {
                        title: '肇事肇祸地点',
                        field: 'zszhAddr',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '肇事肇祸结果',
                        field: 'zszhCom',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    }
                ],
                "event": [
                    {
                        title: '案卷编号',
                        field: 'caseNo',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<a target="_blank" :href="\'http://219.131.197.178:9905/integrate/view/caseinfo.jsp?caseNo=\'+row.caseNo">{{row.caseNo}}</a>',
                        // component: '<a target="_blank" :href="\'eventDetail.html?dsrId=\'+row.dsrId">{{row.type}}</a>' + tableHelper.getDomainDisplayComponent("type", "type"),
                    },
                    {
                        title: '事件类型',
                        field: 'caseType',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        // component: '<a target="_blank" :href="\'eventDetail.html?dsrId=\'+row.dsrId">{{row.type}}</a>' + tableHelper.getDomainDisplayComponent("type", "type"),
                    },
                    {
                        title: '事件地址',
                        field: 'caseAddress',
                        align: 'center',
                        valign: 'middle',
                        visible: true
                    },
                    {
                        title: '所属网格',
                        field: 'caseGrid',
                        align: 'center',
                        valign: 'middle',
                        visible: true
                    },
                    {
                        title: '事发时间',
                        field: 'caseHappenDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<span>{{row.caseHappenDate && row.caseHappenDate.substr(0,10)}}<span>",
                    }
                ],
            },
            tabs: {/*tab页设置*/
                mainTabs: [
                    { text: "基本信息", name: "main" },
                ],
                zszhTabs: [
                    { text: "肇事肇祸史", name: "zszh" },
                ],
                eventTabs: [
                    { text: "事件信息", name: "event" },
                ],
            },
            mainInfo: {/*先给加载出的数据赋值为null*/
                cardNum: null,
                name: null,
                usedName: null,
                gender: null,
                birthDate: null,
                nation: null,
                maritalStatus: null,
                bloodType: null,
                education: null,
                sPlace: null,
                residence: null,
                rAddr: null,
                dangerRank: null,
                manageLevel: null,
                finalLevel: null,
                adjustReason: null,
            },
            imgUrl: "",
            rows1: [],/*获取的json数组*/
            rows2: [],
        },
        mounted: function () {/*获取JSBId*/
            var cardNum = systemConfig.getQueryParams().cardNum;
            this.cardNum = cardNum;
            if (cardNum) {
                this.loadEventTable();
            }
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
                this.loadZszhTable();
                this.loadEventTable();
            }
        },
        methods: {
            /**事件信息表 */
            loadEventTable: function () {
                var options = {
                    "type": "get",
                    "url": systemConfig.backendurl + "/zszh/queryCaseById",
                    data: {
                        cardNum: this.cardNum,
                    },
                    "success": this.getEventTableSuccess.bind(this),
                    "error": this.getEventTableError.bind(this)
                };
                $.ajax(options);
            },
            getEventTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows2", res.data.rows);
                }
                else {
                    this.getEventTableError(type, res);
                }
            },
            getEventTableError: function (type) {
            },/**事件信息表 */
            /**肇事肇祸史 */
            loadZszhTable: function () {
                var options = {
                    "type": "get",
                    "url": systemConfig.backendurl + "/zszh/zszhMessage",
                    data: {
                        JSBId: this.JSBId
                    },
                    "success": this.getZszhTableSuccess.bind(this),
                    "error": this.getZszhTableError.bind(this)
                };
                $.ajax(options);
            },
            getZszhTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows1", res.data.rows);
                }
                else {
                    this.getZszhTableError(type, res);
                }
            },
            getZszhTableError: function (type) {
            },/**肇事肇祸史end */
            /**基础信息*/
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/zszhPsychiatricPatientDetail",
                    data: {
                        JSBId: this.JSBId
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
                    // 头像
                    var img = systemConfig.backendurl + "/zszh/queryImageByJSBId?JSBId=" + res.data.JSBId;
                    this.$set(this, "imgUrl", img);
                }
                else {
                    this.getError(res);
                }
            },
            getTabsError: function () {
            },/**基础信息end*/
            /**保存*/
            save: function () {
                this.beforSave();
            },
            beforSave: function () {
                // if(!this.$refs.form.hasError()){
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/setDangerRank",
                    data: {
                        "JSBId": this.JSBId,
                        "originalLevel": this.mainInfo.dangerRank,
                        "finalLevel": this.mainInfo.finalLevel,
                        "adjustReason": this.mainInfo.adjustReason,
                    },
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });
            },
            saveSuccess: function (res) {
                if (res.success) {
                    alert('保存成功');
                    window.history.back(-1);
                }
            },
            saveError: function (res) {
                alert(' 保存失败');
            },/**保存end*/
            close: function () {
                this.$refs.form.resetValidation();
                this.hide();
            },
        }
    })
});