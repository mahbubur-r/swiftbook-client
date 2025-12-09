import { useSearchParams, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentSuccess = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [params] = useSearchParams();
    const orderId = params.get('orderId');

    // Poll for order status to check if webhook has fired
    const { data: order, isLoading } = useQuery({
        queryKey: ['order-status', orderId],
        enabled: !!user?.email && !!orderId,
        queryFn: async () => {
            // Since we don't have a single order endpoint, we fetch all and find one
            // Ideally, backend should have GET /orders/:id
            const res = await axiosSecure.get(`/orders/${user.email}`);
            return res.data.find(o => o._id === orderId);
        },
        refetchInterval: (data) => (data?.paymentStatus === 'paid' ? false : 2000), // Stop polling once paid
    });

    return (
        <div className="text-center mt-10 p-6">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-6">Your transaction has been completed.</p>

            <div className="card w-96 bg-base-100 shadow-xl mx-auto border border-gray-200">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Order Status</h2>
                    <p className="text-sm text-gray-500">Order ID: {orderId}</p>

                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    ) : (
                        <div className="mt-4">
                            {order?.paymentStatus === 'paid' ? (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="badge badge-success text-white p-3">Payment Confirmed</div>
                                    <p className="text-sm text-green-600">Invoice Generated!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="badge badge-warning p-3">Processing...</div>
                                    <p className="text-xs text-gray-400 max-w-xs">
                                        Waiting for payment confirmation from server...
                                        <br />
                                        (If this takes too long, please check if your Webhook is running)
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="card-actions mt-6">
                        <Link to="/dashboard/my-orders" className="btn btn-outline">My Orders</Link>
                        <Link to="/dashboard/invoices" className={`btn btn-primary ${order?.paymentStatus !== 'paid' ? 'btn-disabled' : ''}`}>View Invoice</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
