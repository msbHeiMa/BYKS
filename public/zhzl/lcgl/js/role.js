define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
    'vueArea',
    'vueBsPop',
], function(require, Vue, systemConfig,$,form,table,alert) {
    'use strict';
    var role = systemConfig.getRole();
    //var row=systemConfig.getQueryParams();
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
                    id:"addrole",
                    name:"新 增 角 色",
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
                        template:`<span><a class='btn btn-link btn-xs' href="javascript:void(0)" @click="edit(row)"><i class='fa fa-edit' style='color: #f39c12'></i>编辑</a>
                                  <a class="remove btn btn-link btn-xs"  href="javascript:void(0)" title="Remove" @click="remove(row)"><i class="fa fa-close" style="color:#f56954"></i>删除</a>
                                  <a class='btn btn-link btn-xs' :href="\'approve.html?id=\'+row.id"><i class="fa fa-cog" style="color:#00a65a"></i>配置人员</a>`,       
                        methods:{
                            remove:function(row){ 
                                $.ajax({
                                    type: "post",
                                    data: {id:row.id},
                                    url: systemConfig.backendurl + "/lcgl/roleDelete",
                                    success: function (result) {
                                        if(result.success){
                                           tableVm.loadData();
                                           successVm.show();
                                        }
                                    },
                                    error:function(){
                                        failureVm.show();
                                    }
                                });
                                
                            },
                            edit:function(row){
                                editVm.show();
                                editVm.data(row);
                            },
                        }
                    },
                },
                //普通列
                {
                    title: '业务名称',
                    field: 'busiName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '角色代码',
                    field: 'roleCode',
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
                },
                {
                    title: '序号',
                    field: 'roleOrder',
                    align: 'center',
                    valign: 'middle', 
                    visible: true,
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
                    title: '创建人ID',
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
            var bId = systemConfig.getQueryParams().id ;
            this.bId = bId ;
            if (bId) {
                this.loadData();
            }
        },
        methods:{
            loadData:function(){
                this.tableAjaxOptions={
                    type: "get",
                    data: {
                        bId: this.bId
                    },
                    "url": systemConfig.backendurl + "/lcgl/roleList",
                }
            },
            getDataError:function(){},
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions:function(){
                this.tableAjaxOptions = {
                    type:"get",
                    data:{
                        //通过角色名称查询
                         bId: this.bId,
                         roleName:this.keyword
                    },
                    "url":systemConfig.backendurl + "/lcgl/roleListByRoleName",
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
            commandAddrole:function(){
                addVm.show();
            },
            commandBack:function(){
                window.history.back(-1);
            },
        }
    });
    var addVm = new Vue({
        el: "#add",
        data: {
            fields:  [
                    {label:"角色代码",name:"roleCode",type:"text",colSpan: 2},
                    {label:"角色名称",name:"roleName",type:"text",colSpan: 2},
                    {label:"序号",name:"roleOrder",type:"text",colSpan: 2},
                    {label:"状态",name:"status",type:"selected",options:[{ text: "禁用", value: "0" }, { text: "启用", value: "1" }],colSpan: 2},
                    {label:"说明",name:"des",type:"textarea",colSpan: 2},                   
                     ],
            info: {
                "bId":null,
                "roleCode":null,
                "roleName":null,
                "roleOrder":null,
                "status":"1",
                "des":null,
            },
        },

        mounted: function () {
            var bId = systemConfig.getQueryParams().id;
            this.bId = bId;
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
                if(this.bId!=null&&this.info.roleCode!=null&&this.info.roleName!=null&&this.info.status!=null&&this.info.roleOrder!=null){
                    $.ajax({
                        "url":systemConfig.backendurl+"/lcgl/roleCreate",
                        data:{
                            "bId":this.bId,
                            "roleCode":this.info.roleCode,
                            "roleName":this.info.roleName,
                            "status":this.info.status,
                            "des":this.info.des,
                            "roleOrder":this.info.roleOrder,
                        },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }else{
                    this.hide()
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
    var editVm = new Vue({
        el: "#edit",
        data: {
            fields:  [
                     {label:"角色代码",name:"roleCode",type:"text",colSpan: 2},
                    {label:"角色名称",name:"roleName",type:"text",colSpan: 2},
                    {label:"序号",name:"roleOrder",type:"text",colSpan: 2},
                    {label:"状态",name:"status",type:"selected",options:[{ text: "禁用", value: "0" }, { text: "启用", value: "1" }],colSpan: 2},
                    {label:"说明",name:"des",type:"textarea",colSpan: 2},                 
                     ],
            info: {
                "id":null,
                "bId":null,
                "roleCode":null,
                "roleName":null,
                "roleOrder":null,
                "status":null,
                "des":null,
            },
        },

        mounted: function () {
        },
        methods: {
            data:function(row){
                this.info.id=row.id;
                this.info.bId=row.bId;
                this.info.roleCode=row.roleCode;
                this.info.roleName=row.roleName;
                this.info.roleOrder=row.roleOrder;
                this.info.status=row.status;
                this.info.des=row.des;
            },
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
                $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/roleEdit",
                    data: {
                            "id":this.info.id,
                            "bId":this.info.bId,
                            "roleCode":this.info.roleCode,
                            "roleName":this.info.roleName,
                            "status":this.info.status,
                            "des":this.info.des,
                            "roleOrder":this.info.roleOrder,
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