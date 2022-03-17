---
title: React组件通讯
tags: React组件通讯
summary: 'React组件通讯,主要分为父向子,子向父,兄弟传值'
categories: React
abbrlink: 50340
date: 2020-12-15 08:04:40
keywords:
description:
---

在了解组件通讯,你必须先深入了解React里的[setState](https://segmentfault.com/a/1190000019885667).

React 官方是要求遵循数据的不可变性的原则,即单项数据流,单向数据流的设计模式，使状态更可预测,debug范围更小,开发效率更高。

React 组件都必须像纯函数一样保护它们的 props 不被更改。

将react组件理解成纯函数,数据流驱动,参数传入不允许做更改

扩展 :

state内容可以更改,但是不允许直接赋值,需要借助setState

props用于定义外部接口，state用于记录内部状态

props的赋值在于外部世界使用组件，state的赋值在于组件内部

组件不应该改变props的值，而state存在的目的就是让组件来修改的

state 只能在constructor中设置默认值

setState修改state的值是异步的

#### 父向子传值:

##### 	**在父组件通过自定义属性提供数据:**

```js
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  state = {
    salary: 11460,
  }
  render() {
    return (
      <div>
        Parent
        <hr />
        {/* //!#1 父组件通过自定义属性进行传递 */}
        <Child salary={this.state.salary} />
      </div>
    )
  }
}
```

##### 	**子组件通过this.props接收父组件的需要传递控制的数据**

​	子组件接收的props,只具备读的权限,而props是只读的

```js
import React, { Component } from 'react'
export default class Child extends Component {
  render() {
    // !#2  子组件（类）通过 this.props 进行接收
    return <div>Child: {this.props.salary}</div>
  }
}
/* export default function Child(props) {
  // !#2  子组件（函数组件）通过 props 进行接收
  return <div>Child: {props.salary}</div>
} */

/* export default function Child({ salary }) {
  // !#2  子组件（函数组件）通过 props 进行接收
  return <div>Child: {salary}</div>
} */
```

react官方文档中说道，组件无论是使用函数声明还是通过class声明，都绝不能修改自身的props

props 作为组件对外通信的一个接口，为了保证组件像纯函数一样没有响应的副作用，所有的组件都必须像纯函数一样保护它们的props不被修改.

<hr>

#### 子向父传值:

##### 	**在父组件中给对应的子组件'标签'提供一个回调函数,并定义在组件的顶层,接收子组件传递的args.**

​	**在子组件定义接收父组件的方法,将需要修改的数据状态变为可受控状态,并且提升到顶层,**

​	将需要传递的数据作为实参,传入回调函数

```js
import React, { Component } from 'react'
export default class Child extends Component {
  // !#2 子组件调用父组件传递过来的方法并通过实参传递数据
  handleClick = () => {
    this.props.changeCar('奔驰')
  }
  render() {
    return (
      <div>
        Child: <button onClick={this.handleClick}>奥拓变奔驰</button>
      </div>
    )
  }
}
```

```js
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  state = {
    car: '奥拓',
  }
  // !#1 父组件准备方法并传递给子组件
  changeCar = (car) => {
    // !#3 在父组件提供的方法中通过形参拿到传递的数据，根据数据修改当前的 state
    this.setState({ car })
  }
  // 思考：如果 changeCar 如下写法，思考内部的 this 是什么？
  // 答案：子组件实例的 props
  // changeCar() {}
  render() {
    return (
      <div>
        <p>父组件：{this.state.car}</p>
        <hr />
        <Child changeCar={this.changeCar} />
      </div>
    )
  }
}
```

