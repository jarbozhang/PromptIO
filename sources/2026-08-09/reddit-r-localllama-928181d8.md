---
title: >-
  Building a budget 32GB → 48GB VRAM home AI server: 2-3x RX 9060 XT 16GB vs RTX
  5060 Ti 16GB, AM5 vs used EPYC?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vj5wel/building_a_budget_32gb_48gb_vram_home_ai_server/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T20:15:19.000Z'
fetched_at: '2026-08-09T11:01:08.932Z'
---
I’m planning a dedicated home AI server, mainly for local LLM inference, agents/tool use, Docker services, and eventually larger MoE models with CPU offload.
 My plan is to start with 2x 16GB GPUs = 32GB VRAM, but I want to build the platform from day one knowing that I’ll almost certainly add a third identical GPU later for 48GB total VRAM.
 I’m in Brazil, so pricing is a bit weird. Converting roughly to USD, these are the deals I’m currently seeing:
 RX 9060 XT 16GB: around $490 each new/sealed on the used market
 2x = ~$980
 3x = ~$1,475
 RTX 5060 Ti 16GB: around $710 each new/sealed
 2x = ~$1,420
 3x = ~$2,125
 So going AMD saves me roughly $650 on the final 48GB setup, which is significant.
 The NVIDIA option is obviously more attractive from the software side because of CUDA, wider framework support, NVFP4, etc. The AMD option is mostly tempting because 48GB of relatively new RDNA4 VRAM for ~$1.5k sounds very hard to ignore.
 The rest of the AM5 build I’m considering is roughly:
 - Ryzen 9 9900X: ~$430 new
 or a used Ryzen 9 7900 for around ~$300
 - ASUS ProArt X870E-Creator: ~$790 new, possibly ~$600 used
 - 128GB DDR5 2x64GB: ~$1,020
 - 96GB 2x48GB alternative: ~$785
 - Good 1000-1200W PSU: ~$200-240
 - 1TB NVMe Gen4: ~$150
 - Large case + cooler + fans: ~$150-200
 The expensive part is the motherboard/RAM platform rather than the GPUs.
 The ProArt is attractive because with three GPUs I’d get roughly:
 - GPU 1: PCIe 5.0 x8
 - GPU 2: PCIe 5.0 x8
 - GPU 3: PCIe 4.0 x4 through chipset
 For llama.cpp layer splitting, I assume that should be reasonably usable, but I’m more concerned about the third x4 link if I want tensor parallelism or vLLM.
 My other big goal is eventually experimenting with very large MoE models, including DeepSeek-class models, where a lot of expert weights could remain in system RAM while attention / active layers are GPU-offloaded. That’s why I’m leaning toward 128GB RAM rather than 64/96GB.
 However, this has made me wonder whether AM5 i
