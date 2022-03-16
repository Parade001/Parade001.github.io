---
title: JavaScript函数及类数组
tags: JS函数是什么
summary: '函数的第一类"公民",本篇幅将介绍函数及一些常用数组的方法以及类数组'
categories: JavaScript
abbrlink: 5323
date: 2019-04-19 18:00:20
---



# JavaScript函数

**1.概念**

将相同的业务逻辑封装起来

函数是第一型对象first-class Object   

MDN:

```js
在 JavaScript 中，函数是一等对象，因为它们可以像任何其他对象一样拥有属性和方法。它们与其他对象的区别在于可以调用函数。简而言之，它们是 Function 对象
```

wiki:

```js
在计算机科学中，如果一种编程语言将函数视为一等对象，则称其支持一等函数（或函数字面量）。具体来说，这意味着该语言支持在程序执行期间构造新函数，将它们存储在数据结构中，将它们作为参数传递给其他函数，并将它们作为其他函数的值返回。
```

特点:

- 通过字面量进行创建
- 赋值给变量或者属性
- 作为参数进行传递
- 作为函数结果进行返回
- 拥有属性和方法
- 函数是 Object 类型的一个实例
- 一个函数可以有属性，并且有一个指向它的构造函数方法的链接
- 您可以将函数存储在变量中
- 您可以将函数作为参数传递给另一个函数
- 您可以从函数返回该函数

**2.语法****

- 函数的声明(声明式/匿名式)

  ```js
  function fn(){
      console.log("我是声明式的函数")
  }
  fn()
  ```

  ```js
  var fn = function(){
      console.log("我是表达式式的函数")
  }
  fn()
  ```

  表达式式（匿名式） 函数也是一种数据类型

**3.函数的调用**

用JS编程语言创建你的hello world



```javascript
function MyFunction(参数1，参数2...) {
            document.write('hello world');
        }
        MyFunction(参数1，参数2...);
```

**4.返回值**

函数可以有返回值，也可以没有返回值，根据业务逻辑

```js
function foo(name){
    return name+",请问图书馆怎么走？"   // return 返回值
}
var res = foo("学姐")
console.log(res)
```

注意事项：

1.return 可以终止函数的执行，return后面可以不跟 数据

2.如果函数没有return 默认返回就是undefined

5.***作用域***

概念：代码（变量）起作用效果的区间范围(负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限)用域是根据名称查找变量的一套规则。实际情况中，通常需要同时顾及几个作用域。
当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，或抵达最外层的作用域（也就是全局作用域）为止

分类：全局作用域   局部作用域

重点：es6之前只有函数的{}才有限定作用域

```js
 var c;
        var changStuff = function (a, b, c) {
            a = a * 10;
            b.item = "changed";
            c = {
                item: "changed"
            }
        }
        var num = 10;
        var obj1 = {
            item: "unchanged"
        };
        var obj2 = {
            item: "unchanged"
        };
        changStuff(num, obj1, obj2);
        console.log(num);
        console.log(obj1.item);
        console.log(obj2.item);
        console.log(c);
```

思考上面其中返回值。



**6.执行上下文与作用域链条**

执行上下文（以下简称“上下文”）的概念在 JavaScript 中是颇为重要的。变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象（variable object），而这个上下文中定义的所有变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台处理数据会用到它。 
全局上下文是最外层的上下文

​	上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数（全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器）。 
每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。ECMAScript程序的执行流就是通过这个上下文栈进行控制的。 
​	上下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain）。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。

​	如果上下文是函数，则其活动对象（activation object）用作变量对象。活动对象最初只有一个定义变量：arguments。（全局上下文中没有这个变量。）作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象。 
代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链的最前端开始，然后逐级往后，直到找到标识符。（如果没有找到标识符，那么通常会报错。） 



# JavaScript对象

JS对象是一组无序的相关属性和方法的集合

创建对象的方式

- 使用 Object构造函数
- 对象字面量
- 工厂模式

```javascript
function createPerson(name, age, job) {
            let o = new Object();
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function () {
                console.log(this.name);
            }
            return o;
        }
        let person1 = createPerson("叶灿", 20, "长方体移动工程师");
        let person2 = createPerson("洒洒", 20, "混世大魔王");
        console.log(createPerson(person1))
        console.log(createPerson(person2))
//工厂模式
```

