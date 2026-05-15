"use client";

import { Eye, EyeOff, Loader2, LogIn, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AuthService } from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";
import { useTranslation } from "@/hooks/useTranslation";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onSwitchToRegister: () => void;
}

export default function LoginModal({ open, onClose, onSuccess, onSwitchToRegister }: LoginModalProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setError(null);
            setTimeout(() => usernameRef.current?.focus(), 80);
        }
    }, [open]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", onKey);
            return () => document.removeEventListener("keydown", onKey);
        }
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!username.trim() || !password) return;

        setLoading(true);
        setError(null);

        try {
            const response = await AuthService.login({
                username: username.trim(),
                password,
            });
            console.log(response);

            localStorage.setItem("auth_token", response.data);

            onSuccess();
            setUsername("");
            setPassword("");
            onClose();
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ?? t("auth:login_failed");
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-label={t("auth:login_title")}
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-modal-in overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-teal-400 to-cyan-300" />

                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{t("auth:login_title")}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {t("auth:welcome_back")}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label={t("auth:close")}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-start gap-2">
                            <span className="mt-0.5">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label
                                htmlFor="login-username"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                {t("auth:username")}
                            </label>
                            <input
                                ref={usernameRef}
                                id="login-username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t("auth:username").toLowerCase()}
                                required
                                disabled={loading}
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="login-password"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                {t("auth:password")}
                            </label>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? t("auth:hide_password") : t("auth:show_password")}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right">
                            <a
                                href="/forgot-password"
                                className="text-xs text-primary hover:underline"
                            >
                                {t("auth:forgot_password")}
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !username.trim() || !password}
                            className="w-full h-11 rounded-lg bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    {t("auth:logging_in")}
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    {t("auth:login_button")}
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        {t("auth:no_account")}{" "}
                        <button
                            onClick={onSwitchToRegister}
                            className="text-primary font-semibold hover:underline"
                        >
                            {t("auth:register_now")}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
