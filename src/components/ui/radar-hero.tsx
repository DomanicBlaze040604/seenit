"use client";
import Link from "next/link";
import { Radar, IconContainer } from "@/components/ui/radar-effect";

export default function RadarHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#040C1A]">
      {/* ── Background Radar ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <Radar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] md:scale-[2.5]" />

        {/* Floating trust signals — plain English labels */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-full max-h-[800px]">
          <div className="absolute top-[12%] left-[8%] md:left-[18%]">
            <IconContainer
              text="Real People Only"
              delay={0.3}
              icon={<span className="material-symbols-outlined text-[#4E8FFF] !text-[26px]">verified_user</span>}
            />
          </div>
          <div className="absolute top-[18%] right-[8%] md:right-[12%]">
            <IconContainer
              text="No Fake Reviews"
              delay={0.6}
              icon={<span className="material-symbols-outlined text-[#FFD700] !text-[26px]">policy</span>}
            />
          </div>
          <div className="absolute bottom-[20%] left-[4%] md:left-[12%]">
            <IconContainer
              text="Video Evidence"
              delay={0.9}
              icon={<span className="material-symbols-outlined text-red-400 !text-[26px]">videocam</span>}
            />
          </div>
          <div className="absolute bottom-[12%] right-[8%] md:right-[18%]">
            <IconContainer
              text="Every Review Checked"
              delay={1.2}
              icon={<span className="material-symbols-outlined text-green-400 !text-[26px]">shield_check</span>}
            />
          </div>
        </div>

        {/* Ambient glows */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#1648CC]/8 blur-[140px] rounded-full" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#FFD700]/5 blur-[90px] rounded-full" />
      </div>

      {/* Fade-to-dark at bottom */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#040C1A]/5 via-transparent to-[#040C1A]" />

      {/* ── Foreground Content ── */}
      <div className="relative z-[2] max-w-[1280px] mx-auto w-full px-4 md:px-10 lg:px-20 text-center flex flex-col items-center py-20 lg:py-28">

        {/* Badge — one sentence, what this place is */}
        <div className="inline-flex items-center gap-2.5 bg-[#1648CC]/12 border border-[#1648CC]/28 rounded-full px-5 py-2.5 w-fit backdrop-blur-md mb-7 shadow-[0_0_20px_rgba(22,72,204,0.18)]">
          <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse shrink-0" />
          <span className="text-[11px] md:text-[12px] font-black uppercase tracking-widest text-[#9BB5D9]">
            Watch real video reviews&nbsp;
            <span className="text-white">before you buy anything online</span>
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-black leading-[1.0] tracking-tighter max-w-4xl"
          style={{
            fontFamily: "var(--font-bangers), 'Bangers', cursive",
            fontSize: "clamp(58px, 10vw, 110px)",
            letterSpacing: "0.04em",
          }}
        >
          <span className="text-white drop-shadow-md">See It.</span>
          <br />
          <span className="gradient-text-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">Trust It.</span>
        </h1>

        {/* Plain-English one-liner — what SeenIt actually is */}
        <p className="text-white text-lg md:text-xl font-bold mt-5 max-w-xl leading-snug">
          A platform where real buyers record{" "}
          <span className="text-red-400">video reviews</span> of products
          they actually own —{" "}
          <span className="text-[#FFD700]">no fakes, no paid opinions.</span>
        </p>

        {/* Relatable pain point → solution */}
        <p className="text-[#6B88B8] text-sm md:text-base font-medium mt-4 max-w-lg leading-relaxed">
          Tired of buying something that looked great online and turned out to be rubbish?
          <br className="hidden sm:block" />
          <span className="text-[#9BB5D9] font-semibold"> On SeenIt, you watch someone who already bought it — on video — before you spend a single rupee.</span>
        </p>

        {/* 3 pills — who is this for, instantly */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8">
          {[
            { emoji: "👀", label: "Buyers — watch before you buy" },
            { emoji: "📹", label: "Reviewers — record & earn money" },
            { emoji: "🏷️", label: "Brands — get authentic reviews" },
          ].map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-[#9BB5D9] text-xs md:text-sm font-semibold"
            >
              <span>{pill.emoji}</span>
              {pill.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-9 w-full max-w-sm sm:max-w-none">
          <Link
            href="/reviews"
            className="btn-blue inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base md:text-lg font-bold shadow-[0_0_24px_rgba(22,72,204,0.35)] hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined material-fill !text-[22px]">play_circle</span>
            Watch Reviews
          </Link>
          <a
            href="#why-seenit"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl border border-white/12 text-white font-bold text-base md:text-lg hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            How It Works
            <span className="material-symbols-outlined !text-[22px]">arrow_forward</span>
          </a>
        </div>

        {/* 4 plain-English facts — 2×2 on mobile, row on desktop */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-7 mt-12 pt-8 border-t border-white/[0.06] w-full max-w-2xl">
          {[
            { label: "Every review is a video", icon: "videocam", color: "text-red-400" },
            { label: "Zero fake reviews", icon: "gpp_bad", color: "text-[#FFD700]" },
            { label: "Real buyers only", icon: "person_check", color: "text-[#4E8FFF]" },
            { label: "Every claim is checked", icon: "fact_check", color: "text-green-400" },
          ].map((trust) => (
            <div
              key={trust.label}
              className="flex items-center justify-center md:justify-start gap-2 text-[#7A9AC4] text-xs md:text-sm font-bold"
            >
              <span className={`material-symbols-outlined !text-[17px] ${trust.color}`}>
                {trust.icon}
              </span>
              {trust.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
