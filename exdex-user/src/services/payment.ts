import api from './api';

export const makePayment = async (id: string, data: any) => {
    try {
        const response = await api.post(`/user-plans/plan/${id}/checkout`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBalance = async () => {
    try {
        const response = await api.get(`/user/balances`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyCoupon = async (data: any) => {
    try {
        const response = await api.post(`/user-plans/verify-referral`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const swap = async (data: any) => {
    try {
        const response = await api.post(`/dashboard/swap`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrency = async () => {
    try {
        const response = await api.get(`/currencies`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createWallet = async (data: any) => {
    try {
        const response = await api.post(`/wallet/create`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const withdraw = async (data: any) => {
    try {
        const response = await api.post(`/withdraw/withdrawal-request`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const transfer = async (data: any) => {
    try {
        const response = await api.post(`/dashboard/transfer`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listAiPackages = async () => {
    try {
        const response = await api.get(`/user/plans/ai-signal`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listDexPackages = async () => {
    try {
        const response = await api.get(`/user/plans/dexgem`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const buyAiDexPackage = async (data: any) => {
    try {
        const response = await api.post(`/user/plan/7/limited-field`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAiDexPurchaseStatus = async () => {
    try {
        const response = await api.get(`/user/plans/add-on`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
