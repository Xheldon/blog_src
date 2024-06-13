---
title: 使用 Apple TV 收看北京联通 IPTV
layout: post
date: 2023-10-30 8:0:00 +0800
cos: 2023/iptv-for-apple-tv-in-beijing
path: _posts/life/2023/2023-10-30-iptv-for-apple-tv-in-beijing.md
headerMask: 0.4
header-style: full
callout: 本文介绍了一种使用 Apple TV 观看北京联通 IPTV 的方案，以供需要者参考。
categories: life
reference:
noCatalog:
lastUpdateTime: 2024-1-9 8:0:00 +0800
headerImg:
notion: https://xheldon.notion.site/Apple-TV-IPTV-ad9bb4bcb5b64234b1335a3d809e1bf8?pvs=4
tags:
  - 生活
  - Apple
  - 苹果
  - 经验
  - 网络
  - 折腾
  - 路由器
  - 教程
---

## 前言

之前在 [这篇博客](/life/the-way-to-watching-tv.html) 讲了现在家庭观影的方案，其中提到的一个点是使用网络上别人抓取到的 IPTV 的节目地址（m3u 后缀），放入 iPlayTV 中，可以直接播。但是这个节目地址过一段时间就失效了，这是因为联通 IPTV 服务器会时不时的会更新一下节目的播放地址，而 Apple TV 上填写的地址是固定的，无法及时更新，因此本文就来解决这个问题。

{% render_callout icon="🚧" color="" bgcolor="rgb(253, 235, 236)" %}**使用前必读：**本人为北京联通宽带，**光猫使用桥接方式，路由器拨号，软路由 R4S 以旁路由**的方式进行连接。本教程针对该拓扑方案进行介绍，其他网络拓扑如「光猫桥接 + R4S 当主路由进行拨号，或者光猫拨号 + R4S 旁路由」等，也可以实现，但是其中关键的 R4S 设置也许跟本教程有些许的差异，建议多搜索一下，领会其中的精神，不用完全跟我的一样。{% endrender_callout %}

{% render_callout icon="🚧" color="" bgcolor="rgb(251, 243, 219)" %}同上，如果你是使用光猫直接拨号，你可以直接从光猫接根线出来到旁/主路由上进行组播变单播；也可以直接在支持的设备上使用组播地址进行播放，就不用像我这么麻烦了。具体还要看你家的网络拓扑结构而定。{% endrender_callout %}

{% render_callout icon="🚧" color="" bgcolor="rgb(251, 236, 221)" %}本教程仅针对北京联通 IPTV 测试成功，其他地区可能有所差异，如果发现文本中有跟地域强相关的内容，请根据你所在的地区替换对应内容。{% endrender_callout %}

{% render_callout icon="🚧" color="" bgcolor="rgb(244, 238, 238)" %}在修改设置前，请提前先备份所有路由器、设备的设置，以防万一。{% endrender_callout %}

{% render_callout icon="🚧" color="" bgcolor="rgb(251, 243, 219)" %}我使用的软路由是 R4S，有两个网口。如果你是跟我一样的网络拓扑，请保证你的软路由至少有两个或以上网口，因为一个需要连主路由，另一个需要连光猫。{% endrender_callout %}

{% render_callout icon="🚧" color="" bgcolor="rgba(244, 240, 247, 0.8)" %}我家的光猫网段是：192.168.1.x，主路由网段是 192.168.5.x；光猫地址是 192.168.1.1，R4S 的地址是 192.168.5.2，主路由 Lan 口地址是 192.168.5.1，路由器 Wan 口地址是 192.168.1.2。{% endrender_callout %}

## 确定是否支持白嫖

{% render_callout icon="🚧" color="" bgcolor="rgb(231, 243, 248)" %}目前北京地区的 IPTV 没有增加鉴权，但是从我看到的信息来看其他地区的一些运营商有对 IPTV 进行加密鉴权，即必须用运营商给的 IPTV 盒子的 Mac 地址连接（盒子起到解密的作用），才能实现脱离盒子使用软路由进行局域网任意设备的播放。具体如何实现比较复杂，本教程不介绍这个场景。{% endrender_callout %}

