"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-body">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-200 dark:border-charcoal-800 px-4 md:px-10 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary-600">
              <div className="size-6">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-charcoal-900 dark:text-white text-xl font-bold tracking-tight">SeenIt</h2>
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <nav className="hidden md:flex items-center gap-9">
              <a className="text-charcoal-700 dark:text-charcoal-200 text-sm font-medium hover:text-primary-600 transition-colors" href="#how-it-works">How it Works</a>
              <a className="text-charcoal-700 dark:text-charcoal-200 text-sm font-medium hover:text-primary-600 transition-colors" href="#for-brands">For Brands</a>
            </nav>
            <div className="flex gap-2">
              <Link href="/login" className="btn-primary flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary-600 text-white text-sm font-bold hover:bg-primary-700">Sign Up</Link>
              <Link href="/login" className="btn-secondary flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 border-2 border-charcoal-200 dark:border-charcoal-700 text-charcoal-800 dark:text-white text-sm font-bold">Login</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 md:px-10 lg:px-20 flex justify-center py-16 lg:py-24 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-900/10">
          <div className="max-w-[1200px] flex-1">
            <div className="flex flex-col gap-10 lg:flex-row items-center">
              <div className="flex flex-col gap-8 lg:w-1/2">
                {/* SARS Trust Badge */}
                <div className="inline-flex flex-col gap-1 px-4 py-2 rounded-xl bg-primary-600/10 border border-primary-600/20 w-fit badge-hover">
                  <div className="flex items-center gap-2 text-primary-600 text-sm font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined !text-[16px]">verified</span>
                    SARS™ Verified Reviews
                  </div>
                  <p className="text-charcoal-500 text-xs">System for Authentic Review Scoring</p>
                </div>

                {/* Main Headline */}
                <h1 className="text-charcoal-900 dark:text-white text-4xl md:text-5xl lg:text-[42px] font-black leading-tight tracking-tight">
                  India&apos;s Video-First, UGC led <span className="text-primary-600">honest Review Platform</span>
                </h1>
                <p className="text-charcoal-600 dark:text-charcoal-300 text-lg leading-relaxed">
                  Built for Trust. Designed for How You Shop Today.
                </p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-base leading-relaxed max-w-[500px]">
                  SeenIt is a video-first, UGC-led review platform powered by SARS™, where real users share honest experiences — and viewers shop with confidence, not confusion.
                </p>

                {/* Trust Pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="trust-pill">🎥 Video-First</div>
                  <div className="trust-pill">🛡️ SARS™ Verified</div>
                  <div className="trust-pill">🛒 Shop from Reviews</div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/reviews" className="btn-primary flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary-600 text-white text-lg font-bold shadow-lg shadow-primary-600/25">
                    Watch Honest Reviews
                  </Link>
                  <a href="#how-it-works" className="btn-secondary flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-charcoal-200 dark:border-charcoal-700 text-charcoal-800 dark:text-white text-lg font-bold">
                    How SeenIt Works
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-square bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAjKNELTpwRVvGnc4KVcfQcgy8pKkZ8TTlwFAfQZoN5pNt2thPkhGrcXlsd3IYbsyOeZUI9HJR6s0krvOMdeicSEIdSbpBrM08tCC4qy99JTXRH0nAGNn-yRGBsdvY1GhHNezQKUXErJoqYyr5NS4AkCtcdyo3B7OJoI1OWYDNfM3KcyQ0Fi-f0HrXXYXgGHsQhspIoFWR54EBydoJ57zRqbzuZeNTTRLx7ggTwF15wqsdAOSG1BrZPws3lukjxC5z-aa6PAS_WTzd")` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <div className="flex items-center gap-4 text-white">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPjV1_Lv3xdSsjPJH4A8CsspeGbMzYXrNpzcc2N7TVoGGPP62OH12viKqH1uA6niyB2NCLd8YBCwICL2RGwEdKltuItRTGvuQ2jAhaTBNlAuRo7cOWJQULjtUVXX7Q1cY0cAcvFVlyAk3Ah5gM5tU0_Y8Znn6QER1ArEhVDf-qR-9j4AoVCnujlTU4pSQfltMHWmawg58Ik8ANNSP0PkNX78ZNd787qJVMifmS4qPklxGlZXI-1lzaiZHpzVo9dVr8wpmiva3IcYxT" alt="Profile" className="w-12 h-12 rounded-full border-2 border-primary-500 object-cover" />
                      <div>
                        <p className="font-bold">Alex Thompson</p>
                        <p className="text-sm text-slate-200">Elite Creator • 4.9/5 Trust Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined !text-4xl text-white">play_arrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why SeenIt Block */}
        <section className="px-4 md:px-10 lg:px-20 flex justify-center py-16 bg-charcoal-50 dark:bg-charcoal-900">
          <div className="max-w-[800px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 dark:text-white mb-6">Why &quot;SeenIt&quot;?</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 mb-8">Because opinions don&apos;t matter unless you&apos;ve actually <span className="text-primary-600 font-bold">seen it</span>.</p>
            <div className="flex flex-wrap justify-center gap-4 text-charcoal-500 dark:text-charcoal-400">
              <span className="px-4 py-2 bg-white dark:bg-charcoal-800 rounded-lg shadow-sm">Not staged.</span>
              <span className="px-4 py-2 bg-white dark:bg-charcoal-800 rounded-lg shadow-sm">Not scripted.</span>
              <span className="px-4 py-2 bg-white dark:bg-charcoal-800 rounded-lg shadow-sm">Not paid hype.</span>
            </div>
            <p className="text-charcoal-600 dark:text-charcoal-300 mt-8">Just real people, real products, real experiences — on video.</p>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="px-4 md:px-10 py-12 bg-primary-600 text-center">
          <p className="text-xl md:text-2xl text-white font-medium max-w-[800px] mx-auto">
            SeenIt isn&apos;t changing how people review products.<br />
            <span className="font-bold">It&apos;s changing how India decides what to buy.</span>
          </p>
        </section>

        {/* How SeenIt Changes Reviews */}
        <section id="how-it-works" className="section-spacing flex justify-center bg-white dark:bg-charcoal-950">
          <div className="max-w-[1200px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 dark:text-white text-center mb-16">How SeenIt Changes Reviews — and Shopping</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Block 1 */}
              <div className="p-8 rounded-2xl bg-charcoal-50 dark:bg-charcoal-900 border border-charcoal-100 dark:border-charcoal-800">
                <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 mb-6">
                  <span className="material-symbols-outlined !text-3xl">videocam</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Video-First Reviews</h3>
                <p className="text-charcoal-600 dark:text-charcoal-400 font-medium mb-2">No filters. No scripts.</p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">Watch real people use real products — the good, the bad, the honest.</p>
              </div>
              {/* Block 2 */}
              <div className="p-8 rounded-2xl bg-charcoal-50 dark:bg-charcoal-900 border border-charcoal-100 dark:border-charcoal-800">
                <div className="w-16 h-16 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center text-success-600 mb-6">
                  <span className="material-symbols-outlined !text-3xl">verified_user</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">SARS™ Verification</h3>
                <p className="text-charcoal-600 dark:text-charcoal-400 font-medium mb-2">Every review passes through our System.</p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">Checking creator credibility, purchase intent, manipulation signals, and consistency.</p>
              </div>
              {/* Block 3 */}
              <div className="p-8 rounded-2xl bg-charcoal-50 dark:bg-charcoal-900 border border-charcoal-100 dark:border-charcoal-800">
                <div className="w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-6">
                  <span className="material-symbols-outlined !text-3xl">shopping_cart</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Review → Shop → Earn</h3>
                <p className="text-charcoal-600 dark:text-charcoal-400 font-medium mb-2">Discover → Decide → Buy</p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">Reviewers earn from impact, not influence. Brands earn trust, not fake engagement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section - Creator Side */}
        <section className="section-spacing flex justify-center bg-charcoal-50 dark:bg-charcoal-900">
          <div className="max-w-[1000px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 dark:text-white text-center mb-4">Reviews That Carry Weight, Not Noise</h2>
            <p className="text-center text-charcoal-500 dark:text-charcoal-400 mb-12">Most platforms treat reviews as opinions. SeenIt treats reviews as <span className="text-primary-600 font-bold">assets</span>.</p>

            <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-6">Each review captures:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["What was expected", "What actually happened", "What worked", "What didn't", "Who this is for / not for", "Whether the reviewer would choose it again"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-50 dark:bg-charcoal-700">
                    <span className="material-symbols-outlined text-success-500">check_circle</span>
                    <span className="text-charcoal-700 dark:text-charcoal-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-charcoal-500 dark:text-charcoal-400 mt-8 italic">&quot;Opinions fade. Experiences compound.&quot;</p>
          </div>
        </section>

        {/* Customer Payment Section */}
        <section className="section-spacing flex justify-center bg-white dark:bg-charcoal-950">
          <div className="max-w-[1000px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 dark:text-white text-center mb-4">Users Don&apos;t Get Paid for Reviews.</h2>
            <p className="text-2xl text-primary-600 font-bold text-center mb-12">They Get Paid for Influence.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-charcoal-50 dark:bg-charcoal-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-charcoal-900 dark:text-white mb-4">How Users Earn</h3>
                <p className="text-charcoal-600 dark:text-charcoal-400 mb-4">A user earns when their review:</p>
                <ul className="space-y-2">
                  {["Drives engagement", "Builds trust", "Influences buying decisions", "Converts interest into action"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-charcoal-700 dark:text-charcoal-300">
                      <span className="material-symbols-outlined text-primary-600 !text-[18px]">arrow_forward</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-charcoal-50 dark:bg-charcoal-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-charcoal-900 dark:text-white mb-4">What This Solves</h3>
                <ul className="space-y-2">
                  {["Fake positivity disappears", "Low-effort reviews die", "Honest nuance rises", "Real buying intent becomes visible"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-charcoal-700 dark:text-charcoal-300">
                      <span className="material-symbols-outlined text-success-500 !text-[18px]">check</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
              <h3 className="text-lg font-bold text-charcoal-900 dark:text-white mb-4">Buying Intent Layer</h3>
              <p className="text-charcoal-600 dark:text-charcoal-400 mb-4">SeenIt captures pre- and post-intent signals:</p>
              <div className="flex flex-wrap gap-2">
                {["Considering", "Comparing", "Would buy again", "Would avoid", "Only during discounts", "Best for first-time buyers"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white dark:bg-charcoal-800 text-sm text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700">{tag}</span>
                ))}
              </div>
            </div>
            <p className="text-center text-charcoal-500 dark:text-charcoal-400 mt-8 italic">&quot;We don&apos;t monetize attention. We monetize decision-making.&quot;</p>
          </div>
        </section>

        {/* Brands Section */}
        <section id="for-brands" className="section-spacing flex justify-center bg-charcoal-900 text-white">
          <div className="max-w-[1000px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Brands Get Both: Content and Distribution</h2>
            <p className="text-charcoal-400 text-center mb-12">Brands today either create content that doesn&apos;t convert, or buy distribution they don&apos;t own. SeenIt collapses that gap.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-charcoal-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">What Brands Actually Receive</h3>
                <ul className="space-y-3">
                  {["High-quality, experience-led content", "Built-in distribution through real users", "Organic amplification via credibility", "Continuous inflow of intent-rich narratives"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-charcoal-300">
                      <span className="material-symbols-outlined text-primary-400 !text-[18px]">star</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-charcoal-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Brand Advantage</h3>
                <ul className="space-y-3">
                  {["Lower CAC", "Higher trust velocity", "Faster feedback loops", "Community-driven growth"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-charcoal-300">
                      <span className="material-symbols-outlined text-success-400 !text-[18px]">trending_up</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-center text-charcoal-400 italic">&quot;Content builds belief. Distribution builds scale. We give you both — authentically.&quot;</p>
          </div>
        </section>

        {/* SARS Section */}
        <section className="section-spacing flex justify-center bg-white dark:bg-charcoal-950">
          <div className="max-w-[1100px] w-full px-4">
            <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 dark:text-white text-center mb-4">SARS: The Trust Engine Behind Everything</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-400 text-center mb-12">Trust isn&apos;t a claim. It&apos;s a score.</p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
              {[
                { icon: "history", title: "Experience Validity", desc: "Real interaction, logical timing, usage depth" },
                { icon: "person_check", title: "Reviewer Credibility", desc: "Consistency, accuracy, bias detection" },
                { icon: "article", title: "Content Quality", desc: "Depth over length, specificity, usefulness" },
                { icon: "monitoring", title: "Engagement Integrity", desc: "Organic patterns, time-based signals" },
                { icon: "target", title: "Outcome Impact", desc: "Buying influence, friction reduction" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-charcoal-50 dark:bg-charcoal-900 text-center border border-charcoal-100 dark:border-charcoal-800">
                  <span className="material-symbols-outlined text-primary-600 !text-3xl mb-3">{item.icon}</span>
                  <h3 className="text-sm font-bold text-charcoal-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 text-center">
              <p className="text-charcoal-700 dark:text-charcoal-300">Each review receives a <span className="font-bold text-primary-600">Dynamic Authenticity Score</span> that controls visibility, distribution, monetization, and long-term weight.</p>
            </div>
            <p className="text-center text-charcoal-500 dark:text-charcoal-400 mt-8 italic">&quot;Truth doesn&apos;t go viral here. It gets validated.&quot;</p>
          </div>
        </section>

        {/* System View */}
        <section className="section-spacing flex justify-center bg-charcoal-50 dark:bg-charcoal-900">
          <div className="max-w-[900px] w-full px-4">
            <h2 className="text-3xl font-black text-charcoal-900 dark:text-white text-center mb-12">How All This Works Together</h2>
            <div className="flex flex-col gap-4">
              {["Brand enables access or experience", "User experiences & documents honestly", "SARS validates & scores", "Review gains weighted visibility", "Engagement & intent are tracked", "User earns based on impact", "Brand learns, adapts, grows"].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-charcoal-800 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">{i + 1}</div>
                  <p className="text-charcoal-700 dark:text-charcoal-200">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-charcoal-500 dark:text-charcoal-400 mt-8 italic">&quot;No hacks. No shortcuts. Just systems that reward honesty.&quot;</p>
          </div>
        </section>

        {/* Strategic Close */}
        <section className="section-spacing flex justify-center bg-charcoal-950 text-white">
          <div className="max-w-[900px] w-full px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">SeenIt Is Infrastructure, Not a Platform</h2>
            <p className="text-xl text-charcoal-400 mb-8">We are not competing with reviews. We are replacing how trust is built online.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span className="px-4 py-2 rounded-lg bg-charcoal-800">Experience meets economics</span>
              <span className="px-4 py-2 rounded-lg bg-charcoal-800">Content meets commerce</span>
              <span className="px-4 py-2 rounded-lg bg-charcoal-800">Trust meets scale</span>
            </div>
            <p className="text-2xl font-bold text-primary-400">In a world full of opinions, we reward those who actually showed up.</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 flex justify-center bg-primary-600">
          <div className="max-w-[800px] text-center px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to see the truth?</h2>
            <p className="text-primary-100 text-lg mb-8">Join smart shoppers who use SeenIt to make better buying decisions.</p>
            <Link href="/reviews" className="inline-flex min-w-[240px] cursor-pointer items-center justify-center rounded-xl h-16 px-8 bg-white text-primary-600 text-xl font-bold shadow-xl hover:bg-slate-50 transition-all">
              Start Browsing Reviews
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-950 border-t border-charcoal-800 px-4 md:px-10 py-12 text-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-primary-500 mb-6">
              <div className="size-5">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-lg font-bold">SeenIt</h2>
            </div>
            <p className="text-sm text-charcoal-400 leading-relaxed">India&apos;s first trust-indexed UGC review platform. Because honest opinions should be the standard.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-charcoal-400">
              <li><a className="hover:text-primary-500 transition-colors" href="#">Browse Reviews</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#how-it-works">How it Works</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Top Creators</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-charcoal-400">
              <li><a className="hover:text-primary-500 transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#for-brands">For Brands</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Legal</h4>
            <ul className="flex flex-col gap-4 text-sm text-charcoal-400">
              <li><a className="hover:text-primary-500 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-charcoal-800 text-center">
          <p className="text-xs text-charcoal-500">© 2024 SeenIt Technologies Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
