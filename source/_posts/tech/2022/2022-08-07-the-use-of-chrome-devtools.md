---
layout: post
date: 2022-08-07 20:39:47 +0800
categories: tech
path: _posts/tech/2022/2022-08-07-the-use-of-chrome-devtools.md
cos: 2022/the-use-of-chrome-devtools
header-style: text
tags:
    - 技术
    - Chrome
    - 调试
    - 技巧
craft: https://www.craft.do/s/20CjMjTupEMXFc
callout: Chrome 的调试功能很强大，这里介绍一下我工作中最常用的几个功能。
title: Chrome 常用调试方法及其他
sha: ec1c57402069ccc2a0c0ebc50018156303875fb8
lastUpdateTime: 2022-08-12 09:37:17 +0800
---

Chrome 是一款浏览器，对前端工程师来说也是一款调试利器，下面的几个功能是我在工作中最常用到的几个，下面逐个介绍。

### 断点

> 这个应该是用的最多的基础功能，但是我面试过的很多外包同学并不知道如何使用 Chrome 的断点调试，或者听说过，但是不知道怎么用，下面简单介绍一下基本操作。

添加断点可以直接在代码中硬编码，增增加一行`debugger` 表达式即可，代码执行到此处会断到此处： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/B64AFAEF-676F-4AB6-BFD9-163096FFD511_2.png)

在 VSCode 中，黄色下划线表示警告。一般不会使用此方式，因为此方式跟 `console.log`  并没有明显的优势，甚至还不如前者简单，因为你用完之后还得删了，不然代码是不可用的。

还有一种方式是直接在 devtools 中的 source tab 中找到源码，一般是通过 `console.log` 输出后，点击控制台右侧的文件名，可以在 `Sources` tab 中看到源码，点击左下角格式化之后，在代码左侧行号出点击标记断点，即可调试，如下图：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/C987CDFD-FF9E-45BE-AE3B-BADD657DE1B9_2.png)

断点后，图中红色部分的按钮，从左向右依次的含义：

- `继续执行` ：点击后，断点将直接执行到下一个断点处。

- `setp over` ：如果当前断点所在位置不是函数，则跟 `step` 一样，执行到下一行；如果是函数，则会跳过该函数继续执行到下一行。

- `setp into` ：如果没有异步代码，则跟 `setp` 一样，执行到下一行；如果有异步代码，但它会进入到异步代码的内部第一行。

- `step out` ：点击后，跳出当前函数。

- `setp` ：执行下一行同步代码，跟 `step into` 不一样， 它会跳过异步代码的执行；如果当前断点在函数处的话，会进入到函数调用内部第一行。

- `暂时停用/激活断点` ：首次点击后会临时禁止断点功能，就像没有打断点一样代码不会停止执行，下方的 `Breakpoints` 中的断点会整体置灰：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/91E6FC8D-D932-4412-9D5D-EBC5E92BD8EA_2.png)

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/0AC85FEA-3449-49A8-8BF9-A619CF2D924E_2.png)

- `将断点停在报错处` 点击高亮后启用，代码将会自动停止到任何 throw error 的地方，无论是否是被 catch 住，也无论是 http 错误还是什么错误。注意必须把下面的`Pause on caught exceptions` 勾选才行，不勾选等于无效：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/D99CEF49-A530-412E-B632-307C291C75E0_2.png)

此功能最好是在代码执行一遍完成后，页面载入完成后，开始交互的时候打开，否则可能一进入页面就会报错，包括 React 中的合法报错等，导致无法正常加载页面。

直接放一张官方断点的图： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/17ED1675-13EA-42A3-8B4D-83587390D7EF_2.png)

##### 官方图👆🏻

上图中上述的按钮下面有一系列的 toggle `‣` 三角号可以点击，依次为：

