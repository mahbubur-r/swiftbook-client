import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
    const heroImages = [
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2628&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507842217121-9e9f1f499c42?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2670&auto=format&fit=crop",

    ];

    return (
        <section className="relative min-h-[600px] lg:h-[700px] font-display overflow-hidden group pb-12 lg:pb-0">
            {/* Full Background Slider */}
            <div className="absolute inset-0 z-0">
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination, Navigation]}
                    effect="fade"
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    loop={true}
                    className="w-full h-full"
                >
                    {heroImages.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full">
                                <img
                                    src={img}
                                    alt={`Library Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {/* Dark Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-white mt-30 md:mt-40"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <span className="h-1 w-12 bg-primary rounded-full"></span>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Premium Library Service</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        Discover Your Next <br />
                        <span className="text-primary">Great Read</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
                        Experience the joy of reading with SwiftBook. We bring the library to your doorstep with our fast, reliable, and eco-friendly delivery service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/books" className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-teal-600 transition transform hover:-translate-y-1 text-center">
                            Browse Collection
                        </Link>
                        <Link to="/register" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition text-center">
                            Join for Free
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center mt-2 gap-8 border-t border-white/10 pt-2 md:pt-3">
                        <div>
                            <p className="text-3xl font-bold text-white">100k+</p>
                            <p className="text-sm text-gray-400">Books Available</p>
                        </div>
                        <div className="w-px h-10 bg-white/20"></div>
                        <div>
                            <p className="text-3xl font-bold text-white">24h</p>
                            <p className="text-sm text-gray-400">Fast Delivery</p>
                        </div>
                        <div className="w-px h-10 bg-white/20"></div>
                        <div>
                            <p className="text-3xl font-bold text-white">4.9</p>
                            <p className="text-sm text-gray-400">User Rating</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
