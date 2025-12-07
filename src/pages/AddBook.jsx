import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/axiosSecure';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const AddBook = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // control,    
        // formState: { errors } 
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
            <h1 className="text-2xl font-bold mb-4">Add Book</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className="w-full p-2 border border-gray-300 rounded " {...register('title')} />

                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" className="w-full p-2 border border-gray-300 rounded" {...register('author')} />

                <label htmlFor="language">Language</label>
                <input type="text" id="language" name="language" className="w-full p-2 border border-gray-300 rounded" {...register('language')} />

                <label htmlFor="image">Image</label>
                <input type="text" id="image" name="image" className="w-full p-2 border border-gray-300 rounded" {...register('image')} />

                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" className="w-full p-2 border border-gray-300 rounded" {...register('category')} />

                <label htmlFor="rating">Rating</label>
                <input type="text" id="rating" name="rating" className="w-full p-2 border border-gray-300 rounded"   {...register('rating')} />

                <label htmlFor="pages">Pages</label>
                <input type="text" id="pages" name="pages" className="w-full p-2 border border-gray-300 rounded" {...register('pages')} />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" className="w-full p-2 border border-gray-300 rounded" {...register('description')}></textarea>

                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;