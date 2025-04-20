'use client';

import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './AuthContext';
import { walletService } from '@/services/walletService';

interface WalletContextType {
    balance: string;
    totalEarned: string;
    totalSold: string;
    status: string;
    isLoading: boolean;
    error: Error | null;
    refetchBalance: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuth();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['walletBalance', user?.id],
        queryFn: async () => {
            try {
                return await walletService.getBalance();
            } catch (error: unknown) {
                // If unauthorized, just return null instead of redirecting
                const apiError = error as { response?: { status: number } };
                if (apiError.response?.status === 401) {
                    logout(); // Clear auth state but don't redirect
                    return null;
                }
                throw error;
            }
        },
        enabled: isAuthenticated,
        // Disable automatic polling
        refetchInterval: undefined,
        // Only fetch when explicitly requested
        refetchOnWindowFocus: false,
        retry: false, // Don't retry failed requests
    });

    return (
        <WalletContext.Provider value={{
            balance: data?.balance ?? '0.0000',
            totalEarned: data?.total_earned ?? '0.0000',
            totalSold: data?.total_sold ?? '0.0000',
            status: data?.status ?? 'rookie',
            isLoading,
            error,
            refetchBalance: refetch
        }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error('useWallet must be used within WalletProvider');
    return context;
}; 