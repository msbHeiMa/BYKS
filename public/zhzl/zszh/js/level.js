$(document).ready(function () {
    //var aaa = getQueryString("title");

    //document.getElementById("h3").innerHTML = aaa;
    //调用函数，初始化表格  
    initTable();
   
});

    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            adjustReason: {
                message: '调整原因验证失败',
                validators: {
                    notEmpty: {
                        message: '调整原因不能为空'
                    }
                }
            }
        }
    });

    function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function initTable(url, Func) {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        data: "",
        url:  zhzlconfig.backendurl + "/zszh/listPeopleById?JSBId=" +getQueryString("JSBId"),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (result) {
              var gender=result.data.rows[0].gender;
             switch(gender){
            case "0": $("#gender").val("男");
            break;
            case "1": $("#gender").val("女");
             };
             var dangerLevel=result.data.rows[0].dangerRank;
             switch(dangerLevel){
            case "01": $("#dangerRank").val("0级");
            break;
            case "02": $("#dangerRank").val("1级");
            break;
            case "03": $("#dangerRank").val("2级");
            break;
            case "04": $("#dangerRank").val("3级");
            break;
            case "05": $("#dangerRank").val("4级");
            break;
            case "06": $("#dangerRank").val("5级");
             };
            	
             var attackLevel=result.data.rows[0].attackType;
             switch(attackLevel){
            case "01": $("#attackType").val("精神分裂症");
            break;
            case "02": $("#attackType").val("分裂情感性障碍");
            break;
            case "03": $("#attackType").val("持久的妄想性障碍");
            break;
            case "04": $("#attackType").val("双相（情感）障碍");
            break;
            case "05": $("#attackType").val("癫痫所致精神障碍");
            break;
            case "06": $("#attackType").val("精神发育迟滞伴发精神障碍");
            break;
            case "07": $("#attackType").val("重度抑郁发作");
            break;
            case "08": $("#attackType").val("精神活性物质所致精神障碍");
            break;
            case "99": $("#attackType").val("其他");
             }	;
        
             var treat=result.data.rows[0].treatS;
             switch(treat){
            case "01": $("#treatS").val("住院治疗");
            break;
            case "02": $("#treatS").val("居家服用抗精神病药物治疗");
            break;
            case "03": $("#treatS").val("其他治疗");
            break;
            case "04": $("#treatS").val("未接受过治疗");
            
             }	;

             $("#gridName").val(result.data.rows[0].gridName);
             $("#name").val(result.data.rows[0].name);
             $("#cardNum").val(result.data.rows[0].cardNum);
             $("#remarks").val(result.data.rows[0].remarks);
              // $('value').html(result.rows[0].SENDERNAME);
            //console.log(result.data.rows[0].gridName)
            var url=zhzlconfig.backendurl +"/zszh/readImageByPsmId?id="+result.data.rows[0].id;
            var imgHTML="'<img src="+url+" /><br>'";
            $("#peopleImage").append(imgHTML);
          }
    })
}

function save(){
     var name = document.getElementById("adjustmentType").value;
    if (name=="01"){
        choose=$("#dangerRank").val();
    }else{
        choose=$("#manageLevel").val();
    }
    var zId= getQueryString("JSBId");
    var originalLevel=choose;
    var finalLevel= $("#finalLevel").val();
    var adjustReason= $("#adjustReason").val();
    var adjustmentType= $("#adjustmentType").val();
    var postJson = { "zId": zId, "originalLevel": originalLevel, "finalLevel": finalLevel, "adjustReason": adjustReason ,"adjustmentType":adjustmentType};
    $.ajax({
        type: "POST",
        data: postJson,
        url:  zhzlconfig.backendurl + "/zszh/setLevel",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('级别调整成功');
            }window.location.href = "peopleList.html";
                },
            error: function () {
                 alert(' 级别调整失败');
                }
        
    });
}

 function selectChange(){
     var name = document.getElementById("adjustmentType").value;
     danagerHtml='<option value="01">0级</option><option value="02">1级</option><option value="03">2级</option><option value="04">3级</option><option value="04">4级</option><option value="04">5级</option>';
     manageHtml='<option value="01">guanli0级</option><option value="02">1级</option><option value="03">2级</option><option value="04">3级</option><option value="04">4级</option>';
     if(name=="01"){
         $("#finalLevel").html(danagerHtml);
    }else{
         $("#finalLevel").html(manageHtml);
    };}



