import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useFetchOrdersData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

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
    return { cus_orderData, isLoading, error, refetch }
};

export default useFetchOrdersData;