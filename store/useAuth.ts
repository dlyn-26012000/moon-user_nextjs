import { create } from "zustand";
import { AuthUser } from "@/types/auth";
import { AuthService } from "@/services/auth.service";

interface AuthState {
    user: AuthUser | null;
    initializing: boolean;
    setUser: (user: AuthUser | null) => void;
    fetchMe: () => Promise<void>;
    logout: () => Promise<void>;
    update: (payload: { name: string; username: string; email: string }) => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
    user: null,
    initializing: true,
    setUser: (user) => set({ user }),
    fetchMe: async () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            set({ user: null, initializing: false });
            return;
        }
        try {
            const me = await AuthService.getMe();
            set({ user: me, initializing: false });
        } catch (error) {
            localStorage.removeItem("auth_token");
            set({ user: null, initializing: false });
        }
    },
    logout: async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem("auth_token");
            set({ user: null });
        }
    },
    update: async (payload) => {
        const user = await AuthService.update(payload);
        set({ user });
    },
}));
