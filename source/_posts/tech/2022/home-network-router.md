---
layout: post
date: 2022-11-15 23:38:20 +0800
categories: tech
path: _posts/tech/2022/2022-11-15-home-network-router.md
cos: 2022/home-network-router
header-style: text
tags:
    - 技术
    - 路由器
    - 折腾
    - 网络
    - 千兆
craft: https://www.craft.do/s/fqHF0RDZDOMCSS
callout: 家庭网络设备小白科普文
title: 家庭网络折腾之路由器
sha: 2beee469015e7f8ab767e0bfc3dc6624b9a692c9
lastUpdateTime: 2023-03-05 15:52:50 +0800
---

## 前言

花了一周时间研究了一下路由器，浪费的时间如果不记录一下就白白浪费了，遂有此文。

之前写过[ 我的家庭网络拓扑结构](/tech/my-home-network-2022.html)，当时使用的路由器是联通宽带送的中兴 WiFi6 双频，速度说实话也还可以，有线大概能到 500M，但是无线就比较差了，把路由器放到客厅，卧室信号就不满格，厕所干脆就没信号了，而且媳妇儿经常抱怨说淘宝、抖音，刷着刷着打不开（断流？）。因此想趁着双十一，考虑入手一款路由器。

## 我的需求

有了意向，第一步就是明确需求，我列了一下新路由器必须要满足的地方： 

1. 信号强。这也是这次换路由器的原因。

1. 5 个网口，且均为千兆+。家里对网速有要求的有 Mac、PS、Swtich，都必须插网线，再加上 R4S 软路由，这就四个网口了，因此路由器必须有第五个网口才能接光猫。

1. 稳定性（低可玩性）。因为已经有 R4S 软路由了，因此其他花里胡哨的功能如内置 UU 加速器、可刷 Openwrt 等路由器附加功能就都不是必须的了，甚至，可玩性高意味着价格高，可玩性高还意味着不稳定。

1. WiFi 6。这是趋势，就不多说了。

1. 500 以内的预算。

## 技术调研

基于以上需求，开始了路由器的研究。

虽然我是做技术的，但是并不懂网络硬件，所想图简单省事儿，看到同事买了个 AX3000， 于是我也想买个小米路由器。看了一圈京东上的各种宣传加上论坛、百科，了解了一些基本概念，下面用大白话解释一下： 

* AX NNNN，其中「NNNN」表示的就是无线速率，所以如果你在网上搜索AX3000、AX5400、AX6000，会搜出来各种不同的品牌，也就是说这并不是某一款路由器的型号，而是标识着速率、档位，数字越大，价格越贵。另外 AX 表示的是使用了 IEEE 802.11AX 技术的路由器，也叫 WiFi6 路由器。AC 表示的是使用了 IEEE 802.11AC 技术的路由器，也叫 WiFi5 路由器。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/DF84BD30-BBB9-4AD0-B78B-1F476F90E478_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/DF84BD30-BBB9-4AD0-B78B-1F476F90E478_2/6MKqN6cot9eUzL6frsNrKHXznfdIkT95qrbjs3fgqd8z/Image.tiff)
{% endrender_caption %}

* mesh 组网，基本就是局域网漫游的意思，就是你家比较大，300平（夸张了，100多平的时候也需要），一台路由器覆盖不完全，那就需要多台路由器，但是在不同的路由器之间进行切换的时候就需要先断开再连接，于是 mesh 组网应运而生。原理是多个路由器相互连接，数据共享，信号覆盖全面，因此你一开始连接其中一台路由器，然后走到另一台路由器的时候，网不会断。

* 2.5G/1G 网口，1G 就是 1千兆，表示这个网口能传输的最大带宽。目前家庭带宽普遍都是在500~1000以内的，太大的 10G 的网口仅存在于局域网的 NAS 传输，如果家里没有 NAS 需求等家庭影音需求，就没必要。

* 链路聚合，WLAN 口链路聚合，说是可以同时插入两条网线，比如同时插入两条 500M 带宽的联通宽带，然后网速可以叠加；LAN 口链路聚合同理，我没这个需求，没研究。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/1F612049-D1F1-4678-B7F3-A57C939B0CF8_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/1F612049-D1F1-4678-B7F3-A57C939B0CF8_2/8sfVHnjITPYmgL3Loy49YE0VyMBjEyIf82GlGcu0Wokz/Image.png)
{% endrender_caption %}

