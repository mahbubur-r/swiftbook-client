import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/axiosSecure';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";

const AddBook = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // control,    
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log(data, user);
        axiosSecure.post('/books', data)
            .then(res => {
                console.log('After adding book', res.data);
                navigate('/books');
            })
            .catch(err => {
                console.log('Error adding book', err);
            })
    };
    return (
        <div>
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                    <p className="text-5xl font-extrabold text-primary tracking-wide">Add Book</p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className="w-full p-2 border border-gray-300 rounded " placeholder="Book Title" {...register('title', { required: true })} />
                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                <label htmlFor="image">Image</label>
                <input type="text" id="image" name="image" className="w-full p-2 border border-gray-300 rounded" placeholder="Book Image URL" {...register('image', { required: true })} />
                {errors.image && <p className="text-red-500 text-sm">Image is required</p>}

                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" className="w-full p-2 border border-gray-300 rounded" placeholder="Author Name" {...register('author', { required: true })} />
                {errors.author && <p className="text-red-500 text-sm">Author is required</p>}

                <label htmlFor="status" className="font-semibold">Status</label>
                <select
                    id="status"
                    name="status"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("status", { required: true })}
                >
                    <option value=""><IoMdArrowDropdown />Select Status</option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                </select>

                {errors.status && <p className="text-red-500 text-sm">Status is required</p>}

                <label htmlFor="price">Price</label>
                <input type="text" id="price" name="price" className="w-full p-2 border border-gray-300 rounded" placeholder="Price" {...register('price', { required: true })} />
                {errors.price && <p className="text-red-500 text-sm">Price is required</p>}

                <label htmlFor="language">Language</label>
                <input type="text" id="language" name="language" className="w-full p-2 border border-gray-300 rounded" placeholder="Language" {...register('language')} />

                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" className="w-full p-2 border border-gray-300 rounded" placeholder="Category" {...register('category')} />


                <label htmlFor="rating">Rating</label>
                <input type="text" id="rating" name="rating" className="w-full p-2 border border-gray-300 rounded" placeholder="Rating" {...register('rating')} />

                <label htmlFor="pages">Pages</label>
                <input type="text" id="pages" name="pages" className="w-full p-2 border border-gray-300 rounded" placeholder="Pages" {...register('pages')} />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" className="w-full p-2 border border-gray-300 rounded" placeholder="Description" {...register('description')}></textarea>

                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;