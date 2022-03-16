---
title: JavaScript 数组方法总结
tags: 数组方法
categories: JavaScript
summary: 本篇将介绍一些常用的数组方法.
abbrlink: 50036
date: 2019-05-28 00:53:31
keywords:
description:
---

# 数组

*是值的有序集合，其中值叫做元素，每个元素有一个数值表示的位置，叫做索引*
Js数组是无类型限制.即数组中的元素可以是任何类型，同一个数组的不同元素可以是不同的类型.
JS数组是动态变化的因此创建时无需声明一个固定大小，也无需在大小变化时重新为他们分配空间，JS 数组可以是稀疏的也可以是连续的

JS 数组是一种特殊的 JS 对象，因此数组索引更想属性名，只不过碰巧是整数
数组从 Array.prototype 继承属性

创建数组:

- 数组字面量

- 可迭代对象使用…

- Array（）构造函数

- 工厂方法 Array.of（）

- 工厂方法: Array.from（） 

  <hr>

  ***ES5中定义了9*个新数组方法来遍历、映射、过滤、检测、简化和搜索数组.***

  

  > 在大多数情况下，调用提供的函数使用三个参数：
  >
  > ***数组元素、元素的索引和数组本身。***
  >
  > 通常，只需要第一个参数值，可以忽略后两个参数。
  >
  > 大多数ECMAScript 5数组方法的第一个参数是一个***函数***
  >
  > 第二个参数是可选的。如果有第二个参数，则***调用的函数被看做是第二个参数的方法***。
  >
  > 也就是说，在调用函数时传递进去的第二个参数作为它的this关键字的值来使用。被调用的函数的返回值非常重要，但是不同的方法处理返回值的方式也不一样。
  >
  > ECMAScript 5中的数组方法都不会修改它们调用的原始数组。当然，传递给这些方法的函数是可以修改这些数组的。                                                                    			*----节选自JavaScript第六版7.9*

  

  ## Array.from（）

  Array.from()是es6新增的工厂方法.

  这个方法期待一个可迭代对象或类数组对象作为其第一个参数,并返回包含该对象元素的新数组,

  当传入第二个参数为函数的时候,那么在构建新数组时,源对象的每个元素都会传入这个函数,这个函数的返回值,将替代原始值称为新数组的元素,构建执行映射侠侣高于先构建数组再把它映射成另一个新数组

  简单说,可以使用其参数值作为数组元素来创建并返回新数组
  和

> ```js
> Array.from(arrayLike[, mapFn[, thisArg]])
> ```

- `arrayLike`

  想要转换成数组的伪数组对象或可迭代对象

- `mapFn` **可选**

  如果指定了该参数，新数组中的每个元素会执行该回调函数。

- `thisArg` **可选**

  可选参数，执行回调函数 `mapFn` 时 `this` 对象。

  Array.from（）方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

  ```js
  console.log(Array.from('foo'));
  // expected output: Array ["f", "o", "o"]
  
  console.log(Array.from([1, 2, 3], x => x + x));
  // expected output: Array [2, 4, 6]
  ```

  

  <hr>

### *filter*()

<hr>

filter()方法返回的数组元素是一个调用的数组子集,filter()会跳过稀疏数组中缺少的元素，它的返回数组总是稠密的

语法:

```js
// Arrow function
filter((element) => { /* ... */ } )
filter((element, index) => { /* ... */ } )
filter((element, index, array) => { /* ... */ } )

// Callback function
filter(callbackFn)
filter(callbackFn, thisArg)

// Inline callback function
filter(function(element) { /* ... */ })
filter(function(element, index) { /* ... */ })
filter(function(element, index, array){ /* ... */ })
filter(function(element, index, array) { /* ... */ }, thisArg)
```

参数:

- `callback`

​	为数组中每个元素执行的函数，该函数接收一至三个参数：

- `currentValue`

  数组中正在处理的当前元素。

- `index` 可选

  数组中正在处理的当前元素的索引。

- `array` 可选

  `forEach()` 方法正在操作的数组。

- `thisArg` 可选

可选参数。当执行回调函数 `callback` 时，用作 `this` 的值。

```js
a = [0,3, 4, 6, 91, 100, 120];
smallvalue = a.filter(function (x) { return x > 100 });
console.log(smallvalue); //[120]

everyother = a.filter(function (x, i) { return i % 2 == 0 })
console.log(everyother); //[ 0, 4, 91, 120 ]
```

上文提到filter()会跳过稀疏数组缺少的元素,通这个方法我们可以压缩稀疏数组的空缺.删除undefined、null元素,

```js
var dense = sparse.filter(function(){return true});
a= a.filter(function(x){return x!==undefined&&x!==null});
```

<hr>

### *forEach*()

forEach() 方法对数组的每个元素执行一次给定的函数。

语法:

> ```js
> // Arrow function
> forEach((element) => { /* ... */ } )
> forEach((element, index) => { /* ... */ } )
> forEach((element, index, array) => { /* ... */ } )
> 
> // Callback function
> forEach(callbackFn)
> forEach(callbackFn, thisArg)
> 
> // Inline callback function
> forEach(function(element) { /* ... */ })
> forEach(function(element, index) { /* ... */ })
> forEach(function(element, index, array){ /* ... */ })
> forEach(function(element, index, array) { /* ... */ }, thisArg)
> ```



