import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Update response interceptor to handle 401s more gracefully
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only handle 401s if they're not from the wallet endpoint
        if (error.response?.status === 401 && !error.config.url.includes('/api/v1/wallet')) {
            Cookies.remove('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

interface Rate {
    full_name: string;
    short_name: string;
    value: number;
}

export const currencyService = {
    // Get current rates
    getRates: async () => {
        const response = await api.get('/api/v1/rates');
        return response.data;
    },

    getRateByShortName: async (shortName: string) => {
        const response = await api.get(`/api/v1/rates/${shortName}`);
        return response.data;
    },

    updateRate: async (shortName: string, rate: Rate) => {
        const response = await api.patch(`/api/v1/rates/${shortName}`, rate);
        return response.data;
    },

    addRate: async (rate: Rate) => {
        const response = await api.post('/api/v1/rates', rate);
        return response.data;
    },

    // Admin login
    adminLogin: async (credentials: { username: string; password: string }) => {
        const response = await api.post('/admin/login', credentials);
        return response.data;
    }
};