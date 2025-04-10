import React from "react";
import { MdDelete } from "react-icons/md";
import PropTypes from 'prop-types';
import OrderTableSleketon from '../../Components/LoadingSkeletons/OrderTableSkeleton';
import { Loader2 } from "lucide-react";

const OrderTableBody = ({ 
    orders, 
    onDeleteProduct, 
    ordersLoading, 
    deletingProduct 
}) => {
    
    return (
        <>
        {
            ordersLoading && <OrderTableSleketon/>
        }
            <table>
                <tbody>
                {
                    orders.map((order) => (
                        <React.Fragment key={order.orderId}>
                                    {order.products.map((product) => (
                                <tr key={product._id} className="border bg-blue-600 text-white">
                                {console.log(product)}
                                <th>{product._id}</th>
                                <td>
                                    <img className="w-[50px] bg-white p-2 rounded-lg" 
                                        src={product.product_image} 
                                        alt={product.product_title}
                                        />
                                </td>
                                    <td>{product.product_title}</td>
                                    <td>
                                    {product.discount_price === '$0'
                                        ? product.main_price
                                        : product.discount_price}
                                    </td>
                                    <td>{order.status}</td>
                                <td>
                                {deletingProduct?.productId == product?._id ? (
                                    <Loader2 className="animate-spin"/>
                                ) : (
                                    <MdDelete
                                        onClick={() => onDeleteProduct(order.orderId, product._id)}
                                        className="text-red-600 text-4xl bg-gray-100 p-1 rounded-md cursor-pointer"
                                    />
                                )}
                                </td>
                            </tr>
                            ))}
                        </React.Fragment>
                    ))
                }
                </tbody>
            </table>
        </>
    );
};

OrderTableBody.propTypes = {
    orders: PropTypes.array,
    loadingProducts: PropTypes.object,
    onDeleteProduct: PropTypes.func,
    ordersLoading: PropTypes.bool,
    deletingProduct: PropTypes.any
}

export default OrderTableBody;