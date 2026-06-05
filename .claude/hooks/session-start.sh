#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

SKILLS_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}/.agents/skills"
REQUIRED_SKILLS=(
  "higgsfield-generate"
  "higgsfield-marketplace-cards"
  "higgsfield-product-photoshoot"
  "higgsfield-soul-id"
)

missing=0
for skill in "${REQUIRED_SKILLS[@]}"; do
  if [ ! -f "$SKILLS_DIR/$skill/SKILL.md" ]; then
    echo "WARNING: Missing skill: $skill" >&2
    missing=$((missing + 1))
  fi
done

if [ "$missing" -gt 0 ]; then
  echo "ERROR: $missing skill(s) missing from .agents/skills/" >&2
  exit 1
fi

echo "All Higgsfield AI skills verified."
