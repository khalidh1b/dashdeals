import React from "react";
import { MdDelete } from "react-icons/md";
import PropTypes from 'prop-types';
import OrderTableSleketon from '@/pages/MyOrders/order-table-skeleton/OrderTableSkeleton';
import { Loader2 } from "lucide-react";
import { Image } from '@/components/common/image/image';

const OrderTableBody = ({ 
    orders, 
    onDeleteProduct, 
    ordersLoading, 
    deletingProduct 
}) => {
    
    return (
        <>
            { ordersLoading && <OrderTableSleketon/> }
                
                {
                    orders.map((order) => (
                        <React.Fragment key={order.orderId}>
                            <tbody>
                                {order.products.map((product) => (
                                    <tr key={product._id} className="border bg-blue-600 text-center text-white">
                                        <TableDataId product={product}/>
                                        <TableDataImage product={product}/>
                                        <TableDataName product={product}/>
                                        <TableDataPrice product={product}/>
                                        <TableDataStatus order={order}/>
                                        <TableDataAction
                                            deletingProduct={deletingProduct}
                                            order={order}
                                            product={product}
                                            onDeleteProduct={onDeleteProduct}
                                            
                                        />
                                    </tr>
                                ))}
                            </tbody>
                        </React.Fragment>
                    ))
                }
        </>
    );
};

export default OrderTableBody;

export const TableDataAction = ({ 
    deletingProduct, 
    product, 
    onDeleteProduct, 
    order 
}) => {
    return (
        <td>
            {deletingProduct?.productId == product?._id ? (
                <Loader2 className="animate-spin"/>
            ) : (
                <MdDelete
                    onClick={() => onDeleteProduct(order.orderId, product._id)}
                    className="text-red-600 mx-auto text-4xl bg-gray-100 p-1 rounded-md cursor-pointer"
                />
            )}
        </td>
    )
};

const TableDataStatus = ({ order }) => {
    return (
        <td>{order.status}</td>
    )
};

const TableDataName = ({ product }) => {
    return (
        <td>{product.product_title}</td>
    )
};

const TableDataImage = ({ product }) => {
    return (
        <td>
            <Image className="w-[50px] flex mx-auto bg-white p-2 my-1.5 rounded-lg" 
                src={product.product_image} 
                alt={product.product_title}
            />
        </td>
    )
};

const TableDataId = ({ product }) => {
    return (
        <td>{product._id}</td>
    )
};

const TableDataPrice = ({ product }) => {
    return (
        <td>
            {   
            product.discount_price === '$0'
                ? product.main_price
                : product.discount_price
            }
        </td>
    )
};

TableDataAction.propTypes = {
    deletingProduct: PropTypes.object,
    onDeleteProduct: PropTypes.func,
    product: PropTypes.object,
    order: PropTypes.object
};

TableDataPrice.propTypes = {
    product: PropTypes.object
};

TableDataId.propTypes = {
    product: PropTypes.object
};

TableDataImage.propTypes = {
    product: PropTypes.object
};

TableDataName.propTypes = {
    product: PropTypes.object
};

TableDataStatus.propTypes = {
    order: PropTypes.object
};

OrderTableBody.propTypes = {
    orders: PropTypes.array,
    loadingProducts: PropTypes.object,
    onDeleteProduct: PropTypes.func,
    ordersLoading: PropTypes.bool,
    deletingProduct: PropTypes.any
};