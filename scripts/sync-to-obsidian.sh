#!/bin/bash
# Sync drafts and wiki/topics to Obsidian vault.
# Use a small Python mirror instead of macOS openrsync because openrsync can fail
# with "mmap: Resource deadlock avoided" against iCloud-backed folders.
set -euo pipefail

SRC="${PROMPTIO_SYNC_SRC:-/Users/jiabozhang/Documents/CA001/openclaw/PromptIO}"
DST="${PROMPTIO_OBSIDIAN_DST:-/Users/jiabozhang/Library/Mobile Documents/iCloud~md~obsidian/Documents/PromptIO}"

/usr/bin/python3 - "$SRC" "$DST" <<'PY'
import filecmp
import os
import re
import shutil
import sys
from pathlib import Path

src_root = Path(sys.argv[1])
dst_root = Path(sys.argv[2])
subdirs = ["drafts", "wiki", "topics"]


def clean_yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        value = value[1:-1]
    return value.strip()


def read_frontmatter_field(markdown_path: Path, field: str) -> str:
    if not markdown_path.exists():
        return ""
    try:
        lines = markdown_path.read_text(encoding="utf-8").splitlines()
        if not lines or lines[0].strip() != "---":
            return ""
        for line in lines[1:]:
            if line.strip() == "---":
                break
            if line.startswith(f"{field}:"):
                return clean_yaml_scalar(line.split(":", 1)[1])
    except UnicodeDecodeError:
        return ""
    return ""


def read_markdown_h1(markdown_path: Path) -> str:
    if not markdown_path.exists():
        return ""
    try:
        for line in markdown_path.read_text(encoding="utf-8").splitlines():
            match = re.match(r"^#\s+(.+)$", line)
            if match:
                return match.group(1).strip()
    except UnicodeDecodeError:
        return ""
    return ""


def safe_filename(value: str, fallback: str) -> str:
    value = (value or fallback).strip()
    replacements = {
        "/": "／",
        "\\": "＼",
        ":": "：",
        "*": "＊",
        "?": "？",
        '"': "'",
        "<": "＜",
        ">": "＞",
        "|": "｜",
    }
    for source, target in replacements.items():
        value = value.replace(source, target)
    value = re.sub(r"[\x00-\x1f]+", " ", value)
    value = re.sub(r"\s+", " ", value).strip(" .")
    return value[:120] or fallback


def unique_display_name(base: str, slug: str, used: set[str]) -> str:
    candidate = base
    if candidate not in used:
        used.add(candidate)
        return candidate

    suffix_base = safe_filename(slug, "draft")
    candidate = f"{base} - {suffix_base}"
    if candidate not in used:
        used.add(candidate)
        return candidate

    for idx in range(2, 100):
        candidate = f"{base} - {idx}"
        if candidate not in used:
            used.add(candidate)
            return candidate

    raise RuntimeError(f"too many duplicate draft titles under one date: {base}")


def build_draft_name_maps(drafts_dir: Path):
    folder_names = {}
    main_files = {}
    if not drafts_dir.exists():
        return folder_names, main_files

    for date_dir in sorted([p for p in drafts_dir.iterdir() if p.is_dir()]):
        used = set()
        for draft_dir in sorted([p for p in date_dir.iterdir() if p.is_dir()]):
            slug = draft_dir.name
            markdowns = sorted([p.name for p in draft_dir.iterdir() if p.is_file() and p.suffix.lower() == ".md"])
            wechat_file = f"{slug}.md" if f"{slug}.md" in markdowns else (markdowns[0] if len(markdowns) == 1 else f"{slug}.md")
            markdown_path = draft_dir / wechat_file
            title = (
                read_frontmatter_field(markdown_path, "title")
                or read_markdown_h1(markdown_path)
                or slug
            )
            display = unique_display_name(safe_filename(title, slug), slug, used)
            folder_names[(date_dir.name, slug)] = display
            main_files[(date_dir.name, slug)] = wechat_file

    return folder_names, main_files


draft_folder_names, draft_main_files = build_draft_name_maps(src_root / "drafts")


def destination_rel(subdir_name: str, rel: Path) -> Path:
    if subdir_name != "drafts" or len(rel.parts) < 3:
        return rel

    date, slug = rel.parts[0], rel.parts[1]
    display = draft_folder_names.get((date, slug))
    if not display:
        return rel

    parts = [date, display, *rel.parts[2:]]
    main_file = draft_main_files.get((date, slug), f"{slug}.md")
    if rel.parts[2] == main_file and rel.suffix.lower() == ".md":
        parts[2] = f"{display}.md"
    return Path(*parts)


def copy_file(src: Path, dst: Path) -> bool:
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists() and dst.is_file():
        try:
            if src.stat().st_size == dst.stat().st_size and filecmp.cmp(src, dst, shallow=False):
                return False
        except OSError:
            pass
    tmp = dst.with_name(f".{dst.name}.tmp-{os.getpid()}")
    try:
        shutil.copy2(src, tmp)
        os.replace(tmp, dst)
    finally:
        try:
            if tmp.exists():
                tmp.unlink()
        except OSError:
            pass
    return True


def mirror_dir(src_dir: Path, dst_dir: Path, subdir_name: str):
    copied = 0
    deleted = 0
    dst_dir.mkdir(parents=True, exist_ok=True)

    dst_files = set()
    for src in src_dir.rglob("*"):
        rel = src.relative_to(src_dir)
        if src.is_file():
            dst_rel = destination_rel(subdir_name, rel)
            dst = dst_dir / dst_rel
            dst_files.add(dst_rel)
            if copy_file(src, dst):
                copied += 1

    # Delete files that no longer exist in source, matching rsync --delete behavior.
    for dst in sorted([p for p in dst_dir.rglob("*") if p.is_file()], reverse=True):
        rel = dst.relative_to(dst_dir)
        if rel not in dst_files:
            dst.unlink()
            deleted += 1

    # Remove empty directories left after deletion.
    for dst in sorted([p for p in dst_dir.rglob("*") if p.is_dir()], reverse=True):
        try:
            dst.rmdir()
        except OSError:
            pass

    return copied, deleted


total_copied = 0
total_deleted = 0
for name in subdirs:
    src_dir = src_root / name
    dst_dir = dst_root / name
    if not src_dir.exists():
        continue
    copied, deleted = mirror_dir(src_dir, dst_dir, name)
    total_copied += copied
    total_deleted += deleted
    print(f"{name}: copied={copied} deleted={deleted}")

print(f"sync complete: copied={total_copied} deleted={total_deleted}")
PY
