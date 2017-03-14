function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function save(){
    var BID = getQueryString("id");
    var ROLE_CODE = $('#ROLE_CODE').val();
    var ROLE_NAME = $('#ROLE_NAME').val();  
    var ORDER = $('#ORDER').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();
    var postjson = {"bId":BID,
                    "roleCode":ROLE_CODE, 
                    "roleName":ROLE_NAME,
                    "roleOrder": ORDER, 
                    "status": STATUS, 
                    "des": DES
                };

     $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/roleCreate",
        data: postjson,
        type: "post",
        success: function (result) {
            if (result.success) {
                alert('新增角色成功');
                window.location.href = 'role.html?id='+getQueryString("id");
            } else {
                alert('新增角色失败');
            }

        }

    }); 
}