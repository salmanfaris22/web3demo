import api from './api';

//market
export const getMarkets = async () => {
    try {
        const response = await api.get(`/market/market-data`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForexMarkets = async () => {
    try {
        const response = await api.get(`/market/forex-market-data`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
//news

export const getNews = async () => {
    try {
        const response = await api.get(`/news/latest-news`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForexNews = async () => {
    try {
        const response = await api.get(`/news/forex-latest-news`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//history

export const getHistory = async (type: any) => {
    try {
        const response = await api.get(`/transaction/history?type=${type}&page=1&page_size=20`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getExportHistory = async (type: any) => {
    try {
        const response = await api.get(`/transaction/export`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//marketing

export const getMarketing = async () => {
    try {
        const response = await api.get(`/marketkit/marketing-kit`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


//referral history

export const getReferralHistory = async (data: any) => {
    let url = '';
    try {
        if (data) {
            if (data['type']) {
                url = `?type=${data['type']}`
            }
            if (data['startDate']) {
                url = url + `&startDate=${data['startDate']}`
            }
            if (data['endDate']) {
                url = url + `&endDate=${data['endDate']}`
            }
            if (data['search']) {
                url = url + `&search=${data['search']}`
            }
        }
    } catch (e) {
        console.log(e)
    }
    try {
        const response = await api.get(`/referral/history${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//topbar summary

export const getTopBarSummary = async () => {
    try {
        const response = await api.get(`/dashboard/top`);
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




//binary

export const getBinary = async (data: any) => {
    let url = '';
    if (data.period) {
        url = `?period=${data.period}`
    } else {
        url = `?period=${data}`
    }
    if (data.user_id) {
        url = url + `&user_id=${data.user_id}`

    }
    try {
        const response = await api.get(`/affliate/leg-volumes${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBinaryDetails = async (data: any) => {
    let url = '';
    if (data) {
        if (data.user_id) {
            url = `?user_id=${data.user_id}`
        }
    }
    try {
        const response = await api.get(`/affliate/monthly-volumes${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserNftDetails = async () => {
    try {
        const response = await api.get(`/users/nft`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBinaryReferralCodes = async (data: any) => {
    let url = '';
    if (data) {
        if (data.user_id) {
            url = `?user_id=${data.user_id}`
        }
    }
    try {
        const response = await api.get(`/user/referral-codes${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBinarySummary = async (period: any) => {
    try {
        const response = await api.get(`/affiliate/summary?period=${period}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUnilevelSummary = async (period: any) => {
    try {
        const response = await api.get(`/unilevel/commission-summary?period=${period}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUnilevelGraph = async (period: any) => {
    try {
        const response = await api.get(`/unilevel/graph?period=${period}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchUserCall = async (name: any) => {
    try {
        const response = await api.get(`/affliate/search-users?full_name=${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};