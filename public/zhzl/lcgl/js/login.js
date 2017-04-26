var main = new Vue({
    el: '#main',
    data: {
        userData: [{userName: "",passWord: "",}],
        zhuceDate:[{
            inputUserName:"",
            inputPassWord:"",
            passWordAgain:"",
        }],
        url:"http://localhost:3002",
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
            //获取输入框内输入的用户数据
            var userName=this.userData.userName;
            var passWord=this.userData.passWord;
            //获取Cookie内储存的用户数据用来进行判断
            var cookieUserName=this.getCookie("userName");
            var cookiePassWord=this.getCookie("passWord");
            var cookieUserId=this.getCookie("userId");
            //当本地的Cookie没有用户信息时才发出请求
            if(cookieUserName==""&&cookiePassWord==""){
                $.ajax({
                    url:this.url+"/byks/login",  
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
                                    document.cookie=`userId=${res.data.id};`;
                                    document.cookie=`userName=${res.data.userName};`;
                                    document.cookie=`passWord=${res.data.passWord};`;
                                    document.cookie=`userImage=${res.data.userImage};`;
                                }
                            });
                        
                        }else if(res.success==1&&res.data==null){
                            main.dialog("用户名或密码错误")
                        }
                    
                    },
                    error:function(res){
                        main.dialog("登陆失败")
                    },
                });
            //验证是否已经登陆还要重复登陆
            }else if(cookieUserName!=""&&cookiePassWord!=""&&cookieUserName==userName&&cookiePassWord==passWord){
                main.dialog("用户已登陆请勿重复操作")
            //验证是否已登陆还想要登陆其他账号
            }else{
                main.dialog("请先退出当前登陆")
            }
            
        },
        //注册操作
        zhuce:function(){
            //获取输入框中的注册信息
            inputUserName=this.zhuceDate.inputUserName;
            inputPassWord=this.zhuceDate.inputPassWord;
            passWordAgain=this.zhuceDate.passWordAgain;
            //获得cookie信息方便判断
            var cookieUserName=this.getCookie("userName");
            var cookiePassWord=this.getCookie("passWord");
            var cookieUserId=this.getCookie("userId");
            //两次密码输入不一样的情况
            if(inputPassWord!=passWordAgain){
                main.dialog("两次输入密码不同")
            //在登陆的状态下进行注册时
            }else if(cookieUserName!="" || cookiePassWord!=""){
                main.dialog("请先退出当前登陆在注册")
            //注册信息填写不完整时
            }else if(inputUserName==undefined || inputPassWord==undefined){
                main.dialog("缺少用户名或密码")
            }else{
                //注册请求接口
                $.ajax({
                    url:this.url+"/byks/zhuce",
                    data:{
                        userName:inputUserName,
                        passWord:inputPassWord,
                        userImage:'../../../zhzl/lcgl/images/admin.jpg',
                    },
                    type:"post",
                    success:function(res){
                        if(res.data=="用户已存在"){
                            main.dialog("用户已存在")
                        }else if(res.success==1){
                            art.dialog({
                                title:'登录信息',
                                content:"恭喜您注册成功",
                                width:'15em',
                                height:'50',
                                okVlaue:"确定",
                                ok: function () {
                                    this.close()
                                    var userImage='../../../zhzl/lcgl/images/admin.jpg';
                                    $(".userImage").attr("href","Mymanagement.html");
                                    $(".username>b>a>img").attr("src",userImage);
                                    $(".welcome").html(`欢迎${inputUserName}回来`);
                                    $(".logout").html("退出");
                                    //将用户信息存入cookie中
                                    document.cookie=`userId=${res.data};`;
                                    document.cookie=`userName=${inputUserName};`;
                                    document.cookie=`passWord=${inputPassWord};`;
                                    document.cookie=`userImage=${userImage};`;
                                }
                            });
                        }
                    },
                    error:function(res){
                        main.dialog("注册失败")
                    },
                })
            }
        },
        //弹出框
        dialog:function(ts){
            art.dialog({
                title:'登录信息',
                content:ts,
                okVlaue:"确定",
                width:'15em',
                height:'50',
                ok: function () {
                    this.close()
                }
            });
        },    
    },

});