示例:

转换for循环为foreach

```js
const items = ['item1', 'item2', 'item3']
const copyItems = []

// before
// for (let i = 0; i < items.length; i++) {
//     copyItems.push(items[i])
// }

// after
items.forEach(function (item) {
    copyItems.push(item)
})
console.log(items);
console.log(copyItems);
```

<hr>

### *find*()

find()方法***返回***所提供数组中满足所提供测试函数的第一个元素的***值***。如果没有值满足测试函数，则返回undefined。

示例:

查找素数

```js
function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```

示例:

```js
// Declare array with no elements at indexes 2, 3, and 4
const array = [0, 1, , , , 5, 6];

// Shows all indexes, not just those with assigned values
array.find(function (value, index) {
    console.log('Visited index ', index, ' with value ', value);
});

// Shows all indexes, including deleted
array.find(function (value, index) {
    // Delete element 5 on first iteration
    if (index === 0) {
        console.log('Deleting array[5] with value ', array[5]);
        delete array[5];
    }
    // Element 5 is still visited even though deleted
    console.log('Visited index ', index, ' with value ', value);
});
//output 
//Visited index  0  with value  0
//Visited index  1  with value  1
//Visited index  2  with value  undefined
//Visited index  3  with value  undefined
//Visited index  4  with value  undefined
//Visited index  5  with value  5
//Visited index  6  with value  6

//Deleting array[5] with value  5

//Visited index  0  with value  0
//Visited index  1  with value  1
//Visited index  2  with value  undefined
//Visited index  3  with value  undefined
//Visited index  4  with value  undefined
//Visited index  5  with value  undefined
//Visited index  6  with value  6
```

使用箭头函数和解构

```js
const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

const result = inventory.find( ({ name }) => name === 'cherries' );

console.log(result) // { name: 'cherries', quantity: 5 }
```

<hr>


<hr>

#### ***findIndex()***

findindex()方法:

***返回***数组中满足提供的测试函数的第一个元素的**索引**。否则，它返回，表明没有元素通过测试。 `-1`



示例:

```js
const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];

const index = fruits.findIndex(fruit => fruit === "blueberries");

console.log(index); // 3
console.log(fruits[index]); // blueberries
```



<hr>

### *every()*

every()方法测试数组中的***所有元素******是否通过***提供的函数实现的测试。它返回一个布尔值

语法:

> 

```js
const isBelowThreshold = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 29, 10, 13,70];

console.log(array1.every(isBelowThreshold)); //false
```



### *some()*

该**some()**方法测试数组中是否***至少有一个元素***通过了提供的函数实现的测试。

如果在数组中找到一个元素，提供的函数为其返回真值，则***返回真值***；否则返回false。它不会修改数组。

示例:

```
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13,70];

console.log(array1.every(isBelowThreshold)); //false
```

​    <br>

注意，一旦every()和some()确认该返回什么值它们就会停止遍历数组元素。

***some()在判定函数第一次返回true后就返回true，但如果判定函数一直返回false，它将会遍历整个数组。***

***every()恰好相反：它在判定函数第一次返回false后就返回false，但如果判定函数一直返回true，它将会遍历整个数组。***

注意，根据数学上的惯例，在空数组上调用时，every()返回true，some()返回false。                   

<hr>

### *map*()

map()方法创建一个新数组(创建新映射的对象),其中填充了对调用数组中的每个元素调用提供的函数.

传递给map()的函数的调用方式和传递给forEach()的函数的调用方式一样。

但传递给map()的函数应该有返回值。注意，map()返回的是新数组：它不修改调用的数组。如果是稀疏数组，返回的也是相同方式的稀疏数组：它具有相同的长度，相同的缺失元素。

注意,

示例:

```js
 a = [1, 2, 3, 4];
 b = a.map(function (x) { return x * x });
console.log(b);//[ 1, 4, 9, 16 ]
```

<hr>

### *reduce()  和  reduceRight()*

reduce()和reduceRight()方法使用指定的函数将数组元素进行组合，生成单个值。这在函数式编程中是常见的操作，也可以称为“注入”和“折叠”。

***reduce是三种运算的合成***

- **遍历**
- **变形**
- **累积**

**reduce()需要两个参数(可以接收4个参数:*previousValue,currentValue, currentIndex,array*)**

- ***PreviouseValue:第一个参数是上一次调用产生的值`callbackFn`*(目前位置归并操纵的累计结果)。在第一次调用时（`initialValue`如果指定），否则为 的值`array[0]`***
- ***currentValue:第二个参数是一个传递给函数的初始值(可选),表示当前正在处理的数组元素***
- ***currentIndex***:***第三个参数******表示正在处理的数组元素的索引位置，若提供init值，则索引为0，否则索引为1***
- ***`array`: 第四个参数要遍历的数组。***

