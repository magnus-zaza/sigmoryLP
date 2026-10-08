import { useEffect, useState } from 'react';

const CAPABILITIES = [
  ['Component-based configuration', 'Define systems from reusable typed components and keep setup consistent across projects.'],
  ['Vendor-specific configuration', 'Configure device parameters, lookup tables, and interface details without leaving the workspace.'],
  ['Signal mapping', 'Connect system inputs and outputs with the same structured mapping approach used inside the app.'],
  ['Target controller selection', 'Choose the controller platform, output format, and delivery target before generating artifacts.'],
  ['Server-side generation and compile', 'Run generation and compilation from a controlled backend pipeline with a single action.'],
  ['Downloadable artifacts', 'Collect binaries, project files, and configuration bundles once the build is complete.'],
] as const;

const AUDIENCES = [
  ['System integrators', 'Assemble control systems from pre-configured component libraries and reusable templates.'],
  ['Automation engineers', 'Map signals, define logic, and prepare production-ready software from one interface.'],
  ['Marine, EV and industrial teams', 'Build battery-centric and machine control software for integrated, multi-device systems.'],
  ['OEM engineering groups', 'Standardize configuration, build outputs, and delivery workflows across product lines.'],
] as const;

const TYPING_LINES = [
  'Selecting components...',
  'Configuring interfaces...',
  'Generating control logic...',
  'Build ready.',
  'Downloading package...',
];

const WORKFLOW_STEPS = [
  'Select components',
  'Configure devices',
  'Map signals',
  'Choose controller',
  'Build',
  'Download',
];

function TypingAnimation() {
  const [displayed, setDisplayed] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayed(TYPING_LINES[0]);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const line = TYPING_LINES[lineIndex];

    const schedule = (fn: () => void, delay: number) => {
      timers.push(window.setTimeout(fn, delay));
    };

    const erase = (index: number) => {
      if (cancelled) return;
      setDisplayed(line.slice(0, index));
      if (index > 0) schedule(() => erase(index - 1), 22);
      else setLineIndex(previous => (previous + 1) % TYPING_LINES.length);
    };

    const type = (index: number) => {
      if (cancelled) return;
      setDisplayed(line.slice(0, index));
      if (index < line.length) schedule(() => type(index + 1), 45);
      else schedule(() => erase(line.length), 1400);
    };

    schedule(() => type(1), 0);
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [lineIndex]);

  return (
    <div className="hero-typing" aria-live="polite">
      <span>{displayed}</span><span className="typing-cursor" aria-hidden="true" />
    </div>
  );
}

function WorkflowAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(
      () => setActiveStep(previous => (previous + 1) % WORKFLOW_STEPS.length),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="workflow" aria-label="Sigmory workflow">
      {WORKFLOW_STEPS.map((label, index) => (
        <div className="workflow-item" key={label}>
          <div className={`workflow-step${index === activeStep ? ' active' : ''}${index < activeStep ? ' done' : ''}`}>
            {label}
          </div>
          {index < WORKFLOW_STEPS.length - 1 && (
            <span className={`workflow-arrow${index === activeStep ? ' active' : ''}`} aria-hidden="true">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button className="theme-toggle" onClick={onToggle} title="Toggle theme" aria-label="Toggle theme">
      <span className="theme-toggle-track">
        <svg className="theme-icon sun" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1v3m0 16v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M1 12h3m16 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
          </g>
        </svg>
        <svg className="theme-icon moon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor" />
        </svg>
        <span className="theme-thumb" />
      </span>
    </button>
  );
}

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sigmory-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sigmory-theme', theme);
  }, [theme]);

  return (
    <div className="landing">
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="Sigmory home">
            <span className="brand-mark"><img src="./Sigmory_logo_transparent-1.png" alt="" /></span>
            <span className="brand-name">Sigmory<span className="brand-accent">.</span><span className="brand-suffix">Studio</span></span>
          </a>
          <span className="header-label">Browser-based control engineering</span>
          <div className="header-actions">
            <ThemeToggle onToggle={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} />
            <a href="#overview" className="button secondary small">Overview</a>
          </div>
        </div>
      </header>

      <main className="page-shell" id="top">
        <section className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Control software studio</span>
            <h1>Generate control software from system configuration</h1>
            <p className="subtitle">Sigmory is a browser-based engineering platform for configuring components, mapping system logic, selecting target controllers, and generating build-ready control software artifacts.</p>
            <TypingAnimation />
            <div className="actions">
              <a href="#overview" className="button primary">See how it works</a>
              <a href="#capabilities" className="button secondary">Explore capabilities</a>
            </div>
          </div>

          <div className="card hero-panel">
            <div className="card-header">
              <div>
                <h2>Configuration flow</h2>
                <p>One structured workflow from component selection to downloadable build artifacts.</p>
              </div>
              <span className="badge">Studio</span>
            </div>
            <WorkflowAnimation />
            <div className="summary-grid">
              <div className="summary"><span>Workspace</span><strong>Components to artifacts</strong></div>
              <div className="summary"><span>Execution</span><strong>Server-side generate and compile</strong></div>
              <div className="summary"><span>Output</span><strong>Downloadable binaries and bundles</strong></div>
            </div>
          </div>
        </section>

        <section className="card section-card" id="overview">
          <div className="section-heading">
            <span className="eyebrow">Overview</span>
            <h2>What Sigmory does</h2>
            <p className="subtitle">Sigmory streamlines control software development by moving from system definition to compiled output inside one operational flow.</p>
          </div>
          <div className="overview-grid">
            {[
              ['01', 'Configure the system model', 'Start with components, parameters, and interface selections instead of manual project scaffolding.'],
              ['02', 'Map logic and controller targets', 'Carry the same structured data through signals, logic, and deployment targets.'],
              ['03', 'Generate build-ready artifacts', 'Compile server-side and deliver binaries, project archives, and supporting configuration outputs.'],
            ].map(([step, title, text]) => (
              <article className="overview-item" key={step}>
                <span className="step">{step}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="capabilities">
          <div className="section-heading">
            <span className="eyebrow">Capabilities</span>
            <h2>Key capabilities</h2>
            <p className="subtitle">A compact engineering workspace for every step between system definition and generated software.</p>
          </div>
          <div className="grid three">
            {CAPABILITIES.map(([title, description]) => (
              <article className="card grid-card" key={title}><span className="kicker">Capability</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <span className="eyebrow">Audience</span>
            <h2>Who it is for</h2>
            <p className="subtitle">For teams that need a predictable path from system definition to controller-ready software delivery.</p>
          </div>
          <div className="grid two">
            {AUDIENCES.map(([title, description]) => (
              <article className="card grid-card" key={title}><span className="kicker">Team</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="card cta-card">
          <div className="section-heading">
            <span className="eyebrow">Start</span>
            <h2>Ready to build?</h2>
            <p className="subtitle">Explore the workflow and capabilities behind configuration-driven control software generation.</p>
          </div>
          <a href="#top" className="button primary">Back to top</a>
        </section>
      </main>

      <footer><div className="footer-inner">© {new Date().getFullYear()} Sigmory. All rights reserved.</div></footer>
    </div>
  );
}
