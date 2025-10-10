import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AllOrders from './AllOrders';
import useDeleteOrder from '@/hooks/orders/useDeleteOrder';
import useFetchOrdersData from '@/hooks/orders/useFetchOrdersData';

const MyOrders = () => {
    const [loadingProducts, setLoadingProducts] = useState({});
    
    // Fetch orders data
    const { cus_orderData, isLoading, refetch } = useFetchOrdersData();

    // delete order
    const { handleDeleteProduct, deletingProduct } = useDeleteOrder(setLoadingProducts, refetch);
    
    const ordersWithProducts = cus_orderData.map((order) => ({
        orderId: order._id,
        status: order.status,
        products: order.products || []
    }));
    
    return (
        <div className='pb-20 min-h-screen'>
            <div className='md:mx-20 mx-2'>
                <h2 className='text-3xl font-medium text-[#000] dark:text-white pb-1 pt-8'>Order</h2>
                <h3>{cus_orderData.length} order{cus_orderData.length !== 1 ? 's' : ''} found</h3>

                <ul className='flex gap-10 pt-7 pb-6'>
                    <li>All Orders</li>
                    <li className='text-gray-300'>Pending</li>
                    <li className='text-gray-300'>Delivered</li>
                </ul>
            </div>
            <div>
                {
                <AllOrders 
                    loadingProducts={loadingProducts} 
                    orders={ordersWithProducts} 
                    onDeleteProduct={handleDeleteProduct} 
                    ordersLoading={isLoading}
                    deletingProduct={deletingProduct}
                />
                }
                <Outlet />
            </div>
        </div>
    );
};

export default MyOrders;
