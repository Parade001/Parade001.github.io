---
title: Vue中的路由配置问题
tags: Router
summary: '如果对webpack脚手架配置已经很熟悉,那么vue中的路由配置更加不会难到你,本篇幅将介绍四级路由配置...'
categories: Vue.js
abbrlink: 21686
date: 2019-06-20 18:18:33
keywords:
description:
---

Vue中的路由模式:

​	区别:

- ***hash模式:通过`#号`后面的内容的更改，触发`hashchange`事件，实现路由切换***
- ***history模式:通过`pushState`和`replaceState`切换url，触发`popstate`事件，实现路由切换，需要后端配合***

是一种映射关系:路径和组件的映射关系.

优点:

- 单页应用(SPA):能将所有功能在一个html展示
- 前端路由作用:实现业务场景切换
- 整体不刷新,提高用户体验
- 数据传递容易,开发效率高

缺点:不利于SEO,首次加载比较慢

<hr>

使用步骤:

1. 下包

2. 引入

3. 注册

4. 规则

5. 路由对象

6. 注入

7. 挂载点

   <hr>

*下包*

```
yarn add vue-router
```

*引入*

```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)   // 引入包
// Vue.use() 就是在装插件 相当通过Vue.use将构造函数VueRouter加载到Vue上
```

*配置路由规则*(下面这个demo演示了四级路由配置)

```js

const routes = [{ path: '/',  //第一个规则用于重定向 访问/ 时候 强制跳转到 /find 路径
      			redirect: '/Find'},
               { name:'Find',
    path: '/find',
    component: Find,
    // 配置二级路由
    children: [
      {
        //匹配一级和二级路由的拼接 相当于路径拼接成 /find/ranking
        path: 'ranking',
        component: Ranking,
      },
      {
        path: 'recommend',
        component: Recommend,
        children: [{
            path: 'pop',
            component: Pop,
            children: [{
                path: 'album',
                component: Album,
              },
              {
                path: 'mv',
                component: Mv,
              },
              {
                path: 'live',
                component: Live,
              },
            ]
          },
          {
            path: 'rock',
            component: Rock,
          },
          {
            path: 'jazz',
            component: Jazz,
          },
          {
            path: 'punk',
            component: Punk,
          },
        ]
      },
      {
        path: 'songlist',
        component: SongList
      },
    ]
  },
  {
    name: 'My',
    path: '/my',
    component: My
  },
  {
     //加了 : name 就是参数 匹配不传参
    name: 'Part',
    path: '/part',
    component: Part
  },
  {
      //匹配动态传参
    name: 'active',
      path: '/part/:name/:age',
      component: Part
  },
  {
    path: '*',
    component: NotFound
  }
]
const router = new VueRouter({
  routes,
  //设置路由模式 不带  #  的路径 变好看了
  mode: "history"  
  // 打包上线后需要后台支持, 模式是hash
})

//将路由对象创建到new Vue创建的实例中
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```

部分演示截图(下面是汤老师)



<img src="https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/b72bc0d573f81accaa6edb9a0f1b9e9adf61bead.png">

**路由传参**

```js
<template>
  <div>
    <div class="footer_wrap">
      <!-- 声明式导航 自动加＃history -->
      <!-- <router-link to="/find">发现音乐</router-link>
      <router-link to="/my">我的音乐</router-link>
      <router-link to="/part?name=皮皮皮吃吃&age=24">秦时明月汉时光</router-link>
      <router-link to="/part/王力宏/18">ForeverLove</router-link> -->

      <!-- 编程式路由 -->
      <span @click="goto('/find','Find')">发现音乐</span>
      <span @click="toPartParam('/my?name=国立武汉大学&age=100','my')">我的学校			</span>
      <span @click="toPartQuery('/part?name=baba&age=20','part')">我的音乐</span>
      <span @click="toPartParams('/part','Part')">王力宏</span>

    </div>

    <div class="top">
    </div>
    <router-view>323</router-view>
  </div>
</template>

<script>

export default {
  name: 'RouterApp',
  methods: {
    goto(path,name){
      this.$router.push({
        name
      })
    },
    // 如果使用path 传参 会忽略 params 传参一般结合query
    toPartParams(){
      this.$router.push({
        name:'Find',
        //一般情况不建议写2个,如果都写 name 生效,预览出来会发现 第四个 <王力宏> 打开了find 路径地址 他把数据传过去了
        path:'/part'
      })
    },
    toPartQuery(){
      this.$router.push({
        path:'/part',
        query:{
          name:"baba",
          age:20
        }

        //1.path和params 不要同时使用,收不到
        // params:{
        //   name:'baba',
        //   age:302
        // }
      })
    },
    //通过 params 进行传参
    toPartParam(){
      this.$router.push({
        name:'My',
        params:{
          name:'国立武汉大学',
          age:100
        }
      })
    }

  }
}

</script>
```

*演示如图*

Query传参

![1639786354219](vueRouter/1639786354219.png)

params传参

![1639786389586](vueRouter/1639786389586.png)