---
status: approved
---

# Product Requirements Document (PRD): KernelCraft

## 1. Product Summary & Intent
KernelCraft is a dedicated studio for developers building with AI agents. It applies the "Flipped Interaction" methodology demonstrated by Joe Holmes at Devpost, helping users extract the smallest functional kernel of an application and protect against cognitive debt.

## 2. Core User Experience & Screen Layout
The application presents a unified, split-pane workspace designed for high focus:
- **Left Panel (The Flipped Interviewer & Scoper):**
  - Project Title & Domain Input
  - Step-by-Step Flipped Question Engine (Intent, Persona, Core Loop, Visual Vibe)
  - Interactive Feature Triage (Drag / Toggle between "Now (PoC)" and "Later (Backlog)")
  - Live Cognitive Debt Meter (Calculated from 0% to 100% based on scope weight and anti-patterns)
- **Right Panel (The Live Blueprint & Prototype Visualizer):**
  - Real-Time App Blueprint preview
  - Interactive Miniature Prototype (simulating the specified single-action user loop)
  - Anti-Generic Design Style Selector (e.g., Cyberpunk Minimal, Nordic Clean, Warm Editorial, Retro Terminal)
  - One-Click Exporter for `scope.md`, `prd.md`, and `spec.md` with Copy to Clipboard or File Download

## 3. Visual Identity & Anti-Generic Aesthetics
To break away from standard boilerplate Tailwind templates:
- **Palette:** Deep Obsidian (#0B0F19), Electric Amber (#F59E0B), Emerald Mint (#10B981), and Indigo Slate (#6366F1).
- **Typography:** Modern clean monospaced headers (`JetBrains Mono` / `Fira Code`) paired with crisp sans-serif body (`Inter` / system-ui).
- **Sensory Feedback:** Animated gauges, subtle audio clicks/pops (using Web Audio API synthesizer for tactile feel), and status badges.

## 4. Key Functional Requirements
- **FR-1 (Interview Flow):** Dynamic prompt questions that adapt based on the user's category (Developer Tool, Creative, Utility, Productivity).
- **FR-2 (Cognitive Debt Engine):** Real-time algorithm scoring feature count, async dependencies, and backend assumptions. Flags high-risk traps (e.g., "OAuth", "Multi-tenancy", "Custom payments") with explanatory warnings.
- **FR-3 (Interactive Simulation):** The prototype preview dynamically updates its buttons, form fields, and simulated output as the user makes choices in the interview.
- **FR-4 (Markdown Generation):** Generates compliant markdown specs with proper frontmatter (`status: approved`), structured headings, and formatted tables.

## 5. Edge Cases & Handling
- **Empty / Short inputs:** Input validation provides instant helpful nudges instead of crashing.
- **Overloaded scope:** If Cognitive Debt exceeds 70%, the Cognitive Debt Meter triggers an amber/red alert with specific actionable advice on what to prune to save the afternoon deadline.
- **Storage:** All session state automatically persists in `localStorage` so refreshing never loses progress.

## 6. Now vs. Later Feature Boundaries
- **Now (Included in PoC):**
  - Complete 4-step Flipped Interview flow.
  - Cognitive Debt Score & Rule Engine.
  - Interactive Now vs. Later triage.
  - Live interactive UI simulator.
  - Full Markdown export of `scope.md`, `prd.md`, `spec.md`.
  - Offline-first local storage persistence.
- **Later (Post-Hackathon):**
  - Direct integration with GitHub API for automatic branch commits.
  - LLM live streaming responses via user-supplied API key.
