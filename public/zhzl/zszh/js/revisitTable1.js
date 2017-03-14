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
            filter: {
                dep: null,
                type: ""
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: false,
            btns: [
                {
                    id: "entering",
                    name: "添加",
                    enableClass: "btn-primary less-letter-btn",
                    visible: ["wanggeyuan", "cunguanliyuan", "shequyisheng", "shequminjing"].indexOf(role) >= 0,
                    //设置为true时按钮直接出现
                }],
            //设置列表的关键字查询
            keyword: "",
            //设置列表的参数，是否显示多选列
            tableConfig: {
                checkbox: false
            },
            //设置列表的列
            tableColumns: [
                {
                    title: '随访时间',
                    field: 'visitDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.visitDate && row.visitDate.substr(0,10)}}<span>",
                },
                {
                    title: '随访人员',
                    field: 'visitPeople',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '是否与监护人同住',
                    field: 'isWithManager',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("isWithManager", "isWithManager")
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
                },
                {
                    title: '备注',
                    field: 'remarks',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                }
            ],
            tableAjaxOptions: {
            }
        },
        mounted: function () {
            this.doSearch();
            this.commandEntering;
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
            if (JSBId) {
                this.computAjaxOptions();
            }
            var name = systemConfig.getQueryParams().name;
            this.name = name;
        },
        methods: {
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions: function () {
                this.tableAjaxOptions = {
                    type: "get",
                    data: {
                        JSBId: this.JSBId,
                        keyword: this.keyword,//关键字参数
                        type: this.filter.type,
                        dwdm: this.filter.dep,
                    },
                    "url": zhzlconfig.backendurl + "/zszh/queryRevisit"
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            executeCommand: function (command) {
                var func = "command" + command.substr(0, 1).toUpperCase() + command.substr(1);
                if (this[func]) {
                    this[func]();
                }
            },
            commandEntering: function () {
                // location.href = 'enteringNew.html?JSBId=' + this.JSBId;
                // window.open('entering1.html?JSBId=' + this.JSBId);
                // var JSBId = this.JSBId;
                var name = this.name;
                enterVm.show();
                enterVm.reset();
                enterVm.loadData(name);
            }
        }
    });
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
    //添加
    var enterVm = new Vue({
        el: "#enter",
        mixins: [
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                //带出字段
                { label: "随访对象", name: "name", type: "display", colSpan: 1 },
                { label: "随访日期", name: "visitDate", type: "date", colSpan: 1 },
                { label: "随访人员", name: "visitPeople", type: "text", colSpan: 1 },
                { label: "是否与监护人同住", name: "isWithManager", type: "selected", options: sfOptions, colSpan: 1 },
                { label: "是否按时吃药", name: "isMedication", type: "selected", options: sfOptions, colSpan: 1 },
                { label: "是否存在危害行为", name: "isHarmBehavior", type: "selected", domainName: "isHarmBehavior", colSpan: 1 },
                { label: "备注", name: "remarks", type: "textarea", colSpan: 2 },
            ], {
                    "type": 1,
                    "visitDate": new Date().Format("yyyy-MM-dd"),
                }),
            formHelper.getValidatorMixin({
                // "guarderAddr": { minlength: 5 },
                // "guarderCardNum": { maxlength: 100 },
                // "outflowAddress":{maxlength:100},
            }, "form", "data")
        ],
        data: {
            enterName: null,
        },
        mounted: function () {
            var cigrole = systemConfig.getQueryParams().cigrole;
            this.cigrole = cigrole;
            var JSBId = systemConfig.getQueryParams().JSBId;
            this.JSBId = JSBId;
        },
        methods: {
            reset: function () {
                // this.keyword = "";
                this.resetFormData();
            },
            loadData: function (name) {
                // this.enterName = "添加随访记录：" + name;
                this.data.name = name;

            },
            close: function () {
                this.$refs.form.resetValidation();
                this.hide();
            },
            save: function () {
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function (JSBId) {
                if (!this.$refs.form.hasError()) {
                    $.ajax({
                        "url": systemConfig.backendurl + "/zszh/zszhAddRevisit",
                        data: {
                            "zId": this.JSBId,
                            "visitDate": this.data.visitDate,
                            "visitPeople": this.data.visitPeople,
                            "isHarmBehavior": this.data.isHarmBehavior,
                            "isWithManager": this.data.isWithManager,
                            "isMedication": this.data.isMedication,
                            "remarks": this.data.remarks,
                            cigrole: this.cigrole,
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