- `Watch` 可以监测断点处的任何可访问到的上下文变量以供显示，如果变量不存在或者无法访问，如访问 `a.b.c` 的时候，a 不存在，那么会显示不可用。当断点断的时候，该位置输入的变量会自动显示，而不用鼠标悬浮上去（像上面官方图一样）查看变量，很方便。

- `Breakpoints`  表示已经有的断点。checkbox 打勾的是可用的断点，未打勾的是暂时忽略的断点（可以临时打勾或者取消掉）。

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/5F3A5468-63E9-47EF-9E80-461D5988E2C3_2.png)

当前执行到的断点，背景是黄色的。

- `Threads` 表示当前调用的文件线程，当期页面 JavaScript 线程表示为 `Main` 中。此部分一般用不到，只是用来调试`Web Worker` 比较有用，也可以用来在当前页面调试 Chrome 浏览器插件。

- `Scope` 显示当前断点处的可访问到的变量值。因为 JavaScript 的闭包和调用栈的特性，会显示很多闭包中的变量：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/54D3E302-A251-4411-B366-D69B4C7B6CEE_2.png)

- `Call Stack` 即函数的调用栈，最顶层的是最近的调用，可以通过点击不同的函数在其之间来回跳。需要注意的是，跳转的时候不会真的再次执行到那个位置，只是方便你查看那个位置的闭包变量。

### UI 断点

有些情况下，你不知道或者无从定位一个 UI 问题为什么会这么变化。比如，你的同事写了一个 hover 到按钮上之后，按钮颜色变化的代码。你需要为这个逻辑添加新的逻辑，但是你并不知道他的代码逻辑写在哪个文件（他没有交接工作就休假了，可恶！）。

你发现 hover 到按钮上的时候，按钮会增加个 class 类名，于是你可以使用 dom 断点进行调试，在 `Elements` tab 中，你需要检查的那个元素上右键：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/C9A19CAE-BEC6-4180-B618-73CA95E0CA90_2.png)

UI 断点可以将代码停到你指定的 UI 事件所执行的代码发生之前的那一刻，UI 事件包括：

- 子树修改：如果子树有任何修改，如增加、属性变更等，会将代码断到该逻辑即将执行的地方。

- 属性修改：如果当前右键的元素有任何修改，会将代码断到该逻辑即将执行的地方。

- 节点移除：如果当前右键的元素移除，会将代码断到该逻辑即将执行的地方。

举个例子，飞书文档中，如果 block 聚焦，则会在节点上添加一个 focus 类名：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/3690BB50-7AB1-4798-AEE3-98D1EEC495B3_2.png)

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/C7500F06-2A4D-47A5-8DE6-2ED7CB43868B_2.png)

此时就可以使用 `attribute modifications` 进行断点：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/9A783370-A839-4995-A5E3-2C1D4421ED7D_2.png)

当然，默认情况下线上代码是压缩后的，点击左下角的 `{}` 就会格式化：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/A4049060-72F8-476F-A1D2-A21B099EF177_2.png)

格式化之后，Chrome 会新建一个 tab，在文件后面加上 `:formatted` :

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/CD25F7CA-7ABD-4B32-A28D-0E60935DB707_2.png)

> 需要注意的是，如果你右键的元素在变更的时候是父节点变更，如父节点整体移除，则 UI 断点不会执行。

### Overwrite

> Charles 有类似的功能叫 Map js（没记错的话），ProxyMan 的类似功能叫 Map Local，都是一个意思。

有时候，因为上线/测试链路比较长（尤其是编辑器这种基础工具组件，需要发包），想快速验证一个 case 的时候就会比较麻烦，因此可以使用 Chrome 的 Overwrite 功能。

此功能类似于 Charles 的 Map js 功能，即可以将本地文件作为页面的请求进行响应，你需要先在 `Sources` 中启用该功能，当然，如果没有执定本地的文件存储的位置，需要先让你指定位置才行： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/B5ADFA65-51E3-44AD-967F-311A3604D016_2.png)

