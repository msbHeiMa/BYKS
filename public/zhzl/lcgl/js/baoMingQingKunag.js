     
   
        Vue.component('byks-rdtanchu', {
            template: `
                    
                   
					`,
            props: {
                data: Array,
                row:[],
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
               
                }
            },
            mounted: function () {
               
            },
            methods: {
             
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
        