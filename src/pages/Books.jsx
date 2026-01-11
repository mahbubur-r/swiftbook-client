import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import BookCard from "../components/BookCard";

const Books = () => {
    const axiosSecure = useAxiosSecure();
    const { data: books } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get('/books/published').then(res => res.data),
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("default");

    // Filter and Sort Logic
    let processedBooks = books || [];

    // 1. Filter by Search Query
    if (searchQuery) {
        processedBooks = processedBooks.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // 2. Sort by Price
    if (sortOption === "price-asc") {
        processedBooks = [...processedBooks].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "price-desc") {
        processedBooks = [...processedBooks].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-center text-primary text-3xl font-extrabold mb-8 mt-16 font-display">
                Browse Our Collection
            </h1>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                {/* Search Input */}
                <div className="w-full md:w-1/2 relative">
                    <input
                        type="text"
                        placeholder="Search by book title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Sort Select */}
                <div className="w-full md:w-auto flex items-center gap-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
                Found {processedBooks.length} book{processedBooks.length !== 1 ? 's' : ''}
            </p>

            {/* Books Grid */}
            {processedBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {processedBooks.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No books found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
                </div>
            )}
        </div>
    );
};

export default Books;
