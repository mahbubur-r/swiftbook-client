import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Books = () => {
    const axiosSecure = useAxiosSecure();
    const { data: books } = useQuery({
        queryKey: ['books'],
        queryFn: async () => await axiosSecure.get('/books/published').then(res => res.data),
    })
    console.log(books);
    return (
        <div className="">
            <h1 className=" mt-25 text-center text-primary text-2xl font-semibold">Total Books Founds: {books?.length}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 p-5">
                {
                    books?.map(book => (
                        <div key={book._id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-64 overflow-hidden">
                                <img src={book.image} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{book.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-1">{book.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">by {book.author}</p>
                                <Link to={`/books/${book._id}`} className="block w-full bg-gray-900 dark:bg-gray-600 text-white py-2 rounded hover:bg-primary transition-colors duration-300 text-center">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Books;
