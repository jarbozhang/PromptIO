---
title: >-
  There's something missing from the open vs. closed models debate that has been
  bothering me. The better analogy, to me, is managed vs. self-hosted
  infrastructure for AI. Maybe a co
source: X @leerob
url: 'https://x.com/leerob/status/2080673380336886212'
date: 'Fri Jul 24 15:16:05 +0000 2026'
likes: 609
reposts: 38
replies: 64
source_type: x
language: en
account_name: Lee Robinson
fetched_at: '2026-08-02T11:04:18.515Z'
---
There's something missing from the open vs. closed models debate that has been bothering me.

The better analogy, to me, is managed vs. self-hosted infrastructure for AI.

Maybe a company wants to use an open weight model because they want to do additional training on top, bringing their data and domain knowledge.

This requires software and services to do additional training (e.g. Tinker and friends) as well as to serve the model (e.g. SGLang). Not all of this software is open source today!

Once you have successfully trained a model with your enterprise data and expertise, you now need to deploy and serve it for customers. You can partner with an inference company to run the software and hardware. But if ownership was your primary concern, you still want to control the hardware and storage, and you now also need to run infra and secure GPU capacity.

There are other valid reasons to be open. In particular, the entire industry benefits when companies training models release data or research about their work. It also allows capitalism and free markets to do their thing, increasing competition and ultimately providing better options for customers. So we should all encourage openness.

The reason I prefer the managed vs. self-hosted infra framing is that we can learn from the past decade of cloud infrastructure. It's important and healthy to have both, and a great self-hosted alternative ultimately pushes the managed versions to innovate.

The decision to run infra then comes down to more standard business reasons: attracting talent, the cost and maintenance of the hardware, and the importance of uptime and reliability to the business.

Many businesses will say, actually, I don't want to staff and run a training and inference team, and I'm happy to pay API pricing for intelligence. And others will do the opposite and invest heavily here. We need both!

As an aside, the capability of open models will reach a point where we need to be very intentional about how they are deployed. But I think this problem is solvable, whether it is sharing research early and weights later, or also open sourcing the safety stack to properly serve the model. I don't have a perfect answer here but I think the ecosystem should figure it out together.

Full disclaimer, I work at a company which has released both open and closed models. There are probably people more knowledgable than myself of the open weights ecosystem. If that's you, curious if you disagree with any of this.
