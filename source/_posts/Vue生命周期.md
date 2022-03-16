---
title: Vue组件-生命周期
tags: Vue生命周期
categories: Vue.js
summary: 'vue生命周期是从实例的创建到销毁的整个过程,记录下生命周期的4个阶段'
abbrlink: 51007
date: 2019-06-26 09:05:06
keywords:
description:
---



>
>
> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。





Vue框架内置函数,随着组件的生命周期阶段自动执行



4个阶段,8个方法



- ***初始化   beforeCreated       created***
- ***挂载      beforeMounted      mounted***
- ***更新      beforeUpdate         updated***
- ***销毁      beforeDestory        destoryed***



vue实例从创建到编译模板执行了  beforeCreate / Created 钩子函数

​				<h1 align ="center">生命周期图示</h1>

![图片来自Vue官网](Vue生命周期/lifecycle-1639461741701.png)





```
<script>
export default {
  name: 'Day05App',

  data() {
    return {
    baba:"hello"
    };
  },
  beforeCreate(){
    //beforeCreate undefined 无法访问date 中数据
    console.log('beforeCreate',this.baba);
  },
   created(){
     //created hello
    console.log('created',this.baba);
  },
};
</script>
```







> *beforeCreate*=>*created*

# 初始化阶段

1. new Vue()=> init Events&Lifecycle 初始化事件和生命周期函数

2. beforeCreate 生命周期钩子函数被执行,不能访问data/methids..

3. init injiections&reactivity -Vue 内部添加data 和methods等

4. created 生命周期钩子函数被执行阶段  实例创建 可以访问data/methods..

5. 编译模板阶段-开始分析

6. has el option ? 有检查挂载到那里

7. 没有,调用$mount()方法

   有继续检查template阶段

最常用的Create(发送Ajax请求)





> *beforeMount*=>*mounted*

# 挂载阶段

1. template 选项检查
2. 有 编译template返回render函数
3. 无 编译el选项对应标签作为template(要渲染的模板)
4. 虚拟DOM 挂载真实DOM之前
5. beforeMount -生命周期钩子函数被执行  不能访问真实DOM
6. Create.. 把虚拟DOM和渲染的数据一并挂载到真实DOM上
7. 真是DOM挂载完毕
8. Mounted-生命周期钩子函数被执行







> *beforeUpdate=>updated*

# 更新阶段

1. 当date 里数据改变,更新DOM之前
2. beforeUpdate-生命周期钩子函数被执行  不能访问更新后的真实DOM,但是data数据已更新
3. Virtual DOM ... 虚拟DOM重新渲染 打patch 到真实DOM
4. updated -生命周期钩子函数被执行
5. 当有date数据改变,重复这个循环

beforeUpdate 获取更新前的真实DOM

updated 	  获取更新后的真是DOM





> *beforeDestory* => *destoryed*

# 销毁阶段

1. 当$destroy()被调用 – 比如组件DOM被移除(例v-if)
2. beforeDestroy – 生命周期钩子函数被执行
3. 拆卸数据监视器、子组件和事件侦听器 释放内存
4. 实例销毁后, 最后触发一个钩子函数
5. destroyed – 生命周期钩子函数被执行  不能访问watcher/全局事件