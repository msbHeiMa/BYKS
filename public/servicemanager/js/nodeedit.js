
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
        url: restconfig.resturl + "/rest/view/node/" + getQueryString("id"),//获取数据的Servlet地址  
        sidePagination: "server", //表示服务端请求

        columns: [
            {
                title: '节点地址',
                field: 'ADDRESS',
                align: 'center',
                valign: 'middle',
                editable: {
                    type: 'text',
                    title: '节点地址',

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
                        jsonresult[0]['ADDRESS'] = value;

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
                title: '创建人',
                field: 'CREATOR',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '创建时间',
                field: 'CREATEDATE',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '更新时间',
                field: 'UPDATEDATE',
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

function operateFormatter(value, row, index) {
    return [
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










