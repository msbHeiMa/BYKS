$(document).ready(function () {
    initTable();
});

function initTable() {
    var initQueryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            funmodel_name: "",
        };
        return temp;
    };
    
    //初始化表格,动态从服务器加载数据  
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/lcgl/proBusConfigList",
        queryParams: initQueryParams,    
        columns: [
            {
                title: '功能模块',
                field: 'funModelId',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '功能模块名称',
                field: 'funModelName',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '功能模块类型',
                field: 'funModelType',
                align: 'center',
                valign: 'middle',  
            },
            {
                title: '功能模块业务表名称',
                field: 'funModelTableName',
                align: 'center',
                valign: 'middle',  
            },
            {
                title: '状态',
                field: 'status',
                align: 'center',
                valign: 'middle', 
            },
            {
                title: '说明',
                field: 'des',
                align: 'center',
                valign: 'middle', 
            },
            {
                title: '功能模块发起页面',
                field: 'funModelSPageUrl',
                align: 'center',
                valign: 'middle', 
            },
            {
                title: '流程业务模版',
                field: 'busiId',
                align: 'center',
                valign: 'middle', 
            },
            {
                title: '创建人ID',
                field: 'createUser',
                align: 'center',
                valign: 'middle',   
            },
            {
                title: '创建日期',
                field: 'createDate',
                align: 'center',
                valign: 'middle',
                formatter: dateFormatter,        
            },
             {
                title: '修改人ID',
                field: 'updateUser',
                align: 'center',
                valign: 'middle',        
            },
             {
                title: '修改日期',
                field: 'updateDate',
                align: 'center',
                valign: 'middle',
                formatter: dateFormatter,       
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

function dateFormatter(value, row, index) {
    return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
}

function operateFormatter(value, row, index) {
    return [
        "<a class='btn btn-link btn-xs' href='busiconfigdetails.html?id=" + row.id + "'>", '<i class="fa fa-edit " style="color: #f39c12"></i>', '编辑</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>',
        // "<a class='btn btn-link btn-xs' href='role.html?id=" + row.id + "'>", '<i class="fa fa-cog" style="color:#00a65a"></i>', '添加角色</a>',
        // "<a class='btn btn-link btn-xs' href='businode.html?id=" + row.id + "'>", '<i class="fa fa-plus" style="color:#3c8dbc"></i>', '添加节点</a>'
    ].join('');
}
window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $('#table').bootstrapTable('remove', {
            field: 'id',
            values: row.id
        });
        
    $.ajax({
        type: "post",
        data: {id:row.id},
        url: zhzlconfig.backendurl + "/lcgl/proBusConfigDelete",
        success: function (result) {
            if(result.success){
                alert("删除成功");
                $('#table').bootstrapTable('refresh', {silent: true});
                
                
            }
        }
    });

    },
    
};


