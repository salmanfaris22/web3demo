import api from './api';

export const getBubbleList = async (url: any) => {
    try {
        const response = await api.get(`/binary/commissions${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserList = async (url: any) => {
    try {
        const response = await api.get(`/binary/team/commissions${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};