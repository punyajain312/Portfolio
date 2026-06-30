import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DesktopIcon({ app, onOpen }) {
  const lastClickRef = useRef(0)
  const [showHint, setShowHint] = useState(false)
  const IconComp = app.icon

  function handleClick() {
    const now = Date.now()
    if (now - lastClickRef.current < 380) {
      onOpen(app)
      lastClickRef.current = 0
    } else {
      lastClickRef.current = now
    }
  }

  return (
    <div className="relative">
      {/* Double-click hint tooltip */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-lg text-[10px] font-medium pointer-events-none"
            style={{
              background: 'var(--bg-elevated)',
              border: `1px solid ${app.color}35`,
              color: app.color,
              boxShadow: `0 4px 16px rgba(0,0,0,0.5), 0 0 8px ${app.color}15`,
              zIndex: 999,
            }}
          >
            double-click to open
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={`Open ${app.label} — double-click`}
        onClick={handleClick}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
        whileHover={{ scale: 1.12, y: -4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 480, damping: 28 }}
        className="flex flex-col items-center gap-1.5 w-16 p-1.5 rounded-xl focus:outline-none"
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${app.color}20 0%, ${app.color}10 100%)`,
            border: `1px solid ${app.color}35`,
            boxShadow: `0 4px 20px ${app.color}18, inset 0 1px 0 ${app.color}25`,
          }}
        >
          {/* Hover inner glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ background: `radial-gradient(circle at 50% 20%, ${app.color}30, transparent 65%)` }}
          />
          <IconComp size={24} style={{ color: app.color, position: 'relative', zIndex: 1 }} />
        </div>

        {/* Label */}
        <span
          className="text-[10px] font-medium text-center leading-tight select-none"
          style={{
            color: 'rgba(200,255,214,0.75)',
            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          }}
        >
          {app.label}
        </span>
      </motion.button>
    </div>
  )
}
