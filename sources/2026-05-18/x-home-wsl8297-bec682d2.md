---
title: "Mermaid 画流程图、时序图确实省事，但默认渲染谈不上好看，更别说在终端里几乎没法用。  我在 GitHub 挖到一个新开源项目：beautiful-mermaid，专门把 Mermaid 的渲染"
source: "X home @wsl8297"
url: "https://x.com/wsl8297/status/2055467532354801702"
date: "Sat May 16 01:57:03 +0000 2026"
likes: 1293
reposts: 191
replies: 47
tweet_id: "2055467532354801702"
author: "wsl8297"
---
Mermaid 画流程图、时序图确实省事，但默认渲染谈不上好看，更别说在终端里几乎没法用。

我在 GitHub 挖到一个新开源项目：beautiful-mermaid，专门把 Mermaid 的渲染这件事做漂亮、做实用——既能导出精致的 SVG，也能生成终端友好的 ASCII 字符画。

它用纯 TypeScript 实现，不依赖 DOM；常用的五类图表一次覆盖：流程图、状态图、时序图、类图、ER 图。

GitHub：https://t.co/3xeuwh8qDQ

主题也很到位：内置 15 套精选主题，强调色、边框色等细节都能细调，还支持直接套用任意 VS Code 主题配色。

更关键的是，颜色全用 CSS 变量驱动：切主题不必重渲染，改变量就能即时生效。
