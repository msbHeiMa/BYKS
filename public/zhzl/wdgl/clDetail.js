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
    var sfOptions = [{text:"是",value:1},{text:"否",value:0}];
    var cardTypeOptions = [{text:"居民身份证",value:"1"}];
    var detailVm = new Vue({
        el:"#detail",
        data:{
            main:{},
            fields:{
                main:[
                    {label:"所有人",name:"pName",type:"display",colSpan:1},
                    {label:"联系方式",name:"pPhone",type:"display",colSpan:1},
                    {label:"所有人证件号码",name:"pCardNum",type:"display",colSpan:1},
                    {label:"证件类型",name:"pCardType",type:"display",options:cardTypeOptions,colSpan:1},
                    {label:"住所地址",name:"pAddress",type:"display",colSpan:2},
                    {label:"车牌号",name:"carNumber",type:"display",colSpan:1},
                    {label:"车辆类型",name:"carType",type:"display",domainName:"carType",colSpan:1},
                    {label:"机动车使用性质",name:"nature",type:"display",domainName:"carNature",colSpan:1},
                    {label:"机动车品牌",name:"brand",type:"display",domainName:"carBrand",colSpan:1},
                    {label:"车架号",name:"frameNumber",type:"display",colSpan:1},
                    {label:"发动机号",name:"engineNumber",type:"display",colSpan:1},
                    {label:"登记日期",name:"signDate",type:"display",colSpan:1},
                    {label:"登记机构",name:"signOrg",type:"display",colSpan:1},
                    {label:"检验有效期",name:"validityTerm",type:"display",colSpan:1},
                    {label:"初次登记日期",name:"firstSignDate",type:"display",colSpan:1},
                    {label:"是否上户",name:"isHouseholds",type:"display",options:sfOptions,colSpan:1},
                    {label:"车况",name:"condition",type:"display",colSpan:1},
                    {label:"车辆用途",name:"purpose",type:"display",colSpan:1},
                    {label:"车辆颜色",name:"carColour",domainName:"carColour",type:"display",colSpan:1},
                    {label:"备注",name:"remark",type:"display",colSpan:2},
                    {label:"车牌图片",name:"carImage",type:"display",colSpan:2},
                ]
            },
            tableConfig:{
                wzxx:{
                    checkbox:false,
                },
                njjl:{
                    checkbox:false,
                }
            },
            tableColumns:{
                //违章处罚编号 违法时间 违法地点 违法行为 扣分数 罚款金额 处置状态
                wzxx:[
                    {
                        title: '违章处罚编号',
                        field: 'illegalNumber',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '违法时间',
                        field: 'illegalDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '违法地点',
                        field: 'illegalAdd',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '违法行为',
                        field: 'illegalAction',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '扣分数',
                        field: 'score',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '罚款金额',
                        field: 'amount',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '处置状态',
                        field: 'status',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                ],
                njjl:[
                    {
                        title: '年审有效期止',
                        field: 'validityTerm',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '年检时间',
                        field: 'inspectDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                ]
            },
            wzxxAjaxOptions:{},
            njjlAjaxOptions:{},
            id:id
        },
        mounted:function(){
            this.wzxxAjaxOptions = {
                url:systemConfig.backendurl+"/realPerson/car/carIllegal",
                data:{
                    id:this.id
                },
                type:"get"
            };
            this.njjlAjaxOptions = {
                url:systemConfig.backendurl+"/realPerson/car/carInspect",
                data:{
                    id:this.id
                },
                type:"get"
            };
            this.loadData();
        },
        methods:{
            loadData:function(){
                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/car/car",
                    data:{
                        id:this.id
                    },
                    type:"get",
                    success:this.getCarDetailSuccess.bind(this),
                    error:this.getCarDetailError.bind(this)
                });
            },
            getCarDetailSuccess:function(res){
                if(res.success){
                    this.$set(this,"main",res.data);
                }
                else{
                    this.getCarDetailError();
                }
            },
            getCarDetailError:function(){

            }
        }
    });
});