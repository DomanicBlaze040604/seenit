"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

export default function LoginPage() {
    const router = useRouter();
    const [mode, setMode] = React.useState<AuthMode>("login");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const supabase = createClient();
            if (mode === "signup") {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setError("Check your email for a confirmation link!");
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 gradient-cta flex-col justify-center px-16 relative overflow-hidden">
                <div className="relative z-10">
                    <Link href="/" className="mb-12 inline-block">
                        <img src="/logo.jpg" alt="SeenIt" className="h-12 w-auto brightness-0 invert" />
                    </Link>
                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
                        India&apos;s Trust-First<br />Review Platform
                    </h1>
                    <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-md">
                        Real users. Real products. Verified by our SARS™ scoring system.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-white/90">
                            <span className="material-symbols-outlined !text-[20px]">videocam</span>
                            <span className="font-medium">Video-first honest reviews</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <span className="material-symbols-outlined !text-[20px]">verified_user</span>
                            <span className="font-medium">SARS™ verified authenticity</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <span className="material-symbols-outlined !text-[20px]">payments</span>
                            <span className="font-medium">Earn from genuine impact</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8">
                        <img src="/logo.jpg" alt="SeenIt" className="h-10 w-auto" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {mode === "login" ? "Welcome back" : "Create your account"}
                    </h2>
                    <p className="text-gray-500 mb-8">
                        {mode === "login" ? "Sign in to access your dashboard" : "Join the community of honest reviewers"}
                    </p>

                    {/* Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                        <button onClick={() => setMode("login")} className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${mode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Sign In</button>
                        <button onClick={() => setMode("signup")} className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${mode === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Sign Up</button>
                    </div>

                    {error && (
                        <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${error.includes("Check your email") ? "bg-accent-green-50 text-accent-green-700 border border-accent-green-200" : "bg-accent-red-50 text-accent-red-700 border border-accent-red-200"}`}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-lg gradient-btn-primary text-white font-semibold text-base hover:opacity-90 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                                    Processing...
                                </span>
                            ) : mode === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-8">
                        By continuing, you agree to SeenIt&apos;s Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}
