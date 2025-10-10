import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/hooks/access/useAxiosPublic';

const useFetchExploreOurProducts = () => {
    const axiosPublic = useAxiosPublic();

    const fetchProducts = async () => {
        try {
            const data = await axiosPublic.get('/products/exploreOurProducts')
            return data.data;
        } catch (error) {
            console.error('error while fetching explore our products', error);
        }
    };

    const { data: products = [], isLoading, isFetching } = useQuery({
        queryKey: ['explore_our_products'],
        queryFn: fetchProducts
    });

    return { products, isLoading, isFetching }; 
};

export default useFetchExploreOurProducts;