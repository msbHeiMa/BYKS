define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueDomainPool',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
    'vueArea',
    'vueBsPop',
    'vueBsTreeview',
], function(require, Vue , systemConfig, $, domainPool,form, table, alert) {
    'use strict';
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
            btns:[
            ],
            //设置列表的关键字查询
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:false
            },
            //设置列表的列
            tableColumns:[
                
                // "id": "222222",
                // "hNum": "3312122",
                // "residenceType": "农村户口",
                // "name": "张三",
                // "phone": "12803839222",
                // "alines": "平安家庭",
                // "hasPerson": "否"
                //普通列
                {
                    title: '户号',
                    field: 'hNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '户口类别',
                    field: 'residenceType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("residenceType","residenceType")
                },
                {
                    title: '户主名称',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '户主联系方式',
                    field: 'phone',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '家庭称号',
                    field: 'alines',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '是否有户无人',
                    field: 'hasPerson',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: "<span>{{row.hasPerson?'是':'否'}}</span>"
                },
                {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    valign: 'middle',
                    width: '80px',
                    visible: true,
                    component: {
                        template:'<span><a href="javascript:;" @click="edit">信息维护</a></span>',
                        methods:{
                            edit:function(){
                                tableVm.editRow(this.row);
                            }
                        }
                    }
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
                    "url":systemConfig.backendurl+"/realPerson/person/familys"
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
            },
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
                {label:"户主姓名",name:"name",type:"display",colSpan:1},
                {label:"户主身份证号码",name:"cardNum",type:"display",colSpan:1},
                {label:"是否有户无人",name:"hasPerson",type:"checkbox",colSpan:1},
                {label:"是否五保户",name:"isFive",type:"checkbox",colSpan:1},
                {label:"是否低保户",name:"isLow",type:"checkbox",colSpan:1},
                {label:"是否贫困户",name:"isPool",type:"checkbox",colSpan:1},
                {label:"户口类型",name:"residenceType",type:"display",domainName:"residenceType",colSpan:1},
                {label:"人户一致标识",name:"rhyzbs",type:"radio",options:[{text:"一致",value:1},{text:"不一致",value:0}],colSpan:1},
                {label:"家庭称号",name:"alines",type:"text",colSpan:1},
            ],{}),
            formHelper.getValidatorMixin({
                "alines":{maxlength:50},
            },"form","data")
        ],
        data:{
            hjcyRows:null,
            hzqsRows:null,
            hjcyColumns:[
                {
                    title: '姓名',
                    width: '70px',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
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
                    title: '与户主关系',
                    field: 'relation',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("relation","familyRelation")
                },
            ],
            hzqsColumns:[
                {
                    title: '姓名',
                    field: 'personName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    editComponent:"<input type='text' class='form-control' v-model='row.personName'/>"
                },
                {
                    title: '身份证号码',
                    width: '165px',
                    field: 'idNumber',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    editComponent:"<input type='text' class='form-control' v-model='row.idNumber'/>"
                },
                {
                    title: '与户主关系',
                    field: 'relation',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: tableHelper.getDomainDisplayComponent("relation","familyRelation"),
                    editComponent:{
                        template:"<select class='form-control' v-model='row.relation'>\
                            <option v-for='item in items' :value='item.value'>{{item.text}}</option>\
                            </select>",
                        data:function(){
                            var domains = domainPool.getDomainOptions(["familyRelation"]);
                            return {
                                "items":domains["familyRelation"]
                            }
                        }
                    }
                }
            ]
        },
        methods:{
            loadData:function(id){
                this.$set(this,"hjcyRows",null);
                this.$set(this,"hzqsRows",null);

                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/person/getFamilyDetail",
                    data:{id:id},
                    type:"get",
                    success:this.getFamilySuccess.bind(this),
                    error:this.getFamilyError.bind(this)
                });
            },
            getFamilySuccess:function(res){
                if(res.success){
                    if(res.data)
                    {
                        this.$set(this,"data",res.data);
                        this.$set(this,"hjcyRows",res.data.familyMember);
                        res.data.familyRelation.forEach(function(item){
                            if(item.qsPId){
                                item.personName = item.name;
                                item.idNumber = item.cardNum;
                            }
                        });
                        this.$set(this,"hzqsRows",res.data.familyRelation);
                    }
                }
                else{
                    this.getFamilyError(res);
                }
            },
            getFamilyError:function(res){
                this.showError(res && (res.message || res.errMsg || res));
            },
            addHzqs:function(){
                this.$refs.hzqsTable.addRow({
                    personName:"",
                    idNumber:"",
                    relation:null
                });
            },
            save:function(){
                this.raiseValidate();
                this.$nextTick(this.beforSave.bind(this));
            },
            validRows:function(rows){
                var valid = true;
                rows.some(function(row,index) {
                    if(!row.personName){
                        this.showError("姓名为必填项");
                        valid = false;
                        return true;
                    }
                    if(!row.relation){
                        this.showError("与户主关系为必填项");
                        valid = false;
                        return true;
                    }
                    if(row.personName.length >= 50){
                        this.showError("姓名最大长度为50字符");
                        valid = false;
                        return true;
                    }
                    if(row.idNumber && (row.idNumber.length < 15 || row.idNumber.length > 18)){
                        this.showError("身份证号码应为15-18之内的字符");
                        valid = false;
                        return true;
                    }
                }, this);
                return valid;
            },
            beforSave:function(){
                var rows = this.$refs.hzqsTable.getRows();
                var rowsValid = this.validRows(rows);
                if(!this.$refs.form.hasError() && rowsValid){
                    $.ajax({
                        url:systemConfig.backendurl+"/realPerson/person/updateFamily",
                        data:{
                            data:JSON.stringify({
                                "id":this.data.id,
                                "pId":this.data.pId,
                                "hasPerson":this.data.hasPerson,
                                "isFive":this.data.isFive,
                                "isLow":this.data.isLow,
                                "isPool":this.data.isPool,
                                "alines":this.data.alines,
                                "rhyzbs":this.data.rhyzbs,
                                "familyRelation":rows.map(function(row){
                                    return {
                                        id:row.id,
                                        relation:row.relation,
                                        personName:row.personName,
                                        idNumber:row.idNumber,
                                    }
                                })
                            })
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
                if(res && res.errMsg){
                    this.showError(res.errMsg);
                }
            }
        }
    })
});