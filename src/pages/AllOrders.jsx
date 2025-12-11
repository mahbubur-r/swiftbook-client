import React from 'react';
import logo from '../assets/logo.png'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { motion } from "framer-motion";
import useAuth from '../hooks/useAuth';
// import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const AllOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => await axiosSecure.get('/orders').then(res => res.data)
    });
    return (
        < div className="flex flex-col items-center mb-8 w-full" >
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">All Orders</p>
            </div>
            <h2 className="text-xl md:text-3xl font-semibold text-center mt-6 text-primary">Total Orders:</h2>

            {/* All Orders Table */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-6 w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left w-full">
                        <thead className="bg-primary text-white text-lg">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">Book</th>
                                <th className="py-4 px-6">Customer Name</th>
                                <th className="py-4 px-6">Customer Email</th>
                                <th className="py-4 px-6">Created At</th>
                                <th className="py-4 px-6 text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {/* {orders.map((order, index) => ( */}
                            <motion.tr
                                // key={order._id || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">1</td>

                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md">
                                            <img src={user?.photoURL} alt={user?.displayName} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{user?.displayName}</p>
                                    </div>
                                </td>

                                <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{user?.displayName}</td>
                                <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{user?.email}</td>
                                <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{new Date().toLocaleString()}</td>

                                <td className="py-4 px-6 flex justify-center gap-3">
                                    <Link to={`/`} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                                        Pending
                                    </Link>
                                    {/* pending/shipped/delivered */}
                                    {/* <button onClick={() => handleDelete(book._id)}  */}
                                    <button className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                                        Cancel
                                    </button>
                                </td>
                            </motion.tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
};

export default AllOrders;