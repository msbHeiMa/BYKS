function initTable() {
    //先销毁表格  
    $('#table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据  
    $('#table').bootstrapTable({
        method: "get",  //使用get请求到服务器获取数据  
        url: restconfig.resturl + "/rest/tables/app_1",
        sidePagination: "server", //表示服务端请求
        pagination: true, //启动分页  
        pageSize: 5,  //每页显示的记录数  
        pageNumber: 1, //当前第几页     
        columns: [
            {
                field: 'state',
                checkbox: true
            },
            {
                title: '类别',
                field: 'CATEGORY',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '名称',
                field: 'NAME',
                align: 'center',
                valign: 'middle',
                formatter: serviceFormatter,
            },
            /*{
                 title: '服务列表',
                 field: 'NAME',
                 align: 'center',
                 valign: 'middle',
                 formatter: appFormatter,
             },*/
            {
                title: '节点',
                field: 'CIGNODE',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '地址',
                field: 'ACCESSADDRESS',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: operateFormatter,
            }
        ]
    });
}

$(document).ready(function () {
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
        jsonresult[i]["APPID"] = ids[i];
    }
    $('#table').bootstrapTable('remove', {
        field: 'APPID',
        values: ids
    });
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "DELETE",
        url: restconfig.resturl + "/rest/tables/app",
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
        return row.APPID;
    });
}
//触发模态框的同时调用此方法  
function add(obj) {
    $("#myModal").val("");
    $('#myModal').modal('show');
}
function addapp() {
    //获取模态框数据 
    var CATEGORY = $('#CATEGORY').val();
    var NAME = $('#NAME').val();
    var CIGNODE = $('#CIGNODE').val();
    var ACCESSADDRESS = ['/'+ $('#ACCESSADDRESS').val()+'/']
    var postjson = [{ "CATEGORY": CATEGORY, "NAME": NAME, "CIGNODE": CIGNODE, "ACCESSADDRESS": ACCESSADDRESS }];

    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "POST",
        url: restconfig.resturl + "/rest/tables/app",
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
        //"<a class='btn btn-link btn-xs' href='service.html?id="+row.APPID+"&title="+row.NAME+"'>",'<i class="fa fa-cog" style="color:#00a65a"></i>','原服务列表</a>',
        "<a class='btn btn-link btn-xs' href='param.html?id=" + row.APPID + "&title=" + row.CATEGORY + "'>", '<i class="fa fa-cog" style="color:#00a65a"></i>', '参数设置</a>',
        "<a class='btn btn-link btn-xs' href='node.html?id=" + row.APPID +  "&title=" + row.CATEGORY +"'>", '<i class="fa fa-dot-circle-o" style="color: #f39c12"></i>', '节点</a>',
        "<a class='btn btn-link btn-xs' href='appedit.html?id=" + row.APPID + "'>", '<i class="fa fa-edit " style="color: #f39c12"></i>', '编辑</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>'
    ].join('');
}
window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'APPID',
            values: [row.APPID]
        });
        if (row.CATEGORY == "静态应用") {
            var servicemanager = row.ACCESSADDRESS.split("/")[1];
            $.ajax({
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                type: "POST",
                url: "/proxymanager?method=deleteStaticProject",
                data: JSON.stringify({ "name": "servicemanager" }),
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                }
            });
        }
        else {
            $.ajax({
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                type: "DELETE",
                url: restconfig.resturl + "/rest/tables/app/" + row.APPID,
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                }
            });
        }
        location.reload();

    }
};

function serviceFormatter(value, row, index) {

    if (row.CATEGORY == "API") {
        return [
            "<a class='app' href='api.html?id=" + row.APPID + "&title=" + row.NAME + "'>" + row.NAME + '</a>',
        ].join('');
    }
    else {
        return [

            "<a class='service' href='demo" + row.APPID + ".html'>" + row.NAME + '</a>',
        ].join('');
    }
}
