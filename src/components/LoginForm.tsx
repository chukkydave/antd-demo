'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const { login } = useAuth();

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.email) {
            newErrors.email = 'Please input your email!';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email!';
        }

        if (!formData.password) {
            newErrors.password = 'Please input your password!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await api.post('/api/v1/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.data.token) {
                const { token, user } = response.data.data;
                // login(token, user);
                login(token, user);
                toast.success('Login successful');
                router.push('/');
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full text-gray-700 px-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-700"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full text-gray-700 px-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-400" />
                        ) : (
                            <FaEye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#D62027] accent-[#D62027] focus:ring-[#D62027] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Remember me for 30 days</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-[#D62027] hover:underline hover:text-[#D62027]/80"
                >
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#D62027] text-white py-4 text-lg rounded-md hover:bg-[#D62027]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D62027] ${loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Logging in...' : 'Log in'}
            </button>
        </form>
    );
};

export default LoginForm;
