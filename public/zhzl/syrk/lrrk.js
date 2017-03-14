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
], function(require, Vue, domainPool, systemConfig, $ , form, table, alert) {
    'use strict';
    var formHelper = form.helper;
    var tableHelper = table.helper;
    var role = systemConfig.getRole();
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
                    //设定辖区取值接口，通过设定不同接口，显示不同的数据
                    ajaxOptions:{
                        type:"get",
                        "url":systemConfig.backendurl+"/system/queryUserDataDep"
                    },
                }
            ],
            //设置快速查询项的默认值
            filter:{
                dep:null
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions:{
            },
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns:
                role == "all" 
                ? [
                    {
                        id:"add",
                        name:"县外人员流入",
                        enableClass:"btn-danger",
                        visible:true
                    },
                    {
                        id:"addNew",
                        name:"添加县外流入人员",
                        enableClass:"btn-danger",
                        visible:true
                    }
                ] 
                : [],
            //设置列表的关键字查询
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:false
            },
            //设置列表的列
            tableColumns:[
                //普通列
                {
                    title: '姓名',
                    width: '70px',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'rkDetail.html?module=县外流入人口&id=\'+row.id">{{row.name}}</a>',
                },
                {
                    title: '身份证号码',
                    width: '165px',
                    field: 'cardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '性别',
                    field: 'gender',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("gender","gender")
                },
                {
                    title: '手机号码',
                    field: 'phone',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '户籍地',
                    field: 'domicile',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '现住地',
                    field: 'residence',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '所属网格',
                    field: 'gridName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
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
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    width:'140px',
                    visible: role == "all",
                    component: {
                        template:'<span><a href="javascript:;" @click="edit">信息维护</a>|<a href="javascript:;" @click="remove">人员流出</a></span>',
                        methods:{
                            edit:function(){
                                tableVm.editRow(this.row);
                            },
                            remove:function(){
                                if(this.row.isOutCountry == "1"){
                                    alert.showError("已经是县外人员，不能流出到其他网格");
                                }
                                else {
                                    tableVm.removeRow(this.row);
                                }
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
                    },
                    "url":systemConfig.backendurl+"/realPerson/person/flowPersons"
                }
            },
            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
            //每一行的方法
            editRow:function(row){
                var id = row.id;
                $.ajax({
                    type:"get",
                    data:{
                        id:id,
                    },
                    "url":systemConfig.backendurl+"/realPerson/person/editFlowPerson",
                    "success":this.getPersonSuccess.bind(this),
                    "error":this.getPersonError.bind(this)
                });
            },
            getPersonSuccess:function(res){
                if(res.success){
                    if(res.data.editType == "all"){
                        editAllVm.show();
                        editAllVm.resetFormData();
                        editAllVm.loadData(res.data);
                    }
                    else{
                        editVm.show();
                        editVm.resetFormData();
                        editVm.loadData(res.data);
                    }
                }
                else{
                    this.getPersonError(res);
                }
            },
            getPersonError:function(){
            },
            removeRow:function(row){
                removeVm.show();
                removeVm.resetFormData();
                removeVm.loadData(row);
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
            },
            commandAddNew:function(){
                addNewVm.show();
                addNewVm.resetFormData();
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
    var addVm = new Vue({
        el:"#add",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                {label:"姓名",name:"name",type:"display",colSpan:1},
                {label:"身份证号码",name:"cardNum",type:"display",colSpan:1},
                {label:"流入时间",name:"flowDate",type:"date",colSpan:2},
                {label:"事由",name:"flowReason",type:"textarea",colSpan:2},
                {label:"流出地网格",name:"outGId",type:"display",colSpan:2},
                {label:"流出地详细地址",name:"outflowAddress",type:"display",colSpan:2},
                {label:"流入地详细地址",name:"inflowAddress",type:"textarea",colSpan:2},
            ],{
                "type":1,
                "flowDate":new Date().Format("yyyy-MM-dd")
            }),
            formHelper.getValidatorMixin({
                "flowReason":{maxlength:200},
                "inflowAddress":{maxlength:100},
            },"form","data")
        ],
        data:{
            keyword:"",
            searched:false
        },
        methods:{
            reset:function(){
                this.keyword = "";
                this.resetFormData();
            },
            doSearch:function(){
                if(!this.keyword){
                    this.showError("请输入身份证号码");
                    return;
                }
                if(!this.keyword.match(/(^[0-9]{14}[0-9xX]$)|(^[0-9]{17}[0-9xX]$)/)){
                    this.showError("请输入完整的15位或18位身份证号码");
                    return;
                }
                this.getPersons();
            },
            getPersons:function(){
                this.searched = true;
                var tableAjaxOptions = {
                    type:"get",
                    data:{
                        cardNum:this.keyword
                    },
                    url:systemConfig.backendurl+"/realPerson/person/queryFlowPersons",
                    success:this.getPersonsSuccess.bind(this),
                    error:this.getPersonsError.bind(this)
                };
                $.ajax(tableAjaxOptions);
            },
            getPersonsSuccess:function(res){
                if(res.success){
                    if(res.data && res.data[0]){
                        var row = res.data[0];
                        this.id = row.id;
                        this.data.name = row.name;
                        this.data.cardNum = row.cardNum;
                        this.data.outGridName = row.gridName;
                        this.data.outflowAddress = row.rAddr;
                    }
                    else{
                        this.showError("没有找到对应的人员");
                    }
                }
                else{
                    this.getPersonError(res);
                }
            },
            getPersonsError:function(res){
                if(res){
                    this.showError(res && (res.message || res.errMsg || res));
                }
            },
            close:function(){
                this.$refs.form.resetValidation();
                this.hide();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    $.ajax({
                        "url":systemConfig.backendurl+"/realPerson/person/inPerson",
                        data:{
                            "id":this.id,
                            "flowDate":this.data.flowDate,
                            "flowReason":this.data.flowReason,
                            "outGId":this.data.outGId,
                            "outflowAddress":this.data.outflowAddress,
                            "inflowAddress":this.data.inflowAddress
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
                        tableVm.doSearch();
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
            }
        }
    });
    var editFields = [
        {label:"姓名",name:"name",type:"display",colSpan:1},
        {label:"身份证号码",name:"cardNum",type:"display",colSpan:1},
        {label:"曾用名",name:"usedName",type:"display",colSpan:1},
        {label:"性别",name:"gender",type:"display",domainName:"gender",colSpan:1},
        {label:"出生年月",name:"birthDate",type:"display",colSpan:1},

        {label:"民族",name:"nation",type:"display",domainName:"nation",colSpan:1},
        {label:"籍贯",name:"nativePlace",type:"display",colSpan:1},
        {label:"婚姻状况",name:"maritalStatus",type:"display",domainName:"maritalStatus",colSpan:1},

        {label:"政治面貌",name:"politicalStatus",type:"selected",domainName:"politicalStatus",colSpan:1},
        {label:"学历",name:"education",type:"selected",domainName:"education",colSpan:1},
        {label:"身高",name:"height",type:"number",colSpan:1},
        {label:"血型",name:"bloodType",type:"selected",domainName:"bloodType",colSpan:1},
        {label:"宗教信仰",name:"relBelief",type:"selected",domainName:"relBelief",colSpan:1},
        
        {label:"职业类别",name:"occCategory",type:"selected",domainName:"occCategory",colSpan:1},
        {label:"职业",name:"occupation",type:"text",colSpan:1},
        {label:"专业特长",name:"specialty",type:"selected",domainName:"specialty",colSpan:1},
        {label:"服务处所",name:"sPlace",type:"display",colSpan:1},
        
        {label:"户籍地",name:"domicile",type:"display",colSpan:1},
        {label:"户籍门（楼）详址",name:"dAddr",type:"display",colSpan:1},

        {label:"现住地",name:"residence",type:"text",colSpan:1},
        {label:"现住门（楼）详址",name:"rAddr",type:"text",colSpan:1},
        
        {label:"是否死亡",name:"death",type:"display",options:[{text:"是",value:1},{text:"否",value:0}],colSpan:1},

        {label:"所属网格",name:"gridName",type:"display",colSpan:1},
        {label:"手机号码",name:"phone",type:"text",colSpan:1},
        {label:"固定电话",name:"tel",type:"text",colSpan:1},
        {label:"电子邮箱",name:"email",type:"text",colSpan:1},
    ];
    var validators = {
        "height":{min:10,max:299},
        "occupation":{maxlength:"30"},
        "rAddr":{maxlength:80},
        "phone":{maxlength:20},
        "tel":{maxlength:20},
        "email":{maxlength:30}    
    };
    var editFields1 = [
        {label:"姓名",name:"name",type:"text",colSpan:1},
        {label:"身份证号码",name:"cardNum",type:"text",colSpan:1},
        {label:"曾用名",name:"usedName",type:"text",colSpan:1},
        {label:"性别",name:"gender",type:"selected",domainName:"gender",colSpan:1},
        {label:"出生年月",name:"birthDate",type:"date",colSpan:1},

        {label:"民族",name:"nation",type:"selected",domainName:"nation",colSpan:1},
        {label:"籍贯",name:"nativePlace",type:"text",colSpan:1},
        {label:"婚姻状况",name:"maritalStatus",type:"selected",domainName:"maritalStatus",colSpan:1},

        {label:"政治面貌",name:"politicalStatus",type:"selected",domainName:"politicalStatus",colSpan:1},
        {label:"学历",name:"education",type:"selected",domainName:"education",colSpan:1},
        {label:"身高",name:"height",type:"number",colSpan:1},
        {label:"血型",name:"bloodType",type:"selected",domainName:"bloodType",colSpan:1},
        {label:"宗教信仰",name:"relBelief",type:"selected",domainName:"relBelief",colSpan:1},
        
        {label:"职业类别",name:"occCategory",type:"selected",domainName:"occCategory",colSpan:1},
        {label:"职业",name:"occupation",type:"text",colSpan:1},
        {label:"专业特长",name:"specialty",type:"selected",domainName:"specialty",colSpan:1},
        {label:"服务处所",name:"sPlace",type:"text",colSpan:1},
        
        {label:"户籍地",name:"domicile",type:"text",colSpan:1},
        {label:"户籍门（楼）详址",name:"dAddr",type:"text",colSpan:1},

        {label:"现住地",name:"residence",type:"text",colSpan:1},
        {label:"现住门（楼）详址",name:"rAddr",type:"text",colSpan:1},
        
        {label:"是否死亡",name:"death",type:"radio",options:[{text:"是",value:1},{text:"否",value:0}],colSpan:1},

        {label:"所属网格",name:"gridName",type:"display",colSpan:1},
        {label:"手机号码",name:"phone",type:"text",colSpan:1},
        {label:"固定电话",name:"tel",type:"text",colSpan:1},
        {label:"电子邮箱",name:"email",type:"text",colSpan:1},

        {label:"流入时间",name:"flowDate",type:"date",colSpan:1},
        {label:"流入事由",name:"flowReason",type:"textarea",colSpan:2},
    ];
    var validators1 = $.extend({
        "name":{maxlength:50,required:true},
        "cardNum":{maxlength:18,minlength:15,required:true,pattern:"/(^[0-9]{14}[0-9xX]$)|(^[0-9]{17}[0-9xX]$)/",messages:{pattern:"请输入正确的身份证号码"}},
        "usedName":{maxlength:50},
        "occupation":{maxlength:50},
        "sPlace":{maxlength:100},
        "dAddr":{maxlength:100},
    },validators);
    
    var addNewVm = new Vue({
        el:"#addNew",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(editFields1,{
                "flowDate":new Date().Format("yyyy-MM-dd")
            }),
            formHelper.getValidatorMixin(validators1,"form","data")
        ],
        data:{
            hjd:[],
        },
        methods:{
            show:function(){
                if(this.hjd.length == 0){
                    var self = this;
                    requirejs(["./hjd"],function(hjd){
                        self.$set(self,"hjd",hjd.getSource());
                    });
                }
                this.$refs.pop.show();
            },
            close:function(){
                this.$refs.form.resetValidation();
                this.hide();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    $.ajax({
                        "url":systemConfig.backendurl+"/realPerson/person/addFlowPerson",
                        data:{
                            "id":this.data.id,
                            "name":this.data.name,
                            "cardNum":this.data.cardNum,
                            "usedName":this.data.usedName,
                            "gender":this.data.gender,
                            "birthDate":this.data.birthDate,
                            "nation":this.data.nation,
                            "nativePlace":this.data.nativePlace,
                            "maritalStatus":this.data.maritalStatus,
                            "politicalStatus":this.data.politicalStatus,
                            "education":this.data.education,
                            "height":this.data.height,
                            "bloodType":this.data.bloodType,
                            "relBelief":this.data.relBelief,
                            "occCategory":this.data.occCategory,
                            "occupation":this.data.occupation,
                            "specialty":this.data.specialty,
                            "sPlace":this.data.sPlace,
                            "domicile":this.data.domicile,
                            "dAddr":this.data.dAddr,
                            "residence":this.data.residence,
                            "rAddr":this.data.rAddr,
                            "phone":this.data.phone,
                            "tel":this.data.tel,
                            "email":this.data.email,
                            "flowDate":this.data.flowDate,
                            "flowReason":this.data.flowReason,
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
                        tableVm.doSearch();
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
            }
        }
    });
    var editVmMixins = {
        methods:{
            loadData:function(data){
                if(this.hjd.length == 0){
                    var self = this;
                    requirejs(["./hjd"],function(hjd){
                        self.$set(self,"hjd",hjd.getSource());
                    });
                }
                this.$refs.form.resetValidation();
                this.$set(this,"data",data);
            },
            close:function(){
                this.$refs.form.resetValidation();
                this.hide();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    if(this.data.editType != "all"){
                        $.ajax({
                            "url":systemConfig.backendurl+"/realPerson/person/updateImportFlowPerson",
                            data:{
                                "id":this.data.id,
                                "politicalStatus":this.data.politicalStatus,
                                "education":this.data.education,
                                "height":this.data.height,
                                "bloodType":this.data.bloodType,
                                "relBelief":this.data.relBelief,
                                "occCategory":this.data.occCategory,
                                "occupation":this.data.occupation,
                                "specialty":this.data.specialty,
                                "sPlace":this.data.sPlace,
                                "residence":this.data.residence,
                                "rAddr":this.data.rAddr,
                                "phone":this.data.phone,
                                "tel":this.data.tel,
                                "email":this.data.email
                            },
                            type:"post",
                            success:this.saveSuccess.bind(this),
                            error:this.saveError.bind(this),
                        });
                    }
                    else{
                        $.ajax({
                            "url":systemConfig.backendurl+"/realPerson/person/updateInputFlowPerson",
                            data:{
                                "id":this.data.id,
                                "name":this.data.name,
                                "cardNum":this.data.cardNum,
                                "usedName":this.data.usedName,
                                "gender":this.data.gender,
                                "birthDate":this.data.birthDate,
                                "nation":this.data.nation,
                                "nativePlace":this.data.nativePlace,
                                "maritalStatus":this.data.maritalStatus,
                                "politicalStatus":this.data.politicalStatus,
                                "education":this.data.education,
                                "height":this.data.height,
                                "bloodType":this.data.bloodType,
                                "relBelief":this.data.relBelief,
                                "occCategory":this.data.occCategory,
                                "occupation":this.data.occupation,
                                "specialty":this.data.specialty,
                                "sPlace":this.data.sPlace,
                                "domicile":this.data.domicile,
                                "dAddr":this.data.dAddr,
                                "residence":this.data.residence,
                                "rAddr":this.data.rAddr,
                                "phone":this.data.phone,
                                "tel":this.data.tel,
                                "email":this.data.email,
                                "flowDate":this.data.flowDate,
                                "flowReason":this.data.flowReason,
                            },
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
                        this.$refs.form.resetValidation();
                        this.hide();
                        tableVm.doSearch();
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
            }
        }
    };
    var editVm = new Vue({
        el:$($("#edit").prop('outerHTML')).attr("id","").appendTo("body")[0],
        data:{
            hjd:[]
        },
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(editFields,{}),
            formHelper.getValidatorMixin(validators,"form","data"),
            editVmMixins
        ]
    });
    var editAllVm = new Vue({
        el:$($("#edit").prop('outerHTML')).attr("id","").appendTo("body")[0],
        data:{
            hjd:[]
        },
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(editFields1,{}),
            formHelper.getValidatorMixin(validators1,"form","data"),
            editVmMixins
        ]
    });
    var removeVm = new Vue({
        el:"#remove",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(
                [
                {label:"姓名",name:"name",type:"display",colSpan:1},
                {label:"身份证号码",name:"cardNum",type:"display",colSpan:1},
                {label:"流入地类型",name:"type",type:"radio",options:[{text:"县外",value:1},{text:"县内",value:2},{text:"无监管",value:3}],colSpan:2},
                {label:"流出时间",name:"flowDate",type:"date",colSpan:2},
                {label:"事由",name:"flowReason",type:"textarea",colSpan:2},
                {label:"流入地网格",name:"inGId",colSpan:2},
                {label:"流入地详细地址",name:"inflowAddress",type:"textarea",colSpan:2},
                {label:"外出去向",name:"outProvince",type:"text",colSpan:2},
                {label:"外出详址",name:"outDetailAddress",type:"text",colSpan:2},
            ],{
                "type":1,
                "flowDate":new Date().Format("yyyy-MM-dd")
            }),
            formHelper.getValidatorMixin({
                "flowReason":{maxlength:200},
                "inflowAddress":{maxlength:100},
                "outDetailAddress":{maxlength:100},
            },"form","data")
        ],
        watch:{
        },
        mounted:function(){
        },
            data:{
            id:null,
            areaAjaxOptions:{
                type:"get",
                "url":systemConfig.backendurl+"/system/queryAllDep"
            },
        },
        computed:{
            filterFields:function(){
                var filtered = ({
                    "1":["inGId","inflowAddress"],
                    "2":["outProvince","outDetailAddress"],
                    "3":["inGId","inflowAddress","outProvince","outDetailAddress","flowReason","flowDate"]
                })[this.data.type];
                if(filtered){
                    return this.fields.filter(function(field){
                        return filtered.indexOf(field.name) < 0;
                    });
                }
                else{
                    return this.fields;
                }
            }
        },
        methods:{
            loadData:function(row){
                this.id = row.id;
                this.data.name = row.name;
                this.data.cardNum = row.cardNum;
            },
            close:function(){
                this.$refs.form.resetValidation();
                this.hide();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    $.ajax({
                        "url":systemConfig.backendurl+"/realPerson/person/outPerson",
                        data:{
                            "id":this.id,
                            "type":this.data.type,
                            "flowDate":this.data.flowDate,
                            "flowReason":this.data.flowReason,
                            "inGId":this.data.inGId,
                            "inflowAddress":this.data.inflowAddress,
                            "outProvince":this.data.outProvince,
                            "outDetailAddress":this.data.outDetailAddress
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
                        tableVm.doSearch();
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
            }
        }
    });
});