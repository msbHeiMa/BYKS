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
														<a href="javascript:void(0)" class="button button-raised button-primary button-pill" role="button">查看</a>
													</p>
												</div>
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
                baoming:function(){
                   art.dialog({
                        title: '欢迎',
                        content: '欢迎使用artDialog对话框组件！',
                        ok: function () {
                           this.close()
                        }
                    });

                },
                guanzhu:function(){
                    alert("关注成功")
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
                            <a href="#">
                                <img class="media-object" :src="item.rdImages">
                            </a>
                        </div>
                    </div>
                </div>
            `,
            props:["redian"],   
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
                            console.log(main.redian)
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
        