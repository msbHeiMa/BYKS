define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueBsTable',
    'vueBsTab'
], function (require, Vue, $, systemConfig, form, table, alert) {
    'use strict';
    var moduleName = systemConfig.getQueryParams().module;
    var tableHelper = table.helper;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            moduleName: moduleName,
            fields: {
            },
            data: $.extend([], { load: false }),
            ajaxOptions: {
                type: "get",
                data: {
                },
                url: systemConfig.backendurl + "/zszh/getProcStatusByfunmdataID",
            },
            funmdataID: null
        },
        components: {
            "ldgj": {
                template: '<div class="rk-ldgj" ref="root">\
                        <ul class="clearfix" v-for="group in groups">\
                            <li v-for="item in group.list" :style="{width:item.width}" :class="{active:item.arrowType == \'none\'}">\
                                <div v-if="item.hasData !== false">\
                                    <dl v-if="item.data.flag == \'start\'" class="green">\
                                        <dt>{{item.index}}</dt>\
                                    </dl>\
                                    <dl v-if="item.data.flag == \'completed\'" class="green">\
                                        <dt>{{item.index}}</dt>\
                                    </dl>\
                                    <dl v-if="item.data.flag == \'waiting\'" class="grey">\
                                        <dt>{{item.index}}</dt>\
                                    </dl>\
                                    <dl v-if="item.data.flag == \'running\'" class="blue">\
                                        <dt>{{item.index}}</dt>\
                                    </dl>\
                                    <div class="vline"></div>\
                                    <dl v-if="item.data.flag == \'start\'" class="detailgreen">\
                                        <dt>{{item.data.title}}</dt>\
                                        <dd class="info">\
                                           <ul>\
                                                <li v-if="item.data.title != \'结束\'">单位：{{item.data.departmentName}}</li>\
                                                <li v-if="item.data.flag == \'start\'">填报人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'running\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'waiting\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核意见：{{item.data.content}}</li>\
                                                <li v-if="item.data.flag == \'start\'">时间：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'running\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核：{{item.data.endDate}}</li>\
                                            </ul>\
                                        </dd>\
                                    </dl>\
                                    <dl v-if="item.data.flag == \'completed\'" class="detailgreen">\
                                        <dt>{{item.data.title}}</dt>\
                                        <dd v-if="item.data.title != \'结束\'" class="info">\
                                           <ul>\
                                                <li v-if="item.data.title != \'结束\'">单位：{{item.data.departmentName}}</li>\
                                                <li v-if="item.data.flag == \'start\'">填报人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'running\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'waiting\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核意见：{{item.data.content}}</li>\
                                                <li v-if="item.data.flag == \'start\'">时间：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'running\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核：{{item.data.endDate}}</li>\
                                            </ul>\
                                        </dd>\
                                        <dd v-if="item.data.title == \'结束\'" class="info">\
                                           <ul>\
                                                <li v-if="item.data.title != \'结束\'">{{item.data.title}}</li>\
                                                <li v-if="item.data.endDate != \'结束\'">时间：{{item.data.endDate}}</li>\
                                            </ul>\
                                        </dd>\
                                    </dl>\
                                    <dl v-if="item.data.flag == \'waiting\'" class="detailgrey">\
                                        <dt>{{item.data.title}}</dt>\
                                        <dd class="info">\
                                           <ul>\
                                                <li v-if="item.data.title != \'结束\'">单位：{{item.data.departmentName}}</li>\
                                                <li v-if="item.data.flag == \'start\'">填报人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'running\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'waiting\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核意见：{{item.data.content}}</li>\
                                                <li v-if="item.data.flag == \'start\'">时间：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'running\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核：{{item.data.endDate}}</li>\
                                            </ul>\
                                        </dd>\
                                    </dl>\
                                    <dl v-if="item.data.flag == \'running\'" class="detailblue">\
                                        <dt>{{item.data.title}}</dt>\
                                        <dd class="info">\
                                           <ul>\
                                                <li v-if="item.data.title != \'结束\'">单位：{{item.data.departmentName}}</li>\
                                                <li v-if="item.data.flag == \'start\'">填报人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'running\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'waiting\'">可审核人：{{item.data.userName}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核意见：{{item.data.content}}</li>\
                                                <li v-if="item.data.flag == \'start\'">时间：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'running\'">到达：{{item.data.startDate}}</li>\
                                                <li v-if="item.data.flag == \'completed\'">审核：{{item.data.endDate}}</li>\
                                            </ul>\
                                        </dd>\
                                    </dl>\
                                </div>\
                                <div v-if="item.hasData !== false" :class="[\'arrow\',item.arrowType]">\
                                    <span v-if="item.data.flag == \'start\'">提交</span>\
                                    <span v-if="item.data.flag == \'completed\'">{{(item.data.actionName=="APPROVE")?"通过":"退回"}}</span>\
                                    <div v-if="item.data.flag == \'start\'" class="imgpass"></div>\
                                    <div v-if="item.data.flag == \'completed\'" class="imgpass"></div>\
                                    <div v-if="item.data.flag == \'running\'" class="imgblue"></div>\
                                    <div v-if="item.data.flag == \'waiting\'" class="imgwait"></div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>',
                props: [
                    "data"
                ],
                mounted: function () {
                    var self = this;
                    this.width = this.$refs.root ? this.$refs.root.clientWidth : 0;
                    setInterval(function () {
                        self.width = self.$refs.root ? self.$refs.root.clientWidth : 0;
                    }, 100);
                },
                data: function () {
                    return {
                        width: 0,
                        // data:[
                        //     {"gridName":"高家墩居委会/桥南塘东片（第一网格）","createDate":null,"dAddr":null},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海市详址","flowReason":"流出县外1"},
                        //     {"gridName":"高家墩居委会/桥南塘东片（第一网格）","createDate":"2017-02-27 00:00:00","dAddr":"流入详址1","flowReason":"回家"},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海详址2","flowReason":"再出去"},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海详址3","flowReason":"再外出"},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海详址4","flowReason":"再外出"}
                        // ],
                        sampleGroups: [
                            {
                                list: [
                                    {
                                        width: "25%",
                                        arrowType: "right"
                                    },
                                    {
                                        width: "25%",
                                        arrowType: "right"
                                    },
                                    {
                                        width: "25%",
                                        arrowType: "right"
                                    },
                                    {
                                        width: "25%",
                                        arrowType: "down"
                                    }
                                ]
                            },
                            {
                                list: [
                                    {
                                        width: "25%",
                                        hasData: false
                                    },
                                    {
                                        width: "25%",
                                        arrowType: "",
                                        hasData: false
                                    },
                                    {
                                        width: "25%",
                                        arrowType: "none"
                                    },
                                    {
                                        width: "25%",
                                        arrowType: "left"
                                    }
                                ]
                            },
                            {
                                list: [
                                    {
                                        width: "33%"
                                    },
                                    {
                                        width: "33%"
                                    },
                                    {
                                        width: "33%",
                                        arrowType: "down"
                                    }
                                ],
                            },
                            {
                                list: [
                                    {
                                        width: "33%",
                                        hasData: false
                                    },
                                    {
                                        width: "33%",
                                        arrowType: "none"
                                    },
                                    {
                                        width: "33%",
                                        arrowType: "left"
                                    }
                                ]
                            }
                        ]
                    }
                },
                computed: {
                    groups: function () {
                        // if(this.width == 0) return [];
                        var w = parseInt(this.width);
                        var itemW = 200;
                        var itemW2 = "";
                        var rowCount = 0;
                        if (w / itemW > 4) {
                            itemW2 = "25%";
                            rowCount = 4;
                        }
                        else if (w / itemW > 3) {
                            itemW2 = "33%";
                            rowCount = 3;
                        }
                        else if (w / itemW > 2) {
                            itemW2 = "50%";
                            rowCount = 2;
                        }
                        else {
                            itemW2 = "100%";
                            rowCount = 1;
                        }
                        var groups = [];
                        var data = this.data;
                        var group = null;
                        var reverseGroup = true;
                        for (var i = 0; i < data.length; i++) {
                            if (group) {
                                if (group.length == rowCount) {
                                    addGroup();
                                }
                            }
                            else {
                                addGroup();
                            }
                            var indexText = (i + 1).toString();
                            indexText = indexText.length == 1 ? ("0" + indexText) : indexText;
                            var item = {
                                index: indexText,
                                arrowType: i == data.length - 1
                                    ? "none"
                                    : (group.length == rowCount - 1
                                        ? "down"
                                        : (reverseGroup ? "left" : "right")),
                                data: data[i],
                                width: itemW2,
                            };
                            group.push(item);
                        }
                        addGroup();
                        groups.pop();
                        return groups;

                        function addGroup() {
                            if (group && reverseGroup) {
                                group.reverse();
                                while (group.length < rowCount) {
                                    group.unshift({
                                        hasData: false,
                                        width: itemW2
                                    })
                                }
                            }
                            reverseGroup = !reverseGroup;
                            group = [];
                            groups.push({
                                list: group
                            });
                        }
                    }
                }
            }
        },
        mounted: function () {
            var query = systemConfig.getQueryParams();
            var funmdataID = query.funmdataID;
            if (funmdataID) {
                this.funmdataID = funmdataID;
                this.ajaxOptions.data.funmdataID = funmdataID;
                this.loadData();
            }
        },
        methods: {
            loadData: function () {
                this.ajaxOptions.success = this.getDataSuccess.bind(this);
                this.ajaxOptions.error = this.getDataError.bind(this);
                $.ajax(this.ajaxOptions)
            },
            getDataSuccess: function (res) {
                this.data.load = true;
                if (res.success) {
                    this.$set(this, "data", res.data.proData);
                }
                else {
                    this.getDataError(type, res);
                }
            },
            getDataError: function (type) {
                this.data.load = false;
            },
        }
    })
});