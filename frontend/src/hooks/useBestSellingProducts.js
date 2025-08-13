import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBestSellingProducts = () => {
    const axiosPublic = useAxiosPublic();

    const fetchProducts = async () => {
        try {
            const res = await axiosPublic.get('/products/bestSellingProducts')
            return res.data;
        } catch (error) {
            console.error('error while fetching bestsellingproducts', error);
        }
    };

    //useQuery to fetch best selling products
    const { data: products = [], isLoading, isFetching } = useQuery({
        queryKey: ['best_selling_products'],
        queryFn: fetchProducts
    })
    
    return { isLoading, isFetching, products };
};

export default useBestSellingProducts;