import axios from 'axios';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase.config';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {

            // Remove previous interceptor to avoid stacking
            axiosSecure.interceptors.request.handlers = [];

            axiosSecure.interceptors.request.use(async (config) => {
                const token = await currentUser?.getIdToken();
                console.log("CLIENT TOKEN:", token);

                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            });
        });

        return () => unsubscribe();
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;
