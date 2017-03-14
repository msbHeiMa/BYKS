# cigApi/zhzl/person/familyRelation (查询人口亲属关系信息)

通过人口ID，查询人口亲属关系信息

## 请求方式

POST

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
id|String|是|3ca02ec1-179c-41cf-b9e8-0e468524f168||人口ID

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|familyRelations[]||亲属关系列表
--id|String|8bb2cfdc-84d6-40cd-8e61-9b8e93b0b91b|亲属关系ID 
--qsPId|String|6686d2dc-0094-432e-917c-272651b73e44|亲属人口ID，可为null
--hzPId|String|1fc56259-384e-447c-ba48-9e3ebc7bf3a7|户主人口ID
--relation|String|8|与户主关系，域字段：familyRelation
--personName|String|黄|亲属姓名，若亲属人口ID为null,亲属姓名为此值 
--idNumber|String|330522199201271070|亲属身份证号码，若亲属人口ID为null,亲属身份证号码为此值
--dataResource|String|1|数据来源
--name|String|丁福栋|亲属姓名，若亲属人口ID为null,无此值，若亲属人口ID不为null，亲属姓名为此值
--cardNum|String|330522199201271070|亲属身份证号码，若亲属人口ID为null,无此值，若亲属人口ID不为null，亲属身份证号码为此值
--phone|String|null|亲属手机号码，若亲属人口ID不为null有此值

## 响应示例
```
{
    "success": 1, 
    "data": [
        {
            "id": "8bb2cfdc-84d6-40cd-8e61-9b8e93b0b91b", 
            "qsPId": "6686d2dc-0094-432e-917c-272651b73e44", 
            "hzPId": "1fc56259-384e-447c-ba48-9e3ebc7bf3a7", 
            "relation": "8", 
            "personName": "黄", 
            "idNumber": "330522199201271070", 
            "dataResource": "1", 
            "name": "丁福栋", 
            "cardNum": "330522199201271070", 
            "phone": null
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
    path:"/cigApi/zhzl/person/familyRelation?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```