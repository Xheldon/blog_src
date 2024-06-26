---
title: Arc：一个「好用」的浏览器
layout: post
date: 2023-5-9 8:0:00 +0800
cos: 2023/arc-a-easy-use-browser
path: _posts/life/2023/2023-05-09-arc-a-easy-use-browser.md
headerMask: 0.4
header-style: full
callout: 为什么我在短短使用 Arc 1 天后就决定将它作为默认浏览器？
categories: life
reference:
noCatalog:
lastUpdateTime: 2023-6-6 8:0:00 +0800
headerImg: https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/L3Bob3RvLTE1MDc5MDQxMzkzMTYtM2M3NDIyYTk3YTQ5-dae90c66-1893-4c9f-b43b-3e5b41dabe23.webp
notion: https://xheldon.notion.site/Arc-dae90c6618934c9fb43b3e5b41dabe23
tags:
  - 初体验
  - 浏览器
  - 折腾
  - 生活
---

{% render_callout icon="⚠️" color="" bgcolor="rgb(253, 235, 236)" %}目前 Arc 处于公测阶段，需要邀请码或者排队申请才能使用，而每个使用的人有 5 个邀请码可以分发给朋友，有想体验 Arc 浏览器的可以私聊找我。{% endrender_callout %}

{% render_callout icon="✅" color="" bgcolor="rgb(237, 243, 236)" %}目前截止发布本篇博客，Arc 浏览器仅 Mac 和 iPhone 端可用。{% endrender_callout %}

## 前言

浏览器相信大家都不陌生。个人认为，计算机科学的本质是数据和数据处理，互联网的本质是信息交换，因此，如何面向普通大众更高效的处理互联网的海量数据是一个非常重要的研究领域，因为普通人对计算机、命令行等并不熟悉，所以有一个能将互联网数据信息可视化的工具非常重要，因此浏览器应运而生。

## 典型浏览器设计

浏览器是将互联网的代码语言转换成视图界面并发出命令从而与之交互的工具。除此之外，它的职能是尽可能帮助你更好的处理互联网的海量信息，这方面目前主流的浏览器设计有以下几个功能，下面一一介绍一下。

### 账号体系

如果你只是永远在一台电脑上使用浏览器，那么账号体系对你来说不是那么重要，这也解释了为什么很多人使用从 Window XP 迁移过来的习惯在使用 Window 7+ 系统的时候，都只用本地账户而没有微软账户的原因。而如果你在不同电脑使用相同浏览器，那么账号体系就是为更方便的解决不同电脑之间数据的同步问题而存在的。

除此之外，账号还跟浏览器厂商的战略目的相匹配，使用同一个账号不但可以使用厂商的浏览器，还可以使用它的杀毒软件、论坛等其他产品，**这也为厂商定制化投放广告奠定了基础**。

但是要注意的是，一般浏览器的账号体系仅仅是为了同步在不同电脑收藏的网址、书签、设置（可能）等，而不会将你当前在 A 电脑打开的浏览器页面同步到 B 电脑的浏览器上打开。而为了能在 B 电脑上打开 A 电脑打开的页面，你要么需要在「历史记录」中找寻（如果浏览器会将你的浏览记录同步的话），要么是在「从其他设备打开的标签页」中查找。

