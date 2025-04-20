'use client';

import { useState, useEffect } from 'react';
import PageLoader from './ui/PageLoader';

export default function ClientLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const minimumLoadingTime = 1000;

    useEffect(() => {
        const startTime = Date.now();

        const hideLoader = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(minimumLoadingTime - elapsedTime, 0);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        };

        // Wait for document and fonts to be ready
        Promise.all([
            // Wait for document
            new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve(true);
                } else {
                    window.addEventListener('load', () => resolve(true), { once: true });
                }
            }),
            // Wait for fonts
            document.fonts.ready
        ]).then(hideLoader);

        // Fallback timeout to prevent infinite loading
        const fallbackTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 seconds maximum loading time

        return () => {
            clearTimeout(fallbackTimeout);
        };
    }, []);

    return (
        <>
            {isLoading && <PageLoader />}
            {children}
        </>
    );
} 