# cigApi/zhzl/person/familys (查询户籍信息分页列表)

查询户籍信息分页列表

## 请求方式

POST

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
deptId|String|是|1125899906842624||当前用户所属部门ID
offset|Number|否|0||分页查询参数，表示从符合条件的第几条记录开始获取结果，不传默认是0
limit|Number|否|10||分页查询参数，表示取多少条结果，不传默认是10

##### POST 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
dwdm|String|否|1143543833821184||查询的部门ID,限定查找指定区域中的户籍信息，不传时查当前用户所属部门下的户籍信息
keyword|String|否|张三||模糊查询户主姓名或户主身份证号码，户号


## 响应参数

名称|类型|示例值|描述
--|--|--|--
rows|Familys[]||
--id|String|14E5143DBF08491BAFF7642F31D3D367|人口ID
--hNum|String|null|户号
--residenceType|String|1|户口类型，域字段：residenceType
--name|String|李长林|户主姓名
--phone|String|22122444|户主手机号码
--alines|String|null|家庭称号
--hasPerson|String|1|是否有户无人
total|Number|520|所有符合条件的数据总条数

## 响应示例
```
{
    "success": 1, 
    "data": {
        "rows": [
            {
                "id": "14E5143DBF08491BAFF7642F31D3D367", 
                "hNum": null, 
                "residenceType": "1", 
                "name": "李长林", 
                "phone": "22122444", 
                "alines": null, 
                "hasPerson": "1"
            }
        ], 
        "total": 520
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
    path:"/cigApi/zhzl/person/familys?offset=0&limit=10&deptId=1125899906842624&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```