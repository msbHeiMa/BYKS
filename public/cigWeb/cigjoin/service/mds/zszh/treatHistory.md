# cigApi/zhzl/person/car (查询人员的车辆信息)

通过精神病ID，查询治疗病史信息


## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
JSBId|String|是|3ca02ec1-179c-41cf-b9e8-0e468524f168||精神病ID
offset|Number|否|0||分页查询参数，表示从符合条件的第几条记录开始获取结果，不传默认是0
limit|Number|否|1||分页查询参数，表示取多少条结果，不传默认是10
## 响应参数

名称|类型|示例值|描述
--|--|--|--
rows|treatHistorys[]||基本信息列表
--admissionDate|String|2017-01-18 01:30:49|入院治疗日期
--treatName|String|长兴县医院|治疗医院名称
--hosTreatS|String|01|实施治疗住院原因，域字段hosTreatS
--attackType|String|01|诊断类型，域字段attackType
--dischargedDate|String|2017-01-18 01:32:32|出院日期
--recOrganName|String|长兴县医院|接受康复训练机构


## 响应示例
```
 {
    "success":1,
     "data":
            {
                "total":1,
                 "rows":
                 [
                     {            
                       "admissionDate":"2017-01-18 01:30:49",
                       "treatName":"长兴县医院",
                       "hosTreatS":"01",
                       "attackType":"01",
                       "dischargedDate":"2017-01-18 01:32:32",
                       "recOrganName":"长兴县医院"
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
    path:"/cigApi/zhzl/zszh/zszhQueryJsbTreatHistory?JSBID=3ca02ec1-179c-41cf-b9e8-0e468524f168&offset=0&limit=10",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```