# KernelCraft ⚡ The Anti-Generic AI Product Studio

> Built for the **Devpost "Build With AI: Basics"** hackathon.  
> Turn fuzzy AI ideas into airtight proof-of-concepts — without cognitive debt.

![Devpost Learn](https://img.shields.io/badge/Devpost-Build%20With%20AI%3A%20Basics-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20%26%20Verified-brightgreen?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B%20%7C%20Web%20Audio-orange?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/Dependencies-Zero-lightgrey?style=for-the-badge)

---

## 💡 The Core Problem

When developers build with AI agents (Claude Code, Cursor, Copilot), they quickly fall into two traps highlighted by Joe Holmes at Devpost:
1. **The Pure Prompting Trap:** Asking an AI to "build an app" yields generic, homogeneous clones (e.g., standard to-do lists, bland dashboards, disconnected social feeds) because models fall back to average training distributions rather than capturing distinct domain needs.
2. **Cognitive Debt:** The "evil twin" of technical debt. When an AI outputs code without the developer understanding the architecture, decisions, or flow, the developer cannot debug, defend, or extend it when issues arise.

**KernelCraft** solves this by operationalizing the **Flipped Interaction** method into a visual studio that helps builders lock in a single-loop proof-of-concept in an afternoon.

---

## ✨ Features

- **🎯 4-Step Flipped Interaction Engine:** Dynamic, structured interview extracting your target persona, the single-action core loop (Input $\rightarrow$ Process $\rightarrow$ Output), and visual aesthetic.
- **⚡ Real-Time Cognitive Debt Radar:** Heuristic weighted scoring algorithm that detects scope bloat and afternoon anti-patterns (e.g., Auth, Multi-tenancy, Payment gateways) before you write code.
- **⚖️ Now vs. Later Scope Triage:** Interactive board for locking down the afternoon proof-of-concept vs. post-hackathon roadmap.
- **🖥️ Live Interactive Wireframe Simulator:** As you define your app, a simulated interactive prototype updates on the right panel in real time, allowing you to test the core user loop immediately.
- **🎨 Anti-Generic Aesthetic Switcher:** Switch between 4 distinct visual themes (Warm Editorial, Cyberpunk Neon, Nordic Clean, Retro Terminal).
- **🔊 Tactile Audio Feedback:** Synthesized clicks and success tones using the native Web Audio API (zero external assets).
- **📋 1-Click Devpost Learn Doc Generator:** Exports verified, compliant `scope.md`, `prd.md`, and `spec.md` matching hackathon criteria.

---

## 📂 Devpost Learn Planning Documents

As required by the hackathon submission rules, all planning documents generated during the plan-first process are committed in this repository:

- 📄 [`devpost/scope.md`](devpost/scope.md) — The Project Kernel & Definition of Done
- 📄 [`devpost/prd.md`](devpost/prd.md) — Product Requirements & User Journey
- 📄 [`devpost/spec.md`](devpost/spec.md) — Technical Specification & Heuristic Model
- 📄 [`devpost/checklist.md`](devpost/checklist.md) — Verified Sliced Build Checklist
- 🌐 [`devpost/app-map.html`](devpost/app-map.html) — Interactive Visual Code Tour & Architecture Companion
- 👤 [`devpost/learner-profile.md`](devpost/learner-profile.md) — Learner Profile & Objectives

---

## 🚀 Quickstart & Running Locally

KernelCraft is built with **zero external dependencies**. It runs natively in any modern browser:

### Option 1: Direct File Open
Simply double-click [`index.html`](index.html) in your file explorer.

### Option 2: Local HTTP Server
```bash
# Using Node / npx
npx serve .

# Or using Python
python -m http.server 8000
```
Open `http://localhost:8000` or `http://localhost:3000` in your browser.

---

## 🎥 Video Demonstration (1–3 Minutes)

The demo video walks through:
1. **The Problem (0:00 - 0:30):** Why AI prototypes accumulate cognitive debt and how pure prompting produces generic apps.
2. **The Flipped Interview (0:30 - 1:15):** Setting the project kernel and defining the single-action loop.
3. **The Cognitive Debt Radar & Triage (1:15 - 1:45):** Pruning scope anti-patterns in real-time.
4. **The Live Simulator & Export (1:45 - 2:30):** Testing the live interactive prototype and exporting compliant Devpost planning documents.

---

## 🏆 What We Learned

1. **Plan Before You Build:** Spending 20 minutes answering probing questions about persona, single-action loops, and out-of-scope boundaries saves 3 hours of debugging broken AI-generated boilerplate.
2. **Cognitive Debt is Real:** Every feature added to an afternoon prototype introduces unmaintainable complexity. Restricting the proof-of-concept to one loop guarantees shipping.
3. **Flipped Interaction Works:** Prompting an AI to interview *you* produces an order of magnitude more specific, creative, and defensible product ideas.
