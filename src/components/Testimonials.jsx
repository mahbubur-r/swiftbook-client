import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Avid Reader",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            quote: "SwiftBook has completely changed how I read. The delivery is always on time, and the selection is incredible. I love not having to worry about library hours!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Student",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            quote: "As a student, I need access to many books for research. SwiftBook saves me so much time. The app is super easy to use and the service is reliable.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Book Club Host",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            quote: "I recommend SwiftBook to everyone in my book club. It's affordable, convenient, and the books arrive in great condition. A must-have for book lovers.",
            rating: 4
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Readers Say</h2>
                    <p className="text-gray-600 dark:text-gray-300">Don't just take our word for it.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300">
                            <FaQuoteLeft className="text-4xl text-primary/20 absolute top-6 left-6" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} />
                                    ))}
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-8 italic leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
