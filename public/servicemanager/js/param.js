
    function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$(document).ready(function () {
    var aaa = getQueryString("title");

    document.getElementById("h3").innerHTML = aaa;
    //调用函数，初始化表格  
    initTable();
});


function initTable(url, Func) {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        data: "",
        url:  restconfig.resturl + "/rest/view/param/" + getQueryString("id"),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (result) {
             console.log(result)
             //$("#test").html("")
             
            // $("#test").val(result.rows[0].ISNEEDLOGIN);
            $("#CREATOR").val(result.rows[0].CREATOR);
            $("#CREATEDATE").val(result.rows[0].CREATEDATE);
            $("[name='isneedlogin']").bootstrapSwitch(result.rows[0].ISNEEDLOGIN);
            // $("#CONTENT").val(result.rows[0].CONTENT)
              // $('value').html(result.rows[0].SENDERNAME);
            
          
         }
    })}

   
       
        

/*$(document).ready(function () {
    var aaa = getQueryString("title");

    document.getElementById("h3").innerHTML = aaa;
    //调用函数，初始化表格  
    initTable();

});*/


/*function initTable() {
    //先销毁表格  
    $('#table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据  
    $('#table').bootstrapTable({
        method: "get",  //使用get请求到服务器获取数据 
        queryParams: function (param) {
            return {};
        },
        idField: "Id",
        url: restconfig.resturl + "/rest/view/param/" + getQueryString("id"), //获取数据的Servlet地址  
        sidePagination: "server", //表示服务端请求
        //pagination: true, //启动分页  
        //pageSize: 5,  //每页显示的记录数  
        //pageNumber: 1, //当前第几页  
        //pageList: [5, 10, 15, 20, 25],  //记录数可选列表 
        columns: [
            {
                title: '登录',
                field: 'ISNEEDLOGIN',
                align: 'center',
                valign: 'middle',
                // events: ISRIGHTMANAGEEvents,
                formatter: ISRIGHTMANAGEFormatter
            },
            {
                title: 'XXX',
                field: 'ISNEEDLOGIN',
                align: 'center',
                valign: 'middle',
             
            },
            {
                title: 'XXX',
                field: 'ISNEEDLOGIN',
                align: 'center',
                valign: 'middle',
               
            },
            {
                title: 'XXX',
                field: 'ISNEEDLOGIN',
                align: 'center',
                valign: 'middle',
               
            },
            {
                title: 'XXX',
                field: 'ISNEEDLOGIN',
                align: 'center',
                valign: 'middle',
                
            }
        ],
        onLoadSuccess: function (rows) {
            $('.i-checkbox').bootstrapSwitch({
                onText: "ON",
                offText: "OFF",
                onColor: "primary",
                offColor: "default",
                size: "mini",
                onSwitchChange: function (event, state) {
                    var name = $(this).attr("name");
                    var data = $(this).attr("data");
                    var jsonresult = new Array();
                    for (var i = 0; i < 1; i++) {
                        jsonresult[i] = {};
                    }
                    jsonresult[0]['PARAMID'] = data;
                    var curState = 0;
                    if (state == true) {
                        curState = "1";
                    }
                    else {
                        curState = "0";
                    }
                     
                        jsonresult[0]['ISNEEDLOGIN'] = curState;
                        //           var ISMONITOR = document.getElementById("table").rows[id].innerText;
                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/view/param/" + getQueryString("id") + "/" + data,
                            dataType: 'JSON',
                            data: JSON.stringify(jsonresult),
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            success: function (data, status) {
                                if (status == "success") {
                                    //                   alert('方法修改成功');
                                }
                            },
                            error: function () {
                                // alert('编辑失败');
                            }
                        });
                  
                }
            })
        }
    });
}

$('#table').on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table', function () {
        $('#remove').prop('disabled', !$('#table').bootstrapTable('getSelections').length);
        // save your data, here just save the current page
        selections = getIdSelections();
        // push or splice the selections if you want to save all data selections
    });
$('#remove').click(function () {
    var ids = getIdSelections();
    var jsonresult = new Array();
    for (var i = 0; i < ids.length; i++) {
        jsonresult[i] = {};
    }
    for (var i = 0; i < ids.length; i++) {
        jsonresult[i]["SERVICEID"] = ids[i];
    }
    $('#table').bootstrapTable('remove', {
        field: 'SERVICEID',
        values: ids
    });
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "DELETE",
        url: restconfig.resturl + "/rest/view/service/" + getQueryString("id"),
        data: JSON.stringify(jsonresult),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
        }
    });
    location.reload();

    $('#remove').prop('disabled', true);
});
function getIdSelections() {
    return $.map($('#table').bootstrapTable('getSelections'), function (row) {
        return row.SERVICEID
    });
}


//触发模态框的同时调用此方法  
function add(obj) {
    // var id = $(obj).attr("APPID");  
    //获取表格中的一行数据  
    // var NAME = document.getElementById("table").rows[id].cells[0].innerText;
    //var ACCESSADDRESS = document.getElementById("table").rows[id].cells[1].innerText;  
    //var NODEADDRESS = document.getElementById("table").rows[id].cells[2].innerText;  

    //向模态框中传值  
    // $('#NAME').val(stuno);  
    // $('#ACCESSADDRESS').val(pass);  
    //$('#NODEADDRESS').val(name);
    $("#myModal").val("")
    $('#myModal').modal('show');
}
//提交更改  
function addapp() {
    //获取模态框数据
    var APPID = getQueryString("id");
    var NAME = $('#NAME').val();
    var METHOD = $('#METHOD').val();
    var ADDRESS = $('#ADDRESS').val();
    var ISRIGHTMANAGE = $('#ISRIGHTMANAGE').val();
    var ISMONITOR = $('#ISMONITOR').val();
    var postjson = [{ "APPID": APPID, "METHOD": METHOD, "NAME": NAME, "ADDRESS": ADDRESS, "ISRIGHTMANAGE": ISRIGHTMANAGE, "ISMONITOR": ISMONITOR }];

    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "POST",
        url: restconfig.resturl + "/rest/view/service/" + getQueryString("id"),
        data: JSON.stringify(postjson),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
        }
    });
    location.reload();
}

function operateFormatter(value, row, index) {
    return [
        "<a class='btn btn-link btn-xs' href='serviceedit.html?id=" + row.APPID + "'>", '<i class="fa fa-edit " style="color: #f39c12"></i>', '编辑</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>'
    ].join('');
}

window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'SERVICEID',
            values: [row.SERVICEID]
        });
        $.ajax({
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            type: "DELETE",
            url: restconfig.resturl + "/rest/tables/service/" + row.SERVICEID,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
            }
        });
        location.reload();

    }
};





function ISRIGHTMANAGEFormatter(value, row, index) {

    var checked = row.ISNEEDLOGIN == "1" ? "checked" : "";
    return [
        "<div class='switch'><input class='i-checkbox' data='" + row.PARAMID + "' name='isneedlogin' type='checkbox' " + checked + " /></div>"

    ].join('');


}


window.onload = function () {
}*/
