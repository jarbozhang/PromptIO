---
title: >-
  Qwen 3.8 27b with DSH(DeepSeek Harness) is Amazing!! Experiences so far and
  perfomance.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vpv12b/qwen_38_27b_with_dshdeepseek_harness_is_amazing/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-16T11:50:57.000Z'
fetched_at: '2026-08-17T11:01:38.922Z'
---
https://preview.redd.it/wkg27e152qjh1.png?width=853&format=png&auto=webp&s=2e3f8b11ea6393041f501e95c5835f9bea0245dd
 So ive been trying different harnesses and coding agents with the new qwen 3.8 , and after trying out many ive been mostly impressed by deekseek harness , paired with qwen i get some mind blowing results , truly feels like i have something of value in my hands.
 It doesnt stop , it doesnt fail and it doesnt error. I have it running for 10 hours , even tho im at 90k contex it auto compresses on its own and doesnt loose track of where it was and what it was doing.
 10mil input tokens it has gone thro , it does not diviate from its goal and oneshots every problem.
 The only downside is ofcourse speed , when the contex grows and i have my card running at 230w (rtx 3090) , i get around 37tok/s avarage. In clean new prompt i get around 50 , and in unsloth studio on new chat window i get around 56-60 tk/s.
 The quant im using is UD q4 k xl + vision F16 and contex is set at 92k , MTP + ngram enabled , GPU layers set to 66 no CPU offloading.
 The way thinking works from what ive gathered as info around this sub , by default atleast in llama.ccp it is using xHigh thinking , thats why i have such a amazing results but it does indeed think for a lot , sometimes it would think for 20mins before writing anything. Im not sure how can i adjust the thinking but im fine with xHigh and waiting for a bit longer.
 What i need right now and i pray to qwen gods , is the 35b moe model , it is just not feasable to run this dense model 24/7 as my companion agent (even tho my GPU is pretty good). Being dense means no cpu offloading , it only really works on 16GB + vmemory , preferebly you want a blackwell gpu , i heard folks with 5090 and vllm can do 150-200 tk/s.
    submitted by    /u/cviperr33  
 [link]   [comments]
