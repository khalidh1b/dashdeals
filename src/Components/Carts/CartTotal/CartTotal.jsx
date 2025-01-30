import CartCheckoutButton from "./CartCheckoutButton";
import CartSubtotal from "./CartSubtotal";
import PropTypes from 'prop-types';

const CartTotal = ({ cartSubtotal, proceedToCheckout }) => {
    return (
        <div className="border-2 rounded border-[#000] dark:border-white py-7 px-7 md:w-4/12 poppins text-base font-normal text-[#000]">
            <h3 className="text-xl font-medium pb-5 dark:text-white">Cart Total</h3>
            <CartSubtotal cartSubtotal={cartSubtotal}/>
            <hr className="border-b"/>
            <div className="flex justify-between py-4">
                <p className="dark:text-white">Shipping:</p><span className="dark:text-white">Free</span>
            </div>
            <hr className="border-[#000]" />
            <div className="flex justify-between py-3">
                <p className="dark:text-white">Total:</p><span className="dark:text-white">${cartSubtotal.toFixed(2)}</span>
            </div>
            <CartCheckoutButton proceedToCheckout={proceedToCheckout}/>
        </div>
    );
};

CartTotal.propTypes = {
    cartSubtotal: PropTypes.number,
    proceedToCheckout: PropTypes.func
}

export default CartTotal;