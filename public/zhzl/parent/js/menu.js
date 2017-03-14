var menus = [
    {
        text: "首页",
        url: "",
        class: "",
        dirs: [
            "/home/"
        ],
        nodes: []
    },
    {
        text: "人员管理",
        url: "",
        class: "",
        dirs: [
            "/zszh/"
        ],
        nodes: [
            {
                id: "1",
                text: "户籍人口",
                href: "",
            },
            {
                id: "2",
                text: "流动人员",
                url: ""
            },
            {
                id: "3",
                text: "境外人员",
                url: ""
            },
            {
                id: "4",
                text: "留守人员",
                url: ""
            },
            {
                id: "5",
                text: "刑满释放人员",
                url: ""
            },
            {
                id: "6",
                text: "肇事肇祸精神病",
                href: "/zhzl/zszh/addlist.html"
            },
            {
                id: "7",
                text: "艾滋病危险人员",
                url: ""
            },
            {
                id: "8",
                text: "流浪乞讨人员",
                url: ""
            },
            {
                id: "9",
                text: "吸毒人员",
                url: ""
            },
            {
                id: "10",
                text: "重点青少年",
                url: ""
            },
            {
                id: "11",
                text: "重点上访人员",
                url: ""
            },
            {
                id: "12",
                text: "其他人员",
                url: ""
            }
        ]
    },
    {
        text: "物的管理",
        url: "",
        class: "",
        nodes: []
    },
    {
        text: "场所管理",
        url: "",
        class: "",
        nodes: []
    },
    {
        text: "组织管理",
        url: "",
        class: "",
        nodes: []
    },
    {
        text: "社会治安",
        url: "",
        class: "",
        nodes: [
            {
                id: "1",
                text: "重点地区排查",
                url: ""
            },
            {
                id: "2",
                text: "命案防控",
                url: ""
            },
            {
                id: "3",
                text: "寄递物流安全管理",
                url: ""
            }]
    },
    {
        text: "矛盾纠纷",
        url: "",
        class: "",
        nodes: []
    },
    {
        text: "校园及周边",
        url: "",
        dirs: [
            "/school/"
        ],
        class: "",
        nodes: [
            {
                id: "1",
                text: "学校周边重点人员",
                url: ""
            },
            {
                id: "2",
                text: "涉及师生的案（事）件",
                url: ""
            }
        ]
    },
    {
        text: "重特大案（事）件",
        url: "",
        class: "",
        nodes: []
    },
    {
        text: "事件管理",
        url: "",
        class: "",
        nodes: [
            {
                id: "1",
                text: "群众上报",
                url: ""
            },
            {
                id: "2",
                text: "网格员上报",
                url: ""
            }
        ]
    },
    {
        text: "综合管理",
        url: "",
        class: "",
        nodes: [
            {
                id: "1",
                text: "报表统计",
                url: ""
            },
            {
                id: "2",
                text: "研判分析",
                url: ""
            },
            {
                id: "3",
                text: "综治视联网信息中心",
                url: ""
            },
            {
                id: "4",
                text: "综合应急指挥",
                url: ""
            }
        ]
    },
    {
        text: "系统管理",
        url: "",
        class: "",
        nodes: [
            {
                id: "1",
                text: "权限管理",
                url: ""
            },
            {
                id: "2",
                text: "综治组织管理",
                url: ""
            }
        ]
    },
    {
        text: "日常办公",
        url: "",
        class: "",
        nodes: []
    },
];

function bindMenu() {
    var rootMenu = getCurMenu(menus);
    if (rootMenu) {
        selectRootMenu(rootMenu);
        if (rootMenu.nodes && rootMenu.nodes.length) {
            initMenuSide(rootMenu);
        }
    }
    else {

    }
    function getCurMenu(menus) {
        var pathname = location.pathname;
        var curMenu = null;
        $.each(menus, function () {
            var menu = this;
            if (menu.dirs && menu.dirs.length) {
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
    function initMenuSide(menu) {
        //TODO:创建菜单
        $('#treeViewSlider').treeview({
            data: menu.nodes,
            color: "#f5f5f5",//字体颜色
            backColor: "#333c4e",//背景颜色
            selectedBackColor:"black",//选择后背景颜色
            onhoverColor:"#333c4e",//鼠标滑过的背景颜色
            highlightSelected:true,
            borderColor:"#333c4e",//边框颜色
            text:"10px",
            enableLinks:true
        });
        var curMenu = getCurMenu(menu.nodes);
        if (curMenu) {
            selectMenu(curMenu);
            if (curMenu.nodes && curMenu.nodes.length) {
                expandMenu(curMenu);
            }
        }
    }
}

function selectRootMenu(menu) {
    //TODO:设置选中状态
}
function selectMenu(menu) {
    //TODO:设置选中状态
}
function expandMenu(menu) {
    //TODO:默认展开菜单
}
$(bindMenu);
