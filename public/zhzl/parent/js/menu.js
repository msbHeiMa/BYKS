var menus = [
    {
        text: "首页",
        dirs: [
            "/home/",
        ],

    },
    {
        text: "人口管理",
        dirs: [
            "/syrk/",
            "/zszh/",
        ],
        nodes: [

        ]
    },
    {
        text: "物的管理",
        dirs: [
            "/wdgl/"
        ],
    },
    {
        text: "场所管理",
        dirs: [
            "/csgl/"
        ],
    },
    {
        text: "组织管理",
    },
    {
        text: "社会治安",
    },
    {
        text: "矛盾纠纷",
    },
    {
        text: "校园及周边安全",
        dirs: [
            "/school/"
        ],
    },
    {
        text: "事件管理",
    },
    {
        text: "指挥研判",
        dirs: [
            "/zhyp/"
        ],
    },
    {
        text: "日常管理",
        dirs: [
            "/lcgl/",
        ],
    },
    {
        text: "系统管理",
    },
];
var data = [
    {
        "Id": "35182590-FF49-4BE4-A4FD-719B2CF459E4",
        "Order": 40000,
        "Level": 1,
        "Name": "综合治理",
        "IsBs": true,
        "Url": null,
        "Lib": null,
        "RefLibs": null,
        "Comments": null,
        "Children": [
            {
                "Id": "5E38E627-1C9E-4C22-AEE2-DC5D18540BDE",
                "Order": 40321,
                "Level": 2,
                "Name": "首页",
                "IsBs": true,
                "Url": "/zhzl/home/index.html",
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "DB235ADF-8D1F-41D5-92C1-3CFE3D9D222A",
                        "Order": 40023,
                        "Level": 3,
                        "Name": "待办事项",
                        "IsBs": true,
                        "Url": "/zhzl/home/tasktodo.html",
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "50972F9E-73D4-4CB6-8DB7-3BD542DD2A96",
                        "Order": 40024,
                        "Level": 3,
                        "Name": "通知",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "1BB4A070-5D40-4422-B9BA-B41A54D43840",
                "Order": 40001,
                "Level": 2,
                "Name": "人口管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "5C6D0D2A-CC26-43D2-AD11-A5C202ED778A",
                        "Order": 40002,
                        "Level": 3,
                        "Name": "实有人口",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null,
                        "Children": [
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "户籍人口(查询)",
                                "IsBs": true,
                                "Url": "/zhzl/syrk/hjrk.html?cigrole=query",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "户籍人口(管理员)",
                                "IsBs": true,
                                "Url": "/zhzl/syrk/hjrk.html?cigrole=all",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "户籍维护",
                                "IsBs": true,
                                "Url": "/zhzl/syrk/hjEdit.html?cigrole=all",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "户主亲属关系维护",
                                "IsBs": true,
                                "Url": "/zhzl/syrk/hzqsEdit.html?cigrole=all",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "县外流入人口(查询)",
                                "IsBs": true,
                                "Url": "/zhzl/syrk/lrrk.html?cigrole=query",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "县外流入人口(管理员)",
                                "IsBs": true,
                                "Url": "/zhzl/syrk/lrrk.html?cigrole=all",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                        ]
                    },
                    {
                        "Id": "9989F6C2-0D2D-4277-AC52-C60FBC3880C9",
                        "Order": 40003,
                        "Level": 3,
                        "Name": "流动人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "8D762669-C400-4206-9A49-C84C718FA5A6",
                        "Order": 40004,
                        "Level": 3,
                        "Name": "境外人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "0FCB25E6-05E0-4D00-ACBC-1A5E0EFBE743",
                        "Order": 40005,
                        "Level": 3,
                        "Name": "留守人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "E0033447-5C0D-48EE-99F6-4F51F8775EDB",
                        "Order": 40006,
                        "Level": 3,
                        "Name": "刑满释放人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "7CA8F81F-6B8F-4310-9463-3F8243633D84",
                        "Order": 40007,
                        "Level": 3,
                        "Name": "特殊人群",
                        "IsBs": true,
                        "Url": "/zhzl/zszh/listStatistics.html",
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null,
                        "Children": [
                            {
                        "Id": "7CA8F81F-6B8F-4310-9463-3F8243633D84",
                        "Order": 40007,
                        "Level": 3,
                        "Name": "肇事肇祸精神病",
                        "IsBs": true,
                        "Url": "/zhzl/zszh/listStatistics.html",
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null,
                        "Children": [
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "服务管理",
                                "IsBs": true,
                                "Url": "/zhzl/zszh/peopleList.html",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "无网格员",
                                "IsBs": true,
                                "Url": "/zhzl/zszh/noGridList.html",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400055,
                                "Level": 4,
                                "Name": "危险性评估等级变更审核",
                                "IsBs": true,
                                "Url": "/zhzl/zszh/requestDanger.html",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400056,
                                "Level": 4,
                                "Name": "管理性评估等级变更审核",
                                "IsBs": true,
                                "Url": "/zhzl/zszh/requestManage.html",
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "季度评估报告",
                                "IsBs": true,
                                "Url":null,
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            },
                            {
                                "Id": "3333333333333",
                                "Order": 400013,
                                "Level": 4,
                                "Name": "研判分析",
                                "IsBs": true,
                                "Url": "/zhzl/zszh/analyzingList.html" ,
                                "Lib": null,
                                "RefLibs": null,
                                "Comments": null
                            }
                        ]
                    }]},
                    {
                        "Id": "B95066F4-9568-4D2D-9640-F4F16121A16F",
                        "Order": 40008,
                        "Level": 3,
                        "Name": "艾滋病危险人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "A2332494-30C8-410A-8A16-FF48C258140C",
                        "Order": 40009,
                        "Level": 3,
                        "Name": "流浪乞讨人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "6B8BBB39-EEAF-4FA1-A476-DE3CD1B44F50",
                        "Order": 40010,
                        "Level": 3,
                        "Name": "吸毒人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "21915B5C-611F-4A45-B23D-B1C42DB83E2A",
                        "Order": 40011,
                        "Level": 3,
                        "Name": "重点青少年",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "A281B340-9DD2-4CE5-9F64-9E6FDA07899A",
                        "Order": 40012,
                        "Level": 3,
                        "Name": "重点上访人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "AB13ED34-BD98-4DAC-B605-2BF3F9F99A61",
                        "Order": 40013,
                        "Level": 3,
                        "Name": "其他人员",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "23DBC4FA-2C15-4004-84E5-A9ECE2922CCA",
                "Order": 40014,
                "Level": 2,
                "Name": "物的管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "5C6D0D2A-CC26-43D2-AD11-A5C202ED778A",
                        "Order": 40002,
                        "Level": 3,
                        "Name": "车辆管理",
                        "IsBs": true,
                        "Url": "/zhzl/wdgl/cl.html",
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "399A8B64-33E7-4E2C-8667-D86DFB9E71FD",
                "Order": 40015,
                "Level": 2,
                "Name": "场所管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null
            },
            {
                "Id": "45DD5A63-B28A-4501-8421-E6C6192908A6",
                "Order": 40016,
                "Level": 2,
                "Name": "组织管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null
            },
            {
                "Id": "93D0CA81-D7EB-4773-ABC9-C9C528A2BAFD",
                "Order": 40017,
                "Level": 2,
                "Name": "社会治安",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "90AF97A3-BD50-4D0C-AEAF-737618EC0409",
                        "Order": 40018,
                        "Level": 3,
                        "Name": "重点地区排查",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "0DD57494-DC6C-4770-9B7D-690B1EE912BB",
                        "Order": 40019,
                        "Level": 3,
                        "Name": "命案防控",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "103E745B-EEC1-4D14-AADB-1D2BD72BF628",
                        "Order": 40020,
                        "Level": 3,
                        "Name": "寄递物流安全管理",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "E8105FE2-976E-4C3F-BA50-AEFCFDF2933E",
                "Order": 40021,
                "Level": 2,
                "Name": "矛盾纠纷",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null
            },
            {
                "Id": "5E38E627-1C9E-4C22-AEE2-DC5D18540BDE",
                "Order": 40022,
                "Level": 2,
                "Name": "校园及周边安全",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "DB235ADF-8D1F-41D5-92C1-3CFE3D9D222A",
                        "Order": 40023,
                        "Level": 3,
                        "Name": "学校周边重点人员",
                        "IsBs": true,
                        "Url": "/zhzl/school/school.html",
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "50972F9E-73D4-4CB6-8DB7-3BD542DD2A96",
                        "Order": 40024,
                        "Level": 3,
                        "Name": "涉及师生的案（事）件",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "2E21B47F-903C-4820-91C4-76D551CC14EC",
                "Order": 40025,
                "Level": 2,
                "Name": "重特大案（事）件",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null
            },
            {
                "Id": "5F6BCC03-1AD3-4E31-B4D8-3893E6F1AFD0",
                "Order": 40026,
                "Level": 2,
                "Name": "事件管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "8B7C019D-A899-4544-97A4-DBA799A6DA56",
                        "Order": 40027,
                        "Level": 3,
                        "Name": "群众上报",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "8CCB5E36-5695-4B0D-A4CC-7E715AF3AB39",
                        "Order": 40028,
                        "Level": 3,
                        "Name": "网格员上报",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "3C7673FB-40FB-448F-9BEC-792B12673DAF",
                "Order": 40029,
                "Level": 2,
                "Name": "综合管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "91EB7031-464A-4E01-94E8-E26B75F8A281",
                        "Order": 40030,
                        "Level": 3,
                        "Name": "报表统计",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "5A1ED15C-D99D-4C77-AE6F-18FB75C32B09",
                        "Order": 40031,
                        "Level": 3,
                        "Name": "研判分析",
                        "IsBs": true,
                        "Url": "/zhzl/zszh/analyzingList.html",
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "4F425B97-2F48-4FF2-BF61-5094AFB19B30",
                        "Order": 40032,
                        "Level": 3,
                        "Name": "综治视联网信息中心",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "F9729EEE-6B6D-458F-848A-BE09F57B9DCB",
                        "Order": 40033,
                        "Level": 3,
                        "Name": "综合应急指挥",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "CEF68C05-430B-4C89-BAB8-892244F0A759",
                "Order": 40034,
                "Level": 2,
                "Name": "系统管理",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null,
                "Children": [
                    {
                        "Id": "42379D89-C867-45A3-AAA6-30455449A0EC",
                        "Order": 40035,
                        "Level": 3,
                        "Name": "权限管理",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    },
                    {
                        "Id": "404DF8E3-8D6E-4275-974A-4A542E219B0B",
                        "Order": 40036,
                        "Level": 3,
                        "Name": "综治组织管理",
                        "IsBs": true,
                        "Url": null,
                        "Lib": null,
                        "RefLibs": null,
                        "Comments": null
                    }
                ]
            },
            {
                "Id": "579E07FE-29F0-4E4E-A62B-B18E7C5B4193",
                "Order": 40037,
                "Level": 2,
                "Name": "日常办公",
                "IsBs": true,
                "Url": null,
                "Lib": null,
                "RefLibs": null,
                "Comments": null
            }
        ]
    }
];

