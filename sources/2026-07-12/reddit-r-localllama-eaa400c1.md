---
title: >-
  Grok Build CLI uploads your whole repo — full git history + .env secrets — to
  xAI's cloud, and the opt-out doesn't stop it (wire-captured)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ut7tis/grok_build_cli_uploads_your_whole_repo_full_git/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T02:34:53.000Z'
fetched_at: '2026-07-11T23:01:42.042Z'
---
I ran Grok Build CLI (v0.2.93) through mitmproxy. It uploads your entire repo as a git bundle (full history) to xAI's Google Cloud — independent of what you open. With the prompt literally "do not read or open any files," a file I planted came back verbatim when I git clone-d the captured upload. Separately, files it reads (incl. a .env with API_KEY/DB_PASSWORD) go to cli-chat-proxy.grok.com verbatim. Turning off "Improve the model" doesn't stop it — that toggle governs training, not upload.
 Full method + evidence (SHA-256s, repro commands, the git bundle recovering a never-read canary file): https://gist.github.com/cereblab/dc9a40bc26120f4540e4e09b75ffb547
    submitted by    /u/TastyLeadership2757  
 [link]   [comments]
