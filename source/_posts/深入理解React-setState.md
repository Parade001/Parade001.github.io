---
title: 深入理解React setState
tags: setState
categories: React
summary: 'React遵循数据不可变性原则,任何可变数据应该只有一个对应的唯一数据源,state都是...'
abbrlink: 13910
date: 2021-02-15 09:11:42
keywords:
description:
---

整体流程:

<img src='' alt='React生命周期整体流程图'>

在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。

React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。

一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

通常，state 都是首先添加到需要渲染数据的组件中去。

然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。

你应当依靠[自上而下的数据流](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)，而不是尝试在不同组件间同步 state。

提升state方式比双向绑定方式需要编写更多的“样板”代码，但带来的好处是，排查和隔离 bug 所需的工作量将会变少





<hr>

### 参考

深入React技术栈