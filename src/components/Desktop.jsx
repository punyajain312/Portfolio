import { AnimatePresence, motion } from 'framer-motion'
import { APPS } from '../config/apps'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import MenuBar from './MenuBar'
import Dock from './Dock'

// Neon ambient orbs
const ORBS = [
  { cx: '8%',  cy: '18%', r: 380, color: '#00ff7f', dur: 24, delay: 0  },
  { cx: '82%', cy: '72%', r: 300, color: '#00e5ff', dur: 28, delay: 5  },
  { cx: '60%', cy: '8%',  r: 220, color: '#bd93f9', dur: 22, delay: 11 },
  { cx: '88%', cy: '22%', r: 180, color: '#00ff41', dur: 26, delay: 3  },
]

function NeonOrb({ cx, cy, r, color, dur, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: cx, top: cy, width: r, height: r,
        transform: 'translate(-50%,-50%)',
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        filter: 'blur(52px)',
      }}
      animate={{ x: ['0%','10%','-7%','4%','0%'], y: ['0%','-10%','7%','-4%','0%'], scale: [1,1.08,0.96,1.04,1] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Floating code lines — subtle background text
const CODE_LINES = [
  { text: '> neofetch --color',       x: '62%', y: '22%', delay: 0 },
  { text: '{ "shipped": true }',      x: '70%', y: '52%', delay: 3 },
  { text: 'const me = "Punya Jain"',  x: '58%', y: '70%', delay: 6 },
  { text: '> git log --oneline',      x: '74%', y: '38%', delay: 9 },
]

function FloatingCode({ text, x, y, delay }) {
  return (
    <motion.div
      className="absolute font-mono pointer-events-none select-none"
      style={{ left: x, top: y, color: 'rgba(0,255,127,0.1)', fontSize: 11, letterSpacing: '0.04em' }}
      animate={{ opacity: [0,0.6,0.6,0], y: [8,0,0,-8] }}
      transition={{ duration: 6, delay, repeat: Infinity, repeatDelay: 10, ease: 'easeInOut' }}
    >
      {text}
    </motion.div>
  )
}

// Two columns of desktop icons (right side of screen)
// Column A (right=8):  terminal, about, projects, contact
// Column B (right=92): github, linkedin, leetcode, instagram
const COL_A = ['terminal', 'about', 'projects', 'contact']
const COL_B = ['github', 'linkedin', 'leetcode', 'instagram']

export default function Desktop({ dark, toggleDark, windows, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize, updatePosition, updateSize }) {
  const openWindowIds = windows.map(w => w.id)
  const hasWindows = windows.length > 0

  const colA = APPS.filter(a => COL_A.includes(a.id)).sort((a, b) => COL_A.indexOf(a.id) - COL_A.indexOf(b.id))
  const colB = APPS.filter(a => COL_B.includes(a.id)).sort((a, b) => COL_B.indexOf(a.id) - COL_B.indexOf(b.id))

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg-desktop)' }}>
      <MenuBar dark={dark} toggleDark={toggleDark} />

      <div className="flex-1 relative overflow-hidden desktop-bg">
        {/* Ambient orbs */}
        {ORBS.map((o, i) => <NeonOrb key={i} {...o} />)}

        {/* Matrix grid */}
        {dark && <div className="absolute inset-0 pointer-events-none matrix-dots" />}

        {/* Scanline */}
        {dark && <div className="absolute inset-0 pointer-events-none scanline-sweep" />}

        {/* Floating code */}
        {dark && CODE_LINES.map((l, i) => <FloatingCode key={i} {...l} />)}

        {/* PJ logo — faint centered watermark (mix-blend-mode:screen = black becomes transparent) */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            width: 340,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.06,
            mixBlendMode: 'screen',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Desktop icons — two columns, top-right */}
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 184 }}>
          {colA.map((app, i) => (
            <motion.div
              key={app.id}
              className="pointer-events-auto"
              initial={{ opacity: 0, x: 20, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.08 + i * 0.06, type: 'spring', stiffness: 340, damping: 28 }}
              style={{ position: 'absolute', right: 8, top: 12 + i * 80 }}
            >
              <DesktopIcon app={app} onOpen={openWindow} />
            </motion.div>
          ))}
          {colB.map((app, i) => (
            <motion.div
              key={app.id}
              className="pointer-events-auto"
              initial={{ opacity: 0, x: 20, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 340, damping: 28 }}
              style={{ position: 'absolute', right: 92, top: 12 + i * 80 }}
            >
              <DesktopIcon app={app} onOpen={openWindow} />
            </motion.div>
          ))}
        </div>

        {/* Windows */}
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
      </div>

      <Dock onOpen={openWindow} openWindowIds={openWindowIds} visible={hasWindows} />
    </div>
  )
}
