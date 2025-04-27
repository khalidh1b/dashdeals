import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { loadStripe } from '@stripe/stripe-js';

const useHandleCheckout = () => {
    const location = useLocation();
    const { pandey, cartSubtotal, cartData, quantities } = location.state || {};
    const [productDetails, setProductDetails] = useState([]);
    const [payment_method, setPaymentMethod] = useState();
    const axiosSecure = useAxiosSecure();
    const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // console.log('Received state in Checkout:', { pandey, cartSubtotal, cartData });
        } else {
            console.log('Skipping additional effect run');
        }
    }, [location.state, pandey, cartSubtotal, cartData]);

    useEffect(() => {
        if (cartData && pandey) {
        const details = Object.entries(pandey).map(([productId, subtotal]) => {
            const product = cartData.find(p => p._id === productId);
            return {
                id: productId, 
                product_title: product?.product_title || 'Unknown Product',
                product_image: product?.product_image || '',
                price: subtotal
            };
        });
        setProductDetails(details);
        }
    }, [cartData, pandey]);
    // console.log(productDetails)

    let path = '/bankormfs';
    if(payment_method === 'cashondelivery') {
        path = '/cashondelivery';
    }
    else if(payment_method === 'bankormfs') {
        path = '/bankormfs';
    }
    
    const bankOrMFS = () => {
        setPaymentMethod('bankormfs');
        // console.log(payment_method)
    };
    
    const cashOnDelivery = () => {
        setPaymentMethod('cashondelivery')
        // console.log(payment_method)
    };

    const placeOrder = async () => {
        const data = { cartSubtotal, cartData, quantities };
        // console.log('data', data);

        try {
                const response = await axiosSecure.post('/payments/create-payment', {data});

                if(!response.data) {
                    const error = await response;
                    console.error('Error creating checkout session', error);
                    return;
                }
                const { id } = await response.data;

                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({
                    sessionId: id
                });

                console.log(result);
                if(result.error) {
                    console.log(result.error.message);
                }

            } catch (error) {
                console.error('Error during place order', error);
            }

        console.log(`Navigating to ${path} with state:`, data);
    };

    return { 
        productDetails,
        payment_method,
        bankOrMFS,
        cashOnDelivery,
        placeOrder,
        cartSubtotal
    };
};

export default useHandleCheckout;