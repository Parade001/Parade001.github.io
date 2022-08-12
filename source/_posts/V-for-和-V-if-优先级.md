---
layout: post
title: V-for 和 V-if 优先级
tags: 优先级
categories: Vue.js
summary: 本文讨论在Vue2 和 Vue3 中V-if V-for优先级问题.
abbrlink: 44728
date: 2022-08-12 14:23:14
---

### 在vue2中应尽量避免二者同时使用

[vue 2.x官方链接](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fconditional.html)

> 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。

那么,我们举个例子说明为啥不推荐

```
<template>
  <div class="hello">
     <div  v-for="(item,index) in list" v-if="index === 9" :key="item" ></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[1,2,3,4,5,6,7,8,9,10]   //需要遍历的数据
    }
  }
};
</script>

<style scoped>
</style>
```

它实际经过的运算是这样的

```
this.list.map(function (item,index) {
  if (index===9) {
    return item
  }
})
```

因此哪怕我们只渲染出一小部分的元素，也得在每次重渲染的时候遍历整个列表，不论是否发生了变化。

不建议这样做的原因就是比较浪费性能

Vue2 推荐的改进方案也是比较简单,就是采用计算属性去生成你要遍历的数组

如下

```
<template>
  <div class="hello">
    <!-- 2. 然后这里去循环已经被过滤的属性 -->
     <div  v-for="(item) in ListArr" :key="item" ></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[1,2,3,4,5,6,7,8,9,10]
    }
  },
  computed:{
    //1. 在computed里先做好判断，这里过滤的成本远比v-if的成本低
    ListArr(){
        return this.list.filter((_,index) => index === 1)
    }
  }
};
</script>
<style scoped>
</style>
```

从计算成本上来说，在计算属性中过滤会比在dom中判断是否显示更低。

### vue3中的改变

[vue 3.x官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Fconditional.html%23v-show)

> 当 `v-if` 与 `v-for` 一起使用时，`v-if` 具有比 `v-for` 更高的优先级。

那么是不是就可以鼓励大家这样使用呢?很显然不是,官方文档仍然不推荐同时使用,我们看下为什么

同样的,我们仍然使用上面例子做分析

```
<template>
  <div class="hello">
     <div  v-for="(item,index) in list" v-if="index === 9" :key="item" ></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[1,2,3,4,5,6,7,8,9,10]   //需要遍历的数据
    }
  }
};
</script>
<style scoped>
</style>
```

由于 v-if 优先级高,导致页面什么也不会渲染,控制台还有报错

```
[Vue warn]: Property "index" was accessed during render but is not defined on instance.
```

当然还有一些其它用法例如这种,可以显示数据,只是会一些Vue warn的警告

```
<template>
  <div class="hello">
     <ul>
        <li v-for="(item, index) in list" :key="index" v-if="item.show">
          {{ item.name }}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[
       { name: '张三', show: false },
       { name: '李四', show: true },
      ]   //需要遍历的数据
    }
  }
};
</script>
<style scoped>
</style>
```

这种方法也不是最好的,官方推荐的写法是这样的, 把 v-for 移动到容器元素上,例如ul,ol 或者外面包裹一层 template

```
<template>
  <div class="hello">
     <ul>
         <template v-for="(item, index) in list" :key="index">
          <li v-if="item.show">
            {{ item.name }}
          </li>
        </template>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[
       { name: '张三', show: false },
       { name: '李四', show: true },
      ]   //需要遍历的数据
    }
  }
};
</script>
<style scoped>
</style>
```

但如果想要有条件地跳过循环的执行，那么可以将v-if置于外层元素或者template上。

例如这样

```
<template>
  <div class="hello">
     <ul v-if="list.length">
          <li v-for="(item, index) in list" :key="index">
            {{ item.name }}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[
       { name: '张三', show: false },
       { name: '李四', show: true },
      ]   //需要遍历的数据
    }
  }
};
</script>
<style scoped>
</style>

```

`v-if`与`v-for`都是`vue`模板系统中的指令

在`vue`模板编译的时候，会将指令系统转化成可执行的`render`函数

### [#](https://vue3js.cn/interview/vue/if_for.html#%E7%A4%BA%E4%BE%8B)示例

编写一个`p`标签，同时使用`v-if`与 `v-for`

```
<div id="app">
    <p v-if="isShow" v-for="item in items">
        {{ item.title }}
    </p>
</div>
```



创建`vue`实例，存放`isShow`与`items`数据

```
const app = new Vue({
  el: "#app",
  data() {
    return {
      items: [
        { title: "foo" },
        { title: "baz" }]
    }
  },
  computed: {
    isShow() {
      return this.items && this.items.length > 0
    }
  }
})
```



模板指令的代码都会生成在`render`函数中，通过`app.$options.render`就能得到渲染函数

```
ƒ anonymous() {
  with (this) { return 
    _c('div', { attrs: { "id": "app" } }, 
    _l((items), function (item) 
    { return (isShow) ? _c('p', [_v("\n" + _s(item.title) + "\n")]) : _e() }), 0) }
}
```

`_l`是`vue`的列表渲染函数，函数内部都会进行一次`if`判断

初步得到结论：`v-for`优先级是比`v-if`高

再将`v-for`与`v-if`置于不同标签

```
<div id="app">
    <template v-if="isShow">
        <p v-for="item in items">{{item.title}}</p>
    </template>
</div>
```

再输出下`render`函数

```
ƒ anonymous() {
  with(this){return 
    _c('div',{attrs:{"id":"app"}},
    [(isShow)?[_v("\n"),
    _l((items),function(item){return _c('p',[_v(_s(item.title))])})]:_e()],2)}
}
```

这时候我们可以看到，`v-for`与`v-if`作用在不同标签时候，是先进行判断，再进行列表的渲染

我们再在查看下`vue`源码

源码位置：`\vue-dev\src\compiler\codegen\index.js`

```
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    ...
}
```

在进行`if`判断的时候，`v-for`是比`v-if`先进行判断

最终结论：`v-for`优先级比`v-if`高

## [#](https://vue3js.cn/interview/vue/if_for.html#%E4%B8%89%E3%80%81%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)三、注意事项

1. 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
2. 如果避免出现这种情况，则在外层嵌套`template`（页面渲染不生成`dom`节点），在这一层进行v-if判断，然后在内部进行v-for循环

```
<template v-if="isShow">
    <p v-for="item in items">
</template>
```

1. 如果条件出现在循环内部，可通过计算属性`computed`提前过滤掉那些不需要显示的项

```
computed: {
    items: function() {
      return this.list.filter(function (item) {
        return item.isShow
      })
    }
}
```



### 结论

- 在vue2中，v-for的优先级高于v-if
- 在vue3中，v-if的优先级高于v-for
- 两种混在一起写法均不被官方推荐



转载：[Vue3的v-if 和v-for优先级详解](https://juejin.cn/post/7128328827981266980#heading-2)

参考：[v-if和v-for的优先级是什么？](https://vue3js.cn/interview/vue/if_for.html#%E4%B8%80%E3%80%81%E4%BD%9C%E7%94%A8)