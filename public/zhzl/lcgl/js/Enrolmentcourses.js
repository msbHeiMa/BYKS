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
                                        <a href="javascript:void(0)" class="button button-raised button-primary button-pill" role="button" @click="baoming">报名</a>
                                        <a href="javascript:void(0)" class="button button-raised button-default button-pill" role="button" @click="guanzhu">关注</a>
                                    </p>
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
        