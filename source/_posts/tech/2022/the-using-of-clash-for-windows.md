---
layout: post
date: 2022-10-08 18:52:22 +0800
categories: tech
path: _posts/tech/2022/2022-10-08-the-using-of-clash-for-windows.md
cos: 2022/the-using-of-cfw
header-style: text
tags:
    - 技术
    - 富强
    - Clash
    - 教程
craft: https://www.craft.do/s/LUmvgdChQqG364
callout: Clash For Windows For Mac 简单使用场景。
title: 关于 Clash 使用的一点记录
sha: a1feb29a4ed387a71b4c758531b075f969b5c726
lastUpdateTime: 2023-01-05 11:59:54 +0800
---

> ⚠️ 本文涉及的节点、机场订阅服务，都是子虚乌有个人杜撰的，实际并不存在，此处只是一个 Demo 示例，请大家知晓。

## 前言

Clash 是一款好用的富强工具，它只是一个内核叫 Clash core，本质是一款命令行工具（谁又说任何软件本质不是命令行呢？），大神们据此开发了各式各样的 GUI 界面以方便设置和使用。我曾经使用过 Mac 上的 ClashX 和 Clash For Windows For Mac（你没有看错），也即通常所说的 CFW。因为方便开发的原因，它使用的是 Electron 的架构来实现的 GUI，所以它可以打包成 Mac 版和 Window 版本，非常好用。

我目前使用的是 Clash For Windows 这个。

