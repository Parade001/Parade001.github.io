---
title: git 从入门到精通
tags: git
summary: Git是世界上最先进的分布式版本控制系统.这里我会逐渐介绍一下git常用的命令及使用误区
categories: git
abbrlink: 11430
date: 2017-03-10 22:51:27
keywords:
description:
---

## git是什么?

> Git是目前世界上最先进的分布式版本控制系统（没有之一）。
>
> Git有什么特点？简单来说就是：高端大气上档次！  -- 引用自廖雪峰的官网



安装完git后

检查是否安装完成

```bash
git --version
```

### 进行全局配置

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

### 与远程仓库握手

我们通常需要在github或gitee去生成的钥匙

```bash
ssh-keygen -t rsa -C "你的邮箱地址" 
```

```bash
cd .ssh
cat .\id_rsa.pub
cv 到github 或者gitee 
```

要熟练理解 git 的 使用:就要有

## 时间线的概念

每一次commit 就是一个版本生成一个它的id

***git 分为3个区域:工作区、暂存区、版本控制区***

首先对需要跟踪的项目进行初始化

```bash
git init 
```

会选择当前路径的所有文件 单个跟踪就直接输入对应文件

```bash
git add . 
```

此时我们的文件会从当前的工作区跟踪到暂存区

当我们需要进行提交到版本控制区的时候

```bash
git commit -m "提交备注信息"
```

第一次推送时

```
git remote add origin  git@gitee 用户名加项目仓库地址   //cv 你的项目仓库地址
```

推送并创建到你的master

```bash
git push -u origin master
```

<hr>
 一些常用的git指令
重命名分支

```bash
git branch -m oldname newname
```

删除远程分支

```bash
git branch --delete origin oldname
```

上传新分支到远程

```bash
git push origin newname
```

把修改后的本地分支与远程分支关联

```bash
git branch --set-upstream-to origin/newName
```

拉取远程仓库且合并

```bash
git pull origin master
```

l拉取本地不合并

```
git fetch <remote>
```

查看状态

```bash
git status    
```

查看官方手册

```bash
git help git
```

查看提交日志

```bash
git log 
```

查看分支

```bash
git branch
```

查看本地和远程所有分支

```bash
git branch -a
```

拉取远程的并切换到新分支

```bash
git checkout -b 新分支名 origin/远程分支名
```

提一句: - b , 意思就是base 会议当前的分支未base,新建分支

```bash
git checkout remote/.../...
```

查看提交日志树

```bash
 git log --graph --oneline
```

查看当前目录所有改动的内容

```bash
git diff
```

查看一个文件的改动情况

```bash
git diff 文件名
```

撤销修改

```bash
git checkout -- 文件名
```

从git缓存中删除而不是磁盘

```bash
git rm --cached 文件名
```

强制删除

```bash
git rm 文件名 -f
```

查看完整的提交哈希码

```bash
git log --graph --pretty=oneline
```

管理 reflog 信息

```bash
 git reflog
```

此时我们通过查看到的信息配合回滚命令

```bash
git reset --hard 版本号进行强制回滚
```

查看当前暂存区的文件

```bash
git ls-files 
```

显示暂存的条目的相关信息

```bash
git ls-files -s
```

显示删除了的文件

```bash
git ls-files -d
```

**撤销**错误添加到**暂存区**的文件

```bash
git rm --cache 文件名
```

删除提交到暂存区的文件|文件夹

```
git rm -r --cache 文件|文件夹名
```

<hr>
**撤销所有**

```bash
git reset HEAD -- .
```

**撤销特点目标**

```bash
git reset HEAD -- 文件或者文件夹名
```

将文件从缓存中删除

```bash
git rm -cached filepath 
```



###### 删除错误提交的commit有三个选项，--hard、--mixed、--soft

```bash
仅仅只是撤销已提交的版本库，不会修改暂存区和工作区
git reset --soft 版本库ID  
```

```bash
//仅仅只是撤销已提交的版本库和暂存区，不会修改工作区
git reset --mixed 版本库ID
```

```bash
//彻底将工作区、暂存区和版本库记录恢复到指定的版本库
git reset --hard 版本库ID
```

显示暂存区的目录树，其中第三个字段不是文件大小而是暂存区编号
若想针对暂存区的目录树使用git ls-tree命令，需要先将暂存区的目录树写入Git对象库，然后针对该目录树执行git ls-tree命令

> 查看HEAD（版本库中当前提交）指向的目录树

```bash
git ls-tree -l HEAD
```



#### 创建分支

```bash
git branch 分支名称
```

切换分支

```bash
git checkout 分支名称
```

创建并立即切换到分支

```bash
git checkout -b 分支名称
```

合并分支

