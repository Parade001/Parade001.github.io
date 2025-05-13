---
layout: post
title: Go协程并发
abbrlink: 17215
date: 2022-09-01 23:26:49
tags: 协程并发
categories: Go
summary: 本节介绍Go语言并发协程(goroutine)相关内容。
---


一个应用程序是运行在机器上的一个进程；
进程是一个运行在自己内存地址空间里的独立执行体。
一个进程由一个或多个操作系统线程组成，这些线程其实是共享同一个内存地址空间的一起工作的执行体。
几乎所有'正式'的程序都是多线程的，以便让用户或计算机不必等待，或者能够同时服务多个请求（如 Web 服务器），或增加性能和吞吐量（例如，通过对不同的数据集并行执行代码）。
一个并发程序可以在一个处理器或者内核上使用多个线程来执行任务，
但是只有同一个程序在某个时间点同时运行在多核或者多处理器上才是真正的并行。
并行是一种通过使用多处理器以提高速度的能力。所以并发程序可以是并行的，也可以不是。
公认的，使用多线程的应用难以做到准确，最主要的问题是内存中的数据共享，它们会被多线程以无法预知的方式进行操作，导致一些无法重现或者随机的结果（称作 竞态）。
- [ ] 程序语言并发：

    - 线程、进程、协程

- [x] Go语言协程goroutine概述：

    - Go语言原生支持应用之间的通信（网络，客户端和服务端，分布式计算）和程序的并发。
        - Go语言协程比其他语言协程更强大，也很容易从协程的逻辑复用到Go协程。
        - 在Go语言中，协程是创建计算的唯一途径。
        - Go语言不支持创建系统线程，协程是一个Go程序内部唯一的并发实现方式。

- [ ] 协程goroutine用法：

    - 使用go关键字。
    - 启动一个新的协程时，协程的调用会立即返回。与函数不同，程序控制不会去等待 Go 协程执行完毕。在调用 Go 协程之后，程序控制会立即返回到代码的下一行，忽略该协程的任何返回值。
    - 如果希望运行其他 Go 协程，Go 主协程必须继续运行着。如果 Go 主协程终止，则程序终止，于是其他 Go 协程也不会继续运行。

- [x] 协程goroutine案例：

    - 案例一：使用延时来返回协程的返回值

      ```go
      func main() {	
          start := time.Now()
          go tester()
          time.Sleep(1 * time.Millisecond)
          end := time.Now()
          delta := end.Sub(start)
          g.Println(delta)
      }
      
      func tester() {
          i := 0
      HERE:
          g.Println(i)
          i++
          if i == 10 {
              return
          }
          goto HERE
      }
      ```

- [ ] 恐慌：一些致命性错误不属于恐慌。对于官方标准编译器来说，很多致命性错误（比如堆栈溢出和内存不足）不能被恢复。它们一旦产生，程序将崩溃。

    - 产生一个恐慌
    - 消除一个恐慌

- [ ] 恢复：

