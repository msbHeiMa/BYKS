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
            btns: false,
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
                    title: '申请项',
                    field: 'funmodelName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("funmodelName", "funmodelName")
                },
                {
                    title: '申请时间',
                    field: 'taskSdate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.taskSdate && row.taskSdate.substr(0,10)}}<span>",
                },
                {
                    title: '审批结果',
                    field: 'content',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    // component: '<span v-if="row.actionName==\'APPROVE\'"><a target="_blank" :href="\'requestStatus.html?funmdataID=\'+row.funmdataID">同意</a></span><span v-else><a target="_blank" :href="\'requestStatus.html?funmdataID=\'+row.funmdataID">驳回</a></span>',
                    component: '<span ><a target="_blank" :href="\'requestStatus.html?funmdataID=\'+row.funmdataID">查看</a></span>',
                },
            ],
            tableAjaxOptions: {
            },
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
                    "url": zhzlconfig.backendurl + "/zszh/getMyEvents",
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
        }
    });
});