![](C:\Users\xt_xi\my_blog\my_blog\blog\pic\Snipaste_2021-10-19_22-59-57.png)

这里，函数 createPerson()接收 3 个参数，根据这几个参数构建了一个包含 Person信息的对象。

可以用不同的参数多次调用这个函数，每次都会返回包含 3 个属性和 1 个方法的对象。这种工厂模式虽
然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。 



```javascript
function Myfunction(name, gender, age, skill) { // Myfunction 构造函数泛指某一大类封装的是对象
            this.name = name;
            this.gender = gender;
            this.age = age;
            this.skill = skill;
            this.sing = function (good) {
                console.log('爱好' + good);
            }
        }
        var sings = new Myfunction('叶灿', '男','20', '火山C');
        console.log(sings);
        sings.sing("KTV里摸摸唱唱绅士");
        //使用 Object构造函数
```



![Snipaste_2021-10-19_23-07-06](C:\Users\xt_xi\my_blog\my_blog\blog\pic\Snipaste_2021-10-19_23-07-06.png)

```js
var obj = new Object();
        obj.username = '叶灿';
        obj.age = 20;
        obj.gender = '男';
        obj.skill = '搬钢筋';
        obj.sayHi = function () {
            console.log('土木工程给爷速度爪巴啊！！！！！！！ ');
        }
        console.log(obj.username);
        console.log(obj.gender);
        obj.sayHi();
        //使用 Object构造函数
```



- 没有显式地创建对象。
- 属性和方法直接赋值给了 this。
- 没有 return。
  另外，要注意函数名 Person的首字母大写了。按照惯例，构造函数名称的首字母都是要大写的，

对象字面量**

```javascript
var wtf = {
            username: '洒洒',
            age: 18,
            gender: '男',
            sayLove: function () {
                console.log("Do you love me?");
            }
        }
        console.log(wtf.username);
        console.log(wtf['age']); //关联数组的语法
        // 调用对象的方法sayHi 对象名.方法名()
        wtf.sayLove();
        //对象字面量
```

函数deemo

```js
 function getMax(a, b) {
            if (a > b) {
                return a;
            } else {
                return b
            }

            return a > b ? a : b;
        }

        var res = getMax(4, 6)
        console.log(res);//利用函数求两个数的最大值
```



```js
  function getMax(a, b, c) {
            if (a > b) {
                //a大于b
                if (a > c) {
                    return a
                } else {
                    return c
                }
            } else {
                //b大于a
                if (b > c) {
                    return b
                } else {
                    return c
                }
            }
            return a > b ? (a > c ? a : c) : (b > c ? b : c)
        }
        var res = getMax(19, 10, 3)
        console.log(res);
```



```js
do {
            var name = prompt('请输入用户名:')
            var key = prompt('请输入密码:')
        }
        while (name != 'user' || key != '123456') {

        }
        alert('登录成功');
        //do while实现验证框登录
```

```js
while (true) {
            var name = prompt('请输入用户名:')
            var key = prompt('请输入密码:')
            if (name != 'user' || key != '123456') {
                alert('用户名不存在或者密码错误');
            } else {
                break
            }
        }
        alert('登录成功');
        // while实现验证框登录
```



```js
 //过滤掉0
        var arr = [0, 323, 323, 0, 33, 0, -32, 0]
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
                newArr[i] = arr[i]
            }
        }
        console.log(newArr)
```

```js
// 计算0 - 100 整数和, 个位数为3跳过
        var str = 0
        for (var i = 1; i <= 100; i++) {
            if (i % 10 !== 3) {
                str += i
            }
        }
        console.log(str);
```

```js
  var sum = 0
        var i = 1
        while (i <= 100) {
            if (i % 10 == 3) {
                i++
                continue
            }
            sum += i
            i++
        }
        console.log(sum);
```



求数组最大值

```js
 var arr = [232, 3232, 4554, 5454, 12313]
        var max = arr[0]
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[min]
            }
        }
        console.log(max)
```

求数组最小值

