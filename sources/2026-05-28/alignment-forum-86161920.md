---
title: Mechanistic estimation for expectations of random products
url: >-
  https://www.alignmentforum.org/posts/7RyAefESvb6BQ3tMz/mechanistic-estimation-for-expectations-of-random-products
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-15T16:50:43.000Z'
fetched_at: '2026-05-28T03:16:29.151Z'
---
We have developed some relatively general methods for mechanistic estimation competitive with sampling by studying problems that are expressible as expectations of random products. This includes several different estimation problems, such as random halfspace intersections, random #3-SAT and random permanents. In this post, we will give a high-level introduction to these methods before sharing some more detailed notes. This is intended as an interim technical update and will be relatively light on motivation: for a broader discussion of this line of research, see our prior post.
Random instances of the matching sampling principle
All of the problems discussed in this post can be thought of particular choices of "architecture" 


mjx-container[jax="CHTML"] {
  line-height: 0;
}

mjx-container [space="1"] {
  margin-left: .111em;
}

mjx-container [space="2"] {
  margin-left: .167em;
}

mjx-container [space="3"] {
  margin-left: .222em;
}

mjx-container [space="4"] {
  margin-left: .278em;
}

mjx-container [space="5"] {
  margin-left: .333em;
}

mjx-container [rspace="1"] {
  margin-right: .111em;
}

mjx-container [rspace="2"] {
  margin-right: .167em;
}

mjx-container [rspace="3"] {
  margin-right: .222em;
}

mjx-container [rspace="4"] {
  margin-right: .278em;
}

mjx-container [rspace="5"] {
  margin-right: .333em;
}

mjx-container [size="s"] {
  font-size: 70.7%;
}

mjx-container [size="ss"] {
  font-size: 50%;
}

mjx-container [size="Tn"] {
  font-size: 60%;
}

mjx-container [size="sm"] {
  font-size: 85%;
}

mjx-container [size="lg"] {
  font-size: 120%;
}

mjx-container [size="Lg"] {
  font-size: 144%;
}

mjx-container [size="LG"] {
  font-size: 173%;
}

mjx-container [size="hg"] {
  font-size: 207%;
}

mjx-container [size="HG"] {
  font-size: 249%;
}

mjx-container [width="full"] {
  width: 100%;
}

mjx-box {
  display: inline-block;
}

mjx-block {
  display: block;
}

mjx-itable {
  display: inline-table;
}

mjx-row {
  display: table-row;
}

mjx-row > * {
  dis
