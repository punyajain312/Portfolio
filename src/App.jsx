import { useState, useEffect, useCallback, useRef } from 'react'
import Desktop from './components/Desktop'
import MobileBlock from './components/MobileBlock'
import { useWindowManager } from './hooks/useWindowManager'
import { WindowContext } from './context/WindowContext'
import { APPS } from './config/apps'

// JS-based breakpoint — no Tailwind CSS dependency
function useIsDesktop() {
  const get = () => typeof window !== 'undefined' && window.innerWidth >= 900
  const [ok, setOk] = useState(get)
  useEffect(() => {
    const fn = () => setOk(window.innerWidth >= 900)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return ok
}

export default function App() {
  const [dark, setDark] = useState(true)
  const wm = useWindowManager()
  const isDesktop = useIsDesktop()
  const didOpen = useRef(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // openById breaks the circular-import chain:
  // TerminalApp uses this from context instead of importing APPS directly.
  const openById = useCallback(
    (id) => {
      const app = APPS.find((a) => a.id === id)
      if (app) wm.openWindow(app)
    },
    [wm]
  )

  // Auto-open terminal once
  useEffect(() => {
    if (!isDesktop || didOpen.current) return
    didOpen.current = true
    openById('terminal')
  }, [isDesktop, openById])

  if (!isDesktop) return <MobileBlock />

  return (
    <WindowContext.Provider value={{ ...wm, openById }}>
      <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--bg-desktop)' }}>
        <Desktop dark={dark} toggleDark={() => setDark((d) => !d)} {...wm} />
      </div>
    </WindowContext.Provider>
  )
}
