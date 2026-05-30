---
layout: post
title: Cloudflare CDN加速 国内访问Github Pages服务
abbrlink: 49594
date: 2025-11-26 21:14:15
tags: CloudFlare CDN加速
categories: dns
---

- 前言：
github 的ip 地址是不定期更换的，会间接导致国内访问github的速度非常慢，而我们的github pages 托管的静态博客，访问速度也会受其中影响，如果仅仅是在阿里云上使用免费的dns 解析，提升效果其实几乎没有，所以，我决定使用Cloudflare 来加速github pages 的访问速度。

方法很简单：[访问Cloudflare](https://dash.cloudflare.com)

注册完账户后，输入你的域名
![此处获取Cloudflare 给你的2个ns地址](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/pic001.png)

回到阿里云控制台

![域名与网站/域名列表/](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/1764164020152.jpg)

此处修改替换为你Cloudflare 给的2个ns地址,确认后同步



测试(上面操作一般10–30分钟生效)： ping 你的域名，域名会从阿里云ns 地址解析到Cloudflare 的ns 地址

![测试结果](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/4cf3cfd7688dfbe9679106f719f891c.jpg)

IP 从原来的185。 变为现在的172.说明已经走 Cloudflare CDN 了

Cloudflare 个人版用户还有些好用的就是可以做一些其他的操作

比如Page Rules,下面就不再做介绍
