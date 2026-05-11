"use client";

import { useAuth } from "@/store/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PasswordService } from "@/services/password.service";

export default function ChangePasswordPage() {
    const { user, initializing } = useAuth();
    const { t } = useTranslation();
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [generalError, setGeneralError] = useState("");

    useEffect(() => {
        if (!initializing && !user) {
            router.push("/");
        }
    }, [user, initializing, router]);

    const handleSave = async () => {
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
            setCurrentPassword("");
            setPassword("");
            setPasswordConfirmation("");
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setGeneralError(err.response?.data?.message || "Something went wrong");
            }
        } finally {
            setSaving(false);
        }
    };

    if (initializing || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2"
                        >
                            <ArrowLeft size={16} className="mr-1" />
                            {t("home")}
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {t("change_password")}
                        </h1>
                    </div>
                </div>

                <div className="bg-white shadow-xl shadow-black/5 rounded-2xl overflow-hidden border border-gray-100">
                    <div className="p-8">
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

                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="current_password"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    {t("current_password")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <KeyRound size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        id="current_password"
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
                                            "block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm bg-gray-50/50",
                                            errors.current_password ? "border-red-300 ring-red-50" : "border-gray-200"
                                        ].join(" ")}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.current_password && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                                        <AlertCircle size={12} />
                                        {errors.current_password[0]}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        {t("new_password")}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <KeyRound size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
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
                                                "block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm bg-gray-50/50",
                                                errors.password ? "border-red-300 ring-red-50" : "border-gray-200"
                                            ].join(" ")}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                                            <AlertCircle size={12} />
                                            {errors.password[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        {t("confirm_new_password")}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <KeyRound size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            id="password_confirmation"
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
                                                "block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm bg-gray-50/50",
                                                errors.password_confirmation ? "border-red-300 ring-red-50" : "border-gray-200"
                                            ].join(" ")}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                                            <AlertCircle size={12} />
                                            {errors.password_confirmation[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving || !currentPassword || !password || !passwordConfirmation}
                                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:transform-none"
                                >
                                    {saving ? (
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                    ) : (
                                        <Save size={18} className="mr-2" />
                                    )}
                                    {t("save")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
