import { ExternalLink } from 'lucide-react'

export default function SocialApp({ platform, IconComp, handle, url, color, description }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-6 text-center">
      {/* Icon with neon glow */}
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center relative"
        style={{
          background: `${color}12`,
          border: `1px solid ${color}35`,
          boxShadow: `0 0 32px ${color}20, inset 0 1px 0 ${color}25`,
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${color}20, transparent 65%)`,
          }}
        />
        <IconComp size={40} style={{ color, position: 'relative', zIndex: 1 }} />
      </div>

      {/* Info */}
      <div>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          {platform}
        </h2>
        <p
          className="text-sm mt-0.5 font-mono font-medium"
          style={{ color, textShadow: `0 0 10px ${color}50` }}
        >
          {handle}
        </p>
        <p className="text-xs mt-2 leading-relaxed max-w-52" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>

      {/* CTA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
        style={{
          background: color,
          color: '#020c04',
          boxShadow: `0 0 20px ${color}35`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 36px ${color}55`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 20px ${color}35`)}
      >
        <ExternalLink size={14} />
        Open {platform}
      </a>

      <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
        Opens in a new tab
      </p>
    </div>
  )
}
