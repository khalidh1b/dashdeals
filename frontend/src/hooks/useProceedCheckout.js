import { useEffect, useState } from 'react';
import useQuantityPlus from '@/hooks/cart/useQuantityPlus';
import useQuantityMinus from '@/hooks/cart/useQuantityMinus';
import useFetchCartData from '@/hooks/cart/useFetchCartData';
import { useNavigate } from 'react-router-dom';
import useHandleDeleteCart from '@/hooks/cart/useHandleDeleteCart';

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
        const pandey = subtotals;
        const cartData = products;
        const data = { pandey, cartSubtotal, cartData, quantities };
        // console.log('Navigating to checkout with state:', data);
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