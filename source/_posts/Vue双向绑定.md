---
title: Vue双向绑定
tags: 双向绑定
summary: '实现原理:Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。'
categories: Vue.js
abbrlink: 8370
date: 2019-06-16 10:13:27
keywords:
description:
---



# Vue双向绑定

**v-model** 指令用来在 input、select、textarea、checkbox

、radio 等表单控件元素上创建双向数据绑定，根据表单上的值，自动更新绑定的元素的值。

按钮的事件我们可以使用 v-on 监听事件，并对用户的输入进行响应。



value 属性和Vue数据变量,双向绑定到一起

- 语法: v-model="vue数据变量"
- 双向数据绑定
  - 数据变化 -> 视图自动同步
  - 视图变化 -> 数据自动同步



> vue双向绑定实现原理是Object.defineProperty(obj, prop, descriptor)

如果你不太记得这个方法:

​	此处就贴上MDN中的介绍

> [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```html
value
该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
默认为 undefined。
```

```html
get
属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
默认为 undefined。
```

```html
set
属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
默认为 undefined。
```





##   key的作用又是什么？

> vue官网: key 是给每一个 vnode 的唯一 id ，也是 diff 的一种优化策略，可以根据 key，更准确， 更快的找到对应的 vnode 节点



要求:key 值 不得是重复的字符串和数字,是唯一的 id,不能为对象.

vue 底层会创建虚拟 DOM 树,通过 key 与真实的 DOM 树中节点 key 进行比较.

有 key 的时候,会按照 key 进行比较;

无 key 的时候进行就地更新.

如何用 key ? 有 id 绑 id 无 id 用索引



Vue: 动态添加class

```html
语法:  :class="{键/名: 值}"
```



