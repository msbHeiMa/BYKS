# cigApi/zhzl/system/queryAllDep (查询辖区列表)

通过上级辖区ID，查询其管辖的辖区列表

## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
pid|String|否|1||不传时返回县下所辖乡镇/街道

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|SimpleDep[]||
--id|String|1|
--name|String|太湖街道|

## 响应示例
```
{
    success:1,
    data:[
        {
            id:"1",
            name:"太湖街道"
        }
    ]
}
```

## 请求示例 NodeJs
```
var http = require("http");
http.request({
    protocol:"http:"
    hostname:"222.46.11.118",
    port:12080,
    method:"GET"
    path:"/cigApi/system/queryAllDep?pid=1&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```