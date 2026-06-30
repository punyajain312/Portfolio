import { useState, useEffect } from 'react'
import { Folder, ExternalLink, Github, ChevronRight, Zap, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../config/portfolio'

function Chip({ label, color }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium"
      style={{
        background: `${color}12`,
        color,
        border: `1px solid ${color}28`,
      }}
    >
      {label}
    </span>
  )
}

function ProjectDetail({ project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 16, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -16, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="flex flex-col gap-4 p-5 h-full overflow-y-auto"
    >
      {/* Thumbnail */}
      <div
        className="w-full h-32 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}12 0%, ${project.color}22 100%)`,
          border: `1px solid ${project.color}25`,
        }}
      >
        {/* Animated grid inside thumbnail */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${project.color}08 1px, transparent 1px), linear-gradient(90deg, ${project.color}08 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
          style={{
            background: `${project.color}20`,
            border: `1px solid ${project.color}40`,
            boxShadow: `0 0 24px ${project.color}25`,
          }}
        >
          <Folder size={28} style={{ color: project.color }} />
        </div>
        {/* Corner label */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono"
          style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}
        >
          {project.tech[0]}
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
          {project.name}
        </h2>
        <p className="text-xs mt-0.5 font-mono" style={{ color: project.color }}>
          ▸ {project.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        {project.description}
      </p>

      {/* Highlights */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 font-mono" style={{ color: 'var(--text-dim)' }}>
          Key Features
        </p>
        <ul className="flex flex-col gap-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <Zap size={10} style={{ color: project.color, flexShrink: 0 }} />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Stack */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 font-mono" style={{ color: 'var(--text-dim)' }}>
          Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => <Chip key={t} label={t} color={project.color} />)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 mt-auto pt-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: project.color,
            color: '#020c04',
            boxShadow: `0 0 16px ${project.color}35`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 28px ${project.color}55`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 16px ${project.color}35`)}
        >
          <ExternalLink size={11} />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = project.color)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <Github size={11} />
          Source
        </a>
      </div>
    </motion.div>
  )
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState(PROJECTS[0].id)
  const [narrow, setNarrow] = useState(typeof window !== 'undefined' && window.innerWidth < 600)
  const project = PROJECTS.find((p) => p.id === selected)

  useEffect(() => {
    const fn = () => setNarrow(window.innerWidth < 600)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div className={`flex h-full ${narrow ? 'flex-col' : ''}`}>
      {/* Sidebar / top list */}
      <div
        className={`flex overflow-y-auto py-2 ${narrow ? 'w-full shrink-0 flex-row overflow-x-auto overflow-y-hidden' : 'w-48 shrink-0 flex-col'}`}
        style={{
          borderRight: narrow ? 'none' : '1px solid var(--border)',
          borderBottom: narrow ? '1px solid var(--border)' : 'none',
          background: 'var(--bg-elevated)',
          height: narrow ? 56 : undefined,
        }}
      >
        <div className={`flex items-center gap-1.5 px-4 pb-2 pt-1 ${narrow ? 'sticky left-0' : ''}`}>
          <Terminal size={10} style={{ color: 'var(--text-dim)' }} />
          <p className="text-[10px] font-semibold uppercase tracking-widest font-mono" style={{ color: 'var(--text-dim)' }}>
            ~/projects
          </p>
        </div>
        {PROJECTS.map((p) => {
          const isActive = p.id === selected
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`flex items-center gap-2 px-3 py-2 mx-1 rounded-lg text-left transition-all ${narrow ? 'shrink-0' : ''}`}
              style={{
                background: isActive ? `${p.color}12` : 'transparent',
                border: isActive ? `1px solid ${p.color}25` : '1px solid transparent',
                color: isActive ? p.color : 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <Folder size={13} style={{ color: isActive ? p.color : p.color + '80', flexShrink: 0 }} />
              <span className="text-xs font-medium truncate flex-1 font-mono">{p.name}</span>
              {isActive && <ChevronRight size={11} style={{ color: p.color }} />}
            </button>
          )
        })}
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {project && <ProjectDetail key={project.id} project={project} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
