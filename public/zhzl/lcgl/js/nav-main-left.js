var nav = new Vue({
    el: ".daohang",
    data:function(){
        return {
            data:'',
        }
    },
    mounted: function () {
        this.login();
        this.getUserType();
    },
    methods: {
        //从cookie中获取userType
        getUserType:function(){
            var userType = this.getCookie("userType");
            this.data=userType;
            if(userType=="用户" || userType==""){
                 $(".main-left").html(`
                    <ul>
                        <li><a href="sczp.tpl">上传作品</a></li>
                        <li><a href="Videoteaching.html">了解机器人</a></li>
                        <li><a href="Enrolmentcourses.html">了解课程</a></li>
                        <li><a href="worksshow.html">查看大家作品</a></li>
                        <li><a href="index.html">关注热点</a></li>
                    </ul>
                `)
            }else if(userType=="管理员"){
                $(".main-left").html(`
                    <ul>
                        <li><a href="zuoPinShenHe.html">作品审核</a></li>
                        <li><a href="faBuKeCheng.html">发布课程</a></li>
                        <li><a href="baoMingQingKunag.html">课程报名情况</a></li>
                    </ul>
                `)
  
            }
        },
        //页面跳转时默认进行的登陆操作
        login: function () {
            var userName = this.getCookie("userName");
            var passWord = this.getCookie("passWord");
            var userImage = this.getCookie("userImage");
            var userId = this.getCookie("userId");
            userImage == "" ? userImage = '../../../zhzl/lcgl/images/admin.jpg' : userImage = userImage;
            if (userName != "" && userImage != "") {
                $(".userImage").attr("href","Mymanagement.html");
                $(".username>b>a>img").attr("src",userImage);
                $(".welcome").html(`欢迎${userName}回来`);
                $(".logout").html("退出");
            }

        },
        //获得cookie
        getCookie: function (name) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (arr[0] == name) return arr[1];
            }
            return "";
        },
        //删除cookie
        deleteCookie: function (name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=v; expires=" + date.toGMTString();
        },
        //登出操作
        logout: function () {
           art.dialog({
                    title: '提示信息',
                    content: "您确定要退出吗",
                    width: '15em',
                    height: '50',
                    okVlaue: "确定",
                    ok: function () {
                        this.close();
                        nav.deleteCookie("userName");
                        nav.deleteCookie("passWord");
                        nav.deleteCookie("userImage");
                        nav.deleteCookie("userId");
                        nav.deleteCookie("userType");
                        $(".userImage").attr("href","login.html");
                        $(".username>b>a>img").attr("src","../../../zhzl/lcgl/images/admin.jpg");
                        $(".welcome").html(`欢迎登陆`);
                        $(".logout").html("");
                        nav.getUserType();
                        window.location.href="index.html";
                    }
                });         
        },
    },
})