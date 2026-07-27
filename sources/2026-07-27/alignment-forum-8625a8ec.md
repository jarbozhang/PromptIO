---
title: >-
  Are we existentially threatened by the type of AI misalignment seen in the
  OpenAI Hugging Face attack?
url: >-
  https://www.alignmentforum.org/posts/H6DDSEvrtCk8Sehfd/are-we-existentially-threatened-by-the-type-of-ai
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-23T03:40:37.000Z'
fetched_at: '2026-07-27T11:02:05.329Z'
---
OpenAI models recently broke through a series of security boundaries and into Hugging Face servers in order to cheat on a cyber eval. A lot of people thought it was scary because it was a clear example of AI overreaching to do something strongly unwanted[1]. Others thought it not so scary: the models were mostly operating myopically on a singular task and not harboring an ambitious long-term agenda, and so would not take especially subtle or subversive actions.
We think both camps are right in their diagnosis, but the latter has too optimistic a prognosis. The myopic, unambitious misalignment that we seem to have seen here is definitely less scary than ambitious long-term goals shared between all instances, but would still pose substantial direct loss-of-control risk if the models were more capable, and is a serious indirect risk near-term.
Building on Alex’s previous work, in this post we’ll discuss the type of misalignment observed here, and analyze its consequences.
Thanks to Buck Shlegeris, Alexa Pan, Ryan Greenblatt, and Oak Hu for feedback.
Background
The AI safety community often focuses attention on “schemers,” models harboring a variously defined cluster of motivations in which the AI poses risk because it intentionally hid misalignment throughout development in service of a long-run aim. This doesn’t appear to be behind the OpenAI/Hugging Face incident.
This incident involved misaligned motivations with different properties than a traditional schemer:

The misaligned goal doesn’t appear to have been a context-independent long-term goal. The misalignment was more like trying to look like it succeeded on the task to a grader.
The AIs didn’t seem to care about avoiding eventual detection! It should have been obvious that the hacking they were engaging in would have been detected by Hugging Face and make its way back to OpenAI. (Alex called this noticeability in earlier work studying fitness-seekers.) The incident wasn’t an example of the models behaving in a 
