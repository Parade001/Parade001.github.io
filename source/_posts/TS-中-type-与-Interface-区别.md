---
layout: post
title: TS 中 type 与 Interface 区别
tags: TS
categories: TypeScript
abbrlink: 62442
date: 2021-02-24 22:12:12
summary: typescript 中的 interface 和 type 到底有什么区别？
---

## Type Aliases

我们一直通过直接在类型注释中编写对象类型和联合类型来使用它们。这很方便，但通常希望多次使用同一个类型并用一个名称引用它。

*类型别名*就是这样 -任何*类型*的*名称*。

类型别名的语法是：

```typescript
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });尝试
```

实际上，您可以使用类型别名来为任何类型命名，而不仅仅是对象类型。例如，类型别名可以命名联合类型：

```
type ID = number | string;尝试
```

请注意，别名*只是*别名 - 您不能使用类型别名来创建相同类型的不同/不同“版本”。当您使用别名时，就好像您已经编写了别名类型。换句话说，这段代码可能*看起来*非法，但根据 TypeScript 是可以的，因为这两种类型都是同一类型的别名：

```typescript
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// Create a sanitized input
let userInput = sanitizeInput(getInput());
 
// Can still be re-assigned with a string though
userInput = "new input";尝试
```

## 

## Interfaces

*接口声明*是命名对象类型的另一种方式：

```typescript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });尝试
```

就像我们在上面使用类型别名时一样，该示例就像我们使用匿名对象类型一样工作。TypeScript 只关心我们传递给的值的*结构*`printCoord`——它只关心它是否具有预期的属性。只关心类型的结构和功能是我们称 TypeScript 为*结构类型*类型系统的原因。

### 类型别名和接口的区别

类型别名和接口非常相似，在很多情况下您可以在它们之间自由选择。几乎所有的特性`interface`都可以在 中使用`type`，主要区别在于不能重新打开类型来添加新属性，而接口总是可扩展的。

<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/sp20220316_222545_804.png' >

### **相同点**:都可以描述一个对象或者函数

## **不同点**:

- interface可以声明合并
- Interface只能用于声明对象的形状,不能重命名原语
- 接口名称将[*始终*以其原始形式出现](https://www.typescriptlang.org/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWY2Q-YAjABMAMwALA+gbsVjNXW8yxySoAADaAA0CCaZbPh1XYqXgOIY0ZgmcK0AA0nyaLFhhGY8F4AHJmEJILCWsgZId4NNfIgGFdcIcUTVfgBlZTOWC8T7kAJ42G4eT+GS42QyRaYbCgXAEEguTzeXyCjDBSAAQSE8Ai0Xsl0K9kcziExDeiQs1lAqSE6SyOTy0AKQ2KHk4p1V6s1OuuoHuzwArMagA)在错误消息中，但*仅*在按名称使用时才出现。

主要区别:在于不能type不能重新打开类型

##  使用场景

interface是接口，  

type是类型，本身就是两个概念。

只是碰巧表现上比较相似。

希望定义一个变量类型，就用type，如果希望是能够继承并约束的，就用interface。

如果你不知道该用哪个，说明你只是想定义一个类型而非接口，所以应该用type

<hr>

# 参考

[typescript 中的 interface 和 type 到底有什么区别？](https://github.com/SunshowerC/blog/issues/7#type-%E5%8F%AF%E4%BB%A5%E8%80%8C-interface-%E4%B8%8D%E8%A1%8C)

[TS官方文档-类型别名和接口的区别](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)