import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.config';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://swiftbook-server.vercel.app'
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(async function (config) {
            const token = await auth.currentUser?.getIdToken();
            // console.log('request stopped by interceptors', token)
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });


        // intercepts 401 and 403 status
        const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response?.status;
            // console.log('status error in the interceptor', status);
            // for 401 or 403 logout the user and move the user to the login
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }

    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
