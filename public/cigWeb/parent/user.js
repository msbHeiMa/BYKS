define([
    'require',
    'systemConfig',
    'vue',
    'jQuery'
], function(require, config, Vue, $) {
    'use strict';
    var vm = new Vue({
        data:{
            userName:""
        },
        mouted:function(){
            this.getUser();
        },
        methods:{
            getUser:function(){
                $.ajax({
                    type:"get",
                    url:config.backendurl+"/system/getCurUser",
                    success:this.getUserSuccess.bind(this)
                })
            },
            getUserSuccess:function(res){
                if(res.success){
                    this.$set(this,"userName",res.data.userName);
                }
            }
        }
    });
    return vm;
});