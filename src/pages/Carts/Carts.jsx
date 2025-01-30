import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHandleDeleteCart from "../../hooks/useHandleDeleteCart";
import useFetchCartData from "../../hooks/useFetchCartData";
import useQuantityPlus from "../../hooks/useQuantityPlus";
import useQuantityMinus from "../../hooks/useQuantityMinus";
import CartTotal from "../../Components/Carts/CartTotal/CartTotal";
import Coupon from "../../Components/Carts/Coupon/Coupon";
import CartsTableHeader from "../../Components/Carts/CartsTableHeader/CartsTableHeader";
import UpdateCartButton from "../../Components/Carts/UpdateCartButton/UpdateCartButton";
import ReturnToShopButton from "../../Components/Carts/ReturnToShopButton/ReturnToShopButton";
import CartsTableBody from "../../Components/Carts/CartsTableBody/CartsTableBody";

const Carts = () => {
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
    const data = { pandey, cartSubtotal, cartData };
    console.log('Navigating to checkout with state:', data);
    navigate('/checkout', { state: data })
};


return (
    <div className="md:pt-24 pt-10 pb-32">
    <CartsTableHeader/>
    <CartsTableBody loading={loading} products={products} handleDelete={handleDelete} quantities={quantities} quantityPlus={quantityPlus} quantityMinus={quantityMinus} subtotals={subtotals}/>
    <div className="flex md:justify-between justify-around md:mx-32 pt-8">
        <ReturnToShopButton/>
        <UpdateCartButton/>
    </div>
    <div className="pt-20 md:flex grid gap-10 justify-center md:mx-0 mx-5 md:gap-44">
        <Coupon/>
        <CartTotal cartSubtotal={cartSubtotal} proceedToCheckout={proceedToCheckout}/>
    </div>
    </div>
);
};

export default Carts;