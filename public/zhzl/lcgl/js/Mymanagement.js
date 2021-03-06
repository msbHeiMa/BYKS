var url="http://localhost:3002";
        //我的上传部分组件
        Vue.component('byks-shangchuan', {
            template: `
                   <div role="tabpanel" class="tab-pane active" id="home">
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
                                <div class="shenhe">
                                    <p>作品状态:<span>{{rowone.status}}</span></p>
                                    <p v-if="rowone.status==='未通过'">未通过原因:<span>{{rowone.wtgyy}}</span></p>
                                </div>
                                <div v-if="rowone.status=='通过'">
                                    <button class="button button-glow button-rounded button-caution" @click="shanchu(rowone.zpId,index)">删除作品</button>
                                    <a :href="\'worksdetail.html?id=\'+rowone.zpId" class="button button-glow button-rounded button-highlight">查看评论</a>
                                </div>
                                <div v-else>
                                    <button class="button button-glow button-rounded button-caution" @click="shanchu(rowone.zpId,index)">删除作品</button>
                                </div>
                            </div>
                        </div>				
				   </div>
                   
					`,
            props: {
                data: Array,
                row:Array,
            },
            
            methods: {
                //删除
                shanchu:function(zpId,index){
                    var self=this;
                    main.getUserId();
                    if(main.userId!=""){
                        alert("确定删除吗，删除后无法找回")
                         $.ajax({
                            url:url+"/byks/deleteZp?zpId="+zpId,
                            type:"get",
                            success:function(res){
                                if(res.success){
                                    main.dialog("删除成功")
                                    main.row.splice(index,1)
                                }
                            }.bind(self),
                            error:function(res){
                                main.dialog("系统繁忙请稍后再试")
                            }.bind(self),
                        })
                    }else{
                        main.dialog("请先登录")
                    }                   
                },
            },
            
        })
        //报名课程组件
         Vue.component('byks-baoming', {
            template: `
                            <div role="tabpanel" class="tab-pane" id="profile">
								<div class="row">
									<div class="col-sm-6 col-md-4" v-for="(rowone,index) in row">
										<div class="thumbnail">
											<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
												<div class="carousel-inner" role="listbox">
													<div :class="{item:true,active:indextwo==0?true:false}" v-for="(rowimage,indextwo) in rowone.images">
														<img :src="rowimage">
												    </div>
												</div>
											</div>
											<div class="caption">
												<h4>{{rowone.courseName}}</h4>
												<p>适合人群:{{rowone.crowd}}</p>
												<p>课时：{{rowone.keShi}}</p>
												<p>
													<button  class="button button-action  button-pill button-jumbo button-small" role="button" @click="anpai(rowone.kcId,rowone.id)" data-toggle="modal" data-target="#myModal">课程安排</button>
													<a href="javascript:void(0)" class="button button-caution button-pill button-jumbo button-small" role="button" @click="quxiao(rowone.id,index)">取消报名</a>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>         
					  `,
            props: {
                data: Array,
                row:Array,
            },
            
            methods: {
                //课程安排
                anpai:function(kcId,id){
                    var self=this;
                    $.ajax({
                        url:url+"/byks/getKcDetailByKcId?kcId="+kcId,
                        type:"get",
                        success:function(res){
                            main.rowtanchu=res.data;
                            main.rowtanchu.pzId=id;
                        }.bind(self),
                        error:function(res){}.bind(self),
                    })
                },
                //取消报名
                quxiao:function(id,index){
                    var self=this;
                    main.getUserId();
                    if(main.userId!=""){
                        $.ajax({
                            url:url+"/byks/quXiaoBaoMingKc?id="+id,
                            type:"get",
                            success:function(res){
                                if(res.success){
                                    main.dialog("取消成功");
                                    main.row.splice(index,1);
                                }
                            }.bind(self),
                            error:function(res){
                                main.dialog("系统繁忙请稍后再试")
                            }.bind(self),
                        })
                    }else{
                        main.dialog("请先登录")
                    }
                },
            },
            
        })
        //我的关注部分组件
        Vue.component('byks-guanzhu', {
            template: `
                            <div role="tabpanel" class="tab-pane" id="messages">
								<div class="row" >
									<div class="col-sm-6 col-md-4" v-for="(rowone,index) in row">
										<div class="thumbnail">
											<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
												<div class="carousel-inner" role="listbox">
													<div :class="{item:true,active:indextwo==0?true:false}" v-for="(rowimage,indextwo) in rowone.images">
														<img :src="rowimage">
												    </div>
												</div>
											</div>
											<div class="caption">
												<h4>{{rowone.courseName}}</h4>
												<p>适合人群:{{rowone.crowd}}</p>
												<p>课时：{{rowone.keShi}}</p>
												<p>
													<a href="javascript:void(0)" class="button button-highlight  button-pill button-jumbo button-small" role="button" @click="bmKeCheng(rowone.id,rowone.kcId)">报名课程</a>
													<a href="javascript:void(0)" class="button button-caution button-pill button-jumbo button-small" role="button" @click="qxGuanZhu(rowone.id,index)">取消关注</a>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
                   
					`,
            props: {
                data: Array,
                row:Array,
            },
            
            methods: {
               //报名课程
               bmKeCheng:function(id,kcId){
                    var self=this;
                    main.getUserId();
                    if(main.userId!=""){
                        $.ajax({
                            url:url+"/byks/baoMingKc",
                            type:"post",
                            data:{
                                id:id,
                                kcId:kcId,
                                userId:main.userId,
                            },
                            success:function(res){
                                if(res.success){
                                    main.dialog(res.data.back);
                                }
                            }.bind(self),
                            error:function(res){}.bind(self),
                        })
                    }else{
                        main.dialog("请先登录")
                    }
               },
               //取消关注
               qxGuanZhu:function(id,index){
                   var self=this;
                    main.getUserId();
                    if(main.userId!=""){
                         $.ajax({
                            url:url+"/byks/quXiaoGuanZhuKc?id="+id,
                            type:"get",
                            success:function(res){
                                if(res.success){
                                    main.dialog("取消成功");
                                    main.row.splice(index,1)
                                }
                            }.bind(self),
                            error:function(res){}.bind(self),
                        })
                    }else{
                        main.dialog("请先登录")
                    }
               }
            },
            
        })
        //报名课程 课程安排组件
        Vue.component('byks-tanchu', {
            template: `
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">课程详情</h4>
							</div>
							<div class="modal-body ">
								<div class="input-group"><span id="basic-addon1" class="input-group-addon">上课地点</span> <input readOnly="true"  :placeholder="rowtanchu.skAdderss" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">上课时间</span> <input readOnly="true"  :placeholder="rowtanchu.skTime" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">报名费</span> <input readOnly="true"  :placeholder="rowtanchu.money" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">上课导师</span> <input readOnly="true"  :placeholder="rowtanchu.skDs" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">导师电话</span> <input readOnly="true"  :placeholder="rowtanchu.skDsTel" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">课程负责人</span> <input readOnly="true"  :placeholder="rowtanchu.kcFzr" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">负责人电话</span> <input readOnly="true"  :placeholder="rowtanchu.kcFzrTel" class="form-control"></div>
                                <div class="input-group"><span id="basic-addon1" class="input-group-addon">报名凭证号</span> <input readOnly="true"  :placeholder="rowtanchu.pzId" class="form-control"></div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							</div>
							</div>
						</div>
				     </div>
                   
					`,
            props: {
                data: Array,
                rowtanchu:Object,
            },
            
            methods: {
     
            },
            
        })
        //上传头像
        Vue.component('byks-sctx', {
            template: `
                    <div role="tabpanel" class="tab-pane" id="touxiang">
                        <div class="shangchuan">
                            <div class="upload_box">
                                <div class="upload_main">
                                    <div class="upload_choose">
                                        <input id="fileImage" class="fileupload" type="file" size="30" name="fileselect[]" multiple />
                                        <span id="fileDragArea" class="upload_drag_area">或者将图片拖到此处</span>
                                    </div>
                                    <div id="preview" class="upload_preview"></div>
                                </div>
                                <div id="uploadInf" class="upload_inf"></div>
                            </div>
                        </div>
                        <div>
                            <button type="button" id="fileSubmit" class="upload_submit_btn button button-glow button-rounded button-royal" @click="sctx()">上传头像</button>
                        </div>
                    </div>  
                   
					`,
            props: {
             
            },
            
            methods: {
                sctx:function(){
                    var img=$("strong").html();
                    var userImage = this.getCookie("userImage");
                    var userId = this.getCookie("userId");
                    var imgurl="../../../zhzl/lcgl/images/"+img;
                    var self=this;
                    $.ajax({
                        url:url+"/byks/changUserImage",
                        type:"post",
                        data:{
                            userId:userId,
                            userImage:imgurl,
                        },
                        success:function(res){
                            if(res.success){
                                main.dialog("上传成功")
                                this.deleteCookie(userImage);
                                document.cookie=`userImage=${imgurl};`;
                                $(".username>b>a>img").attr("src",imgurl);
                            }
                        }.bind(self),
                        error:function(req){
                            main.dialog("上传失败")
                        }.bind(self),
                    })
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
            },
            
        })
         var main = new Vue({
            el: '#main',
            data:{
                row:[],
                rowtanchu:{},
                userId:"",
            },
            mounted: function () {
                this.getUserId();
                this.load('上传');
            },
            methods: {
                load:function(type){
                    //我的管理页面 上传作品报名关注课程接口
                    if(this.userId!=""){
                         $.ajax({
                            url:url+"/byks/getManagement",  
                            type: "post",
                            data:{
                                userId:this.userId,
                                manageType:type,
                            },
                            success: function(res){
                                main.row=res.data
                                for(var i=0;i<res.data.length;i++){
                                    var IMAGES=[];
                                    IMAGES=(res.data[i].worksImages==null?res.data[i].kcImages.split(','):res.data[i].worksImages.split(',')); 
                                    main.row[i].images=IMAGES;
                                }
                            },
                            error:function(){},
                        });
                    }
                },
                //点击不同标签页时
                lunhuan:function(type){
                    this.load(type);
                },
                //获取userId
                getUserId:function(){
                    var cookieUserId=this.getCookie("userId");
                    var cookieUserName=this.getCookie("userName");
                    this.userId=cookieUserId;
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
                    title:'管理信息',
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
        