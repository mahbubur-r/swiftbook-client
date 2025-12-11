import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { BookCardSkeleton } from "./SkeletonLoader";

const LatestBooks = () => {
    const axiosSecure = useAxiosSecure();
    const { data: books, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get('/books/published').then(res => res.data)
    })
    console.log(books);

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Additions</h2>
                    <p className="text-gray-600 dark:text-gray-300">Check out the newest books added to our collection.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(3)].map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))
                    ) : (
                        books?.slice(0, 6).map((book) => (
                            <div key={book._id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                <div className="h-64 overflow-hidden flex-shrink-0">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{book.category}</span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-1 line-clamp-2">{book.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">by {book.author}</p>
                                    {/* Optional: Display description with line clamp if desired, but user didn't explicitly ask to show it, just to have consistent size. 
                                    I'll leave it out to keep card clean, or add it if user wants. 
                                    For now, keeping it simple as per original design but with flex-grow to push button down. */}

                                    <div className="mt-auto">
                                        <Link to={`/books/${book._id}`} className="block w-full bg-gray-900 dark:bg-gray-600 text-white py-2 rounded hover:bg-primary transition-colors duration-300 text-center">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-center mt-12">
                    <Link to="/books" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-full transition duration-300">
                        View All Books
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestBooks;
