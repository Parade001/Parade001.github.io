---
title: 了解什么是事件冒泡
tags: DOM操作
summary: '事件的处理过程主要有三个阶段 ：捕获，目标，冒泡.利用事件冒泡可以,本篇通过事件冒泡来实现事件委托的操纵..'
categories: DOM
abbrlink: 11607
date: 2019-05-10 09:09:08
---

Dom事件

```js
     <style>
         .map {
             width: 100%;
             height: 400px;
             background-color: cyan;
         }
     </style>
 </head>

 <body>
     <!-- e.target  返回的是触发对象  this 返回的是绑定对象 -->
     <div class="map">map</div>
     <script>
         var map = document.querySelector('.map');
         map.addEventListener('click', function (event) {
             console.log(event);
         })


         // e.target    目标元素    e.type 事件类型
         var map = document.querySelector('.map').onclick = function (event) {
             console.log(event);
         };
     </script>
```

## demo 键盘监听事件

```js
<script>
        // onkeydown
        // onkeyup 弹起
        // onkeypress  ..区分大小写dxXXW
        // document.addEventListener('keydown', function (e) {
        //     console.log('keydown');
        // });
        document.addEventListener('keyup', function (e) {
            console.log('up:' + e.keyCode);
        })
        document.addEventListener('keypress', function (e) {
            console.log('press:' + e.keyCode);
        })
    </script>
```

## search框s键监听事件

```js
 <style>
        * {
            margin: 0;
            padding: 0;
        }

        .search {
            position: relative;
            width: 178px;
            margin: 100px;
        }

        .con {
            display: none;
            position: absolute;
            top: -40px;
            width: 171px;
            border: 1px solid rgba(0, 0, 0, .2);
            box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
            padding: 5px 0;
            font-size: 18px;
            line-height: 20px;
            color: #333;
        }

        .con::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: 28px;
            left: 18px;
            border: 8px solid #000;
            border-style: solid dashed dashed;
            border-color: #fff transparent transparent;
        }
    </style>
</head>

<body>
    <div class="search">
        <div class="con">234</div>
        <input type="text" placeholder="请输入快递单号" class="jd">
    </div>
    <script>
        var search = document.querySelector('input');
        document.addEventListener('keyup', function (e) {
            if (e.keyCode === 83) {
                search.focus();
            }
        })
        var con = document.querySelector('.con');
        var input = querySelector('.jd');

        input.addEventListener('keyup', function (e) {
            if (this.value !== '') {
                con.style.display = 'block';
                con.innerHTML = this.value;
            } else {
                con.style.display = 'none';
            }

        })
        input.addEventListener('blur', function () {
            con.style.display = 'none';
        })
        input.addEventListener('focus', function () {
            if (this.value !== '') {
                con.style.display = 'block';
            }
        })
    </script>
```

# demo3阻止方法的默认属性

```js
  <a href="http:www.qq.com">QQ</a>
    <form action="">
        <input type="text" name="name" value="">
        <input type="text" value="" id="submit">
    </form>
    <script>
        var a = document.querySelector('a');
        a.onclick = function (e) {
            e.preventDefault();
        }
        var submit = document.querySelector('#submit');
        submit.onclick = function (e) {
            e.preventDefault();
        }
 // var father = document.querySelector('.father');
        // var son = document.querySelector('.son');
        // father.onclick = function () {
        //     alert("father");
        // }
        // son.onclick = function () {
        //     alert = ("son");
        //     e.stopPropagation();
        // }
        // document.body.onclick = function () {
        //     alert("body");
        // }
        // document.onclick = function () {
        //     alert("document");
        // }
```

# 事件冒泡 (event.bubbles)

```less
事件冒泡：当一个元素接收到事件时，会把它接收到的事件逐级向上传播给它的祖先元素，一直传到顶层的 window 对象（关于最后传播到的顶层对象，不同浏览器有可能不同，例如 IE9 及其以上的 IE、FireFox、Chrome、Safari 等浏览器，事件冒泡的顶层对象为 window 对象，而 IE7/8 顶层对象则为 document对象）。
```

事件委托

```js
 <ul>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        <li>國立武漢大學</li>
        `
    </ul>
    <script>
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function (e) {
            alert("楚國八百年")
            e.target.style.backgroundColor = 'cyan';
        })
        // 事件委托本质就是冒泡...  好处是动态能添加标签,会触发父级元素身上的事件;
    </script>
```

鼠标禁用事件

```js
  你要干嘛?
    <script>
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }) // 禁用右键

        // 禁止选中文字
        document.addEventListener('selectstart', function (e) {
            e.preventDefault();
        })
    </script>
```

鼠标移动事件(图片跟随鼠标)

```js
 img {
            position: absolute;
            top: -50%px;
            border-radius: 50%;

        }
    </style>
</head>

<body>
    <img src="../img/tjf.gif" alt="">
    <script>
        var pic = document.querySelector('img');
        document.addEventListener('mousemove', function (e) {
            var x = e.pageX;
            var y = e.pageY;
            console.log('x是' + x, 'y是' + y);
            pic.style.left = x - 150 + 'px';
            pic.style.top = y - 110 + 'px';
        });
    </script>
```

demo鼠标点击跟随变色事件

```js
   <ul>
        <li>國立武漢大學</li>
    </ul>
    <button>刷新</button>
    <script>
        var ul = document.querySelector("ul");
        var btn = document.querySelector("button")
        btn.onclick = function (e) {
            var li = document.createElement("li");
            li.innerHTML = 'Gakki';
            ul.insertBefore(li, ul.firstChild[0]);

        }
        ul.addEventListener("click", function (e) {
            if (e.target.localName === 'li') {
                for (var i = 0; i < ul.children.length; i++) {
                    ul.children[i].style.backgroundColor = '';
                }
                e.target.style.backgroundColor = 'cyan';
            }

        })
    </script>
```

