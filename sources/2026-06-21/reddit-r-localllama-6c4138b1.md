---
title: 'GLM 5.2: 98% of max level intelligence with less than half of tokens usage'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uar4e2/glm_52_98_of_max_level_intelligence_with_less/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T08:19:42.000Z'
fetched_at: '2026-06-21T03:18:27.864Z'
---
According to this number of reasoning tokens from GLM 5.1 to GLM 5.2 more than doubled from 16.7k to 36.7k and for me as a local user with old junk Xeon setup this makes GLM 5.2 unusable to the extent where I had to shut down model after 12h of waiting it to respond to my math problem question.
 But then I saw this graph from z_ai technical report, which basically implies that you can use less than half of the tokens of max effort on high level and still get around 98% of max level intelligence at least in coding tasks. So I encourage both local and API users to try high level, because by default GLM 5.2 is set to max level.
 Upd: Finally after 6k tokens on the high level with Q4 quant I got an answer to my math question. It is Ok, but it is only half right. As a comparison in z.ai chat on max level answer was much a bit better. I don't know may be Q4 + high level is already to much. See Upd2.
 Upd2: I also run in z.ai chat the same prompt with "high" effort level and now reconsidering all 3 answers I would say that they are very similar. The only difference is that on "max" level it explicitly talked about second case, but then dismissed it, although it shouldn't. In other two responses it dismissed it from the beginning. So the difference is more down to presentation of the same partially correct result and not result itself.
 Take these results with gran of salt as it is just 1 shot per running conditions, but it looks like "high" level is better alternative for day to day use and "max" if you absolutely need perfect result or you want your model to look good on benchmarks))
 https://preview.redd.it/eha9j6vd9e8h1.png?width=6166&format=png&auto=webp&s=204c3261fada0c3eac8e4ab52fed7b45c1831b7b
    submitted by    /u/perelmanych  
 [link]   [comments]