{% render_caption caption="Clash for Windows For Mac 界面" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/958140EE-7CCB-4D5B-8CAD-1B6358AAAB57_2.webp" %}
![Clash for Windows For Mac 界面](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/958140EE-7CCB-4D5B-8CAD-1B6358AAAB57_2/lJSSLygVyl8GyyrzktonSx4YEWwVHTxEoIxvey5qMmwz/Image.png)
{% endrender_caption %}

当然，国际惯例，本篇文章除了简单介绍常用设置的用处外，还简单介绍了下如何更新订阅链接和切换节点，防止某些人一有问题就来责怪我：「为什么 behance 又打不开了啊！」「为什么翻个墙这么麻烦啊！」「你花那么多钱买梯子怎么还这么难用啊！」的时候，我把这篇文章摔给她，然后继续打游戏。

> ⚠️ 名词解释：富强 = 翻q

## 一些设置的用处

> 这些说明基本都在它的使用说明里面，我这里结合自己的真实使用场景介绍一下。

### GeoIP Database

它的功能是可以基于 IP 的地理位置来判断是否需要走代理，原理是维护了一个数据库到本地，然后查询即可。因为 IP 地址是不断更新的，所以这个数据库也是需要偶尔更新一次的（不频繁）。

{% render_caption caption="GeoIP 数据库下载" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/F70734A2-11A9-43F7-BA74-BE599A4B4632_2.webp" %}
![GeoIP 数据库下载](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/F70734A2-11A9-43F7-BA74-BE599A4B4632_2/RVzVVXSgPx1pxrObXC4eVTJEFVhoQapXosWpaPlOgggz/Image.png)
{% endrender_caption %}

### TUN Mode

有些软件不遵循系统代理，如终端、iTerm、Infuse。TUN 模式就是为了解决这个问题的，它对于不遵循系统代理的软件，它可以接管其流量并交由 CFW 处理。

我个人的实际使用是为了看 Infuse 中的 Emby。因为我的 Emby 服务是需要机场特定节点的，然而 Infuse （似乎）内置了自己的请求工具，并未走系统代理，因此即使将 CFW 设置为系统代理，同时指定了正确的节点，却还是无法打开机场提供的 Emby 服务，此时只需要打开 TUN 模式即可解决。

还一个使用场景是，打开了 TUN 模式后，iTerm 终端的命令也会走代理流量了；如果没有打开 TUN 模式的话，git clone 等是不会走代理流量的，我之前的办法是是手动创建一个 alias 命令来指定终端代理，需要的时候按 `ppp` 回车，不需要的时候按 `sss` 回车（我的代理端口是 7890）： 

```Bash
alias ppp="export https_proxy=http://127.0.0.1:7890;export http_proxy=http://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7890"
alias sss="unset all_proxy;unset https_proxy;unset http_proxy"
```

启用 TUN 模式需要 Service Mode，具体方式可以见文档： 

{% render_bookmark url="https://docs.cfw.lbyczf.com/contents/tun.html#macos" title="TUN 模式 | Clash for Windows" img="https://docs.cfw.lbyczf.com/favicon.ico" yid="" bid="" %}
"by Fndroid"
{% endrender_bookmark %}

不过我个人遇到的一个情况是，CFW 提示我 Service Mode 已经打开，但是那个小地球图标是红色的。于是我先关闭了一下 Service Mode，CFW 自动重启后显示 Service Mode 未激活，同时只有两个按钮可以点 install 和 uninstall，于是我就点那个 install，重启后还是红色的小地球图标，于是我先 uninstall 后再 install，CFW 自动重启后就变成绿色小地球了。说这一点是说，可能 GUI 有 bug，遇到问题最好多尝试几次不同的方式来解决。

> 💡 记得关闭软件的安全 DNS 功能，才能正常使用 TUN 模式。如果你发现 TUN 模式下软件不好使，可能跟该软件的这个功能原因。

{% render_caption caption="Chrome 关闭安全 DNS" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/F81A0395-B1AE-40AC-B414-15EB8E5714DE_2.webp" %}
![Chrome 关闭安全 DNS](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/F81A0395-B1AE-40AC-B414-15EB8E5714DE_2/dPDifmf2kQSyE1JF2yZsEMC18kdDUmXnEjyReSc9qoYz/Image.png)
{% endrender_caption %}

### Parser

也即「配置文件预处理」。

有些时候你想在 CFW 的分流规则生效之前，设置自己的规则。比如大多数人用的都是机场订阅链接，机场的订阅链接都自带了自己的分流规则，类似全球直连、全球拦截、漏网之鱼这种： 

{% render_caption caption="机场的内置分流规则" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/A4BA694C-B4B1-4964-9D6C-EFB8E3C12184_2.webp" %}
![机场的内置分流规则](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/A4BA694C-B4B1-4964-9D6C-EFB8E3C12184_2/Z3iKlwyFmxIN2yepLGxbSaJKMXdmPG2DZ3UOGruNCAcz/Image.png)
{% endrender_caption %}

而你想有自己自定义的规则，如某个特定链接走代理。如果你直接修改订阅链接下载的配置文件，那么下次订阅链接更新的时候，**你的修改就会被覆盖**。于是 Parser 应运而生。

简单来说，Parser 会在机场订阅规则应用前，首先应用你配置的规则，并将你的规则合并到最终生效的规则中。比如我经常访问的一个网站，它有两套域名，如果访客是大陆用户，则直接返回大陆内容；如果是海外 ip 访问该网站，该网站会跳转到海外地址上。

而尴尬的是，一旦开启了 TUN  模式，该网站就会判定你是海外用户，就无法以大陆用户的身份来访问该网站了（账号不互通）。于是我就可以使用 Parser 功能，将该网站的大陆版地址加入然后设置直连即可： 

{% render_caption caption="只支持针对特定节点列表配置文件进行预处理" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/8B575173-C01D-4E41-8213-1540979CC691_2.webp" %}
![只支持针对特定节点列表配置文件进行预处理](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/8B575173-C01D-4E41-8213-1540979CC691_2/mNjArxHkrxBkIlZdCLQY01kKyttd8v8dvjmdXG6CzP0z/Image.png)
{% endrender_caption %}

但是，比较尴尬的是，它只针对某个特定的 yaml（也即下面说的订阅节点列表）生效，因此如果你有多个订阅节点列表（机场），那就需要写多个 url。

更新：好消息是 CFW 支持一个规则匹配多个订阅节点列表了，使用 `reg` 字段正则匹配即可，如下我使用的是匹配全部配置文件： 

{% render_caption caption="reg 匹配多个 yaml 配置文件" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/01CDE02A-C3F4-48D1-B4D0-53E6A7C57D84_2.webp" %}
![reg 匹配多个 yaml 配置文件](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/01CDE02A-C3F4-48D1-B4D0-53E6A7C57D84_2/ND9YaB05XxvxioHi8wAKyk64cFI4e5WpcxbFhuwUe84z/Image.png)
{% endrender_caption %}

{% render_caption caption="点击查看配置文件的Parser" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/71687212-4376-4A13-B7C6-304066D33D6F_2.webp" %}
![点击查看配置文件的Parser](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/71687212-4376-4A13-B7C6-304066D33D6F_2/PcO1CqGsbU4SaRTnD4w9KDhXaAVEIWxq4iEdw4sBAR4z/Image.png)
{% endrender_caption %}

点击订阅节点列表，查看该配置对应的 Parser。

{% render_caption caption="该 Parser 能匹配上配置文件" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/499B32EF-5C31-4E35-A0D4-B61198B8578C_2.webp" %}
![该 Parser 能匹配上配置文件](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/499B32EF-5C31-4E35-A0D4-B61198B8578C_2/a8x1U05RljDTTV3GEvltLqAgFPDyY2nzqM1IW5fWcV8z/Image.png)
{% endrender_caption %}

> 注意：订阅转换服务可能使 Parser 失效。

> 注意：设置完 Parser 后需要点一下当前代理的更新按钮才会生效。

### Diff

该功能作用给上面的 Parser 类似，但它会作用于 Parser 之后生效。原理是先手动生成一个文件（类似于 git 的 base 版本），该文件可以是你基于当前订阅配置文件修改后的文件。然后每当订阅配置文件更新的时候就会将新的与旧的 diff 一次，如果发现有问题就需要手动解决一次冲突。

该功能目的也是为了保证每次更新不会覆盖你对当前配置文件的修改。

### Mixin

> ⚠️ **注意：此功能只适合注入「*****功能属性」*****，同时 mixin 中的规则会覆盖机场订阅列表中的其他规则！因此，你只应该在 mixin 中设置注入 dns 等的信息，而不应该设置 rules 等的信息，因为其会使机场订阅的节点无效。**

{% render_caption caption="Mixin 设置" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/5BD8837D-D779-462F-8C7A-4E4AEC024B8B_2.webp" %}
![Mixin 设置](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/5BD8837D-D779-462F-8C7A-4E4AEC024B8B_2/Qh42Pj9aZzpb8H0XMMuxFTMNotnwUZLMfG4YxAMZMQgz/Image.png)
{% endrender_caption %}

还有一个设置入口在 Setting 里面，这里可以选择 JavaScript 格式的 Mixin 设置，具体可以参看文档： 

{% render_caption caption="Mixin 总设置" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/D1C4A8E9-A706-4CF1-A19F-FBD2DD439A34_2.webp" %}
![Mixin 总设置](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/D1C4A8E9-A706-4CF1-A19F-FBD2DD439A34_2/vaY8jykLyKKhtCMxoyVjrRCIh25dSq39iBTbUUAn12gz/Image.png)
{% endrender_caption %}

### System Proxy

顾名思义，就是将 Clash 设置为系统代理。如果关闭的话，有些依赖系统代理的软件，就不能富强了，比如 Safari。因此如果你想让你的 Safari 富强，务必打开 System Proxy。

## 无法正常富强时排查方式

当访问需要富强的网站确发现无法富强的时候，可以按下面几点简单排查一下：

### 第一步：检查 Proxies

点击菜单栏中的小猫咪

{% render_caption caption="小猫咪被点击啦" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/FB1C6B63-F79E-424B-87E7-E3909A39697E_2.webp" %}
![小猫咪被点击啦](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/FB1C6B63-F79E-424B-87E7-E3909A39697E_2/a9PEVdvpcLAMOSMIi5p8FpSTurzTTKLosJKNG9ibbN0z/Image.png)
{% endrender_caption %}

在打开的界面中点击 `Proxies` tab 栏，然后点击节点选择：

{% render_caption caption="点击节点选择会展开节点" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/3814EF32-EA61-4D8E-BB07-2414E4CF55AD_2.webp" %}
![点击节点选择会展开节点](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/3814EF32-EA61-4D8E-BB07-2414E4CF55AD_2/FX29YYtWNZmSeOWwRYkyyJ3ZUz550CjL8DpLddQsNMcz/Image.png)
{% endrender_caption %}

> 💡 自动选择：CFW 会自动选择可用节点

此时注意查看节点选择后面的文字是不是自动选择（默认应该是的，你不应该动这个地方），确保是自动选择，然后点击测速查看当前自动选择节点的速度： 

{% render_caption caption="测速结果在右侧" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/F9BC2145-EE96-43CD-BABF-EE31506E35AE_2.webp" %}
![测速结果在右侧](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/F9BC2145-EE96-43CD-BABF-EE31506E35AE_2/jNu8KDQXZnyTH1zBD1rGdtoF43WuZ6Dgl09hIjKBXYcz/Image.png)
{% endrender_caption %}

这里如果节点不可用的话，会显示是 `Timeout` 超时，如果延迟过高如 1000+ 会以红色数字显示，会表示富强的网速慢。

### 第二步：检查 Profiles

一般情况下，你的 Profiles 都应该有多个，诸如这样的： 

{% render_caption caption="在多个节点列表中切换" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/0B0E0986-FEC8-4233-B5AB-8FB688E90654_2.webp" %}
![在多个节点列表中切换](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/0B0E0986-FEC8-4233-B5AB-8FB688E90654_2/XbstSxkTntpLxdzSO2864C6Ce3TXJ4WfxQBLqA7Hsxcz/Image.png)
{% endrender_caption %}

如果在第一步发现节点测速显示都是 `Timeout` ，那么可以考虑更换节点列表，上图中点击一个新的 block，如果其左侧变绿，就表示切换为当前 block 的节点列表了。然后此时再重新执行第一步检查节点的速度是否正常即可。

另外如果上图中的节点列表很久没更新（括号中显示更新时间），那么点击上面的 `Update All` 尝试更新。此时可能更新失败，可以换其他 block 点击后，再次点 `Update All` 尝试更新即可： 

{% render_caption caption="更新节点列表" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/22A4E748-9C2C-4DC2-8641-EEC3BD0D6F7A_2.webp" %}
![更新节点列表](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/22A4E748-9C2C-4DC2-8641-EEC3BD0D6F7A_2/gWpMXi6tAH6XFfyMT9mxO18xkwn403kETSW8Qmx9IHwz/Image.png)
{% endrender_caption %}

> 注意，不要在多个节点列表之间切换过快，可能会导致错误，切换一个后，等个 3~4 秒再切换其他的（如果必要的话）。

### 第三步：断开全部链接

如果发现上面两步执行过后，都没问题，但是就是无法打开页面，那么可能是因为此时浏览器还保持着之前的连接未断开，故而没有重新通过代理监理链接。此时只需要在 CFW 的 `Connections` tab 中，点击断开全部链接，然后刷新你打不开的页面即可： 

{% render_caption caption="断开全部连接" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/FC7E6C7A-35B6-4004-92C6-E9ABE547CF7A_2.webp" %}
![断开全部连接](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/FC7E6C7A-35B6-4004-92C6-E9ABE547CF7A_2/GMsUJS8MD5n35r8AiJX4mCmc32U4MrDnpfQYjJbB2ucz/Image.png)
{% endrender_caption %}

## 添加新的机场订阅

新的机场订阅即上面说的「节点列表」。

在 `Profiles` tab 中，将你拿到的链接粘贴到当前唯一的输入框，然后点 `Download` 即可，如果下载成功会有提示： 

{% render_caption caption="添加新的节点列表" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/3F3F03C3-CE8A-4D96-9EA8-9237D4C55A35_2.webp" %}
![添加新的节点列表](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/3F3F03C3-CE8A-4D96-9EA8-9237D4C55A35_2/KeyJB445tEOgfFcePX23dti6AZNJzrUUC03txmen02Az/Image.png)
{% endrender_caption %}

## 其他

### 富强模式

Clash 有不同的富强模式，如全局，即所有网络链接都富强；有 Rule，即按照你定的规则，不同的网络链接有的富强有的直连；有 Direct 表示全部网络链接都直接连接，效果等同于没有开 Clash 富强；有 Script，可以写一个 JavaScript脚本，让自定义脚本判断哪些链接走富强，哪些直连。这些配置可以在这里切换： 

{% render_caption caption="切换富强方式" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/DC0BF45B-91D3-45DF-B230-254A2648EDD6_2.webp" %}
![切换富强方式](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/DC0BF45B-91D3-45DF-B230-254A2648EDD6_2/J4Cf1J8miQrhFzvSDf7vHKfYVVciOKBcEYTMxlU83hsz/Image.png)
{% endrender_caption %}

### 代理局域网的其他设备

Clash 可以代理当前局域网同一网段的其他设备的网络链接，让无法富强的其他设备也能富强，最典型的用法就是代理 Apple TV 的。因为 Apple TV 系统没有开放相关代理接口，因此其不像手机一样可以直接安装富强软件进行富强，因此要么借助路由器富强，要么就是将其代理服务器设置为 Clash 所在的设备，然后在 Clash 中打开 Allow LAN 即可： 

{% render_caption caption="允许本地局域网连接" img="https://static.xheldon.cn/img/in-post/2022/the-using-of-cfw/C48B8690-F44B-4465-9BF7-8A2F4960F904_2.webp" %}
![允许本地局域网连接](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/6253E02B-B8FD-460D-B963-2B5DE217194F/C48B8690-F44B-4465-9BF7-8A2F4960F904_2/gWNTKG2ygyMLZ9Zc0ZCeTdgl0r7NpPdWPBAK4eNQQyoz/Image.png)
{% endrender_caption %}

### 什么是机场订阅链接？

机场订阅链接就是机场给你一个链接，然后 Clash 会解析这个链接，该链接会让 Clash 下载一个 yaml 格式的配置文件，来指示 Clash 如何功能。
