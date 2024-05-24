---
layout: post
date: 2022-08-15 00:13:32 +0800
categories: tech
path: _posts/tech/2022/2022-08-15-optimize-of-my-blog-2.md
cos: 2022/optimize-of-my-blog-2
header-style: text
tags:
    - 技术
    - 优化
    - Jekyll
    - 插件
    - Craft
    - CI
    - AppleScript
craft: https://www.craft.do/s/BJ8gIm5fmtdOCB
callout: 博客体验又更上一层楼啦！
title: 博客自动化流程及体验优化——第二弹
sha: 427262a642147a0012d00412d203f09f4f88ee7b
lastUpdateTime: 2022-08-25 23:44:49 +0800
---

## 前言

之前搞了个 [博客自动化流程](/tech/my-blog-ci.html)，及后来的 [2022 博客自动化流程](/tech/my-blog-ci-in-2022.html) 但是总的来说，还有以下痛点： 

1. 从 Github CI 上传从 Craft 拉的图片到腾讯云经常会遇到网络错误，流程不可控。

1. 博客中图片传到腾讯云的时候，都被强制转为 `png` ，但是其实应该支持更多格式如 `gif` 。

1. Craft 转 Markdown 的结果，有很多与标准 Markdown 不同的地方，如：

    1. 不支持嵌套列表。

    1. 引用块内嵌套列表的时候，渲染结果列表居然在外层。

    1. Craft 的 「焦点」（block）和「块」（focus）只有后者被识别成 blockquote （引用块），预期应该是二者都是。

    1. Craft 中的 bookmark 信息量很多，如页面描述、页面 title等，但是转成 Markdown 的之后，仅剩下一个段落中包裹着链接，相当于信息丢失了。

    1. Craft 中图片本身就不支持图片说明。

    1. Craft 生成的代码块，并不会自动在反引号之后添加语言，导致一些语言被识别为了 `plaintext` 没有高亮。

于是本次优化针对这些痛点，又又又又进行了改造。

## 优化一：使用自己的 CraftBlockToMarkdown 函数

因为给 Craft 反馈了他们的 `craft.markdown.craftBlockToMarkdown` 无法正确转换的问题：

{% render_bookmark url="https://forum.developer.craft.do/t/wrong-render-of-markdown-with-decoration-focus-and-image-question/235" title="Wrong render of markdown with Decoration focus and image question" img="https://global.discourse-cdn.com/standard11/uploads/craft/original/1X/5add1bbc4f01c418389d213f2ed49867e2fc8e79.png" %}
Decoration block ‘focus’ should be render as ‘blockquote’ but now the markdow API craftBlockToMarkdown(flavor is ‘common’) is ignore this block type and render as plain text. The URI of Image return by markdow API craftBlockToMarkdown is avaliable in every place, which may cause some problem, I hope there will be a site white list setting, only allow those site in the list to use the image in my document. this strategy can make the AWS cost of data traffic down, too.
{% endrender_bookmark %}

但是官方似乎丝毫没有要解决的意思，于是自己写了一个简单的函数用来手动转换： 

{% render_bookmark url="https://gist.github.com/Xheldon/036d9b187bd83303205001e8af97eda7" title="craftBlockToMarkdown" img="https://github.githubassets.com/images/modules/gists/gist-og-image.png" %}
GitHub Gist: instantly share code, notes, and snippets.
{% endrender_bookmark %}

需要注意的是，该函数因为是自己用来适配 Jekyll 的来进行下一步处理的（见下面的优化三），因此特殊处理了 `imageBlock`  和 `urlBlock` 类型的 Block： 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/optimize-of-my-blog-2/FE4436B8-B16D-4CA7-9041-E2F5F831CC80_2.png" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/EEBDAC80-8C53-4186-8A88-FDE07AE35850/FE4436B8-B16D-4CA7-9041-E2F5F831CC80_2/h3jP7StnEZ7XlilSA3QAhu0pA97Ik6GpO4jS66g32mcz/Image.png)
{% endrender_caption %}

此函数已经被我放到官方插件开发者论坛了，欢迎交流： 

