import React from 'react';
import logo from '../assets/logo.png'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })
    // console.log(users);

    const handleRemoveUser = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
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

    const handleRoleChange = (id, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: role === "user" ?
                "You will remove this user's privileges" :
                `You want to make this user a ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${id}`, { role })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch(); // reload user list
                            Swal.fire({
                                title: "Success!",
                                text: role === "user" ? "Role removed." : `User is now a ${role}.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };


    return (
        <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                <p className="text-5xl font-extrabold text-primary tracking-wide">Users Management</p>
            </div>
            <h2 className="text-3xl font-semibold text-center mt-6 text-primary">Total Registered Users: {users?.length}</h2>

            {/* All Users Table */}
            <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden mt-6 p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left divide-y divide-gray-200">
                        <thead className="bg-primary text-white text-lg">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">User Name</th>
                                <th className="py-4 px-6">User Email</th>
                                <th className="py-4 px-6">Role</th>
                                {/* <th className="py-4 px-6">Created At</th> */}
                                <th className="py-4 px-6 text-center">Role Change</th>
                                <th className="py-4 px-6 text-center">Remove</th>
                            </tr>
                        </thead>

                        {
                            users?.map((user, index) => (
                                <motion.tr
                                    key={user._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="py-4 px-6 font-medium">{index + 1}</td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md">
                                                <img src={user?.photoURL} alt={user?.displayName} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="font-semibold text-lg">{user?.name}</p>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-lg">{user?.email}</td>
                                    <td className="py-4 px-6 text-lg">{user?.role}</td>
                                    {/* <td className="py-4 px-6 text-lg">{user?.createdAt && new Date(user.createdAt).toLocaleDateString()}</td> */}

                                    <td className="py-4 px-6 flex justify-center gap-3">
                                        {/* Make Admin */}
                                        {user.role !== "admin" && (
                                            <button
                                                onClick={() => handleRoleChange(user._id, "admin")}
                                                className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                                                Make Admin
                                            </button>
                                        )}
                                        {/* Make Librarian */}
                                        {user.role !== "librarian" && (
                                            <button
                                                onClick={() => handleRoleChange(user._id, "librarian")}
                                                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                            >
                                                Make Librarian
                                            </button>
                                        )}

                                        {/* Remove Role */}
                                        {user.role !== "user" && (
                                            <button
                                                onClick={() => handleRoleChange(user._id, "user")}
                                                className="px-4 py-2 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-blue-700 transition"
                                            >
                                                Remove Role
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {/* Remove User*/}
                                        <button onClick={() => handleRemoveUser(user._id)} className="px-4 mb-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-blue-700 transition">
                                            Remove User
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    )
};

export default UsersManagement;