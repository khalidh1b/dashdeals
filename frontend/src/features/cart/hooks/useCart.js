import useAuth from '@/features/auth/hooks/useAuth';
import useAxiosSecure from '@/shared/hooks//useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {data: carts=[], refetch} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/userProductCarts/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("dashdeals-access-token")}`,
                },
            });
            return res.data;
        },
        enabled: !!user?.email
    })
    return [carts, refetch];
};

export default useCart;