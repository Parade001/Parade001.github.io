---
title: JavaScript数据类型检测
tags: JS数据类型
summary: '通过 typeof 进行数据类型检测,经典的素数判断'
categories: JavaScript
abbrlink: 59577
date: 2019-04-21 23:45:02
---

# JavaScript数据类型检测

###  typeof   或  typeof()

```js
console.log(typeof 10);   //number
console.log(typeof(10));  //number

console.log(typeof 'abc'); //string
console.log(typeof(abc));  //string

console.log(typeof true);  //boolean
console.log(typeof(false));//boolean

console.log(typeof undefined)  //undefined

console.log(typeof null)  //object
```

<hr>

```js
        var num = 10
        var name = 'leeo'
        var a = false
        var b
        console.log(typeof num)
        console.log(typeof name)
        console.log(typeof a)
        console.log(typeof b)
        // isNaN ture 为数字 flase 非数字
```

<hr>

#### 遍历数组返回最大值

```js
function myFunction(num1, num2, num3) {
            var arr = new Array(num1, num2, num3);
            var max = arr[0];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        }
        var num1 = prompt('请输入第一个数:');
        var num2 = prompt('请输入第二个数:');
        var num3 = prompt('请输入第三个数:');
        var result = myFunction(num1, num2, num3);
        alert('最大值为:' + result);
```

#### 三元表达式求3个数最大值

```js
 function getArrMax() {
            var num1 = parseInt(prompt('请输出第一个数字:'));
            var num2 = parseInt(prompt('请输出第二个数字:'));
            var num3 = parseInt(prompt('请输出第三个数字:'));
            return num1 > num2 ? (num1 > num3 ? num1 : num3) : (num2 > num3 ? num2 : num3);
        }
        alert(getArrMax());
```



#### 翻转数组

```js
 function myFunction(arr) {
            var newArray = [];
            for (var i = arr.length - 1; i >= 0; i--) {
                newArray[newArray.length] = arr[i];
            }
            return newArray;
        }
        var sort = myFunction(['teng', 'baba', 'yetu', 'xiong']);
        console.log(sort);
```

#### while弹窗翻转

```js
function myFunction() {
            var name = prompt('请输入数字', '');
            var nameArray = new Array();
            while (name != null && name != '' && nameArray.length < 10) {
                name = prompt('请输入数字', '');
                nameArray.push(name);
            }
            nameArray.sort(function compareFunction(param1, param2) {
                return param1 - param2;
            });
            for (var i = nameArray.length - 1; i >= 0; i--) {
                alert(nameArray[i] + '\n' + '');
            }
        }
        myFunction();
```



#### 判断数组是否有素数

```js
function myFunction() {
            var x = parseInt(prompt("请输入一个数:"));
            var isPrime = 1;
            var i = '';
            for (i = 2; i < x; i++) {
                if (x % i == 0) {
                    isPrime = 0;
                    break;
                }
            }
            if (isPrime == 1) {
                alert('是素数');
            } else {
                alert('不是素数');
            }
        }
        myFunction();
```



#### 简易的计算机deemo

```js
function getRes(num1, symbol, num2) {
            switch (symbol) {
                case '+':
                    return (parseInt(num1) + parseInt(num2));
                    break;
                case '-':
                    return (parseInt(num1) - parseInt(num2));
                case '*':
                    return (parseInt(num1) * parseInt(num2));
                case '/':
                    return (parseInt(num1) / parseInt(num2));
                default:
                    return ('运算符输入错误')
                    break;
            }

        }
        var num1 = prompt('请输入一个数');
        var symbol = prompt('请输入运算符');
        var num2 = prompt('请输入一个数');
        alert('结果为：' + getRes(num1, symbol, num2));
```

