

function initTable() {
    //先销毁表格  
    $('#table').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据  
    $('#table').bootstrapTable({
        method: "get",  //使用get请求到服务器获取数据  
        /*queryParams: function (param) {
            return {};
        },     
        idField: "Id",*/ 
        url:restconfig.resturl+"/rest/tableuserrows/notification/TYPE/1/STATE/0?sort=SENDDATE",
        sidePagination: "server", //表示服务端请求
        pagination: true, //启动分页  
        pageSize: 8,  //每页显示的记录数  
        sortOrder:'desc',
        //pageNumber: 1, //当前第几页     
        columns: [
            {
                field: 'state',
                checkbox: true
            },
            {
                title: '时间',
                field: 'SENDDATE',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '标题',
                field: 'HEADER',
                align: 'center',
                valign: 'middle',
                events: detailEvents,
                formatter: detailFormatter,
            },
            {
                title: '发起人',
                field: 'SENDERNAME',
                align: 'center',
                valign: 'SENDERNAME',
            },
          
            {
                title: '内容',
                field: 'CONTENT',
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
        ]
    });
}

$(document).ready(function () {
    //调用函数，初始化表格  
    initTable();

});
$('#table').on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table', function () {
        $('#read').prop('disabled', !$('#table').bootstrapTable('getSelections').length);

        // save your data, here just save the current page
        selections = getIdSelections();
        // push or splice the selections if you want to save all data selections
    });


$('#read').click(function () {
    /* var ids = getIdSelections();
     var jsonresult = new Array();
                  for (var i = 0; i < 1; i++) {
                      jsonresult[i] = {};
                  } 
                  jsonresult[0]['NOTIFICATIONID'] = ids;
                  jsonresult[0]['STATE'] = 1;
                   for (var i = 0; i < 1; i++) {
                      jsonresult[i][NOTIFICATIONID] = ids[i];
                  } 
                  jsonresult[i]['NOTIFICATIONID'] = ids[i];
                  jsonresult[i]['STATE'] = 1;*/

    var ids = getIdSelections();
    var jsonresult = new Array();
    for (var i = 0; i < ids.length; i++) {
        jsonresult[i] = {};
    }
    for (var i = 0; i < ids.length; i++) {
        jsonresult[i]['NOTIFICATIONID'] = ids[i];
        jsonresult[i]['STATE'] = 1;
        jsonresult[i]['READDATE'] ="(select sysdate from dual)";


    }


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
    location.reload();

    $('#read').prop('disabled', true);
});
function getIdSelections() {
    return $.map($('#table').bootstrapTable('getSelections'), function (row) {
        return row.NOTIFICATIONID
    });
}

function operateFormatter(value, row, index) {
    return [
        // "<a class='app' href='service.html?id="+row.APPID+"&title="+row.NAME+"'>"+row.NAME+'</a>'
        //"<a class='btn btn-link btn-xs' href='reply.html?id="+row.NOTIFICATIONID+"'>",'<i class="fa fa-edit " style="color: #f39c12"></i>','回复</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '</a>'
    ].join('');
}
window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        
        $('#table').bootstrapTable('remove', {
            field: 'NOTIFICATION',
            values: [row.NOTIFICATION]
        });
        $.ajax({
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            type: "DELETE",
            url: restconfig.resturl + "/rest/tables/notification/" + row.NOTIFICATIONID,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
            }
        });
        location.reload();

    }
};

/* function read() {
     var notificationId = "";
     var state = "1";
     var sendJson = {
         "NOTIFICATIONID": notificationId,
         "STATE": state,
     };

     $.ajax({
         type: "PUT",
         url: restconfig.resturl + "/rest/tables/notification",
         dataType: 'JSON',
         data: JSON.stringify(sendJson),
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json"
         },
         success: function (data, status) {

         },
     }); location.reload();
 }*/
function detailFormatter(value, row, index) {

    return [
        "<a class='reader' href='notificationdetail.html?id=" + row.NOTIFICATIONID + "&title=" + row.HEADER + "'>" + row.HEADER + '</a>',
    ].join('');
}

window.detailEvents = {
    'click .reader': function (e, value, row, index) {
         var ids = row.NOTIFICATIONID;
         var jsonresult = new Array();
         jsonresult[0]={};
        jsonresult[0]['NOTIFICATIONID'] = ids;
        jsonresult[0]['STATE'] = 1;
        jsonresult[0]['READDATE'] ="(select sysdate from dual)";

         $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "PUT",
        data: JSON.stringify(jsonresult),
        url: restconfig.resturl + "/rest/tables/notification",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            location.reload();
        }
        

    });
      

    }
};



