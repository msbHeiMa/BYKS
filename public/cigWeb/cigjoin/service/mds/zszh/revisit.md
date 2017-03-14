# cigApi/zhzl/person/car (查询人员的车辆信息)

通过精神病ID，查询回访记录信息


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
rows|revisits[]||基本信息列表
--id|String|bb255b46-5363-482a-ac73-b27c5f619185|回访记录主键ID
--JSBId|String|2b283338-66ff-4ad7-a288-9d3590c46eed|精神病主键ID
--visitDate|String|2016-12-12 09:40:01|回访时间
--visitPeople|String|test|回访人员
--isWithGuardian|String|1|是否和监护人同住，域字段（0：否，1：是）
--isMedication|String|是否按时服药,域字段（0：否，1：是）
--isHarmBehavior|String|01|是否存在危害行为,域字段isHarmBehavior
--RN|String|长兴县医院|序号



## 响应示例
```
{"success":1,
    "data":
    {
        "total":23,
            "rows":[
                {
                    "id": "bb255b46-5363-482a-ac73-b27c5f619185", 
                    "JSBId":"2b283338-66ff-4ad7-a288-9d3590c46eed", 
                    "visitDate": "2016-12-12 09:40:01", 
                    "visitPeople":"test", 
                    "isWithGuardian":"1",  
                    "isMedication":"1",  
                    "isHarmBehavior":"01", 
                    "RN": 1
                },
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