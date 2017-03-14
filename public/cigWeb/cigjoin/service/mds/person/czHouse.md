# cigApi/zhzl/person/czHouse (查询人口承租房屋信息)

通过人口ID，查询人口承租房屋信息

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
data|cqHouses[]||承租房屋列表
--id|String|house1|房屋ID 
--pId|String|testPerson3|承租人ID 
--pName|String|皮户主|承租人姓名
--signType|String|null|房屋产权证类型 ，域字段：signType
--houseNumber|String|0001|房产证编号
--houseUse|String|用途|房屋用途，域字段：houseUse
--houseArea|Number|120|建筑面积（平方米）
--address|String|长兴县XX街010号|房屋地址
--createDate|String|2017-03-03 13:14:07|登记时间

## 响应示例
```
{
    "success": 1, 
    "data": [
        {
            "id": "house1", 
            "pId": "testPerson3", 
            "pName": "皮户主", 
            "signType": null, 
            "houseNumber": "0001", 
            "houseUse": "用途", 
            "houseArea": 120, 
            "address": "长兴县XX街010号", 
            "createDate": "2017-03-03 13:14:07"
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
    path:"/cigApi/zhzl/person/czHouse?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```