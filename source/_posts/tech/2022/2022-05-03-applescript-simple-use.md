---
layout: post
date: 2022-05-03 13:38:32 +0800
categories: tech
path: _posts/tech/2022/2022-05-03-applescript-simple-use.md
cos: 2022/applescript-simple-use
header-style: text
tags:
    - 技术
    - AppleScript
    - 初体验
craft: https://www.craft.do/s/RsgimVt9VBxAmg
callout: 简单体验了一下 AppleScript，介绍了下常用的用户交互方式，感觉很强大。
title: AppleScript 初体验
sha: 01ee7a838b941f7623545ccab7126b17764a4c20
lastUpdateTime: 2023-01-05 12:01:34 +0800
---

## 前言

最近新买了 Mac Studio，配备了 M1 Max 芯片和 64G 的内存，性能非常强。与此同时，之前的 [博客处理流程](/tech/my-blog-ci-in-2022.html) 中，因为需要使用 Github Action 将从 Craft 拉取的图片（这一步很快，毕竟二者都在国外），往腾讯云 COS传的时候，经常遇到网络过慢的问题

{% render_caption caption="SCR-20220502-q47" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/FBB4B556-8472-4C92-8EFD-E07015DC5FBB_2.webp" %}
![SCR-20220502-q47](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/FBB4B556-8472-4C92-8EFD-E07015DC5FBB_2/qG6iEVq1ryDHAl7vIc6uESpULghYi3pfoMBvyWmB9tcz/SCR-20220502-q47.png)
{% endrender_caption %}

调研了一番发现，Github 貌似 [不支持设置 Action 服务器的区域](https://github.community/t/is-there-a-way-to-specify-virtual-machine-region/120438)。鉴于此，所以打算之后将发布流程放到本地，，以加快构建流程，遂有此文。下面的 AppleScript 简称 AS。

## 为什么用 AppleScript 而不是其他？

首先，我当然是想尽可能的缩短操作路径和复杂度，因此先规定了操作步骤： 

1. 点击 Craft 中的发布按钮。

1. 本地构建，同时显示出构建 log 在终端。

1. 将构建结果推送到 github。

由于需要在一个 App 中通过链接调用另一个 App，因此使用 AppleScript 是唯一选择。不过，虽然使用的是 AS，但是其实执行的还是已有的 js 文件，只是将 [craft_publish_ci 中的 workflow任务](https://github.com/Xheldon/craft_publish_ci/blob/master/.github/workflows/publish.yml) 挪到了本地执行而已。

## AppleScript 简介

概念图：

{% render_caption caption="execute_script_2x" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/6C1FA0DD-5875-4C15-BCA8-495B34F5F699_2.webp" %}
![execute_script_2x](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/6C1FA0DD-5875-4C15-BCA8-495B34F5F699_2/rFAQQ4X8KZCxfRAO7lGktxbPIHD9qVHAaOYlxhhVRREz/execute_script_2x.png)
{% endrender_caption %}

### AppleScript 能做什么 

1. 能与用户交互，如响应用户输入、通知中心发送通知等。

1. 能控制其他 app ，如果其他 app 提供了相关 AS 接口可以直接控制，如果没有提供相关接口则需要通过 AS 语法来获取界面上的按钮等操作元素进行操作。

1. 能执行自动化任务如发送邮件、执行定时脚本、打开音乐播放器、锁屏、响应自定义的 URL Scheme 后执行脚本等。

#### 基本语法

* 每行的前面加上 `---`（三个短横线）或者 `#` 表示注释本行。

* 用 `(*``*xxx**``)` （括号+星号）包裹的 `xxx` 表述块注释掉 xxx 的内容。

* 其他的基本跟口头预类似，不过如果你对英文语法不自信，比如不清楚 besides against over 等在具体语境中的意思，建议还是老老实实使用基本语法。

### AppleScript 的形式

AppleScript 常用的有两种形式，Script（脚本）、Application（应用），这里只介绍前两种，Script bundle 和 Text 我没用这里不展开。

{% render_caption caption="SCR-20220502-qqc" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/08F57517-C6AC-49C1-9B5E-9606F2DD2A8E_2.webp" %}
![SCR-20220502-qqc](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/08F57517-C6AC-49C1-9B5E-9606F2DD2A8E_2/axMACSeQhTxPtW9mUyJrolaP5hvxb1oy42Hl4RF4cb8z/SCR-20220502-qqc.png)
{% endrender_caption %}

> 注：这里需要说明一点的是，即使是相同的代码，保存成脚本运行和保存成应用运行，界面是不一样的。

#### 脚本

脚本顾名思义就是像 js 一样的可执行文件，不同的是 as 是在 Mac 桌面环境执行，而 js 是在 Chrome 中执行的。双击即可运行。下图是脚本 process 显示进度的界面，通过点击脚本右上角的「运行」按钮运行：

{% render_caption caption="SCR-20220502-r3e" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/A8E4D5D2-C4A6-4E6D-80DA-7E3A0EFA7D41_2.webp" %}
![SCR-20220502-r3e](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/A8E4D5D2-C4A6-4E6D-80DA-7E3A0EFA7D41_2/xxQUXfuxbS2QzeqWuDYzbtdXdehGRDyb0RxiG1AiG50z/SCR-20220502-r3e.png)
{% endrender_caption %}

#### 应用

保存成 Application 的 AS 的后缀名跟普通的应用如 Safari、Chrome、微信等应用一样，会以 `.app` 结尾，也可以查看包内容。有多种运行方式如 URL Scheme 调用、双击、拖拽内容到 app 图标上，你需要写相关的事件函数来响应相关用户操作。下图是 应用process 显示进度的界面，通过双击 「xxx.app」运行：

{% render_caption caption="SCR-20220502-r33" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/E0B4F2DA-21AA-4EF1-B059-9C500E18B67C_2.webp" %}
![SCR-20220502-r33](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/E0B4F2DA-21AA-4EF1-B059-9C500E18B67C_2/ojCpfkt2XYxgltMND0Rak2qS2x0IxxuMTaD2T6I95bEz/SCR-20220502-r33.png)
{% endrender_caption %}

#### 其他

除了上述两者，其他的不常用，不过如果你需要将 script 保存成服务以在状态栏或者任意界面的右键的服务中能够调用该脚本，这需要上述两者之外的形式：

{% render_caption caption="SCR-20220502-rcr" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/D09A2EEB-72DC-4CA1-8812-59E4BC4206DB_2.webp" %}
![SCR-20220502-rcr](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/D09A2EEB-72DC-4CA1-8812-59E4BC4206DB_2/AMqDHYVf2r1Yqzyki7hxYWYW2VIMnS6KZfagw2K2yosz/SCR-20220502-rcr.png)
{% endrender_caption %}

你可以选择将脚本保存成系统 Service，此时上述 process 代码运行的时候，进度条会显示在顶部状态栏：

{% render_caption caption="scriptmenu_progress_2x" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/B936F8C6-DCA3-4B98-B995-7F4F3F013E74_2.webp" %}
![scriptmenu_progress_2x](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/B936F8C6-DCA3-4B98-B995-7F4F3F013E74_2/YjbEyRXXcvuwGb5QtF1ZiGArZNgc4Vxjqy5HCxs6x14z/scriptmenu_progress_2x.png)
{% endrender_caption %}

## 常用操作代码

> 以下操作基于「应用」类型的 AS，下列的语法在终端中使用 `osascript -e '语法内容'` 可以快速验证。需要注意的是，类似于多行的表达如 process 进度条的显示，osascript 是没办法做到的，虽然你可以在很多多行命令如 `tell` 中使用多个 `-e` 参数来串联如 `osascript -e ‘tell application “Finder”’ -e ‘end tell’` ，但是此语法对 process 进度条无效。

### 用户交互

#### 在通知中心显示信息

```javascript
display notification "通知内容" with title "通知 title" subtitle "通知副标题"
```

{% render_caption caption="SCR-20220502-sfl" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/AC96218F-E238-4695-9220-7933C27BC841_2.webp" %}
![SCR-20220502-sfl](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/AC96218F-E238-4695-9220-7933C27BC841_2/aFYDnlfIPtivKeo30Hf62xMT42y9FhnRF0heRNuhRdsz/SCR-20220502-sfl.png)
{% endrender_caption %}

#### 弹窗

```javascript
display dialog "这是个通知"
```

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/B945A1B9-4704-4F39-9A68-C0287846A061_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/B945A1B9-4704-4F39-9A68-C0287846A061_2/6ZQeaCkSxWAhxaQr3iJxupwK3yXpLHRAWAiSi7PwIN4z/Image)
{% endrender_caption %}

#### 获取用户输入

```javascript
display dialog "What's your name?" default answer "" with icon note buttons {"取消", "确认"} default button "确认"
```

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/F4002573-AD3C-4D4E-BF98-9B6696788442_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/F4002573-AD3C-4D4E-BF98-9B6696788442_2/X4BCb2tvWN05wFEc3ZpQArPBGqJjNIzx96eIXT1WOx4z/Image)
{% endrender_caption %}

> 注：AS 没有办法生成类似表单一样的组件，只能生成上面这种对话框，类似网页中的 prompt

#### 播放给定文本

```javascript
say "What is your name?" using "Alex" speaking rate 140 pitch 42 modulation 60
```

#### 其他

让用户选择文件夹、文件、颜色、从列表中选择一项等，暂时省略。

### 执行命令行

```javascript
do shell script "echo $PATH"
```

> 注意，命令行中的 PATH 环境变量为 `/usr/bin:/bin:/usr/sbin:/sbin` ，因此无法在其中执行诸如 `node` 、`nvm` 等后来安装的命令，这些命令执行的时候需要手动指定命令所在位置。

执行 node 脚本：

```javascript
set node to "/Users/x/.nvm/versions/node/v14.19.1/bin/node"set appPath to "/Applications/Xhelper.app/Contents/Resources/Scripts/"do shell script node & " " & appPath & "index.js"
```

### 获取上一个语句的输出结果

直接在上一句语句后立即使用 `result` 表示结果即可：

```javascript
do shell script "echo $PATH"display dialog result with title "通知"
```

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/6214E292-E4CB-49BC-B8D2-945C135E5B45_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/6214E292-E4CB-49BC-B8D2-945C135E5B45_2/Kq7EtDsr5vXhI1ARgxWEYweVE6YaBgwdxEsJNaCgEbkz/Image)
{% endrender_caption %}

### 显示调试信息

直接使用 `log` 语句即可，然后在 `Script Editor` 下方的 `Replies` 中获取输出信息，可以在这里看到 `shell script` 命令执行的过程中，脚本向控制台输出的内容，如执行 js 脚本的时候的 `console.log` 等。

```javascript
log do shell script "echo $PATH"
```

{% render_caption caption="SCR-20220502-sov" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/1089533E-DE38-418F-A20C-592669941C2D_2.webp" %}
![SCR-20220502-sov](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/1089533E-DE38-418F-A20C-592669941C2D_2/0TMUxOGD7qJhjO5zx26QegxAgk8sfvGv5S2Dd8b3wpAz/SCR-20220502-sov.png)
{% endrender_caption %}

### 显示进度

显示进度用到 progress ，语句相对来说比较复杂，因为需要显示不同的状态进度，需要多行： 

```javascript
set progress total steps to 3set progress completed steps to 0set progress description to "处理中..."delay 1set progress completed steps to 1delay 1set progress completed steps to 2delay 1set progress completed steps to 3
```

相关的截图可以在上面看到。

### 延迟一段时间后执行

```javascript
delay n
```

`n`  表示秒数，支持小数。一般用来模拟用户操作的时候的延迟操作，否则可能因为脚本操作过快页面还未来得及显示等。一些奇怪的问题也可以通过延迟执行来解决，此语句可以类比于 `js` 中的 `setTimeout` 大法。

### 调用其他应用

注意，此处会有系统警告，需要你确认才能执行: 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/898D7F67-700E-40F2-AC6C-D999F5543578_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/898D7F67-700E-40F2-AC6C-D999F5543578_2/NX19Vrr8tR8G6vD8V4h9yAb9X3ZybLkBgEnf5x1BtkQz/Image)
{% endrender_caption %}

确认后可以在`设置-安全与隐私-隐私-自动化`中确认： 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/47444D53-68E4-4518-87FD-521AE42B737F_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/47444D53-68E4-4518-87FD-521AE42B737F_2/usCfzoB3MUzUR4JSxlszqtN6E7JKR8PM2U850mlSQNkz/Image)
{% endrender_caption %}

可以调用其他应用来执行相应的操作，下面是唤起 `Terminal` 应用后，激活然后执行命令： 

```javascript
tell application "Terminal"	if not (exists window 1) then reopen	activate	do script "echo $PATH" in window 1end tell
```

此语句做了一个判断，如果第一个打开的窗口存在，则激活之，然后在其内执行命令（`do script` ）；如果不存在的话则会新建一个窗口然后在其内执行命令。因为每个 `do script` 都会打开一个新的 Terminal 这个判断可以保证复用窗口。不过需要注意的是，如果 `window 1` 内已经有一个已经存在的进程（如 server 未中断），那么这个命令是不会执行的，还需要额外的判断，此处不展开。

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/8701C38B-8CE9-479A-816A-9126692B313D_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/8701C38B-8CE9-479A-816A-9126692B313D_2/vI45zMThUiXXGyT2hCHR1CNtSpSxB5NuYcqWF9h7sq8z/Image)
{% endrender_caption %}

### 响应 URL Scheme

有些时候你不想先找到 AS 脚本，然后双击运行；或者有时候你需要从另一个应用中调起你写的 AS 应用，这个时候就用到了 URL Scheme，少数派有 [一篇介绍](https://sspai.com/post/31500)，可以看看。

首先你需要修改 `Info.plist` 文件，可以在 Script Editor 的右侧，右键 「显示在 Finder」 中：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/E1F3DFE5-54E3-4615-9A74-1B084686CC37_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/E1F3DFE5-54E3-4615-9A74-1B084686CC37_2/bPijJNHF1uUhx1PMYtIpxc2ZyryBrhSh8mrzDY1py38z/Image)
{% endrender_caption %}

然后向上一级，可以看到该文件：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/DE5F9B08-4F60-4B2A-9645-DF37B420C96B_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/DE5F9B08-4F60-4B2A-9645-DF37B420C96B_2/W2jNk2n6lJzC7Pi8r6AQ0e7E00fTK84lZMoEHJNMxF8z/Image)
{% endrender_caption %}

内容是一个类似 XML 的东西编辑之，在其内加入如下字段： 

```xml
<array>
	<dict>
		<key>CFBundleURLName</key>
		<string>Open File</string>
		<key>CFBundleURLSchemes</key>
		<array>
			<string>xhelper</string>
		</array>
	</dict>
</array>
```

然后确认一下，用 XCode 打开该文件可以看到类似的条目： 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/901047E8-38AA-4B9C-BA60-680EC60864F5_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/901047E8-38AA-4B9C-BA60-680EC60864F5_2/O0ZsK4ByQiupHRDgy5yLzNSJi7EjyIYEmV7o8oTwzXoz/Image)
{% endrender_caption %}

表示添加成功。

这个操作的意思是，将该 AS 应用响应以 `xhelper` （可以任意修改成你想要的开头，不要与已有的重复即可）开头的 URL。

设置完成后，需要在 Script Editor 中保存一下，或者 `cmd + L` 一下或者运行一次（或者都做一遍），重新编译，然后才能生效。

然后，为了让 AS 响应该 URL，需要设置一个事件监听： 

```javascript
on open location this_URL
	display dialog this_URL
end open location
```

上述代码中，`this_URL` 即为以你 `xhelper` 打开的链接。

此时在浏览器中（截图是 Chrome）测试一个链接： 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/01F724A1-041B-4143-80CC-5F4F3D6ECFC8_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/01F724A1-041B-4143-80CC-5F4F3D6ECFC8_2/I31R4jiYkTf2fxqqy8bsiPCnctY9SfQwWlBEFKwknZIz/Image)
{% endrender_caption %}

然后 AS 应用就会响应然后弹窗显示 `xhelper://你好！` ，注意这里是不用 encode 编码的。

## 我的使用

在这里放出我自己的 Craft build 代码，用的是上述的 URL Scheme，其中的 node 执行的 js 都是从 [之前的工作流](/tech/my-blog-ci-in-2022.html) 改造的，没有什么新逻辑。另外 AS 的语法比较口语化，直接看就能看懂每句话是什么意思，这里就不一一解释了。

```javascript
on open location this_URL	try		set startOffset to offset of "://" in this_URL		set the content to text from (startOffset + 3) to -1 of this_URL		set node to "/Users/x/.nvm/versions/node/v14.19.1/bin/node"		set appPath to "/Applications/Xhelper.app/Contents/Resources/Scripts/"
		--- 如果有两个参数表示需要发布到 wechat，如果只有一个参数则参数即为 base64 编码的内容		set AppleScript's text item delimiters to "&"		set arguments to every text item of the content		set AppleScript's text item delimiters to ""		set listLength to the length of arguments		if listLength = 2 then			set realContent to item 2 of arguments			do shell script "echo " & realContent & " > " & appPath & "content.base64.txt"			tell application "Terminal"				if not (exists window 1) then reopen				activate				set alive to do script node & " " & appPath & "index.js" in window 1				--- 等待上一个脚本执行完毕后再执行下一个脚本				repeat					delay 0.1					if not busy of alive then exit repeat				end repeat				beep				do script node & " " & appPath & "wechat.js" in window 1			end tell		else			do shell script "echo " & content & " > " & appPath & "content.base64.txt"			tell application "Terminal"				if not (exists window 1) then reopen				activate				do script node & " " & appPath & "index.js" in window 1			end tell		end if	on error error_message		display dialog error_message buttons {"Cancel"} default button 1	end try	end open location
```

效果：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/applescript-simple-use/F7A4DDFF-2698-4E1E-8D72-C8B3D0EC5020_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/322EF7B6-4183-40D4-9721-912E69B3B975/F7A4DDFF-2698-4E1E-8D72-C8B3D0EC5020_2/qHbKQxyqMyfC3md0NqKEFRUxX3y8GIKCsTYyWAuPJX0z/Image)
{% endrender_caption %}

## 参考链接

* [Mac Automation Scription Guide](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1)

* [AppleScript 10.10 Changes](https://developer.apple.com/library/archive/releasenotes/AppleScript/RN-AppleScript/RN-10_10/RN-10_10.html#//apple_ref/doc/uid/TP40000982-CH110-SW8)

* [Introduction to AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983-CH208-SW1)

* [Customize AppleScript app icon](https://stackoverflow.com/questions/42815166/customize-applescript-app-icon)

* [Using Node.js in an AppleScript](https://ohdoylerules.com/snippets/using-node-in-applescript/)

* [Where can I access official AppleScript documentation?](https://apple.stackexchange.com/questions/21602/where-can-i-access-official-applescript-documentation)

* [关于使用 JavaScript 写 AS 的相关资料](https://apple-dev.groups.io/g/jxa/wiki/3202)

* [AppleScript 教程](https://www.notion.so/AppleScript-c07b90f850ea42e990b3ea2333f9b252) （Write on Notion）

* [在 macOS 中制作自己的 URL Schemes](https://sspai.com/post/44425)

* AppleScripe 简明基础教程（iDoraemon Nathan 编著）
