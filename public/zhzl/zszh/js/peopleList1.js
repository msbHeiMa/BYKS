define([
    'require',
    'vue',
    'vueDomainPool',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
    'vueArea',
    'vueBsPop',
    'vueBsTreeview',
], function (require, Vue, domainPool, systemConfig, $, form, table, alert) {
    'use strict';
    // domainPool.cacheDomains(['gender','def']); //缓存当前页所需要的所有域
    var sfOptions = [{ text: "是", value: 1 }, { text: "否", value: 0 }];
    var ywOptions = [{ text: "有", value: 1 }, { text: "无", value: 0 }];
    var moduleName = systemConfig.getQueryParams().module;
    var formHelper = form.helper;
    var tableHelper = table.helper;
    var role = systemConfig.getRole();



    var filters = [
        {
            name: "dangerRank",
            text: "危险性评估等级",
            all: true,
            type: "domain",
            domainName: "dangerRank",
            // type: "options",
            // options: [
            //     { text: "0级", value: "01" },
            //     { text: "1级", value: "02" },
            //     { text: "2级", value: "03" },
            //     { text: "3级", value: "04" },
            //     { text: "4级", value: "05" },
            //     { text: "5级", value: "06" },
            // ]
        },
        {
            name: "manageLevel",
            text: "管理等级",
            all: true,
            type: "domain",
            domainName: "manageLevel",
            // type: "options",
            // options: [
            //     { text: "一级管理", value: "1" },
            //     { text: "二级管理", value: "2" },
            //     { text: "三级管理", value: "3" },
            //     { text: "四级管理", value: "4" },
            // ]
        },
        {
            name: "attackType",
            text: "目前诊断类型",
            all: true,
            type: "domain",
            domainName: "attackType",
            // type: "options",
            // options: [
            //     { text: "精神分裂症", value: "01" },
            //     { text: "分裂情感性障碍", value: "02" },
            //     { text: "持久的 妄想性障碍（偏执型精神病）", value: "03" },
            //     { text: "双向（情感）障碍", value: "04" },
            //     { text: "癫痫所致精神障碍", value: "05" },
            //     { text: "精神发育迟滞伴发精神障碍", value: "06" },
            //     { text: "重度抑郁发作", value: "07" },
            //     { text: "精神活性物质所致精神障碍", value: "08" },
            //     { text: "其他", value: "99" },
            // ]
        },
        {
            name: "peopleStatusQeo",
            text: "人员现状",
            all: true,
            type: "domain",
            domainName: "peopleStatusQeo",
            // type: "options",
            // options: [
            //     { text: "居家养病", value: "居家养病" },
            //     { text: "住院治疗", value: "住院治疗" },
            //     { text: "死亡", value: "死亡" },
            //     { text: "服刑", value: "服刑" },
            //     { text: "住址迁移", value: "住址迁移" },
            //     { text: "劳务工作", value: "劳务工作" },
            //     { text: "痊愈", value: "痊愈" },
            // ]
        }
    ];
    if (role != 'wanggeyuan') {
        filters.unshift({
            name: "dep",
            text: "辖区",
            type: "custom",
            component: '<cig-ajax-area\
                        :ajax-options="data.ajaxOptions" \
                        @input="input" \
                        v-model="valueProxy" \
                        empty-text="请选择" \
                        :value="valueProxy" \></cig-ajax-area>',
            ajaxOptions: {
                type: "get",
                "url": systemConfig.backendurl + "/system/queryUserDataDep"
            },
        })
    }
    var tableVm = new Vue({
        el: "#mainTable",
        data: {
            //设置辖区
            filters: filters,
            //设置快速查询项的默认值
            filter: {
                dep: null,
                manageLevel: "",
                dangerRank: "",
                attackType: "",
                peopleStatusQeo: "",
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: false,
            btns: [
                {
                    id: "add",
                    name: "新增",
                    enableClass: "btn-primary less-letter-btn",
                    visible: role == "cunguanliyuan",
                    //设置为true时按钮直接出现
                },
                {
                    id: "danger",
                    name: "危险性评估等级变更",
                    enableClass: "btn-danger",
                    visible: ["cunguanliyuan", "shequyisheng", "shequminjing"].indexOf(role) >= 0,
                    disabled: true
                    // visible:role == "all"按钮有权限
                },
                {
                    id: "manage",
                    name: "管理等级变更",
                    enableClass: "btn-warning",
                    visible: ["cunguanliyuan", "shequyisheng", "shequminjing"].indexOf(role) >= 0,
                    disabled: true
                },
                {
                    id: "returnCycle",
                    name: "随访周期设定",
                    enableClass: "btn-success",
                    visible: ["cunguanliyuan", "shequyisheng", "shequminjing", "jikongzhongxin", "gonganju"].indexOf(role) >= 0,
                    disabled: true
                },
                {
                    id: "event",
                    name: "事件查看",
                    enableClass: "btn-primary",
                    visible: true,
                    disabled: true
                },

            ],
            //设置列表的关键字查询
            keyword: "",
            //设置列表的参数，是否显示多选列
            tableConfig: {
                checkbox: true
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
                    title: '姓名',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'peopleDetailNew.html?JSBId=\'+row.JSBId">{{row.name}}</a>',
                },
                {
                    title: '性别',
                    field: 'gender',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("gender", "gender")
                },
                {
                    title: '危险性评估等级',
                    field: 'dangerRank',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("dangerRank", "dangerRank")
                },
                {
                    title: '管理等级',
                    field: 'manageLevel',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("manageLevel", "manageLevel")
                },
                {
                    title: '随访周期',
                    field: 'visitCyc',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '下次随访日期',
                    field: 'nextRevisitDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.nextRevisitDate && row.nextRevisitDate.substr(0,10)}}<span>",
                },
                {
                    title: '有无肇事肇祸史',
                    field: 'isCTrouble',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    // component: tableHelper.getDomainDisplayComponent("isCTrouble", "isCTrouble")
                    component: '<span v-if="row.isCTrouble==\'1\'">是</span>  <span v-else>否</span>',
                },
                {
                    title: '人员现状',
                    field: 'peopleStatusQeo',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("peopleStatusQeo", "peopleStatusQeo")
                },
                {
                    title: '目前诊断类型',
                    field: 'attackType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("attackType", "attackType")
                },
                {
                    title: '稳定期',
                    field: 'stablePeriod',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    // visible: role == "all",
                    component: {
                        template: (function (role) {
                            switch (role) {
                                case "shequminjing":
                                    return '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId + \'&name=\'+row.name+\'&cigrole=shequminjing\'">随访记录</a></span>';
                                case "shequyisheng":
                                    return '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId + \'&name=\'+row.name+\'&cigrole=shequyisheng\'">随访记录</a></span>';
                                case "wanggeyuan":
                                    return '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId + \'&name=\'+row.name+\'&cigrole=wanggeyuan\'">随访记录</a></span>';
                                case "cunguanliyuan":
                                    return '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId + \'&name=\'+row.name+\'&cigrole=cunguanliyuan\'">随访记录</a>&nbsp<a v-if="row.peopleStatusQeo==\'03\'" href="javascript:;" @click="remove">移除</a>&nbsp<a href="javascript:;" @click="emigrant">迁出</a></span>';
                                case "xianzongzhiban":
                                    return '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId">随访记录</a>&nbsp<a v-if="row.peopleStatusQeo==\'03\'" href="javascript:;" @click="remove">移除</a>';
                                default:
                                    return '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId">随访记录</a></span>';
                            }
                        })(role),

                        // template: '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId">随访记录</a>|<a href="javascript:;" @click="remove">移除</a></span>',
                        methods: {
                            remove: function () {
                                tableVm.removeRow(this.row);
                            },
                            emigrant: function () {
                                tableVm.emigrantRow(this.row);
                            }
                        }
                    },
                },
            ],
            tableAjaxOptions: {
            }
        },
        mounted: function () {
            this.doSearch();
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
            if (cigrole) {
                this.computAjaxOptions();
            }
        },
        methods: {
            tableSelectChange: function () {
                var rows = this.$refs.table.checkList;
                this.btns[1].disabled = rows.length <= 0;
                this.btns[2].disabled = rows.length <= 0;
                this.btns[3].disabled = rows.length <= 0;
                this.btns[4].disabled = rows.length <= 0;
            },
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions: function () {
                this.tableAjaxOptions = {
                    type: "get",
                    data: {
                        selectedDepartmentId: this.filter.dep,//回传选择辖区
                        keyword: this.keyword,//关键字参数
                        manageLevel: this.filter.manageLevel,//快速查询，左侧是数据库存储的名称，右侧是上面起的名称
                        dangerRank: this.filter.dangerRank,
                        attackType: this.filter.attackType,
                        peopleStatusQeo: this.filter.peopleStatusQeo,
                        cigrole: this.cigrole
                    },
                    "url": systemConfig.backendurl + "/zszh/zszhHomePsychiatricPatient",
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            // 刷新
            refresh: function () {
                this.$refs.table.loadRows();
            },
            //按钮方法
            executeCommand: function (command) {
                var func = "command" + command.substr(0, 1).toUpperCase() + command.substr(1);
                if (this[func]) {
                    this[func]();
                }
            },
            commandAdd: function () {
                // window.open("addPeople.html");
                addVm.show();
                addVm.reset();
            },
            commandDanger: function () {
                var rows = this.$refs.table.checkList;
                var ids = rows;
                if (ids.length > 1) {
                    art.dialog({
                        title: "警&nbsp告",
                        content: "单次只能调整一人危险性评估等级！",//以“skins/icons/”目录下的图标名作为参数名（不包含后缀名）
                        icon: "succeed",
                        lock: true,//是否锁定屏幕，默认是false
                        fixed: true,//静止在浏览器某个地方不动，不受滚动条拖动影响
                        time: 3000,//如果有cancel方法的话会调用cancel方法
                    });
                } else {
                    var JSBId = ids[0].JSBId;
                    var name = ids[0].name;
                    dangerVm.show();
                    dangerVm.reset();
                    dangerVm.loadTabs(JSBId);
                    dangerVm.loadData(name);
                }
            },
            commandManage: function () {
                var rows = this.$refs.table.checkList;
                var ids = rows;
                if (ids.length > 1) {
                    art.dialog({
                        title: "警&nbsp告",
                        content: "单次只能调整一人管理级别！",
                        icon: "succeed",
                        lock: true,
                        fixed: true,
                        time: 3000,
                    });
                } else {
                    var JSBId = ids[0].JSBId;
                    var name = ids[0].name;
                    manageVm.show();
                    manageVm.reset();
                    manageVm.loadTabs(JSBId);
                    manageVm.loadData(name);
                }
            },
            commandReturnCycle: function () {
                var rows = this.$refs.table.checkList;
                var ids = rows;
                if (ids.length > 1) {
                    art.dialog({
                        title: "警&nbsp告",
                        content: "单次只能调整一人随访周期！",
                        icon: "succeed",
                        lock: true,
                        fixed: true,
                        time: 3000,
                    });
                } else {
                    var JSBId = ids[0].JSBId;
                    var name = ids[0].name;
                    revisitVm.show();
                    revisitVm.reset();
                    revisitVm.loadTabs(JSBId);
                    revisitVm.loadData(name);
                }
            },
            commandEvent: function (row) {
                var rows = this.$refs.table.checkList;
                var ids = rows;
                if (ids.length > 1) {
                    art.dialog({
                        title: "警&nbsp告",
                        content: "单次只能查看一人事件信息！",
                        icon: "succeed",
                        lock: true,
                        fixed: true,
                        time: 3000,
                    });
                } else {
                    location.href = 'event.html?JSBId=' + ids[0].JSBId + '&cardNum=' + ids[0].cardNum;
                }
            },
            removeRow: function (row) {
                removeModallVm.show();
                removeModallVm.reset();
                removeModallVm.loadData(row);
            },
            // 点击迁出
            emigrantRow: function (row) {
                emigrantModallVm.show();
                emigrantModallVm.reset();
                emigrantModallVm.loadData(row);
            }
        }
    });





    //网格员姓名option
    var userOption = [];
    // var user = [];
    var objectA = "";
    //新增弹出
    var pop = {
        methods: {
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            }
        }
    };
    //新增
    var addVm = new Vue({
        el: "#add",
        mixins: [
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                //身份证带出字段
                { label: "姓名", name: "name", type: "display", colSpan: 1 },
                { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                { label: "现住门（楼）详址", name: "rAddr", type: "display", colSpan: 2 },
                //用户填写字段
                { label: "危险性评估等级", name: "dangerRank", type: "selected", domainName: "dangerRank", colSpan: 1 },
                { label: "管理等级", name: "manageLevel", type: "selected", domainName: "manageLevel", colSpan: 1 },
                { label: "新增原因", name: "addReason", type: "selected", domainName: "addReason", colSpan: 1 },
                { label: "目前诊断类型", name: "attackType", type: "selected", domainName: "attackType", colSpan: 1 },
                { label: "人员现状", name: "peopleStatusQeo", type: "selected", domainName: "peopleStatusQeo", colSpan: 1 },
                { label: "随访周期", name: "visitCyc", type: "text", colSpan: 1 },
                { label: "有无肇事肇祸史", name: "isCTrouble", type: "selected", options: ywOptions, colSpan: 1 },
                { label: "网格员姓名", name: "userName", type: "selected", options: userOption, colSpan: 1 },
                { label: "家庭经济情况", name: "ecoSituatio", type: "selected", domainName: "ecoSituatio", colSpan: 1 },
                { label: "是否纳入低保", name: "isEfficiency", type: "selected", options: sfOptions, colSpan: 1 },
                { label: "监护人姓名", name: "guarderName", type: "text", colSpan: 1 },
                { label: "与当事人关系", name: "relationship", type: "text", colSpan: 1 },
                { label: "监护人联系方式", name: "guarderTel", type: "text", colSpan: 1 },
                { label: "监护人公民身份号码", name: "guarderCardNum", type: "text", colSpan: 2 },
                { label: "监护人现住门（楼）详址", name: "guarderAddr", type: "text", colSpan: 2 },

            ], {
                    "type": 1,
                    // "flowDate":new Date().Format("yyyy-MM-dd")
                }),
            formHelper.getValidatorMixin({
                // "guarderAddr": { minlength: 5 },
                // "guarderCardNum": { maxlength: 100 },
                // "outflowAddress":{maxlength:100},
            }, "form", "data")
        ],
        data: {
            keyword: "",
            searched: false,

        },
        methods: {
            reset: function () {
                this.keyword = "";
                this.resetFormData();
            },
            doSearch: function () {
                if (!this.keyword) {
                    this.showError("请输入身份证号码");
                    return;
                }
                if (!this.keyword.match(/(^[0-9]{14}[0-9xX]$)|(^[0-9]{17}[0-9xX]$)/)) {
                    this.showError("请输入完整的15位或18位身份证号码");
                    return;
                }
                this.getPersons();
            },
            getPersons: function () {
                this.searched = true;
                var tableAjaxOptions = {
                    type: "get",
                    data: {
                        queryName: this.keyword
                    },
                    "url": systemConfig.backendurl + "/zszh/listPeopleByNameAndCardNumber",
                    success: this.getPersonsSuccess.bind(this),
                    error: this.getPersonsError.bind(this)
                };
                $.ajax(tableAjaxOptions);
            },
            getPersonsSuccess: function (res) {
                if (res.success) {
                    if (res.data && res.data) {
                        var row = res.data;
                        this.id = row.id;
                        this.data.name = row.name;
                        this.data.cardNum = row.cardNum;
                        this.data.rAddr = row.rAddr;
                        this.data.gId = row.gId;
                        this.userName(this, row);

                    }
                    else {
                        this.showError("没有找到对应的人员");
                    }
                }
                else {
                    this.getPersonError(res);
                }

            },
            userName: function (objectA, row) {
                $.ajax({
                    url: systemConfig.backendurl + "/zszh/getGriderMsg",
                    data: {
                        gridId: row.gId,
                    },
                    success: function (res) {
                        var receivedGrider = [];
                        for (var i = 0; i < res.data.length; i++) {
                            userOption[i] = { text: res.data[i].userName, value: res.data[i].userId };
                        }
                        objectA.data.userName = userOption;
                        // objectA.data.userId = user;
                        // this.data.userId=user;
                    },
                });
            },

            getPersonsError: function (res) {
                this.showError(res && (res.message || res.errMsg || res));
            },
            close: function () {
                this.$refs.form.resetValidation();
                this.hide();
            },
            save: function () {
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if (!this.$refs.form.hasError()) {
                    $.ajax({
                        "url": systemConfig.backendurl + "/zszh/addPeopleThroughProcess",
                        data: {
                            "pId": this.id,
                            "griderId": this.data.userName,
                            "dangerRank": this.data.dangerRank,
                            "manageLevel": this.data.manageLevel,
                            "visitCyc": this.data.visitCyc,
                            "addReason": this.data.addReason,
                            "attackType": this.data.attackType,
                            "isCTrouble": this.data.isCTrouble,
                            "ecoSituatio": this.data.ecoSituatio,
                            "isEfficiency": this.data.isEfficiency,
                            "guarderName": this.data.guarderName,
                            "guarderTel": this.data.guarderTel,
                            "guarderCardNum": this.data.guarderCardNum,
                            "guarderAddr": this.data.guarderAddr,
                            "relationship": this.data.relationship,
                            "peopleStatusQeo": this.data.peopleStatusQeo,
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }
            },
            saveSuccess: function (res) {
                if (res.success) {
                    if (res.data && res.data.isValid === false) {
                        var state = {};
                        res.data.errors.forEach(function (err) {
                            state[err.name] = {
                                type: "error",
                                message: err.message
                            };
                        }, this);
                        this.$refs.form.setValidation(state);
                    }
                    else {
                        tableVm.doSearch();
                        this.hide();
                    }
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
                        window.location.reload();//页面刷新
                    }, 1000);
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res) {
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
        }
    });
    //危险
    var dangerVm = new Vue({
        el: "#danger",
        mixins: [
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                //带出字段
                { label: "姓名", name: "name", type: "display", colSpan: 1 },
                { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                { label: "现住门（楼）详址", name: "rAddr", type: "display", colSpan: 2 },
                { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                { label: "随访周期", name: "visitCyc", type: "display", colSpan: 1 },
                { label: "危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                { label: "申请危险性评估等级", name: "finalLevel", type: "selected", domainName: "dangerRank", colSpan: 1 },
                { label: "申请原因", name: "adjustReason", type: "textarea", colSpan: 2 },
            ], {
                    "type": 1,
                    // "flowDate":new Date().Format("yyyy-MM-dd")
                }),
            formHelper.getValidatorMixin({
                // "guarderAddr": { minlength: 5 },
                // "guarderCardNum": { maxlength: 100 },
                // "outflowAddress":{maxlength:100},
            }, "form", "data")
        ],
        data: {
            dangerName: null,
        },
        mounted: function () {
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
        },
        methods: {
            reset: function () {
                // this.keyword = "";
                this.resetFormData();
            },
            /**基础信息*/
            loadTabs: function (JSBId) {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/listMessageForSettings",
                    data: {
                        JSBId: JSBId,
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
                    var row = res.data;
                    this.data.name = row.name;
                    this.data.manageLevel = row.manageLevel;
                    this.data.cardNum = row.cardNum;
                    this.data.dangerRank = row.dangerRank;
                    this.data.visitCyc = row.visitCyc;
                    this.data.rAddr = row.rAddr;
                    this.data.JSBId = row.JSBId;
                    // this.$set(this, "mainInfo", res.data);
                    // 头像
                    // var img = systemConfig.backendurl + "/zszh/queryImageByJSBId?JSBId=" + res.data.JSBId;
                    // this.$set(this, "imgUrl", img);
                }
                else {
                    this.getError(res);
                }
            },
            getTabsError: function () {
            },/**基础信息end*/
            loadData: function (name) {
                this.dangerName = "危险性评估等级变更：" + name

            },
            close: function () {
                this.$refs.form.resetValidation();
                this.hide();
            },
            save: function () {
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                //

                if (!this.$refs.form.hasError()) {
                    $.ajax({
                        "url": systemConfig.backendurl + "/zszh/setDangerRank",
                        data: {
                            "JSBId": this.data.JSBId,
                            "originalLevel": this.data.dangerRank,
                            "finalLevel": this.data.finalLevel,
                            "adjustReason": this.data.adjustReason,
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }
            },
            saveSuccess: function (res) {
                if (res.success) {
                    if (res.data && res.data.isValid === false) {
                        var state = {};
                        res.data.errors.forEach(function (err) {
                            state[err.name] = {
                                type: "error",
                                message: err.message
                            };
                        }, this);
                        this.$refs.form.setValidation(state);
                    }
                    else {
                        tableVm.doSearch();
                        this.hide();
                    }
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
                        window.location.reload();//页面刷新
                    }, 1000);
                }
                else {
                    this.saveError(res);
                }

            },
            saveError: function (res) {
                if (res) {
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
        }
    });
    //管理
    var manageVm = new Vue({
        el: "#manage",
        mixins: [
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                //带出字段
                { label: "姓名", name: "name", type: "display", colSpan: 1 },
                { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                { label: "现住门（楼）详址", name: "rAddr", type: "display", colSpan: 2 },
                { label: "危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                { label: "随访周期", name: "visitCyc", type: "display", colSpan: 1 },
                { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                { label: "申请管理等级", name: "finalLevel", type: "selected", domainName: "manageLevel", colSpan: 1 },
                { label: "申请原因", name: "adjustReason", type: "textarea", colSpan: 2 },
            ], {
                    "type": 1,
                    // "flowDate":new Date().Format("yyyy-MM-dd")
                }),
            formHelper.getValidatorMixin({
                // "guarderAddr": { minlength: 5 },
                // "guarderCardNum": { maxlength: 100 },
                // "outflowAddress":{maxlength:100},
            }, "form", "data")
        ],
        data: {
            manageName: null,
        },
        mounted: function () {
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
        },
        methods: {
            reset: function () {
                // this.keyword = "";
                this.resetFormData();
            },
            /**基础信息*/
            loadTabs: function (JSBId) {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/listMessageForSettings",
                    data: {
                        JSBId: JSBId,
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
                    var row = res.data;
                    this.data.name = row.name;
                    this.data.manageLevel = row.manageLevel;
                    this.data.cardNum = row.cardNum;
                    this.data.dangerRank = row.dangerRank;
                    this.data.visitCyc = row.visitCyc;
                    this.data.rAddr = row.rAddr;
                    this.data.JSBId = row.JSBId;
                }
                else {
                    this.getError(res);
                }
            },
            getTabsError: function () {
            },/**基础信息end*/
            loadData: function (name) {
                this.manageName = "管理等级变更：" + name

            },
            close: function () {
                this.$refs.form.resetValidation();
                this.hide();
            },
            save: function () {
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if (!this.$refs.form.hasError()) {
                    $.ajax({
                        "url": systemConfig.backendurl + "/zszh/setManagerLevel",
                        data: {
                            "JSBId": this.data.JSBId,
                            "originalLevel": this.data.manageLevel,
                            "finalLevel": this.data.finalLevel,
                            "adjustReason": this.data.adjustReason,
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }
            },
            saveSuccess: function (res) {
                if (res.success) {
                    if (res.data && res.data.isValid === false) {
                        var state = {};
                        res.data.errors.forEach(function (err) {
                            state[err.name] = {
                                type: "error",
                                message: err.message
                            };
                        }, this);
                        this.$refs.form.setValidation(state);
                    }
                    else {
                        tableVm.doSearch();
                        this.hide();
                    }
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
                        window.location.reload();//页面刷新
                    }, 1000);
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res) {
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
        }
    });
    //随访
    var revisitVm = new Vue({
        el: "#revisit",
        mixins: [
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                //带出字段
                { label: "姓名", name: "name", type: "display", colSpan: 1 },
                { label: "公民身份号码", name: "cardNum", type: "display", colSpan: 1 },
                { label: "现住门（楼）详址", name: "rAddr", type: "display", colSpan: 2 },
                { label: "危险性评估等级", name: "dangerRank", type: "display", domainName: "dangerRank", colSpan: 1 },
                { label: "管理等级", name: "manageLevel", type: "display", domainName: "manageLevel", colSpan: 1 },
                { label: "目前周期", name: "visitCyc", type: "display", colSpan: 1 },
                { label: "设置周期", name: "finalCyc", type: "text", colSpan: 1 },
            ], {
                    "type": 1,
                    // "flowDate":new Date().Format("yyyy-MM-dd")
                }),
            formHelper.getValidatorMixin({
                // "guarderAddr": { minlength: 5 },
                // "guarderCardNum": { maxlength: 100 },
                // "outflowAddress":{maxlength:100},
            }, "form", "data")
        ],
        data: {
            revisitName: null,
        },
        mounted: function () {
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
        },
        methods: {
            reset: function () {
                // this.keyword = "";
                this.resetFormData();
            },
            /**基础信息*/
            loadTabs: function (JSBId) {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/listMessageForSettings",
                    data: {
                        JSBId: JSBId,
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
                    var row = res.data;
                    this.data.name = row.name;
                    this.data.manageLevel = row.manageLevel;
                    this.data.cardNum = row.cardNum;
                    this.data.dangerRank = row.dangerRank;
                    this.data.visitCyc = row.visitCyc;
                    this.data.rAddr = row.rAddr;
                    this.data.JSBId = row.JSBId;
                }
                else {
                    this.getError(res);
                }
            },
            getTabsError: function () {
            },/**基础信息end*/
            loadData: function (name) {
                this.revisitName = "随访周期设定：" + name

            },
            close: function () {
                this.$refs.form.resetValidation();
                this.hide();
            },
            save: function () {
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if (!this.$refs.form.hasError()) {
                    $.ajax({
                        "url": systemConfig.backendurl + "/zszh/setRevisitSys",
                        data: {
                            "JSBId": this.data.JSBId,
                            "cigrole": this.cigrole,
                            "originalCyc": this.data.visitCyc,
                            "finalCyc": this.data.finalCyc,
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }
            },
            saveSuccess: function (res) {
                if (res.success) {
                    if (res.data && res.data.isValid === false) {
                        var state = {};
                        res.data.errors.forEach(function (err) {
                            state[err.name] = {
                                type: "error",
                                message: err.message
                            };
                        }, this);
                        this.$refs.form.setValidation(state);
                    }
                    else {
                        tableVm.doSearch();
                        this.hide();
                    }
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
                        window.location.reload();//页面刷新
                    }, 1000);
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res) {
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
        }
    });
    // 移除
    var removeModallVm = new Vue({
        el: "#removeModal",
        data: {
            fields: {
                ycMain: [
                    { label: "移除原因", name: "deleteReason", type: "radio", options: [{ text: "死亡", value: "死亡" }, { text: "超出管理范围", value: "超出管理范围" }], colSpan: 2 },
                ],
            },
            ycInfo: {
                deleteReason: null,
                JSBId: null,
                name: null,
                removeName: null

            },
        },

        mounted: function () {

            // loadData();
        },
        methods: {
            reset: function () {
                // this.keyword = "";
                this.resetFormData();
            },
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            loadData: function (row) {
                this.ycInfo.JSBId = row.JSBId;
                this.ycInfo.name = row.name;
                this.ycInfo.removeName = "被移除人：" + row.name

            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/removePeople",
                    data: {
                        "JSBId": this.ycInfo.JSBId,
                        "deleteReason": this.ycInfo.deleteReason
                    },
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });

            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    tableVm.refresh();
                }
                else {
                    this.saveError(res);
                }
                art.dialog({
                    title: "提示",
                    content: "操作成功！",
                    //以“skins/icons/”目录下的图标名作为参数名（不包含后缀名）
                    icon: "succeed",
                    lock: true,//是否锁定屏幕，默认是false
                    fixed: true,//静止在浏览器某个地方不动，不受滚动条拖动影响
                    time: 3000,//如果有cancel方法的话会调用cancel方法
                });
                setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                }, 2000);
            },
            saveError: function (res) {
                if (res && res.message) {
                    this.showError(res.message);
                }
            }
        }
    });
    // 迁出
    var emigrantModallVm = new Vue({
        el: "#emigrantModal",
        mixins: [
            // pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(
                [
                    { label: "迁出网格", name: "finalAddr", colSpan: 2 },
                    { label: "网格员姓名", name: "userName", type: "selected", options: userOption, colSpan: 1 },
                    { label: "迁出原因", name: "moveOutReason", type: "textarea", colSpan: 2 },

                ]),
            // formHelper.getValidatorMixin({
            //     "flowReason": { maxlength: 200 },
            // }, "form", "data")
        ],
        watch: {
        },
        mounted: function () {

        },
        data: {
            id: null,
            areaAjaxOptions: {
                type: "get",
                "url": systemConfig.backendurl + "/system/queryAllDep"
            },
            qcInfo: {
                JSBId: null,
                name: null,

            },
        },
        computed: {
            filterFields: function () {
                var filtered = ({
                    "1": ["finalAddr"],
                })[this.data.type];
                if (filtered) {
                    return this.fields.filter(function (field) {
                        return filtered.indexOf(field.name) < 0;
                    });
                }
                else {
                    return this.fields;
                }
            }
        },
        methods: {
            reset: function () {
                // this.keyword = "";
                this.resetFormData();
            },
            // 网格员姓名select
            gridSelected: function () {
                // console.log(this.data.gridName);
                $.ajax({
                    url: systemConfig.backendurl + "/zszh/getGriderMsg",
                    data: {
                        gridId: this.data.finalAddr,
                    },
                    success: function (res) {
                        var receivedGrider = [];
                        for (var i = 0; i < res.data.length; i++) {
                            userOption[i] = { text: res.data[i].userName, value: res.data[i].userId }
                        }
                        objectA.data.userName = userOption;
                    },
                });
            },
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            loadData: function (row, index) {
                this.qcInfo.JSBId = row.JSBId;
                this.qcInfo.name = row.name;
                objectA = this;
                // this.qcInfo.removeName = "被迁出人：" + row.name

            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if (!this.$refs.form.hasError()) {
                    $.ajax({
                        "url": systemConfig.backendurl + "/zszh/outPeople",
                        data: {
                            "JSBId": this.qcInfo.JSBId,
                            "griderId": this.data.userName,
                            "finalAddr": this.data.finalAddr,
                            "moveOutReason": this.data.moveOutReason,
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }
            },
            saveSuccess: function (res) {
                if (res.success) {
                    if (res.data && res.data.isValid === false) {
                        var state = {};
                        res.data.errors.forEach(function (err) {
                            state[err.name] = {
                                type: "error",
                                message: err.message
                            };
                        }, this);
                        this.$refs.form.setValidation(state);
                    }
                    else {
                        this.hide();
                        tableVm.refresh();
                    }
                    art.dialog({
                        title: "提示",
                        content: "操作成功！",
                        //以“skins/icons/”目录下的图标名作为参数名（不包含后缀名）
                        icon: "succeed",
                        lock: true,//是否锁定屏幕，默认是false
                        fixed: true,//静止在浏览器某个地方不动，不受滚动条拖动影响
                        time: 3000,//如果有cancel方法的话会调用cancel方法
                    });
                    setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                        window.location.reload();//页面刷新
                    }, 2000);
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res && res.message) {
                    this.showError(res.message);
                }
            }
        }
    });
});