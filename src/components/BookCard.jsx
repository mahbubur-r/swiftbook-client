import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700">
            {/* Image Section - Fixed Height */}
            <div className="h-64 overflow-hidden relative group flex-shrink-0">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                    {book.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1" title={book.title}>
                    {book.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    by <span className="font-semibold text-gray-700 dark:text-gray-300">{book.author}</span>
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {book.description}
                </p>

                {/* Meta Info Row */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-bold text-gray-700 dark:text-gray-300">{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>{book.pages} Pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="uppercase">{book.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-base font-bold text-primary">{book.price}€</span>
                    </div>

                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between mt-auto w-full">
                    <Link
                        to={`/books/${book._id}`}
                        className="px-4 py-2 hover:bg-gray-900 dark:hover:bg-gray-700 text-white text-base text-center font-semibold rounded bg-primary transition-colors duration-300 w-full"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
