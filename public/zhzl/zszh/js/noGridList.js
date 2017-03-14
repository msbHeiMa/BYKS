$(document).ready(function () {
    initTable();
});
function initTable() {
    var initQueryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            schoolName: params.search,
        };
        return temp;
    };
    //初始化表格,动态从服务器加载数据  
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/zszh/listPoepleWithoutManager?departId=282402488320&userLevel=3",
        queryParams: initQueryParams,
        columns: [
            {
                title: '身份证号',
                field: 'cardNum',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '姓名',
                field: 'name',
                align: 'center',
                valign: 'middle',
            },
        
            {
                title: '危险级别',
                field: 'dangerRank',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '性别',
                field: 'gender',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '出生日期',
                field: 'birthDate',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '现居住地',
                field: 'residence',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '是否确诊',
                field: 'isDiagnosis',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '数据来源',
                field: 'dataSources',
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

function operateFormatter(value, row, index) {
    return [
         "<a class='btn btn-link btn-xs' href='allot.html?JSBId=" + row.JSBId + "'>", '分配网格员</a>',
    ].join('');
}

window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $.ajax({
            type: "post",
            url: zhzlconfig.backendurl + "/school/delete",
            data: {id:[row.id]},
            success: function (result) {
                if(result.success){
                    $('#table').bootstrapTable('refresh', {silent: true});
                }
            }
        });
    }

};

function setSelect(tree,id){
    var states = {selected: true};
    for(var i=0;i<tree.length;i++){
        if(tree[i]["id"]==id){
            tree[i]["state"] = states;
            return true;
        }else if(tree[i]["nodes"]!=null){
            if(setSelect(tree[i]["nodes"],id)){
                return true;
            }
        }
    }
    if(i==tree.length){
        return false;
    }
}

$('#remove').click(function () {
    var ids = getIdSelections();
    $.ajax({
        type: "post",
        data: {id:ids},
        url: zhzlconfig.backendurl + "/school/delete",
        success: function (result) {
            if(result.success){
                $('#table').bootstrapTable('refresh', {silent: true});
                $('#remove').prop('disabled', true);
            }
        }
    });
    
});
function getIdSelections() {
    return $.map($('#table').bootstrapTable('getSelections'), function (row) {
        return row.id
    });
}

$('#table').on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
    $('#remove').prop('disabled', !$('#table').bootstrapTable('getSelections').length);
});





