define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueAlert',
    'jQueryAjaxFileUpload',
    'vueExcelImport',
    'breadcrumb',
    'vueTableFilter',
    'vueBsPop'
], function (require, Vue, config, $, form, table, alert, upload, excelImport, breadcrumb) {
    'use strict';
    var tableHelper = table.helper;
    var formHelper = form.helper;
    
    breadcrumb.items.push({
        text:"数据源管理",
        url:"/cigWeb/cigjoin/source/list.html"
    });
    breadcrumb.items.push({
        text:"Excel导入",
    });
    var tableVm = new Vue({
        data: {
            //设置快速查询项
            filters: [
                // //支持直接设定options
                // {
                //     name: "accessStyle",
                //     text: "来源方式",
                //     all: true,
                //     allItem: { text: "全部", value: "" },
                //     type: "options",
                //     options: [
                //         { text: "Excel导入", value: "10" },
                //     ]
                // }
            ],
            //设置快速查询项的默认值
            filter: {
                accessStyle: "10"
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions: {
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns: [
                // {
                //     id: "add",
                //     name: "新增",
                //     enableClass: "btn-danger",
                //     visible: true
                // }
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
                        template: '<span><a href="javascript:;" @click="exportexcel">导出模板</a>|<a href="javascript:;" @click="importexcel">导入</a></span>',
                        methods: {
                            importexcel: function () {
                                tableVm.importexcel(this.row);
                            },
                            exportexcel: function () {
                                tableVm.exportexcel(this.row);
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
            exportexcel: function (row) {
                location.href = "edit.html?id=" + row.id;
            },
            importexcel: function (row) {
                importVm.show();
                importVm.loadData(row);
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
    var importVm = new Vue({
        el: "#importexcel",
        mixins: [
            pop
        ],

        // ajaxUrl: {
        //     // default: function () {
        //     //     return {
        //     //         "uploadFile": config.backendurl + "/common/uploadFileself",
        //     //         "getFiles": config.backendurl + "/common/getFilesaaa",
        //     //     }
        //     // },
        //     // type: Object
        // },
        data: {
            fields: [
                { label: "数据源名称", name: "datasourceName", type: "display", colSpan: 2 },
                { label: "导入Excel", name: "datasourceId", type: "display", colSpan: 2 },
            ],
            data: {
                datasourceName: null,
                datasourceId: null
            },
            id: null
        },
        methods: {
            loadData: function (datasource) {
                //this.$set(this.data, "datasourceId", datasource.id);
                this.$set(this, "id", datasource.id);
                this.$set(this.data, "datasourceName", datasource.datasourceName);
            },

            save: function () {
                // this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if (!this.$refs.form.hasError()) {
                    var ds = {
                        id: this.id
                    }
                    ds.files = {
                        datasource: this.data.datasourcepath
                    };
                    $.ajax({
                        "url": config.backendurl + "/agg/updateExcel",
                        data: {
                            "data": JSON.stringify(ds)
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
            },
            saveError: function (res) {
                if (res && res.errMsg) {
                    this.showError(res.errMsg);
                }
            },
            close: function () {
                this.hide();
            }
        }
    });
    return function (listEl) {
        tableVm.$mount(listEl);
    }
});

