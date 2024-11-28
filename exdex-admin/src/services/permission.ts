import api from './api';

export const getPermissionsUsers = async (url: string) => {
    try {
        const response = await api.get(`/admin/permissions/admin-permissions${url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPermissions = async () => {
    try {
        const response = await api.get(`/admin/permissions/all`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const exportUserProfile = async (data: any) => {
    try {
        const response = await api.get(`admin/permissions/staff-permissions-export${data.url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchUserProfileListing = async (data: any) => {
    try {
        const response = await api.get(`/admin/users/list${data.url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchStaffProfileListing = async (data: any) => {
    try {
        const response = await api.get(`/admin/permissions/staff/search${data.url}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const addStaff = async (data: any) => {
    try {
        const response = await api.post(`/admin/permissions/staff`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateStaff = async (data: any, id: any) => {
    try {
        const response = await api.post(`/admin/permissions/staff/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserDetailsFromId = async (id: any) => {
    try {
        const response = await api.get(`/admin/permissions/admin-permissions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
