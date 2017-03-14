# cigApi/zhzl/person/car (查询人员的车辆信息)

通过精神病ID，查询迁入迁出记录


## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
departmentId|String|是|1143543766712320|网格id
offset|Number|否|0||分页查询参数，表示从符合条件的第几条记录开始获取结果，不传默认是0
limit|Number|否|1||分页查询参数，表示取多少条结果，不传默认是10
## 响应参数

名称|类型|示例值|描述
--|--|--|--
rows|revisits[]||基本信息列表
--cardNum|String|230602199809184543|居民身份号码
--name|String|陈梦|姓名
--gender|String|1|性别，域字段：gender
--finalAddrDartId|String|null|迁出地址网格id
--finalAddrName|String|test|迁出地址网格名称
--wfState|String|迁出|状态（“迁出”，“移除”）
--outDeleteDate|String|迁出移除时间
--dangerRank|String|01|危险等级，域字段：dangerRank
--manageLevel|String|1|管理等级 ，域字段：manageLevel
--RN|String|1|序号
--attackType|String|01|目前诊断类型，域字段attackType
--isCTrouble|String|0|有无肇事肇祸历史 ，域字段（0:没有,1:有）



## 响应示例
```
{
        "success": 1,
        "data":
        {
            "rows":
            [
                {
                    "name":"赵丹",
                    "gender":"1",
                    "cardNum": "180602199809183452",
                    "finalAddrDartId":null,
                    "finalAddrName":null,
                    "RN": 1
                    "originalAddr": "1143543766712320",
                    "outDeleteDate": "2017-02-27 09:31:24",
                    "wfState": null,
                    "dangerRank": "01",
                    "manageLevel": 4, 
                    "peopleStatusQeo":"01",
                    "isCTrouble": "1", 
                    "attackType":"02",  
                }
            ],
            "total": 30
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
    path:"/cigApi/zhzl/zszh/getDeleteOutPeopleList?departmentId=1143543766712320&offset=0&limit=10",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```