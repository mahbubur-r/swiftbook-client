import React from 'react';
import { Link } from 'react-router-dom';
import error404 from '../assets/error-404.png';
import { FaBackwardStep } from "react-icons/fa6";

const ErrorPage = () => {
    return (
        <div className='text-center'>
            <img className='inline w-1/2 mt-10 rounded-4xl' src={error404} alt="" />
            {/* <h1 className='text-center text-5xl mt-10'>Oops, page not found!</h1> */}
            <p className='mt-10 text-2xl'>The page you are looking for is not available.</p>
            <Link to='/'><button className='btn px-5 py-2 cursor-pointer mt-5 text-2xl text-white bg-primary items-center justify-center inline-flex rounded-lg gap-2'><FaBackwardStep />Go Back</button></Link>

        </div>
    );
};

export default ErrorPage;