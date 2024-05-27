---
title: TeslaMate 使用指南
layout: post
date: 2023-9-6 8:0:00 +0800
cos: 2023/the-use-of-teslamate
path: _posts/life/2023/2023-09-06-the-use-of-teslamate.md
header-mask: 0.4
header-style: full
callout: 介绍一下 TeslaMate 安装和使用过程中的一些问题。
categories: life
reference: 
no-catalog: 
lastUpdateTime: 2023-9-8 8:0:00 +0800
header-img: https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/L3Bob3RvLTE1NTMyNjAxNjgtNjliMDQxODczZTY1-76e13c1d-ce74-4418-82db-1a746781afb6.webp
notion: https://xheldon.notion.site/TeslaMeta-76e13c1dce74441882db1a746781afb6?pvs=4
tags:
    - 折腾
    - 特斯拉
    - 车
    - 经验
    - 使用体验
    - 生活
    - TeslaMate
---

{% render_callout icon="💡" color="" bgcolor="rgb(251, 236, 221)" %}本指南需要有一丁点的编程知识，知道什么是终端、什么是命令行。{% endrender_callout %}

{% render_callout icon="💡" color="" bgcolor="rgba(244, 240, 247, 0.8)" %}本教程使用 Docker 安装 TeslaMate，如果你是在软路由环境，可能需要做一些额外操作如端口映射等，浏览器才能访问。而我的 Mac 电脑常年不关机，因此装在了 Mac 系统下的 Docker 上。{% endrender_callout %}

{% render_callout icon="💡" color="" bgcolor="rgb(231, 243, 248)" %}有点遗憾的是，TeslaMate 不能获取车辆的历史信息，因此你只能查看安装 TeslaMate 后的车辆行驶数据，且 TeslaMate 的服务不能关闭，否则无法记录到相关行驶数据。{% endrender_callout %}

## 前言

「TeslaMate」，简单翻译过来就是「特斯拉伴侣」，它是一款开源软件，可以获取车辆上报给特斯拉服务器的数据，然后使用 Grafana 这款 Web 数据可视化仪表盘工具显示出来。

TeslaMate 的仓库：

{% render_bookmark url="https://github.com/adriankumpf/teslamate#teslamate" title="GitHub - adriankumpf/teslamate: A self-hosted data logger for your Tesla  🚘" img="https://opengraph.githubassets.com/02a9f6d2407fe41f3b3b57c5eff440cb53893107c92ce54bf33a8a1a1145d140/adriankumpf/teslamate" yid="" bid="" %}
A self-hosted data logger for your Tesla  🚘. Contribute to adriankumpf/teslamate development by creating an account on GitHub.
{% endrender_bookmark %}

TeslaMate 的文档：

{% render_bookmark url="https://docs.teslamate.org/docs/installation/docker" title="Docker install | TeslaMate" img="" yid="" bid="" %}
This document provides the necessary steps for installation of TeslaMate on a any system that runs Docker. For a walkthrough that provides the necessary steps for manual installation see Manual Install.
{% endrender_bookmark %}

---

特斯拉的工程师们会收集这些数据进行车辆的大数据分析、软件优化、电池充电优化等，而我们个人车主获取这些信息则可以更好的了解自己爱车的一些详细数据，如历史行程、每日行驶里程数、耗电情况、充电效率等。

之所以有这篇博文是因为 TeslaMate 的文档只说了如何安装（很简单），但是并没有告诉你安装完成后如何配置才能看到想要的仪表盘，而网上的一些内容农场靠着 SEO 技巧，排名靠前的也都是复制粘贴官网内容来的，要找到想要的信息是有点困难的，我目前没看到有任何一篇讲从如何安装到成品的文章，所以本文从头讲起。

先上一张成果图（用户可以自定义面板）：

