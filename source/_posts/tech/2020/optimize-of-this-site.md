---
layout: post
title:  "博客优化技巧"
date:   2020-10-31 22:44:30 +0800
categories: tech
header-style: text
tags:
    - 技术
    - Web
    - 优化
---

## 前言

早些时候写过一篇 [关于本博客域名优化配置的几点说明](/github-pages-config.html) ，其中的有些方法手段已经不用了，同时又新增了其他一些方法并将其应用到本 Jekyll 的博客，
其中有些细节需要注意，遂有此文。

## CDN 服务

之前关于 CDN 的服务是 [使用百度 cdn 服务和七牛静态资源托管](https://xheldon.com/github-pages-config.html#使用百度-cdn-服务和七牛静态资源托管) ，
将 `img.xheldon.com` 解析到七牛云上，然后再在七牛云上增加相关静态资源。但是由于一些众所周知的原因，七牛云的的这个个人免费 cdn 加的服务需要备案，而且也需要位于国内的物理机服务器，遂放弃此方案。

很长一段时间我都是直接将图片和静态资源直接放到项目中，因为 GitHub 的免费仓库有 1 GB 总内容大小的限制，所以是尽量是能用文字描述的就不放图片，很受限制。前不久无意间访问了一个同样是 基于 GitHub Pages 的博客，
发现它大量使用了图片，而且图片的链接是 `jsdelivr.net` 相关的，所以我就猜测是不是某个国外免费的 cdn 服务，搜索了一番以后发现果然是，而且在国内有服务器，免费加速。只需要在 GitHub 仓库中的资源前面加上固定的路径
即可，它会在首次请求的时候将资源存储到 S3 上，后续即使 GitHub 挂了，也能访问到正确的链接。如果 S3 上没有资源，则会直接溯源，请求 GitHub 中的内容，也即是 CDN 的基本操作。

我一拍大腿，~~直呼内行~~，免费的 cdn 加速，而且看起来不复杂，而且 jsdelivr 的卖点之一就是在中国拥有合法 ICP 执照的的国外公共 CDN 服务提供商，其在中国有数百个服务器。

![赣江]({{site.static_url}}/img/in-post/2020/jsdelivr.png "jsdelivr china")

说搞就搞，于是有了下面几步操作：

### 增加专用静态资源仓库

这一步是为了让 jsdelivr cdn 服务能够正确解析。如我本地某个图片的引用路径是 `/static/img/in-post/logo.png` ，因此它的唯一路径是 `/img/logo.png` ，将内容托送到 GitHub 仓库后，
访问路径就是 `https://github.com/Xheldon/x_blog-static/tree/master/img/logo.png` ，我的的用户名为 xheldon，仓库是 x_blog-static，因此使用 jsdelivr cdn 服务访问后的地址就
应该是 `https://cdn.jsdelivr.net/gh/xheldon/x_blog-static/img/logo.png` ，不用注册 jsdelivr 服务，不用配置任何东西即可使用，很赞！

### 博客仓库修改

主要有以下几步：

1. 删除 `static` 文件夹，将该文件夹推送到新建的 GitHub 资源仓库 `x_blog-static` 后就可以删除了。
2. 添加资源仓库 `x_blog-static` 为博客仓库的子模块：`git submodule add https://github.com/Xheldon/x_blog-static.git ./static` ，并静态资源仓库（刚刚的 static 文件夹下的内容又）放到 `static` 文件夹下。
2. 修改 `_config.yml` 文件，添加配置对象 `static_url: https://cdn.jsdelivr.net/gh/xheldon/x_blog-static` ，方便下一步修改静态资源的绝对路径。
2. 增加本地开发配置文件 `_config.dev.yml` 文件，添加配置对象 `static_url: /static` ，方便下一步修改静态资源的绝对路径。
3. 全局替换修改本地绝对路径引用的静态资源，如 img 的 src 是 `/static/img/in-post/logo.png` 或者 `/static/css/main.css` 等路径，替换为 {% raw %}`{{site.static_url}}/img/logo.png`{% endraw %}等，这里需要注意的是，Liquid 语法的标签 {% raw %}`{{}}`{% endraw %}即使是在 markdown 文件中，也是可以用的，很棒。
4. 将一些常修改的文件如 `main.scss` 文件仍然放在本地比较好，原因下面有说到。
5. 将修改 push 到远端即可。
 
### 已知问题

解决了一些痛点后，又带来了另一些痛点。因为 Jekyll 是支持 scss 的，因此，你在本地可以在 `resoruce/css/main.scss` 中写 sass 语法，然后直接在 html 中引用 `resoruce/css/main.css` （注意文件后缀），Jekyll 会自动将 scss 转换成 css。但是这样一来，该样式文件就必须保存在本地，而不能放置到远端。

因此针对这两点，我将经常修改的文件如 css、js 等，直接放置到博客仓库中，不再放置到静态资源仓库。

另外需要说明的是，我本来想的是在本地开发的时候在默认 default layout 布局模板中自定义一个 Liquid 的全局变量如 static_url，然后直接在文章的 markdown 文件中使用如： {% raw %}`{{static_url}}/img/logo.png`{% endraw %}，但是实验之后并不可行，搜索了一圈后发现，无论是 Liquid 还是 Jekyll 亦或者
是 Github Pages 都不支持定义类似于 `site` 或者 `pages` 亦或者 `paginator` 这种级别的变量。

于是我想直接在 `default` 布局文件中 `assign` 一个变量，然后尝试在使用了 `default` 布局的 `post` 布局中的 markdown 文件中访问，依然不行。又尝试使用 Jekyll 支持的环境变量 `JEKYLL_ENV=dev` 来实现，但是跟前面一样，由于 layout 之间（无论是谁嵌套谁）不能共享变量因此作罢。研究了一下，原因是 Jekyll 是先渲染文章，再渲染 layout 文件的，
因此 markdown 文件获取不到外部 layout 的变量。

其实可以在每个 markdown 之前加入一个模板代码，判断 jekykll.environment 的值，然后 assign 一个变量如 static_url，之后再在 markdown 中使用该变量也是可以的，但是我实在不想去修改所有的 markdown 在头部添加这么一段莫名其妙的逻辑来实现而作罢，同理，也可以在所有使用 static_url 变量的地方
分别判断 environment，比如想要引入一个图片，就得这么写（伪代码）：{% raw %} `{{if environment=dev 'static' else 'https://jsdelivr.net/xxx/'}}/img/logo.png` {% endraw %} 更加的恶心，于是作罢。

因此，最终方案是，我写两个 Jekyll 的 yml 配置文件，一个是默认的 `_config.yml` 供 Github Pages 在线生成页面使用，一个是 `_config.dev.yml` 本地开发使用，二者唯一的区别是其有个配置值叫 `static_url`，在 `_config.dev.yml` 中的值是 `/static`，在 `_config.yml` 中的值是 `https://cdn.jsdelivr.net/gh/xheldon/x_blog-static` 。

值得一提的是，发布之后，某些图片可能会报403错误：`Package size exceeded the configured limit of 50 MB. Try https://github.com/xxx instead` 所以还需要在最后加个版本号 tag 或者分支名，我采用过的是分支名：`https://cdn.jsdelivr.net/gh/xheldon/x_blog-static@master`

## 添加 Gitalk

Gitalk 是一款专门用于 Github Pages 的留言工具，只需要引入 css 和 js，然后申请 token 配置即可使用，每次有新文章需要作者先打开页面一次，这样会自动往相应的 GitHub Pages 的仓库的 issue 中新增一个以当前文章名命名的 issue，之后有人在文章下留言，或者在 issue 中留言的话，
就会显示在文章下面，非常方便，这里的 css 和 js 我同样使用了 jsdelivr 的 cdn 服务，这也是官方支持的。

## 修改页面布局

首先我是觉得在浏览文章的时候，左侧一大片空白一直显示头像和导航有点浪费空间，但是在首页、项目页、项目分类页的时候，又需要显示出头像、导航和搜索功能。因此我决定在首页、项目页、项目分类页等页面在浏览器宽度大于 1080px 的时候，将导航显示在左侧，同时显示出搜索框。而在其他情况下，将导航条显示在顶部。

另外，浏览文章页时，当屏幕宽度大于 1080px 时候，会显示 table of content，即内容标题栏，以方便用户快速定位到某个感兴趣的地方及方便外站用户直接链接到页面的某个锚点，同时也有利于 SEO。

## 修改文章段落标题

因为一些 SEO 方面的原因，一个页面只有一个 h1 标签，而有多个 h2 或更大标签，以方便搜索引擎识别。

## 添加项目页面

增加了单独的个人项目页面，我的全部参与项目均可在其内找到，有些是跳到外链的，有些是个人说明项目。

## 后记

优化持续不断...等媳妇儿帮我做好个人博客的设计稿之后，我可能会做成 NodeJS 渲染的博客，敬请期待~
