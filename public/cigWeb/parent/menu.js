define([
    'require',
    'systemConfig',
    'vue',
    'jQuery',
    'vueBsTreeview'
], function(require, config, Vue, $) {
    'use strict';
    var vm = new Vue({
        data:{
            menus:[
                {
                    "Id": "5E38E627-1C9E-4C22-AEE2-DC5D18540BDE",
                    "Name": "数据源管理",
                    "Children": [
                        {
                            "Id": "DB235ADF-8D1F-41D5-92C1-3CFE3D9D222A",
                            "Name": "数据源列表",
                            "Url": "/cigjoin/source/list.html"
                        },
                        {
                            "Id": "50972F9E-73D4-4CB6-8DB7-3BD542DD2A96",
                            "Name": "数据抽取记录",
                            "Url": "/cigjoin/source/loglist.html"
                        },
                        {
                            "Id": "50972F9E-73D4-4CB6-8DB7-3BD542DD2A96",
                            "Name": "导入任务",
                            "Url": "/cigjoin/source/importtasks.html"
                        }
                    ]
                },
                {
                    "Id": "1BB4A070-5D40-4422-B9BA-B41A54D43840",
                    "Name": "数据聚合服务",
                    "Children": [
                        {
                            "Id": "5C6D0D2A-CC26-43D2-AD11-A5C202ED778A",
                            "Name": "业务服务",
                            "Url": "/cigjoin/service/business.html"
                        },
                        {
                            "Id": "5C6D0D2A-CC26-43D2-AD11-A5C202ED778A",
                            "Name": "自定义服务",
                            "Url": "/cigjoin/service/custom.html"
                        }
                    ]
                }
            ],
            menuNode:{
                template:"<span @click='naviTo(item)'>{{item.Name}}</span>",
                methods:{
                    naviTo:function(menu){
                        if(menu.Url){
                            location.href = menu.Url;
                        }
                    }
                }
            }
        },
        mouted:function(){
            this.getMenus();
        },
        methods:{
            getMenus:function(){
                $.ajax({
                    type:"get",
                    url:config.backendurl+ "/system/getUserMenu",
                    success:this.getMenusSuccess.bind(this)
                })
            },
            getMenusSuccess:function(res){
                if(res.success){
                    this.$set(this,"menus",(res.data && res.data[0] && res.data[0].Children) ? res.data[0].Children : []);
                }
            }
        }
    });
    return vm;
});