$(document).ready(function () {
    initTable();
    selectAll();
  formValidator();
 nameSearch();
    
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
               $('#select1').each(function (e) {
                $(this).html(htmlStringFirst);
                $(this).selectpicker('refresh');
                $(this).selectpicker('show');
            })
            $('#select2').each(function (e) {
                $(this).html(htmlString[0]);
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



function nameSearch(){
    var selectFinDepartId="";
      var selectFinal = $('#select4 option:selected').val();
       for (var i = 0; i < fifthFin[fifthIndex].length; i++) {
        if (selectFinal == fifthFin[fifthIndex][i].name) {
            selectFinDepartId = fifthFin[fifthIndex][i].departId;//根据现在选中的最后一级select的数值取到对应的departId
        }
    }
      var name=$('#name').val();
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
        url: zhzlconfig.backendurl +"/zszh/listPsmPersonNameAndCardNumber?departId="+selectFinDepartId+"&queryName="+name,
         queryParams: initQueryParams,
         pagination: false, //启动分页  
        pageSize: 10,  //每页显示的记录数  
        pageNumber: 1, //当前第几页    
         columns: [
             {
                 title: '姓名',
                 field: 'name',
                 align: 'center',
                 valign: 'middle',
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
   var rowAll=[];
   var index=0;
function operateFormatter(value, row, index) {
     rowAll.push(row);
    
     return [
         "<a class='btn btn-link btn-xs' id='choose' value='"+(row.id)+"' onclick='choosePeople(this)' data-id='" + row.id +"'>", '选择</a>'
     ].join('');
     
 }

var curPid="";
function choosePeople(i) {

    var r = confirm("选中此人？");
    if (r == true) {
            var data=$(i).attr("value");
            curPid=data;
    //    var data = $(chose).attr("data-id");
        for (var i = 0; i < rowAll.length; i++) {
            if (data == rowAll[i].id) {
                var resultRow = rowAll[i];
                break;
            }
        }
                $("#cardNum").val(resultRow.cardNum);
                $("#birthDate").val(resultRow.birthDate);
                $("#userdName").val(resultRow.userdNname);
                $("#email").val(resultRow.email);
                $("#occupation").val(resultRow.occupation);
                $("#height").val(resultRow.height);
                $("#relBelief").val(resultRow.relBelief);
                $("#residence").val(resultRow.residence);
                $("#dAddr").val(resultRow.dAddr);
                $("#rAddr").val(resultRow.rAddr);
                $("#domicile").val(resultRow.domicile);
                $("#policeStation").val(resultRow.policeStation);
                //根据取到的值0/1显示男/女
                var gender=resultRow.gender;
                    switch(gender){
                        case "0": $("#gender").val("男");
                           break;
                        case "1": $("#gender").val("女");
                                  };
                var bloodType=resultRow.bloodType;
                    switch(gender){
                        case "01": $("#bloodType").val("A型");
                           break;
                        case "02": $("#bloodType").val("B型");
                           break;
                        case "03": $("#bloodType").val("AB型");
                           break;
                        case "04": $("#bloodType").val("O型");
                                  };
                        peopleImg();
                //alert('选取成功');
            }  else return false;
//peopleImg();
}
function peopleImg(){
    
     var data = $(choose).attr("data-id");
     var url=zhzlconfig.backendurl +"/zszh/readImageByPsmId?id="+data;
     var imgHTML="'<img src="+url+" /><br>'";
     $("#peopleImage").append(imgHTML);
  
}

function save(){
    var r=confirm("确定增加？");
    if(r==true){
 // var pId= $(choose).attr("data-id");
    var pId= curPid;
    var ecoSituatio= $("#ecoSituatio").val();
    var isEfficiency= $("#isEfficiency").val();
    var guarderName= $("#guarderName").val();
    var guarderCardNum= $("#guarderCardNum").val();
    var guarderTel= $("#guarderTel").val();
    var attackDate= $("#attackDate").val();
    var attackType= $("#attackType").val();
    var isCTrouble= $("#isCTrouble").val();
    var cTroubleCount= $("#cTroubleCount").val();
    var cTroubleDate= $("#cTroubleDate").val();
    var sicknessName= $("#sicknessName").val();
    var dangerRank= $("#dangerRank").val();
    var treatS= $("#treatS").val();
    var treatName= $("#treatName").val();
    var hosTreatS= $("#hosTreatS").val();
    var recOrganName= $("#recOrganName").val();
    var managePeople = $("#managePeople ").val();
    var assistSituation= $("#assistSituation").val();
    var remarks= $("#remarks").val();
    var postJson = { "pId": pId, "ecoSituatio": ecoSituatio, "isEfficiency": isEfficiency, "guarderName": guarderName ,
                     "guarderCardNum":guarderCardNum,"guarderTel": guarderTel,"attackDate": attackDate,"attackType": attackType,
                     "isCTrouble": isCTrouble,"cTroubleCount": cTroubleCount,"cTroubleDate": cTroubleDate,"sicknessName": sicknessName,
                     "dangerRank": dangerRank,"treatS": treatS,"treatName": treatName,"hosTreatS": hosTreatS,"recOrganName": recOrganName,
                     "managePeople ": managePeople ,"assistSituation": assistSituation,"remarks": remarks,};
    $.ajax({
        type: "POST",
        data: postJson,
        url:  zhzlconfig.backendurl + "/zszh/addPeople",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('新增肇事肇祸人员成功');
            }window.history.back(-1);
            //window.location.href='peopleList.html?departId=" + row.SSDWBM + "&userLevel=" + row.userLevel "';//保存成功跳转到之前人员列表界面（根据href='peopleList.html?departId=" + row.SSDWBM + "&userLevel=" + row.userLevel 
                },
            error: function () {
                 alert('新增肇事肇祸失败');
                }
        
    });}
    else return false;
}
function formValidator(){
    $('form').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        isEfficiency: {
            message: '是否纳入低保验证失败',
            validators: {
                notEmpty: {
                    message: '是否纳入低保不能为空'
                }
            }
        },
        guarderName: {
            message: '监护人姓名验证失败',
            validators: {
                notEmpty: {
                    message: '监护人姓名不能为空'
                }
            }
        },
        guarderTel: {
            message: '监护人联系方式验证失败',
            validators: {
                notEmpty: {
                    message: '监护人联系方式不能为空'
                }
            }
        },
        attackType: {
            message: '目前诊断类型验证失败',
            validators: {
                notEmpty: {
                    message: '目前诊断类型不能为空'
                }
            }
        },
        isCTrouble: {
            message: '有无肇事肇祸史验证失败',
            validators: {
                notEmpty: {
                    message: '有无肇事肇祸史不能为空'
                }
            }
        },
        treatS: {
            message: '治疗情况验证失败',
            validators: {
                notEmpty: {
                    message: '治疗情况不能为空'
                }
            }
        },
        sicknessName: {
            message: '患病名称验证失败',
            validators: {
                notEmpty: {
                    message: '患病名称不能为空'
                }
            }
        }
    }
});

}

 $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});



