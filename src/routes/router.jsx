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
import AllUsers from "../pages/AllUsers";
import PaymentSuccess from "../pages/PaymentSuccess";
import Invoices from "../pages/Invoices";
import MyWishlist from "../pages/MyWishlist";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
import PrivateRoute from "./PrivateRoute";

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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        // element: <DashboardLayout></DashboardLayout>,
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

            // admin routes
            {
                path: "/dashboard/manage-books",
                element: <AdminRoute><ManageBooks></ManageBooks></AdminRoute>,
            },
            {
                path: "/dashboard/manage-books/:id",
                element: <AdminRoute><UpdateBook></UpdateBook></AdminRoute>,
            },
            {
                path: "/dashboard/all-users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: "/dashboard/users-management",
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>,
            },
            // librarian routes
            {
                path: "/dashboard/my-books",
                element: <LibrarianRoute><MyBooks></MyBooks></LibrarianRoute>,
            },
            {
                path: "/dashboard/my-books/:id",
                element: <LibrarianRoute><UpdateBook></UpdateBook></LibrarianRoute>,
            },
            {
                path: "/dashboard/all-orders",
                element: <AllOrders />,
            },
            // users routes
            {
                path: "/dashboard/my-orders",
                element: <MyOrders />,
            },
            {
                path: "/dashboard/payment-success",
                element: <PaymentSuccess />,
            },
            {
                path: "/dashboard/invoices",
                element: <Invoices />,
            },
            {
                path: "/dashboard/my-wishlist",
                element: <MyWishlist />,
            }
        ],
    },
]);

export default router;
