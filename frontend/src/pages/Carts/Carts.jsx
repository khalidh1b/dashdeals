import CartTotal from "@/component/carts/CartTotal/CartTotal";
import Coupon from "@/component/carts/Coupon/Coupon";
import CartsTableHeader from "@/component/carts/CartsTableHeader/CartsTableHeader";
import UpdateCartButton from "@/component/carts/UpdateCartButton/UpdateCartButton";
import ReturnToShopButton from "@/component/carts/ReturnToShopButton/ReturnToShopButton";
import CartsTableBody from "@/component/carts/CartsTableBody/CartsTableBody";
import useProceedCheckout from "@/features/cart/hooks/useProceedCheckout";

const Carts = () => {
    
    const { 
        loading, 
        cartSubtotal, 
        handleDelete, 
        proceedToCheckout, 
        products, 
        quantities, 
        quantityMinus, 
        quantityPlus, 
        subtotals 
    } = useProceedCheckout();

return (
    <div className="md:pt-24 pt-10 pb-32">
    <CartsTableHeader/>
    <CartsTableBody 
        loading={loading} 
        products={products} 
        handleDelete={handleDelete} 
        quantities={quantities} 
        quantityPlus={quantityPlus} 
        quantityMinus={quantityMinus} 
        subtotals={subtotals}
    />
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
    </div>
);
};

export default Carts;