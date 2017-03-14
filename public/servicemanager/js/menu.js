$(document).ready(function () {

    menu();
});

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");//正则表达式将token从cookie中切出来
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

var num = getCookie('CIGToken');
//console.log(num)
//获取cookie，cookie中含有token来查找用户

function menu() {
    $.ajax({
        headers: { Accept: "text/html, application/xhtml+xml, image/jxr, */*" },//xml和json写法不同
        type: "GET",
        data: "",
        url: menutoken.url + num,
        dataType: 'xml',
        contentType: "text/xml; charset=utf-8;",//注意xml和json写法不同
        // success: function (xml) {
        //  var dataStr = $(xml).find("string").text();
        //data = $.parseJSON(dataStr);//将获取到的xml数据转换成json格式  
        success: function (xml) {
            var dataStr = $(xml).find("string").text();
            data = $.parseJSON(dataStr);//将获取到的xml数据转换成json格式
            //Todo:在这里构建菜单
            var root = dava[0];
            var levelCount = [];
            for (var i = 0; i < data.length; i++) {
                levelCount[i] = data[i + 1].M_LEVEL;
            }
            var level2 = [];
            var level3 = new Array();
            var level3Count = [];
            var tempLevel2Count = 0;
            for (var i = 0; i < levelCount.length; i++) {
                if (levelCount[i] == 2) {
                    level2[tempLevel2Count] = data[i];

                    for (j = i + 1; j < levelCount.length; j++) {
                        if (levelCount[j] == 3) {
                            level3[tempLevel2Count].push(data[j]);
                        }
                    }
                    tempLevel2Count++;
                }
            }
            var level2html = [];
            for (var i = 0; i < level2.length; i++) {
                for (var j = 0; j < level3[i].length;) {
                    level2html[i] = '<ul class="treeview-menu"><li><a href="index.html" id="meun-three-one"><i class="fa fa-circle-o"></i>' + level3[i][j] + '</a></li></ul>';
                }
            }
            var level2htmlResult = "";
            for (var i = 0; i < level2.length; j++) {
                level2htmlResult = '<li class="treeview"><a href="#"><i class="fa fa-th"></i> <span id="menu-two-one">' + level2[i] + '</span> <i class="fa fa-angle-left pull-right"></i></a>' + level2html[i] + '</li>';
            }
            $('#menuAll').html(level2htmlResult);
        }
    });
}
