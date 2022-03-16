---
layout: post
title: Redux 缺点
abbrlink: 17051
date:  2021-02-08 01:16:56
tags:
categories:
summary: 我们知道redux是吸取Flux设计思想而来的,Reudx名字由来便是reducer+fluex
---

Redux 缺点。如下：

1. [中间件](https://www.zhihu.com/search?q=%E4%B8%AD%E9%97%B4%E4%BB%B6&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22:%22answer%22,%22sourceId%22:1517694160%7D)的基本能力还不够强
2. state很容易滥用
3. 你的应用要使用纯函数去处理变化
4. 应用中，状态很多都要抽象到 store，那么何时使用 local states 何时接入 Redux store
5. Redux 带来了[函数式编程](https://www.zhihu.com/search?q=%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22:%22answer%22,%22sourceId%22:274963347%7D)、不可变性思想等等，为了配合这些理念，开发者必须要写很多“模式代码（boilerplate）”，繁琐以及重复是开发者不愿意容忍的。当然也有很多 hack 旨在减少 boilerplate，但目前阶段，可以说 Redux 天生就附着繁琐
6. 你的应用就要用 objects 或者 arrays 描述状态

以上种种限制，都不是构建一个应用所必要的。而全部都是 Redux 所强加的，**那么这样好吗？**

------

对于很多应用，是没必要的。但是对于另外一些场景，**这些限制也都会转化成闪光之处**，缺点仿佛又成了优点，包括且不限于：

- 便于调试，具体不再展开；
- 便于线上错误收集，只需要发送 states, actions 等快照即可；
- 结合 localStorage 初始化 store；
- 便于服务端渲染；
- 开发在线协作型应用的救命解药；
- 时光旅行 Undo／Redo；
- 便于测试