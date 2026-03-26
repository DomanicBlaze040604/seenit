"use client"
import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Instagram, Youtube, Twitter, Linkedin } from "lucide-react"

/* ── TextHoverEffect ─────────────────────────────── */
export function TextHoverEffect({
  text,
  duration = 0,
}: {
  text: string
  duration?: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    setMaskPos({
      cx: `${((cursor.x - rect.left) / rect.width) * 100}%`,
      cy: `${((cursor.y - rect.top) / rect.height) * 100}%`,
    })
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none cursor-pointer uppercase"
    >
      <defs>
        <linearGradient id="seenitGrad" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="#FFD700" />
              <stop offset="30%"  stopColor="#1648CC" />
              <stop offset="60%"  stopColor="#4E8FFF" />
              <stop offset="100%" stopColor="#FFD700" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPos}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Outline ghost */}
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3" style={{ opacity: hovered ? 0.6 : 0 }}
        className="fill-transparent stroke-[#1648CC44] font-[Bangers] text-7xl font-bold"
      >
        {text}
      </text>

      {/* Draw-on stroke */}
      <motion.text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#1648CC] font-[Bangers] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Hover-reveal gradient fill */}
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        stroke="url(#seenitGrad)" strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[Bangers] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

/* ── Footer ──────────────────────────────────────── */
const FOOTER_LINKS = [
  {
    title: "Platform",
    links: [
      { label: "Browse Reviews", href: "#" },
      { label: "How it Works",   href: "#why-seenit" },
      { label: "For Consumers",  href: "#for-reviewers" },
      { label: "Top Creators",   href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About SeenIt",  href: "#why-seenit" },
      { label: "For Brands",    href: "#for-brands" },
      { label: "Revenue Model", href: "#revenue" },
      { label: "SARS™ System",  href: "#sars" },
    ],
  },
  {
    title: "Earn",
    links: [
      { label: "Creator Earnings", href: "#for-reviewers" },
      { label: "Brand Plans",      href: "#for-brands" },
      { label: "Revenue Share",    href: "#revenue" },
      { label: "Leaderboard",      href: "#sars" },
    ],
  },
]

const SOCIALS = [
  { icon: <Twitter size={18} />,   label: "Twitter",   href: "#" },
  { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
  { icon: <Linkedin size={18} />,  label: "LinkedIn",  href: "#" },
  { icon: <Youtube size={18} />,   label: "YouTube",   href: "#" },
]

export default function HoverFooter() {
  const [email, setEmail] = useState("")

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#040C1A", borderTop: "1px solid rgba(22,72,204,0.15)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 5%, rgba(22,72,204,0.08) 30%, rgba(255,215,0,0.04) 70%, transparent 100%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-10 pt-14 pb-6 z-10">

        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center gap-6"
          style={{ backgroundColor: "#0C1628", border: "1px solid rgba(22,72,204,0.2)" }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Mail size={18} style={{ color: "#FFD700" }} />
              <h4 className="text-white font-black text-lg">Stay in the Loop</h4>
            </div>
            <p className="text-sm" style={{ color: "#4B6280" }}>
              SeenIt launches, creator tips &amp; brand deals — direct to your inbox.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 md:w-60 rounded-xl px-4 py-3 text-white text-sm"
              style={{ backgroundColor: "#081020", border: "1px solid rgba(255,255,255,0.08)", outline: "none" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(22,72,204,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button
              onClick={() => setEmail("")}
              className="px-5 py-3 rounded-xl text-white text-sm font-bold whitespace-nowrap transition-all"
              style={{ background: "linear-gradient(135deg,#1648CC,#0F35A8)" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 24px rgba(22,72,204,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
          {/* Brand col */}
          <div className="col-span-2">
            <img src="/logo.png" alt="SeenIt" className="h-14 w-auto mb-4" />
            <p className="text-sm leading-relaxed mb-1 max-w-xs" style={{ color: "#2A3F5F" }}>
              India&apos;s first trust-indexed, video-first UGC review platform powered by SARS™.
            </p>
            <p className="text-xs font-bold mb-5" style={{ color: "#1648CC" }}>See It. Trust It.</p>
            <a href="mailto:seenitindia@gmail.com" className="text-sm font-semibold transition-colors" style={{ color: "#4E8FFF" }}>
              seenitindia@gmail.com
            </a>
            <div className="flex gap-2.5 mt-5">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#4B6280" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(22,72,204,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLAnchorElement).style.color = "#4B6280" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map(col => (
            <div key={col.title}>
              <h5 className="text-white font-black text-xs uppercase tracking-[0.15em] mb-5">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors"
                      style={{ color: "#2A3F5F" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#2A3F5F")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Monetization note */}
        <div
          className="rounded-xl px-5 py-4 mb-4 flex items-center gap-3"
          style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span style={{ color: "#FFD700", fontSize: 18 }}>💰</span>
          <p className="text-xs" style={{ color: "#2A3F5F" }}>
            <span className="font-bold" style={{ color: "#4B6280" }}>Monetization: </span>
            Brand subscriptions · Sales commissions · Premium creator tools. Never by selling user data or faking reviews.
          </p>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.05)", margin: "0 0 16px 0" }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#1A2A3F" }}>© 2026 SeenIt Technologies Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(lbl => (
              <a
                key={lbl}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "#1A2A3F" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#9BB5D9")}
                onMouseLeave={e => (e.currentTarget.style.color = "#1A2A3F")}
              >
                {lbl}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Big SeenIt text hover effect */}
      <div className="hidden lg:flex h-64 -mt-20 -mb-10 px-4 overflow-hidden">
        <TextHoverEffect text="SeenIt" />
      </div>
    </footer>
  )
}
