define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
    'vueBsTab',
    'vueAttachment'
], function(require, Vue, $, systemConfig,form,table) {
    'use strict';
    var query = systemConfig.getQueryParams();
    var id = query.id;
    var tableHelper = table.helper;
    var sfOptions = [{text:"是",value:1},{text:"否",value:0}];
    var cardTypeOptions = [{text:"居民身份证",value:"1"}];
    var detailVm = new Vue({
        el:"#detail",
        data:{
            main:{},
            czxx:{},
            jzxxList:{
                tableColumns:[
                    {title: '居住人',field: 'pName',align: 'center',valign: 'middle',visible: true},
                    {title: '身份证号码',field: 'pCardNum',align: 'center',valign: 'middle',visible: true},
                    {title: '与房主关系',field: 'ownerRelation',align: 'center',valign: 'middle',visible: true,
                        component:tableHelper.getDomainDisplayComponent("ownerRelation","ownerRelation")},
                    {title: '居住房间',field: 'livingRoom',align: 'center',valign: 'middle',visible: true},
                    {title: '联系方式',field: 'pPhone',align: 'center',valign: 'middle',visible: true},
                ],
                rows:[],
                loading:true,
            },
            rcxcList:{
                tableColumns:[
                    {title: '事件编号',field: 'houseLayout',align: 'center',valign: 'middle',visible: true},
                    {title: '发现时间',field: 'floor',align: 'center',valign: 'middle',visible: true},
                    {title: '当前状态',field: 'houseNumber',align: 'center',valign: 'middle',visible: true},
                    {title: '巡查详情',field: 'houseUse',align: 'center',valign: 'middle',visible: true,},
                ],
                ajaxOptions:{
                    // url:systemConfig.backendurl+"/realPerson/house/cars",
                    // data:{
                    //     id:id
                    // },
                    // type:"get"
                }
            },
            fields:{
                main:[
                    {label:"所属网格",name:"gridName",type:"display",colSpan:1},
                    {label:"楼栋地址",name:"addressDetail",type:"display",colSpan:1},
                    {label:"所属单元",name:"unit",type:"display",colSpan:1},
                    {label:"所属楼层",name:"floor",type:"display",colSpan:1},
                    {label:"房号",name:"houseNumber",type:"display",colSpan:1},
                    {label:"产权类型",name:"propertyType",type:"display",domainName:"propertyType",colSpan:1},
                    {label:"产权人证件类型",name:"cqrzjType",type:"display",options:cardTypeOptions,colSpan:1},
                    {label:"产权人姓名",name:"cqName",type:"display",colSpan:1},
                    {label:"产权人身份证号码",name:"cqCardNum",type:"display",colSpan:1},
                    {label:"产权人联系方式",name:"cqPhone",type:"display",colSpan:1},
                    {label:"房屋户型",name:"houseLayout",type:"display",colSpan:1},
                    {label:"房屋面积",name:"houseArea",type:"display",colSpan:1},
                    {label:"房屋类型",name:"houseType",type:"display",domainName:"houseType",colSpan:1},
                    {label:"房屋来源",name:"houseSource",type:"display",domainName:"houseSource",colSpan:1},
                    {label:"房屋用途",name:"houseUse",type:"display",domainName:"houseUse",colSpan:1},
                    {label:"房屋凭证类型",name:"fwpzType",type:"display",domainName:"ldpzType",colSpan:1},
                    {label:"房屋凭证号",name:"fwpzNumber",type:"display",colSpan:1},
                    {label:"房屋凭证发证时间",name:"fwpzStartDate",type:"display",colSpan:1},
                    {label:"房屋凭证到期时间",name:"fwpzEndDate",type:"display",colSpan:1},
                    {label:"土地凭证类型",name:"tdpzType",type:"display",domainName:"tdpzType",colSpan:1},
                    {label:"土地凭证号",name:"tdpzNumber",type:"display",colSpan:1},
                    {label:"土地凭证发证时间",name:"tdpzStartDate",type:"display",colSpan:1},
                    {label:"土地凭证到期时间",name:"tdpzEndDate",type:"display",colSpan:1},
                    
                    {label:"房屋图片",name:"houseImage",type:"display",colSpan:2},
                ],
                czxx:[
                    {label:"租赁备案证号",name:"name",type:"display",colSpan:1},
                    {label:"出租时间",name:"name",type:"display",colSpan:1},
                    {label:"出租用途",name:"name",type:"display",colSpan:1},
                    {label:"限制人数",name:"name",type:"display",colSpan:1},
                    {label:"出租类型",name:"name",type:"display",colSpan:1},
                    {label:"实际居住人数",name:"name",type:"display",colSpan:1},
                    {label:"承租人类型",name:"name",type:"display",colSpan:1},
                    {label:"出租间数",name:"name",type:"display",colSpan:1},
                    {label:"承租人姓名",name:"name",type:"display",colSpan:1},
                    {label:"月租金",name:"name",type:"display",colSpan:1},
                    {label:"承租人身份证号码",name:"name",type:"display",colSpan:1},
                    {label:"是否签订治安责任保证书",name:"name",type:"display",colSpan:1},
                    {label:"承租人联系方式",name:"name",type:"display",colSpan:1},
                    {label:"有无治安负责人",name:"name",type:"display",colSpan:1},
                    {label:"管理类别",name:"name",type:"display",colSpan:1},
                    {label:"登记时间",name:"name",type:"display",colSpan:1},
                ]
            },
            id:id
        },
        mounted:function(){
            this.loadData();
        },
        methods:{
            tabSelect:function(tab){
                var type = tab.name;
                switch(type){
                    case "jzxx":
                        if(this.jzxxList.loading === false){
                            var jzxxAjaxOptions = {
                                url:systemConfig.backendurl+"/realPerson/house/housePersons",
                                data:{
                                    id:this.id
                                },
                                type:"get",
                                success:(function(res){
                                    this.jzxxList.loading = true;
                                    if(res.success){
                                        this.$set(this.jzxxList,"rows",res.data);
                                    }
                                    else{
                                        this.$set(this.jzxxList,"rows",[]);
                                    }
                                }).bind(this),
                                error:(function(){
                                    this.jzxxList.loading = true;
                                    this.$set(this.jzxxList,"rows",[]);
                                }).bind(this)
                            };
                            $.ajax(jzxxAjaxOptions);
                        }
                        break;
                }
            },
            loadData:function(){
                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/house/house",
                    data:{
                        id:this.id
                    },
                    type:"get",
                    success:this.getHouseDetailSuccess.bind(this),
                    error:this.getHouseDetailError.bind(this)
                });
            },
            getHouseDetailSuccess:function(res){
                if(res.success){
                    this.$set(this,"main",res.data);
                }
                else{
                    this.getHouseDetailError();
                }
            },
            getHouseDetailError:function(){
            }
        }
    });
});