{% render_bookmark url="https://forum.developer.craft.do/t/a-better-implementation-of-craft-blocks-to-markdown-transformation-methods/554" title="A better implementation of craft blocks to Markdown transformation methods" img="https://global.discourse-cdn.com/standard11/uploads/craft/original/1X/5add1bbc4f01c418389d213f2ed49867e2fc8e79.png" %}
Craft’s markdown api has the following problems: 1. Nested lists are not supported. 2. The order of Nested blockquote and is incorrectly. 3. only the latter will be recognized as a reference block. 4. urlBlock (may called ‘bookmark’?) will be recognized as a link（in this function, you can custom render tag of jekyll, you can modify this as you wish) Note: 1. not support toggle/formula, because markdown not support those too, but you can make it. 2. I use this function for may jekyll blog ...
{% endrender_bookmark %}

## 优化二：将 Github CI 流程挪到本地

之前的流程，点击插件的发布按钮（当然，需要先填写 GitHub Token、填写 COS 等相关信息才行），然后等着就可以了。

本次优化，为了保持与之前流程的一致，于是又写了个 Craft 插件，点击后会获取文档内容，简单处理后（如获取 header-img 的图片版权信息到 meta 中），会调用特定链接，链接参数带上文档信息： 

```javascript
craft.editorApi.openURL(`xhelper://${btoa(unescape(encodeURIComponent(content)))}`)
```

而这个特定链接的作用，就是调用 Apple Script 写的 Application，置于如何写一个 Application 应用和如何响应链接调用，可以看我写的 [这篇文档](/tech/applescript-simple-use.html)，里面会调用 node，执行的其实也是之前放到 Github CI 执行的代码，这里放一个简单的截图：

{% render_caption caption="Xhelper截图👆🏻" img="https://static.xheldon.cn/img/in-post/2022/optimize-of-my-blog-2/BC93AD26-26C5-4AD1-A8AC-2BB3B2AD2945_2.png" %}
![Xhelper截图👆🏻](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/EEBDAC80-8C53-4186-8A88-FDE07AE35850/BC93AD26-26C5-4AD1-A8AC-2BB3B2AD2945_2/RFQFsce5Pe9Yxf9ft6LBhCxPEW4CMhW5WDLZ41qWg94z/Xhelper.png)
{% endrender_caption %}

效果： 

{% render_caption caption="Image" img="https://static.xheldon.cn/img/in-post/2022/optimize-of-my-blog-2/5E5FDC00-D081-4B50-91FE-61946A453356_2.png" %}
![Image](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/EEBDAC80-8C53-4186-8A88-FDE07AE35850/5E5FDC00-D081-4B50-91FE-61946A453356_2/yYlYSASG8FBmlbhhrrm6JWPWEy2b3U6cPO9omnP6K20z/Image.png)
{% endrender_caption %}

之前的流程因为我贪图简单，加上 Craft 上传的图片不一定都有后缀（如通过拖拽、图片上传等方式上传的图片，则有后缀，若通过复制粘贴来的或者 Web 上传的图片，则无后缀），于是我将所有图片都转成了 `png` 格式，本次我移除了这个逻辑，先判断如果自身带后缀则使用其后缀；如果没有后缀，则再将其强制转为 `png` ，推荐使用 `Sharp`  这个库，非~常~好~用~：

{% render_bookmark url="https://sharp.pixelplumbing.com/" title="sharp - High performance Node.js image processing" img="https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/sharp-logo.png" %}
"Resize large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions"
{% endrender_bookmark %}

所以...上 Gif！

{% render_caption caption="支持gif啦" img="https://static.xheldon.cn/img/in-post/2022/optimize-of-my-blog-2/59E358FD-2A7A-4125-8223-1A51FFCCC8A3_2.gif" %}
![支持gif啦](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/EEBDAC80-8C53-4186-8A88-FDE07AE35850/59E358FD-2A7A-4125-8223-1A51FFCCC8A3_2/h75rMU7CzEJx2Y4TbVO9gIHucqoj8RQD6LheUyQAcToz/gif.gif)
{% endrender_caption %}

> 注：之前贪图方便（不用鉴权、不用固定 ip 的服务器），用了 [微信云托管](https://cloud.weixin.qq.com/cloudrun)，还顺便实现了将摘要往微信公众号发送的逻辑。但是坑爹的是，这个服务器仅仅是我为了方便发布公众号而弄的，但是按我性子一般三个月就用一次，每次用的时候还是冷启动（它服务器默认 30 分钟无请求进来自动关闭实例，因为他们是按实例运行时间计费的），会经常性的失败，有这排查的功夫我都自己都复制粘贴文档到微信公众号的编辑器了。所以，我放弃了微信公众号，手动粘贴…也挺好！

## 优化三：实现 Craft 中的 Bookmark 和图片 Caption

能在基于 Jekyll 的博客系统来实现这个效果是因为我并没有直接用 Github 的 Jekyll 服务，而是自己用 Jekyll build 成 HTML 后，再 push 到仓库中实现的，原因及过程见 [这里](https://www.xheldon.com/tech/my-blog-ci.html#%E9%85%8D%E7%BD%AE-github-actions-build-%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6)。

实现 Bookmark和图片 Caption 是利用了上一步生成的 Markdown 中含有的特殊 Jekyll 标签，配合自定义的 Jekyll 插件实现的，渲染 Bookmark 就用 `render_bookmark` ，渲染图片 caption 用 `render_caption` 实现（用了刚学了两小时的 ruby 脚本语言）：

```ruby
module Jekyll
    class RenderBookMarkBlock < Liquid::Block
        def initialize(tag_name, attr, tokens)
            super
            attrs = attr.scan(/url\=\"(.*)\"\stitle\=\"(.*)\"\simg\=\"(.*)\"/)
            @url = attrs[0][0]
            @title = attrs[0][1]
            @img = attrs[0][2]
            @error = ""
        end
        def render(context)
            @desc = super
            "<p><a class='link-bookmark' href='#{@url}'><span><img src='#{@img}'/></span><span><span>#{@title}</span><span>#{@desc}</span><span>#{@url}</span></span></a></p>"
        end
    
    end
end

module Jekyll
    class RenderImageCaptionBlock < Liquid::Block
        def initialize(tag_name, attr, tokens)
            super
            attrs = attr.scan(/caption\=\"(.*)\"\simg\=\"(.*)\"/)
            @caption = attrs[0][0]
            @img = attrs[0][1]
        end
        def render(context)
            text = super
            "<p caption='#{@caption}'><img src='#{@img}' alt='#{@caption}' title='#{@caption}' /></p>"
        end
    
    end
end
  
Liquid::Template.register_tag('render_caption', Jekyll::RenderImageCaptionBlock)
Liquid::Template.register_tag('render_bookmark', Jekyll::RenderBookMarkBlock)
```

Jekyll 使用插件非常简单，在根目录新建一个 `_plugins` 目录，将用`ruby` 写的 Jekyll 插件放进去即可在 Jekyll Build 的时候加载该插件。

## 其他细节

之前的内容算是标准 Markdown 生成的 HTML，因此一些 RSS 阅读器抓取内容后格式良好，但是本次优化加了个 Bookmark 之后，RSS 格式就乱了（截图来自 Reeder 5）： 

{% render_caption caption="Reeder5中Bookmark格式错乱" img="https://static.xheldon.cn/img/in-post/2022/optimize-of-my-blog-2/B1E25DC1-17C1-45D8-8721-8160FDCA1676_2.jpeg" %}
![Reeder5中Bookmark格式错乱](https://res.craft.do/user/full/747e0824-8866-cf67-b3ae-2e207380d1f9/doc/EEBDAC80-8C53-4186-8A88-FDE07AE35850/B1E25DC1-17C1-45D8-8721-8160FDCA1676_2/811gVZWgsp3CV2yAn5qcKibMbppuucBY9Sy1WnfaUgAz/Reeder5Bookmark.jpeg)
{% endrender_caption %}

于是又写了个 ruby 插件，过滤该标签，将其转成普通的 HTML 链接： 

```ruby
module Jekyll
    module BookmarkFilter
      def bookmark_filter(input)
        input.gsub(/^\<p\>\<a\s+class=\"link-bookmark\"\shref=(.*)\starget=\"_blank\"\>\<span\>(.*)\<\/span\>\<span\>\<span\>(.*)\<\/span\>\<span\>\n(.*)\n\<\/span\>\<span\>(.*)\<\/span\>\<\/span\>\<\/a\>\<\/p\>$/, '<p><a href=\1 target="_blank">\4</a></p>');
      end
    end
end
  
Liquid::Template.register_filter(Jekyll::BookmarkFilter)
```

然后再在  feed.xml 中使用即可： `post.content | bookmark_filter` 。

欢迎交流！
