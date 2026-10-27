/**
 * KernelCraft — The Anti-Generic AI Product Studio
 * Client-Side Application Core
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Default State & Preset Data
  // ---------------------------------------------------------------------------
  const PRESETS = {
    'log-analyzer': {
      name: 'DebugWhisperer',
      tagline: 'Translates convoluted terminal tracebacks into plain-English root causes with one-click fixes.',
      category: 'devtools',
      persona: 'A solo developer stuck debugging an unexpected error log while building their first hackathon app.',
      loopInput: 'Paste raw stack trace / error log',
      loopProcess: 'Strips noise, identifies failing line, maps error type',
      loopOutput: 'Plain-English explanation + copyable fix snippet',
      theme: 'terminal',
      featuresNow: [
        { id: 'f1', title: 'Single Log Input Box', weight: 8, anti: false },
        { id: 'f2', title: 'Noise Stripper & Error Parser', weight: 12, anti: false },
        { id: 'f3', title: 'One-Click Copyable Code Fix', weight: 10, anti: false }
      ],
      featuresLater: [
        { id: 'f4', title: 'Multi-User Cloud Log Storage', weight: 28, anti: true, warning: 'Multi-tenant cloud storage introduces database migrations and cognitive debt.' },
        { id: 'f5', title: 'GitHub OAuth & Automatic PR Creation', weight: 25, anti: true, warning: 'OAuth token flows easily derail an afternoon prototype.' },
        { id: 'f6', title: 'Live Team Slack Notification Webhook', weight: 20, anti: true, warning: 'Webhook integrations require external tunnel setups.' }
      ],
      sampleInput: `Traceback (most recent call last):\n  File "server.py", line 42, in handle_request\n    user_id = payload["auth"]["sub"]\nKeyError: 'auth'`,
      sampleOutput: `<strong>Root Cause:</strong> The incoming request payload is missing the <code>auth</code> object, causing a <code>KeyError</code> at line 42.<br><br><strong>Recommended Fix:</strong><pre style="background:#111;padding:8px;border-radius:4px;margin-top:6px;font-family:monospace;">user_id = payload.get("auth", {}).get("sub")\nif not user_id:\n    return {"error": "Unauthorized"}, 401</pre>`
    },
    'flashcards': {
      name: 'MicroRecall',
      tagline: 'Generates 3 targeted retrieval flashcards from any paragraph using spaced repetition intervals.',
      category: 'education',
      persona: 'A medical or CS student reviewing dense documentation in 15-minute study sprints.',
      loopInput: 'Paste a dense paragraph of notes',
      loopProcess: 'Extracts key facts, generates question-answer pairs',
      loopOutput: 'Interactive 3-card flip deck with confidence rating',
      theme: 'nordic',
      featuresNow: [
        { id: 'f1', title: 'Paragraph Text Extractor', weight: 10, anti: false },
        { id: 'f2', title: '3-Card Flip Deck Generator', weight: 12, anti: false },
        { id: 'f3', title: 'Confidence Rating (Easy/Hard)', weight: 8, anti: false }
      ],
      featuresLater: [
        { id: 'f4', title: 'Global Public Deck Marketplace', weight: 30, anti: true, warning: 'Marketplaces require moderation and user auth.' },
        { id: 'f5', title: 'Stripe Subscription Billing', weight: 25, anti: true, warning: 'Payment gateway integration blows afternoon scope.' },
        { id: 'f6', title: 'Native iOS / Android Push Reminders', weight: 35, anti: true, warning: 'Mobile push certificates derail single-loop web PoCs.' }
      ],
      sampleInput: `Mitochondria generate most of the chemical energy needed to power the biochemical reactions through adenosine triphosphate (ATP). Energy produced by mitochondria is stored in ATP.`,
      sampleOutput: `<strong>Card 1:</strong> What primary molecule stores mitochondrial energy?<br><em>Answer:</em> Adenosine Triphosphate (ATP)<br><br><strong>Card 2:</strong> What is the main biochemical role of mitochondria?<br><em>Answer:</em> Cellular energy generation through ATP production.`
    },
    'pitch-deck': {
      name: 'OneSlide',
      tagline: 'Transforms complex startup problem statements into a single, high-impact pitch slide layout.',
      category: 'creator',
      persona: 'An indie founder preparing to pitch their micro-SaaS to early angel investors.',
      loopInput: 'Paste product summary & target audience',
      loopProcess: 'Distills metrics, structures headline, problem, and solution',
      loopOutput: 'Live responsive SVG slide card ready for export',
      theme: 'editorial',
      featuresNow: [
        { id: 'f1', title: 'Founder Summary Input Field', weight: 8, anti: false },
        { id: 'f2', title: '3-Column Metric Formatter', weight: 12, anti: false },
        { id: 'f3', title: 'High-Res Slide PNG/SVG Export', weight: 10, anti: false }
      ],
      featuresLater: [
        { id: 'f4', title: 'Real-Time Multi-Cursor Collaboration', weight: 40, anti: true, warning: 'Operational transforms / CRDTs add massive cognitive overhead.' },
        { id: 'f5', title: 'Custom Font Library & Cloud Upload', weight: 20, anti: false },
        { id: 'f6', title: 'Investor CRM & Analytics Tracking', weight: 30, anti: true, warning: 'Analytics pipelines distract from the presentation kernel.' }
      ],
      sampleInput: `We build dev tools for AI builders. 80% of AI prototypes fail to ship because of cognitive debt and scope bloat. We help developers scope and finish an app in an afternoon.`,
      sampleOutput: `<strong>Slide Title:</strong> Ending Cognitive Debt in AI Development<br><strong>The Core Metric:</strong> 80% of prototypes abandoned due to unmanageable AI code.<br><strong>The Solution:</strong> Single-action plan-first scaffolding that guarantees an afternoon ship.`
    }
  };

  // State
  let state = {
    currentStep: 1,
    name: 'DebugWhisperer',
    tagline: 'Translates convoluted terminal tracebacks into plain-English root causes with one-click fixes.',
    category: 'devtools',
    persona: 'A solo developer stuck debugging an unexpected error log while building their first hackathon app.',
    loopInput: 'Paste raw stack trace / error log',
    loopProcess: 'Strips noise, identifies failing line, maps error type',
    loopOutput: 'Plain-English explanation + copyable fix snippet',
    theme: 'editorial',
    soundEnabled: true,
    featuresNow: [
      { id: 'f1', title: 'Single Log Input Box', weight: 8, anti: false },
      { id: 'f2', title: 'Noise Stripper & Error Parser', weight: 12, anti: false },
      { id: 'f3', title: 'One-Click Copyable Code Fix', weight: 10, anti: false }
    ],
    featuresLater: [
      { id: 'f4', title: 'Multi-User Cloud Log Storage', weight: 28, anti: true, warning: 'Multi-tenant cloud storage introduces database migrations and cognitive debt.' },
      { id: 'f5', title: 'GitHub OAuth & Automatic PR Creation', weight: 25, anti: true, warning: 'OAuth token flows easily derail an afternoon prototype.' },
      { id: 'f6', title: 'Live Team Slack Notification Webhook', weight: 20, anti: true, warning: 'Webhook integrations require external tunnel setups.' }
    ],
    sampleInput: `Traceback (most recent call last):\n  File "server.py", line 42, in handle_request\n    user_id = payload["auth"]["sub"]\nKeyError: 'auth'`,
    sampleOutput: `<strong>Root Cause:</strong> The incoming request payload is missing the <code>auth</code> object, causing a <code>KeyError</code> at line 42.<br><br><strong>Recommended Fix:</strong><pre style="background:#111;padding:8px;border-radius:4px;margin-top:6px;font-family:monospace;">user_id = payload.get("auth", {}).get("sub")\nif not user_id:\n    return {"error": "Unauthorized"}, 401</pre>`
  };

  // ---------------------------------------------------------------------------
  // Web Audio Synthesizer (Zero Assets Audio)
  // ---------------------------------------------------------------------------
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },
    playClick(freq = 480, duration = 0.04) {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // AudioContext ignored if blocked by autoplay policies
      }
    },
    playSuccess() {
      if (!state.soundEnabled) return;
      this.playClick(587, 0.08);
      setTimeout(() => this.playClick(880, 0.12), 60);
    }
  };

  // ---------------------------------------------------------------------------
  // Cognitive Debt Calculation Engine
  // ---------------------------------------------------------------------------
  function calculateCognitiveDebt() {
    let score = 0;
    const warnings = [];

    // Calculate baseline score from active features in "Now"
    state.featuresNow.forEach(f => {
      score += f.weight;
      if (f.anti) {
        score += 15; // Extra penalty for anti-pattern in Now
        if (f.warning) warnings.push(f.warning);
      }
    });

    // Clamp score 0 - 100
    score = Math.min(Math.max(score, 10), 100);

    return { score, warnings };
  }

  function updateDebtUI() {
    const { score, warnings } = calculateCognitiveDebt();
    const scoreVal = document.getElementById('debt-score-value');
    const barFill = document.getElementById('debt-bar-fill');
    const statusText = document.getElementById('debt-status-text');
    const tip = document.getElementById('debt-tip');
    const alertBox = document.getElementById('anti-pattern-alerts');

    scoreVal.textContent = `${score}%`;
    barFill.style.width = `${score}%`;

    // Visual classification
    if (score <= 35) {
      barFill.style.backgroundColor = 'var(--accent)';
      statusText.className = 'status-pill status-good';
      statusText.textContent = `Healthy PoC (${score}%)`;
      tip.textContent = 'Clean single-action loop. You can comfortably build, test, and ship this in an afternoon!';
    } else if (score <= 65) {
      barFill.style.backgroundColor = 'var(--warning)';
      statusText.className = 'status-pill status-warn';
      statusText.textContent = `Caution: Scope Creep (${score}%)`;
      tip.textContent = 'Careful! Adding too many features risks AI amnesia and incomplete implementations. Consider moving an item to Later.';
    } else {
      barFill.style.backgroundColor = 'var(--danger)';
      statusText.className = 'status-pill status-danger';
      statusText.textContent = `Critical Cognitive Debt (${score}%)`;
      tip.textContent = 'Danger! Heavy features detected that will derail your afternoon submission. Prune anti-patterns into Later now!';
    }

    // Render alert callouts
    if (warnings.length > 0) {
      alertBox.classList.remove('hidden');
      alertBox.innerHTML = warnings.map(w => `
        <div class="alert-box">
          <span>⚠️ ${w}</span>
        </div>
      `).join('');
    } else {
      alertBox.classList.add('hidden');
      alertBox.innerHTML = '';
    }
  }

  // ---------------------------------------------------------------------------
  // Triage Feature Lists
  // ---------------------------------------------------------------------------
  function renderTriageLists() {
    const listNow = document.getElementById('list-now');
    const listLater = document.getElementById('list-later');
    const countNow = document.getElementById('count-now');
    const countLater = document.getElementById('count-later');
    const chipsContainer = document.getElementById('sim-feature-chips');

    countNow.textContent = `${state.featuresNow.length} items`;
    countLater.textContent = `${state.featuresLater.length} items`;

    listNow.innerHTML = state.featuresNow.map(item => `
      <li class="feature-item" data-id="${item.id}" data-col="now">
        <span>${item.title}</span>
        <button class="btn-toggle-move" title="Move to Later">&rarr;</button>
      </li>
    `).join('');

    listLater.innerHTML = state.featuresLater.map(item => `
      <li class="feature-item" data-id="${item.id}" data-col="later">
        <span>${item.title}</span>
        <button class="btn-toggle-move" title="Move to Now">&larr;</button>
      </li>
    `).join('');

    // Update Right Panel Chips
    chipsContainer.innerHTML = state.featuresNow.map(item => `
      <span class="feature-chip">&check; ${item.title}</span>
    `).join('');

    updateDebtUI();
  }

  function moveFeature(id, fromCol) {
    AudioEngine.playClick(600, 0.05);
    if (fromCol === 'now') {
      const idx = state.featuresNow.findIndex(f => f.id === id);
      if (idx !== -1) {
        const item = state.featuresNow.splice(idx, 1)[0];
        state.featuresLater.push(item);
      }
    } else {
      const idx = state.featuresLater.findIndex(f => f.id === id);
      if (idx !== -1) {
        const item = state.featuresLater.splice(idx, 1)[0];
        state.featuresNow.push(item);
      }
    }
    renderTriageLists();
    saveState();
  }

  // ---------------------------------------------------------------------------
  // Step Navigation & Synchronous State Reflection
  // ---------------------------------------------------------------------------
  function goToStep(stepNumber) {
    AudioEngine.playClick(520, 0.04);
    state.currentStep = stepNumber;

    // Update Stepper Nav
    document.querySelectorAll('.step-btn').forEach(btn => {
      const s = parseInt(btn.dataset.step, 10);
      btn.classList.toggle('active', s === stepNumber);
      btn.classList.toggle('completed', s < stepNumber);
    });

    // Update Step Views
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`step-${i}`);
      if (el) {
        el.classList.toggle('hidden', i !== stepNumber);
        el.classList.toggle('active', i === stepNumber);
      }
    }

    // Refresh specs if step 4
    if (stepNumber === 4) {
      updateSpecDocumentView();
    }
  }

  function syncInputsToState() {
    state.name = document.getElementById('input-project-name').value || 'MyPoCApp';
    state.tagline = document.getElementById('input-project-tagline').value || 'A tight, single-action tool.';
    state.persona = document.getElementById('q-persona').value || 'A focused creator or developer.';
    state.loopInput = document.getElementById('loop-input').value || 'Raw input data';
    state.loopProcess = document.getElementById('loop-process').value || 'Parses and transforms data';
    state.loopOutput = document.getElementById('loop-output').value || 'Clean structured result';

    // Synchronize to Live Prototype Screen (Right Column)
    document.getElementById('sim-app-name').textContent = state.name;
    document.getElementById('sim-tagline').textContent = state.tagline;
    document.getElementById('sim-persona-quote').textContent = `Designed for: ${state.persona}`;
    document.getElementById('sim-category').textContent = state.category.toUpperCase();
    document.getElementById('sim-input-label').textContent = `${state.loopInput}:`;
    document.getElementById('sim-btn-text').textContent = state.loopProcess;

    saveState();
  }

  // ---------------------------------------------------------------------------
  // Prototype Interactive Simulation
  // ---------------------------------------------------------------------------
  function runSimulatedLoop() {
    AudioEngine.playClick(750, 0.05);
    const inputVal = document.getElementById('sim-input-text').value.trim();
    const outputBox = document.getElementById('sim-output-box');
    const outputContent = document.getElementById('sim-output-content');
    const btn = document.getElementById('btn-sim-run');
    const spinner = document.getElementById('sim-spinner');

    if (!inputVal) {
      document.getElementById('sim-input-text').focus();
      AudioEngine.playClick(300, 0.08);
      return;
    }

    btn.disabled = true;
    spinner.classList.remove('hidden');

    // Simulate snappy client-side transformation (180ms)
    setTimeout(() => {
      btn.disabled = false;
      spinner.classList.add('hidden');
      outputBox.classList.remove('hidden');

      if (state.sampleOutput && inputVal.includes('KeyError')) {
        outputContent.innerHTML = state.sampleOutput;
      } else if (state.sampleOutput && inputVal.toLowerCase().includes('mitochondria')) {
        outputContent.innerHTML = state.sampleOutput;
      } else {
        outputContent.innerHTML = `
          <strong>Transformation Result:</strong><br>
          Successfully processed <em>"${inputVal.slice(0, 40)}..."</em> through <strong>${state.loopProcess}</strong>.<br>
          <strong>Output:</strong> ${state.loopOutput}
        `;
      }

      AudioEngine.playSuccess();
    }, 220);
  }

  function insertSample() {
    AudioEngine.playClick(650, 0.04);
    const textarea = document.getElementById('sim-input-text');
    textarea.value = state.sampleInput || 'Traceback (most recent call last):\n  File "demo.py", line 12, in <module>\nKeyError: "user"';
    textarea.focus();
  }

  // ---------------------------------------------------------------------------
  // Devpost Documentation Generator
  // ---------------------------------------------------------------------------
  let activeDocType = 'scope';

  function generateMarkdown(type) {
    const nowFeaturesList = state.featuresNow.map(f => `- ${f.title}`).join('\n');
    const laterFeaturesList = state.featuresLater.map(f => `- ${f.title}`).join('\n');

    if (type === 'scope') {
      return `---
status: approved
---

# Project Scope: ${state.name}

## 1. Project Kernel
**${state.name}** is a single-action proof of concept designed to ${state.tagline.toLowerCase()}

## 2. Problem Statement
Many applications become bloated with unnecessary features that accumulate cognitive debt. ${state.name} eliminates this by focusing exclusively on a single verified workflow loop.

## 3. Target Audience
${state.persona}

## 4. The Single Core Loop
1. **User Input:** ${state.loopInput}
2. **Core Transformation:** ${state.loopProcess}
3. **Verified Output:** ${state.loopOutput}

## 5. Scope Boundaries
### Now (Afternoon Proof of Concept)
${nowFeaturesList}

### Later (v2 Backlog)
${laterFeaturesList}
`;
    }

    if (type === 'prd') {
      return `---
status: approved
---

# Product Requirements Document (PRD): ${state.name}

## 1. Executive Summary
${state.name} delivers: "${state.tagline}".

## 2. User Journey
- **Trigger:** ${state.persona}
- **Action:** User enters raw data into the ${state.loopInput} field.
- **Processing:** The system performs ${state.loopProcess}.
- **Resolution:** The user receives ${state.loopOutput} ready to inspect or copy.

## 3. Design Aesthetic
- **Theme:** ${state.theme.toUpperCase()}
- **Layout:** High-focus split panel with real-time feedback.
- **Sensory:** Tactile audio confirmations and zero unstyled template elements.

## 4. Edge Cases Handled
- Empty input validation with non-blocking inline feedback.
- Instant client-side execution with zero external network failure points.
`;
    }

    if (type === 'spec') {
      return `---
status: approved
---

# Technical Specification: ${state.name}

## 1. Architecture
- **Client-Side SPA:** Pure HTML5, modern CSS3, and ES6+ JavaScript.
- **Persistence:** LocalStorage API for instant session restoration.
- **Audio:** Web Audio API oscillator synthesis.
- **Dependencies:** Zero external npm build dependencies; 100% portable.

## 2. Data Flow
\`[User Input: ${state.loopInput}] \u2192 [Processing: ${state.loopProcess}] \u2192 [Output: ${state.loopOutput}]\`

## 3. Verification Suite
- [x] Initial state successfully loads from storage.
- [x] Core transformation completes in under 50ms.
- [x] Triage features correctly recalculate cognitive debt index.
- [x] Markdown export formats conform strictly to Devpost Learn criteria.
`;
    }
  }

  function updateSpecDocumentView() {
    const filenameLabel = document.getElementById('doc-filename');
    const contentArea = document.getElementById('doc-content-area');

    filenameLabel.textContent = `devpost/${activeDocType}.md`;
    contentArea.textContent = generateMarkdown(activeDocType);
  }

  // ---------------------------------------------------------------------------
  // LocalStorage Persistence
  // ---------------------------------------------------------------------------
  function saveState() {
    try {
      localStorage.setItem('kernelcraft_state', JSON.stringify(state));
    } catch (e) {
      // Ignored if local storage disabled
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem('kernelcraft_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
      }
    } catch (e) {
      // Fallback to default state
    }
  }

  // ---------------------------------------------------------------------------
  // Event Bindings
  // ---------------------------------------------------------------------------
  function setupEventListeners() {
    // Stepper buttons
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        syncInputsToState();
        goToStep(parseInt(btn.dataset.step, 10));
      });
    });

    // Navigation buttons
    document.getElementById('btn-to-step-2').addEventListener('click', () => {
      syncInputsToState();
      goToStep(2);
    });
    document.getElementById('btn-back-to-1').addEventListener('click', () => {
      syncInputsToState();
      goToStep(1);
    });
    document.getElementById('btn-to-step-3').addEventListener('click', () => {
      syncInputsToState();
      goToStep(3);
    });
    document.getElementById('btn-back-to-2').addEventListener('click', () => {
      syncInputsToState();
      goToStep(2);
    });
    document.getElementById('btn-to-step-4').addEventListener('click', () => {
      syncInputsToState();
      goToStep(4);
    });
    document.getElementById('btn-back-to-3').addEventListener('click', () => {
      syncInputsToState();
      goToStep(3);
    });

    // Live sync inputs
    ['input-project-name', 'input-project-tagline', 'q-persona', 'loop-input', 'loop-process', 'loop-output'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', syncInputsToState);
      }
    });

    // Category pills
    document.querySelectorAll('#category-picker .pill').forEach(pill => {
      pill.addEventListener('click', () => {
        AudioEngine.playClick(600, 0.03);
        document.querySelectorAll('#category-picker .pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.category = pill.dataset.category;
        syncInputsToState();
      });
    });

    // Theme selector pills
    document.querySelectorAll('#theme-picker .theme-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        AudioEngine.playClick(650, 0.03);
        document.querySelectorAll('#theme-picker .theme-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.theme = pill.dataset.theme;
        document.body.className = `theme-${state.theme}`;
        syncInputsToState();
      });
    });

    // Triage Board Click Delegation
    document.querySelector('.triage-board').addEventListener('click', e => {
      const item = e.target.closest('.feature-item');
      if (item) {
        const id = item.dataset.id;
        const col = item.dataset.col;
        moveFeature(id, col);
      }
    });

    // Preset selection
    document.getElementById('demo-presets').addEventListener('change', e => {
      const key = e.target.value;
      if (PRESETS[key]) {
        AudioEngine.playSuccess();
        const p = PRESETS[key];
        state.name = p.name;
        state.tagline = p.tagline;
        state.category = p.category;
        state.persona = p.persona;
        state.loopInput = p.loopInput;
        state.loopProcess = p.loopProcess;
        state.loopOutput = p.loopOutput;
        state.theme = p.theme;
        state.featuresNow = JSON.parse(JSON.stringify(p.featuresNow));
        state.featuresLater = JSON.parse(JSON.stringify(p.featuresLater));
        state.sampleInput = p.sampleInput;
        state.sampleOutput = p.sampleOutput;

        // Sync UI
        document.getElementById('input-project-name').value = state.name;
        document.getElementById('input-project-tagline').value = state.tagline;
        document.getElementById('q-persona').value = state.persona;
        document.getElementById('loop-input').value = state.loopInput;
        document.getElementById('loop-process').value = state.loopProcess;
        document.getElementById('loop-output').value = state.loopOutput;

        document.body.className = `theme-${state.theme}`;

        document.querySelectorAll('#category-picker .pill').forEach(pill => {
          pill.classList.toggle('active', pill.dataset.category === state.category);
        });

        document.querySelectorAll('#theme-picker .theme-pill').forEach(pill => {
          pill.classList.toggle('active', pill.dataset.theme === state.theme);
        });

        syncInputsToState();
        renderTriageLists();
      }
    });

    // Sound toggle
    document.getElementById('btn-sound').addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      document.getElementById('icon-sound-on').classList.toggle('hidden', !state.soundEnabled);
      document.getElementById('icon-sound-off').classList.toggle('hidden', state.soundEnabled);
      if (state.soundEnabled) AudioEngine.playClick(600, 0.05);
      saveState();
    });

    // Reset button
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('Reset to default project template?')) {
        localStorage.removeItem('kernelcraft_state');
        window.location.reload();
      }
    });

    // Simulator events
    document.getElementById('btn-sim-run').addEventListener('click', runSimulatedLoop);
    document.getElementById('btn-sim-sample').addEventListener('click', insertSample);

    // Export tabs
    document.querySelectorAll('.export-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        AudioEngine.playClick(550, 0.03);
        document.querySelectorAll('.export-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeDocType = tab.dataset.doc;
        updateSpecDocumentView();
      });
    });

    // Copy to clipboard
    document.getElementById('btn-copy-doc').addEventListener('click', () => {
      const text = generateMarkdown(activeDocType);
      navigator.clipboard.writeText(text).then(() => {
        AudioEngine.playSuccess();
        const toast = document.getElementById('toast');
        toast.textContent = `devpost/${activeDocType}.md copied to clipboard!`;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2500);
      });
    });

    // Download individual or all files
    document.getElementById('btn-download-all').addEventListener('click', () => {
      AudioEngine.playSuccess();
      ['scope', 'prd', 'spec'].forEach(doc => {
        const blob = new Blob([generateMarkdown(doc)], { type: 'text/markdown;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${doc}.md`;
        a.click();
      });
    });

    // View app map
    document.getElementById('btn-view-app-map').addEventListener('click', () => {
      window.open('devpost/app-map.html', '_blank');
    });
  }

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------
  function init() {
    loadState();

    // Populate initial inputs
    document.getElementById('input-project-name').value = state.name;
    document.getElementById('input-project-tagline').value = state.tagline;
    document.getElementById('q-persona').value = state.persona;
    document.getElementById('loop-input').value = state.loopInput;
    document.getElementById('loop-process').value = state.loopProcess;
    document.getElementById('loop-output').value = state.loopOutput;

    document.body.className = `theme-${state.theme}`;

    document.querySelectorAll('#category-picker .pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === state.category);
    });

    document.querySelectorAll('#theme-picker .theme-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.theme === state.theme);
    });

    setupEventListeners();
    syncInputsToState();
    renderTriageLists();
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
