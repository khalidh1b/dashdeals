import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import { AuthContext } from "@/app/providers/auth-provider";
import { useContext } from "react";

const useFetchCartData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data, isLoading, refetch: refetchCartData } = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
        const res = await axiosSecure.get(`/users/userProductCarts/${user?.email}`, {
            headers: {
            authorization: `Bearer ${localStorage.getItem("dashdeals-access-token")}`,
            },
        });
        
        const products = res.data;
        console.log('🔍 Cart products from backend:', products);
        console.log('🔍 Product structure sample:', products[0] ? {
            _id: products[0]._id,
            productId: products[0].productId,
            id: products[0].id,
            allKeys: Object.keys(products[0]),
            fullProduct: products[0]
        } : 'No products');
        
        products.forEach((product, index) => {
            console.log(`🔍 Product ${index}:`, {
                cartItemId: product._id,  
                productId: product.productId, 
                id: product.id,
                title: product.product_title,
                fullObject: product
            });
        });

        const initialQuantities = products.reduce(
            (acc, product) => ({ ...acc, [product._id || product.productId || product.id]: 1 }),
            {}
        );
        const initialSubtotals = products.reduce((acc, product) => {
            const price = parseFloat(
            (product.discount_price === "$0"
                ? product.main_price
                : product.discount_price
            ).replace(/[^0-9.-]+/g, "")
            );
            return { ...acc, [product._id || product.productId || product.id]: price };
        }, {});
        return { products, initialQuantities, initialSubtotals };
        },
    });
    return [data?.products || [], data?.initialQuantities || {}, data?.initialSubtotals || {}, refetchCartData, isLoading]
};

export default useFetchCartData;