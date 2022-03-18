---
layout: post
title: git 生成文件目录树
abbrlink: 8570
date: 2021-02-1 22:44:19
tags: git tree
categories: git
summary:  最近发现有个 tree 工具很好用,用来查看项目结构等等场景很适合
---

[下载地址](http://gnuwin32.sourceforge.net/packages/tree.htm)

```bash
xt_xi@baba-yetu MINGW64 ~/Hexo (master)
$ tree -L 1
Hexo
├── _config.landscape.yml
├── _config.yml
├── db.json
├── desktop.ini
├── node_modules
├── package-lock.json
├── package.json
├── public
├── source
├── themes
└── yarn.lock

```

查看帮助手册

```bash
xt_xi@baba-yetu MINGW64 ~/Hexo (master)
$ tree --help
Usage: tree [options]

Options:
  -V, --version           输出版本号
  -a, --all-files         打印所有文件，包括隐藏文件。
  --dirs-first            列出文件之前的目录。
  -d, --dirs-only         仅列出目录。
  -s, --sizes             以字节为单位打印每个文件的大小以及姓名。
  -I, --exclude [patterns]排除匹配模式的文件。 | 分开
                             交替模式。 把你的整个图案包裹起来
                             双引号。 例如。 `“节点模块|覆盖”。
  -L, --max-depth <n>     目录树的最大显示深度。.
  -r, --reverse           按字母倒序对输出进行排序。
  -F, --trailing-slash    为目录附加一个“/”。
  -S, --line-ascii        打开 ASCII 线图形。
  -h, --help                display help for command
```

基于 node 的 treer

[npm文档](https://www.npmjs.com/package/tree-node-cli)

全局安装:

```bash
npm install -g treer
```

