import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Outlet } from 'react-router-dom';
import AllOrders from './AllOrders';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    // const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState({});

    // Fetch orders data
    const { data: cus_orderData = [], isLoading, error , refetch} = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/getUserOrderedProducts/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("access-token")}`,
                },
            });
            return res.data;
        },
        enabled: !!user?.email, // Ensure query only runs if email is available
    });
    
    // Error and loading handling
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const ordersWithProducts = cus_orderData.map((order) => ({
        orderId: order._id,
        status: order.status,
        products: order.products || []
    }));
    
    console.log('customer order data:',cus_orderData);

    const handleDeleteProduct = async (orderId, productId) => {
        console.log(orderId, productId);

        try {
            // setLoading(true);
            setLoadingProducts((prevState) => ({
                ...prevState,
                [productId]: true,
            }))
            await axiosSecure.delete(`/users/deleteOrderedProduct/${orderId}/${productId}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`,
                }
            })
            refetch()
            .then((result) => {
                console.log(result);
                if(result.status === 'success') {
                    Swal.fire({
                        icon: "success",
                        title: "Product deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
            // setLoading(false);
            setLoadingProducts((prevState) => ({
                ...prevState,
                [productId]: false,
            }))
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    
    return (
        <div className='pb-20'>
            <div className='mx-20'>
                <h2 className='text-3xl font-medium text-[#000] dark:text-white pb-1 pt-8'>Order</h2>
                <h3>{cus_orderData.length} order{cus_orderData.length !== 1 ? 's' : ''} found</h3>

                <ul className='flex gap-10 pt-7 pb-6'>
                    <li>All Orders</li>
                    <li className='text-gray-300'>Pending</li>
                    <li className='text-gray-300'>Delivered</li>
                </ul>
            </div>
            <div>
                {<AllOrders loadingProducts={loadingProducts} orders={ordersWithProducts} onDeleteProduct={handleDeleteProduct}/>}
                <Outlet />
            </div>
        </div>
    );
};

export default MyOrders;
