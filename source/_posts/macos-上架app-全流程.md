---
layout: post
title: macos 上架应用全流程
abbrlink: 23496
date: 2025-05-13 23:39:43
tags: app 上架App Store
categories: Apple 应用上架流程
summary: 众所周知,上架app到applestore,首先你需要一台mac,当然也可以找找第三方.本文详细介绍证书，凭证，描述文件相关的生成，上传，以及后续的打包操作等...
---


```bash
1. 安装Homebrew
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
source ~/.zshrc，重载用户目录下的.zshrc。


2. ruby,gem(M1及以后芯片 环境变量需要配置在~/.zshrc，记得重载source ~/.zshrc)
brew install ruby
ruby -v (根据实际情况是否升级)
brew upgrade ruby

安装gem

$ sudo gem install cocoapods
(
    如果报错 =====>
    ERROR:  While executing gem ... (Gem::FilePermissionError)
        You don't have write permissions for the /usr/bin directory.

    改用如下命令：
    sudo gem install -n /usr/local/bin cocoapods
)

// 安装成功后，还需执行一条命令才大功告成
$ pod setup

// 有时 cocoapods 安装也会有问题
~/.cocoapods/repos 可能没有生成，所以我们只能手动：
$ mkdir -p ~/.cocoapods/repos
$ cd ~/.cocoapods/repos
$ git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git
$ pod setup

/// 添加国内源并删除官方源
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/

/// 查看当前源地址
gem sources -l

export PATH="/usr/local/lib/ruby/gems/3.3.0/bin:$PATH"

3. 安装cocoapods
cocoapods安装好后
pod install 安装项目第三方依赖包
```

[ios_app上架教程_证书篇 _ 简书文档](https://www.jianshu.com/p/a3d0e09a6802)

```
用于保护输出项目的密码

ManwahCrm0731.

启动react native

npx react-native run-ios

```

- [ apple_developer上架流程文档-分发_官方文档](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases)

- [apple_developer管理你的团队_官方文档](https://developer.apple.com/cn/help/account/manage-your-team/locate-your-team-id/)

- [如何删除你的app_ 关于app名称被占用_官方文档](https://developer.apple.com/help/app-store-connect/create-an-app-record/remove-an-app)

[React navtive 中文_上架文档_官方文档](https://reactnative.cn/docs/publishing-to-app-store)



appIcon 就是你的项目图标（建议采用1024*1024 无alpha通道的，否则在transporter 被驳回，用mac自带 图片 另存为png即可删除alpha通道）

[上架文档_社区 个人文档](https://erhutime.gitbooks.io/react-native/content/di-wu-pian-app-fa-bu-he-geng-xin/12-da-bao-ios.html)

[IOS应用上架Appstore_掘金文档](https://juejin.cn/post/7388825339987279935?searchId=20240731161843BF56AED5BA1CFD68E641):以下是对该链接的备份: 个人认为比较详细



## 打开苹果开发者中心网站：[developer.apple.com](https://link.juejin.cn?target=)，点击右上角 Account 进行开发者账号的申请。

> 1.申请开发者->(个人账号、公司账号、企业账号)
>
> 2.创建AppID、Bundle ID、certificates证书、Profiles配置文件
>
> 3.生成Profiles证书、密钥证书
>
> 4.创建APP
>
> 5.打包发布

# 流程实现

## 1.因为我的账号已经申请好了，这里就没法再演示一遍了。

## 2.创建AppID、Bundle ID

> ①滚动到底部点击Certificates


> ②侧边栏找到Identifiers进行创建


> ③这里选择App IDs，点击右上角的Continue按钮


> ④然后选择APP


> ⑤在Bundle ID处选择Explicit，填写自己项目的ID（要以com开头的项目标识），这里填写的ID即是控制台上传证书页面需要填写的App IDs。description 随意，最好要有项目特征


> ⑥如需要支付功能、��享功能等需要在Capabilities选择Associated Domains，需要消息推送则选择Push Notifications


> ⑦点击右上角Continue后确认信息无误后，点击register进行注册


## 3.生成certSigningRequest文件

> ①如图，打开应用程序->实用工具->钥匙串访问

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/keyrings.png)

> ②选择从证书颁发机构请求证书

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/keyring2.png)

> ③接下来填写邮件地址，选择存储到磁盘，点击继续

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring3.png)

> ④保存到桌面


## 4.创建发布证书

> ①侧边栏找到Certificates进行创建

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring4.png)

> ②选择IOS Distribution (App Store Connect and Ad Hoc)


> ③上传刚才保存到本地的certSigningRequest文件，点击Continue

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring6.png)

> ④然后点击Download下载cer证书


> ⑤双击证书添加到钥匙串访问

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring8.png)

