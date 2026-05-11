"use client";

import { useLanguage, Language } from "@/store/useLanguage";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

export default function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-10 h-10" />;

    const toggleLanguage = () => {
        const nextLang: Language = language === "en" ? "vi" : "en";
        setLanguage(nextLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
            title={language === "en" ? "Switch to Vietnamese" : "Switch to English"}
        >
            <Languages size={16} className="text-gray-600" />
            <span className="uppercase">{language}</span>
        </button>
    );
}
