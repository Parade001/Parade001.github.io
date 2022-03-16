---
title: 混入(mixin)全局注册与局部注册的用法
tags: Vue.js
categories: Vue.js
summary: 'Vue.js提供了minxin,用于开发Vue组件种的可复用功能'
abbrlink: 24131
date: 2020-03-22 20:07:50
keywords:
description:
---

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。



例子: 私有引用

组件A内有方法C

组件B也有方法C(类似,改造成相同写法)



<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5huaad2j30be02xaaw.jpg"/>

<p align="center">组件A</p>

<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5hua8xfj30b902pmxz.jpg"/>

<p align="center">组件B</p>

<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5huapaej30ce05m76h.jpg"/>

<p align="center">mixin放入公共方法</p>

<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5hub5wjj30d007ctao.jpg"/>

<hr>

<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5huawu1j30ey03jgni.jpg"/>

<p align="center">在需要使用的组件内导入mixin</p>



<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5hubkrtj30db083dj6.jpg"/>

<p align="center">在需要使用的组件内导入mixin</p>

<hr>

放入全局进行注册引用: 在main.js导入并挂载mixin这个方法即可



<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5smr3arj30fq06vtb9.jpg"/>

<img src="https://tva1.sinaimg.cn/large/006aANDQly1gyb5t647rxj304e00rdfs.jpg"/>