function rebuildMenus(data) {//将menus[]和data[]这两个数组结合到一起
    for (var i = 0; i < menus.length; i++) {//menus中能找到的就替换到data中
        for (var j = 0; j < data.length; j++) {
            if (menus[i].text == data[j].text) {
                menus[i].id = data[j].Id;
                menus[i].nodes = data[j].nodes;
                menus[i].Children = data[j].Children;
                menus[i].Url = data[j].Url;
                menus[i].href = data[j].href;
                menus[i].hasPermi = true;//有权限 才能加在data[]中的数据
                break;
            }
        }
        if (j == data.length) {
            menus[i].hasPermi = false;//无权限
        }
    }
}
function getCurMenu(menus) {
    var pathname = location.pathname;
    var curMenu = null;
    $.each(menus, function () {
        var menu = this;
        if (menu.hasPermi && menu.dirs && menu.dirs.length) {//根据menus[]中的dirs找到下面相应的数据，dirs=/home/ /zszh/等
            $.each(menu.dirs, function () {
                var dir = this;
                if (pathname.indexOf(dir) >= 0) {
                    curMenu = menu;
                    return false;
                }
                return true;
            });
            if (curMenu) {
                return false;
            }
        }
        return true;
    });
    return curMenu;
}

function initMenuSide(menunodes) {
    injectTreeView();

    $('#treeViewSlider').treeview({
        data: menunodes,
        backColor:"#f1f8ff",
        selectedBackColor:"#edf1f4",
        selectedColor:"#1f1f1f",
        enableLinks: true
    });

    function injectTreeView(){
        var proxy = $.proxy;
        var Tree = null;
        var injectProxy = function(fn,context){
            if(!Tree){
                Tree = context.constructor;
            }
            else{
                $.proxy = proxy;
            }
            return proxy.apply(this,arguments);
        };
        $.proxy = injectProxy;
        $("<div>").treeview({data:[]});
        try{
            var buildTree = Tree.prototype.buildTree;
            Tree.prototype.buildTree = function(){
                var res = buildTree.apply(this,arguments);
                treeUpdate(this.$element,this);
                return res;
            }
        }
        catch(e){
        }
    }
    function treeUpdate($tree,treeview){
        if(treeview.getNode(0)){
            updateNodes([treeview.getNode(0)].concat(treeview.getSiblings(0)),0);
        }
        function updateNodes(nodes,level){
            nodes.forEach(function(node){
                var nodeEl = $tree.find('[data-nodeid="'+node.nodeId+'"]');
                if(nodeEl && nodeEl.length){
                    nodeEl.addClass("treenode-level"+(level+1));
                    if(node && node.nodes){
                        updateNodes(node.nodes,level+1);
                    }
                }
            });
        }
    }          
}

