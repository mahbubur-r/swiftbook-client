import { FaTruck, FaBookOpen, FaClock, FaUserFriends } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaTruck className="text-4xl text-primary" />,
            title: "Fast Delivery",
            description: "Get your books delivered to your doorstep within 24 hours."
        },
        {
            icon: <FaBookOpen className="text-4xl text-primary" />,
            title: "Vast Collection",
            description: "Access thousands of books from multiple libraries in your city."
        },
        {
            icon: <FaClock className="text-4xl text-primary" />,
            title: "24/7 Support",
            description: "Our customer support team is always available to assist you."
        },
        {
            icon: <FaUserFriends className="text-4xl text-primary" />,
            title: "Community",
            description: "Join a community of book lovers and share your reviews."
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-gray-900 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose SwiftBook?</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We make borrowing books easier, faster, and more convenient than ever before.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-6 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-teal-50 dark:bg-gray-800 rounded-full">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
