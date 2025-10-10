import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/access/useAxiosSecure";
import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

const useFetchCartData = (setLoading, setQuantities, setSubtotals) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: products = [], refetch: refetchCartData } = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
        setLoading(true);
        const res = await axiosSecure.get(`/users/userProductCarts/${user?.email}`, {
            headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        });
        
        const initialQuantities = res.data.reduce(
            (acc, product) => ({ ...acc, [product._id]: 1 }),
            {}
        );
        const initialSubtotals = res.data.reduce((acc, product) => {
            const price = parseFloat(
            (product.discount_price === "$0"
                ? product.main_price
                : product.discount_price
            ).replace(/[^0-9.-]+/g, "")
            );
            return { ...acc, [product._id]: price };
        }, {});
        setQuantities(initialQuantities);
        setSubtotals(initialSubtotals);
        setLoading(false);
        return res.data;
        },
    });
    return [products, refetchCartData]
};

export default useFetchCartData;