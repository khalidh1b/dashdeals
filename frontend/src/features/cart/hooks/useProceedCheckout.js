import { useEffect, useState } from 'react';
import useQuantityPlus from '@/features/cart/hooks/useQuantityPlus';
import useQuantityMinus from '@/features/cart/hooks/useQuantityMinus';
import useFetchCartData from '@/features/cart/hooks/useFetchCartData';
import { useNavigate } from 'react-router-dom';
import useHandleDeleteCart from '@/features/cart/hooks/useHandleDeleteCart';

const useProceedCheckout = () => {
    const [quantities, setQuantities] = useState({});
    const [subtotals, setSubtotals] = useState({});
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetchedProducts, initialQuantities, initialSubtotals, refetchCartData] = useFetchCartData(setLoading);
    const navigate = useNavigate();
    const handleDelete = useHandleDeleteCart(refetchCartData);

    useEffect(() => {
        if (Object.keys(initialQuantities).length > 0) {
            setQuantities(initialQuantities);
        }
        if (Object.keys(initialSubtotals).length > 0) {
            setSubtotals(initialSubtotals);
        }
    }, [initialQuantities, initialSubtotals]);

    useEffect(() => {
        const numbers = Object.values(subtotals);
        const result = numbers.reduce((acc, num) => acc + num, 0);
        setCartSubtotal(result);
    }, [subtotals]);

    const quantityPlus = useQuantityPlus(setQuantities, setSubtotals);
    const quantityMinus = useQuantityMinus(setQuantities, setSubtotals);

    const proceedToCheckout = () => {
        const pandey = subtotals;
        const cartData = fetchedProducts;
        const data = { pandey, cartSubtotal, cartData, quantities };
        navigate('/checkout', { state: data })
    };

    return { 
        loading,
        products: fetchedProducts,
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