### 提前下载 VLC

光猫桥接，路由器拨号的方式上网后，连接光猫后是无法上网的，因此请先提前在电脑上下载好 VLC 播放软件，以供一会儿进行测试，VLC 播放器地址在这里下载：

{% render_bookmark url="https://www.videolan.org/vlc/" title="Official download of VLC media player, the best Open Source player - VideoLAN" img="" yid="" bid="" %}
Official download of VLC media player, the best Open Source player
{% endrender_bookmark %}

### 连接光猫

将**电脑使用有线的方式连接光猫**的 IPTV 口（如果光猫上没有发现 IPTV 口，则表示光猫支持混插，即接口不区分宽带和 IPTV 口，插任意一个口都行），然后在 VLC 软件中：

- 打开 File-Open Network。

- 点击下面的 Open RTP/UDP Stream。

- Protocol 选 RTP，Mode 选 Multicast，IP Address 填：`239.3.1.241` （或者 `rtp://239.3.1.241` ，具体哪个忘了）端口填 `8000` 。

点 Open 之后，如果可以看到北京卫视，说明你可以免费白嫖。

{% render_caption caption="VLC RTP 播放" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/ea9168ee-6086-42df-b6b4-269900eb5592.webp" %}
![VLC RTP 播放](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/ea9168ee-6086-42df-b6b4-269900eb5592.webp)
{% endrender_caption %}

{% render_callout icon="💡" color="" bgcolor="rgb(251, 243, 219)" %}这里的 `rtp://239.3.1.241:8000` 就是北京卫视的组播地址，将来该地址可能有变化，具体准确的地址，可以到 `https://raw.githubusercontent.com/qwerttvv/Beijing-IPTV/master/IPTV-Unicom.m3u` 这里，找到任意一个 rtp 路径后面的 ip 地址进行测试。{% endrender_callout %}

## 基本概念解释

不想了解的直接跳到下一节。

### IPTV

根据维基百科对 IPTV 的解释：

{% render_callout icon="📖" color="" bgcolor="rgb(241, 241, 239)" %}网路协定电视（英语：Internet Protocol Television，缩写：IPTV）是宽频电视的一种。IPTV 是用宽频网络作为介质传送电视信息的一种系统，将广播节目透过宽频上的网际协议（Internet Protocol, IP）向订户传递数码电视服务。由于需要使用网路，IPTV 服务供应商经常会一并提供连接互联网及 IP 电话等相关服务，也可称为“三重服务”或“三合一服务”（Triple Play）。IPTV 是数位电视的一种，因此普通电视机需要配合相应的机顶盒接收频道，也因此供应商通常会向客户同时提供随选视讯服务。虽透过宽频网路及网际协议，但 IPTV 不一定透过网际网路，为传输品质会通过局域网传输。{% endrender_callout %}

有此可知，一般情况下 IPTV 都是宽带提供商提供的服务，通过它可以看电视。

### 组播

一种 IPTV 实现播放的技术手段，英文名叫「multicast」，也译为多播。具体概念不用弄太清楚，了解到它相比于单播：

**优势在于：**

- 不占用互联网带宽。

- IPTV 盒子起到认证的作用，IPTV 运营商由于是对一个组进行广播，因此对自己的服务器压力较小。

劣势**在于：**

- 必须有线连接光猫 IPTV 口（有些光猫支持混插，即不区分 IPTV 口还是宽带口）才能用，因此只能连接 IPTV 盒子的设备使用，不能使用 WiFi 让家里任意设备观看网络电视。

### 单播

另一种较老的 IPTV 实现播放的技术手段，早期 IPTV 用户不多的时候使用该方案，相比于组播来说，彼之缺点就是其之优点，反之亦然，即：

**优势在于：**

- 接入后，局域网支持 WiFi ，以供任意设备播放。

**劣势在于：**

- 跟服务器 1 对 1 连接，服务器压力较大，用户多的时候播放会比较卡顿。

- 占用宽带的带宽，直接使用互联网连接进行的播放（就跟现在看直播一样）。

### udpxy

{% render_quote color="" %}udpxy 服务器是**一款 UDP 流转 HTTP 流的代理服务器**，可以将 IP 直播流转化为 HTTP 流，方便在各种终端上播放。{% endrender_quote %}

当无法直接获取到组播地址的时候，用来将组播地址转为单播地址，如组播地址是：a:b， d:e（a、d 为 ip 地址，b、e 为端口）；转换成单播地址后就是统一的地址如 z/a/b，z/d/e。播放器监听这个地址 z 即可。

### m3u

{% render_quote color="" %}**M3U**（MP3 URL 的缩写）是一种播放多媒体列表的文件格式，它的设计初衷是为了播放音频文件，比如 MP3，但是越来越多的软件现在用做播放视频文件列表的格式。{% endrender_quote %}

m3u 文件就是一个里面含有全部播放组播地址的文本文件，在 Apple TV 或者电脑上读取这个文件地址，就可以播放其中的视频地址。

### EPG

包含节目单信息，上一步知道 m3u 地址后，里面都是一个个的 ip 地址，那如何知道每个 ip 地址是哪个频道呢？这个时候就需要一个 EPG 进行配对了，EPG 含有每个地址的节目信息，甚至是频道的简单介绍，EPG 通常会随着视频信号一起广播。

## 网络拓扑

{% render_caption caption="网络拓扑-主路由拨号" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/0349a1d5-caeb-4233-b36b-8bc1c7db7565.webp" %}
![网络拓扑-主路由拨号](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/0349a1d5-caeb-4233-b36b-8bc1c7db7565.webp)
{% endrender_caption %}

## 上手实操

{% render_callout icon="🚧" color="" bgcolor="rgb(251, 243, 219)" %}动手之前先按照开头所述检查是否支持白嫖。{% endrender_callout %}

### 设置软路由

**安装 udpxy 和 luci-udpxy**

这一步就是常规的操作了，UI 安装最方便，如图（安装完成后先别启用，最后一步再启用）：

{% render_caption caption="软件安装界面" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/2be1ca35-90a8-4936-89cd-5458557ac064.webp" %}
![软件安装界面](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/2be1ca35-90a8-4936-89cd-5458557ac064.webp)
{% endrender_caption %}

**新建/配置网络接口**

这一步为了让软路由识别到来自光猫的数据。

- 在 `网络-接口` 中新建一个接口，随便起个名字叫 `IPTV` ：

{% render_caption caption="新建 IPTV 接口" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/a938e2a7-9723-40f5-8b86-3ed151ba12c5.webp" %}
![新建 IPTV 接口](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/a938e2a7-9723-40f5-8b86-3ed151ba12c5.webp)
{% endrender_caption %}

注意箭头的部分，我已经新建好了所以括号中有 IPTV 字样，刚新建的时候是没有的。其中 eth1 是我的 Lan 口，接的是主路由；eth0 是另一个接口，接的即是光猫（IPTV 口）；这里我曾经修改过，默认情况下，eht0 是 Lan 口，eth1 是 Wan 口，不重要，这一步是将 Wan 口用作 IPTV 口。

- 配置「IPTV」接口的网关跃点与防火墙设置：

{% render_caption caption="配置网关跃点" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/d1df1f84-7240-4eb9-872b-6871f9c895a6.webp" %}
![配置网关跃点](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/d1df1f84-7240-4eb9-872b-6871f9c895a6.webp)
{% endrender_caption %}

{% render_caption caption="防火墙配置到 wan 上" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/c0e4032b-f066-4fcf-b906-dae85a37d070.webp" %}
![防火墙配置到 wan 上](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/c0e4032b-f066-4fcf-b906-dae85a37d070.webp)
{% endrender_caption %}

- 配置 Wan 口的网关跃点：

{% render_caption caption="Wan 口网关跃点" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/21347824-ca57-4715-9fe9-cd7b6be0f282.webp" %}
![Wan 口网关跃点](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/21347824-ca57-4715-9fe9-cd7b6be0f282.webp)
{% endrender_caption %}

- 配置 Lan 口 IGMP 嗅探：

{% render_caption caption="IGMP 嗅探" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/b075aaec-042b-4f9d-9437-27ea4d17211e.webp" %}
![IGMP 嗅探](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/b075aaec-042b-4f9d-9437-27ea4d17211e.webp)
{% endrender_caption %}

- 配置网络防火墙

{% render_caption caption="网络防火墙配置" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/577418eb-c3f6-43be-b73b-b1cf3ab5dcea.webp" %}
![网络防火墙配置](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/577418eb-c3f6-43be-b73b-b1cf3ab5dcea.webp)
{% endrender_caption %}

{% render_caption caption="防火墙配置2" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/b3ce719b-a05d-41ef-ab4a-12eb866178a8.webp" %}
![防火墙配置2](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/b3ce719b-a05d-41ef-ab4a-12eb866178a8.webp)
{% endrender_caption %}

**配置 udpxy 服务**

- 如图配置即可，注意这里的 eth0 是 Wan 口，别搞错了：

{% render_caption caption="打开 UDPXY" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/bcd40c05-ed7f-43fd-b833-4cee94948150.webp" %}
![打开 UDPXY](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/bcd40c05-ed7f-43fd-b833-4cee94948150.webp)
{% endrender_caption %}

最后尝试打开  [http://192.168.5.2:4022/status]([object Object])  验证 udpxy 服务是否启动成功：

{% render_caption caption="看到这个就表示成功了" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/189e9cb4-80c9-4b5d-8f57-722660e66145.webp" %}
![看到这个就表示成功了](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/189e9cb4-80c9-4b5d-8f57-722660e66145.webp)
{% endrender_caption %}

之后，将之前使用 VLC 打开的地址 `rtp://239.3.1.241:8000` 改成 `http://192.168.2.1:4022/rtp/239.3.1.241:8000` 再尝试打开（不用点下面的 Open RTP/UDP Stream，直接在 URL 中打开）。

{% render_caption caption="尝试将 RTP 变 HTTP 播放" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/582e015c-4260-4181-a81c-5eafc97a1132.webp" %}
![尝试将 RTP 变 HTTP 播放](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/582e015c-4260-4181-a81c-5eafc97a1132.webp)
{% endrender_caption %}

然后双击播放即可：

{% render_caption caption="成功画面↑" img="https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/215aa895-e673-419a-a4fc-b94603af8baa.webp" %}
![成功画面↑](https://static.xheldon.cn/img/in-post/2023/iptv-for-apple-tv-in-beijing/215aa895-e673-419a-a4fc-b94603af8baa.webp)
{% endrender_caption %}

### 使用播放软件

我是在 Apple TV 4K 看电视的，试了几个播放软件，这里简单说说：

- iPlayTV 不能播放，不知道为什么。

- Fileball 上下换台没问题，但是一选台就闪退。

- 最终选择了 IIVA 同一个开发者的 app：「TV+」，港区售价 38 港币（购买第二天就限免，尴尬）。

## 如何实现自动更新地址

联通的 IPTV 节目播放地址，每隔一段时间都会变一次，有时候变的是端口，有时候变的是 ip 地址，这个时候再用这个办法播放就失效了，怎么办呢？

网上有好心人，经过一系列复杂监听操作，比如这个：

{% render_bookmark url="https://blog.friskit.me/2020/05/31/bjunicom-network.html" title="光纤入户光猫改桥接+内网转发IPTV=任意设备看电视直播 - Botian's Blog" img="" yid="" bid="" %}
警告：本文将会介绍修改本地网络环境，部分操作有可能会导致你无法连接网络，如果不具备相关的网络知识，可能难以修复，甚至需要请运营商人员协助。所以以下内容请谨慎操作注意：请确保你手中有你家网络的 PPPoE 拨号账户密码（通常印在了办理业务给的用户回单上），也可以通过电话咨询运营商，也可以进入到路由器的设置里找到相应的用...
{% endrender_bookmark %}

获取到了 IPTV 电视盒子与联通服务器通信的数据，拿到了它的地址，因此我们直接使用即可，如：

{% render_bookmark url="https://github.com/qwerttvv/Beijing-IPTV/blob/master/README.md" title="github.com" img="" yid="" bid="" %}
https://github.com/qwerttvv/Beijing-IPTV/blob/master/README.md
{% endrender_bookmark %}

但是这里有个点是，你家里的软路由地址需要跟这位好心人的地址是一样的（192.168.123.1），然后将 udpxy 端口改为 23234，这样你就可以直接将这个地址放到 TV+ 里面即可：

{% render_bookmark url="https://raw.githubusercontent.com/qwerttvv/Beijing-IPTV/master/IPTV-Unicom.m3u" title="raw.githubusercontent.com" img="" yid="" bid="" %}
https://raw.githubusercontent.com/qwerttvv/Beijing-IPTV/master/IPTV-Unicom.m3u
{% endrender_bookmark %}

否则，你就只能主动监听这个文件的变动，然后更新。

这里我花十分钟在 Vercel 部署了一个 API 服务，同时启用了 Vercel 的 Corn Jobs 服务，可以定时执行函数，来检测变动，代码如下，你也可以自己部署一套：

```javascript
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  msg: string,
};

/**
 * 该函数用来将网友通过 IPTV 盒子抓包获取的联通单播地址，转成自己的单播地址
 * 该函数每天 3 点触发一次，定时检测网友的单播地址是否有更新，使用 vercel corn 任务进行
 * TODO: 该函数未做鉴权，任何人都可以手动触发检测，为了防止滥用可以加上鉴权，但是 corn 似乎没这个功能
 */
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  // Note: 步骤
  // 1. 获取网友通过监听盒子数据包抓取的（自己搞比较费劲，直接用现成的了）联通 IPTV 永久地址（rtp 协议的组播地址，多用户通用），获取其内容
  // 2. 添加本地 udpxy 转发地址
  // 3. 获取之前的 github gist 内容以对比二者
  // 4. 有差异，则更新 github gist 内容
  // 5. 没有，则不做操作
  // Note: 环境变量，自己在 Vercel 中设置好
  const token = process.env.GITHUB_TOKEN;
  const gist = process.env.GIST_URL;
  const id = process.env.GIST_ID;
  return fetch(
    'https://raw.githubusercontent.com/qwerttvv/Beijing-IPTV/master/IPTV-Unicom.m3u'
  )
    .then(async (res) => {
      if (!res.ok) {
        console.log('获取源地址异常');
        return response.status(200).json({
          msg: '获取源地址异常',
        });
      }
      const src = await res.text();
      // Note: 替换网友的本地单播地址为我的，其实你也可以将自己家的路由器网段设置成跟网友的一样（192.168.123.x），udpxy 端口转发设置成跟网友一样（23234），你就可以直接使用该地址了
      const newGist = src.replace(
        /http\:\/\/192\.168\.123\.1\:23234/g,
        'http://192.168.5.2:4022'
      );
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      // Note: 获取 gist 的 raw 内容，需要加个 cache-bust 否则每次请求会被缓存
      return fetch(`${gist}?cache-bust=${Math.floor(Math.random() * 100000)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (pre) => {
          const preGist = await pre.text();
          // console.log('preGist:', preGist);
          if (JSON.stringify(newGist) !== JSON.stringify(preGist)) {
            // Note: 更新 Gist
            const files = {
              'IPTV.m3u': {
                content: newGist,
              },
            };
            return fetch(`https://api.github.com/gists/${id}`, {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain',
              },
              body: JSON.stringify({ files }),
            })
              .then((s) => {
                console.log(
                  `更新成功: ${gist}?cache-bust=${Math.floor(
                    Math.random() * 1000000
                  )}`
                );
                return response.status(200).json({
                  msg: `更新成功: ${gist}?cache-bust=${Math.floor(
                    Math.random() * 1000000
                  )}`,
                });
              })
              .catch((e) => {
                console.log(`更新失败: ${e}`);
                return response.status(200).json({
                  msg: `更新失败: ${e}`,
                });
              });
          }
          console.log(
            `未变化: ${gist}?cache-bust=${Math.floor(Math.random() * 1000000)}`
          );
          return response.status(200).json({
            msg: `未变化: ${gist}?cache-bust=${Math.floor(
              Math.random() * 1000000
            )}`,
          });
        })
        .catch((e) => {
          console.log(`获取自己的 gist 失败: ${e}`);
          return response.status(200).json({
            msg: `获取自己的 gist 失败: ${e}`,
          });
        });
    })
    .catch((e) => {
      console.log(`获取别人的源失败: ${e}`);
      return response.status(200).json({
        msg: `获取别人的源失败: ${e}`,
      });
    });
}
```

Corn Jobs 服务配置：

```json
{
  "crons": [
    {
      "path": "/api/get",
      "schedule": "0 15 * * *"
    }
  ]
}
```

拉取该文件后若有更新，会自动更新 gist 文件：

{% render_bookmark url="https://gist.githubusercontent.com/Xheldon/73bf97cb5ac5db2f5237264556b20951/raw/ea44694028a38baefff04ea46c02795e448d76f0/IPTV.m3u" title="gist.githubusercontent.com" img="" yid="" bid="" %}
https://gist.githubusercontent.com/Xheldon/73bf97cb5ac5db2f5237264556b20951/raw/ea44694028a38baefff04ea46c02795e448d76f0/IPTV.m3u
{% endrender_bookmark %}

这样，我只需要在 TV+ 中写死这个 gist 地址，即可在网友更新这个地址的时候，自动更新了。

## 参考链接

{% render_bookmark url="https://blog.lishun.me/iptvhelper-guide" title="单线融合IPTV到家庭局域网最简单的方法：路由+桥接混合模式" img="https://www.notion.so/image/https%3A%2F%2Fi.typlog.com%2Fshun%2F8424208919_08088.png%3Fx-oss-process%3Dstyle%2Fss?table=block&id=96dd71a4-4795-4c54-aedf-0bd706fe5c45&spaceId=1e3e7c05-fc11-4038-9f76-92db32b98824&width=500&userId=0bfcee52-05b1-4d38-bf9a-26223d36426c&cache=v2" yid="" bid="" %}
目录 前言 基础知识 第一步：光猫改桥接 桥接的方法 确认你的网络结构 第二步：Openwrt 路由器及基本配置 设置接口 网关跃点 第三步：组播代理到家庭网络 组播代理 组播转单播 第四步：融合 IPTV 内容服务网络到家庭网络 使用 IPTV...
{% endrender_bookmark %}

{% render_bookmark url="https://blog.friskit.me/2020/05/31/bjunicom-network.html" title="光纤入户光猫改桥接+内网转发IPTV=任意设备看电视直播 - Botian's Blog" img="" yid="" bid="" %}
警告：本文将会介绍修改本地网络环境，部分操作有可能会导致你无法连接网络，如果不具备相关的网络知识，可能难以修复，甚至需要请运营商人员协助。所以以下内容请谨慎操作注意：请确保你手中有你家网络的 PPPoE 拨号账户密码（通常印在了办理业务给的用户回单上），也可以通过电话咨询运营商，也可以进入到路由器的设置里找到相应的用...
{% endrender_bookmark %}

{% render_bookmark url="https://www.haoyizebo.com/posts/6a0c2301/" title="北京联通白嫖 IPTV" img="https://www.notion.so/image/https%3A%2F%2Fbimg.503725.xyz%2Fimg%2F1684758526-0EwWPN.jpg%3Fx-oss-process%3Dimgalias%2Fblog-index-thumbnail?table=block&id=47748e7e-0c71-43eb-a917-f8f5e8bc458e&spaceId=1e3e7c05-fc11-4038-9f76-92db32b98824&width=500&userId=0bfcee52-05b1-4d38-bf9a-26223d36426c&cache=v2" yid="" bid="" %}
北京联通是没开通 IPTV 也能收到电视组播数据的。 本文就介绍如何白嫖北京联通 IPTV，并使任意设备可在家庭网络上流畅观看 IPTV 的直播流。
{% endrender_bookmark %}
