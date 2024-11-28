import api from './api';

//topbar summary
export const getTopBarSummary = async () => {
    try {
        const response = await api.get(`/admin/dashboard/top`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSalesBehaviour = async () => {
    try {
        const response = await api.get(`/admin/plans/sales/team-behaviour`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getSalesOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/total-sales${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAutoTradeOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/auto-trade${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAiSignalOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/ai-signal${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDexGemOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/dex-gem${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getNFTSalesOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/nft-sales${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSpendOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/spend-summary${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserOverview = async (url: string) => {
    try {
        const response = await api.get(`/admin/sales/user-overview${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getUnilevelSummary = async (url: string) => {
    try {
        const response = await api.get(`/unilevel/commission-summary${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUnilevelGraph = async (url: any) => {
    try {
        const response = await api.get(`/unilevel/graph${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


//binary

export const getBinary = async (url: any) => {
    try {
        const response = await api.get(`/affliate/leg-volumes${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBinaryDetails = async (url: any) => {
    try {
        const response = await api.get(`/affliate/monthly-volumes${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getBinarySummary = async (url: any) => {
    try {
        const response = await api.get(`/affiliate/summary${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};