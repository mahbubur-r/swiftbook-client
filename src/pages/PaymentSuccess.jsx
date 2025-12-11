import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    if (res.data.success) {
                        setPaymentInfo({
                            transactionId: res.data.transactionId,
                            bookName: res.data.paymentInfo.bookName,
                            amount: res.data.paymentInfo.amount,
                        });
                    } else {
                        setPaymentInfo({});
                    }
                })
                .catch(err => {
                    console.error('Payment success error:', err);
                });
        }
    }, [sessionId, axiosSecure]);

    // if (!paymentInfo.transactionId) {
    //     return (
    //         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    //             <h2 className="text-3xl font-bold text-red-500">Payment Failed</h2>
    //             <p>Please try again or contact support.</p>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h2 className="text-3xl font-bold text-green-500 mb-6">Payment Successful</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                <p className="text-lg mb-2"><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
                {/* <p className="text-lg mb-2"><strong>Book:</strong> {paymentInfo.bookName}</p> */}
                <p className="text-lg mb-2"><strong>Amount:</strong> €{paymentInfo.amount}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
