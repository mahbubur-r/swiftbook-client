import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">SwiftBook</Link>
                <div className="space-x-4">
                    <Link to="/">Home</Link>
                    <Link to="/books">Books</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
