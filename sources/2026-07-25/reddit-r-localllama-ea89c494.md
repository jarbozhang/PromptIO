---
title: I'm impressed by Laguna S 2.1
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5qb9b/im_impressed_by_laguna_s_21/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-24T22:33:26.000Z'
fetched_at: '2026-07-25T11:01:40.186Z'
---
Being excited about a new 120B-class model, I decided to test it on a problem that took me a few days to solve. The problem is to rearrange the data from one representation to another but do it within a fixed memory budget without dynamic allocations.
 The latter condition makes it difficult to decompose the solution into steps because storing data wrong in the early stages leaves no room later.
 Local Qwen models (3.5-122B-A10B UD-IQ4_XS and 3.6-27B UD-Q4_K_XL) fail on that problem. Laguna generated 60k+ thinking tokens before getting to code but eventually managed to write a code that passed the tests, albeit using one dirty hack in the form of packing two smaller integers into one 64-bit value (potentially, but unlikely, both could be >32bit, then the algorithm fails).
 As another post says, such long thinking might be unsuitable for common coding tasks but for hard problems, debugging and review it's good to have such a thorough-thinking model in such a small size.
 The testing is done with the settings
 rope-scaling = yarn rope-scale = 32 yarn-orig-ctx = 8192 yarn-attn-factor = 1.0 
 The problem itself is:
  
Original data, id, is an array of integers representing root nodes of clusters from a Union-Find data structure, and the total number of clusters Nc. The root node of a cluster is the smallest index of element belonging to that cluster.
 the worst-case scenario, the number of clusters is roughly the same as the number of items in id (an expected situation is that there is one or two large clusters and the rest are disconnected elements, so that Nc = O(N)).
 I need to convert it to an array list which has the following structure:
 - list[1]: Nc, number of clusters
 - list[2:Nc+1]: starting indices of the clusters in list
 - list[Nc+2]: length(list) + 1, a sentinel "starting index" of the Nc+1th cluster
 - list[list[2]:list[3]-1]: indices of the elements in id that belong to the 1st cluster
 - ... etc to the end of the list
 id must be modified so that the c
