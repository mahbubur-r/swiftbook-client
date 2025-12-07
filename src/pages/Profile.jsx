import React from 'react';
import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    return (
        <div className='flex flex-col gap-2 mt-6 text-primary text-3xl font-semibold items-center'>
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                    <p className="text-5xl font-extrabold text-primary tracking-wide">Profile</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2 text-primary text-3xl font-semibold'>
                <div className='flex items-center gap-5'>
                    <img src={user?.photoURL} alt="" className='w-20 h-20 rounded-full' />
                    <p className='text-3xl font-semibold'>{user?.displayName}</p>
                </div>
                <p className='text-3xl font-semibold'>{user?.email}</p>
            </div>
        </div>
    )
};

export default Profile;