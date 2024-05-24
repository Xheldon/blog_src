---
layout: post
date: 2022-09-14 23:56:02 +0800
categories: tech
path: _posts/tech/2022/2022-09-14-my-home-network-2022.md
cos: 2022/my-home-network-2022
header-style: text
tags:
    - 技术
    - 网络
    - 拓扑
    - R4S
    - 软路由
    - 折腾
    - 旁路由
craft: https://www.craft.do/s/VBvWQcki9SRbLS
callout: 有限的预算下尽量满足自己的需求是折腾的乐趣之一。
title: 2022 我的家庭网络拓扑结构
sha: ad96a11c077667c1d5ef6c997788adde19083617
lastUpdateTime: 2022-09-20 21:46:47 +0800
---

## 前言

在预算有限的情况下，尽可能满足自己的需求是折腾的乐趣之一；换句话说，有钱当然可以直接买最好的，性能过剩不要紧，最重要的是要能覆盖目前用不到但将来可能用到的一些使用场景。

这里简单分享下本人在折腾网络过程中的一些记录和心得，当然主要还是为了在媳妇儿发现我花了钱但是家里的网并没有很好用的时候，我就把这篇文章甩给她，让她自己看钱花到哪儿而写的。

## 网络拓(tuo)扑(pu)图

废话不说，直接上图： 

