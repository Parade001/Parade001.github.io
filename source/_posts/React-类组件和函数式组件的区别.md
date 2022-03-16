---
title: React 类组件和函数式组件的区别
tags: 类区间与函数组件的区别
categories: React
summary: '本篇总结类组件函数组件,在 react16.8 发布react hook之前,只要类组件具有生命周期.因此区分两者区别还是尤为重要...'
abbrlink: 48530
date: 2021-01-12 19:39:42
keywords:
description:
---

 

语法上:

函数组件式纯函数,需要接收props参数并且返回一个React元素.

类组件 需要继承React.Component,并且创建render函数,返回react 元素

调用方式:

函数组件可以直接调用,返回一个新的React元素

类组件在调用时创建一个实例,然后通过调用实例里的render方法返回一个React元素

状态管理:

函数式组件没有状态管理,16.8通过hook 钩子函数,useState 去管理state,

使用useEffect去使用生命周期函数

渲染时的差异值:

类组件的this是可变的,事件处理程序属于具有特定`props`和`state`的特定渲染,

当回调超时的话，`this.props`就会打破这种联系,在回调时没有绑定到任何特定的渲染，它会丢失真正的`props`