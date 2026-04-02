---
title: "feat: Add viral content engine post-generation gates"
type: feat
status: completed
date: 2026-04-02
origin: ~/.gstack/projects/hamburg/ceo-plans/2026-04-01-viral-content-engine.md
---

# feat: Add viral content engine post-generation gates

## Overview

Add three post-generation quality gates to the Hamburg AI content pipeline: title scoring, gold quote extraction, and summary generation. Rewrite the article generation prompt with viral WeChat writing formulas. Fix existing gitCommit command injection bug and scoring weight inconsistency.

The design principle is "内容实操 + 包装爆款": practical content core stays unchanged, viral formulas only optimize the packaging layer (titles, hooks, structure, quotes).

> **Terminology note:** "Gate" in this plan means a non-blocking enrichment step that degrades gracefully on failure (field omitted from frontmatter), not a blocking quality checkpoint.

## Problem Frame

The current pipeline generates solid technical articles but with no optimization for WeChat distribution. Articles lack:
- Multiple title candidates with quality scoring
- Shareable quotes for WeChat Moments forwarding
- Suspense-driven summaries for feed click-through
- Viral writing structure (short paragraphs, emotion rhythm, calls to action)

This is Phase 1 of the Viral Content Engine plan, focused on prompt rewriting and post-gen gates. Phase 2 (publish pipeline) and Phase 3 (data-driven optimization) are deferred.

## Requirements Trace

- R1. Rewrite `config/prompts/wechat.md` with viral writing formulas (1000-1800 words, suspense opening, scene immersion, short paragraphs, emotion rhythm, call to action)
- R2. Generate 3 candidate titles per article, score them via LLM, pick highest score, store alternatives in frontmatter
- R3. Extract a shareable gold quote (<50 Chinese chars, opinionated) per article
- R4. Generate a suspense-driven summary per article
- R5. Run all 3 gates in parallel via `Promise.allSettled`, each gate non-blocking (failed gate = field omitted from frontmatter)
- R6. Unify scoring weights: `scoring.md` is source of truth (`novelty * 0.4 + practicality * 0.35 + depth_potential * 0.25`), update CLAUDE.md to match
- R7. Fix gitCommit() command injection vulnerability (use `execFileSync` instead of string interpolation)
- R8. Preserve `original_title` in frontmatter when gate-generated title replaces `topic.title`

## Scope Boundaries

**Deferred to Phase 2 (发布链路):**
- NOT: publish.js implementation
- NOT: Cover image API fix (requires Imagen API migration)

**Deferred to Phase 3 (数据驱动优化, after 10+ published articles):**
- NOT: Multi-template system (needs data validation)
- NOT: Emotion arc detection (needs reader feedback)
- NOT: Title score calibration with real reading data

**Removed or deferred (TODO):**
- NOT: Title retry on low scores (removed in eng review, no data to calibrate threshold)
- NOT: Prompt eval framework (TODO, after 10 published articles)
- NOT: Word count post-processing validation (TODO)

## Context & Research

### Relevant Code and Patterns

- **LLM call pattern** (`pipeline.js:L29-33, L506-519`): `createAnthropicClient()` factory, `anthropic.messages.create()` with model/max_tokens/messages, extract `response.content[0].text`
- **Prompt loading** (`pipeline.js:L17-19, L495`): Path constants at top, `fs.readFileSync(path, 'utf-8')`, concatenate with `\n\n---\n\n` separator
- **Frontmatter writing** (`pipeline.js:L522-533`): `matter.stringify(contentText, frontmatterObj)`, write with `fs.writeFileSync`
- **Non-blocking post-processing** (`pipeline.js:L537-543`): try/catch around `generateCoverImage()`, log error, continue
- **JSON parsing with fallback** (`pipeline.js:L333-359`): `parseScoreJSON()` with code-block extraction, control char cleanup, trailing comma removal, per-object fallback
- **Existing lib module** (`scripts/lib/yaml.js`): 6-line thin wrapper, establishes the `scripts/lib/` pattern
- **Test runner**: `node --test test/` configured in package.json, using Node.js built-in `node:test` + `node:assert`

### Institutional Learnings

No `docs/solutions/` exists. Key patterns extracted directly from codebase (see above).

## Key Technical Decisions