function bindMenu(data) {
    function treeStructureAdapter(source, textField, hrefField, nodeField,level) {
        for (var i = 0; i < source.length; i++) {//将data[]中的Name，Url，Chirldren属性值更改成符合treeview的属性值
            source[i]["text"] = getMenuDisplayName(source[i][textField]);
            source[i]["href"] = source[i][hrefField];

            if(level <= 2){//控制左侧只显示两级菜单
                source[i]["nodes"] = source[i][nodeField] ? [].concat(source[i][nodeField]) : null;
                if (source[i]["nodes"] != null) {
                    // delete source[i][nodeField];
                    treeStructureAdapter(source[i]["nodes"], textField, hrefField, nodeField,level+1);
                    if(level > 0 && source[i]["nodes"][0].text == "首页"){//控制首页不显示在菜单树上
                        source[i]["nodes"].shift()
                    }
                }
            }
            else{
                if(!source[i]["href"]){
                    var children = source[i][nodeField];
                    source[i]["href"] = children && children[0] && children[0][hrefField];
                }
            }
        }
    }
    treeStructureAdapter(data, "Name", "Url", "Children",0);
    rebuildMenus(data[0].nodes);

    var rootMenu = getCurMenu(menus);
    if (rootMenu) {
        if (rootMenu.nodes && rootMenu.nodes.length) {//将tpl中传过来的路径进行匹配，使得treeview显示对应的nodes
            var menunodes = rootMenu.nodes;
            if (curModule != undefined) {//curModule为页面传来的路径：校园及周边安全/学校周边重点人员
                var menuArr = curModule.split("/");//将curModule中的/去掉
                selectRootMenu(menuArr.shift());//shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。将第一个一级菜单去掉供一级菜单的常亮样式使用
                selectTreeMenu(menunodes, menuArr, 0);
            }
            initMenuSide(menunodes);
        }
    }
    $("#hehe li").each(function(){
        var text = $(this).find('a:eq(1)').text();//find('a:eq(1)')排除了第一个一级标题‘首页’，因为首页不出现左侧菜单栏
        var href = null;
        for (var i = 0; i < menus.length; i++) {//根据去数据里找有没有符合的条件text、Url、Children等
            if (text == menus[i].text && !menus[i].hasPermi) {
                $(this).addClass("act").addClass("disabled");
            }
        }
    });

    $("#hehe li").on("click", function () {//layoutbase.tpl页面中一级标题的点击事件，用来获取一级标题的值
        if(!curUser)return;   
        var text = $(this).find('a:eq(1)').text();//find('a:eq(1)')排除了第一个一级标题‘首页’，因为首页不出现左侧菜单栏
        var href = null;
        for (var i = 0; i < menus.length; i++) {//根据去数据里找有没有符合的条件text、Url、Children等
            if (text == menus[i].text && menus[i].hasPermi) {
                if (menus[i].href != null) {
                    href = menus[i].Url;
                } else if (menus[i].Children) {
                    href = getTargetUrl(menus[i].Children);
                }
                break;
            }
        }
        if (href != null) {
            if(text == "事件管理"){
                href += (href.indexOf("?")>=0?"&":"?")+"token="+curUser.token+"&userid="+curUser.userId;
            }
            window.location.href = href;
        }
        function getTargetUrl(children) {//如果下一级菜单没有herf，判断再下一级有无herf
            if (children[0].Url) {
                return children[0].Url;
            } else if (children[0].Children) {
                return getTargetUrl(children[0].Children);
            } else {
                return null;
            }
        }
    });
}

