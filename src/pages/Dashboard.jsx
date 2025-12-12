import React from 'react';
import useRole from "../hooks/useRole";
import AdminDashboard from "./dashboard/AdminDashboard";
import LibrarianDashboard from "./dashboard/LibrarianDashboard";
import UserDashboard from "./dashboard/UserDashboard";
import Loading from "./Loading";

const Dashboard = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            {role === 'admin' && <AdminDashboard />}
            {role === 'librarian' && <LibrarianDashboard />}
            {role === 'user' && <UserDashboard />}

            {!['admin', 'librarian', 'user'].includes(role) && (
                <div className="text-center p-8 bg-yellow-50 text-yellow-800 rounded-lg">
                    <p className="font-bold">No dashboard found for role: {String(role)}</p>
                    <p>Please contact support or try logging out and back in.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;


