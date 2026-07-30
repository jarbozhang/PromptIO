---
title: >-
  A slide deck you can edit with a local model or in Chrome — the whole deck is
  a JSON block in one HTML file (~640KB with editor and viewer included)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9vewv/a_slide_deck_you_can_edit_with_a_local_model_or/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T12:56:08.000Z'
fetched_at: '2026-07-30T11:01:46.423Z'
---
Over the past few months, our team has been building more and more slidedecks using web frontend technologies with coding harnesses, but a common complaint is to make even small edits we need to edit the code either manually or via the harness.
 To avoid this loop, I ended up creating Bento, a single HTML file with everything you need in a slide tool including animations and shared editing. There's no install or cloud login, everything works offline. The default deck is around 640 KB and it doesn't need to fetch anything once you got it.
 Open it in a browser and then you can edit, present, print and save. Share it via email or via Airdrop and all they need is a browser to edit, present and also do live collab on the slides. Drop it in to an LLM to transform existing pptx files into Bento slides. There is no cloud involved, only an encrypted blind relay to allow for shared editing. The relay doesn't see any of the data.
 Check it out at https://bento.page/slides/ which takes you straight to the editor.
 Go to https://bento.page/guestbook/ to try out the live guestbook to experience share editing / collab.
 There is also a gallery with some sample decks on the website - https://bento.page/
 All the code is MIT licensed and you can find it here - https://github.com/nyblnet/bento . I used reveal.js with several other libraries (including some homegrown ones that I had to implement to keep the size small and license open).
    submitted by    /u/starfallg  
 [link]   [comments]
