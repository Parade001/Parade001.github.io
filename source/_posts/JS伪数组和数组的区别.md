---
layout: post
title: JS伪数组和数组的区别
abbrlink: 7004
date: 2019-03-15 19:33:03
tags: 类数组
categories: JavaScript
summary: 本文介绍了类数组,以及转化为真数组的方法
---

#### 伪数组定义：

1、**拥有length属性**，其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)
2、**不具有数组所具有的方法**

```javascript
《javascript权威指南》上给出了代码用来判断一个对象是否属于“类数组”。如下：
// Determine if o is an array-like object.
// Strings and functions have numeric length properties, but are
// excluded by the typeof test. In client-side JavaScript, DOM text
// nodes have a numeric length property, and may need to be excluded
// with an additional o.nodeType != 3 test.
function isArrayLike(o) {   
    if (o &&                                // o is not null, undefined, etc.
            typeof o === 'object' &&            // o is an object
            isFinite(o.length) &&               // o.length is a finite number
            o.length >= 0 &&                    // o.length is non-negative
            o.length===Math.floor(o.length) &&  // o.length is an integer
            o.length < 4294967296)              // o.length < 2^32
            return true;                        // Then o is array-like
    else
            return false;                       // Otherwise it is not
}
```

#### 伪数组转为真数组:

### 1.遍历添加入一个空数组

```javascript
var arr = [];

for(var i = 0; i < arrLike.length; i++){
    arr.push(arrLike[i]);
}
```

比较简单易懂，但是步骤略显繁琐。

### 2.利用数组的slice()方法 **【推荐】**

```javascript
;[].slice.call(arrLike);
```

或者

```javascript
Array.prototype.slice.apply(arrLike);
```

使用`slice()`返回一个新的数组,用`call()`或`apply()`把他的作用环境指向伪数组。

注意这个返回的数组中，不会保留索引值以外的其他额外属性。
比如jQuery中`$()`获取的DOM伪数组，里面的context属性在被此方法转化之后就不会保留。

模拟一下`slice()`的内部实现

```javascript
Array.prtotype.slice = function(start, end){
    var result = new Array();
    var start = start | 0;
    var end = end | this.length;

    for(var i = start; i < end; i++){
        result.push(this[i]);
    }

    return result;
}
```

### 3.修改原型指向

```javascript
arrLike.__proto__ = Array.prototype;
```

这样arrLike就继承了Array.prototype中的方法，可以使用`push()`，`unshift()`等方法了，`length`值也会随之动态改变。
另外这种直接修改原型链的方法，还会保留下伪数组中的所有属性，包括不是索引值的属性。

### 4.ES5:Array.from()

```javascript
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```

### 5.利用扩展运算符将伪数组转成真的数组

```none
/*利用扩展运算符将伪数组转成真数组*/
  var oDivs= document.getElementsByTagName('div');
  console.log(oDivs)
  console.log( oDivs instanceof Array)  //判断是不是真数组

  let arr =[...oDivs];
  console.log(arr)
  console.log(arr instanceof Array)
```

------

#### 参考

[伪数组(ArrayLike)](https://segmentfault.com/a/1190000015285969)

[ES6扩展运算符转伪数组为真数组](https://www.programminghunter.com/article/6096438679/)