import CartCheckoutButton from "./CartCheckoutButton";
import CartSubtotal from "./CartSubtotal";
import PropTypes from 'prop-types';
import '@/component/carts/style.css';

const CartTotal = ({ cartSubtotal, proceedToCheckout }) => {
    return (
        <div className="cart-total-container poppins">
            <h3 className="text-xl font-medium pb-5 dark:text-white">Cart Total</h3>
            <CartSubtotal cartSubtotal={cartSubtotal}/>
            <hr className="border-b"/>
            <div className="flex justify-between py-4">
                <p className="dark:text-white">Shipping:</p><span className="dark:text-white">Free</span>
            </div>
            <hr className="border-black" />
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