---
layout: post
title: 浅谈 TCP Socket 与 WebSocket
tags: 计算机网络
categories: 计算机网络
summary: '最近面试有被问道socket 与websocket 区别,在这里总结下'
abbrlink: 60801
date: 2022-03-26 20:49:24
---

> Websocket 与 TCP 的不同之处在于它启用消息流而不是字节流   
>
> <p align='right'>wikipedia</p>



Web 浏览器在应用层运行，而 TCP 在传输层运行。

作为 Web 应用程序开发人员，通过应用程序层而不是传输层的原始字节通过线路发送消息更容易。

底层的 WebSockets*是*TCP，为了简单起见，它只是被抽象出来了。

<p align='right'>stack ovrflow</p>

HTTP 是个懒惰的协议，server 只有收到请求才会做出回应，否则什么事都不干

为了彻底解决这个 server 主动向 client 发送数据的问题，W3C 在 HTML5 中提供了一种 client 与 server 间进行全双工通讯的网络技术 WebSocket。

WebSocket 是一个全新的、独立的协议，基于 TCP 协议，与 HTTP 协议兼容却不会融入 HTTP 协议，仅仅作为 HTML5 的一部分。

WebSocket 是建立在 TCP（可靠传输层，基于每帧）之上的高级协议（如 HTTP 本身），它可以使用 JS 客户端（以前的 Comet 和长轮询技术）构建有效的实时应用程序用于在 WebSockets 实施之前从服务器*中提取更新*

WebSocket 是一种协议，是一种与 HTTP 同等的网络协议，两者都是应用层协议，都基于 TCP 协议。

而TCP Socket是一种为应用程序提供的一组应用程序接口(API),是一种操作系统提供的进程间通信机制,应用程序可以通过套接字接口，来使用网络套接字，以进行资料交换。

<p align='right'>Wikipedia</p>

<hr>

# 参考

##### [Differences between TCP sockets and web sockets, one more time](https://stackoverflow.com/questions/16945345/differences-between-tcp-sockets-and-web-sockets-one-more-time)

[What is the fundamental difference between WebSockets and pure TCP?](https://stackoverflow.com/questions/2681267/what-is-the-fundamental-difference-between-websockets-and-pure-tcp)

##### [WebSocket 与 Socket.IO](https://segmentfault.com/a/1190000006899960)

