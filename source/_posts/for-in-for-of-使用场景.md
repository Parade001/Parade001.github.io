---
title: for...in & for...of 使用场景
tags: JavaScript迭代器
categories: JavaScript
summary: '本文介绍for...of 与for...in使用方法,以及迭代器可迭代对象'
abbrlink: 33851
date: 2020-01-14 08:26:14
keywords:
description:
---

如果用一句话概况:

for…of 不能循环普通对象 需要搭配Object.keys(),for…of 是es6引入修复es5 for…in 的不足,

for…in 都可以循环,循环的是key 推荐循环对象属性用for…in,循环数组用for…of.

------

显然本篇不会这么介绍就完事.

首先我们应该了解什么是迭代器以及[生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators),继而去了解迭代对象,再去创建迭代循环,为自定义的迭代钩子去执行不同的语句

------

在 JavaScript 中，[迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)是一个对象，它定义一个序列，并在终止时可能返回一个返回值。 更具体地说，迭代器是通过使用 `next()` 方法实现 [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) 的任何一个对象，该方法返回具有两个属性的对象： `value`，这是序列中的 next 值；和 `done` ，如果已经迭代到序列中的最后一个值，则它为 `true` 。如果 `value` 和 `done` 一起存在，则它是迭代器的返回值。

## [可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%86%85%E7%BD%AE%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1)

内置可迭代对象:[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)、[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)、[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 和 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，它们的原型对象都实现了 `@@``iterator` 方法。

迭代器可用于:

- 可以展开可迭代对象:初始化数组或者函数调用的参数列表

- 可以用于解构赋值

- 迭代map对象的时候 返回的是键值对

  在for/of循环中可以直接使用解构赋值
  只想循环键或者值用object key objectvalues操作可迭代对象类似array set map .

JavaScript迭代三种类型

- 可迭代对象
- 迭代器对象
- 迭代结果对象(保存每次迭代结果)

言归正传.

------

无论是for...in还是for...of语句都是迭代一些东西。 它们之间的主要区别在于它们的迭代方式。

[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序迭代对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。

`for...of` 语句遍历[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#iterables)定义要迭代的数据



```js
Object.prototype.objCustom = function() {}
Array.prototype.arrCustom = function() {}

const iterable = [3, 5, 7]
iterable.foo = 'hello'

for (const i in iterable) {
  console.log(i) // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (const i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i) // logs 0, 1, 2, "foo"
  }
}

for (const i of iterable) {
  console.log(i) // logs 3, 5, 7
}
```

对于为什么使用for…in:MDN的官方解释是:

> `for ... in`是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用`Array.prototype.forEach()`和`for ... of`，那么`for ... in`的到底有什么用呢？
>
> 它最常用的地方应该是用于调试，可以更方便的去检查对象属性（通过输出到控制台或其他方式）。
>
> 尽管对于处理存储数据，数组更实用些，但是你在处理有`key-value`数据（比如属性用作“键”），
>
> 需要检查其中的任何键是否为某值的情况时，还是推荐用`for ... in`。

下面的函数接受一个对象作为参数。被调用时迭代传入对象的所有可枚举属性然后返回一个所有属性名和其对应值的字符串。

#### 遍历对象



```javascript
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
  //console.log(`obj.${prop}=${obj[prop]}`);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

#### for of 不能直接遍历对象

```javascript
var obj = {a:1, b:2, c:3};
for (var prop of obj) {
  console.log("obj." + prop + " = " + obj[prop]);
//console.log(`obj.${prop}=${obj[prop]}`);
}

VM293:3 Uncaught TypeError: obj is not iterable
    at <anonymous>:3:18
```

#### 配合object.keys.返回键值



```javascript
const obj = {
    a:1,
    b:2,
    c:3
}
for (let i of Object.keys(obj)){
    console.log(obj[i])
}
```

#### 遍历数组

```javascript
const arr = ['a','b','c']
for(let i in arr ){
    console.log(i)
}
//1
//2
//3
```



```javascript
const arr = ['a','b','c']
for(let i of arr ){
    console.log(i)
}
//a
//b
//c
```

## 结论:

#### for in 都可以遍历,当遍历对象的时候返回的是键值,遍历数组的时候返回的是索引

#### for of 不能直接遍历普通对象,需要配合Object.keys()才能取键值,而遍历数组返回值是键值