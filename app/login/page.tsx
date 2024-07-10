"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { signIn, useSession } from "next-auth/react";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    useEffect(() => {
        if (isValidEmail(email) && password.length >= 8) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, password]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            setError("");
            router.push("/"); // Redireciona para a página desejada
        }
    };

    return (
        <div className="justify-center mt-16">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-purple-700">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email Address"
                            required
                            className="w-full input input-bordered input-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            required
                            className="w-full input input-bordered input-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!isFormValid}
                        >
                            Sign In
                        </button>
                        <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                    </div>
                </form>
                <Link
                    className="block text-center text-blue-500 hover:underline mt-2"
                    href="/register"
                >
                    Register Here
                </Link>
            </div>
        </div>
    );
};

export default Login;
