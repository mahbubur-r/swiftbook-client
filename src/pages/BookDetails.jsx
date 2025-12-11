import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookDetailsSkeleton } from "../components/SkeletonLoader";

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

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const { data: books, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get('/books/published').then(res => res.data)
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



    return (
        <div className="min-h-screen bg-gray-50 mt-10 dark:bg-gray-900 font-display py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <Link to="/books" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Books
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
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

                {/* REVIEWS SECTION */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                        Reviews & Ratings ({reviews.length})
                    </h3>

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
