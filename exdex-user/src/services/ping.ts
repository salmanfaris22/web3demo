import api from './api';

export const pingStatus = async () => {
    try {
        const response = await api.get(`/ping`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
