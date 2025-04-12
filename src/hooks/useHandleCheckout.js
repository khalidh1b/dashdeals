import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useHandleCheckout = () => {
    const location = useLocation();
    const { pandey, cartSubtotal, cartData } = location.state || {};
    const [productDetails, setProductDetails] = useState([]);
    const [payment_method, setPaymentMethod] = useState();
    const navigate = useNavigate();

    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log('Received state in Checkout:', { pandey, cartSubtotal, cartData });
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
        console.log(payment_method)
    };
    
    const cashOnDelivery = () => {
        setPaymentMethod('cashondelivery')
        console.log(payment_method)
    };

    const placeOrder = () => {
        const data = { cartSubtotal, cartData };
        console.log(`Navigating to ${path} with state:`, data);
        navigate(`${path}`, { state: data })
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