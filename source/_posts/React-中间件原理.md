---
layout: post
title: React 中间件原理
abbrlink: 52370
date:  2021-02-22 01:15:42
tags: Redux中间件
categories: Redux
summary: 中间件可以让你在接收请求例如和生成报表之间的其他几个代码
---

在深入理解中间件之前，我们先来看一个很关键的概念。

#### 复合函数/函数组合（function composition）

> 在数学中，复合函数是指逐点地把一个函数作用于另一个函数的结果，所得到的第三个函数。
>
> 直观地说，复合两个函数是把两个函数链接在一起的过程，内函数的输出就是外函数的输入。
>
> -- 维基百科

大家看到复合函数应该不陌生，因为上学时的数学课本上都出现过，我们举例回忆下：



```js
f(x) = x^2 + 3x + 1
g(x) = 2x

(f ∘ g)(x) = f(g(x)) = f(2x) = 4x^2 + 6x + 1 
```

其实编程上的复合函数和数学上的概念很相似：



```js
var greet = function(x) { return `Hello, ${ x }` };
var emote = function(x) { return `${x} :)` };
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  }
}
var happyGreeting = compose(greet, emote);
// happyGreeting(“Mark”) -> Hello, Mark :)
```

这个写法可能需要你花点时间去理解。如果理解了，那么恭喜你，因为redux的compose写法基本就是这样。但是如果一下子无法理解也没关系，我们只要先记住：

1. **compose(A, B, C)的返回值是：(arg)=>A(B(C(arg)))，**
2. **内函数的输出就是外函数的输入**

------

#### Redux middleware

“It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.”
这是 Dan Abramov 对 middleware 的描述。它提供了一个分类处理 action 的机会。在 middleware 中，你可以检阅每一个流过的 action，挑选出特定类型的 action 进行相应操作，给你一次改变 action 的机会。

------

#### **middleware** 的由来

图 5-2 表达的是 Redux 中一个简单的同步数据流动场景，点击 button 后，在回调中分发一个 action， reducer 收到 action 后，更新 state 并通知 view 重新渲染。单向数据流，看着没什么问题。但是，如果需要打印每一个 action 信息来调试，就得去改 dispatch 或者 reducer 实现，使其具有打印日志的功能。又比如，点击 button 后，需要先去服务端请求数据，只有等数据返回后，才能重新渲染 view，此时我们希望 dispatch 或 reducer 拥有异步请求的功能。再比如，需要异步请求
数据返回后，打印一条日志，再请求数据，再打印日志，再渲染。



**Redux同步数据流动**

面对多样的业务场景，单纯地修改 dispatch 或 reducer 的代码显然不具有普适性，我们需要的是可以组合的、自由插拔的插件机制，这一点 Redux 借鉴了 Koa （它是用于构建 Web 应用的 Node.js 框架）里 middleware 的思想，详情可查阅附录 A。另外，Redux 中 reducer 更关心的是数据的转化逻辑，所以 middleware 就是为了增强 dispatch 而出现的。
图 5-3 展示了应用 middleware 后 Redux 处理事件的逻辑，每一个 middleware 处理一个相对独立的业务需求，通过串联不同的 middleware 实现变化多样的功能。那么，后续我们就来讨论 middleware 是怎么写的，以及 Redux 是如何让 middleware 串联起来的。

<img src="https://tva1.sinaimg.cn/large/006aANDQgy1h09k94e5buj30fe03g3z1.jpg" alt="应用中间件后的处理逻辑">

****

****

<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/sp20220316_184550_438.png' alt='分析middleware运行原理'>



#### 中间件的作用:

Redux 自身只能处理同步数据流，但是在实际项目开发中，状态的更新、获取，通常是使用异步操作来实现。

- 问题：如何在 Redux 中进行异步操作呢?
- 回答：通过 Redux 中间件机制来实现。
- 中间件，可以理解为处理一个功能的中间环节，对于 Redux 中间件来说就是在数据到达 reducer 之前进行一系列的处理操作。

触发时机:dispatching action 和到达reducer之间

------

常见的中间间函数:

##### Thunk 函数实现上就是针对多参数的 currying 以实现对函数的惰性求值。任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。

<img src='https://tva1.sinaimg.cn/large/006aANDQgy1h09llmmsagj30i7072jui.jpg' alt='redux-thunk源码'>

****

------

参考:

<深入React技术栈>

[详解redux中间件](https://segmentfault.com/a/1190000023787306)