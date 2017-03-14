# cigApi/zhzl/person/personInfoStatistic (查询人口区域分类统计图)

查询符合指定条件的户籍人口和县外流入人口按区域分类的统计数量

## 请求方式

POST

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
deptId|String|是|1125899906842624||当前用户所属部门ID

##### POST 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
data|JSONString|是|||
--queryType|String|是|实有人口|目前限制为"实有人口"|统计类型
--query|Object|是||查询条件
----dwdm|String|否|1143543833821184||查询的部门ID,限定查找指定区域下的人口统计信息，不传时查当前用户所属部门下的人口统计信息
----personType|String[]|否|["1"]||域字段：realPersonType，不传时查所有类型
----gender|String[]|否|["1"]||域字段：gender，不传时查所有类型
----age|String[]|否|["1"]|限制为1,2,3,4,5,6,7|1表示小于18岁，2表示大于19小于29岁，... 7表示大于69岁，不传时查所有类型
----year|String[]|否|["2017"]||更新数据年份，不传时查所有类型

## 响应参数

名称|类型|示例值|描述
--|--|--|--
data|counts[]||特定区域下户籍人口和县外流入人员的统计数
--name|String|金莲桥居委会|区域名称
--hjrk|Number|24|户籍人口数量，若查询条件personType中未查询户籍人口，则无此值
--lrrk|Number|0|县外流入人员数量，若查询条件personType中未查询县外流入人口，则无此值

## 响应示例
```
{
    "success": 1, 
    "data": [
        {
            "name": "金莲桥居委会", 
            "hjrk": 24, 
            "lrrk": 0
        }, 
        {
            "name": "大西门社区", 
            "hjrk": 3750, 
            "lrrk": 0
        }, 
        {
            "name": "三狮社区", 
            "hjrk": 2028, 
            "lrrk": 6
        }, 
        {
            "name": "仓前街社区", 
            "hjrk": 42, 
            "lrrk": 0
        }, 
        {
            "name": "古城居委会", 
            "hjrk": 299, 
            "lrrk": 0
        }, 
        {
            "name": "高家墩居委会", 
            "hjrk": 1484, 
            "lrrk": 2
        }, 
        {
            "name": "北门社区", 
            "hjrk": 6220, 
            "lrrk": 3
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
    method:"POST",
    path:"/cigApi/zhzl/person/personInfoStatistic?deptId=1125899906842624&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    },
    "data":{"queryType":"实有人口","query":{"dwdm":null,"personType":"","gender":"","age":"","year":""}}
},function(res){

});
```