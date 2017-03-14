$(document).ready(function () {
    initTable();
});

    function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function initTable() {
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
             var url=zhzlconfig.backendurl +"/zszh/readImageByPsmId?id="+result.data.rows[0].id;
             var imgHTML="'<img src="+url+" /><br>'";
             $("#peopleImage").append(imgHTML);
          }
    })
}
function healing() {
     var r=confirm("是否确定移除？移除操作不可逆！");
    if(r==true){
    var JSBId= getQueryString("JSBId");
    var outReason= "治愈";
    var postJson = { "id": JSBId, "outReason": outReason };
    $.ajax({
        type: "POST",
        url: zhzlconfig.backendurl + "/zszh/removePeople",
        dataType: 'json',
        data: postJson,
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('移除成功');    
            }window.location.href = "peopleList.html";
        },
        error: function () {
            alert(' 移除失败');
        
        }
    });}
    else return false;
}



function died() {
     var r=confirm("是否确定移除？移除操作不可逆！");
    if(r==true){
    var JSBId= getQueryString("JSBId");
    var outReason= "死亡";
    var postJson = { "id": JSBId, "outReason": outReason };
    $.ajax({
        type: "POST",
        url: zhzlconfig.backendurl + "/zszh/removePeople",
        dataType: 'json',
        data: postJson,
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('移除成功');    
            }window.location.href = "peopleList.html";
        },
        error: function () {
            alert(' 移除失败');
        
        }
    });}
    else return false;
}
function outOfCounty() {
     var r=confirm("是否确定移除？移除操作不可逆！");
    if(r==true){
    var JSBId= getQueryString("JSBId");
    var outReason= "迁出县城";
    var postJson = { "id": JSBId, "outReason": outReason };
    $.ajax({
        type: "POST",
        url: zhzlconfig.backendurl + "/zszh/removePeople",
        dataType: 'json',
        data: postJson,
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
            if (result.success) {
                alert('迁出县城成功');    
            }window.location.href = "peopleList.html";
        },
        error: function () {
            alert(' 迁出县城失败');
        
        }
    });}
    else return false;
}
