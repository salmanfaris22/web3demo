import api from './api';
import { AppDispatch } from '../store';
import { clearUserAndToken } from '../store/authSlice';

export const login = async (data: any) => {
    try {
        const response = await api.post('/login', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData: any) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const reset = async (userData: any) => {
    try {
        const response = await api.post('/reset-password', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const forgot = async (userData: any) => {
    try {
        const response = await api.post('/forgot-password', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resendOtp = async (userData: any) => {
    try {
        const response = await api.post('/resend-otp', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verify = async (userData: any) => {
    try {
        const response = await api.post('/verify-otp', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async (dispatch: AppDispatch) => {
    try {
        const response = await api.post('/auth/logout');
        dispatch(clearUserAndToken());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCountryCode = async () => {
    try {
        const response = await api.get('/countries');
        return response.data;
    } catch (error) {
        throw error;
    }
};