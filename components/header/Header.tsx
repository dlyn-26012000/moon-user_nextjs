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
import { useCallback, useEffect, useRef, useState } from "react";
import { AuthService } from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

type Language = "VI" | "EN";

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
    const [lang, setLang] = useState<Language>("VI");

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: "VI", label: "Tiếng Việt", flag: "🇻🇳" },
        { code: "EN", label: "English", flag: "🇬🇧" },
    ];

    function select(code: Language) {
        setLang(code);
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
                    "border-white/30 text-white",
                    open ? "bg-white/20 shadow-inner" : "bg-white/10 hover:bg-white/20",
                ].join(" ")}
            >
                <Globe size={16} strokeWidth={2} />
                <span className="hidden sm:inline">{lang}</span>
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
                                lang === code
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-gray-700 hover:bg-gray-50",
                            ].join(" ")}
                        >
                            <span className="text-base">{flag}</span>
                            <span>{label}</span>
                            {lang === code && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Account Dropdown ─────────────────────────────────────────────────────────
interface AccountDropdownProps {
    user: AuthUser | null;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    onLogout: () => void;
    loggingOut: boolean;
}

function AccountDropdown({ user, onLoginClick, onRegisterClick, onLogout, loggingOut }: AccountDropdownProps) {
    const { open, setOpen, ref } = useDropdown();

    const authItems = [
        { href: "/profile", icon: <User size={16} />, label: "Profile" },
        { href: "/orders", icon: <ClipboardList size={16} />, label: "Order History" },
        { href: "/change-password", icon: <KeyRound size={16} />, label: "Change Password" },
    ];

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
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

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-white shadow-xl shadow-black/15 overflow-hidden z-50 animate-fade-in">
                    {user ? (
                        <>
                            {/* User info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                                    Đã đăng nhập
                                </p>
                                <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">
                                    {user.name}
                                </p>
                            </div>

                            {/* Auth menu items */}
                            <div className="py-1">
                                {authItems.map(({ href, icon, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                    >
                                        <span className="text-gray-400">{icon}</span>
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            {/* Logout */}
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
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="py-1">
                            {/* Đăng nhập → open modal */}
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
                                Đăng nhập
                            </button>

                            {/* Đăng ký → open modal */}
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
                                Đăng ký
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [initializing, setInitializing] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setInitializing(false);
            return;
        }
        AuthService.getMe()
            .then((me) => setUser({ name: me.name, email: me.email }))
            .catch(() => {
                localStorage.removeItem("auth_token");
            })
            .finally(() => setInitializing(false));
    }, []);

    const handleLoginSuccess = useCallback(() => {
        AuthService.getMe()
            .then((me) => setUser({ name: me.name, email: me.email }))
            .catch(() => {
                localStorage.removeItem("auth_token");
            });
    }, []);

    const handleLogout = useCallback(async () => {
        setLoggingOut(true);
        try {
            await AuthService.logout();
        } catch {
            // proceed regardless
        } finally {
            localStorage.removeItem("auth_token");
            setUser(null);
            setLoggingOut(false);
        }
    }, []);

    return (
        <>
            <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-primary">
                {/* Left – Logo */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold text-white tracking-tight">
                        LOGO
                    </Link>
                </div>

                {/* Center – Search */}
                <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-xl mx-4 sm:mx-8">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-9 border border-white/40 rounded-lg text-white text-sm bg-white/10 focus:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white px-4 outline-none placeholder-white/60 transition-all"
                    />
                </div>

                {/* Right – Language + Account */}
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    {!initializing && (
                        <AccountDropdown
                            user={user}
                            onLoginClick={() => setLoginOpen(true)}
                            onRegisterClick={() => setRegisterOpen(true)}
                            onLogout={handleLogout}
                            loggingOut={loggingOut}
                        />
                    )}
                </div>
            </header>

            {/* Login Modal */}
            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSuccess={handleLoginSuccess}
                onSwitchToRegister={() => {
                    setLoginOpen(false);
                    setRegisterOpen(true);
                }}
            />

            {/* Register Modal */}
            <RegisterModal
                open={registerOpen}
                onClose={() => setRegisterOpen(false)}
                onSuccess={handleLoginSuccess}
                onSwitchToLogin={() => {
                    setRegisterOpen(false);
                    setLoginOpen(true);
                }}
            />
        </>
    );
}