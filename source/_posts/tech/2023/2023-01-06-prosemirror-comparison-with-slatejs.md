---
layout: post
date: 2023-01-06 12:14:58 +0800
categories: tech
path: _posts/tech/2023/2023-01-06-prosemirror-comparison-with-slatejs.md
cos: 2023/prosemirror-comparison-with-slatejs
headerMask: 0.4
tags:
  - 技术
  - SlateJS
  - ProseMirror
  - 对比
  - 编辑器
  - 选型
  - 框架
craft: https://www.craft.do/s/WCeEgxNhxwF2cu
noCatalog: true
callout: Slate 和 Prosemirror 各用过两年后的简单对比总结
title: Slate 和 ProseMirror 简单对比
headerImg: https://static.xheldon.cn/img/in-post/2023/prosemirror-comparison-with-slatejs/photo-1546900703-cf06143d1239.webp
headerImgCredit: Joshua Aragon / Unsplash
headerImgCreditHref: https://unsplash.com/@goshua13?utm_source=xheldon_blog&utm_medium=referral
sha: 07e482ad2b44ecb04a8eca83c1a2cf2704eb6b39
lastUpdateTime: 2023-01-09 20:11:20 +0800
---

本人之前使用 PM 不到两年，开发过大型模块如智能表格等；使用 Slate 至今，经历过从 0.47 到 0.5+ 的大版本升级，算是有点发言权，鉴于圈内一些人总问我二者之间的差异，干脆写个博客简单来说说。

## Slate 优点：

1. 上手快，开箱即用，概念易懂，代码容易理解，尤其是对熟悉 React 的同学来说，其视图层完全基于 React，基本上一周就能上手理解。

1. 定制性强，可以根据自身的业务场景，魔改底层核心模块如 slate、slate-react 来扩展各种插件和架构，底层修改起来相对 PM 来说较为简单。

1. 可以很好的适配协同的场景，如 sharedb，基于 json 的几乎就是为 Slate 准备的。

## Slate 缺点：

1. 作者修复 Bug 速度很慢，并不全职开发，基本靠社区维护，有些 API 明显不合理（如 .include，被坑过），或者有些 API 抛出异常，但是有些 API 会返回 null，明显没设计好，但是作者让你给他提 PR，而不是自己修复。

1. API 不稳定，目前仍未发布正式版，还在 0.x 版本，将来架构变动可能会比较巨大。

1. 官方版本基本不可用，尤其针对 CJK 语言用户的输入法事件等来说，必须下载下来之后自己魔改一下才行。

1. 性能优化较为困难，因为视图层完全基于 React，所以优化这部分的代码几乎只能从优化 React 出发，React 只是通用型框架，在速度上并没有任何优势。

1. 代码没写好的话，很容易导致编辑器崩溃而导致编辑器不可用，除了修改框架代码，也没什么好的容错机制。

1. 数据流动不清晰，容易导致 bug 的产生，如你可以直接 editor.children 赋值，覆盖掉已有的编辑器内容，而不会有任何报错。

1. 光标问题、Mark 问题难以 hack，代码属于是入门级水平（个人理解）。

1. 文档垃圾，有些文档和实际 API 表现不一致。

1. 跟 React 强绑定。

1. 移动端目前支持的不算太好，需要魔改。

## ProseMirror 优点：

1. 作者全职维护，非常热心，积极回答社区问题。

1. 正式版发布三年多，API 一直很稳定。

1. 有大公司背书，Google 也是用作者的另一个 CodeMirror 项目（Chrome Devtools 的 Element Tab 用的就是），可信度高。

1. 数据流动清晰（虽然不好理解）。

1. 没有 Slate 那么容易崩溃，报错也不会导致整个编辑器框架不可用，稳定性较高。

1. 作者是自由工作者，靠捐款维持生活，名正言顺的接受付费解 Bug，按小时计费，每小时 200 欧（邮件问过，没记错的话）。

1. 文档树模型我觉得很好用，Schema 限制严格以及基于文本/Token 偏移的定位系统是精髓，不过也是难以协同的地方。

1. 不跟任意的视图框架依赖，可以用 React、View、Angular 开发视图框架，不过一般只有定制组件才需要，像 paragraph、heading、list 等，无需自定义 View 层，只需要使用 API 描述 DOM 结构即可。

1. 移动端支持较好。

## ProseMirror 缺点：

1. 一些概念较难理解，一些代码也难以理解（作者技术个人感觉深不可测）。

1. 模块分散非开箱即用，需要一定的上手成本才能跑起来。

1. 基于 PM 的协同方案，实现起来相较于 Slate 来说比较困难，作者 17 年开了个 issue，说要写一个协同的 demo，现在还没写。

1. 上手难度较大，往往需要两周甚至一个月的时间才能开始开发基础功能。

1. 因为是自己实现的视图层（开发者也可以使用 API 来实现渲染自定义组件如 React 组件），所以如果框架本身的视图层出问题，较难定位和修复。

1. 几乎不可能魔改源码，成本很高，只能靠作者来修复。

可以看下这个答主的对比，说的基本没什么大问题：

{% render_bookmark url="https://www.zhihu.com/question/404836496/answer/1323431059" title="主流的开源「富文本编辑器」都有什么缺陷？ - 知乎" img="https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png" yid="" bid="" %}
先占个坑……如何不借助 contentEditable 实现富文本编辑器？联动一下之前我在类似问题的回答我主要调研…
{% endrender_bookmark %}

美团的学城用的是 PM：

{% render_bookmark url="https://www.zhihu.com/question/404836496/answer/1326453810" title="主流的开源「富文本编辑器」都有什么缺陷？ - 知乎" img="https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png" yid="" bid="" %}
美团的知识管理系统-学城，其富文本编辑器是基于 prosemirror 来实现的，我在其中开发了内部团队接入版本及…
{% endrender_bookmark %}

## 总结

Slate 适合大公司，因为他上手快（大公司依赖投入产出比，不然项目拿不到资源，做了 2 月还是个 Demo 你怎么给领导交代？），因此可以很快出成果，但是打磨完美又需要很大的人力来魔改底层，所以适合大公司，前期快速上手，后期加人魔改。另外扩展性非常强，魔改后几乎可以满足任何要求（比如我们就搞了各种模块和功能，如划线评论、分级标题折叠、嵌入第三方模块等）。

Prosemirror 适合中小型公司，各平台支持的算不错，如果有 bug 也可以放心交给作者来修复，如果实在修不好就付费让作者修。虽然上手成本高，但是让中小型公司的主力研发摸索个两周应该也可以出 demo 了。