```js
 var arr = [322, 232, 2313, -323, 232, 324, -43434]
        var min = arr[0]
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i]
            }
        }
        console.log(min)
```

数组内分割字符串

```js
  var arr = ['orange', 'pink', 'red', 'cyan']
        var str = ''
        for (var i = 0; i < arr.length; i++) {
            str += arr[i] + '|'
        }
        console.log(str)
```

## 内置对象

### math

##### Math  数学

属性：Math.PI  

方法：

```js
//1.最大值
Math.max(1,2,4,9)  //9

//Math.max() 不能求数组的最大值
Math.max([3,65,76,2,9])   //NaN
//求数组的最大值解决方案，后期学
Math.max.apply(null,[3,65,76,2,9])   //76
Math.max(...[3,65,76,2,9])  //76


//2.求绝对值
Math.abs(-1)    //1
Math.abs(1)     //1
//3.向下取整
Math.floor(1.3) //1
Math.floor(1.9) //1
//4.向上取整
Math.ceil(1.2)  //2
Math.ceil(1.9)  //2
//5.四舍五入
Math.round(1.1)  //1
Math.round(1.8)  //2
Math.round(-1.1) //1
Math.round(-1.5) //1   负数时,  .5往大了取整


//6.取随机数  [0,1)   从0到1,包括0，不包括1
Math.random()
//获取两个数之间的整数，包括两个整数的算法
Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
```

##### Date 日期

```js
var date = new Date()  //获取当天时间对象
var date = new Date('2021-4-17')   //取参数时间对象
//date不好用

date.getFullYear()  //年
date.getMonth()+1   //月份    注意date.getMonth()要加1才能得到正确的月份
date.getDate()      //日期
date.getDay()       //星期几   注意date.getDay()得到的值是[0-6]  星期日是0

date.getHours()     //时
date.getMinutes()   //分
date.getSeconds()   //秒
```

**时间戳：**

解释：从1970年1月1日 到 一个时间点 经过了多少毫秒

```js
//方式1：valueOf  getTime
var date = new Date()    //从1970年1月1日 到 现在 经过了多少毫秒
cosole.log(date.valueOf())
console.log(date.getTime())

//方式2： +new Date
var date = +new Date('2000-01-01') //从1970年1月1日 到 '2000-01-01' 经过了多少毫秒
console.log(date)

//方式3： Date.now()   //从1970年1月1日 到 现在 经过了多少毫秒
var date = Date.now()
console.log(date)

//案例:计算从你出生到现在活了多少天?
var nowTime = Date.now()
var birthTime = +new Date('2001-3-20')

var time = Math.ceil((nowTime-birthTime)/1000/60/60/24)
console.log(time);

//案例：倒计时效果
function countDown(time) {
    var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
    var inputTime = +new Date(time); // 返回的是用户输入未来时间的总毫秒数
    var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
    var d = parseInt(times / 60 / 60 / 24); // 天
    var h = parseInt(times / 60 / 60 % 24); //时
    var m = parseInt(times / 60 % 60); // 分
    var s = parseInt(times % 60); // 当前的秒
  
    return d + '天' + h + '时' + m + '分' + s + '秒';
}


```

##### Array数组

**1.数组类型检测** 

```js
var arr = [1,2,3]
console.log(typeof arr);  //object

//arr 是否是 Array的实例
var arr = new Array()
console.log(arr instanceof Array);  //true
console.log(Array.isArray(arr));  //true
```

**2.数组元素的添加与删除**

```js
//push  在数组的后面添加元素
1.修改了原数组
2.参数：追加的元素
2.返回值：是追加后数组的长度
var arr= [1,2,3]
arr.push(4,5)    //返回值是5   原数组变成了[1,2,3,4,5]
arr.push([4,5])  //返回值是4   原数组变成了[1,2,3,[4,5]]


//unshift  在数组的前面追加元素
1.修改了原数组
2.参数：追加的元素
2.返回值：是追加后数组的长度
var arr= [1,2,3]
arr.unshift(4,5)   //返回值是5   原数组变成了[4,5,1,2,3]


//pop  删除数组的最后一个元素
1.修改了原数组
2.参数：无
2.返回值：删除的那个元素
var arr= [1,2,3]
arr.pop()   //返回值是3   原数组变成了[1,2]

//shift 删除数组的第一个元素
1.修改了原数组
2.参数：无
2.返回值：删除的那个元素
var arr= [1,2,3]
arr.shift()   //返回值是1   原数组变成了[2,3]
```

