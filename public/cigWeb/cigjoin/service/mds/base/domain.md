# cigApi/zhzl/system/queryDomains (基础编码服务)

通过基础编码代码，查询对应编码清单

## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
domainNames|String|是|gender,nation||多个代码用逗号隔开

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|Dic&lt;String,Domain[]&gt;||
--key|String|gender|传入的domainNames中的代码
--value|Domain[]||
----value|String|01|编码
----name|String|男性|实际值

## 响应示例
```
{
    success:1,
    data:{
        gender:[
            {
                name:"男性",
                value:"01",
            },
            {
                name:"女性",
                value:"02",
            },
            {
                name:"未明确",
                value:"00",
            },
            {
                name:"其他",
                value:"99",
            }
        ]
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
    method:"GET"
    path:"/cigApi/system/queryDomains?domainNames=gender&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```