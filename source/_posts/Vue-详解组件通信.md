---
layout: post
title: Vue 详解组件通信
abbrlink: 14711
date: 2022-09-02 19:00:36
tags: 组件通讯
categories: Vue.js
summary: 组件通讯：父向子，子向父传值是面试过程中老生常谈的话题，还是总结一下
---

# 面试官：Vue组件之间的通信方式都有哪些？

![](https://static.vue-js.com/7de50d20-3aca-11eb-85f6-6fac77c0c9b3.png)

## 一、组件间通信的概念

开始之前，我们把**组件间通信**这个词进行拆分

- 组件
- 通信

都知道组件是`vue`最强大的功能之一，`vue`中每一个`.vue`我们都可以视之为一个组件通信指的是发送者通过某种媒体以某种格式来传递信息到收信者以达到某个目的。广义上，任何信息的交通都是通信**组件间通信**即指组件\(`.vue`\)通过某种方式来传递信息以达到某个目的举个栗子我们在使用`UI`框架中的`table`组件，可能会往`table`组件中传入某些数据，这个本质就形成了组件之间的通信

## 二、组件间通信解决了什么

在古代，人们通过驿站、飞鸽传书、烽火报警、符号、语言、眼神、触碰等方式进行信息传递，到了今天，随着科技水平的飞速发展，通信基本完全利用有线或无线电完成，相继出现了有线电话、固定电话、无线电话、手机、互联网甚至视频电话等各种通信方式从上面这段话，我们可以看到通信的本质是信息同步，共享回到`vue`中，每个组件之间的都有独自的作用域，组件间的数据是无法共享的但实际开发工作中我们常常需要让组件之间共享数据，这也是组件通信的目的要让它们互相之间能进行通讯，这样才能构成一个有机的完整系统

## 二、组件间通信的分类

组件间通信的分类可以分成以下

- 父子组件之间的通信
- 兄弟组件之间的通信
- 祖孙与后代组件之间的通信
- 非关系组件间之间的通信

关系图:

![](https://static.vue-js.com/85b92400-3aca-11eb-ab90-d9ae814b240d.png)

## 三、组件间通信的方案

整理`vue`中8种常规的通信方案

1.  通过 props 传递
2.  通过 \$emit 触发自定义事件
3.  使用 ref
4.  EventBus
5.  $parent 或$root
6.  attrs 与 listeners
7.  Provide 与 Inject
8.  Vuex

### props传递数据

![](https://static.vue-js.com/8f80a670-3aca-11eb-ab90-d9ae814b240d.png)

- 适用场景：父组件传递数据给子组件
- 子组件设置`props`属性，定义接收父组件传递过来的参数
- 父组件在使用子组件标签中通过字面量来传递值

`Children.vue`

```js
props:{  
    // 字符串形式  
 name:String // 接收的类型参数  
    // 对象形式  
    age:{    
        type:Number, // 接收的类型为数值  
        defaule:18,  // 默认值为18  
       require:true // age属性必须传递  
    }  
}  
```

`Father.vue`组件

```js
<Children name="jack" age=18 />  
```

### \$emit 触发自定义事件

- 适用场景：子组件传递数据给父组件
- 子组件通过`$emit触发`自定义事件，`$emit`第二个参数为传递的数值
- 父组件绑定监听器获取到子组件传递过来的参数

`Chilfen.vue`

```js
this.$emit('add', good)  
```

`Father.vue`

```js
<Children @add="cartAdd($event)" />  
```

### ref

- 父组件在使用子组件的时候设置`ref`
- 父组件通过设置子组件`ref`来获取数据

父组件

```js
<Children ref="foo" />  
  
this.$refs.foo  // 获取子组件实例，通过子组件实例我们就能拿到对应的数据  
```

### EventBus

- 使用场景：兄弟组件传值
- 创建一个中央事件总线`EventBus`
- 兄弟组件通过`$emit`触发自定义事件，`$emit`第二个参数为传递的数值
- 另一个兄弟组件通过`$on`监听自定义事件

`Bus.js`

```js
// 创建一个中央时间总线类  
class Bus {  
  constructor() {  
    this.callbacks = {};   // 存放事件的名字  
  }  
  $on(name, fn) {  
    this.callbacks[name] = this.callbacks[name] || [];  
    this.callbacks[name].push(fn);  
  }  
  $emit(name, args) {  
    if (this.callbacks[name]) {  
      this.callbacks[name].forEach((cb) => cb(args));  
    }  
  }  
}  
  
// main.js  
Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上  
// 另一种方式  
Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能  
```

`Children1.vue`

```js
this.$bus.$emit('foo')  
```

`Children2.vue`

```js
this.$bus.$on('foo', this.handle)  
```

### $parent 或$ root

- 通过共同祖辈`$parent`或者`$root`搭建通信桥连

兄弟组件

`this.$parent.on('add',this.add)  
`

另一个兄弟组件

`this.$parent.emit('add')  
`

### $attrs  与$ listeners

-    适用场景：祖先传递数据给子孙
-    设置批量向下传属性`$attrs`和 `$listeners`
-    包含了父级作用域中不作为 `prop` 被识别 \(且获取\) 的特性绑定 \( class 和 style 除外\)。
-    可以通过 `v-bind="$attrs"` 传⼊内部组件

```js
// child：并未在props中声明foo  
<p>{{$attrs.foo}}</p>  
  
// parent  
<HelloWorld foo="foo"/>  
```

```js
// 给Grandson隔代传值，communication/index.vue  
<Child2 msg="lalala" @some-event="onSomeEvent"></Child2>  
  
// Child2做展开  
<Grandson v-bind="$attrs" v-on="$listeners"></Grandson>  
  
// Grandson使⽤  
<div @click="$emit('some-event', 'msg from grandson')">  
{{msg}}  
</div>  
```

### provide 与 inject

- 在祖先组件定义`provide`属性，返回传递的值
- 在后代组件通过`inject`接收组件传递过来的值

祖先组件

```js
provide(){  
    return {  
        foo:'foo'  
    }  
}  
```

后代组件

```js
inject:['foo'] // 获取到祖先组件传递过来的值  
```

### `vuex`

- 适用场景: 复杂关系的组件数据传递
- `Vuex`作用相当于一个用来存储共享变量的容器
  ![](https://static.vue-js.com/fa207cd0-3aca-11eb-ab90-d9ae814b240d.png)

- `state`用来存放共享变量的地方
- `getter`，可以增加一个`getter`派生状态，\(相当于`store`中的计算属性），用来获得共享变量的值
- `mutations`用来存放修改`state`的方法。
- `actions`也是用来存放修改state的方法，不过`action`是在`mutations`的基础上进行。常用来做一些异步操作

### 小结

- 父子关系的组件数据传递选择 `props`  与 `$emit`进行传递，也可选择`ref`
- 兄弟关系的组件数据传递可选择`$bus`，其次可以选择`$parent`进行传递
- 祖先与后代组件数据传递可选择`attrs`与`listeners`或者 `Provide`与 `Inject`
- 复杂关系的组件数据传递可以通过`vuex`存放共享的变量





### 组件通信-父向子-props

因为每个组件的变量和值都是独立的

组件通信先暂时关注父传子, 子传父

父: 使用其他组件的vue文件

子: 被引入的组件(嵌入)

例如: App.vue(父)  MyProduct.vue(子)

### 讲解

需求: 封装一个商品组件MyProduct.vue - 外部传入具体要显示的数据, 如下图所示

![image-20210305201956669](images/image-20210305201956669.png)

步骤:

1. 创建组件components/MyProduct.vue - 复制下面标签

2. 组件内在props定义变量, 用于接收外部传入的值

3. App.vue中引入注册组件, 使用时, 传入具体数据给组件显示

components/MyProduct.vue - 准备标签

```vue
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'price', 'intro']
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

App.vue中使用并传入数据

```vue
<template>
  <div>
    <!-- 
      目标: 父(App.vue) -> 子(MyProduct.vue) 分别传值进入
      需求: 每次组件显示不同的数据信息
      步骤(口诀):
        1. 子组件 - props - 变量 (准备接收)
        2. 父组件 - 传值进去
     -->
    <Product title="好吃的口水鸡" price="50" intro="开业大酬宾, 全场8折"></Product>
    <Product title="好可爱的可爱多" price="20" intro="老板不在家, 全场1折"></Product>
    <Product title="好贵的北京烤鸭" price="290" :intro="str"></Product>
  </div>
</template>

<script>
// 1. 创建组件 (.vue文件)
// 2. 引入组件
import Product from './components/MyProduct'
export default {
  data(){
    return {
      str: "好贵啊, 快来啊, 好吃"
    }
  },
  // 3. 注册组件
  components: {
    // Product: Product // key和value变量名同名 - 简写
    Product
  }
}
</script>

<style>

</style>
```

> 总结: 组件封装复用的标签和样式, 而具体数据要靠外面传入

### 小结

1. 什么时候需要父传子技术?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>从一个vue组件里把值传给另一个vue组件(父->子)</li>
   </ol> 
   </details>


2. 父传子口诀(步骤)是什么?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>子组件内, props定义变量, 在子组件使用变量</li>
   <li>父组件内, 使用子组件, 属性方式给props变量传值</li>
   </ol> 
   </details>



## 组件通信-父向子-配合循环



把数据循环分别传入给组件内显示

### 讲解

数据

```js
list: [
    { id: 1, proname: "超级好吃的棒棒糖", proprice: 18.8, info: '开业大酬宾, 全场8折' },
    { id: 2, proname: "超级好吃的大鸡腿", proprice: 34.2, info: '好吃不腻, 快来买啊' },
    { id: 3, proname: "超级无敌的冰激凌", proprice: 14.2, info: '炎热的夏天, 来个冰激凌了' },
],
```

正确代码(==不可复制==)`

```vue
<template>
  <div>
    <MyProduct v-for="obj in list" :key="obj.id"
    :title="obj.proname"
    :price="obj.proprice"
    :intro="obj.info"
    ></MyProduct>
  </div>
</template>

<script>
// 目标: 循环使用组件-分别传入数据
// 1. 创建组件
// 2. 引入组件
import MyProduct from './components/MyProduct'
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.8,
          info: "开业大酬宾, 全场8折",
        },
        {
          id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.2,
          info: "好吃不腻, 快来买啊",
        },
        {
          id: 3,
          proname: "超级无敌的冰激凌",
          proprice: 14.2,
          info: "炎热的夏天, 来个冰激凌了",
        },
      ],
    };
  },
  // 3. 注册组件
  components: {
    // MyProduct: MyProduct
    MyProduct
  }
};
</script>

<style>
</style>
```

### 小结

1. 循环使用组件注意事项?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>每次循环, 变量和组件, 都是独立的</li>
   </ol> 
   </details>



## 组件通信_单向数据流

### 目标

在vue中需要遵循单向数据流原则
1. 父组件的数据发生了改变，子组件会自动跟着变
2. 子组件不能直接修改父组件传递过来的props  props是只读的

==父组件传给子组件的是一个对象，子组件修改对象的属性，是不会报错的，对象是引用类型, 互相更新==


> 总结: props的值不能重新赋值, 对象引用关系属性值改变, 互相影响

### 讲解

props变量本身是只读不能重新赋值

目标：从==父到子==的数据流向,叫==单向数据流==

原因: 子组件修改, 不通知父级, 造成数据不一致性

如果第一个MyProduct.vue内自己修改商品价格为5.5, 但是App.vue里原来还记着18.8 - 数据 不一致了

所以: Vue规定==props==里的变量, ==本身是只读==的


> 总结: 所以props变量本身是不能重新赋值的

### 小结

1. 为何不建议, 子组件修改父组件传过来的值?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>父子数据不一致, 而且子组件是依赖父传入的值</li>
   </ol> 
   </details>


2. 什么是单向数据流?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>从父到子的数据流向, 叫单向数据流</li>
   </ol> 
   </details>


3. props里定义的变量能修改吗?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>不能, props里的变量本身是只读的</li>
   </ol> 
   </details>



## 组件通信-子向父

### 目标

从子组件把值传出来给外面使用

### 讲解

问题:  那我怎么才能修改子组件接收到的值呢? - 其实要影响父亲, 然后数据响应式来影响儿子们

需求: 课上例子, 砍价功能, 子组件点击实现随机砍价-1功能

![image-20210307134253897](images/image-20210307134253897.png)

语法:

* 父: @自定义事件名="父methods函数"
* 子: this.$emit("自定义事件名", 传值) - 执行父methods里函数代码


components/MyProduct_sub.vue

```vue
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <button @click="subFn">宝刀-砍1元</button>
  </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
  props: ['index', 'title', 'price', 'intro'],
  methods: {
    subFn(){
      this.$emit('subprice', this.index, 1) // 子向父
      eventBus.$emit("send", this.index, 1) // 跨组件
    }
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

App.vue

```vue
<template>
  <div>
    <!-- 目标: 子传父 -->
    <!-- 1. 父组件, @自定义事件名="父methods函数" -->
    <MyProduct v-for="(obj, ind) in list" :key="obj.id"
    :title="obj.proname"
    :price="obj.proprice"
    :intro="obj.info"
    :index="ind"
    @subprice="fn"
    ></MyProduct>
  </div>
</template>

<script>

import MyProduct from './components/MyProduct_sub'
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.8,
          info: "开业大酬宾, 全场8折",
        },
        {
          id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.2,
          info: "好吃不腻, 快来买啊",
        },
        {
          id: 3,
          proname: "超级无敌的冰激凌",
          proprice: 14.2,
          info: "炎热的夏天, 来个冰激凌了",
        },
      ],
    };
  },
  components: {
    MyProduct
  },
  methods: {
    fn(inde, price){
      // 逻辑代码
      this.list[inde].proprice > 1 && (this.list[inde].proprice = (this.list[inde].proprice - price).toFixed(2))
    }
  }
};
</script>

