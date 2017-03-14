define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueBsPop',
    // 'systemConfig',
], function (require, Vue, $, config) {
    // var moduleName = systemConfig.getQueryParams().module;
    var detailVm = new Vue({
        el: "#headerMenu",
        data: {
            // 登录图片
            // imgLogo: "portal/img/account.png",
            userName: null,
            // indexhtml: null,
        },
        mounted: function () {
            // this.getpathname();
            // var pathnane=window.location.pathname;

            // alert(pathnane.substr(pathnane.length-10));

        },
        methods: {
            // 菜单
            menuShow: function () {
                // 显示弹出框
                menuVm.show();
            },
            // 关闭菜单
            menuHide: function () {
                // 显示弹出框
                menuVm.hide();
            },
            // getpathname: function () {
            //     var pathnane = window.location.pathname;
            //     var indexhtml = pathnane.substr(pathnane.length - 10);
            //     this.$set(this, "indexhtml", indexhtml);
            // }
        },

    });
    var menuVm = new Vue({
        el: "#menu",
        data: {
            showMenu: false,
            // userName: null,
        },
        mounted: function () {
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.showMenu = true;
            },
            hide: function () {
                this.showMenu = false;
            },

        },
    });

});
