import api from './api';
import axios from 'axios';

export const fetchLocation = async () => {
    try {
        const response = await api.get(`/map/latitude-longitude?affiliate=true`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchVisitByCountry = async () => {
    try {
        const response = await api.get(`/admin/team/country-details`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const fetchVisitSummary = async () => {
    try {
        const response = await api.get(`/admin/team/summary`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


