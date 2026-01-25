"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowLeft, RefreshCw } from "lucide-react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

export default function VerifyPage() {
    const router = useRouter();
    const supabase = createClient();

    const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [countdown, setCountdown] = React.useState(60);
    const [canResend, setCanResend] = React.useState(false);
    const [authData, setAuthData] = React.useState<{
        method: string;
        value: string;
        redirect: string;
    } | null>(null);

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    // Load auth data from session storage
    React.useEffect(() => {
        const method = sessionStorage.getItem("auth_method");
        const value = sessionStorage.getItem("auth_value");
        const redirect = sessionStorage.getItem("auth_redirect") || "/dashboard";

        if (!method || !value) {
            router.push("/login");
            return;
        }

        setAuthData({ method, value, redirect });
    }, [router]);

    // Countdown timer for resend
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when complete
        if (newOtp.every((digit) => digit) && newOtp.join("").length === 6) {
            handleVerify(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < pasted.length; i++) {
            newOtp[i] = pasted[i];
        }
        setOtp(newOtp);

        if (pasted.length === 6) {
            handleVerify(pasted);
        }
    };

    const handleVerify = async (code: string) => {
        if (!authData) return;

        setError(null);
        setIsLoading(true);

        try {
            let verifyError;
            if (authData.method === "email") {
                const { error } = await supabase.auth.verifyOtp({
                    type: "email",
                    email: authData.value,
                    token: code,
                });
                verifyError = error;
            } else {
                const { error } = await supabase.auth.verifyOtp({
                    type: "sms",
                    phone: authData.value,
                    token: code,
                });
                verifyError = error;
            }

            if (verifyError) throw verifyError;

            // Clear session storage
            sessionStorage.removeItem("auth_method");
            sessionStorage.removeItem("auth_value");
            sessionStorage.removeItem("auth_redirect");

            router.push(authData.redirect);
        } catch (err: any) {
            setError(err.message || "Invalid verification code");
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!authData || !canResend) return;

        setCanResend(false);
        setCountdown(60);
        setError(null);

        try {
            if (authData.method === "email") {
                await supabase.auth.signInWithOtp({
                    email: authData.value,
                });
            } else {
                await supabase.auth.signInWithOtp({
                    phone: authData.value,
                });
            }
        } catch (err: any) {
            setError(err.message || "Failed to resend code");
        }
    };

    if (!authData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
            <div className="w-full max-w-md animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        SeenIt
                    </h1>
                </div>

                <Card variant="elevated" className="p-2">
                    <CardHeader>
                        <CardTitle>Verify your {authData.method}</CardTitle>
                        <CardDescription>
                            We sent a 6-digit code to{" "}
                            <span className="font-medium text-gray-900 dark:text-white">
                                {authData.value}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* OTP Input */}
                        <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${error
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                        }`}
                                    autoFocus={index === 0}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                        )}

                        {isLoading && (
                            <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600" />
                                <span className="text-sm">Verifying...</span>
                            </div>
                        )}

                        {/* Resend */}
                        <div className="text-center">
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Resend code
                                </button>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Resend code in{" "}
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {countdown}s
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Back to login */}
                        <div className="mt-6">
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => router.push("/login")}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Use a different {authData.method}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
