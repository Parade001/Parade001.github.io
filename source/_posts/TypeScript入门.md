---
title: TypeScript入门
tags: TypeScript
summary: 'TypeScript 是由微软公司开发的自由和开源的编程语言。以下简称TS,TS是JS的超集,为JS添加特性的扩展'
abbrlink: 33883
date: 2021-01-20 12:26:05
keywords:
description:
categories:
---

​	具体添加如下内容:

- 类型批注和编译时类型检查

- 类型推断

- 类型擦除

- 接口

- 枚举

- Mixin

- 泛型编程

- 命名空间

- 元组

- async/await

  以下功能是从ECMA 2015反向移植而来：

  - [类](https://zh.wikipedia.org/wiki/%E7%B1%BB_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))
  - [模块](https://zh.wikipedia.org/wiki/%E6%A8%A1%E7%B5%84_(%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88))[[28\]](https://zh.wikipedia.org/wiki/TypeScript#cite_note-28)
  - [匿名函数](https://zh.wikipedia.org/wiki/%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0)的箭头语法
  - 可选参数以及[默认参数](https://zh.wikipedia.org/wiki/%E9%BB%98%E8%AA%8D%E5%8F%83%E6%95%B8)

<hr>



安装TS:

```bash
npm install -g typescript
tsc -v //查看版本
tsc app.ts //编译app 为js 代码
```

TypeScript 程序由以下几个部分组成：

- 模块
- 函数
- 变量
- 语句和表达式
- 注释



编写第一个TS程序

```typescript
const hello :string = 'hello world'
console.log(hello)
```

ts代码不能直接运行在浏览器端(目前),需要编译为JS格式后(通过tsc 命令进行编译

<hr>

## TypeScript 保留关键字

TypeScript 保留关键字如下表所示：

| break    | as         | catch      | switch   |
| -------- | ---------- | ---------- | -------- |
| case     | if         | throw      | else     |
| var      | number     | string     | get      |
| module   | type       | instanceof | typeof   |
| public   | private    | enum       | export   |
| finally  | for        | while      | void     |
| null     | super      | this       | new      |
| in       | return     | true       | false    |
| any      | extends    | static     | let      |
| package  | implements | interface  | function |
| new      | try        | yield      | const    |
| continue | do         |            |          |

### 空白和换行

TypeScript 会忽略程序中出现的空格、制表符和换行符。

空格、制表符通常用来缩进代码，使代码易于阅读和理解。

### TypeScript 区分大小写

TypeScript 区分大写和小写字符。

### 分号是可选的

每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。

以下代码都是合法的：

```
console.log("Runoob")
console.log("Google");
```

如果语句写在同一行则一定需要使用分号来分隔，否则会报错，如：

```
console.log("Runoob");console.log("Google");
```

### TypeScript 注释

注释是一个良好的习惯，虽然很多程序员讨厌注释，但还是建议你在每段代码写上文字说明。

注释可以提高程序的可读性。

注释可以包含有关程序一些信息，如代码的作者，有关函数的说明等。

编译器会忽略注释。

### TypeScript 支持两种类型的注释

- **单行注释 ( // )** − 在 // 后面的文字都是注释内容。
- **多行注释 (/\* \*/)** − 这种注释可以跨越多行。

注释实例：

```
// 这是一个单行注释
 
/* 
 这是一个多行注释 
 这是一个多行注释 
 这是一个多行注释 
*/
```

