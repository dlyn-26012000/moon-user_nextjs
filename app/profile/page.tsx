"use client";

import { useAuth } from "@/store/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Save, ArrowLeft, Loader2, CheckCircle2, UserCircle } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, initializing, update } = useAuth();
    const { t } = useTranslation();
    const router = useRouter();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!initializing && !user) {
            router.push("/");
        }
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user, initializing, router]);

    const handleSave = async () => {
        if (!name.trim() || !username.trim() || !email.trim()) return;
        
        setSaving(true);
        setSuccess(false);
        try {
            await update({ name, username, email });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Update failed", error);
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

    const hasChanges = name !== user.name || username !== user.username || email !== user.email;

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
                            {t("profile")}
                        </h1>
                    </div>
                </div>

                <div className="bg-white shadow-xl shadow-black/5 rounded-2xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 animate-fade-in">
                                <CheckCircle2 size={20} />
                                <span className="text-sm font-medium">{t("profile_updated")}</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        {t("name")}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm bg-gray-50/50"
                                            placeholder={t("name")}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        {t("username")}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <UserCircle size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm bg-gray-50/50"
                                            placeholder={t("username")}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        {t("email")}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm bg-gray-50/50"
                                            placeholder={t("email")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving || !name.trim() || !username.trim() || !email.trim() || !hasChanges}
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
