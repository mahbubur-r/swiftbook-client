import React from 'react';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData.displayName, formData.photoURL);
            setIsEditing(false);
            Swal.fire({
                title: "Success",
                text: "Profile updated successfully!",
                icon: "success"
            });
        } catch (error) {
            console.error("Failed to update profile", error);
            Swal.fire({
                title: "Error",
                text: "Failed to update profile. Please try again.",
                icon: "error"
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-8 px-4 font-display w-full">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-16 h-16 rounded-full shadow-lg" />
                    <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">My Profile</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 md:p-8 w-full max-w-lg transition-all duration-300 hover:shadow-3xl border border-gray-100 dark:border-gray-700">

                <div className="flex flex-col items-center gap-6">
                    <div className="relative group">
                        <img
                            src={formData.photoURL || user?.photoURL || '/default-avatar.png'}
                            alt={user?.displayName}
                            className="w-32 h-32 rounded-full shadow-xl object-cover border-4 border-white dark:border-gray-700 transition transform group-hover:scale-105"
                        />
                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition">
                                <span className="text-white text-xs font-bold">Preview</span>
                            </div>
                        )}
                    </div>

                    {!isEditing ? (
                        <>
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.displayName}</h2>
                                <p className="text-lg text-gray-500 dark:text-gray-400">{user?.email}</p>

                                <div className="flex flex-wrap gap-2 justify-center mt-4">
                                    {user?.metadata?.creationTime && (
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                                            Member since: {new Date(user.metadata.creationTime).toLocaleDateString()}
                                        </span>
                                    )}
                                    {user?.role && (
                                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase">
                                            Role: {user.role}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-teal-600 transition transform hover:-translate-y-1"
                            >
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleUpdate} className="w-full space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Photo URL</label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="https://example.com/photo.jpg"
                                />
                                <p className="text-xs text-gray-500 mt-1">Paste a direct link to an image.</p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ displayName: user?.displayName, photoURL: user?.photoURL });
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-teal-600 transition transform hover:-translate-y-1"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;