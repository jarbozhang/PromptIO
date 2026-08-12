---
title: 'New Muse-Glimmer-30B SoTA Quants - hopefully a new lineup :)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vm2116/new_museglimmer30b_sota_quants_hopefully_a_new/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-12T02:49:13.000Z'
fetched_at: '2026-08-12T11:01:19.738Z'
---
Hey Folks,
 I've been making quants for a while - recently I took a short break to get into hardcore research (submitted my first EMNLP paper during it!). Along the way, I built up a little arsenal of quant-optim techniques: everything from novel, paper-pending tricks to some genuinely sick tensor-mapping algos.
 I threw some of the secret sauce into the newly released Muse Glimmer 30B (META IS BACK!) and compared it to several OGs. I'm honestly shocked by how it never loses to any quant out there in every single VRAM class!
 One of the coolest ones is my Q8 quant, it is smaller than UD-Q8_K_XL and 21% closer to BF16.
 Full methodology is on the card - eval setup, CIs, held-out slices, the lot. Happy to answer questions in the comments.
 Model: https://huggingface.co/AaryanK/Muse-Glimmer-30B-GGUF
 I still had headroom left but ran out of compute credits :( Being a solo undergrad sophomore, I can't exactly spend H100 money that often, which is why the "hopefully" in the title :)
 I'm looking for internships in AI agent orchestration and model inference. If this work looks relevant to your team: linkedin.com/in/theaaryankapoor
 I plan on doing a write-up soon to describe some of the secret sauce!
 https://preview.redd.it/yzf6n2fyuuih1.png?width=1860&format=png&auto=webp&s=aa8b615918c447001f816f891e7f52d758c72548
 https://preview.redd.it/tgkxp30wuuih1.png?width=1920&format=png&auto=webp&s=366cf095528f9c2cd8ca7aa3e8d49a946085b374
 https://preview.redd.it/0rcl5o70vuih1.png?width=1980&format=png&auto=webp&s=e1fddd2f83e395198fb75e37145d7eaadd72a916
 Better inference to you!
    submitted by    /u/KvAk_AKPlaysYT  
 [link]   [comments]
