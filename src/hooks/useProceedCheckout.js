import { useEffect, useState } from 'react';
import useQuantityPlus from './useQuantityPlus';
import useQuantityMinus from './useQuantityMinus';
import useFetchCartData from './useFetchCartData';
import { useNavigate } from 'react-router-dom';
import useHandleDeleteCart from './useHandleDeleteCart';

const useProceedCheckout = () => {
    const [quantities, setQuantities] = useState({});
    const [subtotals, setSubtotals] = useState({});
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [products, refetchCartData] = useFetchCartData(setLoading, setQuantities, setSubtotals);
    const navigate = useNavigate();
    const handleDelete = useHandleDeleteCart(refetchCartData);

    useEffect(() => {
        const numbers = Object.values(subtotals);
        const result = numbers.reduce((acc, num) => acc + num, 0);
        setCartSubtotal(result);
    }, [subtotals]);

    const quantityPlus = useQuantityPlus(setQuantities, setSubtotals);
    const quantityMinus = useQuantityMinus(setQuantities, setSubtotals);

    const proceedToCheckout = () => {
        // Assign the value of 'subtotals' to the variable 'pandey'
        const pandey = subtotals;
        const cartData = products;
        const data = { pandey, cartSubtotal, cartData };
        console.log('Navigating to checkout with state:', data);
        navigate('/checkout', { state: data })
    };
    
    return { 
        loading,
        products,
        handleDelete,
        quantities,
        quantityPlus,
        quantityMinus,
        subtotals,
        cartSubtotal,
        proceedToCheckout
    };
};

export default useProceedCheckout;