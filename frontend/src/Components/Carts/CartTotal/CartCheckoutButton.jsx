import PropTypes from 'prop-types';

const CartCheckoutButton = ({ proceedToCheckout }) => {
    return (
        <>
            <button onClick={proceedToCheckout} className="py-3 px-9 bg-red-400 hover:bg-red-600 text-white rounded transition-colors">
                Proceed to checkout
            </button>
        </>
    );
};

CartCheckoutButton.propTypes = {
    proceedToCheckout: PropTypes.func
}

export default CartCheckoutButton;