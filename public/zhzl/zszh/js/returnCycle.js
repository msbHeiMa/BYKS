$(document).ready(function () {
    //var aaa = getQueryString("title");

    //document.getElementById("h3").innerHTML = aaa;
    //调用函数，初始化表格  
    initTable();
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
             $("#visitCyc").val(result.data.rows[0].visitCyc);
              // $('value').html(result.rows[0].SENDERNAME);
            //console.log(result.data.rows[0].gridName)
            var url=zhzlconfig.backendurl +"/zszh/readImageByPsmId?id="+result.data.rows[0].id;
             var imgHTML="'<img src="+url+" /><br>'";
             $("#peopleImage").append(imgHTML);
          }
    })
}


function save() {
    var zId= getQueryString("JSBId");
    var originalCyc= $("#visitCyc").val();
    var adjustReason= $("#adjustReason").val();
    var finalCyc= $("#finalCyc").val();
    var postJson = { "zId": zId, "originalCyc": originalCyc, "adjustReason": adjustReason, "finalCyc": finalCyc };
    $.ajax({
        type: "POST",
        url: zhzlconfig.backendurl + "/zszh/setRevisitSys",
        dataType: 'json',
        data: postJson,
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('回访周期设定成功');
                
            }window.location.href = "peopleList.html";
        },
        error: function () {
            alert(' 回访周期设定失败');
        
        }
    });
}

    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            finalCyc: {
                message: '回访周期设定验证失败',
                validators: {
                    notEmpty: {
                        message: '回访周期设定不能为空'
                    }
                }
            },
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