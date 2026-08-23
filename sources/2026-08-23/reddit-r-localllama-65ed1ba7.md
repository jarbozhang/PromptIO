---
title: >-
  I fine tuned Gemma 4 12B for a 2.7x improvement on tool calling because I
  can't fit anything else comfortably into my 16 GBs of Vram
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvtu9z/i_fine_tuned_gemma_4_12b_for_a_27x_improvement_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T01:30:21.000Z'
fetched_at: '2026-08-23T11:01:37.691Z'
---
Gemma 12B is obviously a very well trained model, I always thought the fine tuning they did on it wasn't really cut out for agentic coding. From my own experiences it struggles to use the tools it's given from Github Copilot and is also very inept at the cli too.
 So I thought I'd kill two birds with one stone and fine tune it for tool call use and the command line. Not only did I see an improvement on tool usage I also saw a 15.7% increase in the number of tool calls it tries to emit which is great since it means the model gets to work more instead of getting too lost in it's reasoning.
 I have fp16 -> Q4_K_M weights uploaded and ready for use with llama.cpp or ollama
    submitted by    /u/TheOneWhoWil  
 [link]   [comments]
