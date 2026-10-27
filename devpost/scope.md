---
status: approved
---

# Project Scope: KernelCraft

## 1. Project Kernel
**KernelCraft** is an interactive browser-based product studio that guides solo builders through the **Flipped Interaction** method to turn vague app ideas into hardened, single-loop proof-of-concepts while actively flagging cognitive debt and feature bloat.

## 2. The Problem It Solves
When developers build with AI agents (Claude Code, Cursor, Copilot), they frequently fall into two traps:
1. **The Pure Prompting Trap:** Asking for "an app that does X" defaults to generic, homogeneous AI cliches (generic to-do lists, bland dashboards, disconnected social feeds) because the AI draws on generic training data rather than the user's specific context.
2. **Cognitive Debt:** The AI writes hundreds of lines of unverified code that the human doesn't understand, cannot debug, and cannot explain during demos.

## 3. Target Audience
Solo developers, hackathon participants, and non-technical founders who want to build functional prototypes in an afternoon without losing control of their architecture.

## 4. The Single Core Loop
1. **Input:** Builder provides a raw, 1-sentence product concept.
2. **Flipped Interview:** KernelCraft asks 3 targeted, contextual questions that probe the core user loop, visual identity, and edge cases.
3. **Cognitive Debt Radar:** Evaluates proposed features in real-time and scores cognitive debt risks (e.g., flags auth, multitenancy, or social feeds as afternoon anti-patterns).
4. **Now vs. Later Boundary:** Visually partitions features into "Afternoon PoC (Now)" vs. "v2 Roadmap (Later)".
5. **Interactive Preview:** Renders an instant live interactive mock of the defined core loop.
6. **Artifact Export:** Generates standardized, ready-to-commit `scope.md`, `prd.md`, and `spec.md` with 1 click.

## 5. Definition of "Done" for the Proof of Concept
- A clean, responsive single-page web studio operating in modern browsers.
- Real-time heuristic cognitive debt analyzer that scores scope complexity.
- Working interactive flipped interview engine with instant feedback.
- Visual Now vs. Later classification board.
- Instant live prototype canvas reflecting user decisions.
- Formatted markdown exporter conforming to Devpost Learn standards.
- Works 100% offline with zero external API key requirements.

## 6. Explicitly Out of Scope (Later)
- Cloud backend database sync and team collaboration (v2).
- Native iOS / Android compilation (v2).
- Automatic GitHub PR creation via OAuth (v2).
