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

        // Wait for both document and styles to be ready
        Promise.all([
            // Wait for document
            new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve(true);
                } else {
                    window.addEventListener('load', () => resolve(true), { once: true });
                }
            }),
            // Wait for Antd styles
            new Promise(resolve => {
                const checkStyles = () => {
                    // Check if Antd styles are loaded by looking for a common Antd class
                    const antdStylesLoaded = document.querySelector('.ant-btn') !== null ||
                        document.querySelector('.ant-input') !== null ||
                        document.querySelector('.ant-select') !== null;

                    if (antdStylesLoaded) {
                        resolve(true);
                    } else {
                        // Check again in a short interval
                        setTimeout(checkStyles, 50);
                    }
                };
                checkStyles();
            }),
            // Wait for fonts
            document.fonts.ready
        ]).then(hideLoader);

        return () => { };
    }, []);

    return (
        <>
            {isLoading && <PageLoader />}
            {children}
        </>
    );
} 