```bash
git merge 分支名称
```

***删除分支(合并后,谨慎使用)***

```bash
git branch -d 分支名称
```



<hr>
**删除远程源仓库**

```bash
git remote rm origin 
```

删除远程分支

```bash
git push origin --delete 分支名称
```

添加远程源仓库**

```bash
git remote add origin 仓库地址
```

**直接修改远程源仓库**

```bash
git remote set-url origin 仓库地址
```

**将本地分支和远程分支合并关联**

```bash
git push --set-upstream origin 新分支名
```

<hr>

# git Fork 项目的仓库同步更新上游

git被称为搞基网,可能跟 fork me 有关联...此处应该有一张图

### 在你clone 下来的 fork 别人(fork 后的地址) 的本地仓库里 运行: 

第一步 验证远程分支

```bash
git remote -v
```

如果你是第一次使用本操作,那么不出意外的话,你的源仓库 就是你 fork 过来的仓库

第二步 现在你要指定你的上游仓库,也就是原作者的仓库地址,去复制过来

```bash
git remote add upstream 原作者的仓库
```

 第三步 进行验证

```bash
git remote -v
```

现在它有4行了.

第四步  拉取更新的 branches 和 commits

```bash
git fetch upstream
```

第五步 Checkout 本地分支

```bash
git checkout master
```

第六步 合并

```bash
git merge upstream/master
```

第七步 提交

```bash
git push origin master
```

<hr>

#### 谨慎使用

删除暂存区中的文件

### 同时删除暂存区与工作区中的文件!

```bash
git rm -f 文件名
```

### 删除远程仓库

```bash
 git remote rm 远程仓库名
```

初学者 不容易理清楚 remote、origin 以及时间线的概念,其实很好理解

remote 直译: 远程 

origin 直译: 源

时间线:类似黑客帝国 [子弹时间](https://baike.baidu.com/item/%E5%AD%90%E5%BC%B9%E6%97%B6%E9%97%B4/2966162 ) 的实现原理

提一句

```bash
git pull     // 等同 git fetch + git merge 
```

一句话:将远程的部分与本地进行合并



## 推荐使用

创建 .gitignore <br>字面意思:git 忽略 ,git 会依赖此文件***忽略文件匹配管理***

把他建在仓库根目录下

无需后缀名 ,可以直接用正则进行匹配

比如:我们推送远程,发给你的协调开发者时,无需或者不想发送某些文件的时候

```
node_modules/                   //匹配所有node_modules目录以及目录下的所有目录以及文件
```



可能遇到的问题

```bash
git merge upstream/master
```

可能提示

```bash
error: Your local changes to the following files would be overwritten by merge:
        hr/src/views/employees/employees.vue
Please commit your changes or stash them before you merge.
Aborting
```

解决办法:回滚

```
git stash
git pull origin master
git stash pop //此时，执行git stash pop，您将看到冲突的局部更改仍然存在,让你决定将进行什么操纵
```

回滚:

```bash
git reflog   //查阅版本号
git reset --hard 版本号
git pull origin master
```

#### git blame -h 

```bash
--incremental 在我们找到它们时显示责备条目，增量
    -b 不显示边界提交的对象名称（默认值：关闭）
    --root 不将根提交视为边界（默认值：关闭）
    --show-stats 显示工作成本统计
    --progress 强制进度报告
    --score-debug 显示责备条目的输出分数
    -f, --show-name 显示原始文件名（默认：自动）
    -n, --show-number 显示原始行号（默认：关闭）
    -p, --porcelain 以专为机器使用而设计的格式显示
    --line-porcelain 显示带有每行提交信息的瓷器格式
    -c 使用与 git-annotate 相同的输出模式（默认：关闭）
    -t 显示原始时间戳（默认：关闭）
    -l 显示长提交 SHA1（默认值：关闭）
    -s 禁止作者姓名和时间戳（默认值：关闭）
    -e, --show-email 显示作者电子邮件而不是姓名（默认值：关闭）
    -w 忽略空格差异
    --ignore-rev <rev> 责备时忽略 <rev>
    --ignore-revs-file <文件>
                          忽略来自 <file> 的修订
    --color-lines 对上一行的冗余元数据进行不同的着色
    --color-by-age 颜色线按年龄
    --最少花费额外的周期来找到更好的匹配
    -S <file> 使用来自 <file> 的修订而不是调用 git-rev-list
    --contents <file> 使用 <file> 的内容作为最终图像
    -C[<score>] 查找文件内和文件间的行副本
    -M[<score>] 查找文件内和文件间的行移动
    -L <range> 只处理行范围 <start>,<end> 或 function :<funcname>
    --abbrev[=<n>] 使用 <n> 位来显示对象名称
```

