"use client";

import { Eye, EyeOff, Loader2, UserPlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AuthService } from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (token: string, user: AuthUser) => void;
    onSwitchToLogin: () => void;
}

export default function RegisterModal({ open, onClose, onSuccess, onSwitchToLogin }: RegisterModalProps) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const nameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setError(null);
            setTimeout(() => nameRef.current?.focus(), 80);
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
        
        if (!name.trim() || !username.trim() || !email.trim() || !password || !passwordConfirmation) return;
        
        if (password !== passwordConfirmation) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { token, user } = await AuthService.register({
                name: name.trim(),
                username: username.trim(),
                email: email.trim(),
                password,
                password_confirmation: passwordConfirmation,
            });

            localStorage.setItem("auth_token", token);

            onSuccess(token, user);
            resetForm();
            onClose();
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ?? "Đăng ký thất bại. Vui lòng thử lại.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setError(null);
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-label="Đăng ký"
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-modal-in overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-teal-400 to-cyan-300" />

                <div className="p-8 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Đăng ký</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Tạo tài khoản mới để bắt đầu mua sắm!
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Đóng"
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
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Họ và tên
                            </label>
                            <input
                                ref={nameRef}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nguyễn Văn A"
                                required
                                disabled={loading}
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username123"
                                required
                                disabled={loading}
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                disabled={loading}
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Password Confirmation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !name.trim() || !username.trim() || !email.trim() || !password || !passwordConfirmation}
                            className="w-full h-11 rounded-lg bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Đang đăng ký...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Đăng ký
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Đã có tài khoản?{" "}
                        <button 
                            onClick={onSwitchToLogin} 
                            className="text-primary font-semibold hover:underline"
                        >
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
