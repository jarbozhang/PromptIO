---
title: 'DeepSeek V4 Flash, up to 32 tok/s on AMD Ryzen AI MAX+ 395'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9100b/deepseek_v4_flash_up_to_32_toks_on_amd_ryzen_ai/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-28T15:00:46.000Z'
fetched_at: '2026-07-29T11:01:19.465Z'
---
Hey fellow llamas. we have something new for Strix Halo owners we thought would be useful to share. i'll keep it short:
 We were able to fit DeepSeek V4 Flash plus its speculative draft on a single Ryzen AI MAX+ 395 with 128 GB of unified memory, and got it to a usable decode rate. 
 Blog post with all details here: https://www.lucebox.com/blog/deepseek-v4-strix-halo (code is open-source, Apache-2.0)
 We submitted the run to LocalMaxxing. On July 25th, its next-fastest DeepSeek V4 Flash entry for the Radeon 8060S was HipFire at 18.99 tok/s. The previous best in the site’s Ryzen AI Max 395 unified-memory group was DwarfStar at 15.6 tok/s.
 That puts our run 68.5% ahead of HipFire and at 2.05× the DwarfStar result. These are comparisons against the public LocalMaxxing entries shown above, not controlled A/B tests.
 ROCmFPX: fitting 284B weights into 128 GB
 ROCmFPX is not one quantization format. It is a family of block formats built around the AMD ROCm/HIP path. Each block holds 32 weights as packed low-bit codes plus one or two small scales. ROCmFP2 stores a block in 10 bytes, or 2.50 bits per weight; ROCmFP3 uses 3.50 bits per weight; and the fast ROCmFP4 layout uses 4.25.
 For DeepSeek V4 Flash, we added the missing 2-bit format and its HIP kernels, then built a Strix-specific mixed-precision recipe. The enormous routed-expert gate and up matrices use ROCmFP2, expert down projections use ROCmFP3, and dense or more sensitive projections keep ROCmFP4 or higher precision. We used an importance matrix during quantization and kept the model’s MTP head. The final 102.3 GB target works out to roughly 2.88 bits per parameter; the filename says ROCmFP2 because that is the dominant format, not because every tensor is 2-bit.
  
 Piece Measured configuration 
  
 Hardware Ryzen AI MAX+ 395, Radeon 8060S (gfx1151), 128 GB LPDDR5X 
  Target DeepSeek-V4-Flash-ROCMFP2-STRIX.gguf, 102.3 GB 
  Draft DeepSeek-V4-Flash-DSpark-draft-Q4RMFP4-denseF16.gguf, 11.3 GB 
  Runtime ROCm 7.2.4
