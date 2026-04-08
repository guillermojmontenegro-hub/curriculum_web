#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

generate_article_thumb() {
  local source_file="$1"
  local target_file="$2"

  convert "$source_file" \
    -auto-orient \
    -resize "640x640>" \
    -strip \
    -quality 82 \
    "$target_file"
}

generate_profile_thumb() {
  local source_file="$1"
  local target_file="$2"

  convert "$source_file" \
    -auto-orient \
    -gravity north \
    -resize "320x320^" \
    -extent 320x320 \
    -strip \
    -quality 84 \
    "$target_file"
}

while IFS= read -r preview_file; do
  article_dir="$(dirname "$preview_file")"
  target_file="$article_dir/preview-thumb.webp"
  generate_article_thumb "$preview_file" "$target_file"
  echo "Generado $target_file"
done < <(
  find "$ROOT_DIR/Articulos" -mindepth 2 -maxdepth 2 -type f \
    \( -iname 'preview.png' -o -iname 'preview.jpg' -o -iname 'preview.jpeg' -o -iname 'preview.webp' \) \
    | sort
)

generate_profile_thumb \
  "$ROOT_DIR/public/assets/fotoCV.jpg" \
  "$ROOT_DIR/public/assets/fotoCV-thumb.jpg"
echo "Generado $ROOT_DIR/public/assets/fotoCV-thumb.jpg"
