

function save() {
    var ID;
    var N_ID=$('#N_ID').val();
    var R_ID=$('#R_ID').val();
    var STATUS = $('#STATUS').val();
    var DES = $('#DES').val();

    var postjson = {
        "id":ID,
        "n_id":N_ID,
        "r_id":R_ID,
        "status":STATUS,
        "des":DES
    };
    $.ajax({
        url: zhzlconfig.backendurl + "/lcgl/proRolConfigCreate",
        data: postjson,
        type: "post",
        success: function (result) {
            if (result.success) {
                alert('节点角色配置成功');
                window.location.href = 'processroleconfig';
            } else {
                alert('节点角色配置失败');
            }

        }
    })
}

