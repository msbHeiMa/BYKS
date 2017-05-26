        //精彩展示部分组件
        Vue.component('byks-zhanshi', {
            template: `
            <div class="main-right-yidong">
						<div id="carousel-example-generic" class="carousel slide" data-ride="carousel" v-for="rowone in row" >
							<div class="carousel-inner" role="listbox">
								<div :class="{item:true,active:indextwo==0?true:false}" v-for="(rowtwo,indextwo) in rowone">
									<div class="row">
										<div class="col-sm-6 col-md-4" v-for="rowthree in rowtwo">
											<div class="thumbnail">
												<img :src=rowthree.jcImages>
												<div class="caption">
													<h4>{{rowthree.jcBiaoTi}}</h4>
													<p>{{rowthree.jcIntro}}</p>
													<p>
														<button class="button button-raised button-primary button-pill" role="button" data-toggle="modal" data-target="#myModalzs" @click="chakan(rowthree.id)">查看</button>    
													</p>
												</div>
											</div>
										</div>
									</div>                    
							</div>
						</div>
					</div>`, 
            props: {
                data: Array,
                row:Array,
            },
            
            methods: {
              chakan:function(id){
                //   alert(id)
                var self=this;
                $.ajax({
                    url:url+"/byks/getJCZSDetail?id="+id,
                    type:"get",
                    success:function(res){
                        main.zstanchu=res.data;
                        var IMAGES=[];
                        IMAGES=res.data.cpzs.split(','); 
                        main.zstanchu.cpzs=IMAGES;
                    }.bind(self),
                    error:function(res){}.bind(self),
                })
              },
                
            },
            
        })
        //热点推送部分组件
        Vue.component('byks-redian', {
            template: `
                <div>
                    <div class="media" v-for="item in redian" >
                        <div class="media-body">
                            <h4 class="media-heading">{{ item.rdBiaoTi }}</h4>
                            <span>{{ item.rdIntro }}</span>
                        </div>
                        <div class="media-left">
                            <a href="javascript:viod(0)" data-toggle="modal" data-target="#myModalrd" @click="rddetail(item.id)">
                                <img class="media-object" :src="item.rdImages">
                            </a>
                        </div>
                    </div>
                </div>
            `,
            props:["redian"],   
            methods: {
                //热点详情链接
                rddetail:function(id){
                    // alert(id)
                    var self=this;
                $.ajax({
                    url:url+"/byks/getReDianDetail?id="+id,
                    type:"get",
                    success:function(res){
                        main.rdtanchu=res.data;
                        var IMAGES=[];
                        IMAGES=res.data.rdXximgs.split(','); 
                        main.rdtanchu.rdXximgs=IMAGES;
                    }.bind(self),
                    error:function(res){}.bind(self),
                })
                },
                
            },
            
        })
        //热点详情弹框组件
        Vue.component('byks-rdtanchu', {
            template: `
                    <div class="modal fade" id="myModalrd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">热点详情</h4>
							</div>
							<div class="modal-body ">
                                <div class="row">
                                        <span  class="input-group-addon span-top">内容图片</span>
                                        <div class="col-xs-6 col-md-3" v-for="item in rdtanchu.rdXximgs">
                                            <img :src="item" class="images">
                                        </div>
                                </div>
                                <div class="input-group"><span  class="input-group-addon">热点标题</span> <input readOnly="true"  :placeholder="rdtanchu.rdBiaoTi" class="form-control"></div>
                                <div class="input-group"><span  class="jieshao input-group-addon">热点详情</span> <textarea class="zstextarea" readOnly="true">{{rdtanchu.rdXxnr}}</textarea>
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
                rdtanchu:Object,
            },
            
            methods: {
     
            },
            
        })
        //精彩内容详情弹框组件
        Vue.component('byks-zstanchu', {
            template: `
                    <div class="modal fade" id="myModalzs" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">精彩内容详情</h4>
							</div>
							<div class="modal-body ">
								<div class="row">
                                        <span  class="input-group-addon span-top">成品展示</span>
                                        <div class="col-xs-6 col-md-3" v-for="img in zstanchu.cpzs">
                                            <img :src="img" class="images">
                                        </div>
                                </div>
                                <div class="input-group"><span  class="input-group-addon">上市时间</span> <input readOnly="true"  :placeholder="zstanchu.ssTime" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">产品长度</span> <input readOnly="true"  :placeholder="zstanchu.cpCd" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">产品宽度</span> <input readOnly="true"  :placeholder="zstanchu.cpKd" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">产品高度</span> <input readOnly="true"  :placeholder="zstanchu.cpGd" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">适合人群</span> <input readOnly="true"  :placeholder="zstanchu.shrq" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">组件个数</span> <input readOnly="true"  :placeholder="zstanchu.zjgs" class="form-control"></div>
                                <div class="input-group"><span  class="input-group-addon">可组形态</span> <input readOnly="true"  :placeholder="zstanchu.kzxt" class="form-control"></div>
                                <div class="input-group"><span  class="jieshao input-group-addon">产品介绍</span> <textarea class="zstextarea" readOnly="true">{{zstanchu.cpJs}}</textarea>
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
        var url="http://localhost:3002";
        var main = new Vue({
            el: '#main',
            data:function(){
                return {
                    row:[],
                    redian:{},
                    zstanchu:{},
                    rdtanchu:{},
                }
            },
            beforeCreate:function(){
                //页面中间精彩内容展示部分请求
                $.ajax({
                    url:url+"/byks/getJCZS",  
                    type: "get",
                    success: function(res){
                        var arry=[[[],[]],[[],[]]];
                        var I=0;  
                        for(var i=0;i<arry.length;i++){
                            for(var x=0;x<arry[i].length;x++){
                                for(var y=0;y<3;y++){
                                    arry[i][x][y]=res.data[I];
                                    I++;
                                }
                            
                            }
                        }
                        main.row=arry;
                    },
                    error:function(){},
                });
            },
            mounted: function () {
                this.reDianLoad();
            },
            methods: {
                reDianLoad:function(){
                    $.ajax({
                        url:url+"/byks/getReDian",
                        type:"get",
                        success:function(res){
                            main.redian=res.data;
                        },
                        error:function(){},
                    })
                },
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
        