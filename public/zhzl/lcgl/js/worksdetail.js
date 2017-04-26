//作品详情组件
Vue.component('byks-zpdetail', {
            template: `
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">作品图片</a>
                                </h4>
                            </div>
                            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-xs-6 col-md-2" v-for="image in row.images">
                                            <a href="#" class="thumbnail"  @click="show(image)" data-toggle="modal" data-target="#myModal">
                                                <img class="images" :src="image">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwo">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true"
                                        aria-controls="collapseTwo">作品内容简介</a>
                                </h4>
                            </div>
                            <div id="collapseTwo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="panel-body">
                                    <div class="border-left-biaoti">
                                        <h5>作者介绍</h5>
                                    </div>
                                    <div class="jieshao">
                                        <span class="biaoti">作者名称</span><span class="content-left">{{row.utterer}}</span>
                                    </div>
                                    <div class="border-left-biaoti">
                                        <h5>作品介绍</h5>
                                    </div>
                                    <div class="jieshao">
                                        <p>
                                            <span class="biaoti">作品类型</span><span class="content-left">{{row.worksType}}</span>
                                        </p>
                                        <p>
                                            <span class="biaoti">目前点赞</span><span class="content-left">{{row.likeTime}}</span>次
                                        </p>
                                        <p>
                                            <span class="biaoti">发表时间</span><span class="content-left">{{row.fbTime}}</span>
                                        </p>
                                        <p>
                                            <span class="biaoti">内容介绍</span><span class="content-left">{{row.worksIntro}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
					`,
            props:["row"],
            methods: {
               show:function(image){
                    $(".model_img").attr("src",image);
                },
                
            },
            
})
//评论区域组件
Vue.component('byks-pinglun', {
            template: `
                    <div v-if="pinglun.length==0">
                        <div class="nopinglun">
                            暂时还没有评论
                        </div>
                    </div>
                    <div v-else>
                        <div class="pinglun" v-for="item in pinglun">
                            <div class="pinglun-top">
                                <a href="javascript:void(0)">
                                    <img :src="item.userImage">
                                </a>
                                <h6>{{item.plrName}}</h6>
                                <span>{{item.createDate}}</span>
                            </div>
                            <div class="pinglun-bottom">
                                <p>{{item.plContant}}</p>
                            </div>
                        </div>
                    </div>
					`,
            props:["pinglun"],
            methods: {
                baoming:function(){

                },
                guanzhu:function(){
                  
                },
                
            },
            
})
var main = new Vue({
            el: '#main',
            data:function(){
                return {
                    row:{},
                    pinglun:[],
                    url:"http://localhost:3002",
                    textarea:"",
                }
            },
            beforeCreate:function(){
                var url = window.location.search;
                id = url.substring(url.lastIndexOf('=')+1, url.length);
                //获取作品详情信息
                 $.ajax({
                        url:"http://localhost:3002/byks/getZPById?id="+id,  
                        type: "get",
                        success: function(res){
                            main.row=res.data;
                            IMAGES=res.data.worksImages.split(','); 
                            main.row.images=IMAGES;
                        },
                        error:function(){},
                });
                //获取评论信息
                $.ajax({
                    url:"http://localhost:3002/byks/getPingLun?id="+id,
                    type:"get",
                    success:function(res){
                        main.pinglun=res.data;
                    },
                    error:function(){},
                })
            },
            mounted: function () {
                //获得页面传过来的ID
                var url = window.location.search;
                this.id = url.substring(url.lastIndexOf('=')+1, url.length);
            },
            methods: {
                //返回上一页
                back:function(){
                    window.history.back(-1);
                },
                getPingLun:function(){
                     $.ajax({
                        url:"http://localhost:3002/byks/getPingLun?id="+id,
                        type:"get",
                        success:function(res){
                            main.pinglun=res.data;
                        },
                        error:function(){},
                    })
                },
                //保存要发表评论
                save:function(){
                    var cookieUserName=this.getCookie("userName");
                    var cookiePassWord=this.getCookie("passWord");
                    var cookieUserId=this.getCookie("userId");
                    if(cookieUserName==""||cookiePassWord==""||cookieUserId==""){
                        this.dialog("请先登陆")
                    }else if(this.textarea==""){
                        this.dialog("发表内容不能为空")
                    }else{
                        $.ajax({
                            url:main.url+"/byks/savePingLun",
                            type:"post",
                            data:{
                                plrName:cookieUserName,
                                plContant:main.textarea,
                                zpId:main.id,
                            },
                            success:function(res){
                                if(res.success==1){
                                    main.dialog("发表成功");
                                    main.getPingLun();
                                }
                            },
                            error:function(res){

                            }
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
                    title:'作品信息',
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