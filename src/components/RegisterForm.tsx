// 'use client';

// import { useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import { useRouter } from 'next/navigation';


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.username) {
            newErrors.username = 'Please input your username!';
        }

        if (!formData.email) {
            newErrors.email = 'Please input your email!';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email!';
        }

        if (!formData.password) {
            newErrors.password = 'Please input your password!';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password!';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'The two passwords do not match!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Show success message
            alert('Registration successful');
            router.push('/login');
        } catch (error: any) {
            console.error('Registration error:', error);
            alert(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                    placeholder="Enter your username"
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
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

            <div>
                <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-400" />
                        ) : (
                            <FaEye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#D62027] text-white py-4 text-lg rounded-md hover:bg-[#D62027]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D62027] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;

// export default RegisterForm;
