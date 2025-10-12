import PropTypes from 'prop-types';

const CartCheckoutButton = ({ proceedToCheckout }) => {
    return (
        <>
            <button onClick={proceedToCheckout} className="py-3 px-9 bg-[#DB4444] text-white rounded">
                Proceed to checkout
            </button>
        </>
    );
};

CartCheckoutButton.propTypes = {
    proceedToCheckout: PropTypes.func
}

export default CartCheckoutButton;