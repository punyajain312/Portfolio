import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { APPS } from '../config/apps'

function DockIcon({ app, onOpen, isOpen }) {
  const [hovered, setHovered] = useState(false)
  const IconComp = app.icon
  const isExternal = !!app.externalUrl

  function handleClick() {
    if (isExternal) {
      window.open(app.externalUrl, '_blank', 'noopener,noreferrer')
    } else {
      onOpen(app)
    }
  }

  return (
    // FIXED-WIDTH container — the button scales via CSS transform (no layout shift)
    <div
      className="flex flex-col items-center"
      style={{ width: 56, flexShrink: 0, position: 'relative' }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full mb-3 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 pointer-events-none glass"
            style={{
              background: 'var(--bg-elevated)',
              border: `1px solid ${app.color}40`,
              color: app.color,
              boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${app.color}20`,
              zIndex: 999,
            }}
          >
            {app.label}
            {isExternal && <ExternalLink size={9} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon button — scale via CSS transform only (no layout effect) */}
      <motion.button
        aria-label={isExternal ? `Open ${app.label} externally` : `Open ${app.label}`}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.35, y: -16 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 520, damping: 28, mass: 0.55 }}
        className="relative flex items-center justify-center rounded-2xl focus:outline-none"
        style={{ width: 48, height: 48 }}
      >
        {/* BG layer */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-200"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${app.color}28 0%, ${app.color}14 100%)`
              : `linear-gradient(135deg, ${app.color}18 0%, ${app.color}08 100%)`,
            border: `1px solid ${app.color}${hovered ? '55' : '28'}`,
            boxShadow: hovered
              ? `0 0 20px ${app.color}30, 0 4px 16px rgba(0,0,0,0.5)`
              : `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        />

        <IconComp
          size={22}
          style={{ color: app.color, position: 'relative', zIndex: 1 }}
        />

        {/* External link badge */}
        {isExternal && (
          <div
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
            style={{ background: app.color, border: '1px solid rgba(0,0,0,0.4)' }}
          >
            <ExternalLink size={7} color="#000" strokeWidth={3} />
          </div>
        )}
      </motion.button>

      {/* Open indicator */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-1 h-1 rounded-full mt-1"
        style={{ background: app.color }}
      />

      {/* Label */}
      <span
        className="text-[9px] font-medium text-center mt-0.5 pointer-events-none"
        style={{ color: hovered ? app.color : 'rgba(255,255,255,0.35)' }}
      >
        {app.label}
      </span>
    </div>
  )
}

export default function Dock({ onOpen, openWindowIds }) {
  return (
    // Outer wrapper: same bg as desktop so no white strip
    <div
      className="shrink-0 flex items-end justify-center"
      style={{
        height: 90,
        background: 'var(--bg-desktop)',
        paddingBottom: 8,
        zIndex: 40,
        position: 'relative',
      }}
    >
      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }}
      />

      {/* Glass pill */}
      <div
        className="flex items-end gap-1.5 px-4 py-2.5 rounded-2xl glass"
        style={{
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(0, 255, 100, 0.12)',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,255,100,0.08)',
          overflow: 'visible',
        }}
      >
        {APPS.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            onOpen={onOpen}
            isOpen={openWindowIds.includes(app.id)}
          />
        ))}
      </div>
    </div>
  )
}
