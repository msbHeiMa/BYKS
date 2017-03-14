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
    'vueObjectSelector',
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
                        url:systemConfig.backendurl+"/system/queryUserDataDep"
                    },
                },
                {
                    name:"houseType",
                    text:"房屋类型",
                    type:"domain",
                    all:true,
                    domainName:"houseType"
                },
                {
                    name:"houseUse",
                    text:"房屋用途",
                    type:"domain",
                    all:true,
                    domainName:"houseUse"
                }
            ],
            //设置快速查询项的默认值
            filter:{
                dep:null,
                houseUse:"",
                houseType:""
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
                        name:"新增房屋",
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
                {
                    title: '产权人姓名',
                    field: 'cqName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<a target='_blank' :href='row.cqId?\"../syrk/rkDetail.html?id=\"+row.cqId:\"javascript:;\"'>{{row.cqName}}</a>"
                },
                {
                    title: '房屋地址',
                    field: 'address',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<a target='_blank' :href='\"fwDetail.html?id=\"+row.id'>{{row.address}}</a>"
                },
                {
                    title: '房屋用途',
                    field: 'houseUse',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("houseUse","houseUse")
                },
                {
                    title: '房屋户型',
                    field: 'houseLayout',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '房屋类型',
                    field: 'houseType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("houseType","houseType")
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
                    visible: role == "all",
                    component: {
                        template:'<span v-if="row.dataSource == \'1\'">\
                                <a href="javascript:;" @click="editPart()">信息维护</a>|<a href="javascript:;" class="disabled" disabled @click="alert()">删除</a>\
                            </span>\
                            <span v-else>\
                                <a href="javascript:;" @click="edit()">信息维护</a>|<a href="javascript:;" @click="del()">删除</a>\
                            </span>',
                        methods:{
                            alert:function(){
                                alert.alert("导入的数据不允许删除");
                            },
                            edit:function(){
                                tableVm.editRow(this.row);
                            },
                            editPart:function(){
                                tableVm.editPartRow(this.row);
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
                //isPublic、houseUse、houseStructure、dwdm、keyword(name、signAddress)、bId、offset、limit
                this.tableAjaxOptions = {
                    type:"get",
                    data:{
                        keyword:this.keyword,//关键字参数
                        dwdm:this.filter.dep,
                        houseType:this.filter.houseType,
                        houseUse:this.filter.houseUse,

                        //TODO
                        // address:"",
                        // mpNumber:"",
                        // houseNumber:"",

                        bId:null
                    },
                    "url":systemConfig.backendurl+"/realPerson/house/houses"
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
                editVm.loadData(row.id);
            },
            editPartRow:function(row){
                editPartVm.show();
                editPartVm.reset();
                editPartVm.loadData(row.id);
            },
            delRow:function(row){
                alert.confirm({
                    message:"确定要删除吗？",
                    okFn:this.delHouse.bind(this,row.id)
                })
            },
            delHouse:function(id){
                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/house/delHouse?id="+id,
                    data:{
                    },
                    type:"post",
                    success:this.delHouseSuccess.bind(this),
                    error:this.delHouseError.bind(this),
                })
            },
            delHouseSuccess:function(res){
                if(res.success){
                    this.refresh();
                }
                else{
                    this.delHouseError(res);
                }
            },
            delHouseError:function(res){
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
                    gridOptions.push({text:item.name,value:item.id});
                })
            }
        }
    });
    var fwFields = [
        //{label:"所属网格",name:"gId",type:"selected",options:gridOptions,colSpan:1},
        {label:"楼栋地址",name:"bId",type:"text",colSpan:1},
        // {label:"是否有门牌号",name:"isHouseNumber",type:"text",colSpan:1},
        // {label:"门牌号",name:"bId",type:"text",colSpan:1},
        // {label:"门牌备注",name:"mpRemark",type:"text",colSpan:1},
        {label:"所属单元",name:"unit",type:"text",colSpan:1},
        {label:"所属楼层",name:"floor",type:"number",colSpan:1},
        {label:"房号",name:"houseNumber",type:"text",colSpan:1},
        {label:"产权类型",name:"propertyType",type:"selected",domainName:"propertyType",colSpan:1},
        {label:"产权人证件类型",name:"cqrzjType",type:"selected",domainName:"cqrzjType",colSpan:1},
        {label:"产权人姓名",name:"cqName",type:"display",colSpan:1},
        {label:"产权人身份证号码",name:"cqId",type:"text",colSpan:1},
        {label:"产权人联系方式",name:"cqPhone",type:"display",colSpan:1},
        {label:"房屋户型",name:"houseLayout",type:"text",colSpan:1},
        {label:"房屋面积",name:"houseArea",type:"number",colSpan:1},
        {label:"房屋类型",name:"houseType",type:"selected",domainName:"houseType",colSpan:1},
        {label:"房屋来源",name:"houseSource",type:"selected",domainName:"houseSource",colSpan:1},
        {label:"房屋用途",name:"houseUse",type:"selected",domainName:"houseUse",colSpan:1},
        {label:"房屋凭证类型",name:"fwpzType",type:"selected",domainName:"ldpzType",colSpan:1},
        {label:"房屋凭证号",name:"fwpzNumber",type:"text",colSpan:1},
        {label:"房屋凭证发证时间",name:"fwpzStartDate",type:"date",colSpan:1},
        {label:"房屋凭证到期时间",name:"fwpzEndDate",type:"date",colSpan:1},
        {label:"土地凭证类型",name:"tdpzType",type:"selected",domainName:"tdpzType",colSpan:1},
        {label:"土地凭证号",name:"tdpzNumber",type:"text",colSpan:1},
        {label:"土地凭证发证时间",name:"tdpzStartDate",type:"date",colSpan:1},
        {label:"土地凭证到期时间",name:"tdpzEndDate",type:"date",colSpan:1},
        
        {label:"房屋图片",name:"houseImage",type:"display",colSpan:2},
    ];
    var fwValidator = {
        cqId:{required:true},
        bId:{required:true},
        unit:{maxlength:10},
        floor:{max:999,min:-1},
        houseNumber:{maxlength:20},
        houseLayout:{maxlength:100},
        houseArea:{max:99999,min:0},
        fwpzNumber:{maxlength:50},
        tdpzNumber:{maxlength:50},
    };
    var houseFormMixins = {
        methods:{
            reset:function(){
                this.resetFormData();
                this.$refs.form.resetValidation();
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            validRows:function(rows){
                var valid = true;
                rows.some(function(row,index) {
                    if(!row.pId){
                        this.showError("居住人为必填项");
                        valid = false;
                        return true;
                    }
                    if(row.livingRoom && row.livingRoom.length >= 50){
                        this.showError("居住房间最大长度为50字符");
                        valid = false;
                        return true;
                    }
                }, this);
                return valid;
            },
            beforSave:function(){
                var rows = this.$refs.personTable.getRows();
                var rowsValid = this.validRows(rows);
                if(!this.$refs.form.hasError() && rowsValid){
                    var fw = this.id ?(this.data.dataSource == 1 
                        ?{
                            id:this.id,
                            bId:this.data.bId,
                            houseLayout:this.data.houseLayout,
                            houseSource:this.data.houseSource,
                        }
                        :{
                            id:this.id,
                            bId:this.data.bId,
                            unit:this.data.unit,
                            floor:this.data.floor,
                            houseNumber:this.data.houseNumber,
                            propertyType:this.data.propertyType,
                            cqrzjType:this.data.cqrzjType,
                            cqId:this.data.cqId,
                            houseLayout:this.data.houseLayout,
                            houseArea:this.data.houseArea,
                            houseType:this.data.houseType,
                            houseSource:this.data.houseSource,
                            houseUse:this.data.houseUse,
                            fwpzType:this.data.fwpzType,
                            fwpzNumber:this.data.fwpzNumber,
                            fwpzStartDate:this.data.fwpzStartDate,
                            fwpzEndDate:this.data.fwpzEndDate,
                            tdpzType:this.data.tdpzType,
                            tdpzNumber:this.data.tdpzNumber,
                            tdpzStartDate:this.data.tdpzStartDate,
                            tdpzEndDate:this.data.tdpzEndDate,
                        }
                    )
                    : {
                        bId:this.data.bId,
                        unit:this.data.unit,
                        floor:this.data.floor,
                        houseNumber:this.data.houseNumber,
                        propertyType:this.data.propertyType,
                        cqrzjType:this.data.cqrzjType,
                        cqId:this.data.cqId,
                        houseLayout:this.data.houseLayout,
                        houseArea:this.data.houseArea,
                        houseType:this.data.houseType,
                        houseSource:this.data.houseSource,
                        houseUse:this.data.houseUse,
                        fwpzType:this.data.fwpzType,
                        fwpzNumber:this.data.fwpzNumber,
                        fwpzStartDate:this.data.fwpzStartDate,
                        fwpzEndDate:this.data.fwpzEndDate,
                        tdpzType:this.data.tdpzType,
                        tdpzNumber:this.data.tdpzNumber,
                        tdpzStartDate:this.data.tdpzStartDate,
                        tdpzEndDate:this.data.tdpzEndDate,
                    };
                    fw.files = {
                        house:this.data.houseImage
                    };
                    fw.housePerson = rows.map(function(row){
                        return {
                            id:row.id,
                            pId:row.pId,
                            ownerRelation:row.ownerRelation,
                            livingRoom:row.livingRoom,
                        }
                    });
                    var url = this.id 
                        ? systemConfig.backendurl+"/realPerson/house/updateHouse"
                        : systemConfig.backendurl+"/realPerson/house/addHouse"
                    $.ajax({
                        url:url,
                        data:{
                            "data":JSON.stringify(fw)
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
                if(res && res.errMsg){
                    this.showError(res.errMsg);
                }
            },
            close:function(){
                this.hide();
            },
            addPerson:function(){
                this.$refs.personTable.addRow({
                    pName:"",
                    pCardNum:"",
                    pPhone:"",
                    pId:null,
                    ownerRelation:null,
                    livingRoom:null
                });
            }
        },
        data:{
            personsColumns:[
                {title: '居住人',field: 'pName',align: 'center',valign: 'middle',visible: true},
                {title: '身份证号码',field: 'pId',align: 'center',valign: 'middle',visible: true,
                    component:"<span>{{row.pCardNum}}</span>",
                    editComponent:'<cig-person-selector lot="fieldslot.pId"\
                            v-model="row.czCardNum"\
                            :data-mapper="{id:\'pId\',cardNum:\'pCardNum\',name:\'pName\',phone:\'pPhone\'}"\
                            :data="row">\
                        </cig-person-selector>'},
                {title: '与房主关系',field: 'ownerRelation',align: 'center',valign: 'middle',visible: true,
                    component:tableHelper.getDomainDisplayComponent("ownerRelation","ownerRelation"),
                    editComponent:{
                        template:"<select class='form-control' v-model='row.ownerRelation'>\
                            <option v-for='item in items' :value='item.value'>{{item.text}}</option>\
                            </select>",
                        data:function(){
                            var domains = domainPool.getDomainOptions(["ownerRelation"]);
                            return {
                                "items":domains["ownerRelation"]
                            }
                        }
                    }},
                {title: '居住房间',field: 'livingRoom',align: 'center',valign: 'middle',visible: true,
                    editComponent:"<input class='form-control' v-model='row.livingRoom' type='text'>"},
                {title: '联系方式',field: 'pPhone',align: 'center',valign: 'middle',visible: true},
            ],
            placeAjax:null,
            detailAjax:null,
        },
        mounted:function(){
            var self = this;
            this.$set(this,"placeAjax",function(val){
                return {
                    url:systemConfig.backendurl+"/realPerson/house/chooseBuilding",
                    data:{
                        place:val
                    },
                    type:"get"
                } 
            });
            this.$set(this,"detailAjax",function(val){
                return {
                    url:systemConfig.backendurl+"/realPerson/house/chooseBuilding",
                    data:{
                        place:self.data && self.data.place,
                        addressDetail:val||""
                    },
                    type:"get"
                } 
            });
        }
    };

    var singleRightFields = ['propertyType','bId','cqId','cqName','cqCardNum','cqPhone','cqrzjType','houseType','houseUse','fwpzType','fwpzNumber','fwpzStartDate','fwpzEndDate','tdpzType','tdpzNumber','tdpzStartDate','tdpzEndDate'];
    var houseSingleRightMixins = {
        watch:{
            "data.bInfo":function(newVal){
                if(newVal){
                    singleRightFields.forEach(function(field) {
                        this.$set(this.data,field,newVal[field]);
                    }, this);
                    // this.$set(this.data,"bId",newVal.id);
                }
            }
        },
        computed:{
            formFields:function(){
                if(this.data.bInfo && this.data.bInfo.isSingleRight == 1){
                    return this.fields.filter(function(field){
                        return ['floor'].indexOf(field.name) < 0;
                    }).map(function(field){
                        if(singleRightFields.indexOf(field.name) < 0){
                            return field;
                        }
                        else{
                            var displayField = $.extend({},field);
                            displayField.type = "display";
                            return displayField;
                        }
                    });
                }
                return fwFields;
            }
        }
    };
    var addVm = new Vue({
        el:"#add",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(fwFields,{
                cqrzjType:"1",
                place:"",
                addressDetail:"",
                cqCardNum:"",
                bInfo:null
            }),
            formHelper.getValidatorMixin(fwValidator,"form","data"),
            houseFormMixins,
            houseSingleRightMixins
        ],
        data:{
            persons:[]
        },
        methods:{
            reset:function(){
                this.resetFormData();
                this.$refs.form.resetValidation();
                this.$refs.houseImage  && this.$refs.houseImage.reset();
            },
        }
    });
    var loadHouseDataMixins = {
        data:{
            id:null,
            persons:null,
        },
        methods:{
            loadData:function(id){
                this.id = id;
                this.getHouseDetail();
                this.getHousePerson();
            },
            getHousePerson:function(){
                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/house/housePerson",
                    data:{
                        "id":this.id
                    },
                    type:"get",
                    success:this.getHousePersonSuccess.bind(this),
                    error:this.getHousePersonError.bind(this),
                });
            },
            getHousePersonSuccess:function(res){
                if(res.success){
                    this.$set(this,'persons',res.data);
                }
                else{
                    this.getHousePersonError(res);
                }
            },
            getHousePersonError:function(){
            },
            getHouseDetail:function(){
                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/house/house",
                    data:{
                        "id":this.id
                    },
                    type:"get",
                    success:this.getHouseDetailSuccess.bind(this),
                    error:this.getHouseDetailError.bind(this),
                });
            },
            getHouseDetailSuccess:function(res){
                if(res.success){
                    if(res.data){
                        var bInfo = {
                            isSingleRight:res.data.isSingleRight
                        };
                        singleRightFields.forEach(function(field){
                            bInfo[field] = res.data[field];
                        });
                        res.data.bInfo = bInfo;
                    }
                    this.$set(this,'data',res.data);
                }
                else{
                    this.getHouseDetailError();
                }
            },
            getHouseDetailError:function(){
            }
        }
    };
    var editVm = new Vue({
        "el":"#edit",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(fwFields,{
                cqrzjType:"1",
                place:"",
                addressDetail:"",
                cqCardNum:"",
                bInfo:null
            }),
            formHelper.getValidatorMixin(fwValidator,"form","data"),
            houseFormMixins,
            loadHouseDataMixins,
            houseSingleRightMixins
        ]
    });
    var fwPartFields = fwFields.map(function(field){
        if(['bId','houseLayout','houseSource'].indexOf(field.name) < 0){
            var displayField = $.extend({},field);
            displayField.type = "display";
            return displayField;
        }
        return field;
    },this);
    var fwPartValidator = {
        bId:{required:true},
        houseLayout:{maxlength:100},
    };
    var editPartVm = new Vue({
        "el":"#editPart",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin(fwPartFields,{
                cqrzjType:"1",
                place:"",
                addressDetail:"",
                cqCardNum:""
            }),
            formHelper.getValidatorMixin(fwValidator,"form","data"),
            houseFormMixins,
            loadHouseDataMixins,
            houseSingleRightMixins
        ]
    });
});