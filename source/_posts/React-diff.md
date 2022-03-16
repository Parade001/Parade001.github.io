---
layout: post
title: React diff
abbrlink: 61006
date: 2021-02-01 01:16:21
tags: diff
categories: React
summary: React16发布新的协调引擎对diff算法就行了重写,这就是fiber
---

### 什么是 “React Fiber”？

Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染:能够将渲染工作分成块并将其分散到多个帧上。提高其在动画、布局和手势等领域的适用性。[了解更多](https://github.com/acdlite/react-fiber-architecture).

------

React15diff算法:

- tree diff
- component diff
- element diff

实现策略见深入React技术栈173-181,此处省略

------

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。

而`Fiber`实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。

实现方式是使用了浏览器的`requestIdleCallback`这一 API。官方的解释是这样的：

> window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。

Fiber 只是一个普通的js 对象Object, 其中包含有关组件、其输入和输出的信息。

一条 fiber对应于一个堆栈帧，但它也对应于一个组件的实例,并且与实例具有一对一的关系它管理实例的工作

因此它跟踪那个实例用于使用属性的状态节点他还跟踪它与树中的其他fiber 关系
在更新之前已经有了fiber tree 在初始渲染期间构建,并且启动了一些 work in progress tree
并且从第一个fiber fiber 就是主机 drem 并且实际上它对应你在dom中主语以响应应用程序的容器它的第一个子项是列表.

从主机根目录到子列表直接的存在的关系,然后有一个关系从列表返回到作为返回关系的父项

React 去修复他所做的是切换指针,以便当前指针现在只想我们刚刚构建的工作进行中树,有一个很好的好处渲染虚拟树然后返回元素数组进行对比是否总可以重用意味着反应可以重用旧对象它可以重用工作进行中树中的东西，并且在下次必须构建时复制键值建立一个正在进行的工作树work in progress tree 称为双缓存,可以节省内存分配和垃圾回收的时间,

Fiber 架构将如何短期内使react 应用程序变得更好,它通过允许更高优先级的更新排成一列以条规较低优先级的更新之前,从而使更新更好
的协调工作,从而使UI更加流程和负责,他通过将工作分解成更小的工作单元来做到这一点,这些可以暂停,一边主线程了可以处理它需要的其他任务,这就是协调调度

[React conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs&t=1571s)