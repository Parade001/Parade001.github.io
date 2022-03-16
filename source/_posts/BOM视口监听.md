---
title: BOM视口监听事件的运用
tags: 视口监听事件
summary: scrollHeight、page、offset事件监听demo
categories: BOM
abbrlink: 58604
date: 2019-05-16 09:31:34
---

BOM操作

Scroll 操作 

x&y轴滚动同时存在

```html
   <style>
        .baba {
            width: 400px;
            height: 400px;
            overflow: scroll;
          
        }

        img {
            width: 1200px;
            height: 990px;
        }
    </style>
</head>

<body>

    <div class="baba"><img src="../img/preview.jpg" alt=""></div>
</body>

```

scrollY轴滚动条效果

```js
  <style>
        .box {
            width: 300px;
            height: 300px;
            border: 2px solid red;
            background-color: cyan;
            border-radius: 50px;
            overflow: auto;
            /* overflow: scroll; */
        }
    </style>
</head>

<body>
    <!-- 立即执行函数:自调用函数可以避免变量污染 -->
    <!-- scrollWidth:盒子的实际宽度
    scrollHeight:盒子的实际高度
    scrollTop:溢出的高度
    scrollLeft:溢出的宽度 -->

    <div class="box">
        锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD））锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）锟(0xEFBF)斤（0xBDEF）拷（0xBFBD）

    </div>
    <script>
        var div = document.querySelector('div');

        div.addEventListener('scroll', function () {
            console.log(div.scrollWidth, div.scrollHeight);
        })
    </script>
```



search焦点

```js
  <input type="text">
    <script>
        var input = document.querySelector('input');
        // input.addEventListener('input', function () {
        //     console.log(input.value);
        // })
        //oninput 在输入值的时候就触发

        // onchange 在输入框时只有失去焦点并且值改变才触发
        input.addEventListener('change', function () {
            console.log(input.value);
        })
    </script>
```

offset方法

```js
  * {
            margin: 0;
            padding: 0;
        }

        .baba {
            width: 300px;
            height: 300px;
            margin: 200px auto;
            background-color: gold;
            position: relative;
            /* overflow: hidden; */
        }

        .son {
            position: absoute;
            width: 100px;
            height: 100px;
            margin: 30px auto;
            background-color: cyan;
        }
    </style>
</head>

<body>
    <div class='baba'>123
        <div class="son">345</div>
    </div>

    <script>
        //offsetTop:元素具有定位父级元素的Y轴大小(如果没有定位的父级元素,就是到body的距离);
        //offsetLeft:元素具有定位父级元素的X轴大小(如果没有定位的父级元素,就是到body的距离);
        var baba = document.querySelector('.baba');
        var son = document.querySelector('.son');
        console.log(baba.offsetTop);
        console.log(baba.offsetLeft);
        console.log(son.offsetTop, son.offsetLeft);
    </script>
</body>
```

利用offset获取当前坐标写入网页

```js
  <style>
        div {
            width: 300px;
            height: 300px;
            background-color: gold;
            margin: 100px auto;
        }
    </style>
    <div class="div">2333</div>
    <script>
    var div = document.querySelector("div");
        div.addEventListener("mousemove", function (e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            this.innerHTML = `x坐标是:${x}y坐标是:${y}`;
            console.log(e.offsetX, e.offsetY);
        })
    </script>
```

一个简单的动画与函数的方法

```js
<style>
        .box {
            width: 200px;
            height: 200px;
            background-color: aqua;
            position: absolute;
        }
    </style>
</head>

<body>
    <div class='box'>2333</div>
    <script>
        var div = document.querySelector('div');
        var boxs = document.querySelector('boxs');
        var timer = setInterval(function () {
            if (div.offsetLeft >= 1000) {
                clearInterval(timer);
            }
            div.style.left = div.offsetLeft + 1 + 'px';
        })
    </script>
```

封装animate函数

```js
  <style>
        div {
            position: absolute;
            width: 300px;
            height: 300px;
            background-color: cyan;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        function animate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                if (obj.offsetLeft >= target) {
                    clearInterval(obj.timer);
                    // obj.style.backgroundColor = "purple";
                    callback() && callback();
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';
            }, 30);
        }
        var div = document.querySelector('div');
        animate(div, 300, function () {
            div.style.backgroundColor = 'purple';
        });
        animate(div, 300);
    </script>

```

综合案例调用前面用到animate,以及bom 中的pageYoffset实现一个页面滚动&返回一个固定位置的btn元素事件

