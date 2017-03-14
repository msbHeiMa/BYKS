# cigApi/zhzl/person/flowPersons (查询县外流入人员分页列表)

查询县外流入人员分页列表


## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
deptId|String|是|1125899906842624||当前用户所属部门ID
dwdm|String|否|1143543833821184||查询的部门ID,限定查找指定区域中的县外流入人员，不传时查当前用户所属部门下的县外流入人员
keyword|String|否|张三||模糊查询姓名或身份证号码
offset|Number|否|0||分页查询参数，表示从符合条件的第几条记录开始获取结果，不传默认是0
limit|Number|否|10||分页查询参数，表示取多少条结果，不传默认是10

## 响应参数

名称|类型|示例值|描述
--|--|--|--
rows|FlowPersons[]||
--id|String|afa338d1-bab8-43e2-80ff-45c920c45637|人口ID
--name|String|李四|人口姓名
--cardNum|String|511222333311112|身份证号码
--gender|String|9|性别，域字段：gender
--phone|String|null|手机号码
--isFlow|String|1|是否流动，县外流入人员均为1
--residence|String|北京市西城区|人员现住地
--gridName|String|高家墩居委会/桥南塘东片（第一网格）|人员所属网格
--createDate|String|2017-02-16 06:35:27|数据创建时间
--isOutCountry|String|0|0表示人员未流出县外，1表示人员已流出县外
total|Number|1|所有符合条件的数据总条数

## 响应示例
```
{
    "success": 1, 
    "data": {
        "total": 1, 
        "rows": [
            {
                "id": "afa338d1-bab8-43e2-80ff-45c920c45637", 
                "name": "李四", 
                "cardNum": "511222333311112", 
                "gender": "9", 
                "phone": null, 
                "isFlow": "1", 
                "residence": "北京市西城区", 
                "gridName": "高家墩居委会/桥南塘东片（第一网格）", 
                "createDate": "2017-02-16 06:35:27", 
                "isOutCountry": "0"
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
    method:"GET",
    path:"/cigApi/zhzl/person/flowPersons?offset=0&limit=10&keyword=&dwdm=&deptId=1125899906842624&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```