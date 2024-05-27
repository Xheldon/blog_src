---
layout: post
date: 2022-01-19 20:17:59 +0800
categories: tech
header-style: text
callout: This article is used to experiment with some issues with the Craft Markdown API, as I think some of its blocks are not converted correctly. 
tags:
    - 测试
title: The Craft Markdown and The Github Markdown
lastUpdateTime: 2022-01-19 21:07:05 +0800
---

This article shows the Markdown rendering effect of Github, [this address](https://www.craft.do/s/ElIshjFMH6lusC) is the rendering effect of Craft Web client, you can see the difference between the two is still quite obvious. 

# TITLES

# Title

## Subtitle

### Heading

# CONTENT

#### Strong

Body

##### Caption

# GROUPS

# Page

This is an empty page!

# Card

This is an empty Card!

---

# TEXT STYLE

**Bold**

*Italic*

~~Strike~~

`InlineCode`

- [ ] Todo

Toggle



- Unorderlist One

- Unorderlist Two

1. Orderlist One

2. Orderlist Two

Align Left

Align Center

Align Right

This is a sentence with an indent

---

# DECORATIONS

Decorations Focus

> Decorations Block

# INSERT BLOCK

Plain Text

| Table |       |
| ----- | ----- |
|       |       |

![Image](https://images.unsplash.com/photo-1642249268006-9e05029c9262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDIyNzR8MHwxfGNvbGxlY3Rpb258MXwzMTcwOTl8fHx8fDJ8fDE2NDI1ODg2ODg&ixlib=rb-1.2.1&q=80&w=1080)

```
// Code Block with Javascript language

let CodeBlock = "Hello Craft!";
```

```
The Formula
```

Devide👇🏻

---

---

---

---

# NESTING

> Decoration Focus & Block

1. Decoration Focus & List

2. > Decoration Block & List

…too many to show

---

# What I Think？

### Important part:

1. The Decoration，no matter Focus or Block should converted to `blockquote`  in markdown syntax.

2. The Caption, there is no corresponding markdown syntax, just render as Body, not H5.

3. The CodeBlock, should take the language like {%raw%}```javascript{%endraw%}.

4. The nesting List, not the flat list!

### Not important part:

1. The Align, ignore it.

2. The Indent, ignore it.

3. The formula, emmmm ignore it.

# What I Plan to do?

I will create a npm package to convert Craft data to Github Markdow correctly 🤪.

### Anyone any idea?