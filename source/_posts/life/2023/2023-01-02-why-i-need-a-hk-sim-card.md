---
layout: post
date: 2023-01-02 23:25:48 +0800
categories: life
path: _posts/life/2023/2023-01-02-why-i-need-a-hk-sim-card.md
cos: 2023/why-i-need-a-hk-sim-card
headerMask: 0.4
tags:
  - 生活
  - 苹果
  - 手机卡
  - 折腾
  - 服务
craft: https://www.craft.do/s/SnnmzvXIHX4Gsv
callout: 简单介绍一下我要搞一个香港手机号的理由
title: 为什么我要有一个香港手机号
headerImg: https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/photo-1603515161074-3206aaeb03f2.webp
headerImgCredit: James Yarema / Unsplash
headerImgCreditHref: https://unsplash.com/@jamesyarema?utm_source=xheldon_blog&utm_medium=referral
sha: d2e141c69491374d46316cc47c1eae7ea3ea4a38
lastUpdateTime: 2023-01-05 11:46:19 +0800
---

因为一些众所周知的原因，国内的苹果 app store 商店有些软件是无法下载的，同时，大陆地区的苹果服务如 Apple TV、Apple TV+、iTunes Store、Book Store、Apple One、Apple Arcade、Apple News 都是没有的，而 Apple Music、Apple 播客、iCloud+ 的服务也是阉割版的，因此**这是我想要一个国外手机号的直接动力**，但是国外的 app store 的充值付费并不像想象中的简单，通常情况下你都需要当地发行的信用卡来绑定消费。也就是说你不能使用大陆的信用卡来绑定美区的 app store，而又在通常情况下，都需要一个当地的手机号来完成这个操作，甚至只需要一个当地的手机号就可以直接 app store 付费而不用绑定信用卡，下面就来介绍一下我了解的相关情况。

## 美区

我在上大学的时候刚使用 iPhone 5 就很有先见之明的申请了一个美区账号，专门用来下载一些特定的 app。当时美区账号在申请的时候还不需要绑定支付方式（好像现在也不需要，只要有美国 ip 就会出现支付方式为「无」的选项）。但是美区账号付费略微有点不爽，一般有以下几种方式：

1. 购买美区 app store 礼品卡。

1. 使用美国的 paypal 绑定 app store。

1. 淘宝代充值

1. 美国信用卡绑定 app store。

其中，第四种方式如果你不在美国的话，基本不可行，研究发现可以申请某个银行的「虚拟信用卡」（此方法在香港也可行），但是这种方法一个是有风险，一个是需要其他额外的条件，我没研究就放弃了。

### 礼品卡

最简单的是礼品卡，据我所知目前仅有美区和日区的 app store（购买软件、Apple Music、订阅等服务用的充值卡）和 apple store（用来购买苹果硬件如手机、Mac 等的礼品卡）的礼品卡合二为一了，其他地区大部分情况下仅线下售卖 app store 充值卡，而线上售卖 apple store 礼品卡。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/3DFA0791-B39B-4280-A736-5823D641A1CE_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/D5C77239-58D7-44C3-91DA-EA6E245C4840/3DFA0791-B39B-4280-A736-5823D641A1CE_2/Gfru4hJ7yL3UthXLEnmaIHVoKaB5TXay7df61AFw5d0z/Image.png)
{% endrender_caption %}

因此，你可以直接使用大陆地区的信用卡来购买美区 app store 的礼品卡为美区账号充值。

{% render_bookmark url="https://www.apple.com/shop/gift-cards" title="Apple Gift Card" img="https://as-images.apple.com/is/og-default?wid=1200&amp;hei=630&amp;fmt=jpeg&amp;qlt=95&amp;.v=1525370171638" yid="" bid="" %}
The all-new Apple Gift Card for everything Apple: products, accessories, services and more. Replaces the Apple Store and App Store & iTunes gift cards.
{% endrender_bookmark %}

### 美国 paypal

美区 paypal 也是一种曲线救国的方案，因为你可以将大陆发行的信用卡绑定美区 paypal，然后美区 paypal 绑定美区 app store，底层路基是 app store 将支付风险转移给了 paypal。但是此种方式有个问题是，paypal 风控非常严格:

首先，美区 paypal 注册的时候你需要使用一个固定的美国 ip，然后无需验证手机号即可注册+绑定大陆信用卡成功。但是一旦你登录 paypal 的账号 ip 发生了变化，或者检测到多个账号都使用过你当前使用的美国 ip（如万人机场，这点还是用自建 VPS 访问好点），或者一些玄学的原因，它都会要求你提供一个可以验证的手机号。

而我以迅雷不急掩耳的速度将大陆的信用卡绑定美区 paypal 成功之后再绑定美区 app store 账号成功，然后在 30 分钟后再次登录 paypal 账号，它就提示我发现风险让我验证手机号，我没验证，过了两天后发邮件给我说帮我重置了密码，现在我如果想重置密码就需要一个手机号，因此此账号基本是作废了。

