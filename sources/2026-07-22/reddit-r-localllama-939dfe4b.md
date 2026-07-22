---
title: SenseNova-U1-8b-MoT-Infographic-V3 has been released (2 weeks after V2)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v2mszh/sensenovau18bmotinfographicv3_has_been_released_2/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-21T16:06:37.000Z'
fetched_at: '2026-07-22T11:01:20.401Z'
---
Four things it does:
  
Local text editing: mark a region (or just say it in natural language) and replace specific text. Fixes typos, swaps numbers, changes titles — keeps everything else intact
 Local content editing: add/remove/replace stuff like charts, icons, objects in specific spots
 Global style editing: swap the whole visual style (Lego, cyberpunk, traditional Chinese, vintage map...) while keeping content and layout
 Global layout editing: rearrange and beautify the layout without losing information
  
The "fix one typo without nuking the whole image" part alone is huge for me. Used to waste so many rerolls on dumb text errors.
 Also: 8B params, Apache 2.0, and generation quality didn't drop from V2 — actually went up slightly on Qwen-Image-Bench (50.23 vs 48.00). They went back to the MT stage and jointly trained T2I + editing instead of just slapping editing on top, which probably explains why both work decently.
 GitHub: GitHub - OpenSenseNova/SenseNova-U1: SenseNova-U series: Native Unified Paradigm with NEO-unify from
 HF: https://huggingface.co/sensenova/SenseNova-U1-8B-MoT-Infographic-V3
    submitted by    /u/SandyL925  
 [link]   [comments]
