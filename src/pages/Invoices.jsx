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
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6 text-primary">Invoices</h1>

            {invoices.length === 0 ? (
                <p className="text-lg">No payments found yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300 rounded-lg">
                        <thead className="bg-primary text-white text-lg">
                            <tr>
                                <th className="py-3 px-4">Payment ID</th>
                                <th className="py-3 px-4">Book</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {invoices.map((inv, index) => (
                                <tr key={inv._id || index} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 text-center">{inv.paymentIntentId}</td>
                                    <td className="py-3 px-4 text-center">{inv.bookTitle}</td>
                                    <td className="py-3 px-4 text-center">${inv.price}</td>
                                    <td className="py-3 px-4 text-center">
                                        {new Date(inv.paidAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Invoices;
