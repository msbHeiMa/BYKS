# cigApi/zhzl/person/queryPersons (通过身份证号码获取指定实有人口信息)

通过身份证号码获取指定实有人口信息

## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
cardNum|String|是|330522196501312723||人员完整身份证号码

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|persons[]||
--id|String|afa338d1-bab8-43e2-80ff-45c920c45637|人口ID
--name|String|李四|人员姓名
--cardNum|String|511222333311112|人员身份证号码
--gridName|String|高家墩居委会/桥南塘东片（第一网格）|人员所在网格
--rAddr|String|null|人员现住详址
## 响应示例
```
{
    "success": 1, 
    "data": [
        {
            "id": "afa338d1-bab8-43e2-80ff-45c920c45637", 
            "name": "李四", 
            "cardNum": "511222333311112", 
            "gridName": "高家墩居委会/桥南塘东片（第一网格）", 
            "rAddr": null
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
    path:"/cigApi/zhzl/person/queryPersons?cardNum=330522196501312723&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```