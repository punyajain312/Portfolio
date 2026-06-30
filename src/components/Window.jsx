import { motion } from 'framer-motion'
import { Rnd } from 'react-rnd'
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react'
import { APPS } from '../config/apps'

const spring = { type: 'spring', stiffness: 400, damping: 34, mass: 1 }

export default function Window({ windowState, onClose, onFocus, onMinimize, onMaximize, onDragStop, onResizeStop }) {
  const { id, position, size, zIndex, maximized } = windowState
  const app = APPS.find((a) => a.id === id)
  if (!app) return null

  const AppComponent = app.component
  const IconComp = app.icon

  const titleBar = (
    <div
      className="window-drag-handle flex items-center px-3 shrink-0 select-none"
      style={{
        height: 42,
        background: 'var(--window-titlebar)',
        borderBottom: '1px solid var(--border)',
        borderRadius: '12px 12px 0 0',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 group z-10">
        <button
          aria-label="Close"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="w-3 h-3 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
          style={{ background: '#ff5f56', boxShadow: '0 0 6px rgba(255,95,86,0.5)' }}
        >
          <X size={6} className="opacity-0 group-hover:opacity-100 text-red-900" strokeWidth={3.5} />
        </button>
        <button
          aria-label="Minimize"
          onClick={(e) => { e.stopPropagation(); onMinimize() }}
          className="w-3 h-3 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
          style={{ background: '#ffbd2e', boxShadow: '0 0 6px rgba(255,189,46,0.5)' }}
        >
          <Minus size={6} className="opacity-0 group-hover:opacity-100 text-yellow-900" strokeWidth={3.5} />
        </button>
        <button
          aria-label={maximized ? 'Restore' : 'Maximize'}
          onClick={(e) => { e.stopPropagation(); onMaximize() }}
          className="w-3 h-3 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
          style={{ background: '#27c93f', boxShadow: '0 0 6px rgba(39,201,63,0.5)' }}
        >
          {maximized
            ? <Minimize2 size={5} className="opacity-0 group-hover:opacity-100 text-green-900" strokeWidth={3.5} />
            : <Maximize2 size={5} className="opacity-0 group-hover:opacity-100 text-green-900" strokeWidth={3.5} />
          }
        </button>
      </div>

      {/* Title — centered */}
      <div className="absolute inset-0 flex items-center justify-center gap-1.5 pointer-events-none">
        <IconComp size={12} style={{ color: app.color }} />
        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {app.label}
        </span>
      </div>
    </div>
  )

  const inner = (
    <div
      className="flex flex-col w-full h-full overflow-hidden window-content"
      style={{
        background: 'var(--bg-surface)',
        borderRadius: 12,
        border: `1px solid ${app.color}30`,
        boxShadow: `
          0 0 0 1px ${app.color}18,
          0 8px 32px rgba(0,0,0,0.6),
          0 32px 80px rgba(0,0,0,0.7),
          0 0 40px ${app.color}10
        `,
      }}
      onMouseDown={onFocus}
    >
      {titleBar}
      <div className="flex-1 overflow-hidden">
        <AppComponent />
      </div>
    </div>
  )

  // Outer motion.div: opacity only — no transforms so Rnd's bounds="parent" is stable
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      style={{ position: 'absolute', inset: 0, zIndex, pointerEvents: 'none' }}
    >
      {maximized ? (
        <motion.div
          initial={{ scale: 0.97, filter: 'blur(3px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={spring}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
        >
          {inner}
        </motion.div>
      ) : (
        <Rnd
          position={{ x: position.x, y: position.y }}
          size={{ width: size.width, height: size.height }}
          minWidth={app.minSize?.width ?? 300}
          minHeight={app.minSize?.height ?? 200}
          onMouseDown={onFocus}
          onDragStart={onFocus}
          onDragStop={(_e, d) => onDragStop({ x: d.x, y: d.y })}
          onResizeStop={(_e, _dir, ref, _delta, pos) => {
            onResizeStop(
              { width: parseInt(ref.style.width), height: parseInt(ref.style.height) },
              { x: pos.x, y: pos.y }
            )
          }}
          dragHandleClassName="window-drag-handle"
          bounds="parent"
          style={{ pointerEvents: 'auto' }}
          enableResizing={{
            top: true, right: true, bottom: true, left: true,
            topRight: true, topLeft: true, bottomRight: true, bottomLeft: true,
          }}
        >
          {/* Inner: visual enter animation (scale+blur only — no y so drag stays accurate) */}
          <motion.div
            initial={{ scale: 0.93, filter: 'blur(6px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={spring}
            style={{ width: '100%', height: '100%' }}
          >
            {inner}
          </motion.div>
        </Rnd>
      )}
    </motion.div>
  )
}
