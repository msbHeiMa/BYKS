
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
        url: restconfig.resturl + "/rest/tables/app/" + getQueryString("id"), //获取数据的Servlet地址  
        sidePagination: "server", //表示服务端请求 
        columns: [
            {
                title: '类别',
                field: 'CATEGORY',
                align: 'center',
                valign: 'middle',
                editable: {

                    source: [{ value: "应用", text: "应用" }, { value: "API", text: "API" }, { value: "图表", text: "图表" }, { value: "地图", text: "地图" }],
                    //编辑框的标题
                    type: 'select',
                    title: '类别',
                    mode: "popup",
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
                        jsonresult[0]['APPID'] = data[index].APPID;
                        jsonresult[0]['CATEGORY'] = value;

                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/tables/app",
                            data: JSON.stringify(jsonresult),
                            dataType: 'JSON',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            success: function (data, status) {
                                if (status == "success") {
                                    alert('应用类别修改成功');
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
                title: '名称',
                field: 'NAME',
                align: 'center',
                valign: 'middle',
                editable: {
                    type: 'text',
                    title: '名称',
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
                        jsonresult[0]['APPID'] = data[index].APPID;
                        jsonresult[0]['NAME'] = value;

                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/tables/app",
                            data: JSON.stringify(jsonresult),
                            dataType: 'JSON',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            success: function (data, status) {
                                if (status == "success") {
                                    alert('应用名称修改成功');
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
                title: '节点',
                field: 'CIGNODE',
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
                        jsonresult[0]['APPID'] = data[index].APPID;
                        jsonresult[0]['CIGNODE'] = value;

                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/tables/app",
                            data: JSON.stringify(jsonresult),
                            dataType: 'JSON',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            success: function (data, status) {
                                if (status == "success") {
                                    alert('节点修改成功');
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
                title: '地址',
                field: 'ACCESSADDRESS',
                align: 'center',
                valign: 'middle',
                editable: {
                    type: 'text',
                    title: '地址',
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
                        jsonresult[0]['APPID'] = data[index].APPID;
                        jsonresult[0]['ACCESSADDRESS'] = value;

                        $.ajax({
                            type: "PUT",
                            url: restconfig.resturl + "/rest/tables/app",
                            data: JSON.stringify(jsonresult),
                            dataType: 'JSON',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            success: function (data, status) {
                                if (status == "success") {
                                    alert('地址修改成功');
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
                title: '创建日期',
                field: 'CREATEDATE',
                align: 'center',
                valign: 'middle',

            },
            {
                title: '更新日期',
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
        '<a class="remove btn btn-link" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '</a>'
    ].join('');
}
window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'APPID',
            values: [row.APPID]
        });
        $.ajax({
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            type: "DELETE",
            url: restconfig.resturl + "/rest/tables/app/" + row.APPID,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
            }
        });
        location.reload();

    }
};