---
title: DOM表单操作
tags: 注册监听事件
summary: DOM树操作
categories: DOM
abbrlink: 39799
date: 2019-05-08 08:32:17
---

# DOM常见的方法

## demo1通过声明数组变量生成表格

```js
 var datas = [{
                name: '张三',
                subject: 'Java',
                score: 68
            }, {
                name: '张三',
                subject: 'Java',
                score: 68
            }, {
                name: '张三',
                subject: 'Java',
                score: 68
            }, {
                name: '张三',
                subject: 'Java',
                score: 68
            }, {
                name: '张三',
                subject: 'Java',
                score: 68
            }];
       
            var tbody = document.querySelector('tbody');
            for (let i = 0; i < datas.length; i++) {
                var tr = document.createElement('tr');
                for (let k in datas[i]) {
                    var td = document.createElement('td');
                    td.innerHTML = datas[i][k];
                    tr.appendChild(td);
                }
                var td = document.createElement('td');
                td.innerHTML = "<a href='javascript:;'>删除</a>";
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
            var as = document.querySelector('a');
            for (let i = 0; i < as.length; i++) {
                as[i].onclick = function () {
                    this.parentNode.parentNode.remove();
                }
            }
        </script>
```

## demo2克隆节点

```
 <ul>
        <li>1</li>
        <li>12</li>
        <li>123</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        var lily = ul.children[1].cloneNode(true); //.cloneNode() 不赋值就是浅拷贝,只拷贝实参不拷贝子元素;赋true则深拷贝;
        ul.append(lily);
    </script>
```

## demo3DOM节点元素移除

```js
   <ul>
        <li>Jack</li>
        <li>Jerry</li>
        <li>Tom</li>
        <li class="lee">lee</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        var btn = document.querySelector('button');
        var li = document.querySelector('li');
        var lee = document.querySelector('.lee')
        ul.removeChild(lee);
        lee.remove();
    </script>
```

## demo4删除事件

```js
  <style>
        div {
            width: 200px;
            height: 150px;
            background-color: cyan;

        }
    </style>
</head>

<body>
    <div class="">1</div>
    <div class="">2</div>
    <div class="">3</div>
    <script>
        var divp = document.querySelectorAll("div");
        divp[2].addEventListener("click", function () { //这里添加一个监听事件
            alert(2)
            this.removeEventListener("click", arguments.callee) //指向被调用者 移除click监听事件
        })
    </script>
```

## demo5留言发布

```js
 <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
            width: 230px;
        }

        ul li {
            height: 30px;
            background-color: cyan;
            line-height: 30px;
            margin-top: 3px;
        }

        ul li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea cols="30" rows="10"></textarea>
    <button>发布</button>
    <ul>
        <!-- <li>2333</li>
        <li>2333</li>
        <li>2333</li> -->
    </ul>
    <script>
        var text = document.querySelector('textarea'); //获取dom元素
        var btn = document.querySelector('button'); //获取dom元素
        var ul = document.querySelector('ul'); //获取dom元素
        btn.onclick = function () { //给btn绑定事件函数
            if (text.value.trim() === '') { //当文本内容为空且仅存在空格符时候
                alert('Please enter true value');
                return;
            }
            var li = document.createElement('li'); //创建元素类型的字符串元素  li
            li.innerHTML = text.value + "<a href ='javascript:;'>删除</a>";
            ul.insertBefore(li, ul.firstChild);
            text.value = '';

            ul.addEventListener('click', function (e) {
                // console.log(2);
                if (e.target.localName === 'a' && e.target.innerHTML === '删除') {

                    e.target.parentNode.remove();
                }
                // console.log(e.target.localName);
                console.log(e.target.innerHTML);
            })
        }
    </script>
```



注册事件和监听事件

传统注册事件：

利用on开头的事件 如onclick

特点：注册事件的唯一性，同一个元素只能设置一个处理函数最后注册的处理函数将会覆盖前面注册的所有处理函数

<hr> 

方法监听事件注册方式 ：

addEventListener() 是一个方法

特点：同一个元素，同一个事件可以注册多个监听器 ，多个事件处理程序

用法 addEventListener（type,listener[useCapture])
参数

