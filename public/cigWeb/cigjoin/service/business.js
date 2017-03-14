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
                        title: "协同治理",
                        id: "",
                        desc: "提供以城市问题和城市真实需求为靶向的城市治理信息（流程）服务",
                        items: [
                            {
                                title: "基础服务",
                                desc: "提供基础编码，辖区，组织机构树等基础服务",
                                lastFolder: true,
                                services: [
                                    {
                                        title: "公共参数",
                                        desc: "",
                                        id: "base/public.md",
                                        path: "cigApi/zhzl/public"
                                    },
                                    {
                                        title: "辖区服务",
                                        desc: "提供长兴县各辖区ID及所管辖辖区，社区/村和网格采用综治系统划分方式，非行政区",
                                        path: "cigApi/zhzl/system/queryAllDep",
                                        id: "base/depart.md",
                                    },
                                    {
                                        title: "基础编码服务",
                                        desc: "提供综治系统内所有相关编码的查询",
                                        path: "cigApi/zhzl/system/queryDomains",
                                        id: "base/domain.md",
                                    },
                                ]
                            },
                            {
                                title: "人口管理",
                                desc: "提供综治人口管理相关服务",
                                id: "",
                                lastFolder: true,
                                services: [
                                    {
                                        title: "实有人口",
                                        desc: "提供户籍人口、县外流入人口等人口网格化管理所需数据服务",
                                        id: "",
                                        services: [
                                            {
                                                title: "查询户籍人口分页列表",
                                                path: "cigApi/zhzl/person/familyPersons",
                                                id: "person/familyPersons.md"
                                            },
                                            {
                                                title: "查询县外流入人员分页列表",
                                                path: "cigApi/zhzl/person/flowPersons",
                                                id: "person/flowPersons.md"
                                            },
                                            {
                                                title: "通过身份证号码获取相应户籍人口信息",
                                                path: "cigApi/zhzl/person/queryFamilyPersons",
                                                id: "person/queryFamilyPersons.md"
                                            },
                                            {
                                                title: "通过身份证号码获取指定县外流入人员信息",
                                                path: "cigApi/zhzl/person/queryFlowPersons",
                                                id: "person/queryFlowPersons.md"
                                            },
                                            {
                                                title: "通过身份证号码获取指定实有人口信息",
                                                path: "cigApi/zhzl/person/queryPersons",
                                                id: "person/queryPersons.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口附属信息（户籍，亲属关系，产权房屋，承租房屋，居住房屋，车辆，精神病信息等）是否存在",
                                                path: "cigApi/zhzl/person/personTabs",
                                                id: "person/personTabs.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口基础信息",
                                                path: "cigApi/zhzl/person/personBaseInfo",
                                                id: "person/personBaseInfo.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口附属信息（户籍，亲属关系，产权房屋，承租房屋，居住房屋，车辆，精神病信息等）是否存在",
                                                path: "cigApi/zhzl/person/personTabs",
                                                id: "person/personTabs.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口流动轨迹信息",
                                                path: "cigApi/zhzl/person/",
                                                id: "person/flowTrack.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口亲属关系信息",
                                                path: "cigApi/zhzl/person/familyRelation",
                                                id: "person/familyRelation.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口所属户籍的信息",
                                                path: "cigApi/zhzl/person/cyGetFamily",
                                                id: "person/cyGetFamily.md"
                                            },
                                            {
                                                title: "通过人口ID，查询精神病人员信息",
                                                path: "cigApi/zhzl/person/jsbPersonInfo",
                                                id: "person/jsbPersonInfo.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口居住房屋信息",
                                                path: "cigApi/zhzl/person/jzHouse",
                                                id: "person/jzHouse.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口产权房屋信息",
                                                path: "cigApi/zhzl/person/cqHouse",
                                                id: "person/cqHouse.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口承租房屋信息",
                                                path: "cigApi/zhzl/person/czHouse",
                                                id: "person/czHouse.md"
                                            },
                                            {
                                                title: "通过人口ID，查询人口的车辆信息",
                                                path: "cigApi/zhzl/person/car",
                                                id: "person/car.md"
                                            },
                                            {
                                                title: "查询户籍信息分页列表",
                                                path: "cigApi/zhzl/person/familys",
                                                id: "person/familys.md"
                                            },
                                            {
                                                title: "通过户籍ID，查询户籍基础信息",
                                                path: "cigApi/zhzl/person/family",
                                                id: "person/family.md"
                                            },
                                            {
                                                title: "通过户籍ID，查询户籍详细信息",
                                                path: "cigApi/zhzl/person/getFamilyDetail",
                                                id: "person/getFamilyDetail.md"
                                            },
                                            {
                                                title: "查询符合指定条件的户籍人口和县外流入人口按区域分类的统计数量",
                                                path: "cigApi/zhzl/person/personInfoStatistic",
                                                id: "person/personInfoStatistic.md"
                                            },
                                            {
                                                title: "查询符合指定条件的所有人口按年龄分类的统计数量",
                                                path: "cigApi/zhzl/person/personAgeStatistic",
                                                id: "person/personAgeStatistic.md"
                                            },
                                            {
                                                title: "查询符合指定条件的所有人口分页列表",
                                                path: "cigApi/zhzl/person/personInfoPage",
                                                id: "person/personInfoPage.md"
                                            }
                                        ]
                                    },
                                    // {
                                    //     title: "特殊人群",
                                    //     desc: "基础服务的描述基础服务的描述基础服务的描述基础服务的描述基础服务的描述基础服务的描述",
                                    //     id: "",
                                    //     services: [
                                    //         {
                                    //             title: "肇事肇祸精神病",
                                    //             desc: "基础服务的描述基础服务的描述基础服务的描述基础服务的描述基础服务的描述基础服务的描述",
                                    //             id: "person/special/mental.md"
                                    //         }
                                    //     ]
                                    // },
                                ]
                            },
                            {
                                title: "肇事肇祸精神病",
                                desc: "肇事肇祸信息服务",
                                services: [
                                    {
                                        title: "肇事肇祸基本信息服务",
                                        desc: "基本信息服务：聚合实有人口，医疗信息等基础信息",
                                        path: "cigApi/zhzl/zszh/zszhPsychiatricPatientDetail",
                                        id: "zszh/baseMsg.md"
                                    },
                                    {
                                        title: "肇事肇祸治疗病史服务",
                                        desc: "肇事肇祸治疗病史服务",
                                        path: "cigApi/zhzl/zszh/zszhQueryJsbTreatHistory",
                                        id: "zszh/treatHistory.md"
                                    },
                                    {
                                        title: "肇事肇祸网格回访记录服务",
                                        desc: "肇事肇祸网格员回访记录",
                                        path: "cigApi/zhzl/zszh/queryRevisit",
                                        id: "zszh/revisit.md"
                                    }, {
                                        title: "综治实有人口人员流动轨迹服务",
                                        desc: "肇事肇祸人员流动轨迹：肇事肇祸人员迁入迁出记录",
                                        path: "cigApi/zhzl/zszh/getDeleteOutPeopleList",
                                        id: "zszh/outAndDelete.md"
                                    }
                                ]
                            }
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
                        desc: "提供涵盖文化、教育、医疗健康等民生领域的泛在化信息服务",
                    },
                    {
                        title: "应急指挥",
                        id: "",
                        desc: "提供统筹协调各类决策和资源要素信息服务",
                    },
                    {
                        title: "产业经济服务",
                        id: "",
                        desc: "提供统筹协调各类决策和资源要素信息服务",
                    }
            ],
            serviceComponent: {
                template: '<servicelist :services="data.services" @serviceclick="serviceclick"></servicelist>',
                components: {
                    servicelist: {
                        template: '<ul class="cig-service">\
                                <li v-for="service in services">\
                                    <div>\
                                        <h5>{{service.title}}</h5>\
                                        <a v-if="service.path" href="javascript:;" @click="serviceclick(service)" class="cig-sevice-link">{{service.path}}</a>\
                                        <p>{{service.desc}}</p>\
                                    </div>\
                                    <servicelist v-if="service.services && service.services.length" :services="service.services"  @serviceclick="serviceclick"></servicelist>\
                                </li>\
                            </ul>',
                        props: ["services"],
                        name: "servicelist",
                        methods: {
                            serviceclick: function (service) {
                                this.$emit('serviceclick', service);
                            }
                        },
                        mounted: function () {
                        }
                    }
                },
                methods: {
                    serviceclick: function (service) {
                        mainVm.loadServiceDoc(service);
                    }
                },
                mounted: function () {
                }
            },
            originBreadcrumbLength: 0,
            mdContent: null,
            showMd: false,
        },
        watch: {
            "curService": function (newVal) {
                this.loadServiceDoc(newVal);
            }
        },
        mounted: function () {
            breadcrumb.items.push({
                text: "信息聚合服务",
                fn: this.resetMenu.bind(this)
            });
            this.originBreadcrumbLength = breadcrumb.items.length;
            var query = config.getQueryParams();
            if (query && query.path) {
                this.setCurrentService(query.path);
            }

            this.$refs.menuTree.selectItem(this.menuTree[0], 0);
            // this.$refs.menuTree.selectItem(this.menuTree[0].items[0], 1);
        },
        methods: {
            setCurrentService: function (path) {
                var res = getServiceByPath(this.menuTree, path);
                if (res.service) {
                    this.resetMenu();
                    res.menus.forEach(function (menu, index) {
                        this.$refs.menuTree.selectItem(menu, index);
                    }, this);
                    this.loadServiceDoc(res.service);
                }
                function getServiceByPath(items, path) {
                    if (!items) return {};
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].path == path) {
                            return {
                                menus: [],
                                service: items[i]
                            };
                        }
                        var res = getServiceByPath(items[i].items || items[i].services, path);
                        if (res.service) {
                            res.menus.unshift(items[i]);
                            return res;
                        }
                    }
                    return {};
                }
            },
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
            loadServiceDoc: function (service) {
                var mdPath = service.id;
                if (mdPath) {
                    var url = require.toUrl("./mds/" + mdPath);
                    $.get(url, this.previewMd.bind(this));
                }
            },
            previewMd: function (mdstr) {
                this.showMd = true;
                var html = marked(mdstr);
                var convertHtml = this.convert(html);
                this.$set(this, "mdContent", convertHtml);
            },
            convert: function (html) {
                // return html;
                var $el = $("<div/>").html(html);
                var $conv = $("<div/>");
                var $row = null;
                var $cell = null;
                $el.children().each(function () {
                    if (this.tagName.toLowerCase() == "h2") {
                        $row = $("<dl class='dl-horizontal'><dt></dt><dd></dd></dl>");
                        $(this).remove().appendTo($row.find("dt"));
                        $row.appendTo($conv);
                        $cell = $row.find("dd");
                        return;
                    }
                    if ($cell) {
                        $(this).remove().appendTo($cell);
                    }
                    else {
                        $(this).remove().appendTo($conv);
                    }
                });
                return $conv.html();
            }
        }
    });
    return function (mainEl) {
        mainVm.$mount(mainEl);
    }
});