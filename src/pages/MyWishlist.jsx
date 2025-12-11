import React from 'react';
import { motion } from "framer-motion";
import logo from '../assets/logo.png';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['wishlist', user?.email],
        enabled: !!user?.email,
        queryFn: async () => await axiosSecure.get(`/wishlist/${user.email}`).then(res => res.data)
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishlist/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Removed!",
                                text: "Book removed from wishlist.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Failed to remove book:', error);
                    });
            }
        });
    };

    return (
        <div className="w-full">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                    <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                    <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">My Wishlist</p>
                </div>
                <h2 className="text-xl md:text-3xl font-semibold text-center mt-6 text-primary">Total Wishlist Items: {wishlist.length}</h2>
            </div>

            {/* WISHLIST TABLE CARD */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-primary text-white text-lg">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">Book</th>
                                <th className="py-4 px-6">Author</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {wishlist.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                                        Your wishlist is empty.
                                    </td>
                                </tr>
                            ) : (
                                wishlist.map((item, index) => (
                                    <motion.tr
                                        key={item._id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>

                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4 min-w-[200px]">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{item.title}</p>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 text-lg whitespace-nowrap text-gray-700 dark:text-gray-300">{item.author}</td>
                                        <td className="py-4 px-6 text-lg whitespace-nowrap text-gray-700 dark:text-gray-300">{item.category}</td>

                                        <td className="py-4 px-6 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Link to={`/books/${item.bookId}`} className="px-3 md:px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm md:text-base whitespace-nowrap">
                                                    View Details
                                                </Link>
                                                <button onClick={() => handleDelete(item._id)} className="px-3 md:px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition text-sm md:text-base whitespace-nowrap">
                                                    Remove
                                                </button>
                                            </div>
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

export default MyWishlist;
