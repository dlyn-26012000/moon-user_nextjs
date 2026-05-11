import api from "@/lib/axios";
import { ChangePasswordRequest } from "@/types/password";

export const PasswordService = {
    change: async (payload: ChangePasswordRequest): Promise<void> => {
        await api.patch("user/password/change", payload);
    },
};
