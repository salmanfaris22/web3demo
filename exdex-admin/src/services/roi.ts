import api from './api';

export const listROI = async () => {
    try {
        const response = await api.get(`/admin/roi/get-list`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateROI = async (data: any) => {
    try {
        const response = await api.put(`/admin/roi/roi-plan-configs`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};




