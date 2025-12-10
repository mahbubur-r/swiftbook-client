import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../pages/Forbidden';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole()
    const location = useLocation();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (user && role === 'admin') {
        return children;
    }

    if (user && role !== 'admin') {
        return <Forbidden></Forbidden>
        // return <div className="flex justify-center items-center h-screen">Access Forbidden</div>
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;