---
title: JQuery中Split运用
tags: 数组demo
summary: Split用法
categories: JavaScript
abbrlink: 30350
date: 2019-05-03 12:39:10
---



微博发布demo

```js
 <script src="../js/jquery-3.6.0.min.js"></script>
    <style>
        .box {
            width: 600px;
            height: 300px;
            background-color: #ffff;
        }

        .span {
            width: 100px;
            height: 100px;
            background-color: #fefefe;
        }

        .btn {
            width: 50px;
            height: 40px;
            background-color: black;
            color: red;
        }

        textarea {
            width: 80%;
            height: 80%;
            margin: 20px auto;
        }
    </style>
</head>

<body>
    <div class="box" id="weibo">
        <span class="">女拳微博</span>
        <textarea name="name" class="txt" id="" cols="30" rows="10">
        </textarea>
        <button class="btn">开始打拳</button>
        <ul></ul>
    </div>
    <script>
        $(function () {
            $(".btn").click(function () {
                var li = $("<li></li>");
                li.text($(".txt").val());
                $("ul").prepend(li);
                $(".txt").val("");
            })
            $("ul").on("click", "a", function () {
                $(this).parent().slideUp("slow"),
                    function () {
                        $(this).remove()
                    }
            })
        })
    </script>
```



split demo

```js
 <script>
        // var arr = ['a', 'b', 'c'];
        // // 删除b元素  splice(从哪个位置开始删除, 删除几个元素)
        // arr.splice(1, 1);
        // console.log(arr);
        // const str = "baba likely cute";
        // const words = str.split("");
        // console.log(words[3]);
        function splitString(stringToSplit, separator) {
            var arrayOfStrings = stringToSplit.split(separator);

            console.log('The original string is: "' + stringToSplit +
                '"'); //The original string is: "Oh brave new world that has such people in it."
            console.log('The separator is: "' + separator + '"'); //The separator is: " "
            console.log("The array has " + arrayOfStrings.length + " elements: "); //The array has 12 elements:

            for (var i = 0; i < arrayOfStrings.length; i++)
                console.log(arrayOfStrings[i] + " / "); //讲arrayOfStrings[i]+/ 作为分割符
        }
        var
            tempestString = "Oh brave new world that has such people in it.";
        var
            monthString = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";
        var space = " ";
        var comma = ",";
        splitString(tempestString, space);
        splitString(tempestString);
        splitString(monthString, comma);
    </script>
```