type:需要监听的事件类型，如click, mouseover, 注意这里是不需要加 on

listener：事件处理函数，事件发生时，会调用的函数

useCapture：可选参数，布尔值，默认为false，表示在事件冒泡阶段调用事件处理程序（从最外层到最内层）；如果为true，则表示在事件捕获阶段调用事件处理程序（从最内层到最外层）

```js
    <button>注册事件</button>
    <button>监听事件</button>
    <!-- <button></button> -->
    <script>
        // 第一种方式
        var btn = document.querySelectorAll("button");
        btn[0].onclick = function () {
            alert(1)
        }
        btn[1].addEventListener("click", function () {
            alert(22)
        })
    </script>
```

demo新浪下拉单

```js
<style>
        * {
            margin: 0;
            padding: 0;
        }

        li {
            list-style-type: none;
        }

        a {
            text-decoration: none;
            font-size: 14px;
        }

        .nav {
            margin: 100px;
        }

        .nav>li {
            position: relative;
            float: left;
            width: 80px;
            height: 41px;
            text-align: center;
        }

        .nav li a {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 41px;
            color: #333;
        }

        .nav>li>a:hover {
            background-color: #eee;
        }

        .nav ul {
            display: none;
            position: absolute;
            top: 41px;
            left: 0;
            width: 100%;
            border-left: 1px solid #FECC5B;
            border-right: 1px solid #FECC5B;
        }

        .nav ul li {
            border-bottom: 1px solid #FECC5B;
        }

        .nav ul li a:hover {
            background-color: #FFF5DA;
        }
    </style>
</head>
<ul class="nav">
    <li>
        <a href="#">微博</a>
        <ul>
            <li>
                <a href="">私信</a>
            </li>
            <li>
                <a href="">评论</a>
            </li>
            <li>
                <a href="">@我</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="#">微博</a>
        <ul>
            <li>
                <a href="">私信</a>
            </li>
            <li>
                <a href="">评论</a>
            </li>
            <li>
                <a href="">@我</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="#">微博</a>
        <ul>
            <li>
                <a href="">私信</a>
            </li>
            <li>
                <a href="">评论</a>
            </li>
            <li>
                <a href="">@我</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="#">微博</a>
        <ul>
            <li>
                <a href="">私信</a>
            </li>
            <li>
                <a href="">评论</a>
            </li>
            <li>
                <a href="">@我</a>
            </li>
        </ul>
    </li>
</ul>

<body>
    <script>
        var nav = document.querySelector('.nav');
        var lis = nav.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function () {
                this.children[1].style.display = 'block';
            }
            lis[i].onmouseout = function () {
                this.children[1].style.display = 'none';
            }
        }
    </script>
```

demo节点操作

```js
 <ul>
        <li>爪巴啊1</li>
        <li>爪巴啊2</li>
        <li class="adv">爪巴啊3</li>
        <li>爪巴啊4</li>
        <li>爪巴啊5</li>
    </ul>
    <div></div>
    <script>
        var li = document.createElement('li');
        var ul = document.querySelector('ul');
        li.innerHTML = 'null';
        ul.appendChild(li); //父节点.appendChild()
        var lili = document.createElement('li'); //创建节点 document.createElement('节点名册');
        li.firstChild.nodeValue = 'wtf?';
        ul.insertBefore(lili, ul.children[0]); //父节点.inserBefore('','位置节点')
        console.log(ul.nextSibling); //#text
        console.log(ul.previousSibling); //#text

        console.log(ul.nextElementSibling); //<div>...</div>
    </script>
```

```js
  <ul>
        <li>2044</li>
        <li>2044</li>
        <li>2044</li>
        <li>2044</li>
        <li>2044</li>
    </ul>
    <script>
        // var deemo = document.querySelector(".deemo");
        // console.log(deemo.parentNode);
        // console.log(deemo.parentNode.parentNode);

        var ul = document.querySelector("ul");
        console.log(ul.childNodes);  //NodeList(11)
        console.log(ul.children); //HTMLCollection(5)
        console.log(ul.children[0]); //<li>...</li>
        console.log(ul.children[ul.children.length - 1]);//<li>...</li>
    </script>
```

