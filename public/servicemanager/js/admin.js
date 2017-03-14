$(document).ready(function () {
    admin();
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
console.log(num)
//获取cookie，cookie中含有token来查找用户

function admin(url, Func) {
    $.ajax({
        headers: { Accept: "text/html, application/xhtml+xml, image/jxr, */*" },//xml和json写法不同
        type: "GET",
        data: "",
        url: usertoken.url + num,
        dataType: 'xml',
        contentType: "text/xml; charset=utf-8;",//注意xml和json写法不同
        success: function (xml) {
            var dataStr = $(xml).find("string").text();
            data = $.parseJSON(dataStr);//将获取到的xml数据转换成json格式  
            // console.log(data)
            $("#admin").html(data.YHMC);
             $("#adminuser").html(data.YHMC);
        }
    });

}

function logout(){
if (confirm("您确定要退出吗？"))
            top.location = "/proxymanager/smal/logout";
         return false;




}