---
title: Redux 入门
tags: Redux
summary: Redux 是一个全局状态管理的JS库
categories: Redux
abbrlink: 11950
date: 2020-12-24 16:11:26
keywords:
description:
---

### 什么时候需要使用全局状态管理?

当状态提升提升不能够满足开发需求，状态树并不总是以一种线性的，单向的方式流动。就需要使用状态管理器。

### Redux状态管理器的核心思想:

- `store`状态树

- `action`行为状态对象

- `reducer`行为状态的处理

  ------

### Redux三大原则:

- 单一数据源
- 状态是只读的
- 状态修改均由纯函数完成

------

Redux核心API

是一个store,有Redux提供的createStore方法生成,想要生成store,必须要传入reducers.,同时也可以传入第二个可选参数初始化状态(initialState),了解redux之前必须知道reducers.

- reducer本质上是纯函数,负责响应action并修改数据的一个角色.
- 它有2个参数一个是action操纵指令,一个state当前的状态
- Reducers 就像事件侦听器一样，当他们听到他们感兴趣的动作时，他们会更新状态作为响应。
- Reducers 总是返回状态的累积（基于所有先前状态和当前 Action）。因此，它们充当了状态的 Reducer。每次调用 Redux reducer 时，状态和 Action 都将作为参数传递。然后基于该 Action 减少（或累积）该状态，然后返回下一状态。您可以*reduce*一组操作和一个初始状态（Store），在该状态下执行这些操作以获得最终的最终状态。

combineReducers:通常会有多个redux,在这里我们合成为一个根reducer,向外暴露

Redux名字由来蛋自说的:源于Reduce+Flux,因此可见reducer在Redux架构中的作用

createStore是Redux中最核心的API:

- getState():获取store中当前的状态.
- dispatch(action):分发action,并返回这个action,这是唯一能改变store数据的方式.
- subscribe(listener):注册一个监听者,它在store发生变化时被调用.
- replaceReducer(nextReducer):更新当前的store里的reducer,一般只会在开发模式中调用该方法

常用的是getState(),和dispatch()这两个方法.至于另外两个方法,一般会在Redux与某个系统(如React)做桥接的时候使用

### Redux执行机制:

![img](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

------

#### 1.视图层 view 通过store对象里的dispactch方法派发给action对象

#### action返回状态和给store再传递给reducer

**更新状态的唯一方法是调用store.dispatch()并传入一个动作对象**

action:是个 want to do 的过程 (计划要做一个什么样的操作)通常做逻辑处理操纵

#### 2.store会将2个参数传递给reduers,即state,和action

store包裹了action和reducer,是个中间桥梁,将二者钩起来

#### 3.reducer 去加工处理数据,返回store生成 新的state 树

store 将运行它的 reducer 函数并将新的 state 值保存在里面，state是store是store某一个时间点的快照集合.

我们可以调用`getState()`来检索更新的值,

#### 4.通知视图层状态改变

state树发生变化后.store会调用监听函数render 更新UI

------

#### 使用actionCreator 生成action

action 对象中必须拥有 type 字段，redux主要是根据该字段选择对应的 reducer 进行处理

reducer 处理函数必须 [纯函数](https://link.juejin.cn/?target=https://zh.wikipedia.org/wiki/%25E7%25BA%25AF%25E5%2587%25BD%25E6%2595%25B0)， reducer 接收相应的`state`，经过处理后返回新的`state`。不允许返回`undefined`或者`null`

当需要触发行为变更相关的状态树信息时，必须调用`dispatch`方法触发更新操作

决定状态树中内容的是 reducer 的返回值，并非 action 行为对象，因此如果没有对 action 进行 reducer 处理，即便使用`dispatch`触发更新，状态树也不会发生任何的变化

`redux`是同步进行的，因此创建 action 行为、触发更新操作`dispatch`等方法都必须是同步操作，若需要支持异步操作时，需要增加中间件的支持，比如 [redux-promise](https://link.juejin.cn/?target=https://github.com/redux-utilities/redux-promise)、[redux-thunk](https://link.juejin.cn/?target=https://github.com/reduxjs/redux-thunk) 等





