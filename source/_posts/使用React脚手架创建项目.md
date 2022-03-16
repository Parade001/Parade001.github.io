---
title: 使用React脚手架创建项目
tags: React脚手架创建项目
categories: React
summary: >-
  React 起源于 Facebook(Meta) 的内部项目（2011，News Feed），之后又被用来开发网站（2012，Instagram），并于
  2013 年 5 月开源。不同于Vue,React是构建用户界面的JS库,本文讲介绍React与Vue各自主要优点...
abbrlink: 15122
date: 2020-12-5 09:27:39
keywords:
description:
---

**双向绑定是对表单来说的，表单的双向绑定，说到底不过是 value 的单向绑定 + onChange** **事件侦听的一个语法糖。这个并不是 React 和 Vue** **在理念上真正的差别体现。**同时，**单向数据流不是 Vue 或者 React 的差别，而是 Vue 和 React 的共同**默契**选择。**单向数据流核心是在于避免组件的自身（未来可复用）状态设计，它强调把 state hoist 出来进行集中管理。

<hr>

React 推崇函数式，它直接进行**局部重新刷新（或者重新渲染）**，这样更粗暴，更简单，让我们的开发回到了上古时代，就是刷新呗，前端开发非常简单。**但是 React 并不知道什么时候“应该去刷新”，触发局部重新变化是由开发者手动调用 setState** **完成。**

<hr>

React setState 引起局部重新刷新。为了达到更好的性能，React 暴漏给开发者 shouldComponentUpdate 这个生命周期 hook，来避免不需要的重新渲染（**相比之下，Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少，而 React 对数据变化毫无感知，它就提供 React.createElement 调用已生成 virtual dom**）。
另外 **React 为了弥补不必要的更新，会对 setState** **的行为进行合并操作**。因此 setState 有时候会是异步更新，但并不是总是“异步”

<hr>

Vue 的响应式理念，进行数据拦截和代理中不存在类似问题（当然也有 batch 的操作）。

**这个设计上的差别，直接影响了 hooks 的实现和表现。**

React hook 底层是基于链表（Array）实现，每次组件被 render 的时候都会顺序执行所有的 hooks，因为底层是链表，每一个 hook 的 next 是指向下一个 hook 的，所以要求开发者不能在不同 hooks 调用中使用判断条件，因为 if 会导致顺序不正确，从而导致报错。

vue hook 只会被注册调用一次**，vue 之所以能避开这些麻烦的问题，根本原因在于它对数据的响应是基于响应式的，是对数据进行了代理的。他不需要链表进行 hooks 记录，它对数据直接代理观察。**

**但是 Vue 这种响应式的方案，也有自己的困扰。**比如 useState() （实际上 evan 命名为 value()）返回的是一个 value wrapper （包装对象）。一个包装对象只有一个属性：.value ，该属性指向内部被包装的值。**我们知道在 JavaScript 中，原始值类型如 string 和 number 是只有值，没有引用的。不管是使用 Object.defineProperty 还是 Proxy，我们无法追踪原始变量后续的变化。**因此 Vue 不得不返回一个包装对象，不然对于基本类型，它无法做到数据的代理和拦截。这算是因为设计理念带来的一个非常非常微小的  side effect

<hr>

- Vue core 可以静态分析 template，在解析模版时，整个 parse 的过程是利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的回调函数，来达到构造 AST 树的目的。
- Vue 事件处理函数中**的 this 默认指向组件实例。**而React 中事件处理函数中**的 this 默认不指向组件实例。**

<hr>

创建项目:

 方式一:

```
npm i -g create-react-app  或者 yarn global add create-react-app
初始化项目create-react-app my-app，my-app 表示项目名称，可以修改。
启动项目：yarn startor npm start
缺点：全局安装命令无法保证命令一直是最新版本。
```

推荐方式二:

```
npx create-react-app 项目名
yarn start 或者 npm start
优点：npx 会调用最新的 create-react-app 直接创建 React 项目。
```

