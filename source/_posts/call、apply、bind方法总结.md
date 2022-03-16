---
title: call、apply、bind 方法总结
tags: ES5 数组方法
summary: 'ES5 中数组的方法都不会修改他们调用的原始数组,而传递给这些方法的函数是可以修改这些数组的'
categories: JavaScript
abbrlink: 1297
date: 2019-06-03 07:47:53
keywords:
description:
---

<h4>区别</h4>

**Apply**

接受两个参数，第一个参数是this的指向，
 **第二个参数是函数接受的参数，以*数组*的形式传入**<br>
改变 this 指向后原函数会立即执行，且此方法只是临时改变 this 指向一次

```javascript
function fn(...args) {
  console.log(this, args)
}
let obj = {
  myname: '张三',
}

fn.apply(obj, [1, 2]) // this会变成传入的obj，传入的参数必须是一个数组；
fn(1, 2) // this指向window
```

##### Call

`第一个参数也是`this的指向

**后面传入的是一个*参数列表***

跟`apply`一样，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```javascript
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

### bind

bind方法和call很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是***这个参数列表可以分多次传入***)

改变`this`指向后不会立即执行，而是返回一个永久改变`this`指向的函数

```javascript
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```

### 小结

从上面可以看到，`apply`、`call`、`bind`三者的区别在于：

- 三者都可以改变函数的`this`对象指向

- 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`

- 三者都可以传参，但是`apply`是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可以分为多次传入

- `bind `是返回绑定this之后的函数，`apply `、`call` 则是立即执行

  <hr>

当第一个参数为 null、undefined 的时候，默认指向 window(在浏览器中)

fn.apply(null,[1,2]); // this 指向 window
fn.apply(undefined,[1,2]); // this 指向 window

call 是属于所有 Function 的方法,也就是 Funtion.prototype.call<br>

call 方法的 length 属性是 1。

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

注意:与 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法类似，只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。

<br>

示例:

```js
function fun() {
  console.log(this.name, arguments)
}
let obj = {
  name: 'cheng',
  age: 20,
}
fun.call(obj, 'cai', 'cai', '24', '18')
//cheng [Arguments] { '0': 'cai', '1': 'cai', '2': '24', '3': '18' }
```

`apply` 与 [`call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 非常相似，不同之处在于提供参数的方式。`apply` 使用参数数组而不是一组参数列表。`apply` 可以使用数组字面量（array literal），如 `fun.apply(this, ['eat', 'bananas'])`，或数组对象，

如 `fun.apply(this, new Array('eat', 'bananas'))`。

你也可以使用 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)对象作为 `argsArray` 参数。 `arguments` 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用 apply 函数的时候就不需要知道被调用对象的所有参数。 你**_可以使用 arguments 来把所有的参数传递给被调用对象_**。 被调用对象接下来就负责处理这些参数。

<br>

从 ECMAScript 第 5 版开始，可以使用任何种类的类数组对象，就是说只要有一个 `length` 属性和`(0..length-1)`范围的整数属性。例如现在可以使用 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 或一个自己定义的类似 `{'length': 2, '0': 'eat', '1': 'bananas'}` 形式的对象。

<br>

通过语法就可以看出 call 和 apply 的在参数上的一个区别：

> 1. call 的参数是一个列表，将每个参数一个个列出来
> 2. apply 的参数是一个数组，将每个参数放到一个数组中

<br>

> **语法**:func.apply(thisArg, [argsArray]);

```js
apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。
 @param thisArg this指向
 @param argsArray 参数数组
```

```js
thisArg
```

必选的。在 _func_ 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

```js
argsArray
```

可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象

示例:

```js
var array = ['a', 'b']
var elements = [0, 1, 2]
array.push.apply(array, elements)
console.info(array) // ["a", "b", 0, 1, 2]
//[ 'a', 'b', 0, 1, 2 ]
```

<br>

> ```js
> 语法:function.bind(thisArg[, arg1[, arg2[, ...]]])
> ```
