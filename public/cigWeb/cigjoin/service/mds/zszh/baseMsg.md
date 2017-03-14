# cigApi/zhzl/person/car (查询人员的车辆信息)

通过精神病ID或身份证号码，查询肇事肇祸人口人口基础信息


## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
JSBId|String|是|3ca02ec1-179c-41cf-b9e8-0e468524f168||精神病ID|精神病ID和公民身份号码二选一
cardNum|String|是|230602199809184543||公民身份号码

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|car{}||基本信息列表
--cardNum|String|230602199809184543|居民身份号码
--name|String|陈梦|姓名
--gender|String|李0|性别，域字段：gender
--birthDate|String|2017-03-03 16:15:0|出生日期
--nation|String|1|民族，域字段：nation
--nativePlace|String|浙江省|籍贯
--maritalStatus|String|01|婚姻状况，域字段：maritalStatus
--bloodType|String|null|血型 ，域字段：bloodType
--education|String|null|学历 ，域字段：education
--relBelief|String|浙00|宗教信仰，域字段：relBelief
--occCategory|String|01|职业类别 ，域字段：maritalStatus
--occupation|String|null|职业 ，域字段：occupation
--sPlace|String|null|服务处所
--phone|String|15522672213|联系方式
--domicile|String|浙江省|户籍地
--dAddr|String|null|户籍(门)楼详址
--residence|String|稚城街道三狮社区阳光家园网格（第五网格）|现住地 
--rAddr|String|高家墩新村8号|现住(门)楼详址
--dangerRank|String|01|危险等级，域字段：dangerRank
--manageLevel|String|1|管理等级 ，域字段：manageLevel
--guarderCardNum|String|110602199109115342|监护人身份证号 
--guarderName|String|李想|监护人姓名
--guarderTel|String|15521231221|监护人联系方式
--guarderAddr|String|长兴县龙山社区小李村43号|监护人现住地详址
--relationship|String|叔侄|监护人与当事人关系
--villageCadresId|String|631ae043-c0e7-489c-8d87-700e9a88b11a|村委会干部ID
--villageName|String|郝发|村干部姓名
--villagePhone|String|2938172|村干部联系电话
--dockorId|String|50f2a201-c3ec-4276-92fd-c7407c96e388|医生Id
--dockorName|String|周查|医生姓名
--dockorPhone|String|2938172|医生联系方式
--dockorDepartmentName|String|体育场社区|医生服务处所，域字段：bloodType
--policeId|String|c80eb1fe-5d8f-4697-99a7-a11f4bd571c0|警察Id ，域字段：education
--policeName|String|郝苗|警察姓名
--policePhone|String|2938172|警察联系方式，域字段：maritalStatus
--policeDepartmentName|String|双拥社区|警察服务处所
--isCTrouble|String|0|有无肇事肇祸历史 ，域字段（0:没有,1:有）
--cTroubleCount|String|null|肇事肇祸次数
--cTroubleDate|String|null|上次肇事肇祸日期
--attackDate|String|2016-11-16 10:41:27|初次发病日期
--attackType|String|01|目前诊断类型，域字段attackType
--treatS|String|01|治疗情况，域字段treatS
--treatName|String|长兴县医院|治疗医院名称
--hosTreatS|String|01|实施住院治疗原因，域字段hosTreatS
--recOrganName|String|长兴县医院|接受康复治疗机构名称


## 响应示例
```
{
    "success": 1, 
    "data":{
                    "cardNum": "230602199809184543",
                    "name": "陈梦",
                    "usedName": null,
                    "gender": "1",
                    "birthDate": "2017-03-03 16:15:0",
                    "nation": "1",
                    "nativePlace": "浙江省",
                    "maritalStatus": "01",
                    "bloodType": "null",
                    "education": "null",
                    "relBelief": "00",
                    "occCategory": "null",
                    "occupation": "null",
                    "sPlace": "null",
                    "phone": "2938172",
                    "domicile": "浙江省",
                    "dAddr": "川步村",
                    "residence": "|稚城街道三狮社区阳光家园网格（第五网格）|现住地 ",
                    "rAddr": "高家墩新村8号|现住(门)楼详址",
                    "dangerRank": "02",
                    "manageLevel": "1",
                    "guarderCardNum": "110602199109115342",
                    "guarderName": "李想",
                    "guarderTel": "15521231221",
                    "guarderAddr": "长兴县龙山社区小李村43号",
                    "relationship": 叔侄,
                    "villageCadresId": "631ae043-c0e7-489c-8d87-700e9a88b11a",
                    "villageName": "郝发",
                    "villagePhone": "2938172",
                    "dockorId": "50f2a201-c3ec-4276-92fd-c7407c96e388",
                    "dockorName": "周查",
                    "dockorPhone": "2938172",
                    "dockorDepartmentName": "体育场社区",
                    "policeId": "c80eb1fe-5d8f-4697-99a7-a11f4bd571c0",
                    "policeName": "郝苗",
                    "policePhone": "2938172",
                    "policeDepartmentName": "双拥社区",
                    "isCTrouble": "0",
                    "cTroubleCount": null,
                    "cTroubleDate": "2016-12-27 12:18:20",
                    "attackDate": "2016-11-16 10:41:27",
                    "attackType": "01",
                    "treatS": "01",
                    "treatName": "长兴县医院",
                    "hosTreatS": "01",
                    "recOrganName": "长兴县医院"
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
    path:"/cigApi/zhzl/zszh/zszhPsychiatricPatientDetail?JSBID=3ca02ec1-179c-41cf-b9e8-0e468524f168&cardNum=230602199809184543",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```