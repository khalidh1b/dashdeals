import CartTotal from "@/components/carts/CartTotal/CartTotal";
import Coupon from "@/components/carts/Coupon/Coupon";
import CartsTableHeader from "@/components/carts/CartsTableHeader/CartsTableHeader";
import UpdateCartButton from "@/components/carts/UpdateCartButton/UpdateCartButton";
import ReturnToShopButton from "@/components/carts/ReturnToShopButton/ReturnToShopButton";
import CartsTableBody from "@/components/carts/CartsTableBody/CartsTableBody";
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