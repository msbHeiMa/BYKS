
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(document).ready(function () {
    //调用函数，初始化表格  
    initTable();
});

function initTable() {
    var initQueryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            bId: getQueryString("id"),
        };
        return temp;
    };
    
    
    //初始化表格,动态从服务器加载数据  
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/lcgl/roleList",
        queryParams: initQueryParams,       
        columns: [
            {
                title: '业务ID',
                field: 'bId',
                align: 'center',
                valign: 'middle'
            },
           {
                title: '角色代码',
                field: 'roleCode',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '角色名称',
                field: 'roleName',
                align: 'center',
                valign: 'middle', 
            },
             {
                title: '序号',
                field: 'roleOrder',
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
                title: '修改人日期',
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
        "<a class='btn btn-link btn-xs' href='editrole.html?id=" + row.id + "'>", '<i class="fa fa-edit " style="color: #f39c12"></i>', '编辑</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>',
         "<a class='btn btn-link btn-xs' href='approve.html?id="+row.id + "'>", '<i class="fa fa-cog" style="color:#00a65a"></i>', '配置人员</a>'
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
        url: zhzlconfig.backendurl + "/lcgl/roleDelete",
        success: function (result) {
            if(result.success){
                alert("删除成功");
                $('#table').bootstrapTable('refresh', {silent: true});
                
                
            }
        }
    });

    }
};

function addrole() {
    window.location.href = 'addrole.html?id='+getQueryString("id");
}


