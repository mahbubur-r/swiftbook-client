import React from 'react';
import blog1 from '../assets/blog-1.png';
import blog2 from '../assets/blog-2.png';
import blog3 from '../assets/blog-3.png';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Top 10 Books to Read in 2024",
            summary: "Discover the must-read books of the year across various genres. From gripping thrillers that will keep you on the edge of your seat to heartwarming romances that feel like a warm hug, this list has something for everyone. We've curated a selection of critically acclaimed novels, hidden gems, and thought-provoking non-fiction that are set to define the literary landscape of 2024. Dive into these pages and let your imagination soar.",
            date: "Jan 10, 2024",
            image: blog1
        },
        {
            id: 2,
            title: "The Benefits of Daily Reading",
            summary: "How reading just 15 minutes a day can improve your cognitive function and reduces stress. Studies show that regular reading strengthens brain connectivity, increases vocabulary, and enhances empathy. It's a simple yet powerful habit that can provide a much-needed escape from the digital noise of everyday life, allowing you to unwind and disconnect while stimulating your mind.",
            date: "Jan 05, 2024",
            image: blog2
        },
        {
            id: 3,
            title: "Interview with a Best-Selling Author",
            summary: "We sat down with Jane Doe to discuss her latest thriller and the inspiration behind her chilling characters. In this exclusive interview, she reveals her writing process, the challenges she faced while crafting the intricate plot twists, and what readers can expect from her upcoming projects. Get a glimpse into the mind of a master storyteller.",
            date: "Dec 28, 2023",
            image: blog3
        }
    ];

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Blog</h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-sm text-primary font-semibold">{post.date}</span>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-3">{post.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{post.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
