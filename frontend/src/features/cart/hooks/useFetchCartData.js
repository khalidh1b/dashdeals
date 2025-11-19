import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import { AuthContext } from "@/app/providers/auth-provider";
import { useContext } from "react";

const useFetchCartData = (setLoading) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data, refetch: refetchCartData } = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
        setLoading(true);
        const res = await axiosSecure.get(`/users/userProductCarts/${user?.email}`, {
            headers: {
            authorization: `Bearer ${localStorage.getItem("dashdeals-access-token")}`,
            },
        });
        
        const products = res.data;

        const initialQuantities = products.reduce(
            (acc, product) => ({ ...acc, [product._id]: 1 }),
            {}
        );
        const initialSubtotals = products.reduce((acc, product) => {
            const price = parseFloat(
            (product.discount_price === "$0"
                ? product.main_price
                : product.discount_price
            ).replace(/[^0-9.-]+/g, "")
            );
            return { ...acc, [product._id]: price };
        }, {});
        setLoading(false);
        return { products, initialQuantities, initialSubtotals };
        },
    });
    return [data?.products || [], data?.initialQuantities || {}, data?.initialSubtotals || {}, refetchCartData]
};

export default useFetchCartData;