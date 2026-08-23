---
title: '[Paper] Stringological sequence prediction II'
url: >-
  https://www.alignmentforum.org/posts/TTei7oq9ndjJFgnsT/paper-stringological-sequence-prediction-ii
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-22T07:27:26.000Z'
fetched_at: '2026-07-26T11:01:26.197Z'
---
Abstract: In a previous paper, we began the study of sequence prediction algorithms adapted to stringological word complexity measures. One measure we considered was left-to-right (most-significant-digit-first) automaticity. Here, we show a statistically and computationally efficient algorithm adapted to the "dual" right-to-left (least-significant-digit-first) automaticity, which turns out to be substantially different for our purpose. We also demonstrate a prediction algorithm for a more expressive measure that we call "arithmetic repetition complexity". In particular, the latter can be used for predicting the so-called mix-automatic sequences.
This paper continues my sequence on the new approach to compositional learning, which started with "stringological sequence prediction I". Curiously, the ARC complexity measure I define here seems related[1] to my control-theoretic complexity measure for polytope MDPs, even though the initial motivation here came from a completely different automata-theoretic angle[2]. 

^
Specifically, concatenating words is similar to the "temporal" MDP composition 

mjx-math {
  display: inline-block;
  text-align: left;
  line-height: 0;
  text-indent: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 100%;
  font-size-adjust: none;
  letter-spacing: normal;
  border-collapse: collapse;
  word-wrap: normal;
  word-spacing: normal;
  white-space: nowrap;
  direction: ltr;
  padding: 1px 0;
}

mjx-container[jax="CHTML"][display="true"] {
  display: block;
  text-align: center;
  margin: 1em 0;
}

mjx-container[jax="CHTML"][display="true"][width="full"] {
  display: flex;
}

mjx-container[jax="CHTML"][display="true"] mjx-math {
  padding: 0;
}

mjx-container[jax="CHTML"][justify="left"] {
  text-align: left;
}

mjx-container[jax="CHTML"][justify="right"] {
  text-align: right;
}

mjx-msup {
  display: inline-block;
  text-align: left;
}

mjx-mi {
  display: inline-block;
  text-align: left;
}

mjx-c {
  display: inline-block;
}

