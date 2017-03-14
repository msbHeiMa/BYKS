# cigApi/zhzl/person/personTabs (查询人口附属信息是否存在)

通过人口ID，(查询人口附属信息（户籍，亲属关系，产权房屋，承租房屋，居住房屋，车辆，精神病信息等）是否存在)

## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
id|String|是|72a3c664-c1c5-45ee-9527-49aee8b7f97d||人口ID

## 响应参数

名称|类型|示例值|描述
--|--|--|--
isHj|Boolean|true|是否有户籍信息
isQsgx|Boolean|true|是否有亲属关系信息
isFlow|Boolean|false|是否有流动信息
isCqfw|Boolean|false|是否有产权房屋信息
isCzfw|Boolean|true|是否有承租房屋信息
isJzfw|Boolean|false|是否有居住房屋信息
isCl|Boolean|true|是否有车辆信息
isJsb|Boolean|false|是否有精神病相关信息

## 响应示例
```
{
    success:1,
    data:{
            isCl:false,
            isCqfw:false,
            isCzfw:false,
            isFlow:true,
            isHj:true,
            isJsb:true,
            isJzfw:false,
            isQsgx:true
    }
}
```

## 请求示例 NodeJs
```
var http = require("http");
http.request({
    protocol:"http:"
    hostname:"222.46.11.118",
    port:12080,
    method:"GET",
    path:"/cigApi/zhzl/person/personTabs?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```