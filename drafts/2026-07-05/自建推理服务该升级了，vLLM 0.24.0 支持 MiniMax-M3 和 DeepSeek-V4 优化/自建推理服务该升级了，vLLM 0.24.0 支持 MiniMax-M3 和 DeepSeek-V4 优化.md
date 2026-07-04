---
title: 自建推理服务该升级了，vLLM 0.24.0 支持 MiniMax-M3 和 DeepSeek-V4 优化
status: draft
date: '2026-07-05'
source: manual
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.24.0
angle: >-
  面向已经在自建推理服务的读者，整理 MiniMax-M3 新支持、DeepSeek-V4 优化、ROCm/FP8/KV cache
  等变化怎么影响升级窗口。读者可以据此决定先在测试环境跑哪几个模型和指标。
voice: analytical
content_lane: model-deployment
content_archetype: version_brief
diversity_note: title_pattern_repeat_in_batch,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - vLLM
  - 模型部署
  - 推理服务
  - MiniMax-M3
  - DeepSeek-V4
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 自建推理服务该升级了，vLLM 0.24.0 支持 MiniMax-M3 和 DeepSeek-V4 优化
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.07
reach_note: vLLM、DeepSeek、MiniMax 都有识别度，升级动作明确，适合部署读者立刻验证。
selection_reason: 这不是普通 release 摘要，而是能直接影响推理服务升级、模型支持和硬件后端选择的版本变化。
---

# 自建推理服务该升级了，vLLM 0.24.0 支持 MiniMax-M3 和 DeepSeek-V4 优化

如果你已经在用 vLLM 扛在线推理，0.24.0 最该看的不是又多了几个模型。更实际的问题是，测试环境该把哪些模型、哪些硬件路径、哪些延迟指标重新跑一遍。

这次 release 有 571 个 commits，来自 256 位贡献者，其中 77 位是新贡献者。改动密度不低，但对自建服务最有价值的线索集中在三块，MiniMax-M3 正式支持，DeepSeek-V4 又做了一轮推理链路优化，ROCm、FP8、键值缓存 KV cache 的边角问题继续被补齐。

升级窗口不该按版本号决定。该按你现在的瓶颈决定，模型能不能进池，prefill 和 decode 是否稳定，AMD、XPU、新 NVIDIA 架构上的收益是否足够覆盖回归成本。

## 把旧问题压回测试环境

自建推理服务的老问题不是跑不起来，而是新模型一进池，量化、MoE、attention kernel、KV cache、前端接口会一起变成变量。

vLLM 0.24.0 的更新正好落在这些变量上。MiniMax-M3 新增支持，DeepSeek-V4 继续优化，Model Runner V2 默认支持量化模型，Streaming Parser Engine 统一了不同模型的 tool-call 和 reasoning 解析。

可以把这次升级看成一次推理栈体检，而不是单点功能更新。

| 方向 | 0.24.0 的变化 | 测试环境该看什么 |
| --- | --- | --- |
| MiniMax-M3 | 新增模型支持，跟进 BF16、FP8 indexer、MXFP4、FP8 sparse GQA | 能否进入候选模型池，量化路径是否稳定 |
| DeepSeek-V4 | FlashInfer sparse index cache 带来 2% 到 4% TTFT 优化，prefill chunk-planning 带来 4% E2E throughput 优化 | 首 token 延迟、端到端吞吐、低延迟 decode |
| ROCm 和 AMD | gfx950、MI300X、FP8 KV cache、packed-modules mapping 等路径继续补齐 | AMD 集群是否值得单独排升级窗口 |
| Model Runner V2 | 量化模型默认支持，GraniteMoE 默认启用，Qwen 和 DeepSeek-V2 MoE 迁移 | 旧配置迁移风险和回归面 |
| Rust frontend | API-key authentication、CORS、/tokenize、/detokenize | 前端接入和网关边界是否能简化 |

## 让 MiniMax-M3 先进入候选池

