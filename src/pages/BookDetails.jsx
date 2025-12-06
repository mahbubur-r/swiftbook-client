import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa";

const BookDetails = () => {
    const { id } = useParams();

    // Mock Data (In a real app, fetch this from an API based on ID)
    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
            category: "Classic",
            rating: 4.8,
            pages: 180,
            language: "English",
            description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
            category: "Fiction",
            rating: 4.9,
            pages: 281,
            language: "English",
            description: "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize."
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
            category: "Dystopian",
            rating: 4.7,
            pages: 328,
            language: "English",
            description: "Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by the English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime."
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
            category: "Romance",
            rating: 4.6,
            pages: 279,
            language: "English",
            description: "Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness."
        },
    ];

    const book = books.find(b => b.id === parseInt(id));

    if (!book) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 font-display">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Book Not Found</h2>
                <Link to="/books" className="text-primary hover:underline">Back to Books</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-display py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Home
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
                                <button className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-teal-600 transition transform hover:-translate-y-1">
                                    Borrow Now
                                </button>
                                <button className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
