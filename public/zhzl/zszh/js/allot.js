$(document).ready(function () {
    initTable();
    selectAll();
    select4();
    searchNoGrid();
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function initTable() {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "GET",
        data: "",
        url: zhzlconfig.backendurl + "/zszh/listPoepleWithoutManagerById?JSBId=" + getQueryString("JSBId"),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var gender = result.data.rows[0].gender;
            switch (gender) {
                case "0": $("#gender").val("男");
                    break;
                case "1": $("#gender").val("女");
            };
            $("#gridName").val(result.data.rows[0].gridName);
            $("#name").val(result.data.rows[0].name);
            $("#cardNum").val(result.data.rows[0].cardNum);
            $("#remarks").val(result.data.rows[0].remarks);
            var url=zhzlconfig.backendurl +"/zszh/readImageByPsmId?id="+result.data.rows[0].id;
            var imgHTML="'<img src="+url+" style='margin-left:20px'/><br>'";
            $("#peopleImage").append(imgHTML);
            style="margin-left:20px"
        }
    })
}

var forthFin = [];
var fifthFin = []; //全局
var fifthValue = "";
var fifthIndex = 0;
function selectAll() {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        type: "GET",
        url: zhzlconfig.backendurl + "/zszh/listDepartMent",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var thirdLevel = result.data[0].name;
            var forth = []; //全局
            var fifth = []; //全局
            for (var i = 0; i < result.data[0].children.length; i++) {
                fifth[i] = [];
                for (var j = 0; j < result.data[0].children[i].children.length; j++) {
                    fifth[i][j] = {};
                }
            }
            for (var i = 0; i < result.data[0].children.length; i++) {
                forth[i] = result.data[0].children[i].name;
                //         fifth[i].push({ "forthName": result.data[0].children[i].name, "name": result.data[0].children[i].children[j].name, "departId": result.data[0].children[i].children[j].departId });
                for (var j = 0; j < result.data[0].children[i].children.length; j++) {
                    fifth[i][j] = { "forthName": result.data[0].children[i].name, "name": result.data[0].children[i].children[j].name, "departId": result.data[0].children[i].children[j].departId };
                }
            }
            var htmlString = [];
            var htmlStringFirst = '<option>' + "长兴县" + '</option>';
            htmlString[0] = '<option>' + thirdLevel + '</option>';
            htmlString[1] = "'<option value=" + forth[0] + ">" + forth[0] + "</option>'";
            for (var i = 1; i < forth.length; i++) {
                htmlString[1] += "'<option value=" + forth[i] + ">" + forth[i] + "</option>'";
            }

            var forthName = forth[0];
            fifthIndex = 0;
            var index = 0;
            for (var i = 0; i < fifth.length; i++) {
                for (j = 0; j < fifth[i].length; j++) {
                    if (fifth[i][j].forthName == forthName) {
                        index = i;
                        break;
                    }
                }
            }
            htmlString[2] = '<option>' + fifth[0][j].name + '</option>';
            for (var i = 1; i < fifth[index].length; i++) {
                htmlString[2] += '<option>' + fifth[index][i].name + '</option>';
            }
            forthFin = fifth;
            fifthFin = fifth; //全局 
            fifthValue = fifthFin[0][0].departId;
            $('#select4').each(function (e) {
                $(this).html(htmlString[2]);
                $(this).selectpicker('refresh');
                $(this).selectpicker('show');
            })
            $('#select3').each(function (e) {
                $(this).html(htmlString[1]);
                $(this).selectpicker('refresh');
                $(this).selectpicker('show');
            })
        }
    });
}

function thirdChange() {
    var select = document.getElementById('#select3');
    var forthName = select;
//上面两句就是获取到select的值 比如网格员里面有两个select  这个是获取第一个  如果获取不到就换写法


    var index = 0;
    for (var i = 0; i < fifthFin.length; i++) {
        for (j = 0; j < fifthFin[i].length; j++) {
            if (fifth[i][j].forthName == forthName) {
                index = i;
                break;
            }
        }
    }
    fifthIndex = index;
    htmlString[2] = '<option>' + fifth[0][j].name + '</option>';
    for (var i = 1; i < fifth[index].length; i++) {
        htmlString[2] += '<option>' + fifth[index][i].name + '</option>';
    }
    $('#select4').each(function (e) {
        $(this).html(htmlString[2]);
        $(this).selectpicker('refresh');
        $(this).selectpicker('show');
    })
}
function select4() {
    var selectFinal = $('#select4 option:selected').val();

    var selectFinDepartId="";
    //fifthValue 取到的名称
    for (var i = 0; i < fifthFin[fifthIndex].length; i++) {
        if (selectFinal == fifthFin[fifthIndex][i].name) {
            selectFinDepartId = fifthFin[fifthIndex][i].departId;//根据现在选中的最后一级select的数值取到对应的departId
        }
    }
    searchNoGrid();
}
function searchNoGrid(){
      var selectFinal = $('#select4 option:selected').val();
     var initQueryParams = function (params) {
         var temp = {
             limit: params.limit,
             offset: params.offset,
             queryName: params.search,
         };
         return temp;
     };
     //初始化表格,动态从服务器加载数据  
     $('#table').cigTable({
         url: zhzlconfig.backendurl + "/zszh/listGrider?name="+encodeURI(selectFinal)+"&depth=5",
         queryParams: initQueryParams,
         columns: [
            {
                title: '网格名称',
                field: 'gridName',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '网格员姓名',
                field: 'griderName',
                align: 'center',
                valign: 'middle',
            },
        
            {
                title: '网格员联系方式',
                field: 'griderTel',
                align: 'center',
                valign: 'middle',
            },
             {
                 title: '操作',
                 field: 'operate',
                 align: 'center',
                 valign: 'middle',
                 formatter: operateFormatter,
             }
         ]
     });
   }

function operateFormatter(value, row, index) {
     return [
         "<a class='btn btn-link btn-xs' id='choose' onclick='chooseGrider()' data-gridName='" + row.gridName +"' data-forthName='" + row.forthName +"'>", '选择</a>'
     ].join('');
 }

function chooseGrider(){
    var r=confirm("选中此网格员？");
    if(r==true){
    var id= getQueryString("JSBId");
    var gridName = $(choose).attr("data-gridName");
    var beloArea = $(choose).attr("data-forthName");
    var postJson = { "id": id, "gridName": gridName, "beloArea": beloArea };
     $.ajax({
        type: "POST",
        data: postJson,
        url: zhzlconfig.backendurl + "/zszh/setGrider",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('分配网格员成功');
            } window.location.href = "noGridList.html";
        },
        error: function () {
            alert(' 分配网格员失败');
        }
    });}
    else return false;

}


function selectChange() {
    var name = document.getElementById("adjustmentType").value;
    danagerHtml = '<option value="01">0级</option><option value="02">1级</option><option value="03">2级</option><option value="04">3级</option><option value="04">4级</option><option value="04">5级</option>';
    manageHtml = '<option value="01">guanli0级</option><option value="02">1级</option><option value="03">2级</option><option value="04">3级</option><option value="04">4级</option>';
    if (name == "01") {
        $("#finalLevel").html(danagerHtml);
    } else {
        $("#finalLevel").html(manageHtml);
    };
}



