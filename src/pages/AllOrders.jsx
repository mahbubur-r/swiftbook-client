import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { motion } from "framer-motion";
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { format } from "date-fns";

const AllOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // fetch only orders for books added by this librarian
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['librarian-orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/librarian/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/orders/${id}`);
            toast.success("Order canceled successfully!");
            queryClient.invalidateQueries({ queryKey: ['librarian-orders', user?.email] });
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel order");
        }
    };

    const handleStatusChange = async (id, value) => {
        try {
            await axiosSecure.patch(`/orders/${id}`, { status: value });
            toast.success("Status updated!");
            queryClient.invalidateQueries({ queryKey: ['librarian-orders', user?.email] });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status");
        }
    };

    const formatPaymentStatus = (status) =>
        status ? status.charAt(0).toUpperCase() + status.slice(1) : "—";

    return (
        <div className="flex flex-col items-center mb-8 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">All Orders</p>
            </div>
            <h2 className="text-xl md:text-3xl font-semibold text-center mt-6 text-primary">
                Total Orders: {orders.length}
            </h2>

            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-6 w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left w-full">
                        <thead className="bg-primary text-white text-lg text-center">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">Book</th>
                                <th className="py-4 px-6">Customer Name</th>
                                <th className="py-4 px-6">Customer Email</th>
                                <th className="py-4 px-6">Order Date</th>
                                <th className="py-4 px-6">Payment</th>
                                <th className="py-4 px-6 text-center">Delivery Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-center">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-8">Loading...</td>
                                </tr>
                            ) : (
                                orders.map((order, index) => (
                                    <motion.tr
                                        key={order._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
                                        <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{order.bookTitle}</td>
                                        <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{order.customerName}</td>
                                        <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{order.customerEmail}</td>
                                        <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">
                                            {order.createdAt ? format(new Date(order.createdAt), "dd/MM/yy") : "—"}
                                        </td>
                                        <td className="py-4 px-6 text-lg text-green-600 dark:text-green-600">
                                            {formatPaymentStatus(order.paymentStatus)}
                                        </td>
                                        <td className="py-4 px-6 flex justify-center items-center gap-3">
                                            {/* Status Dropdown */}
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring focus:ring-blue-200"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>

                                            {/* Cancel Button */}
                                            <button
                                                onClick={() => handleDelete(order._id)}
                                                disabled={order.status !== "pending"}
                                                className={`px-4 py-2 rounded-xl font-semibold transition
                                                    ${order.status === "pending"
                                                        ? "bg-red-600 hover:bg-red-700 text-white"
                                                        : "bg-gray-400 text-white cursor-not-allowed"
                                                    }`}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
