import React from 'react';
import { motion } from "framer-motion";
import logo from '../assets/logo.png';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const MyBooks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get(`/books/by-user/${user.email}`).then(res => res.data)
    });

    return (
        <div className="w-full">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                    <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                    <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">My Books</p>
                </div>
                <h2 className="text-xl md:text-3xl font-semibold text-center mt-6 text-primary">Total Added Books: {books.length}</h2>
            </div>

            {/* BOOKS TABLE CARD */}
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
                            {books.map((book, index) => (
                                <motion.tr
                                    key={book._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4 min-w-[200px]">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{book.title}</p>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-lg whitespace-nowrap text-gray-700 dark:text-gray-300">{book.author}</td>
                                    <td className="py-4 px-6 text-lg whitespace-nowrap text-gray-700 dark:text-gray-300">{book.category}</td>

                                    <td className="py-4 px-6 text-center">
                                        <Link to={`/dashboard/my-books/${book._id}`} className="inline-block px-3 md:px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition whitespace-nowrap text-sm md:text-base">
                                            Update
                                        </Link>
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

export default MyBooks;