define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueArbor'
], function(require, Vue, $, systemConfig) {
    'use strict';
    var detailVm = new Vue({
        el:"#detail",
        data:{
            value:""
        },
        mounted:function(){
            this.loadData();
        },
        methods:{
            loadData:function(){
                this.$set(this,"value","");
                $.ajax({
                    url:systemConfig.backendurl+"/system/getCurUser",
                    type:"get",
                    success:this.getDataSuccess.bind(this),
                    error:this.getDataError.bind(this)
                });
            },
            getDataSuccess:function(res){
                if(res.success){
                    if(res.data)
                    {
                        this.$set(this,"value",
                        "{color:none}\n张三 -> 精神病\n张三 -> 贫困户\n张三 -> 房屋\n张三 -> 车辆\n张三 -> 志愿者\n张三 -> 党员\n房屋 -> 金陵北路21号11号楼1单元201\n房屋 -> 龙山街道玄坛庙村25号\n金陵北路21号11号楼1单元201 -> 出租\n车辆 -> 浙E89883\n车辆 -> 浙E33234\n志愿者 -> 社区志愿者\n志愿者 -> 红十字会志愿者\n党员 -> 雉城街道党支部\n精神病 -> 2017年3月8日确诊\n贫困户 -> 因病致残\n因病致残->社会保障兜底\n张三 -> 军属\n张三 -> 残疾人 \n残疾人 -> 精神残疾2级\n张三 -> 已婚\n已婚 -> 李四\n张三 -> 已就业\n已就业 -> 煤山镇环卫所\n张三 {color:#95cde5}\n李四 {color:#db8e3c}\n志愿者 {color:#c6531e}\n雉城街道党支部 {color:#ffe35f}\n社会保障兜底 {color:#95cde5}\n龙山街道玄坛庙村25号 {color:#db8e3c}\n车辆 {color:#db8e3c}"
                        );
                    }
                }
                else{
                    this.getDataError(res);
                }
            },
            getDataError:function(res){
                this.showError("出错");
            },
        }
    });
});