此时 Chrome 会提醒你需要本地该路径的完全访问权限，同意即可：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/416C9680-96DF-40AF-861B-6C74EFC6C1DF_2.png)

选择一个本地文件夹后，（这里我选用的是 `~/Developer/Overwrite` 文件夹）就可以启用 `Overwrite` 功能： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/362CACE4-9BBD-41B3-80FD-A69C85EF8209_2.png)

然后转到 `Network` tab，选择一个资源，如 css/js，我这里选择的是 js： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/31AB1FF1-4016-4818-AFB3-3B823209319E_2.png)

注意，如果没有在 `Sources` 中启用 `Overwrite` 的话，这里是不会显示 `Save for overrides` 的。

之后就可以各种修改该文件，然后刷新页面查看修改后的效果了。

需要注意的是，如果 js 文件请求后有时间戳，则 Overwrite 不会生效，因为 Chrome 是使用严格的路径匹配来 map 文件的。

### Snippet

准确说，这个不算是「调试方法」，但是平常有个代码验证的片段，我也会存到这个里面，相当于一个 Sublime（可以对输入过的变量进行自动补全），挺好用的：

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/E231449D-FED8-4E4E-8446-D6A3AAEC87A4_2.png)

### Filesystem

该功能跟上面几个在同一个位置，用来实时同步浏览器中的修改到本地文件系统。该功能适合一个简单的 HTML Web 服务，如 Express 这种服务端返回 js/css/html 等的本地调试时候用。

但是该功能官方明确说了，不适合 React App。因为现在基本项目都是 React、Vue 等的现代框架构建的，因此此功能用的较少，这里仅放个官方截图： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/image.png)

## 其他

### MacVim

上面的 Overwrite 来的 js 一般都是压缩后的线上代码，有些可能会比较大，所以我一般会用 Vim 打开后格式化一下。Vim 配置起来太费劲，而 MacVim 提供了开箱即用的体验，稍加改造即可为己更好的所用。为什么用 MacVim 是因为它性能非常强，格式化大到几十 Mb 的文件都是几秒钟的事情。我一般都会配置一个 js-beautify 进行格式化，虽然叫 js-beautify，但是它可以格式化 js、css、html。

使用 js-beautify 需要先安装 `vim-plug` ，它是一款 vim 插件管理器：[https://github.com/junegunn/vim-plug](https://github.com/junegunn/vim-plug)，使用步骤见：[https://github.com/junegunn/vim-plug/wiki/tutorial](https://github.com/junegunn/vim-plug/wiki/tutorial)。

> 注：安装需要魔法。

`js-beautify` 使用这个：[https://github.com/beautify-web/js-beautify](https://github.com/beautify-web/js-beautify)。

这是我的 vim 配置，我使用 `[]` 快捷键作为调用 `js-beautify` 的方式，这样就不用每次都输入命令了： 

```
set number
set relativenumber
set smartindent
set autoindent
set hlsearch
set display=lastline
set scrolloff=3
set laststatus=2
set showmatch
set ruler
set guifont=Monaco:h12
syntax on
autocmd FileType *.js setlocal equalprg=js-beautify\ --stdin
nmap [] :%!js-beautify<CR>
colorscheme evening
call plug#begin(has('nvim') ? stdpath('data') . '/plugged' : '~/.vim/plugged')
Plug 'jelera/vim-javascript-syntax'
call plug#end()
if !has('gui')
    set term=$TERM
endif

```

### VSCode

VSCode 也有断点调试功能（感谢 Chrome 内核），但是只能调试 Node 应用（可以配合浏览器插件调试 Web 应用，但是没必要，因为已经有 Chrome 了），基本使用方法跟 Chrome 类似，这里就不介绍了，放个图： 

![Image](https://static.xheldon.cn/img/in-post/2022/the-use-of-chrome-devtools/D7AD7683-F0C4-46D2-8632-2ADB519B230C_2.png)

