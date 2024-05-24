---
layout: post
title:  "Nginx 中的正向和反向代理"
date:   2021-07-06 08:05:56 +0800
categories: tech
callout: "一切都源于无知"
header-style: text
tags:
    - 技术
    - Nginx
    - 服务器
    - 代理
---

## 本文由来

因为文件夹/文件名字不能带冒号，导致我误会 Chrome 不能用其 Override 功能对那些带有端口号的 URL 进行 override，因此我打算将内网远端测试环境带端口的 URL 修改为本地的 80 默认端口，以让 Chrome 能够 override。后来发现 Chrome 其实是可以 override 带端口号的 URL 的，将其 decode 一下为 `%3a` 即可。

发现我自己的愚蠢后，由于不甘心花了一个小时用 Nginx 进行正向代理来解决端口这个问题的方式居然是多此一举的，遂将其中过程记录下来，也不枉我花了的这些个时间，以让后来者能够少走写坑，遂成此文。

其中的一些概念同学们上大学的时候可能都了解，这里只写给小白看的。

## 名词解释

### 正向代理

正向代理一般是对客户端而言的，比如你的梯子就是正向代理，本地的请求经过代理服务器配置的规则，将请求发往远端服务器。当然你也可以在服务端请求其他服务器资源的时候配置正向代理，这个正向代理就是对服务器而言的。

正向代理应用最广泛的就是 VPN 了。

### 反向代理

顾名思义，就是跟上面正向代理相反的代理。其只是对服务端而言的一种概念。即，客户端的请求到达服务端后，先经过服务端配置的反向代理，进行分发，然后再将请求流量导到不同的服务器。

nginx 反向代理在服务端应用的非常广泛，比如，负载均衡，可能的策略是假设有5台服务器，随机每次来源的数量进行 cout 计数后对 5 取余，余数为 1 的将流量导向第一台服务器，余数为 2 的导向第二台，以此类推；比如，路径重写，即如果请求的路径是 xxx/yyy，可以将其重写为 zzz，然后将流量导流到服务器中，等等。

## 我的需求

我需要访问 `http://baidu.com:8888` ，但是我想通过访问 `http://baidu.com:80` 也即，`http://baidu.com` 的方式来访问 `http://baidu.com:8888` 所以工作原理跟梯子是一样的，即为正向代理。

### 难点

整体没啥难的，无非就是 server.listen 80 端口，然后路径匹配，将请求通过 `proxy_pass` 发到正确的路径如 8888 端口上，唯一有点麻烦的就是一个点，ws 请求也需要走代理，所以需要在 http 开始的地方写下这个：

```shell
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

然后在 server.location 块里面加上：

```shell
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
```

即可。

当然还涉及到 `proxy_set_header` 、`proxy_pass` 等，不在本次讨论范围，有兴趣的可以看官方文档：[http://nginx.org/en/docs/http/websocket.html](http://nginx.org/en/docs/http/websocket.html)

哦对了，差点忘了，nginx 服务器启动是在本地的 127.0.0.1，所以你想通过访问 `http://baidu.com` 来访问 `http://baidu.com:8888` 还需要修改下本地的 hosts 文件，将 127.0.0.1 指向 baidu.com 即可：

```shell
127.0.0.1  www.baidu.com
```

有同学会问，为啥不直接用 hosts 指定端口呢？比如这样：

```shell
127.0.0.1. www.baidu.com:8888
```

答案也显而易见，因为 hosts 文件不支持端口呗~

## 后话

因为一直做前端，工具类方向，没怎么接触过服务端，目前还没搞懂怎么给 nginx 装额外的模块，快速搜了下，貌似是需要跟 nginx 一起编译才行，不能像安装软件一样安装插件。需要安装插件是因为 nginx 默认不代理 https 请求，有这个需要的话要安装额外的模块。

感觉 nginx 的用处非常大，有空要好好研究一下！
