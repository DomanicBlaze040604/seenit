import Link from "next/link";

// This would be fetched from the API in a real app
const reviewData = {
    id: "1",
    title: "Real-world test: QuietComfort Pro Gen 2 Headphones",
    video_url: "",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOrlTt6wSjc9gws7mOj25_p9BNj6dyEd0P-NPb5j6cOg6TstB0M1ccMmjixi0vcI-vBoeWqsXwzEbdXyagkM8QpECHl818Ed4AQLQ5oAvbjqNoU-hMC-HrOBue7XS83bghMl53Y0dYiKb3OgzpxHCSgo7Fk9ZjpWOd8br7xUmj2YaqkaCAqcVlh45PFDiMH1lMweWK8ySHczqSwvY6L6IfXJm9-rFaJAMvddL3bcXLRm1Wooq-wGZMeSuXkOhh0EfLLcK5Iubg_lkA",
    duration: 285,
    proof_type: "USAGE",
    usage_months: 6,
    evidence: [
        {
            type: "RECEIPT",
            title: "Verified Receipt Photo",
            subtitle: "Purchase Date: Jan 12, 2024",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBe3ZyDMPbKKavbCiU-mmSHsv8Y3KPmqLnWS8vdE2jOI0GNDWMoj_2GGLZiwZTYWOSfVFFuuwt0-0deF4AbRyWh5_vV3kACgWxN7Gdz2BAFmRPlq9lsjIMXYuOVOKPa15BZOIGCcB0RDycXX7NT6wMeXDJIF8PoYWZG8toE4hgchb843iUK8ncXkqKdLy3amclYAtVI8y2y-M7XaBsLprhQ1gvMszQJThGJqxRdWZZt9GtaME8-lPhSpsTrX0Go8S1lhNhL77e47Qi",
        },
        {
            type: "PACKAGING",
            title: "Original Packaging",
            subtitle: "Serial Match Verified",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAr27ZtF9peqElu8b6DzvO3vTkK8dv5Vn5xEcUfTezdcm2RAo3AWS28S_48_sO7oDJZvNHNpSOddMzLIBpHSxsgEzBEwfMhBq2bMT8M8rbguxpaBSgurtVsFW96Rmyxaiq6DfRy9QFIMHj1DvH4EoGbfHGfF66FrmiRiIEfr7MF7WFiX3nqsp9l_xGzTVZr0b3mhqyU06zzww9lwzgt0sT6azDCgj2vF9VliWohJUmpx0FSw9kvpYji-h7w6JWYWSC_YUTGe6o00lg",
        },
    ],
    creator: {
        id: "1",
        name: "Alex Johnson",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLAF-_4b-0s6e2C0_JOk1BnKQ1Mbmlj8ic2UkrTe-N8GoS9oAVF2UA8C9snzWiyqz5z8uDGx2PgABX7OojWukZnvdvpGc6QeAl6R3QLTuTZMQdDrZu_2SnDLJY7lVebKL5hRo4bkucJXqqXPePDSWmtet6eUnkkr8945HLrqQUaTHanF-VJi1v7-A7-Y9nK9I_pSKN5BfeaKDlCpoH82eXbNESvj1Bt-78SxEu_8dofpQy_0OYr69Sr487iPXUbvrDvreVhtUwis4_",
        tagline: "Tech Enthusiast & Audio Pro",
        bio: `"I test audio equipment in diverse environments to provide honest, fluff-free feedback for everyday listeners."`,
        trust_level: "ELITE",
        account_age: "3 Years",
        reviews_count: 45,
    },
    product: {
        id: "1",
        name: "SoundMaster QuietComfort Pro Gen 2",
        category: "Top Rated Audio",
        description: "Active Noise Cancelling, 40h Battery Life, Hi-Res Audio.",
        price: 349.0,
        rating: 4.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbsHbXeVyqPcJw73kbmYp7uSp5GLIJlrhVSK-Vm3ERNYi-MsYcemletikigiq7Hdn13mDZHW7mkNMPL7mmgVcLKB1i46ua_TP0cVwf2ynZyKk_yW4DPHT-DaSNuMUSxk9X23C4ANHy9r-3itIzXI2Z9MjJDG_jLHdNKcPgftpnmtY6VCxGhoGiPWjaPZQdnjZuUiRiwmWxb1ILcwRMjWN0da0zWVY-eeSs5qD7TYzVrnZQreGq6i0bBHlS1ATV1igMQQLyQgVPXOcP",
    },
};