MiniMax-M3 的重点不是名字出现在支持列表里，而是后续跟进很快。vLLM 0.24.0 同时出现了 BF16、FP8 indexer via MSA、MXFP4、FP8 sparse GQA，以及一组 AMD 和 ROCm 调优。

这对自建服务有一个直接影响，MiniMax-M3 可以从观察名单移到测试名单。尤其是你本来就在做 MoE、稀疏注意力或低精度推理，不能只测能否启动，要把索引器、量化、attention 路径一起纳入回归。

MiniMax-M2 的 perf regression 也在这个版本修了。已经接过 M2 的团队，可以把 M2 回归和 M3 验证放在同一个测试窗口里，减少重复开销。

## 对 DeepSeek-V4 重跑延迟曲线

DeepSeek-V4 的更新更像成熟期优化。release note 里给了两个可以直接进入测试表的数字，FlashInfer sparse index cache 对 TTFT 有 2% 到 4% 优化，prefill chunk-planning 对 E2E throughput 有 4% 优化。

不要把这两个百分比直接搬进生产预期。更稳的做法是重跑你自己的三段曲线，低并发下看 TTFT，高并发下看端到端吞吐，长上下文下看 KV cache 和显存行为。

这次还有 cluster-cooperative topK kernel、contiguous per-block KV allocations、TEP=16 for the block-FP8 shared expert、SM100 上 next_n 大于 2 的 native DSA indexer decode。DeepSeek-V4 也启用了 SM120，并补了 XPU 和 ROCm 的 attention、MoE 路径。

如果你的瓶颈已经从模型能力转到推理稳定性，这些改动比新模型名字更值得排期。

## 判断哪类集群该先动

优先升级验证的，不是所有 vLLM 用户，而是已经遇到这些场景的团队。

正在评估 MiniMax-M3 或 DeepSeek-V4 的服务，应该先动。模型刚进入支持窗口时，最容易暴露的不是接口问题，而是量化、prefill、decode 和 cache 的组合问题。

AMD MI300X、ROCm、gfx950 路径上的服务，也应该先动。0.24.0 明确补了 mxfp8 MoE、linear、fp8_per_channel、FP8 KV cache fix 等路径，这些变化可能直接影响硬件利用率和稳定性。

已经把 vLLM 当作 agent 后端的团队，也值得看 Streaming Parser Engine。它统一 tool-call 和 reasoning parsing，并覆盖 Qwen3、MiniMax-M2、GLM-4.7、GLM-5.1、GLM-5.2、Nemotron V3。agent 应用最怕模型一换，工具调用解析也跟着变形，这类底层统一比表面功能更关键。

如果你只跑稳定 dense 模型，硬件路径单一，也没有 tool-call 解析压力，可以晚一点。0.24.0 很大，但不等于每个服务都要立刻上生产。

## 给升级窗口一个明确口径

我的判断是，vLLM 0.24.0 的价值不在单个亮点，而在它把新模型、低精度、MoE、ROCm、多前端能力继续推向可运维。

测试环境可以设成三组对象。第一组跑 MiniMax-M3，确认模型支持、量化、attention 路径。第二组跑 DeepSeek-V4，记录 TTFT、E2E throughput、decode latency、KV cache 显存行为。第三组跑你当前线上主模型，确认 MRv2、Rust frontend、parser 相关改动没有带来回归。

信息来自 GitHub release，落地前建议用同一批 prompt、同一组并发量、同一套采样参数复跑。升级 vLLM 最怕只看新模型能不能启动，真正影响服务质量的，往往是首 token、长上下文和高并发下的细节。

这次值得做的动作很明确，把 0.24.0 放进 shadow 环境，不急着替换线上，把 MiniMax-M3、DeepSeek-V4 和现有主模型的指标先跑成一张表。表出来以后，升级窗口自然会自己说话。

## 相关链接

- [vLLM v0.24.0 Release Notes](https://github.com/vllm-project/vllm/releases/tag/v0.24.0)
- [vLLM GitHub 仓库](https://github.com/vllm-project/vllm)
- [vLLM 官方文档](https://docs.vllm.ai/)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
