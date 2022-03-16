---
title: JavaScript中attritube与proterties的区别
tags: JS属性
categories: JavaScript
summary: 本篇介绍Attritube 与 proterties 的区别
abbrlink: 24240
date: 2020-01-02 22:14:46
keywords:
description:
---

> [StackOverflow给出的回答](https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html)
>
> 在 jQuery 1.6.1 中进行更改后，我一直试图在 HTML 中定义属性和属性之间的区别。
>
> 查看[jQuery 1.6.1 发行说明](http://blog.jquery.com/2011/05/12/jquery-1-6-1-released/)（靠近底部）上的列表，似乎可以将 HTML 属性和属性分类如下：
>
> propertype：所有具有布尔值或 UA 计算的属性，例如 selectedIndex。属性：可以添加到既不是布尔值也不包含 UA 生成值的 HTML 元素的“属性”。
>
> attritube：所有具有布尔值或UA计算值的属性，如selectedIndex。
>
> 

<p align ='right'>
  回答时间:2011-5-14  
</p>



在编写 HTML 源代码时，您可以在 HTML 元素上定义***attributes*** *。然后，一旦浏览器解析您的代码，就会创建一个相应的 DOM 节点。这个节点是一个对象，因此它有 **properties***。

<hr>

对于给定的 DOM 节点对象，***properties***是该对象的***properties***<br>

***attributes***是该对象 ***attributes*** 的***property***的元素。

<hr>

当为给定的 HTML 元素创建 DOM 节点时，它的许多属性都与具有相同或相似名称的属性相关，但这不是一对一的关系。例如，对于这个 HTML 元素：

```html
<input id="the-input" type="text" value="Name:">
```

<hr>

在评估 HTML 中的区别之前，让我们先看看这些词的定义：

**英文定义：**

- Attributes是指对象的附加信息。
- Properties 是描述对象的特征。

**在 HTML 上下文中：**

当浏览器解析HTML时，它创建了一个树状数据结构，它基本上是HTML在内存中的表示。它的树数据结构包含的节点是HTML元素和文本。与此相关的属性和属性如下:

- **Attributes**是附加信息，我们可以将其放入 HTML 以 **初始化**某些 **DOM  properties**。
- **Properties** 是在浏览器解析 HTML 并生成 DOM 时形成的。DOM 中的每个元素都有自己的一组属性，这些properties都由浏览器设置。其中一些属性的初始值可以由 HTML 属性设置。每当影响渲染页面的 DOM 属性发生变化时，页面将**立即重新渲染**

而且有不同的DOM元素不同的属性。例如，<input>元素有一个value属性，而<div>属性没有这个值。

认识到这些属性的映射不是 1 到 1 的也很重要。换句话说，并非我们在 HTML 元素上提供的每个属性都具有类似的命名 DOM property。

此外具有不同的 DOM 元素不同的properties。例如，一个`<input>`元素具有一个properties上不存在的 value`<div>`properties。