export default function ReviewPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Top Navigation Bar */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="text-primary-500 size-8">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight dark:text-white">SeenIt</h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium hover:text-primary-500 transition-colors" href="#">
                                Feed
                            </a>
                            <a className="text-sm font-medium hover:text-primary-500 transition-colors" href="#">
                                Creators
                            </a>
                            <a className="text-sm font-medium hover:text-primary-500 transition-colors" href="#">
                                Categories
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5">
                            <span className="material-symbols-outlined text-slate-500 text-lg">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-40 md:w-64 placeholder:text-slate-500"
                                placeholder="Search reviews..."
                                type="text"
                            />
                        </div>
                        <Link
                            href="/login"
                            className="bg-primary-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-[1200px] mx-auto p-4 md:p-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 text-sm text-slate-500 dark:text-slate-400">
                    <Link className="hover:text-primary-500" href="/">
                        Reviews
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <a className="hover:text-primary-500" href="#">
                        Electronics
                    </a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">Wireless Audio</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Video & Proof */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Headline */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                {reviewData.title}
                            </h1>
                        </div>

                        {/* Media Player */}
                        <div className="relative group aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
                            <div
                                className="absolute inset-0 bg-center bg-cover opacity-80"
                                style={{ backgroundImage: `url("${reviewData.thumbnail}")` }}
                            />
                            {/* Overlay UI */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/20 group-hover:bg-black/30 transition-all">
                                <button className="size-20 bg-primary-500/90 text-white rounded-full flex items-center justify-center shadow-lg transform transition group-hover:scale-105">
                                    <span className="material-symbols-outlined material-fill !text-4xl">play_arrow</span>
                                </button>
                            </div>
                            {/* Player Controls */}
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="flex-1 h-1.5 bg-white/30 rounded-full relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 bg-primary-500 w-1/3" />
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

                        {/* Verification Proof Section */}
                        <div className="bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 rounded-xl p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-500 text-white p-2 rounded-lg">
                                        <span className="material-symbols-outlined material-fill">verified_user</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg dark:text-white">Verification Proof</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Status: Fully Authenticated Review
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-primary-500/20">
                                    <span className="text-sm font-bold text-primary-500">
                                        {reviewData.usage_months} Months of Usage
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reviewData.evidence.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-slate-800 p-4 rounded-lg flex items-start gap-4 shadow-sm"
                                    >
                                        <div
                                            className="size-16 rounded bg-cover bg-center shrink-0"
                                            style={{ backgroundImage: `url('${item.image}')` }}
                                        />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                                                {item.type === "RECEIPT" ? "Evidence Type" : "Physical Proof"}
                                            </p>
                                            <p className="text-sm font-semibold dark:text-white">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-800 mt-2">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 text-sm font-bold px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-lg">share</span>
                                    Share Review
                                </button>
                                <button className="flex items-center gap-2 text-sm font-bold px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-lg">bookmark</span>
                                    Save
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined text-lg">flag</span>
                                Report Review
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Creator & Product */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Creator Profile Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="size-16 rounded-full bg-center bg-cover border-2 border-primary-500/20"
                                    style={{ backgroundImage: `url("${reviewData.creator.avatar}")` }}
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold text-lg dark:text-white">{reviewData.creator.name}</h2>
                                        <span className="bg-primary-500/10 text-primary-500 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-primary-500/30">
                                            Elite
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">{reviewData.creator.tagline}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {reviewData.creator.bio}
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                                        Account Age
                                    </p>
                                    <p className="text-lg font-bold dark:text-white">{reviewData.creator.account_age}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Reviews</p>
                                    <p className="text-lg font-bold dark:text-white">
                                        {reviewData.creator.reviews_count} Verified
                                    </p>
                                </div>
                            </div>
                            <button className="w-full bg-primary-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-colors">
                                Follow Creator
                            </button>
                        </div>

                        {/* Product Details Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div
                                className="h-40 bg-slate-100 dark:bg-slate-800 bg-center bg-cover"
                                style={{ backgroundImage: `url("${reviewData.product.image}")` }}
                            />
                            <div className="p-6">
                                <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">
                                    {reviewData.product.category}
                                </p>
                                <h3 className="font-bold text-lg leading-tight mb-2 dark:text-white">
                                    {reviewData.product.name}
                                </h3>
                                <p className="text-sm text-slate-500 mb-6">{reviewData.product.description}</p>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-2xl font-bold dark:text-white">
                                        ${reviewData.product.price.toFixed(2)}
                                    </span>
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4].map((i) => (
                                            <span key={i} className="material-symbols-outlined material-fill text-sm">
                                                star
                                            </span>
                                        ))}
                                        <span className="material-symbols-outlined text-sm">star</span>
                                    </div>
                                </div>
                                <a
                                    className="flex items-center justify-center gap-2 w-full border-2 border-slate-200 dark:border-slate-700 py-3 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-lg">shopping_cart</span>
                                    View Product
                                </a>
                            </div>
                        </div>

                        {/* Credibility Note */}
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl flex gap-3">
                            <span className="material-symbols-outlined text-primary-500">info</span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                SeenIt prioritizes{" "}
                                <span className="font-bold text-slate-700 dark:text-slate-200">authentic feedback</span>{" "}
                                over popularity. This is why we hide like counts and only show verification-backed
                                content.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-sm text-slate-400">© 2024 SeenIt UGC Platform. Trust-first product feedback.</p>
            </footer>
        </div>
    );
}
