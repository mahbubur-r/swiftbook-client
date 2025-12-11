
import React from 'react';
import { FaUsers, FaBook, FaClipboardList, FaHeart, FaMoneyBillWave } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {

    // Fetching real data counts (simulated for now with mock data if endpoints don't exist)
    // In a real app, you'd have an endpoint like /admin-stats

    // Mock Data for Charts
    const userGrowthData = [
        { name: 'Jan', users: 400 },
        { name: 'Feb', users: 600 },
        { name: 'Mar', users: 800 },
        { name: 'Apr', users: 1200 },
        { name: 'May', users: 1500 },
        { name: 'Jun', users: 1800 },
    ];

    const revenueData = [
        { name: 'Jan', revenue: 2400 },
        { name: 'Feb', revenue: 1398 },
        { name: 'Mar', revenue: 9800 },
        { name: 'Apr', revenue: 3908 },
        { name: 'May', revenue: 4800 },
        { name: 'Jun', revenue: 3800 },
    ];

    const orderData = [
        { name: 'Mon', orders: 20 },
        { name: 'Tue', orders: 35 },
        { name: 'Wed', orders: 50 },
        { name: 'Thu', orders: 45 },
        { name: 'Fri', orders: 60 },
        { name: 'Sat', orders: 80 },
        { name: 'Sun', orders: 75 },
    ];

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">1,250</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-teal-500 flex items-center gap-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
                        <FaBook size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Books</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">450</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                        <FaClipboardList size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">320</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-pink-500 flex items-center gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400">
                        <FaHeart size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Wishlist</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">850</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-green-500 flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                        <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Payments</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">$25,400</h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Users Growth Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">User Growth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Revenue per Month</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Legend />
                                <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Orders Area Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Orders per Day</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={orderData}>
                            <defs>
                                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Area type="monotone" dataKey="orders" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorOrders)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
