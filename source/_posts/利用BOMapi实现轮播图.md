---
title: touch事件的运用
tags: 轮播图
summary: '移动端注册触摸事件,移动端轮播图..'
categories: BOM
abbrlink: 17793
date: 2019-05-18 09:31:39
---

移动端的触摸事件方法

```js
<style>
        div {
            width: 300px;
            height: 300px;
            background-color: cyan;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        //e.touches  屏幕上的所有手指信息;
        //e.targetTouches 目标元素身上的手指信息;
        //e.changedTouches 可以获取从无到有,从有到无的手指信息;
        var div = document.querySelector('div');
        console.dir(div);
        div.addEventListener('touchend', function () {
            console.log('不想负责');
        })
        div.addEventListener('touchmove', function (e) {
            console.log('我要摸你了');
            console.log(e);
        })


        div.addEventListener('touchstart', function () {
            console.log('我又摸了你');
        })
        div.addEventListener('touchcancel', function () {
            console.log('不给摸');
        })
    </script>

</body>
```

缓动动画效果

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
                var step = (target - obj.offsetLeft) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(steep);
                if (obj.offsetLeft === target) {
                    clearInterval(obj.timer);
                    callback && callback();
                }
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 50);
        }
        var div = document.querySelector('div');
        animate(div, 2000, function () {
            div.style.backgroundColor = 'purple';
        });
        animate(div, 2000);
    </script>
```

筋斗云的demo

```js
 <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            background-color: rgba(0, 0, 0, 0.6);
        }

        .box {
            width: 415px;
            height: 42px;
            margin: 200px auto;
            background-color: #fff;
            position: relative;
        }

        ul {
            list-style: none;
            position: relative;
        }

        li {
            float: left;
            width: 83px;
            height: 42px;
            text-align: center;
            font: 500 15px/42px "微软雅黑";
            cursor: pointer;
        }

        span {
            position: absolute;
            left: 0;
            top: 0;
            width: 83px;
            height: 42px;
            background-image: linear-gradient(to right, cyan 50%, skyblue 100%);
        }
    </style>
</head>

<body>
    <div class='box'>
        <span class='cloud'></span>
        <ul>
            <li>Civilization</li>
            <li>IV</li>
            <li>Theme</li>
            <li>Music</li>
            <li>Baba-Yetu</li>
        </ul>
    </div>
    <script>
        window.addEventListener('load', function () {
            var box = document.querySelector('.box');
            var lis = document.querySelectorAll('li');
            var cloud = document.querySelector('span');
            var current = 0;
            for (let i = 0; i < lis.length; i++) {
                lis[i].addEventListener('mouseenter', function () {
                    animate(cloud, this.offsetLeft);
                })
                lis[i].addEventListener('mouseleave', function () {
                    animate(cloud, current);
                })
                lis[i].addEventListener('click', function () {
                    current = this.offsetLeft;
                })
            }
        })
    </script>
```

轮播图(原生js)

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/animate.js"></script>
    <script src="./js/jquery-1.10.1.min.js"></script>
    <script src="./js/swiper-3.4.2.min.js"></script>

</head>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .box {
        position: relative;
        width: 721px;
        height: 455px;
        margin: 100px auto;
        overflow: hidden;
    }

    .box ul {
        position: absolute;
        width: 600%;
    }

    .box ul li {
        float: left;
    }

    .prev,
    .next {
        display: none;
        position: absolute;
        top: 50%;
        width: 25px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        text-align: center;
        line-height: 40px;
        transform: translate(0, -50%);
    }

    .prev {
        left: 0;
    }

    .next {
        right: 0;
    }

    .pagination {
        position: absolute;
        bottom: 30px;
        left: 50%;
        width: 80px;
        height: 14px;
        background-color: rgba(0, 0, 0, 0.3);
        transform: translate(-50%, 0);
    }

    .pagination li {
        width: 10px;
        height: 10px;
        float: left;
        margin: 2px 5px;
        border-radius: 50%;
        border: 1px solid #fff;
        box-sizing: border-box;
    }

    .pagination li.current {
        background-color: #fff;
    }
</style>

<body>
    <div class="box container">
        <ul class="Swiper">
            <li class='wrapper'><img src="./upload/focus.jpg" alt=""></li>
            <li class='wrapper'><img src="./upload/focus1.jpg" alt=""></li>
            <li class='wrapper'><img src="./upload/focus2.jpg" alt=""></li>
            <li class='wrapper'><img src="./upload/focus3.jpg" alt=""></li>
        </ul>
        <a href="javascript:;" class='prev '>&lt</a>
        <a href="javascript:;" class='next '>&gt</a>
        <ol class='pagination'>
        </ol>
    </div>
    <script>
        var box = document.querySelector('.box');
        var prev = document.querySelector('.prev');
        var next = document.querySelector('.next');
        box.addEventListener('mouseenter', function () {
            prev.style.display = "block";
            next.style.display = "block";
            clearInterval(timer);
        })
        box.addEventListener('mouseleave', function () {
            prev.style.display = "none";
            next.style.display = "none";
            autoPlayPic()
        })
        // 注册prev和next事件隐藏和显示
        var ul = document.querySelector('ul');
        var ol = document.querySelector('ol');
        var focusWidth = box.offsetWidth;

        for (var i = 0; i < ul.children.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('index', i);
            ol.appendChild(li);
            //创建li监听 点击事件让li的数量随内容数量
            li.addEventListener('click', function () {
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].classList.remove('current');
                    //遍历数组元素,移除数组其他元素
                }
                this.className = 'current';
                //用setAttribute设值 时候要用getAttribute拿值
                var index = this.getAttribute('index');
                animate(ul, -index * focusWidth);
                num = circle = index;

            })
        }
        ol.children[0].className = 'current'; // ol.children[0].classList.add('current');
        //无缝滚动

        var first = ul.children[0].cloneNode(true)
        ul.appendChild(first);
        var num = 0;
        var circle = 0;
        num = ul.children.length - 1;
        prev.addEventListener('click', function () {
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth;
            }
            num--;
            animate(ul, -num * focusWidth);
            //将prev与圈圈事件相绑定
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            removeElements();
        })

        next.addEventListener('click', function () {

            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth);
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            removeElements();
        })
        autoPlayPic();
    </script>
    <script language="javascript">
        var mySwiper = new Swiper('.swiper-container', {
            grabCursor: true,
        })
    </script>
</body>


</html>
```

