---
title: AJAX入门
tags: XMLHttpRequest
summary: '本文将介绍脚本化的HTTP:AJAX,同源策略与跨域请求'
categories: JavaScript
abbrlink: 5703
date: 2019-06-07 10:49:13
keywords:
description:
前言
---

### 前言

Ajax是Asynchronous JavaScript and XML 的缩写

> *超文本传输协议(hyper transfer protocol,HTTP)规定Web浏览器如何从Web服务器获取文档和向Web服务器提交表达内容,以及Web服务器如何响应这些请求和提交.通常,HTTP并不在脚本的控制下,知识当用户点击链接、提交表达和输入url时发生.*
>
> *但是,用JS代码操纵http是可行的*
>
> *ajax应用的主要特点,是用脚本操纵http和Web服务器进行数据交换,不会导致页面重载.*
>
> *script标签的src属性能设置URL并发起HTTP GET请求,可以通过跨域通讯而不受同源策略限制.*
>
> *通常,基于script标签的Ajax传输协议时,服务器响应采用JSON编码的数据结构.*
>
> *当执行脚本时,JS解析器能自动将其解码.**由于它使用JSON数据格式,因此这种Ajax传输协议也叫"JSONP"***
>
> ​																						   JavaScript权威指南 第六版

### HTTP请求由4部分组成：

- HTTP请求方法或“动作”（verb)

- 正在请求的URL
- 一个可选的请求头集合，其中可能包括身份验证信息
- 一个可选的请求主体

### **服务器返回的HTTP响应包含3部分：**

- 一个数字和文字组成的状态码，用来显示请求的成功和失败
- 一个响应头集合
- 响应主体

<p align='right'>	JavaScript权威指南 第六版</p>



<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyfkj1nyxlj30ig04eq4z.jpg"/>



### XHR的readyState码

<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/readystatecode.png'>



<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/readystate2.png'>

<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs%2Freadystate2.png' alt='' >

<hr>

# JSON

