---
title: Vue深入理解组件
tags: 组件插槽
summary: '当使用组件的时候,如果需要自己去选择插入什么标签,组件就显示什么标签,该如何去做?'
categories: Vue.js
abbrlink: 41749
date: 2019-06-30 10:06:16
keywords:
description:
---

# 插槽:

作用:让组件内的标签能动态传入

用法:

```html
<slot></slot>
```

​	当使用组件,并未给传入具体标签内容时,插槽默认内容会显示

​	使用组件时传入自定义标签

```html
<Pannel></Pannel>
```

自定义标签会替换slot的位置

<hr>

> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

<hr>

## 具名插槽

作用:给不同的slot分发不同的内容

> slot name= ""    这个 attribute 可以用来定义额外的插槽



给具名插槽提供内容时候,在一个 `<template>` 元素上使用 `v-slot` 指令，用template包裹自定义标签,并以 `v-slot` 的参数的形式提供其名称

```html
v-solot:name 简写等同 #name
```

```js
<template v-slot:header>
v-slot 
只能添加在 <template> 上 (只有一种例外情况)，这一点和已经废弃的 slot attribute 不同。
具名插槽和插槽的默认语法不能混用,会导致作用域不明确
```

<hr>

# 作用域插槽

> 让插槽内容能够访问子组件中才有的数据.
>
> 在子组件slot 身上添加属性和子组件的值
>
> 使用组件出template 配和v-slot = '变量名'

子组件内在的slot上绑定的变量

```html
<slot :row="obj">
</slot>
```

```
export default{
    data(){
        obj:{
            firstname: "Lionel",
            lastname: "messis"
        }
    }
}
```



<hr>

父组件指定接受

```html
<Pannel>
    //scope是个对象,存储了 slot 绑定了所有属性  scope:{row:obj}
	<template v-slot="scope">
    		<h1>
			{{scope.row.lastname}}    	
    		</h1>
    </template>
</Pannel>
```

```js
export default{
    components:{
        Pannel,
    }
}
```

在使用组件时开闭标签内写 template,设置v-slot="变量"

当被提供的内容*只有*默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上：

```html
v-slot:default="变量名"
v-slot="变量名"  等同以上
```

<hr>

# 自定义指令

作用:当Vue内置指令无法满足需求时可以自定义

用法: 全局注册或者局部注册(**核心API**)

全局: 

```js
// 全局注册指令
//参数1:指令名称 参数2: 配置对象
Vue.directive("foc", {
  //inserted 函数会自动使用 当该指令绑定的标签插入DOM树上时候执行 执行时候会把绑定的标签元素传过来
  inserted(el) {
      //对el进行操纵
  console.log(el)
  el.focus()
  }

})
```

局部注册:

```js
 directive:{
    foc:{
      inserted(el){
        el.focus();
      }
    }
  }
```

上面的focus指令能自动获取焦点

<hr>

下面这个案例的节选部分,实现了对btn点击转为搜索框,自动获取焦点,并注册了失去焦点,输入判定,本地存取,运用了序列化反序列化,以及使用ES7 的asnyc await 发送AJAX请求,

```html
  <td>
                    <!--绑定按下事件 通过监听inputVisible属性变化 以及inputValue属性注册										相应的事件  -->
                    <input type="text"
                        v-if="scope.row.inputVisible"
                        v-foc
                        ref="inp"
                        v-model="scope.row.inputValue"
                        @keydown.esc="scope.row.inputValue==''"
                        @keydown.enter="enterFn(scope.row)"
                        @blur="scope.row.inputVisible=!scope.row.inputVisible"
                        style="width:80px">
                    <button @click="!search(scope.row)" class="btn btn-primary"
                    v-else >+TAGS
                    </button><br>

                    <span style="margin-left:5px"
                        v-for="(item,index) in scope.row.tags"
                        :key="index"
                        class="badge bg-warning ">
                    {{item}}
                    </span>
                </td>
```

