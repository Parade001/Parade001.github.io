---
title: JavaScript理解原型
tags: Prototype
summary: 原型模式（Prototype Pattern）是用于创建重复的对象，同时又能保证性能。
categorise: JavaScript
abbrlink: 8177
date: 2019-04-26 23:45:19
---

JavaScript 

原型模式:

​	1.理解原型:在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自Object。每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被赋值为构造函数的原型对象

原型对象

原型链

<img src="https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/e46469c3fdff9147d092e1a8e16d20b4837f3f48.png">


this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用（也就是函数的调用方法）。

<hr>
调用栈想象成一个函数调用链，就像我们在前面代码段的注释中所写的一样。

但是这种方法非常麻烦并且容易出错。另一个查看调用栈的方法是使用浏览器的调试工具。

绝大多数现代桌面浏览器都内置了开发者工具，其中包含 JavaScript 调试器。就本例来说，你可以在工具中给 foo() 函数的第一行代码设置一个断点，或者直接在第一行代码之前插入一条 debugger;语句。

运行代码时，调试器会在那个位置暂停，同时会展示当前位置的函数调用列表，这就是你的调用栈因此，如果你想要分析 this 的绑定，使用开发者工具得到调用栈，然后找到栈中第二个元素，这就是真正的调用位置。

 this 的默认绑定指向全局对象

使用严格模式（strict mode），则不能将全局对象用于默认绑定，因此 this 会绑定到undefined：