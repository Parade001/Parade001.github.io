---
title: vue组件
tags: Vue概念
summary: Vue 的组件本质上就是一个 “包含了描述组件选项的对象”。这个设计算是一个典型的 intuition based design
categories: Vue.js
abbrlink: 13012
date: 2019-06-18 09:06:08
---



> Vue 的组件本质上就是一个 “包含了描述组件选项的对象”。这个设计算是一个典型的 intuition based design，它不是从语言本身的机制或是类型系统出发去设计的，而是单纯从人如何描述自己想要的东西出发的                     													--  [引用自作者](
> https://www.zhihu.com/question/310485097/answer/591869966)



组件是可复用Vue实例,封装标签,样式和Js代码



组件化: 封装的思想,把页面上 ***可重用部分 封装为 组件***,从而方便项目的 开发 与维护



组件都只是通过 `Vue.component` 全局注册的:

- 全局注册 

  > 可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。



全局组件在main.js中注册并使用组件

```
import 组件对象(你想要重复利用的那个vue实例) from './components/组件对象'

//把这个组件作为自定义元素来使用('组件名',组件对象)
Vue.component('Mycomponents', 组件对象)
```

> ##### 	注意: 上面代码块必须需要放在 new Vue,否控制台会报错,会不认识你这个自定义组件



- 局部注册

  > //引入组件
  >
  > import pannel from "./components/pannel.vue"
  >
  > //局部注册组件
  >
  > export default {
  >
  > components:{
  >
  >   pannel
  >
  > }
  >
  > }



scoped:

使用方式,给style上添加scoped,这样它作用域范围只针对当前及子组件