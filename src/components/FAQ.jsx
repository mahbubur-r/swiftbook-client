import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I rent a book?",
            answer: "Simply browse our collection, click on the book you're interested in, and click the 'Borrow' button. You can then manage your borrowed books from your dashboard."
        },
        {
            question: "What is the loan period for a book?",
            answer: "The standard loan period is 14 days. You can renew a book once for an additional 7 days if no one else has reserved it."
        },
        {
            question: "Are there any late fees?",
            answer: "We believe in accessible reading for all, so we do not charge late fees. However, your account may be temporarily suspended if books are not returned within a reasonable timeframe."
        },
        {
            question: "Can I suggest a book to be added to the library?",
            answer: "Absolutely! We love hearing from our community. You can submit book suggestions through the 'Contact Us' page."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions? We're here to help.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <button className="w-full flex items-center justify-between p-6 text-left focus:outline-none" onClick={() => toggleFAQ(index)}>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                                <span className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-primary transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    {activeIndex === index ? <FaMinus size={14} /> : <FaPlus size={14} />}
                                </span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
