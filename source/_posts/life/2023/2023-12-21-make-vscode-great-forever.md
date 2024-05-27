---
title: 让 VSCode 更好用的设置——前端开发角度
layout: post
date: 2023-12-21 8:0:00 +0800
cos: 2023/make-vscode-great-forever
path: _posts/life/2023/2023-12-21-make-vscode-great-forever.md
header-mask: 0.4
header-style: full
callout: 本文介绍我作为一名前端工程师，是如何优化 VSCode 设置，让它更好用的。
categories: life
reference: 
no-catalog: 
lastUpdateTime: 2023-12-26 8:0:00 +0800
header-img: https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/LzFlM2U3YzA1LWZjMTEtNDAzOC05Zjc2LTkyZGIzMmI5ODgyNC8xY2JmZGRjMy1kNDU3LTRkM2ItOTQ0OC1iNDEyYjFiYTM1ZDkvQ2xlYW5TaG90XzIwMjNfMTJfMjUtMjJfMDNfNTAyeC5wbmc=-985292be-c0f7-4584-9641-e964d96cc1de.webp
notion: https://xheldon.notion.site/VSCode-985292bec0f745849641e964d96cc1de?pvs=4
tags:
    - 技巧
    - 教程
    - 折腾
    - JavaScript
    - 工作流
    - 生活
    - VSCode
    - 设置
---

{% render_callout icon="☝🏻" color="" bgcolor="rgb(241, 241, 239)" %}后面计划出一期视频说明，因为有些设置的效果需要演示才能看出差异，而我又懒得制作动图在博客中了。{% endrender_callout %}

## 前言

刚开始学习前端的时候，还没有 VSCode，那时我用的是 WebStorm（当时是学生，所以用的盗版）。开箱即用的体验让人爱不释手。后来由于办公电脑配置的下沉，以及它对 4K 及多显示器卡顿问题的长久不解决，再加上周围同事的影响， 最终一击是「配置同步」让我最终切换到 VSCode 。

在适应了没有单独的悬浮搜索框这一史诗级割裂之后，很快就摸索出了我个人认为好用的配置，下面就详细得说一说。如果有人觉得自己的设置比我的更好的，欢迎在下方留言然后附上原因和效果截图。

{% render_callout icon="📖" color="" bgcolor="rgb(241, 241, 239)" %}默认的设置我基本不说了（除非非常好用），我就说我对于默认配置的修改部分。VSCode 中大部分配置都能修改，比如「是否在右侧小地图位置显示光标行」这种的都能，非常好。{% endrender_callout %}

## 样式

### 主题/字体

主题是 One Dark Pro：

{% render_bookmark url="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme" title="marketplace.visualstudio.com" img="" yid="" bid="" %}
https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme
{% endrender_bookmark %}

字体是 Fira Code：

{% render_bookmark url="https://github.com/tonsky/FiraCode?tab=readme-ov-file#download--install" title="GitHub - tonsky/FiraCode: Free monospaced font with programming ligatures" img="https://repository-images.githubusercontent.com/26500787/bf313080-6b02-11ea-9cd5-c3dca880736d" yid="" bid="" %}
Free monospaced font with programming ligatures. Contribute to tonsky/FiraCode development by creating an account on GitHub.
{% endrender_bookmark %}

