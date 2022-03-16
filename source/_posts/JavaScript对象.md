---
title: JavaScript里对象及数组的概念
tags: 什么是对象
summary: 万物皆对象,女朋友不是对象,但是你可以new一个出来!
categories: JavaScript
abbrlink: 1
date: 2019-04-14 17:35:22
---

# JavaScript 对象

在 JavaScript中，几乎所有的事物都是对象。

```js
var car = "Fiat";
```

## 对象属性

### "JavaScript 对象是变量的容器"

通常认为 "JavaScript 对象是键值对的容器"。
键值对通常写法为 name : value (键与值以冒号分割)。
键值对在 JavaScript 对象通常称为 对象属性。

## 访问对象属性

通过两种方式访问对象属性:

```js
person.lastName;
person["lastName"];
```

## 对象方法

对象的方法定义了一个函数，并作为对象的属性存储。
对象方法通过添加 () 调用 (作为一个函数)。
该实例访问了 person 对象的 fullName() 方法:

```js
name = person.fullName();
```

如果你要访问 person 对象的 fullName 属性，它将作为一个定义函数的字符串返回：实例

```js
name = person.fullName;
```

## 访问对象方法

你可以使用以下语法 **创建对象** 方法：

```js
methodName : function() {
// 代码}
	
objectName.methodName()
```





# JavaScript数组

**JS中的`Array`可以包含任意数据类型**，并通过索引来访问每个元素。

要取得`Array`的长度，直接访问`length`属性：

```js
var arr = [1, 2, 3.14, 'Hello', null, true];
arr.length; // 6
```

直接给`Array`的`length`赋一个新的值会导致`Array`大小的变化：

```js
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```

`Array`可以通过索引把对应的元素修改为新的值，因此，对`Array`的索引进行赋值会直接修改这个`Array`：

```js
var arr = ['A', 'B', 'C'];
arr[1] = 99;
arr; // arr现在变为['A', 99, 'C']
```

```js
var arr = new Array(3)['a','b','c']

console.log(arr);

//当new array 有2个以上的参数，表示的是数组的元素
```

计算数组所有元素和与平均值

```js
var arr = [1,3,4,6,7,8]
var sum = 0
var ave =0
for(var i = 0 ; i<arr.length;i++){
	sum += arr [i]
}
ave = sum /arr.length
console.log(sum.ave)

```

请注意*，如果通过索引赋值时，索引超过了范围，同样会引起`Array`大小的变化：

```js
var arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']
```

### indexOf

与String类似，`Array`也可以通过`indexOf()`来搜索一个指定的元素的位置：

```js
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2
```

注意了，数字`30`和字符串`'30'`是不同的元素。

### slice

`slice()`就是对应String的`substring()`版本，它截取`Array`的部分元素，然后返回一个新的`Array`：

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
```

注意到`slice()`的起止参数包括开始索引，不包括结束索引。

如果不给`slice()`传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个`Array`：

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false
```

### push和pop

`push()`向`Array`的末尾添加若干元素，`pop()`则把`Array`的最后一个元素删除掉：

```js
var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
arr; // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
arr; // []
```

### unshift和shift

如果要往`Array`的头部添加若干元素，使用`unshift()`方法，`shift()`方法则把`Array`的第一个元素删掉：

```js
var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []
```

### sort

`sort()`可以对当前`Array`进行排序，它会直接修改当前`Array`的元素位置，直接调用时，按照默认顺序排序：

```js
var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
```

能否按照我们自己指定的顺序排序呢？完全可以，我们将在后面的函数中讲到。

### reverse

`reverse()`把整个`Array`的元素给调个个，也就是反转：

```js
var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']
```

### splice

`splice()`方法是修改`Array`的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：

```js
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```

### concat

`concat()`方法把当前的`Array`和另一个`Array`连接起来，并返回一个新的`Array`：

```js
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
```

*请注意*，`concat()`方法并没有修改当前`Array`，而是返回了一个新的`Array`。

实际上，`concat()`方法可以接收任意个元素和`Array`，并且自动把`Array`拆开，然后全部添加到新的`Array`里：

```js
var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
```

### join

`join()`方法是一个非常实用的方法，它把当前`Array`的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：

```js
var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
```

如果`Array`的元素不是字符串，将自动转换为字符串后再连接。

### 多维数组

如果数组的某个元素又是一个`Array`，则可以形成多维数组，例如：

```js
var arr = [[1, 2, 3], [400, 500, 600], '-'];
```

上述`Array`包含3个元素，其中头两个元素本身也是`Array`。

# JavaScript条件语句

条件语句用于基于不同的条件来执行不同的动作。

------

## 条件语句

通常在写代码时，您总是需要为不同的决定来执行不同的动作。您可以在代码中使用条件语句来完成该任务。

在 JavaScript 中，我们可使用以下条件语句：