然后，这里并不是一个简单的 textnow、google voice 或者任意的接码平台给的美国虚拟手机号就是可以的，paypal 会准确识别你的手机号是否是一个虚拟手机号（就是美国的虚拟运营商提供的手机号），然后拒绝你的验证。

最后，你除了购买一个美国实体手机号以供验证之外，没有其他办法。但是买个美国实体卡即使是最便宜的那种也价格不菲而且没有必要——仅仅是为了支付 app store 就付出这么高的成本是不可接受的，于是放弃了此种方案。

{% render_caption caption="Paypal 要求我重置密码" img="https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/80A27913-FEAC-4FE6-AAEF-5CCE0E862CCC_2.webp" %}
![Paypal 要求我重置密码](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/D5C77239-58D7-44C3-91DA-EA6E245C4840/80A27913-FEAC-4FE6-AAEF-5CCE0E862CCC_2/gjX0eA7IpjuBNGuEOLixWU9oOL91Wkfx8E20LvFgCyYz/Image.png)
{% endrender_caption %}

### 淘宝代充值

这个方法严重不推荐，因为淘宝商家提供的便宜充值，比如充 100 到账 200 等，有很大可能是盗刷美区信用卡的黑卡，一旦被挂失、被发现，你的账号充值就有很大可能被封。

以上就是美区支付的方式，但是这仍然是有风险的，具体可以查看 v2ex 站中的各种无缘无故平稳用了几年的美区账号被封而且无法解封的案例。

