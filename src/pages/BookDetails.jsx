import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar, FaTimes } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookDetailsSkeleton } from "../components/SkeletonLoader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BookDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        name: user?.displayName || '',
        email: user?.email || ''
    });

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [activeTab, setActiveTab] = useState("specifications");

    const { data: books, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosPublic.get('/books/published').then(res => res.data)
    });

    const book = books?.find(b => b._id === id);

    // Fetch orders to check if user has purchased this book
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => await axiosSecure.get(`/orders/${user.email}`).then(res => res.data)
    });

    const hasOrdered = orders.some(order => order.bookId === id);

    // Fetch reviews for this book
    /* 
       Note: The reviews query depends on 'id'. 
       Since 'id' comes from useParams() at the top level, it is always available.
       We can safely call this hook here.
    */
    const { data: reviews = [], refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => await axiosSecure.get(`/reviews/${id}`).then(res => res.data)
    });

    const handleAddReview = (e) => {
        e.preventDefault();
        const reviewData = {
            bookId: id,
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
            rating,
            comment: reviewText,
            date: new Date()
        };

        axiosSecure.post('/reviews', reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Success", "Review added successfully!", "success");
                    setRating(0);
                    setReviewText("");
                    refetchReviews();
                }
            })
            .catch(err => {
                console.error("Failed to add review", err);
                Swal.fire("Error", "Failed to add review", "error");
            });
    };

    if (isLoading) {
        return <BookDetailsSkeleton />;
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





    const renderTabContent = () => {
        switch (activeTab) {
            case "specifications":
                return (
                    <div className="animate-in fade-in duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Product Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Author</span>
                                <span className="text-gray-900 dark:text-white font-semibold">{book.author}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Genre</span>
                                <span className="text-gray-900 dark:text-white font-semibold">{book.category}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Language</span>
                                <span className="text-gray-900 dark:text-white font-semibold">{book.language}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Pages</span>
                                <span className="text-gray-900 dark:text-white font-semibold">{book.pages}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Publisher</span>
                                <span className="text-gray-900 dark:text-white font-semibold">SwiftBook Press</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">ISBN</span>
                                <span className="text-gray-900 dark:text-white font-semibold">978-3-16-148410-0</span>
                            </div>
                        </div>
                    </div>
                );

            case "reviews":
                return (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews ({reviews.length})</h3>
                        </div>

                        {/* Review List */}
                        <div className="space-y-8 mb-12">
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 italic">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((review, idx) => (
                                    <div key={idx} className="flex gap-4 border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                                        <img src={review.userPhoto || "https://i.ibb.co/5GzXkwq/user.png"} alt="User" className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white">{review.userName}</h4>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">• {new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex text-yellow-400 mb-2 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add Review Form */}
                        {user && hasOrdered ? (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 md:p-8">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Leave a Review</h4>
                                <form onSubmit={handleAddReview}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className={`text-2xl focus:outline-none transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500 hover:text-yellow-200"}`}
                                                >
                                                    <FaStar />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                                        <textarea
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                            rows="4"
                                            placeholder="Share your thoughts about this book..."
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={rating === 0}
                                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-teal-600 transition transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        ) : (
                            user ? (
                                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-4 rounded-xl text-center">
                                    You must purchase this book to leave a review.
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
                                    <Link to="/login" className="text-primary font-bold hover:underline">Login</Link> to leave a review.
                                </div>
                            )
                        )}
                    </div>
                );
            case "overview":
                return (
                    <div className="animate-in fade-in duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Book Overview</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {book.description}
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-10 dark:bg-gray-900 font-display py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <Link to="/books" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Books
                </Link>

                {/* Top Section: Info & Image */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-12">
                    <div className="md:flex">
                        {/* Image Gallery Side */}
                        <div className="md:w-5/12 p-8 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">
                            <div className="relative shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition duration-500">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-auto max-h-[500px] object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                    {book.category}
                                </div>
                            </div>
                        </div>

                        {/* Product Details Side */}
                        <div className="md:w-7/12 p-8 md:p-12 flex flex-col">
                            <div className="mb-2">
                                <span className="text-primary font-bold tracking-wider uppercase text-sm">{book.category}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {book.title}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex text-yellow-400 text-lg">
                                    <FaStar />
                                    <span className="ml-1 font-bold text-gray-900 dark:text-white">{book.rating}</span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-500 dark:text-gray-400">{reviews.length} Reviews</span>
                                <span className="text-gray-400">|</span>
                                <span className={`text-sm px-2 py-1 rounded ${book.status !== 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    In Stock
                                </span>
                            </div>

                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
                                {book.description}
                            </p>

                            <div className="mb-8">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price</p>
                                <p className="text-4xl font-bold text-primary">{book.price}€</p>
                            </div>
                            <div className="mb-8 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">About This Edition</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                                    Immerse yourself in this high-quality edition, crafted for the ultimate reading experience. From the crisp, legible type to the premium cover finish, every detail has been considered to maximize your enjoyment.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    This title serves as a perfect addition to your personal library or a thoughtful gift for the literary enthusiast in your life. Verified for authenticity and condition.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button onClick={() => setShowModal(true)} className="flex-1 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-lg text-lg">
                                    Order Now
                                </button>
                                <button onClick={handleAddToWishlist} className="flex-1 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold py-4 px-8 rounded-xl hover:border-gray-900 dark:hover:border-white transition-all text-lg">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Book Statistics</h3>
                    <div className="h-[400px] w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { name: 'Price', value: parseFloat(book.price) || 0, fill: '#8884d8' },
                                    { name: 'Rating', value: parseFloat(book.rating) || 0, fill: '#82ca9d' },
                                    { name: 'Reviews', value: reviews.length, fill: '#ffc658' },
                                    { name: 'Pages', value: parseInt(book.pages) || 0, fill: '#ff8042' }
                                ]}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Bar dataKey="value" name="Value" radius={[4, 4, 0, 0]} barSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bottom Section: Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12">
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            {['specifications', 'reviews', 'overview'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-bold text-lg capitalize transition-colors`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="min-h-[300px]">
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            {/* Order Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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
