import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { APPS } from '../config/apps'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import MenuBar from './MenuBar'
import Dock from './Dock'

// ── Ambient orbs ─────────────────────────────────────────────
const ORBS = [
  { cx: '8%',  cy: '18%', r: 420, color: '#00ff7f', dur: 24, delay: 0  },
  { cx: '82%', cy: '72%', r: 320, color: '#00e5ff', dur: 28, delay: 5  },
  { cx: '55%', cy: '5%',  r: 240, color: '#bd93f9', dur: 22, delay: 11 },
  { cx: '92%', cy: '20%', r: 180, color: '#00ff41', dur: 26, delay: 3  },
]
function NeonOrb({ cx, cy, r, color, dur, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: cx, top: cy, width: r, height: r, transform: 'translate(-50%,-50%)', background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, filter: 'blur(52px)' }}
      animate={{ x: ['0%','10%','-7%','4%','0%'], y: ['0%','-10%','7%','-4%','0%'], scale: [1,1.08,0.96,1.04,1] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ── Floating code lines ───────────────────────────────────────
const CODE_LINES = [
  { text: '❯ kubectl get pods -n prod',        x: '42%', y: '12%',  delay: 0  },
  { text: '❯ docker compose up --build',       x: '56%', y: '28%',  delay: 2  },
  { text: '$ git log --graph --oneline',        x: '38%', y: '60%',  delay: 6  },
  { text: '❯ nmap -sV -O 192.168.1.0/24',     x: '44%', y: '78%',  delay: 8  },
  { text: '$ pytest -v --cov=. tests/',        x: '50%', y: '88%',  delay: 11 },
  { text: '❯ cargo build --release',           x: '40%', y: '44%',  delay: 4  },
  { text: 'const me = { shipped: true }',       x: '35%', y: '20%',  delay: 5  },
  { text: 'SELECT * FROM users LIMIT 100;',     x: '45%', y: '70%',  delay: 13 },
]
function FloatingCode({ text, x, y, delay }) {
  return (
    <motion.div
      className="absolute font-mono pointer-events-none select-none"
      style={{ left: x, top: y, color: 'rgba(0,255,127,0.07)', fontSize: 10, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
      animate={{ opacity: [0, 0.8, 0.8, 0], y: [10, 0, 0, -10] }}
      transition={{ duration: 7, delay, repeat: Infinity, repeatDelay: 9, ease: 'easeInOut' }}
    >
      {text}
    </motion.div>
  )
}

// ── btop-style left panel ─────────────────────────────────────
const FAKE_PROCS = [
  { pid: '1337', cpu: '12.4', mem: '3.2', name: 'node' },
  { pid: '2048', cpu:  '8.1', mem: '9.4', name: 'python3' },
  { pid: ' 404', cpu:  '4.2', mem: '1.8', name: 'nvim' },
  { pid: '8080', cpu:  '2.8', mem: '5.1', name: 'docker' },
  { pid: '1024', cpu:  '1.4', mem: '0.9', name: 'zsh' },
  { pid: ' 777', cpu:  '0.6', mem: '0.4', name: 'tmux' },
  { pid: '3000', cpu:  '0.3', mem: '2.1', name: 'postgres' },
]

function BtopPanel() {
  const [stats, setStats] = useState({ cpu: [38,21,55,14], ram: 72, disk: 43 })
  const netHistory = useRef(Array(24).fill(0).map(() => Math.random() * 60 + 10))
  const [netTick, setNetTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStats({
        cpu: [
          Math.floor(10 + Math.random() * 70),
          Math.floor(5  + Math.random() * 50),
          Math.floor(20 + Math.random() * 60),
          Math.floor(5  + Math.random() * 40),
        ],
        ram: Math.floor(60 + Math.random() * 25),
        disk: Math.floor(38 + Math.random() * 10),
      })
      netHistory.current = [...netHistory.current.slice(1), Math.random() * 80 + 5]
      setNetTick(t => t + 1)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const maxNet = Math.max(...netHistory.current, 1)
  const pts = netHistory.current.map((v, i) => `${(i / 23) * 220},${44 - (v / maxNet) * 40}`).join(' ')

  function Bar({ val, color = '#00ff7f', width = 180 }) {
    return (
      <div style={{ background: 'rgba(0,255,127,0.06)', borderRadius: 2, height: 4, width, overflow: 'hidden', display: 'inline-block' }}>
        <motion.div animate={{ width: `${val}%` }} transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ height: '100%', background: val > 85 ? '#ff5f57' : val > 65 ? '#fbbf24' : color, borderRadius: 2 }} />
      </div>
    )
  }

  return (
    <motion.div
      className="absolute pointer-events-none select-none font-mono"
      style={{ left: 0, top: 0, bottom: 0, width: 272, padding: '10px 12px', fontSize: 9, lineHeight: 1.7, color: 'rgba(0,255,127,0.3)', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      {/* Title */}
      <div style={{ color: 'rgba(0,255,127,0.5)', fontSize: 8, letterSpacing: '0.12em', marginBottom: 6, borderBottom: '1px solid rgba(0,255,127,0.1)', paddingBottom: 4 }}>
        btop v1.3.2 — punya@portfolioOS
      </div>

      {/* CPU cores */}
      <div style={{ color: 'rgba(0,229,255,0.4)', fontSize: 8, marginBottom: 3 }}>CPU CORES</div>
      {stats.cpu.map((v, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 36, color: 'rgba(0,255,127,0.22)' }}>core{i}</span>
          <Bar val={v} color="#00ff7f" width={150} />
          <span style={{ fontSize: 8, color: 'rgba(0,255,127,0.28)', width: 28 }}>{v}%</span>
        </div>
      ))}

      {/* MEM / DISK */}
      <div style={{ marginTop: 8, marginBottom: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 36, color: 'rgba(0,255,127,0.22)' }}>MEM</span>
          <Bar val={stats.ram} color="#00e5ff" width={150} />
          <span style={{ fontSize: 8, color: 'rgba(0,229,255,0.28)', width: 28 }}>{stats.ram}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 36, color: 'rgba(0,255,127,0.22)' }}>DISK</span>
          <Bar val={stats.disk} color="#bd93f9" width={150} />
          <span style={{ fontSize: 8, color: 'rgba(189,147,249,0.28)', width: 28 }}>{stats.disk}%</span>
        </div>
      </div>

      {/* Network graph */}
      <div style={{ marginTop: 10, marginBottom: 3, color: 'rgba(0,229,255,0.4)', fontSize: 8 }}>NET I/O (KB/s)</div>
      <svg width={220} height={48} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0)" />
          </linearGradient>
        </defs>
        <polyline points={pts} fill="none" stroke="rgba(0,229,255,0.4)" strokeWidth={1} />
        <polygon points={`0,44 ${pts} 220,44`} fill="url(#netGrad)" />
      </svg>

      {/* Process list */}
      <div style={{ marginTop: 8, color: 'rgba(0,255,127,0.4)', fontSize: 8, letterSpacing: '0.06em', borderBottom: '1px solid rgba(0,255,127,0.08)', paddingBottom: 2, marginBottom: 3 }}>
        PROCESSES
      </div>
      <div style={{ display: 'flex', gap: 8, fontSize: 8, color: 'rgba(0,255,127,0.2)', marginBottom: 2 }}>
        <span style={{ width: 32 }}>PID</span>
        <span style={{ width: 32 }}>CPU%</span>
        <span style={{ width: 32 }}>MEM%</span>
        <span>NAME</span>
      </div>
      {FAKE_PROCS.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 8, color: 'rgba(0,255,127,0.22)', marginBottom: 1 }}>
          <span style={{ width: 32 }}>{p.pid}</span>
          <span style={{ width: 32, color: parseFloat(p.cpu) > 8 ? 'rgba(251,191,36,0.3)' : 'rgba(0,255,127,0.22)' }}>{p.cpu}</span>
          <span style={{ width: 32 }}>{p.mem}</span>
          <span style={{ color: 'rgba(0,229,255,0.3)' }}>{p.name}</span>
        </div>
      ))}

      {/* Uptime */}
      <div style={{ marginTop: 10, color: 'rgba(0,255,127,0.15)', fontSize: 8 }}>
        uptime: 42d 7h 13m · tasks: 312 · load: 0.87 0.62 0.44
      </div>
    </motion.div>
  )
}

