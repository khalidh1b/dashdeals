import PropTypes from 'prop-types';

const CartSubtotal = ({ cartSubtotal }) => {
    return (
        <div className="flex pb-3 justify-between">
            <p className="dark:text-white">Subtotal:</p><span className="dark:text-white">${cartSubtotal.toFixed(2)}</span>
        </div>
    );
};

CartSubtotal.propTypes = {
    cartSubtotal: PropTypes.number
}

export default CartSubtotal;