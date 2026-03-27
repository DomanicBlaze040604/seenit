"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import * as React from "react";

/* ── Heavy 3-party components: lazy-load to keep bundle small ── */
const Preloader    = dynamic(() => import("@/components/ui/preloader"),      { ssr: false });
const RadarHero    = dynamic(() => import("@/components/ui/radar-hero"),     { ssr: false });
const ReviewMarquee = dynamic(() => import("@/components/ui/review-marquee"), { ssr: false });
const ExpandCards  = dynamic(() => import("@/components/ui/expand-cards"),   { ssr: false });
const HoverFooter  = dynamic(() => import("@/components/ui/hover-footer"),   { ssr: false });

/* ── Data constants ── */
const NAV_LINKS = [
  { label: "Why SeenIt", href: "#why-seenit" },
  { label: "Revenue Model", href: "#revenue" },
  { label: "For Brands", href: "#for-brands" },
  { label: "For Reviewers", href: "#for-reviewers" },
  { label: "Contact", href: "#contact" },
];

const CATEGORIES = [
  { label: "Fashion",     emoji: "👗", href: "/reviews?cat=fashion",     color: "#C084FC" },
  { label: "Skincare",    emoji: "✨", href: "/reviews?cat=skincare",    color: "#86EFAC" },
  { label: "Restaurants", emoji: "🍜", href: "/reviews?cat=restaurants", color: "#FBB84B" },
  { label: "Beauty",      emoji: "💄", href: "/reviews?cat=beauty",      color: "#FF6B9D" },
  { label: "Books",       emoji: "📚", href: "/reviews?cat=books",       color: "#60A5FA" },
];

const SARS_FACTORS = [
  { icon: "history", title: "Experience Validity", xp: "+120 XP", grad: "from-red-500 to-rose-600" },
  { icon: "person_check", title: "Reviewer Credibility", xp: "+100 XP", grad: "from-[#1648CC] to-[#4E8FFF]" },
  { icon: "article", title: "Content Quality", xp: "+80 XP", grad: "from-[#FFD700] to-[#F5A800]" },
  { icon: "monitoring", title: "Engagement Integrity", xp: "+90 XP", grad: "from-teal-500 to-cyan-500" },
  { icon: "target", title: "Outcome Impact", xp: "+110 XP", grad: "from-purple-500 to-violet-600" },
];

