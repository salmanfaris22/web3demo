import axios from 'axios';
import { EXDEX_API_URL } from '../config';
import store from '../store';
import { clearUserAndToken, selectTenxToken } from '../store/authSlice';
import { showToast } from '../store/toastSlice';

const exDexApi = axios.create({
    baseURL: EXDEX_API_URL,
});

exDexApi.interceptors.request.use(
    (config) => {
        const token = selectTenxToken(store.getState());
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.UEeDeBjF7UnqTYouMWvCktNqEp2YvPf-td5tzYhIILU';
        if (token) {
            config.headers['Authorization'] = token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

exDexApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    console.error('Bad Request');
                    break;
                case 401:
                    console.error('Unauthorized: Please log in to continue.');
                    store.dispatch(clearUserAndToken())
                    store.dispatch(
                        showToast({
                            message: 'Please log in to continue',
                            type: 'error',
                            timeout: 5000,
                        })
                    );
                    window.location.replace('/login');
                    break;
                case 500:
                    console.error('Internal Server Error');
                    break;
                default:
                    console.error(`Error: ${status}`);
            }
        }
        return Promise.reject(error);
    }
);

export default exDexApi;