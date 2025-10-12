import PropTypes from 'prop-types';
import OrderTableHead from './OrderTableHead';
import OrderTableBody from './OrderTableBody';

const AllOrders = ({ 
    orders, 
    onDeleteProduct, 
    loadingProducts, 
    ordersLoading, 
    deletingProduct 
}) => {

    return (
        <div>
            <div className="overflow-x-auto md:mx-20 mx-2">
                <table className="min-w-full table">
                    <OrderTableHead/>
                    <OrderTableBody 
                        orders={orders} 
                        loadingProducts={loadingProducts} 
                        onDeleteProduct={onDeleteProduct} 
                        ordersLoading={ordersLoading}
                        deletingProduct={deletingProduct}
                    />
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
    deletingProduct: PropTypes.any
};

export default AllOrders;