define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
     'vueAlert',
    'vueTableFilter',
   
    'vueBsPop',
], function(require, Vue, systemConfig,$,form,table,alert) {
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
                    id:"addbusiness",
                    name:"新增业务",
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
                        template:`<span><a class='btn btn-link btn-xs' href="javascript:void(0)" @click="edit(row)"><i class='fa fa-edit' style='color: #f39c12'></i>编辑</a>
                                  <a class="remove btn btn-link btn-xs"href="javascript:void(0)" title="Remove" @click="remove(row)"><i class="fa fa-close" style="color:#f56954"></i>删除</a><br>
                                  <a class='btn btn-link btn-xs' :href="\'role.html?id=\'+row.id"><i class="fa fa-cog" style="color:#00a65a"></i>查看角色</a><br>
                                  <a class='btn btn-link btn-xs' :href="\'processroleconfig.html?id=\'+row.id"><i class="fa fa-plus" style="color:#3c8dbc"></i>查看节点</a></span>`,       
                        methods:{
                            remove:function(row){ 
                                $.ajax({
                                    type: "post",
                                    data: {id:row.id},
                                    url: systemConfig.backendurl + "/lcgl/processDelete",
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
                            }
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
                    title: '业务分类',
                    field: 'busiType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '所属单位名称',
                    field: 'departmentName',
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
                    title: '流程模版名称',
                    field: 'wfName',
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

                        busiName:this.keyword
                    },
                    "url":systemConfig.backendurl + "/lcgl/processList",
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
            commandAddbusiness:function(){
                addVm.show();
            },
        }
    });
    var addVm = new Vue({
        el: "#add",
        data: {
            fields:  [
                            {label:"业务名称",name:"busiName",type:"text",colSpan: 2},
                            {label:"模板名称",name:"wfName",type:"text",colSpan: 2},
                            {label:"业务分类",name:"busiType",type:"text",colSpan: 2},
                            {label:"所属单位名称",name:"ssdwbm",type:"selected",options:[{ text: "-清选择-", value: "0" }],colSpan: 2},
                            {label:"状态",name:"status",type:"selected",options:[{ text: "禁用", value: "0" }, { text: "启用", value: "1" }],colSpan: 2},
                            {label:"说明",name:"des",type:"textarea",colSpan: 2},                 
                     ],
            info: {
                busiName:null,
                wfName:null,
                busiType:null,
                ssdwbm:null,
                status:"1",
                des:null,
            },
        },

        mounted: function () {
            this.loadData();
        },
        methods: {
            loadData:function(){
                 $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/getDepartment",  
                    type: "get",
                    success: this.dataSuccess.bind(this),
                    error: this.dataError.bind(this),
                });

            },
            dataSuccess:function(res){
               for(var i=0;i<res.data.length;i++){
                    this.fields[3].options[i+1]={
                        "text":res.data[i].departmentName,
                        "value":res.data[i].departmentId,
                    }
                }
                this.info.ssdwbm=0;
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
                if(this.info.ssdwbm!="0"&&this.info.busiName!=null&&this.info.busiType!=null&&this.info.status!=null&&this.info.wfName!=null){
                    $.ajax({
                        "url": systemConfig.backendurl + "/lcgl/processCreate",
                        data: {
                                "busiName":this.info.busiName,
                                "busiType":this.info.busiType,
                                "ssdwbm":this.info.ssdwbm,
                                "status":this.info.status,
                                "des":this.info.des,
                                "wfName":this.info.wfName,
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
                            {label:"业务名称",name:"busiName",type:"text",colSpan: 2},
                            {label:"模板名称",name:"wfName",type:"text",colSpan: 2},
                            {label:"业务分类",name:"busiType",type:"text",colSpan: 2},
                            {label:"所属单位名称",name:"ssdwbm",type:"selected",options:[{ text: "-清选择-", value: "0" }],colSpan: 2},
                            {label:"状态",name:"status",type:"selected",options:[{ text: "禁用", value: "0" }, { text: "启用", value: "1" }],colSpan: 2},
                            {label:"说明",name:"des",type:"textarea",colSpan: 2},                 
                     ],
            info: {
                id:null,
                busiName:null,
                wfName:null,
                busiType:null,
                ssdwbm:null,
                status:null,
                des:null,
            },
        },

        mounted: function () {
            this.loadData();
        },
        methods: {
            loadData:function(){
                 $.ajax({
                    "url": systemConfig.backendurl + "/lcgl/getDepartment",  
                    type: "get",
                    success: this.dataSuccess.bind(this),
                    error: this.dataError.bind(this),
                });

            },
            data:function(row){
                this.info.id=row.id;
                this.info.busiName=row.busiName;
                this.info.wfName=row.wfName;
                this.info.busiType=row.busiType;
                this.info.ssdwbm=row.ssdwbm;
                this.info.status=row.status;
                this.info.des=row.des;
            },
            dataSuccess:function(res){
                for(var i=0;i<res.data.length;i++){
                    this.fields[3].options[i+1]={
                        "text":res.data[i].departmentName,
                        "value":res.data[i].departmentId,
                    }
                }
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
                if(this.info.ssdwbm!="0"){
                    $.ajax({
                        "url": systemConfig.backendurl + "/lcgl/processEdit",
                        data: {
                                "id":this.info.id,
                                "busiName":this.info.busiName,
                                "busiType":this.info.busiType,
                                "ssdwbm":this.info.ssdwbm,
                                "status":this.info.status,
                                "des":this.info.des,
                                "wfName":this.info.wfName,
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