import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../hooks/useAxiosSecure";
import logo from '../assets/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const { user } = useAuth();
    const { id } = useParams(); // Get book ID from URL
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Get user role
    const { data: roleData } = useQuery({
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data;
        }
    });

    const role = roleData?.role;


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch book data using TanStack Query
    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/published/${id}`);
            return res.data;
        }
    });

    // Pre-fill form once book data is fetched
    useEffect(() => {
        if (book) {
            reset(book);
        }
    }, [book, reset]);

    // Handle form submit to update book
    const onSubmit = (data) => {
        const { _id, ...updatedData } = data;

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.put(`/books/${id}`, updatedData)
                    .then(res => {
                        console.log('Book updated:', res.data);
                        Swal.fire("Saved!", "", "success");

                        // 👉 Redirect based on role
                        if (role === "admin") {
                            navigate('/dashboard/manage-books');
                        } else if (role === "librarian") {
                            navigate('/dashboard/my-books');
                        }

                        // navigate('/dashboard/my-books'); 
                        // redirect back to My Books
                    })
                    .catch(err => {
                        console.log('Error updating book:', err);
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    if (isLoading) return <p>Loading book data...</p>;
    if (isError) return <p>Error loading book.</p>;

    return (
        <div className="mx-auto w-full">
            <div className="flex flex-col items-center mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                    <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                    <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">Update Book</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className="font-semibold text-gray-700 dark:text-gray-300">Title</label>
                            <input {...register('title', { required: true })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book title" />
                            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
                            <input {...register('image', { required: true })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book image URL" />
                            {errors.image && <p className="text-red-500 text-sm">Image is required</p>}

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Author</label>
                            <input {...register('author', { required: true })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book author" />
                            {errors.author && <p className="text-red-500 text-sm">Author is required</p>}

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Status</label>
                            <select {...register('status', { required: true })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white">
                                <option value=""><IoMdArrowDropdown /> Select Status</option>
                                <option value="published">Published</option>
                                <option value="unpublished">Unpublished</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-sm">Status is required</p>}

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Price</label>
                            <input {...register('price', { required: true })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book price" />
                            {errors.price && <p className="text-red-500 text-sm">Price is required</p>}

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Language</label>
                            <input {...register('language')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book language" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className="font-semibold text-gray-700 dark:text-gray-300">Category</label>
                            <input {...register('category')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book category" />

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Rating</label>
                            <input {...register('rating')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book rating" />

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Pages</label>
                            <input {...register('pages')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book pages" />

                            <label className="font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea {...register('description')} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white" placeholder="Enter book description" />

                            <label htmlFor="librarian" className="font-semibold text-gray-700 dark:text-gray-300">Librarian Name</label>
                            <input type="text" id="librarian" name="librarian" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-600" placeholder="Librarian Name" {...register('librarian')} defaultValue={user?.displayName} readOnly />

                            <label htmlFor="librarianEmail" className="font-semibold text-gray-700 dark:text-gray-300">Librarian Email</label>
                            <input type="email" id="librarianEmail" name="librarianEmail" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-600" placeholder="Librarian Email" {...register('librarianEmail')} defaultValue={user?.email} readOnly />
                        </div>

                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/80 w-full md:w-auto font-bold shadow-md">
                            Update Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