const TIERS = [
  {
    tier: "New", emoji: "🌱", sars: "0–49", rate: "₹80–₹165 / 1K views",
    perks: ["Start reviewing products", "Build your SARS™ score", "Earn commissions on sales"],
    grad: "from-gray-600 to-gray-500", ringColor: "border-white/10", featured: false,
  },
  {
    tier: "Trusted", emoji: "⭐", sars: "50–79", rate: "₹165–₹415 / 1K views",
    perks: ["Priority review visibility", "Access brand campaigns", "SARS™ boost rewards"],
    grad: "from-[#1648CC] to-[#4E8FFF]", ringColor: "border-[#1648CC]/40", featured: false,
  },
  {
    tier: "Elite", emoji: "🏆", sars: "80–100", rate: "₹415–₹580 / 1K views",
    perks: ["Exclusive brand deals", "Leaderboard featured", "Max commission multiplier"],
    grad: "from-[#FFD700] to-[#F5A800]", ringColor: "border-[#FFD700]/40", featured: true,
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      {/* ══════════ PRELOADER ══════════ */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className="relative flex min-h-screen flex-col bg-[#040C1A] text-white overflow-x-hidden">

        {/* ══════════ NAVBAR ══════════ */}
        <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#040C1A]/85 backdrop-blur-xl">
          {/* Main row */}
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex items-center h-[70px] justify-between gap-8">
            <Link href="/" className="shrink-0">
              <img src="/logo.png" alt="SeenIt" className="h-14 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href}
                  className="text-[#9BB5D9] hover:text-white text-sm font-semibold transition-colors duration-200">
                  {link.label}
                </a>
              ))}
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="text-[#9BB5D9] hover:text-white text-sm font-semibold transition-colors duration-200 flex items-center gap-1 py-4">
                  Categories <span className="material-symbols-outlined !text-[16px]">expand_more</span>
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-[#081020]/95 backdrop-blur-md border border-[#1648CC]/30 rounded-xl p-2 w-48 shadow-2xl shadow-black/50">
                    {CATEGORIES.map(cat => (
                       <Link key={cat.label} href={cat.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm" style={{ color: cat.color }}>
                         <span className="text-base">{cat.emoji}</span>
                         <span className="font-bold">{cat.label}</span>
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <a href="#sars"
                className="inline-flex items-center gap-1.5 bg-[#1648CC]/15 border border-[#1648CC]/35 rounded-full px-4 py-1.5 text-sm font-black text-[#4E8FFF] hover:bg-[#1648CC]/25 hover:shadow-[0_0_16px_rgba(22,72,204,0.4)] transition-all">
                <span className="material-symbols-outlined !text-[13px]">shield</span>
                SARS™
              </a>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href="mailto:seenitindia@gmail.com"
                className="text-xs font-semibold text-[#4B6280] hover:text-[#4E8FFF] transition-colors">
                seenitindia@gmail.com
              </a>
              <Link href="/login" className="btn-gold px-5 py-2.5 rounded-xl text-sm">
                Get Early Access
              </Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-1" aria-label="Toggle menu">
              <span className="material-symbols-outlined !text-[28px]">{mobileOpen ? "close" : "menu"}</span>
            </button>
          </div>

        </header>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-[#040C1A] pt-[70px] px-6 flex flex-col overflow-y-auto lg:hidden">
            <div className="flex flex-col py-8 gap-2">
              {/* Category pills */}
              <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-white/5">
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: `${cat.color}12`,
                      border: `1px solid ${cat.color}35`,
                      color: cat.color,
                    }}
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold text-white py-4 border-b border-white/5">
                  {link.label}
                </a>
              ))}
              <a href="#sars" onClick={() => setMobileOpen(false)}
                className="text-xl font-black text-[#4E8FFF] py-4 border-b border-white/5">
                SARS™
              </a>
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="btn-gold mt-6 py-4 rounded-xl text-center text-base">
                Get Early Access
              </Link>
              <a href="mailto:seenitindia@gmail.com" className="text-center text-sm text-[#4B6280] mt-3">
                seenitindia@gmail.com
              </a>
            </div>
          </div>
        )}

        <main className="flex-1">

          {/* ══════════ HERO — RADAR EFFECT ══════════ */}
          <RadarHero />

          {/* ══════════ STATS BAR ══════════ */}
          <section className="border-y border-white/[0.05] bg-[#081020]/60 px-4 md:px-10 py-10">
            <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { num: "100%", sub: "Reviews are Videos", icon: "videocam", color: "text-red-400" },
                { num: "Zero", sub: "Fake Reviews", icon: "gpp_bad", color: "text-[#FFD700]" },
                { num: "Earn", sub: "By Reviewing", icon: "monetization_on", color: "text-[#4E8FFF]" },
                { num: "#1", sub: "India's First", icon: "flag", color: "text-green-400" },
              ].map(stat => (
                <div key={stat.sub} className="flex flex-col items-center text-center gap-2">
                  <span className={`material-symbols-outlined !text-[28px] ${stat.color}`}>{stat.icon}</span>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight">{stat.num}</p>
                  <p className="text-[#4B6280] text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ REVIEW MARQUEE CAROUSEL ══════════ */}
          <ReviewMarquee />

          {/* ══════════ WHY SEENIT ══════════ */}
          <section id="why-seenit" className="px-4 md:px-10 lg:px-20 py-24 lg:py-32">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-16">
                <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.2em] mb-3">The Platform Difference</p>
                <h2 className="font-black text-white" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                  Why{" "}
                  <span className="gradient-text-blue">&ldquo;SeenIt&rdquo;</span>?
                </h2>
                <p className="text-[#6B88B8] mt-4 text-lg max-w-lg mx-auto">
                  Opinions don&apos;t matter unless you&apos;ve actually{" "}
                  <span className="text-white font-bold">seen it</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {[
                  { icon: "videocam", title: "Video-First", kicker: "No filters. No scripts.", desc: "Real people on camera — the good, the bad, the honest.", grad: "from-red-500 to-rose-600", hover: "hover:border-red-500/30 hover:shadow-red-500/10" },
                  { icon: "verified_user", title: "SARS™ Verified", kicker: "Trust isn't a claim. It's a score.", desc: "5-factor authenticity engine behind every single review.", grad: "from-[#1648CC] to-[#4E8FFF]", hover: "hover:border-[#1648CC]/40 hover:shadow-[#1648CC]/10" },
                  { icon: "monetization_on", title: "Earn from Impact", kicker: "Paid for influence, not opinions.", desc: "Your honest review earns when it drives real buying decisions.", grad: "from-[#FFD700] to-[#F5A800]", hover: "hover:border-[#FFD700]/30 hover:shadow-[#FFD700]/8" },
                ].map(card => (
                  <div key={card.title} className={`group glass-sm rounded-3xl p-7 border border-white/[0.06] hover:shadow-xl ${card.hover} transition-all`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.grad} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="material-symbols-outlined text-white !text-[26px]">{card.icon}</span>
                    </div>
                    <h3 className="text-white font-black text-xl mb-1">{card.title}</h3>
                    <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-wider mb-3">{card.kicker}</p>
                    <p className="text-[#6B88B8] text-sm leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2.5">
                {["Not Staged", "Not Scripted", "Not Paid Hype", "Real People", "Real Products", "Real Experiences", "On Video"].map(kw => (
                  <span key={kw} className="px-5 py-2 rounded-full bg-white/[0.04] border border-white/8 text-[#9BB5D9] font-semibold text-sm hover:border-[#1648CC]/40 hover:text-white hover:bg-[#1648CC]/8 transition-all cursor-default">{kw}</span>
                ))}
              </div>

              <div className="mt-14 relative overflow-hidden rounded-3xl border border-[#1648CC]/20 bg-gradient-to-br from-[#0C1628] to-[#081020] px-8 md:px-14 py-10 text-center">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#1648CC]/12 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-snug" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                    SeenIt isn&apos;t changing how people review products.
                    <br />
                    <span className="gradient-text-gold">It&apos;s changing how India decides what to buy.</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ EXPAND CARDS — CATEGORY BROWSER ══════════ */}
          <ExpandCards />

          {/* ══════════ SARS ══════════ */}
          <section id="sars" className="px-4 md:px-10 lg:px-20 py-24 lg:py-32 bg-[#081020] border-y border-white/[0.04]">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-[#1648CC]/12 border border-[#1648CC]/25 rounded-full px-5 py-2 mb-5">
                  <span className="material-symbols-outlined text-[#1648CC] !text-[15px]">shield</span>
                  <span className="text-[#4E8FFF] text-[10px] font-black uppercase tracking-[0.18em]">The Trust Engine</span>
                </div>
                <h2 className="font-black text-white" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                  SARS™ —{" "}
                  <span className="gradient-text-gold">The Score System</span>
                </h2>
                <p className="text-[#6B88B8] text-lg mt-3 max-w-lg mx-auto">
                  Trust isn&apos;t a claim.{" "}
                  <span className="text-white font-bold">It&apos;s a number.</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                {SARS_FACTORS.map((f, i) => (
                  <div key={i} className="group glass-sm border border-white/[0.06] rounded-2xl p-5 hover:shadow-[#1648CC]/10 hover:shadow-xl transition-all">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                      <span className="material-symbols-outlined text-white !text-[19px]">{f.icon}</span>
                    </div>
                    <h4 className="text-white text-sm font-bold mb-2.5 leading-tight">{f.title}</h4>
                    <span className="xp-chip">{f.xp}</span>
                  </div>
                ))}
              </div>

              {/* Score ring + tier explainer */}
              <div className="glass border border-[#1648CC]/20 rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex flex-col items-center gap-4 shrink-0">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#081020" strokeWidth="10" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeDasharray="264" strokeDashoffset="26" strokeLinecap="round" />
                        <defs>
                          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1648CC" />
                            <stop offset="100%" stopColor="#FFD700" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="text-center z-10">
                        <p className="text-4xl font-black text-white leading-none">94</p>
                        <p className="text-[#FFD700] text-xs font-black mt-0.5">SARS™</p>
                      </div>
                    </div>
                    <div className="tier-badge tier-elite text-sm">🏆 Elite Tier</div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-white mb-3">Dynamic Authenticity Score</h3>
                    <p className="text-[#6B88B8] text-sm leading-relaxed mb-6">
                      Controls a review&apos;s{" "}
                      <span className="text-white font-bold">visibility</span>,{" "}
                      <span className="text-[#FFD700] font-bold">earnings</span>,{" "}
                      <span className="text-[#4E8FFF] font-bold">distribution</span>, and{" "}
                      <span className="text-green-400 font-bold">long-term weight</span>.
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                      {[
                        { label: "New", range: "0–49", emoji: "🌱", cls: "tier-new" },
                        { label: "Trusted", range: "50–79", emoji: "⭐", cls: "tier-trusted" },
                        { label: "Elite", range: "80–100", emoji: "🏆", cls: "tier-elite" },
                      ].map(t => (
                        <div key={t.label} className={`tier-badge ${t.cls} text-sm`}>
                          {t.emoji} {t.label}{" "}
                          <span className="opacity-50 font-medium text-xs">({t.range})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-48">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#4B6280] mb-3 text-center">Live Leaderboard</p>
                    {[
                      { name: "Arjun M.", score: 94, medal: "🥇" },
                      { name: "Priya S.", score: 88, medal: "🥈" },
                      { name: "Ravi K.", score: 82, medal: "🥉" },
                    ].map((u, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm">{u.medal}</span>
                        <span className="text-[#9BB5D9] text-xs flex-1">{u.name}</span>
                        <span className="text-[#FFD700] text-xs font-black">{u.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ FOR BRANDS ══════════ */}
          <section id="for-brands" className="px-4 md:px-10 lg:px-20 py-24 lg:py-32">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
                <div className="flex-1">
                  <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.18em] mb-4">For Brands</p>
                  <h2 className="font-black text-white leading-tight mb-5" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                    <span className="gradient-text-blue">Content</span> +{" "}
                    <span className="gradient-text-gold">Distribution</span>
                    <br />in One Move.
                  </h2>
                  <p className="text-[#6B88B8] text-lg mb-8 max-w-md">
                    Stop buying fake engagement. Start earning{" "}
                    <span className="text-white font-bold">real trust</span>.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      { icon: "trending_down", label: "Lower CAC", desc: "Trust-driven acquisition costs less" },
                      { icon: "speed", label: "Faster Feedback Loops", desc: "Real-time product insights from real users" },
                      { icon: "groups", label: "Community Growth", desc: "Users become your brand advocates" },
                      { icon: "verified", label: "SARS™ Certified Content", desc: "Every review is authenticated" },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-4 glass-sm border border-white/[0.06] rounded-xl p-4 hover:border-[#1648CC]/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#1648CC]/15 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#4E8FFF] !text-[19px]">{item.icon}</span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.label}</p>
                          <p className="text-[#4B6280] text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="btn-blue inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base">
                    Partner with SeenIt
                    <span className="material-symbols-outlined !text-[19px]">arrow_forward</span>
                  </a>
                </div>

                {/* Brand dashboard mock */}
                <div className="flex-1 flex justify-center">
                  <div className="glass border border-[#1648CC]/20 rounded-3xl p-7 w-full max-w-[360px]">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-white font-black text-base">Brand Dashboard</h4>
                      <span className="xp-chip">Live</span>
                    </div>
                    {[
                      { label: "Authentic Reviews", val: "2.4K", icon: "verified", color: "text-[#4E8FFF]", bg: "bg-[#1648CC]/15" },
                      { label: "Avg. SARS™ Score", val: "87", icon: "shield", color: "text-[#FFD700]", bg: "bg-[#FFD700]/10" },
                      { label: "Purchase Intent", val: "68%", icon: "shopping_cart", color: "text-green-400", bg: "bg-green-500/10" },
                      { label: "Trust Velocity", val: "+34%", icon: "trending_up", color: "text-[#4ECDC4]", bg: "bg-teal-500/10" },
                    ].map(m => (
                      <div key={m.label} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined !text-[17px] ${m.color}`}>{m.icon}</span>
                          </div>
                          <span className="text-[#9BB5D9] text-sm">{m.label}</span>
                        </div>
                        <span className={`font-black text-xl ${m.color}`}>{m.val}</span>
                      </div>
                    ))}
                    <div className="mt-5 pt-4 border-t border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#4B6280] text-xs">Review Trust Rate</span>
                        <span className="text-[#FFD700] text-xs font-black">87%</span>
                      </div>
                      <div className="h-2 bg-[#081020] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: "87%", background: "linear-gradient(90deg, #1648CC, #FFD700)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ FOR REVIEWERS / CREATORS ══════════ */}
          <section id="for-reviewers" className="px-4 md:px-10 lg:px-20 py-24 lg:py-32 bg-[#081020] border-y border-white/[0.04]">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-14">
                <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.18em] mb-3">For Reviewers &amp; Creators</p>
                <h2 className="font-black text-white mb-3" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                  Your Honest Review{" "}
                  <span className="gradient-text-gold">Earns</span>
                </h2>
                <p className="text-[#6B88B8] text-lg max-w-md mx-auto">
                  Not paid for opinions. Paid for{" "}
                  <span className="text-white font-bold">real influence</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {TIERS.map(t => (
                  <div key={t.tier}
                    className={`relative glass-sm border ${t.ringColor} rounded-3xl p-7 hover:shadow-xl transition-all ${t.featured ? "ring-1 ring-[#FFD700]/20 shadow-xl shadow-[#FFD700]/6" : ""}`}>
                    {t.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#F5A800] text-[#040C1A] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                        Top Tier
                      </div>
                    )}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.grad} flex items-center justify-center text-2xl mb-5 shadow-lg`}>{t.emoji}</div>
                    <h3 className="text-white font-black text-2xl mb-0.5">{t.tier}</h3>
                    <p className="text-[#4B6280] text-xs mb-2">SARS™ Score: {t.sars}</p>
                    <p className="gradient-text-gold font-black text-sm mb-5">{t.rate}</p>
                    <ul className="space-y-2.5">
                      {t.perks.map(perk => (
                        <li key={perk} className="flex items-center gap-2 text-[#9BB5D9] text-sm">
                          <span className="material-symbols-outlined material-fill text-[#1648CC] !text-[16px]">check_circle</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Customer → Creator Loop */}
              <div className="glass border border-white/[0.06] rounded-3xl p-7 md:p-10">
                <h4 className="text-white font-black text-lg text-center mb-8">
                  Customer{" "}
                  <span className="gradient-text-blue">→</span> Creator Loop
                </h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-2">
                  {[
                    { icon: "explore", label: "Discover", color: "from-[#1648CC] to-[#4E8FFF]" },
                    { icon: "shopping_cart", label: "Purchase", color: "from-[#FFD700] to-[#F5A800]" },
                    { icon: "local_shipping", label: "Receive", color: "from-teal-500 to-cyan-500" },
                    { icon: "videocam", label: "Review", color: "from-red-500 to-rose-500" },
                    { icon: "monetization_on", label: "Earn", color: "from-green-500 to-emerald-500" },
                  ].map((step, i, arr) => (
                    <React.Fragment key={step.label}>
                      <div className="flex flex-col items-center gap-2.5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                          <span className="material-symbols-outlined text-white !text-[24px]">{step.icon}</span>
                        </div>
                        <span className="text-[#9BB5D9] text-xs font-bold">{step.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <span className="material-symbols-outlined text-[#1648CC]/35 !text-[26px] hidden md:block">arrow_forward</span>
                      )}
                      {i < arr.length - 1 && (
                        <span className="material-symbols-outlined text-[#1648CC]/35 !text-[26px] md:hidden rotate-90">arrow_downward</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ REVENUE MODEL ══════════ */}
          <section id="revenue" className="px-4 md:px-10 lg:px-20 py-24 lg:py-32">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-14">
                <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.18em] mb-3">How We Operate</p>
                <h2 className="font-black text-white" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                  Revenue{" "}
                  <span className="gradient-text-blue">Model</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: "business", title: "Brand Subscriptions", desc: "Brands pay for access to verified UGC analytics and content", grad: "from-[#1648CC] to-[#0F35A8]", glow: "hover:shadow-[#1648CC]/12" },
                  { icon: "percent", title: "Sales Commission", desc: "Small % on purchases made through SeenIt review pages", grad: "from-[#FFD700] to-[#F5A800]", glow: "hover:shadow-[#FFD700]/8" },
                  { icon: "workspace_premium", title: "Premium Creator Tools", desc: "Advanced analytics and boosted visibility for Elite creators", grad: "from-purple-500 to-violet-600", glow: "hover:shadow-purple-500/12" },
                ].map(rev => (
                  <div key={rev.title} className={`group glass-sm border border-white/[0.06] rounded-3xl p-7 hover:shadow-xl ${rev.glow} transition-all`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rev.grad} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-white !text-[22px]">{rev.icon}</span>
                    </div>
                    <h3 className="text-white font-black text-xl mb-2">{rev.title}</h3>
                    <p className="text-[#6B88B8] text-sm leading-relaxed">{rev.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ CONTACT / CTA ══════════ */}
          <section id="contact" className="px-4 md:px-10 lg:px-20 py-24 bg-[#081020] border-t border-white/[0.04]">
            <div className="max-w-[800px] mx-auto">
              <div className="relative overflow-hidden rounded-3xl border border-[#1648CC]/20 bg-gradient-to-br from-[#0C1628] to-[#081020] px-8 md:px-16 py-16 text-center">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#1648CC]/12 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#FFD700]/6 blur-3xl pointer-events-none" />
                <div className="relative">
                  <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.18em] mb-4">Get In Touch</p>
                  <h2 className="font-black text-white mb-5" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", letterSpacing: "0.04em" }}>
                    Ready to{" "}
                    <span className="gradient-text-blue">See It</span>?
                  </h2>
                  <p className="text-[#6B88B8] text-lg mb-8">Brands, creators, or just curious — reach out directly.</p>
                  <a href="mailto:seenitindia@gmail.com" className="btn-blue inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base mx-auto mb-7">
                    <span className="material-symbols-outlined !text-[20px]">mail</span>
                    seenitindia@gmail.com
                  </a>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a href="#for-brands" className="px-5 py-2.5 rounded-full border border-white/10 text-[#9BB5D9] text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">For Brands →</a>
                    <a href="#for-reviewers" className="px-5 py-2.5 rounded-full border border-white/10 text-[#9BB5D9] text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">For Creators →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ══════════ HOVER FOOTER ══════════ */}
        <HoverFooter />
      </div>
    </>
  );
}
