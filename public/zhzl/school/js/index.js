$(document).ready(function () {
    querySchool();
});

function querySchool(){
    $.ajax({
        url: zhzlconfig.backendurl + "/school/index",
        type: "post",
        success: function (result) {
            if(result.success){
                var focus = result.data.focus;
                var top5 = result.data.top5;
                $("#focusDiv").empty();
                for(var i=0;i<focus.length;i++){
                    var liStr = "";
                    var isRed = false;
                    for(var j=0;j<3;j++){
                        if(j>=focus[i]["safetyItems"].length){
                            liStr += "<li><a href='#'>&nbsp</a></li>";
                        }else{
                            var safetyItem = focus[i]["safetyItems"][j];
                            if(safetyItem["text"]!=0){
                                isRed = true;
                                liStr += "<li><a href='#'>"+safetyItem["name"]+" <span class='pull-right badge bg-red'>"+safetyItem["text"]+"</span></a></li>";
                            }else{
                                liStr += "<li><a href='#'>"+safetyItem["name"]+" <span class='pull-right badge bg-blue'>"+safetyItem["text"]+"</span></a></li>";
                            }
                        }
                    }
                    var str = "<div class='col-md-4'>"
                            + "<div class='box box-widget widget-user-2'>"
                            + "<div class='widget-user-header "+(isRed?"bg-red":"bg-green")+"'>"
                            + "<h3 class='widget-user-username'>"+focus[i].schoolName+"</h3>"
                            + "</div><div class=;box-footer no-padding'>"
                            + "<ul class='nav nav-stacked'>";
                    str += liStr;
                    str += "<li class='bg-gray' onclick=\"location.href='detail.html?id="+focus[i].id +"'\"><a href='#' class='small-box-footer'> 查看详情 <i class='fa fa-arrow-circle-right'></i></a></li>";
                    str += "</ul></div></div></div>";
                    $("#focusDiv").append($(str));
                }
                $("#top5Div").empty();
                for(var i=0;i<top5.length;i++){
                    var liStr = "";
                    var isRed = false;
                    for(var j=0;j<3;j++){
                        if(j>=top5[i]["safetyItems"].length){
                             liStr += "<li><a href='#'>&nbsp</a></li>";
                        }else{
                            var safetyItem = top5[i]["safetyItems"][j];
                            if(safetyItem["text"]!=0){
                                isRed = true;
                                liStr += "<li><a href='#'>"+safetyItem["name"]+" <span class='pull-right badge bg-red'>"+safetyItem["text"]+"</span></a></li>";
                            }else{
                                liStr += "<li><a href='#'>"+safetyItem["name"]+" <span class='pull-right badge bg-blue'>"+safetyItem["text"]+"</span></a></li>";
                            }
                        }
                    }
                    var str = "<div class='col-md-4'>"
                            + "<div class='box box-widget widget-user-2'>"
                            + "<div class='widget-user-header "+(isRed?"bg-red":"bg-green")+"'>"
                            + "<h3 class='widget-user-username'>"+top5[i].schoolName+"</h3>"
                            + "</div><div class='box-footer no-padding'>"
                            + "<ul class='nav nav-stacked'>";
                    str += liStr;
                    str += "<li class='bg-gray' onclick=\"location.href='detail.html?id="+top5[i].id +"'\"><a href='#' class='small-box-footer'> 查看详情 <i class='fa fa-arrow-circle-right'></i></a></li>";
                    str += "</ul></div></div></div>";
                    $("#top5Div").append($(str));
                }

            }
        }
    });
}