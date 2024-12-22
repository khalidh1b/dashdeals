import PropTypes from 'prop-types';
import React from 'react';
import { MdDelete } from "react-icons/md";

const AllOrders = ({ orders, onDeleteProduct, loadingProducts }) => {
    console.log(orders);

    return (
        <div>
            <div className="overflow-x-auto mx-20">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="bg-gray-100 text-[#000] text-[14px] font-medium">
                        <th>Id</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    orders.flatMap((order, orderIndex) => 
                        order.products.map((product) => (
                            <React.Fragment key={`${orderIndex}-${product._id}`}>
                                {order && <tr key={`${orderIndex}-spacer`} className='h-6'></tr>}
                                <tr key={product._id} className="border bg-blue-600 text-white">
                                    <th>{product._id}</th>
                                    <td><img className='w-[50px] bg-white p-2 rounded-lg' src={product.product_image} alt="Product"/></td>
                                    <td>{product.product_title}</td>
                                    <td>{product.discount_price === '$0' ? product.main_price : product.discount_price}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {!loadingProducts[product.id] ? (
                                            <MdDelete 
                                                onClick={() => onDeleteProduct(order.orderId, product._id)} 
                                                className='text-red-600 text-4xl bg-gray-100 p-1 rounded-md cursor-pointer' 
                                            />
                                        ) : (
                                            <span className="loading loading-spinner text-info"></span>
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    )
                    
                }
                    </tbody>
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
    loadingProducts: PropTypes.bool,
};

export default AllOrders;