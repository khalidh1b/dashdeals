import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BankOrMFS = () => {
    const location = useLocation();
    const { cartSubtotal, cartData } = location.state || {};
    const axiosSecure = useAxiosSecure();
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            console.log('Received state in bankormfs:', { cartSubtotal, cartData });

            const handleCreatePayment = () => {
                axiosSecure.post('/create-payment', {
                    amount: cartSubtotal,
                    productId: cartData,
                    currency: 'BDT'
                })
                .then((res) => {
                    console.log(res);
                    const redirectUrl = res.data.paymentUrl;
                    if (redirectUrl) {
                        window.location.replace(redirectUrl);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            };

            handleCreatePayment();
        }
    }, [axiosSecure, cartSubtotal]);

    return (
        <div className="py-20">
            <div className="border w-2/5 mx-auto pt-5 pb-5 rounded-2xl px-10">
                <img className="w-44 mx-auto" src="https://i.postimg.cc/PxYP4KWc/payment-failed.avif" alt="#" />
                <h3 className="text-center text-[#121212] poppins font-medium text-[30px]">Your payment is processing</h3>
                <h2 className="text-[17px] font-medium text-gray-500 text-center">Please wait for some time...</h2>
                <Link to="/checkout" className="flex justify-center mt-14 mb-5">
                    <button className="bg-blue-400 text-white py-3 text-xl rounded w-1/2">Processing...</button>
                </Link>
            </div>
        </div>
    );
};

export default BankOrMFS;
