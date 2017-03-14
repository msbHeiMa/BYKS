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
    var sfOptions = [{ text: "是", value: 1 }, { text: "否", value: 0 }];
    var ytOptions = [{ text: "有", value: 1 }, { text: "无", value: 0 }];
    var role = systemConfig.getRole();
    var moduleName = systemConfig.getQueryParams().module;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            role: role,
            btns: false,
            fields: {
                //人员基本信息
                main: [
                    { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "曾用名", name: "usedName", type: "display", colSpan: 1 },
                    { label: "性别", name: "gender", type: "display", domainName: "gender", colSpan: 1 },
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1 },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "籍贯", name: "nativePlace", type: "display", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", domainName: "bloodType", colSpan: 1 },
                    { label: "政治面貌", name: "politicalStatus", type: "display", domainName: "politicalStatus", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", domainName: "education", colSpan: 1 },
                    { label: "宗教信仰", name: "relBelief", type: "display", domainName: "relBelief", colSpan: 1 },
                    { label: "职业类别", name: "occCategory", type: "display", domainName: "occCategory", colSpan: 1 },
                    { label: "职业", name: "occupation", type: "display", colSpan: 1 },
                    { label: "服务处所", name: "sPlace", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "phone", type: "display", colSpan: 1 },
                    { label: "目前危险性评估等级", name: "dangerRank", domainName: "dangerRank", type: "display", colSpan: 1 },
                    { label: "管理等级", name: "manageLevel", domainName: "manageLevel", type: "display", colSpan: 1 },
                    { label: "户籍地", name: "domicile", type: "display", colSpan: 2 },
                    { label: "户籍门（楼）详址", name: "dAddr", type: "display", colSpan: 2 },
                    { label: "现住地", name: "residence", type: "display", colSpan: 2 },
                    { label: "现住门（楼）祥址", name: "rAddr", type: "display", colSpan: 2 },
                ],
                //监护人信息
                jhrMain: [
                    { label: "姓名", name: "guarderName", type: "display", colSpan: 1 },
                    { label: "身份证号", name: "guarderCardNum", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "guarderTel", type: "display", colSpan: 1 },
                    { label: "现居地", name: "guarderAddr", type: "display", colSpan: 1 },
                    { label: "与当事人关系", name: "relationship", type: "display", colSpan: 1 },
                ],
                //村委会干部
                cwhMain: [
                    { label: "姓名", name: "villageName", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "villagePhone", type: "display", colSpan: 1 },
                ],
                //社区医生信息
                doctorMain: [
                    { label: "姓名", name: "dockorName", type: "display", colSpan: 1 },
                    { label: "单位", name: "dockorDepartmentName", type: "display", colSpan: 1 },
                ],
                //社区警察信息
                policeMain: [
                    { label: "姓名", name: "policeName", type: "display", colSpan: 1 },
                    { label: "单位", name: "policeDepartmentName", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "policePhone", type: "display", colSpan: 1 },
                ],

                //肇事肇祸信息
                zhMain: [
                    { label: "有无肇事肇祸史", name: "isCTrouble", options: ytOptions, type: "display", colSpan: 1 },
                    { label: "肇事肇祸次数", name: "cTroubleCount", type: "display", colSpan: 1 },
                    { label: "上次肇事肇祸日期", name: "cTroubleDate", type: "display", colSpan: 1 },
                ],
                //医疗信息
                ylMain: [
                    { label: "初次发病日期", name: "attackDate", type: "display", colSpan: 1 },
                    { label: "实施住院治疗原因", name: "hosTreatS", type: "display", domainName: "hosTreatS", colSpan: 1 },
                    { label: "目前诊断类型", name: "attackType", type: "display", domainName: "attackType", colSpan: 2 },
                    { label: "治疗情况", name: "treatS", type: "display", domainName: "treatS", colSpan: 1 },
                    { label: "治疗医院名称", name: "treatName", type: "display", colSpan: 1 },
                    { label: "接收康复训练机构", name: "recOrganName", type: "display", colSpan: 1 },
                    { label: "治疗病史", type: "display", name: "zlbs", colSpan: 1, },
                ],
                //财务
                cwMain: [
                    { label: "房屋", name: "caiwu", type: "display", colSpan: 1 },
                    { label: "车辆", name: "cheliang", type: "display", colSpan: 1 },
                    { label: "银行存款", name: "yhcunkuang", type: "display", colSpan: 1 },
                ],
                //财务
                // bfMain: [
                //     { label: "民政", name: "minzheng", type: "display", colSpan: 1 },
                //     { label: "残联", name: "canlian", type: "display", colSpan: 1 },
                //     { label: "人社", name: "renshe", type: "display", colSpan: 1 },
                //     { label: "财政", name: "caizheng", type: "display", colSpan: 1 },
                // ],
            },
            //设置列表的列
            tableColumns: [
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
                    component: "<span>{{row.dischargedDate && row.dischargedDate.substr(0,10)}}<span>",
                },
                {
                    title: '迁出（移除）日期',
                    field: 'recOrganNam',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.recOrganNam && row.recOrganNam.substr(0,10)}}<span>",
                },

            ],
            tabs: {
                pdTabs: [
                    { text: "基础信息", name: "main" },
                ],

                glTabs: [
                    { text: "监护人信息", name: "jhrMain" },
                    { text: "村委会干部", name: "cwhMain" },
                    { text: "社区医生信息", name: "doctorMain" },
                    { text: "社区民警信息", name: "policeMain" },
                ],

                //肇事肇祸信息
                zhTabs: [
                    { text: "肇事肇祸信息", name: "zhMain" },
                ],
                //医疗信息
                ylTabs: [
                    { text: "医疗信息", name: "ylMain" },
                ],
                //财务信息     
                cwTabs: [
                    { text: "财务信息", name: "cwMain" },
                ],
                //帮扶情况
                // bfTabs: [
                //     { text: "帮扶情况", name: "bfMain" },
                // ],
                //迁入迁出记录
                qrTabs: [
                    { text: "迁入迁出记录", name: "qrMain" },
                ],
            },
            //基本信息
            mainInfo: {
                cardNum: null,
                name: null,
                usedName: null,
                gender: null,
                birthDate: null,
                nation: null,
                nativePlace: null,
                maritalStatus: null,
                bloodType: null,
                politicalStatus: null,
                education: null,
                relBelief: null,
                occCategory: null,
                occupation: null,
                sPlace: null,
                phone: null,
                dangerRank: null,
                manageLevel: null,
                domicile: null,
                dAddr: null,
                residence: null,
                rAddr: null,
            },

            // 管理小组信息
            // 监护人信息
            jhrInfo: {
                guarderName: null,
                guarderCardNum: null,
                guarderTel: null,
                guarderAddr: null,
                relationship: null,
            },
            // 村委会干部
            cwhInfo: {},
            // 社区医生信息
            doctorInfo: {},
            // 社区警察信息
            policeInfo: {},

            //肇事肇祸信息
            zhInfo: {},

            //医疗信息
            ylInfo: {},
            //财务信息
            cwInfo: [

            ],
            // //帮扶情况
            // bfInfo: [

            // ],
            // 迁入迁出行
            qrRows: [],
            // imgUrl: "http://localhost:3002/cig/common/images/icon_navi/icon4-act.png"
            //  头像
            imgUrl: ""

        },

        mounted: function () {
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
                this.loadQrTable();
            }
            var cardNum = systemConfig.getQueryParams().cardNum;
            this.cardNum = cardNum;
            if (cardNum) {
                this.loadTabs();
                this.loadQrTable();
            }
        },
        methods: {
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/zszhPsychiatricPatientDetail",
                    data: {
                        JSBId: this.JSBId,
                        cardNum: this.cardNum
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
                    // 然后 返回数据成功了中写  this.$set(this,"mainInfo",res.data);


                    //  基本信息
                    this.$set(this, "mainInfo", res.data);
                    // 管理小组信息
                    this.$set(this.tabs, "glTabs", this.tabs.glTabs.filter(function (tab) {
                        return tab.name == "jhrMain"
                            || tab.name == "cwhMain"
                            || tab.name == "doctorMain"
                            || tab.name == "policeMain"
                    }));
                    // 监护人信息（用的第二种）
                    this.jhrInfo.guarderName = res.data.guarderName;
                    this.jhrInfo.guarderCardNum = res.data.guarderCardNum;
                    this.jhrInfo.guarderTel = res.data.guarderTel;
                    this.jhrInfo.guarderAddr = res.data.guarderAddr;
                    this.jhrInfo.relationship = res.data.relationship;
                    // 村委会干部(用的第一种)
                    this.$set(this.cwhInfo, "villageName", res.data.villageName);
                    this.$set(this.cwhInfo, "villagePhone", res.data.villagePhone)
                    // 社区医生信息
                    this.$set(this.doctorInfo, "dockorName", res.data.dockorName);
                    this.$set(this.doctorInfo, "dockorDepartmentName", res.data.dockorDepartmentName);
                    this.$set(this.doctorInfo, "dockorPhone", res.data.dockorPhone);
                    // 社区警察信息
                    this.$set(this.policeInfo, "policeName", res.data.policeName);
                    this.$set(this.policeInfo, "policeDepartmentName", res.data.policeDepartmentName);
                    this.$set(this.policeInfo, "policePhone", res.data.policePhone);
                    //肇事肇祸信息
                    // if (res.data.isCTrouble == 1) {
                    //     this.zhInfo.isCTrouble = "有"
                    // } else (
                    //     this.zhInfo.isCTrouble = "无"
                    // );
                    this.zhInfo.isCTrouble = res.data.isCTrouble;
                    this.zhInfo.cTroubleCount = res.data.cTroubleCount;
                    this.zhInfo.cTroubleDate = res.data.cTroubleDate;
                    // 医疗信息
                    this.ylInfo.attackDate = res.data.attackDate;
                    this.ylInfo.attackType = res.data.attackType;
                    this.ylInfo.treatS = res.data.treatS;
                    this.ylInfo.treatName = res.data.treatName;
                    this.ylInfo.hosTreatS = res.data.hosTreatS;
                    this.ylInfo.recOrganName = res.data.recOrganName;
                    // 头像
                    var img = systemConfig.backendurl + "/zszh/queryImageByJSBId?JSBId=" + res.data.JSBId;
                    this.$set(this, "imgUrl", img);
                    // var imgHTML = "<img src=" + img + " />";
                    // $("#peopleImage").append(imgHTML);
                }
                else {
                    this.getTabsError(res);
                }
            },
            getTabsError: function () {
            },
            // 迁入迁出记录
            loadQrTable: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/getDeleteOutPeopleById",
                    data: {
                        JSBId: this.JSBId,
                        cardNum: this.cardNum
                    },
                    type: "get",
                    "success": this.getTableSuccess.bind(this),
                    "error": this.getTableError.bind(this),
                };
                $.ajax(options);
            },

            getTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "qrRows", res.data.rows);
                }
                else {
                    this.getTableError(res);
                }
            },
            getTableError: function (res) {
            },

            // 点击页面上tab页上的选择
            glTabSelect: function (tab) {
                var type = tab.name;
            },
            // 点击医疗信息
            doThisYl: function () {
                // 显示弹出框
                ylmodalVm.show();
            },
            // 点击肇事次数
            doThisZs: function () {
                // 显示弹出框
                zsmodalVm.show();
            },

        }

    });
    // 治疗病史
    var ylmodalVm = new Vue({
        el: "#ylmodal",
        data: {
            //设置列表的列
            tableColumns: [
                {
                    title: '序号',
                    field: 'id'
                    ,
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
                    // component: tableHelper.getDomainDisplayComponent("hosTreatS", "hosTreatS")
                },
                {
                    title: '诊断类型',
                    field: 'attackType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    // component: tableHelper.getDomainDisplayComponent("attackType", "attackType")
                },
                {
                    title: '出院日期',
                    field: 'dischargedDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.dischargedDate && row.dischargedDate.substr(0,10)}}<span>",
                },
                {
                    title: '接受康复训练机构名称',
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
    // 肇事次数
    var zsmodalVm = new Vue({
        el: "#zsmodal",
        data: {
            //设置列表的列
            tableColumns: [
                {
                    title: '序号',
                    field: 'RN'
                    ,
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },

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
                    title: '处置结果',
                    field: 'zszhCom',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },


            ],
            rows: [],
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
                    "url": systemConfig.backendurl + "/zszh/zszhMessage",
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
