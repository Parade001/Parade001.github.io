---
title: React 类组件生命周期
tags: React生命周期
categories: React
summary: '组件的生命周期是组件从创建到挂载到页面中运行,在到组件卸载的过程,只有类组件才有生命周期.'
abbrlink: 54232
date: 2020-09-25 10:31:27
keywords:
description:
---

### React类组件生命周期主要分三个阶段:

- 挂载阶段
- 更新阶段
- 卸载阶段

### **挂载阶段**

| 钩子函数          | 触发时机                    | 作用                                       |
| ----------------- | --------------------------- | ------------------------------------------ |
| constructor       | 创建组件时，最先执行        | 1. 初始化 state 2. 创建 Ref 等             |
| render            | 每次组件渲染都会触发        | 渲染 UI（**注意： 不能调用 setState()** ） |
| componentDidMount | 组件挂载（完成 DOM 渲染）后 | 1. 发送网络请求 2.DOM 操作                 |

### **更新阶段**

|      钩子函数      | 触发时机                    | 作用                                                     |
| :----------------: | --------------------------- | -------------------------------------------------------- |
|       render       | 每次组件渲染都会触发        | 渲染 UI（与挂载阶段是同一个 render）                     |
| componentDidUpdate | 组件更新（完成 DOM 渲染）后 | DOM 操作，可以获取到更新后的 DOM 内容，不要调用 setState |

### **卸载阶段**

componentWillUnmount  组件卸载（从页面中消失）  执行清理工作（比如：清理定时器等、解绑事件等）

<hr>

当组件的 props 或 state 发生变化时会触发更新。

### ***组件更新的生命周期调用顺序如下***：

- [`static getDerivedStateFromProps()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)
- [**render()**](https://zh-hans.reactjs.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
- [**componentDidUpdate()**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)