---
title: React Hooks 入门
tags: Hooks
categories: React
summary: 本篇主要讲述UseState,UseEffect 这2个hook用法.
abbrlink: 33965
date: 2021-01-01 08:55:32
keywords:
description:
---

#### 开始使用useState 函数:

当我们使用 `useState` 定义 state 变量时候，它返回一个有两个值的数组。

第一个值是当前的 state

第二个值是更新 state 的函数。

使用 `[0]` 和 `[1]` 来访问有点令人困惑，因为它们有特定的含义。这就是我们使用数组解构的原因。

#### **调用 useState 方法的时候做了什么?**

它定义一个 “state 变量”。我们的变量叫 `count`， 但是我们可以叫他任何名字，比如 `banana`。

这是一种在函数调用时保存变量的方式 —— `useState` 是一种新方法，它与 class 里面的 `this.state` 提供的功能完全相同。

一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

在app.js中,rfc快速创建片段



```javascript
import React, { useState } from 'react'
export default function App() {
  // 返回值:[状态/初始值,修改状态的方法]
  const [count, setCount] = useState(0)
  return (
    <div>
      <h4>计数器:{count}</h4>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

另一个写法比较好理解

```javascript
import React, { useState } from 'react'
export default function App() {
  // 返回值:[状态/初始值,修改状态的方法]
  const [count, setCount] = useState(0)
  const handlerClick = () => {
    setCount(count + 1)
    // setCount((prevCount)=>prevCount+1) 同样是异步的表现
  }
  return (
    <div>
      <h4>计数器:{count}</h4>
      <button onClick={handlerClick}>+1</button>
    </div>
  )
}
```

useState的初始值(参数)只会在组件第一次渲染时生效,只会走一次,React内部会存储state值,

再次渲染拿到的是新的state.

所以初始值是需要大量计算的才能拿到的话,更加建议写在useState(()=>{}) 的回调函数里.

因为函数的初始值只在渲染一次,这样可以减少性能损耗.

```javascript
const [count, setCount] = useState(() => {
   console.log('爪巴')
   let initQuantity = 0
   for (let i = 0; i < 1000000; i++) {
     initQuantity += i
   }
   return initQuantity
 })
```

注意项:

- 提供的多个状态时,每一个调用返回的[state,setState]互不影响

- 不能嵌套在if for 或其他条件表达式(React hook 底层是基于链表（Array）实现，

  每次组件被 render 的时候都会顺序执行所有的 hooks，因为底层是链表,

  每一个 hook 的 next 是指向下一个 hook 的

  所以要求开发者不能在不同 hooks 调用中使用判断条件，因为 if 会导致顺序不正确，从而导致报错

------

#### 开始使用useEffect函数

Effect Hook可以让你在函数组件中执行副作用操作

#### **useEffect 做了什么？**

通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。

#### **为什么在组件内部调用 useEffect？**

将 `useEffect` 放在组件内部让我们可以在 effect 中直接访问 `count` state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。

#### **useEffect 会在每次渲染后都执行吗？**

是的，默认情况下，它在第一次渲染之后*和*每次更新之后都会执行。

（我们稍后会谈到[如何控制它](https://zh-hans.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)。）你可能会更容易接受 effect 发生在“渲染之后”这种概念,

不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

------

- 推荐一个useEffect()回调里处理一个功能
- 第二个参数可以传递[args],指定生效的依赖性
- 传递空数组,执行时机:在初始化完成相当于 class compoentDidMount ,只执行一次,发请求,绑定事件
- 不传递args,则函数每次调用,都会执行这个业务逻辑

------

#### 提示: 通过跳过 Effect 进行性能优化

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState`  的比较逻辑解决：

```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

这是很常见的需求，所以它被内置到了 `useEffect` 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：



```none
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

上面这个示例中，我们传入 `[count]` 作为第二个参数。

这个参数是什么作用呢？如果 `count` 的值是 `5`，而且我们的组件重渲染的时候 `count` 还是等于 `5`，React 将对前一次渲染的 `[5]` 和后一次渲染的 `[5]` 进行比较。

因为数组中的所有元素都是相等的(`5 === 5`)，React 会跳过这个 effect，这就实现了性能的优化。

当渲染时，如果 `count` 的值更新成了 `6`，React 将会把前一次渲染时的数组 `[5]` 和这次渲染的数组 `[6]` 中的元素进行对比。

这次因为 `5 !== 6`，React 就会再次调用 effect。如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect。

对于有清除操作的 effect 同样适用：

```javascript
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
```

未来版本，可能会在构建时自动添加第二个参数。

> 注意：
>
> 如果你要使用此优化方式，请确保数组中包含了**所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。参阅文档，了解更多关于[如何处理函数](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)以及[数组频繁变化时的措施](https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)内容。
>
> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。
>
> 这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。
>
> 这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
>
> 如果你传入了一个空数组（`[]`），effect 内部的 props 和 state 就会一直拥有其初始值。
>
> 尽管传入 `[]` 作为第二个参数更接近大家更熟悉的 `componentDidMount` 和 `componentWillUnmount` 思维模式，但我们有[更好的](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)[方式](https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)来避免过于频繁的重复调用 effect。
>
> 除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。
>
> 我们推荐启用 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 中的 [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) 规则。此规则会在添加错误依赖时发出警告并给出修复建议。

effect 的清除机制可以避免 `componentDidUpdate` 和 `componentWillUnmount` 中的重复，同时让相关的代码关联更加紧密，帮助我们避免一些 bug。

我们还看到了我们如何根据 effect 的功能分隔他们，这是在 class 中无法做到的。

#### **模拟componentWillUnmount**

```javascript
useEffect(()=>{
    const timer = setTimeout(()=>{
        ....
    },2000)
    return()=>{
	cosole.log('组件死了')
	}
})

```

> useEffect 函数返回的函数可以表示组件死亡 

<hr>

总结useEffect:

- 不传参: 模拟 componentDidMount 或者componentDidUpdate

执行时机:初始化和数据变化的时候执行

- 传空数组: 

表示只有在组件第一次渲染后执行，一般会进行**事件绑定**、**发送请求**等。