# cigApi/zhzl/person/familyPersons (查询户籍人口分页列表)

查询户籍人口分页列表

## 请求方式

POST

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
deptId|String|是|1125899906842624||当前用户所属部门ID
dwdm|String|否|1143543833821184||查询的部门ID,限定查找指定区域中的户籍人口，不传时查当前用户所属部门下的户籍人口
type|String|否|0|限定传0或1|0表示查户籍常住人口，1表示查户籍流动人口，不传是查所有户籍人口
keyword|String|否|张三||模糊查询姓名或身份证号码
offset|Number|否|0||分页查询参数，表示从符合条件的第几条记录开始获取结果，不传默认是0
limit|Number|否|10||分页查询参数，表示取多少条结果，不传默认是10

## 响应参数

名称|类型|示例值|描述
--|--|--|--
rows|FamilyPersons[]||
--id|String|3ca02ec1-179c-41cf-b9e8-0e468524f168|人口ID
--name|String|张福梅|人口姓名
--cardNum|String|330522193612291028|身份证号码
--gender|String|2|性别，域字段：gender
--phone|String|null|手机号码
--isFlow|String|1|0表示是常住人口，1表示是流动人口
--residence|String|稚城街道三狮社区阳光家园网格（第五网格）|人员现住地
--gridName|String|三狮社区/阳光家园网格（第五网格）|人员所属网格
--createDate|String|2016-02-10 13:27:38|数据创建时间
--isOutCountry|String|0|0表示人员未流出县外，1表示人员已流出县外
total|Number|13846|所有符合条件的数据总条数

## 响应示例
```
{
    success:1,
    data:{
        rows:[
            {
                "id": "3ca02ec1-179c-41cf-b9e8-0e468524f168", 
                "name": "张福梅", 
                "cardNum": "330522193612291028", 
                "gender": "2", 
                "phone": null, 
                "isFlow": "1", 
                "residence": "稚城街道三狮社区阳光家园网格（第五网格）", 
                "gridName": "三狮社区/阳光家园网格（第五网格）", 
                "createDate": null, 
                "isOutCountry": "0"
            }
        ],
        total:13846

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
    path:"/cigApi/zhzl/person/familyPersons?offset=0&limit=10&keyword=&type=&dwdm=&deptId=1125899906842624&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```