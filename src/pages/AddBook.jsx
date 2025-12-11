import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { user } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // control,    
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        // Ensure email is attached correctly, sending both common field names to be safe if backend schema is ambiguous
        const bookData = {
            ...data,
            librarianEmail: user?.email,
            email: user?.email
        };
        console.log("Submitting book:", bookData);
        axiosSecure.post('/books', bookData)
            .then(res => {
                console.log('After adding book', res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Book added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/books');
            })
            .catch(err => {
                console.log('Error adding book', err);
            })
    };
    return (
        <div>
            <div className="flex flex-col items-center mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                    <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                    <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">Add Book</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="title" className="font-semibold text-gray-700 dark:text-gray-300">Title</label>
                            <input type="text" id="title" name="title" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Book Title" {...register('title', { required: true })} />
                            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                            <label htmlFor="image" className="font-semibold text-gray-700 dark:text-gray-300">Image</label>
                            <input type="text" id="image" name="image" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Book Image URL" {...register('image', { required: true })} />
                            {errors.image && <p className="text-red-500 text-sm">Image is required</p>}

                            <label htmlFor="author" className="font-semibold text-gray-700 dark:text-gray-300">Author</label>
                            <input type="text" id="author" name="author" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Author Name" {...register('author', { required: true })} />
                            {errors.author && <p className="text-red-500 text-sm">Author is required</p>}

                            <label htmlFor="status" className="font-semibold text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                {...register("status", { required: true })}
                            >
                                <option value=""><IoMdArrowDropdown />Select Status</option>
                                <option value="Published">Published</option>
                                <option value="Unpublished">Unpublished</option>
                            </select>

                            {errors.status && <p className="text-red-500 text-sm">Status is required</p>}

                            <label htmlFor="price" className="font-semibold text-gray-700 dark:text-gray-300">Price</label>
                            <input type="number" id="price" name="price" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Price" {...register('price', { required: true })} />
                            {errors.price && <p className="text-red-500 text-sm">Price is required</p>}

                            <label htmlFor="language" className="font-semibold text-gray-700 dark:text-gray-300">Language</label>
                            <input type="text" id="language" name="language" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Language" {...register('language')} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="category" className="font-semibold text-gray-700 dark:text-gray-300">Category</label>
                            <input type="text" id="category" name="category" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Category" {...register('category')} />

                            <label htmlFor="rating" className="font-semibold text-gray-700 dark:text-gray-300">Rating</label>
                            <input type="text" id="rating" name="rating" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Rating" {...register('rating')} />

                            <label htmlFor="pages" className="font-semibold text-gray-700 dark:text-gray-300">Pages</label>
                            <input type="text" id="pages" name="pages" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Pages" {...register('pages')} />

                            <label htmlFor="description" className="font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea id="description" name="description" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Description" {...register('description')}></textarea>

                            <label htmlFor="librarian" className="font-semibold text-gray-700 dark:text-gray-300">Librarian Name</label>
                            <input type="text" id="librarian" name="librarian" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-600" placeholder="Librarian Name" {...register('librarian')} defaultValue={user?.displayName} readOnly />

                            <label htmlFor="librarianEmail" className="font-semibold text-gray-700 dark:text-gray-300">Librarian Email</label>
                            <input type="email" id="librarianEmail" name="librarianEmail" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-600" placeholder="Librarian Email" {...register('librarianEmail')} defaultValue={user?.email} readOnly />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button navigate to="/dashboard/my-books" type="submit" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition w-full md:w-auto font-bold shadow-md">Add Book</button>
                    </div>

                </form>
            </div>


        </div>
    );
};

export default AddBook;