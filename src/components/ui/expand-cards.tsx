"use client"
import { useState, useEffect } from "react"

const CATEGORIES = [
  {
    label: "Beauty & Skincare",
    tag: "🌸",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop",
    score: "92 avg",
    reviews: "2.1K",
    color: "#FF6B9D",
  },
  {
    label: "Electronics & Tech",
    tag: "⚡",
    img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=800&fit=crop",
    score: "88 avg",
    reviews: "3.4K",
    color: "#4E8FFF",
  },
  {
    label: "Fashion & Style",
    tag: "✨",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
    score: "85 avg",
    reviews: "4.7K",
    color: "#C084FC",
  },
  {
    label: "Fitness & Health",
    tag: "💪",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",
    score: "90 avg",
    reviews: "1.8K",
    color: "#4ECDC4",
  },
  {
    label: "Food & Restaurants",
    tag: "🍜",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=800&fit=crop",
    score: "87 avg",
    reviews: "5.2K",
    color: "#FBB84B",
  },
  {
    label: "Home & Living",
    tag: "🏠",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop",
    score: "83 avg",
    reviews: "1.3K",
    color: "#86EFAC",
  },
]

export default function ExpandCards() {
  const [active, setActive] = useState(2)
  const [paused, setPaused] = useState(false)

  // Auto-cycle every 2.5s unless hovered
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % CATEGORIES.length)
    }, 2500)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      className="px-4 md:px-10 lg:px-20 py-20"
      style={{ backgroundColor: "#081020", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-[10px] font-black uppercase tracking-[0.22em] mb-2"
            style={{ color: "#FFD700" }}
          >
            Browse by Category
          </p>
          <h2
            className="text-3xl md:text-4xl font-black text-white"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.04em" }}
          >
            Every Category. Every Opinion. Verified.
          </h2>
        </div>

        <div
          className="flex gap-2 h-[380px] md:h-[440px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              onClick={() => setActive(i)}
              className="relative overflow-hidden rounded-2xl cursor-pointer shrink-0 transition-all duration-500"
              style={{
                width: i === active ? "36%" : `${64 / (CATEGORIES.length - 1)}%`,
                minWidth: i === active ? undefined : "52px",
              }}
            >
              {/* Background image */}
              <img
                src={cat.img}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{ transform: i === active ? "scale(1.05)" : "scale(1.0)" }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    i === active
                      ? `linear-gradient(to top, ${cat.color}CC 0%, rgba(4,12,26,0.5) 60%, transparent 100%)`
                      : "rgba(4,12,26,0.72)",
                }}
              />

              {/* Collapsed: just tag */}
              {i !== active && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">{cat.tag}</span>
                </div>
              )}

              {/* Expanded: info */}
              {i === active && (
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {/* SARS badge */}
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black mb-3"
                    style={{ backgroundColor: "#FFD700", color: "#040C1A" }}
                  >
                    🛡️ SARS™ {cat.score}
                  </div>
                  <h3
                    className="text-white font-black text-xl leading-tight mb-1"
                    style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.04em" }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {cat.reviews} verified reviews
                  </p>
                </div>
              )}

              {/* Active indicator dot */}
              {i === active && (
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: cat.color }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-2 mt-5">
          {CATEGORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                backgroundColor: i === active ? "#FFD700" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
