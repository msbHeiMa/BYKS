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
    function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/zszh/listRevisit?zId=" +getQueryString("zId"),
        queryParams: initQueryParams,
        columns: [
            {
                title: '回访时间',
                field: 'visitDate',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '回访人员',
                field: 'visitPeople',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '回访结果',
                field: 'visitCom',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '备注',
                field: 'remarks',
                align: 'center',
                valign: 'middle',
            }
        ]
    });
}

function jump(){ 
    var row=getData();
    window.location.href='entering.html?zId=' +row[0].zId;
}

function getData() {
     return $.map($('#table').bootstrapTable('getData'), function (row) {
         return row
     });
 }


