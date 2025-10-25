import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/app/providers/auth-provider";

const useFetchWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const {data: products = [], refetch, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/getUserProductWishlist/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('dashdeals-access-token')}`
                }
            })
            return res.data;
        }
    })
    return [products, refetch, isLoading]
};

export default useFetchWishlist;