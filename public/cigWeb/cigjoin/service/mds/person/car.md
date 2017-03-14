# cigApi/zhzl/person/car (查询人员的车辆信息)

通过人口ID，查询人口的车辆信息


## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
id|String|是|3ca02ec1-179c-41cf-b9e8-0e468524f168||人口ID

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|car[]||车辆列表
--id|String|5d8fd4a6-e012-43dd-af1f-c9d33b808634|车辆ID
--pId|String|1fc56259-384e-447c-ba48-9e3ebc7bf3a7|车主人口ID
--pName|String|李长林|车主姓名
--pCardNum|String|330522196309011074|车主身份证号码
--carType|String|3|车辆类型，域字段：carType
--carNumber|String|浙E-13451|车辆号码
--brand|String|奇瑞|车辆品牌，域字段：brand
--carColour|String|10|车辆颜色 ，域字段：carColour
--nature|String|null|车辆性质，域字段：nature

## 响应示例
```
{
    "success": 1, 
    "data": [
        {
            "id": "5d8fd4a6-e012-43dd-af1f-c9d33b808634", 
            "pId": "1fc56259-384e-447c-ba48-9e3ebc7bf3a7", 
            "pName": "李长林", 
            "pCardNum": "330522196309011074", 
            "carType": "3", 
            "carNumber": "浙E-13451", 
            "brand": "奇瑞", 
            "carColour": "10", 
            "nature": null
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
    path:"/cigApi/zhzl/person/car?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```