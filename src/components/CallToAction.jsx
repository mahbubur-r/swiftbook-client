import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <section className="py-20 bg-primary font-display overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-white mb-8 md:mb-0"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Reading?</h2>
                        <p className="text-lg md:text-xl opacity-90 mb-8">
                            Join thousands of readers who are discovering new worlds through SwiftBook.
                            Sign up today and get your first delivery free!
                        </p>
                        <Link to="/register" className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                            Create Account
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2670&auto=format&fit=crop"
                            alt="Reading"
                            className="rounded-lg shadow-2xl max-w-md w-full transform rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
