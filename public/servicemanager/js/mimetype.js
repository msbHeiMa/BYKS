Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}




function initTable() {
    //先销毁表格  
    $('#table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据  
    $('#table').bootstrapTable({
        method: "get",  //使用get请求到服务器获取数据 
        url: restconfig.resturl + "/rest/tables/mimetype", //获取数据的Servlet地址  
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
                title: '扩展名',
                field: 'EXTENSIONNAME',
                align: 'center',
                valign: 'middle',
                editable: {
                    type: 'text',
                    title: '扩展名',
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
                        jsonresult[0]['MIMETYPEID'] = data[index].MIMETYPEID;
                        jsonresult[0]['EXTENSIONNAME'] = value;

                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/tables/mimetype",
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
                title: '文件类型',
                field: 'MIMETYPE',
                align: 'center',
                valign: 'middle',

            },
            {
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    });
}

$(document).ready(function () {
    //调用函数，初始化表格  
    initTable();
});

$('#table').on('check.bs.table uncheck.bs.table' + 'check-all.bs.table uncheck-all.bs.table', function () {
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
        jsonresult[i]["MIMETYPEID"] = ids[i];
    }
    $('#table').bootstrapTable('remove', {
        field: 'MIMETYPEID',
        values: ids
    });
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "DELETE",
        url: restconfig.resturl + "/rest/tables/mimetype",
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
        return row.MIMETYPEID
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

    var EXTENSIONNAME = $('#EXTENSIONNAME').val();
    var MIMETYPE = $('#MIMETYPE').val();

    var postjson = [{ "EXTENSIONNAME": EXTENSIONNAME, "MIMETYPE": MIMETYPE }];

    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "POST",
        url: restconfig.resturl + "/rest/tables/mimetype",
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

        '<a class="remove btn btn-link btn" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '</a>'
    ].join('');
}


window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'MIMETYPEID',
            values: [row.MIMETYPEID]
        });
        $.ajax({
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            type: "DELETE",
            url: restconfig.resturl + "/rest/tables/mimetype/" + row.MIMETYPEID,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
            }
        });
        location.reload();

    }
};