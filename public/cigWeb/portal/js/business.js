define([
    'require',
    'vue',
    'systemConfig',
    'breadcrumb',
    'jQuery',
    'marked',
    'vueBsTreeview',
    'menuTree'
], function (require, Vue, config, breadcrumb, $, marked) {
    'use strict';
    var mainVm = new Vue({
        data: {
            menuTree: [
                {
                    title: "流程服务",
                    items: [
                        {
                            title: "协同治理",
                            id: "",
                            desc: "提供以城市问题和城市真实需求为靶向的城市治理流程服务",
                            items: [
                                {
                                    title: "肇事肇祸",
                                    desc: "提供基础编码，辖区，组织机构树等基础服务",
                                    lastFolder: true,
                                    services: [
                                        {
                                            title: "肇事肇祸新增",
                                            nodes: [
                                                {
                                                    title: "节点：网格管理员新增",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                    ]
                                                },
                                                {
                                                    title: "节点：卫计局审核",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                    ]
                                                },

                                            ],
                                        },
                                        {
                                            title: "管理级别变更",
                                            nodes: [
                                                {
                                                    title: "节点：网络管理员\/民警\/社区医生申请",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\网格回访记录服务【提供过往回访记录信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/queryRevisit"
                                                        },
                                                    ]
                                                },

                                                {
                                                    title: "节点：卫计局审核",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\网格回访记录服务【提供过往回访记录信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/queryRevisit"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\实有人口\\人员流动轨迹服务【提供人员流动轨迹信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/getDeleteOutPeopleList"
                                                        },
                                                    ]
                                                },
                                            ],

                                        },
                                        {
                                            title: "危险级别变更",
                                            nodes: [
                                                {
                                                    title: "节点：网络管理员\/民警\/社区医生申请",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\网格回访记录服务【提供过往回访记录信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/queryRevisit"
                                                        },
                                                    ]
                                                },

                                                {
                                                    title: "节点：卫计局审核",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\网格回访记录服务【提供过往回访记录信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/queryRevisit"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\实有人口\\人员流动轨迹服务【提供人员流动轨迹信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/getDeleteOutPeopleList"
                                                        },
                                                    ]
                                                },

                                            ],

                                        }
                                    ],
                                },

                                {
                                    title: "事件上报",
                                    desc: "提供综治人口管理相关服务",
                                    id: "",
                                    lastFolder: true,
                                    services: [
                                        {
                                            title: "肇事肇祸事件【立案】",
                                            nodes: [
                                                {
                                                    title: "节点：受理员立案（如雉城街道综治中心业务员）",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\网格回访记录服务【提供过往回访记录信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/queryRevisit"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\实有人口\\人员流动轨迹服务【提供人员流动轨迹信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/getDeleteOutPeopleList"
                                                        },
                                                    ]
                                                },
                                            ],

                                        },
                                        {
                                            title: " 肇事肇祸事件【查看详情】（已送办，处置期）",
                                            nodes: [
                                                {
                                                    title: "节点：职能部门业务员（如派出所值班民警）打开待办案件【查看详情】",
                                                    desc: "",
                                                    id: "base/public.md",
                                                    links: [
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\基本信息服务【提供肇事肇祸基本信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhPsychiatricPatientDetail"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\治疗病史服务【提供过往治疗信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/zszhQueryJsbTreatHistory"
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\肇事肇祸\\网格回访记录服务【提供过往回访记录信息】",
                                                            url: ""
                                                        },
                                                        {
                                                            text: "信息聚合分系统\\综治\\实有人口\\人员流动轨迹服务【提供人员流动轨迹信息】",
                                                            url: "../cigjoin/service/business.html?path=cigApi/zhzl/zszh/getDeleteOutPeopleList"
                                                        },
                                                    ]
                                                },
                                            ],
                                        },

                                    ]
                                },

                                {
                                    title: "校园周边",
                                    desc: "",
                                    lastFolder: true,
                                    services: [
                                        // {
                                        //     title: "管理级别变更",
                                        //     nodes: [
                                        //         {
                                        //             title: "节点：网络管理员/民警/社区医生申请",
                                        //             desc: "",
                                        //             id: "base/public.md",
                                        //             links: [
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\肇事肇祸\基本信息服务【提供肇事肇祸基本信息】",
                                        //                     url: ""
                                        //                 },
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\肇事肇祸\治疗病史服务【提供过往治疗信息】",
                                        //                     url: ""
                                        //                 },
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\肇事肇祸\网格回访记录服务【提供过往回访记录信息】",
                                        //                     url: ""
                                        //                 },
                                        //             ]
                                        //         },

                                        //         {
                                        //             title: "节点：卫计局审核",
                                        //             desc: "",
                                        //             id: "base/public.md",
                                        //             links: [
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\肇事肇祸\基本信息服务【提供肇事肇祸基本信息】",
                                        //                     url: ""
                                        //                 },
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\肇事肇祸\治疗病史服务【提供过往治疗信息】",
                                        //                     url: ""
                                        //                 },
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\肇事肇祸\网格回访记录服务【提供过往回访记录信息】",
                                        //                     url: ""
                                        //                 },
                                        //                 {
                                        //                     text: "信息聚合分系统\综治\实有人口\人员流动轨迹服务【提供人员流动轨迹信息】",
                                        //                     url: ""
                                        //                 },
                                        //             ]
                                        //         },

                                        //     ],

                                        // },

                                    ],
                                },

                                {
                                    title: "实有人口",
                                    desc: "",
                                    lastFolder: true,
                                    services: [
                                        {

                                        },

                                    ],
                                },
                            ]
                        },

                        {
                            title: "政务服务",
                            id: "",
                            desc: "提供超越时间、空间、和部门分割制约的政务类信息服务",
                        },
                        {
                            title: "民生服务",
                            id: "",
                            desc: "提供涵盖文化、教育、医疗健康等民生领域的泛在化流程服务",
                        },
                        {
                            title: "应急指挥",
                            id: "",
                            desc: "提供统筹协调各类决策和资源要素流程服务",
                        },
                        {
                            title: "产业经济服务",
                            id: "",
                            desc: "提供统筹协调各类决策和资源要素信息服务",
                        }
                    ]
                },
                {
                    title: "统计服务",
                    url: "countService.html",
                    items: [
                    ]
                }
            ],
            serviceComponent: {
                template: '<ul class="cig-service">\
                                <li >\
                                    <div>\
                                        <ul class="cig-service">\
                                            <li v-for="service in data.services">\
                                                <div>\
                                                    <h5 class="cig-sevice-title">{{service.title}}</h5>\
                                                    <template v-for="node in service.nodes">\
                                                        <h6>{{node.title}}</h6>\
                                                        <ul class="cig-service">\
                                                            <li v-for="link in node.links">\
                                                                <a :href="link.url ? link.url : \'javascript:;\'" class="cig-sevice-link">{{link.text}}</a>\
                                                            </li>\
                                                        </ul>\
                                                    </template>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </li>\
                            </ul>',
            },
            originBreadcrumbLength: 0,
            mdContent: null,
            showMd: false
        },
        watch: {
            "curService": function (newVal) {
                this.loadServiceDoc(newVal);
            }
        },
        mounted: function () {
            breadcrumb.items.push({
                text: "流程服务分系统",
                fn: this.resetMenu.bind(this)
            });
            this.originBreadcrumbLength = breadcrumb.items.length;
            // 默认选中二级
            this.$refs.menuTree.selectItem(this.menuTree[0], 0);
        },
        methods: {
            resetMenu: function () {
                this.showMd = false;
                this.$refs.menuTree.clearSelect();
                breadcrumb.items.splice(this.originBreadcrumbLength);
            },
            menuChange: function (activeItems) {
                this.showMd = false;
                breadcrumb.items.splice(this.originBreadcrumbLength);
                activeItems.forEach(function (item, index) {
                    breadcrumb.items.push({
                        text: item.title,
                        fn: this.$refs.menuTree.selectItem.bind(this.$refs.menuTree, item, index)
                    });
                }, this)
            },
            // loadServiceDoc: function (service) {
            //     var mdPath = service.id;
            //     if (mdPath) {
            //         var url = require.toUrl("./mds/" + mdPath);
            //         $.get(url, this.previewMd.bind(this));
            //     }
            // },
            // previewMd: function (mdstr) {
            //     this.showMd = true;
            //     var html = marked(mdstr);
            //     var convertHtml = this.convert(html);
            //     this.$set(this, "mdContent", convertHtml);
            // },
            // convert: function (html) {
            //     // return html;
            //     var $el = $("<div/>").html(html);
            //     var $conv = $("<div/>");
            //     var $row = null;
            //     var $cell = null;
            //     $el.children().each(function () {
            //         if (this.tagName.toLowerCase() == "h2") {
            //             $row = $("<dl class='dl-horizontal'><dt></dt><dd></dd></dl>");
            //             $(this).remove().appendTo($row.find("dt"));
            //             $row.appendTo($conv);
            //             $cell = $row.find("dd");
            //             return;
            //         }
            //         if ($cell) {
            //             $(this).remove().appendTo($cell);
            //         }
            //         else {
            //             $(this).remove().appendTo($conv);
            //         }
            //     });
            //     return $conv.html();
            // }
        }
    });
    return function (mainEl) {
        mainVm.$mount(mainEl);
    }
});