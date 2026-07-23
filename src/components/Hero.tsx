import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Navbar from './Navbar'
import HeroBadge from './HeroBadge'
import BottomLeftCard from './BottomLeftCard'
import BottomRightCorner from './BottomRightCorner'

const HEADLINE = 'Bring the dusk indoors.'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])

  const words = HEADLINE.split(' ')

  return (
    <div ref={ref} className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-white/10 group">
        {/* Gradient fallback — shows through until you drop your own footage into public/hero-video.mp4 */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            scale: bgScale,
            opacity: bgOpacity,
            background:
              'radial-gradient(1200px 600px at 15% -10%, rgba(196,106,78,0.35), transparent 60%), radial-gradient(1000px 700px at 90% 10%, rgba(30,50,90,0.35), transparent 55%), linear-gradient(160deg,#dfe3ea 0%, #eceef1 45%, #e3ddd3 100%)',
          }}
        />

        {/* Video Background — replace public/hero-video.mp4 with your own footage (e.g. the product in motion) */}
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </motion.video>

        {/* Soft animated glow orbs for extra depth */}
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(196,106,78,0.28), transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -right-16 w-[440px] h-[440px] rounded-full z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(30,50,90,0.22), transparent 70%)' }}
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div style={{ y: contentY }} className="relative z-10 w-full h-full flex flex-col items-center">
          <Navbar />

          <div className="w-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl">
            <HeroBadge />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-[#5E6470] mb-2 tracking-tight leading-[1.05] flex flex-wrap justify-center">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="inline-block mr-[0.28em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + words.length * 0.09 }}
              className="text-sm sm:text-base md:text-lg text-[#5E6470] opacity-80 leading-relaxed max-w-xl font-normal"
            >
              Slow, considered pieces for the desk and the shelf — built for the hour when the day
              empties out.
            </motion.p>
          </div>

          <BottomLeftCard />
          <BottomRightCorner />
        </motion.div>
      </section>
    </div>
  )
}
