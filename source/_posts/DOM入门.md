---
title: DOM入门
tags: 了解DOM
summary: 'JavaScript组成有三部分:ECMAScript、DOM、BOM'
categories: DOM
abbrlink: 10909
date: 2019-05-05 10:49:23
---

# JavaScript 的组成

- **ECMAScript**

- **DOM*(文档对象模型)***

- **BOM*(浏览器对象模型)***

  <hr>

## **API**

*appliction programming interface*应用程序编程接口，是一些预先定义的函数.



## Web API

是浏览器提供的一套操作浏览器功能和页面元素的API（BOM和DOM）；



web编程（浏览器的网页编程）；

一般都有输入和输出（函数的传参和返回值）,Web Api 很多方法（函数）；

<hr>

### DOM

*Document Object Model*（文档对象模型）

W3C推荐的处理可扩展标记语言，是一种标准编程接口

当网页加载时，浏览器会为页面创建一个文档对象模型..

所有对象都排列为树形结构...

```
文档：docunment
元素：标签
节点：属性，空格，注释...
```

<hr>

# 获取元素

- 根据ID*( getElementById)*
- 根据标签名*(getElementByTagName)* 返回一个包括所有给定标签名称的元素的 HTML 集合[`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。 整个文件结构整体被搜索，包括根节点。返回的 `HTML集合`是动态的，可以自动更新自己来保持和 DOM 树的同步而不用再次调用 `document.getElementsByTagName()` 。
- 通过标签的NAME属性值获取一组节点集合*(getElementByName)*
- 通过指定的上下文或按照class名取指定的标签，获取的是一个**元素集合** *（getElementClassName）*
- 使用类名选择器获取*（doucument.querySelector('选择器')）*  返回值永远是一个DOM对象,即使可以匹配多个,以第一匹配的为准,获取不到就是null
- 在指定上下文中通过选择器获取一组元素集合(**伪数组+=不能使用数组的内置方法**),返回值:永远是一个伪数组,即使可以匹配1个这个伪数组长度为1,元素是真正的DOM*（document.querySelectorAll(‘选择器’))*获取不到就是空元（**通过数组方法取元素**）
- *(doucument.body)*      body属性用于设置或返回文档体
- *(doucument.doucumentElement)*以一个元素对象返回一个文档的文档元素

```html
  <div id="time">2021-10-20</div>
    <script>
        var times = document.getElementById("time");
        console.log(times);
        console.log(typeof times);
        console.dir(times); //打印返回的元素对象 查看里面的属性和方法
    </script>
```

获取DOM元素

```js
<div id="time">2021-10-20</div>
    <ul>
        <li class="one">第1天学习js</li>
        <li class='toy'>第2天学习js</li>
        <li class='toy'>第3天学习js</li>
        <li class='toy'>第4天学习js</li>
        <li>第5天学习js</li>
        <li>第6天学习js</li>
        <li>第7天学习js</li>
        <li>第8天学习js</li>
        <li>第9天学习js</li>
        <li>第10天学习js</li>
    </ul>
    <script>
        var times = document.getElementById("time");
        console.log(times);
        console.log(typeof times);
        console.dir(times);

        var lis = document.getElementsByTagName("li");
        console.log(lis); //返回值永远是伪数组
        for (var i = 0; i < lis.length; i++) {
            console.log(lis[i]);
        }

        var lis = document.getElementsByClassName("one")
        console.log(lis);

        var lis = document.getElementsByName("toy");
        console.log(lis);

        var lis = document.querySelector("li");  //他只要一个
        console.log(lis); //<li class="one">第1天学习js</li>

        var lis = document.querySelectorAll("li") //CSS选择器,得到的是伪数组,容器里装的是DOM
        console.log(lis); //

        console.log(document.body);

        console.log(document.documentElement);
```

<hr>

元素的属性获取

```js
 <a href="https://www.baidu.com">百度</a>
    <button>修改</button>
    <script>
        var a = document.querySelector('a');
        var btn = document.querySelector('button');
        btn.onclick = function () {
            a.href = 'https://parade001.github.io/';
            a.innerHTML = 'My_blog';
        }
```

<hr>

### 事件组成

- 事件源(触发对象)
- 事件类型(触发类型)
- 事件处理程序(通过函数赋值完成)

在github上看到一个比喻很是形象

```
你考试不及格惹恼了你妈妈,你妈妈叫你爸去学校,当你放学出校门把你打一顿,
当你放学出校门那刻,你被打了
```



```js
  <button>猜猜我是谁?</button>
    <script>
        // var btn = document.getElementsByTagName('button')[0]; //[0]因为...bytagname返回的是一个伪数组
        // btn.onclick = function () {
        //     alert('我是大傻逼');
        // }

        var btn = document.querySelectorAll('button')[0];
        btn.onclick = function () {
            alert('你是狗')
        }
    </script>
```

赋值操作

```js
  <div>今天是雨天</div>
    <button>记得带伞</button>
    <script>
        var div = document.querySelector('div');
        var btn = document.querySelector('button');
        btn.onclick = function () {
            div.innerHTML = "<span style=color:red>爪巴啊</span>"
            // div.innerText = "<span style=color:red>爪巴啊</span>"// interHTMl可以识别网页元素标签,innerText则不行;
```



操作元素的deemo

```js
<button>当前时间为:</button>
    <div>时间</div>
    <p>时间</p>
    <script>
        var btn = document.querySelector('button');
        var div = document.querySelector('div');
        btn.onclick = function () {
            div.innerText = getDate();
        }

        function getDate() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dates = date.getDate();
            var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            var day = date.getDay();
            return '今天是:' + year + '年' + month + '月' + dates + '日' + arr[day];
        }
        var p = document.querySelector('p');
        p.innerText = getDate();
    </script>
```

通过更改路径达到更换图片的deemo

```js
  var ldh = document.getElementById('ldh')
        var zxy = document.getElementById('zxy')
        var img = document.querySelector('img')
        zxy.onclick = function () {
            img.src = // 图片路径 ; //通过更改路径更换图片;
                img.title = '张学友';
        }
        ldh.onclick = function () {
            img.src = // 图片路径;
                img.title = '刘德华';
        }
```

京东密码框表单元素的deemo

```js
<style>
     .box input {
            width: 370px;
            height: 30px;
            line-height: 30px;
            border: none;
            outline: none;
            text-align: center;
        }

        .input_style {
            color: #aaa;
            border: 1px solid #d9d9d9;
            outline: none;
        }

        .input_text_focus {
            border: 1px solid #ffd6db;
            color: #888;
            outline: none;
        }

        .box {
            margin: 100px auto;
            width: 500px;
            border: 1px solid #ccc;
            border-radius: 15px 15px 15px 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

</style>
</head>

<body>
    <div class="box">
        <input type="text" value="邮箱/ID/手机号" class="input_style" style="color:#ccc">
    </div>
    <script>
        var input = document.querySelector('input');
        input.onfocus = function () {
            if (this.value === '邮箱/ID/手机号') {
                this.value = '';
                this.className = 'input_style';
            }

            this.style.color = 'Cyan';
        }
        input.onblur = function () {
            if (this.value === '') {
                this.value = '邮箱/ID/手机号';
                this.className = 'input_style';
            }
            this.style.color = '#9999';
        }
    </script>
</body>
```



Web API输入框焦点deemo

```js
<style>
        .box input {
            width: 370px;
            height: 30px;
            line-height: 30px;
            border: none;
            outline: none;
            text-align: center;
        }

        .input_style {
            color: #aaa;
            border: 1px solid #d9d9d9;
            outline: none;
        }

        .input_text_focus {
            border: 1px solid #ffd6db;
            color: #888;
            outline: none;
        }

        .box {
            margin: 100px auto;
            width: 500px;
            border: 1px solid #ccc;
            border-radius: 15px 15px 15px 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>

<body>
    <div class="box">
        <input type="text" value="邮箱/ID/手机号" class="input_style" style="color:#ccc">
    </div>
    <script>
        var input = document.querySelector('input');
        input.onfocus = function () {
            this.value = '';
            this.className = 'input_style';
        }
        input.onblur = function () {
            if (this.value == '') {
                this.className = 'input_style';
                this.value = '邮箱/ID/手机号';
            }
        }
    </script>
</body>
```



关闭广告的deemo

```js
  .box {
            position: relative;
            width: 100%;
            height: 100px;
            margin: 100px auto;
            background: red;
        }

        .box img {
            width: 100%;
            height: 100%;
        }

        .box .close {
            position: absolute;
            right: 0;
            top: 0;
        }

        .box .stop {
            width: 40px;
            height: 40px;
        }

        .box .stop img {
            width: 40px;
            height: 40px;
        }
    </style>
</head>

<body>
    <div class="box">
        <img src="../img/luzhou.jpg" alt="">
        <div class="stop"><img src="../img/close.jpg" alt="" class="close"></div>
    </div>
    <script>
        var btn = document.querySelector('.stop');
        var box = document.querySelector('.box');
        btn.onclick = function () {
            box.style.display = 'none';
        }
    </script>
</body>
```



下拉菜单的案例

```js
<style>
        * {
            margin: 0;
            padding: 0;
        }

        .baba {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 100px auto;

        }

        li {
            list-style: none;
            background: #ccc;
            width: 70px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
        }

        li a {
            font-size: 18px;
            text-decoration: none;
        }

        .sow {
            text-align: center;
        }

        .cow {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>

<body>
    <ul class="baba">
        <li><a href="">weibo</a>
            <ul class='sow'>
                <li class='cow'><a href="">微博</a></li>
                <li class='cow'><a href="">微博</a></li>
                <li class='cow'><a href="">微博</a></li>
                <li class='cow'><a href="">微博</a></li>
                <li class='cow'><a href="">微博</a></li>
            </ul>
        </li>
    </ul>
    <script>
        var baba = document.querySelector('.baba');
        var lis = baba.children;
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function () {
                this.children[1].style.display = 'block';
            }
            lis[i].onmouseout = function () {
                this.children[1].style.display = 'none';
            }
        }
    </script>
</body>
```

背景颜色关灯案例

```js
 <style>
        body {
            background-color: aqua;
        }

        p {
            color: red;
            margin-top: 50px;
            text-align: center;
        }
    </style>
</head>

<body>
    <button>天黑请关灯</button>
    <script>
        var btn = document.querySelector('button');
        var body = document.querySelector('body');
        var flag = 1;
        btn.onclick = function () {
            if (flag == 1) {
                body.style.backgroundColor = "#000";
                flag = 0;
            } else {
                body.style.backgroundColor = "#fff";
                flag = 1;
            }
        }
    </script>
</body>
```

