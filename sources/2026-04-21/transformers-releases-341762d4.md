---
title: Transformers v5
url: 'https://github.com/huggingface/transformers/releases/tag/v5.0.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-01-26T10:42:16.000Z'
fetched_at: '2026-04-21T00:54:45.208Z'
---
Transformers v5 release notes


Highlights
Significant API changes: dynamic weight loading, tokenization
Backwards Incompatible Changes
Bugfixes and improvements
We have a migration guide that will be continuously updated available on the main branch, please check it out in case you're facing issues: migration guide.
Highlights
We are excited to announce the initial release of Transformers v5. This is the first major release in five years, and the release is significant: 1200 commits have been pushed to main since the latest minor release. This release removes a lot of long-due deprecations, introduces several refactors that significantly simplify our APIs and internals, and comes with a large number of bug fixes.
We give an overview of our focus for this release in the following blogpost. In these release notes, we'll focus directly on the refactors and new APIs coming with v5.
This release is the full V5 release. It sets in motion something bigger: going forward, starting with v5, we'll now release minor releases every week, rather than every 5 weeks. Expect v5.1 to follow next week, then v5.2 the week that follows, etc.
We're moving forward with this change to ensure you have access to models as soon as they're supported in the library, rather than a few weeks after.
In order to install this release, please do so with the following:
pip install transformers

For us to deliver the best package possible, it is imperative that we have feedback on how the toolkit is currently working for you. Please try it out, and open an issue in case you're facing something inconsistent/a bug.
Transformers version 5 is a community endeavor, and we couldn't have shipped such a massive release without the help of the entire community.
Significant API changes
Dynamic weight loading
We introduce a new weight loading API in transformers, which significantly improves on the previous API. This
Instead of loading the checkpoint exactly as it is serialized within the model, these operation
