---
title: 如何使用 Notion Flow 模块转换
date: 2024-3-31 8:0:00 +0800
lastUpdateTime: 2024-4-1 22:34:00 +0800
name: how-i-use-notion-flow
layout: post
tags:
  - 技术
  - 技巧
  - 教程
  - 工作流
  - Notion
  - Jekyll
categories: tech
header-style: text
notion: https://xheldon.notion.site/Notion-Flow-91ba709f00ff40a1afb6c23195d87fb3?pvs=4
callout: 我有特别的 Notion Flow 使用技巧~
noCatalog: true
---

一周前，我构建了 Notion Flow 浏览器扩展：

{% render_bookmark url="https://twitter.com/_Xheldon/status/1770466495560294583" title="Xheldon on Twitter / X" img="" yid="" bid="" %}
Notion Flow 浏览器插件终于发布了，配置和介绍见视频：https://t.co/pw4yYwnt8h官网见：https://t.co/6326Q4gIWC插件用来将 Notion 内容以 Markdown 或者你自定义的任意格式发送到 Github，我用它来写使用了 Github Pages 的 Jekyll 博客，插件会在配置 OSS 后自动处理图片内容到 CDN，非常好用~。— Xheldon (@\_Xheldon) March 20, 2024

{% endrender_bookmark %}

而刚刚更新的 0.4.1 版本：

{% render_bookmark url="https://notion-flow.xheldon.com/blog/2024/03/31/0.4.1" title="0.4.1 | Notion Flow" img="https%3A%2F%2Fnotion-flow.xheldon.com%2Fimg%2Findex.png" yid="" bid="" %}
Feature
{% endrender_bookmark %}

支持了兼容 AWS S3 API 的自建 OSS 服务，如 Cloudflare R2：

{% render_bookmark url="https://www.cloudflare.com/zh-cn/developer-platform/r2/" title="Cloudflare R2 | 零出口费用分布式对象存储 | Cloudflare | Cloudflare" img="https%3A%2F%2Fcf-assets.www.cloudflare.com%2Fslt3lc6tev37%2F53qCYhQbir5WtIU0VDWESo%2F954a48bfb17f429acf469e5f14345d83%2Funnamed-3.png" yid="" bid="" %}
Cloudflare R2 是兼容 S3、零出口费用的全球分布式对象存储。 自由移动数据，构建自己期望的多云架构。
{% endrender_bookmark %}

本篇文章简单介绍一下我是如何使用这个浏览器扩展用于我的 Github Jekyll 博客的。

---

Jekyll 静态博客是基于 Ruby 构建的，支持插件。所以我自己写了几个插件（Jekyll 博客的插件位于 `_plugins` 目录下，写好 ruby 文件后，丢到该目录下，重启服务即可）来处理 Liquid 模板语言，而内容就是来自 Notion Flow 转换的 Notion 内容。如处理 bookmark 的插件内容如下：

{%raw%}

```ruby
module Jekyll
    class RenderBookMarkBlock < Liquid::Block
        def initialize(tag_name, attr, tokens)
            super
            # 普通的链接没有 yid 和 bid
            attrs = attr.scan(/url\=\"(.*)\"\stitle\=\"(.*)\"\simg\=\"(.*)\"\syid\=\"(.*)\"\sbid\=\"(.*)\"/)
            if !attrs.empty?
		            # 外部的 video 链接，youtube、bilibili（如本文上一篇博客就是）
                @url = attrs[0][0]
                @title = attrs[0][1]
                @img = attrs[0][2]
                @yid = attrs[0][3]
                @bid = attrs[0][4]
                @firstChar = (@title)[0].upcase
                @error = ""
            else
			          # 正常和 notion 一样的 bookmark（如本文上面三个链接就是）
                attrs = attr.scan(/url\=\"(.*)\"\stitle\=\"(.*)\"\simg\=\"(.*)\"/)
                @url = attrs[0][0]
                @title = attrs[0][1]
                @img = attrs[0][2]
                @firstChar = (@title)[0].upcase
                @error = ""
            end
        end
        def render(context)
            @desc = super
            if !@yid.nil? && !@yid.empty?
                "<p class='embed-responsive embed-responsive-16by9'><iframe src='https://www.youtube.com/embed/#{@yid}?rel=0' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></p>"
            elsif !@bid.nil? && !@bid.empty?
                "<p class='embed-responsive embed-responsive-16by9' style='border-bottom: 1px solid #ddd;'><iframe src='//player.bilibili.com/player.html?bvid=#{@bid}&high_quality=1&as_wide=1' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen></iframe></p>"
            else
                "<p><a class='link-bookmark' href='#{@url}' target='_blank'><span data-bookmark-img='#{@img}' data-bookmark-title='#{@firstChar}'><img src='#{@img}'/></span><span><span>#{@title}</span><span>#{@desc}</span><span>#{@url}</span></span></a></p>"
            end
        end
    end
end

# 上传的 video
module Jekyll
    class RenderVideoBlock < Liquid::Block
        def initialize(tag_name, attr, tokens)
            super
            attrs = attr.scan(/caption\=\"(.*)\"\simg\=\"(.*)\"\ssuffix\=\"(.*)\"/)
            @caption = attrs[0][0]
            @img = attrs[0][1]
            @suffix = attrs[0][2]
        end
        def render(context)
            text = super
            "<p caption='#{@caption}'><video controls muted><source src='#{@img}' type='video/#{@suffix}' /></video></p>"
        end
    end
end

Liquid::Template.register_tag('render_bookmark', Jekyll::RenderBookMarkBlock)
Liquid::Template.register_tag('render_video', Jekyll::RenderVideoBlock)
```

{%endraw%}

这段的逻辑是如果遇到 Notion 的 bookmark 模块链接是 Youtube、Bilibili，则转成嵌入视频的 HTML（iframe），否则转成类似于 Notion bookmark 的 HTML（需要配合 CSS 实现）。

所以我使用 Notion Flow 将 Notion 内容转换成 Markdown 格式的同时，自定义了 bookmark 等模块的转换规则，以让博客能够显示 Youtube、Bilibili 和与 Notion 一样的 bookmark 样式内容，如下：

```javascript
video: function video(block) {
  if (block.type === 'file') {
    // 用户自己上传的 video 文件，用默认 video 插件处理
    return `{% render_video caption="${block.caption}" img="${block.url}" suffix="${block.suffix}" %}\n![${block.caption}](${block.url})\n{% endrender_video %}\n`;
  } else if (block.type === 'external') {
    // 外部链接、youtube 和 bilibili 视频链接，用 bookmark 处理
    return `{% render_bookmark url="${block.url}" title="${
      block.caption || ''
    }" img="" yid="${block.yid}" bid="${
      block.bid
    }" %}{% endrender_bookmark %}\n`;
  }
}
```

这里需要注意（我不太懂 ruby）， Liquid 模板的标签之间，必须有文本内容（你可以不用），否则，ruby 插件无法生成 HTML。即：

{%raw%}

```javascript
{% render_video  %}这里必须有任意内容！{% endrender_video %}
```

{%endraw%}

这样在 ruby 插件中，`super` 变量拿到的就是「这里必须有任意内容！」这句话（你可以不使用该变量）。如果没有这段内容，则插件压根不会返回任何内容。
