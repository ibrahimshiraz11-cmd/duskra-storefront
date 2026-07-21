import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="px-3 md:px-5 pb-3 md:pb-5">
      <div className="rounded-[2rem] bg-white/55 border border-white/70 backdrop-blur-sm px-6 md:px-10 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-xl font-medium text-[rgba(30,50,90,0.95)] mb-3">Duskra</div>
            <p className="text-[13px] text-[rgba(30,50,90,0.6)] max-w-[220px] leading-relaxed">
              Objects for the quiet hours — desk pieces and small rituals, made to be looked at
              slowly.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[rgba(30,50,90,0.4)] mb-4">
              Shop
            </h4>
            <Link to="/shop" className="block text-sm text-[rgba(30,50,90,0.8)] mb-2.5">
              All Objects
            </Link>
            <Link to="/shop" className="block text-sm text-[rgba(30,50,90,0.8)] mb-2.5">
              New Arrivals
            </Link>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[rgba(30,50,90,0.4)] mb-4">
              Studio
            </h4>
            <Link to="/about" className="block text-sm text-[rgba(30,50,90,0.8)] mb-2.5">
              About Duskra
            </Link>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[rgba(30,50,90,0.4)] mb-4">
              Say Hello
            </h4>
            <p className="text-sm text-[rgba(30,50,90,0.7)] mb-2.5">DHA, Karachi, Pakistan</p>
            <p className="text-sm text-[rgba(30,50,90,0.7)]">hello@duskra.pk</p>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-2 pt-5 border-t border-[rgba(30,50,90,0.08)] text-[11px] text-[rgba(30,50,90,0.4)]">
          <span>© 2026 Duskra</span>
          <span>Crafted for the in-between hours.</span>
        </div>
      </div>
    </footer>
  )
}
