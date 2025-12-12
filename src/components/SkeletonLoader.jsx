import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}></div>
    );
};

export const BookCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
            <Skeleton className="h-64 w-full" />
            <div className="p-6 flex flex-col flex-grow gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="mt-auto pt-4">
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
};

export const BookTableSkeleton = () => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-6 md:px-0">
                        <Skeleton className="h-4 w-8" />
                    </td>
                    <td className="py-4 px-6 md:px-0">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-14 h-14 rounded-xl" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </td>
                    <td className="py-4 px-6 md:px-0">
                        <Skeleton className="h-5 w-24" />
                    </td>
                    <td className="py-4 px-6 md:px-0">
                        <Skeleton className="h-5 w-20" />
                    </td>
                    <td className="py-4 px-6 md:px-0 text-center">
                        <Skeleton className="h-9 w-20 mx-auto rounded-xl" />
                    </td>
                </tr>
            ))}
        </>
    );
};

export const BookDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 mt-10 dark:bg-gray-900 font-display py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Skeleton className="h-6 w-32" />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
                    <div className="md:flex">
                        {/* Image Section Skeleton */}
                        <div className="md:w-1/3 h-96 md:h-auto relative">
                            <Skeleton className="w-full h-full" />
                        </div>

                        {/* Content Section Skeleton */}
                        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-10 w-3/4" />
                                <Skeleton className="h-8 w-16" />
                            </div>

                            <Skeleton className="h-6 w-40 mb-6" />
                            <Skeleton className="h-6 w-32 mb-6" />

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <Skeleton className="h-20 w-full rounded-lg" />
                                <Skeleton className="h-20 w-full rounded-lg" />
                            </div>

                            <Skeleton className="h-6 w-24 mb-3" />
                            <div className="space-y-2 mb-8">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            <div className="flex gap-4">
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DashboardSkeleton = () => {
    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">
            {/* Header Skeleton */}
            <Skeleton className="h-10 w-64 mb-8" />

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-gray-200 dark:border-gray-700 flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="h-96 w-full">
                    <Skeleton className="w-full h-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
