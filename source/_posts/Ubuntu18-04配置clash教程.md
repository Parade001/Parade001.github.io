---
layout: post
title: Ubuntu18.04配置clash教程
abbrlink: 6099
date: 2022-12-31 19:47:35
tags: clash
categories: Linux
summary: 这是一个科学上网的教程.
---
[下载文件：clash-linux-amd64-v1.12.0.gz](https://github.com/Dreamacro/clash/releases)
（也可以下载最新的版本，前缀是clash-linux-amd64即可）进入该文件所在目录，在页面空白处右键在终端打开
1.解压gunzip clash-linux-amd64-v1.12.0.gz
2.将clash-linux-amd64-v1.12.0文件重命名为clash mv clash-linux-amd64-v1.12.0 clash
3.在此目录下创建文件夹（注意这里用大写Clash只是为了和clash区别开）
```bash
mkdir Clash
```
4.移动clash文件夹到Clash文件夹
```bash
mv clash ./Clash
```
5.进入Clash文件夹
```bash
cd Clash
```
6.下载clash 配置文件config.yaml （注意：这个订阅链接是自己的，替代 [订阅链接]，如果失败了说明订阅链接有问题）
```bash
wget -O config.yaml [订阅链接]
```

7.下载Country.mmdb
```bash
wget -O Country.mmdb https://www.sub-speeder.com/client-download/Country.mmdb
```
注意：如果步骤7失败了也没关系，直接跳过这一步，后面也会自动下载。也可以在网址Country.mmdb下载。
8.启动clash.
```bash
/clash -d .
//注意：如果提示权限不足则
chmod +x Clash
//再执行
./clash -d .
```
出现如下表示成功，并保持此终端打开
9.打开配置文件config.yaml ，给它设置一个密码： # RESTful API 的口令 secret: '123456'<img src="https://pic1.zhimg.com/v2-0befeb7cc67c64ef034394bdb48aa908_b.jpg" data-caption="" data-size="normal" data-rawwidth="653" data-rawheight="118" class="origin_image zh-lightbox-thumb" width="653" data-original="https://pic1.zhimg.com/v2-0befeb7cc67c64ef034394bdb48aa908_r.jpg"/>

10.打开系统设置，选择网络，点击网络代理右边的 ⚙ 按钮，选择手动，
填写 HTTP 和 HTTPS 代理为 127.0.0.1:7890，
填写 Socks 主机为 127.0.0.1:7891，即可启用系统代理。（不同的ubuntu版本系统设置的位置不一样）
<img src="https://pic1.zhimg.com/v2-e7a859991cabe136ab116056fa3dc748_b.jpg" data-caption="" data-size="normal" data-rawwidth="778" data-rawheight="579" class="origin_image zh-lightbox-thumb" width="778" data-original="https://pic1.zhimg.com/v2-e7a859991cabe136ab116056fa3dc748_r.jpg"/>
11.访问  http://clash.razord.top/ 可以切换节点、测延迟等操作。（这里的代理模式选规则）
<img src="https://pic2.zhimg.com/v2-4604beda74a7d09714eaaf5695283021_b.jpg" data-caption="" data-size="normal" data-rawwidth="1440" data-rawheight="345" class="origin_image zh-lightbox-thumb" width="1440" data-original="https://pic2.zhimg.com/v2-4604beda74a7d09714eaaf5695283021_r.jpg"/>优先使用火狐浏览器，如果进到这个网站点确定没有响应，f12看看console里面的报错。如果是The request client is not a secure context and the resource is in more-private address space `local`，可以在url那一栏输入chrome//:flags，搜索Block insecure private network requests，调整为disabled就可以了。
这个页面要求提供，Host,Port,Secret 三个输入：Host: 127.0.0.1
Port: 9090
Secret: 123456
<img src="https://pic2.zhimg.com/v2-7039cecea861b9ff5da7708b431b1299_b.jpg" data-caption="" data-size="normal" data-rawwidth="720" data-rawheight="340" class="origin_image zh-lightbox-thumb" width="720" data-original="https://pic2.zhimg.com/v2-7039cecea861b9ff5da7708b431b1299_r.jpg"/>
如下界面可以切换节点并测速 （点蓝色表示选中此节点）
<img src="https://pic2.zhimg.com/v2-198412c6db3ebf6e374043754747008d_b.jpg" data-caption="" data-size="normal" data-rawwidth="1440" data-rawheight="573" class="origin_image zh-lightbox-thumb" width="1440" data-original="https://pic2.zhimg.com/v2-198412c6db3ebf6e374043754747008d_r.jpg"/>
命令行切换节点：用 curl -X PUT 来访问 clash RESTapi，如：先用 curl 127.0.0.1:9090/proxies查看所有节点，然后 curl -X PUT -H "Content-Type: application/json" -d '{"name":"V2-3515|香港|x2.0"}'127.0.0.1:9090/proxies/来切换节点注意：（1）要访问谷歌，就要时刻打开那个终端（如果发现没法上网了，一般是点了直接连接，查看是不是规则连接，见步骤11）（2）如果这些操作都结束后还是无法访问谷歌，建议重启电脑，重新再Clash文件夹下执行  ./clash -d . ，然后再打开网址Clash Dashboard切换节点。二、配置开机自启动#打开终端，获取权限
su
#输入密码
#创建service文件
```bash
touch /etc/systemd/system/clash.service
#编辑service文件
vi /etc/systemd/system/clash.service
```
```.server
#编辑如下文本：
[Unit]
Description=clash daemon
[Service]
Type=simple
User=root
ExecStart=/home/username/下载/Clash/clash -d /home/username/下载/Clash/
Restart=on-failure
[Install]
WantedBy=multi-user.target
```
设置 Clash 的开机启动项，检查状态，服务启动成功之后，根据信息设置自己客户端的代理协议类型及端口（依次输入）
```bash
sudo systemctl daemon-reload
sudo systemctl enable clash
sudo systemctl start clash
sudo systemctl status clash
```

***
[已授权,转载自知乎用户@每天都要努力呀](https://www.zhihu.com/people/mei-tian-du-yao-nu-li-a-80)
