import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1507842217121-9e9f1f499c42?q=80&w=2574&auto=format&fit=crop",
            title: "Discover Your Next Adventure",
            description: "Explore a vast collection of books from libraries near you."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2628&auto=format&fit=crop",
            title: "Library to Doorstep",
            description: "Get your favorite books delivered straight to your home."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop",
            title: "Join Our Community",
            description: "Connect with fellow readers and share your passion for reading."
        }
    ];

    return (
        <div className="h-[500px] w-full font-display">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="relative z-10 text-center text-white px-4">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                                <button className="bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300">
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
