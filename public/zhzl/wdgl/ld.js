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
    var sfOptions = [{text:"是",value:"1"},{text:"否",value:"0"}];
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
                    name:"buildingType",
                    text:"楼栋类型",
                    type:"domain",
                    all:true,
                    domainName:"houseType"
                },
                {
                    name:"isSingleRight",
                    text:"是否单一产权",
                    type:"options",
                    all:true,
                    options:sfOptions
                },
                {
                    name:"houseStructure",
                    text:"楼栋结构",
                    type:"domain",
                    all:true,
                    domainName:"houseStructure"
                }
            ],
            //设置快速查询项的默认值
            filter:{
                dep:null,
                buildingType:"",
                isSingleRight:"",
                houseStructure:"",
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions:{
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns:[
                {
                    id:"add",
                    name:"添加楼栋信息",
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
                    title: '所属网格',
                    field: 'gridName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '楼栋地址',
                    field: 'address',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<a target='_blank' :href='\"ldDetail.html?id=\"+row.id'>{{row.address}}</a>"
                },
                {
                    title: '楼栋用途',
                    field: 'houseUse',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("houseUse","houseUse")
                },
                {
                    title: '楼栋结构',
                    field: 'houseStructure',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("houseStructure","houseStructure")
                },
                {
                    title: '最新更新日期',
                    field: 'updateDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '数据创建日期',
                    field: 'createDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '楼栋长',
                    field: 'carType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<a v-if='row.ldzId' target='_blank' :href='\"../syrk/rkDetail.html?id=\"+row.ldzId'>{{row.ldzName}}</a><span v-else>{{row.ldzName}}</span>"
                },
                {
                    title: '数据来源',
                    field: 'dataSource',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("dataSource","dataSource")
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: role == "all",
                    component: {
                        template:"<span v-if='row.dataSource == \"1\"'>\
                                <a href='javascript:;' @click='editPart'>信息维护</a>\|<a href='javascript:;' @click='alert' class='disabled' disabled>删除</a>\
                            </span>\
                            <span v-else>\
                                <a href='javascript:;' @click='edit'>信息维护</a>\|<a href='javascript:;' @click='del'>删除</a>\
                            </span>",
                        methods:{
                            alert:function(){
                                alert.alert("导入的数据不允许删除");
                            },
                            editPart:function(){
                                tableVm.editPartRow(this.row);
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
                        buildingType:this.filter.buildingType,
                        isSingleRight:this.filter.isSingleRight,
                        houseStructure:this.filter.houseStructure
                    },
                    url:systemConfig.backendurl+"/realPerson/house/buildings"
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
            editPartRow:function(row){
                editPartVm.show();
                editPartVm.reset();
                editPartVm.loadData(row);
            },
            delRow:function(row){
                var delOption = {
                    type:"post",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/house/delBuilding"+"?id="+row.id,
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
    var gridOptions = [];
    $.ajax({
        url:systemConfig.backendurl+"/system/queryVillageGrid",
        type:"get",
        success:function(res){
            if(res.success){
                res.data.forEach(function(item){
                    gridOptions.push({text:item.name,value:item.id,isSameGrid:item.isSameGrid});
                })
            }
        }
    });
    var fields = [
        {label:"所属网格",name:"gId",type:"selected",options:gridOptions,colSpan:1},
        {label:"产权类型",name:"propertyType",type:"selected",domainName:"propertyType",colSpan:1},
        {label:"产权人姓名",name:"cqName",type:"display",colSpan:1},
        {label:"产权人联系方式",name:"cqPhone",type:"display",colSpan:1},
        {label:"产权人证件类型",name:"cqrzjType",type:"selected",options:cardTypeOptions,colSpan:1},
        {label:"产权人证件号码",name:"cqId",type:"text",colSpan:1},//(产权人证件号码确定人员后，带入展示姓名，身份证号码，联系电话)
        {label:"楼栋长姓名",name:"ldzName",type:"display",colSpan:1},
        {label:"楼栋长联系方式",name:"ldzPhone",type:"display",colSpan:1},
        {label:"楼栋长身份证号码",name:"ldzId",type:"text",colSpan:1},//(楼栋长证件号码确定人员后，带入展示姓名，身份证号码，联系电话)
        {label:"人员属性",name:"ldzProperty",type:"selected",domainName:"ldzProperty",colSpan:1},
        {label:"楼栋地址",name:"addressDetail",type:"text",colSpan:1},
        // {label:"是否有门牌号",name:"isHouseNumber",type:"checkbox",colSpan:1},
        {label:"楼栋备注",name:"addressRemark",type:"text",colSpan:1},
        // {label:"门牌备注",name:"mpRemark",type:"text",colSpan:1},
        {label:"楼栋用途",name:"houseUse",type:"selected",domainName:"houseUse",colSpan:1},
        {label:"楼栋结构",name:"houseStructure",type:"selected",domainName:"houseStructure",colSpan:1},
        {label:"建筑面积",name:"area",type:"number",colSpan:1},
        {label:"楼栋朝向",name:"towards",type:"text",colSpan:1},
        {label:"建成年份",name:"buildYear",type:"date",colSpan:1},
        {label:"楼栋类型",name:"buildingType",type:"selected",domainName:"houseType",colSpan:1},
        {label:"建筑性质",name:"buildingNature",type:"selected",domainName:"buildingNature",colSpan:1},
        {label:"地上层数",name:"upFloor",type:"number",colSpan:1},
        {label:"地下层数",name:"downFloor",type:"number",colSpan:1},
        {label:"本楼户主数量",name:"familyCount",type:"number",colSpan:1},
        {label:"是否单一产权",name:"isSingleRight",type:"checkbox",colSpan:1},
        {label:"电梯情况",name:"elevator",type:"text",colSpan:1},
        {label:"有无消防通道",name:"isFireChannel",type:"checkbox",colSpan:1},
        {label:"有无安全通道",name:"isSafetyChannel",type:"checkbox",colSpan:1},
        {label:"是否危房",name:"isUnsafe",type:"checkbox",colSpan:1},
        {label:"物管单位名称",name:"wgName",type:"text",colSpan:1},
        {label:"物管证件类型",name:"wgCardType",type:"selected",domainName:"wgCardType",colSpan:1},
        {label:"物管证件号码",name:"wgCardNumber",type:"text",colSpan:1},
        {label:"物管负责人",name:"wgPerson",type:"text",colSpan:1},
        {label:"物管联系电话",name:"wgContact",type:"text",colSpan:1},
        {label:"楼栋凭证类型",name:"ldpzType",type:"selected",domainName:"ldpzType",colSpan:1},
        {label:"楼栋凭证号",name:"ldpzNumber",type:"text",colSpan:1},
        {label:"楼栋凭证发证日期",name:"ldpzStartDate",type:"date",colSpan:1},
        {label:"楼栋凭证到期时间",name:"ldpzEndDate",type:"date",colSpan:1},
        {label:"土地凭证类型",name:"tdpzType",type:"selected",domainName:"tdpzType",colSpan:1},
        {label:"土地凭证号",name:"tdpzNumber",type:"text",colSpan:1},
        {label:"土地凭证发证日期",name:"tdpzStartDate",type:"date",colSpan:1},
        {label:"土地凭证到期时间",name:"tdpzEndDate",type:"date",colSpan:1},

        {label:"楼栋图片",name:"buildingImage",type:"display",colSpan:2},
    ];
    var partFields = fields.map(function(field){
        if([
            "propertyType",
            "cqrzjType",
            "cqId",
            "addressDetail",
            "addressRemark",
            // "isHouseNumber",
            // "houseNumber",
            // "mpRemark",
            "houseUse",
            "houseStructure",
            "area",
            "buildYear",
            "buildingType",
            "buildingNature",
            "isSingleRight",
            "ldpzType",
            "ldpzNumber",
            "ldpzStartDate",
            "ldpzEndDate",
            "tdpzType",
            "tdpzNumber",
            "tdpzStartDate",
            "tdpzEndDate"].indexOf(field.name) >= 0){
            var displayField = $.extend({},field);
            displayField.type = "display";
            return displayField; 
        }
        return field;
    });
    var validator = {
        gId:{required:true},     
        cqId:{required:true},   
        addressDetail:{required:true},
        addressRemark:{required:true,maxlength:50},
        area:{max:9999999},
        towards:{maxlength:50},
        upFloor:{max:999},
        downFloor:{max:99},
        familyCount:{max:9999},
        elevator:{maxlength:50},
        wgName:{maxlength:100},
        wgCardNumber:{maxlength:50},
        wgPerson:{maxlength:50},
        wgContact:{maxlength:50},
        ldpzNumber:{maxlength:50},
        tdpzNumber:{maxlength:50},
    };
    var partValidator = {
        gId:{required:true},     
        towards:{maxlength:50},
        upFloor:{max:999},
        downFloor:{max:99},
        familyCount:{max:9999},
        elevator:{maxlength:50},
        wgName:{maxlength:100},
        wgCardNumber:{maxlength:50},
        wgPerson:{maxlength:50},
        wgContact:{maxlength:50},
    };
    var editVmMixins = {
        methods:{
            reset:function(){
                this.resetFormData();
                this.$refs.form.resetValidation();
            },
            loadData:function(row){
                this.$set(this,"id",row.id);
                $.ajax({
                    type:"get",
                    data:{
                        id:row.id
                    },
                    url:systemConfig.backendurl+"/realPerson/house/editBuilding",
                    success:this.getDataSuccess.bind(this),
                    error:this.getDataError.bind(this)
                })
            },
            getDataSuccess:function(res){
                if(res.success){
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
                    var ld = {
                        id:this.id,
                        gId:this.data.gId,
                        ldzId:this.data.ldzId,
                        ldzProperty:this.data.ldzProperty,
                        towards:this.data.towards,
                        upFloor:this.data.upFloor,
                        downFloor:this.data.downFloor,
                        familyCount:this.data.familyCount,
                        elevator:this.data.elevator,
                        isFireChannel:this.data.isFireChannel,
                        isSafetyChannel:this.data.isSafetyChannel,
                        isUnsafe:this.data.isUnsafe,
                        wgName:this.data.wgName,
                        wgCardType:this.data.wgCardType,
                        wgCardNumber:this.data.wgCardNumber,
                        wgPerson:this.data.wgPerson,
                        wgContact:this.data.wgContact,
                        // dataResource:this.data.dataResource,
                    };
                    if(this.data.dataSource == "2"){
                        ld = $.extend(ld,{
                            propertyType:this.data.propertyType,
                            cqrzjType:this.data.cqrzjType,
                            cqId:this.data.cqId,
                            place:this.data.place,
                            addressDetail:this.data.addressDetail,
                            addressRemark:this.data.addressRemark,
                            // isHouseNumber:this.data.isHouseNumber,
                            // houseNumber:this.data.houseNumber,
                            mpRemark:this.data.mpRemark,
                            houseUse:this.data.houseUse,
                            houseStructure:this.data.houseStructure,
                            area:this.data.area,
                            buildYear:this.data.buildYear,
                            buildingType:this.data.buildingType,
                            buildingNature:this.data.buildingNature,
                            isSingleRight:this.data.isSingleRight,
                            ldpzType:this.data.ldpzType,
                            ldpzNumber:this.data.ldpzNumber,
                            ldpzStartDate:this.data.ldpzStartDate,
                            ldpzEndDate:this.data.ldpzEndDate,
                            tdpzType:this.data.tdpzType,
                            tdpzNumber:this.data.tdpzNumber,
                            tdpzStartDate:this.data.tdpzStartDate,
                            tdpzEndDate:this.data.tdpzEndDate,
                        });
                    }
                    ld.files = {
                        building:this.data.buildingImage
                    };
                    $.ajax({
                        "url":systemConfig.backendurl+"/realPerson/house/updateBuilding",
                        data:{
                            "data":JSON.stringify(ld)
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
        },
        computed:{
            formFields:function(){
                if(this.data && this.data.isHasHouse === true){
                    return this.fields.map(function(field){
                        if(field.name == "isSingleRight"){
                            var displayField = $.extend({},field);
                            displayField.type = "display";
                            return displayField;
                        }   
                        return field;
                    })
                }
                return this.fields;
            }
        }
    };
    var ldGroupRender = form.renders.groupRender.bind(form.renders,
        [
            {
                title:"楼栋基本信息",
                fields:[
                    "gId",
                    // "address",
                    "addressDetail",//:this.data.place,
                    "addressRemark",//:this.data.addressRemark,
                    // "isHouseNumber",
                    // "houseNumber",
                    // "mpRemark",
                    "houseUse",
                    "houseStructure",
                    "area",
                    "towards",
                    "buildYear",
                    "buildingType",
                    "buildingNature",
                    "upFloor",
                    "downFloor",
                    "familyCount",
                    "isSingleRight",
                    "elevator",
                    "isFireChannel",
                    "isSafetyChannel",
                    "isUnsafe",
                    "buildingImage"
                ]
            },
            {
                title:"权属信息",
                fields:[
                    "ldpzType",
                    "ldpzNumber",
                    "ldpzStartDate",
                    "ldpzEndDate",
                    "tdpzType",
                    "tdpzNumber",
                    "tdpzStartDate",
                    "tdpzEndDate",
                ]
            },
            {
                title:"产权信息",
                fields:[
                    "propertyType",
                    "cqName",
                    "cqPhone",
                    "cqrzjType",
                    "cqId",
                ]
            },
            {
                title:"物管信息",
                fields:[
                    "wgName",
                    "wgCardType",
                    "wgCardNumber",
                    "wgPerson",
                    "wgContact",
                ]
            },
            {
                title:"楼栋长信息",
                fields:[
                    "ldzName",
                    "ldzPhone",
                    "ldzId",
                    "ldzProperty",
                ]
            }
        ],
        form.renders.table2Render
    );
    var editVm = new Vue({
        el:"#edit",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(fields,{
                cqCardNum:null,
                cqrzjType:"1",
                place:"",
                gId:"",
                ldzCardNum:null
            }),
            formHelper.getValidatorMixin(validator,"form","data"),
            editVmMixins
        ],
        data:{
            groupRender:ldGroupRender,
            id:null
        },
        watch:{
            "data.gId":function(newVal){
                console.log(gridOptions.length);
                for(var i=0;i<gridOptions.length;i++){
                    if(newVal==gridOptions[i]["value"]){
                        if(gridOptions[i]["isSameGrid"]=="0"){
                            this.$refs.form.setValidation({
                                "gId":{
                                    type:"warning",
                                    message:"所选网格不是本网格，添加后本人无法查看及管理当前楼栋信息，请确认是否选择该网格"
                                }
                            });
                        }else{
                            this.$refs.form.setValidation({
                                "gId":null
                            });
                        }
                    }
                }
            }
        },
    });
    var editPartVm = new Vue({
        el:"#editPart",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(partFields,{
                cqCardNum:null,
                cqrzjType:"1",
                place:"",
                ldzCardNum:null
            }),
            formHelper.getValidatorMixin(partValidator,"form","data"),
            editVmMixins
        ],
        data:{
            groupRender:ldGroupRender,
            id:null
        },
    });
    var addVm = new Vue({
        el:"#add",
        mixins:[
            pop,
            formHelper.getFieldsMixin(fields,{
                cqCardNum:null,
                cqrzjType:"1",
                place:"",
                gId:"",
                // addressDetail:"bbb",
                ldzCardNum:null
            }),
            formHelper.getValidatorMixin(validator,"form","data")
        ],
        data:{
            groupRender:ldGroupRender,
        },
        watch:{
            "data.gId":function(newVal){
                console.log(gridOptions.length);
                for(var i=0;i<gridOptions.length;i++){
                    if(newVal==gridOptions[i]["value"]){
                        if(gridOptions[i]["isSameGrid"]=="0"){
                            this.$refs.form.setValidation({
                                "gId":{
                                    type:"warning",
                                    message:"所选网格不是本网格，添加后本人无法查看及管理当前楼栋信息，请确认是否选择该网格"
                                }
                            });
                        }else{
                            this.$refs.form.setValidation({
                                "gId":null
                            });
                        }
                    }
                }
            }
        },
        methods:{
            reset:function(){
                this.resetFormData();
                this.$refs.form.resetValidation();
                this.$refs.buildingImage  && this.$refs.buildingImage.reset();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    var ld = {
                        id:this.id,
                        gId:this.data.gId,
                        ldzId:this.data.ldzId,
                        ldzProperty:this.data.ldzProperty,
                        towards:this.data.towards,
                        upFloor:this.data.upFloor,
                        downFloor:this.data.downFloor,
                        familyCount:this.data.familyCount,
                        elevator:this.data.elevator,
                        isFireChannel:this.data.isFireChannel,
                        isSafetyChannel:this.data.isSafetyChannel,
                        isUnsafe:this.data.isUnsafe,
                        wgName:this.data.wgName,
                        wgCardType:this.data.wgCardType,
                        wgCardNumber:this.data.wgCardNumber,
                        wgPerson:this.data.wgPerson,
                        wgContact:this.data.wgContact,
                        // dataResource:this.data.dataResource,
                        propertyType:this.data.propertyType,
                        cqrzjType:this.data.cqrzjType,
                        cqId:this.data.cqId,
                        place:this.data.place,
                        addressDetail:this.data.addressDetail,
                        addressRemark:this.data.addressRemark,
                        // address:this.data.address,
                        // isHouseNumber:this.data.isHouseNumber,
                        // houseNumber:this.data.houseNumber,
                        // mpRemark:this.data.mpRemark,
                        houseUse:this.data.houseUse,
                        houseStructure:this.data.houseStructure,
                        area:this.data.area,
                        buildYear:this.data.buildYear,
                        buildingType:this.data.buildingType,
                        buildingNature:this.data.buildingNature,
                        isSingleRight:this.data.isSingleRight,
                        ldpzType:this.data.ldpzType,
                        ldpzNumber:this.data.ldpzNumber,
                        ldpzStartDate:this.data.ldpzStartDate,
                        ldpzEndDate:this.data.ldpzEndDate,
                        tdpzType:this.data.tdpzType,
                        tdpzNumber:this.data.tdpzNumber,
                        tdpzStartDate:this.data.tdpzStartDate,
                        tdpzEndDate:this.data.tdpzEndDate,
                    };
                    ld.files = {
                        building:this.data.buildingImage
                    };
                    $.ajax({
                        "url":systemConfig.backendurl+"/realPerson/house/addBuilding",
                        data:{
                            "data":JSON.stringify(ld)
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