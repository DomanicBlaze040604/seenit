"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Shield,
    LayoutDashboard,
    Video,
    Upload,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    ShieldCheck,
    ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Reviews", href: "/reviews", icon: Video },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "Moderation", href: "/moderation", icon: ShieldAlert },
    { name: "Settings", href: "/settings", icon: Settings },
];

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            SeenIt
                        </span>
                    </Link>
                    <button
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all",
                                    isActive
                                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                )}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                            {user?.email?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user?.email || "User"}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <ShieldCheck className="w-3 h-3" />
                                Verified
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600"
                        onClick={handleSignOut}
                    >
                        <LogOut className="w-4 h-4" />
                        Sign out
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between h-full px-4 lg:px-8">
                        <button
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex-1 lg:flex-none" />

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
