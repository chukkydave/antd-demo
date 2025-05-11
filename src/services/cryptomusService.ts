import axios from 'axios';

export const cryptomusService = {
    createPayment: async (params: {
        amount: string;
        currency: string;
        network: string;
    }) => {
        const response = await axios.post('/api/cryptomus/payment', params);
        return response.data;
    }
}; 