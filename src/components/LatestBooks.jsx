import { Link } from "react-router-dom";

const LatestBooks = () => {
    // Placeholder data
    const books = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", category: "Classic" },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop", category: "Fiction" },
        { id: 3, title: "1984", author: "George Orwell", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop", category: "Dystopian" },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", category: "Romance" },
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Additions</h2>
                    <p className="text-gray-600 dark:text-gray-300">Check out the newest books added to our collection.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-64 overflow-hidden">
                                <img src={book.image} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{book.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-1">{book.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">by {book.author}</p>
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 rounded hover:bg-primary transition-colors duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
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
