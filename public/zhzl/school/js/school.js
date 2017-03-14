var treeList = [];
$(document).ready(function () {
    initTable();
    $.ajax({
        url: zhzlconfig.backendurl + "/school/areaList",
        type: "post",
        success: function (result) {
            if(result.success){
                treeList = result.data;
                treeStructureAdapter(treeList,"name","children");
            }
        }
    });
    $('#myModal').on('hide.bs.modal', function() {
        $('#schoolForm').data('bootstrapValidator').resetForm(true);
    });
    $('#schoolForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            schoolName: {
                message: '学校名称验证失败',
                validators: {
                    notEmpty: {
                        message: '学校名称不能为空'
                    },
                    stringLength: {
                        max: 200,
                        message: '学校名称不能超过200字符'
                    }
                }
            },
            safetyManager: {
                message: '安全负责人验证失败',
                validators: {
                    stringLength: {
                        max: 200,
                        message: '安全负责人不能超过200字符'
                    }
                }
            },
            safetyContact: {
                message: '安全负责人联系方式验证失败',
                validators: {
                    stringLength: {
                        max: 200,
                        message: '安全负责人联系方式不能超过200字符'
                    }
                }
            },
            townName: {
                message: '所属辖区验证失败',
                validators: {
                    notEmpty: {
                        message: '所属辖区不能为空'
                    }
                }
            },
        }
    });
    $('#myParam').on('hide.bs.modal', function() {
        $('#configForm').data('bootstrapValidator').resetForm(true);
    });
    $('#configForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            safetyRange: {
                message: '警示范围验证失败',
                validators: {
                    notEmpty: {
                        message: '警示范围不能为空'
                    },
                    integer: {
                        message: '警示范围必须为正整数'
                    },
                    callback: {
                        message: '警示范围必须为正整数',
                        callback: function(value, validator) {
                            return value != 0;
                        }
                    }
                }
            }
        }
    });
});
function initTable() {
    var initQueryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            schoolName: params.search,
        };
        return temp;
    };
    //初始化表格,动态从服务器加载数据  
    $('#table').cigTable({
        url: zhzlconfig.backendurl + "/school/list",
        queryParams: initQueryParams,
        columns: [
            {
                field: 'state',
                checkbox: true
            },
            {
                title: '学校名称',
                field: 'schoolName',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '安全负责人/联系方式',
                field: 'manager',
                align: 'center',
                valign: 'middle',
                formatter: managerFormatter,
            },
            {
                title: '是否关注',
                field: 'isFocus',
                align: 'center',
                valign: 'middle',
                formatter: STATEFormatter,
                // events: STATEEvents,
            },
            {
                title: '警示范围（米）',
                field: 'safetyRange',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '所属乡镇',
                field: 'areaName',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '操作',
                field: 'operate',
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: operateFormatter,
            }
        ],
        onLoadSuccess: function (rows) {
            $('.i-checkbox').bootstrapSwitch({
                onText: "关注",
                offText: "不关注",
                onColor: "success",
                offColor: "warning",
                size: "mini",
                onSwitchChange: function (event, state) {
                    var data = $(this).attr("data");
                    var curState = "0";
                    if (state == true) {
                        curState = "1";
                    }
                    var postjson = { "id": data, "curState": curState};
                    $.ajax({
                        type: "post",
                        url: zhzlconfig.backendurl + "/school/setFocusSchool",
                        data: postjson,
                        success: function (data, status) {
                            $("#focusText").text("设置关注成功");
                            $("#focusModal").modal('show');
                            setTimeout(function(){$("#focusModal").modal("hide")},2000);
                        }
                    });
                }
            })
        }
    });
}

function areaFormatter(value, row, index) {
    var str = "尚未标注";
    if(row.geoName!=null){
        if(row.geoId!=null){
            str = "<a class='app' href='"+row.geoId+"'>" + row.geoName + "</a>";
        }else{
            str = row.geoName;
        }
    }
    return [
        str,
    ].join('');
}

function managerFormatter(value, row, index) {
    var result = "";
    if(row.safetyManager==null&&row.safetyContact==null){
        result = "无";
    }else if(row.safetyManager!=null&&row.safetyContact!=null){
        result = row.safetyManager+"/"+row.safetyContact;
    }else{
        result = row.safetyManager==null?row.safetyContact:row.safetyManager;
    }
    return [
        result,
    ].join('');
}

