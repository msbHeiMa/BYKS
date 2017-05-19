        Vue.component('byks-zuopin', {
            template: `
                <div>
                    <div class="button-group">
						<button type="button" class="button button-pill button-action" v-for="item in type" @click="change(item)">{{item}}</button>
					</div>
                     <div class="media" v-for="(rowone,index) in row">
						<div class="media-left">
							<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
								<div class="carousel-inner" role="listbox">
									<div :class="{item:true,active:indextwo==0?true:false}" v-for="(rowimage,indextwo) in rowone.images">
										<a href="javascript:void(0)">
											<img :src="rowimage">
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="media-body">
							<h4 class="media-heading">发表人:<span>{{rowone.utterer}}</span></h4>
							<div class="media-body-top">
								<p>发表时间:<span>{{rowone.createDate}}</span></p>
								<p>作品名称:<span>{{rowone.worksName}}</span></p>
							</div>
							<div class="media-body-mid">
								<p>作品类型:<span>{{rowone.worksType}}</span></p>
								<p>点赞次数:<span>{{rowone.likeTime}}</span></p>
							</div>

							<p>内容介绍:<span>{{rowone.worksIntro}}</span></p>
							<div>
								<a href="javascript:void(0)" class="button button-glow button-rounded button-royal" @click="like(index)">点赞</a>
								<a :href="\'worksdetail.html?id=\'+rowone.id" class="button button-glow button-rounded button-highlight">评论</a>
							</div>
						</div>
					</div>
                </div> 	
                   
					`,
            props: {
                data: Array,
                row:Array,
                type:Array,
            },
            
            methods: {
                //点击不同类型查询不同类型作品
                change:function(type){
                    alert(type)
                },
                //点赞功能
                like:function(index){
                  //获取作品id和用户ID
                  var zpId=main.row[index].id;
                  var cookieUserId=main.getCookie("userId");
                  var cookieUserName=main.getCookie("userName");
                  var cookiePassWord=main.getCookie("passWord");
                //   var likeTime=parseInt(main.row[index].likeTime)+1;
                  //点赞记录请求
                  if(cookieUserName==""||cookiePassWord==""||cookieUserId==""){
                      main.dialog("请先登陆")
                  }else{
                      $.ajax({
                        url:"http://localhost:3002/byks/getDianZan",
                        data:{
                            zpId:zpId,
                            userId:cookieUserId,
                            // likeTime:likeTime,
                        },
                        type:"post",
                        success:function(res){
                            if(res.success==1&&res.data.zhuangtai=="可赞"){
                                 main.dialog("点赞成功")
                                //  main.row[index].likeTime=parseInt(main.row[index].likeTime)+1;
                                main.row[index].likeTime=res.data.likeTime;
                            }else if(res.success==1&&res.data=="您已经赞过了"){
                                main.dialog("您已经赞过了")
                            }
                           
                        },
                        error:function(res){
                            main.dialog("系统繁忙请稍后再试")
                        },
                    })
                  }
                },
                
            },
            
        })
        var url="http://localhost:3002";
        var main = new Vue({
            el: '#main',
            data:{
                row:[],
                type:["全部类型","积木类型","变形金刚","星际争霸","其他类型",],
            },
            beforeCreate:function(){
                //作品展示页面 获取作品信息接口
                $.ajax({
                    url:url+"/byks/getAllZP",  
                    type: "get",
                    success: function(res){
                        main.row=res.data
                        for(var i=0;i<res.data.length;i++){
                            var IMAGES=[];
                            IMAGES=res.data[i].worksImages.split(','); 
                            main.row[i].images=IMAGES;
                        }
                    },
                    error:function(){},
                });
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
        