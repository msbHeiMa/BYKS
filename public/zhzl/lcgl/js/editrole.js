function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

 $(document).ready(function () {

 
      $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/roleGetObj?id="+getQueryString("id"),
        success: function (result) {
             console.log(result)

                document.getElementById('BID').value = result.data.bId;
                document.getElementById('ROLE_CODE').value = result.data.roleCode;
                document.getElementById('ROLE_NAME').value = result.data.roleName;
                document.getElementById('ORDER').value = result.data.roleOrder;
                document.getElementById('STATUS').value = result.data.status;
                document.getElementById('DES').value = result.data.des;
                
         }
    })


});

function save(){
    var bId = $('#BID').val();
    var roleCode = $('#ROLE_CODE').val();
    var roleName = $('#ROLE_NAME').val();
    var roleOrder = $('#ORDER').val();
    var status = $('#STATUS').val();
    var des = $('#DES').val();


    var postjson = {   "id":getQueryString("id"),
                        "bId":bId,
                        "roleCode": roleCode, 
                        "roleName": roleName, 
                        "roleOrder": roleOrder,
                        "status":status,
                        "des":des 
                        };
       $.ajax({
                            url: zhzlconfig.backendurl + "/lcgl/roleEdit",
                            data: postjson,
                            type: "post",
                            success: function (result) {
                            if (result.success) {
                                alert('修改成功');
                                window.location.href = 'role.html?id='+bId;
                            } else {
                                alert('修改失败');
                            }

                        }

                        });
}