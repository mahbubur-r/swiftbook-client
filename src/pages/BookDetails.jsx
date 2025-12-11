import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BookDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        name: user?.displayName || '',
        email: user?.email || ''
    });

    const { data: books, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get('/books/published').then(res => res.data)
    });

    const book = books?.find(b => b._id === id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 font-display">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Book Not Found</h2>
                <Link to="/books" className="text-primary hover:underline">Back to Books</Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderData = {
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            customerAddress: formData.address,
            bookId: book._id,
            bookTitle: book.title,
            bookImage: book.image,
            price: book.price,
            // paymentStatus: 'pending', // Use 'pending' for payment status as well initially? Request said "unpaid" for payment status.
            // // Requirement: status="pending", paymentStatus="unpaid"
            status: 'pending',
            paymentStatus: 'unpaid'
        };

        axiosSecure.post('/orders', orderData)
            .then(res => {
                if (res.data.insertedId) {
                    setShowModal(false);
                    Swal.fire("Success!", "Order placed successfully!", "success");
                    navigate('/dashboard/my-orders');
                }
            })
            .catch(err => {
                console.error("Order failed", err);
                Swal.fire("Error", "Failed to place order", "error");
            });
    };

    const handleAddToWishlist = () => {
        if (!user) {
            Swal.fire({
                title: "Login Required",
                text: "Please login to add books to your wishlist.",
                icon: "warning"
            });
            // optional: navigate('/login');
            return;
        }

        const wishlistData = {
            bookId: book._id,
            title: book.title,
            image: book.image,
            author: book.author,
            category: book.category,
            userEmail: user.email,
            addedAt: new Date()
        };

        axiosSecure.post('/wishlist', wishlistData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Added!",
                        text: `${book.title} has been added to your wishlist.`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            })
            .catch(err => {
                console.error("Failed to add to wishlist", err);
                Swal.fire({
                    title: "Error",
                    text: "Could not add to wishlist. It might already be there!",
                    icon: "error"
                });
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-10 dark:bg-gray-900 font-display py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <Link to="/books" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Books
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/3 h-96 md:h-auto relative">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {book.category}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    {book.title}
                                </h1>
                                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-lg">
                                    <FaStar className="text-yellow-500 mr-1" />
                                    <span className="font-bold text-yellow-700 dark:text-yellow-500">{book.rating}</span>
                                </div>
                            </div>

                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                by <span className="font-semibold text-gray-800 dark:text-gray-100">{book.author}</span>
                            </p>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                Price <span className="font-semibold text-gray-800 dark:text-gray-100">{book.price}€</span>
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                                    <span className="block font-bold text-gray-800 dark:text-gray-200">{book.pages}</span>
                                    Pages
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                                    <span className="block font-bold text-gray-800 dark:text-gray-200">{book.language}</span>
                                    Language
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                {book.description}
                            </p>

                            <div className="flex gap-4">
                                <button onClick={() => setShowModal(true)} className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-teal-600 transition transform hover:-translate-y-1">
                                    Order Now
                                </button>
                                <button onClick={handleAddToWishlist} className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Place Order</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 transition">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1234567890"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter full address"
                                    rows="3"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-teal-600 transition transform hover:-translate-y-1 mt-4"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;
