function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

 $(document).ready(function () {

 
      $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/proRolConfigGetObj?id="+getQueryString("id"),
        success: function (result) {
            document.getElementById('N_ID').value =result.data.n_id;
            document.getElementById('R_ID').value =result.data.r_id;
            document.getElementById('STATUS').value =result.data.status;
            document.getElementById('DES').value =result.data.des;
            
                
         }
    })


});

function save(){
    var ID;
    var N_ID=$('#N_ID').val();
    var R_ID=$('#R_ID').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();


    var postjson = {   "id":getQueryString("id"),
                        "n_id":N_ID,
                        "r_id":R_ID,
                        "status":STATUS,
                        "des":DES
                        };
       $.ajax({
                            url: zhzlconfig.backendurl + "/lcgl/proRolConfigEdit",
                            data: postjson,
                            type: "post",
                            success: function (result) {
                            if (result.success) {
                                alert('修改成功');
                                window.location.href = 'processroleconfig';
                            } else {
                                alert('修改失败');
                            }

                        }

                        });
}