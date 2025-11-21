"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Regiter() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    async function handleLogin() {
        setLoading(true);

    }
    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-sm space-y-4 border p-6 rounded-xl shadow">
                <h1 className="text-xl font-semibold">Admin Login</h1>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button className="w-full" onClick={handleLogin} disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </Button>
            </div>
        </div>
    );

}