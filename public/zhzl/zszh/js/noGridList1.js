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
    var moduleName = systemConfig.getQueryParams().module;
    var formHelper = form.helper;
    var tableHelper = table.helper;
    var role = systemConfig.getRole();
    var tableVm = new Vue({
        el: "#mainTable",
        data: {
            //设置快速查询项
            filters: [
                //支持设定辖区

            ],
            //设置快速查询项的默认值
            // filter: {
            //     dep: null,
            //     type: ""
            // },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: false,
            btns: false,
            //设置列表的关键字查询
            keyword: "",
            //设置列表的参数，是否显示多选列
            tableConfig: {
                checkbox: false
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
                    title: '身份证号',
                    field: 'cardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true
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
                    title: '户籍地',
                    field: 'domicile',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '现居住地',
                    field: 'residence',
                    align: 'center',
                    valign: 'middle',
                    visible: true
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
                    title: '目前危险性评估等级',
                    field: 'dangerRank',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("dangerRank", "dangerRank")
                },
                {
                    title: '有无肇事肇祸史',
                    field: 'isCTrouble',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span v-if="row.isCTrouble==\'1\'">是</span>  <span v-else>否</span>',
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: role == "xianzongzhiban",
                    // visible: role == "all",
                    // component: '<a target="_blank" :href="\'noGridAllot1.html?JSBId=\'+row.JSBId">分配网格员</a>',
                    // component: '<a href="javascript:;" @click="allot">分配网格员</a>',
                    component: {
                        template: '<a href="javascript:;" @click="allot">分配网格员</a>',


                        // template: '<span><a target="_blank" :href="\'revisitTable1.html?JSBId=\'+row.JSBId">随访记录</a>|<a href="javascript:;" @click="remove">移除</a></span>',
                        methods: {
                            allot: function () {
                                tableVm.allotRow(this.row);
                            }
                        }
                    },
                }
            ],
            tableAjaxOptions: {
            }
        },
        mounted: function () {
            this.doSearch();
        },
        methods: {
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions: function () {
                this.tableAjaxOptions = {
                    type: "get",
                    data: {
                        keyword: this.keyword,//关键字参数
                        // type: this.filter.type,
                        // dwdm: this.filter.dep,
                    },
                    "url": zhzlconfig.backendurl + "/zszh/listPoepleWithoutManager",
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            allotRow: function (row) {
                // tableVm.allotRow(this.row);
                allotVm.show();
                allotVm.reset();
                allotVm.loadTabs(row);
                allotVm.loadData(row);

            },
        }
    });
    //网格员姓名option
    var userOption = [];
    var objectA = "";
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
    //分配
    var allotVm = new Vue({
        el: "#allot",
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
                { label: "随访周期", name: "visitCyc", type: "display", colSpan: 2 },
                { label: "网格名称", name: "gridName", colSpan: 2 },
                { label: "网格员姓名", name: "userName", type: "selected", options: userOption, colSpan: 1 },
                { label: "联系方式", name: "gridPhone", type: "text", colSpan: 1 },
                { label: "派出所", name: "griderTel", type: "text", colSpan: 1 },
                { label: "社区医院", name: "residence", type: "text", colSpan: 1 },
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
        mounted: function () {
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
            // if (this.gridName != '请选择') {
            //    return this.userName();
            // }
        },
        data: {
            allotName: null,
            // filter: {
            //     dep: null,
            // },
            areaAjaxOptions: {
                type: "get",
                "url": systemConfig.backendurl + "/system/queryAllDep",
            },
            // userName(this);

        },
        computed: {
            filterFields: function () {
                var filtered = ({
                    "1": ["gridName"],
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
            reset: function() {
                // this.keyword = "";
                this.resetFormData();
            },
            // 网格员姓名select
            gridSelected: function () {
                // console.log(this.data.gridName);
                $.ajax({
                    url: systemConfig.backendurl + "/zszh/getGriderMsg",
                    data: {
                        gridId: this.data.gridName,
                    },
                    success: function (res) {
                        var receivedGrider = [];
                        for (var i = 0; i < res.data.length; i++) {
                            userOption[i] = { text: res.data[i].userName, value: res.data[i].userName }
                        }
                        objectA.data.userName = userOption;
                    },
                });
            },
            /**基础信息*/
            loadTabs: function (row) {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/listMessageForSettings",
                    data: {
                        JSBId: row.JSBId,
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
                    objectA = this;
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
            loadData: function (row) {
                this.allotName = "分配网格员：" + row.name

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
                        "url": systemConfig.backendurl + "/zszh/setGriderDirectly",
                        data: {
                            "JSBId": this.data.JSBId,
                            "gridName": this.data.gridName,
                            "griderName": this.data.griderName,
                            "gridPhone": this.data.gridPhone,
                            "userName": this.data.userName,
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
                    time: 2000,//如果有cancel方法的话会调用cancel方法
                });
                setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                }, 1000);
            },
            saveError: function (res) {
                if (res) {
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
        }

    });
});