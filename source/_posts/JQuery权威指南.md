---
title: JQuery入门
tags: 了解JQuey
summary: 入口函数和window.load的区别是什么?
categories: JQuery
abbrlink: 54448
date: 2019-04-30 09:04:15
---

# JQuery

是JS一个库文件,将Webapi的属性或方法进行了二次封装.

核心思想是隐式迭代,链式编程.

> =设计初衷引用作者一句话:wirte less, do more!

编写第一个JQuery程序

```js
<title>第一个简单的jQuery程序</title>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            alert('你好,欢迎来到jQuery世界')
        });
    </script>
```



$(document).ready()方法和window.load方法的区别



执行时间:$(document).ready()在页面框架下载文本才执行;

而window.load必须等页面全部加载下载完毕才能执行;

前者效率高于后者

执行数量不同:$(document).ready可以重复写多个,每次执行结果不同;

window.load虽然也可以执行多个,但仅输出一个执行结果

```
$(document).ready(functiong{})
可以简称成
$(function(){})
```

# 利用JQuery控制DOM对象

遍历内部的DOM元素的过程叫做: *隐式迭代*  (*把匹配的所有元素遍历循环,给每个元素添加css这个方法*)

```js
  <script src="../js/jquery-3.6.0.min.js"></script>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <script>
        $("ul li").css("backgroundColor", "yellow");
//获取第一个li
// 		var firstLi = $("ul li:first-child")
//      console.log(firstLi);
    </script>
</body>
```



# JQuery选择器的类型

- ***基本选择器***



- ***层次选择器***

  

- ***过滤选择器***

  

  

  1. **简单过滤选择器**

     

  2. **内容过滤选择器**

     

  3. **可见性过滤选择器**

     

  4. **属性过滤选择器**

     

  5. **子元素过滤选择器**

     

  6. **表单对象属性过滤选择器**

- ***表单选择器***

![1635668968296](C:\Users\xt_xi\AppData\Roaming\Typora\typora-user-images\1635668968296.png)

 