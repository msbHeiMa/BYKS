 Vue.component('byks-ul', {
            template: `
                <div>
                    <ul v-for="item in row"> 
                        <li>{{item.id}}</li>
                        <li>{{item.utterer}}</li>
                        <li>{{item.fbTime}}</li>
                        <li>{{item.worksName}}</li>
                        <li>{{item.worksName}}</li>
                    </ul>
                </div>
                
                   
					`,
            // props: {
            //     // row:Array,
            // },
            props: ["row"]
 });
  Vue.component('byks-li', {
            template: `
                <div>
                    <ul v-for="item in row"> 
                        <li>{{item.id}}</li>
                        <li>{{item.utterer}}</li>
                        <li>{{item.fbTime}}</li>
                        <li>{{item.worksName}}</li>
                        <li>{{item.worksName}}</li>
                    </ul>
                </div>
                
                   
					`,
            props: {
                data: Array,
                row:Array,
            },
 });
        var main = new Vue({
            el: '#main',
            data:function(){
                return{
                    row:[{
                        "id":"4",
                        "utterer":"马帅彬",
                        "fbTime":"2017-04-25 11:28:33",
                        "worksName":"乐高机器人",
                        "worksType":"积木类型",
                        "likeTime":0,
                        "worksIntro":"从拿到机器人开始还是一堆零件到一点一点的搭建好，到最终完成充满成就感",
                        "worksImages":"../../../zhzl/lcgl/images/43.jpg,../../../zhzl/lcgl/images/44.jpg,../../../zhzl/lcgl/images/45.jpg",
                        "createDate":"2017-04-25 11:29:30",
                        "updateDate":null
                    }],
                    utterer:"马帅彬",
                }
            },
            // data:{
            //     row:{
            //             "id":"4",
            //             "utterer":"马帅彬",
            //             "fbTime":"2017-04-25 11:28:33",
            //             "worksName":"乐高机器人",
            //             "worksType":"积木类型",
            //             "likeTime":0,
            //             "worksIntro":"从拿到机器人开始还是一堆零件到一点一点的搭建好，到最终完成充满成就感",
            //             "worksImages":"../../../zhzl/lcgl/images/43.jpg,../../../zhzl/lcgl/images/44.jpg,../../../zhzl/lcgl/images/45.jpg",
            //             "createDate":"2017-04-25 11:29:30",
            //             "updateDate":null
            //         },
            //    utterer:"马帅彬",
            // },          
        });
        