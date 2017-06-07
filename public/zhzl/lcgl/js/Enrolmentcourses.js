       //课程介绍组件
        Vue.component('byks-kecheng', {
            template: `
                    <div class="row">
                        <div class="col-sm-6 col-md-4" v-for="entry in row">
                            <div class="thumbnail">
                                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner" role="listbox">
                                        <div v-for="(col,index) in entry.images" :class="{item:true,active:index==0?true:false}">
                                            <img :src="col">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="caption" >
                                    <h4>{{entry.courseName}}</h4>
                                    <p>适合人群:{{entry.crowd}}</p>
                                    <p>课时：{{entry.keShi}}</p>
                                    <p>
                                        <a href="javascript:void(0)" class="button button-raised button-primary button-pill" role="button" @click="baoming(entry.ID)">报名</a>
                                        <a href="javascript:void(0)" class="button button-raised button-default button-pill" role="button" @click="guanzhu(entry.ID)">关注</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`,
            props: {
                data: Array,
                row:Array,
            },
            mounted: function () {
                var cookieUserId=this.getCookie("userId");
                var cookieUserName=this.getCookie("userName");
                var cookieUserType=this.getCookie("userType");
                this.userId=cookieUserId;
                this.userType=cookieUserType;
            },
            methods: {
                //报名
                baoming:function(kcId){
                    var self=this;
                    if(this.userId==""){
                        this.dialog("请先登录")
                    }else if(this.userType=="管理员"){
                        this.dialog("管理员无法进行此操作")
                    }else{
                         $.ajax({
                            url:"http://localhost:3002/byks/uploadByUser",//上传页面 将作品Id保存到我的管理数据库
                            type:"post",
                            data:{
                                userId:this.userId,
                                manageType:"报名",
                                kcId:kcId,
                            },
                            success:function(res){
                                if(res.success){
                                    this.dialog(res.data.back)
                                }
                            }.bind(self),
                            error:function(res){
                                this.dialog("系统繁忙请稍后再试")
                            }.bind(self),
                        })
                    }
                   
                },
                //关注
                guanzhu:function(kcId){
                     var self=this;
                    if(this.userId==""){
                        this.dialog("请先登录")
                    }else if(this.userType=="管理员"){
                        this.dialog("管理员无法进行此操作")
                    }else{
                         $.ajax({
                            url:"http://localhost:3002/byks/uploadByUser",//上传页面 将作品Id保存到我的管理数据库
                            type:"post",
                            data:{
                                userId:this.userId,
                                manageType:"关注",
                                kcId:kcId,
                            },
                            success:function(res){
                                if(res.success){
                                    this.dialog(res.data.back)
                                }
                            }.bind(self),
                            error:function(res){
                                this.dialog("系统繁忙请稍后再试")
                            }.bind(self),
                        })
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
                 //提示框
                dialog:function(ts){
                    art.dialog({
                    title:'报名课程',
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
            
        })
        var url="http://localhost:3002";
        var main = new Vue({
            el: '.main-right-mid',
            data:{
                row:[
                      
                    ]
            },
            beforeCreate:function(){
                $.ajax({
                url:url+"/byks/getAllCourse",  
                type: "get",
                success: function(res){
                    main.row=res.data
                    for(var i=0;i<res.data.length;i++){
                        var IMAGES=[];
                        IMAGES=res.data[i].kcImages.split(','); 
                        main.row[i].images=IMAGES;
                    }
                },
                error:function(){},
                });
            },
            mounted: function () {

            },
            methods: {

            },
            
        });
        