define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
    'vueBsTab'
], function(require, Vue, $, systemConfig, form, table) {
    'use strict';
    var formHelper = form.helper;
    var moduleName = systemConfig.getQueryParams().module;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            fields: {
                //人员基本信息
                main: [
                    { label: "姓名", name: "name", type: "display", colSpan: 1 },
                    { label: "性别", name: "gender", type: "display", domainName: "gender", colSpan: 1 },
                    { label: "曾用名", name: "usedName", type: "display", colSpan: 1 },
                    { label: "出生日期", name: "birthDate", type: "display", colSpan: 1 },
                    { label: "民族", name: "nation", type: "display", domainName: "nation", colSpan: 1 },
                    { label: "籍贯", name: "nativePlace", type: "display", colSpan: 1 },
                    { label: "婚姻状况", name: "maritalStatus", type: "display", domainName: "maritalStatus", colSpan: 1 },
                    { label: "政治面貌", name: "plliticalStatus", type: "display", domainName: "plliticalStatus", colSpan: 1 },
                    { label: "学历", name: "education", type: "display", colSpan: 1 },
                    { label: "血型", name: "bloodType", type: "display", colSpan: 1 },
                    { label: "联系方式", name: "phone", type: "display", colSpan: 1 },
                    { label: "网格名称", name: "gridName", type: "display", colSpan: 2 },
                    { label: "户籍地", name: "domicile", type: "display", colSpan: 2 },
                    { label: "户籍门（楼）详址", name: "dAddr", type: "display", colSpan: 2 },
                    { label: "现住地", name: "residence", type: "display", colSpan: 2 },
                    { label: "现住门（楼）详址", name: "rAddr", type: "display", colSpan: 2 },
                    { label: "新增原因", name: "addReason", options: [{ text: "医院确诊", value: 1 }, { text: "事件上报", value: 1 }], type: "selected", colSpan: 1 },
                    { label: "目前诊断类型", name: "attackType", options: [{ text: "精神分裂症", value: "01" }, { text: "分裂情感性障碍", value: "02" }, { text: "持久的妄想性障碍(偏执性精神病）", value: "03" }, { text: "双相（情感）障碍", value: "04" }, { text: "癫痫所致精神障碍", value: "05" }, { text: "精神发育迟滞伴发精神障碍", value: "06" }, { text: "重度抑郁发作", value: "07" }, { text: "精神活性物质所致精神障碍", value: "08" }, { text: "其他", value: "99" }], type: "selected", colSpan: 1 },
                    { label: "家庭经济情况", name: "ecoSituatio", options: [{ text: "无固定经济来源", value: "01" }, { text: "有固定经济来源", value: "02" }, { text: "低收入家庭", value: "03" }, { text: "贫困", value: "04" }, { text: "其他", value: "99" }], type: "selected", colSpan: 1 },
                    { label: "是否纳入低保", name: "isEfficiency", options: [{ text: "是", value: 1 }, { text: "否", value: 0 }], type: "selected", colSpan: 1 },
                    { label: "监护人", name: "guarderName", type: "text", colSpan: 1 },
                    { label: "监护人联系方式", name: "guarderTel", type: "text", colSpan: 1 },
                    { label: "监护人公民身份号码", name: "guarderCardNum", type: "text", colSpan: 2 },
                    { label: "监护人现住门（楼）详址", name: "guarderAddr", type: "text", colSpan: 2 },
                    // { label: "有无肇事肇祸史", name: "isCTrouble", options: [{ text: "有", value: 1 }, { text: "否", value: 0 }], type: "selected", colSpan: 1 },
                    // { label: "肇事肇祸次数", name: "cTroubleCount", type: "text", colSpan: 1 },
                    // { label: "上次肇事肇祸日期", name: "cTroubleDate", type: "date", colSpan: 1 },
                ],

                //监护人信息
                // jhrMain: [


                // ],
            },
            tabs: {
                pdTabs: [
                    { text: "基础信息", name: "main" },
                ],

                // glTabs: [
                //     { text: "监护人信息", name: "jhrMain" },
                // ],
            },

            //基本信息
            mainInfo: {
                name: null,
                gender: null,
                usedName: null,
                birthDate: null,
                nation: null,
                nativePlace: null,
                maritalStatus: null,
                plliticalStatus: null,
                education: null,
                bloodType: null,
                phone: null,
                gridName: null,
                domicile: null,
                dAddr: null,
                residence: null,
                rAddr: null,
                guarderName: null,
                guarderTel: null,
                guarderCardNum: null,
                guarderAddr: null,
                addReason: null,
                attackType: null,
                ecoSituatio: null,
                isEfficiency: null,
                id: null,
                // isCTrouble: null,
                // cTroubleCount: null,
                // cTroubleDate: null,
            },
            // 监护人信息
            // jhrInfo: {

            // },

            //  头像
            imgUrl: "",
            //设置列表的关键字查询
            keyword: "",
        },

        // computed  计算属性
        computed: {
            // 监护人信息的下拉选项
            // jhrMainFields: function () {
            //     return this.jhrInfo.isCTrouble == 1 ? this.fields.jhrMain : this.fields.jhrMain.filter(function (field) {
            //         return field.name != "cTroubleCount" && field.name != "cTroubleDate";
            //     })
            // }
        },
        methods: {
            // 点击搜索
            doSearch: function() {
                if (this.keyword) {
                    this.getPersons();
                }
            },
            getPersons: function() {
                var options = {
                    type: "get",
                    data: {
                        queryName: this.keyword
                    },
                    "url": systemConfig.backendurl + "/zszh/listPeopleByNameAndCardNumber",
                    "success": this.getPersonsSuccess.bind(this),
                    "error": this.getPersonsError.bind(this),
                };
                $.ajax(options);
            },
            getPersonsSuccess: function(res) {
                if (res.success) {
                    this.$set(this, "mainInfo", res.data);
                    // 头像
                    var img = systemConfig.backendurl + "/zszh/queryImageByPsmId?id=" + res.data.id;
                    this.$set(this, "imgUrl", img);
                }
                else {
                    this.getPersonsError(res);
                }
            },

            getPersonsError: function() {
            },
            back: function() {
                // window.history.go(-1);
                window.location.href = 'peopleList1.html';
            },
            save: function() {
                this.beforSave();
            },
            beforSave: function() {
                var data = {
                    "pId": this.mainInfo.id,
                    "phone": this.mainInfo.phone,
                    "gridName": this.mainInfo.gridName,
                    "guarderName": this.mainInfo.guarderName,
                    "guarderTel": this.mainInfo.guarderTel,
                    "guarderCardNum": this.mainInfo.guarderCardNum,
                    "guarderAddr": this.mainInfo.guarderAddr,
                    "addReason": this.mainInfo.addReason,
                    "attackType": this.mainInfo.attackType,
                    "ecoSituatio": this.mainInfo.ecoSituatio,
                    "isEfficiency": this.mainInfo.isEfficiency,
                    "isCTrouble": this.mainInfo.isCTrouble,
                    "cTroubleCount": this.mainInfo.cTroubleCount,
                    "cTroubleDate": this.mainInfo.cTroubleDate
                };
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/addPeopleThroughProcess",
                    data: data,
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });
            },
            saveSuccess: function(res) {
                if (res.success) {
                    alert('保存成功');
                    // window.history.back(-1);
                    window.location.href = 'peopleList1.html';
                }
            },
            saveError: function(res) {
                alert(' 保存失败');
            },
        },
    });

});
