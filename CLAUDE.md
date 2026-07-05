# CLAUDE.md — Tutu Brand

## Agent Skills (IMPORTANT)

This repo ships **34 skills** in `.claude/skills/<name>/SKILL.md`. They are NOT installed as
plugins — they live in the repo. **Whenever a task matches one of the skills below, READ that
skill's `SKILL.md` and follow it before doing the work.** Treat them as authoritative playbooks.

To use a skill: read `.claude/skills/<name>/SKILL.md` and follow its instructions.

| Skill | Use when |
|-------|----------|
| `babysit` | Watch a pull request or review cycle until it is ready to merge. Use when asked to babysit… |
| `brainstorming` | You MUST use this before any creative work - creating features, building components, addin… |
| `design-is` | Audit a design against Dieter Rams' ten "Good design is..." principles, then hand off a /m… |
| `dispatching-parallel-agents` | Use when facing 2+ independent tasks that can be worked on without shared state or sequent… |
| `do` | Execute a phased implementation plan using subagents. Use when asked to execute, run, or c… |
| `executing-plans` | Use when you have a written implementation plan to execute in a separate session with revi… |
| `find-skills` | Helps users discover and install agent skills when they ask questions like "how do I do X"… |
| `finishing-a-development-branch` | Use when implementation is complete, all tests pass, and you need to decide how to integra… |
| `how-it-works` | Explain how claude-mem captures observations, when memory injection kicks in, and where da… |
| `impeccable` | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, dist… |
| `knowledge-agent` | Build and query AI-powered knowledge bases from claude-mem observations. Use when users wa… |
| `learn-codebase` | Prime a codebase by reading every source file in full. Use when starting work on a new or … |
| `make-plan` | Create a detailed, phased implementation plan with documentation discovery. Use when asked… |
| `mem-search` | Search claude-mem's persistent cross-session memory database. Use when user asks "did we a… |
| `oh-my-issues` | Cluster a GitHub issue backlog by root cause into a small set of plan-master issues, redir… |
| `one-skill-to-rule-them-all` | > |
| `pathfinder` | Map a codebase into feature-grouped flowcharts, identify duplicated concerns across featur… |
| `receiving-code-review` | Use when receiving code review feedback, before implementing suggestions, especially if fe… |
| `requesting-code-review` | Use when completing tasks, implementing major features, or before merging to verify work m… |
| `smart-explore` | Token-optimized structural code search using tree-sitter AST parsing. Use instead of readi… |
| `standup` | Facilitate a read-only standup across git worktrees, branches, or PRs to compare changes a… |
| `subagent-driven-development` | Use when executing implementation plans with independent tasks in the current session |
| `systematic-debugging` | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixe… |
| `test-driven-development` | Use when implementing any feature or bugfix, before writing implementation code |
| `timeline-report` | Generate a "Journey Into [Project]" narrative report analyzing a project's entire developm… |
| `using-git-worktrees` | Use when starting feature work that needs isolation from current workspace or before execu… |
| `using-superpowers` | Use when starting any conversation - establishes how to find and use skills, requiring ski… |
| `verification-before-completion` | Use when about to claim work is complete, fixed, or passing, before committing or creating… |
| `version-bump` | Automated semantic versioning and release workflow for Claude Code plugins. Handles versio… |
| `weekly-digests` | Generate a serial week-by-week narrative digest of a project's full claude-mem timeline. S… |
| `what-the` | What the? Use when the user wants a plain-English breakdown of something technical — the w… |
| `wowerpoint` | Turn one document into a kawaii NotebookLM slide-deck PDF. Use for "wowerpoint this", "mak… |
| `writing-plans` | Use when you have a spec or requirements for a multi-step task, before touching code |
| `writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before dep… |
