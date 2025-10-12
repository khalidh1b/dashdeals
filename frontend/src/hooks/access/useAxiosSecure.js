import axios from "axios";
import {useNavigate} from 'react-router-dom';
import useAuth from '@/hooks/auth/useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_backendUrl
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // Add a request interceptor for authorization token
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('dashdeals-access-token');
        if(!token) {
            console.error('No token found');
            navigate('/login');
            return Promise.reject(new Error('No token found'));
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, function(error) {
        return Promise.reject(error);
    });

    // Response interceptor to handle 401/403 errors
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function(error) {
        const status = error.response?.status;
        if(status === 401 || status === 403) {
            console.warn('Unauthorized — will retry after short delay');
            await new Promise(r => setTimeout(r, 300));
            const retryToken = localStorage.getItem('dashdeals-access-token');

             if(!retryToken) {
                logOut();
                navigate('/login');
            }
        }
    })

    return axiosSecure;
};

export default useAxiosSecure;