---
layout: post
title: state 和 props 区别
abbrlink: 34716
date: 2021-01-18 00:31:52
tags: state & props
categories: React
summary: state 和 props 区别?
---

### 状态和属性有什么区别?

state 和 props 都是普通的 JavaScript 对象。

虽然它们都保存着影响渲染输出的信息，但它们在组件方面的功能不同。

Props 以类似于函数参数的方式传递给组件，而状态则类似于在函数内声明变量并对它进行管理。

States vs Props

| Conditions           | States | Props |
| -------------------- | ------ | ----- |
| 可从父组件接收初始值 | 是     | 是    |
| 可在父组件中改变其值 | 否     | 是    |
| 在组件内设置默认值   | 是     | 是    |
| 在组件内可改变       | 是     | 否    |
| 可作为子组件的初始值 | 是     | 是    |