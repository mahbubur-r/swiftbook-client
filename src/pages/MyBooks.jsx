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
        queryFn: async () => await axiosSecure.get(`/books/${user.email}`).then(res => res.data)
    });

    return (
        <div className="p-6 w-full">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                    <p className="text-5xl font-extrabold text-primary tracking-wide">My Books</p>
                </div>
                <h2 className="text-3xl font-semibold text-center mt-6 text-primary">Total Added Books: {books.length}</h2>
            </div>

            {/* BOOKS TABLE CARD */}
            <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
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

                        <tbody className="divide-y">
                            {books.map((book, index) => (
                                <motion.tr
                                    key={book._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="py-4 px-6 font-medium">{index + 1}</td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md">
                                                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="font-semibold text-lg">{book.title}</p>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-lg">{book.author}</td>
                                    <td className="py-4 px-6 text-lg">{book.category}</td>

                                    <td className="py-4 px-6 flex justify-center gap-3">
                                        <Link to={`/dashboard/my-books/${book._id}`} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
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