# cigApi/zhzl/person/flowTrack (查询人口流动轨迹信息)

通过人口ID，查询人口流动轨迹信息


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
data|flowTracks[]||流动轨迹列表
--gridName|String|大西门社区/凤凰小区（第四网格）|人员所在网格，列表第一条标示人员初始网格，最后一条标示人员当前所在网格
--createdate|String|2017-01-18 00:00:00|人员进入该网格的时间
--dAddr|String|凤凰小区4-4-102|人员在该网格时的详细地址
--flowReason|String|搬迁|人员流动到该网格的缘由，列表第一条数据没有此值

## 响应示例
```
{
    "success": 1, 
    "data": [
        {
            "gridName": "大西门社区/凤凰小区（第四网格）", 
            "createDate": null, 
            "dAddr": "凤凰小区4-4-102"
        }, 
        {
            "gridName": "高家墩居委会/桥南塘东片（第一网格）", 
            "createDate": "2017-01-18 00:00:00", 
            "dAddr": "一网格", 
            "flowReason": "搬迁"
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
    method:"GET"
    path:"/cigApi/zhzl/person/flowTrack?id=3ca02ec1-179c-41cf-b9e8-0e468524f168&app_key=12129701&format=json&sign=E15F129BE9B67FB2346A0C1D54D0D589&sign_method=hmac&timestamp=2017-02-03+16%3A56%3A43",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "charset":"utf-8"
    }
},function(res){

});
```