function sendnotification() {
    var receiverId= $("#username").val();
    var sendJson=new Array();
    var HEADER = $('#HEADER').val(); //获取header
    var CONTENT = $('#CONTENT').val();//获取content
    var TYPE = "1";
    var STATE = "0";
    var SENDDATE = "(select sysdate from dual)";
    var SENDERID= $("#adminuser").val();

    for(var i=0;i<receiverId.length;i++){
        sendJson[i]={
            "RECEIVERID":"",
             "HEADER":HEADER,
             "CONTENT":CONTENT,
             "STATE":STATE,
             "TYPE":TYPE,
             "SENDDATE":SENDDATE,
             "SENDERNAME":user
        };
    }
    
    for(var i=0;i<receiverId.length;i++){
        sendJson[i].RECEIVERID=receiverId[i];
    }
    $.ajax({
        type: "POST",
        url: restconfig.resturl + "/rest/socketmessage/notification",
        dataType: 'JSON',
        data: JSON.stringify(sendJson),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        success: function (data, status) {
           // alert("发送成功");
        },
    });
}

$(document).ready(function () {
     $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "GET",
        url: "http://192.168.3.97/A4admin/Rest/Services/User/Query?sort=Rkrq&order=desc",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var htmlString = "";
            for (var i = 0; i < result.rows.length; i++) {
                htmlString += '<option>' + result.rows[i].UserName + '</option>'
            }
            $('#name').each(function (e) {
                $(this).html(htmlString);
                $(this).selectpicker('refresh');
                $(this).selectpicker('show');
            })
        }
    });
    getuser();
})

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");//正则表达式将token从cookie中切出来
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

var num = getCookie('CIGToken');
var user="";
//获取cookie，cookie中含有token来查找用户

function getuser() {
    $.ajax({
        headers: { Accept: "text/html, application/xhtml+xml, image/jxr, */*" },//xml和json写法不同
        type: "GET",
        data: "",
        url: "http://192.168.3.97/a4service/webservice/tokenservice.asmx/GetTokenInfo?token=" + num,
        dataType: 'xml',
        contentType: "text/xml; charset=utf-8;",//注意xml和json写法不同
        success: function (xml) {
            var dataStr = $(xml).find("string").text();
            data = $.parseJSON(dataStr);//将获取到的xml数据转换成json格式  
            user=data.YHMC;
        }
    });

}

