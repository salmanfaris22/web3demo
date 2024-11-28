import api from './api';
import axios from 'axios';

export const fetchLocation = async (url?: string) => {
    try {
        const response = await api.get(`/map/latitude-longitude${url ? '?affiliate=true' : ''}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchVisitByCountry = async () => {
    try {
        const response = await api.get(`/map/countries/top`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const fetchVisitSummary = async () => {
    try {
        const response = await api.get(`/team/summary`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


