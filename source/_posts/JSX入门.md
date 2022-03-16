---
title: JSX入门
tags: JSX
categories: React
summary: 'React 没有模板,直接就是一个渲染函数,中间返回值是一个虚拟DOM树'
abbrlink: 53908
date: 2020-09-10 10:58:04
keywords:
description:
---

JSX是JavaScript XML 的简写.使用JSX优势在于:能用声明式语法更直观,与HTML结构相同,提高开发效率.

JSX并不是标准ECMAScript 语法,再React中使用JSX需要配合Babel编译成React.createElement(),

并配合浏览器使用,create-react-app 脚手架中已经内置Babel相关配置.

<hr>

React推荐的做法是  

JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in  js'。

JSX实际就是一套使用XML语法，用于让我们更简单地去描述[树状结构](https://www.zhihu.com/search?q=%E6%A0%91%E7%8A%B6%E7%BB%93%E6%9E%84&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A815280420%7D)的语法糖。

在react中，所有的组件的渲染功能都依靠JSX。

你可以在render()中编写类似XML的语法，它最终会被编译成原生JavaScript。

不仅仅是  HTML 可以用 JSX 来表达，现在的潮流也越来越多地将 CSS 也纳入到 JavaScript 中来处理。

JSX是基于 JS  之上的一套额外语法，学习使用起来有一定的成本.

