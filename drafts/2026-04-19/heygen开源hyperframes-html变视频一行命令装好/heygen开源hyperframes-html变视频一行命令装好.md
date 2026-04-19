# 当做视频变成写HTML，500条商品短视频只需要一个运营

HeyGen把自己做视频的底层框架开源了。

不是开源一个模型，不是放出一个Demo，是直接把"用HTML写视频"这件事变成了一个可以 `npx` 安装的框架。我第一反应是，这家估值接近5亿美金的AI视频公司，怎么突然这么大方了？

## 到底是个什么东西

HyperFrames 的核心思路简单到有点反直觉，视频不是"生成"出来的，是"写"出来的。

你用HTML定义画面布局，用 `data-start` 和 `data-duration` 控制时间轴，用CSS做样式，然后框架把这些HTML逐帧截图，用FFmpeg编码成MP4。听起来很土对吧？但这恰恰是它聪明的地方。

看一眼它的composition结构，

```
一个 stage div，设定 1920x1080
  - 视频轨道，0秒开始，播5秒
  - 图片叠加，第2秒入场，持续3秒
  - 背景音乐，全程播放，音量50%
```

全是标准HTML语义加几个 data 属性。没有私有DSL，没有新语法要学。

所以，任何理解HTML的AI Agent都能直接生成视频。

## 为什么说这是给Agent设计的

坦率讲，"HTML转视频"这个技术路线本身不新鲜，Remotion早就在做了。HyperFrames真正不一样的地方在于它的"Agent原生"设计。

安装方式就很说明问题，

```
npx skills add heygen-com/hyperframes
```

这不是装一个npm包，是给你的Claude Code（或者Cursor、Gemini CLI）装一个"技能"。装完之后，你可以在Claude Code里用 `/hyperframes` 命令让AI帮你编排视频合成。

想想这个工作流，你跟AI说"给我做一个竖版TikTok视频，先放5秒intro，叠一个logo在右上角，配上背景音乐"，AI直接生成HTML composition，preview看一眼，满意了 render 出MP4。

整个过程你不需要打开任何视频编辑软件。

这就是为什么它强调"确定性输出"，相同输入永远产生相同结果。对人类来说这是理所当然的，但对AI Agent来说这至关重要。Agent需要可预测的工具，不是那种每次跑出来效果都不一样的"创意型"生成。

## 社区里的多种声音

我翻了一圈社区讨论，发现大家关注的点很有意思。

一部分人特别兴奋的是组件生态，HyperFrames自带50多个预制组件，社交媒体叠加层、shader转场效果、数据可视化动画，都可以用 `npx hyperframes add` 一键安装。对于批量生产短视频的团队来说，这套东西配合Agent工作流，产能提升会很夸张。

但也有人提出了一个尖锐的问题，如果视频就是HTML截图拼出来的，那画面表现力的天花板在哪里？CSS动画和GSAP再怎么花哨，跟Runway、Pika那种像素级AI生成比起来，视觉质量完全不在一个维度。

还有开发者注意到技术栈的门槛，Node.js 22+、FFmpeg、Puppeteer逐帧截图，这套东西在本地跑没问题，但要上生产环境做大规模渲染，Docker容器化和资源消耗是绕不过去的坑。

## 我的判断

我认为HyperFrames瞄准的根本不是"做出好看的视频"这个需求。

它瞄准的是"让AI能自主生产视频"。这是两件完全不同的事。

可能有人会觉得HTML截图这种方式太糙了。但反过来想，你见过哪个AI Agent能熟练操作Premiere吗？你见过哪个大语言模型能直接输出像素级视频帧吗？HTML是目前AI理解最好的视觉描述语言，没有之一。HyperFrames不是在技术上做了什么突破，是在"AI能用的工具"这个维度上找到了一个极其务实的切入点。

说真的，我觉得这个框架最适合的场景不是内容创作者拿它做YouTube视频，而是企业内部的批量视频生产线。想象一下，电商团队每天要做500条商品短视频，以前需要一个视频团队，现在可能只需要一个会写prompt的运营。

HeyGen开源这个东西的商业逻辑也很清楚，框架免费，但你要用HeyGen的数字人、TTS、高级渲染能力，还是得付费。开源框架圈开发者生态，用生态反哺商业产品，这个剧本Elastic和MongoDB都演过了。

## 你现在就能试

如果你手上有Claude Code或Cursor，三步搞定，

1. 跑 `npx skills add heygen-com/hyperframes` 装技能
2. 在Agent对话里用 `/hyperframes` 开始编排
3. `npx hyperframes render` 输出MP4

前提是你的环境里有Node.js 22+和FFmpeg。

其实我更好奇的是，当视频制作的门槛降低到"给AI发一条消息"的时候，视频内容的供给会发生什么变化？是质量整体拉高了，还是劣币驱逐良币？

这个问题可能比HyperFrames本身更值得想。

## 相关链接

- GitHub仓库，github.com/heygen-com/hyperframes
- 文档站点，hyperframes.heygen.com
- 组件目录，hyperframes.heygen.com/catalog

---
相关实体:: [[heygen|HeyGen]]
相关主题:: [[content-creation-tools|内容创作工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
