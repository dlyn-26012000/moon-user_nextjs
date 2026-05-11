"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/login", {
                email,
                password,
            });

            const token = res.data.token;

            localStorage.setItem("token", token);

            alert("Đăng nhập thành công");
        } catch (error) {
            console.error(error);
            alert("Login fail");
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <div className="space-y-4">
                <input
                    className="w-full h-10 border px-4 rounded-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full h-10 border px-4 rounded-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full h-10 bg-black text-white rounded-lg"
                >
                    Login
                </button>
            </div>
        </div>
    );
}