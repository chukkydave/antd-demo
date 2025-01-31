'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Currency {
    code: string;
    symbol: string;
    countryCode: string;
    name: string;
}

const currencies: Currency[] = [
    { code: 'USD', symbol: '$', countryCode: 'US', name: 'US Dollar' },
    // { code: 'GBP', symbol: '£', countryCode: 'GB', name: 'British Pound' },
    // { code: 'EUR', symbol: '€', countryCode: 'EU', name: 'Euro' },
    { code: 'NGN', symbol: '₦', countryCode: 'NG', name: 'Nigerian Naira' },
];

const CurrencySelector = ({ className }: { className?: string }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { currentCurrency, setCurrentCurrency } = useCurrency();

    const selectedCurrency = currencies.find(c => c.code === currentCurrency) || currencies[0];

    useEffect(() => {
        const detectUserCurrency = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                const userCurrency = currencies.find(currency =>
                    currency.code === 'EUR' ?
                        ['AT', 'BE', 'DE', 'ES', 'FI', 'FR', 'IE', 'IT', 'NL', 'PT'].includes(data.country) :
                        currency.countryCode === data.country
                );

                if (userCurrency) {
                    setCurrentCurrency(userCurrency.code);
                }
            } catch (error) {
                console.error('Error detecting user location:', error);
                setCurrentCurrency('USD');
            } finally {
                setIsLoading(false);
            }
        };

        detectUserCurrency();
    }, [setCurrentCurrency]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleCurrencySelect = (currency: Currency) => {
        setCurrentCurrency(currency.code);
        setShowDropdown(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 px-3 py-2">
                <span className={className}>$0.00</span>
                <div className='rounded-full w-6 h-6 overflow-hidden flex items-center justify-center bg-gray-100 animate-pulse'>
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
                <span className={className}>{selectedCurrency.symbol}0.00</span>
                <div className='rounded-full w-6 h-6 overflow-hidden flex items-center justify-center'>
                    <ReactCountryFlag
                        countryCode={selectedCurrency.countryCode}
                        svg
                        style={{
                            width: '1.5em',
                            height: '1em',
                        }}
                        title={selectedCurrency.name}
                    />
                </div>
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                    {currencies.map((currency) => (
                        <button
                            key={currency.code}
                            onClick={() => handleCurrencySelect(currency)}
                            className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${currentCurrency === currency.code ? 'bg-gray-50' : ''
                                }`}
                        >
                            <div className='rounded-full w-6 h-6 overflow-hidden flex items-center justify-center'>
                                <ReactCountryFlag
                                    countryCode={currency.countryCode}
                                    svg
                                    style={{
                                        width: '1.5em',
                                        height: '1em',
                                    }}
                                    title={currency.name}
                                />
                            </div>
                            <span>{currency.name}</span>
                            <span className="ml-auto">{currency.symbol}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySelector; 