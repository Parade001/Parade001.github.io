---
title: Vuex入门
tags: Vuex
summary: 'Vuex是vue项目中大范围数据共享的技术方案,能方便、高效实现组件之间的数据共享'
categories: Vue.js
abbrlink: 33216
date: 2019-07-28 11:00:32
keywords:
description:
---

什么是Vuex?

官网给出的解释是:

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension (opens new window)](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能



Vuex优点

- 数据的存取一步到位,不需层层传递
- 数据的流动非常清晰
- 存储在Vuex中的数据都是响应式(数据更新视图)的
- 使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。所以将 store 分割成模块（module）。每个模块拥有自己的 state、mutations、actions、getters，甚至是嵌套子模块，从上至下进行同样方式的分割

第一步下包

```bash
yarn add vuex
```

也可以通过CDN引用

```
https://unpkg.com/vuex@3.6.2/dist/vuex.js
```

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

##  Promise

Vuex 依赖 [Promise (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)。如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库，例如 [es6-promise (opens new window)](https://github.com/stefanpenner/es6-promise)。

你可以通过 CDN 将其引入：

```html
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
```

Vuex 使用**单一状态树**

Vuex五个核心属性:

- ### State :
  驱动应用的数据源(vuex状态存储在state中,只有通过显式地提交 (commit) mutation才能改变它

- ### Getter:
  当需要从state派生一些状态出来，且多个组件使用它时,使用getter属性相当于vue中的计算属性computed,只有原状态改变派生状态才会改变,第一个参数必须为statae,第二个可以是getter's

- ### Mutation :
  用于更改 store.state()，**必须是同步函数**

- ### Action :
  用于提交 mutation，而不是直接变更状态，可以包含(主要)任意异步操作**

  当需要知道action什么时候结束的时候,我们可以在函数中返回一个Promise,然后在提交时用then处理

- ### Module :
  切割模块,使每个模块有自己的state,mutation,action,getter

  如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。

  当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名，模块内部的action、mutation和getter是注册在全局命名空间，如果多个模块中action、mutation的命名是一样的，那么提交mutation、action时，将会触发所有模块中命名相同的mutation、action。

  *这样有太多的耦合，如果要使你的模块具有更高的封装度和复用性，你可以通过添加*`namespaced: true` 的方式使其成为带命名空间的模块。



<center>下图展示了VueX运行机制</center>

![vuex](Vuex入门/vuex.png)

 Vue 组件中展示状态呢？

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是
[在计算属性 (opens new window)](https://cn.vuejs.org/guide/computed.html)中返回某个状态：

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

## store :

store是个容器用于Vue组件从中读取状态,若store改变了状态,那么对应的组件也会得到高效的更新

不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是:

- **显式地提交 (commit) mutations**

- 如果是异步的，就**派发(dispatch)`actions**`，其本质还是提交`mutations`

<hr>

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```js
import Vuex from 'vuex'
import Vue from 'vue'
import shopcar from './shopcar'
//new store 实例对象就导入 引入模块就导入该js模块
Vue.use(Vuex)
const store = new Vuex.Store({
    //划分模块进行存储数据
    modules: {
    shopcar
}
})
export default store
```

*这里不得不提提一些常用的**辅助函数***

- mapState (将state中的数据映射到组件中)
- mapGetters(将getter中的计算属性映射到组件的计算属性中)
- mapMutation
- mapActions

#### mapState

> 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键

```js
import{mapState,mapGetters} from 'vuex'
```

...配合对象展开运算符,可以简化写法

```js
export default {
  name: 'MyFooter',
  computed: {
    ...mapGetters('shopcar',['allPrice','allCount']),
    ...mapState('shopcar',['cart']),
    isAll:{
      set(val){
        // 全选影响小选
        this.$store.commit('shopcar/modifyAllState',val)
      },
      get(){
        // 小选影响全选
      return  this.cart.every(item => item.goods_state)
      }
  },

  }
}
```

<hr>

#### Mutation

更改 Vuex 的 store 中的state的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。*这个回调函数就是我们实际进行状态更改的地方*，并且它会接受 state 作为第一个参数

提交载荷(Payload)

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读

<hr>

> Mutation 必须是同步函数在,Vuex 中，mutation 都是同步事务

#### 在组件中提交 Mutation

你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

#### mapGetter

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

通过方法访问

```js
  getters: {
        allPrice(state) {
            let newCart = state.cart.filter(item => item.goods_state)
            return newCart.reduce((sum, item) =>
                sum+=item.goods_count*item.goods_price,0
            )
        },
        allCount(state) {
        return  state.cart.filter(item => item.goods_state)
        .reduce((sum, item) =>
                sum += item.goods_count,0
            )
        }
    }
```

通过让 getter 返回一个函数，来实现给 getter 传参。

接收

```js
computed:{
    ...mapGetters("模块名",[' allPrice',' allCount'])
}
```

<hr>

#### actions



- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

异步操纵用的最多的自然是发送ajax

```js
  actions: {
        //在actions发送异步ajax
    async getCartList(context) {
    const {data:res} = await axios.get(' ')
    context.commit('modify',res.list)
        }
    },
```

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 [ async / await](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await)，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

#### modules

因为Vuex使用单一状态树,通过模块将store分割成多个模块,每个模块都有自己的state,mutation,action,getter

模块的局部状态
对于模块内部的 mutation 和 getter，**接收的第一个参数是模块的局部状态对象**。
同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 *context.rootState*：
```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```
对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```
