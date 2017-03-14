define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueBsTable',
    'vueBsTab',
    'vueBsPop'
], function(require, Vue, $, systemConfig,form,table,alert) {
    'use strict';
    var moduleName = systemConfig.getQueryParams().module;
    var tableHelper = table.helper;
    var sfOptions = [{text:"是",value:1},{text:"否",value:0}];
    var ywOptions = [{text:"有",value:1},{text:"无",value:0}];
    var detailVm = new Vue({
        el:"#detail",
        data:{
            moduleName:moduleName,
            fields:{
                //人口基本信息
                main:[
                    {label:"姓名",name:"name",type:"display",colSpan:1},
                    {label:"身份证号码",name:"cardNum",type:"display",colSpan:1},
                    {label:"曾用名",name:"usedName",type:"display",colSpan:1},
                    {label:"性别",name:"gender",type:"display",domainName:"gender",colSpan:1},
                    {label:"出生年月",name:"birthDate",type:"display",colSpan:1},

                    {label:"民族",name:"nation",type:"display",domainName:"nation",colSpan:1},
                    {label:"籍贯",name:"nativePlace",type:"display",domainName:"nativePlace",colSpan:1},
                    {label:"婚姻状况",name:"maritalStatus",type:"display",domainName:"maritalStatus",colSpan:1},

                    {label:"政治面貌",name:"politicalStatus",type:"display",domainName:"politicalStatus",colSpan:1},
                    {label:"学历",name:"education",type:"display",domainName:"education",colSpan:1},
                    {label:"身高",name:"height",type:"display",colSpan:1},
                    {label:"血型",name:"bloodType",type:"display",domainName:"bloodType",colSpan:1},
                    {label:"宗教信仰",name:"relBelief",type:"display",domainName:"relBelief",colSpan:1},
                    
                    {label:"职业类别",name:"occCategory",type:"display",domainName:"occCategory",colSpan:1},
                    {label:"职业",name:"occupation",type:"display",colSpan:1},
                    {label:"专业特长",name:"specialty",type:"display",domainName:"specialty",colSpan:1},
                    {label:"服务处所",name:"sPlace",type:"display",colSpan:1},
                    
                    {label:"户籍地",name:"domicile",type:"display",colSpan:1},
                    {label:"户籍门（楼）详址",name:"dAddr",type:"display",colSpan:1},

                    {label:"现住地",name:"residence",type:"display",colSpan:1},
                    {label:"现住门（楼）详址",name:"rAddr",type:"display",colSpan:1},
                    
                    {label:"是否死亡",name:"death",type:"display",options:sfOptions,colSpan:1},

                    {label:"所属网格",name:"gridName",type:"display",colSpan:1},
                    {label:"手机号码",name:"phone",type:"display",colSpan:1},
                    {label:"固定电话",name:"tel",type:"display",colSpan:1},
                    {label:"电子邮箱",name:"email",type:"display",colSpan:1},
                ],
                //人口户籍信息
                hj:[
                    {label:"户号",name:"hNum",type:"display",colSpan:1},
                    {label:"户主姓名",name:"name",type:"display",colSpan:1},
                    {label:"户主身份证",name:"cardNum",type:"display",colSpan:1},
                    {label:"是否有户无人",name:"hasPerson",type:"display",options:sfOptions,colSpan:1},
                    {label:"是否五保户",name:"isFive",type:"display",options:sfOptions,colSpan:1},
                    {label:"是否低保户",name:"isLow",type:"display",options:sfOptions,colSpan:1},
                    {label:"是否贫困户",name:"isPool",type:"display",options:sfOptions,colSpan:1},
                    {label:"家庭称号",name:"alines",type:"display",options:sfOptions,colSpan:1},
                    {label:"户口类型",name:"residenceType",type:"display",domainName:"residenceType",colSpan:1},
                    {label:"人户一致标识",name:"rhyzbs",type:"display",domainName:"rhyzbs",colSpan:1},
                ],
                //居住房屋
                jzfw:[
                    {label:"产权人",name:"pName",type:"display",colSpan:1},//pId
                    {label:"产权类型",name:"propertyType",domainName:"propertyType",type:"display",colSpan:1},
                    {label:"房产证编号",name:"houseNumber",type:"display",colSpan:1},
                    {label:"地址",name:"address",type:"display",colSpan:1},
                    {label:"建筑用途",name:"houseUse",domainName:"houseUse",type:"display",colSpan:1},
                    {label:"房屋结构",name:"houseStructure",domainName:"houseStructure",type:"display",colSpan:1},
                    {label:"建筑面积（平方米）",name:"houseArea",type:"display",colSpan:1},
                    {label:"房屋类型",name:"houseType",domainName:"houseType",type:"display",colSpan:1},
                    {label:"有无消防通道",name:"isFireChannels",options:ywOptions,type:"display",colSpan:1},
                    {label:"有无安全通道",name:"isSafetyChannel",options:ywOptions,type:"display",colSpan:1},
                    //出租信息
                    {label:"承租人",name:"czName",type:"display",colSpan:1},//czId
                    {label:"是否签订治安责任保证书",name:"isSignGuarantee",options:sfOptions,type:"display",colSpan:1},
                    {label:"限住人数",name:"limitPersons",type:"display",colSpan:1},
                    {label:"实住人数",name:"realityPersons",type:"display",colSpan:1},
                    {label:"租赁备案证号",name:"houseFileNum",type:"display",colSpan:1},
                    {label:"管理类别",name:"managerTypes",domainName:"managerTypes",type:"display",colSpan:1},
                    {label:"出租房性质",name:"rentalHouseProperty",domainName:"rentalHouseProperty",type:"display",colSpan:1},
                    {label:"出租房类别",name:"rentalType",domainName:"rentalType",type:"display",colSpan:1},
                    {label:"出租间数",name:"roomNumber",type:"display",colSpan:1},
                    {label:"出租用途",name:"rentalUse",type:"display",domainName:"rentalUse",colSpan:1},
                ],
                //肇事肇祸基本信息
                zszhjsbBase:[
                    {label:"所属网格",name:"gridName",type:"display",colSpan:1},
                    {label:"危险性评估等级",name:"dangerRank",type:"display",domainName:"dangerRank",colSpan:1},
                    {label:"管理等级",name:"manageLevel",domainName:"manageLevel",type:"display",colSpan:1},
                    {label:"网格员回访周期",name:"griderCyc",type:"display",colSpan:1},
                ],
                //肇事肇祸医疗信息
                zszhjsbYl:[
                    {label:"初次发病日期",name:"attackDate",type:"display",colSpan:1},
                    {label:"目前诊断类型",name:"attackType",domainName:"attackType",type:"display",colSpan:1},
                    {label:"治疗情况",name:"treatS",type:"display",domainName:"treatS",colSpan:1},
                    {label:"治疗医院名称",name:"treatName",type:"display",colSpan:1},
                    {label:"实施住院治疗原因",name:"hosTreatS",type:"display",domainName:"hosTreatS",colSpan:1},
                    {label:"接收康复训练机构",name:"recOrganName",type:"display",colSpan:1},
                    {label:"治疗病史",name:"zlbs",type:"display",colSpan:1},                    
                ],
                //基本信息(承租人)
                czMain:[
                    {label:"承租人",name:"czName",type:"display",colSpan:1},//czId
                    {label:"地址",name:"address",type:"display",colSpan:1},
                    {label:"建筑用途",name:"houseUse",domainName:"houseUse",type:"display",colSpan:1},
                    {label:"房屋结构",name:"houseStructure",domainName:"houseStructure",type:"display",colSpan:1},
                    {label:"建筑面积（平方米）",name:"houseArea",type:"display",colSpan:1},
                    {label:"房屋类型",name:"houseType",domainName:"houseType",type:"display",colSpan:1},
                    {label:"有无消防通道",name:"isFireChannels",options:sfOptions,type:"display",colSpan:1},
                    {label:"有无安全通道",name:"isSafetyChannel",options:sfOptions,type:"display",colSpan:1},

                    {label:"是否签订治安责任保证书",name:"isSignGuarantee",options:sfOptions,type:"display",colSpan:1},
                    {label:"限住人数",name:"limitPersons",type:"display",colSpan:1},
                    {label:"实住人数",name:"realityPersons",type:"display",colSpan:1},
                    {label:"租赁备案证号",name:"houseFileNum",type:"display",colSpan:1},
                    {label:"管理类别",name:"managerTypes",domainName:"managerTypes",type:"display",colSpan:1},
                    {label:"出租房性质",name:"rentalHouseProperty",domainName:"rentalHouseProperty",type:"display",colSpan:1},
                    {label:"出租房类别",name:"rentalType",domainName:"rentalType",type:"display",colSpan:1},
                    {label:"出租间数",name:"roomNumber",type:"display",colSpan:1},
                    {label:"出租用途",name:"rentalUse",type:"display",domainName:"rentalUse",colSpan:1},
                ],
                //产权信息(承租人)
                cq:[
                    {label:"产权人",name:"pName",type:"display",colSpan:1},//pId
                    {label:"产权类型",name:"propertyType",domainName:"propertyType",type:"display",colSpan:1},
                    {label:"房产证编号",name:"houseNumber",type:"display",colSpan:1},
                ],
                //基本信息(产权人)
                cqMain:[
                    {label:"产权人",name:"pName",type:"display",colSpan:1},//pId
                    {label:"产权类型",name:"propertyType",domainName:"propertyType",type:"display",colSpan:1},
                    {label:"房产证编号",name:"houseNumber",type:"display",colSpan:1},
                    {label:"地址",name:"address",type:"display",colSpan:1},
                    {label:"建筑用途",name:"houseUse",domainName:"houseUse",type:"display",colSpan:1},
                    {label:"房屋结构",name:"houseStructure",domainName:"houseStructure",type:"display",colSpan:1},
                    {label:"建筑面积（平方米）",name:"houseArea",type:"display",colSpan:1},
                    {label:"房屋类型",name:"houseType",domainName:"houseType",type:"display",colSpan:1},
                    {label:"有无消防通道",name:"isFireChannels",options:sfOptions,type:"display",colSpan:1},
                    {label:"有无安全通道",name:"isSafetyChannel",options:sfOptions,type:"display",colSpan:1},
                ],
                //出租信息(产权人)
                chz:[
                    {label:"承租人",name:"czName",type:"display",colSpan:1},//czId
                    {label:"是否签订治安责任保证书",name:"isSignGuarantee",options:sfOptions,type:"display",colSpan:1},
                    {label:"限住人数",name:"limitPersons",type:"display",colSpan:1},
                    {label:"实住人数",name:"realityPersons",type:"display",colSpan:1},
                    {label:"租赁备案证号",name:"houseFileNum",type:"display",colSpan:1},
                    {label:"管理类别",name:"managerTypes",domainName:"managerTypes",type:"display",colSpan:1},
                    {label:"出租房性质",name:"rentalHouseProperty",domainName:"rentalHouseProperty",type:"display",colSpan:1},
                    {label:"出租房类别",name:"rentalType",domainName:"rentalType",type:"display",colSpan:1},
                    {label:"出租间数",name:"roomNumber",type:"display",colSpan:1},
                    {label:"出租用途",name:"rentalUse",type:"display",domainName:"rentalUse",colSpan:1},
                ],
                //车辆基本信息
                clMain:[
                    {label:"车辆类型",name:"carType",domainName:"carType",type:"display",colSpan:1},
                    {label:"车牌号",name:"carNumber",type:"display",colSpan:1},
                    // {label:"车主名称",name:"name",type:"display",colSpan:1},
                    {label:"车架/发动机号码",name:"engineNumber",type:"display",colSpan:1},
                    {label:"是否上户",name:"isHouseholds",type:"display",options:sfOptions,colSpan:1},
                    {label:"车况",name:"condition",type:"display",colSpan:1},
                    {label:"品牌",name:"brand",type:"display",colSpan:1},
                    {label:"车辆用途",name:"purpose",type:"display",colSpan:1},
                ],
            },
            tableConfig:{
                "cy":{checkbox:false},
                "ldgj":{checkbox:false},
                "hjcy":{checkbox:false},
            },
            columns:{
                "cy":[
                    {
                        title: '与户主关系',
                        field: 'relation',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("relation","familyRelation")
                    },
                    {
                        title: '姓名',
                        width: '70px',
                        field: 'pName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<span v-if="!row.qsPId">{{row.pName}}</span><a v-else target="_blank" :href="\'rkDetail.html?module='+moduleName+'&id=\'+row.qsPId">{{row.personName}}</a>',
                    },
                    {
                        title: '身份证号码',
                        width: '165px',
                        field: 'pCardNum',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<span v-if="!row.qsPId">{{row.idNumber}}</span><span v-else>{{row.cardNum}}</span>',
                    },
                ],
                "ldgj":[
                    {
                        title: '流动日期',
                        field: 'flowDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '流动原因',
                        field: 'flowReason',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '流出地',
                        field: 'outflowAddress',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '流入地',
                        field: 'inflowAddress',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                ],
                "hjcy":[
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
                zszhjsbJhr:[
                    {title: '类型',width: '120px',field: 'type',align: 'center',valign: 'middle',visible: true},
                    {title: '姓名',width: '70px',field: 'name',align: 'center',valign: 'middle',visible: true},
                    {title: '身份证号',field: 'cardNum',align: 'center',valign: 'middle',visible: true},
                    {title: '联系方式',field: 'phone',align: 'center',valign: 'middle',visible: true},
                    {title: '现住地/单位',field: 'address',align: 'center',valign: 'middle',visible: true},
                    {title: '与当事人关系',field: 'relation',align: 'center',valign: 'middle',visible: true},
                    {title: '随访周期',field: 'cyc',align: 'center',valign: 'middle',visible: true},
                ],
                zszhjsZszhs:[
                    {title: '肇事肇祸日期',field: 'zszhDate',align: 'center',valign: 'middle',visible: true},
                    {title: '肇事肇祸地点',field: 'zszhAddr',align: 'center',valign: 'middle',visible: true},
                    {title: '处置结果',field: 'zszhCom',align: 'center',valign: 'middle',visible: true},
                ],
                "cqfw":[
                    {
                        title: '产权人姓名',
                        field: 'pName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<a target='_blank' :href='row.pId?\"../syrk/rkDetail.html?id=\"+row.pId:\"javascript:;\"'>{{row.pName}}</a>"
                    },
                    {
                        title: '产权证类型',
                        field: 'signType',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '房产证编号',
                        field: 'houseNumber',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<a target='_blank' :href='\"../wdgl/fwDetail.html?id=\"+row.id'>{{row.address}}</a>"
                    },
                    {
                        title: '房屋地址',
                        field: 'address',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
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
                        title: '房屋结构',
                        field: 'houseStructure',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("houseStructure","houseStructure")
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
                        title: '建筑面积（平方米）',
                        field: 'houseArea',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("houseType","houseType")
                    },
                    {
                        title: '登记时间',
                        field: 'createDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                ],
                "czfw":[
                ],
                "cl":[
                    {
                        title: '车牌号',
                        field: 'carNumber',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<a target='_blank' :href='\"../wdgl/clDetail.html?id=\"+row.id'>{{row.carNumber}}</a>"
                    },
                    // {
                    //     title: '车主名称',
                    //     field: 'pName',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    //     component: "<a target='_blank' :href='row.pId?\"../syrk/rkDetail.html?id=\"+row.pId:\"javascript:;\"'>{{row.pName}}</a>"
                    // },
                    {
                        title: '车辆类型',
                        field: 'carType',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("carType","carType")
                    },
                    {
                        title: '发动机号码',
                        field: 'engineNumber',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '是否上户',
                        field: 'isHouseholds',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: "<span>{{row.isHouseholds=='1' ? '是':'否'}}</span>"
                    },
                    {
                        title: '车况',
                        field: 'condition',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '品牌',
                        field: 'brand',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '车辆用途',
                        field: 'purpose',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                ],
                sj:[
                    // {
                    //     title: '当事人',
                    //     field: 'pName',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    // },
                    // {
                    //     title: '当事人证件号码',
                    //     field: 'pCarNumber',
                    //     align: 'center',
                    //     valign: 'middle',
                    //     visible: true,
                    // },
                    {
                        title: '事件类型',
                        field: 'eventType',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '事件地址',
                        field: 'address',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '事件时间',
                        field: 'createDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    }
                ],

                lq:[
                    {title: '林权证编号',field: 'cardNumber',align: 'center',valign: 'middle',visible: true},
                    {title: '县级生态公益林面积',field: 'stgylArea',align: 'center',valign: 'middle',visible: true},
                    {title: '林地总数',field: 'allCount',align: 'center',valign: 'middle',visible: true},
                    {title: '商品林面积',field: 'splArea',align: 'center',valign: 'middle',visible: true},
                    {title: '退耕还林面积',field: 'tghlArea',align: 'center',valign: 'middle',visible: true},
                ],
                tdsyq:[
                    {title: '土地使用证',field: 'cardNumber',align: 'center',valign: 'middle',visible: true},
                    {title: '未办证原因',field: 'nocardReason',align: 'center',valign: 'middle',visible: true},
                    {title: '发证机关',field: 'cardOrg',align: 'center',valign: 'middle',visible: true},
                    {title: '土地使用面积',field: 'useArea',align: 'center',valign: 'middle',visible: true},
                    {title: '发证时间',field: 'cardStartDate',align: 'center',valign: 'middle',visible: true},
                    {title: '使用情况描述',field: 'useDescribe',align: 'center',valign: 'middle',visible: true},
                ],
                tdcbq:[
                    {title: '户主信息',field: 'pName',align: 'center',valign: 'middle',visible: true},
                    {title: '经营权证编号',field: 'cardNumber',align: 'center',valign: 'middle',visible: true},
                    {title: '承包合同面积',field: 'cbhtArea',align: 'center',valign: 'middle',visible: true},
                    {title: '小地名',field: 'placeName',align: 'center',valign: 'middle',visible: true},
                    {title: '承包合同号',field: 'cbhtNumber',align: 'center',valign: 'middle',visible: true},
                    {title: '地类',field: 'landType',align: 'center',valign: 'middle',visible: true},
                    {title: '鉴证号',field: 'jzNumber',align: 'center',valign: 'middle',visible: true},
                    {title: '面积',field: 'area',align: 'center',valign: 'middle',visible: true},
                    {title: '经营权证面积',field: 'jyqzArea',align: 'center',valign: 'middle',visible: true},
                ],
            },
            tabs:{
                rkTabs:[
                    {text:"人口基础数据",name:"main"},
                    {text:"流动轨迹信息",name:"ldgj"},
                    {text:"户籍信息",name:"hj"},
                    {text:"流入信息",name:"lr"},
                    {text:"居住房屋",name:"jzfw"},
                    {text:"亲属关系",name:"cy"}
                ]
            },
            //人口基本信息
            main:{load:false},
            //人口户籍信息
            hj:{load:false},
            //人口流入信息
            lr:{load:false},
            jzfw:{load:false},
            //人口成员信息
            cy:$.extend([],{load:false}),
            //流动轨迹信息
            ldgj:$.extend([],{load:false}),

            //肇事肇祸精神病
            zszhjsb:{load:false},
            rkAjaxOptions:{
                "main":{
                    type:"get",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/person/personBaseInfo",
                },
                "ldgj":{
                    type:"get",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/person/flowTrack",
                },
                "hj":{
                    type:"get",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/person/cyGetFamily",
                },
                "lr":{
                    // type:"get",
                    // data:{
                    // },
                    // url:systemConfig.backendurl+"/realPerson/person/flowTrack",
                },
                "cy":{
                    type:"get",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/person/familyRelation",
                },
                "jzfw":{
                    type:"get",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/person/jzHouse",
                },
                "zszhjsb":{
                    type:"get",
                    data:{
                    },
                    url:systemConfig.backendurl+"/realPerson/person/jsbPersonInfo",
                }
            },
            cqfwList:[],
            cqfwListLoad:false,
            czfwList:[],
            czfwListLoad:false,
            clList:[],
            clListLoad:false,
            sjList:[],
            sjListLoad:false,

            hasLq:false,
            hasTdsyq:false,
            hasTdcbq:false,
            
            lqListLoad:false,
            tdsyqListLoad:false,
            tdcbqListLoad:false,
            // hasLq:true,
            // hasTdsyq:true,
            // hasTdcbq:true,
            
            // lqListLoad:true,
            // tdsyqListLoad:true,
            // tdcbqListLoad:true,

            lqList:[],
            tdsyqList:[],
            tdcbqList:[],

            id:null
        },
        components:{
            "ldgj":{
                template:'<div class="rk-ldgj" ref="root">\
                        <ul class="clearfix" v-for="group in groups">\
                            <li v-for="item in group.list" :style="{width:item.width}" :class="{active:item.arrowType == \'none\'}">\
                                <div v-if="item.hasData !== false">\
                                    <dl class="index">\
                                        <dt>{{item.index}}</dt>\
                                    </dl>\
                                    <div class="vline"></div>\
                                    <dl class="detail">\
                                        <dt>{{item.data.gridName}}</dt>\
                                        <dd class="info">\
                                            <ul>\
                                                <li v-if="typeof(item.data.flowReason) == \'undefined\'">新建日期：{{item.data.createDate && item.data.createDate.substr(0,10)}}</li>\
                                                <li v-if="typeof(item.data.flowReason) != \'undefined\'">流入时间：{{item.data.createDate && item.data.createDate.substr(0,10)}}</li>\
                                                <li v-if="typeof(item.data.flowReason) != \'undefined\'">流入原因：{{item.data.flowReason}}</li>\
                                                <li>详细地址：{{item.data.dAddr}}</li>\
                                            </ul>\
                                        </dd>\
                                    </dl>\
                                </div>\
                                <div v-if="item.hasData !== false" :class="[\'arrow\',item.arrowType]">\
                                    <span>流出</span>\
                                    <div class="img"></div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>',
                props:[
                    "data"
                ],
                mounted:function(){
                    var self = this;
                    this.width = this.$refs.root ? this.$refs.root.clientWidth : 0;
                    setInterval(function(){
                        self.width = self.$refs.root ? self.$refs.root.clientWidth : 0;
                    },100);
                },
                data:function(){
                    return {
                        width:0,
                        // data:[
                        //     {"gridName":"高家墩居委会/桥南塘东片（第一网格）","createDate":null,"dAddr":null},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海市详址","flowReason":"流出县外1"},
                        //     {"gridName":"高家墩居委会/桥南塘东片（第一网格）","createDate":"2017-02-27 00:00:00","dAddr":"流入详址1","flowReason":"回家"},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海详址2","flowReason":"再出去"},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海详址3","flowReason":"再外出"},
                        //     {"gridName":"县外","createDate":"2017-02-27 00:00:00","dAddr":"上海详址4","flowReason":"再外出"}
                        // ],
                        sampleGroups:[
                            {
                                list:[
                                    {
                                        width:"25%",
                                        arrowType:"right"
                                    },
                                    {
                                        width:"25%",
                                        arrowType:"right"
                                    },
                                    {
                                        width:"25%",
                                        arrowType:"right"
                                    },
                                    {
                                        width:"25%",
                                        arrowType:"down"
                                    }
                                ]
                            },
                            {
                                list:[
                                    {
                                        width:"25%",
                                        hasData:false
                                    },
                                    {
                                        width:"25%",
                                        arrowType:"",
                                        hasData:false
                                    },
                                    {
                                        width:"25%",
                                        arrowType:"none"
                                    },
                                    {
                                        width:"25%",
                                        arrowType:"left"
                                    }
                                ]
                            },
                            {
                                list:[
                                    {
                                        width:"33%"
                                    },
                                    {
                                        width:"33%"
                                    },
                                    {
                                        width:"33%",
                                        arrowType:"down"
                                    }
                                ],
                            },
                            {
                                list:[
                                    {
                                        width:"33%",
                                        hasData:false
                                    },
                                    {
                                        width:"33%",
                                        arrowType:"none"
                                    },
                                    {
                                        width:"33%",
                                        arrowType:"left"
                                    }
                                ]
                            }
                        ]
                    }
                },
                computed:{
                    groups:function(){
                        // if(this.width == 0) return [];
                        var w = parseInt(this.width);
                        var itemW = 200;
                        var itemW2 = "";
                        var rowCount = 0;
                        if(w/itemW > 4){
                            itemW2 = "25%";
                            rowCount = 4;
                        }
                        else if(w/itemW > 3){
                            itemW2 = "33%";
                            rowCount = 3;
                        }
                        else if(w/itemW > 2){
                            itemW2 = "50%";
                            rowCount = 2;
                        }
                        else{
                            itemW2 = "100%";
                            rowCount = 1;
                        }
                        var groups = [];
                        var data = this.data;
                        var group = null;
                        var reverseGroup = true;
                        for(var i=0;i<data.length;i++){
                            if(group){
                                if(group.length == rowCount){
                                    addGroup();
                                }
                            }
                            else{
                                addGroup();
                            }
                            var indexText = (i+1).toString();
                            indexText = indexText.length == 1 ? ("0"+indexText) : indexText;
                            var item = {
                                index:indexText,
                                arrowType: i == data.length - 1 
                                    ? "none" 
                                    : (group.length == rowCount - 1
                                        ? "down"
                                        : (reverseGroup ? "left" : "right")),
                                data:data[i],
                                width:itemW2,
                            };
                            group.push(item);
                        }
                        addGroup();
                        groups.pop();
                        return groups;

                        function addGroup(){
                            if(group && reverseGroup){
                                group.reverse();
                                while(group.length < rowCount){
                                    group.unshift({
                                        hasData:false,
                                        width:itemW2
                                    })
                                }
                            }
                            reverseGroup = !reverseGroup;
                            group = [];
                            groups.push({
                                list:group
                            });
                        }
                    }
                }
            }
        },
        mounted:function(){
            var query = systemConfig.getQueryParams();
            var id = query.id;
            var cardnum = query.cardnum;
            if(!id && cardnum){
                $.ajax({
                    type:"get",
                    data:{
                        cardNum:cardnum
                    },
                    async:false,
                    url:systemConfig.backendurl+"/realPerson/person/queryPersons",
                    success:(function(res){
                        if(res.success && res.data && res.data.length > 0){
                            id = res.data[0].id;
                        }
                        else{
                            alert.alert(res.errMsg || "没有找到人员信息");
                        }
                    }).bind(this),
                })
            }
            if(id){
                this.id = id;
                this.loadRkTabs();
                this.loadRk("main");
                this.loadWq();
                this.loadSj();
            }
        },
        methods:{
            loadWq:function(){
                var options = {
                    url:systemConfig.backendurl+"/realPerson/person/fiveRight",
                    data:{
                        id:this.id
                    },
                    type:"get",
                    success:(function(res){
                        if(res.success){
                            this.hasLq = res.data.rows1.length > 0;
                            this.lqListLoad = true;
                            this.lqList = res.data.rows1;
                            
                            this.hasTdsyq = res.data.rows2.length > 0;
                            this.tdsyqListLoad = true;
                            this.tdsyqList = res.data.rows2;
                            
                            this.hasTdcbq = res.data.rows3.length > 0;
                            this.tdcbqListLoad = true;
                            this.tdcbqList = res.data.rows3;
                        }
                    }).bind(this),
                };
                $.ajax(options);
            },
            loadRkTabs:function(){
                var options = {
                    url:systemConfig.backendurl+"/realPerson/person/personTabs",
                    data:{
                        id:this.id
                    },
                    type:"get",
                    success:this.getRkTabsSuccess.bind(this),
                    error:this.getRkTabsError.bind(this)
                };
                $.ajax(options);
            },
            getRkTabsSuccess:function(res){
                if(res.success){
                    var tabData = res.data;
                    this.$set(this.tabs,"rkTabs",this.tabs.rkTabs.filter(function(tab){
                        return tab.name == "main"
                            || (tab.name == "ldgj" && tabData.isFlow)
                            || (tab.name == "hj" && tabData.isHj)
                            || (tab.name == "cy" && tabData.isQsgx)
                            //|| (tab.name == "lr" && tabData.isFlow)
                            || (tab.name == "jzfw" && tabData.isJzfw)
                            // "isHj": true, 
                            // "isQsgx": true,
                            // "isFlow": false, 
                            // "isCqfw": false, 
                            // "isCzfw": false,
                            // "isJzfw": true,
                            // "isCl": false
                    }));                    
                    tabData.isCl = true;
                    tabData.isCqfw = true;
                    tabData.isCzfw = true;
                    if(tabData.isCqfw){
                        this.loadCqfw();
                    }
                    if(tabData.isCzfw){
                        // this.loadCzfw();
                    }
                    if(tabData.isCl){
                        this.loadCl()
                    }


                    if(tabData.isJsb){
                        this.tabs.rkTabs.push({text:"肇事肇祸精神病",name:"zszhjsb"});
                    }
                }
                else{
                    this.getRkTabsError(type,res);
                }
            },
            getRkTabsError:function(type){
            },
            loadRk:function(type){
                this[type].load = true;
                var defOptions = this.rkAjaxOptions[type];
                var options = $.extend({
                    success:this.getRkSuccess.bind(this,type),
                    error:this.getRkError.bind(this,type)
                },defOptions)
                options.data = $.extend({id:this.id},options.data);
                $.ajax(options);
            },
            getRkSuccess:function(type,res){
                if(res.success){
                    if(type == "main"){
                        if(typeof res.data.accreType != "undefined"){
                            var extraFields = [
                                {label:"是否重点关注人员",name:"isKeyPoint",options:sfOptions,type:"display",colSpan:1},
                                {label:"办证类型",name:"accreType",domainName:"accreType",type:"display",colSpan:1},
                                {label:"证件号码",name:"idNum",type:"display",colSpan:1},
                                {label:"登记日期",name:"recordDate",type:"display",colSpan:1},
                                {label:"证件到期日期",name:"expDate",type:"display",colSpan:1},
                                {label:"住所类型",name:"placeType",domainName:"placeType",type:"display",colSpan:1},
                            ];
                            extraFields.forEach(function(field){
                                this.fields.main.push(field);
                            },this);
                        }
                        if(typeof res.data.isOutCountry != "undefined"){
                            var extraFields = [
                                {label:"是否流出本县",name:"isOutCountry",options:sfOptions,type:"display",colSpan:1},
                                {label:"是否外出",name:"outGone",options:sfOptions,type:"display",colSpan:1},
                                {label:"外出原因",name:"outReasons",type:"display",colSpan:2},
                                {label:"外出时间",name:"reasonsDate",type:"display",colSpan:1},
                                {label:"外出去向",name:"outProvince",type:"display",colSpan:1},
                                {label:"外出详址",name:"outDetailAddress",type:"display",colSpan:2},
                            ];
                            extraFields.forEach(function(field){
                                this.fields.main.push(field);
                            },this);
                        }
                    }
                    this.$set(this,type,res.data);
                }
                else{
                    this.getRkError(type,res);
                }
            },
            getRkError:function(type){
                this[type].load = false;
            },
            rkTabSelect:function(tab){
                var type = tab.name;
                var data = this;
                if(data[type] && data[type].load === false){
                    this.loadRk(type);
                }
            },
            loadCzfw:function(){
                var options = {
                    type:"get",
                    data:{
                        id:this.id
                    },
                    url:systemConfig.backendurl+"/realPerson/person/czHouse",
                    success:this.getCzfwSuccess.bind(this),
                    error:this.getCzfwError.bind(this)
                };
                $.ajax(options);
            },
            getCzfwSuccess:function(res){
                this.czfwListLoad = true;
                if(res.success){
                    res.data.forEach(function(item){
                        this.czfwList.push(item);
                    },this);
                }
                else{
                    this.getCzfwError(res);
                }
            },
            getCzfwError:function(){
                this.czfwListLoad = true;
            },
            loadCqfw:function(){
                var options = {
                    type:"get",
                    data:{
                        id:this.id
                    },
                    url:systemConfig.backendurl+"/realPerson/person/cqHouse",
                    success:this.getCqfwSuccess.bind(this),
                    error:this.getCqfwError.bind(this)
                };
                $.ajax(options);
            },
            getCqfwSuccess:function(res){
                this.cqfwListLoad = true;
                if(res.success){
                    res.data.forEach(function(item){
                        this.cqfwList.push(item);
                    },this);
                }
                else{
                    this.getCqfwError(res);
                }
            },
            getCqfwError:function(){
                this.cqfwListLoad = true;
            },
            loadCl:function(){
                var options = {
                    type:"get",
                    data:{
                        id:this.id
                    },
                    url:systemConfig.backendurl+"/realPerson/person/car",
                    success:this.getClSuccess.bind(this),
                    error:this.getClError.bind(this)
                };
                $.ajax(options);
            },
            getClSuccess:function(res){
                this.clListLoad = true;
                if(res.success){
                    res.data.forEach(function(item){
                        this.clList.push(item);
                    },this);
                }
                else{
                    this.getClError(res);
                }
            },
            getClError:function(){
                this.clListLoad = true;
            },

            loadSj:function(){
                this.sjListLoad = true;
                var url = require.toUrl("./sjlist.json");
                var self = this;
                require(["json!"+url],function(data){
                    data.forEach(function(item){
                        if(item.pId == self.id){
                            self.sjList.push(item);
                        }
                    },self);
                });
            },
            doThisYl:function(){
                ylmodalVm.show(this.zszhjsb.JSBId);
            }
        }
    })

    // 治疗病史
    var ylmodalVm = new Vue({
        el: "#ylmodal",
        data: {
            //设置列表的列
            tableColumns: [
                {
                    title: '序号',
                    field: 'id'
                    ,
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },

                {
                    title: '入院治疗日期',
                    field: 'admissionDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,

                },
                {
                    title: '治疗医院名称',
                    field: 'treatNam',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '实施住院治疗原因',
                    field: 'hosTreatS',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    // component: tableHelper.getDomainDisplayComponent("hosTreatS", "hosTreatS")
                },
                {
                    title: '诊断类型',
                    field: 'attackType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    // component: tableHelper.getDomainDisplayComponent("attackType", "attackType")
                },
                {
                    title: '出院日期',
                    field: 'dischargedDate',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '接受康复训练机构名称',
                    field: 'recOrganNam',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },

            ],
            rows: [],
            // tableAjaxOptions: {
            // }
        },
        mounted: function () {
            // var JSBId = systemConfig.getQueryParams().JSBId;
            // this.JSBId = JSBId;
            // if (JSBId) {
            //     this.loadTable();
            // }
        },
        methods: {
            // 显示弹出框的show方法
            show: function (jsbid) {
                this.JSBId = jsbid;
                this.$refs.pop.show();
                
                if (jsbid) {
                    this.loadTable();
                }
            },
            loadTable: function () {
                var options = {
                    "url": systemConfig.backendurl + "/zszh/zszhQueryJsbTreatHistory",
                    data: {
                        JSBId: this.JSBId
                    },
                    type: "get",
                    "success": this.getTableSuccess.bind(this),
                    "error": this.getTableError.bind(this),
                };
                $.ajax(options);
            },

            getTableSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "rows", res.data.rows);
                }
                else {
                    this.getTableError(res);
                }
            },
            getTableError: function (res) {
            },
        }
    });
});