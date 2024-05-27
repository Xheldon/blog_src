---
layout: post
title:  "免费使用私有仓库发布 GitHub Pages"
date:   2020-10-31 22:44:30 +0800
categories: tech
header-style: text
tags:
    - 技术
    - GitHub
    - Git
---

## 前言

最近研究了下 Github Pages 配合 Github Actions，觉得很适合自己的个人博客的场景，遂有此文。

我的博客之前是直接在源码放在 repo 中，使用 Github Pages 提供的默认的 Jekyll，然后设置自定义域名。但是这样有以下几个问题：

1. 无法隐藏源码。你的 _post 目录下的文章可以随意的复制然后放到别的地方当作他们自己的内容。
2. 无法隐藏修改记录。如果你有一些内容突然不想放到博客上了，于是你把部分内容给删了，但是别人仍然可以通过访问仓库源码的历史记录查看到该文件的历史，你的修改一览无余。
3. 无法使用 Gitalk。以上两个问题可以使用 Github Pro 及以上方式解决，该种付费账户的功能之一就是允许私有仓库使用 Github Pages。但是这样就无法使用 Gitalk 这种需要第三方写入 issue 的留言工具了。
4. 本地与线上打包结果不一致或报错无法排查。因为 Github Pages 提供的 Jekyll 对我们来说是黑盒，因此无法排查。
5. 无法使用一些自定义/三方插件。因为 Github Pages 只支持 [部分插件](https://pages.github.com/versions/)，因此诸如可以对分类文章进行分页而不仅限于首页分页的 jekyll-paginate v2 版就无法使用。

鉴于以上原因，因此我决定将编译后的源码作为 Github Pages 的内容，而不是源码。由于博客仓库已经有了一些 Gitalk 生成的 issue 留言，因此我又新开了一个仓库，将新仓库作为源码的存放地并设置为私有，然后将旧仓库仍然作为 Github Pages 发布的仓库，只是发布的是编译后的源码。如此以来，既可以保留原始的留言数据，又可以避免以上的几个问题。因为我每次编译源码后发布到 Github Pages 都是使用 force 推送，因此无法查看文件修改记录，在一定程度上保护了隐私，增加了复制的成本。下面是这个过程的介绍。

## 总体流程

基本流程是，假设旧的仓库叫做 A，新的放源码的私有仓库叫做 B。则当又新的 push 发生的时候，会触发 B 仓库的 Github Actions，然后该 Actions 会将编译后的源码，即 _site 文件夹中的内容 push 到 A 仓库，而 A 仓库原本就是 Github Pages，已经自定义好了域名，因此不用做任何处理即可。

## 详细过程

在 Github Actions 需要明确几个概念，分别是：

### 层级关系

从大到小依次为：

1. 脚本本身：就是这个会被 actions 执行的 ci.yml 的文件本身。
2. 任务：即配置的 jobs，jobs 默认是并行运行，可以通过 needs 关键字来设置依赖的其他 jobs。
3. 步骤：即 steps，jobs 中执行的每一步，顺序执行。每个 stps 都在自己的环境上下文中运行。一个 jobs 中可以有无限个步骤。
4. 操作：并非所有步骤都会运行操作，但是操作都是在步骤中运行的。操作是具体的命令，如打印当前目录、安装依赖等。

### 使用别人的 step

Action 允许你使用别人写好的 step，这样你就不用自己写了，比如如果你需要 checkout 分支，则只需要：

```yaml
- uses: actions/checkout@v2
    with:
        persist-credentials: fasle # false 是用 personal token，true 是使用 GitHub token
        fetch-depth: 0
```

即可。with 是相关的参数，具体可以查看该 step 的说明。

### 加密数据

你肯定不希望在 ci 文件中暴露自己的 [Personal Token](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) 或者其他隐私数据被所有人看到，因此你需要另一种方式来使用之，即加密后再通过名称引用，这里需要注意的问题是加密数据之间的不同：

1. [GITHUB_TOKEN](https://docs.github.com/cn/free-pro-team@latest/actions/reference/authentication-in-a-workflow)。如果你只对自己的仓库进行一些 build 或者 actions，那么你不需要在仓库设置中做任何事，在 actions 运行的时候，Github 会自动在上下文生成一个叫做 GITHUB_TOKEN 的环境变量，它可以用在需要鉴权的地方，如 push 代码到当前仓库等。
2. [Personal Token](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)。如果你当前的 ci 在 A 仓库，但是需要往 B 仓库做一些事情，那么你就需要 B 仓库的管理员生成的 Personal Token，然后分配一些权限即可。
3. [自定义加密](https://docs.github.com/cn/free-pro-team@latest/actions/reference/encrypted-secrets)。在第二步已经在 B 仓库生成了 Personal Token，然后如何在 A 仓库中使用呢？这个时候就需要用到 secret 了，即自定义加密。你需要在 A 仓库的设置中，自定义一个变量名，如 B_REPO_TOKEN 然后将刚刚拿到的 Personal Token 复制进去，然后就可以用 secret.B_REPO_TOKEN 的方式来引用了。

## 具体步骤

上面已经说的很详细了，下面直接列出文件，挨个分析。需要用到的时候直接复制该内容稍加修改即可：

```yaml
# 该 ci 的名字，可以在仓库的 Github Actions tab 看到
name: Blog Generator

# 触发时机
on:
  # 代码 push 到 master 分支的时候运行该 workflow
  # TODO：不运行 commit 信息中包含特定关键词的 push
  push:
    branches: [ master ]

jobs:
  # build-and-push 是 jobs 名字，随便取，可以有多个 jobs 默认并行
  build-and-push:
    runs-on: ubuntu-latest # 该 jobs 运行的环境
    steps:
      # 首先一般都是 checkout 当前的仓库代码，用官方的 actions/checkout@v2
      - uses: actions/checkout@v2
        with: # with 表示所需要的参数
          persist-credentials: fasle # false 是用 personal token，true 是使用 GitHub token
          fetch-depth: 0 # 保证能够 push 成功

      # 设置 ruby 环境，这里用的也是官方的 actions
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.6

      # 安装依赖
      - name: Install dependencies # 操作名字，会显示在 Github Actions 的任务输出界面，方便你 debug
        run: bundle install # 运行的命令

      # 打包静态资源
      - name: Build Pages
        run: bundle exec jekyll build 

      - name: Add Message
        working-directory: ./_site # jekyll 默认 build 到 _site 目录，因此设置命令执行的目录为 ./_site
        run: | # run 后面加个 ‘|’ 然后换行可以同时执行多个命令，每行一个
           echo "www.xheldon.com" > CNAME
           echo -e "# [Xheldon's Tech blog](https://www.xheldon.com)" > README.md
     
      - name: Commit and Push # 将打包后的位于 _site 目录的文件 push 到 A 仓库即可
        working-directory: ./_site
        run: |
          git init
          git checkout -b master
          git add -A
          git -c user.name='github actions by ${{github.actor}}' -c user.email='NO' commit -m 'update' 
          git push "https://{%raw%}${{github.actor}}:${{secrets.X_BLOG_SITE}}{%endraw%}@github.com/Xheldon/x_blog.git" HEAD:master -f -q
```

这里最后一步需要说明下，`X_BLOG_SITE` 即为我自定义的加密数据，值是配置的 Personal Token。另外 push 到远端的话，如果该 CI 只操作当前仓库，则不用将仓库名写死，可以用环境变量写做如下形式：

```yaml
git push "https://{%raw%}${{github.actor}}:${{secrets.GITHUB_TOKEN}}@github.com/${{github.repository}}{%endraw%}.git" HEAD:master -f -q
```

即使用 github.XXX 来指代相关信息，可以 [在这里](https://docs.github.com/cn/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#github-context) 查看更多上下文参数说明。

## 与 travis 的区别

之前我用过 Travis，两者概念基本大差不差，最显著的区别就是 Github Actions 允许引用别人写好的 actions，就好比是允许你 ‘require’ 别人的包一样，你无需维护这个包，直接使用即可，玩法更多，配置也更少，复用性更强。