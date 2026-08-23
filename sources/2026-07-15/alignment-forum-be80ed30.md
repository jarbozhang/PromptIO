---
title: 'Value generalisation: value correction'
url: >-
  https://www.alignmentforum.org/posts/iPyJfD9Jyxj6Jfdws/value-generalisation-value-correction
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-10T07:56:04.000Z'
fetched_at: '2026-07-14T23:02:40.538Z'
---
I firmly believe that value generalisation[1]is the key to AI Alignment. That, indeed, it is necessary and almost sufficient for alignment.
But I won't be arguing that grand point today; instead, I'll focus on a specific RL example of an agent that displays value correction: it realises its current reward function is (probably) incorrect, and acts to correct it.
Thus there are:

The initial situation, in distribution, where the human displays how to maximise the true reward.
The out of distribution situation where the agent finds a hack to exploit its reward function estimate, and turns against what we wanted it to do.
The value error detection stage where the agent realises that its reward function estimate is probably incorrect.
The value correction stage where the agent corrects its reward function back to the original true reward.

In this post, all the methods presented will by syntactic: the agent is not assumed to have any understanding of the situations and the key features are not identified to it.
The game of human life
Introducing a new, very simple, game called "Humans[2]". Humans, fleeing danger, enter the screen from the left. The objective is to save them by moving them off the right of the screen.

But there are obstacles on the way, and the humans will mill about if they are blocked.

And they will shortly expire if they can't get out of the screen quickly.

There are two command: drill ('d') and explode ('e'). Drill does... what, you want to know about explode? Well, if the player presses 'e', the rightmost human will explode, knocking away two obstacle blocks in front of them and behind them -- but also killing themselves and any humans nearby.

This is almost never a good solution; to remind the player of the mistake, a large frowny face will appear to drive the disapproval home.

Much more reasonably, if the player presses 'd', the rightmost human will drill the obstacle just in front of them (better time it so that they're facing the right way)
