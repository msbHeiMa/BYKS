$('#table').bootstrapTable({
    url: "json/appdetail.json",
    dataType: "json",
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
            title: 'ID',
            field: 'id',
            align: 'center',
            valign: 'middle',
            sortable: true,
        },
        {
            title: '服务名称',
            field: 'servicename',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                var e = '<a href="serviceedit.html">10.1003.9090</a>';
                return e;
            }
        },
        {
            title: '类型',
            field: 'type',
            align: 'center',
            valign: 'middle'
        },
        {
            title: '操作',
            field: 'operate',
            align: 'center',
            formatter: function (value, row, index) {
                var a = '<button type="button" class="btn btn-link btn-xs"><span class="fa fa-ban" style="color: #f39c12 "></span><a href="#" mce_href="#" onclick="edit(\'' + row.id + '\')">取消</a></button> ';
                var b = '<button type="button" class="btn btn-link btn-xs"><span class="glyphicon glyphicon-pencil" style="color: #00a65a"></span><a href="#" mce_href="#" onclick="del(\'' + row.id + '\')">编辑</a></button> ';
                var c = '<button type="button" class="btn btn-link btn-xs"><span class="fa fa-close" style="color:#f56954"></span><a href="#" mce_href="#" onclick="del(\'' + row.id + '\')">删除</a></button> ';
                return a + b + c;
            }
        },
    ]
});
