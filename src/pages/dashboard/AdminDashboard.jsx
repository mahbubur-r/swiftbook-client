import { useEffect, useState } from "react";
import {
    FaUsers,
    FaBook,
    FaClipboardList,
    FaHeart,
    FaMoneyBillWave,
    FaStar,
} from "react-icons/fa";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
import useAuth from "../../hooks/useAuth"; // make sure your context provides currentUser and token
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DashboardSkeleton } from "../../components/SkeletonLoader";

const AdminDashboard = () => {
    const { user, loading: authLoading } = useAuth(); // currentUser from Firebase
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        users: 0,
        books: 0,
        orders: 0,
        wishlist: 0,
        reviews: 0,
        payments: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (authLoading || !user) return;

            try {
                const res = await axiosSecure.get('/admin-stats');

                if (!res.data) throw new Error("Failed to fetch stats");

                const data = res.data;
                setStats({
                    users: data.usersCount,
                    books: data.booksCount,
                    orders: data.ordersCount,
                    wishlist: data.wishlistCount,
                    reviews: data.reviewsCount,
                    payments: data.paymentsCount,
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, authLoading, axiosSecure]);

    // Prepare data for bar chart
    const chartData = [
        { name: "Users", count: stats.users },
        { name: "Books", count: stats.books },
        { name: "Orders", count: stats.orders },
        { name: "Wishlist", count: stats.wishlist },
        { name: "Reviews", count: stats.reviews },
        { name: "Payments", count: stats.payments },
    ];

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen font-display">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
                Admin Dashboard
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <StatCard icon={<FaUsers />} label="Total Users" value={stats.users} color="blue" />
                <StatCard icon={<FaBook />} label="Total Books" value={stats.books} color="teal" />
                <StatCard icon={<FaClipboardList />} label="Total Orders" value={stats.orders} color="purple" />
                <StatCard icon={<FaHeart />} label="Total Wishlist" value={stats.wishlist} color="pink" />
                <StatCard icon={<FaMoneyBillWave />} label="Total Payments" value={`$${stats.payments}`} color="green" />
                <StatCard icon={<FaStar />} label="Total Reviews" value={stats.reviews} color="yellow" />
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Collection Counts
                </h3>
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1F2937",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#fff",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    const colorMap = {
        blue: ["bg-blue-100", "text-blue-600", "border-blue-500"],
        teal: ["bg-teal-100", "text-teal-600", "border-teal-500"],
        purple: ["bg-purple-100", "text-purple-600", "border-purple-500"],
        pink: ["bg-pink-100", "text-pink-600", "border-pink-500"],
        green: ["bg-green-100", "text-green-600", "border-green-500"],
        yellow: ["bg-yellow-100", "text-yellow-600", "border-yellow-500"],
    };
    const [bg, text, border] = colorMap[color] || colorMap.blue;

    return (
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 ${border} flex items-center gap-4`}>
            <div className={`p-3 ${bg} rounded-full ${text}`}>{icon}</div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
            </div>
        </div>
    );
};

export default AdminDashboard;
