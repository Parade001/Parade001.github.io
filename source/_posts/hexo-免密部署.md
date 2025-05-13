---
layout: post
title: hexo 免密部署
abbrlink: 21989
date: 2022-08-20 07:24:08
tags: blog
categories: git
summary: 迁移数据提示要求输入密码否则鉴权失败？
---

在将博客迁移到新电脑后推送一直要求输入用户名密码，
在网上查询很久：生成新到公匙（无效），查看本地配置信息是否对应上也无效
```gitbash
git config --list
```
由于github 策略问题需要执行一行命令
我们首先要去github 生成自己的token
设置 => 开发者设置 => 个人访问令牌 => 生成token
```gitbash
git remote set-url origin https://你的token@github.com/你的.github.io.git 
```
执行完成后就可以免密推送部署