* 双频，就是 2.4G 和 5G 频段同时存在，5G 这么快为啥还需要 2.4G 呢？是因为有些旧设备和智能家居只支持 2.4G。

* 160MHZ 频宽，WiFi6 才有的这个东西，说是更快，之前都是 80MHZ。我看了下中兴的那款，确实 5G 也才到 80MHZ，越大越好。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/86D19FCB-F1F2-4F41-801A-39376CEA0F8C_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/86D19FCB-F1F2-4F41-801A-39376CEA0F8C_2/wR7Gc360LGxeSjUJtCTxw5cegxd8PWYzdRPA14Py9Bsz/Image.png)
{% endrender_caption %}

* 4K QAM，没明白什么鬼说是能加快下载速度，但是目前说是只有小米手机有 20% 的提升，其他手机都不支持。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/557A4571-8D26-4562-9EBD-8DA7A2F3E560_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/557A4571-8D26-4562-9EBD-8DA7A2F3E560_2/Xg6cGyLGG3c6xPtN4KWKxseg9lwShE3d4JyGxWV73rIz/Image.png)
{% endrender_caption %}

* OFDMA 和 MU-MIMO，不知道什么东西，说是能降低多设备打游戏的延迟，奇怪的是 TP-Link 的这个选项默认是关闭的。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/E6B29FAB-C3A7-4930-A5C1-A3FDBCE0329D_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/E6B29FAB-C3A7-4930-A5C1-A3FDBCE0329D_2/eTnRDh4oq4pzUGntsE9lSfDb2ChGn8JhYrx99XFW9Yoz/Image.png)
{% endrender_caption %}

* 多核，说是核越多越好（不是废话嘛），提高加解密的速度，咱也不知道，问了大佬的意见，高通的芯片方案就比较成熟，别用什么博通、联发科的方案，都是垃圾。

* 信号放大器，顾名思义，说是能放大信号用的。

* 1G 超大内存，基本上内存大就表示可玩性强，因为内存大了，就可以变着法儿的折腾了，比如刷 Openwrt 机之类的，有些路由器只有 16M 内存，不存在可玩性（说的就是 XDR5480）

* USB 3.0 接口，路由器要 USB 接口，用来连接外置硬盘的，搞什么家庭文件传输。

* 内置游戏加速器，基本都是跟网易 UU 合作，内置了游戏加速插件，可以在 Switch、PS5 联机的时候加速，不用单独再像我一样用软路由搞加速器了，本质是 VPN。

* 主动散热，就是加了个风扇，被动散热，就是啥也不加，散热靠天意。

* IPV6，基本没用，路由器有这个功能也建议关闭，没普及的技术等于没有。

* 回程，分有线回程和无线回程，mesh 组网需要的东西，说是用来提高传输效率和稳定性的，不懂。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/07ECFB04-C903-48AA-99D2-8835968488D2_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/07ECFB04-C903-48AA-99D2-8835968488D2_2/fHFbOYtR2sSi6U2v4Mo6w5ROIsqUajl0VqfRxRXyLtcz/Image.png)
{% endrender_caption %}

* 多频合一，就是 2.4G 和 5G 合为一个网络信号，设备连的时候先试试支不支持 5G，不支持就让它连 2.4G，这个看了一圈，都建议不要开，开了的话一些智障家居用不了。

## 技术选型

OK，以上是路由器购买的时候，商家宣传的一些内容，对于我来说实际是按我的需求来买的，对比了其他的路由器后，我买了TP-Link XDR5480，买它的时候有以下考虑：

* 其实一开始是想买小米的，看了一圈它都是所有产品中相同价位用料最足和相同用料价格最便宜的。但是最后没买的原因有： 

    * 鸡贼，旧的型号是 AX3600，下架了，说是搞了个 AX6000 的升级版，然后被人拆解后发现用料还不如 AX3600。

    * 只有四个 Lan 口，而且它的四个 Lan 口是共享的千兆的，离谱。加上小米的产品的其他尿性，当场放弃。

    * 可能是因为销量太大，因此我在各大平台上都看到有人说断流之类的，加上我同事买的 AX3000，也说有这个现象，但是他不确定是他家的网的问题还是路由器的问题，我秉持着宁可不买不可买错的原则，不买了！

