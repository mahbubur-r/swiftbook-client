import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaBars, FaTimes, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"}>Home</NavLink>
            <NavLink to="/books" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"}>Books</NavLink>
            {
                user ? (
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"}>Dashboard</NavLink>
                ) : null
            }
        </>
    );

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <nav className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-full mx-4 mt-2 max-w-7xl' : 'bg-transparent'}`}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <Logo />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8 bg-white/50 dark:bg-gray-800/50 px-8 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-sm">
                        {navLinks}
                    </div>

                    {/* Right Side Icons & Auth */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none transition-colors shadow-sm">
                            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="relative group">
                                    <button className="flex items-center focus:outline-none">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-primary object-cover shadow-md" />
                                        ) : (
                                            <FaUserCircle size={40} className="text-gray-400" />
                                        )}
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50 border border-gray-100 dark:border-gray-700">
                                        <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl mb-2">
                                            <p className="font-semibold truncate">{user.displayName || 'User'}</p>
                                        </div>
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Dashboard</Link>
                                        <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Logout</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary font-medium transition-colors">Login</Link>
                                <Link to="/register" className="px-5 py-2.5 bg-primary text-white rounded-full hover:bg-teal-600 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Register</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none">
                            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none p-2">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="lg:hidden pb-4 px-2 animate-fade-in-down">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 mt-2">
                            <div className="flex flex-col space-y-3">
                                {navLinks}
                                {user ? (
                                    <>
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                                            <div className="flex items-center space-x-3 mb-3 px-2">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-primary object-cover" />
                                                ) : (
                                                    <FaUserCircle size={32} className="text-gray-400" />
                                                )}
                                                <span className="text-gray-700 dark:text-gray-200 font-medium">{user.displayName}</span>
                                            </div>
                                            <button onClick={handleLogOut} className="w-full text-left px-2 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors">Logout</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <Link to="/login" className="px-2 py-2 text-gray-600 dark:text-gray-300 hover:text-primary">Login</Link>
                                        <Link to="/register" className="px-2 py-2 text-primary font-medium">Register</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
