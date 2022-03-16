---
layout: post
title: 浅谈JavaScript模块化
abbrlink: 55868
date: 2021-03-14 18:24:33
tags: module
categories: JavaScript
summary: 什么是模块化?
cover: true
---

> 什么是模块化?

随着代码复杂程度的提高, 项目也变得越来越难维护, `JavaScript模块化` 也因此油然而生, 本文主要介绍 `JavaScript模块化` 的一些发展历程。

## 传统的开发

> 这应该是大家最熟悉的一种加载方式, 但是缺点也比较明显

- 所有的模块都处于全局作用域下, 容易造成命名冲突
- 依赖关系不明显, 比如 `main.js` 中有使用 `jquery`, 那么 `jquery` 就一定要先加载, 但是从引入方式中我们无法直观的察觉依赖关系, 不利于维护

```none
<script src="jquery.js"></script>
<script src="jquery_scroller.js"></script>
<script src="bootstarp.js"></script>
<script src="main.js"></script>
```

## CommonJs

> 一个文件就是一个模块, 其内部定义的变量, 方法都处于该模块内, 不会对外暴露.

主要语法:

- 使用 `require` 来加载模块
- 使用 `exports` 或者 `module.exports` 暴露模块中的内容

#### CommonJS的特点

- 所有代码都运行在模块作用域，不会污染全局作用域；
- 模块是同步加载的，即只有加载完成，才能执行后面的操作；
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
- CommonJS输出是值的拷贝(即，`require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值)。

### demo

1. 新建 `a.js`, 导出 `name` 和 `sayHello`

```none
// a.js
const name = 'Bob'
function sayHello(name) {
  console.log(`Hello ${name}`)
}
module.exports.name = name
module.exports.sayHello = sayHello
```

1. 在 `b.js` 中引入 `a` 并调用



```none
// b.js
const a = require('./a')
const name = a.name
console.log(name) // Bob
a.sayHello(name) // Hello Bob
```

> 由于 `CommonJs` 是同步加载的模块的, 在服务端(node), 文件都在硬盘上, 所以同步加载也无所谓, 但是在浏览器端, 同步加载就体验不好了. 所以 `CommonJs` 主要使用于 `node` 环境下.

## AMD

> `AMD` 全称为 `Asynchromous Module Definition(异步模块定义)`, 实现了异步加载模块. `require.js` 实现了 `AMD` 规范

#### RequireJS的基本用法

通过`define`来定义一个模块，使用`require`可以导入定义的模块。

#### RequireJS的特点

对于依赖的模块，AMD推崇**依赖前置，提前执行**。也就是说，在`define`方法里传入的依赖模块(数组)，会在一开始就下载并执行。

```none
require([module], callback) // 导入

define(id, [depends], callback) // 导出模块
```

### demo

1. 新建 `a.js`, 输入以下内容

```none
define(function() {
  let alertName = function(str) {
    alert('I am ' + str)
  }
  let alertAge = function(num) {
    alert('I am ' + num + ' years old')
  }
  return {
    alertName: alertName,
    alertAge: alertAge
  }
})
```

1. 在 `test.html` 中调用 `a` 模块



```none
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script src="./require.js"></script>
    <script>
        require(['a'], function (alert) {
            alert.alertName('JohnZhu')
            alert.alertAge(21)
        })
    </script>
</body>

</html>
```

能够异步加载模块, 适合在浏览器中运行, 但是不能够按需加载, 必须提前加载模块

## CMD

> `CMD规范` 是阿里的玉伯提出, `sea.js` 实现。 实现了按需加载

与 `AMD` 的区别:

- 对于依赖的模块 `AMD` 提前执行，而 `CMD` 是**依赖就近，延迟执行**也就是说，只有到`require`时依赖模块才执行。
- `CMD` 推崇依赖就近, `AMD` 推崇依赖前置



```none
// AMD
define(['./a', './b'], function(a, b) {
  a.doSomething()
  b.doSomething()
})
// CMD
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  var b = require('./b')
  b.doSomething()
})
```

## ES6

> `ES6` 模块化方案是最规范的方案, 未来也是主流, 对于我们来说也是经常使用与熟悉的. 不过现在的浏览器还不兼容, 使用需要 `babel` 转码

- 使用 `export` 导出模块
- 使用 `import` 导入模块



```none
import Vue from 'vue'
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  created() {
    console.log('Hello World')
  }
}
```

#### ES6 Module的特点(对比CommonJS)

- CommonJS模块是运行时加载，ES6 Module是编译时输出接口；
- CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；
- CommonJS输出是值的拷贝，ES6 Module输出的是值的引用，被输出模块的内部的改变会影响引用的改变；
- CommonJS `this`指向当前模块，ES6 Module `this`指向`undefined`;

目前浏览器对ES6 Module兼容还不太好，我们平时在webpack中使用的`export`/`import`，会转译为webpack自身的模块加载机制。

## 参考

<http://www.hangge.com/blog/cache/detail_1686.html>

<https://www.imooc.com/article/20057>

<https://juejin.cn/post/6844903983987834888>