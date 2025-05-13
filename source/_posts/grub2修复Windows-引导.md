---
layout: post
title: grub2修复Windows 引导
abbrlink: 13285
date: 2023-01-18 20:31:54
tags: 引导修复
categories: Linux
suumary: 重装Windows系统后丢失grub2应道，这个时候需要一个Ubuntu 系统盘，就很好修复...
---
重装win10后，导致双系统引导消失，ubuntu无法进入的解决方法
重装完windows导致无法进入ubuntu
问题分析
解决方法
第一步，利用启动盘进入ubuntu桌面
第二步，在这个桌面下，通过命令安装boot repair
总结
重装完windows导致无法进入ubuntu
这段时间由于windows的C盘占用太高，乃至于无法装下任何其他东西，清理也清理不了，无奈之下，只能重装windows，但万万没想到，重装完windows之后，直接改变了ubuntu16.04+win10的grub引导界面，变成了直接让windows启动，而ubuntu的进入界面消失。

问题分析
初步判断，是由于装win10的时候，装系统的过程中自动装载了windows的grub引导，破坏了原有的双系统引导。所以导致ubuntu无法进入。此时不要慌，ubuntu系统内部并没有被破环，数据肯定还完好无损，如果此时选择重装ubuntu的话，数据和环境就会被牺牲掉，代价太大，得不偿失。我们只需要修复还原回以前的双系统引导界面即可。

解决方法
第一步，利用启动盘进入ubuntu桌面
此时我们首先需要拿出我们以前装系统的启动盘，如果没有可以马上做一个ubuntu启动盘，至于如何制作ubuntu启动盘，网上教程太多了，这里就不赘述了。
当启动盘制作完成之后，我们将U盘插上，然后重启电脑，按F7（我的电脑是按F7，不同的电脑可能进入启动选项的方式不一样，可能按F2 F10 F8 F12,回车等等）选择进入U盘启动，然后来到启动盘的grub界面，选择try ubuntu not install ，点击进入，此时来到U盘的ubuntu系统界面，如果发现进入try ubuntu not install 的过程中，在紫屏阶段卡死，或者无法进入ubunut桌面。那么我们直接按长按关机键，选择重启，重复刚刚操作，来到启动盘的grub界面。
此时不要立刻点击进入，在光标选中try ubuntu not install的位置时，按下键盘上的E键盘，然后将"quiet splash —"改为 “nomodeset”（没有引号），然后按下F10（F10表示保存），此时肯定就能进去ubuntu的界面了。

第二步，在这个桌面下，通过命令安装boot repair
当我们已经通过u盘来到ubuntu的桌面时，我们就能看到我们之前双系统下的ubuntu里面的内容了，可以发现，数据完好无损，所有东西都在，唯一不在了的就是丢失了双系统的引导界面，相当于我们要进入一个房子，但是门坏了，开不了，但里面的东西还在，我们没有必要把屋子也拆了。重新修一座房子。
此时，先连接好网络，然后打开终端，输入
```bash
sudo add-apt-repository ppa:yannubuntu/boot-repair
```
这行命令比较加入一个ppa源，用来一会儿下载boot repair
然后我们可以通过使用。如果看到一个密匙被成功导入了，就表示成功了。
```bash
sudo apt-get update
```
来更新我们的环境，如果更新下载的速度太慢，也可以进入设置，下载资源管理里面，重新选取ppa源，然后点击关闭，等待进度条自动转好，也可以自动加载刚刚写入的ppa源。
接下来，再在终端上输入
```bash
sudo apt-get install -y boot-repair
```
此行命令表示下载我们所需要的boot-repair，下载完了之后它会自动安装。
等待安装结束之后，继续终端上输入
```bash
boot-repair
```
打开我们的boot-repair，点击第一个选项

然后等待它进度条自己慢慢左右滚动，大概几分钟之后，它会显示修复成功，此时你只需要重启，然后就已经恢复到了之前双系统的grub引导界面了。ubunut也就能够再次进入了。

总结
这个方法应该是我尝试的所有方法里面效率最高的一个，之前也试过通过mount命令挂载/ /boot /home的分区到/mnt中，然后通过grub install修复，发现中间会发生很多错误，比如文件路径不存在，某某文件找不到等各种奇葩现象。所以最后选择了这个方法。这个方法也是我找到最简单最实用最快的方法。如果这个方法成功帮到你了，你可以收藏起来，以便下次grub崩了或者重装windows之后可以又用到。

***
[装载自CSDN](https://blog.csdn.net/weixin_44403182/article/details/108923220)