
$(document).ready(function () {
    //调用函数，初始化表格 
    
    initTable();
    
});

function initTable() {
    var initQueryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            folio: "",
        };
        return temp;
    };
    
   
    //初始化表格,动态从服务器加载数据  
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/workflow/listTaskTodo",
        queryParams: initQueryParams,    
        columns: [
             {
                field: 'state',
                checkbox: true
            },
        //     {
        //         title: '业务数据ID',
        //         field: 'busiDataId',
        //         align: 'center',
        //         valign: 'middle'
        //     },
        //    {
        //         title: '流程实例ID',
        //         field: 'procisntId',
        //         align: 'center',
        //         valign: 'middle',
        //     },
        //     {
        //         title: '任务序号',
        //         field: 'sn',
        //         align: 'center',
        //         valign: 'middle',  
        //     },
        //     {
        //         title: '审核用户',
        //         field: 'userId',
        //         align: 'center',
        //         valign: 'middle', 
        //     },
             {
                title: '任务名称',
                field: 'folio',
                align: 'center',
                valign: 'middle', 
            },
            //  {
            //     title: '任务链接',
            //     field: 'taskUrl',
            //     align: 'center',
            //     valign: 'middle', 
            // },
            {
                title: '任务到达时间',
                field: 'taskSDate',
                align: 'center',
                valign: 'middle',
                formatter: dateFormatter,
            },
            {
                title: '审核环节名称',
                field: 'activityName',
                align: 'center',
                valign: 'middle',        
            },
            //  {
            //     title: '创建人',
            //     field: 'CREATE_USER',
            //     align: 'center',
            //     valign: 'middle',        
            // },
            //  {
            //     title: '创建时间',
            //     field: 'CREATE_DATE',
            //     align: 'center',
            //     valign: 'middle',        
            // },

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




function operateFormatter(value, row, index) {
    return [
        "<a class='btn btn-link btn-xs' href='todoDetails.html?JSBId=b9b04880-dfe5-4f67-83d3-81bb9926b97a'>", '<i class="fa fa-edit " style="color: #f39c12"></i>', '查看</a>',
        //'<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>',
        "<a class='btn btn-link btn-xs' href=''>", '<i class="fa fa-cog" style="color:#00a65a"></i>', '处理</a>'
    ].join('');
}
function dateFormatter(value, row, index) {
    return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
}
window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
     
            $.ajax({
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                type: "DELETE",
                url: restconfig.resturl + "/rest/zztables/liuchengyewu/" + row.id,
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                }
            });
        
        location.reload();

    }
};


