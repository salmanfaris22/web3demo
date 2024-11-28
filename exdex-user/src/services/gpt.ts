import api from './api';

export const sendMessage = async (data: any) => {
    try {
        const response = await api.post(`/conversations/message`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const trendingQuestions = async () => {
    try {
        const response = await api.get(`/conversations/most-asked-questions`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchHistory = async () => {
    try {
        const response = await api.get(`/conversations/latest`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
