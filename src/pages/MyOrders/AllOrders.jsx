import PropTypes from 'prop-types';
import OrderTableHead from './OrderTableHead';
import OrderTableBody from './OrderTableBody';

const AllOrders = ({ orders, onDeleteProduct, loadingProducts, ordersLoading }) => {
    // console.log(orders);

    return (
        <div>
            <div className="overflow-x-auto mx-20">
                <table className="table">
                    <OrderTableHead/>
                    <OrderTableBody orders={orders} loadingProducts={loadingProducts} onDeleteProduct={onDeleteProduct} ordersLoading={ordersLoading}/>
                </table>
                </div>
        </div>
    );
};

// Adding prop types validation
AllOrders.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            status: PropTypes.string.isRequired,
            products: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    product_image: PropTypes.string,
                    product_title: PropTypes.string.isRequired,
                    price: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]),
                })
            ).isRequired,
        })
    ),
    onDeleteProduct: PropTypes.func,
    loadingProducts: PropTypes.object,
    ordersLoading: PropTypes.bool, 
    errorFetchingProducts: PropTypes.array, 
};

export default AllOrders;