**3.数组的反转**

```js
//数组.reverse()  反转数组

var arr = [1,2,3,4]
arr.reverse()
console.log(arr)   //[4,3,2,1]

```

**4.数组的排序**

```js
//数组.sort()     数组排序
var arr = [4,2,8,12,9]

arr.sort(function(a,b){
    return a - b    //数组升序
})
console.log(arr)   //[2,4,8,9,12]


arr.sort(function(a,b){
    return a -b    //数组降序
})
console.log(arr)   //[12，9，8，4，2]

```

**5.数组的索引**

```js
//根据元素找下标   indexOf()    lastIndexOf()  
//indexOf()   从数组的左边向右边找，找到一个就马上返回下标   没有找到返回-1
//lastIndexOf()   从数组的右边向左边找，找到一个就马上返回下标   没有找到返回-1

var arr = [1,2,3,4,5,3]
console.log(arr.indexOf(3))      //2
console.log(arr.indexOf(8))      //-1

console.log(arr.lastIndexOf(3))  //5
console.log(arr.indexOf(7))      //-1


//案例 数组去重
//方案1
var arr = [1,2,3,'a',"b",2,"c","a"]
var newArr = []
for(var i=0; i<arr.length; i++){
    if(newArr.indexOf(arr[i])===-1){
        newArr.push(arr[i])
    }
}
console.log(newArr)

//方案2   暂时了解   可以关注数组的includes方法
var arr = [1,2,3,'a',"b",2,"c","a"]
var newArr = []
for(var i=0; i<arr.length; i++){
    if(!newArr.includes(arr[i])){
        newArr.push(arr[i])
    }
}
console.log(newArr)

//方案3  暂时了解   可以关注数组的reduce方法
var arr = [1,2,3,'a',"b",2,"c","a"]
var newArr = arr.reduce(function(acc,value,index){
    if(!acc.includes(value)){
        acc.push(value)
    }
    return acc
},[])
console.log(newArr)
```

**6.数组转换为字符串**

```js
//数组.join()
var arr =[1,2,3]
var str = arr.join()
console.log(str)   //1,2,3

var str = arr.join("&")
console.log(str)   //1&2&3
```

**7.数组合并**

```js
//数组.concat()
var arr = [1,2,3];
var newArr = arr.concat([4,5,6]);
console.log(arr);    //没有修改原数组
console.log(newArr); //[1,2,3,4,5,6]
```

**8.数组的截取**

```js
//数组.slice(start,end)   
var arr = ['red','blue','yellow','pink','purple'];
var newArr = arr.slice(1,3);
console.log(newArr);     //['blue','yellow']
console.log(arr);        //没有修改原数组

//数组.splice(start,count)
var arr = ['red','blue','yellow','pink','purple'];
var newArr = arr.splice(1,3);
console.log(newArr);     //['blue','yellow','pink']
console.log(arr);        //原数组修改了，截取后剩下的元素


//面试题
var arr = ["小泷",'刘虎',"小苍","小泽","xiaosa"];  //=> [["小泷",'刘虎',"小苍"],["小泽","xiaosa"]]
var newArr = []
while (true) {
    if (arr.length === 0) {
        break
    }
    newArr.push(arr.splice(0, 3))
}

console.log(newArr);
```

##### String字符串   

**1.根据字符找索引**

```js
//str.indexOf()  从左向右根据字符找索引，如果没有找到就返回-1
//str.lastIndexOf()  从右向左根据字符找索引，如果没有找到就返回-1

```

**2.根据索引找字符**

```js
//str.charAt(索引)

//求字符串'abcaba'出现次数最多的字符及次数
// 'abcaba' => (a 3)
// 第一步：'abcaba' => {a:3,b:2,c:1}
// 第二步：{a:3,b:2,c:1} => a 3
var str = "abcaba"
var obj = {}
for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) in obj) {
        obj[str.charAt(i)]++     //obj.a++   num++
    } else {
        obj[str.charAt(i)] = 1   //{a:1,b:1,c:1}
    }
}
// console.log(obj);
var char = null
var max = 0

for (var k in obj) {   //{a:3,b:2,c:1}
    if (obj[k] > max) {
        max = obj[k]
        char = k;
    }
}

console.log(`出现次数最多的字符是${char},次数是${max}`);

```

