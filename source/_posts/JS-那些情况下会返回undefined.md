---
layout: post
title: JS 那些情况下会返回undefined ?
abbrlink: 8007
date: 2022-03-26 19:27:08
tags: undefined
summary: React中this 默认执行不是组件实例,而是undefined,n那么还有那些场景会是undefined?
categories: JavaScript
---

- use strict
- react 组件中的this
- 访问不存在的属性
- 访问的变量没有初始化
- 函数 return 没有显示返回任何内容
- 没有定义 return 的函数隐式返回
- 访问的参数没有被显示的传递值
- 访问任何设置为 undefined 值的变量