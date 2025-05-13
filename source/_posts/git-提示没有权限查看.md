---
layout: post
title: git 提示没有权限查看?
tags: git 权限
categories: git
summary: '组长明明给了权限,但是由于某种原因,就唯独你没有权限拉去'
abbrlink: 62666
date: 2022-07-17 10:58:07
---

在提交代码的时候发现一直没有权限（windows）

```
//无论是
git init 
git remote add origin
git fetch 
```

<img src="https://tvax2.sinaimg.cn/large/0066jXzmgy1h4s83g9rz7j30m809eq3q.jpg">

```
//或者
git clone -b 
//都没有权限
```

<img src="https://tva3.sinaimg.cn/large/0066jXzmgy1h4s88i06v3j30cz016jr8.jpg">

```
//检查你用户名
git config user.name
//若没有配置，则配置
git config --global user.name "your name"
```

<img src="https://tvax3.sinaimg.cn/large/0066jXzmgy1h4s8aubcqgj304w015a9u.jpg">

```
//win+r control 
//查看你的window凭证
```

<img src="https://tva1.sinaimg.cn/large/0066jXzmgy1h4s8dju17nj30kg0a83z1.jpg">

<img src="https://tva4.sinaimg.cn/large/0066jXzmgy1h4s8dzuxgpj30cx061gll.jpg">

<img src="https://tvax1.sinaimg.cn/large/0066jXzmgy1h4s8e83i3aj30h504f0sr.jpg">

- 检查是否同一个
- 修改完成后才能有权限取clone view 仓库



