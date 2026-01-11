import React from 'react';
import aboutHero from '../assets/about-hero.png';
import aboutMission from '../assets/about-mission.png';
import aboutTeam from '../assets/about-team.png';

const About = () => {
    return (
        <div className="pt-24 pb-12">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                    <img src={aboutHero} alt="SwiftBook Library" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Welcome to SwiftBook</h1>
                            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                                Where every book finds its reader, and every reader finds their next adventure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Founded in 2024, SwiftBook began as a small passion project in a local community center. We believed that access to great literature shouldn't be limited by location or logistics. What started with a few hundred used books has grown into a comprehensive digital platform connecting readers with thousands of titles across genres.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            Today, we serve a vibrant global community of book lovers, students, and lifelong learners. Our journey has been fueled by a simple yet powerful belief: that reading has the power to transform lives, broaden perspectives, and bring people together.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            As we expanded, we realized that SwiftBook was more than just a marketplace; it was a community hub. We launched book clubs, author Q&A sessions, and literary festivals, creating spaces for readers to connect and discuss their favorite stories. These initiatives have fostered deep connections among our members, turning solitary reading into a shared passion.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            Driven by innovation, we've integrated cutting-edge technology to enhance the reading experience. Our personalized recommendation engine suggests titles based on individual preferences, ensuring that every reader discovers books they'll love. We are constantly exploring new ways to bridge the gap between digital convenience and the tactile joy of reading.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Looking ahead, we remain committed to our roots while embracing the future. We are dedicated to supporting independent bookstores and sustainable publishing practices. Whether you're a casual reader or a dedicated bibliophile, SwiftBook is here to accompany you on your literary journey, one page at a time.
                        </p>
                    </div>
                    <div className="lg:w-1/2">
                        <img src={aboutMission} alt="Sharing Knowledge" className="rounded-2xl shadow-xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-20 mb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mt-1 mr-4">✓</span>
                                    <p className="text-lg text-gray-600 dark:text-gray-300">To democratize access to knowledge and storytelling for everyone, everywhere.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mt-1 mr-4">✓</span>
                                    <p className="text-lg text-gray-600 dark:text-gray-300">To foster a diverse offering that champions voices from all backgrounds and cultures.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mt-1 mr-4">✓</span>
                                    <p className="text-lg text-gray-600 dark:text-gray-300">To build a sustainable platform that supports authors, publishers, and readers alike.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                                    <div className="text-gray-600 dark:text-gray-300">Books Available</div>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">5k+</div>
                                    <div className="text-gray-600 dark:text-gray-300">Happy Readers</div>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                                    <div className="text-gray-600 dark:text-gray-300">Genres</div>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                                    <div className="text-gray-600 dark:text-gray-300">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet the Team Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We are a passionate group of bibliophiles, developers, and designers working together to bring you the best reading experience.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
                    <img src={aboutTeam} alt="Our Team" className="w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    );
};

export default About;
