import api from "@/lib/axios";
import { AuthUser, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth";

export const AuthService = {
    login: async (payload: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<{ data: LoginResponse }>("user/auth/login", payload);
        return response.data.data;
    },

    getMe: async (): Promise<AuthUser> => {
        const response = await api.get<{ data: AuthUser }>("user/auth/me");
        return response.data.data;
    },

    register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
        const response = await api.post<{ data: RegisterResponse }>("user/auth/register", payload);
        return response.data.data;
    },

    logout: async (): Promise<void> => {
        await api.delete("user/auth/logout");
    },
};
