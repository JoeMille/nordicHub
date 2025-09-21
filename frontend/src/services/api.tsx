import axios from 'axios';

export type LoginRespons = {
    access: string;
    refresh: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
};

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const setAuthToken = (token?: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('access_token', token);        
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('access_token');
    }
};

const saved = localStorage.getItem('access_token');
if (saved) setAuthToken(saved);

export const login = async (username: string, password: string): Promise<LoginRespons> => {
    const res = await api.post<LoginRespons>('/auth/login', {username, password});
    setAuthToken(res.data.access);
    return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
    const res = await api.get<User>('/auth/user');
    return res.data;
};

export const listSignals = async () => {
    const res = await api.get('/signals/');
    return res.data as Array<{ id: number; name: string; sampling_rate: number; status: string}>;
};

export const processSignal = async (payload: unknown) => {
    const res = await api.post('/signals/process/', payload);
    return res.data as { received: unknown; result: string };
};

export default api;