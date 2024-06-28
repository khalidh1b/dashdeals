import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BankOrMFS = () => {
    const location = useLocation();
    const { cartSubtotal } = location.state || {};
    const axiosSecure = useAxiosSecure();
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            console.log('Received state in bankormfs:', { cartSubtotal });

            const handleCreatePayment = () => {
                axiosSecure.post('/create-payment', {
                    amount: 1000,
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
        <div>
            <h2>bank or mfs page for payment</h2>
        </div>
    );
};

export default BankOrMFS;