**3.截取**

  替换指定的字符，如：g替换为22,ss替换为b等操作方法

```js
	var arry = "dsdsdsdsdsadfdsf";
		console.log(arry.substring(0, 3));  //不包含end所在位置
       		 // 利用indexOf查找
  			while (arry.indexOf('d') !== -1) {  //当找到该元素是执行花括弧内语句
            var arry = arry.replace('d', 'o');
  }
 console.log(arry);
```

```js
substr(start,length) // 从start开始，截取length个字符串；

```

4.替换 

利用正则表达式替换

```js
	var arry = "dsdsdsdsdsadfdsf";
	console.log(arry.replace(/dsd/g, 'dnf')); //dnfsdnfsdsadfdsf
```



```js
 var str = '我喜欢吃柠檬233239090opkjiooj';
  while (str.indexOf('o') !== -1) {
            str = str.replace('o', "丫");
        }
        console.log(str);//我喜欢吃柠檬233239090丫pkji丫丫j
```



## 原型对象

1. 理解原型
   无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构造函数。

在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自Object。每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被赋值为构造函数的原型对象

- 正常的原型链都会终止于 Object 的原型对象

- Object 原型的原型是 null

  

通过hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。这个方法是继承自 Object的，会在属性存在于调用它的对象实例上时返回 true，如下面的例子所示： 

```javascript
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; Person.prototype.sayName = function() { 
  console.log(this.name);  
}; 
let person1 = new Person(); 
let person2 = new Person(); 
console.log(person1.hasOwnProperty("name")); // false 
person1.name = "Greg"; 
console.log(person1.name); // "Greg"，来自实例 
console.log(person1.hasOwnProperty("name")); // true 
console.log(person2.name); // "Nicholas"，来自原型 
console.log(person2.hasOwnProperty("name")); // false 
delete person1.name; 
console.log(person1.name); // "Nicholas"，来自原型 
console.log(person1.hasOwnProperty("name")); // false 
//在这个例子中，通过调用 hasOwnProperty()能够清楚地看到访问的是实例属性还是原型属性。
//调用 person1.hasOwnProperty("name")只在重写 person1上 name 属性的情况下才返回 true，表
明此时 name 是一个实例属性，不是原型属性
```

# arguments

### arguments属性

arguments（是个类数组对象，而不是一个数组）



- callee
- length
- Symbol

```js
function fun(){
  console.log(arguments);//我们可以看到arguments还有属性callee，length和迭代器Symbol
}
fun('tom',[1,2,3],{name:'lee'}); 
```



```js
function fun(){
  console.log(arguments instanceof Array);//false
  console.log(Array.isArray(arguments)); //false
}
fun('cat',[1,2,3],{name:'home'});
```



### arguments使用

函数在调用的时候，浏览器每次都会传递两个隐式参数：

- 函数的上下文对象this

- 封装实参的对象arguments

  

  1.在任意函数内部都有一个看不见的arguments，除了箭头函数外

  2.arguments是一个长的像数组的伪数组，可以对它进行遍历

  3.函数调用的实参变成了arguments的元素



```js
        function getSum() {
            var sum = 0;
            for (var i = 0; i < arguments.length; i++) {
                sum += arguments[i];
            }
            return sum;
        }
        console.log(getSum(1, 2)); //3
        console.log(getSum(1, 2, 3));//6
        console.log(getSum(1, 2, 3, 4));//10
        console.log(getSum(1, 2, 5, 6));//14

        getSum(1, 2);
        getSum(1, 2, 3);
        getSum(1, 2, 3, 4);
        getSum(1, 2, 5, 6);
        //js是一种弱类型的语言，没有重载机制，当我们重写函数时，会将原来的函数直接覆盖，这里我们能利用arguments，来判断传入的实参类型与数量进行不同的操作，然后返回不同的数值。
```

