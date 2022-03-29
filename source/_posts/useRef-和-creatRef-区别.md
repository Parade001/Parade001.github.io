---
layout: post
title: useRef 和 creatRef 区别
tags: DOM操纵
categories: React
summary: '面试遇到的个问题,顺便总结复盘'
abbrlink: 33004
date: 2022-03-30 00:19:47
---

**useRef是个hook 因此不能用在类组件**

createRef并没有 Hooks 的效果，其值会随着 FunctionComponent 重复执行而不断被初始化：

作用完全一样,但是只要你认真读一下官方文档, 就会发现, 它们两个确实不一样.  

官网的定义如下: 

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

换句人话说 ,  useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西. 

**createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用**

<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png'>

在`Render phase`这个阶段是因为代码不做“副作用”，发现也就是写引擎，这是因为这个阶段可能会被 React 随时取消或重做。

修改阶段属于作为操作，因此不适合在这个阶段`Commit phase`看到这件事，或者我们可以在正常执行中进行操作。

最懒惰的所以下，最多只是被允许使用的情况，而且这种行为是允许使用的。

因为 FunctionComponent 增加了编排调度系统，为了优先响应用户操作，可能会暂定某个 React 组件的渲染，具体可以看第 9 篇篇精读：[精《Scheduling in React》](https://github.com/dt-fe/weekly/blob/v2/099.%E7%B2%BE%E8%AF%BB%E3%80%8AScheduling%20in%20React%E3%80%8B.md)

Ref 还可以拿到一个、一个 Mutable 被接受的对象，创建一个 Mutable 可以`useEffect`存储一个较旧的值，常用来获取，回复官方使用`previousProps`Ref 封装了一个简单的 Hooks 上一次的引用值

```
函数 usePrevious (值)  { 
  const  ref  =  useRef ( ) ; 
  useEffect ( ( )  =>  { 
    ref . current  =  value ; 
  } ) ; 
  返回 参考。当前；
}
```

在渲染`useEffect`完成后才执行，因此`ref`在当前渲染中永远是上一次渲染的时候，我们可以利用它来上一次渲染

```
函数 应用程序（道具） { 
  const  preProps  =  usePrevious （道具）；
}
```

不同之处在于可以将值兑现为在实现同样的功能，`ref`不同的特性，以实现闭包中传递的功能。



<hr>

### 参考

[useRef 与 createRef 区别](https://cloud.tencent.com/developer/article/1586855)

[**精读《useRef 与 createRef 的区别》**](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/141.%E7%B2%BE%E8%AF%BB%E3%80%8AuseRef%20%E4%B8%8E%20createRef%20%E7%9A%84%E5%8C%BA%E5%88%AB%E3%80%8B.md)