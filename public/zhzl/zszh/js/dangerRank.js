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
                    { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "曾用名", name: "usedName", type: "display", colSpan: 1 },
                    { label: "性别", name: "gender", type: "display", domainName: "gender", colSpan: 1 },
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1 },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", colSpan: 1 },
                    { label: "服务处所", name: "sPlace", type: "display", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", domainName: "education", colSpan: 1 },
                    { label: "现住地", name: "residence", type: "display", colSpan: 2 },
                    { label: "现住门（楼）祥址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "目前危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                    { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                    { label: "申请危险性评估等级", name: "finalLevel", options: [{ text: "0级", value: '01' }, { text: "1级", value: '02' }, { text: "2级", value: '03' }, { text: "3级", value: '04' }, { text: "4级", value: '05' }, { text: "5级", value: '06' }], type: "selected", colSpan: 1 },
                    { label: "申请原因", name: "adjustReason", type: "textarea", colSpan: 2 },
                ],
                // visible: role=adfasdga,
            },
            tableConfig: {
                "zszh": { checkbox: false },
                "record": { checkbox: false },
                "zlbs": { checkbox: false },
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
                "record": [
                    {
                        title: '随访日期',
                        field: 'visitDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<span>{{row.visitDate && row.visitDate.substr(0,10)}}<span>",
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
                    },
                    {
                        title: '是否存在危害行为',
                        field: 'isHarmbehavior',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    }
                ],
                "zlbs": [
                    {
                        title: '序号',
                        field: 'id',
                        formatter: function (value, row, index) {
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
                        component: "<span>{{row.admissionDate && row.admissionDate.substr(0,10)}}<span>",

                    },
                    {
                        title: '治疗医院名称',
                        field: 'treatNam',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '实施住院治疗原因',
                        field: 'hosTreatS',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '诊断类型',
                        field: 'attackType',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '出院日期',
                        field: 'dischargedDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '接受康复训练机构名称',
                        field: 'recOrganNam',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
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
                recordTabs: [
                    { text: "随访记录", name: "record" },
                ],
                zlbsTabs: [
                    { text: "治疗病史", name: "zlbs" },
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
            rows3: [],
        },
        mounted: function () {/*获取JSBId*/
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
                this.loadZszhTable();
                this.loadZlbsTable();
                this.loadRecordTable();
            }
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
            if (cigrole) {
                this.loadTabs();
            }
        },
        methods: {
            /**随访记录表 */
            loadRecordTable: function () {
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
            getRecordTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows2", res.data.rows);
                }
                else {
                    this.getRecordTableError(type, res);
                }
            },
            getRecordTableError: function (type) {
            },/**随访记录表end */
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
            /**治疗病史表 */
            loadZlbsTable: function () {
                var options = {
                    "type": "get",
                    "url": systemConfig.backendurl + "/zszh/zszhQueryJsbTreatHistory",
                    data: {
                        JSBId: this.JSBId
                    },
                    "success": this.getZlbsTableSuccess.bind(this),
                    "error": this.getZlbsTableError.bind(this)
                };
                $.ajax(options);
            },
            getZlbsTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows3", res.data.rows);
                }
                else {
                    this.getZlbsTableError(type, res);
                }
            },
            getZlbsTableError: function (type) {
            },/**治疗病史end */
            /**基础信息*/
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/listMessageForLevleSetting",
                    data: {
                        JSBId: this.JSBId,
                        cigrole: this.cigrole
                    },
                    type: "get",
                    "success": this.getTabsSuccess.bind(this),
                    "error": this.getTabsError.bind(this),
                };
                $.ajax(options);
            },
            getTabsSuccess: function (res) {
                if (res.success) {
                    // 加载数据的第一种写法    直接用这种
                    // this.$set(this.mainInfo,"cardNum",res.data.cardNum);

                    // 加载数据的第二种写法    在data中的mainInfo中设置空值  cardNum:null,等等，
                    // 然后 返回数据成功了中写  this.mainInfo.cardNum = res.data.cardNum;

                    // 加载数据的第三种种写法在data中的mainInfo中设置空值  cardNum:null,等等
                    // 然后 返回数据成功了中写  this.$set(this,"mainInfo",res.data);;


                    //  基本信息（用的第三种）
                    this.$set(this, "mainInfo", res.data);


                    // 头像
                    var img = systemConfig.backendurl + "/zszh/queryImageByJSBId?JSBId=" + res.data.JSBId;
                    this.$set(this, "imgUrl", img);
                    // var imgHTML = "<img src=" + img + " />";
                    // $("#peopleImage").append(imgHTML);
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
                window.location.href = 'peopleList1.html';
                this.$refs.form.resetValidation();
            },
        }
    })
});