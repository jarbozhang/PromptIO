# Run Manifest and Publish Gate

PromptIO keeps content in markdown files and `meta.yaml`. The run manifest is only the daily run recovery record.

## Publish gate

`npm run publish` reads each draft's `meta.yaml` before creating publishable artifacts.

Normal publishability requires:

- `qa.overall_pass: true`
- `platforms.<platform>: primary` or `platforms.<platform>: compliant`
- for XHS, `qa.l6_pass: true` or `qa.xhs_pass: true`

If any required field is missing or false, non-dry-run publish/export is blocked. Dry-run preview still writes local preview files, but the result summary marks the platform as:

```json
{
  "status": "blocked_preview",
  "publishable": false,
  "gate_status": "blocked"
}
```

Use manual bypass only for legacy drafts that were reviewed outside the current metadata contract:

```bash
npm run publish -- drafts/DATE/SLUG --platform wechat --manual-bypass "reviewed by operator"
```

The bypass reason appears in the publish summary. Treat bypass as an exception, not the normal workflow.

## Daily run manifest

`npm run draft:daily` writes run state to:

```text
runs/{date}/manifest.json
```

The first version records:

- `schema_version`
- `date`
- `source_count`
- `topics[]`
- `events[]`

Each topic record may include:

- `id`
- `file`
- `slug`
- `title`
- `status`: `topics_selected`, `draft_ready`, or `draft_failed`
- `draft_dir`
- `meta_path`
- `error`
- timestamps for selection, draft success, or draft failure

The manifest is additive. It does not replace `topics/{date}.json`, draft markdown, or `meta.yaml`.

## Recovering a daily run

1. Open `runs/{date}/manifest.json`.
2. Find topics with `status: draft_failed`.
3. Read `error` and the topic's `file`, `slug`, and `title`.
4. Retry the topic through `scripts/single.js` or rerun `scripts/daily.js` with the same date and overwrite settings appropriate for the draft.
5. Confirm the topic moves to `draft_ready` and records `draft_dir` and `meta_path`.

Reruns should not erase a completed `draft_ready` topic with empty selection data.

## Future extensions

Future work can add Story Package, Claim Ledger, Wiki Patch Queue, and external source preflight. Those fields are intentionally not part of the first schema because no current script consumes them.
