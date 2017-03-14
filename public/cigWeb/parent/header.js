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
            indexhtml: null,
        },
        mounted: function () {
            this.getpathname();
            // this.getUserName();
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
            // 加载登录用户名
            getUserName: function () {
                $.ajax({
                    type: "get",
                    url: config.backendurl + "/system/getCurUser",
                    // url: config.backendurl + "/dp/getCIGPortalData",
                    success: this.getUserNameSuccess.bind(this)
                })
            },
            getUserNameSuccess: function (res) {
                if (res.success) {
                    // this.$set(this, "aggregateData", res.data.aggregateData);
                    this.$set(this, "userName", res.data.userName);
                }
            },
            loginUsername: function () {
                this.getUserName();
            },
            getpathname: function () {
                var pathnane = window.location.pathname;
                var indexhtml = pathnane.substr(pathnane.length - 10);
                this.$set(this, "indexhtml", indexhtml);
            }
        }
    });
    var menuVm = new Vue({
        el: "#menu",
        data: {
            showMenu: false,
            userName: null,
            indexhtml: null,
        },
        mounted: function () {
            // this.getpathname();
        },
        methods: {
            // 显示弹出框的show方法
            show: function () {
                this.showMenu = true;
            },
            hide: function () {
                this.showMenu = false;
            },
            getUserName: function () {
                $.ajax({
                    type: "get",
                    url: config.backendurl + "/system/getCurUser",
                    // url: config.backendurl + "/dp/getCIGPortalData",
                    success: this.getUserNameSuccess.bind(this)
                })
            },
            getUserNameSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "userName", res.data.userName);
                }
            },
            getpathname: function () {
                var pathnane = window.location.pathname;
                var indexhtml = pathnane.substr(pathnane.length - 10);
                // if (indexhtml != "index.htme") {
                //     this.getUserName();
                // };
                this.$set(this, "indexhtml", indexhtml);

            }
        },
    });

});
