import { useState, useRef, useEffect, useCallback } from 'react'
import { OWNER, SOCIALS, PROJECTS } from '../config/portfolio'
import { useWindowCtx } from '../context/WindowContext'

// No import of APPS here — that would create a circular dep
// (apps.jsx → TerminalApp → apps.jsx). Use openById from context instead.

const HOST  = 'punya@portfolio'
const CWD   = '~'
const PROMPT = `${HOST}:${CWD}$ `

// ── ASCII art for neofetch ────────────────────────────────────
const ASCII = [
  ' ██████╗      ██╗ ',
  ' ██╔══██╗     ██║ ',
  ' ██████╔╝     ██║ ',
  ' ██╔═══╝ ██   ██║ ',
  ' ██║      ╚████╔╝ ',
  ' ╚═╝       ╚═══╝  ',
]

function NeofetchDisplay() {
  const rows = [
    { t: 'title',   v: `${OWNER.name.split(' ')[0].toLowerCase()}@portfolio` },
    { t: 'line' },
    { t: 'kv', k: 'OS',       v: 'PortfolioOS v2026.1 x86_64' },
    { t: 'kv', k: 'Shell',    v: '/bin/punya  (neon edition)' },
    { t: 'kv', k: 'Role',     v: OWNER.tagline },
    { t: 'kv', k: 'Uni',      v: `${OWNER.university} '${OWNER.gradYear.slice(-2)}` },
    { t: 'kv', k: 'Email',    v: OWNER.email },
    { t: 'kv', k: 'Projects', v: `${PROJECTS.length} shipped & counting` },
    { t: 'kv', k: 'Stack',    v: OWNER.techStack.slice(0, 5).join(', ') },
    { t: 'kv', k: 'LeetCode', v: `${SOCIALS.leetcode.solvedCount} solved` },
    { t: 'palette' },
  ]
  return (
    <div className="flex gap-8 font-mono text-xs leading-relaxed">
      <div>
        {ASCII.map((ln, i) => (
          <div key={i}>
            <span style={{ color: '#00ff7f' }}>{ln.slice(0, 9)}</span>
            <span style={{ color: '#00e5ff' }}>{ln.slice(9)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-0.5">
        {rows.map((r, i) => {
          if (r.t === 'title')   return <div key={i} style={{ color: '#00ff7f', fontWeight: 700 }}>{r.v}</div>
          if (r.t === 'line')    return <div key={i} style={{ color: 'rgba(0,255,127,0.25)' }}>{'─'.repeat(30)}</div>
          if (r.t === 'palette') return (
            <div key={i} className="flex gap-1 mt-1">
              {['#00ff7f','#00e5ff','#bd93f9','#f472b6','#fbbf24','#34d399','#ff5f56','#c8ffd6'].map(c => (
                <span key={c} style={{ background: c, display: 'inline-block', width: 16, height: 12, borderRadius: 2 }} />
              ))}
            </div>
          )
          return (
            <div key={i}>
              <span style={{ color: '#00ff7f', display: 'inline-block', minWidth: 72 }}>{r.k}:</span>
              <span style={{ color: '#c8ffd6' }}> {r.v}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Single output line ────────────────────────────────────────
function Line({ line }) {
  const c = (color, txt, extra = {}) => <span style={{ color, fontFamily: 'inherit', ...extra }}>{txt}</span>
  switch (line.type) {
    case 'neo':     return <NeofetchDisplay />
    case 'success': return c('#00ff7f', line.val)
    case 'error':   return c('#ff5f56', line.val)
    case 'warn':    return c('#fbbf24', line.val)
    case 'accent':  return c('#00e5ff', line.val)
    case 'dim':     return c('rgba(0,255,127,0.4)', line.val)
    case 'bold':    return c('#c8ffd6', line.val, { fontWeight: 700 })
    case 'link':
      return (
        <span>
          {c('rgba(0,255,127,0.4)', '→ ')}
          <a href={line.url} target="_blank" rel="noopener noreferrer"
            style={{ color: '#00e5ff', textDecoration: 'underline' }}>
            {line.val}
          </a>
        </span>
      )
    case 'kv':
      return (
        <span>
          <span style={{ color: '#00ff7f', display: 'inline-block', minWidth: 108 }}>{line.k}</span>
          <span style={{ color: '#c8ffd6' }}>{line.val}</span>
        </span>
      )
    case 'empty':   return <span>&nbsp;</span>
    case 'divider': return c('rgba(0,255,127,0.18)', '─'.repeat(56))
    default:        return c('#c8ffd6', line.val ?? '')
  }
}

// ── Boot sequence ─────────────────────────────────────────────
const BOOT = [
  { ms: 0,    line: { type: 'dim',     val: '$ ./boot_portfolio.sh' } },
  { ms: 280,  line: { type: 'dim',     val: '[  0.001] Mounting /home/punya...' } },
  { ms: 560,  line: { type: 'dim',     val: '[  0.234] Loading PortfolioOS v2026.1...' } },
  { ms: 880,  line: { type: 'dim',     val: '[  0.512] Starting window manager...' } },
  { ms: 1150, line: { type: 'success', val: '[  1.000] All systems operational. ✓' } },
  { ms: 1400, line: { type: 'empty',   val: '' } },
  { ms: 1600, line: { type: 'bold',    val: `Welcome to ${OWNER.name}'s Portfolio · PortfolioOS v2026` } },
  { ms: 1850, line: { type: 'dim',     val: "Type 'help' to get started, or 'neofetch' for system info." } },
  { ms: 2050, line: { type: 'empty',   val: '' } },
]

// ── Known app IDs for the 'open' command ─────────────────────
const APP_IDS = ['about', 'projects', 'github', 'linkedin', 'leetcode', 'instagram', 'contact', 'terminal']

export default function TerminalApp() {
  const { openById, closeWindow } = useWindowCtx()

  const [history, setHistory]  = useState([])
  const [input, setInput]      = useState('')
  const [cmdLog, setCmdLog]    = useState([])
  const [histIdx, setHistIdx]  = useState(-1)
  const [ready, setReady]      = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // ── Boot animation ────────────────────────────────────────
  useEffect(() => {
    const timers = BOOT.map(({ ms, line }) =>
      setTimeout(() => setHistory(h => [...h, { type: 'output', lines: [line] }]), ms)
    )
    timers.push(setTimeout(() => { setReady(true); inputRef.current?.focus() }, 2300))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // ── Command table ─────────────────────────────────────────
  const commands = useCallback(() => ({
    help: () => [
      { type: 'accent',  val: '  PortfolioOS — Commands' },
      { type: 'divider' },
      { type: 'kv', k: 'whoami',        val: 'About me' },
      { type: 'kv', k: 'about',         val: 'Open About Me window' },
      { type: 'kv', k: 'projects',      val: 'Open Projects explorer' },
      { type: 'kv', k: 'projects ls',   val: 'List all projects inline' },
      { type: 'kv', k: 'skills',        val: 'Full tech stack' },
      { type: 'kv', k: 'contact',       val: 'Open Contact form' },
      { type: 'kv', k: 'resume',        val: 'Download resume' },
      { type: 'empty' },
      { type: 'kv', k: 'github',        val: SOCIALS.github.handle },
      { type: 'kv', k: 'linkedin',      val: 'Open LinkedIn' },
      { type: 'kv', k: 'leetcode',      val: `${SOCIALS.leetcode.solvedCount} solved` },
      { type: 'kv', k: 'instagram',     val: SOCIALS.instagram.handle },
      { type: 'empty' },
      { type: 'kv', k: 'neofetch',      val: 'System info + ASCII art' },
      { type: 'kv', k: 'banner',        val: 'Show welcome banner' },
      { type: 'kv', k: 'ls',            val: 'List sections' },
      { type: 'kv', k: 'open <name>',   val: 'Open any app by name' },
      { type: 'kv', k: 'clear',         val: 'Clear terminal' },
      { type: 'kv', k: 'exit',          val: 'Close terminal' },
      { type: 'divider' },
      { type: 'dim', val: "Tip: try 'neofetch' → then 'projects' to explore my work." },
    ],

    whoami: () => [
      { type: 'empty' },
      { type: 'bold',    val: OWNER.name },
      { type: 'accent',  val: OWNER.tagline },
      { type: 'empty' },
      { type: 'default', val: OWNER.bio.replace(/\n/g, ' ') },
      { type: 'empty' },
      { type: 'kv', k: 'University', val: OWNER.university },
      { type: 'kv', k: 'Grad Year',  val: OWNER.gradYear },
      { type: 'kv', k: 'Email',      val: OWNER.email },
      { type: 'empty' },
    ],

    about: () => { openById('about'); return [{ type: 'success', val: '✓ Opening About Me...' }] },

    projects: () => { openById('projects'); return [{ type: 'success', val: '✓ Opening Projects...' }] },

    'projects ls': () => [
      { type: 'accent',  val: `  ${PROJECTS.length} Projects` },
      { type: 'divider' },
      ...PROJECTS.map((p, i) => ({
        type: 'kv',
        k: `[${String(i + 1).padStart(2, '0')}] ${p.name}`,
        val: p.subtitle,
      })),
      { type: 'empty' },
      { type: 'dim', val: "Type 'projects' to open the interactive explorer." },
    ],

    skills: () => [
      { type: 'accent',  val: '  Tech Stack' },
      { type: 'divider' },
      { type: 'kv', k: 'Languages', val: 'Python · TypeScript · JavaScript · SQL' },
      { type: 'kv', k: 'Frontend',  val: 'React · Next.js · Tailwind CSS · Framer Motion' },
      { type: 'kv', k: 'Backend',   val: 'FastAPI · Node.js · PostgreSQL · Redis' },
      { type: 'kv', k: 'AI / ML',   val: 'PyTorch · LangChain · OpenAI API · Pinecone' },
      { type: 'kv', k: 'DevOps',    val: 'Docker · AWS ECS · GitHub Actions · Vercel' },
      { type: 'empty' },
    ],

    contact:  () => { openById('contact');  return [{ type: 'success', val: '✓ Opening Contact form...' }] },
    github:   () => { window.open(SOCIALS.github.url,    '_blank', 'noopener,noreferrer'); return [{ type: 'link', val: SOCIALS.github.url,    url: SOCIALS.github.url }] },
    linkedin: () => { window.open(SOCIALS.linkedin.url,  '_blank', 'noopener,noreferrer'); return [{ type: 'link', val: SOCIALS.linkedin.url,  url: SOCIALS.linkedin.url }] },
    leetcode: () => { window.open(SOCIALS.leetcode.url,  '_blank', 'noopener,noreferrer'); return [{ type: 'link', val: SOCIALS.leetcode.url,  url: SOCIALS.leetcode.url }] },
    instagram:() => { window.open(SOCIALS.instagram.url, '_blank', 'noopener,noreferrer'); return [{ type: 'link', val: SOCIALS.instagram.url, url: SOCIALS.instagram.url }] },

    resume: () => {
      window.open(OWNER.resumeUrl, '_blank')
      return [{ type: 'success', val: `✓ Opening resume...` }]
    },

    neofetch: () => [{ type: 'neo' }],

    banner: () => [
      { type: 'empty' },
      { type: 'accent', val: '  ╔════════════════════════════════════════════╗' },
      { type: 'accent', val: `  ║   ${OWNER.name.padEnd(42)}║` },
      { type: 'accent', val: `  ║   ${OWNER.tagline.padEnd(42)}║` },
      { type: 'accent', val: `  ║   ${(OWNER.university + ' · ' + OWNER.gradYear).padEnd(42)}║` },
      { type: 'accent', val: '  ╚════════════════════════════════════════════╝' },
      { type: 'empty' },
    ],

    ls: () => [
      { type: 'dim', val: 'drwxr-xr-x  about/      projects/   contact/' },
      { type: 'dim', val: 'drwxr-xr-x  github/     linkedin/   leetcode/' },
      { type: 'dim', val: '-rw-r--r--  resume.pdf  skills.txt  README.md' },
    ],

    pwd:  () => [{ type: 'dim', val: `/Users/${OWNER.name.split(' ')[0].toLowerCase()}/portfolio` }],
    date: () => [{ type: 'dim', val: new Date().toString() }],

    // ── Easter eggs ───────────────────────────────────────
    'sudo rm -rf /':  () => [{ type: 'error', val: 'sudo: Permission denied. Nice try 😄' }],
    vim:              () => [{ type: 'warn', val: 'You can open vim but you can never leave.' }, { type: 'dim', val: '(This is a portfolio, not a trap. Probably.)' }],
    'git push':       () => [
      { type: 'dim',     val: 'Enumerating objects: 42, done.' },
      { type: 'dim',     val: 'Writing objects: 100% (42/42), 6.9 MiB | ∞ MiB/s, done.' },
      { type: 'success', val: '🚀 main → main  (shipped another banger)' },
    ],
    coffee:  () => [{ type: 'error', val: "Error: caffeine module not found." }, { type: 'dim', val: "sudo apt install coffee  # worth a shot" }],
    uname:   () => [{ type: 'dim',  val: 'PortfolioOS x86_64 punya@portfolio' }],

    exit: () => {
      setTimeout(() => closeWindow('terminal'), 350)
      return [{ type: 'warn', val: 'Closing terminal...' }]
    },
  }), [openById, closeWindow])

  // ── Execute ───────────────────────────────────────────────
  function run(raw) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setCmdLog(l => [cmd, ...l])
    setHistIdx(-1)

    if (cmd === 'clear') { setHistory([]); return }

    // open <name>
    if (cmd.startsWith('open ')) {
      const name = cmd.slice(5).trim()
      const matched = APP_IDS.find(id => id === name || id.startsWith(name) || name.startsWith(id))
      if (matched) {
        openById(matched)
        push([{ type: 'success', val: `✓ Opening ${matched}...` }], cmd)
      } else {
        push([
          { type: 'error', val: `open: no app matching '${name}'` },
          { type: 'dim',   val: `Available: ${APP_IDS.join(', ')}` },
        ], cmd)
      }
      return
    }

    const cmds = commands()
    const fn = cmds[cmd]
    const lines = fn
      ? fn()
      : [
          { type: 'error', val: `command not found: ${cmd}` },
          { type: 'dim',   val: "Type 'help' for a list of commands." },
        ]

    push(lines, cmd)
  }

  function push(lines, cmd) {
    setHistory(h => [...h, { type: 'command', text: cmd }, { type: 'output', lines }])
  }

  function onKey(e) {
    if (e.key === 'Enter') { run(input); setInput('') }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(histIdx + 1, cmdLog.length - 1)
      setHistIdx(i); setInput(cmdLog[i] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = Math.max(histIdx - 1, -1)
      setHistIdx(i); setInput(i === -1 ? '' : cmdLog[i] ?? '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const all = [...Object.keys(commands()), ...APP_IDS.map(id => `open ${id}`)]
      const match = all.filter(k => k.startsWith(input))
      if (match.length === 1) setInput(match[0])
    }
  }

  return (
    <div
      className="h-full flex flex-col font-mono text-xs"
      style={{ background: '#010a04', color: '#c8ffd6' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output scroll area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-0.5">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.type === 'command' ? (
              <div className="flex items-center gap-0 mt-1">
                <span style={{ color: '#00ff7f', userSelect: 'none' }}>{PROMPT}</span>
                <span style={{ color: '#e0ffe8' }}>{entry.text}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-px">
                {entry.lines.map((line, j) => (
                  <div key={j}><Line line={line} /></div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Live input */}
        {ready && (
          <div className="flex items-center mt-1">
            <span style={{ color: '#00ff7f', userSelect: 'none' }}>{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              autoFocus
              className="flex-1 bg-transparent outline-none border-none"
              style={{ color: '#e0ffe8', fontFamily: 'inherit', fontSize: 'inherit', caretColor: '#00ff7f' }}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1 shrink-0 font-mono"
        style={{ borderTop: '1px solid rgba(0,255,127,0.08)', background: 'rgba(0,0,0,0.4)', fontSize: 10 }}
      >
        <span style={{ color: 'rgba(0,255,127,0.35)' }}>{HOST} · PortfolioOS</span>
        <span style={{ color: 'rgba(0,255,127,0.25)' }}>↑↓ history · Tab: complete · help</span>
      </div>
    </div>
  )
}
