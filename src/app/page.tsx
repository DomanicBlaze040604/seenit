"use client";
import Link from "next/link";
import * as React from "react";

const categories = [
  { name: "Beauty", icon: "spa" },
  { name: "Skin Care", icon: "dermatology" },
  { name: "Restaurants", icon: "restaurant" },
  { name: "Fashion", icon: "checkroom" },
  { name: "Electronics", icon: "devices" },
  { name: "Fitness", icon: "fitness_center" },
  { name: "Home & Kitchen", icon: "kitchen" },
  { name: "Books & Media", icon: "auto_stories" },
];

export default function HomePage() {
  const [catOpen, setCatOpen] = React.useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-body bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 md:px-10 py-2">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/logo.jpg" alt="SeenIt" className="h-14 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-7">
              <a className="text-gray-600 text-sm font-semibold hover:text-primary-600 transition-colors" href="#how-it-works">How it Works</a>
              <a className="text-gray-600 text-sm font-semibold hover:text-primary-600 transition-colors" href="#for-consumers">For Consumers</a>
              <a className="text-gray-600 text-sm font-semibold hover:text-primary-600 transition-colors" href="#for-brands">For Brands</a>
              <a className="text-gray-600 text-sm font-semibold hover:text-primary-600 transition-colors flex items-center gap-1" href="#monetisation">
                <span className="material-symbols-outlined !text-[16px]">monetization_on</span>
                Monetisation
              </a>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  onBlur={() => setTimeout(() => setCatOpen(false), 150)}
                  className="text-gray-600 text-sm font-semibold hover:text-primary-600 transition-colors flex items-center gap-1"
                >
                  Categories
                  <span className={`material-symbols-outlined !text-[18px] transition-transform ${catOpen ? "rotate-180" : ""}`}>expand_more</span>
                </button>
                {catOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl border border-gray-200 shadow-xl py-2 animate-[fadeIn_0.15s_ease]">
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Browse by Category</div>
                    {categories.map((cat) => (
                      <a
                        key={cat.name}
                        href="#"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        <span className="material-symbols-outlined !text-[18px] text-gray-400">{cat.icon}</span>
                        {cat.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 gradient-btn-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">Sign Up</Link>
            <Link href="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 border border-gray-300 text-gray-700 text-sm font-semibold hover:border-primary-400 hover:text-primary-600 transition-colors">Login</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero px-4 md:px-10 lg:px-20 flex justify-center py-20 lg:py-28">
          <div className="max-w-[1200px] flex-1">
            <div className="flex flex-col gap-10 lg:flex-row items-center">
              <div className="flex flex-col gap-8 lg:w-1/2">
                {/* SARS Trust Badge */}
                <div className="inline-flex flex-col gap-1 px-4 py-2.5 rounded-xl bg-accent-green-50 border border-accent-green-200 w-fit">
                  <div className="flex items-center gap-2 text-accent-green-700 text-sm font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined !text-[16px]">verified</span>
                    SARS™ Verified Reviews
                  </div>
                  <p className="text-gray-500 text-xs">System for Authentic Review Scoring</p>
                </div>

                {/* Main Headline */}
                <h1 className="text-gray-900 text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight">
                  India&apos;s Video-First, UGC led{" "}
                  <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">honest Review Platform</span>
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed font-semibold">
                  Built for <span className="text-primary-600">Trust</span>. Designed for How You Shop Today.
                </p>
                <p className="text-gray-500 text-base leading-relaxed max-w-[500px]">
                  SeenIt is a video-first, UGC-led review platform powered by SARS™, where real users share honest experiences — and viewers shop with confidence, not confusion.
                </p>

                {/* Trust Pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="trust-pill trust-pill--video">🎥 Video-First</div>
                  <div className="trust-pill trust-pill--verified">🛡️ SARS™ Verified</div>
                  <div className="trust-pill trust-pill--shop">🛒 Shop from Reviews</div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/reviews" className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 gradient-btn-primary text-white text-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                    Watch Honest Reviews
                  </Link>
                  <a href="#how-it-works" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-primary-300 text-primary-600 text-lg font-bold hover:bg-primary-50 transition-all">
                    How SeenIt Works
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-square bg-center bg-no-repeat bg-cover rounded-2xl shadow-lg overflow-hidden" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAjKNELTpwRVvGnc4KVcfQcgy8pKkZ8TTlwFAfQZoN5pNt2thPkhGrcXlsd3IYbsyOeZUI9HJR6s0krvOMdeicSEIdSbpBrM08tCC4qy99JTXRH0nAGNn-yRGBsdvY1GhHNezQKUXErJoqYyr5NS4AkCtcdyo3B7OJoI1OWYDNfM3KcyQ0Fi-f0HrXXYXgGHsQhspIoFWR54EBydoJ57zRqbzuZeNTTRLx7ggTwF15wqsdAOSG1BrZPws3lukjxC5z-aa6PAS_WTzd")` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <div className="flex items-center gap-4 text-white">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPjV1_Lv3xdSsjPJH4A8CsspeGbMzYXrNpzcc2N7TVoGGPP62OH12viKqH1uA6niyB2NCLd8YBCwICL2RGwEdKltuItRTGvuQ2jAhaTBNlAuRo7cOWJQULjtUVXX7Q1cY0cAcvFVlyAk3Ah5gM5tU0_Y8Znn6QER1ArEhVDf-qR-9j4AoVCnujlTU4pSQfltMHWmawg58Ik8ANNSP0PkNX78ZNd787qJVMifmS4qPklxGlZXI-1lzaiZHpzVo9dVr8wpmiva3IcYxT" alt="Profile" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                      <div>
                        <p className="font-bold">Alex Thompson</p>
                        <p className="text-sm text-white/80">Elite Creator • 4.9/5 Trust Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 bg-primary-600/90 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md">
                    <span className="material-symbols-outlined !text-4xl text-white">play_arrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why SeenIt Block */}
        <section className="px-4 md:px-10 lg:px-20 flex justify-center py-20 bg-white border-t border-gray-100">
          <div className="max-w-[800px] text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Why &quot;SeenIt&quot;?</h2>
            <p className="text-xl text-gray-700 mb-10">Because opinions don&apos;t matter unless you&apos;ve actually <span className="text-primary-600 font-extrabold">seen it</span>.</p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-700">
              <span className="px-5 py-2.5 bg-accent-red-50 rounded-lg border border-accent-red-200 font-semibold">Not staged.</span>
              <span className="px-5 py-2.5 bg-accent-amber-50 rounded-lg border border-accent-amber-200 font-semibold">Not scripted.</span>
              <span className="px-5 py-2.5 bg-accent-green-50 rounded-lg border border-accent-green-200 font-semibold">Not paid hype.</span>
            </div>
            <p className="text-gray-600 mt-10 text-lg">Just real people, real products, real experiences — <span className="text-primary-600 font-bold">on video</span>.</p>
          </div>
        </section>

        {/* Vision Statement — redesigned */}
        <section className="py-16 flex justify-center bg-white">
          <div className="max-w-[900px] w-full px-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-10 md:px-16 py-14 text-center">
              {/* Decorative */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary-500/15 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-amber-400/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <span className="material-symbols-outlined text-primary-400/40 !text-5xl block mb-4">auto_awesome</span>
                <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed mb-3">
                  SeenIt isn&apos;t changing how people review products.
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
                  It&apos;s changing how India{" "}
                  <span className="bg-gradient-to-r from-primary-400 to-accent-amber-400 bg-clip-text text-transparent">decides what to buy.</span>
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-8 h-1 rounded-full bg-primary-500"></div>
                  <div className="w-3 h-1 rounded-full bg-primary-500/40"></div>
                  <div className="w-2 h-1 rounded-full bg-primary-500/20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How SeenIt Changes Reviews */}
        <section id="how-it-works" className="section-spacing flex justify-center bg-gray-50">
          <div className="max-w-[1200px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16">How SeenIt Changes Reviews — and Shopping</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-xl bg-accent-red-50 flex items-center justify-center text-accent-red-500 mb-6 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined !text-3xl">videocam</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Video-First Reviews</h3>
                <p className="text-accent-red-600 font-semibold mb-2 text-sm">No filters. No scripts.</p>
                <p className="text-gray-500 text-sm leading-relaxed">Watch real people use real products — the good, the bad, the honest.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-accent-green-300 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-xl bg-accent-green-50 flex items-center justify-center text-accent-green-500 mb-6 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined !text-3xl">verified_user</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">SARS™ Verification</h3>
                <p className="text-accent-green-600 font-semibold mb-2 text-sm">Every review passes through our System.</p>
                <p className="text-gray-500 text-sm leading-relaxed">Checking creator credibility, purchase intent, manipulation signals, and consistency.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-accent-amber-300 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-xl bg-accent-amber-50 flex items-center justify-center text-accent-amber-500 mb-6 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined !text-3xl">shopping_cart</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Review → Shop → Earn</h3>
                <p className="text-accent-amber-600 font-semibold mb-2 text-sm">Discover → Decide → Buy</p>
                <p className="text-gray-500 text-sm leading-relaxed">Reviewers earn from impact, not influence. Brands earn trust, not fake engagement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section — with poppy quote */}
        <section id="for-consumers" className="section-spacing flex justify-center bg-white">
          <div className="max-w-[1000px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-6">Reviews That Carry <span className="text-primary-600">Weight</span>, Not Noise</h2>
            <p className="text-center text-gray-600 mb-14 text-lg">Most platforms treat reviews as opinions. SeenIt treats reviews as <span className="text-primary-600 font-extrabold">assets</span>.</p>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Each review captures:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["What was expected", "What actually happened", "What worked", "What didn't", "Who this is for / not for", "Whether the reviewer would choose it again"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-gray-200">
                    <span className="material-symbols-outlined text-accent-green-500">check_circle</span>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Poppy Quote — redesigned to stand out */}
            <div className="mt-14 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-primary-400/5 to-primary-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl px-10 py-12 text-center shadow-lg">
                <span className="material-symbols-outlined text-white/30 !text-6xl block mb-2">format_quote</span>
                <p className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                  &quot;Opinions <span className="text-white/60">fade.</span>{" "}
                  Experiences <span className="text-accent-amber-300">compound.</span>&quot;
                </p>
                <div className="mt-4 w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Payment Section */}
        <section className="section-spacing flex justify-center bg-gray-50">
          <div className="max-w-[1000px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4">Users Don&apos;t Get Paid for Reviews.</h2>
            <p className="text-2xl text-primary-600 font-extrabold text-center mb-14">They Get Paid for <span className="underline decoration-primary-300 decoration-4 underline-offset-4">Influence</span>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-7 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
                  How Users Earn
                </h3>
                <p className="text-gray-600 mb-5">A user earns when their review:</p>
                <ul className="space-y-3">
                  {["Drives engagement", "Builds trust", "Influences buying decisions", "Converts interest into action"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="material-symbols-outlined text-primary-500 !text-[18px]">arrow_forward</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent-green-500 rounded-full"></span>
                  What This Solves
                </h3>
                <ul className="space-y-3">
                  {["Fake positivity disappears", "Low-effort reviews die", "Honest nuance rises", "Real buying intent becomes visible"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="material-symbols-outlined text-accent-green-500 !text-[18px]">check</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-accent-amber-50 rounded-2xl p-7 border border-accent-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent-amber-500 rounded-full"></span>
                Buying Intent Layer
              </h3>
              <p className="text-gray-600 mb-5">SeenIt captures pre- and post-intent signals:</p>
              <div className="flex flex-wrap gap-3">
                {["Considering", "Comparing", "Would buy again", "Would avoid", "Only during discounts", "Best for first-time buyers"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white text-sm text-gray-700 border border-accent-amber-200 font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section — with colored bold keywords */}
        <section id="for-brands" className="section-spacing flex justify-center bg-white">
          <div className="max-w-[1000px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-6">
              Brands Get Both: <span className="text-accent-red-500">Content</span>{" "}
              <span className="text-gray-400">&amp;</span>{" "}
              <span className="text-primary-600">Distribution</span>
            </h2>
            <p className="text-gray-600 text-center mb-14 text-lg">Brands today either create content that doesn&apos;t convert, or buy distribution they don&apos;t own. SeenIt <span className="font-bold text-gray-900">collapses that gap</span>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-2xl p-7 border-l-4 border-primary-500">
                <h3 className="text-lg font-bold text-gray-900 mb-5">What Brands Actually Receive</h3>
                <ul className="space-y-3">
                  {["High-quality, experience-led content", "Built-in distribution through real users", "Organic amplification via credibility", "Continuous inflow of intent-rich narratives"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="material-symbols-outlined text-primary-500 !text-[18px]">star</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-7 border-l-4 border-accent-green-500">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Brand Advantage</h3>
                <ul className="space-y-3">
                  {["Lower CAC", "Higher trust velocity", "Faster feedback loops", "Community-driven growth"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="material-symbols-outlined text-accent-green-500 !text-[18px]">trending_up</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SARS Section — redesigned with better cards */}
        <section className="section-spacing flex justify-center bg-gray-50">
          <div className="max-w-[1100px] w-full px-4">
            <div className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest text-primary-500 mb-3">The Trust Engine</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                SARS™: How We Score <span className="text-primary-600">Authenticity</span>
              </h2>
              <p className="text-xl text-gray-600">Trust isn&apos;t a claim. <span className="text-primary-600 font-bold">It&apos;s a score.</span></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
              {[
                { icon: "history", title: "Experience Validity", desc: "Real interaction, logical timing, usage depth", gradient: "from-accent-red-500 to-accent-red-400" },
                { icon: "person_check", title: "Reviewer Credibility", desc: "Consistency, accuracy, bias detection", gradient: "from-primary-600 to-primary-500" },
                { icon: "article", title: "Content Quality", desc: "Depth over length, specificity, usefulness", gradient: "from-accent-amber-500 to-accent-amber-400" },
                { icon: "monitoring", title: "Engagement Integrity", desc: "Organic patterns, time-based signals", gradient: "from-accent-green-500 to-accent-green-400" },
                { icon: "target", title: "Outcome Impact", desc: "Buying influence, friction reduction", gradient: "from-accent-sky-500 to-accent-sky-400" }
              ].map((item, i) => (
                <div key={i} className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.gradient}`}></div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
                    <span className="material-symbols-outlined text-white !text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 text-center border border-primary-200">
              <p className="text-gray-800 text-lg leading-relaxed">Each review receives a <span className="font-extrabold text-primary-600">Dynamic Authenticity Score</span> that controls <span className="font-semibold">visibility</span>, <span className="font-semibold">distribution</span>, <span className="font-semibold">monetization</span>, and <span className="font-semibold">long-term weight</span>.</p>
            </div>
          </div>
        </section>

        {/* System View */}
        <section className="section-spacing flex justify-center bg-white">
          <div className="max-w-[900px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-14">How All This Works Together</h2>
            <div className="flex flex-col gap-4">
              {["Brand enables access or experience", "User experiences & documents honestly", "SARS validates & scores", "Review gains weighted visibility", "Engagement & intent are tracked", "User earns based on impact", "Brand learns, adapts, grows"].map((step, i) => {
                const colors = ["bg-accent-red-500", "bg-primary-500", "bg-accent-amber-500", "bg-accent-green-500", "bg-accent-sky-500", "bg-primary-600", "bg-accent-red-600"];
                return (
                  <div key={i} className="flex items-center gap-5 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-200 transition-colors">
                    <div className={`w-10 h-10 rounded-full ${colors[i]} text-white flex items-center justify-center font-bold text-sm shrink-0`}>{i + 1}</div>
                    <p className="text-gray-800 font-medium text-lg">{step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Monetisation & Rewards — Landing Page */}
        <section id="monetisation" className="section-spacing flex justify-center bg-gray-50">
          <div className="max-w-[1100px] w-full px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-accent-amber-50 border border-accent-amber-200 rounded-full px-4 py-1.5 mb-5">
                <span className="material-symbols-outlined text-accent-amber-500 !text-[16px]">monetization_on</span>
                <span className="text-xs font-bold text-accent-amber-600 uppercase tracking-wider">Monetisation & Rewards</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Your Earning Potential on <span className="text-primary-600">SeenIt</span></h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Whether you create reviews or shop from them — SeenIt rewards you for genuine participation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Creator Side */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-5">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="material-symbols-outlined !text-[22px]">videocam</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Creator Earnings</h3>
                      <p className="text-primary-100 text-xs">Get paid for your impact, not just opinions</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  {/* Per 1K Views */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-500 !text-[18px]">visibility</span>
                        <span className="text-sm font-bold text-gray-900">Per 1,000 Views</span>
                      </div>
                      <span className="text-sm text-primary-600 font-extrabold">$1 – $7</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Earned based on your SARS™ Score tier</p>
                    <div className="space-y-2.5">
                      {[
                        { tier: "Elite", sars: "80–100", rate: "$5 – $7", color: "bg-accent-amber-400", width: "100%", badge: "🏆" },
                        { tier: "Trusted", sars: "50–79", rate: "$2 – $5", color: "bg-primary-500", width: "65%", badge: "⭐" },
                        { tier: "New", sars: "0–49", rate: "$1 – $2", color: "bg-gray-400", width: "30%", badge: "🌱" },
                      ].map((t) => (
                        <div key={t.tier} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                          <span className="text-sm">{t.badge}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-700 font-semibold">{t.tier} <span className="text-gray-400 font-normal">({t.sars})</span></span>
                              <span className="text-xs text-gray-800 font-bold">{t.rate}</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full ${t.color} rounded-full`} style={{ width: t.width }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sales Commission */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-accent-green-500 !text-[18px]">shopping_bag</span>
                      <span className="text-sm font-bold text-gray-900">Sales Commission</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Earn a <span className="font-bold text-accent-green-700">% commission</span> on every purchase made through your review.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { cat: "Electronics", pct: "2–4%", icon: "devices" },
                        { cat: "Beauty", pct: "5–8%", icon: "spa" },
                        { cat: "Fashion", pct: "4–7%", icon: "checkroom" },
                      ].map((c) => (
                        <div key={c.cat} className="flex items-center gap-2 bg-accent-green-50 rounded-lg px-3 py-2 border border-accent-green-100">
                          <span className="material-symbols-outlined text-accent-green-500 !text-[14px]">{c.icon}</span>
                          <span className="text-xs font-semibold text-gray-700">{c.cat}: <span className="text-accent-green-600">{c.pct}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Side */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-accent-amber-500 to-accent-amber-400 px-8 py-5">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="material-symbols-outlined !text-[22px]">redeem</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Customer Rewards</h3>
                      <p className="text-amber-100 text-xs">Discover, watch, buy — and get rewarded</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  {/* Purchase Intent */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-accent-amber-500 !text-[18px]">explore</span>
                      <span className="text-sm font-bold text-gray-900">Purchase Intent</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      Browse honest, layman reviews from real users — build genuine confidence before you buy.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Browse Reviews", "Compare Products", "Save Favourites", "Follow Creators"].map((item) => (
                        <span key={item} className="text-xs bg-accent-amber-50 text-accent-amber-700 px-3 py-1.5 rounded-full font-medium border border-accent-amber-200">{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* SARS Based Perks */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-accent-red-500 !text-[18px]">local_offer</span>
                      <span className="text-sm font-bold text-gray-900">SARS™ Based Perks</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Your SARS™ score unlocks <span className="font-bold text-accent-red-600">exclusive offers, promotions & discounts</span> from partner brands.
                    </p>
                    <div className="space-y-2">
                      {[
                        { icon: "percent", label: "Exclusive Discounts", desc: "Score-based discount tiers" },
                        { icon: "campaign", label: "Early Access", desc: "New product launches & deals" },
                        { icon: "card_giftcard", label: "Rewards Points", desc: "Earn XP on every interaction" },
                      ].map((perk) => (
                        <div key={perk.label} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-red-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent-red-400 !text-[16px]">{perk.icon}</span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{perk.label}</p>
                            <p className="text-[10px] text-gray-500">{perk.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gamified */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-amber-50 rounded-xl px-5 py-4 border border-primary-100">
                    <span className="material-symbols-outlined text-primary-500 !text-[22px]">sports_esports</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Gamified Experience</p>
                      <p className="text-xs text-gray-500">Earn XP, unlock badges, climb leaderboards — both as a customer and creator!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Trust & Accountability */}
        <section className="section-spacing flex justify-center bg-white">
          <div className="max-w-[1100px] w-full px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-accent-red-50 border border-accent-red-200 rounded-full px-4 py-1.5 mb-5">
                <span className="material-symbols-outlined text-accent-red-500 !text-[16px]">shield</span>
                <span className="text-xs font-bold text-accent-red-600 uppercase tracking-wider">Zero Tolerance Policy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Trust is <span className="text-accent-red-500">Non-Negotiable</span></h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">SeenIt is built on authenticity. Our SARS™ engine doesn&apos;t just score — it <span className="font-bold text-gray-900">protects the ecosystem</span>.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Brand Accountability */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red-500/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent-red-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-accent-red-400 !text-[24px]">gavel</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Brand Accountability</h3>
                      <p className="text-gray-400 text-xs">Brands must earn trust, not buy it</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    If SARS™ detects that <span className="font-bold text-white">any review is paid, scripted, or manipulated</span> in any way — both the brand and the creator involved will be:
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: "block", text: "Immediately deboarded from the platform" },
                      { icon: "do_not_disturb", text: "Permanently banned from SeenIt" },
                      { icon: "public_off", text: "All associated reviews flagged & removed" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                        <span className="material-symbols-outlined text-accent-red-400 !text-[18px]">{item.icon}</span>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-accent-red-500/10 rounded-lg px-4 py-3 border border-accent-red-500/20">
                    <p className="text-xs text-accent-red-300 font-semibold">⚡ This is how we keep SeenIt honest — no exceptions, no second chances for manipulation.</p>
                  </div>
                </div>
              </div>

              {/* Creator Accountability */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-400 !text-[24px]">verified_user</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Creator Integrity</h3>
                      <p className="text-gray-400 text-xs">Honest voices are rewarded, not bought</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Creators who accept payments for biased reviews, use scripts from brands, or misrepresent their experience will face the same consequences.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: "monitoring", text: "SARS™ continuously monitors for inconsistencies" },
                      { icon: "psychology", text: "AI detects scripted language & unnatural patterns" },
                      { icon: "admin_panel_settings", text: "Community reports trigger human review" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                        <span className="material-symbols-outlined text-primary-400 !text-[18px]">{item.icon}</span>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary-500/10 rounded-lg px-4 py-3 border border-primary-500/20">
                    <p className="text-xs text-primary-300 font-semibold">🛡️ Honest creators thrive. Fake ones get expelled. That&apos;s the SeenIt promise.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer → Creator Journey */}
        <section className="section-spacing flex justify-center bg-gray-50">
          <div className="max-w-[1100px] w-full px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-5">
                <span className="material-symbols-outlined text-primary-500 !text-[16px]">sync_alt</span>
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">The SeenIt Loop</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">From <span className="text-primary-600">Customer</span> to <span className="text-accent-amber-500">Creator</span> — Seamlessly</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Every customer is a potential creator. Here&apos;s how the journey unfolds:</p>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-accent-amber-200 to-accent-green-200 hidden lg:block"></div>

              <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
                {[
                  {
                    step: 1,
                    icon: "explore",
                    title: "Discover & Watch Reviews",
                    desc: "Browse honest, video-first reviews from real users. See actual experiences, not ads.",
                    color: "from-primary-500 to-primary-400",
                    bgColor: "bg-primary-50",
                    borderColor: "border-primary-200",
                    side: "left"
                  },
                  {
                    step: 2,
                    icon: "shopping_cart",
                    title: "Purchase Directly from SeenIt",
                    desc: "Found something you love? Buy it right from the review page — no redirects, no middlemen.",
                    color: "from-accent-amber-500 to-accent-amber-400",
                    bgColor: "bg-accent-amber-50",
                    borderColor: "border-accent-amber-200",
                    side: "right"
                  },
                  {
                    step: 3,
                    icon: "local_shipping",
                    title: "We Ship It to You",
                    desc: "Your order is delivered right to your doorstep. Track it, receive it, experience it.",
                    color: "from-accent-sky-500 to-accent-sky-400",
                    bgColor: "bg-accent-sky-50",
                    borderColor: "border-accent-sky-200",
                    side: "left"
                  },
                  {
                    step: 4,
                    icon: "verified",
                    title: "SARS™ Verifies Your Purchase",
                    desc: "Once your delivery is confirmed, SARS™ automatically verifies you as a genuine buyer.",
                    color: "from-accent-green-500 to-accent-green-400",
                    bgColor: "bg-accent-green-50",
                    borderColor: "border-accent-green-200",
                    side: "right"
                  },
                  {
                    step: 5,
                    icon: "videocam",
                    title: "Post Your Own Review",
                    desc: "Share your honest experience on video. Your review gets SARS™ scored and published.",
                    color: "from-accent-red-500 to-accent-red-400",
                    bgColor: "bg-accent-red-50",
                    borderColor: "border-accent-red-200",
                    side: "left"
                  },
                  {
                    step: 6,
                    icon: "monetization_on",
                    title: "Earn & Become a Creator",
                    desc: "Start earning from views and sales. You've gone from shopper to SeenIt creator — and the loop continues.",
                    color: "from-accent-amber-500 to-primary-500",
                    bgColor: "bg-gradient-to-r from-accent-amber-50 to-primary-50",
                    borderColor: "border-primary-200",
                    side: "right"
                  },
                ].map((item) => (
                  <div key={item.step} className={`flex items-center gap-6 ${item.step > 1 ? 'lg:mt-[-1px]' : ''}`}>
                    <div className={`flex-1 ${item.side === 'right' ? 'lg:order-2' : ''}`}>
                      <div className={`${item.bgColor} rounded-2xl p-6 border ${item.borderColor} hover:shadow-lg transition-shadow`}>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                            <span className="material-symbols-outlined text-white !text-[22px]">{item.icon}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>Step {item.step}</span>
                            </div>
                            <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed ml-15">{item.desc}</p>
                      </div>
                    </div>
                    {/* Center dot — visible on lg */}
                    <div className="hidden lg:flex w-8 h-8 shrink-0 items-center justify-center">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color} shadow-sm border-2 border-white`}></div>
                    </div>
                    <div className={`flex-1 hidden lg:block ${item.side === 'right' ? 'lg:order-1' : 'lg:order-3'}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loop banner */}
            <div className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-accent-amber-500 to-accent-green-500 p-[2px]">
              <div className="bg-white rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-amber-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white !text-[28px]">all_inclusive</span>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">The Virtuous Loop</h4>
                  <p className="text-sm text-gray-600">Every customer who reviews becomes a creator. Every creator drives more customers. SeenIt grows organically through <span className="font-bold text-primary-600">trust, not marketing spend</span>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA — redesigned */}
        <section className="py-20 flex justify-center bg-white">
          <div className="max-w-[1000px] w-full px-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 md:px-16 py-16 md:py-20">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent-amber-400/10 blur-3xl"></div>

              <div className="relative flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-primary-400 text-sm font-bold uppercase tracking-widest mb-4">Join the Movement</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
                    Ready to see the <span className="bg-gradient-to-r from-primary-400 to-accent-amber-400 bg-clip-text text-transparent">truth</span>?
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-md">Join thousands of smart shoppers who use SeenIt to make better, more confident buying decisions.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="/reviews" className="inline-flex items-center justify-center rounded-xl h-14 px-8 bg-white text-gray-900 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                      <span className="material-symbols-outlined !text-[20px] mr-2">play_circle</span>
                      Start Browsing Reviews
                    </Link>
                    <Link href="/login" className="inline-flex items-center justify-center rounded-xl h-14 px-8 border border-gray-600 text-white text-base font-semibold hover:bg-white/5 transition-all">
                      Create Account →
                    </Link>
                  </div>
                </div>
                {/* Right side — trust indicators */}
                <div className="flex flex-col gap-4 shrink-0">
                  {[
                    { icon: "videocam", label: "100% Video Reviews", sub: "No text-only opinions" },
                    { icon: "verified", label: "SARS™ Verified", sub: "Every review scored" },
                    { icon: "groups", label: "Real Community", sub: "Built by real users" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-400 !text-[20px]">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{item.label}</p>
                        <p className="text-gray-500 text-xs">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 md:px-10 py-16 text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <img src="/logo.jpg" alt="SeenIt" className="w-10 h-10 object-contain" />
                </div>
                <span className="text-xl font-bold text-white">SeenIt</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">India&apos;s first trust-indexed, video-first UGC review platform powered by SARS™.</p>
              {/* Social links */}
              <div className="flex gap-3">
                {["X", "In", "IG", "YT"].map((social) => (
                  <a key={social} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white text-xs font-bold transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Platform</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#">Browse Reviews</a></li>
                <li><a className="hover:text-white transition-colors" href="#how-it-works">How it Works</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Top Creators</a></li>
                <li><a className="hover:text-white transition-colors" href="#for-consumers">For Consumers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Company</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-white transition-colors" href="#for-brands">For Brands</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Legal</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">© 2026 SeenIt Technologies Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
