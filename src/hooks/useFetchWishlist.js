import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useFetchWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const {data: products = [], refetch, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/getUserProductWishlist/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    return [products, refetch, isLoading]
};

export default useFetchWishlist;