{% render_caption caption="对比上一代同定位机型硬件" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/6AEAAF56-6280-4259-9379-766209C1DF02_2.webp" %}
![对比上一代同定位机型硬件](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/6AEAAF56-6280-4259-9379-766209C1DF02_2/vUzoepkmLKZ7pZipXhXk7ASxTLwCal5jXi6HnfC0Fnkz/Image.png)
{% endrender_caption %}

* 再然后问了同事，他用的是传说中的华硕 AC86U，在 WiFi5 时代很能打，口碑不错，一个是因为华硕就是专业做路由器的，并不是像某些厂家贴牌代工之类的。另一个是因为华硕一般出品的都是高端路由器，上千的那种，所以给人一种很吊的印象，再加上其路由器可玩性很强，可以刷梅林、刷 Openwrt，因此由专业玩家圈传出来的口碑还是不错的。但是我最终没买的原因有：

    * 贵。

    * 可玩性太强，我不需要可玩性，因此由于可玩性而带来的附加缺点「贵」，就成了最大的障碍。

{% render_caption caption="华硕" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/EE73309D-B6BE-4E40-ACD5-4742D1EAD1A4_2.webp" %}
![华硕](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/EE73309D-B6BE-4E40-ACD5-4742D1EAD1A4_2/H5Q0CnTOoyuGlbK2xkRLvkRmaxqfqyC4Log9Vgj3FjUz/Image.png)
{% endrender_caption %}

* 后来逛各种帖子的时候，如 V2EX、acwifi 等，经常有人在推 xdr5480，而且我研究了一圈，决定下单了，原因如下：

    * 我特意搜了一圈，很少有看到说有问题的。

    * TP-Link 老牌子了，之前都说他做低端市场，然后出 5480 是想打个翻身仗，因为该机器的 CPU 一般都是上千元机型上才有的，性能很强，而且 5G 信号非常强。

    * 可玩性低，可玩性低就表示稳定，我正需要的就是稳定。

    * 除了四个千兆 Lan 口外，额外带 SFP 接口，可以买猫棒直插光纤，或者当 2.5G 网口使用。

    * 不到 500 的价格，在预算以内。

    * Lan 口可以作为 IPTV 口用，也就是说可以扔掉光猫了（当然我没这么做）。

买！

{% render_caption caption="买贵了，后来价格保护了 60块" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/FB076D86-7E45-49B9-83BB-6930571BD834_2.webp" %}
![买贵了，后来价格保护了 60块](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/FB076D86-7E45-49B9-83BB-6930571BD834_2/yzyhlYThMnMajJMOeJT13k6vBu6SkG4BK5atD0lvqpgz/Image.png)
{% endrender_caption %}

## 继续折腾

路由器到手之后，打开界面看了下，确实没什么好折腾的。不过这么强的路由器，什么也不做太可惜了，于是又开始了捣鼓。 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/210C2B71-DA81-4D73-A064-21F90B814979_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/210C2B71-DA81-4D73-A064-21F90B814979_2/fc7a4eHd3jRr3JvSzpGJpVXShakzLjiwdOuZCaxy0GQz/Image.png)
{% endrender_caption %}

当前我的网络拓扑结构是，光纤入户插光猫，光猫是一级路由，然后分出来一个二级路由也就是现在买的这个 TP-Link 路由器，家里的设备都接的是 TP-Link 的无线/有线，但是仍然打开了光猫的 WiFi 功能，以便于网络故障的时候，可以连光猫的 WiFi 用来排查是路由器的问题还是光猫的问题。

另外因为我没有路由翻墙的需求，因此将光猫的另一个千兆口（光猫有两个有线口，一个接二级路由了），接了索尼的电视，在上面装了安卓 TV 版的 Clash 看 YouTube，这个操作后来证明是很明智的，因为折腾路由的时候，可以保证电视是一直可用的。

## 光猫-路由器连接方式

### 名词解释

#### NAT 地址转换

设备直接连接公网不行吗？为什么要NAT 地址转换呢？简单来说它存在的原因是，就是 IPV4 地址有限，因此运营商不会给你每家一个 IPV4 地址，所以你家里的上层网络其实还是个局域网，只不过是运营商的局域网。从你的设备发请求，请求经过路由器到光猫，需要一层 NAT 地址转换，然后从光猫到运营商的服务器又是一层 NAT 地址转换，但其实路由到光猫的这层转换这个过程是不必要的，下面说。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/AB32DBA7-416B-4D17-B135-C603F6879C2D_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/AB32DBA7-416B-4D17-B135-C603F6879C2D_2/FTywTCbQ10CTRDuiyRyfEev8FOgLRsJR3kdya3trxlIz/Image.png)
{% endrender_caption %}

#### 网段

ipv4 中有四段（所以叫 v4），倒数第二个段不同即为不同网段，如 `192.168.1.1` 和 `192.168.0.1` 其中倒数第二段一个是1一个是2就是不同网段，不同网段之间不能直接互相访问。

#### DHCP

就是动态分配 ip 的服务，一个网段只能有一个这个服务，否则会冲突导致上不了网。

### 光猫路由-路由器路由

这个就是普通的默认模式，光纤插光猫，从光猫的 Lan 口出来一根线插路由器的 WLAN 口，形成一二级路由。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/E0465A42-43AC-4158-8D21-FDDD9A007089_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/E0465A42-43AC-4158-8D21-FDDD9A007089_2/cM1Z4P5NZAxGQmdNAqyYJTIV3M6KlTucneXMHD7RFPMz/Image.png)
{% endrender_caption %}

