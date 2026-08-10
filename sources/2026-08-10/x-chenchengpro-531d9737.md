---
title: >-
  我是这么管理 Skills 的。 Skill 有两个痛点。 一个是同步。如何保持一个源，让它在项目、全局、以及远程机器上保持一致。
  另一个是上下文爆炸。我见过装了两千多个 skill 的用户，然后回过头来问我们，为啥 code agent 这么慢。 我的解法：一个中央仓库，一个 sync
  脚本，绝大多数 skill 加 disable-model-invoc
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2084894203092607299'
date: 'Wed Aug 05 06:48:08 +0000 2026'
likes: 150
reposts: 8
replies: 68
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-08-10T11:05:04.577Z'
---
我是这么管理 Skills 的。

Skill 有两个痛点。

一个是同步。如何保持一个源，让它在项目、全局、以及远程机器上保持一致。

另一个是上下文爆炸。我见过装了两千多个 skill 的用户，然后回过头来问我们，为啥 code agent 这么慢。

我的解法：一个中央仓库，一个 sync 脚本，绝大多数 skill 加 disable-model-invocation: true。

1\ 只有一个源头

维护了一个 ~/Projects/cc-skills/，60+ skills，实验性质的不在这。改只在这里改，别处都是副本。

2\ 分发交给脚本

有个 sync.ts 脚本，底下是 rsync -av --delete，支持 local 和 ssh，推送到全局、多个项目和远程机器（比如在 macmini 上部署了 hermas 或 openclaw，只需要部分 skill）。

3\ 默认 .claude/skills，其余软链过去

通过软链支持不同的 Qoder 和 Codex 等，比如 ~/.agents/skills -> ~/.claude/skills，~/.qoder/skills -> ~/.claude/skills。

4\ 90% 以上加 disable-model-invocation: true

我同步到 global 的 15 个里，14 个加了这个 flag。所以用 claude code 的 /doctor 分析，结果很干净。

几十个 skill 就是几十段常驻描述，活还没开始干，窗口先被咬掉一块。几千个是什么光景，可以自己想。。

而且我本来就知道什么时候该用哪个。/deslop、/handoff 我打得出来，不需要模型替我猜。

5\ 新 skill 用 create-skill 建

上面这些约定我不想每次重记一遍，全塞进这个 scaffold 里了。它建出来的 skill 就按这套走：有副作用的一律加 disable-model-invocation: true，只有规范和知识型的才留给模型自己判断。

注：我的 create-skill 开源了：https://t.co/kD46Fp0VIh
