
var opt = { "path": "/restapiserver/socket.io" };
var socket = io.connect(restconfig.resturl, opt);
socket.on('notification', function (data) {
    sendAjax(restconfig.resturl + "/rest/tablesuserrownum/notification/TYPE/1/STATE/0?sort=SENDDATE&order=desc", refreshNotification);
 //   console.log(data);
  flashText();
});
function sendAjax(url, Func) {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "GET",
        data: "",
        url: url,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
          Func(result);
        }
    });
}


function refreshNotification(result) {
    $('#notificationCount').each(function (e) {
        if(result.total>0)
        $(this).html(result.total);
        else{
            $(this).html("");
        }
    })
}
function refreshUndo(result) {
    $('#undoCount').each(function (e) {
         if(result.total>0)
        $(this).html(result.total);
        else{
            $(this).html("");
        }
    })
}
function counts(result) {
    $('#counts').each(function (e) {
        $(this).html("<a>您有</a>" + result.total + "<a>条通知</a>");
    })
}

function dropDown(result) {
    var htmlString = "";
    for (var i = 0; i < result.rows.length; i++) {
        htmlString += '<li>' +
            '<a href="notificationdetail.html?id='+result.rows[i].NOTIFICATIONID+'&title='+result.rows[i].HEADER+'" '+
            'onclick="clickDetail(this)"' +'>' +
            '<i class="fa fa-users text-aqua"></i>' + result.rows[i].HEADER +"  "+result.rows[i].SENDDATE+
            '</a>' +
            '</li>'
    }
    $('#notification_dropdowm').each(function (e) {
        $(this).html(htmlString);
    })
}

function clickDetail(result){
    var href=result.href;
    var id0=href.split("?");
    var id1=id0[1].split("&");
    var id2=id1[0].split("=");
    var jsonresult = new Array();
    for (var i = 0; i < 1; i++) {
        jsonresult[i] = {};
    }
        jsonresult[0]['NOTIFICATIONID'] =id2[1];
        jsonresult[0]['STATE'] = 1;
        jsonresult[0]['READDATE']="(select sysdate from dual)";
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "PUT",
        data: JSON.stringify(jsonresult),
        url: restconfig.resturl + "/rest/tables/notification",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
        }
    });
}



function nitificationDropdown() {
    sendAjax(restconfig.resturl + "/rest/tableuserrows/notification/TYPE/1/STATE/0?sort=SENDDATE&order=desc", dropDown);
    stopflash();
}

$.when($.ajax({
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    type: "GET",
    data: "",
    url: restconfig.resturl + "/rest/tablesuserrownum/notification/TYPE/1/STATE/0?sort=SENDDATE&order=desc",
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
}), $.ajax({
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    type: "GET",
    data: "",
    url: restconfig.resturl + "/rest/tablesuserrownum/notification/TYPE/0/STATE/0?sort=SENDDATE&order=desc",
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
})).done(function (data1, data2) {
  $('#notificationCount').each(function (e) {
        if(data1[0].total>0)
        $(this).html(data1[0].total);
        else{
            $(this).html("");
        }
    });
    $('#undoCount').each(function (e) {
      if(data2[0].total>0)
        $(this).html(data2[0].total);
        else{
            $(this).html("");
        }
    })
}).fail(function () {
});
var timeInt="";
var timeIntNum=0;

function stopflash(){
    clearInterval(timeInt);
    setTimeout(function () {
        if ($('#notificationCount').attr('class') == "label label-success") {
            $('#notificationCount').removeClass().addClass("label label-warning");
        }
         timeIntNum = 0;
    }, 100);

}
function flashText() {
    if (timeIntNum == 0) {
        function color() {
            if ($('#notificationCount').attr('class') == "label label-success") {
                $('#notificationCount').removeClass().addClass("label label-warning");
            }
            else if($('#notificationCount').attr('class')=="label label-warning"){
                $('#notificationCount').removeClass().addClass("label label-success");
            }
            timeIntNum = 1;
        }
        timeInt = setInterval(function () {
            color();
        }, 500);
    }
};

