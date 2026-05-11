"use client";

import {
    Globe,
    UserCircle2,
    LogIn,
    UserPlus,
    User,
    ClipboardList,
    KeyRound,
    LogOut,
    ChevronDown,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AuthUser } from "@/types/auth";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ProfileModal from "./ProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

import { useLanguage, Language } from "@/store/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/store/useAuth";

// ─── Dropdown hook ────────────────────────────────────────────────────────────
function useDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return { open, setOpen, ref };
}

// ─── Language Switcher ────────────────────────────────────────────────────────
function LanguageSwitcher() {
    const { open, setOpen, ref } = useDropdown();
    const { language, setLanguage } = useLanguage();

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
        { code: "en", label: "English", flag: "🇬🇧" },
    ];

    function select(code: Language) {
        setLanguage(code);
        setOpen(false);
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Switch language"
                aria-expanded={open}
                className={[
                    "flex items-center gap-1.5 h-9 px-3 rounded-lg border transition-all duration-200 text-sm font-semibold",
                    "border-white/30 text-white uppercase",
                    open ? "bg-white/20 shadow-inner" : "bg-white/10 hover:bg-white/20",
                ].join(" ")}
            >
                <Globe size={16} strokeWidth={2} />
                <span className="hidden sm:inline">{language}</span>
                <ChevronDown
                    size={14}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-white shadow-xl shadow-black/15 overflow-hidden z-50 animate-fade-in">
                    {languages.map(({ code, label, flag }) => (
                        <button
                            key={code}
                            onClick={() => select(code)}
                            className={[
                                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                                language === code
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-gray-700 hover:bg-gray-50",
                            ].join(" ")}
                        >
                            <span className="text-base">{flag}</span>
                            <span>{label}</span>
                            {language === code && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

interface AccountDropdownProps {
    user: AuthUser | null;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    onProfileClick: () => void;
    onOrdersClick: () => void;
    onChangePasswordClick: () => void;
    onLogout: () => void;
    loggingOut: boolean;
}

function AccountDropdown({ 
    user, 
    onLoginClick, 
    onRegisterClick, 
    onProfileClick,
    onOrdersClick,
    onChangePasswordClick,
    onLogout, 
    loggingOut 
}: AccountDropdownProps) {
    const { open, setOpen, ref } = useDropdown();
    const { t } = useTranslation();

    const authItems = [
        { onClick: onProfileClick, icon: <User size={16} />, label: t("profile") },
        { onClick: onOrdersClick, icon: <ClipboardList size={16} />, label: t("orders") },
        { onClick: onChangePasswordClick, icon: <KeyRound size={16} />, label: t("change_password") },
    ];

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={open}
                className={[
                    "flex items-center gap-1.5 h-9 px-3 rounded-lg border transition-all duration-200 text-sm font-semibold",
                    "border-white/30 text-white",
                    open ? "bg-white/20 shadow-inner" : "bg-white/10 hover:bg-white/20",
                ].join(" ")}
            >
                <UserCircle2 size={18} strokeWidth={2} />
                {user && (
                    <span className="hidden sm:inline max-w-24 truncate">{user.name}</span>
                )}
                <ChevronDown
                    size={14}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-white shadow-xl shadow-black/15 overflow-hidden z-50 animate-fade-in">
                    {user ? (
                        <>
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">
                                    {user.name}
                                </p>
                            </div>
                            <div className="py-1">
                                {authItems.map(({ onClick, icon, label }, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setOpen(false);
                                            onClick();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                    >
                                        <span className="text-gray-400">{icon}</span>
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 py-1">
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        onLogout();
                                    }}
                                    disabled={loggingOut}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                                >
                                    {loggingOut ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <LogOut size={16} />
                                    )}
                                    {t("logout")}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onLoginClick();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                            >
                                <span className="text-gray-400">
                                    <LogIn size={16} />
                                </span>
                                {t("login")}
                            </button>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onRegisterClick();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                            >
                                <span className="text-gray-400">
                                    <UserPlus size={16} />
                                </span>
                                {t("register")}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Header() {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const { user, fetchMe, logout, initializing } = useAuth();
    
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const handleLoginSuccess = useCallback(() => {
        fetchMe();
    }, [fetchMe]);

    const handleLogout = useCallback(async () => {
        setLoggingOut(true);
        await logout();
        
        const protectedRoutes = ["/profile", "/change-password", "/orders"];
        if (protectedRoutes.includes(pathname)) {
            router.push("/");
        }
        
        setLoggingOut(false);
    }, [logout, pathname, router]);

    return (
        <>
            <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 bg-primary shadow-md">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold text-white tracking-tight">
                        LOGO
                    </Link>
                </div>

                <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-xl mx-4 sm:mx-8">
                    <input
                        type="text"
                        placeholder={t("search")}
                        className="w-full h-9 border border-white/40 rounded-lg text-white text-sm bg-white/10 focus:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white px-4 outline-none placeholder-white/60 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    {!initializing && (
                        <AccountDropdown
                            user={user}
                            onLoginClick={() => setLoginOpen(true)}
                            onRegisterClick={() => setRegisterOpen(true)}
                            onProfileClick={() => setProfileOpen(true)}
                            onOrdersClick={() => router.push("/orders")}
                            onChangePasswordClick={() => setChangePasswordOpen(true)}
                            onLogout={handleLogout}
                            loggingOut={loggingOut}
                        />
                    )}
                </div>
            </header>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSuccess={handleLoginSuccess}
                onSwitchToRegister={() => {
                    setLoginOpen(false);
                    setRegisterOpen(true);
                }}
            />

            <RegisterModal
                open={registerOpen}
                onClose={() => setRegisterOpen(false)}
                onSuccess={handleLoginSuccess}
                onSwitchToLogin={() => {
                    setRegisterOpen(false);
                    setLoginOpen(true);
                }}
            />

            <ProfileModal
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
            />

            <ChangePasswordModal
                open={changePasswordOpen}
                onClose={() => setChangePasswordOpen(false)}
            />
        </>
    );
}