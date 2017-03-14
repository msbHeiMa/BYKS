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
                    title: '案卷编号',
                    field: 'caseNo',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'http://219.131.197.178:9905/integrate/view/caseinfo.jsp?caseNo=\'+row.caseNo">{{row.caseNo}}</a>',
                },
                {
                    title: '当事人姓名',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'peopleDetailNew.html?JSBId=\'+row.JSBId">{{row.name}}</a>',
                },
                {
                    title: '当事人公民身份号码',
                    field: 'cardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '提交人姓名',
                    field: 'gender',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '提交人岗位',
                    field: 'domicile',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '提交时间',
                    field: 'residence',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.residence && row.residence.substr(0,10)}}<span>",
                },
            ],
            tableAjaxOptions: {
            },
            btns: []
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
                        type: this.filter.type,
                        dwdm: this.filter.dep,
                    },
                    "url": zhzlconfig.backendurl + "/zszh/querySuspectedJSBByGridName",
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
        }
    });
});