移动端轮播图实现效果(原生js)

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/index.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        html,
        body {
            width: 100%;
            height: 100%;
        }

        li {
            list-style: none;
        }

        .box {
            position: relative;
            width: 100%;
            /* height: 75px; */
            overflow: hidden;
        }

        .box ul {
            width: 500%;
            margin-left: -100%;
            overflow: hidden;
        }

        .box ul li {
            float: left;
            width: 20%;
        }

        .box ul li img {
            width: 100%;
            display: block;
        }

        .box .pagination {
            position: absolute;
            bottom: 5px;
            right: 5px;
            width: 50px;
            height: 5px;
            /* background-color: red; */
            z-index: 99px;
        }

        .box .pagination li {
            width: 5px;
            height: 5px;
            float: left;
            margin: 0 3px;
            background-color: #fff;
            border-radius: 2px;
        }

        .box .pagination li.current {
            width: 15px;
        }
    </style>
</head>

<body>
    <div class="box">
        <ul>
            <li><img src="./upload/focus3.jpg" alt=""></li>
            <li><img src="./upload/focus1.jpg" alt=""></li>
            <li><img src="./upload/focus2.jpg" alt=""></li>
            <li><img src="./upload/focus3.jpg" alt=""></li>
            <li><img src="./upload/focus1.jpg" alt=""></li>
        </ul>
        <ol class='pagination'>
            <li class="current"></li>
            <li></li>
            <li></li>
        </ol>
    </div>
</body>

</html>
```

```js
//js部分
window.addEventListener('load', function () {
    var box = document.querySelector('.box');
    var ul = box.children[0];
    var w = box.offsetWidth;
    var ol = document.querySelector('ol');

    var index = 0;
    //利用定时器自动轮播
    //添加一个鼠标按下停止 松开播放
    var timer = null;

    autoPlay();

    function autoPlay() {
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex}px)`;
        }, 2000)
    }

    //手动轮播
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function (e) {
        // console.log(timer);

        clearInterval(timer);
        timer = null;
        startX = e.targetTouches[0].pageX;

    })
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${translatex}px)`;
    })

    ul.addEventListener('touchend', function (e) {
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            var translatex = -index * w;
            ul.style.transform = `translateX(${translatex}px)`;
            ul.style.transition = 'all .3s';

        } else {
            var translatex = -index * w;
            ul.style.transform = `translateX(${translatex}px)`;
            ul.style.transition = 'all .3s';

        }
        autoPlay();
    })

    ul.addEventListener('transitionend', function () {
        //  transitioned单词不要打错了这是过度结束事件的方法console.log(transitionend);
        if (index >= ul.children.length - 2) {
            index = 0;
            //去掉过度效果,然后立即跳转
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(0px)';
            // ul.style.transform = `translateX(${translatex}px)`;
        } else if (index < 0) {
            index = ul.children.length - 3;
            ul.style.transition = 'none';
            ul.style.transform = `translateX(${-index * w}px)`;
        }

        //圆点跟随事件把ol的li带有current 类名选出来去掉类名remove
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

})
```

