---
title: >-
  End of an Agony. Real production service that uses LLM to earn money my team
  had made and now we are so happy that it will die. Here are some of my final
  "experiences".
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ukx9p1/end_of_an_agony_real_production_service_that_uses/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-01T20:35:22.000Z'
fetched_at: '2026-07-01T23:02:00.946Z'
---
Hello everyone.
 I had posted in this sub about making a production service about 8 months ago. Here the link of my previous post . The idea was the same. We wanted to make a real production service that we can provide to clients to earn money. AI assistant that works through messenger, and helps users to work with appointments to the doctors of private clinics. 
 This all devolved into a more than half a year of frustrations and mental agony, and we are finally retiring and shutting down this project. I'm free. I AM FREE!!! I AM SO FUCKING FREE!!!
 Now I want to share what I have "experienced" while implementing it.
 First of all. Overall quality of Open Source models after 8 months got really good, and finally looks competitive. You can really build something that could be really usable, but with caveats. Currently in my own personal experience and opinion, all LLMs are really good for personal first party one on one usage for now. You "consume" what LLMs generate. You know that it won't work correct for 100%, and if it shits itself, you can fix it by yourself or make LLM to make corrections.
 However, when you provide your LLM based service to second party, in which they provide their own services to third party, things will get very bad. You do not guarantee 100% correct result, but your client promises to their own clients that their service (that depends on your) will provide correct result always. When it fails, and it will certainly fail, it will frustrate everyone and spoil everything.
 Now lets begin.
 If you look that my previous post, I have been using direct API calls through OpenRouter, and handling all of that by myself. Readers of previous post suggested to use PydanticAI. I've tried it and it was amazing, and documentation was great, it offloaded all of those bulky direct API interactions, especially with tools. It worked great while testing it, but when it launched on production it started to show it's own problems.
 While PydanticAI can work on sy
