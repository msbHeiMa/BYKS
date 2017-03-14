
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
        url: restconfig.resturl + "/rest/view/api/" + getQueryString("id"), //获取数据的Servlet地址  
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
                title: '名称',
                field: 'NAME',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '方法',
                field: 'METHOD',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '地址',
                field: 'ADDRESS',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '说明',
                field: 'INSTRUCTION',
                align: 'center',
                valign: 'middle'
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
        jsonresult[i]["ID"] = ids[i];
    }
    $('#table').bootstrapTable('remove', {
        field: 'ID',
        values: ids
    });
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "DELETE",
        url: restconfig.resturl + "/rest/view/api/" + getQueryString("id"),
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
        return row.ID
    });
}


//触发模态框的同时调用此方法  
function add(obj) {
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
    var INSTRUCTION = $('#INSTRUCTION').val();
    var postjson = [{ "APPID": APPID, "METHOD": METHOD, "NAME": NAME, "ADDRESS": ADDRESS, "INSTRUCTION": INSTRUCTION }];

    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "POST",
        url: restconfig.resturl + "/rest/view/api/" + getQueryString("id"),
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
            field: 'ID',
            values: [row.ID]
        });
        $.ajax({
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            type: "DELETE",
            url: restconfig.resturl + "/rest/tables/api/" + row.ID,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
            }
        });
        location.reload();

    }
};