function selectRootMenu(menuArr) {    
    $("#hehe li").each(function (i, dom) {
        if(menuArr==$(this).find("a:eq(1)").text()){
            $(this).addClass("act");
        }
    });
}


function selectTreeMenu(nodes, menuArr, level) {
    //菜单初始化后显示的状态，menuArr是写在tpl中的路径：校园及周边安全/学校周边重点人员 
    if (menuArr.length >= 1) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].text == menuArr[0]) {
                nodes[i].state = {};
                if (menuArr.length == 1) {
                    nodes[i].state.selected = true;//在数组中能找到值，二级的样式是被选中的
                } else {
                    nodes[i].state.expanded = true;//在数组中能找到值，菜单是展开的
                }
                menuArr.shift();
                break;
            }
        }
        if (i != nodes.length && menuArr.length != 0) {
            if(level > 0 && nodes[i].Children){
                tryBuildThreeLevelMenu(nodes[i].Children, menuArr);//如果在第三级中，创建三级菜单，并设置三级菜单的选中状态
            }
            else{
                selectTreeMenu(nodes[i].nodes, menuArr, level+1);//如果都没找到继续向下一个节点查找
            }
        }
    }
}

function getMenuDisplayName(name){
    return name.split("#").shift();
}

function tryBuildThreeLevelMenu(menus,menuArr){
    var isCur = false;
    var html = menus.map(function(menu){
        var displayName = getMenuDisplayName(menu.Name);
        var act = menuArr[0] == displayName;
        isCur = isCur || act;
        return "<li "+ (act?"class='active'":"") +"><a href='"+menu.Url+"'>"+displayName+"</a></li>"
    },this);
    if(isCur){
        $("#submenu").addClass("sub-menu").addClass("right-side").append($("<ul>").addClass("clearfix").html(html.join("")));
    }
}

var curUser;
$(function(){
    $.ajax({
        type:"get",
        // async:false,
        url:zhzlconfig.backendurl+ "/system/getUserMenu",
        success:function(res){
            if(res.success)bindMenu(res.data);
        }
    });
    $.ajax({
        type:"get",
        // async:false,
        url:zhzlconfig.backendurl+"/system/getCurUser",
        success:function(res){
            if(res.success){
                curUser = res.data;
                var name = res.data.userName;
                $("#spanUsername").text(name);
            }
        }
    })
});

