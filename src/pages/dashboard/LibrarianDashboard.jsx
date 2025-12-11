import React from 'react';
import { FaBook, FaClipboardList, FaHeart } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LibrarianDashboard = () => {
    // Mock Data
    const booksAddedData = [
        { name: 'Jan', books: 12 },
        { name: 'Feb', books: 19 },
        { name: 'Mar', books: 8 },
        { name: 'Apr', books: 25 },
        { name: 'May', books: 32 },
        { name: 'Jun', books: 15 },
    ];

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">Librarian Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-teal-500 flex items-center gap-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
                        <FaBook size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Books Added</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">125</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                        <FaClipboardList size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders Processed</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">45</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-pink-500 flex items-center gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400">
                        <FaHeart size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Wishlist Items Managed</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">120</h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Books Added Over Time</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={booksAddedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Bar dataKey="books" fill="#0D9488" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default LibrarianDashboard;