Fira Code 是官方推荐字体，[内部也在使用](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#:~:text=zoomLevel%22%3A%205-,Font%20ligatures,-%22editor.fontFamily%22)。

Fira Code 对一些符号的变体支持非常好看，如 `===` 和 `<=` 等（有些需要手动启用字符集和变体）：

{% render_caption caption="Fira Code 字体" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3371f847-fdd8-410c-82e1-b1d63cd91035.webp" %}
![Fira Code 字体](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3371f847-fdd8-410c-82e1-b1d63cd91035.webp)
{% endrender_caption %}

很多人不习惯 Fira Code 默认的 `&` 符号，这可以通过配置来禁用它的变体，具体可以参看其 Github 的介绍，我的设置是：

```json
{
  "workbench.colorTheme": "One Dark Pro",
  "editor.fontFamily": "'Fira Code', Monaco, 'Courier New', monospace",
  "editor.fontLigatures": "'ss01', 'ss02' off, 'ss03', 'ss04', 'ss05', 'ss07', 'cv29', 'cv28', 'cv13'"
}
```

另外，行高是 1.4，字号是 13。

## 编辑器

最主要的就是编辑器设置了，好的编辑器当然是为了提高编码效率，下面逐个说说。

### 渲染空白字符

{% render_caption caption="Editor: Render Whitespace" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/9175365e-0357-4b2f-abf7-cdf20062b2ca.webp" %}
![Editor: Render Whitespace](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/9175365e-0357-4b2f-abf7-cdf20062b2ca.webp)
{% endrender_caption %}

这个我是使用默认的 selection，即只在划选的时候，如果内容有空白符（空格）才会显示出来，否则不显示，不然影响美观。 `boundary` 的设置是总是显示，不好看：

{% render_caption caption="选区渲染空白符号" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/12c4e471-e6fc-4b6d-aed7-61d4db16cd18.webp" %}
![选区渲染空白符号](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/12c4e471-e6fc-4b6d-aed7-61d4db16cd18.webp)
{% endrender_caption %}

### 自动添加/删除配对括号

{% render_caption caption="Auto Closing 设置" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/49d09c46-5456-441a-9f72-fccc3a5d761e.webp" %}
![Auto Closing 设置](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/49d09c46-5456-441a-9f72-fccc3a5d761e.webp)
{% endrender_caption %}

这个几个设置使用场景是，如果你输入一个起始括号，如 `({[` 会自动在后面给你生成一个 `)}]` ，删除的设置也是同理。默认是插入的时候配对，删除的时候也同步配对删除。

### 括号着色（池）

{% render_caption caption="Bracket Pair Colorization" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/899eeaba-8737-4f07-8e22-9480f915fcbc.webp" %}
![Bracket Pair Colorization](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/899eeaba-8737-4f07-8e22-9480f915fcbc.webp)
{% endrender_caption %}

第一个打开后，你的各个括号就会有颜色（而不是白色）。第二个打开后，每种类型的括号，拥有自己独立的一套颜色配置（其实也会不同的括号颜色重复，但不再是按不同括号的显示顺序，而是同种括号的显示顺序来着色了——我的理解和测试）。

### 矩形选区

{% render_caption caption="Column Selection" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/c64604e0-b420-4845-86e2-bac8d40aaa3d.webp" %}
![Column Selection](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/c64604e0-b420-4845-86e2-bac8d40aaa3d.webp)
{% endrender_caption %}

默认情况从上往下选择，如果经过某行的行首和行尾，是选中整行的：

{% render_caption caption="默认选中效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/d97e73d0-91ae-4e0a-befb-c708ceae1bc0.webp" %}
![默认选中效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/d97e73d0-91ae-4e0a-befb-c708ceae1bc0.webp)
{% endrender_caption %}

如果这个开关打开后，就变成了鼠标划选是一个矩形选区（根据鼠标位置，而不是代码位置进行选择），常用场景是同时编辑多行类似缩进的内容，如 JSON 的键等：

{% render_caption caption="列选择" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/99dcc5e1-65bd-4048-bf8a-b06443bc7745.webp" %}
![列选择](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/99dcc5e1-65bd-4048-bf8a-b06443bc7745.webp)
{% endrender_caption %}

{% render_caption caption="列选择的一个应用场景" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/85a0ac88-34a6-4843-adfd-ea95f01c1806.gif" %}
![列选择的一个应用场景](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/85a0ac88-34a6-4843-adfd-ea95f01c1806.gif)
{% endrender_caption %}

多说一句，在终端中选中的时候按下 Opt 键，也是这个效果。

### 复制内容的时候带语法高亮

{% render_caption caption="Copy With Syntax Highlighting" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/2e507e99-524a-41c0-978c-42cb1bcbebca.webp" %}
![Copy With Syntax Highlighting](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/2e507e99-524a-41c0-978c-42cb1bcbebca.webp)
{% endrender_caption %}

有些富文本编辑器，没有特殊处理，因此在直接复制 VSCode 中的代码到富文本编辑器的时候，会将颜色也带上，这通常不是预期。此设置可以让你复制出来的内容不带颜色。

### 拖拽

{% render_caption caption="Drag And Drop" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/319dae0d-0369-4469-abd9-ed2e0c36649c.webp" %}
![Drag And Drop](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/319dae0d-0369-4469-abd9-ed2e0c36649c.webp)
{% endrender_caption %}

我写码这么多年，几乎没有使用「拖拽」来实现移动代码块的操作，因此建议取消。第二个按住 shift 后拖拽文件到 VSCode，如果是媒体文件则松手后只会显示文件名，如果不按住 shift 则会打开媒体文件，多一个功能挺好的，以备不时之需（这个默认是打开的）。

### 空选区复制当前行

{% render_caption caption="Empty Selection Clipboard" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/32f95652-6320-4347-8c9e-b7f03dbecd79.webp" %}
![Empty Selection Clipboard](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/32f95652-6320-4347-8c9e-b7f03dbecd79.webp)
{% endrender_caption %}

如果选区只是光标，没有选中任何内容，此时进行复制操作会选中当前行。复制当前行更简单了（默认开启）。

### 自动折叠

{% render_caption caption="Folding" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/96927f79-74ed-4949-b3e0-7cff488269ed.webp" %}
![Folding](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/96927f79-74ed-4949-b3e0-7cff488269ed.webp)
{% endrender_caption %}

代码折叠肯定是需要的。突出显示折叠范围也是需要的（会跟鼠标在那一行一行的效果，当前行高亮），不然不知道当前行是否折叠了。最后一个是自动折叠 import 部分，我觉得没必要。

折叠我个人喜欢始终显示，因为这个功能太常用了，我经常需要先 hover 到位置，看哪行是被折叠了，然后再点打开折叠，效率太低。我喜欢一眼看到哪些地方被折叠的，所以需要设置成 always：

{% render_caption caption="Show Folding Controls" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/0a382e11-522d-490a-a086-703b291ef90e.webp" %}
![Show Folding Controls](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/0a382e11-522d-490a-a086-703b291ef90e.webp)
{% endrender_caption %}

### 括号/缩进参考线

{% render_caption caption="（缩进/括号）参考线" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b537a5b7-b989-4346-837b-919a4705599c.webp" %}
![（缩进/括号）参考线](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b537a5b7-b989-4346-837b-919a4705599c.webp)
{% endrender_caption %}

如下图，不过我没测试出什么是「缩进参考线」，先打开吧。

{% render_caption caption="图中高亮的括号" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/f8b0495e-2bd6-4dd5-9eb1-36a33821f1e8.webp" %}
![图中高亮的括号](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/f8b0495e-2bd6-4dd5-9eb1-36a33821f1e8.webp)
{% endrender_caption %}

### hover 时浮窗出现的位置

{% render_caption caption="Hover 位置" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/da26e746-9e8b-4a3a-9b24-2a38abae431d.webp" %}
![Hover 位置](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/da26e746-9e8b-4a3a-9b24-2a38abae431d.webp)
{% endrender_caption %}

一般情况我们看代码是从上往下看的，这个设置 hover 代码后浮窗出现在上方，挡住了内容，还得移动一下鼠标让浮窗消失再出现，建议取消。

{% render_caption caption="始终显示提示在下方更合适" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6df3c907-16b9-4cba-b7f3-daa4a5fd4532.webp" %}
![始终显示提示在下方更合适](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6df3c907-16b9-4cba-b7f3-daa4a5fd4532.webp)
{% endrender_caption %}

### 悬浮出提示

{% render_caption caption="消失延迟其实不需要" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6b18c5da-1193-4e89-b49f-b7775dcdb192.webp" %}
![消失延迟其实不需要](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6b18c5da-1193-4e89-b49f-b7775dcdb192.webp)
{% endrender_caption %}

鼠标移出一般就是不想让它显示，直接设置为 0。

### 鼠标缩放字体

{% render_caption caption="完全没用的功能…" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/2e05860a-01cb-45ff-9d3b-230d8871ebd6.webp" %}
![完全没用的功能…](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/2e05860a-01cb-45ff-9d3b-230d8871ebd6.webp)
{% endrender_caption %}

经常误触，关了。

### 编辑器区域顶部 padding

{% render_caption caption="统一视觉间隔" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/07183c4a-3dcc-412d-a7bb-f5167443874d.webp" %}
![统一视觉间隔](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/07183c4a-3dcc-412d-a7bb-f5167443874d.webp)
{% endrender_caption %}

我设置为 2。底部 padding 就没必要了。

{% render_caption caption="优雅，永不过时" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/9f1cd71d-f579-44c6-8b23-58f558dfeeaf.webp" %}
![优雅，永不过时](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/9f1cd71d-f579-44c6-8b23-58f558dfeeaf.webp)
{% endrender_caption %}

### 滚动条

水平滚动条为 6 宽度，竖直为 25（默认水平 12，竖直 14）：

{% render_caption caption="Scrollbar" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/2b7e8382-836f-4fe4-a7b5-c88e24332838.webp" %}
![Scrollbar](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/2b7e8382-836f-4fe4-a7b5-c88e24332838.webp)
{% endrender_caption %}

我个人是不喜欢滚动到范围外，会导致明明一屏显示完全的内容，出现滚动条，所以最后一个 Scroll Beyond Last Line 关了。

{% render_caption caption="滚动条显示信息" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/361fa784-0d98-4055-a56e-58678f0c3a31.webp" %}
![滚动条显示信息](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/361fa784-0d98-4055-a56e-58678f0c3a31.webp)
{% endrender_caption %}

这里要说下为什么竖直滚动条调大为 20，因为在那个区域其实不只是滚动条，还含有三个信息：

1. 滚动条右侧亮黄色的是编辑器警告信息。

1. 滚动条中间暗黄色块是匹配的搜索项（含全局搜索和当前编辑器搜索）。其中，暗黄色块也可能是灰色（表示光标选中的部分和类似内容），也可能是淡粉色，表示光标选中的的内容的声明处。

1. 占滚动条整行的蓝色线是光标所在的行。

1. 滚动条左侧的绿色部分是代码变动的部分。其中，也可能是淡黄色，表示修改部分（如果启用了 git 的话）。

可以看到这部分的信息显示很丰富，所以调宽一点。

### 平滑滚动

{% render_caption caption="动画，优雅" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/190452c5-f985-47b4-b238-000edce28c4b.webp" %}
![动画，优雅](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/190452c5-f985-47b4-b238-000edce28c4b.webp)
{% endrender_caption %}

强烈建议开启，这样在滚动的时候就可以知道你大概滚动了多少行，而不是突然跳过去，「不知道滚动到哪里去了」。

### 滚动吸顶

{% render_caption caption="吸顶，好用" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/37741a88-7ba7-481a-9fe5-06ed276af9d3.webp" %}
![吸顶，好用](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/37741a88-7ba7-481a-9fe5-06ed276af9d3.webp)
{% endrender_caption %}

滚动的时候可能需要查看超出当前屏幕的作用域，打开该选项即可。另外，水平滚动的时候会把该 sticky 的函数滚走，我倾向于不滚动它，所以把最后一个选项取消。

{% render_caption caption="左右滚动不跟随" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b7b7e17c-ac89-4d69-b1c2-648f0e582a40.webp" %}
![左右滚动不跟随](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b7b7e17c-ac89-4d69-b1c2-648f0e582a40.webp)
{% endrender_caption %}

### 光标

{% render_caption caption="Cursor Blinking" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/5736c4cc-e07c-40f1-ae31-e1c16e458a00.webp" %}
![Cursor Blinking](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/5736c4cc-e07c-40f1-ae31-e1c16e458a00.webp)
{% endrender_caption %}

第一个是光标闪烁的淡入淡出，第二个是你在点击不同位置的时候，光标是从上一个位置动画移动到点击位置的，可以让你知道本次点击光标位置相对上一个编辑位置是哪里，信息更丰富了。

### 查找

{% render_caption caption="编辑器右上角查找小部件" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/eb174538-47bb-44b8-ba84-54df4a37555e.webp" %}
![编辑器右上角查找小部件](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/eb174538-47bb-44b8-ba84-54df4a37555e.webp)
{% endrender_caption %}

这个建议关掉，搜索的时候，如果不关，会在文件顶部凭空产生一些距离导关闭搜索框的时候编辑器跳动一下，难受。

{% render_caption caption="空白，不优雅" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/83dcf800-6ec9-4a8a-8b49-2e69e419bd72.webp" %}
![空白，不优雅](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/83dcf800-6ec9-4a8a-8b49-2e69e419bd72.webp)
{% endrender_caption %}

不过该选项打开后可能会遮挡住编辑器内容，自己取舍（一般顶部都是 import 后的换行内容，挡住也无所谓）。

{% render_caption caption="没空白，优雅" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6878a013-d547-4ccb-9792-32e03a97e9d4.webp" %}
![没空白，优雅](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6878a013-d547-4ccb-9792-32e03a97e9d4.webp)
{% endrender_caption %}

### 自动带入搜索小组件

{% render_caption caption="自动带入，优雅" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/f671a305-d7c8-4ae0-b91c-5aa094bbd3a6.webp" %}
![自动带入，优雅](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/f671a305-d7c8-4ae0-b91c-5aa094bbd3a6.webp)
{% endrender_caption %}

这个建议关掉。我经常会使用搜索，然后搜索后选中某个内容后再搜索（非选中内容），此时编辑器自作聪明的把我选中的内容给带到搜索框中，导致我之前搜索的内容没了，很烦。

### 缩略图

{% render_caption caption="右侧小地图" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b8986040-1b86-4bbd-a99b-1b7d551c8b28.webp" %}
![右侧小地图](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b8986040-1b86-4bbd-a99b-1b7d551c8b28.webp)
{% endrender_caption %}

编辑器右侧的缩略图我始终显示出来，它的作用一般是让我知道我当前处于编辑的哪个位置，以及相对于某个函数、组件，我所处的位置，因此我需要缩略图不滚动，同时仅渲染色块即可，不用将每行都渲染出来。

### 建议

{% render_caption caption="建议预览" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/1cbc255e-2784-461d-a723-ce5f325130a2.webp" %}
![建议预览](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/1cbc255e-2784-461d-a723-ce5f325130a2.webp)
{% endrender_caption %}

这个开关建议关闭（默认），因为可能跟 copilot 建议弄混淆，如图是 copilot 的建议：

{% render_caption caption="copilot 建议" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/89587ee7-0329-43e7-9a68-814e55bd8e07.webp" %}
![copilot 建议](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/89587ee7-0329-43e7-9a68-814e55bd8e07.webp)
{% endrender_caption %}

而这个是预览的建议：

{% render_caption caption="整个一没必要咱就是说" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/26edace2-f059-4f51-a873-47a743946229.webp" %}
![整个一没必要咱就是说](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/26edace2-f059-4f51-a873-47a743946229.webp)
{% endrender_caption %}

{% render_caption caption="最近建议" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/203628d4-4e0c-4f9a-8289-31ab679750dc.webp" %}
![最近建议](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/203628d4-4e0c-4f9a-8289-31ab679750dc.webp)
{% endrender_caption %}

这个选项默认是 first，即始终使用默认选择第一个建议，但是我经常遇到的问题是，在 CSS 中，我输入 `wid` 当然预期是 `width`，但是它会给我建议是 `widow` 我当然不用这个属性，但每次都是排在第一个，我就每次需要通过箭头来切换，所以此处建议修改成「最近使用」，类似与输入法的「动态调频」:

{% render_caption caption="css 最近建议" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/a1edc147-031b-4347-be78-8c6ec3c71bd7.webp" %}
![css 最近建议](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/a1edc147-031b-4347-be78-8c6ec3c71bd7.webp)
{% endrender_caption %}

## 工作台

### 命令提示框

{% render_caption caption="命令建议" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/a62c1989-314d-4675-abbb-cb9f09534480.webp" %}
![命令建议](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/a62c1989-314d-4675-abbb-cb9f09534480.webp)
{% endrender_caption %}

有时候会经常反复输入一个命令，所以打开这个历史命令列表很有用。除此之外，保留输入内容也很有用，比如以 toggle 开头的命令（如 Toggle Screen Capture Mode）。

注意，如果输入内容后按了 esc 导致输入框消失，下次再次唤起不会保留输入内容，只有选择了一个命令执行后，再次唤起，才会保留上次输入的内容。

### 目录树

{% render_caption caption="目录树滚动" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/ff187f9a-5588-40fb-927d-89e701495d94.webp" %}
![目录树滚动](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/ff187f9a-5588-40fb-927d-89e701495d94.webp)
{% endrender_caption %}

一般动画我都会打开因为「优雅永不过时」。这个设置也影响「设置」界面的滚动（之前对编辑器设置平滑滚动不会影响「设置」界面和目录树界面的滚动效果 ）。

### 快速打开记录历史

{% render_caption caption="快速打开带入上次记录" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b4633d53-e671-437c-a4e9-241fe722c953.webp" %}
![快速打开带入上次记录](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b4633d53-e671-437c-a4e9-241fe722c953.webp)
{% endrender_caption %}

按下 cmd + p 会出现 quick open 输入框，记住历史挺好的。另外还有个选项是失焦是否自动消失，大部分场景下需要自动消失，偶尔不需要，先保持默认自动消失了。

### 工作台减少动画效果

{% render_caption caption="绝不减少动画" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/24d1bc51-76bf-415b-9c79-561bc6eb7caf.webp" %}
![绝不减少动画](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/24d1bc51-76bf-415b-9c79-561bc6eb7caf.webp)
{% endrender_caption %}

我的 64G 内存 M1 Max，不需要减少动画（默认是 auto，根据系统配置自动适应，适用于多台电脑间配置同步的问题）。

### 字体平滑

{% render_caption caption="字体平滑" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/093ce91b-5349-48a0-b563-2a44726f3bf2.webp" %}
![字体平滑](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/093ce91b-5349-48a0-b563-2a44726f3bf2.webp)
{% endrender_caption %}

类似于 css 中的 `-webkit-font-smoothing: antialiased;` ，default 用于在大多数非 retina 屏上显示最清晰的字体（次像素级），antialiased 是像素级平滑，可能会导致字体更细，见图：

{% render_caption caption="default 设置" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/81378425-4fd6-4954-8d27-5317c822b237.webp" %}
![default 设置](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/81378425-4fd6-4954-8d27-5317c822b237.webp)
{% endrender_caption %}

{% render_caption caption="antialiased 设置" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/e24ea63a-7536-48bd-8dec-302b335224a9.webp" %}
![antialiased 设置](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/e24ea63a-7536-48bd-8dec-302b335224a9.webp)
{% endrender_caption %}

这个设置虽然是在「工作台」块，但是也影响编辑器区域。可以看到开启了 antialiased 的时候，无论是编辑器区域还是工作台区域，字体都更暗（对比度更弱）、更细了。我喜欢后者，所以开启了。

注意，这个「次像素级」，并不是说比像素还小的级别，而是指「还没到像素」的级别，意思是更低级，而不是更高级。

### 目录树 sticky

{% render_caption caption="目录树滚动吸顶" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/ed8074f7-0e31-4a1f-80f8-1618d2264e73.webp" %}
![目录树滚动吸顶](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/ed8074f7-0e31-4a1f-80f8-1618d2264e73.webp)
{% endrender_caption %}

非常好用，滚动的时候可以知道当前的滚动路径，唯一美中不足的是如果能加个 box-shadow 阴影就好了，不然不太好区分的：

{% render_caption caption="目录树吸顶效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/5a7c2102-2730-47a0-b225-738a42d86342.webp" %}
![目录树吸顶效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/5a7c2102-2730-47a0-b225-738a42d86342.webp)
{% endrender_caption %}

sticky 的最大级数也可以修改，默认是 7，足够了（编辑器 sticky 默认是 5 级）。

注意，此设置也同样适用于「设置」界面（原来设置界面属于工作台，而不是编辑器）：

{% render_caption caption="设置项界面也归它管" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/031c3170-cd43-4775-8401-a95e6c474a75.webp" %}
![设置项界面也归它管](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/031c3170-cd43-4775-8401-a95e6c474a75.webp)
{% endrender_caption %}

目录树的缩进我改成 14 了，参考线我喜欢始终显示，不然同级文件太多，不好找：

{% render_caption caption="目录树缩进" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/7a67020e-c5a4-4114-9ac0-ff3afcb5cb61.webp" %}
![目录树缩进](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/7a67020e-c5a4-4114-9ac0-ff3afcb5cb61.webp)
{% endrender_caption %}

### 目录导航

{% render_caption caption="目录导航显示 icon" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/eae4d00a-68d6-4c64-bab8-34df8fc7f458.webp" %}
![目录导航显示 icon](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/eae4d00a-68d6-4c64-bab8-34df8fc7f458.webp)
{% endrender_caption %}

目录导航还是需要的，但是不需要文件/文件夹 icon，这样可以显著的和文件内的数组、类进行区分，非常好用：

{% render_caption caption="面包屑显示效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/57e4fefd-4c76-42cd-b79c-d3d49eb2d1df.webp" %}
![面包屑显示效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/57e4fefd-4c76-42cd-b79c-d3d49eb2d1df.webp)
{% endrender_caption %}

### 修改过的 tab

与此相关的有多个，如在修改后未保存的文件上方显示高亮线：

{% render_caption caption="高亮修改的 tab" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/e4a60c98-ec6f-452d-84ea-e0835ed963bf.webp" %}
![高亮修改的 tab](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/e4a60c98-ec6f-452d-84ea-e0835ed963bf.webp)
{% endrender_caption %}

默认显示的是点，此选项打开后，会点和线同时显示，重启编辑器会只显示上方蓝色线（可能是 bug，其实应该不用重启编辑器也能生效）。

效果：

{% render_caption caption="修改过的 tab 效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/aea54cb4-158e-4662-a6b5-285fc56fd836.webp" %}
![修改过的 tab 效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/aea54cb4-158e-4662-a6b5-285fc56fd836.webp)
{% endrender_caption %}

因为「点」也占用一部分的 tab 空间，会导致无法显示更多 tab 内容信息，所以建议打开该选项。

### 鼠标导航

{% render_caption caption="鼠标前进后退" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/254a8290-8b0a-4ebc-ac36-d453a855719d.webp" %}
![鼠标前进后退](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/254a8290-8b0a-4ebc-ac36-d453a855719d.webp)
{% endrender_caption %}

这是个默认选项，但是我也说一下，对于有左侧按键（右手），也即 4、5按键的鼠标而言，的鼠标直接就可以用来导航，非常好用。

### tab 固定

{% render_caption caption="允许 tab 固定，好用" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b8c68b52-f2ec-4fb4-ac39-1fd1af2c9ebd.webp" %}
![允许 tab 固定，好用](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b8c68b52-f2ec-4fb4-ac39-1fd1af2c9ebd.webp)
{% endrender_caption %}

固定后的 tab 默认出现在编辑器组的左侧，但是如果将其单独排成一行会更直观，与非固定的 tab 区分开，效果如下：

{% render_caption caption="tab 固定效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b6868fe5-65b6-4c6b-bd81-3bd15fada494.webp" %}
![tab 固定效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b6868fe5-65b6-4c6b-bd81-3bd15fada494.webp)
{% endrender_caption %}

注意，默认情况下，固定的 tab 是无法通过鼠标中键或者 cmd + w 关闭的（按下会打开非固定 tab 而不是关闭固定 tab），此行为可以修改：

{% render_caption caption="cmd + w 效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/0259919c-dd23-44f5-89e6-026c2140a424.webp" %}
![cmd + w 效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/0259919c-dd23-44f5-89e6-026c2140a424.webp)
{% endrender_caption %}

### tab 关闭按钮

{% render_caption caption="隐藏关闭按钮" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/c1e66c49-5cab-4d42-9c04-713a6530bb50.webp" %}
![隐藏关闭按钮](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/c1e66c49-5cab-4d42-9c04-713a6530bb50.webp)
{% endrender_caption %}

一直使用左手 cmd + w 关闭 tab，所以此选项可以取消。另外，我其实更习惯双击 tab 关闭，但是官方回复不会做，见：

{% render_bookmark url="https://github.com/Microsoft/vscode/issues/52628#issuecomment-420887497" title="Allow to double click on a tab to close it · Issue #52628 · microsoft/vscode" img="https://opengraph.githubassets.com/6aae01759d8646e94084ae3e75250ed52788ea6312fe232e808e001536ef177c/microsoft/vscode/issues/52628" yid="" bid="" %}
Some of the editors like notepad++ provide Double Click to close a TAB. It would be a great edition to VS Code.
{% endrender_bookmark %}

### tab wrap

{% render_caption caption="tab wrap" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b72dfdff-c447-457d-89de-8ca3a682281d.webp" %}
![tab wrap](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b72dfdff-c447-457d-89de-8ca3a682281d.webp)
{% endrender_caption %}

如果打开 tab 较多，滚动 tab 的时候就会比较费劲，无法掌控全局，所以我喜欢 wrap tab，效果如下：

{% render_caption caption="wrap 效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3738c007-8e6d-4397-a3fb-0a5210402ed2.webp" %}
![wrap 效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3738c007-8e6d-4397-a3fb-0a5210402ed2.webp)
{% endrender_caption %}

比较尴尬的一点是，wrap 效果产生的多行 tab，可能跟上面提到的「修改 tab 上方蓝色高亮」搞的比较混乱（蓝色的线不知道是上面 tab 的还是下面 tab 的，得反应一下不直观）。是在 tab 显示更多内容，还是更直观，自己取舍：

{% render_caption caption="高亮修改 + tab 高亮效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/bba12f32-b355-4550-aba5-c59950ed66fc.webp" %}
![高亮修改 + tab 高亮效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/bba12f32-b355-4550-aba5-c59950ed66fc.webp)
{% endrender_caption %}

### tab 高度

{% render_caption caption="紧凑 tab 布局" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3224c016-4adb-41d2-82f8-83391960259d.webp" %}
![紧凑 tab 布局](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3224c016-4adb-41d2-82f8-83391960259d.webp)
{% endrender_caption %}

紧凑布局有利于掌控全局+不占地方。

### ~~双击  tab 关闭（？）~~

{% render_caption caption="没懂这个设置" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3385a990-b192-4aec-963a-ee5996faf19d.webp" %}
![没懂这个设置](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/3385a990-b192-4aec-963a-ee5996faf19d.webp)
{% endrender_caption %}

看字面意思这个选项是官方号称不会做的「双击 tab 关闭」（如上面所言），但即使我关闭了可能会冲突的「双击 tab 自动扩展编辑器组」，该设置依然不生效，不知是不是我理解有误还是 bug。

### 原生 tab

与此相关的有两个：

{% render_caption caption="原生 tab" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/09ad718f-b4c3-40a3-8c92-8e399613540a.webp" %}
![原生 tab](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/09ad718f-b4c3-40a3-8c92-8e399613540a.webp)
{% endrender_caption %}

第一个设置，启用后，可以将多个项目窗口，合并到一个窗口。「窗口」选项中会出现「合并所有窗口」的选项，这样可以在一个窗口中来回切换多个项目，非常好用：

{% render_caption caption="合并所有窗口" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/8d13f532-cc6a-49a6-9d2c-88aabf5904e3.webp" %}
![合并所有窗口](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/8d13f532-cc6a-49a6-9d2c-88aabf5904e3.webp)
{% endrender_caption %}

但是，这样的话就无法使用自定义的标题（其实我觉得也么啥用），自定义标题是这样的：

{% render_caption caption="自定义标题栏效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/1d16fa15-9ee4-4647-8458-1103a659a165.webp" %}
![自定义标题栏效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/1d16fa15-9ee4-4647-8458-1103a659a165.webp)
{% endrender_caption %}

第一个设置如果打开了，那第二个就无效了，无论设置为 native 和 custom。如果第一个设置不打开，第二个设置设置为 native，那就没有「合并所有窗口」，也没有「自定义标题栏」（不知道这个设置意义何在）。

### 目录树拖放

{% render_caption caption="最好禁用拖拽文件" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/f4f866b8-c0be-456f-8336-2a229c532f61.webp" %}
![最好禁用拖拽文件](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/f4f866b8-c0be-456f-8336-2a229c532f61.webp)
{% endrender_caption %}

我经常误触，然后导致上百个修改…所以关了。

### 搜索结果自动折叠

{% render_caption caption="少于 10 个的文件夹展开" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/5aab9aef-806d-42a0-ab7c-7d58ae4b4849.webp" %}
![少于 10 个的文件夹展开](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/5aab9aef-806d-42a0-ab7c-7d58ae4b4849.webp)
{% endrender_caption %}

默认总是展开，但是如果搜索结果过多（通常是因为你还没有输入完成），此时展开是没有必要的，而且会耽误你掌控全局。

另外，如果你没有在搜索栏中加入「排除的文件」，那么也可能出现海量搜索结果，如 NextJS 项目的 .next 目录等，因此此设置也是必要的。

需要注意的是，这个「展开」、「折叠」的 10 个文件限制，指的是搜索结果中，出现在某个文件夹下的文件数量，而不是整个搜索结果的文件夹数量：

{% render_caption caption="多余 10 个的文件夹折叠" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/67c50309-319c-474a-addf-bbd33925d827.webp" %}
![多余 10 个的文件夹折叠](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/67c50309-319c-474a-addf-bbd33925d827.webp)
{% endrender_caption %}

因此，如果某个文件夹下，出现符合搜索结果的文件过多（文件夹被折叠），通常你就需要检查是否需要提供更多搜索信息了。

### 搜索框自动填入选择内容

{% render_caption caption="全局搜索自动带入选择内容" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/42995472-6453-4e61-881e-d7e0ae5da443.webp" %}
![全局搜索自动带入选择内容](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/42995472-6453-4e61-881e-d7e0ae5da443.webp)
{% endrender_caption %}

通常你选中一个内容后想搜索它，因此「Seed On Focus」此选项让你可以节省一个 cmd + v 的操作。

注意，这有区别于「搜索小组件」中的 选中后聚焦到搜索时自动带入。因为在编辑器中你去选中内容，然后聚焦到搜索小组件，不一定是为了搜索，还可能只是为了简单在当前编辑器高亮选中的相同内容以便于查看，但是此时选中后聚焦到搜索小组件，就自动替换成选中内容了，很多时候不符合预期。

而如果你在选中内容后，聚焦到搜索视图（右侧），那大概率是为了搜索内容。

另外搜索结果我会想知道它所处的行号，以确定它在其文档中的位置，所以显示行号也是很有必要的。

最后的 Smart Case 算是一个小技巧，如果都用小写，就表示自己记不太清搜索名字了，如果很确定搜索内容（如驼峰的函数名）的某个字母是大写，那么就区分大小写进行搜索，非常好用。

除此之外，如果能记住上次输入的内容，其实记住也是选中状态，如果不符合自己的输入预期，直接输入内容即可，对自己即将想要搜索的内容没有影响，而如果之前搜索的内容还有用，那岂不是更好？↓

{% render_caption caption="注意与搜索小组件的差别" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b84b5d58-94cb-448f-bd1a-cc129aac13bd.webp" %}
![注意与搜索小组件的差别](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/b84b5d58-94cb-448f-bd1a-cc129aac13bd.webp)
{% endrender_caption %}

### 搜索忽略全局的 ignore

{% render_caption caption="全局忽略设置" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/21a936ed-29c9-4613-b6d4-5ad910fc04f0.webp" %}
![全局忽略设置](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/21a936ed-29c9-4613-b6d4-5ad910fc04f0.webp)
{% endrender_caption %}

git 有个全局默认的 ignore，打开该选项可以在搜索的时候将其中列出的文件、文件夹忽略掉，通常是有必要的。

另外还有个在父级目录中启用 ignore，没明白什么意思，可能是多级 git 管理吧，我也勾选上了，既然都 ignore 了嘛：

{% render_caption caption="统统勾上" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/fa5ad841-87ee-460f-ad01-d1c7a34f2553.webp" %}
![统统勾上](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/fa5ad841-87ee-460f-ad01-d1c7a34f2553.webp)
{% endrender_caption %}

### 调试和测试

恕本人技术水平有限，VSCode 的调试和测试功能用的较少，只用来调试过诸如 NextJS 这类的 NodeJS 应用，使用起来跟 Chrome 差不多。因为用的少，所以没发现有什么痛点，所以没有什么配置可以优化的，这里就不说了。

### 文件修改效果

{% render_caption caption="实线比「装订线」好看" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/ef52ba2e-5ff7-4f8f-963d-32da4f899fe6.webp" %}
![实线比「装订线」好看](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/ef52ba2e-5ff7-4f8f-963d-32da4f899fe6.webp)
{% endrender_caption %}

在显示行号那一列，可以设置是实线还是「装订线」来显示差异，如：

{% render_caption caption="实在不知道装订线存在的意义" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/4c009676-4e9a-4c90-8eab-5ceffae9593d.webp" %}
![实在不知道装订线存在的意义](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/4c009676-4e9a-4c90-8eab-5ceffae9593d.webp)
{% endrender_caption %}

我更喜欢实线，所以这两个选项都取消了。

### 取消 git 提交按钮

{% render_caption caption="移除多余的 UI 按钮" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6343ab7e-7fc4-4cdc-8b0d-b65eae20b0b7.webp" %}
![移除多余的 UI 按钮](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/6343ab7e-7fc4-4cdc-8b0d-b65eae20b0b7.webp)
{% endrender_caption %}

说实话，左侧的这个提交按钮我从来没用过，都是使用命令行操作的 git，所以这个选项我取消了。

同理，这个按钮（看起来是 github copilot 的按钮，自动生成提交注释），我也取消了，尤其是对于公司项目，强制要求输入内容带上需求/bug 卡片编号的时候，这个智能写提效信息就更没用了：

{% render_caption caption="移除自动写提交信息" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/111f48be-42e0-4f6a-b490-7dc832b15045.webp" %}
![移除自动写提交信息](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/111f48be-42e0-4f6a-b490-7dc832b15045.webp)
{% endrender_caption %}

## 扩展

### 取消通知

{% render_caption caption="取消全部扩展通知" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/caa23ff0-089b-4035-90e1-c914e44c61ac.webp" %}
![取消全部扩展通知](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/caa23ff0-089b-4035-90e1-c914e44c61ac.webp)
{% endrender_caption %}

我不需要任何扩展告诉我应该怎么做，如果有需要，我会主动找它。

## 终端

### 右键行为

{% render_caption caption="终端邮件默认居然是选中+菜单" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/8c75e65f-ae00-49f1-982f-82c682b4a2f9.webp" %}
![终端邮件默认居然是选中+菜单](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/8c75e65f-ae00-49f1-982f-82c682b4a2f9.webp)
{% endrender_caption %}

一般是鼠标左键选中后，右键出上下文操作。但 VSCode 默认行为居然是选中内容（单词）后出右键，可以，但没必要。

### 终端最大行数

{% render_caption caption="最大记录行" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/67d6cb52-ce20-40d2-ab50-548b7a4aab41.webp" %}
![最大记录行](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/67d6cb52-ce20-40d2-ab50-548b7a4aab41.webp)
{% endrender_caption %}

这个其实改不改都行，我偶然情况下需要看很久之前的 log 信息，加上我的 64G 内存，调大点无所谓。

### 终端滚动动画

{% render_caption caption="奇怪的动画，关了" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/7bd7b784-c3e5-456a-9aea-f0374dfa62b0.webp" %}
![奇怪的动画，关了](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/7bd7b784-c3e5-456a-9aea-f0374dfa62b0.webp)
{% endrender_caption %}

虽然我喜欢动画（优雅），但是很奇怪，在终端的动画滚动似乎有点惯性，很难掌控滚动量，跟编辑器或者工作台内的滚动效果有很大差异，所以我关了。

## CSS/Less/Sass

### lint 重复属性警告

{% render_caption caption="需要设置三次" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/067e3056-d82f-4910-9e47-519259d54577.webp" %}
![需要设置三次](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/067e3056-d82f-4910-9e47-519259d54577.webp)
{% endrender_caption %}

这个很有必要，有时候你是从外面复制多个属性值粘贴（常见的是从浏览器检查元素的 style 上复制），然后去除重复的属性。

## Git

### 自动 Stash

{% render_caption caption="少操作一次" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/4fee6e57-9088-4a39-bbfe-c86ea5c9beb2.webp" %}
![少操作一次](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/4fee6e57-9088-4a39-bbfe-c86ea5c9beb2.webp)
{% endrender_caption %}

如图，描述的很清楚了，建议开启，少一步操作。

## 第三方扩展 

其实没什么好说的，毕竟都装扩展了，肯定是有自己的需求才会装的，所以按照自己的需求配置即可。

### GitLens

不过有些插件，是可以关闭付费推荐的，对，说的就是 `GitLens` ，在我（意外）查看 git 分支合入情况的时候，会触发到付费功能的提示，这个可以关闭（感谢插件开发者的大度）：

{% render_caption caption="关掉 GitLens 付费功能提醒" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/28974458-b244-4ed9-919e-affe90c409fe.webp" %}
![关掉 GitLens 付费功能提醒](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/28974458-b244-4ed9-919e-affe90c409fe.webp)
{% endrender_caption %}

### One Dark Pro

{% render_caption caption="高亮部分代码" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/a1ac82b3-7b1c-4fc4-9327-2cd04796bbee.webp" %}
![高亮部分代码](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/a1ac82b3-7b1c-4fc4-9327-2cd04796bbee.webp)
{% endrender_caption %}

这个我喜欢，更显著的看到方法、函数名：

{% render_caption caption="效果" img="https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/d6235ab1-a532-4188-be52-2f29908b31e5.webp" %}
![效果](https://static.xheldon.cn/img/in-post/2023/make-vscode-great-forever/d6235ab1-a532-4188-be52-2f29908b31e5.webp)
{% endrender_caption %}

## 后记

说了这么多设置，适合自己的才是最重要的，祝大家高效工作，早点下班！
