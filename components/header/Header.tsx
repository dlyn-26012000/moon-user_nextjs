"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-16 border-b flex items-center justify-between px-6 bg-primary">
            {/* Left */}
            <div className="flex items-center gap-4">
                <div className="text-xl font-bold">
                    LOGO
                </div>

                <div>
                    <ShoppingCart className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            {/* Center */}
            <div className="flex-1 max-w-xl mx-10">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-10 border rounded-lg px-4 outline-none"
                />
            </div>

            <Link
                href="/login"
                className="h-10 px-4 rounded-lg bg-black text-white flex items-center"
            >
                Đăng nhập
            </Link>
        </header>
    );
}