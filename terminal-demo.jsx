import React, { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: () => ({
    type: 'list',
    lines: [
      { cmd: '/resume', desc: 'download resume as PDF' },
      { cmd: '/exp', desc: 'view work experience' },
      { cmd: '/projects', desc: 'view selected projects' },
      { cmd: '/whoami', desc: 'quick bio' },
      { cmd: '/contact', desc: 'get in touch' },
      { cmd: 'clear', desc: 'clear the terminal' },
    ],
  }),
  whoami: () => ({
    type: 'text',
    lines: [
      'kirtan chandak',
      'software developer @ kuration ai, hong kong',
      'building AI agents, MCP servers, developer tooling',
    ],
  }),
  exp: () => ({
    type: 'table',
    header: ['role', 'company', 'period'],
    rows: [
      ['SDE (Full-time)', 'Kuration AI', 'May 2025 — present'],
      ['SDE Intern', 'Kuration AI', 'Nov 2024 — Apr 2025'],
    ],
  }),
  projects: () => ({
    type: 'list',
    lines: [
      { cmd: 'baton', desc: 'Slack handoff/continuity agent — Bolt SDK, Python, Heroku' },
      { cmd: 'rant', desc: 'journaling app w/ semantic search + AI memory review' },
      { cmd: 'groundtruth', desc: 'AI data steward — Auditor→Researcher→Escalation agents' },
    ],
  }),
  resume: () => ({
    type: 'text',
    lines: ['→ downloading resume.pdf ...', '(wire this up to your actual file)'],
  }),
  contact: () => ({
    type: 'text',
    lines: ['email: [email protected]', 'github: github.com/kirtanchandak'],
  }),
};

function playTick(freq = 720, vol = 0.04) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

const ASCII_LOGO = [
  ' _    _      _              ',
  '| | _(_)_ __| |_ __ _ _ __  ',
  '| |/ / | \'__| __/ _` | \'_ \\ ',
  '|   <| | |  | || (_| | | | |',
  '|_|\\_\\_|_|   \\__\\__,_|_| |_|',
];

const BOOT_STEPS = [
  { text: 'initializing shell...', delay: 120 },
  { text: 'loading kirtan.dev v1.0.0', delay: 120 },
  { text: 'resolving modules: resume, exp, projects, contact', delay: 160 },
  { text: 'connecting to github api... ok', delay: 140 },
  { text: 'connecting to kuration.ai... ok', delay: 140 },
  { text: '', delay: 80 },
  { text: "ready. type 'help' to see available commands", delay: 60 },
];