{% render_caption caption="Chrome 的「从其他设备打开的标签页」选项" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/8bb105eb-accc-413c-aeed-ad7605df2e7d.webp" %}
![Chrome 的「从其他设备打开的标签页」选项](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/8bb105eb-accc-413c-aeed-ad7605df2e7d.webp)
{% endrender_caption %}

### 地址栏

地址栏顾名思义就是为了显示当前页面地址。但是很多情况下，用户并不关心当前页面的路径（路径指的是域名后面的内容，如 `www.baidu.com/personal.html` 中，`/personal.html` 即为路径，`www.baidu.com` 即为域名 ）是什么——其实用户也不需要知道，只要知道当前域名即可——查看域名是为了谨防钓鱼假冒网站。

这方面，Chrome 不能设置，它一定会显示完整链接：

{% render_caption caption="只能显示完整链接的 Chrome" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/54077239-7ec1-4cfc-9f21-fd29f0c6ee22.webp" %}
![只能显示完整链接的 Chrome](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/54077239-7ec1-4cfc-9f21-fd29f0c6ee22.webp)
{% endrender_caption %}

而 Safari 会允许你设置是否完整显示页面地址，但是这个设置也隐藏的较深，在 设置-高级-智能搜索栏 中：

{% render_caption caption="Safari 把是否显示完整链接选择权交给了用户" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/d79c391c-9710-4f68-935a-44cf809e160f.webp" %}
![Safari 把是否显示完整链接选择权交给了用户](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/d79c391c-9710-4f68-935a-44cf809e160f.webp)
{% endrender_caption %}

完整显示地址的 Safari：

{% render_caption caption="显示完整链接的 Safari" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/225a7667-f7ac-4b2e-b4e0-4fb9aa9851af.webp" %}
![显示完整链接的 Safari](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/225a7667-f7ac-4b2e-b4e0-4fb9aa9851af.webp)
{% endrender_caption %}

仅显示域名的 Safari：

{% render_caption caption="仅显示域名的 Chrome" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b7a0bb46-5451-4336-8037-900149118c56.webp" %}
![仅显示域名的 Chrome](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b7a0bb46-5451-4336-8037-900149118c56.webp)
{% endrender_caption %}

仅显示域名的时候可能会有的问题是，你会点击别人的「返利链接」———特点是在正常访问的地址后面带上了一串代码，如 `www.jd.com/goods/123?reffercode=xxx`———这样的话，你通过这个地址访问购物网站后下单购买东西，给你地址的那个人会收到一笔佣金。这样做虽然不会损害到自身的利益———毕竟你本来就是要买东西的———但是总有被人利用的感觉，所以我一般都会设置「显示完整网站地址」。

更多的，目前浏览器都将「地址栏」作为搜索工具的入口，想来这么做有两点考虑，一个是简化用户搜索的操作路径，另一个是与搜索引擎厂商合作，出厂默认设置好搜索引擎可以赚取一笔搜索引擎厂商的费用。据传，谷歌会每年支付给苹果数亿美元以让苹果设备的浏览器使用谷歌作为默认搜索引擎。

### 收藏夹（书签）

收藏夹也叫书签，顾名思义就是收藏存储一些为了方面后续进一步查看，或者会经常用到的地址而准备的。但是这里有两个问题：

- 时间长了，收藏的网页较多，查找困难。

- 有些网页仅仅是为了「稍后查看，看完即删」，但是收藏完转头就忘，日积月累提高了未来使用收藏功能的成本。

{% render_caption caption="时不时就需要整理一下的 Chrome 书签" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b49a76ef-6d2f-458d-b1b3-6bed0b575b9a.webp" %}
![时不时就需要整理一下的 Chrome 书签](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b49a76ef-6d2f-458d-b1b3-6bed0b575b9a.webp)
{% endrender_caption %}

基于第一点，办法是使用文件夹分类，但并不是一个长久之计，因为文件夹可以嵌套，而且并没有解决「收藏较多的网页后查找困难」的问题。

基于第二点，Chrome 浏览器最近几个版本增加了「临时版收藏夹」——「稍后阅读」功能：

{% render_caption caption="Chrome 右侧的「阅读清单」功能" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/9c55eb8f-492c-4c86-860e-e902b0a366b8.webp" %}
![Chrome 右侧的「阅读清单」功能](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/9c55eb8f-492c-4c86-860e-e902b0a366b8.webp)
{% endrender_caption %}

而这方面，Safari 解决方案提出的更早，很早版本的 Safari 就有了「阅读列表」功能，也即「稍后阅读」。

{% render_caption caption="Safari 版的稍后阅读" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/91c78055-6fc9-44d8-8175-e98a9917e289.webp" %}
![Safari 版的稍后阅读](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/91c78055-6fc9-44d8-8175-e98a9917e289.webp)
{% endrender_caption %}

## Arc 浏览器设计

首先，市面上浏览器已经很多了，为什么还要有一款 Arc 浏览器呢？答案显然是，它在解决或者尝试解决上述普通浏览器在使用过程中的一些痛点而存在的，下面针对不同场景展开说明。

### 场景一

{% render_callout icon="💡" color="" bgcolor="rgb(231, 243, 248)" %}你的同事、朋友，通过微信、QQ 等给你发了**多个**链接，想让你打开帮他投个票、抢个号、砍一刀，等。{% endrender_callout %}

**普通浏览器操作：**

1. 在当前正在使用的、已经打开了上百个页面的、都看不清 favicon 哪个是哪个的浏览器中，打开朋友发的多个链接。

1. 在链接打开的几个浏览器 tab 中，处理被要求的事情。

1. 处理完成后，在众多浏览器 tab 中，准确找到刚刚朋友发的几个链接打开的 tab，一一关闭———你可能需要费劲半天去找哪些是刚刚朋友发的链接打开的 tab，因为打开的太多了。

👇🏻 你能在下面的浏览器一堆 tab 中准确判断哪些是你刚刚通过朋友给的链接打开的、仅仅是临时的、处理完成后就要关闭的浏览器窗口吗？尤其是在你不清楚新打开的 tab 会相对于正在使用的 tab 的哪一侧打开的时候。

{% render_caption caption="打开了很多标签页" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/59b7e7da-66b2-4466-ac05-95842521dab9.webp" %}
![打开了很多标签页](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/59b7e7da-66b2-4466-ac05-95842521dab9.webp)
{% endrender_caption %}

更多的时候，你可能会嫌麻烦，懒得找打开了哪些窗口，处理完朋友的请求后就放着这些 tab 不管了，这导致情况进一步恶化。

**Arc 浏览器操作：**

首先，Arc 浏览器会从源头上解决这个场景，避免出现打开的 tab 过多的场景。如何解决？答案就是「Little Arc」（此为官方称呼，我一般叫他「临时窗口」）。

Little Arc 的设计原则是，临时打开的窗口，也即从别的应用调起 Arc 打开的链接，或者你按了快捷键后打开的链接，默认都是在一个独立的临时窗口中打开，不会在你当前正在浏览的主 Arc 中打开：

{% render_caption caption="主 Arc 浏览器窗口" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/e6ed6f38-0d8a-4830-9372-5857da724a4f.webp" %}
![主 Arc 浏览器窗口](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/e6ed6f38-0d8a-4830-9372-5857da724a4f.webp)
{% endrender_caption %}

{% render_caption caption="Little Arc 窗口" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/c681530f-8502-436a-9c05-214369d6ff71.webp" %}
![Little Arc 窗口](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/c681530f-8502-436a-9c05-214369d6ff71.webp)
{% endrender_caption %}

这也就解决了，「因为 tab 太多而很难找到临时打开的 tab 从而懒得关闭导致 tab 越来越多」的问题。

这里你可能会有疑问，Arc 是如何判断一个链接应该在主要浏览器窗口中打开，还是在 Little Arc 中打开呢？答案就是「Air Traffic Control」，也即「流量控制」。顾名思义，你可以手动设置一个白名单，指定哪些域名是在主 Arc 中打开，哪些是在 Littie Arc 中打开：

{% render_caption caption="打开链接方式的通用设置" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b1773919-b131-4807-b3d9-3565948b06d4.webp" %}
![打开链接方式的通用设置](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b1773919-b131-4807-b3d9-3565948b06d4.webp)
{% endrender_caption %}

{% render_caption caption="指定特定链接打开方式的白名单设置" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/893354d6-1ec5-4595-b090-25744346f464.webp" %}
![指定特定链接打开方式的白名单设置](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/893354d6-1ec5-4595-b090-25744346f464.webp)
{% endrender_caption %}

（这里先忽略上面的 Open in 的设置，因为还没讲到，下面说）。可以看到，不在白名单中的链接，都 Default 在 Little Arc 中打开。当然，你也可以将 Little Arc 打开的窗口在主 Arc 窗口中打开，点击 Little Arc 右上方的「Open in XXX」（XXX 为下面讲到的 Space 名称）或者按 CMD + O 即可。

### 场景二

{% render_callout icon="💡" color="" bgcolor="rgb(231, 243, 248)" %}我在公司正在查看一篇精彩的博文，此时突然 6 点要下班了，事不宜迟，马上收拾东西回家去，当你到家的时候，你回想起那篇精彩的博文。{% endrender_callout %}

**普通浏览器操作（以 Chrome 为例）：**

- 点击顶部栏的「历史记录」。

- 点击「显示全部历史记录」。

- 点击「从其他设备打开的标签页」，选择你刚刚才公司打开的那个 tab 后，打开。

**Arc 浏览器操作：**

**不！需！要！任！何！操！作！**在任一 Arc 浏览器打开的 tab 页面，会实时同步到同一账号的其他任一 Arc 浏览器。

甚至，你在同一个电脑打开的两个 Arc 浏览器，在其中一个打开的 tab 也会实时在另一个 tab 打开（嗯，很合理！）

{% render_quote color="" %}2023.06.02 更新：现在 Arc 取消了这个设计，如果同一台电脑打开了多个 window，则每个 window 都有自己的 tab，如果关闭了 window，则会让你选择是否在剩余激活的 window 打开刚刚被关闭的 window 中的 tabs。{% endrender_quote %}

{% render_caption caption="同一台电脑的两个窗口也会实时同步打开的 tab" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/098bc438-6442-4e1f-944a-e986bd09151e.webp" %}
![同一台电脑的两个窗口也会实时同步打开的 tab](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/098bc438-6442-4e1f-944a-e986bd09151e.webp)
{% endrender_caption %}

但是这里有个特例，Pined（后面会介绍）的 tab（即左上角的那最多 12 个的网址）因为是全局唯一的，不区分 Space（后面会说），因此只能在其中一个浏览器窗口打开。在一个 window 打开的时候，另一个 window 的对应 tab 会自动关闭（仅同一台电脑打开多个 window 的场景）。

### 场景三

{% render_callout icon="💡" color="" bgcolor="rgb(231, 243, 248)" %}上班时间，你在刷微博刷推特，此时同事让你过一下代码，于是在微博窗口的旁边打开了代码 review 的链接，但是其实你想拖延一会儿再干活儿，只不过此时高 T 从身后经过，于是你赶紧切换到代码 review tab，高 T 看到你在代码 review 很满意的点了点头，但是定睛一看发现在 review tab 旁边醒目的显示着微博 tab。于是上班摸鱼刷微博还假装在 review 代码的奸计被识破，你没有年终奖没有普调没有晋升甚至还被 PUA 和 N + 1。{% endrender_callout %}

**普通浏览器操作（以 Chrome 为例）：**

- （可选）打开隐身窗口刷微博，在普通窗口浏览器 review。美中不足的是正在刷一个小姐姐跳舞的视频时高 T 经过，赶紧关闭了隐身窗口，过后回想起小姐姐曼妙的身姿时再想打开的时候找不到地址了。

- （可选）将微博放到 tab 组中隐藏起来，~~切换自如~~。

{% render_caption caption="Chrome 的标签组打开关闭的逻辑我一直没搞懂" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/d81d0779-fa6b-440a-988b-b8c28c532171.gif" %}
![Chrome 的标签组打开关闭的逻辑我一直没搞懂](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/d81d0779-fa6b-440a-988b-b8c28c532171.gif)
{% endrender_caption %}

**Arc 浏览器操作：**

Arc 有 **Space** 的概念，以我为例，我会设置两个 Space，一个叫「工作」，一个叫「好好工作」。然后如上面的「流量控制」中设置的那样，在「好好工作」 Space 中打开各种摸鱼网站如微博、推特等，在「工作」中打开真正的工作 tab，然后按 CMD + 1/2 来一键切换不同的 Space。

值得注意的是，不同 Space 的 Pinded tab 是相同的，但是 Folder （类似于传统的收藏夹，但是又不同，后面会说）和打开的 tab 是独立的。

## Arc 其他设计理念

以上是 Arc 的主要提效使用场景，为了让我们从繁重的网页管理的工作中解脱出来，Arc 还设计了其他一些概念，结合上面的部分内容，下面展开说说。

### Space

Space 的概念顾名思义，就是分区，类似于多账号的概念，只是它仅 Folder 和打开的页面是各自独立的，其他的如 Pinned 和 Extension 都是一样的。

{% render_caption caption="页面底部的 Space 切换" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/eab0fb69-0fdc-4196-b59e-92786a56678d.webp" %}
![页面底部的 Space 切换](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/eab0fb69-0fdc-4196-b59e-92786a56678d.webp)
{% endrender_caption %}

### Pinned

可以将最常用的页面设置为 Pinned 放置到所有 Space 的上方（最多 12 个），在切换 Space 的时候这些 Pinned 页面不跟随变化。我一般是放不同 Space 都会打开的页面，如 Notion、Gmail、Spotify 等。

{% render_caption caption="常驻的 Pinned" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/f7afa4b2-9c5c-47e3-8181-33986c399d9e.webp" %}
![常驻的 Pinned](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/f7afa4b2-9c5c-47e3-8181-33986c399d9e.webp)
{% endrender_caption %}

Pinned 的页面因为优先级比较高，Arc 团队适配了一些网站，因此当鼠标放到这些网站上的时候，如果支持的话会显示预览：

{% render_caption caption="预览 Gmail" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/078fdd57-be1f-42a4-9b63-967c0bd6d919.webp" %}
![预览 Gmail](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/078fdd57-be1f-42a4-9b63-967c0bd6d919.webp)
{% endrender_caption %}

目前支持的网站部分在设置中可以单独设置预览效果：

{% render_caption caption="部分支持 Preview 的网站" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/650e06a0-1409-4a4a-8d90-fc6e44ee07d7.webp" %}
![部分支持 Preview 的网站](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/650e06a0-1409-4a4a-8d90-fc6e44ee07d7.webp)
{% endrender_caption %}

### Folder

Folder 类似于普通浏览器的收藏夹/书签栏，区别是，点击打开它后会直接打开页面，而不是像普通浏览器一样，书签选择界面消失后，新开一个 tab 打开。

点击右侧的关闭按钮，会关闭在 Folder 打开的页面，此时关闭按钮变成了减号「—」，再次点击这个按钮可以将页面从 Folder 中移除。

Folder 与普通浏览器的收藏夹最大的区别是，它是不可隐藏的，因此这个地方放置的一般是跟 Space 相关的常驻的一些页面，如工作 Space 我会放工作汇报、代码 Review 页面等，方便随时访问。不可隐藏这点可能是缺点，也可能是为了让你尽可能的减少收藏的网页，而把内容装进自己的脑子，因此 Folder 算是传统浏览器「收藏夹」和「稍后阅读」的中和版。

{% render_caption caption="Folder 视图" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/4ed98e06-c814-4eea-96bf-743de7893f70.webp" %}
![Folder 视图](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/4ed98e06-c814-4eea-96bf-743de7893f70.webp)
{% endrender_caption %}

另外，hover 到 Folder 的时候也会显示预览：

{% render_caption caption="预览某个 Folder 中的页面列表" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/3c2105e6-e04f-4a58-8d0f-9b5412cbadb5.webp" %}
![预览某个 Folder 中的页面列表](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/3c2105e6-e04f-4a58-8d0f-9b5412cbadb5.webp)
{% endrender_caption %}

### 每日页面

这个就是跟普通浏览器一样的 tab 页面，区别是，它会被定时清理（官方叫法「自动归档」）

{% render_bookmark url="https://resources.arc.net/en/articles/6701333-auto-archive-clean-as-you-go" title="Auto Archive: Clean as you go | Arc Resources" img="https://www.notion.so/image/https%3A%2F%2Fdownloads.intercomcdn.com%2Fi%2Fo%2F401142%2Fd738c895e110b836ac83fb13%2F0430ed6ec4f739e41e7deb100afa7e72.png?id=58984e64-2e35-4661-8300-f67f713d9cae&table=block&spaceId=1e3e7c05-fc11-4038-9f76-92db32b98824&width=500&userId=0bfcee52-05b1-4d38-bf9a-26223d36426c&cache=v2" yid="" bid="" %}
Your Unpinned Tabs will Auto Archive at the cadence of your choice.
{% endrender_bookmark %}

因此这里放置每天上班后要打开的，下班后就可以关闭的页面，如果有那种需要一直打开的页面，可以将其挪到 Folder 中。

{% render_caption caption="常规的 tabs" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/159560c6-85c8-49a6-8bbf-cdd1db0af5cf.webp" %}
![常规的 tabs](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/159560c6-85c8-49a6-8bbf-cdd1db0af5cf.webp)
{% endrender_caption %}

可以设置多久清理（归档一次）

{% render_caption caption="关闭的另一种说法——归档/收纳" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b1f773f1-6d76-46df-abe7-42f3d524b3ca.webp" %}
![关闭的另一种说法——归档/收纳](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/b1f773f1-6d76-46df-abe7-42f3d524b3ca.webp)
{% endrender_caption %}

### Split View

这算是一个比较有用的场景了，有时候你需要同时查看不同页面，普通浏览器的话你就需要同时打开两个 window 窗口然后调整两个 window 的位置使之并排，而在 Arc 中，你可以在 Split 一个窗口后选择打开哪个页面以让两个页面同时展现：

{% render_caption caption="页面的右上角有三个点，hover 后可以快捷访问 SplitView" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/2d5fd4c9-22a8-40e8-9495-727eab4b93a8.webp" %}
![页面的右上角有三个点，hover 后可以快捷访问 SplitView](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/2d5fd4c9-22a8-40e8-9495-727eab4b93a8.webp)
{% endrender_caption %}

最多可以 Split View 为 4 个：

{% render_caption caption="最多支持 4 个" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/ee1e2411-b85f-47d3-bf34-c33f913bc93f.webp" %}
![最多支持 4 个](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/ee1e2411-b85f-47d3-bf34-c33f913bc93f.webp)
{% endrender_caption %}

不但竖向可以，横向也可以 Split（嗯，这很合理）：

{% render_caption caption="横向也没问题！" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/a222d888-aa34-4601-9f2c-ec391d8ab849.webp" %}
![横向也没问题！](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/a222d888-aa34-4601-9f2c-ec391d8ab849.webp)
{% endrender_caption %}

### Boost Site

这个类似于油猴插件，可以使用简单设置某个网站的样式外观如全部大写、修改整站字体、颜色等，会点 CSS、JavaScript 的可以写代码定制任意网站的样式和行为，因为比较 Hack 就不介绍了。

{% render_caption caption="Boost 写代码定制样式和逻辑" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/76e43c7a-4b03-4eec-84a9-881afcb16cf9.webp" %}
![Boost 写代码定制样式和逻辑](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/76e43c7a-4b03-4eec-84a9-881afcb16cf9.webp)
{% endrender_caption %}

### 插件

因为 Arc 是基于 Chrome 同源的 Chromium 项目：

{% render_bookmark url="https://www.chromium.org/chromium-projects/" title="Home" img="" yid="" bid="" %}
https://www.chromium.org/chromium-projects/
{% endrender_bookmark %}

因此，你本质上可以把它当成是 Chrome 来用，Chrome 支持的插件它都支持，Chrome 的调试控制台等也都可以使用。更棒的是，**你可以直接将 Chrome（或者 Edge，都是基于 Chromium 项目） 的所有内容全部一键迁移到 Arc 浏览器**——这里的**所有内容**包括页面的 Session、保存过的密码、Cookie 等，也就是说你可以直接无缝从 Chrome 切换到 Arc，而不用在 Arc 重复一遍输入账号、密码、历史记录等。

### 其他

- **快捷键：**Arc 对快捷键的支持是第一优先级的，这就有个问题，一些网站如 Notion，有自己的快捷键，那这些快捷键与 Arc 的快捷键冲突了怎么办？答案就是设置优先级。可以设置按下快捷键后，优先相应网站的还是优先响应 Arc 的，再按一次可以响应另一个。也可以只响应其中一个的，还是很实用的。
  {% render_caption caption="可以选择响应顺序或只响应某一方的快捷键" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/6cf3b729-d67c-412d-8a27-f286fdba5287.webp" %}
  ![可以选择响应顺序或只响应某一方的快捷键](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/6cf3b729-d67c-412d-8a27-f286fdba5287.webp)
  {% endrender_caption %}

- **搜索 bar：**实用关了 Alfred 或者 VS Code 的同学会比较习惯按下快捷键后出现搜索栏，然后输入你想要的内容，这点 Arc 也实现了（按下 CMD + T）。全局搜索 bar 还有很多细节，如初始状态下，内容的展示等，有兴趣的同学可以自己体验一下。
  {% render_caption caption="Arc 的搜索功能，使用频率非常高" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/7e18fcd4-5c5c-4e76-8209-904fbbc96572.webp" %}
  ![Arc 的搜索功能，使用频率非常高](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/7e18fcd4-5c5c-4e76-8209-904fbbc96572.webp)
  {% endrender_caption %}
  这里比较期待的是能开放这个搜索接口，以集成到 Alfred 中。

- **文件夹集成：**在网页下载某个文件后，可以在浏览器左下角看到相关的文件：
  {% render_caption caption="hover 左下角查看下载内容，点击后有进一步的功能（下面）" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/6923fdf0-2b4e-4fe7-8800-db83ced94f69.webp" %}
  ![hover 左下角查看下载内容，点击后有进一步的功能（下面）](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/6923fdf0-2b4e-4fe7-8800-db83ced94f69.webp)
  {% endrender_caption %}
  也可以点击进去查看其他的被 Arc 归类的文件夹，如 媒体、下载等，点击这里还有其他的功能如全部 Space 一览视图等，可以自己摸索。

- **笔记&绘图：**可以有，但是没必要，有谁会在浏览器中用鼠标画图？不过聊胜于无，而且可能从埋点看这个功能用户用的也少，因此该功能的更新也自推出后几乎没怎么更新过。
  {% render_caption caption="上一步说的点击后，有这些二级访问菜单，优先级较低。" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/770bd145-ec91-4be0-ad12-ae763ea35ca4.webp" %}
  ![上一步说的点击后，有这些二级访问菜单，优先级较低。](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/770bd145-ec91-4be0-ad12-ae763ea35ca4.webp)
  {% endrender_caption %}
  笔记似乎是原生技术实现的，反正是不让你看源码（无法 CMD + ALT + I 打开控制台）：
  {% render_caption caption="" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/d6474846-fad8-4cdb-8437-cda4fc32fa45.webp" %}
  ![](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/d6474846-fad8-4cdb-8437-cda4fc32fa45.webp)
  {% endrender_caption %}

### 细节

- **Mini 播放器。**音乐播放网站如 Apple Music、Spotify 的网页版（其他如网易云音乐没有尝试），会在播放的时候显示在下方一个小的编辑器按钮，方便你全局随时控制：
  {% render_caption caption="细节满满的 Mini 播放器" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/e78992ef-912f-4094-948d-8050a848b1e8.gif" %}
  ![细节满满的 Mini 播放器](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/e78992ef-912f-4094-948d-8050a848b1e8.gif)
  {% endrender_caption %}

- **本地开发支持。**普通的网站打开后，页面是没有任何内容的（见上方的 Arc 页面截图），但是如果打开的是 [localhost]([object Object]) 的地址，则会进入「开发模式」，会将当前启用的插件、快捷打开 console 等 web 开发者常用的功能放到顶部供快捷访问。
  {% render_caption caption="本地开发支持" img="https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/66de83b6-ea88-49f9-9b08-e8c253ccdbdf.webp" %}
  ![本地开发支持](https://static.xheldon.cn/img/in-post/2023/arc-a-easy-use-browser/66de83b6-ea88-49f9-9b08-e8c253ccdbdf.webp)
  {% endrender_caption %}

## 缺点

金无足赤，人无完人。马克思唯物辩证法之所以是宇宙中的唯一真理，它的真理性就在于它并不是一成不变的，而是是随着时代在变化的，不同的时代有不同的解释。因此，我们要以马克思主义唯物辩证法的思想，来辩证的看待 Arc 浏览器的设计理念。

- 没有 iPad 特供版，这点我是理解不能的，如果有 iPad 版的话，浏览器自带的绘图和笔记功能的使用频率会大幅提高。

- iPhone 版打开网页后，如果想新打开另一个网页，只有两个选择：要么下滑关闭当前页面（这样你就需要费劲的从 Archived 中找到被下滑关闭的网页）；要么点击右下角的图钉按钮，将页面放到 Folder 中。其实哪一点我都接受不了，下滑并没有主动点击 x 的操作，给我打开放到 tabs 列表中不好吗？

- iPhone 端没有隐身模式。隐身模式很有用，懂的都懂。

## 结语

Arc 算是浏览器中的异类，但是很多的设计又是非常符合直觉的，能在当今众多浏览器中杀出一条血路，也可见市场对它所期望解决的问题方案的认可，感兴趣的朋友可以试试！
