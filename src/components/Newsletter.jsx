import React from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Subscribed!",
            text: "Thank you for subscribing to our newsletter.",
            icon: "success"
        });
        e.target.reset();
    };

    return (
        <div className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative px-6 py-16 md:px-12 lg:px-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay in the Loop</h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter to get the latest book updates, exclusive offers, and author interviews delivered straight to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input required type="email" placeholder="Enter your email address" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm" />
                            <button type="submit" className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
