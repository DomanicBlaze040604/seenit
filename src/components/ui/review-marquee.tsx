"use client"
import React, { useEffect, useRef } from "react"

const REVIEWS = [
  { name: "Priya S.",  product: "Lakme Serum",         score: 91, tier: "Elite",   emoji: "🏆", category: "Beauty",      text: "Game changer for my skin. Zero hype, all results." },
  { name: "Arjun M.",  product: "boAt Rockerz 450",    score: 88, tier: "Trusted", emoji: "⭐", category: "Electronics", text: "40hr battery is real. Tested it myself — no cap." },
  { name: "Riya T.",   product: "Mango Kurta Set",     score: 94, tier: "Elite",   emoji: "🏆", category: "Fashion",     text: "Fits exactly as shown. Colour doesn't wash out." },
  { name: "Dev K.",    product: "Decathlon Shoes",      score: 79, tier: "Trusted", emoji: "⭐", category: "Fitness",     text: "Wore these for a 10km run. Solid grip & comfort." },
  { name: "Neha R.",   product: "Minimalist Sunscreen", score: 97, tier: "Elite",   emoji: "🏆", category: "Skincare",    text: "SPF claims are legit. Dermat-tested on camera." },
  { name: "Karan P.",  product: "Zomato Biryani",       score: 85, tier: "Trusted", emoji: "⭐", category: "Food",        text: "Arrived hot. Portions are exactly as advertised." },
  { name: "Ananya V.", product: "OnePlus 13",            score: 92, tier: "Elite",   emoji: "🏆", category: "Tech",        text: "Camera beats Pixel in real-world India conditions." },
  { name: "Rahul G.",  product: "Puma Backpack",         score: 76, tier: "New",     emoji: "🌱", category: "Fashion",     text: "Zips feel cheap but build is solid for the price." },
  { name: "Simran K.", product: "Mamaearth Shampoo",    score: 89, tier: "Trusted", emoji: "⭐", category: "Beauty",      text: "Hair fall reduced after 3 weeks. Documented it." },
  { name: "Vikram J.", product: "Noise Smart Watch",    score: 83, tier: "Trusted", emoji: "⭐", category: "Electronics", text: "Sleep tracking is accurate. Steps slightly off." },
]

const tierColors: Record<string, { bg: string; color: string }> = {
  Elite:   { bg: "rgba(255,215,0,0.12)",   color: "#FFD700" },
  Trusted: { bg: "rgba(22,72,204,0.12)",   color: "#4E8FFF" },
  New:     { bg: "rgba(107,114,128,0.12)", color: "#9BB5D9" },
}

const catColors: Record<string, string> = {
  Beauty: "#FF6B9D", Electronics: "#4E8FFF", Fashion: "#C084FC",
  Fitness: "#4ECDC4", Skincare: "#86EFAC", Food: "#FBB84B", Tech: "#60A5FA",
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  const t = tierColors[r.tier] ?? tierColors.New
  return (
    <div
      className="shrink-0 rounded-2xl p-5"
      style={{
        width: 290,
        marginRight: 16,
        backgroundColor: "#0C1628",
        border: "1px solid rgba(22,72,204,0.22)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
            style={{ background: "linear-gradient(135deg,#1648CC,#4E8FFF)" }}
          >
            {r.name[0]}
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-none">{r.name}</p>
            <p className="text-[10px] mt-0.5" style={{ color: catColors[r.category] ?? "#9BB5D9" }}>
              {r.category}
            </p>
          </div>
        </div>
        <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ backgroundColor: t.bg, color: t.color }}>
          {r.emoji} {r.tier}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-xs font-semibold">{r.product}</p>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black" style={{ backgroundColor: "#FFD700", color: "#040C1A" }}>
          🛡️ {r.score}
        </div>
      </div>

      <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B88B8" }}>
        &ldquo;{r.text}&rdquo;
      </p>

      <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#081020" }}>
        <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: "linear-gradient(90deg,#1648CC,#FFD700)" }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px]" style={{ color: "#2A3F5F" }}>Trust XP</span>
        <span className="text-[9px] font-black" style={{ color: "#FFD700" }}>+{Math.round(r.score * 1.2)} XP</span>
      </div>
    </div>
  )
}

/* ─── JS-driven marquee for guaranteed continuous motion ─── */
function MarqueeRow({ reviews, speed }: { reviews: typeof REVIEWS; speed: number }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let offset = 0
    let rafId: number
    const half = track.scrollWidth / 2

    const tick = () => {
      offset -= speed
      if (Math.abs(offset) >= half) offset += half
      track.style.transform = `translateX(${offset}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [speed])

  /* Render 3× copies so there's never a gap */
  const items = [...reviews, ...reviews, ...reviews]

  return (
    <div className="relative mb-4 overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right,#040C1A,transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left,#040C1A,transparent)" }} />

      <div ref={trackRef} className="flex will-change-transform" style={{ width: "max-content" }}>
        {items.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </div>
  )
}

export default function ReviewMarquee() {
  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: "#040C1A" }}>
      <div className="text-center mb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] mb-2" style={{ color: "#FFD700" }}>
          Live Reviews
        </p>
        <h2
          className="text-3xl md:text-4xl font-black text-white"
          style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.04em" }}
        >
          Real People. Real Experiences.
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <MarqueeRow reviews={REVIEWS} speed={0.6} />

      {/* Row 2 — scrolls right (negative speed) */}
      <MarqueeRow reviews={[...REVIEWS].reverse()} speed={-0.5} />
    </section>
  )
}
