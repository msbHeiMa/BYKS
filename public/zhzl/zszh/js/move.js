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
                    title: '身份证号码',
                    field: 'cardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,

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
                    title: '所属网格',
                    field: 'gridName',
                    align: 'center',
                    valign: 'middle',
                    visible: true
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
                    title: '有无肇事肇祸史',
                    field: 'isCTrouble',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span v-if="row.isCTrouble==\'1\'">是</span>  <span v-else>否</span>',
                },
                {
                    title: '诊断类型',
                    field: 'attackType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("attackType", "attackType")

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
                    title: '迁出网格',
                    field: 'finalAddrDartId',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '操作状态',
                    field: 'wfState',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '迁入日期',
                    field: 'createDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.createDate && row.createDate.substr(0,10)}}<span>",
                },
                {
                    title: '迁出（移除）日期',
                    field: 'outDeleteDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.outDeleteDate && row.outDeleteDate.substr(0,10)}}<span>",
                }
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
                    "url": zhzlconfig.backendurl + "/zszh/getDeleteOutPeopleList",
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            /*同意*/
            agreeRow: function (row) {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/processExecute",
                    data: {
                        "sn": row.sn,
                        "action": "APPROVE",
                    },
                    type: "post",
                    success: this.agreeSuccess.bind(this),
                    error: this.agreeError.bind(this),
                });
            },
            agreeSuccess: function (res) {
                if (res.success) {
                    alert('操作成功');
                }
            },
            agreeError: function (res) {
                alert(' 操作失败');
            },
            /*驳回*/
            backRow: function (row) {
                $.ajax({
                    "url": systemConfig.backendurl + "/zszh/processExecute",
                    data: {
                        "sn": row.sn,
                        "action": "APPROVE",
                    },
                    type: "post",
                    success: this.backSuccess.bind(this),
                    error: this.backError.bind(this),
                });
            },
            backSuccess: function (res) {
                if (res.success) {
                    alert('操作成功');
                }
            },
            backError: function (res) {
                alert(' 操作失败');
            },
        }
    });
});