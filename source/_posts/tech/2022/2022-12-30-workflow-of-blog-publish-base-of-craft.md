---
layout: post
date: 2022-12-30 22:50:55 +0800
categories: tech
path: _posts/tech/2022/2022-12-30-workflow-of-blog-publish-base-of-craft.md
cos: 2022/workflow-of-blog-publish-base-of-craft
header-style: text
tags:
  - 技术
  - Craft
  - 视频
  - 工作流
craft: https://www.craft.do/s/yZEbCH2GTNPZMD
noCatalog: true
callout: 第一次尝试做视频…
title: 【视频】基于 Craft 插件的博客发布工作流介绍
sha: 62ff8f9dcacd027439feedb39a8f7b4161f8a336
lastUpdateTime: 2023-01-18 10:32:10 +0800
---

此博文为视频，发布在：

- Youtube：

{% render_bookmark url="https://www.youtube.com/watch?v=6En0qS_evH8" title="基于 Craft 插件的博客发布工作流介绍" img="https://i.ytimg.com/vi/6En0qS_evH8/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGF8gXyhfMA8=&amp;rs=AOn4CLBEWnjdeCOEN8H8GmhsacDuLxhNOg" yid="6En0qS_evH8" bid="" %}
视频中提到的链接地址：Craft 官网：https://www.craft.do/Craft 插件文档：https://documentation.developer.craft.do/extensions/introduction我瞎搞的 Craft 插件集合仓库：https://github.com/craf...
{% endrender_bookmark %}

- Bilibili：

{% render_bookmark url="undefined" title="基于 Craft 插件的博客发布工作流介绍_哔哩哔哩_bilibili" img="//i0.hdslb.com/bfs/archive/f5e10f26a16960941d065f5bba0a34f1c12c2c05.jpg@100w_100h_1c.png" yid="" bid="BV1Me4y1g7bW" %}
视频中提到的链接地址：Craft 官网：https://www.craft.do/Craft 插件文档：https://documentation.developer.craft.do/extensions/introduction我瞎搞的 Craft 插件集合仓库：https://github.com/craft-extension替代 Craft Block 转 Markdown 的函数：ht, 视频播放量 294、弹幕量 1、点赞数 8、投硬币枚数 2、收藏人数 9、转发人数 2, 视频作者 Xheldon, 作者简介 https://xheldon.com，相关视频：我们自己做的在线论文阅读神器ReadPaper【硕博科研学术文献综述必备】，如何用 Craft 进行卡片写作？，笔记软件颜值的天花板！Craft！｜附白嫖攻略，Obsidian 插件 Easy Typing：极大地提升中文用户在 OB 中的编辑体验，知识付费小程序搭建教程-含 300+条后台资源数据【副业新项目 03】，AI 写作取代创作者 写作完还能自行优化，黑马程序员前端微信小程序开发教程，微信小程序从基础到发布全流程\_企业级商城实战(含 uni-app 项目多端部署)，从 0 到 1 完整制作工作日历表格模板，一键快速生成月度工作计划清单，Excel 日历制作只需要一个 SEQUENCE 函数，Obsidian 多端同步和备份方案
{% endrender_bookmark %}

这里额外再补充一点：

视频中提到的 XHelper.app 基本是这个仓库：

{% render_bookmark url="https://github.com/Xheldon/craft_publish_ci" title="GitHub - Xheldon/craft_publish_ci: 专门用于接收 Craft 文件然后拉取其图片转存到 cos，而 markdown 转发到 x_blog_src 的 ci 仓库" img="https://opengraph.githubassets.com/2c503ed9cefb90519220d797d89a4abf3144b3d221cfa9db8725913cecdf1e3b/Xheldon/craft_publish_ci" yid="" bid="" %}
专门用于接收 Craft 文件然后拉取其图片转存到 cos，而 markdown 转发到 x_blog_src 的 ci 仓库 - GitHub - Xheldon/craft_publish_ci: 专门用于接收 Craft 文件然后拉取其图片转存到 cos，而 markdown 转发到 x_blog_src 的 ci 仓库
{% endrender_bookmark %}

的 Apple Script 本地化版，因为最终执行的也是 nodejs 的代码，只是利用 AS 实现了响应了自定义 scheme 链接的效果。

{% render_caption caption="XHelper.app 的核心代码" img="https://static.xheldon.cn/img/in-post/2022/workflow-of-blog-publish-base-of-craft/9585A422-AAF2-43F9-9691-9804CE43A0C0_2.webp" %}
![XHelper.app 的核心代码](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/9DE57F16-D3BB-4E23-8A91-168829F20DDB/9585A422-AAF2-43F9-9691-9804CE43A0C0_2/NL2jQZuiWfIz4WZzZfUaMP0YRBn9JRJBQxQ6y1xEUvUz/Image.png)
{% endrender_caption %}

具体为什么不用 Github Action 处理而将这个过程本地化的原因，以及 Apple Script 相关入门介绍我当时还写了个博客，见 [这里](/tech/applescript-simple-use.html)。
