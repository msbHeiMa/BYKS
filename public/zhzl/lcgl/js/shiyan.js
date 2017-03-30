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
                                    <h4>{{entry.biaoti}}</h4>
                                    <p>适合人群:{{entry.shrq}}</p>
                                    <p>课时：{{entry.keshi}}</p>
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
                // images: Array,
                // biaoti:String,
                // shrq:String,
                // keshi:String,
            },
            methods: {
                baoming:function(){
                    alert("报名成功")
                },
                guanzhu:function(){
                    alert("关注成功")
                }
            }
        })

        var main = new Vue({
            el: '#main',
            data:{
                row:[
                        {
                            biaoti:"能力训练课程(AY1)",
                            shrq:"大班至三年级",
                            keshi:"48",
                            images:['http://www.abilix.com/images/hdzx/tixi/3_09.png','../../../zhzl/lcgl/images/47.jpg','../../../zhzl/lcgl/images/48.jpg']
                        },{
                            biaoti:"能力训练课程(AY1)",
                            shrq:"大班至三年级",
                            keshi:"48",
                            images:['http://www.abilix.com/images/hdzx/tixi/3_09.png','../../../zhzl/lcgl/images/47.jpg','../../../zhzl/lcgl/images/48.jpg']
                        }
                  ]
            },
            mounted: function () {

            },
            
        })