```js
export default {
    name: 'GoodslistMygoodslist',
    components:{
        MyTable,
        MyHeader
    },
    data() {
        return {
    //把本地数据取出来
        list: JSON.parse(localStorage.getItem('data')),
        isShow: true,
        };
    },
    //自定义指令的局部注册焦点事件
    directives:{
    foc:{
        inserted(el){
        el.focus()
                }
    }
},
        //发送ajax
    // async created(){
    //     let res= await this.$ajax({
    //         url:'/api/goods',
    //     })
    //     this.list=(res.data.data)
    // },

    methods: {
        search(row){
              // this.$nextTick().then(()=>{this.$refs.inp})
            row.inputVisible=true
        },
        enterFn(obj){
            if(obj.inputValue.trim().length===0){
                alert("非法")
                return 0
            }
            obj.tags.push(obj.inputValue)
            obj.inputValue=""
        },
        del(id){
            let index =  this.list.findIndex(item => item.id===id)
            this.list.splice(index,1)
        }
    },
    //深度监听将数据缓存到本地
    watch:{
        list:{
            deep: true,
            handler(){
                localStorage.setItem('data', JSON.stringify(this.list))
            }
        }
    }
};
```



<hr>

# $nextTick方法

参数:

> `{Function} [callback]`

<hr>

用法：

> 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上。

- $nextTick 原地返回值 是个Promise对象,因此能链式编写

<hr>

示例:

```html
 <button @click="search" v-if="isShow">点我搜索</button>
 <input  v-else ref= "inp"   type="text">
```

```js
data(){
    return:{
        isShow:true,
    }
},
methods:{ 
		search(){
      			this.isShow =false;	
        		this.$nextTick().then(()=>{ this.$refs.inp.focus()})
 				}
    		}
```

当用户点击这个search时,会立即跳转将btn 转为search框

参考:

- [Vue.nextTick](https://cn.vuejs.org/v2/api/#Vue-nextTick)
- [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)



<hr>

上文用到了$refs 方法

他是获取元素DOM元素的方法

### [ref](https://cn.vuejs.org/v2/api/#ref)

- **预期**：`string`

  `ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

  ```
  <!-- `vm.$refs.p` will be the DOM node -->
  <p ref="p">hello</p>
  
  <!-- `vm.$refs.child` will be the child component instance -->
  <child-component ref="child"></child-component>
  ```

  当 `v-for` 用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。

  关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！`$refs` 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。

- **参考**：[子组件 ref](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)

<hr>

### [vm.$refs](https://cn.vuejs.org/v2/api/#vm-refs)

- **类型**：`Object`

- **只读**

- **详细**：

  一个对象，持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

- **参考**：

  - [子组件 ref](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)
  - [特殊 attribute - ref](https://cn.vuejs.org/v2/api/#ref)

<hr>

> 获取原生DOM需要在Mounted生命周期获取

<hr>

在Mounted生命周期中获取2中方式

1. 在目标标签添加 id /ref 
2. 在恰当实际,通过 id / ref 属性获取目标标签

示例:

```html
 <h1 id ='baba' ref="bigH1"></h1>
 <h1>ref和ID获取原生DOM</h1>
```

```js
mounted(){
    let h1 = document.querySelector("#baba");
    let h1Ref = this.$refs.bigH1;
    console.log(h1);
    console.log(h1Ref);
}
```

## $refs 可以通过ref属性获取组件对象

###### *(当需要调组件对象里方法等)* 子传父方法

**示例:**

父组件:

```HTML
<h1>ref 获取子组件对象</h1>
<Demo ref="Yetu"></Demo>
```

```js
import Demo from './components/refdemo.vue'
export default {

components:{
        Demo,
  },
    mounted(){
        console.log(this.$refs.Yetu.msg)
        this.$refs.yetu.fn()
    }
}
```

子组件:

```html
<h4>这是子组件
     {{msg}}
</h4>
```

```js
export default {
data() {
        return {
            msg:'这是子组件里的数据'
        };
    },
 methods: {
        fn(){
            console.log("这是子组件里的方法")
        }
    },
}
```

