function save() {
    var NODE_NAME = $('#NODE_NAME').val();
    var NODE_CODE = $('#NODE_CODE').val();
    var NODE_PAGEURL = $('#NODE_PAGEURL').val();
    var NODE_APPROVETYPE = $('#NODE_APPROVETYPE').val();
    var NODE_ORDER = $('#NODE_ORDER').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();
    var test = window.location.search
    var val=parseInt(test.indexOf("="))+1;
    var B_ID=test.substring(val)
    //debugger;
    var postjson = {
        "nodeName": NODE_NAME,
        "nodeCode": NODE_CODE,
        "bId":B_ID,
        "nodePageUrl":NODE_PAGEURL,
        "nodeApproveType":NODE_APPROVETYPE,
        "nodeOrder": NODE_ORDER,
        "status": STATUS,
        "des": DES
        
    };

    //debugger;
    $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/wfbusinodeCreate",
        data: postjson,
        type: "post",
        success: function (result) {
            if (result.success) {
                alert('添加节点成功');
                window.location.href = 'process';
            } else {
                alert('添加节点失败');
            }

        }
    });

}

