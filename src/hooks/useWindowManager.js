import { useState, useCallback } from 'react'

let zCounter = 100

// Center the terminal on first open; stagger everything else
const MENUBAR_H = 30
const DOCK_H = 90

function defaultPos(openCount, appId, appSize) {
  if (appId === 'terminal' && openCount === 0) {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900
    const usableH = vh - MENUBAR_H - DOCK_H
    return {
      x: Math.max(40, Math.floor((vw - appSize.width) / 2)),
      y: Math.max(20, Math.floor((usableH - appSize.height) / 2)),
    }
  }
  const offset = (openCount % 10) * 30
  return { x: 80 + offset, y: 60 + offset }
}

export function useWindowManager() {
  const [windows, setWindows] = useState([])

  const openWindow = useCallback((app) => {
    if (!app) return
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === app.id)
      if (existing) {
        return prev.map((w) =>
          w.id === app.id ? { ...w, minimized: false, zIndex: ++zCounter } : w
        )
      }
      const openCount = prev.length
      return [
        ...prev,
        {
          id: app.id,
          zIndex: ++zCounter,
          minimized: false,
          maximized: false,
          position: defaultPos(openCount, app.id, app.defaultSize),
          size: { ...app.defaultSize },
        },
      ]
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id)
      if (!target) return prev
      const maxZ = Math.max(...prev.map((w) => w.zIndex))
      if (target.zIndex === maxZ) return prev
      return prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter } : w))
    })
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  const toggleMaximize = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, zIndex: ++zCounter } : w))
    )
  }, [])

  const updatePosition = useCallback((id, position) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)))
  }, [])

  const updateSize = useCallback((id, size) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)))
  }, [])

  return { windows, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize, updatePosition, updateSize }
}
