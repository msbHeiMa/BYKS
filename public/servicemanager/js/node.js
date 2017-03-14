
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function initTable() {
    //先销毁表格  
    $('#table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据  
    $('#table').bootstrapTable({
        method: "get",  //使用get请求到服务器获取数据 
        queryParams: function (param) {
            return {};
        },
        idField: "Id",
        url: restconfig.resturl + "/rest/view/node/" + getQueryString("id"), //获取数据的Servlet地址  
        sidePagination: "server", //表示服务端请求
        pagination: true, //启动分页  
        pageSize: 5,  //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表 
        columns: [
            {
                field: 'state',
                checkbox: true
            },
           {
                title: '节点地址',
                field: 'ADDRESS',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '权重',
                field: 'WEIGHT',
                align: 'center',
                valign: 'middle',
                editable: {
                    type: 'text',
                    title: '权重',

                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
                        var data = $('#table').bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        console.log(data[index]);

                        //     if (!v) return '服务名称不能为空';
                        var jsonresult = new Array();
                        for (var i = 0; i < 1; i++) {
                            jsonresult[i] = {};
                        }
                        jsonresult[0]['NODEID'] = data[index].NODEID;
                        jsonresult[0]['WEIGHT'] = value;

                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/tables/node",
                            data: JSON.stringify(jsonresult),
                            dataType: 'JSON',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            success: function (data, status) {
                                if (status == "success") {
                                    alert('提交数据成功');
                                }
                            },
                            error: function () {
                                alert('编辑失败');
                            },
                            complete: function () {

                            }

                        });
                    }
                }
            },
            {
                title: '状态',
                field: 'STATE',
                align: 'center',
                valign: 'middle',
                formatter: STATEFormatter,
                // events: STATEEvents,
            },
            {
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: operateFormatter
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
                    jsonresult[0]['NODEID'] = data;
                    var curState = 0;
                    if (state == true) {
                        curState = "1";
                    }
                    else {
                        curState = "0";
                    }
                      jsonresult[0]['STATE'] = curState;
                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/view/node/" + getQueryString("id") + "/" + data,
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
$(document).ready(function () {
   var aaa = getQueryString("title");

    document.getElementById("h3").innerHTML = aaa;
    //调用函数，初始化表格  
    initTable();
});
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
        jsonresult[i]["NODEID"] = ids[i];
    }
    $('#table').bootstrapTable('remove', {
        field: 'NODEID',
        values: ids
    });
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "DELETE",
        url: restconfig.resturl + "/rest/view/node/" + getQueryString("id"),
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
        return row.NODEID
    });
}


function add(obj) {
    $("#myModal").val("")
    $('#myModal').modal('show');
}
//提交更改  
function addapp() {
    //获取模态框数据
    var APPID = getQueryString("id");
    var ADDRESS = $('#ADDRESS').val();
    var WEIGHT = $('#WEIGHT').val();
    var STATE = $('#STATE').val();
    var postjson = [{ "APPID": APPID, "ADDRESS": ADDRESS, "WEIGHT": WEIGHT, "STATE": STATE }];
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "POST",
        url: restconfig.resturl + "/rest/view/node/" + getQueryString("id"),
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
        "<a class='btn btn-link btn-xs' href='nodeedit.html?id=" + row.APPID + "'>", '<i class="fa fa-edit " style="color: #f39c12"></i>', '编辑</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>'
    ].join('');
}

window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'NODEID',
            values: [row.NODEID]
        });
        $.ajax({
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            type: "DELETE",
            url: restconfig.resturl + "/rest/tables/node/" + row.NODEID,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
            }
        });
        location.reload();

    }
};

function STATEFormatter(value, row, index) {
    var checked = row.STATE == "1" ? "checked" : "";
    return [
        "<div class='switch'><input class='i-checkbox' data='" + row.NODEID + "' name='state' type='checkbox' " + checked + " /></div>"
    ].join('');
}
