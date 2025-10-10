import useAxiosPublic from"@/hooks/access/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useFetchFlashSalesItems = () => {
    const axiosPublic = useAxiosPublic();
    
    const fetchProducts = async () => {
        try {
            const data = await axiosPublic.get('/products/flashSalesProducts')
            return data.data;
        } catch (error) {
            console.error('error while fetching products', error);
            return error;
        }
    };
    
    // useQuery to fetch flash sales products
    const { data: products = [], isLoading, isFetching} = useQuery({
        queryKey: ['flash_sales_products'],
        queryFn: fetchProducts,
    });
    
    return {
        products,
        isLoading,
        isFetching
    }; 
};

export default useFetchFlashSalesItems;