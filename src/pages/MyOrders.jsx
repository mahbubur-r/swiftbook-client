import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    // Fetch orders
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${user.email}`);
            return res.data;
        }
    });

    // Handle Stripe payment
    const handlePayment = async (order) => {
        try {
            const paymentInfo = {
                cost: order.price,
                bookId: order.bookId,
                bookTitle: order.bookTitle,
                customerEmail: order.customerEmail,
            };
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            window.location.assign(res.data.url); // redirect to Stripe
        } catch (err) {
            console.error("Payment failed:", err);
            Swal.fire("Error", "Failed to initiate payment. Please try again.", "error");
        }
    };

    // Handle order deletion
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Your order has been deleted.", "success");
                        }
                    })
                    .catch(err => console.error("Failed to delete order:", err));
            }
        });
    };

    // Auto-update orders if returning from Stripe checkout
    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(() => refetch())
                .catch(err => console.error("Payment update failed:", err));
        }
    }, [sessionId]);

    return (
        <div className="flex flex-col items-center mb-8 w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">My Orders</p>
            </div>
            <h2 className="text-xl md:text-3xl font-semibold text-center mt-6 text-primary">
                Total Orders: {orders.length}
            </h2>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-6 w-full">
                <div className="overflow-x-auto">
                    <table className="table-auto min-w-full w-full">
                        <thead className="bg-primary text-white text-lg text-center">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">Book</th>
                                <th className="py-4 px-6">Customer Name</th>
                                <th className="py-4 px-6">Customer Email</th>
                                <th className="py-4 px-6">Price</th>
                                <th className="py-4 px-6 text-center">Payment</th>
                                <th className="py-4 px-6 text-center">Remove</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-center">
                            {orders.map((order, index) => (
                                <motion.tr
                                    key={order._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4 min-w-[200px]">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                                <img src={order?.bookImage} alt={order?.bookTitle} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{order?.bookTitle}</p>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-lg whitespace-nowrap text-gray-700 dark:text-gray-300">{order?.customerName}</td>
                                    <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{order?.customerEmail}</td>
                                    <td className="py-4 px-6 text-lg text-gray-700 dark:text-gray-300">{order?.price}€</td>

                                    <td className="py-4 px-6 text-center">
                                        {order?.paymentStatus === 'paid' ? (
                                            <span className="text-green-400 font-semibold">Paid</span>
                                        ) : (
                                            <button
                                                onClick={() => handlePayment(order)}
                                                className="inline-block btn btn-primary px-3 md:px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition whitespace-nowrap text-sm md:text-base"
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                    </td>

                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className={`px-3 md:px-4 py-2 rounded-xl font-semibold transition whitespace-nowrap text-sm md:text-base
                        ${order?.paymentStatus === "unpaid" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}
                                            disabled={order?.paymentStatus !== "unpaid"} // disable if paid
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;