// ── Streaming log panel (right side) ─────────────────────────
const LOG_POOL = [
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'k8s: pod/api-server-x8k2 Running' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'nginx: 200 GET /api/health 1ms' },
  { lvl: 'WARN',  color: 'rgba(251,191,36,0.4)',  msg: 'heap: 89% utilization detected' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'redis: PONG connected 0.4ms' },
  { lvl: 'ERROR', color: 'rgba(255,95,87,0.4)',   msg: 'db: connection pool exhausted' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'docker: container restarted ok' },
  { lvl: 'DEBUG', color: 'rgba(0,229,255,0.3)',   msg: 'trace: span_id=a3f2 latency=12ms' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'cron: backup job completed (ok)' },
  { lvl: 'WARN',  color: 'rgba(251,191,36,0.4)',  msg: 'rate_limit: 429 on /api/inference' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'ci: pipeline #1337 passed ✓' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'nginx: 200 POST /api/chat 34ms' },
  { lvl: 'DEBUG', color: 'rgba(0,229,255,0.3)',   msg: 'llm: tokens=1024 model=claude-3' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'deploy: main@a3f9c22 → prod' },
  { lvl: 'WARN',  color: 'rgba(251,191,36,0.4)',  msg: 'ssl: cert expires in 12 days' },
  { lvl: 'INFO',  color: 'rgba(0,255,127,0.35)',  msg: 'worker: task queue drained (0)' },
]

