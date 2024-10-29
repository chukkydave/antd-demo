'use client';

import { useState, useEffect } from 'react';

interface GeolocationState {
    country?: string;
    loading: boolean;
    error?: string;
}

export const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        loading: true
    });

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setState({
                    country: data.country,
                    loading: false
                });
            })
            .catch(error => {
                setState({
                    error: error.message,
                    loading: false
                });
            });
    }, []);

    return state;
}; 