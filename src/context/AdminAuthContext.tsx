import { createContext, useContext, useState, type ReactNode } from 'react'

// Demo-only client-side gate. Replace with real Supabase Auth
// (supabase.auth.signInWithPassword) before going live — this
// does not protect data, only the UI route.
const ADMIN_ID = 'admin'
const ADMIN_PASS = 'duskra2026'
const SESSION_KEY = 'duskra_admin_session'

type AdminAuthContextType = {
  isAuthed: boolean
  login: (id: string, pass: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === '1',
  )

  const login = (id: string, pass: string) => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setIsAuthed(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthed(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
