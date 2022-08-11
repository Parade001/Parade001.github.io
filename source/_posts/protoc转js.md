---
layout: post
title: protoc转js
abbrlink: 36763
date: 2022-08-12 00:35:54
tags: protoc
categories: proto buffer
summary: proto to js
---
首先需要下载protoc编译器[protocV3.9.0](https://github.com/protocolbuffers/protobuf/releases/tag/v3.9.0)

因为是从3.0.0 Beta 2 版开始支持JavaScript

配置环境变量

```
C:\Program Files\protoc3.9\bin //你的路径
protoc --version
libprotoc 3.9.0  //安装成功
```

编译输出为js文件

```bash
protoc --js_out=import_style=commonjs,binary:./ local.proto
```
