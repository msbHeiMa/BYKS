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
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1, "format": "yyyy-mm-dd" },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "籍贯", name: "nativePlace", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "政治面貌", name: "politicalStatus", type: "display", domainName: "politicalStatus", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", colSpan: 1 },
                    { label: "服务处所", name: "sPlace", type: "display", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", domainName: "education", colSpan: 1 },
                    { label: "现住门（楼）祥址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "目前诊断类型", name: "attackType", type: "display", domainName: "attackType", colSpan: 2 },
                    { label: "危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                    { label: "有无肇事肇祸史", name: "isCTrouble", type: "display", domainName: "isCTrouble", colSpan: 1 },
                    { label: "肇事肇祸次数", name: "cTroubleCount", type: "display", colSpan: 1 },
                    { label: "回访记录", name: "zlbs", type: "display", colSpan: 1, }
                ],
                fpwg: [
                    { label: "网格名称", name: "gridName", colSpan: 1 },
                    { label: "网格姓名", name: "name", type: "text", colSpan: 1 },
                    { label: "联系方式", name: "usedName", type: "text", colSpan: 1 },
                    { label: "派出所", name: "gender", type: "text", domainName: "gender", colSpan: 1 },
                    { label: "社区医院", name: "birthDate", type: "text", colSpan: 1 }
                ],
            },
            tableConfig: {
                "choose": { checkbox: false },
                "qrqc": { checkbox: false }
            },
            columns: {
                // "choose": [
                //     {
                //         title: '所属网格',
                //         field: 'originalAddrName',
                //         align: 'center',
                //         valign: 'middle',
                //         visible: true,
                //     },
                //     {
                //         title: '网格员姓名',
                //         field: 'griderName',
                //         align: 'center',
                //         valign: 'middle',
                //         visible: true,
                //     },
                //     {
                //         title: '联系方式',
                //         field: 'gridPhone',
                //         align: 'center',
                //         valign: 'middle',
                //         visible: true,
                //     },
                //     {
                //         title: '派出所',
                //         field: 'griderTel',
                //         align: 'center',
                //         valign: 'middle',
                //         visible: true,
                //     },
                //     {
                //         title: '社区医院',
                //         field: 'griderTel',
                //         align: 'center',
                //         valign: 'middle',
                //         visible: true,
                //     },
                //     {
                //         title: '操作',
                //         field: 'operate',
                //         align: 'center',
                //         valign: 'middle',
                //         visible: true,
                //         component: {
                //             template: '<span><a href="javascript:;" @click="edit">选择</a></span>',

                //             methods: {
                //                 edit: function () {
                //                     detailVm.editRow(this.row);
                //                 }
                //             }
                //         }
                //     }
                // ],
                "qrqc": [
                    {
                        title: '序号',
                        field: 'RN',
                        formatter: function (value, row, index) {
                            return index + 1;
                        },
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },

                    {
                        title: '迁入网格',
                        field: 'admissionDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,

                    },
                    {
                        title: '迁出网格',
                        field: 'finalAddrDartId',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '人员状态',
                        field: 'peopleStatusQeo',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '操作状态',
                        field: 'wfState',
                        align: 'center',
                        valign: 'middle', visible: true,
                    },
                    {
                        title: '迁入日期',
                        field: 'dischargedDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '迁出（移除）日期',
                        field: 'recOrganNam',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                ],
            },
            tabs: {/*tab页设置*/
                mainTabs: [
                    { text: "基本信息", name: "main" },
                ],
                // chooseTabs: [
                //     { text: "可选网格员", name: "choose" },
                // ],
                qrqcTabs: [
                    { text: "迁入迁出记录", name: "qrqc" },
                ],
                fpwgTabs: [
                    { text: "分配网格", name: "fpwg" },
                ]
            },
            mainInfo: {/*先给加载出的数据赋值为null*/
                cardNum: null,
                name: null,
                usedName: null,
                gender: null,
                birthDate: null,
                nation: null,
                nativePlace: null,
                maritalStatus: null,
                politicalStatus: null,
                bloodType: null,
                education: null,
                sPlace: null,
                rAddr: null,
                attackType: null,
                dangerRank: null,
                isCTrouble: null,
                finalLevel: null,
                cTroubleCount: null,
            },
            fpwgInfo: {/*先给加载出的数据赋值为null*/
                cardNum: null,
                name: null,
                usedName: null,
                gender: null,
                birthDate: null
            },
            imgUrl: "",
            rows: [],/*获取的json数组*/
        },
        mounted: function () {/*获取JSBId*/
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
                // this.loadRecordTable();
                // this.loadChooseTable();
                this.loadQrqcTable();
            }
        },
        methods: {
            /**迁入迁出列表 */
            loadQrqcTable: function () {
                var options = {
                    "type": "get",
                    "url": systemConfig.backendurl + "/zszh/getDeleteOutPeopleById",
                    data: {
                        JSBId: this.JSBId
                    },
                    "success": this.getQrqcTableSuccess.bind(this),
                    "error": this.getQrqcTableError.bind(this)
                };
                $.ajax(options);
            },
            getQrqcTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows", res.data.rows);
                }
                else {
                    this.getQrqcTableError(type, res);
                }
            },
            getQrqcTableError: function (type) {
            },/**可选网格员列表end */

            /**可选网格员列表 */
            // loadChooseTable: function () {
            //     var options = {
            //         "type": "get",
            //         "url": systemConfig.backendurl + "/zszh/getHistoricalGrider",
            //         data: {
            //             JSBId: this.JSBId
            //         },
            //         "success": this.getChooseTableSuccess.bind(this),
            //         "error": this.getChooseTableError.bind(this)
            //     };
            //     $.ajax(options);
            // },
            // getChooseTableSuccess: function (res) {
            //     if (res.success) {
            //         this.$set(this, "rows", res.data.rows);
            //     }
            //     else {
            //         this.getZszhTableError(type, res);
            //     }
            // },
            // getChooseTableError: function (type) {
            // },/**可选网格员列表end */
            /**基础信息*/
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/listMessageForSettingManager",
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

            doThisYl: function () {
                // 显示弹出框
                ylmodalVm.show();
            },


            editRow: function (row) {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/setGriderDirectly",
                    data: {
                        "id": this.JSBId,
                        "griderId": row.originalGrider,
                        "gridId": row.originalAddr,
                    },
                    type: "post",
                    success: this.saveSuccessA.bind(this),
                    error: this.saveErrorA.bind(this),
                });
            },
            saveSuccessA: function (res) {
                if (res.success) {
                    alert('保存成功');
                    window.open("noGridList1.html");
                }
            },
            saveErrorA: function (res) {
                alert(' 保存失败');
            },




            getFamilySuccess: function (res) {
                if (res.success) {
                    this.$set(this, "data", res.data);
                    this.$set(this, "hjcyRows", res.data.familyMember);
                    this.$set(this, "hzqsRows", res.data.familyRelation);
                }
                else {
                    this.getFamilyError();
                }
            },
            getFamilyError: function () {
            },

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
                window.location.href = 'noGridList1.html';
                this.$refs.form.resetValidation();
            },
        },
    });
    var ylmodalVm = new Vue({
        el: "#ylmodal",
        data: {
            //设置列表的列
            tableColumns: [
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
            rows: [],
            // tableAjaxOptions: {
            // }
        },
        mounted: function () {
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTable();
            }
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            loadTable: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/lastThreeRevisit",
                    data: {
                        JSBId: this.JSBId
                    },
                    type: "get",
                    "success": this.getTableSuccess.bind(this),
                    "error": this.getTableError.bind(this),
                };
                $.ajax(options);
            },

            getTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows", res.data.rows);
                }
                else {
                    this.getTableError(res);
                }
            },
            getTableError: function (res) {
            },
        }
    });

});