import { Link } from "react-router-dom";

const PaymentCanceled = () => {
    return (
        <div className="py-20">
            <div className="border w-2/5 mx-auto pt-5 pb-5 rounded-2xl px-10">
                <img className="w-44 mx-auto" src="https://i.postimg.cc/PxYP4KWc/payment-failed.avif" alt="#" />
                <h3 className="text-center text-[#121212] poppins font-medium text-[30px]">Payment Canceled</h3>
                <h2 className="text-[17px] font-medium text-gray-500 text-center">Your transaction has Canceled by you. <span className="text-[#121212]">Please try again</span></h2>
                <Link to="/checkout" className="flex justify-center mt-14 mb-5">
                    <button className="bg-blue-400 text-white py-3 text-xl rounded w-1/2">Make Payment</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCanceled;