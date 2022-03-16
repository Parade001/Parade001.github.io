---
title: Vue渲染富文本
tags: 富文本渲染
summary: 本篇文章介绍Vue-quill-editor插件配制及使用以及/deep/深度选择器
categories: css
abbrlink: 15349
date: 2020-1-14 08:48:12
keywords:
description:
---

安装富文本编辑器插件

```bash
npm i vue-quill-editor@3.0.6 -S 
```

导入插件及 css

```js
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
```

```html
  <el-form-item label="文章内容">
      <quill-editor
         v-model="artListForm.content"> //artListForm vue中v-bind绑定给el-form变量
      </quill-editor>
  </el-form-item>
```

当富文本高度出现塌陷时,通过给ql-editor添加min-height

scope :给所有元素加上 v-data-hash 给所有选择器加上[v-data-hash]

因为: scoped 仅本组件的元素而不会污染全局.

因此Vue提供 /deep/

 原理:深度作用选择器:只作用于 css 会在前面加上 [data-v-hash]  成为后代选择器: 从交集变成后代选择器

```css
/deep/ .ql-editor{
  min-height:300px;
}
```

