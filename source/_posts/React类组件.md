---
title: React类组件
tags: 什么是类组件
categories: React
summary: 'React中通过JS的class 关键字来定义React组件,如果未使用过ES6,你可以使用...'
abbrlink: 50519
date: 2020-11-25 00:11:56
keywords:
description:
---

VsCode识别当前语言为React 后直接rcc tabs

这样通过代码片段能快速生成一个React组件

```
import React, { Component } from 'react'

export default class request extends Component {
  render() {
    return (
      <div></div>
    )
  }
}
```

如果未使用过ES6,你可以使用create-react-class模块:

```
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

有以下几个区别值得注意:

## 声明默认属性

无论是函数组件还是 class 组件，都拥有 `defaultProps` 属性：

```
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
```

如果使用 `createReactClass()` 方法创建组件，那就需要在组件中定义 `getDefaultProps()` 函数：

```
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },
  // ...
});
```

## 初始化 State

如果使用 ES6 的 class 关键字创建组件，你可以通过给 `this.state` 赋值的方式来定义组件的初始 state：

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

如果使用 `createReactClass()` 方法创建组件，你需要提供一个单独的 `getInitialState` 方法，让其返回初始 state：

```
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## 自动绑定

对于使用 ES6 的 class 关键字创建的 React 组件，组件中的方法遵循与常规 ES6 class 相同的语法规则。这意味着这些方法不会自动绑定 `this` 到这个组件实例。 你需要在 constructor 中显式地调用 `.bind(this)`：

```
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 这一行很重要！
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // 由于 `this.handleClick` 已经绑定至实例，因此我们才可以用它来处理点击事件
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

如果使用 `createReactClass()` 方法创建组件，组件中的方法会自动绑定至实例，所以不需要像上面那样做：

```
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

这就意味着，如果使用 ES6 class 关键字创建组件，在处理事件回调时就要多写一部分代码。但对于大型项目来说，这样做可以提升运行效率。

如果你觉得上述写法很繁琐，那么可以尝试使用**目前还处于试验性阶段**的 Babel 插件 [Class Properties](https://babeljs.io/docs/plugins/transform-class-properties/)。

```
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // 警告：这种语法还处于试验性阶段！
  // 在这里使用箭头函数就可以把方法绑定给实例：
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

请注意，上面这种语法**目前还处于试验性阶段**，这意味着语法随时都可能改变，也存在最终不被列入框架标准的可能。

为了保险起见，以下三种做法都是可以的：

- 在 constructor 中绑定方法。
- 使用箭头函数，比如：`onClick={(e) => this.handleClick(e)}`。
- 继续使用 `createReactClass`。