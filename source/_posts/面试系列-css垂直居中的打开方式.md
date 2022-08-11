---
layout: post
title: 面试系列-css垂直居中的打开方式
abbrlink: 38067
date: 2022-07-27 22:37:10
tags: 盒子居中
categories: css
summary: 无论是实际开发中，亦或者是求职面试中，css 垂直居中往往都是一个绕不开的话题
---

# 【爆肝面试系列】CSS 垂直居中的正确打开方式

![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1c9e5382c214764961f05824186fa4d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## **前言之爆锤面试官神器 - CSS**

无论是实际开发中，亦或者是求职面试中，css 垂直居中往往都是一个绕不开的话题，其中不乏有许多面试者在多次双重尝受打击之后，而没有一个很好的反击点，刚好结合自己以前受的委屈和痛苦，来给大家一个锤爆面试官大佬们的机会。

其实垂直居中主要分为了两种类型：**居中元素宽高已知** 和 **居中元素宽高未知**，那么我们就结合这两种类型来一一做举例。

![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d208686e8e04fce9e22920a6c4d7a0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## **居中元素宽高已知**

### **1. absolute + margin auto**

顾名思义，就是利用当前元素的 `position: absolute;` 和 `margin: auto;`

注意使用此方法：父元素与当前元素的高度要设置；

通过将各个方向的距离都设置为 0，此时将 `margin` 设置为 `auto`，就可以实现垂直居中显示了；

#### 具体代码如下：

```
.parent{
  position: relative;
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
}

.child{
  background: tomato;
  width: 50vw; height: 50vh;
  /* 核心代码 */
  position:absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  margin: auto;
}

复制代码
```

#### 具体效果如下：

![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fb6f7e6ef794a9a8fd39d3ab89e78d6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **2. absolute + 负 margin**

利用绝对定位百分比 50% 来实现，因为当前元素的百分比是基于相对定位（也就是父元素）来定位的;

然后再用负的 margin-top 和 margin-left 来进行简单的位移即可，因为现在的负 margin 是基于自身的高度和宽度来进行位移的。

#### 具体代码如下：

```
.parent{
  position:relative;
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
}

.child{
  background: tomato;
  width: 100px; height: 100px;
  /* 核心代码 */
  position:absolute;
  top: 50%; left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}

复制代码
```

#### 具体效果如下：

![图片]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/136dc66faaf948519a2eef8229c32c96~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **3. absolute + calc**

使用 CSS3 的一个计算函数来进行计算即可；方法与上面类似

#### 具体代码如下：

```
.parent{
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
  /* 核心代码 */
  position:relative;
}

.child{
  background: tomato;
  width: 200px; height: 200px;
  /* 核心代码 */
  position:absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}

复制代码
```

#### 具体效果如下：

![图片]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4448eda1bf3453fa2d1bdc42ecfdcd4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## **居中元素宽高未知**

### **4. absolute + transform**

利用 CSS3 的新特性 `transform`；因为 `transform` 的 `translate` 属性值如果是一个百分比，那么这个百分比将是基于自身的宽高计算出来的。

#### 具体代码如下：

```
.parent{
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
  /* 核心代码 */
  position:relative;
}

.child{
  background: tomato;
  /* 核心代码 */
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
复制代码
```

#### 具体效果如下：

![图片]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e071ede21814f1c8e26dfc989e44173~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **5. line-height + vertical-align**

把当前元素设置为行内元素，然后通过设置父元素的 `text-align: center;` 实现水平居中；

同时通过设置当前元素的 `vertical-align: middle;` 来实现垂直居中；

最后设置当前元素的 `line-height: initial;` 来继承父元素的`line-height`。

#### 具体代码如下：

```
.parent{
  width: 90vw;
  border: 3px solid steelblue;
  /* 核心代码 */
  line-height: 500px;
  text-align: center;
}

.child{
  background: tomato;
  /* 核心代码 */
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
}
复制代码
```

#### 具体效果如下：

![图片]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45c041123890421cb7e1d298f5307242~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **6. table 表格元素**

通过最经典的 table 元素来进行水平垂直居中，不过代码看起来会很冗余，不推荐使用；

#### 具体代码如下：

```
<table>
  <tbody>
    <tr>
      <td class="parent">
        <div class="child"></div>
      </td>
    </tr>
  </tbody>
</table>

<style>
  .parent {
    width: 90vw;
    height: 90vh;
    border: 3px solid steelblue;
    /* 核心代码 */
    text-align: center;
  }
  .child {
    background: tomato;
    /* 核心代码 */
    display: inline-block;
  }
</style>
复制代码
```

#### 具体效果如下：

![图片]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a1d347f750146f3b58a3579822a1086~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **7. css-table 表格样式**

如果一定要使用 `table` 的特性，但是不想写 `table` 元素的话，那么`css-table` 就很适合你；

#### 具体代码如下：

```
.parent{
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
  /* 核心代码 */
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.child{
  background: tomato;
  /* 核心代码 */
  display: inline-block;
}
复制代码
```

#### 具体效果如下：

![图片]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df36ab0e4689467c8b0d7d1fbfce9bdb~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **8. flex 布局（一）**

要说现在较为流行和使用较多的布局方案，那么非 flex 莫属了，那么举例两个最常见的使用方式 ~

直接在 `flex-container` 上通过几行代码即可很优雅的实现

#### 具体代码如下：

```
.parent {
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;

  /* 核心代码 */
  display: flex;
  justify-content: center;
 align-items: center;
}
.child{
  background: tomato;
}
复制代码
```

`justify-content` 表示：设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式；

`align-items` 表示：定义 flex 子项在 flex 容器的当前行的侧轴（纵轴）方向上的对齐方式。

#### 具体效果如下：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd42197963bf4b2ca5f155333a145688~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **9. flex + margin auto（二）**

在 `flex-item` 上更加优雅的实现

#### 具体代码如下：

```
.parent{
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;

  /* 核心代码 */
  display: flex;
}

.child{
  background: tomato;

  /* 核心代码 */
  margin: auto;
}
复制代码
```

#### 具体效果如下：

![图片]( https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc6f274a395e4849bd5d8e375790fe3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

> **flex 的两种方法使用取舍，任凭您意**

#### 附赠 flex 兼容性图片一张

![图片]( https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91f2dea4f7eb495ea8160c30da4ea36f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **10. grid 网格布局 (一)**

grid 布局相信大家在实际项目中用的较少，主要是该布局实在是太超前，导致了兼容性不是那么理想，但是不可否认的是 grid 的能力在 css 布局中绝对是一个质的飞越。

不熟悉的可以看下阮一峰老师的详细**入门教程**[1]

`CSS Grid` 包含与 `Flexbox` 几乎相同的对齐选项，因此我们可以在 `grid-container` 上优雅的实现

#### 具体代码如下：

```
.parent{
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
  /* 核心代码 */
  display: grid;
  align-items: center;
  justify-content: center;
}

.child{
  background: tomato;
}
复制代码
```

#### 具体效果如下：

![图片]( https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33ab7c28383c4f4b8d3236c81f5c6ff2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### **11. grid 网格布局 (二)**

同样我们可以像 `Flexbox` 一样，在 `grid-item` 上优雅的实现

#### 具体代码如下：

```
.parent{
  width: 90vw;
  height: 90vh;
  border: 3px solid steelblue;
  /* 核心代码 */
  display: grid
}

.child{
  background: tomato;
  /* 核心代码 */
  align-self: center;
  justify-self: center;
}
复制代码
```

#### 具体效果如下：

![图片]( https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cef36061f6c41468009a1c64dec4f47~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

> **flex 的两种方法使用取舍，任凭您高兴**

#### 附赠 grid 兼容性图片一张

![图片]( https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cb0422169a44010a270541da006932e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## **总结**

在学习了上面的 11 种垂直居中布局方法后，我们简单概括一下

- 如果你的项目**在 PC 端有兼容性要求**并且**宽高固定**，推荐使用 `absolute + 负 margin` 方法实现；
- 如果你的项目**在 PC 端有兼容性要求**并且**宽高不固定**，推荐使用 `css-table` 方式实现；
- 如果你的项目**在 PC 端无兼容性要求** ，推荐使用 `flex` 实现居中，当然不考虑 IE 的话，`grid` 也是个不错的选择；
- 如果你的项目**在移动端使用** ，那么推荐你使用 `flex` ，`grid` 也可作为备选。

## **写在最后**

其实以上的是一种垂直居中方法，只是比较常见的，其实还有一些比较冷门的方式方法，例如 **伪类元素**、**grid-container 的 grid-template-rows** 等，大家下去可以自行尝试一下 ~

周末已结束，周一还会远吗，祝大家新的一周新的开始 ~

帅气美丽的你给个赞呗再走呗 ~

### 参考资料

[1]

https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html: *https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2019%2F03%2Fgrid-layout-tutorial.html*

关于本文

来自：易师傅

https://juejin.cn/post/6991465721565806605