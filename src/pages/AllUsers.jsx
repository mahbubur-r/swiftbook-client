import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { motion } from "framer-motion";
import logo from '../assets/logo.png';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get('/users') // fetch all users
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                    <p className="text-5xl font-extrabold text-primary tracking-wide">All Users</p>
                </div>
                <h2 className="text-3xl font-semibold text-center mt-6 text-primary">Total Users: {users.length}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <motion.div
                        key={user._id}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={user.photoURL || '/default-avatar.png'}
                            alt={user.name}
                            className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                        />
                        <p className="text-2xl font-semibold">{user.name}</p>
                        <p className="text-lg text-gray-600">{user.email}</p>
                        <p className="text-lg text-gray-600">Role: {user.role}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
