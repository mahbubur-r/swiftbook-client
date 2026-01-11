import React from 'react';
import { FaBook, FaUsers, FaAward, FaBuilding } from 'react-icons/fa';

const Stats = () => {
    return (
        <div className="bg-primary/5 py-16 dark:bg-gray-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <FaBook size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">10k+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Books Available</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <FaUsers size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">50k+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Registered Users</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <FaAward size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">15+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Awards Won</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <FaBuilding size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">200+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Publisher Partners</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
