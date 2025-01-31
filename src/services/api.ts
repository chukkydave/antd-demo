import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Rate {
    full_name: string;
    short_name: string;
    value: number;
}

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor for admin token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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