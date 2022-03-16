---
title: async与await执行机制
tags: async与await
summary: 本质上还是Promise的执行机制(**异步操作解决方案**)
categories: ES6
abbrlink: 38905
date: 2019-06-10 18:18:33
keywords:
description:
---



> async 和await 是Promise进一步简化,本质上还是Promise的执行机制(**异步操作解决方案**)...可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。



代码执行分同步(比如:new Promise 会立即执行)和异步执行

异步执行又分:

- 宏任务(比如:定时器)
- 微任务队列(resolve then)



async与await与Promise 不是强关联的,与[generator(迭代器)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)是强关联的.



await的返回值是异步执行操纵,按照微任务队列,是先进先出,用于等待一个异步方法执行完成,表示函数内(fn)的代码会立即执行(比如: await fn() )  

await返回值及下面的代码就是Promise.then里的异步微任务,



当同步任务执行完毕,

宏任务中有微任务的时候,先执行(检查是否有)微任务队列,执行完微任务队列后再执行下一轮宏任务



当同步任务执行完毕后

相比直接使用Promise

async和await优势在于处理then调用链,但是滥用await 可能导致性能问题,阻塞代码