function BootSequence({ logoLines, onLogoLine, onLine, onDone }) {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < ASCII_LOGO.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 55));
        playTick(1200, 0.02);
        onLogoLine();
      }
      await new Promise((r) => setTimeout(r, 200));

      for (let i = 0; i < BOOT_STEPS.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, BOOT_STEPS[i].delay));
        if (BOOT_STEPS[i].text) playTick(500 + i * 30, 0.025);
        onLine(BOOT_STEPS[i].text);
      }
      await new Promise((r) => setTimeout(r, 300));
      if (!cancelled) onDone();
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function TerminalDemo() {
  const [booted, setBooted] = useState(false);
  const [logoLines, setLogoLines] = useState(0);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!booted) return; // don't fight the boot sequence's own scroll position
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, booted]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const handleBootLine = (text) => {
    setHistory((h) => [...h, { type: 'text', lines: [text], boot: true }]);
  };

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const key = trimmed.replace(/^\//, '').toLowerCase();

    if (key === 'clear') {
      setHistory([]);
      return;
    }

    const entry = { type: 'echo', text: trimmed };
    let result;
    if (COMMANDS[key]) {
      result = COMMANDS[key]();
    } else {
      result = {
        type: 'text',
        lines: [`command not found: ${trimmed}`, "type 'help' for a list of commands"],
      };
    }
    setHistory((h) => [...h, entry, result]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    playTick();
    runCommand(input);
    setCmdHistory((h) => [...h, input]);
    setHistIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const newIndex = histIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistIndex(-1);
        setInput('');
      } else {
        setHistIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.replace(/^\//, '').toLowerCase();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(partial));
      if (match) setInput('/' + match);
    }
  };

  const renderResult = (item, i) => {
    if (item.type === 'echo') {
      return (
        <div key={i} style={{ color: '#7dd3a0', marginTop: 10 }}>
          <span style={{ color: '#5b6472' }}>guest@kirtan.dev</span>
          <span style={{ color: '#3d4552' }}>:~$ </span>
          {item.text}
        </div>
      );
    }
    if (item.type === 'text') {
      return (
        <div key={i} style={{ marginLeft: 2 }}>
          {item.lines.map((l, j) => (
            <div key={j} style={{ color: item.boot ? (l.startsWith('ready') ? '#7dd3a0' : '#8b95a1') : '#c9d1d9' }}>
              {l}
            </div>
          ))}
        </div>
      );
    }
    if (item.type === 'list') {
      return (
        <div key={i} style={{ marginLeft: 2 }}>
          {item.lines.map((l, j) => (
            <div key={j} style={{ display: 'flex', gap: 12 }}>
              <span style={{ color: '#e8a24a', minWidth: 110 }}>{l.cmd}</span>
              <span style={{ color: '#8b95a1' }}>{l.desc}</span>
            </div>
          ))}
        </div>
      );
    }
    if (item.type === 'table') {
      return (
        <div key={i} style={{ marginLeft: 2 }}>
          <div style={{ display: 'flex', gap: 16, color: '#5b6472', borderBottom: '1px solid #262b33', paddingBottom: 4, marginBottom: 4 }}>
            {item.header.map((h, j) => (
              <span key={j} style={{ minWidth: j === 0 ? 160 : 140 }}>{h}</span>
            ))}
          </div>
          {item.rows.map((row, j) => (
            <div key={j} style={{ display: 'flex', gap: 16, color: '#c9d1d9' }}>
              {row.map((cell, k) => (
                <span key={k} style={{ minWidth: k === 0 ? 160 : 140 }}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        background: '#0d1117',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 720,
          background: '#111318',
          border: '1px solid #262b33',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            borderBottom: '1px solid #262b33',
            background: '#15181e',
          }}
        >
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          <span style={{ color: '#5b6472', fontSize: 12, marginLeft: 8 }}>guest@kirtan.dev — zsh</span>
        </div>

        <div ref={scrollRef} style={{ padding: '16px 18px', fontSize: 13.5, lineHeight: 1.7, minHeight: 320, maxHeight: 420, overflowY: 'auto' }}>
          <pre
            style={{
              color: '#e8a24a',
              fontSize: 12.5,
              lineHeight: 1.35,
              margin: 0,
              marginBottom: logoLines > 0 ? 10 : 0,
            }}
          >
            {ASCII_LOGO.slice(0, logoLines).join('\n')}
          </pre>
          {!booted && (
            <BootSequence
              logoLines={logoLines}
              onLogoLine={() => setLogoLines((n) => n + 1)}
              onLine={handleBootLine}
              onDone={() => setBooted(true)}
            />
          )}
          {history.map(renderResult)}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #262b33', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 6, opacity: booted ? 1 : 0.35 }}>
          <span style={{ color: '#5b6472', fontSize: 13.5 }}>guest@kirtan.dev</span>
          <span style={{ color: '#3d4552', fontSize: 13.5 }}>:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!booted}
            spellCheck={false}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e8e8e8',
              fontSize: 13.5,
              fontFamily: 'inherit',
              flex: 1,
            }}
            placeholder={booted ? 'try /resume, /exp, /projects, help' : ''}
          />
        </form>
      </div>
    </div>
  );
}
