import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS as SEED, type Product } from '../../data/products'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useCart } from '../../context/CartContext'
import MediaUploader from '../../components/admin/MediaUploader'

const fmt = (n: number) => 'Rs ' + n.toLocaleString('en-PK')

// NOTE: this holds catalogue edits in memory only. Swap this for
// Supabase reads/writes (select/insert/delete on `products`) once
// the backend is wired up — the shape of this component won't
// need to change much.
export default function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { lines } = useCart()
  const [products, setProducts] = useState<Product[]>(SEED)
  const [tab, setTab] = useState<'dashboard' | 'products' | 'orders'>('products')
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', description: '' })
  const [images, setImages] = useState<string[]>([])
  const [video, setVideo] = useState<string | null>(null)
  const draftId = useRef(`draft-${Date.now()}`).current

  const totalStock = products.reduce((s, p) => s + p.stock, 0)
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: 'p' + Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      vendor: 'Duskra',
      compareAt: null,
      badge: 'New',
      image:
        images[0] ||
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
      gallery: images.slice(1),
      video,
      description: form.description || 'A new addition to the Duskra shelf.',
    }
    setProducts((prev) => [...prev, newProduct])
    setForm({ name: '', category: '', price: '', stock: '', description: '' })
    setImages([])
    setVideo(null)
  }

  const handleDelete = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id))

  return (
    <div className="min-h-screen bg-[#0d0f16] text-[#e7e8ee] flex">
      <aside className="w-[230px] flex-none bg-[#0a0b11] border-r border-[#1c1e29] p-4 flex flex-col">
        <div className="flex items-center gap-2.5 px-2 pb-6">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c46a4e] to-[#1e325a]" />
          <span className="font-semibold text-[15px]">Duskra Admin</span>
        </div>
        {(['dashboard', 'products', 'orders'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-left px-3 py-2.5 rounded-lg text-[13.5px] mb-0.5 capitalize transition-colors ${
              tab === t ? 'bg-[#1b1d28] text-white' : 'text-[#9a9cae] hover:bg-[#161821] hover:text-[#e7e8ee]'
            }`}
          >
            {t}
          </button>
        ))}
        <div className="flex-1" />
        <Link to="/" className="px-3 py-2.5 rounded-lg text-[13.5px] text-[#9a9cae] hover:bg-[#161821]">
          ↩ View storefront
        </Link>
        <button
          onClick={logout}
          className="text-left px-3 py-2.5 text-[12.5px] text-[#5c5f6e] hover:text-[#e08383]"
        >
          Log out
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-x-hidden">
        {tab === 'dashboard' && (
          <>
            <div className="mb-7">
              <h1 className="text-[22px] font-semibold">Overview</h1>
              <div className="text-[13px] text-[#8a8d9c] mt-1">
                Welcome back — here's how Duskra is doing.
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
              <Stat val={String(products.length)} lbl="Live products" />
              <Stat val={String(totalStock)} lbl="Units in stock" />
              <Stat val={fmt(totalValue)} lbl="Inventory value" />
              <Stat val={String(lines.reduce((s, l) => s + l.qty, 0))} lbl="Items in live carts" />
            </div>
          </>
        )}

        {tab === 'orders' && (
          <>
            <div className="mb-7">
              <h1 className="text-[22px] font-semibold">Orders</h1>
              <div className="text-[13px] text-[#8a8d9c] mt-1">
                No real order backend is connected yet — this reflects the live storefront cart.
              </div>
            </div>
            <Panel title="Live cart activity (demo)">
              {lines.length === 0 ? (
                <div className="p-10 text-center text-[13.5px] text-[#6c6f80]">
                  No active carts right now.
                </div>
              ) : (
                <Table
                  head={['Product', 'Qty', 'Subtotal']}
                  rows={lines.map((l) => {
                    const p = products.find((p) => p.id === l.id)!
                    return [p.name, String(l.qty), fmt(p.price * l.qty)]
                  })}
                />
              )}
            </Panel>
          </>
        )}

        {tab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
              <div>
                <h1 className="text-[22px] font-semibold">Products</h1>
                <div className="text-[13px] text-[#8a8d9c] mt-1">
                  {products.length} products · {totalStock} units · {fmt(totalValue)} inventory value
                </div>
              </div>
            </div>

            <Panel title="Catalogue">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['', 'Name', 'Category', 'Price', 'Stock', ''].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] uppercase tracking-wider text-[#6c6f80] px-5 py-3 border-b border-[#22242f]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-[#1c1e29] last:border-none">
                      <td className="px-5 py-3.5">
                        <img src={p.image} className="w-9 h-11 object-cover rounded-md" />
                      </td>
                      <td className="px-5 py-3.5 text-[13.5px]">{p.name}</td>
                      <td className="px-5 py-3.5 text-[13.5px]">{p.category}</td>
                      <td className="px-5 py-3.5 text-[13.5px]">{fmt(p.price)}</td>
                      <td className="px-5 py-3.5 text-[13.5px]">{p.stock}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-[12.5px] px-3.5 py-1.5 rounded-lg border border-[#3a2226] text-[#e08383] hover:bg-[#1f1418]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel title="Add new product">
              <form onSubmit={handleAdd} className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
                  <Field label="Price (Rs)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
                  <Field label="Stock" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} required />
                </div>

                <div className="mb-5">
                  <MediaUploader
                    productFolder={draftId}
                    images={images}
                    onImagesChange={setImages}
                    video={video}
                    onVideoChange={setVideo}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[11.5px] uppercase tracking-wider text-[#8a8d9c] mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full bg-[#1b1d28] border border-[#2a2c3a] text-[#e7e8ee] px-3.5 py-3 rounded-lg text-[13.5px] focus:outline-none focus:border-[#c46a4e]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#e7e8ee] text-[#0d0f16] px-5 py-2.5 rounded-lg text-[13px] font-semibold"
                >
                  Save product
                </button>
              </form>
            </Panel>
          </>
        )}
      </main>
    </div>
  )
}

function Stat({ val, lbl }: { val: string; lbl: string }) {
  return (
    <div className="bg-[#14161f] border border-[#22242f] rounded-xl p-5">
      <div className="text-[26px] font-semibold">{val}</div>
      <div className="text-[11.5px] text-[#8a8d9c] mt-1.5">{lbl}</div>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#14161f] border border-[#22242f] rounded-2xl overflow-hidden mb-7">
      <div className="px-5.5 py-4.5 border-b border-[#22242f]">
        <h3 className="text-[14.5px] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} className="text-left text-[11px] uppercase tracking-wider text-[#6c6f80] px-5 py-3 border-b border-[#22242f]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-[#1c1e29] last:border-none">
            {r.map((c, j) => (
              <td key={j} className="px-5 py-3.5 text-[13.5px]">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[11.5px] uppercase tracking-wider text-[#8a8d9c] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-[#1b1d28] border border-[#2a2c3a] text-[#e7e8ee] px-3.5 py-3 rounded-lg text-[13.5px] focus:outline-none focus:border-[#c46a4e]"
      />
    </div>
  )
}
