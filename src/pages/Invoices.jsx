import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const Invoices = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if (!user?.email) return; // prevent crash if user is null

        axiosSecure
            .get(`/invoices/${user.email}`)
            .then((res) => setInvoices(res.data))
            .catch((err) => console.error("Failed to fetch invoices:", err));
    }, [user]);

    return (
        <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary text-center md:text-left">Invoices</h1>

            {invoices.length === 0 ? (
                <p className="text-lg text-gray-600 dark:text-gray-300">No payments found yet.</p>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="bg-primary text-white text-lg">
                                <tr>
                                    <th className="py-3 px-4">Payment ID</th>
                                    <th className="py-3 px-4">Book</th>
                                    <th className="py-3 px-4">Amount</th>
                                    <th className="py-3 px-4">Date</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {invoices.map((inv, index) => (
                                    <tr key={inv._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-300">{inv.paymentIntentId}</td>
                                        <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-300">{inv.bookTitle}</td>
                                        <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-300">${inv.price}</td>
                                        <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-300">
                                            {new Date(inv.paidAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoices;
