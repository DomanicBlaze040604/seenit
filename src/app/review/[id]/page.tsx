import Link from "next/link";

const reviewData = {
    id: "1",
    title: "Real-world test: QuietComfort Pro Gen 2 Headphones",
    video_url: "",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOrlTt6wSjc9gws7mOj25_p9BNj6dyEd0P-NPb5j6cOg6TstB0M1ccMmjixi0vcI-vBoeWqsXwzEbdXyagkM8QpECHl818Ed4AQLQ5oAvbjqNoU-hMC-HrOBue7XS83bghMl53Y0dYiKb3OgzpxHCSgo7Fk9ZjpWOd8br7xUmj2YaqkaCAqcVlh45PFDiMH1lMweWK8ySHczqSwvY6L6IfXJm9-rFaJAMvddL3bcXLRm1Wooq-wGZMeSuXkOhh0EfLLcK5Iubg_lkA",
    duration: 285,
    proof_type: "USAGE",
    usage_months: 6,
    evidence: [
        { type: "RECEIPT", title: "Verified Receipt Photo", subtitle: "Purchase Date: Jan 12, 2024", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBe3ZyDMPbKKavbCiU-mmSHsv8Y3KPmqLnWS8vdE2jOI0GNDWMoj_2GGLZiwZTYWOSfVFFuuwt0-0deF4AbRyWh5_vV3kACgWxN7Gdz2BAFmRPlq9lsjIMXYuOVOKPa15BZOIGCcB0RDycXX7NT6wMeXDJIF8PoYWZG8toE4hgchb843iUK8ncXkqKdLy3amclYAtVI8y2y-M7XaBsLprhQ1gvMszQJThGJqxRdWZZt9GtaME8-lPhSpsTrX0Go8S1lhNhL77e47Qi" },
        { type: "PACKAGING", title: "Original Packaging", subtitle: "Serial Match Verified", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAr27ZtF9peqElu8b6DzvO3vTkK8dv5Vn5xEcUfTezdcm2RAo3AWS28S_48_sO7oDJZvNHNpSOddMzLIBpHSxsgEzBEwfMhBq2bMT8M8rbguxpaBSgurtVsFW96Rmyxaiq6DfRy9QFIMHj1DvH4EoGbfHGfF66FrmiRiIEfr7MF7WFiX3nqsp9l_xGzTVZr0b3mhqyU06zzww9lwzgt0sT6azDCgj2vF9VliWohJUmpx0FSw9kvpYji-h7w6JWYWSC_YUTGe6o00lg" },
    ],
    creator: {
        id: "1", name: "Alex Johnson",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLAF-_4b-0s6e2C0_JOk1BnKQ1Mbmlj8ic2UkrTe-N8GoS9oAVF2UA8C9snzWiyqz5z8uDGx2PgABX7OojWukZnvdvpGc6QeAl6R3QLTuTZMQdDrZu_2SnDLJY7lVebKL5hRo4bkucJXqqXPePDSWmtet6eUnkkr8945HLrqQUaTHanF-VJi1v7-A7-Y9nK9I_pSKN5BfeaKDlCpoH82eXbNESvj1Bt-78SxEu_8dofpQy_0OYr69Sr487iPXUbvrDvreVhtUwis4_",
        tagline: "Tech Enthusiast & Audio Pro",
        bio: `"I test audio equipment in diverse environments to provide honest, fluff-free feedback for everyday listeners."`,
        trust_level: "ELITE", account_age: "3 Years", reviews_count: 45,
    },
    product: {
        id: "1", name: "SoundMaster QuietComfort Pro Gen 2", category: "Top Rated Audio",
        description: "Active Noise Cancelling, 40h Battery Life, Hi-Res Audio.", price: 349.0, rating: 4.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbsHbXeVyqPcJw73kbmYp7uSp5GLIJlrhVSK-Vm3ERNYi-MsYcemletikigiq7Hdn13mDZHW7mkNMPL7mmgVcLKB1i46ua_TP0cVwf2ynZyKk_yW4DPHT-DaSNuMUSxk9X23C4ANHy9r-3itIzXI2Z9MjJDG_jLHdNKcPgftpnmtY6VCxGhoGiPWjaPZQdnjZuUiRiwmWxb1ILcwRMjWN0da0zWVY-eeSs5qD7TYzVrnZQreGq6i0bBHlS1ATV1igMQQLyQgVPXOcP",
    },
};

export default function ReviewPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md px-6 md:px-10 py-3 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="inline-block">
                            <img src="/logo.png" alt="SeenIt" className="h-12 w-auto" />
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors" href="#">Feed</a>
                            <a className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors" href="#">Creators</a>
                            <a className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors" href="#">Categories</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
                            <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-40 md:w-64 placeholder:text-gray-400 text-gray-900" placeholder="Search reviews..." type="text" />
                        </div>
                        <Link href="/login" className="gradient-btn-primary text-white font-semibold px-5 py-2 rounded-lg text-sm">Sign In</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-[1200px] mx-auto p-4 md:p-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
                    <Link className="hover:text-primary-600 transition-colors" href="/">Reviews</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <a className="hover:text-primary-600 transition-colors" href="#">Electronics</a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-gray-900 font-medium">Wireless Audio</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{reviewData.title}</h1>

                        {/* Media Player */}
                        <div className="relative group aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-center bg-cover opacity-80" style={{ backgroundImage: `url("${reviewData.thumbnail}")` }} />
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/20 group-hover:bg-black/30 transition-all">
                                <button className="size-18 bg-primary-600/90 text-white rounded-full flex items-center justify-center shadow-md transform transition group-hover:scale-105">
                                    <span className="material-symbols-outlined material-fill !text-4xl">play_arrow</span>
                                </button>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500 w-1/3" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-white text-xs font-medium">
                                    <div className="flex items-center gap-4">
                                        <span>1:12 / 4:45</span>
                                        <span className="material-symbols-outlined text-lg">volume_up</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">settings</span>
                                        <span className="material-symbols-outlined text-lg">fullscreen</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verification Proof */}
                        <div className="bg-accent-green-50 border border-accent-green-200 rounded-2xl p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-accent-green-500 text-white p-2 rounded-lg">
                                        <span className="material-symbols-outlined material-fill">verified_user</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">Verification Proof</h3>
                                        <p className="text-sm text-gray-600">Status: <span className="text-accent-green-600 font-semibold">Fully Authenticated</span></p>
                                    </div>
                                </div>
                                <div className="bg-white px-3 py-1.5 rounded-full border border-accent-green-200">
                                    <span className="text-sm font-bold text-accent-green-700">{reviewData.usage_months} Months of Usage</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reviewData.evidence.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl flex items-start gap-4 border border-gray-100">
                                        <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${item.image}')` }} />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{item.type === "RECEIPT" ? "Evidence Type" : "Physical Proof"}</p>
                                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between py-4 border-t border-gray-200 mt-2">
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-lg">share</span>Share
                                </button>
                                <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-lg">bookmark</span>Save
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-accent-red-500 transition-colors">
                                <span className="material-symbols-outlined text-lg">flag</span>Report
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Creator Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-14 rounded-full bg-center bg-cover border-2 border-primary-100" style={{ backgroundImage: `url("${reviewData.creator.avatar}")` }} />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold text-gray-900">{reviewData.creator.name}</h2>
                                        <span className="bg-primary-50 text-primary-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-primary-200">Elite</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{reviewData.creator.tagline}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{reviewData.creator.bio}</p>
                            <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Account Age</p>
                                    <p className="text-lg font-bold text-gray-900">{reviewData.creator.account_age}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Reviews</p>
                                    <p className="text-lg font-bold text-gray-900">{reviewData.creator.reviews_count} Verified</p>
                                </div>
                            </div>
                            <button className="w-full gradient-btn-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all">
                                Follow Creator
                            </button>
                        </div>

                        {/* Product Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <div className="h-40 bg-gray-100 bg-center bg-cover" style={{ backgroundImage: `url("${reviewData.product.image}")` }} />
                            <div className="p-6">
                                <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">{reviewData.product.category}</p>
                                <h3 className="font-bold text-lg leading-tight mb-2 text-gray-900">{reviewData.product.name}</h3>
                                <p className="text-sm text-gray-500 mb-6">{reviewData.product.description}</p>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-2xl font-bold text-gray-900">${reviewData.product.price.toFixed(2)}</span>
                                    <div className="flex text-accent-amber-400">
                                        {[1, 2, 3, 4].map((i) => (
                                            <span key={i} className="material-symbols-outlined material-fill text-sm">star</span>
                                        ))}
                                        <span className="material-symbols-outlined text-sm text-gray-300">star</span>
                                    </div>
                                </div>
                                <a className="flex items-center justify-center gap-2 w-full border border-gray-200 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors" href="#">
                                    <span className="material-symbols-outlined text-lg">shopping_cart</span>View Product
                                </a>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-primary-50 p-4 rounded-xl flex gap-3 border border-primary-100">
                            <span className="material-symbols-outlined text-primary-500">info</span>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                SeenIt prioritizes <span className="font-bold text-gray-800">authentic feedback</span> over popularity.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-12 py-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-400">© 2024 SeenIt UGC Platform. Trust-first product feedback.</p>
            </footer>
        </div>
    );
}