function LogPanel() {
  const [logs, setLogs] = useState(() =>
    Array.from({ length: 14 }, (_, i) => {
      const now = new Date()
      const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String((now.getSeconds() - (13-i) * 2 + 60) % 60).padStart(2,'0')}`
      return { ...LOG_POOL[i % LOG_POOL.length], t, id: i }
    })
  )
  const counterRef = useRef(14)

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
      const entry = { ...LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)], t, id: counterRef.current++ }
      setLogs(l => [...l.slice(-18), entry])
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="absolute pointer-events-none select-none font-mono"
      style={{ right: 0, top: 0, bottom: 0, width: 310, padding: '10px 12px', fontSize: 9, lineHeight: 1.7, color: 'rgba(0,255,127,0.28)', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <div style={{ color: 'rgba(0,255,127,0.45)', fontSize: 8, letterSpacing: '0.1em', marginBottom: 6, borderBottom: '1px solid rgba(0,255,127,0.1)', paddingBottom: 4 }}>
        tail -f /var/log/portfolioOS.log
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden', maxHeight: 'calc(100% - 40px)' }}>
        {logs.slice(-20).map((log) => (
          <div key={log.id} style={{ display: 'flex', gap: 6, fontSize: 8, lineHeight: 1.6 }}>
            <span style={{ color: 'rgba(0,255,127,0.18)', flexShrink: 0 }}>{log.t}</span>
            <span style={{ color: log.color, flexShrink: 0, width: 36 }}>{log.lvl}</span>
            <span style={{ color: 'rgba(0,255,127,0.22)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── Organic scattered icon positions ────────────────────────
const ORGANIC = [
  { id: 'about',     left: 20,  top: 50,   rotate: -3 },
  { id: 'projects',  left: 14,  top: 150,  rotate:  2 },
  { id: 'terminal',  left: 26,  top: 252,  rotate: -1 },
  { id: 'contact',   left: 18,  top: 350,  rotate:  3 },
  { id: 'github',    right: 18, top: 64,   rotate:  2 },
  { id: 'linkedin',  right: 26, top: 164,  rotate: -3 },
  { id: 'leetcode',  right: 14, top: 264,  rotate:  2 },
  { id: 'instagram', right: 22, top: 360,  rotate: -2 },
]

export default function Desktop({ dark, toggleDark, windows, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize, updatePosition, updateSize }) {
  const openWindowIds = windows.map(w => w.id)
  const hasWindows = windows.length > 0

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: 'var(--bg-desktop)', touchAction: 'none' }}
    >
      <MenuBar dark={dark} toggleDark={toggleDark} />

      {/* Desktop canvas — fixed height, dock is absolute inside so height never changes */}
      <div
        className="flex-1 relative overflow-hidden desktop-bg"
        style={{ touchAction: 'none' }}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Ambient orbs */}
        {ORBS.map((o, i) => <NeonOrb key={i} {...o} />)}

        {/* Matrix grid + scanline */}
        {dark && <div className="absolute inset-0 pointer-events-none matrix-dots" />}
        {dark && <div className="absolute inset-0 pointer-events-none scanline-sweep" />}

        {/* Floating code lines (center area) */}
        {dark && CODE_LINES.map((l, i) => <FloatingCode key={i} {...l} />)}

        {/* btop panel — left edge */}
        {dark && <BtopPanel />}

        {/* log stream — right edge */}
        {dark && <LogPanel />}

        {/* PJ watermark */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{ width: 320, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, mixBlendMode: 'screen', filter: 'blur(0.5px)' }}
        />

        {/* Organic scattered desktop icons — only when no windows open */}
        <AnimatePresence>
          {!hasWindows && ORGANIC.map((pos, i) => {
            const app = APPS.find(a => a.id === pos.id)
            if (!app) return null
            const posStyle = pos.left !== undefined
              ? { left: pos.left, top: pos.top }
              : { right: pos.right, top: pos.top }
            return (
              <motion.div
                key={app.id}
                className="pointer-events-auto"
                initial={{ opacity: 0, scale: 0.65, rotate: pos.rotate * 3 }}
                animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                exit={{ opacity: 0, scale: 0.55, rotate: pos.rotate * 2, transition: { duration: 0.18 } }}
                transition={{ delay: 0.05 * i, type: 'spring', stiffness: 320, damping: 26 }}
                style={{ position: 'absolute', ...posStyle }}
              >
                <DesktopIcon app={app} onOpen={openWindow} />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Open windows */}
        <AnimatePresence>
          {windows.filter(w => !w.minimized).map(w => (
            <Window
              key={w.id}
              windowState={w}
              onClose={() => closeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => toggleMaximize(w.id)}
              onDragStop={pos => { focusWindow(w.id); updatePosition(w.id, pos) }}
              onResizeStop={(size, pos) => { updateSize(w.id, size); updatePosition(w.id, pos) }}
            />
          ))}
        </AnimatePresence>

        {/* Dock — absolute inside flex-1, never shifts layout height */}
        <Dock onOpen={openWindow} openWindowIds={openWindowIds} visible={hasWindows} />
      </div>
    </div>
  )
}
