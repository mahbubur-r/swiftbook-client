import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="bg-background-dark text-white pt-16 pb-8 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand & About */}
                    <div>
                        <div className="mb-4 bg-white rounded-lg inline-block p-2">
                            <Logo />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            SwiftBook is your premier library-to-home delivery service.
                            Borrow books from your local libraries and get them delivered right to your doorstep.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
                            <li><Link to="/books" className="text-gray-400 hover:text-primary transition">All Books</Link></li>
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-primary transition">Dashboard</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-primary transition">Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>123 Library Avenue</li>
                            <li>Book City, BK 12345</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: support@swiftbook.com</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition text-xl"><FaFacebook /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition text-xl"><FaXTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition text-xl"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition text-xl"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} SwiftBook. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
