# Tutu Brand — Skills Library & Install Guide

34 agent skills collected from 5 upstream repos (vercel-labs/skills, obra/superpowers,
thedotmack/claude-mem, pbakaus/impeccable, rebelytics/one-skill-to-rule-them-all).

Each skill lives as a self-contained folder (`SKILL.md` + any resources) and is provided
in two ready-to-use forms so it works on **every** Claude surface.

## Where things are

| Path | For | How it's consumed |
|------|-----|-------------------|
| `.claude/skills/<skill>/` | **Claude Code** (CLI, web, IDE) | Read automatically in any Claude Code session on this repo. |
| `dist/skills-zips/<skill>.zip` | **Chat & Cowork** (claude.ai) | Upload per skill in Settings → Capabilities → Skills. |
| `dist/skills-zips/_ALL-skills-bundle.zip` | convenience | All 34 skill folders in one archive. |

## Install per platform

### Claude Code (this repo) — already done
Skills under `.claude/skills/` are picked up automatically. Nothing to do. To use them in
*any* repo, copy the folders into `~/.claude/skills/` (user-level).

### Chat & Cowork (claude.ai) — account-level upload
These surfaces read skills from your **account**, not the repo, so they must be uploaded once:
1. Open **claude.ai → Settings → Capabilities → Skills** (Skills must be enabled for your plan/org).
2. Click **Upload skill** and pick a `.zip` from `dist/skills-zips/`.
3. Repeat per skill, or upload `_ALL-skills-bundle.zip` if bulk upload is supported.
Once uploaded they are available in both **Chat** and **Cowork**.

> Note: `claude-mem` skills (mem-search, knowledge-agent, timeline-report, …) expect the
> claude-mem plugin/MCP backend to be installed to be fully functional; they upload fine but
> some features need that backend.

## Skills included

| Skill | Description |
|-------|-------------|
| `babysit` | Watch a pull request or review cycle until it is ready to merge. Use when asked to babysit, monitor, or kee… |
| `brainstorming` | "You MUST use this before any creative work - creating features, building components, adding functionality,… |
| `design-is` | Audit a design against Dieter Rams' ten "Good design is..." principles, then hand off a /make-plan prompt f… |
| `dispatching-parallel-agents` | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies |
| `do` | Execute a phased implementation plan using subagents. Use when asked to execute, run, or carry out a plan —… |
| `executing-plans` | Use when you have a written implementation plan to execute in a separate session with review checkpoints |
| `find-skills` | Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill f… |
| `finishing-a-development-branch` | Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - gui… |
| `how-it-works` | Explain how claude-mem captures observations, when memory injection kicks in, and where data lives. Use whe… |
| `impeccable` | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, opti… |
| `knowledge-agent` | Build and query AI-powered knowledge bases from claude-mem observations. Use when users want to create focu… |
| `learn-codebase` | Prime a codebase by reading every source file in full. Use when starting work on a new or unfamiliar projec… |
| `make-plan` | Create a detailed, phased implementation plan with documentation discovery. Use when asked to plan a featur… |
| `mem-search` | Search claude-mem's persistent cross-session memory database. Use when user asks "did we already solve this… |
| `oh-my-issues` | Cluster a GitHub issue backlog by root cause into a small set of plan-master issues, redirect children with… |
| `one-skill-to-rule-them-all` | > |
| `pathfinder` | Map a codebase into feature-grouped flowcharts, identify duplicated concerns across features, and propose a… |
| `receiving-code-review` | Use when receiving code review feedback, before implementing suggestions, especially if feedback seems uncl… |
| `requesting-code-review` | Use when completing tasks, implementing major features, or before merging to verify work meets requirements |
| `smart-explore` | Token-optimized structural code search using tree-sitter AST parsing. Use instead of reading full files whe… |
| `standup` | Facilitate a read-only standup across git worktrees, branches, or PRs to compare changes and produce one co… |
| `subagent-driven-development` | Use when executing implementation plans with independent tasks in the current session |
| `systematic-debugging` | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes |
| `test-driven-development` | Use when implementing any feature or bugfix, before writing implementation code |
| `timeline-report` | Generate a "Journey Into [Project]" narrative report analyzing a project's entire development history from … |
| `using-git-worktrees` | Use when starting feature work that needs isolation from current workspace or before executing implementati… |
| `using-superpowers` | Use when starting any conversation - establishes how to find and use skills, requiring skill invocation bef… |
| `verification-before-completion` | Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires r… |
| `version-bump` | Automated semantic versioning and release workflow for Claude Code plugins. Handles version increments acro… |
| `weekly-digests` | Generate a serial week-by-week narrative digest of a project's full claude-mem timeline. Splits the timelin… |
| `what-the` | "What the? Use when the user wants a plain-English breakdown of something technical — the who, what, where,… |
| `wowerpoint` | Turn one document into a kawaii NotebookLM slide-deck PDF. Use for "wowerpoint this", "make a deck about <f… |
| `writing-plans` | Use when you have a spec or requirements for a multi-step task, before touching code |
| `writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before deployment |

_Regenerate zips after editing a skill:_ `cd .claude/skills && zip -r ../../dist/skills-zips/<skill>.zip <skill>`
