"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Radar } from "@/components/ui/radar-effect";

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
        <div className="min-h-screen bg-[#040C1A] flex font-grotesk text-white">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative overflow-hidden bg-[#0C1628] border-r border-white/5">
                {/* Visual Radar Background Elements */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <Radar className="scale-[1.5]" />
                    <div className="absolute w-[500px] h-[500px] bg-[#1648CC]/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 flex flex-col justify-center h-full">
                    <Link href="/" className="mb-12 inline-block">
                        <img src="/logo.png" alt="SeenIt" className="h-[72px] w-auto drop-shadow-lg" />
                    </Link>
                    <h1 className="text-6xl font-[Bangers] tracking-wide text-white leading-[1.1] mb-6 drop-shadow-md">
                        India&apos;s <span className="gradient-text-gold">Trust-First</span><br />
                        Review Platform
                    </h1>
                    <p className="text-[#9BB5D9] text-xl leading-relaxed mb-10 max-w-md font-medium">
                        Real users. Real products. Verified by our <span className="text-white font-bold">SARS™</span> scoring system.
                    </p>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-4 text-[#9BB5D9] bg-white/5 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-sm w-fit">
                            <span className="material-symbols-outlined !text-[24px] text-red-400">videocam</span>
                            <span className="font-bold text-white">Video-first honest reviews</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#9BB5D9] bg-[#1648CC]/10 border border-[#1648CC]/20 px-5 py-3 rounded-xl backdrop-blur-sm w-fit">
                            <span className="material-symbols-outlined !text-[24px] text-[#4E8FFF]">verified_user</span>
                            <span className="font-bold text-white">SARS™ verified authenticity</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#9BB5D9] bg-[#FFD700]/10 border border-[#FFD700]/20 px-5 py-3 rounded-xl backdrop-blur-sm w-fit">
                            <span className="material-symbols-outlined !text-[24px] text-[#FFD700]">monetization_on</span>
                            <span className="font-bold text-white">Earn from genuine impact</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden">
                {/* Background Glows for Form Side */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1648CC]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFD700]/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="w-full max-w-md relative z-10 glass rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/50 border border-white/10">
                    <div className="lg:hidden mb-10 flex justify-center">
                        <img src="/logo.png" alt="SeenIt" className="h-16 w-auto" />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-[Bangers] tracking-wider text-white mb-3">
                            {mode === "login" ? "Welcome Back" : "Join SeenIt"}
                        </h2>
                        <p className="text-[#6B88B8] font-semibold text-sm">
                            {mode === "login" ? "Access your SARS™ dashboard" : "Become an elite trust-indexed creator"}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-[#081020] border border-white/5 rounded-xl p-1.5 mb-8 shadow-inner">
                        <button onClick={() => setMode("login")} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${mode === "login" ? "bg-[#1648CC] text-white shadow-lg shadow-[#1648CC]/30" : "text-[#4B6280] hover:text-white"}`}>Sign In</button>
                        <button onClick={() => setMode("signup")} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${mode === "signup" ? "bg-[#1648CC] text-white shadow-lg shadow-[#1648CC]/30" : "text-[#4B6280] hover:text-white"}`}>Sign Up</button>
                    </div>

                    {error && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-bold text-center flex items-center gap-2 justify-center ${error.includes("Check your email") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                            <span className="material-symbols-outlined !text-[18px]">
                                {error.includes("Check your email") ? "check_circle" : "error"}
                            </span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-bold text-[#9BB5D9] mb-2 uppercase tracking-wide text-[11px]">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#4B6280] !text-[20px]">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-white/10 bg-[#040C1A] text-white placeholder:text-[#4B6280] focus:border-[#1648CC] focus:ring-1 focus:ring-[#1648CC] transition-all outline-none font-medium"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#9BB5D9] mb-2 uppercase tracking-wide text-[11px]">Password</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#4B6280] !text-[20px]">lock</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-white/10 bg-[#040C1A] text-white placeholder:text-[#4B6280] focus:border-[#1648CC] focus:ring-1 focus:ring-[#1648CC] transition-all outline-none font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 mt-2 rounded-xl btn-blue text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(22,72,204,0.3)]"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    {mode === "login" ? "Sign In" : "Create Account"}
                                    <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-[11px] font-medium text-[#4B6280] mt-8 leading-relaxed">
                        By continuing, you verify compliance with SeenIt&apos;s<br />
                        <a href="#" className="text-[#4E8FFF] hover:text-[#1648CC] transition-colors underline decoration-white/20 underline-offset-2">Terms of Service</a> and <a href="#" className="text-[#4E8FFF] hover:text-[#1648CC] transition-colors underline decoration-white/20 underline-offset-2">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
