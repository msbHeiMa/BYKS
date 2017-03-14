(function($){
  $.fn.cigTable = function(options){
    var settings = {
        sidePagination: "server", //表示服务端请求
        method: "get",  //使用get请求到服务器获取数据
        sortable: false, 
        pagination: true, //启动分页  
        pageSize: 10,  //每页显示的记录数  
        pageNumber: 1, //当前第几页     
        ajax:function(request){
            var succ = request.success;
            request.success = function(res){
                if(res){
                    succ(res.data);
                }
            }
            $.ajax(request);
        }};
    if (options){
        $.extend(settings,options);
    }
    this.bootstrapTable('destroy');
    this.bootstrapTable(settings);
  };
})(jQuery);  