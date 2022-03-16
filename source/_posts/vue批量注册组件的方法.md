---
title: vue批量注册组件的方法
tags: Vue批量组件的注册方法
categories: 'Vue,js'
summary: Vue批量注册组件
abbrlink: 22900
date: 2020-03-03 23:14:39
keywords:
description:
---

当需要很多注册许多公共组件时候,这个时候我们应该抽离,而不是继续使用Vue.use()注册

代码.在公共组件根目录下

```js
import Vue from 'vue'
// const  requireComponent=require.context('公共组件的目录','是否深层次查找',正则[以.vue文件结尾的都是我们要找的])
const requireComponent = require.context('./', true, /.vue$/)
requireComponent.keys().forEach(item => {
  var defaultCom = requireComponent(item).default //  获取的就是组件暴露出来的对象
  Vue.component(defaultCom.name, defaultCom)
})

```

在其他公共组件种开启命名:保持与文件夹名称一致即可