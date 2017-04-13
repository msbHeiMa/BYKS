var main = new Vue({
    el: '#main',
    data: {
        userData: [{userName: "",passWord: "",}]
    },
    mounted: function () {

    },
    methods: {
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
        //登陆操作
        login: function () {
            var url="http://localhost:3002";
            //获取输入框内输入的用户数据
            var userName=this.userData.userName;
            var passWord=this.userData.passWord;
            //获取Cookie内储存的用户数据用来进行判断
            var cookieUserName=this.getCookie("userName");
            var cookiePassWord=this.getCookie("passWord");
            //当本地的Cookie没有用户信息时才发出请求
            if(cookieUserName==""&&cookiePassWord==""){
                $.ajax({
                    url:url+"/byks/login",  
                    type: "post",
                    data:{
                        userName:userName,
                        passWord:passWord,
                    },
                    success: function(res){
                        if(res.success==1&&res.data!=null){
                            art.dialog({
                                title:'登录信息',
                                content:res.data.userName+"欢迎您回来",
                                width:'15em',
                                height:'50',
                                okVlaue:"确定",
                                ok: function () {
                                    this.close()
                                    res.data.userImage==null?res.data.userImage='../../../zhzl/lcgl/images/admin.jpg':res.data.userImage=res.data.userImage;
                                    $(".userImage").attr("href","Mymanagement.html");
                                    $(".username>b>a>img").attr("src",res.data.userImage);
                                    $(".welcome").html(`欢迎${res.data.userName}回来`);
                                    $(".logout").html("退出");
                                    //将用户信息存入cookie中
                                    document.cookie=`userName=${res.data.userName};`;
                                    document.cookie=`passWord=${res.data.passWord};`;
                                    document.cookie=`userImage=${res.data.userImage};`;
                                }
                            });
                        
                        }else if(res.success==1&&res.data==null){
                            art.dialog({
                                title:'登录信息',
                                content:'用户名或密码错误',
                                okVlaue:"确定",
                                width:'15em',
                                height:'50',
                                ok: function () {
                                    this.close()
                                }
                            });
                        }
                    
                    },
                    error:function(res){
                        art.dialog({
                            title:'登录信息',
                            content:'登陆失败',
                            okVlaue:"确定",
                            width:'15em',
                            height:'50',
                            ok: function () {
                                this.close()
                            }
                        });
                    },
                });
            //验证是否已经登陆还要重复登陆
            }else if(cookieUserName!=""&&cookiePassWord!=""&&cookieUserName==userName&&cookiePassWord==passWord){
                art.dialog({
                    title:'登录信息',
                    content:'用户已登陆请勿重复操作',
                    okVlaue:"确定",
                    width:'15em',
                    height:'50',
                    ok: function () {
                        this.close()
                    }
                });
            //验证是否已登陆还想要登陆其他账号
            }else{
                art.dialog({
                    title:'登录信息',
                    content:'请先退出当前登陆',
                    okVlaue:"确定",
                    width:'15em',
                    height:'50',
                    ok: function () {
                        this.close()
                    }
                });
            }
            
        }
    },

});