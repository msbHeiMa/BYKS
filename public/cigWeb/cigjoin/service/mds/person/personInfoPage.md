# cigApi/zhzl/person/personInfoPage (查询人员信息列表)

查询符合指定条件的所有人口分页列表

## 请求方式

POST

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
deptId|String|是|1125899906842624||当前用户所属部门ID
offset|Number|否|0||分页查询参数，表示从符合条件的第几条记录开始获取结果，不传默认是0
limit|Number|否|1||分页查询参数，表示取多少条结果，不传默认是10

##### POST 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
data|JSONString|是|||
--queryType|String|是|实有人口|目前限制为"实有人口"|统计类型
--keyword|String|否|张三|模糊查询姓名和身份证号码
--query|Object|是||查询条件
----dwdm|String|否|1143543833821184||查询的部门ID,限定查找指定区域下的人口统计信息，不传时查当前用户所属部门下的人口统计信息
----personType|String[]|否|["1"]||域字段：realPersonType，不传时查所有类型
----gender|String[]|否|["1"]||域字段：gender，不传时查所有类型
----age|String[]|否|["1"]|限制为1,2,3,4,5,6,7|1表示小于18岁，2表示大于19小于29岁，... 7表示大于69岁，不传时查所有类型
----year|String[]|否|["2017"]||更新数据年份，不传时查所有类型

## 响应参数

名称|类型|示例值|描述
--|--|--|--
rows|persons[]||
--id|String|1fc56259-384e-447c-ba48-9e3ebc7bf3a7|人口ID
--name|String|李长林|姓名
--cardNum|String|330522196309011074|身份证号码
--gender|String|1|性别，域字段：gender
--phone|String|22122444|手机号码
--personType|String|1|实有人口类型，域字段：realPersonType
--residence|String|北京市延庆县|现住址
--gId|String|1143560879472640|人员所在网格ID
--createDate|String|null|人员创建时间
--updateDate|String|2017-02-25 01:20:58|人员更新时间
--RN|Number|1|行号
--gridName|String|高家墩居委会/桥南塘东片（第一网格）|人员所在网格地址
total|Number|13891|所有符合条件的数据总条数

## 响应示例
```
{
    "success": 1, 
    "data": {
        "total": 13891, 
        "rows": [
            {
                "id": "1fc56259-384e-447c-ba48-9e3ebc7bf3a7", 
                "name": "李长林", 
                "cardNum": "330522196309011074", 
                "gender": "1", 
                "phone": "22122444", 
                "personType": "1", 
                "residence": "北京市延庆县", 
                "gId": "1143560879472640", 
                "createDate": null, 
                "updateDate": "2017-02-25 01:20:58", 
                "RN": 1, 
                "gridName": "高家墩居委会/桥南塘东片（第一网格）"
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
    method:"POST",
    path:"/cigApi/zhzl/person/personInfoPage?limit=1&offset=0&deptId=1125899906842624&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    },
    "data":{"queryType":"实有人口","query":{"dwdm":null,"personType":"","gender":"","age":"","year":""}}
},function(res){

});
```