- **if 语句** - (单分支语句）只有当指定条件为 true 时，使用该语句来执行代码

  ​			为false则不执行花括号里的语句跳出

- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码

- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行

- **switch 语句** - 使用该语句来选择多个代码块之一来执行

### 通过分支流程控制if语句

```js
<script>
	var age =prompt('请输入您的年龄')
	if (age >= 18){
	alert('我想带你去网吧偷耳机');
	}
```

### 通过双分支语句控制流程（if else)

```js
//条件成立 执行if 里面的代码，否则执行else 里面的代码
if (){
//如果条件成立 执行代码
}else{
//否则 执行的代码
}
```

## 判断闰年案例

案例分析：判断任意年份是否为闰年，需要满足以下条件中的任意一个：
① 该年份能被 4 整除同时不能被 100 整除；
② 该年份能被400整除。

弹出prompt 输入框让用户输入年丰，取过来值保存在变量中

使用if语句判断，是输入闰年语句否则执行else里面输出的语句

注意逻辑运算符&&与||的用法，通过取模判断余数为0

```js
var year = prompt ('请输入年份:')
if(year % 4 == 0 && year % 100 !=0 || year % 400 ==0 )
{
	alert ('该年是闰年');
}	
	else{
	alert('该年是平年');
}
```

### 多分支语句（if else if)

语法规范

```js
if(条件表达式1){
//语句1;
}
else if(条件表达式2){
//语句2;
}
else (条件表达式3){
//语句3;
}san'yun
```

## 三元表达式

能做一些简单的条件选择。有三元运算符组成的式子称为三元表达式。

```js
++num 3+5 ? ;
```

语法结构

条件表达式？ 表达式1 :  表达式2

执行思路：如果条件表达式为true 则返回表达式1 的值

否则，为false 返回表达式2的值

```js
var num = 10
var result = num >5 ? '是的' : '不是的';
```

案例：利用三元表达式输出最大数值

```js
var num1 = prompt('')
    var num2 = prompt('')
    var num3 = prompt('')
    var end = (num1 > num2 ? (num1 > num3 ? num1 : num3) : (num2 > num3 ? num2 : num3))
        alert(end + '最大');
```

案例：数字补0

输入数字，若小于10，则前面补0,如果大于10，则不用.

```js
var time = prompt('请输入0-59任意一个数字：')
var result = time < 10 ? '0'+time : time;
alert(result);
```

```js
// 扩展 padStart(长度.填的数值)
// padEnd(长度,填的数值)
var result = num.toString().padStart(2, '0')
console.log(result);
```



### Switch执行多分支语句

lion给表达式的值与case 的选项值相匹配，若都没有匹配上则执行default的语句

```js
switch (条件表达式) {
	case value1：
		业务逻辑1;
	break;
	case value2：
		业务逻辑2;
	break;
	case value3：
		业务逻辑3;
	break;
	dafault:
//执行最后的语句；
}
```

**注意：**	

```js
var num =3 ;
switch (num) {
	case 1:
	console.log(1);
	break;
	default:
		alert('没有次水果');
}
// 表达式经常用作变量
//num值和case的值匹配属于全等=== 才可以
//case 里面如果没有break 则不会推出switch 继续执行下一个case
```

Switch 和If else if 语句的区别

- 一般情况下，他们两个语句可以相互替换
- switch... case 语句 通常处理case **比较确定值(全等)**的情况,二if...else更灵活，**常用于范围判定**(大于，等于某个范围)
- switch 语句进行条件判断后直接执行到程序的条件语句效果更高。而else 语句有几种条件,就得判断多少次
- 当分支比较少时，if...else 语句执行效率比switch语句高
- 当分支比较多时，switch语句的执行的效率比较高，而且结构更加清晰



## 循环结构

循环的目的：解决重复操作提高效率.

被重复的语句称之为循环体

循环体和终止条件组成的语句称之为循环语句

# JavaScript中的循环

- for 循环
- while循环
- do..while循环
- for...in循环

## for 循环语法结构

重复执行某些代码，通常和技术有关系   

```js
for (初始化表达式;条件表达式;操作表达式){
//循环体
}
//初始化变量即 Var 声明的一个普通变量，通常用作计数器使用，在for里只执行一次 index
//条件表达式 用来决定每一个循环是否继续执行,即终止条件
//操作表达式 每次循环最后执行的代码 经常用于计数器变量的更新递增或者递减
```

```js
for(var i = 1; 1<=100;i++){
	console.log('速爪巴');
}
```

### 通过for 循环计算1-100的偶数和奇数的和

```js
var even = 0
var odd = 0
for (var i = 1; i <= 100;i++){
	if(i % 2 == 0){
	even =even + i
	}else {
	odd = odd +i
	}
}
	alert("1~100之间偶数和为:"+even+'n'+"1-100所有奇数和为:"+odd)
```

### 通过1-100直接所有能被3整除的数字和

```js
var result = 0 
for (var i = 1; i<= 100; i++){
	if ( i % 3 == 0){
	result = result +i;
	}
}
	alert ("1-100直接所有能被3整除的数字和是"+result);
```

### 通过for循环计算若干人数&若干成绩.求解班级总分和平均成绩

```js
 var num = prompt ('请输入班级总人数')
 var sum = 0
 var ave = 0
 for var (i=1; i <= num;i++;){
 var score = promt('请输入第' + i + '个学生的成绩')
 sum = sum + parseFloat(score)
}
ave =sum / num
alert('班级总成绩'+sum + '\n'+'班级平均分'+ave);
```

### for循环打印string

```js
var str ='';
for (var i = 1; i <= 5;i++){
	str = str +'string'
}
alert(str)
```

```js
var num = prompt ('想要出现多少个星星？')
var str = '';
//此处定义一个空的字符串赋空值是为了给字符串初始化，这个变量是用来准备存放对象的，也方便调错。
for (var i = 1; 1 <= num; 1++){
	str = str + "string"
}
alert(str)
```

### 双重for循环运用

嵌套关系，可以将内层的循环看作外层循环的语句

**外层的循环循环一次，里面的循环执行全部**

```js

for (var i = 1 ; i <= 3; i++){
	console.log('这是外层循环第'+i+'次')
	for (var j =1; j <= 3; j++){
	cosole.log('这是内层循环的第'+j+'次')
	}
}
```

逐行打印string

```js
var str = ''
for (var i =1 ; 1 <= 5; i++){
	for (var j=1 ; 1 <= 5; j++){
	str = str +'string'
	//执行完成一行就要行换
	}
	//然后执行外层循环因此需在外层加换行符
	str = str +'\n'
}
```

打印N*N行string

```js
var row = prompt ('请您输入行数')
var cow = prompt ('请您输入列数')
var str = '';
for (var i = 1; i <=row; i++){	
	for(var j = 1; j <= cow; j++){
		str = str +"string"
	}
	str += '\n'
}
	console.log(str);

```

打印到string (倒三角案例)j

```js
var str = '';
for(var i = 1; i <= 10; i++){
	for(var j = i ; j <= 10; j++ ){
	str = str +'string'
	}
	str += '\n'
}
	console.log(str);
```

正三角

```js
var str = ''
for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= i; j++) {
	str = str + '♆'
	}
	str += '\n'
 }
console.log(str);
```



乘法表

```js
 var str = ''
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= i; j++) {
                str += j + '×' + i + '=' + i * j + '\t'
            }
            str += '\n'
        }
        console.log(str);
```

打印人的一生

```js
 var i = 1
        while (i <= 100) {
            console.log(`这个人今年${i}岁了`)
            i++
        }
```

```js
var i = 0
        do {
            i++
            console.log(`你今年${i}岁了`);
        }
        while (i <= 30) {
            console.log(`你猝死了`)
        }

```

打印我爱你

```js
 var mes = prompt('你爱我吗？')
        while (mes !== '我爱你') {
            mes = prompt('你爱我吗!')
        }
        alert('滚!');
```

打印100以内奇数偶数和

```js

        var even = 0
        var odd = 0
        var i = 1
        do {
            if (i % 2 === 0) {
                even += i
            } else {
                odd += i
            }
            i++
        }
        while (i <= 100)
        console.log(even);
        console.log(odd);

```



# While循环

```js
while(条件表达式){
//循环体
}
//当表达式结果为true时一直执行循环体 因此常配合操作表达式使用
//否则退出循环
//也应有计数器初始化变量
//操作表达式完成计时器更新防止死循环
```



计算1~100之间所有整数的和

```js
var sum = 0
var j = 1
while ( j <= 100) {
	sum += j;
	j++
}
console.log(sum)
```



复合赋值运算符

# JavaScript Array（数组） 对象

数组对象的作用是：使用单独的变量名来存储一系列的值，他是一个有序的集合。

## 创建一个数组

创建一个数组，有三种方法。

下面的代码定义了一个名为 myCars的数组对象：

1: 常规方式:

```js
var myCars=new Array();
myCars[0]="Saab";      
myCars[1]="Volvo";
myCars[2]="BMW";
console.log(myCars)
```

2: 简洁方式:

```js
var myCars=new Array("Saab","Volvo","BMW");
console.log(myCars)
```

3: 字面:

```js
var myCars=["Saab","Volvo","BMW"];
console.log(myCars)
```

------

案例：取数值最大值：

```js
var arr = [2, 99, 4, 6, 65, 22]
var max = arr[0]
 	for (var i = 1; i < arr.length; i++)
		if (arr[i] > max) {
		max = arr[i]
 }
	console.log('最大数为:' + max);// 输出99
```

```js
//求数值最小值
        var arr = [322, 232, 2313, -323, 232, 324, -43434]
        var min = arr[0]
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i]
            }
        } 
        console.log(min)
```



## 访问数组

通过指定数组名以及索引号码，你可以访问某个特定的元素。

以下实例可以访问myCars数组的第一个值：

```js
var name=myCars[0];
```

以下实例修改了数组 myCars 的第一个元素:

```js
myCars[0]="Opel";
```

利用for循环索引数组

```js
var n = '4'
var arr = ['apple', 'sow', 'cow', 'string', 'gold']
	for (var i = 0; i < n; i++) {
	console.log(arr[i])
}//输出 前4个元素
```

利用Math.max.apply输出最大值

```js
var data = [3, 44, 555, 777]
	console.log(Math.max.apply(Math, data));// 777
```