<style>
</style>
```

> 总结: 父自定义事件和方法, 等待子组件触发事件给方法传值

### 小结

1. 什么时候使用子传父技术?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>当子想要去改变父里的数据</li>
   </ol> 
   </details>


2. 子传父如何实现?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>父组件内, 给组件@自定义事件="父methods函数"</li>
   <li>子组件内, 恰当时机this.$emit('自定义事件名', 值)</li>
   </ol> 
   </details>



## 阶段小结

总结父子组件关系-通信技术口诀

1. 组件是什么?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>是一个vue实例, 封装标签, 样式和JS代码</li>
   </ol> 
   </details>



2. 组件好处?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>便于复用, 易于扩展</li>
   </ol> 
   </details>



3. 组件通信哪几种, 具体如何实现?

   <details>     
   <summary>答案</summary> 
   <ol>
   <li>父 -> 子</li>
   <li>父 <- 子</li>
   </ol> 
   </details>


## 面试题

### 1. 请说下封装 vue 组件的过程

​    首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。

* 分析需求：确定业务需求，把页面中可以复用的结构，样式以及功能，单独抽离成一个组件，实现复用

* 具体步骤：Vue.component 或者在new Vue配置项components中, 定义组件名, 可以在props中接受给组件传的参数和值，子组件修改好数据后，想把数据传递给父组件。可以采用$emit方法。

### 2. Vue组件如何进行传值的

父向子 -> props定义变量 -> 父在使用组件用属性给props变量传值

子向父 -> $emit触发父的事件 -> 父在使用组件用@自定义事件名=父的方法 (子把值带出来)

### 3. Vue 组件 data 为什么必须是函数

每个组件都是 Vue 的实例, 为了独立作用域, 不让变量污染别人的变量

### 4. 讲一下组件的命名规范

​    给组件命名有两种方式(在Vue.Component/components时)，一种是使用链式命名"my-component"，一种是使用大驼峰命名"MyComponent"，

​	因为要遵循W3C规范中的自定义组件名 (字母全小写且必须包含一个连字符)，避免和当前以及未来的 HTML 元素相冲突


## 额外扩展

### 组件通信-EventBus

#### 目标

常用于跨组件通信时使用

讲解

两个组件的关系非常的复杂，通过父子组件通讯是非常麻烦的。这时候可以使用通用的组件通讯方案：事件总线（event-bus)


核心语法

EventBus/index.js- 定义事件总线bus对象

```js
import Vue from 'vue'
// 导出空白vue对象
export default new Vue()
```

List.vue注册事件 - 等待接收要砍价的值 (==直接复制==) - 准备兄弟页面

```vue
<template>
  <ul class="my-product">
      <li v-for="(item, index) in arr" :key="index">
          <span>{{ item.proname }}</span>
          <span>{{ item.proprice }}</span>
      </li>
  </ul>
