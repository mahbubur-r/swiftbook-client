import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../pages/Loading';
import Forbidden from '../pages/Forbidden';

const LibrarianRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'librarian') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default LibrarianRoute;