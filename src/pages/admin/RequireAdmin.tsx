import type { ReactNode } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import AdminLogin from './AdminLogin'

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAuthed } = useAdminAuth()
  if (!isAuthed) return <AdminLogin />
  return <>{children}</>
}
