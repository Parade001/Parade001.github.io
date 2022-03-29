---
layout: post
title: JSON
abbrlink: 3410
date: 2019-06-10 15:11:25
tags: JSON数据格式
categories: JavaScript
summary:  JSON 只是JS一个子集是一种数据结构,他是高性能Ajax的基础,不仅传输速度快,而且解析速度快,性能表现最好的数据格式
---

JavaScript Object Notation 简称JSON,JavaScript 对象表示发,**是一种轻量级的数据交换格式**,采用了[C语言](https://zh.wikipedia.org/wiki/C%E8%AA%9E%E8%A8%80)家族的习惯用法，目前也有许多编程语言都能够将其[解析和字符串化](https://zh.wikipedia.org/wiki/%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90%E5%99%A8)，其广泛使用的程度也使其成为通用的资料格式。

##### **基于JS的对象字面量表示法,是JS最精华的部分之一,是JS的一个子集**

##### 数据类型

JSON有6中类型的值:

- Object
- Array
- string
- Number
- boolean
- null

JSON 对象是一个容纳'名/值'对的无序集合.名字可以是任何字符串,值可以是任何的JSON值,包括数组和对象.

JSON对象可以被无限层的嵌套,但一般来说保持其结构的相对扁平是最高效的.

大多数语言都有容易映射为JSON对象的数据类型,比如:Object,(结构)struct,dictionary,hash table,(属性列表)property list,associative array.

JSON数组是一个值的有序序列.其值可以是任何类型的JSON值,包括数组和对象.大多数语言都有容易映射为JSON数组的数据类型,比如:Array,(向量)vector,list,(序列)sequence

JSON字符串被包裹在一堆双引号之间, \  字符 用于转义,JSON 允许/ 被转义,所以JSON 可以嵌入HTML的Script标签之中

JSON数字与JS数字相似.整数的守卫不允许为0,因为一些语言用它来表示八进制数字.这种基数的昏乱在数据交换格式是不可取的.数字可以是整数、实数或者科学计数.

JSON设计目的:是成为一个极简的、轻便的文本式的JS子集.实现互通所需的共识越小,互通就越容易实现.

<hr>

### 参考

[维基百科-JSON](https://zh.wikipedia.org/wiki/JSON)

[介绍 JSON](https://www.json.org/json-en.html)

JavaScript语言精粹修订版

高性能JavaScript