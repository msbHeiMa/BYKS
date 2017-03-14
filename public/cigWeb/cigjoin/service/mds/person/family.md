# cigApi/zhzl/person/family (查询户籍基础信息)

通过户籍ID，查询户籍基础信息

## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
id|String|是|14E5143DBF08491BAFF7642F31D3D367||户籍ID

## 响应参数

名称|类型|示例值|描述
--|--|--|--
id|String|14E5143DBF08491BAFF7642F31D3D367|户籍ID
pId|String|1fc56259-384e-447c-ba48-9e3ebc7bf3a7|户主人口ID 
hNum|String|null|户号
hasPerson|String|1|是否有户无人 
isFive|String|0|是否五保户
isLow|String|1|是否低保户
isPool|String|1|是否贫困户
alines|String|null|家庭称号
residenceType|String|1|户口类型 ，域字段：residenceType
rhyzbs|String|1|人户一致标识，域字段：rhyzbs
gId|String|1143560879472640|户籍所在网格ID
name|String|李长林|户主姓名
cardNum|String|330522196309011074|户主身份证号码
phone|String|22122444|户主手机号码

## 响应示例
```
{
    "success": 1, 
    "data": {
        "id": "14E5143DBF08491BAFF7642F31D3D367", 
        "pId": "1fc56259-384e-447c-ba48-9e3ebc7bf3a7", 
        "hNum": null, 
        "hasPerson": "1", 
        "isFive": "0", 
        "isLow": "1", 
        "isPool": "1", 
        "alines": null, 
        "residenceType": "1", 
        "rhyzbs": "1", 
        "gId": "1143560879472640", 
        "name": "李长林", 
        "cardNum": "330522196309011074", 
        "phone": "22122444"
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
    path:"/cigApi/zhzl/person/family?id=14E5143DBF08491BAFF7642F31D3D367&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```