---
title: BOM定时器运用
tags: 定时器
summary: setInterval的运用
categories: BOM
abbrlink: 14970
date: 2019-05-13 09:31:24
---

# BOM

*Browser Object Model*（浏览器对象模型）由对象

- `navigator`

- `history`

- `screen`

- `location`的`document`子级组成`window`。

节点中`document`是DOM（Document Object Model），文档对象模型，代表页面的内容。

所有浏览器都支持窗口对象，它代表窗口浏览器。

所有全局 JavaScript 对象、函数和变量都自动成为window对象的成员。

全局变量是 window 对象的属性。

全局函数是 window 对象的方法。

您可以使用 javascript 操作它使 JavaScript 有能力与浏览器"对话"

location.assign方法

```js
  <button>跳转</button>
    <script>
        var btn = document.querySelector('button');
        btn.addEventListener('click', function () {
            // location.href = 'http://cn.bing.com';
            location.assign('http://cn.bing.com');
        })
    </script>
```

以及前文写过的打开一个视口,还记得吗popUp这个方法,他也是BOM中的一种方法



页面跳转传递参数demo

```html
   <form action="13-index.html" method="get">
        用户名: <input type="text" name="uname" placeholder="">
        <input type="submit" value="提交" name="">
    </form>
```

```js
  <div></div>
    <script>
        console.log(location.search); //?name = andy
        var params = location.search.substr(1);
        console.log(params);
        var arr = params.split('=');
        var div = document.querySelector('div');
        console.log(arr);
        div.innerHTML = `<span style = 'color:'>${arr[1]}</span>,欢迎您`;
    </script>
```



## demo 利用定时器写一个倒计时的效果

```js
  <style>
        div {
            margin: 200px;
        }

        span {
            display: inline-block;
            width: 150px;
            height: 40px;
            background-color: orange;
            font-size: 20px;
            color: #fff;
            text-align: center;
            line-height: 40px;
        }
    </style>
</head>

<body>
    <div class="">
        <span class="hour">1234</span>
        <span class="minute">1234</span>
        <span class="second">1234</span>
    </div>
    <script>
        var span = document.querySelectorAll("span");
        var futureTime = +new Date("2022-2-28 17:00:00");
        countDown();

        function countDown() {
            var nowTime = Date.now();
            var times = (futureTime - nowTime) / 1000;
            var h = parseInt(times / 60 / 60).toString().padStart(2, '0');
            span[0].innerHTML = h;
            var m = parseInt(times / 60 % 60).toString().padStart(2, '0');
            span[1].innerHTML = m;
            var s = parseInt(times % 60).toString().padStart(2, '0');
            span[2].innerHTML = s;
        }
        setInterval(countDown, 1000)
    </script>
```

利用定时器实现页面跳转(setInterval方法)

```js
<button>点我</button>
    <div class="">233333</div>
    <script>
        var btn = document.querySelector('button');
        var div = document.querySelector('div');
        btn.addEventListener('click', function () {
            location.href = 'http://dnf.qq.com';
        })
        var timer = 5;
        setInterval(function () {
            timer--;
            if (timer == 0) {
                location.href = 'http://dnf.qq.com';
            } else {
                div.innerHTML = '您将在:' + timer + '秒后跳转至dnf官网'
            }

        }, 1000);
    </script>
```

利用Dom请求当前地理位置

```js
 <script>
        // console.log(windows.navigator);
        window.navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        })
    </script>
```

window.onresize获取或者设置当前的resize事件的处理函数

```js
  <script>
        window.onresize = function () {
            console.log('窗口改变了');
        }
    </script>
```

window.confirm弹窗

```js
<script>
        var str = window.prompt('输入值Z');
        confirm('确定?');
        var res = window.confirm('确定?');
        console.log(res);
    </script>
```

倒计时的demo

```js
   div {
            text-align: center;
            width: 980px;
            margin: 200px auto;
        }

        span {
            /* background-color: orange; */
            font-size: 30px;
            margin: 70px 20px 20px;
        }
    </style>
</head>

<body>
    <div>
        <h2>距离2022春节,还有</h2>
        <span class="day">1234</span>
        <span class="hour">1234</span>
        <span class="minute">1234</span>
        <span class="second">1234</span>
    </div>
    <script>
        var span = document.querySelectorAll("span");
        var futureTime = +new Date("2022-2-1 0:00:00");
        countDown();

        function countDown() {
            var nowTime = Date.now();
            var times = (futureTime - nowTime) / 1000;
            var d = parseInt(times / 60 / 60 / 24).toString();
            span[0].innerHTML = `${d}天`;
            var h = parseInt(times / 60 / 60 % 24).toString().padStart(2, '0');
            span[1].innerHTML = `${h}时`;
            var m = parseInt(times / 60 % 60).toString().padStart(2, '0');
            span[2].innerHTML = `${m}分`;
            var s = parseInt(times % 60).toString().padStart(2, '0');
            span[3].innerHTML = `${s}秒`;
        }
        setInterval(countDown, 1000)
    </script>
```

页面文本时钟

```js
    <style>
        #nowtime {
            width: 200px;
            height: 30px;
            background-color: cyan;
        }
    </style>
</head>

<body>
    <div id="nowtime">
    </div>
    <script>
        function getDate() {
            var date = new Date();
            var date1 = date.toLocaleString()
            var div1 = document.getElementById("nowtime");
            div1.innerHTML = date1;
        }
        setInterval("getDate()", 1000);
    </script>
```
