import { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {useQuery} from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';

const MyOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);

    const { data: cus_orderData = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
        const res = await axiosSecure.get(`/userPaymentInfo/${user?.email}`, {
            headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        });
        return res.data;
        },
    });

    console.log(cus_orderData)
    return (
        <div>
            <h2>this is my order page</h2>
            <h2>this is my order page</h2>
        </div>
    );
};

export default MyOrders;