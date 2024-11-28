import { AppDispatch } from '../store';
import { setUser } from '../store/authSlice';
import api from './api';

export const getUserDetails = async () => {
    try {
        const response = await api.get('/user/details');
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const searchUser = async (id: any) => {
    try {
        const response = await api.get(`/search/suggestions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getUserInfo = async () => {
    try {
        const response = await api.get(`/users/update-profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserInfo = async (data: any) => {
    try {
        const response = await api.put(`/users/update-profile`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const profileFileUpload = async (data: any, url: string) => {
    try {
        const response = await api.post(`/users/photos?type=${url}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (data: any) => {
    try {
        const response = await api.put(`/users/update-password`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserStatus = async (id: any) => {
    try {
        const response = await api.get(`/admin/users/${id}/status`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserPlanStatus = async () => {
    try {
        const response = await api.get(`/plans/users/contract-check`);
        return response.data;
    } catch (error) {
        throw error;
    }
};