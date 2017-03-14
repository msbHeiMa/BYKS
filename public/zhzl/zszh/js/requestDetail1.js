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
], function(require, Vue, $, systemConfig, form, table) {
    'use strict';
    var moduleName = systemConfig.getQueryParams().module;
    var tableHelper = table.helper;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            btns: false,
            fields: {
                main: [
                    { label: "所属网格", name: "gridName", type: "display", colSpan: 1 },
                    { label: "申请人", name: "adjustmentPeople", type: "display", colSpan: 1 },
                    { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "曾用名", name: "usedName", type: "display", colSpan: 1 },
                    { label: "性别", name: "gender", type: "display", domainName: "gender", colSpan: 1 },
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1, "format": "yyyy-mm-dd" },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "籍贯", name: "nativePlace", type: "display", colSpan: 1 },
                    { label: "政治面貌", name: "politicalStatus", type: "display", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", colSpan: 1 },
                    { label: "服务处所", name: "sPlace", type: "display", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", domainName: "education", colSpan: 1 },
                    { label: "现住地", name: "residence", type: "display", colSpan: 2 },
                    { label: "现住门（楼）祥址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                    { label: "随访周期", name: "visitCyc", type: "display", domainName: "manageLevel", colSpan: 1 },
                    { label: "目前危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                    { label: "申请危险性评估等级", name: "finalLevel", type: "display", colSpan: 1 },
                    { label: "申请原因", name: "adjustmentReason", type: "display", colSpan: 2 }
                ],
                yl: [
                    { label: "初次发病日期", name: "attackDate", type: "display", colSpan: 1 },
                    { label: "目前诊断类型", name: "attackType", type: "display", domainName: "attackType", colSpan: 1 },
                    { label: "治疗情况", name: "treatS", type: "display", domainName: "treatS", colSpan: 1 },
                    { label: "治疗医院名称", name: "treatName", type: "display", colSpan: 1 },
                    { label: "实施住院治疗原因", name: "hosTreatS", type: "display", domainName: "hosTreatS", colSpan: 1 },
                    { label: "接收康复训练机构名称", name: "recOrganName", type: "display", colSpan: 1 },
                    { label: "治疗病史", type: "display", name: "zlbs", colSpan: 1, }
                ],
            },
            tableConfig: {
                "zszh": { checkbox: false },
                "record": { checkbox: false },
            },
            columns: {
                "zszh": [
                    {
                        title: '肇事肇祸日期',
                        field: 'zszhDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
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
                "record": [
                    {
                        title: '随访日期',
                        field: 'visitDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '随访员',
                        field: 'visitPeople',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '人员现状',
                        field: 'peopleStatusQeo',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '是否按时服药',
                        field: 'isMedication',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("isMedication", "isMedication")
                    },
                    {
                        title: '是否存在危害行为',
                        field: 'isHarmbehavior',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("isHarmbehavior", "isHarmbehavior")
                    }
                ],
            },
            tabs: {/*tab页设置*/
                mainTabs: [
                    { text: "基本信息", name: "main" },
                ],
                ylTabs: [
                    { text: "医疗信息", name: "yl" },
                ],
                zszhTabs: [
                    { text: "肇事肇祸史", name: "zszh" },
                ],
                recordTabs: [
                    { text: "随访记录", name: "record" },
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
                visitCyc: null,
                finalCyc: null,
                adjustReason: null,
            },
            ylInfo: {/*先给加载出的数据赋值为null*/
                attackDate: null,
                attackType: null,
                treatS: null,
                gender: null,
                treatName: null,
                nation: null,
                hosTreatS: null,
                recOrganName: null,
                // zlbs: null
            },
            imgUrl: "",
            rows1: [],/*获取的json数组*/
            rows2: [],
        },
        mounted: function() {/*获取JSBId*/
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
                this.loadYlTabs();
                this.loadRecordTable();
                this.loadZszhTable();
            }
            var sn = systemConfig.getQueryParams().sn;
            this.sn = sn;
            // if (sn) {
            //     this.beforSave();
            //     this.beforBack();
            // }
        },
        methods: {
            /**随访记录表 */
            loadRecordTable: function() {
                var options = {
                    "type": "get",
                    "url": systemConfig.backendurl + "/zszh/lastThreeRevisit",
                    data: {
                        JSBId: this.JSBId
                    },
                    "success": this.getRecordTableSuccess.bind(this),
                    "error": this.getRecordTableError.bind(this)
                };
                $.ajax(options);
            },
            getRecordTableSuccess: function(res) {
                if (res.success) {
                    this.$set(this, "rows1", res.data.rows);
                }
                else {
                    this.getRecordTableError(type, res);
                }
            },
            getRecordTableError: function(type) {
            },/**随访记录表end */
            /**肇事肇祸史 */
            loadZszhTable: function() {
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
            getZszhTableSuccess: function(res) {
                if (res.success) {
                    this.$set(this, "rows2", res.data.rows);
                }
                else {
                    this.getZszhTableError(type, res);
                }
            },
            getZszhTableError: function(type) {
            },/**肇事肇祸史end */
            /**基础信息*/
            loadTabs: function() {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/changeAuditingListByJSBId",
                    data: {
                        JSBId: this.JSBId
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
                    // 头像
                    var img = systemConfig.backendurl + "/zszh/queryImageByJSBId?JSBId=" + res.data.JSBId;
                    this.$set(this, "imgUrl", img);
                }
                else {
                    this.getTabsError(res);
                }
            },
            getTabsError: function() {
            },/**基础信息end*/
            /**医疗信息*/
            loadYlTabs: function() {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/MedicalCareInfo",
                    data: {
                        JSBId: this.JSBId
                    },
                    type: "get",
                    "success": this.getYlTabsSuccess.bind(this),
                    "error": this.getYlTabsError.bind(this),
                };
                $.ajax(options);
            },
            getYlTabsSuccess: function(res) {
                if (res.success) {
                    this.$set(this, "ylInfo", res.data.rows[0]);//因数据库中存储结构不同，多rows
                }
                else {
                    this.getError(res);
                }
            },
            getYlTabsError: function() {
            },/**医疗信息end*/

            doThisYl: function() {
                // 显示弹出框
                ylmodalVm.show();
            },

            /**保存*/
            save: function() {
                this.beforSave();
            },
            beforSave: function() {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/processExecute",
                    data: {
                        "sn": this.sn,
                        "action": "APPROVE",
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
                        "action": "DECLINE",
                    },
                    type: "post",
                    success: this.Success.bind(this),
                    error: this.Error.bind(this),
                });
            },
            Success: function(res) {
                if (res.success) {
                    alert('操作成功');
                    window.location.href = 'request.html';
                }
            },
            Error: function(res) {
                alert('操作失败');
            },/**保存end*/
        }
    });
    var ylmodalVm = new Vue({
        el: "#ylmodal",
        data: {
            //设置列表的列
            tableColumns: [
                {
                    title: '序号',
                    field: 'id'
                    ,
                    formatter: function(value, row, index) {
                        return index + 1;
                    },
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },

                {
                    title: '入院治疗日期',
                    field: 'admissionDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,

                },
                {
                    title: '治疗医院名称',
                    field: 'treatNam',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: ' 实施住院治疗原因',
                    field: 'hosTreatS',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: ' 诊断类型',
                    field: 'attackType',
                    align: 'center',
                    valign: 'middle', visible: true,
                },
                {
                    title: ' 出院日期',
                    field: 'dischargedDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: ' 接受康复训练机构名称',
                    field: 'recOrganNam',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },

            ],
            rows: [],
            // tableAjaxOptions: {
            // }
        },
        mounted: function() {
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTable();
            }
        },
        methods: {
            // 显示弹出框的show方法
            show: function() {
                this.$refs.pop.show();
            },
            loadTable: function() {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/zszhQueryJsbTreatHistory",
                    data: {
                        JSBId: this.JSBId
                    },
                    type: "get",
                    "success": this.getTableSuccess.bind(this),
                    "error": this.getTableError.bind(this),
                };
                $.ajax(options);
            },

            getTableSuccess: function(res) {
                if (res.success) {
                    this.$set(this, "rows", res.data.rows);
                }
                else {
                    this.getTableError(res);
                }
            },
            getTableError: function(res) {
            },
        }
    });
});