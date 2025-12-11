import { Link } from 'react-router-dom';

const PaymentCancelled = () => (
    <div className="p-5 text-center">
        <h2 className='text-3xl text-red-500 font-bold mb-4'>Payment Cancelled</h2>
        <Link to='/dashboard/my-orders'>
            <button className='btn btn-primary text-black'>Try Again</button>
        </Link>
    </div>
);

export default PaymentCancelled;
