function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
} 
$(document).ready(function () {
    APP.onInitd = function(){
        var id = getQueryString("id");
        $.ajax({
            type:"get",
            url: zhzlconfig.backendurl + "/school/schoolSaftyItems?id="+id,
            success:function(res){
                if(res.success){
                    setTitle(res.data.schoolName);
                    addSchool(res.data,res.data.geometry);
                    addSafetyTypes(res.data.safetyTypes);
                }
            }
        })
        function setTitle(name){
            $("#schoolName").text(name);
        }
        function addSchool(data,geometry){
            APP.addPOI([geometry.x],[geometry.y],[data.schoolName],["/poi/mark_blue.png"],
            [{
                type:"school",
                safetyContact:data.safetyContact,
                safetyManager:data.safetyManager
            }]);
            APP.zoomToFeature(geometry.x,geometry.y,14);
        }
        function addSafetyTypes(safetyTypes){
            for(var i=0,l=safetyTypes.length;i<l;i++){
                addSafetyItems(i,safetyTypes[i].items,safetyTypes[i].id);
            }
        }
        function addSafetyItems(index,items,typeId){
            var poix = [];
            var poiy = [];
            var poiname = [];
            var poiimage = [];
            var poiattr = [];

            for(var i=0,l=items.length;i<l;i++){
                var item = items[i];
                poix.push(item.geometry.x);
                poiy.push(item.geometry.y);
                poiname.push(item.name);
                poiimage.push("/poi/mark_red"+(index+1)+".png");
                poiattr.push({
                    id:item.id,
                    type:typeId
                });
            }
            APP.addPOI(poix,poiy,poiname,poiimage,poiattr);
        }
    };
    ZZ_MAP_CONFIG.onPOIClick = function(map,graphic){
        if(graphic.attributes.type == "school"){
            var geometry = graphic.geometry;
            var attr = graphic.attributes;
            var value = graphic.attributes.name;
            showAttr(graphic,[
                {
                    name:"安全负责人",
                    text:attr.safetyManager
                },
                {
                    name:"联系方式",
                    text:attr.safetyContact
                }
            ]);
        }
        else{
            var attr = graphic.attributes;
            if(attr.fields){
                showAttr(graphic,attr.fields);
            }
            else{
                var typeId = attr.type;
                var itemId = attr.id;
                $.ajax({
                    type:"get",
                    url: zhzlconfig.backendurl + "/school/safetyItemDetail?typeId="+typeId+"&itemId="+itemId,
                    success:function(res){
                        if(res.success){
                            graphic.attributes.fields = res.data && res.data.fields;
                            attr = graphic.attributes;
                            showAttr(graphic,attr.fields);
                        }
                    }
                })
            }
        }
        function showAttr(graphic,fields){
            var value = graphic.attributes.name;
            var geometry = graphic.geometry;
            map.MainMap.infoWindow.setTitle(value);
            var fieldsTmp = [];
            if(fields){
                for(var i = 0,field;field = fields[i];i++){
                    fieldsTmp.push('\
                            <tr>\
                                <td align="right"><span class="infoName">'+field.name+'</span><span class="infoSplit">：</span></td>\
                                <td class="infoTdTwo"><span>'+(field.text || "")+'</span></td>\
                            </tr>\
                    ');
                }
            }
            map.MainMap.infoWindow.setContent('\
                <table class="infoWindowCon">\
                    <tbody>\
                        <tr>\
                            <td align="right"><span class="infoName">'+"名称"+'</span><span class="infoSplit">：</span></td>\
                            <td class="infoTdTwo"><span>'+value+'</span></td>\
                        </tr>\
                        '+fieldsTmp.join("")+'\
                    </tbody>\
                </table>\
            ');
            map.MainMap.infoWindow.show(map.common.GetPoint(geometry));
        }
    };
    APP.preInit(ZZ_MAP_CONFIG);
});



