import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-gray-800 text-white">
                {/* Sidebar Content Placeholder */}
                <div className="p-4">Sidebar</div>
            </div>
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
