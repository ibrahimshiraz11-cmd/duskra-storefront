import { motion } from 'motion/react'
import Navbar from '../components/Navbar'

const VALUES = [
  { num: '01', title: 'Slow by design', body: 'A small, rotating shelf rather than an endless catalogue.' },
  { num: '02', title: 'Checked by hand', body: "Every piece is inspected in our Karachi hub before it's boxed." },
  { num: '03', title: 'Made to be given', body: 'Gift-priced and gift-wrapped on request.' },
]

export default function About() {
  return (
    <div className="px-3 md:px-5 pt-3 md:pt-5">
      <Navbar />

      <section className="text-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[rgba(196,106,78,1)] mb-4"
        >
          <span className="w-6 h-px bg-[rgba(196,106,78,1)]" /> Our story
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(34px,6vw,64px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] max-w-[780px] mx-auto mb-5"
        >
          A studio built for one quiet hour of the day.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[15.5px] text-[rgba(30,50,90,0.6)] max-w-[520px] mx-auto"
        >
          Duskra makes small, considered objects for the desk and the shelf.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 max-w-[1100px] mx-auto">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="text-left rounded-[1.4rem] bg-white/55 border border-white/70 backdrop-blur-sm p-7"
            >
              <span className="block text-[13px] font-semibold text-[rgba(196,106,78,1)] mb-3.5">
                {v.num}
              </span>
              <h3 className="text-[17px] font-medium text-[rgba(30,50,90,0.95)] mb-2.5">
                {v.title}
              </h3>
              <p className="text-[13.5px] text-[rgba(30,50,90,0.55)] leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=900&auto=format&fit=crop"
            alt="Studio"
            className="rounded-[1.6rem] w-full aspect-square object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[rgba(196,106,78,1)] mb-2.5">
              <span className="w-6 h-px bg-[rgba(196,106,78,1)]" /> Where we work
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] mb-4">
              Karachi, DHA — and your desk.
            </h2>
            <p className="text-[15px] leading-relaxed text-[rgba(30,50,90,0.6)] max-w-[440px]">
              We're a small team working out of Karachi, sourcing and hand-checking every object
              before it ships nationwide with cash on delivery.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