```js
<style>
        .slider-bar {
            position: absolute;
            left: 50%;
            top: 300px;
            margin-left: 600px;
            width: 45px;
            height: 130px;
            background-color: pink;
        }

        .w {
            width: 1200px;
            margin: 10px auto;
        }

        .header {
            height: 150px;
            background-color: purple;
        }

        .banner {
            height: 250px;
            background-color: skyblue;
        }

        .main {
            height: 1000px;
            background-color: yellowgreen;
        }

        span {
            display: none;
            position: absolute;
            bottom: 0;
        }
    </style>
</head>

<body>
    <div class="slider-bar">
        <span class='goBack'>返回顶部</span>
    </div>
    <div class="header w">header</div>
    <div class="banner w">banner</div>
    <div class="main w">main</div>
    <script>
        var sliderBar = document.querySelector('.slider-bar');
        var banner = document.querySelector('.banner');
        var main = document.querySelector('.main');
        var mainTop = main.offsetTop;
        var bannerTop = banner.offsetTop;
        var sliderBarTop = sliderBar.offsetTop;
        var goBack = document.querySelector('.goBack');
        document.addEventListener('scroll', function () {
            if (window.pageYOffset >= bannerTop) {
                sliderBar.style.position = 'fixed';
                sliderBar.style.top = sliderBarTop - bannerTop + 'px';
            } else {
                sliderBar.style.position = 'absolute';
                sliderBar.style.top = '300px';
            }
            if (window.pageYOffset >= mainTop) {
                goBack.style.display = 'block';
            } else {
                goBack.style.display = 'none';
            }
        })
        //返回动画顶部
        goBack.addEventListener('click', function () {
            animate(window, 0);
        })
        // 调用X轴移动函数
        function animate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var step = (target - obj.offsetLeft) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    callback && callback();
                }
                window.scroll(0, window.pageYOffset + step);
            }, 30);
        }
    </script>
</body>
```

综合案例2模态框事件(移动拖拽,显示隐藏)

```js
<style>
        .login-header {
            width: 100%;
            text-align: center;
            height: 30px;
            font-size: 24px;
            line-height: 30px;
        }

        ul,
        li,
        ol,
        dl,
        dt,
        dd,
        div,
        p,
        span,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        a {
            padding: 0px;
            margin: 0px;
        }

        .login {
            display: none;
            width: 512px;
            height: 280px;
            position: fixed;
            border: #ebebeb solid 1px;
            left: 50%;
            top: 50%;
            background: #ffffff;
            box-shadow: 0px 0px 20px #ddd;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }

        .login-title {
            width: 100%;
            margin: 10px 0px 0px 0px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 18px;
            position: relative;
            cursor: move;
        }

        .login-input-content {
            margin-top: 20px;
        }

        .login-button {
            width: 50%;
            margin: 30px auto 0px auto;
            line-height: 40px;
            font-size: 14px;
            border: #ebebeb 1px solid;
            text-align: center;
        }

        .login-bg {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0px;
            left: 0px;
            background: rgba(0, 0, 0, .3);
        }

        a {
            text-decoration: none;
            color: #000000;
        }

        .login-button a {
            display: block;
        }

        .login-input input.list-input {
            float: left;
            line-height: 35px;
            height: 35px;
            width: 350px;
            border: #ebebeb 1px solid;
            text-indent: 5px;
        }

        .login-input {
            overflow: hidden;
            margin: 0px 0px 20px 0px;
        }

        .login-input label {
            float: left;
            width: 90px;
            padding-right: 10px;
            text-align: right;
            line-height: 35px;
            height: 35px;
            font-size: 14px;
        }

        .login-title span {
            position: absolute;
            font-size: 12px;
            right: -20px;
            top: -30px;
            background: #F8FCFF;
            border: #ebebeb solid 1px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }
    </style>
    <body>
    <div class="login-header"><a id="link" href="javascript:;">点击，弹出登录框</a></div>
    <div id="login" class="login">
        <div id="title" class="login-title">登录会员
            <span><a id="closeBtn" href="javascript:void(0);" class="close-login">关闭</a></span>
        </div>
        <div class="login-input-content">
            <div class="login-input">
                <label>用户名：</label>
                <input type="text" placeholder="请输入用户名" name="info[username]" id="username" class="list-input">
            </div>
            <div class="login-input">
                <label>登录密码：</label>
                <input type="password" placeholder="请输入登录密码" name="info[password]" id="password" class="list-input">
            </div>
        </div>
        <div id="loginBtn" class="login-button"><a href="javascript:void(0);" id="login-button-submit">登录会员</a></div>
    </div>
    <!-- 遮盖层 -->
    <div id="bg" class="login-bg"></div>
    <script>
       var login = document.querySelector('#login');
        var mask = document.querySelector('#bg');
        var link = document.querySelector('#link');
        var closeBtn = document.querySelector('#closeBtn');
        var title = document.querySelector('#title');
        // 注册开启事件
        link.addEventListener('click', function () {
            mask.style.display = 'block';
            login.style.display = 'block';
        })
        // 注册关闭事件
        closeBtn.addEventListener('click', function () {
            mask.style.display = 'none';
            login.style.display = 'none';
        })
        // 注册鼠标按下事件
        title.addEventListener('mousedown', function (e) {
            // 给title中心点位置
            var x = e.pageX - login.offsetLeft;
            var y = e.pageY - login.offsetTop;
            title.addEventListener('mousemove', move)
            //注册鼠标跟随事件
            function move(e) {
                login.style.left = e.pageX - x + 'px';
                login.style.top = e.pageY - y + 'px';
            }
            //注册鼠标松开事件
            title.addEventListener('mouseup', function () {
                title.removeEventListener('mousemove', move)
            })
        })
    </script>
</body>
```

