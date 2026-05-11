"use client";

import { useLanguage } from "@/store/useLanguage";
import enCommon from "@/locales/en/common.json";
import viCommon from "@/locales/vi/common.json";
import enAuth from "@/locales/en/auth.json";
import viAuth from "@/locales/vi/auth.json";

const translations = {
    en: {
        common: enCommon,
        auth: enAuth,
    },
    vi: {
        common: viCommon,
        auth: viAuth,
    },
} as const;

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (path: string, options?: Record<string, any>) => {
        const hasNamespace = path.includes(":");
        const namespace = hasNamespace ? path.split(":")[0] : "common";
        const key = hasNamespace ? path.split(":")[1] : path;

        const dict = (translations[language] as any)[namespace];
        let result: any = dict;

        if (dict) {
            const keys = key.split(".");
            for (const k of keys) {
                result = result?.[k];
                if (result === undefined) break;
            }
        }

        let str = typeof result === "string" ? result : path;

        if (options) {
            Object.entries(options).forEach(([key, value]) => {
                str = str.replace(new RegExp(`{{${key}}}`, "g"), String(value));
            });
        }

        return str;
    };

    return { t, language };
};
