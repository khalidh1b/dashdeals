import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '@/shared/hooks/useAxiosSecure';
import { loadStripe } from '@stripe/stripe-js';

const useHandleCheckout = () => {
    const location = useLocation();
    const { pandey, cartSubtotal, cartData, quantities } = location.state || {};
    const [productDetails, setProductDetails] = useState([]);
    const [payment_method, setPaymentMethod] = useState();
    const axiosSecure = useAxiosSecure();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK, {
        locale: 'auto'
    });
    const [orderPlacing, setOrderPlacing] = useState(false);

    //console.log(import.meta.env.VITE_STRIPE_PK);
    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            //console.log('Skipping additional effect run');
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
    
    const bankOrMFS = () => {
        setPaymentMethod('bankormfs');
    };
    
    const cashOnDelivery = () => {
        setPaymentMethod('cashondelivery')
    };

    const placeOrder = async () => {
        if (!cartData || !quantities || cartSubtotal === undefined) {
            console.error('Missing required data for checkout');
            return;
        }

        const data = { cartSubtotal, cartData, quantities };

        try {
            setOrderPlacing(true);
            //console.log('Creating payment session with data:', data);
            
            const response = await axiosSecure.post('/payments/create-payment', {data});

            if (!response.data || !response.data.id) {
                console.error('Invalid response from payment endpoint:', response);
                throw new Error('Invalid payment session response');
            }

            const { id } = response.data;
            //console.log('Payment session created with ID:', id);

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Failed to load Stripe');
            }

            const result = await stripe.redirectToCheckout({
                sessionId: id
            });

            if (result.error) {
                console.error('Stripe checkout error:', result.error);
                throw new Error(result.error.message);
            }

        } catch (error) {
            console.error('Error during place order:', error);
        } finally {
            setOrderPlacing(false);
        }
    };

    return { 
        productDetails,
        payment_method,
        bankOrMFS,
        cashOnDelivery,
        placeOrder,
        orderPlacing,
        cartSubtotal
    };
};

export default useHandleCheckout;