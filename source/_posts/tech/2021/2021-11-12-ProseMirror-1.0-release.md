---
layout: post
title:  "「译」ProseMirror 1.0 发布"
date:   2021-11-12 12:10:23 +0800
categories: tech
reference: https://marijnhaverbeke.nl/blog/prosemirror-1.html
callout: 原文作者写于 2017 年 10 月 13 日，回顾了 开发 ProseMirror 1.0 以来的经历，本文偏意译。
header-style: text
tags:
    - 技术
    - ProseMirror
    - 翻译
---

> 文中所有 `https://prosemirror.xheldon.com` 的链接均可换成 `https://prosemirror.net` 的链接以查看原文中的原始引用。

两年前，我启动了 [ProseMirror](https://prosemirror.xheldon.com) 项目，因为我想尝试[一种更好]({{site.baseurl}}/tech/ProseMirror.html)的所见即所得式的编辑方法。今天，我发布了[该库](https://github.com/prosemirror/)的 [1.0 版本](https://discuss.prosemirror.net/t/release-1-0-0/998)。项目的架构和它的内部实现在其生命周期中发生了相当大的变化，但我觉得最初的目标已经实现了。

ProseMirror 是一个 Web UI 库，尽管它所解决的一些挑战是针对 Web 平台的优势和（特别是）弱点的，但不要把它看成是另一个 TinyMCE 的替代品。相反，它是一种更通用的富文本编辑方式，而恰好是在浏览器上用 JavaScript 实现的（意即你可以根据该库的逻辑翻译成其他语言版本的富文本编辑器，如 OC 版本等---译者注）。

## 基于 Scheme 约束的编辑

ProseMirror 中最重要的是，其与实际的文档内容无关，这使得在这个库的基础上建立应用程序成为可能，而在过去，这需要一个完全自定义的编辑器实现。

我所说的与文档内容无关是指 ProseMirror 的 [Scheme 约束](https://prosemirror.xheldon.com/docs/guide/#schema)功能。核心编辑器对文档的具体内容不做任何要求，而是看一段可配置的数据（scheme）来确定允许什么样的内容以及它组成什么样的结构。ProseMirror 将[精确地](https://prosemirror.xheldon.com/examples/schema/)与您所需要的[自定义](https://prosemirror.xheldon.com/examples/dino/)语义文档格式一起工作，同时仍然给您提供用户习惯的所见即所得的编辑风格。

例如，一个科学写作应用可以使用一个包括章节、脚注和参考文献的 scheme---两个这样的应用，[SciFlow](https://sciflow.net/en/home) 和 [Fidus Writer](https://www.fiduswriter.org/) 已经建立在 ProseMirror 之上。或者一个新闻机构可以建立一个反映其内容模型的 scheme，为记者提供一个可以写作的编辑器。例如，[《纽约时报》](https://www.nytimes.com/)正在其 CMS 中使用 ProseMirror。或者，如果你的公司有一些不同的内容模型的编辑器，使用 ProseMirror 与不同的 scheme 可以使你的编辑器代码更容易统一。[Atlassian](https://www.atlassian.com/) 正在他们的产品中推广 ProseMirror，从 wiki 到 bug 追踪器到源码托管。

## 协作

对[协作编辑]({{site.baseurl}}/tech/Collaborative-Editing-in-ProseMirror.html)的支持从一开始就是 ProseMirror 的一个重点。该系统的几个方面，如文档更新的表现方式，或撤销历史模块的工作方式，都受到了协作编辑需求的强烈影响。我已经确信，这不是一个你可以在现有编辑器上扩展出来的功能。

幸运的是，这些限制并没有把设计逼到一个不舒服的角落，而是帮助推动它向一个普遍有益的方向发展。其他几个棘手的功能，如变化跟踪和回滚过去的变化的能力，都是由于协作编辑相关的[设计决定](https://prosemirror.xheldon.com/docs/guide/#transform.steps)而得以实现的。

## 事务性的状态更新

试图将协作编辑的要求与一个功能性的[单向数据流](http://redux.js.org/docs/basics/DataFlow.html)架构结合起来，导致了我们的设计，其中编辑器，而不是单方面更新其状态，而是发出事务。一个事务可以用来计算一个新的状态，用它来更新编辑器。

这使得如果你想的话，几乎可以在你的应用程序的数据流循环中无缝集成编辑器。此外，将更新作为第一类值使得保持外部状态与编辑器同步变得更加容易，这使得新的、强大的扩展类型成为可能。

## 总结

经过多年的疯狂实验和不断变化，从 1.0 版本开始，我们的目标是稳定。核心模块将尽可能长时间地停留在 1.x 上，这意味着新版本不需要你改变你的代码。有一个 [RFC 进度](https://github.com/prosemirror/rfcs/)，我们会用它来获取社区对新功能的反馈。

如果你正在寻找一个简单的插件式富文本编辑器组件，ProseMirror 可能不是你需要的东西。(我们确实希望这样的组件能够用 ProseMirror 构建)。这个库是为要求高的、高度集成的用例而优化的，以简单为代价。但是，如果你的应用程序正在挑战所见即所得编辑器的极限，那么可以考虑[使用一下](https://prosemirror.xheldon.com)。