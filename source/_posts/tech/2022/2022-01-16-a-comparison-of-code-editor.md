---
layout: post
date: 2022-01-16 23:57:18 +0800
categories: tech
header-style: text
path: _posts/tech/2022/2022-01-16-a-comparison-of-code-editor.md
reference: https://blog.replit.com/code-editors
callout: 最近看到这篇外文，觉得不错，注意这里对比的是「代码编辑器」，与富文本编辑器还是有些许不同的。
tags:
    - 编辑器
    - 翻译
cos: 2022/a-comparison-of-code-editor
craft: https://www.craft.do/s/anoVgw55pjshwp
title: 「译」Ace，CodeMirror 和 Monaco：Web 代码编辑器的对比
sha: 1a11acf1c86200510b6d5d05c03d2cbd61aad979
lastUpdateTime: 2022-05-30 00:05:38 +0800
---

我已经为 Replit 工作了大约有六年的时间，随着团队的发展，我一直专注于产品的 IDE （我们称之为「工作区」）部分。理所当然的，我就越来越专注于代码编辑器。虽然我们考虑过创建一个满足我们需求的代码编辑器，但是开发代码编辑器的复杂性、可用的开源选项的丰富性以及我们员工的规模使其成为一个充满未知挑战的事情，因此我的时间可能不会花在构建一个我们自己的编辑器这方面。我有幸（和痛苦）在生产环境中使用 [Ace](https://ace.c9.io)、[Monaco](https://microsoft.github.io/monaco-editor/) 和 [CodeMirror](https://codemirror.net/6/) 这三种代码编辑器，有时候是同时使用（稍后会有详细介绍）。在本文章中，我将回顾一些 Replit 的历史和我使用编辑器的经验，以及这二者是如何相互作用的。 

如果你看这篇文章只是为了直接比较这三种代码编辑器，那么请直接跳到最后，我将总结和比较放到了那里。 

## 故事

### 前奏：Ace

在 Replit 早期，大约在 2011 年，是没有代码编辑器的。我们使用一个纯粹的 [REPL](https://en.wikipedia.org/wiki/Read–eval–print_loop) 界面，一个带有简单输入框的控制台。添加代码编辑器显然是迫在眉睫的，特别是如果我们想要创造更加复杂的程序的情况下。代码编辑器为我们提供了语法高亮显示、编辑器快捷键、自动缩进、搜索和替换等功能。Cloud9 当时发布了 Ace，它是一个功能齐全、性能出色的基于 Web 的代码编辑器。截止目前为止，Ace 编辑器仍然在积极维护中；它有着丰富的生态系统，支持多语言、按键绑定，并且在浏览器中运行良好。

> 👇🏻原始的 Replit的界面和 Ace 代码编辑器对比，该截图由我们的社区成员提供，他们从 2011 年开始，重新托管了 Replit 的开源版本 [https://www.repldotit.com](https://www.repldotit.com)。

![Image](https://static.xheldon.cn/img/in-post/2022/a-comparison-of-code-editor/FCE24555-97DB-4453-9DA4-A8C9BE00FF52_2.png)

我们一直使用 Ace，一直到 2017 年左右我们才切换到 Monaco。虽然 Ace 仍然在维护中，但是它的维护者只有一个人。亚马逊收购 Cloud9 之后，他们似乎重新调整了开源项目的优先级。编辑器不再像之前一样有那么多的更新，Github 上的 issue 也开始堆积，同时维护人员也几乎没有再添加任何新的功能。总体而言，Ace 的 API 开始让开发人员感到过时和笨重。它的维护者很棒，但是他能做的也只是如此了。

### 插曲：Monaco

你也许已经知道的是，VSCode 使用的就是 Monaco 编辑器；其实，是微软围绕 Monaco 构建了 VSCode。如果我们把代码编辑器切换到 Monaco，我们认为我们将能够从 VSCode 的开发大佬那里获得所有很酷的更新和功能。Monaco 拥有更多与我们的网站相匹配的炫酷的现代用户界面，JavaScript、HTML、CSS 都有很棒的自动完成功能，而且他们似乎有 API 可以轻易的为 LSP （Language-Server-Protocal）编写相应的语言客户端。他们的 API 文档很棒，附带了 Typescript 的定义，从开发角度来看具有更多的可扩展性功能。

> 👇🏻Monaco 编辑器截图（默认配置），注意干净和整洁的 UI 界面。

![Image](https://static.xheldon.cn/img/in-post/2022/a-comparison-of-code-editor/DE35EC5C-5470-49D5-ADFE-8FCAD8A71B29_2.png)

从 Ace 切换到 Monaco 是有代价的，后者缺失了 Ace 的很多功能，但是我们相信，凭借社区的热度和贡献，它将立即超过 Ace。（相比较 Ace 而言）Monaco 的第一个问题是它缺少很多语言支持；即使 VSCode 有很多语言支持，但是他们是依赖于 NodeJS/Electron 的能力，而不是浏览器。因此，我们开始为 Monaco 贡献代码以让其支持更多语言。我们添加了 Scala、Julia、Scheme、Clojure 等各种语言支持，以及像 Python 这种的各种语言的 Bugfix。我为 Monaco 写了一个语法高亮显示器，以通过一个适配器来支持 Ace 支持的所有语言。最后，Monaco 相较于 Ace 缺失的特性是 Vim 和 Emacs 的按键绑定，不过应该过不了多久就会有人在 NPM 上发布支持这些特性的包。

Monaco 的另一个问题是构建工具。虽然微软使用 Web 技术构建了 Monaco，但是它与 Web 当前的生态系统和构建工具并没有很好的融合起来。我不得不将 Monaco 预编译为 Webpack Dll，并添加许多 Webpack 的配置，它才能正常工作。这些东西添加起来很痛苦，这也增加了我们构建系统的复杂性和成本。几个月后，微软为 Monace 发布了一个 Webpack 插件，这让它稍微好了点，但是并不完美，特别是当我们将前端挪到了 Next.js 的时候。不幸的是，Monaco 也没有一个简单的方法来懒加载和拆分代码，因此将代码拆分成小的文件然后提升加载速度并不可用。这个问题使我们的项目增加了高达 5M 的体积，这并不是一个我们可以轻易忽略的事情。

Monaco 在移动端也不太好用。我们尝试将这部分代码外包出去，但是没人接单。然后我想自己处理这个事情，于是就在那个时候我意识到，很难去查看、阅读 Monaco 的代码库。它与 VSCode 代码库的其他部分耦合的太多了，Monaco 编辑器本身就像是先构建了 VSCode 后，再从中剥离出来的一样。即使是 VSCode，它本身的代码写的也不是很好，它可能是[最古老的 Typescript 项目](https://web.archive.org/web/20150502200822/https://www.zdnet.com/article/microsofts-browser-based-dev-toolbox-how-monaco-came-to-be/)之一，并且被[微软以一个大企业的风格](https://www.youtube.com/watch?v=FyCYva9DhsI)编写的。虽然我们确实在移动端做到了一个还算可以用的东西，但是我并不想维护一个 VSCode 的分支，因为我们对 VSCode 所做的修改不会被合入到 VSCode 的主干分支中去，而且当前的移动端距离可用于生产环境还有很长的路要走。因此，我决定最好的方案是，在手机上继续使用 Ace 编辑器。它也许并不完美，但是没关系（又不是不能用）。

因此，我们在 Replit 上最终有两个代码编辑器：一个用于 PC 端，另一个用于移动端。每个 PC 的新功能都必须移植到 Ace（手机端）上。我们必须为 Ace 编写支持 LSP 功能的语言客户端，并且我们必须为 Ace 编写操作转换适配器（译者注：OT 转换？），以支持多个用户同时编辑，等等。在很多情况下，我们根本没有时间移植东西。例如，我们从未将代码多线程的功能移植到移动端。

### 后幕：CodeMirror

2018 年底，Marijn 宣布[重写 CodeMirror](https://web.archive.org/web/20180830201622/https://codemirror.net/6/)，以将其版本更新到 6，并附上了[出色的设计文档](https://web.archive.org/web/20181109055050/https://codemirror.net/6/design.html)。重写的主要动机之一是增加对触摸设备的支持。在此期间，我们认识到移动端（普遍意义上的）是我们战略的重要组成部分；如果我们想让接下来的 10 亿软件创作者在线，我们必须让移动端能够使用才行。CodeMirror 将通过依赖原生浏览器的文本编辑能力（通过 contenteditable），而不是完全在 JavaScript/库层面（就像 Google Docs 的 Google Clouser 一样）来实现移动端的可用性。

[ProseMirror ](https://prosemirror.net)启发了 CodeMirror 6 的 API 设计，它是 Marijn 的另一个项目。我之前在我当时开发的 WYSIWYG 项目中使用过，我很喜欢它。ProseMirror 有一个非常小的核心，而其他的一切都是通过其插件系统实现的。作为一个编辑器库而言，它是模块化的、可插拔的、函数性的，并且具有难以置信的使用授权。因此，我决定让公司赞助新版的 CodeMirror 的开发，我甚至亲自资助了该项目。

去年，CodeMirror 6 发布了测试版，我非常兴奋的开始将其添加到 Replit中，团队的其他成员也是如此。我们开始玩弄编辑器，虽然它的学习曲线有点陡，但是当你最终「得到」它的时候，你会感觉自己像一个 超级-代码编辑器-开发者。为了让 CodeMirror 6 能够应用到项目中，我开始在项目中逐步的使用它。我们首先在 Relpit 上，将其添加为只读的编辑器，然后开始将其添加到网站的其他可以编辑代码的地方。

今年早些时候，我们开始了「信仰之跃」（译者注：刺客信条的梗），开始将 CodeMirror 集成到我们的移动环境中。从用户的角度来看，CodeMirror 客观上讲比手机上的任何其他编辑器都要好。尽管它尚未支持我们支持的所有语言和其他一些功能，但是将其集成到移动端依然是值得的。这个集成之后的用户反馈比我们预想的更好。参与 CodeMirror 使用的用户中（译者注：可能是灰度小流量测试，也可能是提供了新版和旧版切换的入口以统计不同编辑器的用户使用情况），移动端用户占比将近 70%！它（CodeMirror）比在移动端使用 Ace 更能留住用户。有了 CodeMirror 的可插拔性（提供的无限可能性），很明显，（上述的）这些（令人振奋的结果）只是我们在移动端提供更多有价值的事情的开始而已，我们将首先从在移动端缺失的 PC 端的功能移植到移动端的 CodeMirror 开始。

![Image](https://static.xheldon.cn/img/in-post/2022/a-comparison-of-code-editor/7F0728B9-BE37-44CF-A518-F4020E276758_2.png)

CodeMirror 6 的社区依然处于起步阶段，因此我们必须自己写很多东西，或者为特定的功能赞助一些钱以及与 Marijn 一起解决 bug。我们希望通过我们的贡献帮助引导和回报 CodeMirror 社区。我在这里列举一些我们正在积极开发的功能清单：Vim Mode、Emacs Mode、LSP 客户端、缩进标记、CSS 颜色选择器、语言解析器，以及我们将在未来发布桌面端 CodeMirror 的时候，在帖子中宣布的许多其他的事情。我认为人们对新的 CodeMirror 感到兴奋，我们将在未来一到两年内看到社区和生态系统用户数量的激增，许多人急于在生产环境中使用它。

我们非常兴奋能够在 CodeMirror 上构建越来越多的功能，并使其成为我们让代码更具访问性这一环节的不可或缺的一环。我们总是说，我们最终必须开发自己的编辑器，才能以我们喜欢的方式来打造用户体验。尽管如此，我认为我们对使用 CodeMirror 能做到的事情感到很开心。

## Battle 环节

让我总结一下，以让你更容易找到适合你的代码编辑器。同样，这只是我的个人经历，它可能无法反映你的经历。

对于每个部分，我都会给编辑器打 1 到 3 分，其中 3 分是最好的。

## 稳定性

|                                                                                                                                                                              编辑器                                                                                                                                                                               |                                                                                                                                                                               评分                                                                                                                                                                               |                                                                                                                                                                               说明                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                              Ace                                                                                                                                                                               |                                                                                                                                                                             ⭐️⭐️⭐️                                                                                                                                                                             |                                                                                                                             非常的稳定和可靠。该编辑器经过了历史的检验，为许多工具提供了 10 多年的支持，在我使用它的所有时间里，我从未经历过任何 break change。可能有一些版本引入了一些小错误，但是它们很快就被修复了。                                                                                                                             |
|                                                                                                                                                                             Monaco                                                                                                                                                                             |                                                                                                                                                                              ⭐️⭐️                                                                                                                                                                              |                                                                                                              Monaco 拥有稳定的编辑体验；当然也有一些 bug，但是会很快随着 VSCode 的发布而快速修复，它的维护人员擅长持续发布新的版本。之所以扣了一分是因为，它的 API 不是最稳定的，经常会有一些小的变化，很烦人。微软尚未发布 Monaco 的 1.0 版本。                                                                                                              |
|                                                                                                                                                                          CodeMirror 6                                                                                                                                                                          |                                                                                                                                                                               ⭐️                                                                                                                                                                               | CodeMirror 仍然处于测试阶段，该项目有很多微小的错误，但是 Marijn 响应和修复的速度很快。虽然该项目依然处于测试阶段，但是我认为 Marijn 对当前的 API 感到满意，我们不太可能看到重大的 break change。CodeMirror 6 开始被许多功能采用，即使是 Chrome 的开发工具也可能在[明年开始使用它作为代码编辑器](https://github.com/ChromeDevTools/devtools-frontend/commit/6da128c3ae6b6dd0d4602059c23f8c4003823f5b#diff-592cac14b3eeb584a09b80d2696a73223ad0a79e4a8e6765f875a6f4492b4525)。 |

## 开箱即用的体验

|                                                                 编辑器                                                                  |                                                                  评分                                                                  |                                                                  说明                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
|                                                                 Ace                                                                  |                                                                 ⭐️⭐️                                                                 |                      出色的开箱即用体验，支持如此多的功能和语言，包括一些基本的JavaScript Lint 功能（使用JSHint）和自动完成特性。只是用户界面有点过时，所以你有时候可能感觉有点乱。                      |
|                                                                Monaco                                                                |                                                                ⭐️⭐️⭐️                                                                |                                     用户界面非常精致。该编辑器内置了很多功能，包括开箱即用的 HTML、CSS 和 JavaScript 的代码提示支持。                                      |
|                                                             CodeMirror 6                                                             |                                                                 ⭐️⭐️                                                                 | 编辑器需要一些配置才能正常运行。这是一个对项目模块化特性的权衡的过程。有一个 [basic-setup 包](https://codemirror.net/6/docs/ref/#basic-setup)，它结合了几个模块，并且重新导出了核心模块。用户界面很不错。 |

## 模块化、构建工具和发展轨迹

|                                                   编辑器                                                    |                                                    评分                                                    |                                                    说明                                                    |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
|                                                   Ace                                                    |                                                   ⭐️⭐️                                                   |        Ace 本身很小，也支持模块化，你能够使用懒加载来加载其他模块。然而 Ace 是一个比较旧的项目，它附带了一个自己的模块管理系统，让它在你的程序中工作并不难，但是需要一些配置才行。        |
|                                                  Monaco                                                  |                                                    ⭐️                                                    |        Monaco 编辑器打包后体积也非常大，大概有 5M 左右。而且据我所知，懒加载是不可能的。Monaco 还需要你在你的构建系统中进行一些特殊的配置，这让它很难与现有系统就行绑定。        |
|                                               CodeMirror 6                                               |                                                   ⭐️⭐️                                                   | CodeMirror 是用现代的技术构建的。您甚至可以在不涉及打包工具的情况下使用 ES6 模块来导入它。懒加载功能对它来说轻而易举；您只需要 ES6 的动态导入功能即可。该项目非常模块化，编辑器内核非常小。 |

## 扩展性和高级功能

|                                                                                                                                                            编辑器                                                                                                                                                            |                                                                                                                                                            评分                                                                                                                                                             |                                                                                                                                                            说明                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                            Ace                                                                                                                                                            |                                                                                                                                                           ⭐️⭐️                                                                                                                                                            |                                                                                           Ace 有许多配置项，效果很好，扩展点也很好。虽然它们不是很通用，但是它能让你实现很多高级特性。API 确实感觉有点过时，但是绝对可靠。当我需要快速试验一个项目的时候，我会很轻松的选择 Ace，因为它的代码很容易阅读，而且它的核心代码已经将近 10 年没有变化了。                                                                                            |
|                                                                                                                                                          Monaco                                                                                                                                                           |                                                                                                                                                           ⭐️⭐️                                                                                                                                                            |                                                                          Monaco 有很多配置项，并且提供 API 来修改编辑器的行为和基础功能。尽管如此，能够扩展的地方也是有限的以及过于具体了。我经常不得不与编辑器斗智斗勇，需要打一些 hack 补丁，这是非常危险和难以收敛的，因为它的代码库并不容易阅读，其内部代码不断变化。最终，我们不再升级 Monaco，因为它将来也不可能支持我们需要的一些功能。                                                                          |
|                                                                                                                                                       CodeMirror 6                                                                                                                                                        |                                                                                                                                                          ⭐️⭐️⭐️                                                                                                                                                           | CodeMirror 6 在构建之初就考虑到了可扩展性，这是它的主要设计原则之一；这种可扩展性允许 CodeMirror 模块化。事实上，内核本身（@codemirror/view 和 @codemirror/state）本质上是一个可扩展的 textarea。所有的「代码」功能都是作为扩展实现的。语法高亮显示和行号等基本内容也是作为扩展和软件包实现的。在创建自己的扩展的时候，这些官方的软件包是一个很好的示例资源。使用 CodeMirror 构建花里胡哨的插件是轻而易举的，作为插件开发人员，它为你提供最强大的难以置信的支持！它的扩展点是非常通用的，因此你就是你程序世界的上帝，可以完全自己决定想实现的任何功能并承担后果。 |

## 社区和文档

|                                                                                                编辑器                                                                                                |                                                                                                评分                                                                                                 |                                                                                                说明                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                Ace                                                                                                |                                                                                               ⭐️⭐️                                                                                                |                        多年来，Ace 积累了丰富的生态系统和大量的关于 Ace 使用的文章和博客。它支持天底下所有语言的高亮显示功能以及拥有很多社区提供的工具包。它的 API 文档不是最好的，但是对大多数使用场景来说足够了。它结构良好（虽然有点旧）的代码库是一个出色的（文档）补充资源。网上也有一个关于它的入门指南。                        |
|                                                                                              Monaco                                                                                               |                                                                                               ⭐️⭐️                                                                                                |              Monaco 在大概 2018 年的时候开始发力，但能感觉到的是它的社区迅速衰落了。你可以在 NPM 上找到一堆社区维护的软件包。Monaco 的 API 文档本身已经很不错了， 但其实还可以更好，因为 Monaco 没有官方指南，所以这让开始入门的人觉得很难。由于该项目的结构复杂，你很难将阅读代码作为阅读 API 文档的补充资源。              |
|                                                                                           CodeMirror 6                                                                                            |                                                                                              ⭐️⭐️⭐️                                                                                               | 我看到社区里有很多关于 CodeMirror 6 的开发势头。我们正在试图用一些我们认为对于 CodeMirror 6 至关重要的软件包来帮助社区发展，敬请期待！它的文档很棒，我希望随着时间的推移它会变得更好。文档系统有一篇精彩的入门文章和很多示例，并附带有冗长的解释。我在上面的可扩展性上提到了这一点，它的大多数功能都是通过扩展实现的，这些功能包是你想实现一些功能的时候的「神队友」。 |

## 性能

##### 免责声明：性能表现的评价没有明确的基准测试数据。

|                              编辑器                               |                               评分                               |                               说明                               |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
|                              Ace                               |                             ⭐️⭐️⭐️                             |        Ace 诞生在一个浏览器和机器不如现在这般强大的时候，所以该款编辑器在今天的性能表现非常亮眼。         |
|                             Monaco                             |                              ⭐️⭐️                              | Monaco 有很多性能优化，但它可能有点笨重。Replit 有很多低功耗机器的用户，他们一直觉得 Monaco 非常耗电。 |
|                          CodeMirror 6                          |                             ⭐️⭐️⭐️                             |          CodeMirror 到目前为止性能表现很优秀，因为它的作者花了很多时间进行性能优化。           |

## 移动端支持

我不会在这里进行打分，因为如果你想要一个支持移动端的代码编辑器，你唯一的可用选择是 CodeMirror 6。Ace 对移动端的支持并不差，但是并不能用到生产环境，而 Monaco 无法在移动端使用。

我甚至会说，CodeMirror 甚至可以应用于使用 Webview 组件的原生应用程序中。CodeMirror 中的大多数内容都是可序列化的，因此你可以从原生代码与 Webview 进行交互。

## 感谢阅读！

这部分是作者打广告时间，暂时不翻译了。