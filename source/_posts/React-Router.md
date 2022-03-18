---
title: React-Router
abbrlink: 36407
date: 2020-02-17 17:38:33
tags: Router
keywords:
description:
categories: React
summary:  React Router 不仅仅是将 url 与函数或组件匹配：它是关于构建一个映射到 URL 的完整用户界面，因此它可能包含比你习惯的更多的概
---

React路由拥有简单的API和强大的动态路由匹配,以及简历正确的过度处理.

路由与选项卡的区别:

- 动态匹配存储数据
- 避免了重复性的渲染提高性能

在使用路由的时候去了解SPA:

- SPA： `Single Page Application` 单页面应用程序，整个应用中只有一个页面（index.html）。

- MPA : `Multiple Page Application` 多页面应用程序，整个应用中有很多个页面（*.html）。

- 优势：页面响应速度快，体验好（无刷新），降低了对服务器的压力。

  a，传统的多页面应用程序，每次请求服务器返回的都是一整个完整的页面。

  b，单页面应用程序只有第一次会加载完整的页面，以后每次请求仅仅获取必要的数据。

- 缺点：不利于 SEO 搜索引擎优化。

  a，因为爬虫只爬取 HTML 页面中的文本内容，不会执行 JS 代码。

  b，可以通过 SSR（服务端渲染 Server Side Rendering）来解决 SEO 问题，即先在服务器端把内容渲染出来，返回给浏览器的就是纯 HTML 内容了。

  <HR>

安装:

```bash
npm install --save react-router
```

现代的前端应用大多都是 SPA，也就是只有一个 HTML 页面的应用程序，因为它的用户体验更好、对服务器的压力更小，所以更受欢迎。

为了有效的使用单个页面来管理原来多页面的功能，前端路由应运而生，功能：让用户从一个视图（页面）导航到另一个视图（页面）。

- 前端路由是一套**映射规则**，是 **URL 路径 与组件之间的对应关系**。
- 使用 React 路由简单来说就是：**配置路径和组件（配对）**。

路由主要的两种模式:

- #### hash

- #### histroy

react-router常用就是2种:

HashRouter:

BrowserRouter:

Readirect,必须放switch,不然from 会失效,switch性能高,匹配到第一个route需求

<hr>

#### Router 详细说明

- 常用有两种 Router：`HashRouter` 和 `BrowserRouter`，用来包**裹整个应用**，一个 React 应用只需要使用一次。
- HashRouter：使用 URL 的哈希值实现（`http://localhost:3000/#/first`），是通过监听 window 的 `hashchange` 事件来实现的。
- BrowserRouter：使用 H5 的 history API 实现（`http://localhost:3000/first`），是通过监听 window 的 `popstate` 事件来实现的。

<hr>

安装

```bash
yarn add react-router-dom@5.3.0
```

提供核心组件

```bash
import {HashRouter,Route,Link} from 'react-router-dom'
```

包裹整个引用

```jsx
<HashRouter>
    <div className="App">App</div>
</HashRouter>
```

指定导航链接

```jsx
<Link className='nav-link active' aria-current='page' to='/whertogo'>
    去哪儿
</Link>
```

使用Route指定路由规则

```jsx
<Route path='/wheretogo' component={wheretogo} />
```

#### 路由的执行过程

1. 点击 Link 组件（a 标签），浏览器地址栏中的 url 发生变化。
2. ReactRouter 通过 `hashchange` 或 `popState` 监听到了地址栏 url 的变化。
3. ReactRouter 内部遍历所有 Route 组件，使用路由规则（path）与 pathname（hash）进行匹配。
4. 当路由规则（path）能够匹配地址栏中的 pathname（hash）时，就展示该 Route 对应的组件。

<hr>

#### Link 与 NavLink

- `Link` 组件最终会渲染成 a 标签，用于指定路由导航。

  1，to 属性，将来会渲染成 a 标签的 href 属性。

  2，`Link` 组件无法实现导航的高亮效果。

- `NavLink` 组件，一个更特殊的 `Link` 组件，可以用于指定当前导航高亮。

  1，to：用于指定地址，会渲染成 a 标签的 href 属性。

  2，activeClass：用于指定高亮的类名，默认 `active`。

  3，exact：精确匹配，表示必须精确匹配类名才会应用 class，默认是模糊模糊匹配。

📝