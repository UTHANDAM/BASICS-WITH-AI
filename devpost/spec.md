---
status: approved
---

# Technical Specification: KernelCraft

## 1. Architecture Overview
KernelCraft is built as an offline-first, highly responsive single-page application (SPA). It requires no build step or bundler dependencies to run, ensuring 100% portability, zero-configuration setup, and instant execution for hackathon evaluators.

```
+-------------------------------------------------------------+
|                        KernelCraft App                      |
+------------------------------+------------------------------+
|   Interactive Interviewer    |   Live Preview & Exporter    |
|   - State Machine Engine     |   - Wireframe Simulator      |
|   - Cognitive Debt Scorer    |   - Visual Theme Engine      |
|   - Now vs Later Triage      |   - Markdown Serializer      |
+------------------------------+------------------------------+
|         Local State & Persistence (HTML5 localStorage)      |
+-------------------------------------------------------------+
```

## 2. Component Breakdown
1. **`InterviewController`**: Manages step-by-step questions, user inputs, and progressive disclosure.
2. **`CognitiveDebtEngine`**: Analyzes the planned feature set, applies weighted heuristics against complexity risks (auth, database, websockets, payments), and outputs a numerical score + warnings.
3. **`TriageBoard`**: Interactive component for moving features between "Now (PoC)" and "Later (Backlog)".
4. **`WireframeSimulator`**: Live component rendering an interactive simulation of the user's defined app loop.
5. **`MarkdownGenerator`**: Translates current project state into valid, compliant Devpost Learn planning documents (`scope.md`, `prd.md`, `spec.md`).
6. **`AudioFeedback`**: Pure browser Web Audio API oscillator synthesis generating subtle, high-quality tactile clicks without any external sound assets.

## 3. Technology Stack Justification
- **Frontend Core:** Pure modern HTML5, CSS3, and ES6+ JavaScript.
  - *Why:* Zero build step friction, zero dependency vulnerabilities, runs natively on any computer directly via `index.html` or local HTTP server.
- **Styling:** Custom CSS design system with CSS custom properties (variables), modern flexbox/grid, glassmorphism backdrop filters, and responsive layout.
- **Persistence:** Browser `localStorage` API for instant state saving and session restoration.
- **Typography & Icons:** Embedded SVG icons and system-native monospaced fonts (`JetBrains Mono`, `Consolas`, `ui-monospace`).

## 4. Data Model Schema
```typescript
interface ProjectState {
  id: string;
  name: string;
  tagline: string;
  domain: 'devtools' | 'productivity' | 'creator' | 'education' | 'utility';
  targetAudience: string;
  coreLoop: {
    inputAction: string;
    processAction: string;
    outputAction: string;
  };
  featuresNow: FeatureItem[];
  featuresLater: FeatureItem[];
  designTheme: 'editorial' | 'cyberpunk' | 'nordic' | 'terminal';
  cognitiveDebtScore: number;
  warnings: string[];
}

interface FeatureItem {
  id: string;
  title: string;
  complexityWeight: number; // 5 - 30
  category: string;
  isAntiPattern: boolean;
  warningNote?: string;
}
```

## 5. Verification & Test Plan
- **Verification 1:** Flow completion — User can complete all 4 interview steps and see the live wireframe update in real time.
- **Verification 2:** Heuristic calculation — Adding high-complexity anti-patterns (e.g., "Full OAuth Login", "Multi-tenant DB") increases cognitive debt score and surfaces alert pills.
- **Verification 3:** Triage interaction — Moving items between "Now" and "Later" recalibrates the score immediately.
- **Verification 4:** Export fidelity — Clicking "Export Devpost Docs" produces complete, non-empty, markdown files ready for git tracking.
- **Verification 5:** Offline independence — Application runs seamlessly with zero network access and loads instantly.