function operateFormatter(value, row, index) {
    return [
        '<a class="edit btn btn-link btn-xs" href="javascript:void(0)" title="Edit">', '<i class="fa fa-edit" style="color:#f39c12"></i>', '编辑</a>',
        /*"<a class='btn btn-link btn-xs' href='tagging.html?id=" + row.id + "'>", '<i class="fa fa-dot-circle-o" style="color: #00a65a"></i>', '校区标注 </a>',*/
        '<a class="cfg btn btn-link btn-xs" href="javascript:void(0)" title="cfg">', '<i class="fa fa-cog" style="color:#00a65a"></i>', '警示项设置</a>',
        '<a class="remove btn btn-link btn-xs" href="javascript:void(0)" title="Remove">', '<i class="fa fa-close" style="color:#f56954"></i>', '删除</a>'
    ].join('');
}

function treeStructureAdapter(source,textField,nodeField){
    for(var i=0;i<source.length;i++){
        if(source[i][textField]!=null){
            source[i]["text"] = source[i][textField];
            //delete source[i][textField];
        }
        if(source[i][nodeField]!=null){
            source[i]["nodes"] = source[i][nodeField];
            delete source[i][nodeField];
            treeStructureAdapter(source[i]["nodes"],textField,nodeField);
        }
    }
}



function addSchool() {
    if(treeList.length!=0){
        var tree = treeList;
        $("#schoolName").val("");
        $("#safetyManager").val("");
        $("#safetyContact").val("");
        $("#townName").val("");
        $("#aId").val("");
        $('#tree').treeview('remove');
        $("#myModalLabel").text("学校信息添加");
        $("#townName").on("click", function () {
            $("#tree").closest('.tree-div').css("display", "block");
        });
        $("#tree").closest('.tree-div').css("display", "none").css("height", "150px").css("overflow-y", "auto");
        $('#tree').treeview({
            data: tree,
            onNodeSelected: function (event, data) {
                $("#townName").val(data.name);
                $("#aId").val(data.id);
                $("#tree").closest('.tree-div').css("display", "none");
                $('#schoolForm').data('bootstrapValidator').updateStatus('townName', 'NOT_VALIDATED', null).validateField('townName');
            },
            onNodeUnselected: function (event, data) {
                $("#tree").closest('.tree-div').css("display", "none");
            }
        });
        $('#myModal').modal({backdrop: 'static', keyboard: false});
        $('#myModal').modal('show');
    }
}

function saveOrUpdateSchool() {
    $('#schoolForm').bootstrapValidator('validate');
    var isValid = $('#schoolForm').data('bootstrapValidator').isValid();
    if(isValid){
        var url = zhzlconfig.backendurl + "/school/create";
        var schoolName = $('#schoolName').val();
        var safetyManager = $('#safetyManager').val();
        var safetyContact = $('#safetyContact').val();
        var aId = $('#aId').val();
        var postjson = { "schoolName": schoolName, "safetyManager": safetyManager, "safetyContact": safetyContact, "aId": aId };
        if($("#myModalLabel").text()=="学校信息编辑"){
            url = zhzlconfig.backendurl + "/school/edit";
            postjson["id"]=$('#schoolId').val();
        }
        $.ajax({
            type: "post",
            url: url,
            data: postjson,
            success: function (result) {
                if(result.success){
                    $('#myModal').modal('hide');
                    $('#table').bootstrapTable('refresh', {silent: true});
                }else{
                    $("#focusText").text(result.errMsg);
                    $("#focusModal").modal('show');
                    setTimeout(function(){$("#focusModal").modal("hide")},2000);
                }
            }
        });
    }
}

