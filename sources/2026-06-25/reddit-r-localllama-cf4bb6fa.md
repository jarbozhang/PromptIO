---
title: >-
  llama.cpp's web UI now supports executing model generated JavaScript in the
  browser, through Web Workers (opt in)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uebknk/llamacpps_web_ui_now_supports_executing_model/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T12:02:38.000Z'
fetched_at: '2026-06-25T07:40:38.234Z'
---
A pull request adding a new run_javascript tool was merged into mainline a couple of weeks ago. I could not find any discussion about it here, or elsewhere for that matter. Maybe this has gone largely unnoticed (or maybe I suck at searching)? The feature does not seem to have been advertised much, and I only found it sort of by accident in the settings. In fact, I can only see it when using desktop Firefox, which could limit its visibility.
 I suppose this could be of limited interest to many, as most people interested in "agentic" anything will probably use specialized tooling for the purpose, but after a bit of experimentation, I have found it a pretty nice, lightweight option for letting a language model to run some code when conventional computation is called for. The code runs in a sandboxed iframe (sandbox="allow-scripts") which should come with pretty decent security guarantees. I would not be comfortable using it if there is any chance of a malicious prompt injection, but otherwise I have little problem with the approach.
 In the future, I would like to see clearer documentation of what is allowed inside the sandbox, and possibly the ability to adjust the limitations. Right now, for instance, network requests don't seem to succeed, but as far as I can tell, they are not explicitly disabled, and it would seem prudent to assume that they can be used for data exfiltration. Additionally, reviewing the code before allowing it to run is kind of a pain as it is passed as a JSON string inside a tool call. Getting a nicely formatted preview would be a considerable improvement, and will hopefully be considered at some point.
 Is anyone else using the new feature? I have not yet had much use for it, but I have a feeling that it will reduce my need to reach for tools other than Llama UI once more.
    submitted by    /u/Casual-Godzilla  
 [link]   [comments]
