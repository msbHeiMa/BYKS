     
   
        Vue.component('byks-yifabu', {
            template: `
                        <div role="tabpanel" class="tab-pane active" id="home">  	
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="success">
                                            <th>序号</th>
                                            <th>课程名称</th>
                                            <th>适合人群</th>
                                            <th>课程课时</th>
                                            <th>发布时间</th>
                                            <th>操作</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr v-for="(item,index) in row" :class="isHaveClass(index)">
                                            <td >{{index+1}}</td>
                                            <td >{{item.courseName}}</td>
                                            <td >{{item.crowd}}</td>
                                            <td >{{item.keShi}}</td>
                                            <td >{{item.createDate}}</td>
                                            <td >
                                                <a class="wtg"   data-toggle="modal" data-target=".bs-example-modal-sm"  @click="shanchu(item.id,index)">删除</a>
                                            </td>
                                        </tr>
                                    </tbody>      
                                </table>			
                              </div>
                   
					`,
            props: {
                data: Array,
                row:Array,
                
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
                //对发布的视频 进行删除操作
                shanchu:function(id,index){
                    $.ajax({
                        url:"http://localhost:3002/byks/faBuKeChengShanChu?id="+id,  
                        type: "get",
                        success: function(res){
                            if(res.success){
                                main.dialog("删除成功")
                                main.row.splice(index,1)
                            }
                        },
                        error:function(){},
                    });
                }
            },
            
        })
        var main = new Vue({
            el: '#main',
            data:function(){
                return {
                    row:[],
                    kc:{
                        kcmc:"",
                        shrq:"",
                        kcks:"",
                    },
               
                }
            },
            mounted: function () {
               this.load()
            },
            methods: {
                //查询发布的课程
                load:function(){
                     $.ajax({
                        url:"http://localhost:3002/byks/getAllCourse",  
                        type: "get",
                        success: function(res){
                            main.row=res.data
                            // for(var i=0;i<res.data.length;i++){
                            //     var IMAGES=[];
                            //     IMAGES=res.data[i].kcImages.split(','); 
                            //     main.row[i].images=IMAGES;
                            // }
                        },
                        error:function(){},
                    });
                },
                 //发布课程
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
                    if(userName!="管理员"){
                        this.dialog("您没有权限进行此项操作")
                    }else if(imgUrl==""){
                        this.dialog("请选择课程图片")
                    }else if(this.kc.kcmc=="" || this.kc.shrq=="" || this.kc.kcks==""){
                        this.dialog("请完善课程信息")
                    }else {
                        var self=this;
                        $.ajax({
                            url:"http://localhost:3002/byks/faBuShiPin", //管理员页面 发布视频
                            type:"post",
                            data:{
                                courseName:this.kc.kcmc,
                                crowd:this.kc.shrq,
                                keShi:this.kc.kcks,
                                kcImages:imgUrl,

                            },
                            success:function(res){
                                if(res.success){
                                   this.dialog("发布成功")
                                }
                            }.bind(self),
                            error:function(){
                                this.dialog('上传是失败')
                            }.bind(self)
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
                    title:'首页信息',
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
        