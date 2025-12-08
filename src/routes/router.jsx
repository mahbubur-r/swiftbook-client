import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import ManageBooks from "../pages/ManageBooks";
import UpdateBook from "../pages/UpdateBook";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";
import AllOrders from "../pages/AllOrders";
import MyOrders from "../pages/MyOrders";
import UsersManagement from "../pages/UsersManagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/books",
                element: <Books />,
            },
            {
                path: "/books/:id",
                element: <BookDetails />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/profile",
                element: <Profile />,
            },
            {
                path: "/dashboard/add-book",
                element: <AddBook />,
            },
            {
                path: "/dashboard/manage-books",
                element: <ManageBooks />,
            },
            {
                path: "/dashboard/users-management",
                element: <UsersManagement />,
            },
            {
                path: "/dashboard/my-books",
                element: <MyBooks />,
            },
            {
                path: "/dashboard/my-books/:id",
                element: <UpdateBook />,
            },
            {
                path: "/dashboard/all-orders",
                element: <AllOrders />,
            },
            {
                path: "/dashboard/my-orders",
                element: <MyOrders />,
            },
        ],
    },
]);

export default router;
