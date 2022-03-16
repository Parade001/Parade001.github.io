---
layout: post
title: 将bash添加到右键
abbrlink: 29700
date: 2022-03-16 23:13:37
tags: git
categories: git
summary: 更新win11 后发现右键git 又又没了
---

解决办法:

修改注册表:

1. 在CMD中输入 "regedit" 

2. 定位到 HKEY_CURRENT_USER\SOFTWARE\Classes\Directory\Background\shell

3. 右键点击 "shell" 选择 New > Key. 将KEY命名为 "Bash"

   <img src="https://pic1.zhimg.com/v2-1cb74e698a8b6937d007d282a80df0a3_r.jpg?source=1940ef5c">

4. 设置值 'open in Bash'

<img src='https://pic2.zhimg.com/80/v2-d8ba5d9dd38f9e2e41b6f2956a301a74_720w.jpg?source=1940ef5c'>

<img src='https://pica.zhimg.com/v2-abc1422c218366177b7f154531e9a750_r.jpg?source=1940ef5c'>

5.创建一个新的KEY命名为"command". 设置值为你的git-bash.exe 路径.

<img src="https://pic1.zhimg.com/80/v2-039eb67bf9b014a37c3ff55985655832_720w.jpg?source=1940ef5c">

<img src="https://pic2.zhimg.com/v2-7ed3d1b6f0d8130831c6a85900b1e003_r.jpg?source=1940ef5c">

<img src="https://pica.zhimg.com/80/v2-c7065ac108ddd845918b4c34664e7a12_720w.jpg?source=1940ef5c">



<img src="https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/1647444482%281%29.jpg" alt="添加字体图标">