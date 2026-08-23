---
title: >-
  翻了下 claude code version 191 的源码，感觉从技术角度看，Anthropic 这个反蒸馏机制设计还是挺精妙的。 Claude
  Code 有段提示词是这样。 return `Today${n}s date is ${r}.`;
  他对这句做了隐写，用肉眼分不出的字符，把系统时区和代理端点身份偷偷编码进了系统提示词。 触发条件是当你设了第三
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2072209406184526013'
date: 'Wed Jul 01 06:43:16 +0000 2026'
likes: 1294
reposts: 182
replies: 104
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-07-13T23:13:35.277Z'
---
翻了下 claude code version 191 的源码，感觉从技术角度看，Anthropic 这个反蒸馏机制设计还是挺精妙的。

Claude Code 有段提示词是这样。

return `Today${n}s date is ${r}.`;

他对这句做了隐写，用肉眼分不出的字符，把系统时区和代理端点身份偷偷编码进了系统提示词。

触发条件是当你设了第三方中转 ANTHROPIC_BASE_URL 且不是 https://t.co/bcqB9NHJTG 时。

所以如果你是官方直连用户，则并不会受到影响。也就是说最近的封号潮与此无关。

它编码了 3 个 bit，来自两个独立维度（时区 1 bit + 撇号 2 bit）：

1）时区，在 Asia/Shanghai 或 Asia/Urumqi 时，日期分隔符从 2026-06-30 偷偷变成 2026/06/30
2）那个撇号 ' 有四种写法，人眼基本看不出区别。

- '  (U+0027 普通)，普通第三方端点
- '  (U+2019)，命中"域名白名单"
- ʼ  (U+02BC)，命中"国产大模型关键词"
- ʹ  (U+02B9)，域名 + 实验室都命中

这三个维度是独立编码的。哪怕你的中转域名不在白名单、也不含关键词，只要系统时区是上海/乌鲁木齐，分隔符照样变斜杠——也就是"中国时区 + 任意第三方端点"的用户全员会被打上时区这一维的标记。

匹配逻辑是这样。域名是后缀匹配（host === d || host.endsWith("." + d)），白名单第一个就是 cn，所以任何 .cn 结尾的 host 一网打尽，不是逐个域名去列；关键词是子串包含（host.includes(kw)），host 里只要出现 deepseek 字样就命中，不用精确匹配；时区取的是系统时区（Intl…resolvedOptions().timeZone），不是 IP 地理位置。

更骚的是反混淆，两份名单用 XOR(key=91)+ base64 藏起来，专门躲 strings。解码就是 base64 decode 之后逐字节异或 91，源码里那个 LKi 去混淆后长这样：

```js
// 源码里的解码器（去混淆版，就是 LKi）
const decode = (b64) =>
  [...Buffer.from(b64, "base64")]
    .map((byte) => String.fromCharCode(byte ^ 91)) // key = 91
    .join("")
    .split(",");

// 逆运算就是打包时的编码器
const encode = (list) =>
  Buffer.from([...list.join(",")].map((c) => c.charCodeAt(0) ^ 91)).toString("base64");

encode(["deepseek", "zhipu"]); // → "Pz4+Kyg+PjB3ITMyKy4="
decode("Pz4+Kyg+PjB3ITMyKy4="); // → ["deepseek", "zhipu"]

// 拿真名单开头验一下，key=91 对得上
decode("Pz4+Kyg+PjB3NjQ0NSgzNC93"); // → ["deepseek", "moonshot", ...]
```

147 个域名白名单:".cn" 顶级域、字节/阿里/百度/网易/快手、https://t.co/ipTe6VkEZm, 外加一大票 Claude 中转站(anyrouter、88code、yunwu、aihubmix、dmxapi…)
11 个实验室关键词:deepseek / zhipu / moonshot / minimax / stepfun / baichuan / 01ai / dashscope / volces …

选「今天的日期」这句话做载体也很鸡贼。这个标记藏在 system prompt 正文里，不是 HTTP header、也不是 metadata。中转站一般会重写、过滤 header，但几乎没人会去动日期这类的自然语言，所以这是个洗 header 洗不掉的水印。而且 currentDate 是 user context 里和 claudeMd、userEmail 并列的字段，每个请求必带，标记 100% 稳定出现；撇号和分隔符的变化又语义无损，模型读起来一模一样，用户 diff 也基本看不出，隐蔽性拉满。

证据是怎么闭环的，这才是题眼。标记跟着请求走，当一个中转站或蒸馏管道最终回连 Anthropic 官方 API 转售 Claude 时，这条请求带着标记又流回了 Anthropic 自己的服务器。

于是 Anthropic 在自己的日志里就能读到：这条"直连我"的请求，日期是 2026/06/30（斜杠 = 中国时区）+ 撇号是 ʹ（U+02B9 = 域名和 deepseek 关键词都命中），铁证——源头是一个中国时区、配了国产大模型中转的客户端。

它不需要主动探测，让流量自己招供，只要请求最终回到 Anthropic，身份就自证了。这样就能清楚地知道哪些渠道流向了中国、被中转站转售或被大厂蒸馏，并且留下充足证据。

想自己验的话，逻辑都在 cli.js（2.1.191，混淆名每版会变）：检测函数 jqd()（:245688）→ 选字符 Wqd()（:245701）→ 拼日期 MKi()（:245707）；gate 是 Yfn()（:102664）；落点在 currentDate: MKi(eHe())（:250252）；XOR 名单解码器 LKi()，key = 91。