> ⑥右键导出证书

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring9.png)

> ⑦选择导出的格式，为个人信息交换(.p12)

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring10.png)

> ⑧导出证书要设置密码

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/ring11.png)

## 5.创建APP

> ①选择添加APP

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/app1.png)

> ②填写app信息，app名称不区分大小写，如果名称被占用，可以先用其他替代，后面可以二次修改，等名称空出后，只需要在提交审核前修改好即可

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/app2.png)

## 6.打包发布

> 进行打包之前要进行项目配置，如果你的APP有支付/跳转功能的话，首先按照上述讲到的勾选Associated Domains，因为IOS的微信支付需要iOS通用链接

> Universal Link是苹果在WWDC 2015上提出的iOS 9的新特性之一。此特性类似于深层链接，并能够方便地通过打开一个Https链接来直接启动您的客户端应用(手机有安装App)。对比以往所使用的URLSheme, 这种新特性在实现web-app的无缝链接时,能够提供极佳的用户体验。

> 由于苹果iOS 13系统版本安全升级，微信SDK1.8.6版本要求支持Universal Links方式跳转，以便进行合法性校验，提升安全性。

> 简单来说就是以前你的APP要打开其他APP是通过URLScheme实现，后来苹果提出用Https链接来启动，手机上对应的app（已安装），更方便与web-app的无缝对接。微信响应了这个方案。所以大家开发的APP无论是微信登录、微信支付，还是微信分享等一切会跳转到微信，再跳回来的场景，需要提供这个链接。要不然你的应用打开了微信，微信就打不开你的应用。

### 那么问题来了，这个iOS通用链接改如何获取呢？官方给出的流程是这样的：

> 在苹果开发者中心：开启Associated Domains服务 获取相关参数，手动创建apple-app-site-association文件 部署apple-app-site-association文件到自己的云服务器，配置SSL证书解析域名 然后手动在manifest.json中配置Associated Domains（域名） 粘贴通用链接到对应权限模块 在微信开放平台配置通用链接

> 其二就是使用官方给的云服务，但是我个人是不喜欢这样，这样我更感觉麻烦！

> **其实无非就是在你的服务器上面放上一个名为apple-app-site-association的无后缀的公共访问文件，然后文件内部配置参数即可。**
>
> 因为我们公司的服务器使用的是宝塔，就以宝塔为例子吧：
>
> 拟定一个访问目录，放开这个目录的访问权限，随后新建一个文件**apple-app-site-association**

> **apple-app-site-association**文件内容是

```ruby
ruby

 代码解读
复制代码{
    "applinks":{
        "apps":[],
        "details":[
            {
                "appID":"你的teamID.你的Bundle ID",
                "paths":["*"]
            }
        ]
    }

}
```

> 随后将你的该文件的访问链接(不包括该文件名)填到前端项目的manifest.json->app模块配置->Payment(支付)->IOS通用链接即可


> 然后点击HbuilderX的发行->原生APP云打包->ios(ipa包)->选择证书，输入导出证书时设置的密码，然后点击发布即可

![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/app3.png)

> 发布工具的话，我自己用的是AppStore的Transporter工具，直接登录苹果开发者账号，然后选择刚才云打包生成的ipa包进行上传即可，如果你没有xcode的话，会提示你下载，如不需要选择暂不下载即可。
>
> Transporter:适合用H5套壳进行app上传，因为核心代码就下面这一行



![](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_868a5b79-b878-4ad3-be95-4fbb536f66f9.png)





下面再次回顾下，

BundleId： 创建应用到时候的com.你的app唯一标识，

私匙证书：即我们的 p.12 文件，由cer 导出。

cer 是在apple开发者网站上逐步申请即可。

描述文件profile：profile文件，这个可以根据app id 这个唯一标识或Certificates创建日期，再次去apple开发网站能再次生成下载即可。

至于证书私匙密码只有当初创建Certificates证书的人 才知道，可能是1-6 也可能是八个0，谁知道了



最近负责上架公司的第二个app到App Store，试图用已有的RN 代码继续重新上架，奈何依赖一直报错，请教了ios开发大佬，也无能为力，索性就用hbuilderx 构建壳就重新上架了。

最后，不要 随便！ 升级macos 系统，这会涉及项目依赖问题，因为高版本macos 系统无法运行低版本xcode，高版本xcode 又极大概率无法安装低版本项目依赖，导致项目无法构建，无法推送商店，特别是跨大版本号的升级

```

```
