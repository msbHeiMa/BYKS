# 公共参数

请求地址：

环境|HTTP请求地址
--|--
正式环境|http://222.46.11.118:12080/
测试环境|http://222.46.11.118:12080/

## 公共请求参数（GET）

名称|类型|是否必须|描述
--|--|--|--
app_key|String|是|账号登陆后分配的 app_key
sign_method|String|是|签名的摘要算法，可选值为：hmac，md5。
sign|String|是|API输入参数签名结果，签名算法见后文
timestamp|String|是|时间戳，格式为yyyy-MM-dd HH:mm:ss，时区为GMT+8，例如：2015-01-01 12:00:00。允许客户端请求最大时间误差为10分钟。
format|String|否|响应格式。可选值：json

## 签名算法

为了防止API调用过程中被黑客恶意篡改，调用任何一个API都需要携带签名，TOP服务端会根据请求参数，对签名进行验证，签名不合法的请求将会被拒绝。TOP目前支持的签名算法有两种：MD5(sign_method=md5)，HMAC_MD5(sign_method=hmac)，签名大体过程如下：

* 对所有API请求参数（包括公共参数和业务参数，但除去sign参数和byte[]类型的参数），根据参数名称的ASCII码表的顺序排序。如：foo=1, bar=2, foo_bar=3, foobar=4排序后的顺序是bar=2, foo=1, foo_bar=3, foobar=4。
* 将排序好的参数名和参数值拼装在一起，根据上面的示例得到的结果为：bar2foo1foo_bar3foobar4。
* 把拼装好的字符串采用utf-8编码，使用签名算法对编码后的字节流进行摘要。如果使用MD5算法，则需要在拼装的字符串前后加上app的secret后，再进行摘要，如：md5(secret+bar2foo1foo_bar3foobar4+secret)；如果使用HMAC_MD5算法，则需要用app的secret初始化摘要算法后，再进行摘要，如：hmac_md5(bar2foo1foo_bar3foobar4)。
* 将摘要得到的字节流结果使用十六进制表示，如：hex(“helloworld”.getBytes(“utf-8”)) = “68656C6C6F776F726C64”

说明：MD5和HMAC_MD5都是128位长度的摘要算法，用16进制表示，一个十六进制的字符能表示4个位，所以签名后的字符串长度固定为32个十六进制字符。
