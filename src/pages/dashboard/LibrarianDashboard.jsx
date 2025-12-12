import React, { useEffect, useState } from "react";
import {
    FaBook,
    FaClock,
    FaCheckCircle,
    FaUsers,
    FaStar,
    FaHeart,
    FaMoneyBillWave
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

import useAuth from "../../hooks/useAuth"; // make sure your context provides currentUser and token
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DashboardSkeleton } from "../../components/SkeletonLoader";

const LibrarianDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [stats, setStats] = useState({
        books: 0,
        pending: 0,
        paid: 0,
        reviews: 0,
        wishlist: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get('/librarian-stats');

                const data = await res.data;

                setStats({
                    books: data.booksCount,
                    pending: data.pendingOrders,
                    paid: data.paidOrders,
                    reviews: data.reviewsCount,
                    wishlist: data.wishlistCount,
                });

            } catch (err) {
                console.error("Librarian stats fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, authLoading, axiosSecure]);

    const chartData = [
        { name: "Books", count: stats.books },
        { name: "Pending Orders", count: stats.pending },
        { name: "Paid Orders", count: stats.paid },
        { name: "Reviews", count: stats.reviews },
        { name: "Wishlist", count: stats.wishlist },
    ];

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">

            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
                Librarian Dashboard
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-10">
                <Stat label="Books" value={stats.books} icon={<FaBook />} color="blue" />
                <Stat label="Pending Orders" value={stats.pending} icon={<FaClock />} color="orange" />
                <Stat label="Paid Orders" value={stats.paid} icon={<FaCheckCircle />} color="green" />
                <Stat label="Reviews" value={stats.reviews} icon={<FaStar />} color="yellow" />
                <Stat label="Wishlist Items" value={stats.wishlist} icon={<FaHeart />} color="pink" />
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Library Statistics Overview
                </h3>

                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#22C55E" radius={[5, 5, 0, 0]} />
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
        orange: "text-orange-600 bg-orange-100 border-orange-500",
        green: "text-green-600 bg-green-100 border-green-500",
        purple: "text-purple-600 bg-purple-100 border-purple-500",
        yellow: "text-yellow-600 bg-yellow-100 border-yellow-500",
        pink: "text-pink-600 bg-pink-100 border-pink-500",
        teal: "text-teal-600 bg-teal-100 border-teal-500",
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

export default LibrarianDashboard;
