#!/bin/bash
# Sync drafts and wiki/topics to Obsidian vault
SRC="/Users/jiabozhang/shared_workspace/jiabo/openclaw/PromptIO"
DST="/Users/jiabozhang/Library/Mobile Documents/iCloud~md~obsidian/Documents/PromptIO"

rsync -a --delete "$SRC/drafts/" "$DST/drafts/"
rsync -a --delete "$SRC/wiki/" "$DST/wiki/"
rsync -a --delete "$SRC/topics/" "$DST/topics/"
