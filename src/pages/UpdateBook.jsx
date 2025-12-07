import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../hooks/axiosSecure";
import logo from '../assets/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const { user } = useAuth();
    const { id } = useParams(); // Get book ID from URL
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch book data using TanStack Query
    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
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
                        navigate('/dashboard/my-books'); // redirect back to My Books
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
        <div className="p-6 mx-auto">
            <div className='flex items-center justify-center mb-6'>
                <img src={logo} alt="logo" className='w-20 h-20 rounded-full' />
                <p className="text-4xl font-bold text-primary ml-4">Update Book</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label>Title</label>
                        <input {...register('title', { required: true })} className="w-full p-2 border rounded" placeholder="Enter book title" />
                        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                        <label>Image URL</label>
                        <input {...register('image', { required: true })} className="w-full p-2 border rounded" placeholder="Enter book image URL" />
                        {errors.image && <p className="text-red-500 text-sm">Image is required</p>}

                        <label>Author</label>
                        <input {...register('author', { required: true })} className="w-full p-2 border rounded" placeholder="Enter book author" />
                        {errors.author && <p className="text-red-500 text-sm">Author is required</p>}

                        <label>Status</label>
                        <select {...register('status', { required: true })} className="w-full p-2 border rounded">
                            <option value=""><IoMdArrowDropdown /> Select Status</option>
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">Status is required</p>}

                        <label>Price</label>
                        <input {...register('price', { required: true })} className="w-full p-2 border rounded" placeholder="Enter book price" />
                        {errors.price && <p className="text-red-500 text-sm">Price is required</p>}

                        <label>Language</label>
                        <input {...register('language')} className="w-full p-2 border rounded" placeholder="Enter book language" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Category</label>
                        <input {...register('category')} className="w-full p-2 border rounded" placeholder="Enter book category" />

                        <label>Rating</label>
                        <input {...register('rating')} className="w-full p-2 border rounded" placeholder="Enter book rating" />

                        <label>Pages</label>
                        <input {...register('pages')} className="w-full p-2 border rounded" placeholder="Enter book pages" />

                        <label>Description</label>
                        <textarea {...register('description')} className="w-full p-2 border rounded" placeholder="Enter book description" />

                        <label htmlFor="librarian">Librarian Name</label>
                        <input type="text" id="librarian" name="librarian" className="w-full p-2 border border-gray-300 rounded" placeholder="Librarian Name" {...register('librarian')} defaultValue={user?.displayName} readOnly />

                        <label htmlFor="librarianEmail">Librarian Email</label>
                        <input type="text" id="librarianEmail" name="librarianEmail" className="w-full p-2 border border-gray-300 rounded" placeholder="Librarian Email" {...register('librarianEmail')} defaultValue={user?.email} readOnly />
                    </div>

                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 w-full">
                        Update Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;
