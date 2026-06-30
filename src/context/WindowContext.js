import { createContext, useContext } from 'react'

export const WindowContext = createContext(null)

export function useWindowCtx() {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindowCtx must be inside WindowContext.Provider')
  return ctx
}
