define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueTableFilter',
    'vueDomainPool',
    'vueAlert',
    'vueForm',
    'vueBsPop',
], function(require, Vue, systemConfig,$,table,domainPool,alert,form) {
    'use strict';
    var role = systemConfig.getRole();
    var formHelper = form.helper;
    var tableHelper = table.helper;
    var tableVm = new Vue({
        el:"#mainTable",
        data:{
            //设置快速查询项
            filters:[ ],
            //设置快速查询项的默认值
            filter:{
                dep:null
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions:{
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns:[
                {
                    id:"businode",
                    name:"新增节点",
                    enableClass:"btn-primary",
                },
                {
                    id:"back",
                    name:"  返  回   ",
                    enableClass:"btn-defalut",

                }
            ],
            //设置列表的关键字查询
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:false
            },
            //设置列表的列
            tableColumns:[
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,                                  
                    component: {
                        template:`<span> 
                                     <a v-if="row.rolenodeId" class="btn btn-link btn-xs" href="javascript:void(0)" @click="edit(row)"><i class="fa fa-edit" style="color: #f39c12"></i>角色编辑</a>
                                     <a v-else class="btn btn-link btn-xs" href="javascript:void(0)" @click="create(row)"><i class="fa fa-cog" style="color:#00a65a"></i>配置角色</a></br>
                                     <a class="btn btn-link btn-xs" href="javascript:void(0)" @click="editjiedian(row)"><i class="fa fa-edit" style="color: #f39c12"></i>节点编辑</a></br>
                                     <a class="remove btn btn-link btn-xs" :id=row.nodeId href="javascript:void(0)" title="Remove" @click="remove(row)"><i class="fa fa-close" style="color:#f56954"></i>删除</a>
                                     </span>`,   
                        methods:{
                            remove:function(row){ 
                                $.ajax({
                                    type: "post",
                                    data: {nodeId:row.nodeId},
                                    url: systemConfig.backendurl + "/lcgl/proRolConfigDelete",
                                    success: function (result) {
                                        if(result.success){
                                           // alert("删除成功");     
                                            //$(`#${row.nodeId}`).parent().parent().parent().remove();
                                            successVm.show();
                                            tableVm.loadData();
                                        }else{
                                            failureVm.show();
                                        }
                                    }
                                });  
                            },
                            create:function(row){
                                //successVm.show();
                                editModallVm.show();
                                editModallVm.loadData(row);
                            },
                            edit:function(row){
                                //failureVm.show();
                                editModallVm.show();
                                editModallVm.loadData(row);
                            },
                            editjiedian:function(row){
                                editjiedianModalVm.show();
                                editjiedianModalVm.loadData(row);
                            }
                        }
                    },
                },
                //普通列
                {
                    title: '序号',
                    field: 'nodeOrder',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '节点名称',
                    field: 'nodeName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '角色名称',
                    field: 'roleName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component:'<span>{{(row.roleName==null)?"未配置角色":row.roleName}}</span>'
                },
                {
                    title: '节点页面URL',
                    field: 'nodePageurl',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '节点审批方式',
                    field: 'nodeApprovetype',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component:'<span>{{(row.nodeApprovetype==1)?"一人审批通过":"全部审批通过"}}</span>'
                },
                {
                    title: '节点审核人员来源方式',
                    field: 'nodeUsersource',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component:'<span>{{(row.nodeUsersource==1)?"根据SSDWBM计算":(row.nodeUsersource==2)?"选择审批人":"根据其它规则计算"}}</span>'
                },
                {
                    title: '状态',
                    field: 'status',
                    align: 'center',
                    valign: 'middle', 
                    visible: true,
                    component:'<span>{{(row.status==0)?"禁用":"启用"}}</span>'
                },
                {
                    title: '说明',
                    field: 'des',
                    align: 'center',
                    valign: 'middle', 
                    visible: true,
                },
                {
                    title: '创建人名称',
                    field: 'userName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,   
                },
                {
                    title: '创建日期',
                    field: 'createDate',
                    align: 'center',
                    valign: 'middle', 
                    visible: true,       
                },
                
            ],
            tableAjaxOptions:{

            }
        },
        mounted:function(){
            var id= systemConfig.getQueryParams().id ;
            this.id =id ;
            if (id) {
                this.loadData();
            }
        },
        methods:{
            loadData:function(){
                this.tableAjaxOptions={
                    type: "get",
                    data: {
                        busiId:this.id,
                    },
                    "url": systemConfig.backendurl + "/lcgl/proRolConfigList",
                }
            },
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions:function(){
                this.tableAjaxOptions = {
                    type:"get",
                    data:{
                        busiId:this.id,
                        nodeName:this.keyword,
                    },
                    "url":systemConfig.backendurl + "/lcgl/proRolConfigQueryList",
                }
            },

            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
            executeCommand:function(command){
                var func = "command"+command.substr(0,1).toUpperCase()+command.substr(1);
                if(this[func]){
                    this[func]();
                }
            },
            commandBusinode:function(){
                addVm.show();
            },
            commandBack:function(){
                window.history.back(-1);
            },
        }
    });
     var editModallVm = new Vue({
        el: "#editModal",
        data: {
            fields: {
                bjMain: [
                            { label: "可选角色", name: "roleId", type: "selected", options: [], colSpan: 2 },
                            { label: "状态", name: "rolenodeStatus", type: "selected", options: [{ text: "禁用", value: "0" }, { text: "启用", value: "1" }], colSpan: 2},
                            { label: "说明", name: "rolenodeDes", type: "textarea", colSpan: 2 },
                    
                        ],
            },
            bjInfo: {
                nodeId:null,
                roleId:null,
                rolenodeId:null,
                nodeName:null,
                roleName:null,
                rolenodeDes:null,
                rolenodeStatus:null,
            },
        },

        mounted: function () {
            var id = systemConfig.getQueryParams().id;
            this.id= id ;
            if (id) {
                 this.loadbjInfo();
            }
          
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            loadData: function (row) {
                this.bjInfo.nodeId = row.nodeId;
                this.bjInfo.roleId = row.roleId;
                this.bjInfo.rolenodeId = row.rolenodeId;
                this.bjInfo.nodeName ="节点名称："+row.nodeName;
                this.bjInfo.roleName =row.roleName;
                this.bjInfo.rolenodeStatus =row.rolenodeStatus;
                this.bjInfo.rolenodeDes =row.rolenodeDes;
                var length=this.fields.bjMain[0].options.length;
                var arr=this.fields.bjMain[0].options
                if(this.bjInfo.roleId==null){
                    this.bjInfo.roleId="1";
                }

            },
            loadbjInfo:function(){
                var options = {
                    "url": systemConfig.backendurl + `/lcgl/proRolConfigGetRole?bId=${this.id }`,
                    type: "get",
                    "success": this.getbjInfoSuccess.bind(this),
                    "error": this.getbjInfoError.bind(this),
                };
                $.ajax(options);
            },
            getbjInfoSuccess:function(res){
                if(res.success){
                    for(var i=0;i<res.data.length;i++){
                        this.fields.bjMain[0].options[i]={
                            "text":res.data[i].roleName,
                            "value":res.data[i].id,
                        }
                    }   
                    var length=this.fields.bjMain[0].options.length;
                    this.fields.bjMain[0].options[length+1]={
                            "text":"未配置角色",
                            "value":"1",
                    }
                }
               
            },
            getbjInfoError:function(){

            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if(this.bjInfo.roleId=="1"){
                     this.hide();
                }
                if(this.bjInfo.roleName==null && this.bjInfo.roleId!=="1"){
                    $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/proRolConfigCreate",
                    data: {
                       // "id":this.bjInfo.rolenodeId,
                        "nodeId":this.bjInfo.nodeId,
                        "Rid":this.bjInfo.roleId,
                        "status":this.bjInfo.rolenodeStatus,
                        "des":this.bjInfo.rolenodeDes
                    },
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });
                }else if(this.bjInfo.roleId!=="1"){
                    $.ajax({
                        "url": systemConfig.backendurl + "/lcgl/proRolConfigEdit",
                        data: {
                            "id":this.bjInfo.rolenodeId,
                            "nodeId":this.bjInfo.nodeId,
                            "Rid":this.bjInfo.roleId,
                            "status":this.bjInfo.rolenodeStatus,
                            "des":this.bjInfo.rolenodeDes
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }

            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    successVm.show();
                    tableVm.loadData();
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res && res.message) {
                    failureVm.show();
                    this.showError(res.message);
                }
            }
        }
    });
     var editjiedianModalVm = new Vue({
        el: "#editjiedianModal",
        data: {
            fields: {
                jdMain: [
                            { label: "节点名称", name: "nodeName", type: "text", colSpan: 2 },
                            { label: "节点CODE", name: "nodeCode", type: "text",  colSpan: 2 },
                            { label: "节点页面URL", name: "nodePageurl", type: "text",colSpan: 2 },
                            { label: "节点审批方式", name: "nodeApprovetype", type: "selected", options: [{text:"一人审批通过",value:"1"},{text:"全部审批通过",value:"2"}], colSpan: 2 },
                            { label: "节点审核人员来源方式", name: "nodeUsersource", type: "selected", options: [{text:"根据SSDWBM计算",value:"1"},{text:"选择审批人 ",value:"2"},{text:"根据其它规则计算",value:"3"}], colSpan: 2 },
                            { label: "序号", name: "nodeOrder", type: "text", colSpan: 2 },
                            { label: "状态", name: "status", type: "selected", options: [{ text: "禁用", value: "0" }, { text: "启用", value: "1" }], colSpan: 2},
                            { label: "说明", name: "des", type: "textarea", colSpan: 2 },                    
                        ],
            },
            jdInfo: {
                nodeId:null,
                nodeName:null,
                nodeCode:null,
                nodePageurl:null,
                nodeApprovetype:null,
                nodeUsersource:null,
                nodeOrder:null,
                status:null,
                des:null,
            },
        },

        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            loadData: function (row) {
                this.jdInfo.nodeId = row.nodeId;
                this.jdInfo.nodeName = row.nodeName;
                this.jdInfo.nodeCode = row.nodeCode;
                this.jdInfo.nodePageurl =row.nodePageurl;
                this.jdInfo.nodeApprovetype =row.nodeApprovetype;
                this.jdInfo.nodeUsersource =row.nodeUsersource;
                this.jdInfo.nodeOrder =row.nodeOrder;
                this.jdInfo.status =row.status;
                this.jdInfo.des =row.des;

            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/proRolConfigjdEdit",
                    data: {
                        "nodeId":this.jdInfo.nodeId,
                        "nodeName":this.jdInfo.nodeName,
                        "nodeCode":this.jdInfo.nodeCode,
                        "nodePageurl":this.jdInfo.nodePageurl,
                        "nodeApprovetype":this.jdInfo.nodeApprovetype,
                        "nodeUsersource":this.jdInfo.nodeUsersource,
                        "nodeOrder":this.jdInfo.nodeOrder,
                        "status":this.jdInfo.status,
                        "des":this.jdInfo.des,
                    },
                    type: "post",
                    success: this.saveSuccess.bind(this),
                    error: this.saveError.bind(this),
                });

            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    successVm.show();
                    tableVm.loadData();
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res && res.message) {
                    failureVm.show();
                    this.showError(res.message);
                    
                }
            }
        }
    });
    var addVm = new Vue({
        el: "#add",
        data: {
            fields:  [
                            { label: "节点名称", name: "nodeName", type: "text",  colSpan: 2 },
                            { label: "节点CODE", name: "nodeCode", type: "text", colSpan: 2 },
                            { label: "节点页面URL", name: "nodePageUrl", type: "text", colSpan: 2 },
                            { label: "节点审批方式", name: "nodeApproveType", type: "selected", options: [{text:"一人审批通过",value:"1"},{text:"全部审批通过",value:"2"}], colSpan: 2 },
                            { label: "节点审核人员来源方式", name: "nodeUserSource", type: "selected", options: [{text:"根据SSDWBM计算",value:"1"},{text:"选择审批人 ",value:"2"},{text:"根据其它规则计算",value:"3"}], colSpan: 2 },
                            { label: "序号", name: "nodeOrder", type: "text", colSpan: 2 },
                            { label: "状态", name: "status", type: "selected", options: [{ text: "禁用", value: "0" }, { text: "启用", value: "1" }], colSpan: 2},
                            { label: "说明", name: "des", type: "textarea", colSpan: 2 },              
                     ],
            info: {
                nodeName:null,
                nodeCode:null,
                nodePageUrl:null,
                nodeApproveType:"1",
                nodeUserSource:"1",
                nodeOrder:null,
                status:"1",
                des:null,
            },
        },

        mounted: function () {
            var id = systemConfig.getQueryParams().id;
            this.id= id ;
        },
        methods: {
     
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave: function () {
                if(this.id!=null&&this.info.nodeName!=null&&this.info.nodeCode!=null&&this.info.nodePageUrl!=null&&this.info.nodeApproveType!=null&&this.info.nodeUserSource!=null&&this.info.nodeOrder!=null&&this.info.status!=null){
                    $.ajax({
                        "url":systemConfig.backendurl+"/lcgl/wfbusinodeCreate",
                            data:{
                                "bId":this.id,
                                "nodeName":this.info.nodeName,
                                "nodeCode":this.info.nodeCode,
                                "nodePageUrl":this.info.nodePageUrl,
                                "nodeApproveType":this.info.nodeApproveType,
                                "nodeUserSource":this.info.nodeUserSource,
                                "nodeOrder":this.info.nodeOrder,
                                "status":this.info.status,
                                "des":this.info.des,
                            },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }else{
                    this.hide();
                    failureVm.show();
                }

            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    tableVm.loadData();
                    successVm.show();
                  
                }
                else {
                    this.saveError(res);
                }
            },
            saveError: function (res) {
                if (res && res.message) {
                    failureVm.show();
                    this.showError(res.message);
                    
                }
            }
        }
    });
     var successVm = new Vue({
        el: "#success",
        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.hide();
            },
        }
    });
    var failureVm = new Vue({
        el: "#failure",
        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.$refs.pop.show();
            },
            hide: function () {
                this.$refs.pop.hide();
            },
            close: function () {
                this.hide();
            },
            save: function () {
                this.hide();
            },
        }
    });
});