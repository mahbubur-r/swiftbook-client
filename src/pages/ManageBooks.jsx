import React from 'react';
import { motion } from "framer-motion";
import logo from '../assets/logo.png';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

const ManageBooks = () => {
    const axiosSecure = useAxiosSecure();
    const { data: books = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get('/books').then(res => res.data)
    });

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
                axiosSecure.delete(`/books/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Failed to delete book:', error);
                    });
            }
        });
    };

    return (
        <div className="p-6 w-full">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                    <p className="text-5xl font-extrabold text-primary tracking-wide">Manage Books</p>
                </div>
                <h2 className="text-3xl font-semibold text-center mt-6 text-primary">Total Books: {books.length}</h2>
            </div>

            {/* PURE TAILWIND TABLE CARD */}
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

                                        <td className="py-4 px-6 flex justify-center gap-3">
                                            <Link to={`/dashboard/manage-books/${book._id}`} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                                                Update
                                            </Link>
                                            <button onClick={() => handleDelete(book._id)} className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                                                Delete
                                            </button>
                                        </td>
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

export default ManageBooks;