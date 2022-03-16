---
title: React函数式组件入门
tags: 函数式组件
summary: >-
  通过函数创建的组件,又称简单组件或无状态组件再16.8版本函数式组件也拥有自己的状态,本质上说就是一个JS函数,React中事件处理函数中的this默认不指向组件实例
categories: React
abbrlink: 64380
date: 2020-10-08 11:30:34
keywords:
description:
---

- React函数组件必须以**大写字母**开头( React 解析组件标签，发现是大写开头的会被当做组件进行解析，解析的时候又发现其是一个函数式组件，随后会调用此函数，将返回的虚拟 DOM 转为真实 DOM，并渲染到页面中。)
- 必须有返回值,返回值表示改组件的结构,如果不想渲染任何,则return null

React中只有类组件有生命周期,定义函数组件方法:使用JS函数.

函数式组件是一个纯函数又被称为无状态组件,接收props对象返回一个react元素,不能在组件中使用setState(),因为所有生命周期钩子都来自继承的React.Component中.

而***[类组件](https://react.docschina.org/docs/react-without-es6.html)***需要去*继承React.Component 并且创建render函数返回react元素*.

```
import React from 'react
const Baba = (prop)=>{
    return <h1> {prop.name}</h1>
}
```

函数式组件中的this指向未undefined,因为Babel编译后的代码开启的 "use strict"



此处再总结下,***JS在哪些情况 下返回值为undefined***?

```javascript
1.访问声明,但没有初始化的变量
var a ;
console.log(a) ; //undefined

2.访问不存在的属性
var a={};
console.log(a.b) //undefined

3.访问任何被设置为 undefined 值的变量
var a = undefined;
console.log(a);  //undefined 

4.访问函数的参数没有被显式的传递值
(function(b){
    console.log(b) //undefined
})

5.函数 return 没有显示返回任何内容
function a(){
    return;
}
console.log(a()) //undefined

6.没有定义return 的函数隐式返回
function a()
console.log(a())  //undefined

```

