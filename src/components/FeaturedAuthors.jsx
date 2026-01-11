import React from 'react';
import author1 from '../assets/author-1.png';
import author2 from '../assets/author-2.png';
import author3 from '../assets/author-3.png';
import author4 from '../assets/author-4.png';

const FeaturedAuthors = () => {
    const authors = [
        { id: 1, name: "Robert J. Sterling", genre: "Mystery & Thriller", image: author1 },
        { id: 2, name: "Eleanor Vance", genre: "Contemporary Fiction", image: author2 },
        { id: 3, name: "Marcus Thorne", genre: "Science Fiction", image: author3 },
        { id: 4, name: "Sarah Jenkins", genre: "Historical Fiction", image: author4 },
    ];

    return (
        <div className="py-20 bg-primary/5 py-16 dark:bg-gray-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Authors</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Meet the brilliant minds behind this month's top-rated stories.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {authors.map(author => (
                        <div key={author.id} className="group relative">
                            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                                <img src={author.image} alt={author.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <button className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">View Profile</button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">{author.name}</h3>
                            <p className="text-primary font-medium text-center">{author.genre}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedAuthors;
