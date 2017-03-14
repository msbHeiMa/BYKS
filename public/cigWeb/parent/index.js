define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    // 'systemConfig',
], function (require, Vue, config, $) {
    'use strict';
    // var query = config.getQueryParams();
    // var id = query.id;

    // var moduleName = systemConfig.getQueryParams().module;
    var detailVm = new Vue({
        el: "#detail",
        data: {
            // imgUrl: "portal/img/banner.png",
            activeIndex: 2,
            countInfo: {
                //聚合数据
                aggregateData: null,
                //聚合信息覆盖单位
                accessToAuthority: null,
                //  流程覆盖单位  
                wfOfficeNum: null,
                //  流程服务访问总数    
                wfServiceNum: null,
            },

        },
        mounted: function () {
            //加载信息数
            this.loadCountInfo();
            // 
            this.bannerStart();
        },
        methods: {
            activeItem: function ($event, activeIndex) {
                this.activeIndex = activeIndex;
            },
            //加载信息数
            loadCountInfo: function () {
                var options = {
                    "url": config.backendurl + "/dp/getCIGPortalData",
                    data: {
                    },
                    type: "get",
                    "success": this.getCountSuccess.bind(this),
                    "error": this.getCountError.bind(this),
                };
                $.ajax(options);
            },
            getCountSuccess: function (res) {
                if (res.success) {
                    this.$set(this, "countInfo", res.data);

                }
                else {
                    this.getCountError(res);
                }
            },
            getCountError: function () {
            },
            // 流程服务连接
            linkLCFW: function () {
                window.location.href = "portal/business.html";
            },
            // 信息聚合连接
            linkXXJH: function () {
                window.location.href = "cigjoin/service/business.html";
            },
            // 时空云连接
            linkYun: function () {
                window.location.href = "http://portal.giscloud.cx/arcgis/changxing/viewer/dataGallery.html";

            },
            bannerStart: function () {
                var banner = {
                    // items: [],
                    index: 0,
                    timer: null,
                    wait: 1000,
                    start: function () {
                        var self = this;
                        self.timer = setInterval(self.nextImage.bind(self), self.wait);
                        $("#slider>img").hover(function () {
                            clearInterval(self.timer);
                        }, function () {
                            self.timer = setInterval(self.nextImage.bind(self), self.wait);
                        });

                        $("#slider li").click(function () {
                            clearInterval(self.timer);
                            $("#slider li").removeClass("current");
                            var clickLi = $(this).attr("data-click");
                            $("#slider>img").attr("class", "banner-hide")
                            $("#slider>img").eq(clickLi).attr("class", "banner-show");


                        });
                    },
                    nextImage: function () {
                        $("#slider>img").attr("class", "banner-hide")
                        $("#slider>img").eq(this.index).attr("class", "banner-show");
                        $("#slider li").removeClass("current");
                        $("#slider li").eq(this.index).addClass("current");
                        this.index++;
                        this.index == 3 && (this.index = 0);
                    }
                }
                banner.start();
            }
        }
    });
});