优点：

* 简单，不需要任何设置。

缺点：

* 设备需要两级 NAT 地址转换才能到公网，会造成不必要的延迟。

### 光猫路由-路由器 AP 

就是将路由器当做光猫的信号放大器，可以将多个网络连接起来，可以两两连接。

优点：

* 简单，简单设置一下即可。

缺点： 

* 光猫负载大，需要承担拨号、DHCP、NAT 等功能，浪费了路由器的性能。

### 光猫路由-路由器桥接

跟 AP 模式差不多，也是用来放大光猫的信号的，其可以将多个网络连接起来，但是不能两两连接。优缺点同上。

### 光猫桥接-路由器拨号

就是光猫只作为光纤入户后，光信号转换成电信号的设备，其他的所有任务都交给性能更强的路由器。这也是我目前使用的方案。

优点： 

* 性能差的光猫只负责光电转换（就是上面说的 SFP 猫棒的作用），不做其他作用。

* 家庭网络里面只有一个网段，方便管理。

* 通过申请公网 ip，加上路由器的端口映射（一般路由器都有这功能）方便外网管理局域网设备和软路由应用。

* 只有路由器一次的 NAT 地址转换，延迟更低，带宽跑满。

缺点：

* 略麻烦，需要找运营商改光猫的配置，如果像网上一样自己悄悄改完了，运营商会自动下发配置改回去，需要一点点网络基础。

### 路由器直插光纤

这个就需要上面说的 SFP 猫棒了，可以直接插到这个猫棒上，然后猫棒插入路由器的 SFP 口，让路由器既做光电转换，又拨号。但是据说这样做的话，SFP 会很烫，而且把风险都集中到一台设备上不合理，于是我没有这么做，因为：可以，但没必要。另外需要注意的是，据说 XDR 5480 这台设备只能用 TP-Link 自己出的猫棒，网上买的华为的猫棒不能用，不知道真假。猫棒也分 2.5G 和 10G（万兆）的，越大越贵。

