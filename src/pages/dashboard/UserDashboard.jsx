import React, { useEffect, useState } from "react";
import {
    FaBook,
    FaHeart,
    FaStar,
    FaMoneyBillWave,
} from "react-icons/fa";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DashboardSkeleton } from "../../components/SkeletonLoader";

const UserDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [stats, setStats] = useState({
        orders: 0,
        wishlist: 0,
        reviews: 0,
        payments: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get(`/user-stats/${user.email}`);
                setStats({
                    orders: res.data.orders,
                    wishlist: res.data.wishlist,
                    reviews: res.data.reviews,
                    payments: res.data.payments,
                });
            } catch (err) {
                console.error("User stats fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, authLoading, axiosSecure]);

    const chartData = [
        { name: "Orders", count: stats.orders },
        { name: "Wishlist", count: stats.wishlist },
        { name: "Reviews", count: stats.reviews },
        { name: "Payments", count: stats.payments },
    ];

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">

            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
                User Dashboard
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                <Stat label="Orders" value={stats.orders} icon={<FaBook />} color="blue" />

                <Stat label="Wishlist Items" value={stats.wishlist} icon={<FaHeart />} color="pink" />

                <Stat label="Reviews" value={stats.reviews} icon={<FaStar />} color="yellow" />

                <Stat label="Payments" value={stats.payments} icon={<FaMoneyBillWave />} color="green" />

            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Your Activity Overview
                </h3>

                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

const Stat = ({ label, value, icon, color }) => {
    const colors = {
        blue: "text-blue-600 bg-blue-100 border-blue-500",
        green: "text-green-600 bg-green-100 border-green-500",
        yellow: "text-yellow-600 bg-yellow-100 border-yellow-500",
        pink: "text-pink-600 bg-pink-100 border-pink-500",
    };

    return (
        <div className={`flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-l-4 ${colors[color].split(" ")[2]}`}>
            <div className={`p-3 rounded-full ${colors[color].split(" ").slice(0, 2).join(" ")}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">{label}</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
            </div>
        </div>
    );
};

export default UserDashboard;
