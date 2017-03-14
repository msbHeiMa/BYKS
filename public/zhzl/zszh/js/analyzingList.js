$(document).ready(function () {
    initTable();
});
function initTable() {
    var initQueryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            queryName: params.search,
        };
        return temp;
    };

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    //初始化表格,动态从服务器加载数据  
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/zszh/listPeople?departId=" + getQueryString("departId") + "&userLevel=" + getQueryString("userLevel"),
        queryParams: initQueryParams,
        columns: [
            // {
            //     field: 'state',
            //     checkbox: true
            // },
            // {
            //     title: '操作',
            //     field: 'operate',
            //     align: 'center',
            //     valign: 'middle',
            //     formatter: operateFormatter,
            // },
            {
                title: '姓名',
                field: 'name',
                align: 'center',
                valign: 'middle',
                formatter: nameFormatter
            },
            {
                title: '身份证号',
                field: 'cardNum',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '性别',
                field: 'gender',
                align: 'center',
                valign: 'middle',
                formatter: genderFormatter
            },
            {
                title: '危险级别',
                field: 'dangerRank',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '管理级别',
                field: 'gridName',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '回访周期',
                field: 'OPERATEPN',
                align: 'center',
                valign: 'middle',


            },
            /* 
             {
                 title: '网格员联系方式',
                 field: 'TEL',
                 align: 'center',
                 valign: 'middle',
             },*/
            {
                title: '有无肇事肇祸史',
                field: 'preVisitDate',
                align: 'center',
                valign: 'middle',
            },

            {
                title: '诊断类型',
                field: 'birthDate',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '人员现状',
                field: 'residence',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '所属网格',
                field: 'isDianosis',
                align: 'center',
                valign: 'middle',
                formatter: isDianosisFormatter
            },
            {
                title: '网格员',
                field: 'dataSource',
                align: 'center',
                valign: 'middle',
            }
        ]
    });
}

function nameFormatter(value, row, index) {
    return [
        "<a class='app' href='departmentPeopleList.html?departId=" + row.SSDWBM + "&title=" + row.departmentName + "'>" + row.departmentName + '</a>',

    ].join('');
}

function operateFormatter(value, row, index) {
    return [
        // "<a class='btn btn-link btn-xs' href='peopleDetail.html?JSBId=" + row.JSBId + "'>", '查看</a>',
        "<a class='btn btn-link btn-xs' href='record.html?zId=" + row.JSBId + "&title=" + row.name + "回访记录 '>", '<i style="color: #f39c12"></i>', '回访记录</a>',
        // "<a class='btn btn-link btn-xs' href='level.html?JSBId=" + row.JSBId + "'>", '级别调整</a>',
        // "<a class='btn btn-link btn-xs' href='returnCycle.html?JSBId=" + row.JSBId + "'>", '回访周期设定</a>',
        "<a class='btn btn-link btn-xs' href='emigrant.html?JSBId=" + row.JSBId + "'>", '移除</a>',
        "<a class='btn btn-link btn-xs' href='emigrant.html?JSBId=" + row.JSBId + "'>", '迁出</a>'
    ].join('');
}
function genderFormatter(value, row, index) {
    value = row.gender;
    if (value == "0") {
        return '男';
    } else { return '女' };
}
function isDianosisFormatter(value, row, index) {
    value = row.gender;
    if (value == "0") {
        return '是';
    } else { return '否' };
}

function getIdSelections() {
    return $.map($('#table').bootstrapTable('getSelections'), function (row) {
        return row
    });
}
function remove() {
    var ids = getIdSelections();
    if (ids.length > 1) {
        alert('单次只能移除一人')
    } else {
        location.href = 'remove.html?JSBId=' + ids[0].JSBId;
    }
}


function setSelect(tree, id) {
    var states = { selected: true };
    for (var i = 0; i < tree.length; i++) {
        if (tree[i]["id"] == id) {
            tree[i]["state"] = states;
            return true;
        } else if (tree[i]["nodes"] != null) {
            if (setSelect(tree[i]["nodes"], id)) {
                return true;
            }
        }
    }
    if (i == tree.length) {
        return false;
    }
}

$('#table').on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
    $('#remove').prop('disabled', !$('#table').bootstrapTable('getSelections').length);
});

$(document).ready(function () {
    $(".td").hide();
    $("#hide").click(function () {
        $(".td").toggle();
    });

});