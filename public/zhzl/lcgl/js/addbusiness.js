function save() {
    var BUSI_NAME = $('#BUSI_NAME').val();
    var BUSI_TYPE = $('#BUSI_TYPE').val();
    var SSDWBM = $('#SSDWBM').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();
    var WF_NAME = $('#WF_NAME').val();


    var postjson = {
        "busiName": BUSI_NAME,
        "busiType": BUSI_TYPE,
        "ssdwbm": SSDWBM,
        "status": STATUS,
        "des": DES,
        "wfName": WF_NAME
    };


    $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/processCreate",
        data: postjson,
        type: "post",
        success: function (result) {
            if (result.success) {
                alert('新增业务成功');
                window.location.href = 'process';
            } else {
                alert('新增业务失败');
            }

        }
    });

}

