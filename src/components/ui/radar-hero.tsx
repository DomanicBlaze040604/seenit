"use client";
import React from "react";
import Link from "next/link";
import { Radar, IconContainer } from "@/components/ui/radar-effect";

export default function RadarHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#040C1A]">
      {/* ── Background Radar ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <Radar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] md:scale-[2.5]" />
        
        {/* Floating Icon Containers (Trust Signals) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-full max-h-[800px]">
          <div className="absolute top-[15%] left-[10%] md:left-[20%]">
            <IconContainer text="100% Verified Users" delay={0.2} icon={<span className="material-symbols-outlined text-[#4E8FFF] !text-[28px]">verified_user</span>} />
          </div>
          <div className="absolute top-[25%] right-[10%] md:right-[15%]">
            <IconContainer text="Anti-Fake Engine" delay={0.5} icon={<span className="material-symbols-outlined text-[#FFD700] !text-[28px]">policy</span>} />
          </div>
          <div className="absolute bottom-[25%] left-[5%] md:left-[15%]">
            <IconContainer text="Real Video Proof" delay={0.8} icon={<span className="material-symbols-outlined text-red-400 !text-[28px]">videocam</span>} />
          </div>
          <div className="absolute bottom-[15%] right-[10%] md:right-[20%]">
            <IconContainer text="SARS™ Audited" delay={1.1} icon={<span className="material-symbols-outlined text-green-400 !text-[28px]">shield_check</span>} />
          </div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1648CC]/10 blur-[120px] rounded-full" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD700]/5 blur-[80px] rounded-full" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#040C1A]/10 via-transparent to-[#040C1A]" />

      {/* ── Foreground Content ── */}
      <div className="relative z-[2] max-w-[1280px] mx-auto w-full px-4 md:px-10 lg:px-20 text-center flex flex-col items-center py-24 lg:py-32">
        <div className="inline-flex items-center gap-2 bg-[#1648CC]/10 border border-[#1648CC]/25 rounded-full px-4 py-2 w-fit backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(22,72,204,0.15)]">
          <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest text-[#9BB5D9]">
            Scanning for Authenticity...
          </span>
        </div>

        <h1 className="font-black leading-[1.0] tracking-tighter max-w-4xl" style={{ fontFamily: "var(--font-bangers), 'Bangers', cursive", fontSize: "clamp(60px, 10vw, 110px)", letterSpacing: "0.04em" }}>
          <span className="text-white drop-shadow-md">See It.</span>
          <br />
          <span className="gradient-text-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">Trust It.</span>
        </h1>
        
        <p className="text-[#9BB5D9] text-lg md:text-xl font-medium mt-8 max-w-2xl leading-relaxed">
          The internet is full of fake reviews. We fixed it.
          <br className="hidden md:block" />
          Watch <span className="text-white font-bold">real people</span> share honest video experiences — every one powered &amp; scored by the <span className="gradient-text-blue font-black tracking-wide">SARS™ Trust Engine</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link href="/reviews" className="btn-blue inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(22,72,204,0.3)] hover:scale-105 transition-transform">
            <span className="material-symbols-outlined material-fill !text-[24px]">play_circle</span>
            Watch Real Reviews
          </Link>
          <a href="#why-seenit" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl border border-white/12 text-white font-bold text-lg hover:bg-white/5 transition-all backdrop-blur-sm">
            How Trust Works
            <span className="material-symbols-outlined !text-[24px]">arrow_forward</span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-white/5 w-full max-w-3xl">
          {[
            { label: "100% Video Proof", icon: "videocam" },
            { label: "SARS™ Verified", icon: "shield" },
            { label: "Zero Fake Hype", icon: "gpp_bad" },
            { label: "Community Audited", icon: "group" },
          ].map(trust => (
            <div key={trust.label} className="flex items-center gap-2 text-[#6B88B8] text-sm font-semibold">
              <span className="material-symbols-outlined !text-[18px] text-[#4E8FFF]">{trust.icon}</span>
              {trust.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
