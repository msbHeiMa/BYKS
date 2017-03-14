# cigApi/zhzl/person/cyGetFamily (查询人口户籍信息)

通过人口ID，查询人口所属户籍的信息

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
hNum|String|null|户号 
name|String|张福梅|户主姓名
cardNum|String|330522193612291028|户主身份证号码 
hasPerson|String|1|是否有户无人
isFive|String|0|是否五保户
isLow|String|0|是否低保户
isPool|String|0|是否贫困户
residenceType|String|1|户口类型 ，域字段：residenceType
rhyzbs|String|0|人户一致标示，域字段：rhyzbs
alines|String|null|家庭称号
members|FamilyMembers[]||户成员列表
--id|String|9E368EF1F01E450FA00ED965F1A13933|户成员ID 
--pId|String|3ca02ec1-179c-41cf-b9e8-0e468524f168|户成员人口ID 
--fId|String|A5F7D115386D4EE3BE14204D56C3AA95|户ID
--relation|String|0|与户主关系，域字段：familyRelatiion
--name|String|张福梅|户成员姓名
--cardNum|String|330522193612291028|户成员身份证号码
--phone|String|null|户成员手机号码

## 响应示例
```
{
    "success": 1, 
    "data": {
        "hNum": null, 
        "name": "张福梅", 
        "cardNum": "330522193612291028", 
        "hasPerson": "1", 
        "isFive": "0", 
        "isLow": "0", 
        "isPool": "0", 
        "residenceType": "1", 
        "rhyzbs": "0", 
        "alines": null, 
        "members": [
            {
                "id": "9E368EF1F01E450FA00ED965F1A13933", 
                "pId": "3ca02ec1-179c-41cf-b9e8-0e468524f168", 
                "fId": "A5F7D115386D4EE3BE14204D56C3AA95", 
                "relation": "0", 
                "name": "张福梅", 
                "cardNum": "330522193612291028", 
                "phone": null
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
    path:"/cigApi/zhzl/person/cyGetFamily?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```