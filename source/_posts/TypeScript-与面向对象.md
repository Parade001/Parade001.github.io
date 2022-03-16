---
title: TypeScript 与面向对象
abbrlink: 50120
date: 2021-02-19 22:51:27
tags: TS与面向对象
keywords:
description:
categories: TypeScript
---

## TypeScript 与面向对象

面向对象是一种对像是世界理解和抽象的方法

TS是一种面向对象的编程语言.

面向对象的主要两个概念:对象和类

- 对象:是类的一个实例,有状态和行为,即键(名)值对

- 类:是一个默默,是属性和值的集合,它描述一类对象的行为和状态,可以用于共享属性,为创建的实例对象使用

- 方法:函数和对象合写在一起就成了''方法''

  <hr>

#### 继承:

关键字继承extends,调用父类方法使用super

- private（private的成员不能被外部访问；比较带有`private`或`protected`成员的类型时，两个类型兼容的条件是private或protected的成员必须相同切来至同一个声明（同一个类））
- protected（protected和private相似，但protected成员可以在派生类中访问（能被继承，但不能在实例中访问，若构造函数是protected，则不能被实例化，只能被继承））

- readonly（设置属性为只读，必须在声明时或构造函数里初始化
- **参数属性**（参数属性通过给构造函数参数添加一个访问限定符来声明（public,private,protected）,把声明和赋值合并至一处）
- **存取器（get、set   只带有 get不带有set的存取器自动被推断为readonly）**
- **静态属性（static，不能被实例访问，在类里面访问时，需要加上类名）**

```typescript
(function () {
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        sayHello() {
            console.log('动物在叫!');
        }
    }
    class Cat extends Animal {
        sayHello() {
            super.sayHello();
        }
    }
    class Dog extends Animal {
        constructor(name, age) {
            super(name, age);
            this.age = 18;
            this.name = 'yetu';
        }
        run() {
            console.log(`${this.name}在跑~~`);
        }
    }
    const dog = new Dog('铁憨憨', 18)
    dog.run()
    const cat = new Cat('喵喵侠', 5)
    cat.sayHello()
    const dog = new Dog('baba', 28);
    console.log(dog);
})();
```



#### 抽象类:

**抽象类**（abstract，抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。抽象类中的抽象方法不包含具体实现并且必须在派生类中实现）

- 抽象类专门用于给子类继承方法 ,没有方法体,抽象方法只能定义在抽象类中,子类对抽象方法进行了重写.

- 继承 类 作用: 给别人当爸爸.

- 抽象类和其他类区别,不能用于创建对象

```typescript
;(function () {
  // 抽象类和其他类区别,不能用于创建对象
  abstract class Animal {
    name: string
    constructor(name: string) {
      this.name = name
    }
    sayHello() {
      console.log('爪巴')
    }
  }
  class Dog extends Animal {
    sayHello() {}
  }
  const snake = new Dog('hello')
  const dog = new Dog('铁憨憨')
  console.log(dog)
  console.log(snake)
})()

```





#### 接口:

接口定义一个类结构 :用于定义类应该包含那些属性和方法,同时接口也可以当作类型声明去使用,接口种的的所有方法都是抽象方法.

实现接口就是使类满足接口的要求.

 主要作用含义:类比usb type :接口实际上定义一个规范 只要实现这个规范,就可以在指定的场景使用,是对类的一个限制.

```typescript
;(function () {
  interface myInterface {
    name: string
    age: number
  }
  interface myInterface {
    gender: string
  }
  const obj2: myInterface = {
    name: 'sss',
    age: 111,
    gender: 'male',
  }
  // 接口可以在定义类的时候去限制类的结构
  // 接口中所有的的属性不能有实际的值
  // 接口定义对象的结构,而不考虑实际值
  // 在接口中的所有方法都是抽象方法
  interface myInter {
    name: string
    sayHello(): void
  }

  // 实现接口 用implements: 使类满足接口的要求
  class MyClass implements myInter {
    // 将所有属性和方法实现
    name: string
    // 补充构造函数 使属性初始化
    constructor(name: string) {
      this.name = name
    }
    sayHello() {
      console.log('铁憨憨')
    }
  }
})()
```



#### 泛型:

在定义函数或者类的时候,遇到数据类型不明确的,需要根据实际调用的时候决定是什么数据类型的时候可以使用泛型.

```typescript
描述类型用大写表示
定义一个泛型函数
function fn<K>(a: K): K{
  return a;
}
let res = fn(10) //不指定泛型ts会 自动推断
// 可以直接调用具有泛型的函数
let res2 = fn<string>('baba') //指定泛型
```

可以同时定义多个泛型

```typescript
function fn2<T, K>(a: T, b: K): T {
  console.log(b)
  return a
}
fn2<number, string>(123, 'yetu')
```

定义一个函数 用于且实现 接口的类

```typescript
function fn3<T extends Inter>(a: T): number {
  return a.length
}
class MyClass<T> {
  name: T
  constructor(name: T) {
    this.name = name
  }
}
const mc = new MyClass<string>('爸爸')

```

