import { Download, User, ExternalLink, Zap } from 'lucide-react'
import { OWNER, SOCIALS } from '../config/portfolio'

function Badge({ label }) {
  return (
    <span
      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-default"
      style={{
        background: 'rgba(0,255,127,0.08)',
        color: '#00ff7f',
        border: '1px solid rgba(0,255,127,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,255,127,0.18)'
        e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,127,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0,255,127,0.08)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {label}
    </span>
  )
}

export default function AboutApp() {
  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col gap-5">
      {/* Identity */}
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,127,0.15) 0%, rgba(0,229,255,0.12) 100%)',
            border: '1px solid rgba(0,255,127,0.3)',
            boxShadow: '0 0 24px rgba(0,255,127,0.15), inset 0 1px 0 rgba(0,255,127,0.2)',
          }}
        >
          {OWNER.avatar ? (
            <img src={OWNER.avatar} alt={OWNER.name} className="w-full h-full object-cover" />
          ) : (
            <User size={38} color="#00ff7f" />
          )}
        </div>
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: 'var(--accent)', textShadow: '0 0 16px rgba(0,255,127,0.4)' }}
          >
            {OWNER.name}
          </h1>
          <p className="text-sm mt-0.5 font-mono" style={{ color: 'var(--text-secondary)' }}>
            {OWNER.tagline}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
            {OWNER.university} · Class of {OWNER.gradYear}
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* Bio */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Zap size={11} style={{ color: 'var(--accent)' }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest font-mono" style={{ color: 'var(--text-dim)' }}>
            About
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {OWNER.bio.replace(/\n/g, ' ')}
        </p>
      </div>

      {/* Stack */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Zap size={11} style={{ color: 'var(--accent)' }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest font-mono" style={{ color: 'var(--text-dim)' }}>
            Tech Stack
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {OWNER.techStack.map((t) => <Badge key={t} label={t} />)}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <a
          href={OWNER.resumeUrl}
          download
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'var(--accent)',
            color: '#020c04',
            boxShadow: '0 0 20px rgba(0,255,127,0.3)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 32px rgba(0,255,127,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,127,0.3)')}
        >
          <Download size={14} />
          Resume
        </a>
        <a
          href={`mailto:${OWNER.email}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
          style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0,255,127,0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          {OWNER.email}
        </a>
        <a
          href={SOCIALS.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
          style={{
            background: 'var(--bg-elevated)',
            color: '#bd93f9',
            border: '1px solid rgba(189,147,249,0.25)',
          }}
        >
          <ExternalLink size={11} />
          GitHub
        </a>
        <a
          href={SOCIALS.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
          style={{
            background: 'var(--bg-elevated)',
            color: '#38bdf8',
            border: '1px solid rgba(56,189,248,0.25)',
          }}
        >
          <ExternalLink size={11} />
          LinkedIn
        </a>
      </div>
    </div>
  )
}
