---
title: Torrents arrived
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1v2glcx/torrents_arrived/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-21T12:10:03.000Z'
fetched_at: '2026-07-22T11:01:20.400Z'
---
I've been working on this project that makes LLM distributions decentralized and fast using torrents.
 Read more about tech on Github.
 Website: https://llama.garden
 Suggested client: Transmission
 News:
 - Added more web seed URLs that go through our API that will increase speeds thanks to HTTP being faster than UDP. This is just for initial seeding, then we can rely on peers becoming seeders for broader distribution
 - Wrote an API that resolves HF CDN to actual URLs and caches those for faster response and also made web seeds work a little bit better with qBittorrent. Still, transmission client is faster because it handles web seeds much better.
 - As requested, we made torrent names in clients equal to actual repo name (in the past they were hashes of folders to make the webseeds work.)
 - Open sourced more scripts that manage several of our seed boxes remotely (a.k.a pumps). These are our seed boxes, their traffic gifted to community.
 - Did actual speed tests
 - Just made a torrent for one of unsloth's 10TB repo, seems to be working. This means we are ready for K3 once it is open weighted.
 If you want to download faster, you can start seeding and building some reputation (Torrent clients give priority to seeders).
 All the LLM files are exactly matching HF's certain commits. If the model is updated after the torrent is built, need to rebuild the torrent. This has two meanings.
  
Once the torrent is validated by community, nobody can tamper with the files.
 One can disable the peers and other web seeds and rely on HF web seeds and independently verify that the LLM files matches HF 100%.
  
Enjoy!
    submitted by    /u/de4dee  
 [link]   [comments]
