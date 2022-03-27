---
layout: post
title: 浅谈 cookie seesion token 区别
summary: 本文将具体介绍 cookie,session,token,JWT
abbrlink: 5453
date: 2022-03-27 10:33:12
tags: HTTP cookies
categories: OSI
---

### cookie:

**是存储在浏览器端的一小段文本数据,内容会随着http请求一起发送到服务器端**

基本流程:浏览器发起http请求,服务器进行cookie进行设置,也就是set-cookie,cookie里有名值这个对,服务器将这个名值对填充完成后,将cookie发送给浏览器,浏览器将其保存,这样浏览器以后发送的每个请求都会自动带上这个 cookie,就是存储在浏览器的数据,因此将用户名和密码 放在cookie 是很不安全的,容易被泄漏

<hr>

### session：

**是存储在服务器端的一组数据,他会在服务器端创建session id 和会话结束时间**

seesion 验证机制：

通常把seeion id 存储在cookie 里,此时的浏览器端的session 是没有用户密码,seeion id 也是没有规律的字符串,此时即使浏览器的session id 即使被劫持,也意义不大,因为只是一段没有规律的字符串,服务器端在发送这个cookie 之前会对这个含有session id 的cookie 进行签名,被劫持修改的session id,服务器也是无法识别的.

会话结束:cookie 有效期失效(用户登出),浏览器会自行删除cookie

会话结束后需要重新输入账号密码

<hr>

### token:  

通常用来代表一小段字符串,可以存储在 cookie ,也可以存储在服务器的内存里,或者其他地方

**token组成**

- uid:  用户唯一身份标识
- time: 当前时间的时间戳
- sign:  签名, 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
- 固定参数(可选): 将一些常用的固定参数加入到 token 中是为了避免重复查库

token可以抵抗csrf，cookie+session不行

session时有状态的，一般存于服务器内存或硬盘中，当服务器采用分布式或集群时，session就会面对负载均衡问题。负载均衡多服务器的情况，不好确认当前用户是否登录，因为多服务器不共享session

三者是不同维度的东西.

<hr>

JWT:因为大量的session 存储在服务器端等各种原因,对后端压力其实挺大的.因此出现了JWT.

### **JWT 组成**

### header.payload.signature

header : 部分声明需要用什么算法来生成签名

payload : 是一些特定的数据,比如有效期

signature: 前两个部分会仅由Base64 编码,而不加密,容易被破解解码,服务器不保存JWT,但是服务器会保存一段密码,这段密码要结合两段编码进行算法运算,最终得到签名信息,而签名的信息也就是signature



用户第一次登录:服务器会生成一个JWT,服务器不需要保存这个JWT,

而只需要保存JWT签名的密文,接着把JWT发给浏览器,可以让浏览器以Cookie或者storage 形式进行存储,和Session 很类似,只不过 Token 存储在用户那边 ,而Token 安全性:



客户端登陆传递信息给服务端，服务端收到后把用户信息加密（token）传给客户端，客户端将token存放于localStroage等容器中。客户端每次访问都传递token，服务端解密token，就知道这个用户是谁了。通过cpu加解密，服务端就不需要存储session占用存储空间，就很好的解决负载均衡多服务器的问题了。这个方法叫做JWT(Json Web Token)

### 生成 token

借助第三方库`jsonwebtoken`，通过`jsonwebtoken` 的 `sign` 方法生成一个 `token`：

- 第一个参数指的是 Payload
- 第二个是秘钥，服务端特有
- 第三个参数是 option，可以定义 token 过期时间



<hr>

### token 和 JWT 区别

token是一个很宽泛的概念，翻译为令牌，一般用来表示经过验证之后得到的凭证，长度没有什么限制，多长都可以,是无状态协议中认证用户的一种形式，相比于传统的cookie，不受域名限制

jwt是 JSON Web Token，它也自称是一种token，jwt就是一个很具体的标准了，用点号分为三段，分别表示头、信息和签名,只是一种实现形式，通过在客户端存储payload来降低服务端压力

token有很多种，可以是标准的，也可以是你自己定义的，jwt则是其中一种token，而且是标准的token。

和我们自己随意定义的token差别大是很自然的，因为我们自己定义的token只需要用来识别用户登录状态，一般很短的uid都可以实现，所以比较短。

<hr>

### 总结:

session: 是诞生并保存在服务器那边的由服务器主导一切

cookie: 是一种数据载体,把Session 放在Cookie 中送到客户端那边,Cookie 跟随每个http请求发送出去

token: 是但是在服务器,但是保存在浏览器这边,可以放在Cookie 或者Storage 里面,持有token意义可以访问服务器

<hr>

### 参考

[如何实现jwt鉴权机制？](https://vue3js.cn/interview/NodeJS/jwt.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

[token和JWT是什么关系？](https://segmentfault.com/q/1010000018591060)