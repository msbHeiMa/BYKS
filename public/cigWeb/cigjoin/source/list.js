define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueAlert',
    'breadcrumb',
    'vueTableFilter',
    'vueBsPop'
], function (require, Vue, config, $, form, table, alert,breadcrumb) {
    'use strict';
    var tableHelper = table.helper;
    var formHelper = form.helper;
    
    breadcrumb.items.push({
        text:"数据源管理",
        url:"/cigWeb/cigjoin/source/list.html"
    });

    var tableVm = new Vue({
        data: {
            //设置快速查询项
            filters: [
                //支持直接设定options
                {
                    name: "accessStyle",
                    text: "来源方式",
                    all: true,
                    allItem: { text: "全部", value: "" },
                    type: "options",
                    options: [
                        { text: "Excel导入", value: "10" },
                        { text: "页面抓取", value: "20" },
                        { text: "数据库集成", value: "30" },
                    ]
                }
            ],
            //设置快速查询项的默认值
            filter: {
                accessStyle: ""
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: {
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns: [
                {
                    id: "add",
                    name: "新增",
                    enableClass: "btn-danger",
                    visible: true
                }
            ],
            //设置列表的关键字查询
            keyword: "",
            //设置列表的参数，是否显示多选列
            tableConfig: {
                checkbox: false
            },
            //设置列表的列
            tableColumns: [
                {
                    title: '数据源名称',
                    field: 'datasourceName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span><a :href="\'detail.html?id=\'+row.id" target="_blank">{{row.datasourceName}}</a></span>',
                },
                {
                    title: '来源单位',
                    field: 'datasourceUnit',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '执行更新频率',
                    field: 'updateFrequency',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '来源方式',
                    field: 'accessStyle',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("accessStyle", "accessStyle")
                },
                {
                    title: '关联系统',
                    field: 'relatedSystem',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '最后更新日期',
                    field: 'updateDate',//TODO
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '状态',
                    field: 'runState',//TODO
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("runState", "cigdsrunstate")
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template: '<span><a href="javascript:;" @click="edit">修改</a>|<a href="javascript:;" @click="del">删除</a></span>',
                        methods: {
                            edit: function () {
                                tableVm.editRow(this.row);
                            },
                            del: function () {
                                tableVm.deleteRow(this.row);
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
                        accessStyle: this.filter.accessStyle,
                        // filter:JSON.stringify(this.filter)//通用查询项的参数
                    },
                    url: config.backendurl + "/agg/datasourceServiceList"
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            //按钮方法
            executeCommand: function (command) {
                var func = "command" + command.substr(0, 1).toUpperCase() + command.substr(1);
                if (this[func]) {
                    this[func]();
                }
            },
            commandAdd: function () {
                location.href = "edit.html";
            },
            //每一行的方法
            editRow: function (row) {
                location.href = "edit.html?id=" + row.id;
            },
            deleteRow: function (row) {
                deleteVm.show();
                deleteVm.loadData(row);
            },
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
    var deleteVm = new Vue({
        el: "#remove",
        mixins: [
            pop,
            alert.getMixin()
        ],
        watch: {
        },
        mounted: function () {
        },
        data: {

        },
        computed: {

        },
        methods: {
            loadData: function (row) {
                this.id = row.id;
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                $.ajax({
                    "url": config.backendurl + "/agg/datasourceServiceDelete",
                    data: {
                        "id": this.id
                    },
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });
            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    tableVm.doSearch();
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res && res.errMsg) {
                    this.showError(res.errMsg);
                }
            }
        }
    });
    return function (listEl) {
        tableVm.$mount(listEl);
    }
});