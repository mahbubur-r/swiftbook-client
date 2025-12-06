import { Link } from "react-router-dom";

const PopularCategories = () => {
    const categories = [
        { id: 1, name: "Fiction", count: "1200+ Books", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop", color: "bg-purple-600" },
        { id: 2, name: "Science & Tech", count: "850+ Books", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop", color: "bg-blue-600" },
        { id: 3, name: "History", count: "600+ Books", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop", color: "bg-amber-600" },
        { id: 4, name: "Biography", count: "450+ Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", color: "bg-emerald-600" },
        { id: 5, name: "Children", count: "900+ Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", color: "bg-pink-600" },
        { id: 6, name: "Mystery", count: "750+ Books", image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=800&auto=format&fit=crop", color: "bg-slate-600" },
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Categories</h2>
                        <p className="text-gray-600 dark:text-gray-300">Explore books by your favorite genres.</p>
                    </div>
                    <Link to="/books" className="hidden md:inline-block text-primary font-semibold hover:text-teal-700 transition">
                        View All Categories &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            to={`/books?category=${category.name}`}
                            key={category.id}
                            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-48"
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 ${category.color} opacity-70 group-hover:opacity-60 transition-opacity duration-300`}></div>
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                                <h3 className="text-2xl font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{category.name}</h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{category.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/books" className="text-primary font-semibold hover:text-teal-700 transition">
                        View All Categories &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
