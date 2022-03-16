---
title: 理解reduce方法
tags: reduce
categories: ES5
abbrlink: 49104
date: 2019-06-01 17:50:33
keywords:
description:
summary:
---

语法:

> ```js
> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
> ```

reduce有2个参数:

第一个参数是回调参数:

第二个参数是初始值(建议带上初始值):

​	如果不写初始值:sum 是数组第一个元素,并且循环从第二个元素开始.



回调函数有4个参数

```js
reducer函数接收4个参数:
1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)
```

```js
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

```



reduce 对数组每个成员执行sum函数,执行到第二个会将一个值累加过来

reduce的回调函数必须return 结果,而return 的结果会作为下一次循环的累计器的值.