考虑到各个区的支付便捷度和语言方面的原因（具体对比可以看这篇）：[订阅 Apple Music 该选哪个区？——中美坡港台日六大地区全对比（第二版）](https://steppark.net/16357088669226.html)

最终，我选择了港区。

## 港区

香港虽然离大陆近，但是其 app store 依然不能绑定大陆发行的信用卡，而且相比于美区的 app store 和 apple store 礼品卡二合一网上购买充值这么简单的充值方式而言，居然还难上了不少。

总的来说港区有以下几种充值方式：

1. 手机账单绑定 app store。

1. 信用卡绑定 app store。

1. AliPayHK 绑定 app store。

1. 礼品卡充值。

下面单独说说。

### 手机账单

说简单点就是使用手机话费绑定 app store 消费，就相当于是把手机号当成了一个储值卡，提前充好话费，然后在 app store 绑定该手机号即可在消费的时候扣手机话费。

### 信用卡绑定

同美区，中国大陆的信用卡不行，需要香港地区发行的信用卡。

### AliPayHK

以前这种方式是可行的，类似于美区 Paypal，也即 app store 绑定 AliPayHK，然后 AliPayHK 再绑定中国大陆信用卡，但是不知道从什么时候开始，AliPayHK 不能绑定大陆的信用卡了，于是该方式不再可行。

### 礼品卡

香港的 app store 礼品卡只在线下售卖，如 711 等，线上只售卖 apple store 礼品卡。淘宝购买的港区 app store 我担心有黑卡，没敢买怕封号。

综上，我把一直使用的美区账号转移到了港区，然后买了一个手机号，使用手机账号绑定 app store 付费。

这里仍然有一些点需要考虑的。

## 最佳性价比

首先，买一个香港号并不像想象中的容易（当然也没有想象中的难），现在在香港地区本地买的话都需要实名，也即需要香港身份证；如果是大陆人的话，就需要港澳通行证，因此你需要首先办理一个港澳通行证，这是基础门槛，没有的话就别想了。香港要求在 2023 年 2 月 23 号之前需要全港的手机卡完成实名认证，过期就不能用了。

{% render_caption caption="ClubSim 的实名认证提示👆🏻" img="https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/667714C6-E2DD-403D-9995-BC93E796C9D1_2.webp" %}
![ClubSim 的实名认证提示👆🏻](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/D5C77239-58D7-44C3-91DA-EA6E245C4840/667714C6-E2DD-403D-9995-BC93E796C9D1_2/MeW11NeU9MHklhBJ2YkQ6ByGViPFHBIANoWxwxqf1nUz/Image.png)
{% endrender_caption %}

其次，如果你在各个香港手机卡售卖网站如中国移动香港、中国联通香港、3HK、Clubsim 等网站浏览下单的时候就会发现，他们快递只会配送到香港地区，不提供发货到中国大陆的方式，因此你要么选择转运（不划算，毕竟东西小，而且 _可能_ 存在被海关扣押的风险），要么选择淘宝。我选择了后者。

既然这样，那目的就明确了：挑选一款性价比高的手机卡。研究了一番之后，有以下选择：

- 中国移动鸭聊卡，月租忘了，很便宜，但是淘宝买不到了。

{% render_caption caption="鸭聊卡" img="https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/7856CE83-CF3E-432E-8609-8E2300F9321D_2.webp" %}
![鸭聊卡](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/D5C77239-58D7-44C3-91DA-EA6E245C4840/7856CE83-CF3E-432E-8609-8E2300F9321D_2/5K3Q0Z9QO0YjHsVbxF7nnDtG72avhEuWMb2DY5XW7EEz/Image.png)
{% endrender_caption %}

- 中国移动万众卡，万众卡是一个系列，类似与神州行、动感地带等，最便宜的月租 2 块港币/月的月租，按使用量付费。但是搜了一圈淘宝，要么买的是二手回收号（就是别人用过的回收号，这种号可能被别人绑定过一些网站如 AliPayHK，因此有很大几率不能绑定一些服务，慎买），要么就没有卖而仅有充值话费的。

- Clubsim 课金易充值卡，我选择了这个方式，该套餐就是用来绑定 app store 或者 google play 消费的。只是有限制，刚买的时候里面默认是 50 港币的课金易套餐，有效期 180 天，充值一次，自充值那天起，可以延长 180 天有效期。还可以另外订购短信套餐，6 元一个月，订购一个月后，即使该短信套餐过期了，或者课金易没有余额了，你仍然可以保号 365 天，因此可以认为该方式的持有成本是 6 元每年，十分划算。该卡淘宝有售。

{% render_caption caption="Clubsim 课金易（氪金很容易）的介绍" img="https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/521D9C59-2E33-4BC3-BA3B-1545BC72A447_2.webp" %}
![Clubsim 课金易（氪金很容易）的介绍](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/D5C77239-58D7-44C3-91DA-EA6E245C4840/521D9C59-2E33-4BC3-BA3B-1545BC72A447_2/SyKwmMj2gqTBIJEEkTQfX3eZA3RhUpniPKdylcchIA4z/Image.png)
{% endrender_caption %}

- 3HK，与 ClubSim 类似，也是一种储值卡，不过不同于 ClubSim 的是，它的一些通话套餐、短信套餐、上网更实惠。一般买它推出的，DIY 套餐，该套餐与 Clubsim 类似，就是你可以自己选择购买各种数据的组合如语音通话、上网流量、短信流量等。

{% render_caption caption="3HK 的 DIY 套餐介绍" img="https://static.xheldon.cn/img/in-post/2023/why-i-need-a-hk-sim-card/A429CC3F-E330-4A2B-ADEB-5BC74E403A20_2.webp" %}
![3HK 的 DIY 套餐介绍](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/D5C77239-58D7-44C3-91DA-EA6E245C4840/A429CC3F-E330-4A2B-ADEB-5BC74E403A20_2/6p4XItIsu9syp5x988QaeG64lYk3dFwDbCFag3gy9Ccz/Image.png)
{% endrender_caption %}

很多人买 3HK 就是用来使用香港的网络在大陆漫游，以访问一些在大陆无法访问的网站如 google 等，因为是原生 ip，所以可以解锁任何流媒体，如 NetFlix、Disney+ 等。但是相比于 ClubSim 专门用于绑定 app store、google play 消费的课金易套餐而言，3HK 并没有明显的优势。因为我并不使用该手机号打电话、上网、发短信，因此最终选择了 Clubsim 手机卡，并选择了 课金易 套餐：

{% render_bookmark url="https://www.clubsim.com.hk/zh/gameeasy" title="課金易數據" img="https://www.clubsim.com.hk/en/images/b34eda48eabf4e0ab855d19f47084047160758201117537e73b65cd1343998bd74b0fbbe08eb1.png" yid="" bid="" %}
包括本地數據用量、課金額和精彩遊戲禮遇。
{% endrender_bookmark %}

## 注意事项

这里也有需要注意的地方，Clubsim 手机卡也是不能邮寄到大陆的，因此需要找淘宝购买，但是根据我对 Clubsim 的用户协议的理解，他们的卡的首次开卡激活需要在香港地区，在大陆是无法激活的。但是据淘宝卖家说，他们的顾客买了 Clubsim 后，在大陆激活也是可以的，我看了一些资料、视频后，好像说是可以找客服激活。因为我的卡还有几天才能到手，而且淘宝的卖家在我下单后找我要了我的 Clubsim 的账号（仅账号没要密码），说是需要绑定。卖家应该没必要骗我（因为毕竟钱还在淘宝，没打到他账户），因此基本可以确定的是 Clubsim 的卡是可以在大陆正常激活并使用的。

最后还需要注意的是，正如上文这篇文章所介绍的那样： [订阅 Apple Music 该选哪个区？——中美坡港台日六大地区全对比（第二版）](https://steppark.net/16357088669226.html)，港区的 app store 及苹果的其他服务的完备性依然不如其他区如台湾区、日本区等，如港区没有 Apple One，没有 Apple Arcade，但是我的需求是一个完全版的 Apple Music 和 Apple TV 和 ITunes Store 和 Books 以及相对更顺畅的文化环境（语言），因此选择了港区。
