---
layout: post
title: 什么是虚拟 DOM
abbrlink: 53718
date: 2020-10-1 23:34:01
tags: Virtual DOM
summary: Virtual DOM 是一种编程概念。在这个概念里
categories: React
---

### 什么是 Virtual DOM？

Virtual DOM 是一种编程概念。

在这个概念里， UI 以一种理想化的，或者说**“虚拟的”表现形式被保存于内存中，并通过如 ReactDOM 等类库使之与“真实的” DOM 同步。这一过程叫做[协调](https://zh-hans.reactjs.org/docs/reconciliation.html)。**

这种方式赋予了 React 声明式的 API：您告诉 React 希望让 UI 是什么状态，React 就确保 DOM 匹配该状态。

这使您可以从属性操作、事件处理和手动 DOM 更新这些在构建应用程序时必要的操作中解放出来。

与其将 “Virtual DOM” 视为一种技术，不如说它是一种模式，人们提到它时经常是要表达不同的东西。

在 React 的世界里，术语 “Virtual DOM” 通常与 [React 元素](https://zh-hans.reactjs.org/docs/rendering-elements.html)关联在一起，因为它们都是代表了用户界面的对象。

而 React 也使用一个名为 “fibers” 的内部对象来存放组件树的附加信息。

上述二者也被认为是 React 中 “Virtual DOM” 实现的一部分。

*Virtual DOM* (VDOM) 是 *Real DOM* 的内存表示形式。

UI 的展示形式被保存在内存中并与真实的 DOM 同步。

这是在调用的渲染函数和在屏幕上显示元素之间发生的一个步骤。整个过程被称为 *reconciliation*。

<hr>

  Real DOM vs Virtual DOM

|           Real DOM           |       Virtual DOM        |
| :--------------------------: | :----------------------: |
|           更新较慢           |         更新较快         |
|      可以直接更新 HTML       |    无法直接更新 HTML     |
| 如果元素更新，则创建新的 DOM | 如果元素更新，则更新 JSX |
|       DOM 操作非常昂贵       |     DOM 操作非常简单     |
|        较多的内存浪费        |       没有内存浪费       |

  阅读资源：

1. [知乎 - 如何理解虚拟DOM?](https://www.zhihu.com/question/29504639)
2. [edureka - react-interview-questions](https://www.edureka.co/blog/interview-questions/react-interview-questions/)

<hr>

###   *Virtual DOM* 分为三个简单的步骤。

1. 每当任何底层数据发生更改时，整个 UI 都将以 Virtual DOM 的形式重新渲染。
2. 然后计算先前 Virtual DOM 对象和新的 Virtual DOM 对象之间的差异。
3. 一旦计算完成，真实的 DOM 将只更新实际更改的内容。

<hr>

#### React实现虚拟DOM:

createElement方法返回的对象记录了这个DOM节点所有的信息，换言之，通过它我们就可以生成真正的DOM，这个记录信息的对象我们称之为**虚拟DOM**。

在浏览器中无法直接使用 JSX，JSX是类XML语法,游览器只能解决原生JS.

所以大多数 React 开发者需依靠 Babel 或 TypeScript 来**将 JSX 代码转换为 JavaScript**。

许多包含预配置的工具，例如 Create React App 或 Next.js，在其内部也引入了 JSX 转换。

**.babelrc**

```js
{
    "presets": ["env"],
    "plugins": [
        ["transform-react-jsx", {
            "pragma": "React.createElement"
        }]
    ]
}
```

这个`transform-react-jsx`就是将jsx转换成js的babel插件，它有一个`pragma`项，可以定义jsx转换方法的名称，你也可以将它改成`h`（这是很多类React框架使用的名称）或别的。

**在定义React组件或者书写React相关代码，不管代码中有没有用到React这个对象，我们都必须将其import进来，这是为什么？**

例如：

```js
import React from 'react';    // 下面的代码没有用到React对象，为什么也要将其import进来
import ReactDOM from 'react-dom';

ReactDOM.render( <App />, document.getElementById( 'editor' ) );
```

<details>
    <summary>答案</summary>summary>
	<ul>
	<li>JSX 转换**abstract dom tree的时候，需要 `React.createElement`</li>
	</ul>
</details>

React17版本后,[官方](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)已经与babel合作**提供了一个新的、重写的 JSX 转换版本。**

可以不导入React情况下使用JSX.

#### ReactDOM.render实现真实DOM

`render`的第一个参数实际上接受的是createElement返回的对象，也就是虚拟DOM
而第二个参数则是挂载的目标DOM

总而言之，render方法的作用就是**将虚拟DOM渲染成真实的DOM**面是它的实现：

```js
function render( vnode, container ) {
    
    // 当vnode为字符串时，渲染结果是一段文本
    if ( typeof vnode === 'string' ) {
        const textNode = document.createTextNode( vnode );
        return container.appendChild( textNode );
    }

    const dom = document.createElement( vnode.tag );

    if ( vnode.attrs ) {
        Object.keys( vnode.attrs ).forEach( key => {
            const value = vnode.attrs[ key ];
             setAttribute( dom, key, value );    // 设置属性
        } );
    }

    vnode.children.forEach( child => render( child, dom ) );    // 递归渲染子节点

    return container.appendChild( dom );    // 将渲染结果挂载到真正的DOM上
}
```

### Shadow DOM 和 Virtual DOM 是一回事吗？

不，他们不一样。Shadow DOM 是一种浏览器技术，主要用于在 web 组件中封装变量和 CSS。

Virtual DOM 则是一种由 Javascript 类库基于浏览器 API 实现的概念。

### 什么是 “React Fiber”？

Fiber 是 React 16 中新的协调引擎。

它的主要目的是使 Virtual DOM 可以进行增量式渲染。[了解更多](https://github.com/acdlite/react-fiber-architecture).

<hr>

### React高性能的原理：

在Web开发中我们总需要将变化的数据实时反应到UI上，这时就需要对DOM进行操作。而复杂或频繁的DOM操作通常是性能瓶颈产生的原因（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。

React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A-B,B-A，React会认为A变成B，然后又从B变成A UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，部而对实际DOM进行操作的仅仅是Diff分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。

### React Fiber:

在react 16之后发布的一种react 核心算法，**React Fiber是对核心算法的一次重新实现**(官网说法)。之前用的是diff算法。

在之前React中，更新过程是同步的，这可能会导致性能问题。

当React决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对Virtual DOM，最后更新DOM树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，中途不会中断。因为JavaScript单线程的特点，如果组件树很大的时候，每个同步任务耗时太长，就会出现卡顿。

React Fiber的方法其实很简单——分片。把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

### React的特点和优势

1. #### 虚拟DOM

我们以前操作dom的方式是通过document.getElementById()的方式，这样的过程实际上是先去读取html的dom结构，将结构转换成变量，再进行操作

而reactjs定义了一套变量形式的dom模型，一切操作和换算直接在变量中，这样减少了操作真实dom，性能真实相当的高，和主流MVC框架有本质的区别，并不和dom打交道

1. #### 组件系统

react最核心的思想是将页面中任何一个区域或者元素都可以看做一个组件 component

那么什么是组件呢？

组件指的就是同时包含了html、css、js、image元素的聚合体

使用react开发的核心就是将页面拆分成若干个组件，并且react一个组件中同时耦合了css、js、image，这种模式整个颠覆了过去的传统的方式

1. #### 单向数据流

其实reactjs的核心内容就是数据绑定，所谓数据绑定指的是只要将一些服务端的数据和前端页面绑定好，开发者只关注实现业务就行了

1. #### JSX 语法

在vue中，我们使用render函数来构建组件的dom结构性能较高，因为省去了查找和编译模板的过程，但是在render中利用createElement创建结构的时候代码可读性较低，较为复杂，此时可以利用jsx语法来在render中创建dom，解决这个问题，但是前提是需要使用工具来编译jsx

<hr>

### 参考

[Virtual DOM 及内核](https://zh-hans.reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom)

[从零开始实现一个React（一）：JSX和虚拟DOM ](https://github.com/hujiulong/blog/issues/4)