{% render_caption caption="TeslaMate 成果图" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/03d97d52-796e-4e46-83be-3ec3b3013cea.webp" %}
![TeslaMate 成果图](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/03d97d52-796e-4e46-83be-3ec3b3013cea.webp)
{% endrender_caption %}

## 一、安装 Docker

如开头所述，我使用 Docker 进行安装，TeslaMate 的文档要求是安装 Docker 和 Docker Compose（别管是什么，装就完了），而我们只需要安装 Docker Desktop 即可将这二者都装了，Docker Desktop 下载在这里：

{% render_bookmark url="https://www.docker.com/products/docker-desktop/" title="Docker Desktop: The #1 Containerization Tool for Developers | Docker" img="https://www.notion.so/image/https%3A%2F%2Fwww.docker.com%2Fwp-content%2Fuploads%2F2023%2F06%2Fmeta-image-download-docker-desktop-1110x580.png?table=block&id=2573b243-5722-4828-810b-bb98ea33c1e5&spaceId=1e3e7c05-fc11-4038-9f76-92db32b98824&width=500&userId=0bfcee52-05b1-4d38-bf9a-26223d36426c&cache=v2" yid="" bid="" %}
Docker Desktop is collaborative containerization software for developers. Get started and download Docker Desktop today on Mac, Windows, or Linux.
{% endrender_bookmark %}

安装后启动，然后随便找个目录（TeslaMate 的全部文件后续都会在这个目录，不要删除），将官方给的 `docker-compose.yml` 文件放入其中，我这里放到了 `~/Developer/Docker/TeslaMate` 下，`docker-compose.yml` 内容如下：

```yaml
version: "3"

services:
  teslamate:
    image: teslamate/teslamate:latest
    restart: always
    environment:
      - ENCRYPTION_KEY= #设置 TeslaMate API 加密密码，注意等号后面不要有空格
      - DATABASE_USER=teslamate
      - DATABASE_PASS= #设置安全数据库密码，注意等号后面不要有空格
      - DATABASE_NAME=teslamate
      - DATABASE_HOST=database
      - MQTT_HOST=mosquitto
    ports:
      - 4000:4000
    volumes:
      - ./import:/opt/app/import
    cap_drop:
      - all

  database:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_USER=teslamate
      - POSTGRES_PASSWORD= #设置数据库密码，注意等号后面不要有空格
      - POSTGRES_DB=teslamate
    volumes:
      - teslamate-db:/var/lib/postgresql/data

  grafana:
    image: teslamate/grafana:latest
    restart: always
    environment:
      - DATABASE_USER=teslamate
      - DATABASE_PASS= #设置 grafana 的数据库密码，注意等号后面不要有空格
      - DATABASE_NAME=teslamate
      - DATABASE_HOST=database
    ports:
      - 3000:3000
    volumes:
      - teslamate-grafana-data:/var/lib/grafana

  mosquitto:
    image: eclipse-mosquitto:2
    restart: always
    command: mosquitto -c /mosquitto-no-auth.conf
    # ports:
    #   - 1883:1883
    volumes:
      - mosquitto-conf:/mosquitto/config
      - mosquitto-data:/mosquitto/data

volumes:
  teslamate-db:
  teslamate-grafana-data:
  mosquitto-conf:
  mosquitto-data:
```

注意有些服务的密码设置是需要跟另一个服务密码一致的，所以我建议将上述的密码都设置成一样，省的麻烦。另外尤其需要注意的是 `=` 后面不要有空格。之后打开终端执行（每行复制到终端后按回车）：

```bash
# 假设你放上述文件的目录为 ~/Developer/Docker/TeslaMate
cd ~/Developer/Docker/TeslaMate
docker compose up -d
```

完成后，打开 Docker Desktop，应该是这个样子：

{% render_caption caption="安装完成后截图" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/cd39c66f-60b7-4d3d-81bd-f5ac50260d28.webp" %}
![安装完成后截图](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/cd39c66f-60b7-4d3d-81bd-f5ac50260d28.webp)
{% endrender_caption %}

## 二、登陆特斯拉账号授权

上一步完成无错误后，确保全部的服务都处于 Running 状态，（可以点击上面截图的各个服务名字查看对应 log，看有无类似与 error 之类的报错），在浏览器中打开 `localhost:4000` 后，发现会要求你输入 API Token 和 Refresh Token，这两个获取方式官方文档有写，在这里：

{% render_bookmark url="https://docs.teslamate.org/docs/faq/#how-to-generate-your-own-tokens" title="Frequently Asked Questions | TeslaMate" img="" yid="" bid="" %}
How to generate your own tokens
{% endrender_bookmark %}

这里我使用第三种方式「Tesla Auth (macOS, Linux, Windows) 」点击以下链接查看适用于自己系统的版本，下载对应文件（是一个可执行文件）：

{% render_bookmark url="https://github.com/adriankumpf/tesla_auth#download" title="GitHub - adriankumpf/tesla_auth: Securely generate API tokens for third-party access to your Tesla." img="https://opengraph.githubassets.com/14ed85d2b3ddb9d5945d743bce95d70195e338a20492ab583d95d8c0d4f14ebd/adriankumpf/tesla_auth" yid="" bid="" %}
Securely generate API tokens for third-party access to your Tesla. - GitHub - adriankumpf/tesla_auth: Securely generate API tokens for third-party access to your Tesla.
{% endrender_bookmark %}

直接双击打开（或者在终端打开）的话，如果是 MacOS 会提醒你该执行文件可能有危险，去 `系统设置-隐私与安全性`中，点击「仍要打开」即可。打开后会弹出一个窗口，让你登陆特斯拉账号，登陆完成后，页面会显示出特斯拉的 API Token 和 Refresh Token（截图我就不放了），将其复制到 `localhost:4000` 页面中的对应位置，即可成功登陆，登陆成功的界面是这样的：

{% render_caption caption="TeslaMate 授权成功界面" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/8d41bc35-475f-499d-b2d3-c4812e9a72e9.webp" %}
![TeslaMate 授权成功界面](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/8d41bc35-475f-499d-b2d3-c4812e9a72e9.webp)
{% endrender_caption %}

到这就算是鉴权成功了，接下来配置 Grafana。

## 三、Grafana 基本概念

Grafana 是一款非常强大的 Web 数据可视化仪表盘工具，使用相对比较复杂，而且我没有研究它汉化的方法。好在 Tesla 的数据字段比较简单，也用不着汉化。这里首先简单介绍一下相关概念，方便后续的自定义。

### Dashboard 和 Panel

Dashboard 就是一个显示各种数据的界面，可以显示不同的 Panel，Panel 就是一个查询数据库获得数据后，将数据可视化的一个个模块，如下每个红框就是一个 Panel：

{% render_caption caption="N 个 Panel 组成了一个 Dashboard" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/6b5bfe32-8214-4994-a6ce-9b3a1874e11e.webp" %}
![N 个 Panel 组成了一个 Dashboard](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/6b5bfe32-8214-4994-a6ce-9b3a1874e11e.webp)
{% endrender_caption %}

Panel 可以在不同的 Dashboard 之间复制，如下：

{% render_caption caption="Panel 复制" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/2522b63e-34e9-44e2-a0ba-2d74901ea53b.webp" %}
![Panel 复制](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/2522b63e-34e9-44e2-a0ba-2d74901ea53b.webp)
{% endrender_caption %}

点击复制后，就可以在另一个 Dashboard 中粘贴，点击 Dashboard 右上角的 Add Panel 按钮（或者首次新建一个Dashboard 的时候）（如果没在上一步对 Panel 点 Copy，下图中的第四个「Paste from Clipboard 」就不会出现）就会出现下面的新建 Panel：

{% render_caption caption="粘贴刚刚复制的 Panel" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/37d13b9a-d6b0-4e19-9bd9-b41712ea5e05.webp" %}
![粘贴刚刚复制的 Panel](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/37d13b9a-d6b0-4e19-9bd9-b41712ea5e05.webp)
{% endrender_caption %}

### Variable（变量）和 JSON Model

**Variable**

每个 Dashboard 可以设置供 Panel 使用的 Variable，而 Panel 如何使用 Variable 呢？Panel 的数据是通过 SQL 查询查出来的，而 SQL 的部分语法是 grafana 的 SQL 模板语法，下面是查询海拔的 SQL 语法：

```sql
SELECT
	$__time(date),
	ROUND(convert_m(elevation, '$alternative_length_unit')) AS elevation_[[alternative_length_unit]]
FROM
	positions
WHERE
 car_id = $car_id AND
 $__timeFilter(date)
ORDER BY
	date ASC
```

其中的带 `$` 符号的就是预设的 Variable，有些是内置的如 `$__timeFilter`，有些是自定义的如 `$alternative_length_unit`，自定义的变量就是 Dashboard 配置的 Variable。Dashboard 的 Variable 在 Dashboard 右上角的 Dashboard Setting 里配置：

{% render_caption caption="Variable 配置" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/f624e3f9-bea2-4293-82e0-e751886acb3b.webp" %}
![Variable 配置](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/f624e3f9-bea2-4293-82e0-e751886acb3b.webp)
{% endrender_caption %}

**JSON Model**

有时候你会发现，从一个 Dashboard 复制了一个 Panel 粘贴到新 Dashboard 后，Panel 并不能正常显示数据，就是因为你没有将源 Panel 用到的 Variable 从源 Dashboard 中复制到新 Dashboard 中，导致 SQL 语法报错，数据无法查询出来。但是如果 Dashboard 的 Variable 很多的话，一个一个复制又非常麻烦，怎么办呢？此时可以通过 JSON Model 来解决。

JSON Model 其实就是 Dashboard 配置的 JSON 格式，因此，你只需要复制某个 Dashboard 对应字段的内容，就可以复制相应的内容到目标 Dashboard。Variable 在 JSON Model 中对应的字段是 `templating` ，复制其内的 `list` 中的对应项到目标 Dashboard 的 JSON Model 对应 `templating` 字段的 `list` 字段，作为其项即可（**记得点击 Save Changes 后再点击 Save dashboard**）：

{% render_caption caption="直接复制对应 JSON" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/1ebb8257-1f17-48ee-9406-5849d320dea5.webp" %}
![直接复制对应 JSON](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/1ebb8257-1f17-48ee-9406-5849d320dea5.webp)
{% endrender_caption %}

Grafana 还有很多其他复杂的功能，不过对于我们特斯拉数据可视化来说，了解这么多即可。

## 四、配置 Grafana

访问 `localhost:3000` 后首先需要登录，首次默认用户密码都是 `admin` ，首次登陆成功后会让你设置密码，设置后进入是这个界面：

{% render_caption caption="Grafana 默认 Dashboard" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/de518aa9-edce-48d8-94db-fbf8a7a48f85.webp" %}
![Grafana 默认 Dashboard](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/de518aa9-edce-48d8-94db-fbf8a7a48f85.webp)
{% endrender_caption %}

这里，TeslaMate 已经给我们配置好了各种 Dashboard，点击左侧的这个地方可以打开文件夹查看文件夹目录下的各个 Dashboard：

{% render_caption caption="查看 TeslaMate 预设的 Dashboard" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/c36ebc9b-bda2-4ab6-933d-2da603f9ccf7.webp" %}
![查看 TeslaMate 预设的 Dashboard](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/c36ebc9b-bda2-4ab6-933d-2da603f9ccf7.webp)
{% endrender_caption %}

{% render_caption caption="各种 Dashboard" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/58bbe182-7bbf-4814-97dd-c8406525a659.webp" %}
![各种 Dashboard](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/58bbe182-7bbf-4814-97dd-c8406525a659.webp)
{% endrender_caption %}

随便点开一个，如 `Drive Stats`，可以查看相应 Dashboard 中的各种 Panel：

{% render_caption caption="Drive Stats Dashboard" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/29c1c887-e773-40b5-9ea1-fb8c3cc703dd.webp" %}
![Drive Stats Dashboard](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/29c1c887-e773-40b5-9ea1-fb8c3cc703dd.webp)
{% endrender_caption %}

但是我们肯定想将多个这些预设的 Dashboard 中的 Panel 按照我们的需要聚合到一个新的 Dashboard 中，这里就需要用到上一步「Grafana 概念」中的 复制 Panel、复制 Variable（复制 JSON Model）的操作，各位可以自己配置符合自己需求的 Dashboard。

## 五、其他

这里还有 Grafana 的其他一些使用问题，简单写一下。

**配置 Panel 标题：**

点击 Panel 上方的 Edit 后在右侧修改 Title 即可：

{% render_caption caption="修改 Panel 标题" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/c7de415f-98cb-40cd-aa6d-b49485ecb96b.webp" %}
![修改 Panel 标题](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/c7de415f-98cb-40cd-aa6d-b49485ecb96b.webp)
{% endrender_caption %}

**地图不显示：**不多说，需要魔法上网环境。

**设置自己的 Dashboard 为默认：**

如图：

{% render_caption caption="配置默认的 Dashboard" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/f3be5470-440c-42bf-a65c-4440b05c8e00.webp" %}
![配置默认的 Dashboard](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/f3be5470-440c-42bf-a65c-4440b05c8e00.webp)
{% endrender_caption %}

**如何在 Dashboard 中，鼠标 Hover 其中一个 Panel 查看数据的时候，另一个 Panel 也对应显示相关时间点的数据？**

这个场景比较常用的是，鼠标 Hover 在折线图 Panel 的驾驶信息上查看车速的时候，想要同步在另一个地图 Panel 上查看在地图上的对应位置。可以通过设置 Dashboard 来解决，下图设置为 第二个即可（默认是第一个）：

{% render_caption caption="" img="https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/4099d485-a478-4553-a9a5-36beb941f5e8.webp" %}
![](https://static.xheldon.cn/img/in-post/2023/the-use-of-teslamate/4099d485-a478-4553-a9a5-36beb941f5e8.webp)
{% endrender_caption %}

**安全性？**：TeslaMate 是国外开源软件，安全性是可以保证的。

**换机器如何迁移数据？**：这个可以查看 TeslaMate 的文档，有详细说明。

**公网如何访问 Grafana？**：这就需要用到 DDNS 了，这个自行摸索。

**究极提醒：**修改 Panel 后记得点击右上角的 Save。

**如何定时刷新 Dashboard：**在 Dashboard 右上角可以设置刷新间隔，一般用来放到一个大的显示屏上，全天实时查看数据变化用的。




