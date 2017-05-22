 var main = new Vue({
            el: '#main',
            data:{
                row:[
                    ],
                    mc:'',//作品名称
                    js:"",//作品介绍
                    TYPE:"",//作品类型
                    url:"http://localhost:3002",
            },
            methods: {
                //上传作品
                upload:function(){
                    var imgs = $('strong');
                    var userName = this.getCookie("userName");
                    var cookieUserId=this.getCookie("userId");
                    var img=[];
                    var imgUrl="";
                    for(var i=0;i<imgs.length;i++){
                        var url=(i==(imgs.length-1)?("../../../zhzl/lcgl/images/"+imgs[i].textContent):("../../../zhzl/lcgl/images/"+imgs[i].textContent+","));
                        imgUrl=imgUrl+url
                    }
                    if(userName==""){
                        this.dialog("请先登录")
                    }else if(imgUrl==""){
                        this.dialog("请选择上传图片")
                    }else if(this.js=="" || this.mc=="" || this.TYPE==""){
                        this.dialog("请完善作品信息")
                    }else {
                        var self=this;
                        $.ajax({
                            url:this.url+"/byks/upload", //上传作品页面
                            type:"post",
                            data:{
                                utterer:userName,
                                worksName:this.mc,
                                worksType:this.TYPE,
                                likeTime:0,
                                worksIntro:this.js,
                                worksImages:imgUrl,

                            },
                            success:function(res){
                                if(res.success){
                                    $.ajax({
                                        url:"http://localhost:3002/byks/uploadByUser",//上传页面 将作品Id保存到我的管理数据库
                                        type:"post",
                                        data:{
                                            userId:cookieUserId,
                                            manageType:"上传",
                                            zpId:res.data.zpId,
                                        },
                                        success:function(res){
                                            if(res.success){
                                                main.dialog("上传成功")
                                            }
                                        }.bind(self),
                                        error:function(res){
                                            main.dialog("系统繁忙")
                                        }.bind(self),
                                    })
                                    
                                }
                            }.bind(self),
                            error:function(){
                                this.dialog('上传是失败')
                            }.bind(self)
                        })
                    }
                    
                },
                getType:function(type){
                    this.TYPE=type;
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
                 //提示框
                dialog:function(ts){
                    art.dialog({
                    title:'上传信息',
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
        