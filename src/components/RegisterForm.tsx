'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    dob: string;
}

const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dob: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const { login } = useAuth();
    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.firstName) {
            newErrors.firstName = 'Please input your first name!';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Please input your last name!';
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
            const response = await api.post('/api/v1/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                dob: formData.dob,
            });

            if (response.data.status && response.data.data.token) {
                const { token, user } = response.data.data;
                login(token, user); // Use the same login function as LoginForm
                toast.success('Registration successful');
                router.push('/'); // Redirect to home instead of login
                router.refresh();
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-3 border text-black ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                    placeholder="Enter your first name"
                />
                {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
            </div>

            <div>
                <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-3 border text-black ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
                    placeholder="Enter your last name"
                />
                {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
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
                    className={`mt-1 block w-full px-3 py-3 border text-black ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
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
                        className={`mt-1 block w-full px-3 py-3 border text-black ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
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
                        className={`mt-1 block w-full px-3 py-3 border text-black ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#D62027] focus:border-[#D62027]`}
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
