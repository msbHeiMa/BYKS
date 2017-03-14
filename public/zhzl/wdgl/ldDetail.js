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
            data:{},
            fields:{
                main:[
                    {label:"所属网格",name:"gridName",type:"display",colSpan:1},
                    {label:"产权类型",name:"propertyType",type:"display",domainName:"propertyType",colSpan:1},
                    
                    {label:"楼栋地址",name:"addressDetail",type:"display",colSpan:1},
                    {label:"楼栋备注",name:"addressRemark",type:"display",colSpan:1},
                    {label:"楼栋用途",name:"houseUse",type:"display",domainName:"houseUse",colSpan:1},
                    {label:"楼栋结构",name:"houseStructure",type:"display",domainName:"houseStructure",colSpan:1},
                    {label:"建筑面积",name:"area",type:"display",colSpan:1},
                    {label:"楼栋朝向",name:"towards",type:"display",colSpan:1},
                    {label:"建成年份",name:"buildYear",type:"display",colSpan:1},
                    {label:"楼栋类型",name:"buildingType",type:"display",domainName:"houseType",colSpan:1},
                    {label:"建筑性质",name:"buildingNature",type:"display",domainName:"buildingNature",colSpan:1},
                    {label:"地上层数",name:"upFloor",type:"display",colSpan:1},
                    {label:"地下层数",name:"downFloor",type:"display",colSpan:1},
                    {label:"本楼户主数量",name:"familyCount",type:"display",colSpan:1},
                    {label:"是否单一产权",name:"isSingleRight",type:"display",options:sfOptions,colSpan:1},
                    {label:"电梯情况",name:"elevator",type:"display",colSpan:1},
                    {label:"有无消防通道",name:"isFireChannel",type:"display",options:sfOptions,colSpan:1},
                    {label:"有无安全通道",name:"isSafetyChannel",type:"display",options:sfOptions,colSpan:1},
                    {label:"是否危房",name:"isUnsafe",type:"display",options:sfOptions,colSpan:1},

                    {label:"楼栋图片",name:"buildingImage",type:"display",colSpan:2},
                ],
                qsjcq:[
                    {label:"产权人姓名",name:"cqName",type:"display",colSpan:1},
                    {label:"产权人联系方式",name:"cqPhone",type:"display",colSpan:1},
                    {label:"产权人证件类型",name:"cqrzjType",type:"display",options:cardTypeOptions,colSpan:1},
                    {label:"产权人证件号码",name:"cqCardNum",type:"display",colSpan:1},//(产权人证件号码确定人员后，带入展示姓名，身份证号码，联系电话)
                    
                    {label:"楼栋凭证类型",name:"ldpzType",type:"display",domainName:"ldpzType",colSpan:1},
                    {label:"楼栋凭证号",name:"ldpzNumber",type:"display",colSpan:1},
                    {label:"楼栋凭证发证日期",name:"ldpzStartDate",type:"display",colSpan:1},
                    {label:"楼栋凭证到期时间",name:"ldpzEndDate",type:"display",colSpan:1},
                    {label:"土地凭证类型",name:"tdpzType",type:"display",domainName:"tdpzType",colSpan:1},
                    {label:"土地凭证号",name:"tdpzNumber",type:"display",colSpan:1},
                    {label:"土地凭证发证日期",name:"tdpzStartDate",type:"display",colSpan:1},
                    {label:"土地凭证到期时间",name:"tdpzEndDate",type:"display",colSpan:1},
                ],
                glxx:[
                    {label:"楼栋长姓名",name:"ldzName",type:"display",colSpan:1},
                    {label:"楼栋长联系方式",name:"ldzPhone",type:"display",colSpan:1},
                    {label:"楼栋长身份证号码",name:"ldzCardNum",type:"display",colSpan:1},//(楼栋长证件号码确定人员后，带入展示姓名，身份证号码，联系电话)
                    {label:"人员属性",name:"ldzProperty",type:"display",colSpan:1},
                    
                    {label:"物管单位名称",name:"wgName",type:"display",colSpan:1},
                    {label:"物管证件类型",name:"wgCardType",type:"display",domainName:"wgCardType",colSpan:1},
                    {label:"物管证件号码",name:"wgCardNumber",type:"display",colSpan:1},
                    {label:"物管负责人",name:"wgPerson",type:"display",colSpan:1},
                    {label:"物管联系电话",name:"wgContact",type:"display",colSpan:1},
                ]
            },
            qsjcqGroupRender:form.renders.groupRender.bind(form.renders,[
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
                        "cqCardNum",
                    ]
                },
            ],form.renders.table2Render),
            glxxGroupRender:form.renders.groupRender.bind(form.renders,[
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
                        "ldzCardNum",
                        "ldzProperty",
                    ]
                }
            ],form.renders.table2Render),
            fwList:{
                tableColumns:[
                    {title: '房屋户型',field: 'houseLayout',align: 'center',valign: 'middle',visible: true},
                    {title: '所属楼层',field: 'floor',align: 'center',valign: 'middle',visible: true},
                    {title: '房号',field: 'houseNumber',align: 'center',valign: 'middle',visible: true,
                        component: "<a :href='\"fwDetail.html?id=\"+row.id'>{{row.houseNumber}}</a>"},
                    {title: '房屋用途',field: 'houseUse',align: 'center',valign: 'middle',visible: true,
                        component: tableHelper.getDomainDisplayComponent("houseUse","houseUse")},
                    {title: '房屋类型',field: 'houseType',align: 'center',valign: 'middle',visible: true,
                        component: tableHelper.getDomainDisplayComponent("houseType","houseType")},
                    {title: '房屋来源',field: 'houseSource',align: 'center',valign: 'middle',visible: true,
                        component: tableHelper.getDomainDisplayComponent("houseSource","houseSource")},
                ],
                ajaxOptions:{
                    url:systemConfig.backendurl+"/realPerson/house/getBuildingHouse",
                    data:{
                        id:id
                    },
                    type:"get"
                }
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
            id:id
        },
        mounted:function(){
            this.loadData();
        },
        methods:{
            loadData:function(){
                $.ajax({
                    url:systemConfig.backendurl+"/realPerson/house/building",
                    data:{
                        id:this.id
                    },
                    type:"get",
                    success:this.getBuildingDetailSuccess.bind(this),
                    error:this.getBuildingDetailError.bind(this)
                });
            },
            getBuildingDetailSuccess:function(res){
                if(res.success){
                    this.$set(this,"data",res.data);
                }
                else{
                    this.getCarDetailError();
                }
            },
            getBuildingDetailError:function(){
            }
        }
    });
});