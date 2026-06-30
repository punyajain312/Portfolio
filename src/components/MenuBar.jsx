import { useState, useEffect } from 'react'
import { Wifi, Battery, Sun, Moon } from 'lucide-react'
import { OWNER } from '../config/portfolio'

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--accent)', textShadow: '0 0 8px var(--accent)' }}>
      {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

export default function MenuBar({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="glass flex items-center justify-between px-3 shrink-0 relative z-50"
      style={{ height: 30, background: 'var(--menubar-bg)', borderBottom: '1px solid var(--border)' }}
    >
      {/* Left — PJ logo + name */}
      <div className="flex items-center gap-3">
        {/* Logo — mix-blend-mode:screen makes black background invisible on dark menubar */}
        <div className="flex items-center gap-1.5">
          <img
            src="/logo.png"
            alt="PJ"
            style={{
              height: 20,
              width: 20,
              objectFit: 'cover',
              borderRadius: 3,
              mixBlendMode: dark ? 'screen' : 'normal',
              opacity: dark ? 0.85 : 1,
              filter: dark ? 'brightness(1.2)' : 'none',
            }}
          />
          <span
            className="text-xs font-semibold"
            style={{ color: 'var(--accent)', textShadow: dark ? '0 0 10px var(--accent)' : 'none' }}
          >
            {OWNER.name}
          </span>
        </div>

        {/* Fake menus */}
        {['Portfolio', 'View', 'Go', 'Help'].map((item) => (
          <button
            key={item}
            className="text-xs px-2 py-0.5 rounded transition-all duration-100"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#020c04' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            onClick={() => setMenuOpen(item === 'Portfolio' ? !menuOpen : false)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Battery size={13} style={{ color: 'var(--text-secondary)' }} aria-hidden />
        <Wifi size={13} style={{ color: 'var(--text-secondary)' }} aria-hidden />
        <button
          aria-label={dark ? 'Light mode' : 'Dark mode'}
          onClick={toggleDark}
          style={{ color: 'var(--text-secondary)', padding: 2 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </button>
        <Clock />
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div
          className="absolute top-full left-24 mt-0.5 rounded-xl py-1.5 w-48 z-50 glass"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: '0 16px 48px rgba(0,0,0,0.7), 0 0 20px rgba(0,255,100,0.06)' }}
          onMouseLeave={() => setMenuOpen(false)}
        >
          {[`About ${OWNER.name.split(' ')[0]}`, '—', 'Projects', 'Skills', 'Contact', '—', 'Quit'].map((item, i) =>
            item === '—' ? (
              <div key={i} className="my-1 mx-3" style={{ borderTop: '1px solid var(--border)' }} />
            ) : (
              <button
                key={item}
                className="w-full text-left px-3 py-1.5 text-xs rounded-lg transition-all"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#020c04' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)' }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