{% render_caption caption="SFP 光口（猫棒）" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/7E5DC73E-42DB-40C0-992E-3252AB123DDB_2.webp" %}
![SFP 光口（猫棒）](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/7E5DC73E-42DB-40C0-992E-3252AB123DDB_2/z81Szf0FnRM4zR9Drf2j2MDg3NUyTcRG3lbagWip9Xsz/Image.png)
{% endrender_caption %}

{% render_caption caption="SFP 电口" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/C043F804-0595-4202-8BC1-72B5CE413FE1_2.webp" %}
![SFP 电口](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/C043F804-0595-4202-8BC1-72B5CE413FE1_2/1KVxzVyxW9TVHLDhI3eHzQhUxN37I9MnjFSCwl9Nfawz/Image.png)
{% endrender_caption %}

### 如何让路由器拨号？

坐标北京联通。网上搜了一堆的帖子，都是比较旧的，当时还是可以找联通师傅要光猫的超级密码来修改光猫的配置，让其从路由模式变为桥接模式。

还有的地区，死活不让光猫桥接。

但是现在都 2022 年了，于是我打电话跟联通，以下是对话：

> 我：你好，我家宽带需要公网 ip。<br>客服回复：好的稍等，我给您转接技术专家坐席。<br>技术专家：你是要公网 ip 吗？<br>我：是的。<br>技术专家：好的，我这边后台给你改一下，十分钟后你重启一下光猫就可以了。<br>我：好的谢谢。

完事儿。

改完了公网 ip，还要让光猫改桥接（忘了一起给人说了），于是我又给客服打了个电话：

> 我：你好，我家的光猫想桥接，我应该怎么做？<br>客服：我给您约了维修师傅上门，明天八点半前联系您。<br>我：你们不能直接后台操作，然后我这边配置一下吗？必须要师傅上门吗？<br>客服：是的。<br>我：好的。

第二天，师傅联系我：

> 师傅：你是想改桥接是吧？<br>我：是的，想外网访问局域网的设备和服务。<br>师傅：行，你等会儿，五分钟后我让后台给你改，我这边配置下发就行。<br>我：您不用上门吗？<br>师傅：不用，有什么需要我上门的吗？你要搞桥接肯定懂这个呀，自己操作就行了。<br>我：我虽然懂，但是光猫上的一些设置不需要你们来操作吗？<br>师傅：不用，后台配置下发就行，光猫都不用重启，你就在路由器填光猫里面的那个宽带账号和密码就行，我这边配置改完了再联系你。<br>我：好的。

两分钟后，师傅联系我说，好了，于是我就直接在 TP-Link 的上网方式里面，选拨号上网，然后输入宽带账号密码拨号即可。宽带账号密码不知道的问联通师傅给你查，也可以进光猫查看，虽然里面的密码加密的，但是有 F12，改 input 元素的 type 即可，问题不大。

{% render_caption caption="配置界面" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/ACC3C6BD-1248-48E4-A418-CE9EDAB86924_2.webp" %}
![配置界面](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/ACC3C6BD-1248-48E4-A418-CE9EDAB86924_2/fIxLRvNyxiqGNsUX9HFjvqo9I8KTDpvNhisfG11slgoz/Image.png)
{% endrender_caption %}

## TP-Link 的简单玩法

DDNS + 端口映射是唯一可以玩的，不过对我来说已经足够了，因为我有 R4S，在外网通过端口映射和 TP-Link 自带的 DDNS 服务，访问 R4S 的界面和其上的各种服务，非常方便。以下是 TP-Link 的设置。

### DDNS

原理示意图：

{% render_caption caption="示意图" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/6EF8D96C-F524-4208-9C6D-654ED16C6E5B_2.webp" %}
![示意图](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/6EF8D96C-F524-4208-9C6D-654ED16C6E5B_2/3fTxSGD5sLFbmrRJQm93Uy7Rt3h2amayi5JcdCZGJLgz/Image.tiff)
{% endrender_caption %}

公网 ip 有了，但是运营商给你家宽带的 ip 地址并不固定，每次访问都要查 ip，如何方便的访问呢？答案就是 DDNS。路由器肯定知道你家的公网地址，然后再在路由器内将一个域名跟这个地址绑定一下，每次访问这个域名，就是访问最新的你家宽带的公网地址。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/C0057015-EBE9-4C59-A281-BFDE21E4FB28_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/C0057015-EBE9-4C59-A281-BFDE21E4FB28_2/66zGrmGQgYwJ0Mj7HWRTWvAywe9IhzQt2CCGvi9mgkIz/Image.tiff)
{% endrender_caption %}

参考：  

{% render_bookmark url="https://service.tp-link.com.cn/detail_article_2444.html" title="[云路由器] TP-LINK DDNS动态域名的使用方法 - TP-LINK 服务支持" img="https://service.tp-link.com.cn/favicon.ico" yid="" bid="" %}
https://service.tp-link.com.cn/detail_article_2444.html
{% endrender_bookmark %}

### 虚拟端口映射

示意图：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/A55C6EDD-239D-4B07-9B1D-2F1255FB42FF_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/A55C6EDD-239D-4B07-9B1D-2F1255FB42FF_2/0n8DuqKRv4ecUgEHjc62ZyRWgeGcYYzOC7tWXZPtHakz/Image.tiff)
{% endrender_caption %}

运营商为了安全，给你的公网 ip，一般是会封掉 web 服务常用的 80、8080 端口的，而且内网离会有多个服务分布在不同的端口，因此你需要端口映射，即从外网访问的端口，映射到内网中的端口，设置如下：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/F9B87721-ED75-4A54-8BDC-E97D98C27373_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/F9B87721-ED75-4A54-8BDC-E97D98C27373_2/bM9zVFUkDXyvDR2fJdAaObzSU2ISQe00BfUxldeBQp8z/Image.tiff)
{% endrender_caption %}

参考： 

{% render_bookmark url="https://service.tp-link.com.cn/detail_article_2441.html" title="[云路由器] 如何映射服务器到外网 - TP-LINK 服务支持" img="https://service.tp-link.com.cn/favicon.ico" yid="" bid="" %}
https://service.tp-link.com.cn/detail_article_2441.html
{% endrender_bookmark %}

效果：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/E071C9FF-3F98-4883-9E58-C137BD1A916C_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/E071C9FF-3F98-4883-9E58-C137BD1A916C_2/kpHg4jWiCeXuKzoBWgwXTbjcYRE2wxX4CP9wwnyZy64z/Image.png)
{% endrender_caption %}

