---
title: React 高频问题
tags: React 面试题
categories: React
summary: 这里整理了不少的 React 面试题
abbrlink: 15926
date: 2021-01-15 19:48:24
keywords:
description:
---

#### 1.react 什么时候使用状态管理器?

从组件角度看
1.某个组件的状态，需要共享
2.某个状态需要在任何地方都可以拿到
3.一个组件需要改变全局状态
4.一个组件需要改变另一个组件的状态

当程序中出现大量不相干组件需要互相通信而现有的组件间通信技术（

状态提升、context、storage等）不能很好的解决时，一个状态管理器作为中间者，可以降低组件间通信的复杂度。（购房者、买房者、中介）一样的场景。

#### 2.render函数中return如果没有使用()会有什么问题？

在使用JSX语法书写react代码时，babel会将JSX语法编译成js，同时会在每行自动添加**分号**（；），如果`return`后换行了，那么就会变成 `return；` 一般情况下会报错：

- **Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.**

**上面这段英文翻译成中文：**

- 渲染没有返回任何内容。这通常意味着缺少return语句。或者，为了不渲染，返回null。

为了代码可读性我们一般会在return后面添加括号这样代码可以折行书写，否则就在return 后面紧跟着语句，这样也是可以的。

举两个正确的书写例子：

```jsx
const Nav = () => {
  return (
    <nav className="c_navbar">
      { some jsx magic here }
    </nav>
  )
}

const Nav = () => {
 return <nav className="c_navbar">
    { some jsx magic here }
  </nav>
}
```

错误的写法：

```jsx
const Nav = () => {
  return
    <nav className="c_navbar">
      { some jsx magic here }
    </nav>
}
```

[[react\] componentWillUpdate可以直接修改state的值吗？](https://github.com/haizlin/fe-interview/issues/951#)

react组件在每次需要重新渲染时候都会调用`componentWillUpdate()`,

例如，我们调用 `this.setState()`时候

在这个函数中我们之所以不调用`this.setState()`是因为该方法会触发另一个`componentWillUpdate()`,如果我们`componentWillUpdate()`中触发状态更改,将会以无限循环结束.

引用[文档原文](https://zh-hans.reactjs.org/docs/react-component.html)：“你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。”

#### 3.React 严格模式的用处

react的strictMode 是一个突出显示应用程序中潜在问题的工具，与Fragment一样，strictMode 不会渲染任何的可见UI，它为其后代元素触发额外的检查和警告。

注意：严格模式仅在开发模式下运行，它们不会影响生产构建

可以为程序的任何部分使用严格模式

有助于：

- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

4.除了实例的属性可以获取Context外哪些地方还能直接获取Context呢？

- [API](https://zh-hans.reactjs.org/docs/context.html#api)
  - [React.createContext](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)
  - [Context.Provider](https://zh-hans.reactjs.org/docs/context.html#contextprovider)
  - [Class.contextType](https://zh-hans.reactjs.org/docs/context.html#classcontexttype)
  - [Context.Consumer](https://zh-hans.reactjs.org/docs/context.html#contextconsumer)
  - [Context.displayName](https://zh-hans.reactjs.org/docs/context.html#contextdisplayname)

#### 4.React如何进行代码拆分？拆分的原则是什么？

我认为react的拆分前提是代码目录设计规范，模块定义规范，代码设计规范，符合程序设计的一般原则，例如高内聚、低耦合等等。

在我们的react项目中：
1、在 api 层面我们单独封装，对外暴露http请求的结果。
2、数据层我们使用的react-redux 异步中间件使用的是redux-thunk 分装处理异步请求，合业务逻辑处理。
3、视图层，尽量使用 redux 层面的传递过来的数据，修改逻辑 也是重新触发action 更改props。
4、静态类型的资源单独放置
5、公共组件、高阶组件、插件单独放置
6、工具类文件单独放置

#### 5.React组件的构造函数有什么作用？

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 `this.state` 赋值对象来初始化[内部 state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)。
- 为[事件处理函数](https://zh-hans.reactjs.org/docs/handling-events.html)绑定实例

在 `constructor()` 函数中**不要调用 setState() 方法**。如果你的组件需要使用内部 state，请直接在构造函数中为 **this.state 赋值初始 state**：

```javascript
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
       }
```

只能在构造函数中直接为 `this.state` 赋值。如需在其他方法中赋值，你应使用 `this.setState()` 替代。

要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 `componentDidMount` 中。

#### 6.React中在哪捕获错误？

错误边界组件

官网例子:

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // 捕获以下任何组件中的错误并使用错误消息重新呈现
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    //您还可以在此处将错误消息记录到错误报告服务 
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  );
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```



#### 7.如何给非控组件设置默认的值？

- 表单元素依赖于状态(state)，表单元素需要默认值实时映射到状态的时候，就是受控组件

- 不通过state控制表单元素，而是通过ref来控制的表单元素就是非受控组件
- 给非受控组件设置defaultValue属性，给定默认值

### 默认值

在 React 渲染生命周期时，表单元素上的 `value` 将会覆盖 DOM 节点中的值。在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 `defaultValue` 属性，而不是 `value`。在一个组件已经挂载之后去更新 `defaultValue` 属性的值，不会造成 DOM 上值的任何更新。

```jsx
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，`<select>` 和 `<textarea>` 支持 `defaultValue`。

#### 8.使用Hooks要遵守哪些原则？

1，只能在函数式组件中使用
2，不能在条件判断，循环体中使用
3，只能放在作用域最外层

#### 

#### 9.useEffect和useLayoutEffect有什么区别？

#### 10.怎样使用Hooks获取服务端数据？

要求函数式写法,不能是class写法

```
///案例一
const {data,setData} = useState({});//渲染值
///页面初始化
useEffect(()=>{
    axios.get().then(res => {
        setData(res);
    })
},[]);
```

```
///案例二
const {data,setData} = useState({});//渲染值
///条件调用
const getPostData = ({data}) =>{
     axios.get(data).then(res => {
        setData(res);
    })
}
```

#### 11.react中修改prop引发的生命周期有哪几个？

> React 16.4+

1. `static getDerivedStateFromProps`
2. `shouldComponentUpdate`
3. `render`
4. `getSnapshotBeforeUpdate`
5. `componentDidUpdate`