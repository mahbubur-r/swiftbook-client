import React from 'react';
import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    return (
        <div className='flex flex-col gap-2 mt-6 text-primary text-3xl font-semibold items-center'>
            <div className='w-65 h-15 flex items-center'>
                <img src={logo} alt="" className='w-20 h-20 rounded-full' />
                <p className="text-4xl font-bold text-primary">Profile</p>
            </div>

            <div className='flex flex-col gap-2 mt-6 text-primary text-3xl font-semibold'>
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