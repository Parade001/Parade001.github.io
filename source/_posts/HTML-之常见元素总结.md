---
layout: post
title: HTML 之常见元素总结
abbrlink: 30698
date: 2022-03-28 10:57:51
tags: HTML
categories: HTML
summary: 最近有被问道这个问题...总结一下
---

行内元素:

​	特点:

- 无法自动换行
- 一行可以放多个
- 不可设置宽高
- 默认宽度是本身内容宽度
- 行内元素的padding 可以设置
- margin 只能设置水平方向

```html
b, big, i, small, tt
abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
a, bdo, br, img, map, object, q, script, span, sub, sup
button, input, label, select, textarea
```

<hr>

块元素

​	特点:

- 自动换行
- 独占一行
- 可以设置宽高
- 默认宽度为父元素的宽度

```html
div
p
h1-h6
ul
li
ol
dd
hr
table
menu
pre
aside
footer
blockquote
address
header
section
aside
footer
figure
form
hgroup
```

<hr>

行内块元素

​	特点:综合块和行内元素的特点,可设置宽高,可以设置内外边距

```html
img
input
td
```

<hr>

标签转换

```
display: inline/inline-block/block/inline flex/none/flex/gird
```

