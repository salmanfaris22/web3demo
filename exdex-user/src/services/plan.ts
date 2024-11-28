import api from './api';

export const getPlan = async () => {
    try {
        const response = await api.get('/plans');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPurchasedPlanAuto = async (id: string) => {
    try {
        const response = await api.get(`/user/plan/${id}/dashboard`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getSelectedPlan = async (id: string) => {
    try {
        const response = await api.get(`/user/plans/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPlanConfig = async (id: string) => {
    try {
        const response = await api.get(`/plan-configs/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPlanNFTStatus = async (id: string) => {
    try {
        const response = await api.get(`/user/plans/status/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPlanNFTPrice = async (id: string) => {
    try {
        const response = await api.get(`/plans/nft-pricing/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getPlanNFT = async (id: string, page: number, limit: number) => {
    try {
        const response = await api.get(`/plans/${id}/nft-collections?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const savePlan = async (id: string, data: any) => {
    try {
        const response = await api.post(`/user/plan/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const saveSignature = async (id: string, data: any) => {
    try {
        const response = await api.post(`/user-plans/${id}/signature`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//sign agreement
export const signAgreement = async (data: any) => {
    try {
        const response = await api.post(`/plans/checkout/contract`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//purchased plan
export const getPurchasedPlans = async () => {
    try {
        const response = await api.get(`/user/plans/purchased`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPurchasedPlanDetails = async (id: any) => {
    try {
        const response = await api.get(`/user/plans/purchased/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const downloadPurchasedPlanDetails = async (id: any) => {
    try {
        const response = await api.get(`/user-plans/employment-agreement/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPurchasedPlanHistory = async (url: string) => {
    try {
        const response = await api.get(`/user/plan/income-history${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const exportPurchasedPlanHistory = async (url:string) => {
    try {
        const response = await api.get(`/user/plan/income-history/export${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


