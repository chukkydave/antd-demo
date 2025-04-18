import { api } from './api';

export interface AdminLoginCredentials {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
        role: string;
    };
}

export const adminService = {
    login: async (credentials: AdminLoginCredentials): Promise<AdminLoginResponse> => {
        const response = await api.post('/api/v1/auth/login', credentials);
        return response.data;
    }
}; 