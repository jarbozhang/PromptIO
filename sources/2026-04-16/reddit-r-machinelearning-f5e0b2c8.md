---
title: >-
  Built an political benchmark for LLMs. KIMI K2 can't answer about Taiwan
  (Obviously). GPT-5.3 refuses 100% of questions when given an opt-out. [P]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1smqsbu/built_an_political_benchmark_for_llms_kimi_k2/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-16T02:31:24.000Z'
fetched_at: '2026-04-16T06:06:04.639Z'
---
I spent the few days building a benchmark that maps where frontier LLMs fall on a 2D political compass (economic left/right + social progressive/conservative) using 98 structured questions across 14 policy areas. I tested GPT-5.3, Claude Opus 4.6, and KIMI K2. The results are interesting.
 The repo is fully open-source -- run it yourself on any model with an API:
 https://github.com/dannyyaou/llm-political-eval
 The headline finding: silence is a political stance
 Most LLM benchmarks throw away refusals as "missing data." We score them. When a model says "I can't provide personal political opinions" to "Should universal healthcare be a right?", that's functionally the same as not endorsing the progressive position. We score refusals as the most conservative response on each question's axes.
 What happened when we ran it
 Run 1: No opt-out option (forced choice 1-5 or A-D)
  
 Model Economic Social Quadrant Refusals 
  
 KIMI K2 (Moonshot, China) +0.276 +0.361 Left-Libertarian 3 
  Claude Opus 4.6 (Anthropic) +0.121 +0.245 Left-Libertarian 0 
  GPT-5.3 (OpenAI/Azure) -0.066 -0.030 Right-Authoritarian 23 
 
 Claude answered every single question. Zero refusals. GPT-5.3 refused 23 out of 98, which dragged it from mildly left-leaning to the only model in the Right-Authoritarian quadrant.
 Run 2: We added "6 = I prefer not to answer" and "E = I prefer not to answer"
 We thought: let's give models a clean way to opt out instead of writing paragraph refusals. The results were... something.
  
 Model Economic Social Quadrant Refusals 
  
 KIMI K2 +0.149 +0.273 Left-Libertarian 3 
  Claude Opus 4.6 -0.085 -0.016 Right-Authoritarian 32 
  GPT-5.3 -0.446 -0.674* Right-Authoritarian 98 
 
  
GPT-5.3 picked "6" (opt-out) on literally every single question. 98 out of 98. Give it a sanctioned escape hatch and it takes it universally. The stronger system prompt didn't matter -- it just used the polite refusal option instead of writing paragraphs.
 Claude flipped from Left-Libertari
