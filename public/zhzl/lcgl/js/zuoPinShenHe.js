var url="http://localhost:3002";
       //管理员后台页面 作品审核组件
        Vue.component('byks-zpsh', {
            template: `
                          <div v-if="type==='待办'" role="tabpanel" class="tab-pane active" id="home">  	
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="success">
                                            <th>序号</th>
                                            <th>上传人</th>
                                            <th>作品名称</th>
                                            <th>作品类型</th>
                                            <th>上传时间</th>
                                            <th>操作</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr v-for="(item,index) in row" :class="isHaveClass(index)">
                                            <td >{{index+1}}</td>
                                            <td >{{item.utterer}}</td>
                                            <td >{{item.worksName}}</td>
                                            <td >{{item.worksType}}</td>
                                            <td >{{item.createDate}}</td>
                                            <td >
                                                <a class="xq"  @click="xiangQing(item)" data-toggle="modal" data-target="#myModalzs">详情</a>
                                                <a class="tg " @click="tongguo(item)">通过</a>
                                                <a class="wtg" @click="weitongguo(item,index)" data-toggle="modal" data-target=".bs-example-modal-sm">未通过</a>
                                            </td>
                                        </tr>
                                    </tbody>      
                                </table>			
                          </div>
                          <div v-else-if="type==='通过'" role="tabpanel" class="tab-pane" id="profile">  	
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="success">
                                            <th>序号</th>
                                            <th>上传人</th>
                                            <th>作品名称</th>
                                            <th>作品类型</th>
                                            <th>上传时间</th>
                                            <th>审核人</th>
                                            <th>审核时间</th>
                                            <th>操作</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr v-for="(item,index) in row" :class="isHaveClass(index)">
                                            <td >{{index+1}}</td>
                                            <td >{{item.utterer}}</td>
                                            <td >{{item.worksName}}</td>
                                            <td >{{item.worksType}}</td>
                                            <td >{{item.createDate}}</td>
                                            <td >{{item.shr}}</td>
                                            <td >{{item.shDate}}</td>
                                            <td >
                                                <a class="xq"  @click="xiangQing(item)" data-toggle="modal" data-target="#myModalzs">详情</a>
                                                <a class="wtg" @click="shanchu(item.id,index)">删除</a>
                                            </td>
                                        </tr>
                                    </tbody>      
                                </table>			
                          </div>
                          <div v-else-if="type==='未通过'"  role="tabpanel" class="tab-pane" id="messages">  	
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="success">
                                            <th>序号</th>
                                            <th>上传人</th>
                                            <th>作品名称</th>
                                            <th>作品类型</th>
                                            <th>上传时间</th>
                                            <th>审核人</th>
                                            <th>审核时间</th>
                                            <th>未通过原因</th>
                                            <th>操作</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr v-for="(item,index) in row" :class="isHaveClass(index)">
                                            <td >{{index+1}}</td>
                                            <td >{{item.utterer}}</td>
                                            <td >{{item.worksName}}</td>
                                            <td >{{item.worksType}}</td>
                                            <td >{{item.createDate}}</td>
                                            <td >{{item.shr}}</td>
                                            <td >{{item.shDate}}</td>
                                            <td >{{item.wtgyy}}</td>
                                            <td >
                                                <a class="xq"  @click="xiangQing(item,index)" data-toggle="modal" data-target="#myModalzs">详情</a>
                                            </td>
                                        </tr>
                                    </tbody>      
                                </table>			
                          </div>
                 
					
                    `,
            props: {
                data: Array,
                row:Array,
                type:String,
            },
            mounted:function(){
                
            },
            methods: {
                //根据索引判断需要添加的class
                isHaveClass:function(index){
                    var data=index%2;
                    if(data==0){
                        var cls='active';
                    }else{
                        var cls="info";
                    }
                    return cls;
                },
                //查看作品详情
                xiangQing:function(item){
                    main.zstanchu=item;
                    if(typeof(item.worksImages)=="string"){
                        var IMAGES=item.worksImages.split(','); 
                        main.zstanchu.worksImages=IMAGES;
                    }
                    
                },
                //待办标签页 通过操作
                tongguo:function(item,index){
                    var self=this;
                    main.getUser();
                    if(main.userType!="管理员"){
                        main.dialog("您没有权限进行此操作")
                    }else{
                         $.ajax({
                            url:url+"/byks/shenHeTongGuo",
                            type:"post",
                            data:{
                                id:item.id,
                                status:"通过",
                                shr:main.userName,
                                shDate:"",
                            },
                            success:function(res){
                                if(res.success){
                                    main.dialog("审核成功您以通过该作品")
                                    main.row.splice(index,1)
                                }
                            }.bind(self),
                            error:function(res){
                               
                            }.bind(self)
                        })
                    }
                   
                },
                //待办标签页 未通过操作
                weitongguo:function(item,index){
                    main.wtgsj.id=item.id;
                    main.wtgsj.index=index;
                },
                //通过标签页 删除操作 （此操作只是把作品的状态改为非通过状态并不是真的将该条作品信息从数据库删除  只有用户可以从数据库中直接删除自己的作品）
                shanchu:function(id,index){
                    var self=this;
                    main.getUser();
                    if(main.userType!="管理员"){
                        main.dialog("您没有权限进行此操作")
                    }else{
                         $.ajax({
                            url:url+"/byks/shenHeShanChu",
                            type:"post",
                            data:{
                                id:id,
                                status:"违规下架",
                            },
                            success:function(res){
                                if(res.success){
                                    main.dialog("该作品已在作品展示中去除")
                                    main.row.splice(index,1)
                                }
                            }.bind(self),
                            error:function(res){
                            
                            }.bind(self)
                        })
                    }
                },
            },
            
        })
        //详细按钮 作品详细组件
         Vue.component('byks-zptc', {
            template: `
                    <div class="modal fade" id="myModalzs" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">作品详情</h4>
							</div>
							<div class="modal-body ">
								<div class="row">
                                        <span  class="input-group-addon span-top">作品图片展示</span>
                                        <div class="col-xs-6 col-md-3" v-for="img in zstanchu.worksImages">
                                            <img :src="img" class="images">
                                        </div>
                                </div>
                                <div class="input-group"><span  class="input-group-addon">上传人</span> <input readOnly="true"  :placeholder="zstanchu.utterer" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">作品名称</span> <input readOnly="true"  :placeholder="zstanchu.worksName" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">作品类型</span> <input readOnly="true"  :placeholder="zstanchu.worksType" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">点赞次数</span> <input readOnly="true"  :placeholder="zstanchu.likeTime" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">上传时间</span> <input readOnly="true"  :placeholder="zstanchu.createDate" class="form-control"></div>
                                <div class="input-group"><span  class="jieshao input-group-addon">内容介绍</span> <textarea class="zstextarea" readOnly="true">{{zstanchu.worksIntro}}</textarea>
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
                zstanchu:Object,
            },
            
            methods: {
     
            },
            
        })
         var main = new Vue({
            el: '#main',
            data:{
                row:[],//待办 通过 未通过 数据所用数组
                zstanchu:{},//作品详情所用数据对象
                type:"待办",
                userName:"",
                userType:"",
                userId:"",
                wtgsj:{
                    id:'',
                    index:"",
                    wtgyy:"",
                },//未通过数据对象
            },
            mounted: function () {
                this.getUser();
                this.load('待办');
            },
            methods: {
                //待办标签页 未通过操作(填完未通过原因后最后执行的函数)
                tijiaowtg:function(){
                    var self=this;
                    this.getUser();
                    if(this.userType!="管理员"){
                        this.dialog("您没有权限进行此操作")
                    }else{
                        $.ajax({
                            url:url+"/byks/shenHeWeiTongGuo",
                            type:"post",
                            data:{
                                id:this.wtgsj.id,
                                status:"未通过",
                                shr:this.userName,
                                shDate:"",
                                wtgyy:this.wtgsj.wtgyy,
                            },
                            success:function(res){
                                if(res.success){
                                    this.dialog("审核成功，该作品未通过审核")
                                    this.row.splice(this.wtgsj.index,1)
                                }
                            }.bind(self),
                            error:function(res){

                            }.bind(self)
                        })
                    }
                },
                //查询 各状态作品数据
                load:function(type){
                    var self=this;
                   $.ajax({
                       url:url+"/byks/shenHeByStatus",
                       type:"post",
                       data:{
                           status:type
                       },
                       success:function(res){
                           this.row=res.data;
                       }.bind(self),
                       error:function(res){

                       }.bind(self),
                   })
                },
                //点击不同标签页时
                lunhuan:function(type){
                    this.type=type
                    this.load(type);
                },
                //获取用户信息
                getUser:function(){
                    var cookieUserId=this.getCookie("userId");
                    this.userId=cookieUserId;
                    var cookieuserName=this.getCookie("userName");
                    this.userName=cookieuserName;
                    var cookieuserType=this.getCookie("userType");
                    this.userType=cookieuserType;
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
        