- **Gate prompts as independent files** in `config/prompts/`: Consistent with existing prompt management pattern. Allows prompt iteration without code changes. (see origin: CEO plan, eng review issue #1)
- **Promise.allSettled over Promise.all**: Each gate succeeds or fails independently. Failed gate = field omitted from frontmatter (not empty string). Downstream code must handle missing fields. (see origin: eng review issue #7, performance review)
- **Gates extracted to `scripts/lib/gates.js`**: Keeps pipeline.js manageable in size, enables isolated unit testing. Follows existing `scripts/lib/` convention. (see origin: eng review issue #5)
- **No title retry**: Simplified from CEO plan. LLM self-scoring lacks calibration data. Generate 3 titles, score, pick best. No threshold-based retry. Note: `title_score` is a placeholder metric, not suitable for threshold logic — LLM 自评倾向于给窄范围高分。(see origin: eng review issue #2)
- **gitCommit fix via `execFileSync`**: Array-based argument passing avoids shell interpretation entirely. Safer than string escaping. (see origin: eng review issue #4, outside voice finding #7)
- **Scoring weights unified to scoring.md formula**: CLAUDE.md weights change from `novelty 50% / depth_potential 30% / relevance 20%` to `novelty 40% / practicality 35% / depth_potential 25%`. Both dimension names and weight values change. `scoring.md` is the source of truth. (see origin: eng review issue #3)

## Open Questions

### Resolved During Planning

- **Where do gate functions get the Anthropic client?** Resolution: `phaseGenerate()` creates client once, passes to gate functions as parameter. Same pattern as existing code where client is created per-phase.
- **How to handle titleScorer JSON parsing?** Resolution: Adapt `parseScoreJSON()` pattern from scoring phase. Create a lighter version in gates.js that extracts title/score pairs with fallback.
- **What if LLM returns title scores as strings?** Resolution: Coerce with `Number()` in parsing logic. Test scenario included.

### Deferred to Implementation

- **Exact prompt wording for each gate**: Directional content defined in approach, final wording tuned during implementation
- **Optimal `max_tokens` for each gate call**: Start with 2000 for title scorer (needs structured output), 500 for gold quote, 1000 for summary. Adjust if outputs are truncated.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
phaseGenerate() flow after modification:
═════════════════════════════════════════

  for (topicFile of topicFiles) {
      │
      ▼
  ┌─────────────────────────┐
  │  LLM call: wechat.md    │  ← rewritten viral template
  │  → articleText           │
  └───────────┬─────────────┘
              │
              ▼
  ┌─────────────────────────────────────────────────┐
  │  Promise.allSettled([                            │
  │    titleScorer(articleText, anthropic, LLM_MODEL)│
  │    goldQuote(articleText, anthropic, LLM_MODEL)  │
  │    summaryGen(articleText, anthropic, LLM_MODEL) │
  │  ])                                             │
  └──┬──────────────┬──────────────┬────────────────┘
     │              │              │
     ▼              ▼              ▼
  {title,        {gold_quote}   {summary}
   title_score,   or null        or null
   title_alts}
   or null
     │              │              │
     └──────────────┴──────────────┘
                    │
                    ▼
  ┌─────────────────────────┐
  │  Merge gate results     │  ← only non-null fields
  │  into frontmatter       │     added to draft
  │  matter.stringify(...)   │
  └───────────┬─────────────┘
              │
              ▼
  ┌─────────────────────────┐
  │  generateCoverImage()   │  ← existing, unchanged
  └─────────────────────────┘
  }
```

Gate function signature pattern:
- Input: `(articleText, anthropicClient, model)` — each gate is a pure async function
- Output: object with gate-specific fields, or throws on failure
- Caller handles the throw via `Promise.allSettled` — rejected = fields omitted

> **Known limitation:** Gates receive only `articleText`, not topic metadata (source_url, tags, angle). Title generation works from article content alone. If title quality is insufficient, a future iteration could pass topic metadata as an additional parameter.

## Implementation Units

- [x] **Unit 1: Create gate prompt files**

**Goal:** Add the 3 prompt templates that gates will use for LLM calls.

**Requirements:** R2, R3, R4

**Dependencies:** None

**Files:**
- Create: `config/prompts/title-scorer.md`
- Create: `config/prompts/gold-quote.md`
- Create: `config/prompts/summary.md`

**Approach:**
- Each prompt is a standalone markdown file, same format as existing `scoring.md` and `wechat.md`
- `title-scorer.md`: Instruct LLM to generate 3 candidate titles following viral formulas (number + value + target audience), then score each 0-10 on dimensions like clickability, curiosity gap, specificity. Output as JSON array `[{title, score}]`
- `gold-quote.md`: Instruct LLM to extract one shareable quote from the article. Constraints: under 50 Chinese characters, must contain an opinion/stance, suitable for WeChat Moments forwarding. Output as plain text string.
- `summary.md`: Instruct LLM to write a suspense-driven preview summary. Must create curiosity without clickbait, hint at the article's key insight. 2-3 sentences. Output as plain text string.
- Dynamic content (the article text) will be appended after `---` separator, matching existing pattern

**Patterns to follow:**
- `config/prompts/scoring.md` — structure, tone, output format specification
- `config/prompts/wechat.md` — Chinese language, style rules

**Test expectation:** none — prompt files are not code. Quality validated by gate unit tests with mock LLM responses.

**Verification:**
- Three new `.md` files exist in `config/prompts/`
- Each contains clear instructions, output format spec, and constraints

---

- [x] **Unit 2: Rewrite viral article template**

**Goal:** Replace the current article generation prompt with a viral WeChat writing formula while preserving the practical content core.

**Requirements:** R1

**Dependencies:** None

**Files:**
- Modify: `config/prompts/wechat.md`

**Approach:**
- Preserve the "information gap" positioning and "实操 > 分析 > 新闻" philosophy
- Add viral structural elements: suspense/hook opening (2-3 sentences that create immediate relevance), scene immersion, short paragraphs (2-3 sentences max), emotion rhythm, call to action ending
- Embed title formula guidance: number + value point + target audience
- Increase target word count from 600-1200 to 1000-1800
- Keep existing sections (开头hook, 实操拆解, 踩坑与真实体验, 我的判断, 动手指南) but strengthen each with viral techniques
- Maintain "no filler" rules, no emoji, use "我" voice
- Keep code blocks and commands for technical content

**Patterns to follow:**
- Current `wechat.md` — preserve what works (structure, tone, code examples)
- Add viral elements from CEO plan research (十万加写作公式)

**Test expectation:** none — prompt quality is subjective. Deferred to prompt eval framework (TODOS.md).

**Verification:**
- Prompt file updated with viral elements
- Word count guidance says 1000-1800
- Core content philosophy preserved (实操 + 信息差)

---

- [x] **Unit 3: Create gates module**

**Goal:** Implement the three gate functions in a new module that pipeline.js will import.

**Requirements:** R2, R3, R4, R5

**Dependencies:** Unit 1 (prompt files must exist for path constants)

**Files:**
- Create: `scripts/lib/gates.js`

**Approach:**
- Export three async functions: `titleScorer`, `goldQuote`, `summaryGen`
- Each function: loads its prompt file, appends article text after `---` separator, calls LLM, parses response, returns structured result
- `titleScorer`: parse JSON array of `[{title, score}]`, coerce scores with `Number()`, sort by score descending, return `{title: bestTitle, title_score: bestScore, title_alternatives: allTitles}`
- `goldQuote`: extract plain text, trim, return `{gold_quote: text}`
- `summaryGen`: extract plain text, trim, return `{summary: text}`
- JSON parsing for titleScorer: adapt `parseScoreJSON` pattern — try JSON code block extraction first, then raw JSON parse, then per-object fallback. **Important:** per-object fallback must check `obj.title && obj.score`（不是现有 parseScoreJSON 中的 `obj.index && obj.score`）. On total parse failure, throw (caller handles via allSettled)
- Each function throws on failure (no internal try/catch). The caller in pipeline.js uses `Promise.allSettled` to handle failures.
- Function signature: `async function titleScorer(articleText, client, model)` — receives client and model as params, does not create its own client
- Use `fs.readFileSync` for prompt loading (matches existing pattern, prompts are small)
- Path constants at module top using `import.meta.url` for `__dirname` equivalent

**Patterns to follow:**
- `pipeline.js:L506-519` — LLM call pattern
- `pipeline.js:L333-359` — JSON parsing with fallback (`parseScoreJSON`)
- `scripts/lib/yaml.js` — module structure (ESM export)

**Test scenarios:**
- Happy path: titleScorer receives well-formed JSON with 3 titles and scores, returns highest-scoring title with alternatives
- Happy path: goldQuote receives plain text quote, returns trimmed string
- Happy path: summaryGen receives plain text summary, returns trimmed string
- Edge case: titleScorer receives scores as strings ("8.5" not 8.5), coerces correctly
- Edge case: titleScorer receives JSON wrapped in markdown code fences, extracts correctly
- Edge case: goldQuote receives response with leading/trailing whitespace and newlines, trims properly
- Error path: titleScorer receives completely unparseable response, throws error
- Error path: titleScorer receives empty array, throws error
- Error path: LLM client throws network error, propagates as rejection

**Verification:**
- All three functions exported from `scripts/lib/gates.js`
- Functions accept `(articleText, client, model)` signature
- titleScorer handles JSON parsing edge cases without crashing
- All unit tests pass

---

- [x] **Unit 4: Integrate gates into pipeline and fix gitCommit**

**Goal:** Wire gates into `phaseGenerate()` and fix the command injection bug in `gitCommit()`.

**Requirements:** R2, R3, R4, R5, R7, R8

**Dependencies:** Unit 3 (gates module must exist)

**Files:**
- Modify: `scripts/pipeline.js`

**Approach:**

*Gates integration (in `phaseGenerate`, after article text generation, before cover image):*
- Import gate functions: `import { titleScorer, goldQuote, summaryGen } from './lib/gates.js'`
- After `const articleText = response.content[0].text`, run gates:
  ```
  const gateResults = await Promise.allSettled([
    titleScorer(articleText, anthropic, LLM_MODEL),
    goldQuote(articleText, anthropic, LLM_MODEL),
    summaryGen(articleText, anthropic, LLM_MODEL),
  ])
  ```
- Extract fulfilled values, skip rejected:
  - If titleScorer fulfilled: use its `title` as the draft title, store `original_title: topic.title` for traceability, add `title_score`, `title_alternatives` to frontmatter
  - If titleScorer rejected: keep `topic.title` as draft title (no `original_title` needed)
  - If goldQuote fulfilled: add `gold_quote` to frontmatter
  - If summaryGen fulfilled: add `summary` to frontmatter
  - Log each gate result (success or failure reason)
- After all gates, log summary line: `Gates: titleScorer ✓/✗, goldQuote ✓/✗, summaryGen ✓/✗` — surfaces chronic gate failures across runs
- Merge gate fields into the existing `matter.stringify()` call's frontmatter object
- Failed gates: field simply not present in frontmatter (not empty string, not null)

*Frontmatter schema for gate fields (all optional):*
- `original_title`: string — original `topic.title` before gate replacement
- `title_score`: number — LLM-assigned score of winning title (placeholder metric, not calibrated)
- `title_alternatives`: `[{title: string, score: number}]` — all 3 candidates with scores
- `gold_quote`: string — shareable quote for WeChat Moments
- `summary`: string — suspense-driven preview summary

*Note:* `gold_quote` and `summary` have no automated consumer until Phase 2 (publish pipeline). In Phase 1 they serve human review during draft approval.

*gitCommit fix (implement as a separate, early commit so it can be landed independently of the feature):*
- Replace `execSync(\`git commit -m "${message}"\`)` with `execFileSync('git', ['commit', '-m', message])`
- Import `execFileSync` from `child_process` (alongside existing `execSync`)
- Keep `execSync` for `git add -A` and `git status --porcelain` (no user input in those)

**Patterns to follow:**
- `pipeline.js:L537-543` — non-blocking post-processing pattern (but using `allSettled` instead of individual try/catch)
- `pipeline.js:L522-533` — frontmatter object construction

**Test scenarios:**
- Happy path: gitCommit with message containing double quotes does not throw
- Happy path: gitCommit with message containing backticks does not throw
- Edge case: gitCommit with message containing shell metacharacters ($, `, \) passes through safely

**Verification:**
- `phaseGenerate()` calls all 3 gates after article generation
- Gate results merged into draft frontmatter (only fulfilled values)
- `gitCommit()` uses `execFileSync` for the commit command
- Full pipeline runs end-to-end: `npm run pipeline`

---

- [x] **Unit 5: Sync scoring weights in CLAUDE.md**

**Goal:** Fix the scoring weight and dimension name inconsistency between CLAUDE.md and scoring.md.

**Requirements:** R6

**Dependencies:** None

**Files:**
- Modify: `CLAUDE.md`

**Approach:**
- Change `选题偏好：novelty 50% + depth_potential 30% + relevance 20%` to `选题偏好：novelty 40% + practicality 35% + depth_potential 25%`
- This aligns CLAUDE.md with `scoring.md` which is the actual LLM prompt (source of truth)
- Dimension name change: `relevance` → `practicality` (different concept, not just different weight)

**Test expectation:** none — documentation change only.

**Verification:**
- CLAUDE.md scoring description matches `scoring.md:L13` exactly

---

- [x] **Unit 6: Write unit tests for gates**

**Goal:** Add test coverage for the new gates module, establishing the project's first test file.

**Requirements:** R2, R3, R4, R5

**Dependencies:** Unit 3 (gates module must exist)

**Files:**
- Create: `test/gates.test.js`

**Approach:**
- Create `test/` directory (does not exist yet). Verify `npm test` runs `node --test` correctly before writing test logic.
- Use Node.js built-in `node:test` and `node:assert` (no additional dependencies)
- Mock the Anthropic client: create a fake client object with `messages.create()` that returns configurable responses
- Test each gate function independently with the mock client
- Test the Promise.allSettled integration pattern (all succeed, partial failure, all fail)
- Do not test actual LLM calls — only test parsing logic and error handling

**Patterns to follow:**
- `node:test` describe/it pattern
- Mock object: `{ messages: { create: async () => ({ content: [{ text: mockResponse }] }) } }`

**Test scenarios:**
- Happy path: titleScorer with valid JSON `[{title:"...",score:9},{title:"...",score:7},{title:"...",score:8}]` returns highest-scoring title
- Happy path: goldQuote with plain text returns trimmed quote
- Happy path: summaryGen with plain text returns trimmed summary
- Edge case: titleScorer with scores as strings coerces to numbers
- Edge case: titleScorer with JSON in markdown code fences extracts correctly
- Edge case: goldQuote with whitespace/newlines trims properly
- Error path: titleScorer with unparseable response throws
- Error path: titleScorer with empty array throws
- Error path: mock client that throws simulates network failure
- Integration: Promise.allSettled with one gate failing returns other gates' results
- Integration: Promise.allSettled with all gates failing returns no results (no crash)

**Verification:**
- `npm test` runs and all tests pass
- Tests cover happy path, edge cases, and error paths for all 3 gates
- Mock client pattern established for future test files

## System-Wide Impact

- **Interaction graph:** `phaseGenerate()` → new import of `gates.js` → 3 parallel LLM calls → results merged into `matter.stringify()` call. No other pipeline phases affected.
- **Error propagation:** Gate failures are absorbed by `Promise.allSettled`. A gate failure results in its frontmatter fields being absent from the draft. The draft file is always written. Cover image generation (existing) runs after gates regardless of gate outcomes.
- **State lifecycle risks:** Draft files are written once per pipeline run (idempotent check at phase start). Gates run before file write, so no partial-write risk. If pipeline crashes during gates, no draft file is written (clean failure).
- **API surface parity:** No external API changes. Frontmatter schema gains optional fields (`title_score`, `title_alternatives`, `gold_quote`, `summary`) — all are additive, no breaking changes.
- **Integration coverage:** The critical cross-layer scenario is: gates produce results → results correctly merged into frontmatter → draft file readable by future publish script. Unit tests cover gate output format; manual `npm run pipeline` verifies end-to-end.
- **Unchanged invariants:** Phase 1 (fetch) and Phase 2 (score) are completely untouched. The `status: draft` state machine is unchanged. Existing frontmatter fields (title, source_url, score, scoring_reason, tags, created_at) are preserved.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| LLM returns malformed JSON for title scoring | Multi-layer JSON parsing with fallback (adapted from existing `parseScoreJSON`). On total failure, gate throws and field is omitted. |
| LLM API rate limits and cost with 3 extra calls per article | Calls are parallel so latency impact is minimal (~5-10s). 9 extra calls/day (3 articles x 3 gates) is well within typical API limits. Cost estimate: ~3K input tokens per gate call x 9 calls = ~27K extra input tokens/day, negligible at current pricing. |
| Viral prompt produces lower-quality articles | Design principle preserves practical content core. Viral formulas only affect packaging. Can revert prompt if quality drops. |
| LLM self-scoring titles is unreliable | Known limitation, accepted. Scores provide rough ordering signal only, not absolute quality measure. `title_score` is a placeholder metric. Real calibration deferred to Phase 3 with reading data. |
| Word count deviation from 1000-1800 target | Prompt includes word count guidance but LLM may over/undershoot. Add `console.warn` in phaseGenerate if Chinese character count falls outside 800-2200 range. Post-processing validation deferred (TODOS.md). |

## Sources & References

- **Origin document:** [CEO Plan: Viral Content Engine](~/.gstack/projects/hamburg/ceo-plans/2026-04-01-viral-content-engine.md)
- **Design doc:** [AI Content Pipeline Design](~/.gstack/projects/hamburg/jiabozhang-unknown-design-20260330-235044.md)
- **Eng review decisions:** Session 2026-04-01 (gate prompts as files, Promise.allSettled, gates in lib/, no retry, execFileSync fix, scoring.md as source of truth)
- Related code: `scripts/pipeline.js` (main pipeline), `scripts/lib/yaml.js` (lib pattern), `config/prompts/` (prompt pattern)
- Deferred work: `TODOS.md` (prompt eval, word count validation, Phase 3 items)
