import useAuth from '@/features/auth/hooks/useAuth';
import useAxiosSecure from '@/shared/hooks//useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const {data: carts=[], refetch} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            
            if (!user?.email) {
                return [];
            };
            
            const res = await axiosSecure.get(`/users/userProductCarts/${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("dashdeals-access-token")}`,
                },
            });
            return res?.data || [];
        },
        enabled: !!user?.email && !!localStorage.getItem("dashdeals-access-token"),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })
    return [carts, refetch];
};

export default useCart;