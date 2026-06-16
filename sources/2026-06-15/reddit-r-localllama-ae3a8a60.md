---
title: >-
  Storing an index to a scale instead of the scale itself with Q4_0 quant
  reduces scale size by ~31% (small gain but interesting)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u56gdy/storing_an_index_to_a_scale_instead_of_the_scale/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T00:21:48.000Z'
fetched_at: '2026-06-14T23:18:17.963Z'
---
I've been having some fun looking at pre and post quant weights to try to identify some unique ideas on saving space or increasing accuracy.
 I was originally looking at duplicate weights to determine if there's potential for trading a bit to signal duplicates when I noticed that there are many scale values duplicated in the file. This probably isn't universal, but it does seem true for Qwen 3.5 2B and Qwen 3.6 27B ( I checked both).
 TLDR: Seems like we could save a minimum of 318MB on Qwen 3.6 27B Q4 but it requires some custom code for inference.
 Here's some napkin (notepad) math:
  
qwen 3.6 27b at q4_0 is ~15GB
 has 64 layers 
 Each sub-layer below is 47.8 MB 
 ffn_down 89,128,960 weights
 ffn_gate 89,128,960 weights
 ffn_up 89,128,960 weights
 
 
  
Note there are more sub layers which means there's opportunity for more space to be reclaimed but I am keeping this short for the example. Also, I am intentionally using q4_0 because it's simpler to reason about. But I don't see why this wouldn't work for q4_k too.
 Since each 32 weights gets its own scale we need to find out how many blocks of 32 weights we have. Each block holds a 16 bit (BF16) scale.
 89,128,960 / block size (32) is 2,785,280 scales
 2,785,280 * 16 = 44,564,480
 Which means 44,564,480 bits dedicated to scales, that's 5,570,560 bytes (~5.31MB) per sub-layer
 When we check the values used by the scales we find that there are a lot of duplicates. It ranges from 1,000-1,800 unique scales. So we could just replace these scale values with an index from 0-2047. So instead of spending 16 bits we spend 11 bits PER scale.
 Those 11 bits point to the array of scales stored in VRAM. That array of scales is 16 * 2048 = 32,768 bits. That means there's a very small amount of space needed for this to work.
 So how much space could be saved?
 2,785,280 * 11 = 30,638,080 bits is what we'd spend on the scales instead of 44,564,480 bits.
 Divide by 8 to get to bytes, of course. So with using 11 bit scales we're sp
