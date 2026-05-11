"use client";

import { useAuth } from "@/store/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState, useRef } from "react";
import { User, Mail, Save, X, Loader2, CheckCircle2, UserCircle, AlertCircle } from "lucide-react";

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
    const { user, update } = useAuth();
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [generalError, setGeneralError] = useState("");

    const nameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open && user) {
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email);
            setErrors({});
            setGeneralError("");
            setSuccess(false);
            setTimeout(() => nameRef.current?.focus(), 80);
        }
    }, [open, user]);

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
        if (!name.trim() || !username.trim() || !email.trim()) return;
        
        setSaving(true);
        setSuccess(false);
        setErrors({});
        setGeneralError("");
        try {
            await update({ name, username, email });
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

    const hasChanges = name !== user.name || username !== user.username || email !== user.email;

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
                            <h2 className="text-2xl font-bold text-gray-900">{t("profile")}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {t("update_profile_subtitle") || "Update your personal information"}
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
                            <span className="text-sm font-medium">{t("profile_updated")}</span>
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
                                {t("name")}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                    <User size={18} />
                                </div>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) {
                                            const newErrors = { ...errors };
                                            delete newErrors.name;
                                            setErrors(newErrors);
                                        }
                                    }}
                                    className={[
                                        "w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none",
                                        errors.name ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                                    ].join(" ")}
                                    placeholder={t("name")}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {t("username")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <UserCircle size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            if (errors.username) {
                                                const newErrors = { ...errors };
                                                delete newErrors.username;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        className={[
                                            "w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none",
                                            errors.username ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                                        ].join(" ")}
                                        placeholder={t("username")}
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {errors.username[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {t("email")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) {
                                                const newErrors = { ...errors };
                                                delete newErrors.email;
                                                setErrors(newErrors);
                                            }
                                        }}
                                        className={[
                                            "w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none",
                                            errors.email ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                                        ].join(" ")}
                                        placeholder={t("email")}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {errors.email[0]}
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
                                disabled={saving || !name.trim() || !username.trim() || !email.trim() || !hasChanges}
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
