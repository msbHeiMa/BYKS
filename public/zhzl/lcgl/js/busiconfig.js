define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueTable',
    'vueForm',
    'vueAlert',
    'vueBsPop',
    'vueTableFilter',
], function(require, Vue, systemConfig,$,table,alert) {
    'use strict';
    var role = systemConfig.getRole();
    //var row=systemConfig.getQueryParams();
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
                    id:"addbusiconfig",
                    name:"新增配置",
                    enableClass:"btn-primary",
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
                        template:`<span><a class='btn btn-link btn-xs' href="javascript:void(0)" @click="edit(row)"><i class="fa fa-edit " style="color: #f39c12"></i>编辑</a>
                                  <a class="remove btn btn-link btn-xs"  href="javascript:void(0)" title="Remove" @click="remove(row)"><i class="fa fa-close" style="color:#f56954"></i>删除</a>
                                 </span>`,       
                        methods:{
                            remove:function(row){ 
                                $.ajax({
                                    type: "post",
                                    data: {id:row.id},
                                    url: systemConfig.backendurl + "/lcgl/proBusConfigDelete",
                                    success: function (result) {
                                        if(result.success){
                                            successVm.show();
                                           tableVm.doSearch();

                                        }
                                    },
                                    error:function(){
                                        failureVm.show();
                                    }
                                });
                                
                            },
                            edit:function(row){
                                editVm.show();
                                editVm.data(row)
                            },
                        }
                    },
                },
                //普通列
                {
                    title: '功能模块名称',
                    field: 'funModelName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '功能模块类型',
                    field: 'funModelType',
                    align: 'center',
                    valign: 'middle',  
                    visible: true,
                },
                {
                    title: '功能模块业务表名称',
                    field: 'funModelTableName',
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
                    title: '功能模块发起页面',
                    field: 'funModelSPageUrl',
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
            this.doSearch();
        },
        methods:{
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions:function(){
                this.tableAjaxOptions = {
                    type:"get",
                    data:{
                        //busiName:this.filter.dep

                        funmodel_name:this.keyword
                    },
                    "url":systemConfig.backendurl + "/lcgl/proBusConfigList",
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
            commandAddbusiconfig:function(){
               addVm.show();
            },
        }
    });
    var addVm = new Vue({
        el: "#add",
        data: {
            fields:  [
                            {label:"功能模块名称",name:"funmodel_name",type:"text",colSpan: 2},
                            {label:"功能模块类型",name:"funmodel_type",type:"text",colSpan: 2},
                            {label:"功能模块业务表名称",name:"funmodel_tablename",type:"text",colSpan: 2},
                            {label:"功能模块发起页面",name:"funmodel_spageurl",type:"text",colSpan: 2},
                            {label:"流程业务模板名称",name:"busi_id",type:"selected",options:[{ text: "-请选择-", value: "0" }],colSpan: 2},
                            {label:"状态",name:"status",type:"selected",options:[{ text: "禁用", value: "0" }, { text: "启用", value: "1" }],colSpan: 2},
                            {label:"说明",name:"des",type:"textarea",colSpan: 2},              
                     ],
            info: {
                "funmodel_name":null,
                "funmodel_type":null,
                "funmodel_tablename":null,
                "status":"1",
                "des":null,
                "funmodel_spageurl":null,
                "busi_id":null,
            },
        },

        mounted: function () {
            this.loadData();
        },
        methods: {
            loadData:function(){
                 $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/proBusConfig",  
                    type: "get",
                    success: this.dataSuccess.bind(this),
                    error: this.dataError.bind(this),
                });

            },
            dataSuccess:function(res){
               for(var i=0;i<res.data.length;i++){
                    this.fields[4].options[i+1]={
                        "text":res.data[i].busiName,
                        "value":res.data[i].bId,
                    }
                }
                this.info.busi_id=0;
            },
            dataError:function(){

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
                if(this.info.busi_id!="0"&&this.info.funmodel_name!=null&&this.info.funmodel_type!=null&&this.info.funmodel_tablename!=null&&this.info.status!=null&&this.info.funmodel_spageurl!=null){
                    $.ajax({
                    "url":systemConfig.backendurl+"/lcgl/proBusConfigCreate",
                            data:{
                                "funmodel_name":this.info.funmodel_name,
                                "funmodel_type":this.info.funmodel_type,
                                "funmodel_tablename":this.info.funmodel_tablename,
                                "status":this.info.status,
                                "des":this.info.des,
                                "funmodel_spageurl":this.info.funmodel_spageurl,
                                "busi_id":this.info.busi_id,
                            },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }else{
                    this.hide();
                    failureVm.show()
                }

            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    tableVm.doSearch();
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
                            {label:"功能模块名称",name:"funModelName",type:"text",colSpan: 2},
                            {label:"功能模块类型",name:"funModelType",type:"text",colSpan: 2},
                            {label:"功能模块业务表名称",name:"funModelTableName",type:"text",colSpan: 2},
                            {label:"功能模块发起页面",name:"funModelSPageUrl",type:"text",colSpan: 2},
                            {label:"流程业务模板名称",name:"busiId",type:"selected",options:[{ text: "-请选择-", value: "0" }],colSpan: 2},
                            {label:"状态",name:"status",type:"selected",options:[{ text: "禁用", value: "0" }, { text: "启用", value: "1" }],colSpan: 2},
                            {label:"说明",name:"des",type:"textarea",colSpan: 2},              
                     ],
            info: {
                "funModelName":null,
                "funModelType":null,
                "funModelTableName":null,
                "funModelSPageUrl":null,
                "busiId":null,
                "status":null,
                "des":null,
                "funModelId":null,
                "id":null,
            },
        },

        mounted: function () {
            this.loadData();
        },
        methods: {
             loadData:function(){
                 $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/proBusConfig",  
                    type: "get",
                    success: this.dataSuccess.bind(this),
                    error: this.dataError.bind(this),
                });

            },
            dataSuccess:function(res){
               for(var i=0;i<res.data.length;i++){
                    this.fields[4].options[i+1]={
                        "text":res.data[i].busiName,
                        "value":res.data[i].bId,
                    }
                }
            },
            data:function(row){
                this.info.id=row.id;
                this.info.funModelId=row.funModelId;
                this.info.funModelName=row.funModelName;
                this.info.funModelType=row.funModelType;
                this.info.funModelTableName=row.funModelTableName;
                this.info.funModelSPageUrl=row.funModelSPageUrl;
                this.info.busiId=row.busiId;
                this.info.status=row.status;
                this.info.des=row.des;
            },
            dataError:function(){

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
                if(this.info.busiId!="0"){
                    $.ajax({
                    "url":systemConfig.backendurl+"/lcgl/proBusConfigEdit",
                            data:{
                                "id":this.info.id,
                                "funmodel_id":this.info.funModelId,
                                "funmodel_name":this.info.funModelName,
                                "funmodel_type":this.info.funModelType,
                                "funmodel_tablename":this.info.funModelTableName,
                                "status":this.info.status,
                                "des":this.info.des,
                                "funmodel_spageurl":this.info.funModelSPageUrl,
                                "busi_id":this.info.busiId,
                            },
                        type: "post",
                        success: this.saveSuccess.bind(this),
                        error: this.saveError.bind(this),
                    });
                }else{
                    this.hide();
                    failureVm.show()
                }

            },
            saveSuccess: function (res) {
                if (res.success) {
                    this.hide();
                    successVm.show();
                    tableVm.doSearch();
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