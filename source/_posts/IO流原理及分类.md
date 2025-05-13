---
layout: post
title: IO流原理及分类
abbrlink: 9564
date: 2022-11-28 14:14:12
tags: IO流
categories: Java
summary:
---
IO流原理：
输入input：读取外部数据磁盘等存储设备的数据到程序内存。
输出output： 将程序内存数据输出到磁盘等存储设备中。

***
流的分类：
- 按操作数据单位不同：字节流(8 bit)，字符流(16bit);
- 按数据流的流向分：输入流，输出流
- 按流的角色不同分： 节点流，处理流

Java的IO流设计40多个类，实际上非常规则，都是从如下4个抽象基类派生而来的，这四个类派生的子类名称都是以其父类名作为子类名后缀

抽象基类：
- Inputstream
- outputStream
- Reader
- Writer

节点流（或文件流）:
- FileInputStream   (read(byte[] buffer))
- FileOutputStream  (write(byte[] buffer,0,len)
- FileReader (read(char[] cbuf))
- FileWriter (write(char[] cbuf,0,len)

缓冲流（处理流的一种）:
- BufferedInputStream (read(byte[] buffer))
- BufferedOutputStream (write(byte[] buffer,0,len) / flush()
- BufferedReader (read(char[] cbuf) / readLine())
- BufferedWriter (write(char[] cbuf,0,len) / flush()

