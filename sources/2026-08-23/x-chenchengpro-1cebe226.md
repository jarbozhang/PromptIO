---
title: >-
  Theo 花一周把 Matt Pocock 和 PStack 两套 AI skills 装上用了一遍，录了 38 分钟，结论是别照抄。 1）别自己翻
  README 挑。他让 Opus 5 审计自己三台机器上的真实使用历史，再对着两个仓库的 skill
  列表出一份匹配度排名，每条附一句理由。挑出来的才是你手上在干的活。 2）试一个 skill 不用装。SKIL
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2090042073583927318'
date: 'Wed Aug 19 11:43:56 +0000 2026'
likes: 106
reposts: 11
replies: 72
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-08-23T11:05:10.165Z'
---
Theo 花一周把 Matt Pocock 和 PStack 两套 AI skills 装上用了一遍，录了 38 分钟，结论是别照抄。

1）别自己翻 README 挑。他让 Opus 5 审计自己三台机器上的真实使用历史，再对着两个仓库的 skill 列表出一份匹配度排名，每条附一句理由。挑出来的才是你手上在干的活。

2）试一个 skill 不用装。SKILL.md 正文复制粘进对话就能跑。带脚本的多一步。

3）这条我认为最值钱。description 这个字段名起错了，应该叫 trigger。模型平时只看得到名字和描述，靠它决定要不要把这个 skill 拉进上下文。所以描述的职责不是概括功能，是在该触发的时候触发。

4）unslop 里有条自查标准。一句话如果原封不动放进另一个项目的文档里也成立，那它就没说出这个项目的任何事，删掉。

5）blast radius 要求 agent 别信自己这段对话的历史记录，找出整个结论依赖的那一两个事实，跑代码证明。这条救过他几次。

好笑的是，他在视频里数 Matt 那些 skill 文件的破折号，grilling 一页 9 个，几乎每段一个。他之前发过一条说 grill-me 很好用，但 slop 到把自己的 unslop 覆盖掉了。

别一口气装 500 个。挑两个，读完再装。
