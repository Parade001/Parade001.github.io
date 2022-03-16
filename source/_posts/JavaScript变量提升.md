---
title: JavaScript理解预解析
tags: JS概念
summary: 预解析只会发生在通过var定义的变量和function（不是表达式式的function）上...
categories: JavaScript
abbrlink: 52408
date: 2019-04-27 09:01:28
---

# JavaScript预解析

JS运行机制分为2步

1、预解析

2、执行代码

预解析：在当前作用域下,js运行之前，会把带有var和function关键字的事先声明，并在内存中安排好。 然后再从上到下执行js语句。 **预解析只会发生在通过var定义的变量和function（不是表达式式的function）上**。如果内存中存在该变量名var，则忽略这个操作；预解析function时会将函数名和函数相绑定，如果有，则会在内存不开辟空间，但是函数体的地址会覆盖原函数体。通过var关键字定义的变量进行预解析的时候：都是**声明declare，不管它有没有赋值，都会赋值undefined**。

预解析分为

- **变量预解析（变量提升）**
- **函数预解析（函数提升）**

变量提升：将所有的变量声明提升到当前的作用域最前面，不提升赋值操作

函数提升：将所有的函数声明提升到当前的作用域的最前面，不调用函数

注意：进入函数体也会有预解析



```javascript
var a = true;
function fn(){
    	if（！a){
    	var a = 10;           
    	}

 console.log(a);  //10

}

fnn();
```



```javascript
var num =123;
function f1(){
    console.log(num);// 123
}
function f2 (){  //var num = undefined=>456
    conlose.log(num); //undefined
    var num = 456;
    f1(); 
    console.log(num);//456
}
```



```js
var num = 123;
function f1() {
    console.log(num); //123
}
function f2() {
    console.log(num); //456
    num = 456;
    f1();
    console.log(num);//456
}
f2();
```



```js
function fn(a){ //var a = 100; a相当于一个局部变量；
    console.log(a); //100
    var a = 10;
    console.log(a); //10
}
fn(100);
```



```js
function fn(a) { // var a = 100
    console.log(a);// 打印函数体
    var a = 10;
    console.log(a); //10
    function a() {
        console.log(a);
    }
    a();  //报错
}
fn(100);
```

