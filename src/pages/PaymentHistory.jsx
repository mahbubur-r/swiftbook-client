import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import logo from "../assets/logo.png";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="flex flex-col items-center mb-8 w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">Payment History</p>
            </div>
            <h2 className="text-xl md:text-3xl font-semibold text-center mt-6 text-primary">
                Total Payment History: {payments.length}
            </h2>

            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-6 w-full">
                <div className="overflow-x-auto">
                    <table className="table-auto min-w-full w-full">
                        <thead className="bg-primary text-white text-lg text-center">
                            <tr>
                                <th className="py-4 px-6">S/N</th>
                                <th className="py-4 px-6">Book</th>
                                <th className="py-4 px-6">Amount</th>
                                <th className="py-4 px-6">Paid At</th>
                                <th className="py-4 px-6">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:text-white text-center">
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="py-4 px-6">{index + 1}</td>
                                    <td className="py-4 px-6">{payment.bookTitle}</td>
                                    <td className="py-4 px-6">{payment.amount}€</td>
                                    <td className="py-4 px-6">{new Date(payment.paidAt).toLocaleString()}</td>
                                    <td className="py-4 px-6">{payment.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
