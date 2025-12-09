import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaBook, FaHome, FaUser, FaSignOutAlt, FaTachometerAlt, FaPlus, FaShoppingCart } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import Logo from "../components/Logo";
import LogoImg from "../assets/logo.png";
import { FaUserShield } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-display">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-background-dark text-white transition-all duration-300 flex flex-col fixed h-full z-20`}
            >
                <NavLink to="/" className="h-20 flex items-center justify-center border-b border-gray-700">
                    {isSidebarOpen ? (
                        <div className="mr-5">
                            <Logo />
                        </div>
                    ) : (
                        <img src={LogoImg} alt="Logo" className="w-12 h-12" />
                    )}
                </NavLink>

                <nav className="flex-1 py-6 overflow-y-auto">
                    <ul className="space-y-2 px-2">
                        <li>
                            <NavLink
                                to="/"
                                className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                <FaHome className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaTachometerAlt className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaUser className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/manage-books"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <LuNotebookPen className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Manage Books</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/all-users"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaUserShield className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>All Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/users-management"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaUserShield className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Users Management</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/my-books"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaBook className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>My Books</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/add-book"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaPlus className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Add Book</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/all-orders"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <TbTruckDelivery className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>All Orders</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/my-orders"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaShoppingCart className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>My Orders</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/invoices"
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaFileInvoiceDollar className="text-xl" />
                                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Invoices</span>
                            </NavLink>
                        </li>
                        <div className="border-t border-gray-700 my-4"></div>

                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar */}
                <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
                    >
                        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                    <div className="text-primary font-medium">
                        Welcome to Dashboard
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
