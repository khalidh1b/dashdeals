import CartTotal from "@/components/carts/CartTotal/CartTotal";
import Coupon from "@/components/carts/Coupon/Coupon";
import CartsTableHeader from "@/components/carts/CartsTableHeader/CartsTableHeader";
import UpdateCartButton from "@/components/carts/UpdateCartButton/UpdateCartButton";
import ReturnToShopButton from "@/components/carts/ReturnToShopButton/ReturnToShopButton";
import CartsTableBody from "@/components/carts/CartsTableBody/CartsTableBody";
import useProceedCheckout from "@/features/cart/hooks/useProceedCheckout";
import { EmptyState } from "@/shared/components/empty-states";

const Carts = () => {
    
    const { 
        cartSubtotal, 
        proceedToCheckout,
        products 
    } = useProceedCheckout();

return (
    <div className="md:pt-24 pt-10 pb-32">
    {products.length === 0
    ? <EmptyState type={'cart'}/>
    : <>
        <CartsTableHeader/>
        <CartsTableBody/>
        <div className="flex md:justify-between justify-around md:mx-32 pt-8">
            <ReturnToShopButton/>
            <UpdateCartButton/>
        </div>
        <div className="pt-20 md:flex grid gap-10 justify-center md:mx-0 mx-5 md:gap-44">
            <Coupon/>
            <CartTotal 
                cartSubtotal={cartSubtotal} 
                proceedToCheckout={proceedToCheckout}
            />
        </div>
        </>
    }
    </div>
);
};

export default Carts;