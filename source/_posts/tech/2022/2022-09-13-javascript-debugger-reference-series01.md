---
layout: post
date: 2022-09-13 09:29:30 +0800
categories: tech
path: _posts/tech/2022/2022-09-13-javascript-debugger-reference-series01.md
cos: 2022/javascript-debugger-reference-series01
header-style: text
tags:
    - 技术
    - 调试
    - 技巧
    - JavaScript
craft: https://www.craft.do/s/kyKcQKCEQjAksv
callout: 官方指南系列之一
reference: https://developer.chrome.com/docs/devtools/javascript/reference/
title: 「译」官方指南系列：JavaScript 调试指南（一）
sha: 954c8581ba5ff3a544025bb2e9f65e726c06e81a
lastUpdateTime: 2022-09-13 10:49:20 +0800
---

希望通过这篇全面的 Chrome DevTools debugging 功能介绍，能让你的 debugging 过程更上一层楼。

首先你可能需要先在 [这里](https://developer.chrome.com/docs/devtools/javascript/) （英文，待译）学习基本的 debugging 技巧。

## 用断点暂停代码

通过设置一个断点，可以让代码在执行途中暂停。

查看 [这里](https://developer.chrome.com/docs/devtools/javascript/breakpoints/) （英文，待译）来学习如何设置一个断点。

### 在鼠标悬浮的时候查看类/函数属性

当代码执行暂停的时候，将鼠标悬浮在一个类或者函数名上的时候可以预览它的属性。

{% render_caption caption="1" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/EA456FA6-9331-41E3-96DC-3FCCFFA82C2E_2.png" %}
![1](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/EA456FA6-9331-41E3-96DC-3FCCFFA82C2E_2/ipS2kpvkWnSHStUjDD32ON9uIDVgFXl6eJ3uxMFQk4cz/1.png)
{% endrender_caption %}

## 逐步运行代码

你的代码暂停后，你就可以一次只运行一行代码，以搞清楚代码的调用栈以及相关的属性值。

### 跳过（Step over）当前代码行

当你的断点暂停在一个与你当前调查的问题无关的代码行，且该代码行包含一个函数的时候，你可以点击 `Step Over` 来不进入该函数以继续执行代码。

{% render_caption caption="step_over" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/63AE5442-D0AD-46C5-8DB0-36452E2842D2_2.png" %}
![step_over](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/63AE5442-D0AD-46C5-8DB0-36452E2842D2_2/0v6ywbPGyRzsZMDvVxD7mXvorYlryBS0MhPjXMpKmGcz/step_over.png)
{% endrender_caption %}

图一👆🏻，上图中蓝色方框中 `Step Over` 的含义解释： 

举个例子，假设你正在 debugging 下面的代码： 

```javascript
function updateHeader() {
  var day = new Date().getDay();
  var name = getName(); // A
  updateName(name); // D
}
function getName() {
  var name = app.first + ' ' + app.last; // B
  return name; // C
}
```

此时你的断点停在了 `A` 的位置。通过点击 **Step over** ，Devtools 将会执行你「Step over」的位置中的所有代码，在上述示例中「Step over」的是 A 位置的 getName 函数中的 `B` 和 `C` 的位置，于是 Devtools 会将代码停在 D 的位置。

### 进入（Step into）当前代码行

如果断点停在一个跟你要调查的问题有关系的地方，而且这个地方包含一个函数调用的时候，点击 `Step into` ，可以更进一步的检查这个函数。

{% render_caption caption="step_into" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/0B7F9CB7-7EA3-44A2-8808-8E23F9E0D786_2.png" %}
![step_into](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/0B7F9CB7-7EA3-44A2-8808-8E23F9E0D786_2/Jr920gV4VQ3o3PBRKue3vbn1DbIxlIxlSGWB3eyBN54z/step_into.png)
{% endrender_caption %}

图二👆🏻，上图中蓝色方框中 `Step into` 的含义解释： 

举个例子，假设你正在 debugging 下面的代码： 

```javascript
function updateHeader() {
  var day = new Date().getDay();
  var name = getName(); // A
  updateName(name);
}
function getName() {
  var name = app.first + ' ' + app.last; // B
  return name;
}
```

你的断点正停在 `A` 的位置，此时点击 **Step into** ，Devtools 将会执行这行代码，然后停在 `B` 的位置。

### 跳出（Step out）当前代码行

当断点停在一个与你正在调查的问题不相关的函数内部的时候，你可以点击 **Step out** 来执行该函数中剩余的代码。

{% render_caption caption="step_out" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/6E97FB74-E73D-4189-9A21-3771A1DF27AF_2.png" %}
![step_out](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/6E97FB74-E73D-4189-9A21-3771A1DF27AF_2/zvmYjcFxyzA87WrcRxPlgFkriYZ7TVwx5Hby2JGNvNQz/step_out.png)
{% endrender_caption %}

图三👆🏻，上图中蓝色方框中 `Step out` 的含义解释： 

举个例子，假设你正在 debugging 下面的代码： 

```javascript
function updateHeader() {
  var day = new Date().getDay();
  var name = getName();
  updateName(name); // C
}
function getName() {
  var name = app.first + ' ' + app.last; // A
  return name; // B
}
```

你的断点正停在 `A` 的位置，此时点击 **Step out** ，DevTools 将会把 `getName()` 函数中的剩余代码执行完，也就是 B 位置的代码，然后断点停在 `C` 的位置上。

### 继续运行代码到指定行

当 debugging 一个很长函数的时候，函数中会有很多与你正在调查的问题不相关的代码。

你可以选择一步一步的执行这些无关的行，但是这个过程会很枯燥。你也可以选择在一个想断点的代码行处设置一个断点，然后按下 `Resume Script Execution` （恢复脚本执行），不过除此之外，还有一个更快的方式。

你可以在你想要断点的代码行上右键，然后选择 **Continue to here** （继续执行到此处）。Devtools 将会恢复断点执行代码直到此处，然后停在这一行。 

{% render_caption caption="continue_to_here" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/01C96466-2B8C-4088-9E66-7408708B0401_2.png" %}
![continue_to_here](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/01C96466-2B8C-4088-9E66-7408708B0401_2/ivGkWKSZLjdzECrLyyOevV1XsE6Exhf9cXmz0oDiBOwz/continue_to_here.png)
{% endrender_caption %}

图四👆🏻，选择 **Continue to here** 。

### 恢复脚本执行

你可以通过点击 **Resume Script Execution** 来继续在你断点暂停的位置执行代码。Devtools 会将代码一直执行下去直到遇到下一个断点（如果有）。

{% render_caption caption="resume_script_execution" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/E67463E2-9D01-48BB-A743-28A189DF68CD_2.png" %}
![resume_script_execution](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/E67463E2-9D01-48BB-A743-28A189DF68CD_2/9MlFZrYqZ3NIghPg3472sxyIHgpidLzaou8xsnlw5Akz/resume_script_execution.png)
{% endrender_caption %}

图五👆🏻，**Resume Script Execution** ，蓝框处。

#### 强制执行

可以通过长按 **Resume Script Execution** ，然后选择 **Force Script Execution** ，来忽略剩下的所有断点，直接执行全部代码。

{% render_caption caption="force_script_execution" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/DAB9BD94-70F7-4464-8609-3016E8B40A44_2.png" %}
![force_script_execution](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/DAB9BD94-70F7-4464-8609-3016E8B40A44_2/VRJifdkda9ik0PpcSvCcwkXfxUjRNwIyxls3tu35yioz/force_script_execution.png)
{% endrender_caption %}

图六👆🏻，选择 **Force Script Execution** 。

### 改变当前线程的上下文

当 debugging 设计到 Web Worker 或者 Service Worker 的时候，可以通过点击出现在 **Threads** 栏中的上下文列表项，来转换上下文。蓝色箭头表示当前选择的上下文。

{% render_caption caption="change_threads_context" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/1474933D-3F44-4D93-9909-FF4245545704_2.png" %}
![change_threads_context](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/1474933D-3F44-4D93-9909-FF4245545704_2/M6D5yRIsXdDzkddOxsPwNCFwlx1yIppfJ2ez83Uikxsz/change_threads_context.png)
{% endrender_caption %}

图七👆🏻，**Threads** （线程）栏，蓝色框的位置。

举个例子，假设有这么个场景，你的断点同时存在于你的主脚本和你的 service worker 脚本中。你想要查看 service worker 中的本地变量和全局变量，但是 **Source** 栏当前正显示的是你的主脚本的上下文。此时你就可以通过点击在 **Threads** 栏中的 service worker 入口来切换上下文以查看你想了解的变量了。

## 查看和编辑局部、闭包以及全局作用域中的变量/属性

当暂停在某一行的时候，使用 Scope 栏来查看和编辑位于局部、闭包和全局变量。

* 双击属性值以修改之。

* 非可枚举的属性会以灰色突出显示。

{% render_caption caption="查看和修改变量" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/40A93D0F-ACA8-4128-A695-E502565253AD_2.png" %}
![查看和修改变量](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/40A93D0F-ACA8-4128-A695-E502565253AD_2/JcaeCBxVtBofwIo7x6Wg2G9j1orw1SzLDzw6d66u1fQz/40A93D0F-ACA8-4128-A695-E502565253AD_2.png)
{% endrender_caption %}

图八👆🏻，**Scope** （作用域）栏，蓝色框的位置。

## 查看当前调用栈

当暂停在某一行的时候，使用 **Call Stack** 栏来查看从代码执行一直到你当前暂停点以来的函数调用栈。

如果你的代码中有异步代码，可以将 **Async** 复选框勾选上，来启用异步函数调用栈。

点击其中的一个条目，来跳转到该条目所表示的函数的调用处。蓝色箭头图标表示当前正在高亮的函数。 

{% render_caption caption="查看函数调用栈" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/1168318B-1CFA-493D-9AE6-2CF79930C58C_2.png" %}
![查看函数调用栈](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/1168318B-1CFA-493D-9AE6-2CF79930C58C_2/dsegT1HsR3MqkDEy3XByzeqNBU4co7xuec3yjxNddEAz/1168318B-1CFA-493D-9AE6-2CF79930C58C_2.png)
{% endrender_caption %}

图九👆🏻，**Call Stack** （调用栈）栏，蓝色框的位置。

> 注意：如果代码没有暂停在某一行，那 Call Stack 栏是空的。

### 重新执行堆栈中的函数

有时候想观察某一个函数的运行情况，但是又不想重新运行整个 debugging 流程，你可以在断点暂停在这个函数内部的时候重新只单独执行这个函数，换句话说，你可以在调用栈中重新放入该函数的调用上下文。

> 注意：你可以重头执行在 Call Stack （调用栈）中的任何函数，除了 WebAssembly、async、和 generator 函数。

为了重新执行一个函数：

1. 使用断点暂停函数，**Call Stack** 栏会记录函数的调用顺序。

1. 在 **Call Stack** 栏，右键一个函数，然后在出现的菜单中选择 Restart frame（重头执行函数）。

{% render_caption caption="重新执行断点所在的函数" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/DFF3FAC8-B00F-415A-A581-50A299F1884D_2.png" %}
![重新执行断点所在的函数](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/DFF3FAC8-B00F-415A-A581-50A299F1884D_2/2Vud3NyIanHjP8Gq9tg3O8dwpFFgeJLseHG4ybaZdr0z/DFF3FAC8-B00F-415A-A581-50A299F1884D_2.png)
{% endrender_caption %}

为了理解 Restart frame 如何执行，我们假设有以下代码： 

```javascript
function foo(value) {
    console.log(value);
    bar(value);
}
 
function bar(value) {
    value++;
    console.log(value);
    debugger;
}

foo(0);
```

`foo` 函数接受 `0` 作为参数，然后通过 log 打印到控制台，然后调用 `bar()` 函数。相应的，`bar` 函数会将这个值自增1。 

尝试以下面的方式重头执行这两个函数： 

* 复制上面的代码到一个 [snippet](https://developer.chrome.com/docs/devtools/javascript/snippets/#createsources) （未翻译）中，然后 [运行](https://developer.chrome.com/docs/devtools/javascript/snippets/#runsources) （未翻译）它。断点会停在 `debugger` 的所在的 [代码行](https://developer.chrome.com/docs/devtools/javascript/breakpoints/#debugger)。

    > ⚠️ 注意：当代码执行暂停的时候，不要在控制台执行当前调用栈中的函数，因为这可能会引起意外的错误。

* 你会注意到当前的 debugger 会在其所在的函数的函数声明的右侧显示当前值：`value = 1` 。

{% render_caption caption="注意函数声明处右侧的值" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/9111BA1D-AA80-4C2F-B54E-123FC66A5C17_2.png" %}
![注意函数声明处右侧的值](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/9111BA1D-AA80-4C2F-B54E-123FC66A5C17_2/4Yjdxqvqp1TbfahJyRO0nEJ7vzVosHHnoFSwJ1jiPxMz/9111BA1D-AA80-4C2F-B54E-123FC66A5C17_2.png)
{% endrender_caption %}

* 重头执行 `bar()` 函数。

{% render_caption caption="重头执行bar" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/036AAE1B-CA41-4627-A9D6-A4F7E6302C0C_2.png" %}
![重头执行bar](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/036AAE1B-CA41-4627-A9D6-A4F7E6302C0C_2/zrHOsvCzcuMevbhTUOF6yV2pEyckpGfgjVGnEKpl75Uz/bar.png)
{% endrender_caption %}

* 按 `F9` ，然后代码可以经过值自增的那一行，然后再次断到 debugger 处。

    注意看，值变成了 2： `value = 2` 。

{% render_caption caption="重头执行debugger" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/09D36505-821B-4392-8DD3-BDE9D05F0210_2.png" %}
![重头执行debugger](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/09D36505-821B-4392-8DD3-BDE9D05F0210_2/Xd8oyzvLxpc9ybYMTThke4skkj3JKjzxJx1rBJahkZAz/debugger.png)
{% endrender_caption %}

* 除此之外，你还可以在 Scope 栏，双击 `value` 值来编辑它将其设置成想要的值。

{% render_caption caption="双击编辑值" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/9481CF99-8735-43A4-8A57-D2F953C289BC_2.png" %}
![双击编辑值](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/9481CF99-8735-43A4-8A57-D2F953C289BC_2/YxoGnZjFOTn60mcYK8LOyXT5yytK9yeFVGq7feHFcLsz/9481CF99-8735-43A4-8A57-D2F953C289BC_2.png)
{% endrender_caption %}

* 尝试重新执行 `bar()` 函数多次，会发现值会一直增加。

{% render_caption caption="多次重复执行后值会一直增加" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/AEE7EEA3-2150-431B-980C-6FCF03527DC7_2.png" %}
![多次重复执行后值会一直增加](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/AEE7EEA3-2150-431B-980C-6FCF03527DC7_2/RRjdMgO31PFKL38fWCGpapXLXGHukZcngAIylYNp3yQz/AEE7EEA3-2150-431B-980C-6FCF03527DC7_2.png)
{% endrender_caption %}

> 💡 震惊！为什么 `value` 不会重置成 `0` ？

> 函数重头执行的时候不会重置参数。换句话说，重头执行不会恢复该函数被调用时候的初始状态。因此，它只是简单的在调用栈中移动当前调用的指针到函数的开始位置。

> 因此，当前的参数值 `value` 会在内存中一直随着相同函数的重复执行而一直存在。

* 现在，在 **Call Stack** 中重头执行 `foo()` 函数。

{% render_caption caption="重头执行foo函数" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/11D4B549-3006-4564-B92D-4D1727913D74_2.png" %}
![重头执行foo函数](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/11D4B549-3006-4564-B92D-4D1727913D74_2/7YGytWQxajDZxzh1hZwBjAtAUq1ElZAUF6Ft74FleW0z/foo.png)
{% endrender_caption %}

注意看，`value` 重新变成了`0` 。

{% render_caption caption="value重新变为0" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/9F706F35-0041-41E3-BB4A-70A5BFFEFE06_2.png" %}
![value重新变为0](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/9F706F35-0041-41E3-BB4A-70A5BFFEFE06_2/Ygx3YuR62bulHfj0qbMw0Q0Y0NtxFKHyrC7uceQhWrsz/value0.png)
{% endrender_caption %}

> 💡 再次震惊！为什么 `value` 这次被重置为 `0` 了？

> 很简单（此处意译了）在 JavaScript 中，参数是按值传递的，因为 `value` 是原始值，因此在函数内修改它的值不会影响到函数外它的值。

### 复制调用栈执行路径

在 **Call Stack** 栏的任意位置右键，然后选择 **Copy Stack Trace**（复制栈追踪），你会将当前调用栈复制到粘贴板。

{% render_caption caption="复制调用栈" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/7EF33B00-5F90-4D0D-8979-B18ED3CD1527_2.png" %}
![复制调用栈](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/7EF33B00-5F90-4D0D-8979-B18ED3CD1527_2/yGxQ5q9UEWwj3kmg9kCy6ix857JwlB1fx855tjoPCHQz/7EF33B00-5F90-4D0D-8979-B18ED3CD1527_2.png)
{% endrender_caption %}

图十👆🏻，选择 **Copy Stack Trace**。

复制的内容大致会是这个样子： 

```other
getNumber1 (get-started.js:35)
inputsAreEmpty (get-started.js:22)
onClick (get-started.js:15)
```

## 忽略某个脚本或者满足某种条件的脚本

当 debugging 的时候，忽略某个脚本以跳过它。你通常会在当该脚本的函数比较复杂难懂而且跟你当前 debugging 的内容无关的时候选择忽略之。

例如，假设你正在 debugging 如下代码： 

```javascript
function animate() {
  prepare();
  lib.doFancyStuff(); // A
  render();
}
```

`A` 是一个你信任的第三方库。如果你十分确定你所调查的问题跟这个第三方库没有关系，那忽略它就是一个明智决定。

### 从 Source 编辑器栏中忽略某个脚本

1. 打开文件

1. 右键任何位置

1. 选择 **Add script to ignore list**（将脚本添加到忽略列表）。

{% render_caption caption="忽略脚本" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/39DA9D92-C270-4705-8920-7BC248703936_2.png" %}
![忽略脚本](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/39DA9D92-C270-4705-8920-7BC248703936_2/W3mMxi1XUyDjLPP8AEb8vjhifd1bLtbIjbhKPjPIjxcz/39DA9D92-C270-4705-8920-7BC248703936_2.png)
{% endrender_caption %}

图十一👆🏻，从编辑器栏中忽略一个脚本。

### 从 Call Stack （调用栈）栏忽略某个脚本

如果想从调用栈中忽略某个脚本，你需要： 

1. 在调用栈中的某个函数中右键。

1. 选择 **Add script to ignore list**。

{% render_caption caption="从调用栈中忽略脚本" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/73837AF8-CB34-4B72-AE5C-1B266E15B8EB_2.png" %}
![从调用栈中忽略脚本](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/73837AF8-CB34-4B72-AE5C-1B266E15B8EB_2/eEAyxDssVfL9sIHZs44wKcelfIAZzk8M38wVJ4YH44Qz/73837AF8-CB34-4B72-AE5C-1B266E15B8EB_2.png)
{% endrender_caption %}

图十二👆🏻，从 Call Stack（调用栈）中忽略某个脚本。

### 从 Settings（设置）中忽略某个脚本

> 译者注：此处的设置为 Devtools 的设置，不是浏览器的设置。

如果想从设置中忽略某一个脚本或者满足某种条件的脚本，你需要： 

1. 打开设置： 

1. 点击 **Ignore List** Tab。

1. 点击 **Add pattern**。

1. 输入脚本名或者正则来匹配需要忽略的脚本名。

1. 点击 **Add**。

{% render_caption caption="devoools设置界面" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/54F9290D-CE6A-4630-9387-34DE7EA6266F_2.png" %}
![devoools设置界面](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/54F9290D-CE6A-4630-9387-34DE7EA6266F_2/I2o6LiRZyhSUSJcB16jU4aBoQOxBFeqxoC9Df7Z3FgQz/devoools.png)
{% endrender_caption %}

{% render_caption caption="devtools忽略脚本" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/65A0FE7C-D5BB-4329-B978-1C7184F6C1B6_2.png" %}
![devtools忽略脚本](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/65A0FE7C-D5BB-4329-B978-1C7184F6C1B6_2/VQVrl2qREfTl4Ho2KgqqQIvFMbGNBYpyhiOhn8onYEwz/devtools.png)
{% endrender_caption %}

图十三👆🏻，从 Setting 中忽略脚本。

## 从任何页面运行 debug 代码 Snippets（片段）

如果你发现你正在 Console 中反复运行一些 deubg 代码，那么可以考虑一下 Snippets。Snippets 是一种你可以存储在 Devtools 中并执行的脚本。

参见 [https://developer.chrome.com/docs/devtools/javascript/snippets/](https://developer.chrome.com/docs/devtools/javascript/snippets/) （未翻译）来了解更多。

> 译者注：Snippets 在执行的时候是携带当前上下文的，比如你在 debug 的时候暂停了，然后执行 Snippets 代码，此时的 Snippets 代码拥有当前上下文的变量访问权限。

## Watch（监听）自定义的 JavaScript 表达式的值

使用 Watch 栏来监听自定义表达式的值。你可以监听任何有效的 JavaScript 表达式。

{% render_caption caption="监听JavaScript表达式" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/02D81797-A39F-4837-B402-648AA39E5C21_2.png" %}
![监听JavaScript表达式](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/02D81797-A39F-4837-B402-648AA39E5C21_2/wg66WuP25izgUiGweYlghhPuu3AW91KfGmmeQNyCTUUz/JavaScript.png)
{% endrender_caption %}

图十四👆🏻，蓝色圈住的即是 Watch 栏。

* 点击 Add Expression（添加表达式）来新建一个监视表达式。

* 点击 Refresh（刷新）来刷新所有已经存在的表达式。当执行代码的时候，值会自动更新。

* 鼠标悬浮在一个表达式上，然后点 Delete Expression（删除表达式），来删除它。

## 格式化压缩后的代码以可读

点击 `Fromat {}`  来让一个压缩后的代码变成人类可读的格式。

{% render_caption caption="格式化压缩后的文件" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/572D9BCF-DC18-460E-8B23-62398391ED92_2.png" %}
![格式化压缩后的文件](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/572D9BCF-DC18-460E-8B23-62398391ED92_2/cni3SFEH534hxHjnB9yUVyWXbtSWuv25yqeMpFxMEq4z/572D9BCF-DC18-460E-8B23-62398391ED92_2.png)
{% endrender_caption %}

## 编辑一个脚本

当修复一个 bug 的时候，你经常会需要测试你的 JavaScript 代码的修改效果。你不要在一个外部的编辑器中编辑 JavaScript 代码后，再回到当前页面刷新后查看效果。你可以直接在 Devtools 中编辑你的 JavaScript 代码。

如果想编辑脚本，你需要： 

1. 在 Source 栏中打开你想要编辑的文件（会出现在 Editor 栏中）。

1. 在 Editor 栏中做出修改。

1. 按 `Cmmand + S` （Mac）或者 `Ctrl + S` （Windows，Linux）来保存修噶。Devtools 将会以打补丁的形式将整个 js 文件加入到 Chrome 的 JavaScript 引擎中去。

{% render_caption caption="直接编辑js文件" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/6DC1E149-D2D2-4005-A2B9-451CF0456112_2.png" %}
![直接编辑js文件](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/6DC1E149-D2D2-4005-A2B9-451CF0456112_2/XxF9KsXOIICAjjUiTgkqyczFxkypuYCaydvG86besEYz/js.png)
{% endrender_caption %}

上图中蓝框圈出来的就是编辑器栏。

## 实时编辑一个暂停的函数

> 注意：此功能自 Chrome 105 版本往上才可用。

当代码暂停的时候，你可以编辑当前函数然后实时应用修改，不过有以下限制：

* 你只能编辑在 **Call Stack** 最顶上的函数（也即当前断点所在的函数——译者注）。

* 调用栈中不能有对相同函数的递归调用（否则也相当于是修改了非当前调用栈的函数——译者注）。

> 💡 实时编辑暂停函数的真相是…
当你应用一个修改的时候，debugger 工具自动重新执行（和前面的「重新执行堆栈中的函数」一样）。因此，对重新执行函数的限制与实时编辑暂停函数并生效的限制是一样的。你不能重头执行 WebAssembly、async以及generator（迭代器）函数。

如果想实时编辑一个函数，你需要： 

1. 用断点暂停。

1. 编辑断点所在的正在暂停的函数。

1. 按下 `Command/Control+S`  来应用更改，debugger 将会自动重新执行该函数。

1. 继续执行

{% render_video caption="实时重新执行函数" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/37CA2680-5D00-477F-A1CF-161AD18F2A5E_2.mp4" suffix="mp4" %}
![实时重新执行函数](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/37CA2680-5D00-477F-A1CF-161AD18F2A5E_2/c2lD8UgybG7OxCcmnzISkbJ4J2st1F3NfPs9i5hU75Uz/37CA2680-5D00-477F-A1CF-161AD18F2A5E_2.mp4)
{% endrender_video %}

在这个示例中，`addend1` 和`addend2` 变量在起始的时候有一个不正确的 `string` 类型。因此，字符串被错误的连接在一起而不是数字相加。为了修复此问题，在实时编辑的时候添加了`parseInt()` 函数。

## 搜索和替换在脚本中的文本

如果想要在脚本中搜索一段文本，你需要：

1. 在代码源（Sources）-编辑器（Editor）栏中打开文件。

1. 按下 **Command+F**（Mac）或者 **Ctrl+F**（Windows、Linux）来打开内置的搜索栏。

1. 在搜索栏中，输入你想要查询的字符串： 

    另外你还可以： 

    * 点击 `Aa` 来匹配大小写，来让你的搜索大小写敏感。

    * 点击 `.*` 来使用正则匹配。

1. 按下 `Enter` 键来执行搜索。可以按下 up/down 来跳转到下一个/上一个搜索结果。

{% render_caption caption="搜索字符" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/6D3D4E4D-22CD-4095-8773-1DFD4F3089A5_2.png" %}
![搜索字符](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/6D3D4E4D-22CD-4095-8773-1DFD4F3089A5_2/nyWwFAEh6wEyxkLcFFkBPi1xcuLxXTNL7HHldErVe4Uz/6D3D4E4D-22CD-4095-8773-1DFD4F3089A5_2.png)
{% endrender_caption %}

如果想替换你搜索到的结果，你需要： 

1. 打开搜索栏，点击 `A→B` （手敲的不形象，看下面的图）即替换按钮来替换文本。

1. 输入想要替换的文本，然后点击 **Replce** 或者 **Replace all** 即可。

{% render_caption caption="按下替换按钮" img="https://static.xheldon.cn/img/in-post/2022/javascript-debugger-reference-series01/4CFF9F79-2118-4DA6-AF12-1440A520C6F8_2.png" %}
![按下替换按钮](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/32609F0A-22C6-42A3-94B4-FA90C05F6E30/4CFF9F79-2118-4DA6-AF12-1440A520C6F8_2/4pc62s7UTrsF8ZCb3uKnitpN68pLcbRdT094RhJSnpkz/4CFF9F79-2118-4DA6-AF12-1440A520C6F8_2.png)
{% endrender_caption %}

## 禁用 JavaScript

具体参见：[Disable JavaScript With Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/disable/)（未翻译）。