window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        $.ajax({
            type: "post",
            url: zhzlconfig.backendurl + "/school/delete",
            data: {id:[row.id]},
            success: function (result) {
                if(result.success){
                    $('#table').bootstrapTable('refresh', {silent: true});
                }
            }
        });
    },
    'click .edit': function (e, value, row, index) {
        if(treeList.length!=0){
            $("#myModalLabel").text("学校信息编辑");
            $("#schoolId").val(row.id);
            $("#schoolName").val(row.schoolName);
            $("#safetyManager").val(row.safetyManager);
            $("#safetyContact").val(row.safetyContact);
            $("#townName").val(row.areaName);
            $("#aId").val(row.aId);
            $('#tree').treeview('remove');
            $("#townName").on("click", function () {
                $("#tree").closest('.tree-div').css("display", "block");
            });
            $("#tree").closest('.tree-div').css("display", "none").css("height", "150px").css("overflow-y", "auto");
            var tree = treeList;
            treeStructureAdapter(tree,"name","children");
            setSelect(tree,row.aId);
            $('#tree').treeview({
                data: tree,
                onNodeSelected: function (event, data) {
                    $("#townName").val(data.text);
                    $("#aId").val(data.id);
                    $("#tree").closest('.tree-div').css("display", "none");
                    $('#schoolForm').data('bootstrapValidator').updateStatus('townName', 'NOT_VALIDATED', null).validateField('townName');
                },
                onNodeUnselected: function (event, data) {
                    $("#tree").closest('.tree-div').css("display", "none");
                }
            });
            $('#myModal').modal({backdrop: 'static', keyboard: false});
            $('#myModal').modal('show');
        }
    },
    'click .cfg': function (e, value, row, index) {
        $.ajax({
            url: zhzlconfig.backendurl + "/school/safetyTypesList",
            type: "post",
            success: function (result) {
                if(result.success){
                    var allConfigs = result.data;
                    $.ajax({
                        url: zhzlconfig.backendurl + "/school/detail",
                        data:{id:row.id},
                        success: function (result) {
                            if(result.success){
                                $("#cfg_schoolId").val(row.id);
                                $("#safetyRange").val(row.safetyRange);
                                var checkConfigs = result.data["safetyTypes"];
                                $("#checkConfigDiv").empty();
                                for(var j=0;j<allConfigs.length;j++){
                                    if(checkConfigs!=null){
                                        var i=0;
                                        for(;i<checkConfigs.length;i++){
                                            if(checkConfigs[i]["id"]==allConfigs[j]["id"]){
                                                break;
                                            }
                                        }
                                        if(i==checkConfigs.length){
                                            $("#checkConfigDiv").append($("<input type='checkbox' value='"+allConfigs[j]["id"]+"' name='config'>"+allConfigs[j]["name"]+"<br />"));
                                        }else{
                                            $("#checkConfigDiv").append($("<input type='checkbox' checked=true value='"+allConfigs[j]["id"]+"' name='config'>"+allConfigs[j]["name"]+"<br />"));
                                        }
                                    }else{
                                        $("#checkConfigDiv").append($("<input type='checkbox' value='"+allConfigs[j]["id"]+"' name='config'>"+allConfigs[j]["name"]+"<br />"));
                                    }
                                }
                                $('#myParam').modal({backdrop: 'static', keyboard: false});
                                $('#myParam').modal('show');
                            }
                        }
                    });
                }
            }
        });
    }

};

function setSelect(tree,id){
    var states = {selected: true};
    for(var i=0;i<tree.length;i++){
        if(tree[i]["id"]==id){
            tree[i]["state"] = states;
            return true;
        }else if(tree[i]["nodes"]!=null){
            if(setSelect(tree[i]["nodes"],id)){
                return true;
            }
        }
    }
    if(i==tree.length){
        return false;
    }
}

$('#remove').click(function () {
    var ids = getIdSelections();
    $.ajax({
        type: "post",
        data: {id:ids},
        url: zhzlconfig.backendurl + "/school/delete",
        success: function (result) {
            if(result.success){
                $('#table').bootstrapTable('refresh', {silent: true});
                $('#remove').prop('disabled', true);
            }
        }
    });
    
});
function getIdSelections() {
    return $.map($('#table').bootstrapTable('getSelections'), function (row) {
        return row.id
    });
}

$('#table').on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
    $('#remove').prop('disabled', !$('#table').bootstrapTable('getSelections').length);
});

function saveCfg(){
    $('#configForm').bootstrapValidator('validate');
    var isValid = $('#configForm').data('bootstrapValidator').isValid();
    if(isValid){
        var url = zhzlconfig.backendurl + "/school/safetySet";
        var id = $('#cfg_schoolId').val();
        var safetyRange = $('#safetyRange').val();
        var safetyTypes = [];
        $("input[name='config']:checked").each(function () {
            safetyTypes.push(this.value);
        });
        var postjson = { "id": id, "safetyRange": safetyRange, "safetyTypes": safetyTypes };
        $.ajax({
            type: "post",
            url: url,
            data: postjson,
            success: function (result) {
                if(result.success){
                    $('#myParam').modal('hide');
                    $('#table').bootstrapTable('refresh', {silent: true});
                }
            }
        });
    }
}


function STATEFormatter(value, row, index) {
    var checked = row.isFocus == "1" ? "checked" : "";
    return [
        "<div class='switch'><input class='i-checkbox'  data='" + row.id + "' name='state' type='checkbox' " + checked + " /></div>"
    ].join('');
}
