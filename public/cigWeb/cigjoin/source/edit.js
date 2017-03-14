define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueForm',
    'breadcrumb',
    'vueAlert'
], function(require, Vue, config, $, form, breadcrumb,alert) {
    'use strict';
    var formHelper = form.helper;
    var query = config.getQueryParams();
    var id = query.id;

    breadcrumb.items.push({
        text:"数据源管理",
        url:"/cigWeb/cigjoin/source/list.html"
    });
    breadcrumb.items.push({
        text:"数据源编辑",
    });

    var editFields = [
        {label:"数据源名称",name:"datasourceName",type:"text",colSpan:2},
        {label:"来源单位",name:"datasourceUnit",type:"text",colSpan:2},
        {label:"关联系统名称",name:"relatedSystem",type:"text",colSpan:2},
        {label:"接入方式",name:"accessStyle",type:"selected",options:[
                {text:"Excel导入",value:"10"},
                {text:"页面抓取",value:"20"},
                {text:"数据库集成",value:"30"},
            ],colSpan:2},
        {label:"执行更新频率",name:"updateFrequency",type:"text",colSpan:2},
        {label:"执行更新时间",name:"updateTime",type:"text",colSpan:2},
        {label:"接入配置",name:"accessConfig",type:"textarea",colSpan:2},
    ];
    var customRender = function(context,fields,createElement){
        return [
            createElement("h4",{class:{"":true}},["基本信息"]),
            createElement("div",{class:{"box-body":true}},form.renders.table2Render(context,fields.filter(function(e,i){return i < 3}),createElement)),
            createElement("h4",{class:{"":true}},["接入系统配置信息"]),
            createElement("div",{class:{"box-body":true}},form.renders.table2Render(context,fields.filter(function(e,i){return i >= 3}),createElement)),
        ];
    };
    var formVm = new Vue({
        mixins:[
            alert.getMixin(),
            formHelper.getFieldsMixin(editFields,{}),
            formHelper.getValidatorMixin({
                "name":{maxlength:50},
            },"form","data")
        ],
        data:{
            title:id?"修改数据源":"添加数据源",
            customRender:customRender,
            id:id
        },
        mounted:function(){
            if(this.id){
                this.getData();
            }
        },
        methods:{
            getData:function(){
                var options = {
                    url:config.backendurl+"/agg/datasourceServiceGetObj",
                    data:{
                        id:this.id
                    },
                    type:"get",
                    success:this.getDataSuccess.bind(this),
                    error:this.getDataError.bind(this)
                };  
                $.ajax(options);
            },
            getDataSuccess:function(res){
                if(res.success){
                    if(res.data){
                        this.$set(this,"data",res.data);
                    }
                }
                else{
                    this.getDataError();
                }
            },
            getDataError:function(){
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    if(this.id){
                        $.ajax({
                            "url":config.backendurl+"/agg/datasourceServiceEdit",
                            data:this.data,
                            type:"post",
                            success:this.saveSuccess.bind(this),
                            error:this.saveError.bind(this),
                        });
                    }
                    else{
                        $.ajax({
                            "url":config.backendurl+"/agg/datasourceServiceCreate",
                            data:$.extend({id:this.id},this.data),
                            type:"post",
                            success:this.saveSuccess.bind(this),
                            error:this.saveError.bind(this),
                        });
                    }
                }
            },
            saveSuccess:function(res){
                if(res.success){
                    if(res.data && res.data.isValid === false){
                        var state = {};
                        res.data.errors.forEach(function(err) {
                            state[err.name] = {
                                type:"error",
                                message:err.message
                            };
                        }, this);
                        this.$refs.form.setValidation(state);
                    }
                    else{
                        location.href = "list.html";
                        // tableVm.doSearch();
                    }
                }
                else{
                    this.saveError(res);
                }
            },
            saveError:function(res){
                if(res && res.errMsg){
                    this.showError(res.errMsg);
                }
            }
        }
    });
    return function(el){
        formVm.$mount(el);
    }
});