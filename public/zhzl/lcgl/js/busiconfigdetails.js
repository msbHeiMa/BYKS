function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

 $(document).ready(function () {

 
      $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/proBusConfigGetObj?id="+getQueryString("id"),
        success: function (result) {
            document.getElementById('FUNMODEL_ID').value =result.data.funModelId;
            document.getElementById('FUNMODEL_NAME').value =result.data.funModelName;
            document.getElementById('FUNMODEL_TYPE').value =result.data.funModelType;
            document.getElementById('FUNMODEL_TABLENAME').value =result.data.funModelTableName;
            document.getElementById('STATUS').value =result.data.status;
            document.getElementById('DES').value =result.data.des;
            document.getElementById('FUNMODEL_SPAGEURL').value =result.data.funModelSPageUrl;
            document.getElementById('BUSI_ID').value =result.data.busiId;
                
         }
    })


});

function save(){
    var ID;
    var FUNMODEL_ID = $('#FUNMODEL_ID').val();
    var FUNMODEL_NAME = $('#FUNMODEL_NAME').val();
    var FUNMODEL_TYPE = $('#FUNMODEL_TYPE').val();
    var FUNMODEL_TABLENAME = $('#FUNMODEL_TABLENAME').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();
    var FUNMODEL_SPAGEURL = $('#FUNMODEL_SPAGEURL').val();
    var BUSI_ID = $('#BUSI_ID').val();


    var postjson = {   "id":getQueryString("id"),
                        "funmodel_id":FUNMODEL_ID,
                        "funmodel_name":FUNMODEL_NAME,
                        "funmodel_type":FUNMODEL_TYPE,
                        "funmodel_tablename":FUNMODEL_TABLENAME,
                        "status":STATUS,
                        "des":DES,
                        "funmodel_spageurl":FUNMODEL_SPAGEURL,
                        "busi_id":BUSI_ID 
                        };
       $.ajax({
                            url: zhzlconfig.backendurl + "/lcgl/proBusConfigEdit",
                            data: postjson,
                            type: "post",
                            success: function (result) {
                            if (result.success) {
                                alert('修改成功');
                                window.location.href = 'busiconfig';
                            } else {
                                alert('修改失败');
                            }

                        }

                        });
}