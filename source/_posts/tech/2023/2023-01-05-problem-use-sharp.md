---
layout: post
date: 2023-01-05 12:06:50 +0800
categories: tech
path: _posts/tech/2023/2023-01-05-problem-use-sharp.md
cos: 2023/problem-use-sharp
headerMask: 0.4
tags:
  - 技术
  - 格式
  - 转换
  - 压缩
  - 开源
craft: https://www.craft.do/s/mHmLa16eR5YWPi
noCatalog: true
callout: 记录使用 Sharp 压缩 HEIC 格式图片时遇到的问题和解决的过程
title: 使用 Sharp 转换 HEIC/HEIF 图片遇到的问题
headerImg: https://static.xheldon.cn/img/in-post/2023/problem-use-sharp/photo-1603468620905-8de7d86b781e.webp
headerImgCredit: Ryland Dean / Unsplash
headerImgCreditHref: https://unsplash.com/@ryland_dean?utm_source=xheldon_blog&utm_medium=referral
sha: 3f76a9f5971726c687921fb96ad6cc3d414c9af4
lastUpdateTime: 2023-01-09 20:11:29 +0800
---

苹果相机在 iOS 11 之后，将相机默认的格式设置为了 HEIC，据说可以在不缩减照片质量的前提下，大幅缩减照片体积，你可以在 `设置-相机-格式` 来查看，「高效」表示的就是 HEIC 格式，「兼容性最佳」表示的是原始的 JEPG 格式。关于 HEIC 格式更多介绍可以看 [这里](https://www.adobe.com/hk_zh/creativecloud/file-types/image/raster/heic-file.html)。

由此带来的问题是，目前所有的 Web 浏览器都不支持显示 HEIC 格式的图片，因此如何转换该格式的图片就成为了一个问题。

我经常将苹果相册中的图片直接从相册中拖拽或复制粘贴到 Craft 中，因此如果直接将该格式的图片上传到个人博客的话，是无法显示出来的，因此必须转换成通用格式如 PNG 或者 JPEG，这里我选择使用 Sharp 库进行转换，将其转换成了 Webp（因为 HEIC 转 PNG 太大了）。

{% render_bookmark url="https://github.com/lovell/sharp" title="GitHub - lovell/sharp: High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, AVIF and TIFF images. Uses the libvips library." img="https://repository-images.githubusercontent.com/12226786/cf816100-9a08-11ea-8fc1-7af9d4bcbf9e" yid="" bid="" %}
High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, AVIF and TIFF images. Uses the libvips library. - GitHub - lovell/sharp: High performance Node.js image proc...
{% endrender_bookmark %}

如果仅仅转换普通的格式如 JPEG 到 PNG，那么是没有什么问题的，但是如果是转换 HEIC 到其他格式，那麻烦就来了，因为这个过程 Sharp 依赖一个平台原生的工具库，叫 `libvips` ：

{% render_bookmark url="https://github.com/libvips/libvips" title="GitHub - libvips/libvips: A fast image processing library with low memory needs." img="https://opengraph.githubassets.com/5394d24c340a30dc1be077d37b0ca91234b63a95da32e047fb04ad05dd2ae075/libvips/libvips" yid="" bid="" %}
A fast image processing library with low memory needs. - GitHub - libvips/libvips: A fast image processing library with low memory needs.
{% endrender_bookmark %}

来处理 HEIC 格式的文件，因此如果你本地没有全局安装这个工具，那么处理 HEIC 格式的图片的时候就会遇到下面的错误：

```Bash
(node:11469) UnhandledPromiseRejectionWarning: Error: source: bad seek to 807962
heif: Unsupported feature: Unsupported codec (4.3000)

(Use `node --trace-warnings ...` to show where the warning was created)
(node:11469) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
```

说是无法处理 HEIC 格式的文件。

遇到问题第一时间当然是去官方仓库的 issue 查找相关解决办法，果然有人遇到类似的问题：

{% render_bookmark url="https://github.com/lovell/sharp/issues/2924" title="heif: unsupported feature · Issue #2924 · lovell/sharp" img="https://opengraph.githubassets.com/022362ae50e0768004484655f96c2c5963ddea524e5b6031321cd081658b204a/lovell/sharp/issues/2924" yid="" bid="" %}
Are you using the latest version? Is the version currently in use as reported by npm ls sharp the same as the latest version as reported by npm view sharp dist-tags.latest? 2.9.1 What are the steps...
{% endrender_bookmark %}

于是按照他的说法，我使用 `homebrew` 安装了 `libvips` :

{% render_bookmark url="https://www.libvips.org/install.html" title="libvips" img="https://www.libvips.org/install.html/favicon.ico" yid="" bid="" %}
"A fast image processing library with low memory needs."
{% endrender_bookmark %}

这个过程需要挺久，会一直有 log 出现，耐心等待完成无报错即可。

然后满怀信心的再次安装 Sharp `npm install sharp` 期待能看到这条信息：

```Bash
sharp: Detected globally-installed libvips v8.13.3
```

出现这条信息表明 Sharp 的安装脚本检测到本地安装了 libvips，但是当我再次安装 Sharp 的时候，它依然用的是已经下好的缓存:

```Bash
> sharp@0.31.3 install /Users/x/Code/test2/node_modules/sharp
> (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)

sharp: Using cached /Users/x/.npm/_libvips/libvips-8.13.3-darwin-x64.tar.br
sharp: Integrity check passed for darwin-x64
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN test2@1.0.0 No description
npm WARN test2@1.0.0 No repository field.

added 45 packages from 206 contributors and audited 45 packages in 4.5s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

于是我删除了上面 log 中缓存的文件 `rm -rf /Users/x/.npm/_libvips/` 目录，然后再次执行，依然 无法使用系统版本的 libvips：

```shell
> sharp@0.31.3 install /Users/x/Code/test2/node_modules/sharp
> (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)

sharp: Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.13.3/libvips-8.13.3-darwin-x64.tar.br
sharp: Integrity check passed for darwin-x64
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN test2@1.0.0 No description
npm WARN test2@1.0.0 No repository field.

added 45 packages from 206 contributors and audited 45 packages in 10.727s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

于是我决定 debug 这个包。

首先从 log 开始，随便找一个看上去像是版本判断的 log，如 `Using cached` 作为关键字，在 `node_modules/sharp` 包中搜索相关关键字，在 `sharp/install/libvips.js` 中发现如下代码：

```javascript
libvips.log(`Using cached ${tarPathCache}`);
```

于是继续寻找，发现这个函数顶上有一个决定是使用系统内置的 libvips 还是它自己编译的不支持 HEIC 格式的二进制包的逻辑：

```javascript
const useGlobalLibvips = libvips.useGlobalLibvips();
```

基本就是这里了，debug 了这个函数，发现在判断 `isRosetta` 的时候，返回了 true。发现如果是返回 false，就会使用系统内置的 libvips，否则就使用它自己编译的 libvips：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2023/problem-use-sharp/ACF229E4-D77E-46AD-B1D2-98A4AA970669_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/C3FE5D12-BAA2-4027-8775-37B7F48A0D5F/ACF229E4-D77E-46AD-B1D2-98A4AA970669_2/EAlXXxrWyZUqd5ed9L9XlyDdUpyKervIU9w7BOsyN68z/Image.tiff)
{% endrender_caption %}

