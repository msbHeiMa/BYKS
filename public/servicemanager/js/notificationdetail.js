
    function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$(document).ready(function () {
    //var aaa = getQueryString("title");

    //document.getElementById("h3").innerHTML = aaa;
    //调用函数，初始化表格  
    initTable();
});


function initTable(url, Func) {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        data: "",
        url:  restconfig.resturl + "/rest/tables/notification/" + getQueryString("id"),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (result) {
             $("#RECEIVERID").val(result.rows[0].SENDERNAME)
             $("#HEADER").val(result.rows[0].HEADER)
             $("#CONTENT").val(result.rows[0].CONTENT)
              // $('value').html(result.rows[0].SENDERNAME);
            //console.log(result.rows[0].SENDERNAME)
          
         }
    })
}

