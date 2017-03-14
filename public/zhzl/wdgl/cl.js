define([
    'require',
    'vue',
    'vueDomainPool',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
    'vueArea',
    'vueBsPop',
    'vueBsTreeview',
    'vueAttachment',
    'vueObjectSelector'
], function(require, Vue, domainPool, systemConfig, $ , form, table, alert) {
    'use strict';
    // domainPool.cacheDomains(['abc','def']); 缓存当前页所需要的所有域
    var formHelper = form.helper;
    var tableHelper = table.helper;
    var role = systemConfig.getRole();
    var query = systemConfig.getQueryParams();
    var cardTypeOptions = [{text:"居民身份证",value:"1"}];
    var tableVm = new Vue({
        el:"#mainTable",
        data:{
            //设置快速查询项
            filters:[
                //支持设定辖区
                {
                    name:"dep",
                    text:"辖区",
                    type:"custom",
                    component:'<cig-ajax-area\
                        :ajax-options="data.ajaxOptions" \
                        v-model="valueProxy" \
                        @input="input" \
                        empty-text="请选择" \
                        :value="valueProxy" \></cig-ajax-area>',
                    ajaxOptions:{
                        type:"get",
                        "url":systemConfig.backendurl+"/system/queryUserDataDep"
                    },
                },
                {
                    name:"carNature",
                    text:"机动车使用性质",
                    type:"domain",
                    all:true,
                    domainName:"carNature"
                },
                {
                    name:"dataSource",
                    text:"数据来源",
                    type:"domain",
                    all:true,
                    domainName:"dataSource"
                },
                {
                    name:"carColour",
                    text:"车辆颜色",
                    type:"domain",
                    all:true,
                    domainName:"carColour"
                },
                {
                    name:"carType",
                    text:"车辆类型",
                    type:"domain",
                    all:true,
                    domainName:"carType"
                },
                {
                    name:"carBrand",
                    text:"品牌",
                    type:"domain",
                    all:true,
                    domainName:"carBrand"
                }
            ],
            //设置快速查询项的默认值
            filter:{
                dep:null,
                carNature:"",
                dataSource:"",
                carColour:"",
                carType:"",
                carBrand:"",
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions:{
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns:[
                {
                    id:"add",
                    name:"添加车辆信息",
                    enableClass:"btn-danger",
                    visible:role == "all"
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
                    title: '姓名',
                    field: 'pName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<a target='_blank' :href='row.pId?\"../syrk/rkDetail.html?id=\"+row.pId:\"javascript:;\"'>{{row.pName}}</a>"
                },
                {
                    title: '所有人证件类型',
                    field: 'pCardType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>身份证</span>"
                },
                {
                    title: '所有人证件号码',
                    field: 'pCardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '车牌号',
                    field: 'carNumber',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<a target='_blank' :href='\"clDetail.html?id=\"+row.id'>{{row.carNumber}}</a>"
                },
                {
                    title: '车辆类型',
                    field: 'carType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("carType","carType")
                },
                {
                    title: '车辆颜色',
                    field: 'carColour',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("carColour","carColour")
                },
                {
                    title: '使用性质',
                    field: 'nature',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("nature","carNature")
                },
                {
                    title: '数据来源',
                    field: 'dataSource',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("nature","carNature")
                },
                // {
                //     title: '发动机号码',
                //     field: 'engineNumber',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                // },
                // {
                //     title: '车架号',
                //     field: 'engineNumber',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                // },
                // {
                //     title: '是否上户',
                //     field: 'isHouseholds',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                //     component: "<span>{{row.isHouseholds=='1' ? '是':'否'}}</span>"
                // },
                // {
                //     title: '车况',
                //     field: 'condition',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                // },
                {
                    title: '品牌',
                    field: 'brand',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("brand","carBrand")
                },
                // {
                //     title: '车辆用途',
                //     field: 'purpose',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                // },
                // {
                //     title: '最新更新日期',
                //     field: 'updateDate',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                // },
                // {
                //     title: '数据创建日期',
                //     field: 'createDate',
                //     align: 'center',
                //     valign: 'middle',
                //     visible: true,
                // },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: role == "all",
                    component: {
                        template:"<span v-if='row.dataSource == \"1\"'>\
                                <a href='javascript:;' @click='alert' class='disabled' disabled>信息维护</a>\|<a href='javascript:;' @click='alert' class='disabled' disabled>删除</a>\
                            </span>\
                            <span v-else>\
                                <a href='javascript:;' @click='edit'>信息维护</a>\|<a href='javascript:;' @click='del'>删除</a>\
                            </span>",
                        methods:{
                            alert:function(){
                                alert.alert("导入的数据不允许编辑或删除");
                            },
                            edit:function(){
                                tableVm.editRow(this.row);
                            },
                            del:function(){
                                tableVm.delRow(this.row);
                            }
                        }
                    }
                }
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
                        keyword:this.keyword,//关键字参数
                        dwdm:this.filter.dep,
                        carColour:this.filter.carColour,
                        carType:this.filter.carType,
                        brand:this.filter.carBrand,
                        nature:this.filter.carNature,
                        dataSource:this.filter.dataSource
                    },
                    url:systemConfig.backendurl+"/realPerson/car/cars"
                }
            },
            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
            refresh:function(){
                this.$refs.table.loadRows();
            },
            //每一行的方法
            editRow:function(row){
                editVm.show();
                editVm.reset();
                editVm.loadData(row);
            },
            delRow:function(row){
                var delOption = {
                    type:"post",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/car/delCar"+"?id="+row.id,
                    success:this.delRowSuccess.bind(this),
                    error:this.delRowError.bind(this)
                };
                alert.confirm({
                    message:"确定要删除吗？",
                    okFn:function(){
                        $.ajax(delOption);
                    }
                })
            },
            delRowSuccess:function(res){
                if(res.success){
                    this.refresh();
                }
                else{
                    this.delRowError(res);
                }
            },
            delRowError:function(res){
                if(res){
                    alert.alert(res.message || res.errMsg || res);
                }
            },
            //按钮方法
            executeCommand:function(command){
                var func = "command"+command.substr(0,1).toUpperCase()+command.substr(1);
                if(this[func]){
                    this[func]();
                }
            },
            commandAdd:function(){
                addVm.show();
                addVm.reset();
            }
        }
    });

    var pop = {
        methods:{
            show:function(){
                this.$refs.pop.show();
            },
            hide:function(){
                this.$refs.pop.hide();
            }
        }
    };
    var fields = [
        {label:"所有人",name:"pName",type:"display",colSpan:1},
        {label:"联系方式",name:"pPhone",type:"display",colSpan:1},
        {label:"所有人证件号码",name:"pId",type:"text",colSpan:1},
        {label:"证件类型",name:"pCardType",type:"selected",options:cardTypeOptions,colSpan:1},
        {label:"住所地址",name:"pAddress",type:"display",colSpan:2},
        {label:"车牌号",name:"carNumber",type:"text",colSpan:1},
        {label:"车辆类型",name:"carType",type:"selected",domainName:"carType",colSpan:1},
        {label:"机动车使用性质",name:"nature",type:"selected",domainName:"carNature",colSpan:1},
        {label:"机动车品牌",name:"brand",type:"selected",domainName:"carBrand",colSpan:1},
        {label:"车架号",name:"frameNumber",type:"text",colSpan:1},
        {label:"发动机号",name:"engineNumber",type:"text",colSpan:1},
        {label:"登记日期",name:"signDate",type:"date",colSpan:1},
        {label:"登记机构",name:"signOrg",type:"text",colSpan:1},
        {label:"检验有效期",name:"validityTerm",type:"text",colSpan:1},
        {label:"初次登记日期",name:"firstSignDate",type:"date",colSpan:1},
        {label:"是否上户",name:"isHouseholds",type:"checkbox",colSpan:1},
        {label:"车况",name:"condition",type:"text",colSpan:1},
        {label:"车辆用途",name:"purpose",type:"text",colSpan:1},
        {label:"车辆颜色",name:"carColour",domainName:"carColour",type:"selected",colSpan:1},
        {label:"备注",name:"remark",type:"text",colSpan:1},
        {label:"车牌图片",name:"carImage",type:"display",colSpan:2},
    ];
    var validator = {
        "pId":{required:true},
        "carNumber":{maxlength:10,minlength:5,required:true},
        "nature":{maxlength:100},
        "frameNumber":{maxlength:30},
        "engineNumber":{maxlength:30},
        "signOrg":{maxlength:100},
        "validityTerm":{maxlength:10},
        "condition":{maxlength:100},
        "purpose":{maxlength:100},
        "remark":{maxlength:200},
    };
    var editVm = new Vue({
        el:"#edit",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(fields,{
                pCardNum:null,
                pCardType:"1",
                isSameGrid:1,
                signDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }),
            formHelper.getValidatorMixin(validator,"form","data")
        ],
        data:{
            id:null
        },
        watch:{
            "data.isSameGrid":function(newVal){
                if(newVal == 0){
                    this.$refs.form.setValidation({
                        "pId":{
                            type:"warning",
                            message:"车主不属于本网格管辖，添加后本人无法查看及管理本车信息，请确认车主是否选择错误"
                        }
                    });
                }
                else{
                    this.$refs.form.setValidation({
                        "pId":null
                    });
                }
            }
        },
        methods:{
            reset:function(){
                this.resetFormData();
                this.$refs.form.resetValidation();
            },
            loadData:function(car){
                this.$set(this,"id",car.id);
                $.ajax({
                    type:"get",
                    data:{
                        id:car.id
                    },
                    url:systemConfig.backendurl+"/realPerson/car/car",
                    success:this.getDataSuccess.bind(this),
                    error:this.getDataError.bind(this)
                })
            },
            getDataSuccess:function(res){
                if(res.success){
                    res.data.pCardType = "1";
                    this.$set(this,"data",res.data);
                }
                else{
                    this.getDataError(res);
                }
            },
            getDataError:function(res){
                if(res){
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    var cl = {
                        id:this.id,
                        pId:this.data.pId,
                        carType:this.data.carType,//"车辆类型",
                        carNumber:this.data.carNumber,//"车牌号码",
                        isHouseholds:this.data.isHouseholds,//"是否上户",
                        condition:this.data.condition,//"车况",
                        brand:this.data.brand,//"品牌",
                        purpose:this.data.purpose,//"车辆用途",
                        carColour:this.data.carColour,//"车辆颜色",
                        nature:this.data.nature,//"机动车使用性质",
                        frameNumber:this.data.frameNumber,//"车架号",
                        engineNumber:this.data.engineNumber,//"发动机号",
                        signDate:this.data.signDate,//"登记日期",
                        signOrg:this.data.signOrg,//"登记机构",
                        validityTerm:this.data.validityTerm,//"检验有效期",
                        firstSignDate:this.data.firstSignDate,//"初次登记日期",
                        remark:this.data.remark,//"备注",
                    }
                    cl.files = {
                        car:this.data.carImage
                    };
                    $.ajax({
                        url:systemConfig.backendurl+"/realPerson/car/updateCar",
                        data:{
                            "data":JSON.stringify(cl)
                        },
                        type:"post",
                        success:this.saveSuccess.bind(this),
                        error:this.saveError.bind(this),
                    });
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
                        this.$refs.form.resetValidation();
                        tableVm.doSearch();
                        this.hide();
                    }
                }
                else{
                    this.saveError(res);
                }
            },
            saveError:function(res){
                if(res){
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
            close:function(){
                this.hide();
            }
        }
    });
    var addVm = new Vue({
        el:"#add",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(fields,{
                pCardNum:null,
                pCardType:"1",
                isSameGrid:1,
                signDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }),
            formHelper.getValidatorMixin(validator,"form","data")
        ],
        data:{
        },
        watch:{
            "data.isSameGrid":function(newVal){
                if(newVal == 0){
                    this.$refs.form.setValidation({
                        "pId":{
                            type:"warning",
                            message:"车主不属于本网格管辖，添加后本人无法查看及管理本车信息，请确认车主是否选择错误"
                        }
                    });
                }
                else{
                    this.$refs.form.setValidation({
                        "pId":null
                    });
                }
            }
        },
        methods:{
            reset:function(){
                this.resetFormData();
                this.$refs.form.resetValidation();
                this.$refs.carImage  && this.$refs.carImage.reset();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    var cl = {
                        pId:this.data.pId,
                        carType:this.data.carType,//"车辆类型",
                        carNumber:this.data.carNumber,//"车牌号码",
                        isHouseholds:this.data.isHouseholds,//"是否上户",
                        condition:this.data.condition,//"车况",
                        brand:this.data.brand,//"品牌",
                        purpose:this.data.purpose,//"车辆用途",
                        carColour:this.data.carColour,//"车辆颜色",
                        nature:this.data.nature,//"机动车使用性质",
                        frameNumber:this.data.frameNumber,//"车架号",
                        engineNumber:this.data.engineNumber,//"发动机号",
                        signDate:this.data.signDate,//"登记日期",
                        signOrg:this.data.signOrg,//"登记机构",
                        validityTerm:this.data.validityTerm,//"检验有效期",
                        firstSignDate:this.data.firstSignDate,//"初次登记日期",
                        remark:this.data.remark,//"备注",
                    }
                    cl.files = {
                        car:this.data.carImage
                    };
                    $.ajax({
                        "url":systemConfig.backendurl+"/realPerson/car/addCar",
                        data:{
                            "data":JSON.stringify(cl)
                        },
                        type:"post",
                        success:this.saveSuccess.bind(this),
                        error:this.saveError.bind(this),
                    });
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
                        this.$refs.form.resetValidation();
                        this.hide();
                        tableVm.refresh();
                    }
                }
                else{
                    this.saveError(res);
                }
            },
            saveError:function(res){
                if(res){
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
            close:function(){
                this.hide();
            }
        }
    })
});