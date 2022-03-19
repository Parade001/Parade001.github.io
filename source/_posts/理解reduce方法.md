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

# 语法:

> ```js
> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
> ```

reduce有2个参数:

*第一个参数是回调参数*:

*第二个参数是初始值(建议带上初始值)*:

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

`reduce` 可以理解为「归一」，意为海纳百川，万剑归一，完整的结构是 `Array.prototype.reduce(callbackfn[, initialValue])`，这里第二个参数并不是 thisArg 了，而是初始值 `initialValue`，关于初始值之前有介绍过。

- 如果没有提供 `initialValue`，那么第一次调用 `callback` 函数时，`accumulator` 使用原数组中的第一个元素，`currentValue` 即是数组中的第二个元素。
- 如果提供了 `initialValue`，`accumulator` 将使用这个初始值，`currentValue` 使用原数组中的第一个元素。
- 在没有初始值的空数组上调用 `reduce` 将报错。

用 JS 来模拟实现，核心逻辑如下：

```js
Array.prototype.reduce = function(callbackfn, initialValue) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this)
  let len = O.length >>> 0
  let k = 0, accumulator
  
  // 新增
  if (initialValue) {
    accumulator = initialValue
  } else {
    // Step 4.
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    // Step 8.
    let kPresent = false
    while(!kPresent && (k < len)) {
      kPresent = k in O
      if (kPresent) {
        accumulator = O[k] 
      }
      k++
    }
  }
  
  while(k < len) {
    if (k in O) {
      let kValue = O[k]
      accumulator = callbackfn.call(undefined, accumulator, kValue, k, O)
    }
    k++
  }
  return accumulator
}

// 代码亲测已通过
```

这部分源码主要多了对于 `initialValue` 的处理，有初始值时比较简单，即 `accumulator = initialValue`，`kValue = O[0]`。

无初始值处理在 Step 8，循环判断当 O 及其原型链上存在属性 k 时，`accumulator = O[k]` 并退出循环，因为 `k++`，所以 `kValue = O[k++]`。

更多的数组方法有 `find`、`findIndex`、`forEach` 等，其源码实现也是大同小异，无非就是在 `callbackfn.call` 这部分做些处理，有兴趣的可以看看 TC39 和 MDN 官网，参考部分链接直达。

<hr>

# 参考

[Array 原型方法源码实现大解密](muyiy.cn/blog/6/6.3.html#array-prototype-filter)

