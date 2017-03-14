function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

 $(document).ready(function () {

 
      $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/processGetObj?id="+getQueryString("id"),
        success: function (result) {
             console.log(result)
             //$("#test").html("")
           
            
                document.getElementById('BUSI_NAME').value = result.data.busiName;
                document.getElementById('BUSI_TYPE').value = result.data.busiType;
                document.getElementById('SSDWBM').value = result.data.ssdwbm;
                document.getElementById('STATUS').value = result.data.status;
                document.getElementById('DES').value = result.data.des;
                document.getElementById('WF_NAME').value = result.data.wfName;
                
         }
    })


});

function save(){
    var BUSI_NAME = $('#BUSI_NAME').val();
    var BUSI_TYPE = $('#BUSI_TYPE').val();
    var SSDWBM = $('#SSDWBM').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();
    var WF_NAME = $('#WF_NAME').val();


    var postjson = {   "id":getQueryString("id"),
                        "busiName": BUSI_NAME, 
                        "busiType": BUSI_TYPE,
                        "ssdwbm":SSDWBM, 
                        "status": STATUS,
                        "des":DES,
                        "wfName":WF_NAME 
                        };
       $.ajax({
                            url: zhzlconfig.backendurl + "/lcgl/processEdit",
                            data: postjson,
                            type: "post",
                            success: function (result) {
                            if (result.success) {
                                alert('修改成功');
                                window.location.href = 'process';
                            } else {
                                alert('修改失败');
                            }

                        }

                        });
}