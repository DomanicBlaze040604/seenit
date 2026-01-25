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
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const supabase = createClient();

            if (mode === "signup") {
                // Validate passwords match
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                if (password.length < 6) {
                    throw new Error("Password must be at least 6 characters");
                }

                // Sign up with email and password
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });

                if (error) throw error;
                setSuccess("Check your email to confirm your account, then log in!");
                setMode("login");
                setPassword("");
                setConfirmPassword("");
            } else {
                // Sign in with email and password
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background-light dark:bg-background-dark">
            {/* Left: Form Section */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
                <div className="mx-auto w-full max-w-md">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-primary-500 mb-12">
                        <div className="size-8">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-[#0d141b] dark:text-white">SeenIt</h2>
                    </Link>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">
                            {mode === "login" ? "Welcome back" : "Create an account"}
                        </h1>
                        <p className="text-[#4c739a]">
                            {mode === "login"
                                ? "Sign in to continue creating trusted reviews"
                                : "Join the community of verified product reviewers"}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-[#e7edf3] dark:bg-slate-800 rounded-xl p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => {
                                setMode("login");
                                setError(null);
                            }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${mode === "login"
                                    ? "bg-white dark:bg-slate-700 text-[#0d141b] dark:text-white shadow-sm"
                                    : "text-[#4c739a]"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMode("signup");
                                setError(null);
                            }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${mode === "signup"
                                    ? "bg-white dark:bg-slate-700 text-[#0d141b] dark:text-white shadow-sm"
                                    : "text-[#4c739a]"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-success-500/10 border border-success-500/20 rounded-lg p-4 text-success-600 dark:text-success-400 text-sm">
                                {success}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-[#0d141b] dark:text-white mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4c739a]">
                                    <span className="material-symbols-outlined text-lg">mail</span>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#e7edf3] dark:bg-slate-800 border-none rounded-xl py-4 pl-12 pr-4 text-[#0d141b] dark:text-white placeholder:text-[#4c739a] focus:ring-2 focus:ring-primary-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0d141b] dark:text-white mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4c739a]">
                                    <span className="material-symbols-outlined text-lg">lock</span>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#e7edf3] dark:bg-slate-800 border-none rounded-xl py-4 pl-12 pr-4 text-[#0d141b] dark:text-white placeholder:text-[#4c739a] focus:ring-2 focus:ring-primary-500"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-[#0d141b] dark:text-white mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4c739a]">
                                        <span className="material-symbols-outlined text-lg">lock</span>
                                    </span>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#e7edf3] dark:bg-slate-800 border-none rounded-xl py-4 pl-12 pr-4 text-[#0d141b] dark:text-white placeholder:text-[#4c739a] focus:ring-2 focus:ring-primary-500"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "login" && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm text-primary-500 hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {mode === "login" ? "Signing in..." : "Creating account..."}
                                </>
                            ) : (
                                <>
                                    {mode === "login" ? "Sign In" : "Create Account"}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#4c739a]">
                        {mode === "login" ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <button
                                    onClick={() => setMode("signup")}
                                    className="text-primary-500 font-bold hover:underline"
                                >
                                    Sign up for free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setMode("login")}
                                    className="text-primary-500 font-bold hover:underline"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Right: Visual Section */}
            <div className="hidden lg:flex flex-1 bg-primary-500 p-12 items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-md text-white text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <span className="material-symbols-outlined !text-4xl">verified_user</span>
                    </div>
                    <h2 className="text-3xl font-black mb-4">Join 500,000+ trusted creators</h2>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        Build your credibility score and get rewarded for authentic product reviews that help
                        shoppers make better decisions.
                    </p>
                    <div className="flex justify-center gap-6 mt-8">
                        <div className="text-center">
                            <p className="text-3xl font-black">98%</p>
                            <p className="text-blue-200 text-sm">Verified Reviews</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black">4.8</p>
                            <p className="text-blue-200 text-sm">Avg Trust Score</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black">24h</p>
                            <p className="text-blue-200 text-sm">Verification Time</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
