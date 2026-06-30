import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, ExternalLink, ChevronLeft } from 'lucide-react'
import { APPS } from '../config/apps'
import { OWNER } from '../config/portfolio'
import { WindowContext } from '../context/WindowContext'

// ── Helpers ───────────────────────────────────────────────────
function useNow() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function useCols() {
  const get = () => (typeof window !== 'undefined' && window.innerWidth >= 520 ? 5 : 4)
  const [c, setC] = useState(get)
  useEffect(() => {
    const fn = () => setC(get())
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return c
}

// ── Status Bar ────────────────────────────────────────────────
function StatusBar() {
  const t = useNow()
  return (
    <div
      style={{
        height: 48,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 22px 8px',
        paddingTop: 'env(safe-area-inset-top, 4px)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <span style={{ color: '#ddfce8', fontSize: 15, fontWeight: 700, letterSpacing: -0.4 }}>
        {t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
      </span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* Signal bars */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
          {[3, 6, 9, 12].map((h, i) => (
            <div
              key={i}
              style={{ width: 3, height: h, background: '#ddfce8', borderRadius: 1.5, opacity: i === 3 ? 0.3 : 1 }}
            />
          ))}
        </div>
        <Wifi size={13} color="#ddfce8" />
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <div style={{
            width: 24, height: 12,
            border: '1.5px solid rgba(221,252,232,0.7)',
            borderRadius: 3, padding: '1.5px',
            display: 'flex', alignItems: 'center',
          }}>
            <div style={{ width: '76%', height: '100%', background: '#00ff7f', borderRadius: 1.5 }} />
          </div>
          <div style={{ width: 2, height: 5, background: 'rgba(221,252,232,0.5)', borderRadius: 1 }} />
        </div>
      </div>
    </div>
  )
}

// ── Home Screen Clock ─────────────────────────────────────────
function HomeClock() {
  const t = useNow()
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.5 }}
      style={{ textAlign: 'center', padding: '12px 0 20px', userSelect: 'none' }}
    >
      <div style={{
        fontSize: 'clamp(58px, 19vw, 90px)',
        fontWeight: 200,
        color: '#ddfce8',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
      </div>
      <div style={{ color: '#4a9a58', fontSize: 'clamp(12px, 3.5vw, 14px)', marginTop: 10, fontFamily: 'monospace' }}>
        {t.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </motion.div>
  )
}

// ── App Grid ──────────────────────────────────────────────────
function AppGrid({ apps, onOpen, cols }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      rowGap: 22,
      columnGap: 6,
      padding: '0 14px',
    }}>
      {apps.map((app, i) => {
        const IconComp = app.icon
        const isExternal = !!app.externalUrl
        return (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.65, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.04 + i * 0.035, type: 'spring', stiffness: 460, damping: 28 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
          >
            <motion.button
              whileTap={{ scale: 0.75 }}
              onClick={() => onOpen(app)}
              style={{
                width: 'min(62px, 14vw)',
                height: 'min(62px, 14vw)',
                borderRadius: 'min(16px, 4vw)',
                background: `linear-gradient(145deg, ${app.color}28, ${app.color}12)`,
                border: `1px solid ${app.color}45`,
                boxShadow: `0 4px 18px ${app.color}1e, inset 0 1px 0 ${app.color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', cursor: 'pointer',
              }}
            >
              <IconComp size={26} color={app.color} />
              {isExternal && (
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 16, height: 16, borderRadius: '50%',
                  background: app.color, border: '2px solid #020c04',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ExternalLink size={7} color="#020c04" strokeWidth={3} />
                </div>
              )}
            </motion.button>
            <span style={{
              color: 'rgba(200,255,214,0.82)',
              fontSize: 'clamp(9px, 2.6vw, 11px)',
              fontWeight: 500, textAlign: 'center',
              lineHeight: 1.2, maxWidth: '100%',
            }}>
              {app.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Bottom Dock ───────────────────────────────────────────────
const DOCK_IDS = ['terminal', 'about', 'projects', 'contact']

function BottomDock({ onOpen }) {
  const dockApps = APPS.filter(a => DOCK_IDS.includes(a.id)).sort(
    (a, b) => DOCK_IDS.indexOf(a.id) - DOCK_IDS.indexOf(b.id)
  )
  return (
    <div style={{
      flexShrink: 0,
      padding: '8px 16px',
      paddingBottom: 'max(10px, env(safe-area-inset-bottom, 10px))',
      background: 'rgba(2,12,4,0.65)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(0,255,100,0.07)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 14,
        padding: '10px 20px',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid rgba(0,255,100,0.13)',
        borderRadius: 26,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(0,255,100,0.09)',
      }}>
        {dockApps.map(app => {
          const IconComp = app.icon
          return (
            <motion.button
              key={app.id}
              whileTap={{ scale: 0.78 }}
              onClick={() => onOpen(app)}
              style={{
                width: 54, height: 54, borderRadius: 15,
                background: `linear-gradient(145deg, ${app.color}26, ${app.color}10)`,
                border: `1px solid ${app.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 2px 12px ${app.color}18`,
              }}
            >
              <IconComp size={26} color={app.color} />
            </motion.button>
          )
        })}
      </div>
      {/* Home indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <div style={{ width: 110, height: 4, background: 'rgba(74,154,88,0.32)', borderRadius: 2 }} />
      </div>
    </div>
  )
}

// ── Full-Screen App Shell ─────────────────────────────────────
function MobileAppShell({ app, onClose, ctx }) {
  const AppComponent = app.component
  const IconComp = app.icon
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 340, damping: 40, mass: 0.85 }}
      style={{
        position: 'fixed', inset: 0,
        background: '#060f08',
        zIndex: 500,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Status bar */}
      <StatusBar />

      {/* Nav bar */}
      <div style={{
        height: 52, display: 'flex', alignItems: 'center',
        padding: '0 8px',
        borderBottom: `1px solid ${app.color}20`,
        flexShrink: 0,
        background: '#060f08',
      }}>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: 3,
            color: app.color, background: 'transparent', border: 'none',
            fontSize: 15, cursor: 'pointer', padding: '8px 12px',
            fontWeight: 600, fontFamily: 'Inter, sans-serif',
          }}
        >
          <ChevronLeft size={20} color={app.color} />
          Home
        </motion.button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <IconComp size={14} color={app.color} />
          <span style={{ color: '#c8ffd6', fontWeight: 700, fontSize: 16 }}>{app.label}</span>
        </div>
        <div style={{ width: 80 }} />
      </div>

      {/* App content — wrapped in context */}
      <WindowContext.Provider value={ctx}>
        <div
          style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', background: '#060f08' }}
          onWheel={(e) => e.stopPropagation()}
        >
          <AppComponent />
        </div>
      </WindowContext.Provider>

      {/* Home indicator */}
      <div style={{
        height: 'max(30px, env(safe-area-inset-bottom, 30px))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#060f08', flexShrink: 0,
      }}>
        <div style={{ width: 110, height: 4, background: 'rgba(74,154,88,0.3)', borderRadius: 2 }} />
      </div>
    </motion.div>
  )
}

// ── Main Mobile OS ────────────────────────────────────────────
export default function MobileOS() {
  const [activeApp, setActiveApp] = useState(null)
  const cols = useCols()

  const openApp = useCallback((app) => {
    if (!app) return
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank', 'noopener,noreferrer')
    } else {
      setActiveApp(app)
    }
  }, [])

  const closeApp = useCallback(() => setActiveApp(null), [])

  // Context provided to apps (so TerminalApp's openById / closeWindow work)
  const ctx = useMemo(() => ({
    openById: (id) => {
      const app = APPS.find(a => a.id === id)
      if (app) openApp(app)
    },
    closeWindow: () => closeApp(),
    windows: activeApp
      ? [{ id: activeApp.id, minimized: false, maximized: false, zIndex: 1, position: { x: 0, y: 0 }, size: { width: 0, height: 0 } }]
      : [],
    openWindow: openApp,
    focusWindow: () => {},
    minimizeWindow: () => closeApp(),
    toggleMaximize: () => {},
    updatePosition: () => {},
    updateSize: () => {},
  }), [openApp, closeApp, activeApp])

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#020c04',
        backgroundImage: `
          radial-gradient(ellipse at 18% 18%, rgba(0,255,127,0.14) 0%, transparent 52%),
          radial-gradient(ellipse at 84% 78%, rgba(0,229,255,0.10) 0%, transparent 52%),
          radial-gradient(ellipse at 50% 50%, rgba(0,60,20,0.25) 0%, transparent 70%),
          radial-gradient(circle, rgba(0,255,100,0.07) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, auto, 26px 26px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Status bar */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <StatusBar />
      </div>

      {/* Scrollable home content */}
      <div
        style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', zIndex: 2 }}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Big clock */}
        <HomeClock />

        {/* Owner card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <div style={{
            color: '#00ff7f', fontSize: 'clamp(16px, 4.8vw, 22px)',
            fontWeight: 700, letterSpacing: -0.3,
            textShadow: '0 0 20px rgba(0,255,127,0.45)',
          }}>
            {OWNER.name}
          </div>
          <div style={{ color: '#4a9a58', fontSize: 'clamp(11px, 3.2vw, 14px)', marginTop: 4, fontFamily: 'monospace' }}>
            {OWNER.tagline}
          </div>
        </motion.div>

        {/* Widget row — quick-access links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ display: 'flex', gap: 10, padding: '0 14px', marginBottom: 28 }}
        >
          {[
            { label: 'Resume', href: OWNER.resumeUrl, color: '#00ff7f' },
            { label: 'Email', href: `mailto:${OWNER.email}`, color: '#00e5ff' },
          ].map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                flex: 1, padding: '10px 0', textAlign: 'center',
                background: `${color}14`, border: `1px solid ${color}35`,
                borderRadius: 14, color, fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
                boxShadow: `0 2px 12px ${color}12`,
              }}
            >
              {label}
            </a>
          ))}
        </motion.div>

        {/* App grid */}
        <AppGrid apps={APPS} onOpen={openApp} cols={cols} />

        {/* Bottom spacer */}
        <div style={{ height: 20 }} />
      </div>

      {/* Bottom Dock */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <BottomDock onOpen={openApp} />
      </div>

      {/* Full-screen app overlay */}
      <AnimatePresence>
        {activeApp && (
          <MobileAppShell
            key={activeApp.id}
            app={activeApp}
            onClose={closeApp}
            ctx={ctx}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
