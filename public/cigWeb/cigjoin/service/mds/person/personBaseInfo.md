# cigApi/zhzl/person/personBaseInfo (查询人口基础信息)

通过人口ID，查询人口基础信息

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
id|String|3ca02ec1-179c-41cf-b9e8-0e468524f168|人口ID
cardNum|String|330522193612291028|身份证号码
name|String|张福梅|姓名
usedName|String|null|曾用名 
gender|String|2|性别，域字段：gender
birthDate|String|1936-12-29 00:00:00|出生日期 
nation|String|null|民族，域字段：nation
nativePlace|String|浙江省|籍贯 
maritalStatus|String|null|婚姻状况 ，域字段：mmaritalStatus
politicalStatus|String|01|政治面貌，域字段：politicalStatus
education|String|null|学历，域字段：education
height|Number|null|身高
bloodType|String|null|血型 ，域字段：bloodType
photoPath|String|zszh04.jpg|相片访问路径 
relBelief|String|00|宗教信仰，域字段：relBelief
occCategory|String|null|职业类别 ，域字段：occCategory
occupation|String|null|职业
specialty|String|null|专业特长，域字段：specialty
sPlace|String|null|服务处所
domicile|String|浙江省|户籍地
dAddr|String|null|户籍(门)楼详址
death|String|null|是否死亡
personType|String|1|实有人口类型，域字段：realPersonType
gId|String|1143629800275968|所属网格ID 
residence|String|稚城街道三狮社区阳光家园网格（第五网格）|现住地 
rAddr|String|高家墩新村8号|现住(门)楼详址
phone|String|null|手机号码
tel|String|null|固定电话
email|String|null|电子邮箱
isLegal|String|0|是否法人
isFlow|String||是否流动
isSupervise|String|1|是否监管 
dataSource|String|1|数据来源
createDate|String|null|数据创建日期
gridName|String|三狮社区/阳光家园网格（第五网格）|所属网格

## 响应示例
```
{
    "success": 1, 
    "data": {
        "id": "3ca02ec1-179c-41cf-b9e8-0e468524f168", 
        "cardNum": "330522193612291028", 
        "name": "张福梅", 
        "usedName": null, 
        "gender": "2", 
        "birthDate": "1936-12-29 00:00:00", 
        "nation": null, 
        "nativePlace": "浙江省", 
        "maritalStatus": null, 
        "politicalStatus": "01", 
        "education": null, 
        "height": null, 
        "bloodType": null, 
        "photoPath": "zszh04.jpg", 
        "relBelief": "00", 
        "occCategory": null, 
        "occupation": null, 
        "specialty": null, 
        "sPlace": null, 
        "domicile": "浙江省", 
        "dAddr": null, 
        "death": null, 
        "personType": "1", 
        "gId": "1143629800275968", 
        "residence": "稚城街道三狮社区阳光家园网格（第五网格）", 
        "rAddr": "高家墩新村8号", 
        "phone": null, 
        "tel": null, 
        "email": null, 
        "isLegal": "0", 
        "isFlow": "1", 
        "isSupervise": "1", 
        "dataSource": "1", 
        "createDate": null, 
        "gridName": "三狮社区/阳光家园网格（第五网格）"
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
    path:"/cigApi/zhzl/person/personBaseInfo?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```