</template>

<script>
export default {
  props: ['arr'],
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

components/MyProduct_sub.vue(==带学生主要写触发eventBus身上事件==)

```vue
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <button @click="subFn">宝刀-砍1元</button>
  </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
  props: ['index', 'title', 'price', 'intro'],
  methods: {
    subFn(){
      this.$emit('subprice', this.index, 1) // 子向父
      eventBus.$emit("send", this.index, 1) // 跨组件
    }
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

List.vue正确代码(==EventBus接收方==)

```vue
<template>
  <ul class="my-product">
    <li v-for="(item, index) in arr" :key="index">
      <span>{{ item.proname }}</span>
      <span>{{ item.proprice }}</span>
    </li>
  </ul>
</template>

<script>
// 目标: 跨组件传值
// 1. 引入空白vue对象(EventBus)
// 2. 接收方 - $on监听事件
import eventBus from "../EventBus";
export default {
  props: ["arr"],
  // 3. 组件创建完毕, 监听send事件
  created() {
    eventBus.$on("send", (index, price) => {
      this.arr[index].proprice > 1 &&
        (this.arr[index].proprice = (this.arr[index].proprice - price).toFixed(2));
    });
  },
};
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

> 总结: 空的Vue对象, 只负责$on注册事件, $emit触发事件, 一定要确保$on先执行

#### 小结

1. 什么时候使用eventBus技术?
    1. 当2个没有引用关系的组件之间要通信传值
2. eventBus技术本质是什么?
    1. 空白Vue对象, 只负责$on和$emit


## 参考文献

- https://juejin.cn/post/6844903990052782094#heading-0
- https://zh.wikipedia.org/wiki/\%E9\%80\%9A\%E4\%BF\%A1
- https://vue3js.cn/docs/zh



面试官VUE系列总进度：5／33

[面试官：说说你对vue的理解\?](http://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484101&idx=1&sn=83b0983f0fca7d7c556e4cb0bff8c9b8&chksm=fc10c093cb674985ef3bd2966f66fc28c5eb70b0037e4be1af4bf54fb6fa9571985abd31d52f&scene=21#wechat_redirect)

[面试官：说说你对SPA（单页应用）的理解\?](http://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484119&idx=1&sn=d171b28a00d42549d279498944a98519&chksm=fc10c081cb6749976814aaeda6a6433db418223cec57edda7e15b9e5a0ca69ad549655639c61&scene=21#wechat_redirect)

[面试官：说说你对双向绑定的理解\?](http://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484167&idx=1&sn=7b00b4333ab2722f25f12586b70667ca&chksm=fc10c151cb6748476008dab2f4e6c6264f5d19678305955c85cec1b619e56e8f7457b7357fb9&scene=21#wechat_redirect)

[面试官：说说你对Vue生命周期的理解\?](http://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484176&idx=1&sn=5623421ed2678046ed9e438aadf6e26f&chksm=fc10c146cb67485015f24f7e9f5862c4c685fc33485fe30e1b375a534b4031978439c554e0c0&scene=21#wechat_redirect)

![](https://static.vue-js.com/821b87b0-3ac6-11eb-ab90-d9ae814b240d.png)