reduce()方法对数组的每个元素执行用户提供的“reducer”回调函数，按顺序传递对前一个元素计算的返回值。跨数组的所有元素运行reducer的最终结果是一个单一值。

第一次运行回调时，没有“前一次计算的返回值”。如果提供，则可以在其位置使用一个初始值。否则使用数组元素0作为初始值，迭代从下一个元素开始(索引1而不是索引0)。

<hr>

示例:

```js
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

reduceRight与reduce 类似,是从高索引向低索引(从右向左)处理数组而不是从低到搞,reduce 和reduceRight 都不接收用于指定归并函数this值的可选参数,通过用可u按的初始值取代这个值.

只要是能够把2个值(比如两个对象)组合成一个同类型值的函数,都可以用归并函数

<hr>

### *flat()  flatMap()*

flat()方法和flatmap()方法是ES9中的方法用于创建并返回一个新数组,这个数组包含与他调用flat()方法数组相同的元素,其本身也是数组的元素会被''打平''填充到返回数组中.

示例:

```
let a = [1,3,[4,[5,6]]]
a.falt(1)  //[1,3,4,[5,6]]
```

flatMap()方法和map方法类似,但是flatMap()返回的数组会被自动''打平''而且执行效率高于flat()

```js
let baba=["hello world","the definitive guide"];
let words = baba.flatMap(baba => baba.split(""));
console.log=words //["hello","world","the","definitive","guide"]
```

flatMap()可以把数组中的一个元素映射为输出数组中的多个元素.flatMap()允许把输入元素映射为空数组 ,这样打平后并不会有元素出现再数组中:





<hr>

### *concat*

concat()方法用于两或者多个数组进行合并,连接数组.如果这些参数中有数组,则凭借的是它们的元素而非数组本身.注意,concat()并不会递归打平数组的数组,并不修改调用的数组.会创建调用它的数组副本

语法:

> ```
> concat()
> concat(value0)
> concat(value0, value1)
> concat(value0, value1, ... , valueN)
> ```

例:

```js
let a = [1,2,3];
a.concat(4, 5)  //[1,2,3,4,5]
a.concat([4, 6], [7, 8])  // [1,2,3,4,6,7,8]
a.concat(4, [4, [6, 7]])  //[ 1, 2, 3, 4, 4, [ 6, 7 ] ]
```



<hr>

实现栈和队列的操纵

- **push()**
- **pop()**
- **shift()**
- **unshift()**

明确一张图,栈要遵循'后进先出'的原则.





<hr>

栈可以实现一个数组,总是从数组的一端插入和删除元素.这一段被称为栈顶

x86-64中,程序栈存放在内存某个区域,栈向下增长,那么栈顶元素的地址是所有栈中元素地址最低的.

<img src="https://tva1.sinaimg.cn/large/006aANDQgy1gxn00ibmk0j309m0gbgon.jpg"/>





<img src="https://tva1.sinaimg.cn/large/006aANDQgy1gxn007i55fj30ly0pftkn.jpg"/>

push 压 入栈

 pop 弹出栈

<img src="https://tva1.sinaimg.cn/large/006aANDQgy1gxmzzih53nj30sv0rswgg.jpg">



push()方法用于在数组尾部添加一个或者多个元素,并返回数组的新长度,不会打平参数.

pop()用于删除数组最后的元素,减少数组长度,并返回删除的值.

<br>

shift()方法删除数组的第一个元素,所有后续元素都会向下移动一个位置,以此来占据数组开头空出的位置 unshift()方法用于在数组开头添加一个或者多个元素,已有元素的索引会相应向更高索引移动,并返回数组的新长度.

<hr>

### ***slice() splice() fill() copywithin() 方法***

***Array.splice()方法*** 

 splice直译: 拼接.

用于处理数组连续区间(或者子数组,或数组'切片')的方法,用于提取、替换、填充和复制切片的

**splice()会修改调用的原数组**,**返回已经删除项**

splice可以接受N个参数.

第一个参数表示索引(起始位置)必须选择;

第二个参数表示删除数组的元素个数(从第一个参数的索引开始) 可选项;

第三个参数表示要添加到数组的元素;

```js
let a = [1, 2, 3, 4]
let c = a.splice(2,1,[2,3],'a','b')
console.log(c);  //[3]
```

<hr>

***Array.slice()方法***

**语法**
`array.slice([begin[, end]])`

 slice 直译: 切片.

> MDN:会将数组的一部分浅拷贝一部分返回到新数组对象,原始数组对象不会被修改

如果只**指定一个参数,那么返回的数组将包含:从这个开始的位置到数组结尾的所有数组元素**,如果出现负数,则表示相对于数组中最后一个元素的位置.

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]
let a = [1, 2, 3, 4]
let c = a.slice(-1,2)
let d = a.slice(-3,-1)
let e = a.slice(0,3)
console.log(c); //[]
console.log(d); //[2,3]
console.log(e); //[1,2,3]
```

<hr>

### ***indexOf()   lastIndexOf()  includes()***

indexOf() 方法和 lastIndexOf() 传入目标值,搜索整个数组中没有找到则返回-1,找到就返回目标值的索引,同时这2个方法不接收函数作为参数

<hr>