## 实际应用

目前用到的有 qBittorrent 下载、FileBrowser 文件管理、Aria2 下载，阿里云盘我没有开放端口，因为毕竟只有在内网访问的需求: 

{% render_caption caption="qBittorrent用来bt下载" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/3484C433-2CA9-471C-9DBC-84A2B124DCA6_2.webp" %}
![qBittorrent用来bt下载](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/3484C433-2CA9-471C-9DBC-84A2B124DCA6_2/rIWItU8fZnl0Cum9BRxD8I7MrrMJsUALM2EbMZ7cPMkz/Image.png)
{% endrender_caption %}

{% render_caption caption="有了FileBrowser可以抛弃网盘了" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/57B2FF81-7BEA-414B-B72F-12E30F4692C1_2.webp" %}
![有了FileBrowser可以抛弃网盘了](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/57B2FF81-7BEA-414B-B72F-12E30F4692C1_2/1ZkeZnyWyOeV7WRMIjmHKqTUYCUxO7rsFpJPyxyN9dMz/Image.png)
{% endrender_caption %}

{% render_caption caption="Aria2下载工具" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/DAB8FBBA-A635-45AD-AA0E-B8DE4F132D71_2.webp" %}
![Aria2下载工具](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/DAB8FBBA-A635-45AD-AA0E-B8DE4F132D71_2/M2D4frW4iNlTapPhzkCBMOmIujFzEF4XEooJnmbdZSUz/Image.png)
{% endrender_caption %}

Aria2用来普通下载，可以代替 Chrome 浏览器默认的下载工具，多线程下载快的不是一点半点，相同资源对比： 

{% render_caption caption="Aria2下载速度" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/8B1970F4-35B8-44A3-90A6-F9D94BA3A977_2.webp" %}
![Aria2下载速度](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/8B1970F4-35B8-44A3-90A6-F9D94BA3A977_2/JWMQK5nYReyhaxnM9AzGxRFM6fHAky0jEKIsoqHMEVIz/Image.png)
{% endrender_caption %}

{% render_caption caption="浏览器下载速度" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/E8B6B0AE-F316-4E7C-B0F6-45E68EFC02E0_2.webp" %}
![浏览器下载速度](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/E8B6B0AE-F316-4E7C-B0F6-45E68EFC02E0_2/Jjr1fQSeq9ehJ4xIV5lXUudmx9xpQnwtcYwyvcyzTWsz/Image.png)
{% endrender_caption %}

日常使用场景就是，媳妇儿让我下载的东西我下载好后，通过 FileBrowser 的分享给她，还可以设置分享链接有效期，非常方便： 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/home-network-router/D2560A89-D1C2-4208-AB08-D63DB4FC2492_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/58230060-2B90-4171-8E9A-B9A624CB2857/D2560A89-D1C2-4208-AB08-D63DB4FC2492_2/r0w0aJ7iCKkUrIZmIghC5xP2ZZqJ9rl69qEIAXLL1Hsz/Image.png)
{% endrender_caption %}

## 结束语

网络拓扑的知识真的挺有意思的。在互联网刚诞生的阶段，谁也不会也想不到互联网会发展成如今的样子。而每个系统都是从简单，到复杂；从低等，到高等一步步发展来的，因此你可以在一些简单的设备中，发掘到在互联网设计之初，设计者们是如何思考的，然后遇到了什么问题（比如 ipv4 枯竭和对应的解决方案 NAT 地址转换技术），然后他们是如何解决的，如果是你的话，会如何解决呢？非常有意思。


