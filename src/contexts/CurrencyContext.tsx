'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { currencyService } from '../services/api';

export interface CurrencyRate {
    USD: number;
    NGN: number;
}

interface CurrencyContextType {
    currentCurrency: string;
    setCurrentCurrency: (currency: string) => void;
    convertPrice: (priceUSD: number | "free") => string;
    rates: CurrencyRate;
    updateRates: (newRates: Partial<CurrencyRate>) => void;
    isLoading: boolean;
    error: string | null;
}

const defaultRates: CurrencyRate = {
    USD: 1,
    NGN: 1700, // Example rate: 1 USD = 1200 NGN
};

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    NGN: '₦',
};

const currencyNames: Record<keyof CurrencyRate, string> = {
    USD: 'United States Dollar',
    NGN: 'Nigerian Naira',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const [rates, setRates] = useState<CurrencyRate>(defaultRates);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setIsLoading(true);
                const data = await currencyService.getRates();

                // Add a check for data structure
                const transformedRates: CurrencyRate = {
                    USD: 1,
                    NGN: 1700, // Default fallback
                };

                // Check if data is an array before mapping
                if (Array.isArray(data)) {
                    data.forEach((rate: { short_name: string; value: number }) => {
                        if (rate.short_name in transformedRates) {
                            transformedRates[rate.short_name as keyof CurrencyRate] = rate.value;
                        }
                    });
                } else {
                    console.error('Unexpected data structure:', data);
                }

                setRates(transformedRates);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch rates:', error);
                setError('Failed to fetch rates');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRates();
    }, []);

    const updateRates = async (newRates: Partial<CurrencyRate>) => {
        try {
            setIsLoading(true);
            // Update each rate individually using the API
            await Promise.all(
                Object.entries(newRates).map(([shortName, value]) =>
                    currencyService.updateRate(shortName, {
                        short_name: shortName,
                        full_name: currencyNames[shortName as keyof CurrencyRate],
                        value
                    })
                )
            );
            setRates(prev => ({ ...prev, ...newRates }));
            setError(null);
        } catch (error) {
            console.error('Failed to update rates:', error);
            setError('Failed to update rates');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const convertPrice = (priceUSD: number | "free"): string => {
        if (priceUSD === "free") return "FREE";

        const convertedPrice = priceUSD * rates[currentCurrency as keyof CurrencyRate];
        const symbol = currencySymbols[currentCurrency];

        return `${symbol}${convertedPrice.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{
            currentCurrency,
            setCurrentCurrency,
            convertPrice,
            rates,
            updateRates,
            isLoading,
            error
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}; 