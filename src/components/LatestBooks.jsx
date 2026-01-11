import BookCard from "./BookCard";
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
        <section className="py-16 bg-primary/5 py-16 dark:bg-gray-800/50 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Additions</h2>
                    <p className="text-gray-600 dark:text-gray-300">Check out the newest books added to our collection.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        [...Array(4)].map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))
                    ) : (
                        books?.slice(0, 8).map((book) => (
                            <BookCard key={book._id} book={book} />
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
