import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaBook, FaHome, FaUser, FaTachometerAlt, FaPlus, FaShoppingCart } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import Logo from "../components/Logo";
import LogoImg from "../assets/logo.png";
import { FaUserShield } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { role } = useRole();
    const { user } = useAuth();
    const location = useLocation();

    // Close sidebar on route change for mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-display">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-30 w-64 bg-background-dark text-white 
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:inset-auto
                `}
            >
                <div className="h-20 flex items-center justify-center border-b border-gray-700 bg-background-dark sticky top-0 z-10">
                    <NavLink to="/" className="flex items-center">
                        <div className="mr-5">
                            <Logo />
                        </div>
                    </NavLink>
                </div>

                <nav className="flex-1 py-6 overflow-y-auto h-[calc(100vh-5rem)]">
                    <ul className="space-y-2 px-2">
                        <li>
                            <NavLink
                                to="/"
                                className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                <FaHome className="text-xl" />
                                <span className="ml-3">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaTachometerAlt className="text-xl" />
                                <span className="ml-3">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                }
                            >
                                <FaUser className="text-xl" />
                                <span className="ml-3">Profile</span>
                            </NavLink>
                        </li>
                        {
                            role === 'admin' && <>
                                {/* Manage Books */}
                                <li>
                                    <NavLink
                                        to="/dashboard/manage-books"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <LuNotebookPen className="text-xl" />
                                        <span className="ml-3">Manage Books</span>
                                    </NavLink>
                                </li>
                                {/* All Users */}
                                <li>
                                    <NavLink
                                        to="/dashboard/all-users"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaUserShield className="text-xl" />
                                        <span className="ml-3">All Users</span>
                                    </NavLink>
                                </li>
                                {/* Users Management */}
                                <li>
                                    <NavLink
                                        to="/dashboard/users-management"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaUserShield className="text-xl" />
                                        <span className="ml-3">Users Management</span>
                                    </NavLink>
                                </li>
                                {/* All Orders */}
                                <li>
                                    <NavLink
                                        to="/dashboard/all-orders"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <TbTruckDelivery className="text-xl" />
                                        <span className="ml-3">All Orders</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            (role === 'librarian') && <>
                                {/* My Books */}
                                <li>
                                    <NavLink
                                        to="/dashboard/my-books"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaBook className="text-xl" />
                                        <span className="ml-3">My Books</span>
                                    </NavLink>
                                </li>
                                {/* Add Book */}
                                <li>
                                    <NavLink
                                        to="/dashboard/add-book"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaPlus className="text-xl" />
                                        <span className="ml-3">Add Book</span>
                                    </NavLink>
                                </li>
                                {/* All Orders */}
                                <li>
                                    <NavLink
                                        to="/dashboard/all-orders"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <TbTruckDelivery className="text-xl" />
                                        <span className="ml-3">All Orders</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            (role === 'user' && <>
                                {/* My Wishlist */}
                                <li>
                                    <NavLink
                                        to="/dashboard/my-wishlist"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaBook className="text-xl" />
                                        <span className="ml-3">My Wishlist</span>
                                    </NavLink>
                                </li>

                                {/* My Orders */}
                                <li>
                                    <NavLink
                                        to="/dashboard/my-orders"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaShoppingCart className="text-xl" />
                                        <span className="ml-3">My Orders</span>
                                    </NavLink>
                                </li>
                                {/* Invoices */}
                                <li>
                                    <NavLink
                                        to="/dashboard/payment-history"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                                        }
                                    >
                                        <FaFileInvoiceDollar className="text-xl" />
                                        <span className="ml-3">Invoices</span>
                                    </NavLink>
                                </li>

                            </>)
                        }

                        <div className="border-t border-gray-700 my-4"></div>

                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Top Bar */}
                <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 w-full">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none lg:hidden"
                    >
                        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                    <div className="text-primary text-lg font-medium ml-4 lg:ml-0">
                        Welcome to Dashboard
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
