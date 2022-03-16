---
title: JQuery事件委托及排他运用
tags: 排他及手风琴效果
summary: 利用JQ完成排他效果
categories: JQuery
abbrlink: 36025
date: 2019-05-02 09:02:54
---

JQuery动画

demo淡入淡出的效果

```js
 <button>淡入</button>
    <button>淡出</button>
    <button>切换</button>
    <button></button>
    <div></div>

    <script>
        $(function () {
            $("button").eq(0).click(function () {
                $("div").fadeIn(1000);
            })
            $("button").eq(1).click(function () {
                $("div").fadeOut(1000);

            })
        })
	 </script>

```

demo(each)循环

```js
 <ul>
        <li>500</li>
        <li>10</li>
        <li>10</li>
    </ul>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script>
        var sum = 0;
        $("li").each(function (index, dom) {
            sum += Number($(dom).html())
        })
        console.log(sum);  //520
    </script>
```

demo 手风琴效果

```js
 <div class="king">
        <ul>
            <li class="current">
                <a href="#">
                    <img src="images/m1.jpg" alt="" class="small">
                    <img src="images/m.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/l1.jpg" alt="" class="small">
                    <img src="images/l.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/c1.jpg" alt="" class="small">
                    <img src="images/c.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/w1.jpg" alt="" class="small">
                    <img src="images/w.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/z1.jpg" alt="" class="small">
                    <img src="images/z.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/h1.jpg" alt="" class="small">
                    <img src="images/h.png" alt="" class="big">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="images/t1.jpg" alt="" class="small">
                    <img src="images/t.png" alt="" class="big">
                </a>
            </li>
        </ul>

    </div>
     <script>
        $(function () {
            $(".king li").mouseover(function () {
                $(this).stop().animate({
                        width: 226
                    })
                    .find(".small").stop().fadeOut().siblings(".big").stop().fadeIn();
                $(this).siblings("li").stop().animate({
                        width: 70
                    })
                    .find(".small").stop().fade_in().siblings(".big").stop().fadeOut();
            })
        })
    </script>
```

demo_scroll

```js
<style>
        .container {
            width: 400px;
            height: 150px;
            background-color: blue;
            margin: 1000px auto;
        }

        .back {
            width: 100px;
            height: 50px;
            background-color: green;
            position: fixed;
            right: 100px;
            bottom: 100px;
        }
    </style>
</head>

<body>
    <div class="back">返回顶部</div>
    <div class="container"></div>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script>
        var t = $(".container").offset().top;
        $(document).scroll(function () {
            if ($(document).scrollTop() > t) {
                $(".back").show;
            } else {
                $(".back").hide();
            }
        })
        $(".back").click(function () {
            $("body,html").stop().animate({
                scrollTop: 0
            })
        })
    </script>
</body>
```

Js JQ实现tab 切换

```js
  <style>
        * {
            margin: 0;
            padding: 0;
        }

        li {
            list-style-type: none;
        }

        .tab {
            width: 978px;
            margin: 100px auto;
        }

        .tab_list {
            height: 39px;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }

        .tab_list li {
            float: left;
            height: 39px;
            line-height: 39px;
            padding: 0 20px;
            text-align: center;
            cursor: pointer;
        }

        .tab_list .current {
            background-color: #c81623;
            color: #fff;
        }

        .item_info {
            padding: 20px 0 0 20px;
        }

        .item {
            display: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            text-align: center;

        }
    </style>
</head>

<body>
    <div class="tab">

        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格与包装</li>
                <li>售后保障</li>
                <li>商品评价（50000）</li>
                <li>手机社区</li>
            </ul>
        </div>

        <div class="tab_con">
            <div class="item" style="display: block;">
                商品介绍模块内容
                商品介绍模块内容
                商品介绍模块内容
                商品介绍模块内容
            </div>
            <div class="item">
                规格与包装模块内容
                规格与包装模块内容
                规格与包装模块内容
                规格与包装模块内容
            </div>
            <div class="item">
                售后保障模块内容
                售后保障模块内容
                售后保障模块内容
            </div>
            <div class="item">
                商品评价（50000）模块内容
                商品评价（50000）模块内容
                商品评价（50000）模块内容
                商品评价（50000）模块内容
            </div>
            <div class="item">
                手机社区模块内容
                手机社区模块内容
                手机社区模块内容
                手机社区模块内容
            </div>
        </div>
    </div>
</body>
<script>
 var titles = document.querySelectorAll(".tab_list");
    var lis = document.querySelectorAll("li");
    var son = document.querySelectorAll(".item");

    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute("index", i);
        lis[i].onclick = function () {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            this.className = "current";
            var index = this.getAttribute("index");
            for (var i = 0; i < son.length; i++) {
                son[i].style.display = "none";
            }
            son[index].style.display = "block";
        }

    }
    // $(function () {
    //     $(".tab_list li").click(function () {
    //         $(this).addClass("current").siblings().removeClass("current");
    //         var index = $(this).index();
    //         $(".tab_con .item").eq(index).show().siblings().hide();
    //     })
    // })
</script>
```

demo 事件委托

```js
 <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script>
        $("ul").on("click", "li", function () {
            alert("Please enter");
        })
        var newLi = $("<li>我想吃苹果</li>")
        $("ul").append(newLi)
    </script>
```