{% render_caption caption="家庭网络拓扑图" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/7FB3F86F-60A4-4E21-BFFC-E399977692A2_2.png" %}
![家庭网络拓扑图](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/7FB3F86F-60A4-4E21-BFFC-E399977692A2_2/HtJOvmcIUN9zZrES981NEzgzVzTPj4Oda5ojpGeA5p4z/7FB3F86F-60A4-4E21-BFFC-E399977692A2_2.png)
{% endrender_caption %}

我的需求是： 

1. 有网口或对网络要求高的，尽量连有线。如 PS5、Switch、Mac Studio 等，毕竟有线更稳定和快速。无线再快、5G 再快，空间传输的损耗也比有线大得多。

1. 已连接路由器的设备不要再次连接，如各种智障家居、电视手机等，因为太麻烦了（十几个设备一个一个输入密码要死了）。

1. 主机如 Switch、PS5 等，需要使用 UU 加速器联网，且这些主机设备没有翻墙需求。

1. 智能设备如手机、iPad、电脑自带翻墙软件，无需翻墙环境。

1. Apple TV 也没有看 NetFlix、YouTube 的需求，因此也无需翻墙环境，只需要访问阿里云盘服务和外接硬盘资源即可。

因为有光猫和路由的存在，因此有两个网段，光猫是 `192.168.1.x` ，而路由器是 `192.168.5.x` ，两个网段设备不互通。

下面按上图的设备顺序说一下细节。

## 网络连接

### 互联网 → 光猫

**花费：149元/月（宽带费用）**

联通融合宽带 500M 光纤入户，宽带和手机号绑定，融合宽带的意思即手机不停机宽带就一直用，只是需要每年存 1000 块，然后按月返还。另外还送了一条 500M 的宽带让我卖给同事回回血了。办宽带的时候还送了个 WiFi 6 的 中兴路由器，网上查了查 200 块左右，还算稳定，所以一直用着。

### 光猫 → 路由器

**花费：0**

路由器就是上面说的，办宽带送的。网上很多人说不建议使用光猫拨号，让用路由器拨号，这样可以省下来一个网段，而且光猫的性能显然没有路由器强。不过这些场景都是需要万兆宽带的大佬才搞的，我是觉得没必要，而且多一个网段刚好可以把一些需要直连的智障设备隔离开，索性就没搞了。更何况送的路由器也没有很好。

## 光猫 → 无线设备

有些智障硬件，走复杂网络的时候会出现无法连接的情况，如 360智障看家相机，因此这里我没有关闭光猫的无线功能。光猫的无线也可以在网络出问题的时候作为一个检测手段，来看看是路由器的问题还是光猫的问题。

## 路由器 → 多个设备

路由器只有四个网口，我曾经在京东搜过目前流行的路由器，发现都是最多只有四个网口。因此，路由器除了连接光猫、连接 R4S，就只剩下两个网口供设备连有线了，我选择把这两个口给 Mac Studio 和 PS 5。

### 路由器 → R4S

**花费：620元（满血R4S配置）**

R4S 使用旁路由的方式连接，这种非侵入式的接入方式比较符合我的需求。旁路由也即将 R4S 当成一个路由器下的设备，需要使用 R4S 中服务的设备如主机加速器服务，就把主机网络设置中的网关和 DNS 指向与它同网段的 R4S 的地址即可。

### 路由器 → PS5/Mac Studio

实测 PS5 连接有线比无线下载游戏快的多的多。而我的 Mac Studio，这么强的配置不得配个有线的网？

### 路由器 → 无线设备

剩下的就是一些无线设备，如手机、Pad、Apple TV、其他电脑、电视了，直接连 WiFi 即可。

## 细节说明

这里的细节主要是 R4S 的，因为之前使用旁路由的时候需要各种设置比较费劲，于是这里记录一下。

### 旁路由的设置

### R4S Wan 口变 Lan 口

**花费：79元（USB 转千兆网口线）**

因为 R4S 自带了两个网口，且作为旁路由使用，因此就浪费了一个 Wan 口，又得知其实它的 Wan 口和 Lan 口都是通用的，于是就简单设置了一下，将 Wan 口变 Lan 口了。关于如何将 R4S 作为旁路由的设置，见下面这个视频，讲解的比较清楚，按照视频一步一步设置即可： 

{% render_bookmark url="https://www.youtube.com/watch?v=w7rwNF2Q3lM&t=399s" title="软路由做旁路由三步搞定！openwrt软路由 R2S R4S openwrt软路由科学上网设置" img="https://i.ytimg.com/vi/w7rwNF2Q3lM/maxresdefault.jpg" %}
洋葱的淘宝店：https://shop58444096.taobao.com/ （R2S R4S软路由）软路由做旁路由三步搞定！openwrt软路由 R2S R4S openwrt软路由科学上网设置旁路由在软路由的使用方法里，也算是一种，不管是因为什么原因要做旁路由，它相比主路由和二级路由的设置来说，旁路由的确难...
{% endrender_bookmark %}

而 Wan 口变 Lan 口更简单，在 `网络-接口` 中的 `接口总览` 中，将 WAN 口删除，然后在 LAN 口中的物理设置中，勾选上 `桥接接口`，再将下面的两个物理接口 `eth0` （原 wan 物理接口）和 `eth1` （现有的 lan 物理接口）都勾选上，保存并应用即可。 

{% render_caption caption="删除WAN口接口" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/99893BE3-9853-4B8D-ACA6-A8F49ABD1040_2.png" %}
![删除WAN口接口](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/99893BE3-9853-4B8D-ACA6-A8F49ABD1040_2/c879sdpdUeTqwCYezU6SDUvAOVv26JtcvU7kUFIGU9Uz/WAN.png)
{% endrender_caption %}

{% render_caption caption="物理接口桥接" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/EDACBD7C-2FA3-4713-9090-DAEEBEA6E8E8_2.png" %}
![物理接口桥接](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/EDACBD7C-2FA3-4713-9090-DAEEBEA6E8E8_2/ay6QLbFrCFurGsHnxbN6moTzhUtt8g7CuLMLly3HfV0z/EDACBD7C-2FA3-4713-9090-DAEEBEA6E8E8_2.png)
{% endrender_caption %}

至此就大功告成了。我将 Switch 连接了这个 Lan 口，但是因为 Switch 并没有网口，因此使用的是 USB 转千兆网口，京东买的： 

{% render_caption caption="绿联USB转网口线" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/FE060576-56CF-45CB-8D48-73B03A392CAF_2.png" %}
![绿联USB转网口线](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/FE060576-56CF-45CB-8D48-73B03A392CAF_2/4DsiyXKxQh0KxsTd2wl5xyXJNcYoH5beheaNFTgkhXUz/USB.png)
{% endrender_caption %}

{% render_bookmark url="https://item.jd.com/100023032574.html" title="【绿联50922】绿联 USB3.0千兆有线网卡转RJ45网线接口转换头 适用苹果华为笔记本任天堂Switch外置网口扩展坞分线器转接器【行情 报价 价格 评测】-京东" img="https://item.jd.com/favicon.ico" %}
"【绿联50922】京东JD.COM提供绿联50922正品行货，并包括UGREEN50922网购指南，以及绿联50922图片、50922参数、50922评论、50922心得、50922技巧等信息，网购绿联50922上京东,放心又轻松"
{% endrender_bookmark %}

### R4S 装阿里云盘 WebDav

**花费：98元/年（阿里云盘服务）+ 9.9 美元/年 （Infuse 7 订阅）费 + 1399 元（Apple TV）**

不赘述，详见： 

{% render_bookmark url="https://www.xheldon.com/life/the-way-to-watching-tv.html#%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98" title="我的家庭观影之路 - Xheldon Blog" img="https://static.xheldon.cn/img/in-post/2022/the-way-to-watching-tv/photo-1440404653325-ab127d49abc1.png" %}
"为家人实现观影自由，也是一种幸福。"
{% endrender_bookmark %}

（如果访问速度慢，中文博客地址是上述域名 `.com` 改成 `.cn` 即可。）

### R4S装 UU 路由器插件

**花费：30元/月（UU 加速器费用）+ 599港元/年（PS 高级会员） + 30.6元/年（任天堂会员）**

买 R4S 的时候内置了该插件，如果需要可以自己装。但神奇的是我曾经因为执念而觉得官方的安装会更好，于是就把 R4S 内置的 UU 加速器插件删了，用官方的方式安装（官方安装方式不带 luci 界面）： 

{% render_bookmark url="https://uu.163.com/router/direction.html" title="网易UU加速器——玩出超快感，全球加速72小时免费体验" img="https://uu.163.com/favicon.ico" %}
"网易UU加速器（主机加速）专门针对PS4/PS5/Xbox/Switch游戏进行网络优化，基于网易公司20年技术沉淀，强力保障您在游戏时网络流畅。注册即送3天免费使用，解决游戏下载缓慢、对战掉线、联机卡顿等一系列问题，并提供了UU加速盒、路由器加速、手机热点加速等三种解决方案，一个账号多种选择！"
{% endrender_bookmark %}

但是加速效果很差（也可能是心理作用，毕竟我没有专业的测速和控制变量对比，只是感觉），于是怒重置 R4S 系统，重新用回了预装的带界面的 UU 加速器路由插件，感觉还不错。

{% render_caption caption="UU加速器路由插件" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/8C970209-06FC-4D2B-BAAC-9FA0A049C41B_2.png" %}
![UU加速器路由插件](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/8C970209-06FC-4D2B-BAAC-9FA0A049C41B_2/J8WAyOWxYJRMDG6ELuYRxFUcASca3iQsdLxyH2JHZiAz/UU.png)
{% endrender_caption %}

不过说是带界面的，其实也就一个开关🥲。

看下 Switch 的加速效果： 

{% render_caption caption="使用UU加速器前" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/B0B44A63-E971-4E65-A5BD-05C5F32C7168_2.jpeg" %}
![使用UU加速器前](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/B0B44A63-E971-4E65-A5BD-05C5F32C7168_2/ZyLaA9d7G3dNfeTTFTF46ktsyjbpHfhBoOps0eRljq4z/UU.jpeg)
{% endrender_caption %}

{% render_caption caption="使用UU加速器后" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/402B4436-D2F3-4353-BF06-A9F6D5225F9F_2.jpeg" %}
![使用UU加速器后](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/402B4436-D2F3-4353-BF06-A9F6D5225F9F_2/AYsj7yEeKrDIYLR5akxp3wHeJWxG3MyMkvkwSecnCxUz/UU.jpeg)
{% endrender_caption %}

可以看到加速的效果还是很明显的，玩喷射战士3和马里奥卡丁车8 一下午，只发生了 2 次连接失败的情况（喷射战士基本几分钟一局，打一下午有几十局）。

### R4S装 qBittorrent

不赘述，详见：

{% render_bookmark url="https://www.xheldon.com/life/the-way-to-watching-tv.html#qbittorrent" title="我的家庭观影之路 - Xheldon Blog" img="https://static.xheldon.cn/img/in-post/2022/the-way-to-watching-tv/photo-1440404653325-ab127d49abc1.png" %}
"为家人实现观影自由，也是一种幸福。"
{% endrender_bookmark %}

（如果访问速度慢，中文博客地址是上述域名 `.com` 改成 `.cn` 即可。）

## 翻墙服务

**花费：241元/年（忍者云） + 137元/年（AgentNEO）**

之前在 R4S 上用过翻墙服务，诚然可以让 Apple TV、PS5 等设备直接访问 YouTube，或者可以直接将主机相册内容分享到 Twitter，但是这些功能一个是并不是必须的，一个是在 R4S 上使用翻墙插件会与 UU 游戏加速器的 VPN 服务冲突（也许可以共存，但是我没折腾了），于是我就只保留了加速器功能，毕竟 YouTube、Netflix 等服务本来看的就少，而且也可以在电脑端看。

## 其他

1. 其实更多的是建议有线连接在路由器里面设置一下 IP 和 Mac 地址绑定，这样的话无论是加速器还是各种服务都是有好处的，防止断网等情况 IP 重新获得的时候有变更导致某些服务失败的情况，我懒得搞了。

1. 想让设备尽可能使用有线连接，可以将有线接光猫的 Lan 口。但是这有两个问题： 

    1. 我家的垃圾联通光猫型号是 `烽火 HG2543c1` ，只有一个千兆的口，接路由器了，因此即使用光猫的百兆有线，还不如路由器的千兆 5G WiFi 快。

    1. 光猫和路由器是两个网段（光猫的是 `192.168.1.1` ，路由器的是 `192.168.5.1` ）因此需要在光猫处设置一个静态路由表，才能将接在光猫 Lan 口的设备访问其下级路由器上的设备（如软路由），但还是因为联通光猫的原因，这款光猫并没有静态路由表的设置，捣鼓了半天尝试进入光猫的超级管理员界面（地址是 `http://192.168.1.1/CU.html` ，显示的是 `维修管理员账号` ，无果。打电话问联通的师傅得知： 

        1. 他们都用维修人员专用的 app 进后台，密码都是动态下发的，他们也不知道是否有维修管理员账号/超级账号，或许有，但是厂家并提供给他们。

        1. 如果我想做路由拨号、家里搞个服务器之类的功能，可以找他上门弄。

        1. 联通的光猫都没有静态路由表的功能，换个光猫也没用，想多接有线只能用交换机。

{% render_caption caption="维护管理员账户" img="https://static.xheldon.cn/img/in-post/2022/my-home-network-2022/81680F6F-4272-41F3-9F34-0D397717D5DF_2.png" %}
![维护管理员账户](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/E7555D1C-E907-4C64-8F39-DB4249C94DA9/81680F6F-4272-41F3-9F34-0D397717D5DF_2/hd8cyu00sbyjCBcygApeHg42VrWzlA3Hj391TIr1HZ0z/81680F6F-4272-41F3-9F34-0D397717D5DF_2.png)
{% endrender_caption %}

## 后记

我的家庭网络比较简单，没有复杂的 NAS、路由拨号、内网穿透、家庭影音的复杂功能，有的只是简单：理解简单、操作简单、排查简单，最重要的，让家人使用起来简单。
