import Link from "next/link";

// Featured reviews data
const featuredReviews = [
  {
    id: "1",
    title: "The honest truth about the Lumix S5IIX performance",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxMfB9yxo4VH35FnpRqzZkeW37i6ohksuUYrarnjttG2eYripmvSdEuw5MvGS-WdK5OPdoqZ1BwJAsKAbm6ORdcpDY4kbb4HB5Jnq4uT9reDE_Mm3PX3_9ES8fZcObvP8hfYNTrqc06vi3II3N6f6apR3Z9zJsH85ux9LW-sx_USGv16CzjrtkHqEIwc8NFt_7uMSeGtwoQMAK53xDutJhmWxH0QSJPij2YAt6_lundS8TreGvsHu7RlDaDXCcG1qyHLamzx0ydLmi",
    creator: { name: "Mark J.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYARC-gL9YNgYX6yasT7Fq2vIFsYD4AWgg5lN2odD7if-iq59d9cPoL1nj72QPrt1B_Cd2K7-fAPAkT6F73kZp4_-hIOKwL0uSipad8aZH3VFdfHN7r7dme0JYGy-twY7vs5Pnc-FeLyzAqC7ZpI4BWLwXJXsF-ux2CJUYWfSx4nocfenu3J5_DsE-eDFSUanWcNWQhwL9BHVk3SOQZ4C0V3-A_GzM4cU9e9ugZM6VT0DxgNSttwBJKFD8Vm8bFAokObmFmp5SqFIj" },
    trustLevel: "ELITE",
    proofType: "UNBOXING",
    trustScore: 98,
  },
  {
    id: "2",
    title: "6 Months with the NutriPro: Does it last?",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2CYvpgre_Rw9Br8stdFqql1LKua72083SZSMvGRewIuwv2H4jUtW368LUYCbT333FhwpO_6H0ANLOSaW3HjBVqr4kOR7-u78zFIaMjtl9MC4vc3IZx2txEun4Q1H2V0noybkaGIOuEkgm5R6UTcK02aZpc2O5nW04v5X6DfDzoObzwCPOq9hOo8JN4kz3o1Br8OWVsqSdcqVRsFISGYzJylC5uHtoL7QvZYBHtLyAcsj4qZtRSM3En_stZ0AzxPF-fNpnTprbcBD5",
    creator: { name: "Sarah L.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqb_jYCGTTqflxoG84gWwi9WQQwrTaClVCUptLzPJUCMArtEo8AyvOhhzIkn-CeocbNaOmmAExkVK2GCFBn8Oul67d-IUxI5LIl7LleG4QWBSSQ6hAjvXb7W4VjJh1Y7Z5I06SjLp5jeuKtwYEi9zXWA6DUhyIRhxE26YoDQbwtDaRf1mObcxc8wAhIVoK9M73YtwD273fUV2-8YIGZIrYR2bVyq5oHnjgYbf0MQVodtkfn3H7qov4CGi6mKfpPEuGyRG9sT5kKnx7" },
    trustLevel: "TRUSTED",
    proofType: "USAGE",
    trustScore: 92,
  },
  {
    id: "3",
    title: "Keychron Q1 Pro: The best typing sound?",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKSh2-kAm5IhAVfrXUZWGDyldFKU4SmZqRRA9kQjZHNsgrmClYVREQhwbNacyoecKrdWms2WgtBjz9GoEdhgNCiNlUO3l1PZonhIkRJlYR90JnyvnI9tKrhmAAcbBl5wJd0Gi5EWmLMhcvGqRqtHznDdAz-SjlPbZ4Z4LUU-1k97rPE-GrSY_1PoEYKt_LJ0C2SLdhSBBxPrSdkDxJXRoPIukmHRVrjzktesBJzQikxTGKicqqLULgAmA96VsDa8yeXBnB_1eLav2X",
    creator: { name: "David W.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcN6f092ER9KrEoRn_R29OwGCZ4bl7uEMEcU2ynXb-71WPlJBqaO6mjsFS65NGW09PJxupzjY4-qyyG9XERB2i8tNkIvcKtnTi8J63d24WHpMmdqD6RmFlCr8WsNtb_DGximYAHjTLdb_LicDGgak4mp9cEe-ejFOVoJCJYffFqbn_027OzK8KPLQkkCbgkrnmy8kVb5mZZvrRuQfO9nclUw4HRbeaEi94ScTWt_8VvJ4xEOzfFtQs7DTAr32JeYbq-QMOHZCHM6_P" },
    trustLevel: "ELITE",
    proofType: "USAGE",
    trustScore: 99,
  },
  {
    id: "4",
    title: "Sony XM5: Are they really better than XM4?",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXaX0UKJeIf47k6z8S5p_VYe6nLJ8uiYcE5Rtc41MWvLV6NV_eqaFf0DxzdmsY7_xE-C9F-FdLGoT9iD1INiDo5TED_XPRvnXRezicXIqj8nThkGeKrujlDVjoigLU-njhPe36DVR3hxgJU7XJT7doEXN_WfUkC9-lxtYzcfB41HEnGlab7qAultjcWFs7NBvf-1p712yUUkPSAalgk9vyDrsduEaMuMwlTab2trkJXb3QjaaB5QbB6z4Bkz5-cR1Hu2hEPibl-qvw",
    creator: { name: "Chris P.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuATNVtJ6by5ZAUNjBVDShldN4ZsMphzSQ_SsFf9CuW-UJvwS4ue6oNZYArlIMeHXXyf9V0kpIlayuTB0rJU8Z6U_ft3CiPGKmRMYG_aBFYmmmQXLHVX7yQ1RcVqq5NQtpe-4BSjJM3O_ixtloWPmtx8vkZvjIG7U1JrXsk3WDHjAWdadyQn0pGZ44mBa7Mul2ycmBEn5H7txmuZeY4ue9jNEPrOyGevuY4QAXyue_FWlQwzIvIdRObUl0nGeEtth3LnMNDeFffcTvTm" },
    trustLevel: "TRUSTED",
    proofType: "UNBOXING",
    trustScore: 95,
  },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e7edf3] dark:border-slate-800 px-4 md:px-10 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary-500">
              <div className="size-6">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-[#0d141b] dark:text-white text-xl font-bold tracking-tight">SeenIt</h2>
            </Link>
            <div className="hidden lg:flex items-stretch h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg bg-[#e7edf3] dark:bg-slate-800">
                <div className="text-[#4c739a] flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined text-lg">search</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-[#4c739a] px-2 text-sm"
                  placeholder="Search products..."
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <nav className="hidden md:flex items-center gap-9">
              <a className="text-[#0d141b] dark:text-slate-200 text-sm font-medium hover:text-primary-500 transition-colors" href="#">
                Browse Products
              </a>
              <a className="text-[#0d141b] dark:text-slate-200 text-sm font-medium hover:text-primary-500 transition-colors" href="#">
                How it Works
              </a>
            </nav>
            <div className="flex gap-2">
              <Link
                href="/login"
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#e7edf3] dark:bg-slate-800 text-[#0d141b] dark:text-white text-sm font-bold hover:bg-slate-200 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10 lg:py-20 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-primary-500/5">
          <div className="max-w-[1200px] flex-1">
            <div className="flex flex-col gap-10 lg:flex-row items-center">
              <div className="flex flex-col gap-8 lg:w-1/2">
                <div className="flex flex-col gap-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-500/10 text-success-500 text-xs font-bold uppercase tracking-wider w-fit">
                    <span className="material-symbols-outlined !text-[14px]">verified</span>
                    100% Verified Content
                  </div>
                  <h1 className="text-[#0d141b] dark:text-white text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    Trust Over Hype:{" "}
                    <span className="text-primary-500">Real Video Reviews</span> from Verified Users
                  </h1>
                  <p className="text-[#4c739a] dark:text-slate-400 text-lg leading-relaxed max-w-[500px]">
                    Experience authentic product feedback through our trust-first UGC video platform.
                    Verified creators, honest experiences, zero manipulation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/login"
                    className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary-500 text-white text-lg font-bold shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-all"
                  >
                    Browse Verified Reviews
                  </Link>
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-[#e7edf3] dark:border-slate-800 text-[#0d141b] dark:text-white text-lg font-bold hover:bg-white dark:hover:bg-slate-800 transition-all">
                    How it Works
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative">
                <div
                  className="aspect-square bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl overflow-hidden"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAjKNELTpwRVvGnc4KVcfQcgy8pKkZ8TTlwFAfQZoN5pNt2thPkhGrcXlsd3IYbsyOeZUI9HJR6s0krvOMdeicSEIdSbpBrM08tCC4qy99JTXRH0nAGNn-yRGBsdvY1GhHNezQKUXErJoqYyr5NS4AkCtcdyo3B7OJoI1OWYDNfM3KcyQ0Fi-f0HrXXYXgGHsQhspIoFWR54EBydoJ57zRqbzuZeNTTRLx7ggTwF15wqsdAOSG1BrZPws3lukjxC5z-aa6PAS_WTzd")`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <div className="flex items-center gap-4 text-white">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPjV1_Lv3xdSsjPJH4A8CsspeGbMzYXrNpzcc2N7TVoGGPP62OH12viKqH1uA6niyB2NCLd8YBCwICL2RGwEdKltuItRTGvuQ2jAhaTBNlAuRo7cOWJQULjtUVXX7Q1cY0cAcvFVlyAk3Ah5gM5tU0_Y8Znn6QER1ArEhVDf-qR-9j4AoVCnujlTU4pSQfltMHWmawg58Ik8ANNSP0PkNX78ZNd787qJVMifmS4qPklxGlZXI-1lzaiZHpzVo9dVr8wpmiva3IcYxT"
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-primary-500 object-cover"
                      />
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
                {/* Floating trust indicator */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-success-500/20 flex items-center justify-center text-success-500">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Credibility</p>
                    <p className="font-bold text-primary-500">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section Header */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center pt-20 pb-4">
          <div className="max-w-[1200px] flex-1 flex items-end justify-between">
            <div>
              <h2 className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                Featured Verified Reviews
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Real feedback from community members with top credibility scores.
              </p>
            </div>
            <Link
              href="/login"
              className="text-primary-500 font-bold hover:underline flex items-center gap-1"
            >
              View All <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
        </div>

        {/* Video Grid */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center pb-20">
          <div className="max-w-[1200px] flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredReviews.map((review) => (
                <div
                  key={review.id}
                  className="group flex flex-col gap-3 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%), url("${review.thumbnail}")`,
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <div
                        className={`flex h-7 items-center justify-center gap-1 rounded-full pl-3 pr-3 text-white ${review.trustLevel === "ELITE" ? "bg-primary-500" : "bg-slate-100 !text-slate-800"
                          }`}
                      >
                        <span className="material-symbols-outlined !text-[16px]">
                          {review.trustLevel === "ELITE" ? "stars" : "verified_user"}
                        </span>
                        <p className="text-[10px] font-black uppercase">{review.trustLevel}</p>
                      </div>
                      <div
                        className={`flex h-7 items-center justify-center gap-1 rounded-full pl-3 pr-3 text-white ${review.proofType === "UNBOXING" ? "bg-success-500" : "bg-blue-500"
                          }`}
                      >
                        <span className="material-symbols-outlined !text-[16px]">
                          {review.proofType === "UNBOXING" ? "package_2" : "inventory_2"}
                        </span>
                        <p className="text-[10px] font-black uppercase">
                          {review.proofType === "UNBOXING" ? "Unboxing" : "Usage Proof"}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-base font-bold leading-tight line-clamp-2">
                        {review.title}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-primary-500/90 text-white rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined !text-3xl">play_arrow</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.creator.avatar}
                        alt={review.creator.name}
                        className="size-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {review.creator.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-success-500">
                      <span className="text-xs font-bold">{review.trustScore}% Trust</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Credibility System Section */}
        <div className="px-4 md:px-20 lg:px-40 flex justify-center py-24 bg-white dark:bg-slate-900">
          <div className="max-w-[1200px] flex-1">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#0d141b] dark:text-white">
                The Science of Credibility
              </h2>
              <p className="text-[#4c739a] dark:text-slate-400 max-w-[600px] text-lg">
                We don&apos;t just host videos. We calculate a dynamic Credibility Score for every
                creator using multi-point verification.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary-500 shadow-sm border border-blue-100 dark:border-slate-700">
                  <span className="material-symbols-outlined !text-4xl">receipt_long</span>
                </div>
                <div className="flex flex-col gap-2 text-center">
                  <h3 className="text-xl font-bold dark:text-white">Purchase Verification</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    We sync with retailers to confirm the creator actually owns and uses the product
                    they&apos;re reviewing.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-success-500/10 flex items-center justify-center text-success-500 shadow-sm border border-success-500/20">
                  <span className="material-symbols-outlined !text-4xl">history_edu</span>
                </div>
                <div className="flex flex-col gap-2 text-center">
                  <h3 className="text-xl font-bold dark:text-white">Engagement Integrity</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Our AI detects artificial engagement and bias patterns to ensure reviews are
                    genuinely community-driven.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 dark:border-slate-700">
                  <span className="material-symbols-outlined !text-4xl">analytics</span>
                </div>
                <div className="flex flex-col gap-2 text-center">
                  <h3 className="text-xl font-bold dark:text-white">Review Quality Score</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Content is graded on helpfulness, detail, and technical accuracy to provide a
                    final trust rating.
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[2px] bg-slate-100 dark:bg-slate-800 -z-0" />
            </div>

            {/* Infographic Summary */}
            <div className="mt-20 p-8 rounded-3xl bg-primary-500/5 border border-primary-500/10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-primary-500/10"
                      cx="96"
                      cy="96"
                      fill="transparent"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                    />
                    <circle
                      className="text-primary-500"
                      cx="96"
                      cy="96"
                      fill="transparent"
                      r="88"
                      stroke="currentColor"
                      strokeDasharray="552.92"
                      strokeDashoffset="82.93"
                      strokeWidth="12"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-primary-500">8.5</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Trust Score
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-left">
                <h4 className="text-2xl font-bold mb-4 dark:text-white">The Elite Standard</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Only creators who maintain a score above 8.0 for 6 consecutive months receive the{" "}
                  <span className="text-primary-500 font-bold">Elite Badge</span>. This ensures
                  you&apos;re watching content from the most reliable sources in the community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 px-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="size-2 rounded-full bg-success-500" />
                    <p className="text-xs font-medium">Identity Verified</p>
                  </div>
                  <div className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 px-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="size-2 rounded-full bg-success-500" />
                    <p className="text-xs font-medium">No Paid Placements</p>
                  </div>
                  <div className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 px-4 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="size-2 rounded-full bg-success-500" />
                    <p className="text-xs font-medium">Direct Purchase Proof</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="px-4 py-24 flex justify-center bg-primary-500">
          <div className="max-w-[800px] text-center flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Ready to see the truth?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl">
              Join 500,000+ smart shoppers who use SeenIt to make better buying decisions through
              verified reviews.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="flex min-w-[240px] cursor-pointer items-center justify-center rounded-xl h-16 px-8 bg-white text-primary-500 text-xl font-bold shadow-xl hover:bg-slate-50 transition-all"
              >
                Start Browsing Reviews
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-4 md:px-10 py-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-primary-500 mb-6">
              <div className="size-5">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-[#0d141b] dark:text-white text-lg font-bold">SeenIt</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              The world&apos;s first trust-indexed UGC review platform. Because honest opinions
              should be the standard, not the exception.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 dark:text-white">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary-500 transition-colors" href="#">Browse Products</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">How it Works</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Top Creators</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Trust Standards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 dark:text-white">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary-500 transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Press</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 dark:text-white">Legal</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary-500 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary-500 transition-colors" href="#">Verification Rules</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2024 SeenIt Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary-500 transition-colors">
              public
            </span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary-500 transition-colors">
              language
            </span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary-500 transition-colors">
              share
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
