---
title: Mechanistic estimation for wide random MLPs
url: >-
  https://www.alignmentforum.org/posts/fsG4m6sRMpomd7Rk6/mechanistic-estimation-for-wide-random-mlps
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-07T16:20:52.000Z'
fetched_at: '2026-05-19T07:52:38.654Z'
---
This post covers joint work with Wilson Wu, George Robinson, Mike Winer, Victor Lecomte and Paul Christiano. Thanks to Geoffrey Irving and Jess Riedel for comments on the post.
In ARC's latest paper, we study the following problem: given a randomly initialized multilayer perceptron (MLP), produce an estimate for the expected output of the model under Gaussian input. The usual approach to this problem is to sample many possible inputs, run them all through the model, and take the average. Instead, we produce an estimate "mechanistically", without running the model even once. For wide models, our approach produces more accurate estimates, both in theory and in practice.
Paper: Estimating the expected output of wide random MLPs more efficiently than sampling
Code: mlp_cumulant_propagation GitHub repo
We are excited about this result as an early step towards our goal of producing mechanistic estimates that outperform random sampling for any trained neural network. Drawing an analogy between this goal and a proof by induction, we see this result as (part of) the "base case": handling networks at initialization. We have a vision for the "inductive step", although we expect that to be much more difficult.
Summary of results
In our paper, we consider MLPs 

mjx-msub {
  display: inline-block;
  text-align: left;
}

mjx-TeXAtom {
  display: inline-block;
  text-align: left;
}

mjx-msup {
  display: inline-block;
  text-align: left;
}

mjx-mrow {
  display: inline-block;
  text-align: left;
}

mjx-mtext {
  display: inline-block;
  text-align: left;
}

mjx-mfrac {
  display: inline-block;
  text-align: left;
}

mjx-frac {
  display: inline-block;
  vertical-align: 0.17em;
  padding: 0 .22em;
}

mjx-frac[type="d"] {
  vertical-align: .04em;
}

mjx-frac[delims] {
  padding: 0 .1em;
}

mjx-frac[atop] {
  padding: 0 .12em;
}

mjx-frac[atop][delims] {
  padding: 0;
}

mjx-dtable {
  display: inline-table;
  width: 100%;
}

mjx-dtable > * {
  font-size: 2000%;
}

mjx-dbox {
  displ
