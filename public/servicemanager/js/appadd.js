
function addapp() {
    //获取模态框数据 
    var CATEGORY = $('#CATEGORY').val();
    var NAME = $('#NAME').val();
    var CIGNODE = $('#CIGNODE').val();
    var ACCESSADDRESS = ['/'+$('#ACCESSADDRESS').val()+'/'];
    var postjson = [{ "CATEGORY": CATEGORY, "NAME": NAME, "CIGNODE": CIGNODE, "ACCESSADDRESS": ACCESSADDRESS }];

    $.ajax({
        type: "POST",
        url: restconfig.resturl + "/rest/tables/app",
        data: JSON.stringify(postjson),
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        success: function (result) {
            if (status == "success") {
                alert('应用注册成功');
            }
        },
        error: function () {
            alert(' 失败');
        },
        complete: function () {

        }

    }); window.location.href = 'app';

}; 