- [x] 参考链接：[协程参考1](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/14.1.md)、[协程参考2](https://gfw.go101.org/article/control-flows-more.html)

- [ ] 本节案例：

  </details>
<details>
<summary>Day018: 并发-Go语言通道</summary>

- [x] 本节说明：本节介绍Go语言通道(channel)的相关内容。

- [x] Go语言通道channel概述：
    - Go语言设计团队的首任负责人Rob Pike对并发编程的一个建议是：**不要让计算通过共享内存来通讯，而应该通过通讯来共享内存**。 通道就是这种哲学的一个设计结果。在Go语言中，可以认为一个计算就是一个协程。channel是协程之间互相通信的通道，协程之间可以通过它发送消息和接收消息。
    - 通过共享内存来通讯和通过通讯来共享内存是并发编程中的两种编程风格。
    - 一个通道可以看作是在一个程序内部的一个先进先出（FIFO：first in first out）数据队列。 一些协程可以向此通道发送数据，另外一些协程可以从此通道接收数据。
    - 通道是Go语言中的一等公民类型，是Go语言的招牌特性之一。 和协程一起使用，这两个招牌特性使得使用Go进行并发编程变得方便和有趣，降低了并发编程的难度。通道的主要作用是用来实现并发同步。
    - 通道是进程内的通信方式，因此通过通道传递对象的行为与函数调用时参数传递行为比较一致，比如也可以传递指针等。
    - 通道可以想像成Go语言协程之间通信的管道。如同管道中的水会从一端流到另一端，通过使用信道，数据也可以从一端发送，在另一端接收。
    - 通道的一个问题是通道的编程体验常常很有趣以至于程序员们经常在并非是通道的最佳应用场景中仍坚持使用通道。

- [ ] 通道类型和值：
    - 和数组、切片以及映射类型一样，每个通道类型也有一个元素类型。 一个通道只能传送它的（通道类型的）元素类型的值。
    - 通道可以是双向的，也可以是单向的。
      1、字面形式`chan T`表示一个元素类型为`T`的双向通道类型。 编译器允许从此类型的值中接收和向此类型的值中发送数据。
      2、字面形式`chan<- T`表示一个元素类型为`T`的单向发送通道类型。 编译器不允许从此类型的值中接收数据。
      3、字面形式`<-chan T`表示一个元素类型为`T`的单向接收通道类型。 编译器不允许向此类型的值中发送数据。
    - 一个非零通道值必须通过内置的make函数来创建。 比如make(chan int, 10)将创建一个元素类型为int的通道值。 第二个参数指定了欲创建的通道的容量。此第二个实参是可选的，它的默认值为0。

- [ ] 通道值的比较：

    - 所有通道类型均为可比较类型。比较这两个通道的结果为布尔值。

- [ ] 通道操作：
    - 同一个操作符 <- 既用于发送也用于接收，但Go会根据操作对象弄明白该干什么。
    - Go语言中有五种通道相关的操作。假设一个通道为ch，下面列出了这五种操作的语法或者函数调用：
      1、调用内置函数close来关闭一个通道：

      ```go
      close(ch)
      ```
      2、向通道ch发送一个值v。ch不能为单向接收通道。<-称为数据发送操作符。
      ```go
      ch <- v
      ```
      3、从通道ch接收一个值。
      ```go
      <-ch
      ```
      4、查询一个通道的容量。
      ```go
      cap(ch)
      ```
      5、查询一个通道的长度。
      ```go
      len(ch)
      ```
    - 通道可以分为三类：
      1、零值（nil）通道。
      2、非零值但已关闭的通道。
      3、非零值并且尚未关闭的通道。

  |   操作   | 一个零值nil通道 | 一个非零值但已关闭的通道 | 一个非零值且尚未关闭的通道 |
    | :------: | :-------------: | :----------------------: | :------------------------: |
  |   关闭   |    产生恐慌     |         产生恐慌         |        成功关闭(C)         |
  | 发送数据 |    永久阻塞     |         产生恐慌         |    阻塞或者成功发送(B)     |
  | 接收数据 |    永久阻塞     |       永不阻塞(D)        |    阻塞或者成功接收(A)     |

- [ ] 死锁：

- [ ] 恐慌绝望：

- [ ] 通道案例：
    - 通道案例一：

      ```go
      package main
       
      import (  
          "fmt"
      )
       
      func hello(done chan bool) {  
          fmt.Println("Hello world goroutine")
          done <- true
      }
      func main() {  
          done := make(chan bool)
          go hello(done)
          <-done
          fmt.Println("main function")
      }
      ```

    - 通道案例二：

      ```go
      package main
      
      import (
          "fmt"
          "time"
      )
      
      func main() {
          c := make(chan int) // 一个非缓冲通道
          go func(ch chan<- int, x int) {
              time.Sleep(time.Second)
              // <-ch    // 此操作编译不通过
              ch <- x*x  // 阻塞在此，直到发送的值被接收
          }(c, 3)
          done := make(chan struct{})
          go func(ch <-chan int) {
              n := <-ch      // 阻塞在此，直到有值发送到c
              fmt.Println(n) // 9
              // ch <- 123   // 此操作编译不通过
              time.Sleep(time.Second)
              done <- struct{}{}
          }(c)
          <-done // 阻塞在此，直到有值发送到done
          fmt.Println("bye")
      }
      ```

    - 通道案例三：

      ```go
      package main
      
      import "fmt"
      
      func main() {
          c := make(chan int, 2) // 一个容量为2的缓冲通道
          c <- 3
          c <- 5
          close(c)
          fmt.Println(len(c), cap(c)) // 2 2
          x, ok := <-c
          fmt.Println(x, ok) // 3 true
          fmt.Println(len(c), cap(c)) // 1 2
          x, ok = <-c
          fmt.Println(x, ok) // 5 true
          fmt.Println(len(c), cap(c)) // 0 2
          x, ok = <-c
          fmt.Println(x, ok) // 0 false
          x, ok = <-c
          fmt.Println(x, ok) // 0 false
          fmt.Println(len(c), cap(c)) // 0 2
          close(c) // 此行将产生一个恐慌
          c <- 7   // 如果上一行不存在，此行也将产生一个恐慌。
      }
      ```

    - 通道案例四：

      ```go
      package main
      
      import (
          "fmt"
          "time"
      )
      
      func main() {
          var ball = make(chan string)
          kickBall := func(playerName string) {
              for {
                  fmt.Print(<-ball, "传球", "\n")
                  time.Sleep(time.Second)
                  ball <- playerName
              }
          }
          go kickBall("张三")
          go kickBall("李四")
          go kickBall("王二麻子")
          go kickBall("刘大")
          ball <- "裁判"   // 开球
          var c chan bool // 一个零值nil通道
          <-c             // 永久阻塞在此
      }
      ```

    - 通道案例五：

      ```go
      // chanmain
      package main
      
      import (
          "fmt"
      )
      
      func main() {
          done := make(chan bool)
          data := make(chan int)
          go xfz(data, done)
          go scz(data)
          <-done
      
      }
      
      func xfz(data chan int, done chan bool) {
          for x := range data {
              fmt.Println("recv:", x)
          }
          done <- true
      }
      
      func scz(data chan int) {
          for i := 0; i < 100; i++ {
              data <- i
          }
          close(data)
      }
      ```

- [ ] 本节参考：[通道参考1](https://github.com/ffhelicopter/Go42/blob/master/content/42_22_channel.md)、[通道参考2](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/14.2.md)、[通道参考3](https://blog.csdn.net/ytd7777/article/details/85004371)、[通道参考4](https://gfw.go101.org/article/channel.html)

- [ ] 本节案例：


  </details>
