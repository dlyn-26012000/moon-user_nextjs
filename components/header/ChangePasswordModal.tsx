"use client";

import { useAuth } from "@/store/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState, useRef } from "react";
import { KeyRound, Save, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { PasswordService } from "@/services/password.service";

interface ChangePasswordModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
    const { user } = useAuth();
    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [generalError, setGeneralError] = useState("");

    const currentPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setCurrentPassword("");
            setPassword("");
            setPasswordConfirmation("");
            setErrors({});
            setGeneralError("");
            setSuccess(false);
            setTimeout(() => currentPasswordRef.current?.focus(), 80);
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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword || !password || !passwordConfirmation) return;
        
        if (password !== passwordConfirmation) {
            setErrors({ password_confirmation: [t("passwords_do_not_match")] });
            return;
        }

        setSaving(true);
        setSuccess(false);
        setErrors({});
        setGeneralError("");
        try {
            await PasswordService.change({
                current_password: currentPassword,
                password: password,
                password_confirmation: passwordConfirmation,
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1500);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setGeneralError(error.response?.data?.message || "Something went wrong");
            }
        } finally {
            setSaving(false);
        }
    };

    if (!open || !user) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-modal-in overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-teal-400 to-cyan-300" />

                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{t("change_password")}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {t("change_password_subtitle") || "Protect your account with a strong password"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 animate-fade-in">
                            <CheckCircle2 size={20} />
                            <span className="text-sm font-medium">{t("change_password_success")}</span>
                        </div>
                    )}

                    {generalError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-fade-in">
                            <AlertCircle size={20} />
                            <span className="text-sm font-medium">{generalError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                {t("current_password")}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                    <KeyRound size={18} />
                                </div>
                                <input
                                    ref={currentPasswordRef}
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                        if (errors.current_password) {
                                            const newErrors = { ...errors };
                                            delete newErrors.current_password;
                                            setErrors(newErrors);
                                        }
                                    }}
                                    className={[
                                        "w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none",
                                        errors.current_password ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                                    ].join(" ")}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.current_password && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    {errors.current_password[0]}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {t("new_password")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <KeyRound size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) {
                                                const newErrors = { ...errors };
                                                delete newErrors.password;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        className={[
                                            "w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none",
                                            errors.password ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                                        ].join(" ")}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {t("confirm_new_password")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <KeyRound size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) => {
                                            setPasswordConfirmation(e.target.value);
                                            if (errors.password_confirmation) {
                                                const newErrors = { ...errors };
                                                delete newErrors.password_confirmation;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        className={[
                                            "w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none",
                                            errors.password_confirmation ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                                        ].join(" ")}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {errors.password_confirmation[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                            >
                                {t("cancel") || "Cancel"}
                            </button>
                            <button
                                type="submit"
                                disabled={saving || !currentPassword || !password || !passwordConfirmation}
                                className="inline-flex items-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:brightness-110 transition-all disabled:opacity-50 active:scale-[0.98]"
                            >
                                {saving ? (
                                    <Loader2 size={18} className="mr-2 animate-spin" />
                                ) : (
                                    <Save size={18} className="mr-2" />
                                )}
                                {t("save")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
