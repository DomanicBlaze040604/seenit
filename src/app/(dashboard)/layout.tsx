"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Upload Review", href: "/upload", icon: "cloud_upload" },
    { name: "My Reviews", href: "/reviews", icon: "rate_review" },
    { name: "Settings", href: "/settings", icon: "settings" },
    { name: "Moderation", href: "/moderation", icon: "shield" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
                        <Link href="/" className="inline-block">
                            <img src="/logo.jpg" alt="SeenIt" className="h-9 w-auto" />
                        </Link>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary-50 text-primary-700 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                                >
                                    <span className={`material-symbols-outlined !text-[20px] ${isActive ? "text-primary-600" : "text-gray-400"}`}>{item.icon}</span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sign Out */}
                    <div className="px-3 py-4 border-t border-gray-100">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-accent-red-50 hover:text-accent-red-600 transition-colors"
                        >
                            <span className="material-symbols-outlined !text-[20px]">logout</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center gap-4 lg:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <Link href="/" className="inline-block">
                        <img src="/logo.jpg" alt="SeenIt" className="h-8 w-auto" />
                    </Link>
                </header>

                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
