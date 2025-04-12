import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useLocation } from 'react-router-dom';

const useHandleCreatePayment = () => {
    const location = useLocation();
    const { cartSubtotal, cartData } = location.state || {};
    const axiosSecure = useAxiosSecure();
    const isInitialMount = useRef(true);
    const { user } = useContext(AuthContext);

    return useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            console.log('Received state in bankormfs:', { cartSubtotal, cartData });

            //handle payment creation
            const handleCreatePayment = () => {
                axiosSecure.post('/payments/create-payment', {
                    amount: cartSubtotal,
                    cartInfo: cartData,
                    cus_email: user?.email,
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
};

export default useHandleCreatePayment;