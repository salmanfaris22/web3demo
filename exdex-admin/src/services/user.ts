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

export const userOverview = async () => {
    try {
        const response = await api.get(`/admin/users/user-counts`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTotal = async () => {
    try {
        const response = await api.get(`/admin/users/total`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserList = async (url: string) => {
    try {
        const response = await api.get(`/admin/profile/users${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserGraph = async () => {
    try {
        const response = await api.get(`/admin/sales/graph`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async (id: any) => {
    try {
        const response = await api.get(`/admin/users/profile/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserProfileListing = async (data: any) => {
    try {
        const response = await api.get(`/admin/users/${data.id}${data.url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchUserProfileListing = async (data: any) => {
    try {
        const response = await api.get(`/admin/users/lsit${data.url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const exportUserProfileListing = async (data: any) => {
    try {
        const response = await api.get(`/admin/users/${data.id}/export${data.url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserBalanceDetails = async (id: any) => {
    try {
        const response = await api.get(`/admin/users/profile-balance/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchUserList = async (id: any) => {
    try {
        const response = await api.get(`/search/suggestions/${id}`);
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

export const suspendUser = async (id: any) => {
    try {
        const response = await api.put(`/admin/users/${id}/suspend`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserFreeAccessStatus = async (id: any) => {
    try {
        const response = await api.get(`/admin/users/${id}/freeaccess`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const freeAccessUser = async (id: any, data: any) => {
    try {
        const response = await api.post(`/admin/users/${id}/freeaccess`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const dexOnlyUser = async (id: any, data: any) => {
    try {
        const response = await api.post(`/admin/users/${id}/only-dextoken`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const freezeUser = async (id: any, data: any) => {
    try {
        const response = await api.post(`/admin/users/${id}/freeze`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteUser = async (id: any) => {
    try {
        const response = await api.delete(`/admin/users/${id}/delete`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const activateUser = async (id: any) => {
    try {
        const response = await api.post(`/admin/users/${id}/activate`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const reActivateUser = async (id: any) => {
    try {
        const response = await api.post(`/admin/users/reactivate/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getUserInfo = async (id: any) => {
    try {
        const response = await api.get(`/admin/users/basic-info/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserInfo = async (data: any, id: any) => {
    try {
        const response = await api.put(`/admin/users/basic-info/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const profileFileUpload = async (data: any, id: any, url: string) => {
    try {
        const response = await api.post(`/admin/users/${id}/${url}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (data: any, id: any) => {
    try {
        const response = await api.post(`/admin/users/${id}/change-password`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const downloadUserAgreement = async (userPlanId: string, userId: string) => {
    try {
        const response = await api.get(`/admin/plans/agreement/${userPlanId}?user_id=${userId}`, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};