---
title: Vue入门
tags: Object.defineProperty()
summary: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架,本质是一个构造函数'
categories: Vue.js
abbrlink: 58210
date: 2019-06-12 09:35:54
---

Vue是什么?

> Vue官网:渐进式 JavaScript 框架,一套拥有自己规范的语法,可以自底向上逐层应用



vue 其本质是一个构造函数,当我们使用new关键字实例化一个对象的时候,其原型、原型链上声明的属性和方法会根据面向对象编程思想(OOP)传入的参数，构建我们需要的对象，我们所有的操作，其本质上来讲就是在操作这个对象的属性改变和方法调用， console一下实例化出来的Vue对象瞅瞅

![preview](https://pic1.zhimg.com/v2-e0b215d7b4a3157a10c7e90afe6366ae_720w.jpg?source=3af55fa1)

库:	封装方法和属性的集合;

框架:	有自己的语法规则

声明式渲染 (Declarative Rendering)=>组件系统(Component System)=>

客户端路由(Component System)=>大规模状态管理器(Large Scale State Management)=> 

构建工具(Build System)



```mermaid
{% mermaid %}
graph LR;
id1(声明式渲染)-->id2(组件系统);
id2(组件系统)-->id3(客户端路由);
id3(客户端路由)-->id4(大规模状态管理);
id4(大规模状态管理)-->id5(构建工具)
style id1 width:100px ;
style id2 width:80px;
style id3 width:90px;
style id4 width:120px;
style id5 width:80px;
{% endmermaid %}
```



@Vue/cli 脚手架

好处:开箱即用,webpack 0 配置



安装全局包

```
yarn global add @vue/cli
```

检差是否安装成功

```
vue -V
```

返回版本号,安装成功

否则查看yarn 环境变量是否配置好



找到 yarn  全局包路径

```
yarn global bin
```

将路径添加到环境变量path

Vue初始化工程

```js
 vue create vuecli-demo
```



```mermaid
{% mermaid %}
graph BT;
 main.js(main.js);
 newVue["newVue()"];
 style newVue  width:80px;
 style HelloWorld.vue width:140px;
 style index.html width:100px;
 style 其他组件2.vue width:120px;
 style 其他组件.vue width:120px;
 style main.js width:80px;
 subgraph 脚手架代码和机构分析
   HelloWorld.vue-->app.vue;
   其他组件.vue-->app.vue;
   其他组件2.vue-->app.vue;
   app.vue-->newVue ;
   newVue-.->main.js;
   end
   newVue==>index.html;
   {% endmermaid %}
```







# Vue设计模式-MVVM

```mermaid
{% mermaid %}
graph LR;

View-->Viewmodel;
Viewmodel-->View;
Viewmodel-->model;
model-->Viewmodel;
{% endmermaid %}
```



```mermaid
{% mermaid %}
graph RL;
subgraph ViewModel
id2;
id4;
end
id1(View)-->id2(DOM Listers);
id2(DOM Listers)-->id3(Model);
id3(Model)-->id4(Data Bindings);
id4(Data Bindings)-->id1(View);
{% endmermaid %}
```



```

```



# Vue语法

> Vue模板语法,基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

语法:{{表达式}}

[数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值： ](https://cn.vuejs.org/v2/guide/syntax.html#%E4%BD%BF%E7%94%A8-JavaScript-%E8%A1%A8%E8%BE%BE%E5%BC%8F)

又叫插值表达式.



最常见的Vue指令

```
v-bind 和 v-on   
//可以简写为
	:  和 @click

//动态参数的缩写
@[event]
```



### 指令

> 指令 (Directives) 是带有 `v-` 前缀的特殊 attribute  --[官网解释](cn.vue.js.org)



### 修饰符

修饰符是以半角句号 **.** 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，**.prevent** 修饰符告诉 **v-on** 指令对于触发的事件调用 **event.preventDefault()**：











