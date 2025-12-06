import { motion } from "framer-motion";
import { FaSearch, FaCalendarCheck, FaTruck, FaBookReader } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaSearch />,
            title: "Browse & Select",
            description: "Search through our extensive catalog of books from local libraries."
        },
        {
            icon: <FaCalendarCheck />,
            title: "Schedule Delivery",
            description: "Choose a convenient delivery slot that works for your schedule."
        },
        {
            icon: <FaTruck />,
            title: "We Deliver",
            description: "Our courier brings the books directly to your doorstep."
        },
        {
            icon: <FaBookReader />,
            title: "Read & Return",
            description: "Enjoy your reading time and schedule a pickup when you're done."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section className="py-20 bg-white dark:bg-gray-900 font-display">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        How SwiftBook Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        Get your favorite books in 4 simple steps.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
                >
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex flex-col items-center text-center bg-white dark:bg-gray-900 p-4"
                        >
                            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl shadow-lg mb-6 relative z-10 border-4 border-white dark:border-gray-900">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
