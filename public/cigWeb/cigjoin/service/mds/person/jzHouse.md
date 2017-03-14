# cigApi/zhzl/person/jzHouse (查询人口居住房屋信息)

通过人口ID，查询人口居住房屋信息


## 请求方式

GET

## 请求参数

##### GET 参数

名称|类型|是否必须|示例值|更多限制|描述
--|--|--|--|--|--
id|String|是|3ca02ec1-179c-41cf-b9e8-0e468524f168||人口ID

## 响应参数

名称|类型|示例值|描述
--|--|--|--
id|String|house1|房屋ID
bId|String|building1|楼栋ID 
houseNumber|String|0001|房号
signType|String|null|产权证类型，域字段：signType
address|String|长兴县XX街010号|房屋地址 
propertyType|String|10000179|产权类型 ，域字段：propertyType
pId|String|testPerson3|产权人ID
houseUse|String|用途|房屋用途，域字段：houseUse
houseStructure|String|砖混|房屋结构 ，域字段：houseStructure
houseArea|Number|120|房屋面积
houseType|String|2|房屋类型，域字段：houseType
houseNature|String|null|房屋性质 ，域字段：houseNature
isFireChannels|String|0|有无消防通道
isSafetyChannel|String|1|有无安全通道
isRental|String|1|是否出租
hiddenDangerLevel|String|00|隐患类型，域字段：hiddenDangerLevel
commonSituation|String|null|共有情况
indoorArea|Number|null|室内面积
planUse|String|null|计划用途，域字段：houseUse
floor|Number|null|层数 
isPublic|String|null|是否公房 
signAddress|String|null|所属小区
longitude|String|null|经度
latitude|String|null|纬度
gId|String|1143560879472640|网格ID 
createDate|String|2017-03-03 13:14:07|创建时间 
updateDate|String|null|更新时间
dataSource|String|1|数据来源
pName|String|皮户主|产权人姓名
pCardNum|String|330522196910300917|产权人身份证号码
pPhone|String|17829932012|产权人联系电话
gridkName|String|高家墩居委会/桥南塘东片（第一网格）|房屋所在网格
rentalInfo|rentalInfo{}||出租房信息
--id|String|rentalHouse1|出租房ID
--hId|String|house1|房屋ID
--pId|String|testPerson1|治安负责人ID 
--isSignGuarantee|String|1|是否签订治安负责保证书
--limitPersons|Number|3|限住人数
--realityPersons|Number|2|实住人数 
--houseFileNum|String|2|租赁备案证号
--managerTypes|String|10000182|管理类别 ，域字段：managerType
--rentalHouseProperty|String|254|出租房性质，域字段：rentalHouseProperty
--rentalType|String|241|出租房类别，域字段：rentalType
--roomNumber|Number|2|出租房间数
--rentalUse|String|02|出租用途
--czPId|String|testPerson2|承租人ID 
--dataSource|String|1|数据来源
--pName|String|皮修平|治安负责人姓名
--pCardNum|String|330522198910300917|治安负责人身份证号码
--pPhone|String|17829932012|治安负责人电话
--czName|String|纪盼巧|承租人姓名
--czCardNum|String|330522197801288969|承租人身份证号码
--czPhone|String|17829932012|承租人电话

## 响应示例
```
{
    "success": 1, 
    "data": {
        "id": "house1", 
        "bId": "building1", 
        "houseNumber": "0001", 
        "signType": null, 
        "address": "长兴县XX街010号", 
        "propertyType": "10000179 ", 
        "pId": "testPerson3", 
        "houseUse": "用途", 
        "houseStructure": "砖混", 
        "houseArea": 120, 
        "houseType": "2", 
        "houseNature": null, 
        "isFireChannels": "0", 
        "isSafetyChannel": "1", 
        "isRental": "1", 
        "hiddenDangerLevel": "00", 
        "commonSituation": null, 
        "indoorArea": null, 
        "planUse": null, 
        "floor": null, 
        "isPublic": null, 
        "signAddress": null, 
        "longitude": null, 
        "latitude": null, 
        "gId": "1143560879472640", 
        "createDate": "2017-03-03 13:14:07", 
        "updateDate": null, 
        "dataSource": "1", 
        "pName": "皮户主", 
        "pCardNum": "330522196910300917", 
        "pPhone": "17829932012", 
        "gridName": "高家墩居委会/桥南塘东片（第一网格）", 
        "retalInfo": {
            "id": "rentalHouse1", 
            "hId": "house1", 
            "pId": "testPerson1", 
            "isSignGuarantee": "1", 
            "limitPersons": 3, 
            "realityPersons": 2, 
            "houseFileNum": "2", 
            "managerTypes": "10000182", 
            "rentalHouseProperty": "254", 
            "rentalType": "241", 
            "roomNumber": 2, 
            "rentalUse": "02", 
            "czPId": "testPerson2", 
            "dataSource": "1", 
            "pName": "皮修平", 
            "pCardNum": "330522198910300917", 
            "pPhone": "17829932012", 
            "czName": "纪盼巧", 
            "czCardNum": "330522197801288969", 
            "czPhone": "17829932012"
        }
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
    path:"/cigApi/zhzl/person/jzHouse?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```