import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const AuthAPI = {
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const DashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getContacts: () => api.get('/dashboard/contacts'),
  getConversations: () => api.get('/dashboard/conversations'),
  getAiConfig: () => api.get('/dashboard/ai/config'),
  updateAiConfig: (data: any) => api.put('/dashboard/ai/config', data),
  getWhatsAppStatus: () => api.get('/dashboard/whatsapp/status'),
};
