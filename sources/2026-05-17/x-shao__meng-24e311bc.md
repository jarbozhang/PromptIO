---
title: "Raycast 2.0 @raycast 发布，这是 2020 年首发后最大一次重写，团队写了一篇极有工程价值的技术博客，详细记录了他们如何从纯原生 Swift/AppKit 应用，转向 TypeSc"
source: "X @shao__meng"
url: "https://x.com/shao__meng/status/2055165628491972975"
date: "2026-05-15T05:57:23.000Z"
likes: 55
reposts: 4
replies: 4
tweet_id: "2055165628491972975"
author: "shao__meng"
---
Raycast 2.0 @raycast 发布，这是 2020 年首发后最大一次重写，团队写了一篇极有工程价值的技术博客，详细记录了他们如何从纯原生 Swift/AppKit 应用，转向 TypeScript + Swift + C# + Rust + Node + React 的混合架构，实现「在不丢失原生质感的前提下实现跨平台」

为什么要重写？
v1 是基于 AppKit 的纯原生 macOS 应用，几乎所有 UI 组件都自研，没大量使用 SwiftUI（性能与控制力不达标）。但随着产品从 launcher 演化成包含 AI Chat、Notes、扩展、同步、文件搜索的生产力平台，原架构出现三个瓶颈：
· 编译时间不断变长
· AppKit 越来越掣肘
· 深耕原生 macOS 的工程师越来越难招

即便不上 Windows，也已经到了必须重构的时间点。Windows 化只是把这件事提前了。

技术选型的取舍
在 Windows 端，原生方案被快速排除：微软 UI 框架历史混乱（WPF→UWP→WinUI 3），WinUI 3 还不够成熟；维护两套独立原生 UI 等于双倍工作。

剩下三选一：Electron / Tauri / 自研混合栈。
· Electron: 成熟稳定，但 Raycast 深度依赖系统能力（全局热键、剪贴板、辅助功能、悬浮面板、半透明等），Web 与原生的边界过于痛苦；且不愿在 macOS 上额外捆绑 Chromium。
· Tauri: 原生侧控制力不足，当时还太年轻。
· 自研混合栈（最终方案）: macOS 用 Xcode + Swift，Windows 用 Visual Studio + C#，各自包一个系统 WebView（WKWebView / WebView2），自行设计 IPC。代价是要自己实现 Electron 免费提供的那一整套基础设施，但换来完全的控制权。

他们也明确表示：这种取舍对绝大多数桌面应用并不成立，Electron 是更理性的选择，只是 Raycast 的特殊性让自研合理。

四层架构
Raycast 2.0 由四个部分组成，跨语言通过统一接口声明 + 类型化客户端代码生成实现编译期安全：
1. Host App：Swift/AppKit (mac), C#/.NET 8/WPF (Win)
2. Web Frontend：React + TypeScript（双端共用一份）
3. Node Backend：单一长驻 Node 进程
4. Rust Core：Rust

产品工程师大多数时间只在 Web + Node 层工作，原生 shell 仅在新增 OS 能力时才动。

自研 Rust 文件索引器值得一提：Windows 上绕过常规 NTFS 遍历，直接读取 Master File Table，实现秒级全盘索引；Rust 的可预测内存与无 GC 暂停在此关键。

让 WebView 感觉像原生
Raycast 的判定标准很简单：用户在不知道实现的情况下，是否会以为这是普通 Mac 应用？

1. 设计规约层面
· 不用 cursor: pointer
· 不用 hover 高亮
· 设置开在独立原生窗口
· Popover/Tooltip 用原生窗口渲染，可超出主窗边界
· macOS Tahoe 上接入 Liquid Glass 材质
· 杜绝任何视图出现/切换时的闪烁

2. 与 WebKit 斗智斗勇
WebKit 是为浏览器设计的，对一个每天显示隐藏几百次的 launcher 来说，很多默认行为是反的：
· 节流：requestAnimationFrame、CSS 动画、定时器会在 WebKit 认为视图不可见时被节流。解法：窗口提到最前但 alphaValue=0 保持视觉隐藏，关闭 windowOcclusionDetectionEnabled，显示前用 rAF 触发渲染。
· 被遮挡区域不渲染：从紧凑切换到大尺寸时会有 1–2 帧空白。解法：让 WKWebView 的 frame 始终保持展开后的尺寸，渲染超出可见区域。
· 窗口缩放卡顿：WebKit 在动画 resize 期间暂停绘制。解法：重写 NSWindow.setFrame，用 Core Animation 隐式动画替代。
· 打开闪烁：用 _doAfterNextPresentationUpdate 同步原生呈现与 WebView 绘制完成。
· Emoji 慢：字体回退链每个 glyph 都查找。解法：启动时预热 emoji 字体。

他们还做了一套基础设施，可在运行时切换 WebKit Feature Flags，内部解锁了 60 FPS 上限并启用 requestIdleCallback。

3. Windows 侧
WebView2 基于 Chromium，同样有自己的节流和渲染逻辑。难点包括：自定义标题栏与 acrylic 模糊协调、避免启动时的白屏闪烁、多窗口的 WebView2 环境管理、防止窗口失焦时 Chromium 把 WebView 节流掉（Raycast 经常需要在后台更新）。

内存与性能的平衡
直接面对 Web 桌面应用最常见的批评。
· v1 稳定态 200–300 MB
· v2 稳定态 350–450 MB

主窗口隐藏时的分解：WebView ~120–200 MB，Node 后端 ~150–200 MB，Swift 壳 ~40 MB，WebKit GPU ~18 MB，网络进程 ~12 MB。空 WebView 基线就有约 50 MB，空 Node 进程约 12 MB——这是栈本身的固定成本。

他们也在做"如何正确解读内存"的科普：macOS 的压缩内存、clean vs dirty 页、Activity Monitor 会把共享框架内存重复计入每个进程、真正该看的是底部的 Memory Pressure 指示器。但同时强调他们持续追踪 phys_footprint，开发期已大幅压缩，并特别在低内存机器上测试。

博客原文
https://t.co/bwZhELAtSo

Quoted tweet:
@peduarte: everything you need to know about how the team built the new @raycast from the ground up

honestly worth a read 👉 https://t.co/vP4OUpIHSV

there's nothing to hide
