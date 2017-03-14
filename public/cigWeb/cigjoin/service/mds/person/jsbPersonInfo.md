# cigApi/zhzl/person/jsbPersonInfo (查询精神病人员信息)

通过人口ID，查询精神病人员信息

## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
id|String|是|12beaaca-6878-4b2d-a97e-5a472eee0915||人口ID

## 响应参数

名称|类型|示例值|描述
--|--|--|--
id|String|12beaaca-6878-4b2d-a97e-5a472eee0915| 人口ID
cardNum|String|330522196501312723| 身份证号码
name|String|曾素招| 人员姓名
usedName|String|null| 人员曾用名 
gender|String|2| 性别，域字段：gender
birthDate|String|1965-01-31 00:00:00| 出生日期
nation|String|null| 民族，域字段：nation
nativePlace|String|浙江省| 籍贯
maritalStatus|String|null|婚姻状况 ，域字段：maritalStatus
bloodType|String|null| 血型，域字段：bloodType
politicalStatus|String|null|政治面貌 ，域字段：politicalStatus
education|String|null| 学历，域字段：education
relBelief|String|00| 宗教信仰，域字段：relBelief
occCategory|String|null| 职业类别，域字段：occCategory
occupation|String|null| 职业
sPlace|String|null| 服务处所
phone|String|null| 手机号码
domicile|String|浙江省| 户籍地
dAddr|String|null| 户籍(门)楼详址
residence|String|null| 现住地
rAddr|String|高家墩自然村37号| 现住(门)楼详址
dangerRank|String|02| 危险等级，域字段：dangerRank
manageLevel|String|1| 管理等级，域字段：managerLevel
JSBId|String|26fe66ba-9cc2-40c4-82e3-df40c87220a8| 精神病人ID
griderCyc|Number|10|网格员回访周期
guarderCardNum|String|220602199809187701| 监护人身份证号码
guarderName|String|龚新兰| 监护人姓名
guarderTel|String|15521231221| 监护人联系方式
guarderAddr|String|高家墩新村79号| 监护人地址 
relationship|String|null| 与监护人关系 
villageCadresId|String|35096dd6-aced-4693-9029-ddfb33a7116f| 村委会干部人口ID
villageName|String|刘志方| 村委会干部姓名
villagePhone|String|null| 村委会干部联系方式
dockorId|String|6f42331e-9cf0-446f-96cd-6a8297eaf127| 医生人口ID
dockorName|String|李贵宝|医生姓名
doctorCyc|Number|12|  医生回访周期
dockorPhone|String|null| 医生联系方式
dockorDepartmentName|String|null| 所属医院名称
policeId|String|035210d1-b1ad-4d5f-ba74-97be160e1be9| 警察人口ID
policeName|String|张怀德| 警察姓名
policePhone|String|null| 警察联系方式
policeDepartmentName|String|null|警察所属部门
policeCyc|Number|11|  警察回访周期
isCTrouble|String|1| 有无肇事肇祸历史
cTroubleCount|Number|5| 肇事肇祸次数
cTroubleDate|String|2016-11-16 18:41:33| 上次肇事肇祸时间
attackDate|String|2016-11-16 18:41:27| 初次发病日期
attackType|String|05| 目前诊断类型，域字段：attackType
treatS|String|02| 治疗情况，域字段：treatS
treatName|String|长兴县医院|治疗医院名称  
hosTreatS|String|99| 实施住院治疗原因，域字段：hosTreatS
recOrganName|String|长兴县医院| 接受康复治疗机构名称
gridName|String|高家墩居委会/桥南塘东片（第一网格）| 人员所属网格名称
zszhList|zszhList[]||所有肇事肇祸历史信息列表
--JSBId|String|26fe66ba-9cc2-40c4-82e3-df40c87220a8| 精神病人ID
--zszhDate|String|2017-02-02 17:21:21| 肇事肇祸时间
--zszhAddr|String|县政府| 肇事肇祸地点
--zszhCom|String|送进医院|处置结果

## 响应示例
```
{
    "success": 1, 
    "data": {
        "id": "12beaaca-6878-4b2d-a97e-5a472eee0915", 
        "cardNum": "330522196501312723", 
        "name": "曾素招", 
        "usedName": null, 
        "gender": "2", 
        "birthDate": "1965-01-31 00:00:00", 
        "nation": null, 
        "nativePlace": "浙江省", 
        "maritalStatus": null, 
        "bloodType": null, 
        "politicalStatus": null, 
        "education": null, 
        "relBelief": "00", 
        "occCategory": null, 
        "occupation": null, 
        "sPlace": null, 
        "phone": null, 
        "domicile": "浙江省", 
        "dAddr": null, 
        "residence": null, 
        "rAddr": "高家墩自然村37号", 
        "dangerRank": "02", 
        "manageLevel": 1, 
        "JSBId": "26fe66ba-9cc2-40c4-82e3-df40c87220a8", 
        "griderCyc": 10,
        "guarderCardNum": "220602199809187701", 
        "guarderName": "龚新兰", 
        "guarderTel": "15521231221", 
        "guarderAddr": "高家墩新村79号", 
        "relationship": null, 
        "villageCadresId": "35096dd6-aced-4693-9029-ddfb33a7116f", 
        "villageName": "刘志方", 
        "villagePhone": null, 
        "dockorId": "6f42331e-9cf0-446f-96cd-6a8297eaf127", 
        "dockorName": "李贵宝",
        "doctorCyc": 12,  
        "dockorPhone": null, 
        "dockorDepartmentName": null, 
        "policeId": "035210d1-b1ad-4d5f-ba74-97be160e1be9", 
        "policeName": "张怀德", 
        "policePhone": null, 
        "policeDepartmentName": null,
        "policeCyc": 11,  
        "isCTrouble": "1", 
        "cTroubleCount": 5, 
        "cTroubleDate": "2016-11-16 18:41:33", 
        "attackDate": "2016-11-16 18:41:27", 
        "attackType": "05", 
        "treatS": "02", 
        "treatName": "长兴县医院", 
        "hosTreatS": "99", 
        "recOrganName": "长兴县医院", 
        "gridName": "高家墩居委会/桥南塘东片（第一网格）", 
        "zszhList": [
            {
                "JSBId": "26fe66ba-9cc2-40c4-82e3-df40c87220a8", 
                "zszhDate": "2017-02-02 17:21:21", 
                "zszhAddr": "县政府", 
                "zszhCom": "送进医院"
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
    path:"/cigApi/zhzl/person/jsbPersonInfo?id=12beaaca-6878-4b2d-a97e-5a472eee0915&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```