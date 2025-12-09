import React from 'react';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center mt-8">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                    <p className="text-5xl font-extrabold text-primary tracking-wide">My Profile</p>
                </div>
            </div>

            <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-4 w-80">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt={user?.displayName}
                    className="w-32 h-32 rounded-full shadow-md object-cover"
                />
                <p className="text-2xl font-semibold">{user?.displayName}</p>
                <p className="text-lg text-gray-600">{user?.email}</p>
                {user?.role && (
                    <p className="text-md text-gray-500">Role: {user.role}</p>
                )}
                {user?.createdAt && (
                    <p className="text-sm text-gray-400">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;