---
layout: post
title: 浅谈HOC的优缺点
abbrlink: 50638
date: 2021-01-05 23:06:27
tags: 为什么要用Hook
summary: React16.8推出了hook,那么社区为何要大力发挥函数式组件的作用呢?
categories: React
---

**HOC**
优点
通过传递props去影响内层组件的状态，不直接改变内层组件的状态，降低了耦合度
缺点
组件多层嵌套， 增加复杂度与理解成本
ref隔断， React.forwardRef 来解决
高阶组件多层嵌套，相同命名的props会覆盖老属性
不清楚props来源与哪个高阶组件

<hr>

**render props**
优点
props命名可修改，不存在相互覆盖
清楚props来源
不会出现组件多层嵌套
缺点
函数回调形式的嵌套
写法繁琐，没有hoc装饰器写法简单
无法在return以外的地方访问数据



<hr>

 组件状态复用问题:

  mixins:数据来源不清晰,命名冲突,

  HOC,render props  **重构组件结构,导致组件形成JSX嵌套形成的JSX嵌套地狱问题**

- class组件自身的问题: 

- 同一业务状态和业务逻辑被拆分到不同位置.

  不利于代码压缩和优化,不利于TS类型推导



<hr>

**hook**
优点
解决了hoc，render props的嵌套问题
可以在 return 之外使用数据
可以重命名，不存在覆盖，且清楚数据来源
缺点
在闭包场景可能会引用到旧的state、props值