JSON 是JS子集.[请参考](https://www.json.org/json-en.html)

XMLHttpRequest()不是协议级的HTTP API而是浏览器级的API。

通过下面2中方法拿到服务器响应回来的数据

- **load 事件**

- **xhr.response**

浏览器需要考虑cookie、重定向、缓存和代理，但代码只需要担心请求和响应。

JSON（全称：***JavaScript Object Notation***）是一种数据交换格式.

它本质上是用字符串的方式来表示对象或数组类型的数据。用字符串的方式来表示的对象或数组类型的数据，叫做 JSON数据

JSON 数据的格式有两种：

①**对象格式**

**②数组格式**



对象格式的 JSON 数据，最外层使用 {  } 进行包裹，内部的数据为 key: value 的键值对结构。其中：

①**key 必须使用英文的双引号进行包裹**

**②value 的值只能是字符串、数字、布尔值<br>**

**null、数组、对象类型（可选类型只有这 6 种）**

<hr>

# 同源策略

**什么是同源?**

> **同源**指的是**两个 URL 地址**具有相同的**协议、主机名、端口号**
>
> **反之则是跨域**
>
> **出现跨域的根本原因：浏览器的同源策略不允许非同源的 URL 之间进行资源的交互**

下表给出了相对于 http://www.test.com/index.html
页面的 5 个同源检测结果：

| URL                                | 是否同源 | 原因说明                                                     |
| ---------------------------------- | -------- | ------------------------------------------------------------ |
| http://www.test.com/other.html     | 是       | 同源（协议、域名、端口相同）                                 |
| https://www.test.com/about.html    | 否       | 协议不同（http 与 https）                                    |
| http://blog.test.com/movie.html    | 否       | 域名不同（www.test.com 与 blog.test.com）                    |
| http://www.test.com:8001/home.html | 否       | 端口不同（默认的 80 端口与 7001 端口,https默认443.,mysql默认3306） |
| http://www.test.com:80/main.html   | 是       | 同源（协议、域名、端口相同）                                 |

同源策略（英文全称 *Same origin policy*）是浏览器提供的一个安全功能。

**浏览器的同源策略规定：不允许非同源的 URL 之间进行资源的交互。**

<hr>

突破浏览器跨域限制的方案

- *JSONP*

  优点:  兼容性好（兼容低版本 IE）

  缺点:  仅支持 GET请求

- *CORS(Cross-origin resource sharing)*

  优点:  支持 *GET、POST、PUT、DELETE、PATCH*等常见的请求方式

  缺点:  不兼容某些低版本浏览器

- 正向代理Proxy(纯前端)

  只适用于开发版本地开发环境

- 反选代理nginx(后端)

CORS 是解决跨域数据请求的终极解决方案，全称是 Cross-origin resource sharing。

CORS 技术需要浏览器和服务器同时支持，二者缺一不可：

①浏览器要支持 CORS 功能（主流的浏览器全部支持，IE 不能低于 IE10）

②服务器要开启 CORS 功能（需要后端开发者为接口开启 CORS 功能）

实现 CORS 的关键，是在服务器端,因为如果服务器端没有开启 CORS 功能，则客户端无法访问那些跨域的接口！

<hr>

在解决跨域问题时：

CORS 方案用到了 XMLHttpRequest 对象，发起的是纯正的 Ajax 请求

JSONP 方案底层没有用到 XMLHttpRequest 对象，因此，JSONP 不是真正的 Ajax 技术.JSONP 底层原理用 script 标签的  src  属性。

结论：只要用到了 XMLHttpRequest 对象，发起的就是 Ajax 请求！

<hr>

***JSONP底层实现原理:***

- 通过script 的src标签 ,把非同源的JavaScript 代码请求到本地
- 如果请求回来的 JavaScript 代码只包含函数的调用,则需要手动定义方法,
- 在指定 script 标签的 src 属性时，可以通过查询参数中的 callback，自定义回调函数的名称
- 在指定 script 标签的 src 属性时，还可以通过查询参数的方式，指定要发送给服务器的数据：

```js
  <script src="./jquery.js"></script>
    <script>
        // 1.发起跨域的ajax请求
        $.ajax({
            // dataType属性可以设置jsonp请求
            dataType: 'jsonp',
            method: 'GET',
            url: 'http://localhost:8888/api/jsonp',
            success: function (res) {
                console.log(res);
            }
        });
    </script>

    <!-- script标签没有跨域限制。因为script标签不属于js，属于html -->
    <!-- 1. script标签会把收到的字符串代码，按照js语法执行 -->
    <!-- <script src="http://localhost:8888/api/jsonp"></script> -->

    <!-- 2.前端定义好一个全局函数，让后端设置响应头来允许某些域名访问,Access-Control-Allow-Origin -->
    <script>
        function ccc(res) {
            // 我们在这个位置可以随意操作数据，而不仅仅是 输出
            console.log(res);
        }

        // function lvchaoJSONP(obj) {
        //     let script = document.createElement('script');
        //     document.body.appendChild(script);
        //     window.babayetu = obj.success;
        //     script.src = obj.url + "?callback=babayetu"
        // }

    </script>
    <!-- <script src="http://localhost:8888/api/jsonp?callback=ccc"></script> -->
```

<hr>

- 后端接口代码：

  ```js
  app.get('/api/jsonp', (req, res) => {
    // res.send('hello');
    // res.send('console.log(1234)');
    // res.send('abc()')
    // res.send('abc(12345)')
  
    // 接收客户端的函数名
    let fn = req.query.callback;
    let obj = { status: 0, message: '登录成功' };
    let str = JSON.stringify(obj);
    res.send(fn + `(${str})`);
  });
  ```

  前端代码：

  ```html
  <script>
    // 提前准备好一个函数
    function xxx(res) {
      console.log(res)
    }
  
  </script>
  
  <script src="http://localhost:3006/api/jsonp?callback=xxx"></script>
  ```

- 前端需要做什么？

  - 如果使用jQuery，$.ajax({ **dataType: 'jsonp'** })，必须指定dataType选项为jsonp即可

- 后端需要做什么？

  - 如果使用express，那么直接调用 `res.jsonp(数据)` 即可。

<hr>

防抖：频繁触发事件，只执行最后 1 次

节流：单位时间内，频繁触发的事件只执行 1 次

<hr>

# HTTP 状态码

当浏览者访问一个网页时，浏览者的浏览器会向网页所在服务器发出请求。当浏览器接收并显示网页前，此网页所在的服务器会返回一个包含 HTTP 状态码的信息头（server header）用以响应浏览器的请求。

HTTP 状态码的英文为 **HTTP Status Code**

下面是常见的 HTTP 状态码：

- **200 - 请求成功**
- **301 - 资源（网页等）被永久转移到其它URL**
- **404 - 请求的资源（网页等）不存在**
- **500 - 内部服务器错误**

## HTTP 状态码分类

HTTP 状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型。响应分为五类：

- **信息响应(100–199)**
- **成功响应(200–299)**
- **重定向(300–399)**
- **客户端错误(400–499)**
- **服务器错误 (500–599)**

| 分类 | 分类描述                                       |
| ---- | ---------------------------------------------- |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作   |
| 2**  | 成功，操作被成功接收并处理                     |
| 3**  | 重定向，需要进一步的操作以完成请求             |
| 4**  | 客户端错误，请求包含语法错误或无法完成请求     |
| 5**  | 服务器错误，服务器在处理请求的过程中发生了错误 |

HTTP状态码列表:

| 状态码 | 状态码英文名称                  | 中文描述                                                     |
| ------ | ------------------------------- | ------------------------------------------------------------ |
| 100    | Continue                        | 继续。客户端应继续其请求                                     |
| 101    | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
|        |                                 |                                                              |
| 200    | OK                              | 请求成功。一般用于GET与POST请求                              |
| 201    | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202    | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203    | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204    | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205    | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206    | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                        |
|        |                                 |                                                              |
| 300    | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301    | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302    | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303    | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看               |
| 304    | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305    | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306    | Unused                          | 已经被废弃的HTTP状态码                                       |
| 307    | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                     |
|        |                                 |                                                              |
| 400    | Bad Request                     | 客户端请求的语法错误，服务器无法理解                         |
| 401    | Unauthorized                    | 请求要求用户的身份认证                                       |
| 402    | Payment Required                | 保留，将来使用                                               |
| 403    | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404    | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405    | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406    | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407    | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408    | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409    | Conflict                        | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突 |
| 410    | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411    | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412    | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413    | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414    | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415    | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416    | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417    | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
|        |                                 |                                                              |
| 500    | Internal Server Error           | 服务器内部错误，无法完成请求                                 |
| 501    | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502    | Bad Gateway                     | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503    | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504    | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505    | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |

<hr>



#### **封装AJAX函数的步骤**

1.创建xhr对象

2.调用xhr.open()函数

​	open第一个参数指定HTTP方法或者动辄.这个字符串不区分大小写.但是通常用大写字母匹配HTTP协议.

​	**GET用于常规请求**适用于当URL完全指定请求资源,当请求对服务器没有任何副作用以及当服务器的响应是可缓存时。（当提交表单的目标仅仅是一个只读查询，GET比POST更合适。）

​	**"POST"方法常用于HTML表单**。它在请求主体中包含额外数据（表单数据）且这些数据常存储到服务器上的数据库中（副作用）。相同URL的重复POST请求从服务器得到的响应可能不同，同时不应该缓存使用这个方法的请求。

3.调用send()函数

4.监听load事件

<hr>
同步响应
由于其本身的性质，异步处理HTTP响应是最好的方式。然而，XMLHttpRequest也支持同步响应。如果把false作为第3个参数传递给open()，那么send()方法将阻塞直到请求完成。在这种情况下，不需要使用事件处理程序：一旦send()返回，仅需要检查XMLHttpRequest对象的status和responseText属性.

同步请求是吸引人的，但应该避免使用它们。客户端JavaScript是单线程的，当send()方法阻塞时，它通常会导致整个浏览器UI冻结。如果连接的服务器响应慢，那么用户的浏览器将冻结

<hr>

ES7中 在createds生命周期中利用axios发送ajax请求

```js
import axios from 'axios'
axios.defaults.baseURL='http://...:....'
Vue.prototype.$ajax=axios
```

```js
async created(){
    const {{data:res}} = await this.$ajax({
        url:''
    })
    this.list=(res.data)
}
```

