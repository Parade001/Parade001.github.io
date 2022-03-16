---
title: input相关的事件
tags: input事件
summary: 失去焦点清空placeholder
categories: css
abbrlink: 28163
date: 2019-11-12 08:35:18
keywords:
description:
---

css浏览器内置方法:

```css
el-input:focus::-webkit-input-placeholder{
color: transparent;
}
/* Mozilla Firefox 4 to 18 */

el-input:focus:-moz-placeholder {
color: transparent;
}

/* Mozilla Firefox 19+ */

el-input:focus::-moz-placeholder {
color: transparent;
}

/* Internet Explorer 10+ */

el-input:focus:-ms-input-placeholder {
color: transparent;
}
```

js通过onfocus事件:清空placeholder占位符

```html
   <el-input v-model="userInfo.mobile"  οnfocus="this.placeholder=''" placeholder="sw-6512-6988-8778" style="width: 220px" />

```

监听回车事件keycode 为13,监听tab键事件为9

[Keycode查询](http://www.atoolbox.net/Tool.php?Id=815)