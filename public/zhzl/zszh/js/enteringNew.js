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
                //回访员信息
                hfyMain: [
                    { label: "姓名", name: "guarderName", type: "display", colSpan: 1 },
                    { label: "身份证号", name: "guarderCardNum", type: "display", colSpan: 1 },
                    { label: "所属单位", name: "guarderTel", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "guarderTel", type: "display", colSpan: 1 },
                    { label: "现居住地", name: "guarderAddr", type: "display", colSpan: 2 },
                ],

                //精神病人员信息
                main: [
                    { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "性别", name: "gender", type: "display", domainName: "gender", colSpan: 1 },
                    { label: "曾用名", name: "usedName", type: "display", colSpan: 1 },
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1 },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "籍贯", name: "nativePlace", type: "display", domainName: "nativePlace", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "政治面貌", name: "politicalStatus", type: "display", domainName: "politicalStatus", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", domainName: "education", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", domainName: "bloodType", colSpan: 1 },
                    { label: "现住地", name: "residence", type: "display", colSpan: 2 },
                    { label: "服务处所", name: "sPlace", type: "display", colSpan: 1 },
                    { label: "现住门（楼）祥址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "管理等级", name: "manageLevel", type: "display", colSpan: 1 },
                    { label: "回访周期", name: "visitCyc", type: "display", colSpan: 1 },
                    { label: "危险性评估等级", name: "dangerRank", type: "display", colSpan: 1 },
                    { label: "家庭经济情况", name: "ecoSituatio", type: "display", colSpan: 1 },
                    { label: "是否纳入低保", name: "isEfficiency", type: "display", colSpan: 1 }
                ],
                //监护人信息
                jhrMain: [
                    { label: "姓名", name: "guarderName", type: "display", colSpan: 1 },
                    { label: "身份证号", name: "guarderCardNum", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "guarderTel", type: "display", colSpan: 1 },
                    { label: "现居地", name: "guarderAddr", type: "display", colSpan: 1 },
                ],
                //录入回访信息
                hfMain: [
                    { label: "是否与监护人同住", name: "isWithManager", options: [{ text: "是", value: 1 }, { text: "否", value: 0 }], type: "selected", colSpan: 1 },
                    { label: "是否按时服药", name: "isMedication", options: [{ text: "是", value: 1 }, { text: "否", value: 0 }], type: "selected", colSpan: 1 },
                    { label: "是否存在危害行为", name: "isHarmBehavior", options: [{ text: "辱骂他人", value: 1 }, { text: "打砸行为", value: 2 }, { text: "自杀行为", value: 3 }, { text: "暴力行为", value: 4 }, { text: "无", value: 4 }], type: "selected", colSpan: 1 },
                    { label: "行为描述", name: "harmBehaviorRemark", type: "textarea", colSpan: 2 }
                    // { label: "行为描述", name: "harmBehaviorRemark", options: [{ text: "辱骂他人", value: 1 }, { text: "打砸行为", value: 2 }, { text: "自杀行为", value: 3 }, { text: "暴力行为", value: 4 }], type: "selected", colSpan: 1 }
                ]
            },
            tabs: {
                pdTabs: [
                    { text: "精神病人员信息", name: "main" },
                ],

                glTabs: [
                    { text: "监护人信息", name: "jhrMain" },
                ],

                hfTabs: [
                    { text: "录入回访信息", name: "hfMain" },
                ],
                hfyTabs: [
                    { text: "回访员信息", name: "hfyMain" },
                ],
            },

            //基本信息
            mainInfo: {
                cardNum: null,
                sPlace: null,
                name: null,
                phone: null,
                usedName: null,
                maritalStatus: null,
                gender: null,
                bloodType: null,
                birthDate: null,
                nation: null,
                residence: null,
                rAddr: null,
                dangerRank: null,
                manageLevel: null,
                visitCyc: null,
                ecoSituatio: null,
                isEfficiency: null,
            },
            // 监护人信息
            jhrInfo: {
                guarderName: null,
                guarderCardNum: null,
                guarderTel: null,
                guarderAddr: null,
            },
            hfInfo: {
                isWithManager: null,
                isMedication: null,
                isHarmBehavior: null,
                harmBehaviorRemark: null
            },
            // 回访员信息
            hfyInfo: {


            },

            //  头像
            imgUrl: ""

        },

        mounted: function () {
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.loadTabs();
            }
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
            if (cigrole) {
                this.loadTabs();
            }
        },
        methods: {
            loadTabs: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/addRevisitMsg",
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
                    // 是否纳入低保
                    // if (res.data.isEfficiency == "0") {
                    //     this.mainInfo.isEfficiency = "是"
                    // } else {
                    //     this.mainInfo.isEfficiency = "否"
                    // };
                    // 监护人信息（用的第二种）
                    this.jhrInfo.guarderName = res.data.guarderName;
                    this.jhrInfo.guarderCardNum = res.data.guarderCardNum;
                    this.jhrInfo.guarderTel = res.data.guarderTel;
                    this.jhrInfo.guarderAddr = res.data.guarderAddr;
                    // 回访员信息
                    this.hfyInfo.guarderName = res.data.guarderName;
                    this.hfyInfo.guarderCardNum = res.data.guarderCardNum;
                    this.hfyInfo.guarderTel = res.data.guarderTel;
                    this.hfyInfo.guarderAddr = res.data.guarderAddr;
                    this.hfyInfo.guarderAddr = res.data.guarderAddr;

                    // 头像
                    var img = systemConfig.backendurl + "/zszh/queryImageByJSBId?JSBId=" + res.data.JSBId;
                    this.$set(this, "imgUrl", img);
                }
                else {
                    this.getTabsError(res);
                }
            },

            getTabsError: function () {
            },
            back: function () {
                window.history.go(-1);
            },
            save: function () {
                this.beforSave();
            },
            beforSave: function () {
                var data = {
                    "zId": this.JSBId,
                    "isWithManager": this.hfInfo.isWithManager,
                    "isMedication": this.hfInfo.isMedication,
                    //"isHarmBehavior": this.hfInfo.harmBehaviorRemark,
                    //"isHarmBehavior": this.hfInfo.isHarmBehavior

                };
                if (this.hfInfo.isHarmBehavior == 1) {
                    data.isHarmBehavior = this.hfInfo.harmBehaviorRemark
                } else {
                    data.isHarmBehavior = this.hfInfo.isHarmBehavior
                };
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/zszhAddRevisit",
                    data: data,
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });
            },
            saveSuccess: function (res) {
                if (res.success) {
                    // alert(this.hfInfo.harmBehaviorRemark);
                    alert('保存成功');
                    window.history.back(-1);
                }
            },
            saveError: function (res) {
                alert(' 保存失败');
            },
        },





        // computed  计算属性
        computed: {
            // hfMainFields: function () {
            //     return this.hfInfo.isHarmBehavior == 1 ? this.fields.hfMain : this.fields.hfMain.filter(function (field) {
            //         return field.name != "harmBehaviorRemark";
            //     })
            // }
        }

    });

});
