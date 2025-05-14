---
layout: post
title: macos 上架app 全流程
abbrlink: 23496
date: 2025-05-13 23:39:43
tags: macos
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



appIcon 就是你的项目图标（建议采用1024*1024 无alpha通道的，因为在transporter 被驳回，用mac 自带图片另存为png即可删除alpha通道）

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

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68b20d20702247c0aec2709e344e6bb6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2880&h=1580&s=379385&e=png&b=0a0a0a)

> ②侧边栏找到Identifiers进行创建

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06ddcb971b3a41b19473fc2e87cdc38f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2880&h=1580&s=261421&e=png&b=fefefe)

> ③这里选择App IDs，点击右上角的Continue按钮

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff009bf1415a478384e519b25705d63d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2874&h=1214&s=283817&e=png&b=ffffff)

> ④然后选择APP

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c84f93f859d54994b0a749314a1c6db4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1916&h=693&s=49011&e=png&b=ffffff)

> ⑤在Bundle ID处选择Explicit，填写自己项目的ID（要以com开头的项目标识），这里填写的ID即是控制台上传证书页面需要填写的App IDs。description 随意，最好要有项目特征

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9404b8e4b074f8bbcae5fa3a0a0cee2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2880&h=1580&s=326776&e=png&b=fefefe)

> ⑥如需要支付功能、��享功能等需要在Capabilities选择Associated Domains，需要消息推送则选择Push Notifications

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1488fb7c78074aa8a461c0e384fbaf58~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2880&h=1580&s=340493&e=png&b=fefefe)

> ⑦点击右上角Continue后确认信息无误后，点击register进行注册

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aa54bc58558452ba99a7732e6d7a070~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1774&h=671&s=82721&e=png&b=ffffff)

## 3.生成certSigningRequest文件

> ①如图，打开应用程序->实用工具->钥匙串访问

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3ee5aa4db5541789f7d05295f1719f3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1840&h=872&s=371728&e=png&b=312830)

> ②选择从证书颁发机构请求证书

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bd826d53ecd408a8a2b86f6f5f102d4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1758&h=672&s=1058708&e=png&b=76647c)

> ③接下来填写邮件地址，选择存储到磁盘，点击继续

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20d82874fdcb4185b642fce3364d7e50~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1232&h=884&s=138982&e=png&b=373136)

> ④保存到桌面

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35f9411428024ed0aebca501ba0c82c6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=242&h=240&s=81799&e=png&b=d069a0)

## 4.创建发布证书

> ①侧边栏找到Certificates进行创建

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ab8f13ad8d14b97b63a66c33f732117~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2860&h=1192&s=156626&e=png&b=fefefe)

> ②选择IOS Distribution (App Store Connect and Ad Hoc)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e53f0f41c01a4f39bec2c5d23fcc2dd5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2880&h=1580&s=383748&e=png&b=fefefe)

> ③上传刚才保存到本地的certSigningRequest文件，点击Continue

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23ae148eeb3442faa38110ffa5d625b2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2878&h=1202&s=163859&e=png&b=fefefe)

> ④然后点击Download下载cer证书

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/170aac5ad28d46d3820c286533b2db2f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2878&h=1228&s=199882&e=png&b=ffffff)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/550f7837f4984a75a1bc5b6c21badfe8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=242&h=254&s=86323&e=png&b=d267a0)

> ⑤双击证书添加到钥匙串访问

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5abc6290e2094eb0911df85f13df5174~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1754&h=1066&s=196678&e=png&b=342a34)

> ⑥右键导出证书

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f8605144273488e9b1915f1cdcd15f8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1800&h=1078&s=402773&e=png&b=352b35)

> ⑦选择导出的格式，为个人信息交换(.p12)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1875c50a661a45f49249347ebea8ef9f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2522&h=1174&s=1847662&e=png&b=262027)

> ⑧导出证书要设置密码

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/732f1288488040b59f33976369aaeae2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1738&h=1042&s=298133&e=png&b=352b35)

## 5.创建APP

> ①选择添加APP

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a856fdcedd54e3999b2ff20c0181e80~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1920&h=791&s=71343&e=png&b=fefcfc)

> ②填写app信息，app名称不区分大小写，如果名称被占用，可以先用其他替代，后面可以二次修改，等名称空出后，只需要在提交审核前修改好即可

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/206f14da07364272aa3fe85b7f9be914~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=600&h=696&s=29682&e=png&b=fefefe)

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

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a4efd2b6c2948c5bf438342867c68e8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1511&h=76&s=5913&e=png&b=fdfdfd)

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

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0516b85e68dc46799906885600129a96~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1613&h=717&s=90912&e=png&b=2a2b25)

> 然后点击HbuilderX的发行->原生APP云打包->ios(ipa包)->选择证书，输入导出证书时设置的密码，然后点击发布即可

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/decfcacf23e94dd4986903045a7896e6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=719&h=999&s=61874&e=png&b=fefefe)

> 发布工具的话，我自己用的是AppStore的Transporter工具，直接登录苹果开发者账号，然后选择刚才云打包生成的ipa包进行上传即可，如果你没有xcode的话，会提示你下载，如不需要选择暂不下载即可。
>
> Transporter:适合用H5套壳进行app上传，因为核心代码就下面这一行



![img](https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_868a5b79-b878-4ad3-be95-4fbb536f66f9.png)





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
