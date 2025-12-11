import React from 'react';
import { FaShoppingCart, FaMoneyCheckAlt, FaHeart } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const UserDashboard = () => {
    // Mock Data
    const activityData = [
        { name: 'Orders', value: 12 },
        { name: 'Wishlist', value: 25 },
        { name: 'Reviews', value: 8 },
        { name: 'Comments', value: 15 },
    ];

    const COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B'];

    const radarData = [
        { subject: 'Purchases', A: 120, fullMark: 150 },
        { subject: 'Wishlist', A: 98, fullMark: 150 },
        { subject: 'Reviews', A: 86, fullMark: 150 },
        { subject: 'Logins', A: 99, fullMark: 150 },
        { subject: 'Browsing', A: 85, fullMark: 150 },
        { subject: 'Support', A: 65, fullMark: 150 },
    ];

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">My Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                        <FaShoppingCart size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total My Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">12</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-green-500 flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                        <FaMoneyCheckAlt size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Payments</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">$450</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-pink-500 flex items-center gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400">
                        <FaHeart size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">My Wishlist</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">25</h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Distribution */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Activity Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {activityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Engagement Radar */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Engagement Overview</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                <Radar name="My Activity" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                                <Legend />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
