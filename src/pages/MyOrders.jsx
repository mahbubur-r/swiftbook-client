import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { motion } from "framer-motion";
import useAuth from '../hooks/useAuth';
// import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.email) return;  // prevents crash on refresh

        axiosSecure.get(`/orders/${user.email}`)
            .then(res => setOrders(res.data));
    }, [user]);


    return (
        < div className="flex flex-col items-center mb-8" >
            <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                <p className="text-5xl font-extrabold text-primary tracking-wide">My Orders</p>
            </div>
            <h2 className="text-3xl font-semibold text-center mt-6 text-primary">Total Orders:</h2>

            {/* All Orders Table */}
            <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="bg-primary text-white text-lg text-center">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">Book</th>
                                <th className="py-4 px-6">Customer Name</th>
                                <th className="py-4 px-6">Customer Email</th>
                                <th className="py-4 px-6">Price</th>
                                <th className="py-4 px-6 text-center">Payment</th>
                                <th className="py-4 px-6 text-center">Order</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y text-center">
                            {orders.map((order, index) => (
                                <motion.tr
                                    key={order._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="py-4 px-6 font-medium">{index + 1}</td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md">
                                                <img src={order?.bookImage} alt={order?.bookTitle} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="font-semibold text-lg">{order?.bookTitle}</p>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-lg">{order?.customerName}</td>
                                    <td className="py-4 px-6 text-lg">{order?.customerEmail}</td>
                                    <td className="py-4 px-6 text-lg">{order?.price}</td>
                                    <td className="py-4 px-6 text-center">
                                        <Link to={`/`} className="btn btn-primary px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                                            {order?.paymentStatus === "pending" ? "Pay Now" : "Paid"}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 text-cent  er">
                                        <button className=" btn btn-error px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                                            {order?.status === "pending" ? "Cancel" : "Delivered"}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
};

export default MyOrders;