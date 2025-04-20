'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Card, Spin, Alert } from 'antd';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useRouter } from 'next/navigation';
import { CurrencyRate } from '@/contexts/CurrencyContext';

export default function AdminDashboard() {
    const { rates, updateRates, isLoading, error } = useCurrency();
    const [newRates, setNewRates] = useState(rates);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        }
    }, [router]);

    useEffect(() => {
        setNewRates(rates);
    }, [rates]);

    const handleRateChange = (currency: keyof CurrencyRate, value: string) => {
        setNewRates(prev => ({
            ...prev,
            [currency]: parseFloat(value) || prev[currency]
        }));
    };

    const handleSubmit = async () => {
        setUpdating(true);
        try {
            await updateRates(newRates);
        } finally {
            setUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Card title="Currency Conversion Rates" className="max-w-2xl mx-auto">
                <div className="space-y-4">
                    {Object.entries(newRates).map(([currency, rate]) => (
                        currency !== 'USD' && (
                            <div key={currency} className="flex items-center gap-4">
                                <span className="w-24">1 USD to {currency}:</span>
                                <Input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => handleRateChange(currency as keyof CurrencyRate, e.target.value)}
                                    className="w-32"
                                    step="0.01"
                                />
                            </div>
                        )
                    ))}
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={updating}
                        className="w-full mt-4 bg-blue-600"
                    >
                        Update Rates
                    </Button>
                </div>
            </Card>
        </div>
    );
} 