import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "vi";

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageState>()(
    persist(
        (set) => ({
            language: "vi", // Default to Vietnamese
            setLanguage: (lang) => set({ language: lang }),
        }),
        {
            name: "language-storage",
        }
    )
);
