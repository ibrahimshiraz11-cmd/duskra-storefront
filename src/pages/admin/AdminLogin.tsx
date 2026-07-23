import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(id, pass)) {
      navigate('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f16] text-[#e7e8ee] flex items-center justify-center p-5">
      <div className="w-full max-w-[380px] bg-[#14161f] border border-[#22242f] rounded-2xl p-9">
        <div className="flex items-center gap-2.5 mb-7">
          <span className="w-5.5 h-5.5 rounded-full bg-gradient-to-br from-[#c46a4e] to-[#1e325a]" />
          <strong className="text-sm">Duskra Admin</strong>
        </div>
        <h2 className="text-lg font-semibold mb-1.5">Sign in</h2>
        <div className="text-[13px] text-[#8a8d9c] mb-6">
          Staff access only. Not linked from the storefront.
        </div>
        {error && (
          <div className="text-[12.5px] text-[#e08383] mb-4">Incorrect ID or password.</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[11.5px] uppercase tracking-wider text-[#8a8d9c] mb-1.5">
              Admin ID
            </label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoComplete="username"
              required
              className="w-full bg-[#1b1d28] border border-[#2a2c3a] text-[#e7e8ee] px-3.5 py-3 rounded-lg text-sm focus:outline-none focus:border-[#c46a4e]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[11.5px] uppercase tracking-wider text-[#8a8d9c] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full bg-[#1b1d28] border border-[#2a2c3a] text-[#e7e8ee] px-3.5 py-3 rounded-lg text-sm focus:outline-none focus:border-[#c46a4e]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#e7e8ee] text-[#0d0f16] py-3.5 rounded-lg text-sm font-semibold mt-1.5"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
