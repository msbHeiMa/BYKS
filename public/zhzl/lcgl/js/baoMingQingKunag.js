     
   
       Vue.component('byks-bmuser', {
            template: `
                        <div role="tabpanel" class="tab-pane active" id="home">  	
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="success">
                                            <th>序号</th>
                                            <th>课程名称</th>
                                            <th>课程课时</th>
                                            <th>报名用户</th>
                                            <th>报名费</th>
                                            <th>报名时间</th>
                                            <th>唯一凭证</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr v-for="(item,index) in row" :class="isHaveClass(index)">
                                            <td >{{index+1}}</td>
                                            <td >{{item.courseName}}</td>
                                            <td >{{item.keShi}}</td>
                                            <td >{{item.userName}}</td>
                                            <td >{{item.money}}</td>
                                            <td >{{item.createDate}}</td>
                                            <td >{{item.id}}</td>
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
            },
            
        })
        var main = new Vue({
            el: '#main',
            data:function(){
                return {
                    row:[],
               
                }
            },
            mounted: function () {
               this.load()
            },
            methods: {
                //默认查询 查询每个课程的报名情况
                load:function(){
                         $.ajax({
                            url:"http://localhost:3002/byks/keChengBaoMingQingKuang",  
                            type: "get",
                            success: function(res){
                                main.row=res.data;
                            },
                            error:function(){},
                        });
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
        