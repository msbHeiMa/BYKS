

// $("#FUNMODEL_ID").onfocus(function(){
//     //  $('#FUNMODEL_NAME').val($(this).val())
//      document.getElementById('FUNMODEL_NAME').value =this.value;

// })

function save() {
    var ID;
    var FUNMODEL_ID = $('#FUNMODEL_ID').val();
    var FUNMODEL_NAME = $('#FUNMODEL_NAME').val();
    var FUNMODEL_TYPE = $('#FUNMODEL_TYPE').val();
    var FUNMODEL_TABLENAME = $('#FUNMODEL_TABLENAME').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();
    var FUNMODEL_SPAGEURL = $('#FUNMODEL_SPAGEURL').val();
    var BUSI_ID = $('#BUSI_ID').val();


    var postjson = {
        "id":ID,
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
        url: zhzlconfig.backendurl + "/lcgl/proBusConfigCreate",
        data: postjson,
        type: "post",
        success: function (result) {
            if (result.success) {
                alert('流程业务配置成功');
                window.location.href = 'busiconfig';
            } else {
                alert('流程业务配置失败');
            }

        }
    })
}

