import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach token and language from localStorage on every request
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        // Token
        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Language
        const langStorage = localStorage.getItem("language-storage");
        let lang = "vi"; // Default
        if (langStorage) {
            try {
                const parsed = JSON.parse(langStorage);
                if (parsed?.state?.language) {
                    lang = parsed.state.language;
                }
            } catch (e) {
                console.error("Error parsing language-storage", e);
            }
        }
        config.headers["language"] = lang;
    }
    return config;
});

// Handle 401 — clear token (do NOT redirect, login is a modal)
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
        }
        return Promise.reject(err);
    }
);

export default api;