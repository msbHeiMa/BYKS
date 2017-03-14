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
    'vueBsTreeview',
], function(require, Vue, systemConfig,$,form,table,alert) {
    'use strict';
    var role = systemConfig.getRole();
    var formHelper = form.helper;
    var tableHelper = table.helper;
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
                        @input="input" \
                        v-model="valueProxy" \
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
            btns:[
            ],
            //设置列表的关键字查询
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:true
            },
            //设置列表的列
            tableColumns:[
                //普通列
                {
                    title: '户主名称',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '户主身份证号码',
                    field: 'cardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '户主身份证号码',
                    field: 'phone',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '家庭成员数量',
                    field: 'relationCount',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                //控件列，包括操作的方法
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template:'<span><a href="javascript:;" @click="edit">信息维护</a></span>',
                        methods:{
                            edit:function(){
                                tableVm.editRow(this.row);
                            }
                        }
                    },
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
                    type:"post",
                    data:{
                        //dwdm=2222&keyword=&offset=0&limit=5
                        keyword:this.keyword,//关键字参数
                        dwdm:this.filter.dep//通用查询项的参数
                    },
                    "url":systemConfig.backendurl+"/realPerson/person/familyRelations"
                }
            },
            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
            //每一行的方法
            editRow:function(row){
                editVm.loadData(row.id);
                editVm.show();
            },
            //按钮方法
            executeCommand:function(command){
                var func = "command"+command.substr(0,1).toUpperCase()+command.substr(1);
                if(this[func]){
                    this[func]();
                }
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
    
    var editVm = new Vue({
        el:"#edit",
        mixins:[
            pop,
            alert.getMixin(),
            formHelper.getFieldsMixin([
                {label:"姓名",name:"pName",type:"text",colSpan:2},
                {label:"身份证号码",name:"pCardNum",type:"text",colSpan:2},
                {label:"与户主关系",name:"relation",type:"selected",domainName:"familyRelation",colSpan:2},
            ],{}),
            formHelper.getValidatorMixin({
                "pName":{maxlength:50},
                "pCardNum":{maxlength:18,minlength:15}
            },"form","data")
        ],
        data:{
            tableConfig:{checkbox:false},
            tableColumns:[
                {
                    title: '姓名',
                    width: '70px',
                    field: 'pName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '身份证号码',
                    width: '165px',
                    field: 'pCardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '与户主关系',
                    field: 'relation',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("relation","familyRelation")
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template:'<span><a href="javascript:;" @click="edit">编辑</a>|<a href="javascript:;" @click="remove">删除</a></span>',
                        methods:{
                            edit:function(){
                                editVm.edit(this.row);
                            },
                            remove:function(){
                                editVm.remove(this.row);
                            }
                        }
                    },
                },
            ],
            relation:[],
            load:false,
            id:null
        },
        mounted:function(){
            this.addItem();
        },
        methods:{
            loadData:function(id){
                this.id = id;
                this.getRelation();
            },
            addItem:function(){
                this.resetFormData();
                this.$nextTick(function(){
                    this.$refs.form.resetValidation();
                });
            },
            close:function(){
                this.$refs.form.resetValidation();
                tableVm.doSearch();
                this.hide();
            },
            edit:function(row){
                this.$set(this,"data",row);
            },
            remove:function(row){
                var options = {
                    type:"post",
                    data:{
                        id:row.id,
                    },
                    "url":systemConfig.backendurl+"/realPerson/person/delFamilyRelation",
                    "success":this.getRemoveRelationSuccess.bind(this),
                    "error":this.getRemoveRelationError.bind(this),
                };
                $.ajax(options);
            },
            getRemoveRelationSuccess:function(){
                this.getRelation();
            },
            getRemoveRelationError:function(){
                this.getRelation();
            },
            getRelation:function(){
                this.load = false;
                var options = {
                    type:"get",
                    data:{
                        id:this.id,
                    },
                    "url":systemConfig.backendurl+"/realPerson/person/familyRelation",
                    "success":this.getRelationSuccess.bind(this),
                    "error":this.getRelationError.bind(this),
                };
                $.ajax(options);
            },
            getRelationSuccess:function(res){
                this.load = true;
                if(res.success){
                    this.$set(this,"relation",res.data);
                }
                else{
                    this.getRelationError();
                }
            },
            getRelationError:function(){
                this.$set(this,"relation",[]);
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            beforSave:function(){
                if(!this.$refs.form.hasError()){
                    if(!this.data.id){
                        $.ajax({
                            "url":systemConfig.backendurl+"/realPerson/person/addFamilyRelation",
                            data:{
                                hzId:this.id,
                                pId:this.data.pId,
                                pName:this.data.pName,
                                pCardNum:this.data.pCardNum,
                                relation:this.data.relation,
                            },
                            type:"post",
                            success:this.saveSuccess.bind(this),
                            error:this.saveError.bind(this),
                        });
                    }
                    else{
                        $.ajax({
                            "url":systemConfig.backendurl+"/realPerson/person/updateFamilyRelation",
                            data:{
                                id:this.data.id,
                                hzId:this.id,
                                pId:this.data.pId,
                                pName:this.data.pName,
                                pCardNum:this.data.pCardNum,
                                relation:this.data.relation,
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
                        this.getRelation();
                        this.addItem();
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
                this.addItem();
            }
        }
    })
});