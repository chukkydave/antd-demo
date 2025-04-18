import axios from 'axios';

export const BASEURL = 'https://test-api.ogabassey.com';

export const api = axios.create({
    baseURL: BASEURL,
    headers: {
        'Content-Type': 'application/json',
    },
}); 