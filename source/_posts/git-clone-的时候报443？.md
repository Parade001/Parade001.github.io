---
layout: post
title: git clone 的时候报443？
abbrlink: 33105
date: 2022-09-24 01:55:03
tags: git clone 443
categories: git
summary:  在家里用自己电脑clone 项目遇到443 ，明明有科学上网还是443，被拒绝
---

```gitbash
Error: Failed connect to github.com:443; No error while accessing https://github.com/account/repo/info/refs?service=git-upload-pac
fatal: HTTP request failed

//这个时候只需要执行
git config --global http.proxy “localhost：代理端口”
```

[参考](https://stackoverflow.com/questions/15908802/git-clone-not-working-error-443)
