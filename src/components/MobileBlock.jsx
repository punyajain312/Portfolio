import { Monitor } from 'lucide-react'
import { OWNER } from '../config/portfolio'

export default function MobileBlock() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-8 text-center"
      style={{
        background: '#020c04',
        backgroundImage: `
          radial-gradient(ellipse at 30% 30%, rgba(0,255,127,0.12) 0%, transparent 55%),
          radial-gradient(circle, rgba(0,255,100,0.08) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 32px 32px',
      }}
    >
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
        style={{
          background: 'rgba(0,255,127,0.1)',
          border: '1px solid rgba(0,255,127,0.3)',
          boxShadow: '0 0 48px rgba(0,255,127,0.2)',
        }}
      >
        <Monitor size={44} color="#00ff7f" />
      </div>

      <h1
        className="text-2xl font-bold mb-3"
        style={{ color: '#00ff7f', textShadow: '0 0 24px rgba(0,255,127,0.5)' }}
      >
        Best viewed on desktop
      </h1>
      <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#4a9a58' }}>
        This portfolio is an interactive OS experience designed for larger screens. Open it on a desktop or
        laptop for the full effect.
      </p>

      <div className="mt-8 mb-6 w-12 h-px" style={{ background: 'rgba(0,255,100,0.2)' }} />

      <p className="text-xs font-mono font-semibold" style={{ color: '#00ff7f' }}>
        {OWNER.name}
      </p>
      <p className="text-xs mt-0.5 font-mono" style={{ color: '#2a5030' }}>
        {OWNER.tagline}
      </p>

      <a
        href={`mailto:${OWNER.email}`}
        className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
        style={{
          background: '#00ff7f',
          color: '#020c04',
          boxShadow: '0 0 24px rgba(0,255,127,0.4)',
        }}
      >
        Email me
      </a>
    </div>
  )
}
