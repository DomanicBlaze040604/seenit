"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "My Reviews", href: "/reviews", icon: "video_library" },
    { name: "Upload", href: "/upload", icon: "cloud_upload" },
    { name: "Settings", href: "/settings", icon: "settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                router.replace("/login");
            } else {
                setUser(data.user);
                setLoading(false);
            }
        });
    }, [router]);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6f7f8]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#2b8cee] border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#f6f7f8]">
            {/* Sidebar Navigation - Desktop */}
            <aside className="w-64 border-r border-slate-200 bg-white hidden lg:flex flex-col fixed top-0 left-0 h-screen z-30">
                <div className="p-5 flex items-center gap-3 border-b border-slate-100">
                    <div className="bg-[#2b8cee] p-1.5 rounded-lg text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">SeenIt</h1>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-[#2b8cee]/10 text-[#2b8cee] font-semibold"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-[#2b8cee] flex items-center justify-center text-white font-bold">
                            {user?.email?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                                {user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white flex flex-col lg:hidden transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#2b8cee] p-1.5 rounded-lg text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">SeenIt</h1>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-[#2b8cee]/10 text-[#2b8cee] font-semibold"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-slate-100">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 lg:ml-64">
                {/* Top Navbar */}
                <header className="h-14 md:h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>

                        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-64 lg:w-80">
                            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
                            <input
                                className="bg-transparent border-none focus:outline-none text-sm flex-1 placeholder:text-slate-400"
                                placeholder="Search reviews, products..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