这里出现了一个奇怪的情况是，在 debug 的时候，process.arch 输出的是 `x64` ，且 log 这个代码输出的是 `sysctl.proc_translated: 1` ：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2023/problem-use-sharp/A0492569-B12D-45B5-B05B-40B5DB1B7459_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/C3FE5D12-BAA2-4027-8775-37B7F48A0D5F/A0492569-B12D-45B5-B05B-40B5DB1B7459_2/dOmQPJXHMTgmyjTA4jR4ic6P3Dk3070La0Ax9P1Xlw0z/Image.tiff)
{% endrender_caption %}

但是直接在控制台执行该代码，输出的是 `sysctl.proc_translated: 0` ：

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2023/problem-use-sharp/4616C1B5-102F-4A3C-AF71-CC0BA49530AB_2.webp" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/C3FE5D12-BAA2-4027-8775-37B7F48A0D5F/4616C1B5-102F-4A3C-AF71-CC0BA49530AB_2/yPMt0xVzJ58EpTIUf59F3dINxd2DeKMfdudv13owsr8z/Image.tiff)
{% endrender_caption %}

这里我就得出结论，肯定是 node 的版本问题导致了它使用了自己编译的 libvips。于是我使用 nvm，将默认 node 版本切换到 arm64 版本后，再次执行 `npm i sharp` ，问题解决。

下面是这个过程可能用到的代码：

```javascript
// 列出 nvm 版本
nvm list
// 输出当前电脑的架构
arch // 如果输出的是 arm64 表示就是 M1 芯片
// 使用最新的稳定版
nvm install stable // 我的机器给我安装了 19.3.0 的 arm64 版本的 node
// 将该 node 作为默认
nvm alias default v19.3.0
// 在当前终端使用 19.3.0 版本的 node
nvm use 19.3.0
```

随后给作者提了个 PR，来修改 isRosetta 的逻辑：

{% render_bookmark url="https://github.com/lovell/sharp/pull/3514" title="Get real architecture of M1 Mac regardless of Rosetta by Xheldon · Pull Request #3514 · lovell/sharp" img="https://opengraph.githubassets.com/d8057fae9db42e14f5f79afe6224e9e4c3db958ec1bcda4b0e60a839094daa74/lovell/sharp/pull/3514" yid="" bid="" %}
Get real architecture of M1 Mac regardless of Rosetta or node version, see #3239
{% endrender_bookmark %}

但是作者解释说这个函数这么做是有原因的，因此我建议他在安装 Sharp 的时候提醒用户并未使用全局安装的 libvips 包的原因，最终作者采纳并接受了我的意见：

{% render_bookmark url="https://github.com/lovell/sharp/commit/5be36c2deb735577fc76fa52242836d40df276bd" title="Install: log Rosetta detection, improve related docs · lovell/sharp@5be36c2" img="https://opengraph.githubassets.com/5e0efe7cbe5118b1d549459eefc68e1e3f6cac81430e4702e87cd1f5bb28616c/lovell/sharp/commit/5be36c2deb735577fc76fa52242836d40df276bd" yid="" bid="" %}
"High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, AVIF and TIFF images. Uses the libvips library. - Install: log Rosetta detection, improve related docs · lovell/sharp@5be36c2"
{% endrender_bookmark %}
